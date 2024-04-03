from rest_framework import serializers
from .models import community
from users.models import MyUser

class Communityerializer(serializers.ModelSerializer):
    class Meta:
        model = community
        fields = ['name', 'communityID', 'field', 'description', 'photo']

class MembersInfoserializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ['username']

class CommunityInfoserializer(serializers.ModelSerializer):
    owner_name = serializers.CharField(source='owner.username', read_only=True)
    admin_name = serializers.CharField(source='admin.username', read_only=True)
    members_name = MembersInfoserializer(source='members',read_only=True,many=True)
    class Meta:
        model = community
        fields = ['name', 'communityID', 'field', 'description', 'photo','owner_name', 'admin_name', 'members_name']

class EditCommunityerializer(serializers.ModelSerializer):
    community_id = serializers.CharField(source='communityID', read_only=True)
    class Meta:
        model = community
        fields = ['name', 'community_id', 'field', 'description', 'photo']
