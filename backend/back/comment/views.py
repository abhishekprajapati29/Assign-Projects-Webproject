from django.shortcuts import render
from .serializer import CommentSerializer
from rest_framework.viewsets import ModelViewSet
from .serializer import ChatSerializer
from .models import Comment
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters


class CommentAPI(ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    filterset_fields = ['teamName', ]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ChatAPI(ModelViewSet):
    serializer_class = ChatSerializer
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)
