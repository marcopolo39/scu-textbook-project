from rest_framework import permissions

class isTextbookOwnerPermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user # might need get_user here??