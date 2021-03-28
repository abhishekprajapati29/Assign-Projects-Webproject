from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework import viewsets
from .serializer import NoteChipSerializer, NoteSerializer
from .models import Note, NoteChip
from .permissions import IsOwnerOrReadOnly
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from .backend import IsOwnerFilterBackend
from rest_framework import filters
from rest_framework import mixins
from rest_framework import status
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
# Create your views here.


class NoteViewset(ModelViewSet):
    serializer_class = NoteSerializer
    queryset = Note.objects.all().order_by('-id')
    filter_backends = (IsOwnerFilterBackend,filters.SearchFilter,DjangoFilterBackend,)
    permission_classes = (IsOwnerOrReadOnly, IsAuthenticated,)
    filterset_fields = ['timestamp', ]
    search_fields = ['note_title', 'note_content','timestamp']

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class NoteChipViewSet(mixins.CreateModelMixin, mixins.ListModelMixin, mixins.DestroyModelMixin, viewsets.GenericViewSet):
    serializer_class = NoteChipSerializer
    queryset = NoteChip.objects.all()
    search_fields = ('chips','notechip')

    def create(self, request, *args, **kwargs):
        """
        #checks if post request data is an array initializes serializer with many=True
        else executes default CreateModelMixin.create function 
        """
        is_many = isinstance(request.data, list)
        if not is_many:
            return super(NoteChipViewSet, self).create(request, *args, **kwargs)
        else:
            serializer = self.get_serializer(data=request.data, many=True)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)