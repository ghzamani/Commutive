from rest_framework import serializers
from .models import *
from users.models import MyUser


# class UsersInfoserializer(serializers.ModelSerializer):
#     class Meta:
#         model = MyUser
#         fields = ['username']

class NotificationSerializer(serializers.ModelSerializer):
   # inform = UsersInfoserializer(source='user', read_only=True, many=True)
    #likes_count = serializers.IntegerField(source='liked_by.count', read_only=True)
    class Meta:
        model = notifications
        fields = ['text','user','id']