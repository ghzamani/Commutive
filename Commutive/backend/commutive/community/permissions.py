from rest_framework import permissions

class IsOwnerOrHasjoinedOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        # only the owner can edit the community
        if request.method=="PUT": 
            return obj.owner == request.user

        # else permission for hasjoined (in order to leave the community)
        return obj.members.filter(username=request.user.username).exists()

class IsOwner(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        # check if user who launched request is object owner
        return obj.owner == request.user