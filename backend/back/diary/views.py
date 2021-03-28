from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .serializer import DiarySerializer
from .models import Diary
from .permissions import IsOwnerOrReadOnly
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from .backend import IsOwnerFilterBackend
from django_filters import rest_framework as filters
from rest_framework.response import Response
from rest_framework import filters
# Create your views here.


class diaryViewset(ModelViewSet):
    serializer_class = DiarySerializer
    queryset = Diary.objects.all().order_by('-posted_date')
    filter_backends = (IsOwnerFilterBackend, filters.SearchFilter,)
    permission_classes = (IsOwnerOrReadOnly, IsAuthenticated,)
    search_fields = ['title', 'posted_date']

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
