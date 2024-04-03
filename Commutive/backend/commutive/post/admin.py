from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(CommunityPost)
admin.site.register(PostLike)
admin.site.register(PostReport)
admin.site.register(Comment)
admin.site.register(CommentLike)
admin.site.register(Reply)
admin.site.register(ReplyLike)