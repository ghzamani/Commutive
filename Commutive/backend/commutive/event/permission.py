from rest_framework import permissions

class HasJoined(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        mems = obj.members
        return mems.filter(username=request.user.username).exists()


class IsOwnerOrHasJoined(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.method == "POST":
            return (obj.owner == request.user)
        mems = obj.members
        return mems.filter(username=request.user.username).exists()