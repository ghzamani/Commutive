from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated ,IsAuthenticatedOrReadOnly
from .models import CommunityPost,Comment
from .serializers import *
from .permission import *
from community.models import community
from notification.models import notifications
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import *
from rest_framework.pagination import PageNumberPagination 


# Create your views here.
class UploadFile(generics.CreateAPIView):
    queryset = Media.objects.all()
    # serializer_class = MediaSerializer
    serializer_class = PostFilesserializer
    parser_classes = (MultiPartParser, FormParser)


class CreateGetPost(generics.ListCreateAPIView):
    queryset = CommunityPost.objects.all()
    serializer_class = Postserializer
    permission_classes = [HasJoinedOrReadOnly]
    # seeing all posts of a community -> AllowAny
    # creating post in a community -> Hasjoined
    parser_classes = (MultiPartParser, FormParser)
    pagination_class = PageNumberPagination 


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
        serializer.save(communityID=com, author=self.request.user.username)

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
        com_id = self.get_object()
        queryset = CommunityPost.objects.filter(communityID=com_id).order_by('-time')

        # if q is None, return all data
        q = self.request.query_params.get('page', None)
        if not q:
            serializer = PostInfoserializer(queryset, many=True)
            return Response(serializer.data)        

        page = self.paginate_queryset(queryset)
        print(page)
        if page is not None:
            serializer = PostInfoserializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = PostInfoserializer(page, many=True)
        return Response(serializer.data)


