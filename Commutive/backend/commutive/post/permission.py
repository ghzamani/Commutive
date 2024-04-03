from rest_framework import permissions

class HasJoined(permissions.BasePermission): 

    def has_object_permission(self, request, view, obj):
        mems = obj.members
        return mems.filter(username=request.user.username).exists()

class HasJoinedOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        mems = obj.members
        return mems.filter(username=request.user.username).exists()        


class IsOwner(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        # check if user who launched request is object owner
        return obj.owner == request.user

class IsOwnerOrAuthorOrIsJoined(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        # check if user who launched request is object owner
        if request.method=="PUT" or request.method=="DELETE":
                return (obj.communityID.owner.username == request.user.username) or (obj.author==request.user.username)

        mems = obj.communityID.members
        return mems.filter(username=request.user.username).exists()

class IsPostAuthorOrAuthorOrIsJoined(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        # check if user who launched request is object owner
        if request.method=="DELETE":
            return (obj.postID.author == request.user.username) or (obj.author==request.user.username)
        mems = obj.postID.communityID.members
        return mems.filter(username=request.user.username).exists()

class IsPostAuthorOrAuthorOrReplyAuthorIsJoined(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        # check if user who launched request is object owner
        if request.method=="DELETE":
            return (obj.commentID.postID.author == request.user.username) or (obj.author==request.user.username) or (obj.commentID.author==request.user.username)
        mems = obj.commentID.postID.communityID.members
        return mems.filter(username=request.user.username).exists()