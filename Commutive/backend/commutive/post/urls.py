from django.urls import path
from django.conf.urls import include, url
from .views import *
 
urlpatterns = [
    path('communities/<pk>/posts/', CreateGetPost.as_view()),
    path('communities/<pk>/posts/<id>', PostInfo.as_view()),
    path('communities/<pk>/posts/<id>/reports', Report.as_view()),
    path('communities/<pk>/posts/<id>/unreport', Unreport.as_view()),
    path('communities/<pk>/posts/<id>/acceptreport', Acceptreport.as_view()),
    path('communities/<pk>/post/reports/', ReportedPosts.as_view()),
    path('communities/<pk>/posts/<id>/likes', LikePost.as_view()),
    path('communities/<pk>/posts/<id>/comments/', Comments.as_view()),
    path('communities/<pk>/posts/<id>/comments/<cm_id>', CommentInfo.as_view()),
    path('communities/<pk>/posts/<id>/comments/<cm_id>/likes', LikeComment.as_view()),
    path('communities/<pk>/posts/<id>/comments/<cm_id>/replies', Replies.as_view()),
    path('communities/<pk>/posts/<id>/comments/<cm_id>/replies/<re_id>', ReplyInfo.as_view()),
    path('communities/<pk>/posts/<id>/comments/<cm_id>/replies/<re_id>/likes', LikeReply.as_view()),
    path('upload-file', UploadFile.as_view()),
    path('communities/posts/', TimeLine.as_view()),
]