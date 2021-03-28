from rest_framework.permissions import AllowAny
from .models import Images, ImageList
from .serializer import ImageFolderSerializer, ImageListSerializer
from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from diary.backend import IsOwnerFilterBackend
from diary.permissions import IsOwnerOrReadOnly
from rest_framework.permissions import IsAuthenticated
from django_filters import rest_framework as filters
from rest_framework.response import Response
from rest_framework import filters


class ImagesFolderViewset(ModelViewSet):
    serializer_class = ImageFolderSerializer
    queryset = Images.objects.all()
    filter_backends = [filters.SearchFilter,
                       DjangoFilterBackend, IsOwnerFilterBackend,filters.SearchFilter, ]
    search_fields = ['title',]
    filterset_fields = ['favourite', ]
    permission_classes = (IsOwnerOrReadOnly, IsAuthenticated,)
    


    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ImagesListViewset(ModelViewSet):
    serializer_class = ImageListSerializer
    queryset = ImageList.objects.all()
    filter_backends = [filters.SearchFilter,
                       DjangoFilterBackend,]
    filterset_fields = ['favourite', ]
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


