from django.shortcuts import render
from rest_framework import generics
from .models import *
from .serializers import *
from users.models import *
from post.models import *
from .permissions import *
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
import datetime

# Create your views here.

# function to find out candidates of being admin
def GetCandidates(com):
    score = {}
    posts = CommunityPost.objects.filter(communityID=com)
    for user in com.members.exclude(username=com.owner.username): # must exclude owner from candidates  
        #what happens if only the owner is the member of the community?
        count = 0
        userposts = posts.filter(author=user.username)
        if not userposts: 
            continue
        count += 5 * userposts.count()
        for post in userposts:
            count += 2 * PostLike.objects.filter(liked_post=post).count()
            count -= 3 * PostReport.objects.filter(reported_post=post).count()
        score[user] = count

    orderE = sorted(score.items(), key=lambda x: x[1], reverse=True)
    orderEuser=[i[0] for i in orderE]

    if (len(orderE) >= 5):
        return orderEuser[:5]

    return orderEuser



class MakePoll(generics.ListCreateAPIView):
    queryset = Poll.objects.all()
    serializer_class = PollSerializer
    permission_classes = [IsOwner]

    def get_object(self):
        com_id = self.kwargs.get('id')
        try:
            com = community.objects.get(communityID=com_id)
        except community.DoesNotExist:
            return None
        self.check_object_permissions(self.request, com)
        return com

    def perform_create(self, serializer):
        com = self.get_object()
        serializer.save(communityID=com)


    def create(self, request, *args, **kwargs):
        com = self.get_object()
        if com == None:
            return Response(data="Community Not found", status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        pollID = serializer.data['id']
        # set the candidates here
        # can set the numbers of candidates too
        users = GetCandidates(com)
        for i in range(0,len(users)):
            PollChoice.objects.create(choice=users[i], poll_id=pollID)
        print(users)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def get_queryset(self):
        com = self.get_object()
        
        # check for validation date of the poll
        # |now - poll.time| <= 5  -->  now <= poll.time + 5
        # show polls that are at most 5days ago
        exp_date = datetime.datetime.now().date() - datetime.timedelta(days=5)
        q = Poll.objects.all().filter(communityID=com.communityID).filter(time__gte=exp_date)
        return q

class Vote(generics.RetrieveUpdateAPIView):
    queryset = PollChoice.objects.all()
    serializer_class = PollChoiceSerializer
    permission_classes = [IsOwner, IsAuthenticated]

    def get_object(self):
        com_id = self.kwargs.get('id')
        poll_id = self.kwargs.get('pk')

        try:
            com = community.objects.get(communityID=com_id)
        except community.DoesNotExist:
            com = None

        poll = Poll.objects.get(id=poll_id)
        if str(poll.communityID) != com_id:
            poll = None
        
        
        # check for validation date of the poll
        # |now - poll.time| <= 5  -->  now <= poll.time + 5
        # show polls that are at most 5days ago
        else:
            expiration_date = poll.time.date() + datetime.timedelta(days=5)
            if expiration_date < datetime.datetime.now().date():
                poll = None

        self.check_object_permissions(self.request, com)
        return (com, poll)


    def retrieve(self, request, *args, **kwargs):
        com, poll = self.get_object()
        if com is None:
            return Response(data="Community not found", status=status.HTTP_404_NOT_FOUND)

        if poll is None:
            return Response(data="Poll not found", status=status.HTTP_404_NOT_FOUND)
            
        serializer = self.get_serializer(poll)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        com, poll = self.get_object()
        if com is None:
            return Response(data="Community not found", status=status.HTTP_404_NOT_FOUND)

        if poll is None:
            return Response(data="Poll not found", status=status.HTTP_404_NOT_FOUND)

        # check whether user has voted before
        poll_choices = PollChoice.objects.filter(poll_id=poll.id)
        for choice in poll_choices:
            if choice.voters.filter(username=request.user.username).exists():
                return Response(data="You have already participated in this poll", status=status.HTTP_400_BAD_REQUEST)

        user_choices = request.data.getlist('candidates')
        if len(user_choices) > 3:
            return Response(data="You cannot choose more than 3 items", status=status.HTTP_400_BAD_REQUEST)

        idList = list(poll_choices.values_list('id', flat=True))
        for ch in user_choices:
            if int(ch) not in idList:
                msg = "Item '" + ch + "' is not in this poll"
                return Response(data=msg, status=status.HTTP_400_BAD_REQUEST)
            choice = poll_choices.get(id=int(ch))
            choice.voters.add(request.user)
            choice.save()

        serializer = PollChoiceSerializer(poll)
        return Response(serializer.data)


class LatestActivePoll(generics.RetrieveUpdateAPIView):
    queryset = PollChoice.objects.all()
    serializer_class = PollChoiceSerializer
    permission_classes = [HasJoined, IsAuthenticated]

    def get_object(self):
        com_id = self.kwargs.get('id')

        try:
            com = community.objects.get(communityID=com_id)
        except community.DoesNotExist:
            com = None


        latest_poll = None
        if com:
            polls = Poll.objects.filter(communityID=com).order_by('-time')
            for poll in polls.all():
                # check for validation date of the poll
                # |now - poll.time| <= 5  -->  now <= poll.time + 5
                expiration_date = poll.time.date() + datetime.timedelta(days=5)
                if expiration_date >= datetime.datetime.now().date():
                    latest_poll = poll
                    break


        self.check_object_permissions(self.request, com)
        return (com, latest_poll)


    def retrieve(self, request, *args, **kwargs):
        com, poll = self.get_object()
        if com is None:
            return Response(data="Community not found", status=status.HTTP_404_NOT_FOUND)

        if poll is None:
            return Response(data="Poll not found", status=status.HTTP_404_NOT_FOUND)
            
        serializer = self.get_serializer(poll)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        com, poll = self.get_object()
        if com is None:
            return Response(data="Community not found", status=status.HTTP_404_NOT_FOUND)

        if poll is None:
            return Response(data="Poll not found", status=status.HTTP_404_NOT_FOUND)

        # check whether user has voted before
        poll_choices = PollChoice.objects.filter(poll_id=poll.id)
        for choice in poll_choices:
            if choice.voters.filter(username=request.user.username).exists():
                return Response(data="You have already participated in this poll", status=status.HTTP_400_BAD_REQUEST)

        user_choices = request.data.getlist('candidates')
        if len(user_choices) > 3:
            return Response(data="You cannot choose more than 3 items", status=status.HTTP_400_BAD_REQUEST)

        idList = list(poll_choices.values_list('id', flat=True))
        for ch in user_choices:
            if int(ch) not in idList:
                msg = "Item '" + ch + "' is not in this poll"
                return Response(data=msg, status=status.HTTP_400_BAD_REQUEST)
            choice = poll_choices.get(id=int(ch))
            choice.voters.add(request.user)
            choice.save()

        serializer = PollChoiceSerializer(poll)
        return Response(serializer.data)
