from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .serializer import PostSerializer, PostCommentSerializer
from .models import Posts, PostComment
from rest_framework.permissions import IsAuthenticated
from diary.permissions import IsOwnerOrReadOnly
from diary.backend import IsOwnerFilterBackend
from rest_framework.response import Response
from rest_framework import filters
from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend


class PostViewset(ModelViewSet):
    queryset = Posts.objects.all()
    serializer_class = PostSerializer
    permission_classes = (IsOwnerOrReadOnly,IsAuthenticated)
    filter_backends = [IsOwnerFilterBackend, ]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PostAllUserViewset(ModelViewSet):
    queryset = Posts.objects.all()
    serializer_class = PostSerializer
    permission_classes = (IsOwnerOrReadOnly,IsAuthenticated,)
    filter_backends = [filters.SearchFilter, DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['user']
    ordering = ['-id']

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)



class PostCommentViewset(ModelViewSet):
    serializer_class = PostCommentSerializer
    queryset = PostComment.objects.all()
    permission_classes = (IsAuthenticated,)


