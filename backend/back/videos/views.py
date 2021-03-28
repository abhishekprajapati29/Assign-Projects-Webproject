from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .serializer import VideoSerializer
from .models import Video
from diary.permissions import IsOwnerOrReadOnly
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from diary.backend import IsOwnerFilterBackend
from django_filters import rest_framework as filters
from rest_framework.response import Response
from rest_framework import filters
# Create your views here.


class VideoViewset(ModelViewSet):
    serializer_class = VideoSerializer
    queryset = Video.objects.all()
    filter_backends = [filters.SearchFilter,
                       DjangoFilterBackend, IsOwnerFilterBackend, ]
    filterset_fields = ['favourite','timestamp', ]
    permission_classes = (IsOwnerOrReadOnly, IsAuthenticated,)
    search_fields = ['title', ]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


    