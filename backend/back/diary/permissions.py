from rest_framework.permissions import BasePermission
import datetime


class IsOwnerOrReadOnly(BasePermission):
    message = 'You mus be the owmer of the object'
    my_safe_method = ['PUT', ]

    def has_object_permission(self, request, view, obj):
        if request.method in self.my_safe_method:
            return True
        return obj.user == request.user
