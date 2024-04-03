from django.db import models
from users.models import MyUser
from community.models import community


# Create your models here.
class Media(models.Model):
    uploaded_file = models.FileField(upload_to='posts/', max_length=100 , null=True, blank=True)

class CommunityPost(models.Model):
    caption = models.TextField(blank=True)
    author = models.CharField(max_length=150, blank=True)
    communityID = models.ForeignKey(community, on_delete=models.CASCADE, blank=True, related_name='community', null=True)
    time = models.DateTimeField(auto_now=False, auto_now_add=True, blank=True)
    files = models.ManyToManyField(Media, blank=True, related_name='post')

    def __str__(self):
        return self.caption

class PostLike (models.Model):
    liked_by = models.ManyToManyField(MyUser,  default=None, related_name='users_liked')
    liked_post=models.ForeignKey(CommunityPost, on_delete=models.CASCADE, blank=True, related_name='liked_post', null=True)

class PostReport (models.Model):
    reported_by = models.ManyToManyField(MyUser,  default=None, related_name='users_reported')
    reported_post=models.ForeignKey(CommunityPost, on_delete=models.CASCADE, blank=True, related_name='report_post', null=True)


class Comment(models.Model):
    author = models.CharField(max_length=300,blank=True)
    text = models.TextField()
    time=models.DateTimeField(auto_now=False, auto_now_add=True,blank=True)
    postID=models.ForeignKey(CommunityPost, on_delete=models.CASCADE, blank=True, related_name='comment', null=True)

    def __str__(self):
        return self.text

class CommentLike (models.Model):
    liked_by = models.ManyToManyField(MyUser,  default=None, related_name='comments_users_liked')
    liked_comment=models.ForeignKey(Comment, on_delete=models.CASCADE, blank=True, related_name='liked_comment', null=True)


class Reply(models.Model):
    author = models.CharField(max_length=300,blank=True)
    text = models.TextField()
    time=models.DateTimeField(auto_now=False, auto_now_add=True,blank=True)
    commentID=models.ForeignKey(Comment, on_delete=models.CASCADE, blank=True, related_name='comment_reply', null=True)

    def __str__(self):
        return self.text

class ReplyLike (models.Model):
    liked_by = models.ManyToManyField(MyUser,  default=None, related_name='replies_users_liked')
    liked_reply=models.ForeignKey(Reply, on_delete=models.CASCADE, blank=True, related_name='liked_replies', null=True)