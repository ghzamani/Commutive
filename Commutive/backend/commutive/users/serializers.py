from rest_framework import serializers
from .models import *


class ProfilePicserializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = ['uploaded_file', 'id']

class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = ['uploaded_file']

class Profileserializer(serializers.ModelSerializer):
    files = serializers.PrimaryKeyRelatedField(many=True, queryset=Media.objects.all())
    urls = MediaSerializer(source='files', many=True, read_only=True)
    user_name = serializers.CharField(source='username', read_only=True)
    pass_word = serializers.CharField(source='password', read_only=True)
    class Meta:
        model = MyUser
        fields = ['files', 'urls','user_name', 'pass_word','email','id']

    def update(self, instance, validated_data):
        file=validated_data['files']
        if len(file)==0:
            validated_data.pop('files', None)
        return super().update(instance, validated_data)