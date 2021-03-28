from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .serilaizer import FileSerializer
from .models import File
from diary.permissions import IsOwnerOrReadOnly
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from diary.backend import IsOwnerFilterBackend
from django_filters import rest_framework as filters
from rest_framework.response import Response
from rest_framework import filters
# Create your views here.


class FileViewset(ModelViewSet):
    serializer_class = FileSerializer
    queryset = File.objects.all()
    filter_backends = [filters.SearchFilter, DjangoFilterBackend,IsOwnerFilterBackend,]
    filterset_fields = ['favourite', ]
    permission_classes = (IsOwnerOrReadOnly, IsAuthenticated,)
    search_fields = ['title', ]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