class PostInfo(generics.RetrieveUpdateDestroyAPIView):
    queryset = CommunityPost.objects.all()
    serializer_class = PostInfoserializer
    permission_classes = [IsOwnerOrAuthorOrIsJoined, IsAuthenticated]

    def get_object(self):
        com_id = self.kwargs.get('pk')
        post_id = self.kwargs.get('id')
        com = community.objects.get(communityID=com_id)
        post = CommunityPost.objects.get(id=post_id)
        self.check_object_permissions(self.request,post)
        # check whether the post belongs to the community
        if post.communityID != com:
            post = None
        return post

    def retrieve(self, request, *args, **kwargs):
        post = self.get_object()
        if post == None:
            return Response(data="Post Not found", status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(post)
        return Response(serializer.data)

class Report(generics.ListCreateAPIView):
    queryset = PostReport.objects.all()
    serializer_class = ReportSerializer
    permission_classes = [HasJoined, IsAuthenticated]

    def get_object(self):
        com_id = self.kwargs.get('pk')
        post_id = self.kwargs.get('id')
        com = community.objects.get(communityID=com_id)
        post = CommunityPost.objects.get(id=post_id)
        self.check_object_permissions(self.request, com)
        # check whether the post belongs to the community
        if post.communityID != com:
            post = None
        return post

    def perform_create(self, serializer):
        post = self.get_object()
        mem=[]
        mem.append(self.request.user)
        serializer.save(reported_post=post, reported_by=mem)

    def create(self, request, *args, **kwargs):
        post = self.get_object()
        if post == None:
            return Response(data="post Not found", status=status.HTTP_404_NOT_FOUND)
        if PostReport.objects.filter(reported_post=post).exists():
            postreportObj = PostReport.objects.get(reported_post=post)
            if postreportObj.reported_by.filter(username=self.request.user.username).exists():
                return Response(data="You have already reported this post", status=status.HTTP_400_BAD_REQUEST)
            else:
                postreportObj.reported_by.add(self.request.user)
            return Response(data=ReportSerializer(postreportObj).data)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def list(self, request, *args, **kwargs):
        post = self.get_object()
        if post == None:
            return Response(data="post Not found", status=status.HTTP_404_NOT_FOUND)

        queryset = PostReport.objects.filter(reported_post=post)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    

class ReportedPosts(generics.ListAPIView):
    queryset = PostReport.objects.all()
    serializer_class = ReportedPostInfoserializer
    permission_classes = [IsOwner, IsAuthenticated]
    pagination_class = PageNumberPagination 

    def get_object(self):
        com_id = self.kwargs.get('pk')
        com = community.objects.get(communityID=com_id)
        self.check_object_permissions(self.request, com)
        return com

    def list(self, request, *args, **kwargs):
        com_id = self.get_object()
        reports = PostReport.objects.filter(reported_post__communityID=com_id).values('reported_post_id')
        
        queryset = CommunityPost.objects.filter(id__in=reports)
        
        if not queryset:
            return Response(data="There is no reported post in this community", status=status.HTTP_200_OK)

        # if q is None, return all data
        q = self.request.query_params.get('page', None)
        if not q:
            serializer = ReportedPostInfoserializer(queryset, many=True)
            return Response(serializer.data)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = ReportedPostInfoserializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = ReportedPostInfoserializer(queryset, many=True)
        return Response(serializer.data)


class Acceptreport(generics.DestroyAPIView):
    queryset = PostReport.objects.all()
    serializer_class = ReportSerializer
    permission_classes = [IsOwner]

    def get_object(self):
        com_id = self.kwargs.get('pk')
        post_id = self.kwargs.get('id')
        com = community.objects.get(communityID=com_id)
        post = CommunityPost.objects.get(id=post_id)
        self.check_object_permissions(self.request, com)

        # check whether the post belongs to the community
        if post.communityID != com:
            post = None

        instance = self.queryset.filter(reported_post=post)
        if not instance.exists():
            instance = None
        return (post, instance)

    def destroy(self, request, *args, **kwargs):
        post, instance = self.get_object()
        if post == None:
            return Response(data="Post Not found", status=status.HTTP_404_NOT_FOUND)
        if instance == None:
            return Response(data="This post has not been reported before", status=status.HTTP_400_BAD_REQUEST)

        #send a notif for post's author before deleting it
        notif = "type: delete post because of multiple reports\npost id: {}\ncommunityID: {}\ntime: {}".format(post.id, post.communityID, post.time)
        notifications.objects.create(text=notif, user=post.author)
        
        post.delete()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

class Unreport(generics.DestroyAPIView):
    queryset = PostReport.objects.all()
    serializer_class = ReportSerializer
    permission_classes = [IsOwner]

    def get_object(self):
        com_id = self.kwargs.get('pk')
        post_id = self.kwargs.get('id')
        com = community.objects.get(communityID=com_id)
        post = CommunityPost.objects.get(id=post_id)
        self.check_object_permissions(self.request, com)

        # check whether the post belongs to the community
        if post.communityID != com:
            post = None

        instance = self.queryset.filter(reported_post=post)
        if not instance.exists():
            instance = None        
        return (post, instance)

    def destroy(self, request, *args, **kwargs):
        post, instance = self.get_object()
        if post == None:
            return Response(data="Post Not found", status=status.HTTP_404_NOT_FOUND)
        if instance == None:
            return Response(data="This post has not been reported before", status=status.HTTP_400_BAD_REQUEST)
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


class LikePost(generics.ListCreateAPIView):
    queryset = PostLike.objects.all()
    serializer_class = LikeSerializer
    permission_classes = [HasJoinedOrReadOnly, IsAuthenticatedOrReadOnly]

    def get_object(self):
        com_id = self.kwargs.get('pk')
        post_id = self.kwargs.get('id')
        com = community.objects.get(communityID=com_id)
        post = CommunityPost.objects.get(id=post_id)
        self.check_object_permissions(self.request, com)

        # check whether the post belongs to the community
        if post.communityID != com:
            post = None
        return post

    def perform_create(self, serializer):
        post = self.get_object()
        mem=[]
        mem.append(self.request.user)
        serializer.save(liked_post=post, liked_by=mem)

    def create(self, request, *args, **kwargs):
        post = self.get_object()
        if post == None:
            return Response(data="post Not found", status=status.HTTP_404_NOT_FOUND)

        notif = "type: like post\npost id: {}\ncommunityID: {}\nlikedby: {}".format(post.id, post.communityID,self.request.user.username)
        if PostLike.objects.filter(liked_post=post).exists():
            postlikeObj = PostLike.objects.get(liked_post=post)

            if postlikeObj.liked_by.filter(username=self.request.user.username).exists():
                postlikeObj.liked_by.remove(self.request.user)
                
                if notifications.objects.filter(text=notif).exists():
                    notifications.objects.filter(text=notif).delete()
            else:
                postlikeObj.liked_by.add(self.request.user)
                #send a notif for post's author
                notifications.objects.create(text=notif, user=post.author)
            return Response(data=LikeSerializer(postlikeObj).data)

        notifications.objects.create(text=notif, user=post.author)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def list(self, request, *args, **kwargs):
        post = self.get_object()
        if post == None:
            return Response(data="post Not found", status=status.HTTP_404_NOT_FOUND)
        queryset = PostLike.objects.filter(liked_post=post)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class Comments(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [HasJoined, IsAuthenticated]
    pagination_class = PageNumberPagination 

    def get_object(self):
        post_id = self.kwargs.get('id')
        com_id = self.kwargs.get('pk')
        # try:
        #     post = CommunityPost.objects.get(id=post_id)
        # except CommunityPost.DoesNotExist:
        #     return None
        post = CommunityPost.objects.get(id=post_id)
        com = community.objects.get(communityID=com_id)
        
        # check whether the post belongs to the community
        if post.communityID != com:
            post = None
        self.check_object_permissions(self.request, com)
        
        return (com,post)

    def perform_create(self, serializer):
        com,post = self.get_object()
        serializer.save(postID=post, author=self.request.user.username)

    def create(self, request, *args, **kwargs):
        com,post = self.get_object()
        if post == None:
            return Response(data="post Not found", status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        #send a notif for post's author
        notif = "type: comment\npost id: {}\ncommunityID: {}\ncommentedby: {}\ncommentID: {}".format(post.id, post.communityID, self.request.user.username, serializer.data['id']) 
        notifications.objects.create(text=notif, user=post.author)

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def list(self, request, *args, **kwargs):
        com, post = self.get_object()
        if post == None:
            return Response(data="post Not found", status=status.HTTP_404_NOT_FOUND)
        queryset = Comment.objects.filter(postID=post)

        # if q is None, return all data
        q = self.request.query_params.get('page', None)
        if not q:
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class CommentInfo(generics.RetrieveDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsPostAuthorOrAuthorOrIsJoined, IsAuthenticated] # permission bayad dorost she

    def get_object(self):
        post_id = self.kwargs.get('id')
        #com_id = self.kwargs.get('pk')
        cm_id=self.kwargs.get('cm_id')
        post = CommunityPost.objects.get(id=post_id)
        #com = community.objects.get(communityID=com_id)
        comment = Comment.objects.get(id=cm_id)
        if comment.postID != post:
            comment = None
        self.check_object_permissions(self.request, comment)
        return comment

    def retrieve(self, request, *args, **kwargs):
        comment = self.get_object()
        if comment == None:
            return Response(data="comment Not found", status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(comment)
        return Response(serializer.data)

class LikeComment(generics.ListCreateAPIView):
    queryset = CommentLike.objects.all()
    serializer_class = CommentLikeSerializer
    permission_classes = [ HasJoined,IsAuthenticated]

    def get_object(self):
        com_id = self.kwargs.get('pk')
        post_id = self.kwargs.get('id')
        comment_id = self.kwargs.get('cm_id')
        com = community.objects.get(communityID=com_id)
        post = CommunityPost.objects.get(id=post_id)
        comment = Comment.objects.get(id=comment_id)
        self.check_object_permissions(self.request, com)

        # check whether the post belongs to the community
        if post.communityID != com:
            post = None
        # check whether the comment belongs to the community
        if comment.postID != post:
            comment = None
        return (post, comment)

    def perform_create(self, serializer):
        post, comment = self.get_object()
        mem = []
        mem.append(self.request.user)
        serializer.save(liked_comment=comment, liked_by=mem)

    def create(self, request, *args, **kwargs):
        post, comment = self.get_object()
        if post == None:
            return Response(data="Post Not found", status=status.HTTP_404_NOT_FOUND)
        if comment == None:
            return Response(data="Comment Not found", status=status.HTTP_404_NOT_FOUND)

        notif = "type: like comment\ncomment id: {}\npost id: {}\ncommunityID: {}\nlikedby: {}".format(comment.id,post.id,post.communityID, self.request.user.username)

        if CommentLike.objects.filter(liked_comment=comment).exists():
            commentlikeObj = CommentLike.objects.get(liked_comment=comment)

            if commentlikeObj.liked_by.filter(username=self.request.user.username).exists():
                commentlikeObj.liked_by.remove(self.request.user)
                if notifications.objects.filter(text=notif).exists():
                    notifications.objects.filter(text=notif).delete()
            else:
                commentlikeObj.liked_by.add(self.request.user)
                notifications.objects.create(text=notif, user=comment.author)
            return Response(data=CommentLikeSerializer(commentlikeObj).data)

        notifications.objects.create(text=notif, user=comment.author)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def list(self, request, *args, **kwargs):
        post, comment = self.get_object()
        if post == None:
            return Response(data="Post Not found", status=status.HTTP_404_NOT_FOUND)
        if comment == None:
            return Response(data="Comment Not found", status=status.HTTP_404_NOT_FOUND)
        queryset = CommentLike.objects.filter(liked_comment=comment)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
########################################

class Replies(generics.ListCreateAPIView):
    queryset = Reply.objects.all()
    serializer_class = ReplySerializer
    permission_classes = [HasJoined, IsAuthenticated]

    def get_object(self):
        post_id = self.kwargs.get('id')
        com_id = self.kwargs.get('pk')
        comment_id=self.kwargs.get('cm_id')
        # try:
        #     post = CommunityPost.objects.get(id=post_id)
        # except CommunityPost.DoesNotExist:
        #     return None
        post = CommunityPost.objects.get(id=post_id)
        com = community.objects.get(communityID=com_id)
        comment=Comment.objects.get(id=comment_id)
        # check whether the post belongs to the community
        if post.communityID != com:
            post = None
        if comment.postID != post:
            comment = None
        self.check_object_permissions(self.request, com)

        return (comment, post)

    def perform_create(self, serializer):
        comment, post = self.get_object()
        serializer.save(commentID=comment, author=self.request.user.username)

    def create(self, request, *args, **kwargs):
        comment, post = self.get_object()
        if post == None or comment==None:
            return Response(data="your request Not found", status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data) #in moshkel dare
        # send a notif for post's author
        notif = "type: reply\nreply id: {}\nreplyby: {}\npost id: {}\ncommunityID: {}\ncommentedby: {}\ncommentID: {}".format(serializer.data['id'],self.request.user.username,post.id, post.communityID,comment.author,comment.id)
        notifications.objects.create(text=notif, user=comment.author)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def list(self, request, *args, **kwargs):
        comment, post = self.get_object()
        if post == None or comment == None:
            return Response(data="your request Not found", status=status.HTTP_404_NOT_FOUND)
        queryset = Reply.objects.filter(commentID=comment)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class ReplyInfo(generics.RetrieveDestroyAPIView):
    queryset = Reply.objects.all()
    serializer_class = ReplySerializer
    permission_classes = [IsPostAuthorOrAuthorOrReplyAuthorIsJoined, IsAuthenticated]  # permission bayad dorost she

    def get_object(self):
        #post_id = self.kwargs.get('id')
        # com_id = self.kwargs.get('pk')
        cm_id = self.kwargs.get('cm_id')
        rp_id=self.kwargs.get('re_id')
        #post = CommunityPost.objects.get(id=post_id)
        reply=Reply.objects.get(id =rp_id)
        # com = community.objects.get(communityID=com_id)
        comment = Comment.objects.get(id=cm_id)
        if reply.commentID != comment:
            reply = None
        self.check_object_permissions(self.request, reply)
        return reply

    def retrieve(self, request, *args, **kwargs):
        reply = self.get_object()
        if reply == None:
            return Response(data="reply Not found", status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(reply)
        return Response(serializer.data)


class LikeReply(generics.ListCreateAPIView):
    queryset = ReplyLike.objects.all()
    serializer_class = ReplyLikeSerializer
    permission_classes = [HasJoined, IsAuthenticated]

    def get_object(self):
        com_id = self.kwargs.get('pk')
        post_id = self.kwargs.get('id')
        comment_id = self.kwargs.get('cm_id')
        rp_id=self.kwargs.get('re_id')
        com = community.objects.get(communityID=com_id)
        post = CommunityPost.objects.get(id=post_id)
        comment = Comment.objects.get(id=comment_id)
        reply=Reply.objects.get(id=rp_id)
        self.check_object_permissions(self.request, com)

        # check whether the post belongs to the community
        if post.communityID != com:
            post = None
        # check whether the comment belongs to the community
        if comment.postID != post:
            comment = None
        if reply.commentID != comment:
            reply=None
        return (reply, comment,post)

    def perform_create(self, serializer):
        reply, comment,post = self.get_object()
        mem = []
        mem.append(self.request.user)
        serializer.save(liked_reply=reply, liked_by=mem)

    def create(self, request, *args, **kwargs):
        reply, comment,post = self.get_object()
        if post == None:
            return Response(data="Post Not found", status=status.HTTP_404_NOT_FOUND)
        if comment == None:
            return Response(data="Comment Not found", status=status.HTTP_404_NOT_FOUND)
        if reply == None:
            return Response(data="Reply Not found", status=status.HTTP_404_NOT_FOUND)

        notif = "type: like reply\nreply id: {}\ncomment id: {}\npost id: {}\ncommunityID: {}\nlikedby: {}".format(reply.id, comment.id, post.id, post.communityID, self.request.user.username)

        if ReplyLike.objects.filter(liked_reply=reply).exists():
            replylikeObj = ReplyLike.objects.get(liked_reply=reply)

            if replylikeObj.liked_by.filter(username=self.request.user.username).exists():
                replylikeObj.liked_by.remove(self.request.user)
                if notifications.objects.filter(text=notif).exists():
                    notifications.objects.filter(text=notif).delete()
            else:
                replylikeObj.liked_by.add(self.request.user)
                notifications.objects.create(text=notif, user=reply.author)
            return Response(data=ReplyLikeSerializer(replylikeObj).data)

        notifications.objects.create(text=notif, user=reply.author)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def list(self, request, *args, **kwargs):
        reply, comment,post = self.get_object()
        if post == None:
            return Response(data="Post Not found", status=status.HTTP_404_NOT_FOUND)
        if comment == None:
            return Response(data="Comment Not found", status=status.HTTP_404_NOT_FOUND)
        if reply == None:
            return Response(data="Reply Not found", status=status.HTTP_404_NOT_FOUND)

        queryset = ReplyLike.objects.filter(liked_reply=reply)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


########################################
class TimeLine(generics.ListAPIView):
    serializer_class = PostInfoserializer
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination 

    def get_queryset(self):
        user = self.request.user.username
        # find out the communitits that user has joined
        communities = community.objects.filter(members__username__contains=user).values('communityID')

        # find out the posts in communities that user has joined
        posts = CommunityPost.objects.filter(communityID__in=communities).order_by('-time')
        return posts