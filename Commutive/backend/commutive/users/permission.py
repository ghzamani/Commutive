from rest_framework import permissions

class IsUser(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        # check if user who launched request is object owner
        if request.method=="DELETE" or request.method=="PUT":
            return (obj.username == request.user.username)
        return True
