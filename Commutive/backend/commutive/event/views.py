from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializers import *
from .permission import *
from community.models import *
from post.models import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination 
from datetime import datetime


# Create your views here.
class EventView(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = Eventserializer
    permission_classes = [IsOwnerOrHasJoined, IsAuthenticated]

    def get_object(self):
        com_id = self.kwargs.get('pk')
        try:
            com = community.objects.get(communityID=com_id)
        except community.DoesNotExist:
            return None
        self.check_object_permissions(self.request, com)
        return com

    def perform_create(self, serializer):
        com = self.get_object()
        mem=[]
        mem.append(self.request.user)
        serializer.save(community=com, creator=self.request.user.username,join_users=mem)

    def create(self, request, *args, **kwargs):
        com = self.get_object()
        if com == None:
            return Response(data="Community Not found", status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def list(self, request, *args, **kwargs):
        com = self.get_object()
        queryset = Event.objects.filter(community=com).order_by('startDate')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class NewEvents(generics.ListAPIView):
    serializer_class = Eventserializer
    permission_classes = [IsOwnerOrHasJoined, IsAuthenticated]    
    pagination_class = PageNumberPagination 

    def get_object(self):
        com_id = self.kwargs.get('pk')
        try:
            com = community.objects.get(communityID=com_id)
        except community.DoesNotExist:
            return None
        self.check_object_permissions(self.request, com)
        return com

    def get_queryset(self):
        com = self.get_object()
        q = Event.objects.filter(community=com).filter(endDate__gte=datetime.now())
        return q


class JoinEvent(generics.RetrieveUpdateAPIView): ###ino byad update mikone
    queryset = Event.objects.all()
    serializer_class = Eventserializer
    permission_classes = [HasJoined, IsAuthenticated]

    def get_object(self):
        com_id = self.kwargs.get('pk')
        ev_id = self.kwargs.get('id')
        com = community.objects.get(communityID=com_id)
        event = Event.objects.get(id=ev_id)
        self.check_object_permissions(self.request, com)
        if event.community != com:
            event=None

        return event

    def update(self, request, *args, **kwargs):
        event = self.get_object()
        if  not event  :
            return Response(data="event doesn't belong to this community", status=status.HTTP_404_NOT_FOUND)

        if event.join_users.filter(username=self.request.user.username).exists():
            event.join_users.remove(self.request.user)
        else :
            event.join_users.add(self.request.user)
        event.save()
        serializer = Eventserializer(event)
        return Response(data=serializer.data)

    def retrieve(self, request, *args, **kwargs):
        event = self.get_object()
        if  not event  :
            return Response(data="event doesn't belong to this community", status=status.HTTP_404_NOT_FOUND)
        return super().retrieve(request)

class UserEvent(generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = Eventserializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        person_id = self.kwargs.get('username')
        person = MyUser.objects.get(username=person_id)
        return person

    def list(self, request, *args, **kwargs):
        person=self.get_object()
        events = Event.objects.all()
        print(events)
        result=[]
        for event in events:
            if event.join_users.filter(username=person.username).exists():
                result.append(Eventserializer(event).data)
        return Response(data=result)
