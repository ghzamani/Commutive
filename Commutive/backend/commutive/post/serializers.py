from rest_framework import serializers
from .models import *
from users.models import MyUser


class UsersInfoserializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ['username']

class PostFilesserializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = ['uploaded_file', 'id']  

class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = ['uploaded_file']

class Postserializer(serializers.ModelSerializer):
    files = serializers.PrimaryKeyRelatedField(many=True, queryset=Media.objects.all())
    urls = MediaSerializer(source='files', many=True, read_only=True)
    author_pic = serializers.SerializerMethodField('get_userPic')

    def get_userPic(self, id):
        qs = MyUser.objects.get(username=id.author)
        serializer = PostFilesserializer(instance=qs.files, many=True)
        return serializer.data

    class Meta:
        model = CommunityPost
        fields = ['files', 'urls','caption', 'author','author_pic','time','id', 'communityID']


class PostInfoserializer(serializers.ModelSerializer):
    Author = serializers.CharField(source='author', read_only=True)
    Time = serializers.CharField(source='time', read_only=True)
    AllPeopleLiked = serializers.SerializerMethodField('get_likes')
    AllPeopleReported = serializers.SerializerMethodField('get_reports')
    urls = MediaSerializer(source='files', many=True, read_only=True)
    author_pic = serializers.SerializerMethodField('get_userPic')
    #communityID=serializers.CharField(source='communityID',read_only=True)

    def get_userPic(self, id):
        qs = MyUser.objects.get(username=id.author)
        serializer = PostFilesserializer(instance=qs.files, many=True)
        return serializer.data

    def get_likes(self, id):
        qs = PostLike.objects.filter(liked_post=id)
        serializer = LikeSerializer(instance=qs, many=True)
        return serializer.data

    def get_reports(self, id):
        qs = PostReport.objects.filter(reported_post=id)
        serializer = RS(instance=qs, many=True)
        return serializer.data

    class Meta:
        model = CommunityPost
        fields = ['files', 'urls', 'caption', 'Author','author_pic','Time','id','AllPeopleReported', 'AllPeopleLiked','communityID' ]

    def update(self, instance, validated_data):
        file=validated_data['files']
        if len(file)==0:
            print('in if')
            validated_data.pop('files', None)
        print('validated_data')
        print(validated_data)
        return super().update(instance, validated_data)

class LikeSerializer(serializers.ModelSerializer):
    Liked_By = UsersInfoserializer(source='liked_by', read_only=True, many=True)
    likes_count = serializers.IntegerField(source='liked_by.count', read_only=True)
    class Meta:
        model = PostLike
        fields = ['likes_count','Liked_By']

class ReportSerializer(serializers.ModelSerializer):
    Reported_By = UsersInfoserializer(source='reported_by', read_only=True, many=True)
    reports_count = serializers.IntegerField(source='reported_by.count', read_only=True)

    Reportpost = serializers.SerializerMethodField('get_post')

    def get_post(self,Rp):
        qs = CommunityPost.objects.filter(id=Rp.reported_post.id)
        serializer = Postserializer(instance=qs, many=True)
        return serializer.data
    class Meta:
        model = PostReport
        fields = ['Reportpost','reports_count','Reported_By' ]

class RS(serializers.ModelSerializer):
    Reported_By = UsersInfoserializer(source='reported_by', read_only=True, many=True)
    reports_count = serializers.IntegerField(source='reported_by.count', read_only=True)
    class Meta:
        model = PostReport
        fields = ['reports_count','Reported_By' ]

class ReportedPostInfoserializer(serializers.ModelSerializer):
    AllPeopleReports = serializers.SerializerMethodField('get_report')
    urls = MediaSerializer(source='files', many=True, read_only=True)
    author_pic = serializers.SerializerMethodField('get_userPic')

    def get_report(self, id):
        qs = PostReport.objects.filter(reported_post=id)
        serializer = RS(instance=qs, many=True)
        return serializer.data

    def get_userPic(self,id):
        qs = MyUser.objects.get(username=id.author)
        serializer = PostFilesserializer(instance=qs.files, many=True)
        return serializer.data

    class Meta:
        model = CommunityPost
        fields = ['files', 'urls', 'caption', 'author','author_pic','time','id' ,'AllPeopleReports']

class CommentSerializer(serializers.ModelSerializer):
    AllPeopleLiked = serializers.SerializerMethodField('get_likes')

    def get_likes(self, id):
        qs = CommentLike.objects.filter(liked_comment=id)
        serializer = CommentLikeSerializer(instance=qs, many=True)
        return serializer.data
    class Meta:
        model= Comment
        fields=['text','time','author','id','AllPeopleLiked' ]

    #def create(self, instance, validated_data):
     #   validated_data.pop('author', None)
     #   return super().create(instance,validated_data)

class CommentLikeSerializer(serializers.ModelSerializer):
    Liked_By = UsersInfoserializer(source='liked_by', read_only=True, many=True)
    likes_count = serializers.IntegerField(source='liked_by.count', read_only=True)
    class Meta:
        model= CommentLike
        fields=['likes_count','Liked_By' ]

class ReplySerializer(serializers.ModelSerializer):
    AllPeopleLiked = serializers.SerializerMethodField('get_likes')

    def get_likes(self, id):
        print(id)
        qs = ReplyLike.objects.filter(liked_reply=id)
        serializer = ReplyLikeSerializer(instance=qs, many=True)
        return serializer.data
    class Meta:
        model= Reply
        fields=['text','time','author','id','AllPeopleLiked' ]

    # def create(self, instance, validated_data):
    #     validated_data.pop('author', None)
    #     return super().create(instance,validated_data)

class ReplyLikeSerializer(serializers.ModelSerializer):
    Liked_By = UsersInfoserializer(source='liked_by', read_only=True, many=True)
    likes_count = serializers.IntegerField(source='liked_by.count', read_only=True)
    class Meta:
        model= ReplyLike
        fields=['likes_count','Liked_By' ]
