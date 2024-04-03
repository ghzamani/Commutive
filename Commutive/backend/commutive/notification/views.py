from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializers import *
from .permission import *
from users.models import MyUser
from rest_framework.response import Response
# Create your views here.

class ListOfNotifications(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return notifications.objects.filter(user=user.username)

class NewNotifications(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        qs = notifications.objects.filter(user=user.username).filter(newNotif=True)
        for q in qs:
            q.newNotif = False
            q.save()
        return qs

class NewNotificationsCount(generics.RetrieveAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return notifications.objects.filter(user=user.username).filter(newNotif=True)
        

    def retrieve(self, request, *args, **kwargs):
        cnt = self.get_queryset().count()
        return Response(data=str(cnt))