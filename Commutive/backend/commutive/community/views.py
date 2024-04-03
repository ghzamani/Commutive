from django.shortcuts import render
from rest_framework import mixins
from rest_framework import generics
from .serializers import *
from .models import community
from users.models import MyUser
from django.db.models import Q
from django.http import Http404
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import TokenAuthentication
from django.core.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework import status
from .permissions import *
from rest_framework.pagination import PageNumberPagination 
from poll.models import *
import datetime
from django.db.models import Count

# from django.http import HttpResponse

# Create your views here.
class Search(generics.ListAPIView):
    serializer_class = Communityerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        searchedword = self.request.query_params.get('q', None)
        queryset = community.objects.all()
        if searchedword is None:
            return queryset
        if searchedword is not None:
            if searchedword == "":
                raise Http404
            queryset = queryset.filter(
                Q(name__icontains=searchedword) |
                Q(communityID__icontains=searchedword) |
                Q(description__icontains=searchedword) |
                Q(field__icontains=searchedword)
            )
            if len(queryset) == 0:
                raise Http404
        return queryset


class CreateCommunity(generics.CreateAPIView):
    queryset = community.objects.all()
    serializer_class = Communityerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        mem = []
        mem.append(self.request.user)
        return serializer.save(owner=self.request.user, members=mem)


class CommunitiesJoined(generics.ListAPIView):
    serializer_class = Communityerializer
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination 

    def get_queryset(self):
        communities = community.objects.all()
        user = self.request.user.username
        queryset = []
        for com in communities:
            if com.members.filter(username=user).exists():
                queryset.append(com)
        return queryset


class JoinCommunity(generics.UpdateAPIView):
    queryset = community.objects.all()
    serializer_class = Communityerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        id = self.request.query_params.get('q')
        if not community.objects.filter(communityID=id).exists():
            return ([], [])
        joining_com = community.objects.get(communityID=id)
        logined_user = self.request.user
        return (joining_com, logined_user)

    def update(self, request, *args, **kwargs):
        joining_com, logined_user = self.get_queryset()
        if joining_com == []:
            return Response(data="Community not found", status=status.HTTP_404_NOT_FOUND)
        if joining_com.members.filter(username=logined_user.username).exists():
            return Response(data="You have already joined this community", status=status.HTTP_400_BAD_REQUEST)
        joining_com.members.add(logined_user)
        joining_com.save()
        serializer = Communityerializer(joining_com)
        return Response(serializer.data)


class InfoEditLeaveCommunity(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = EditCommunityerializer
    permission_classes = [IsOwnerOrHasjoinedOrReadOnly]
    queryset = community.objects.all()

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()

        # set admin of the community
        polls = Poll.objects.filter(communityID=instance.communityID).order_by('-time')
        # in a for loop, check for the last valid poll 
        # and set its result to the admin of community
        for poll in polls.all():
            
            # |now - poll.time| <= 5  -->  now <= poll.time + 5
            expiration_date = poll.time.date() + datetime.timedelta(days=5)

            if expiration_date < datetime.datetime.now().date():
                poll_choices = PollChoice.objects.filter(poll_id=poll.id)
                max_voter = float("-inf")
                # choice which has the highest rate
                best_choice = poll_choices[0]
                for choice in poll_choices.all():
                    if choice.choice in instance.members.all() and choice.voters.count() > max_voter :
                        best_choice = choice
                        max_voter = choice.voters.count()

                chosen_admin = best_choice.choice
                instance.admin = chosen_admin
                instance.save()

                break

        if not instance.admin:
            instance.admin = instance.owner
            instance.save()

        return Response(data=CommunityInfoserializer(instance).data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()

        # check whether member has a role in community(admin or owner)
        user = self.request.user
        if user.username == instance.owner.username:
            # delete the community
            self.perform_destroy(instance)

        elif user.username == instance.admin.username:
            # set another admin and then leave
            instance.members.remove(user)
            instance.admin = instance.members.first()  # change this line

            instance.save()
            print(instance.admin)
        else:
            # just leave the community
            instance.members.remove(user)
            instance.save()

        return Response(data="You left the community successfully", status=status.HTTP_204_NO_CONTENT)


class HomepageCommunities(generics.ListAPIView):
    serializer_class = CommunityInfoserializer
    permission_classes = [AllowAny]
    queryset = community.objects.annotate(count=Count('members')).order_by('-count')[:8]

class DeleteCommunityImg(generics.UpdateAPIView):
    queryset = community.objects.all()
    serializer_class = Communityerializer
    permission_classes = [IsOwner,IsAuthenticated]

    def get_object(self):
        com_id = self.kwargs.get('pk')
        com = community.objects.get(communityID=com_id)
        self.check_object_permissions(self.request, com)
        return com

    def update(self, request, *args, **kwargs):
        com = self.get_object()
        com.photo=None
        com.save()
        serializer = Communityerializer(com)
        return Response(serializer.data)