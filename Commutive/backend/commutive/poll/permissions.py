from rest_framework import permissions

class HasJoined(permissions.BasePermission): 

    def has_object_permission(self, request, view, obj):
        mems = obj.members
        return mems.filter(username=request.user.username).exists()

# class HasJoinedOrReadOnly(permissions.BasePermission):
#     def has_object_permission(self, request, view, obj):
#         if request.method in permissions.SAFE_METHODS:
#             return True

#         mems = obj.members
#         return mems.filter(username=request.user.username).exists()        


class IsOwner(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        # check if user who launched request is object owner
        return obj.owner == request.user

# class IsOwnerOrAuthorOrIsJoined(permissions.BasePermission):

#     def has_object_permission(self, request, view, obj):
#         # check if user who launched request is object owner
#         if request.method=="PUT" or request.method=="DELETE":
#             return (obj.communityID.owner == request.user) or (obj.author==request.user)
#         mems = obj.communityID.members
#         return mems.filter(username=request.user.username).exists()