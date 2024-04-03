from rest_framework import serializers
from .models import *
from users.models import MyUser


class UsersInfoserializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ['username']

class Eventserializer(serializers.ModelSerializer):
    Creator = serializers.CharField(source='creator', read_only=True)
    joined_users_count=serializers.IntegerField(source='join_users.count',read_only=True)
    users_joined = UsersInfoserializer(source='join_users', read_only=True, many=True)
    class Meta:
        model = Event
        fields = ['photo','title', 'description', 'startDate','endDate','Creator','joined_users_count','users_joined','id']

        def create(self, instance, validated_data):
            validated_data.pop('creator', None)
            return super().create(instance,validated_data)

