from django.shortcuts import render
from rest_framework import filters
from rest_framework import mixins
from rest_framework import status
from rest_framework.response import Response
from .models import ProjectCreateChip, ProjectCreate, ProjectTask, ProjectBugs, ProjectFile,ProjectReport, ProjectActivity, ProjectMember
from .serializer import ProjectCreateChipSerialzier, ProjectCreateSerializer, ProjectTaskSerialzier, ProjectFileSerialzier, ProjectBugsSerialzier, ProjectReportSerialzier,ProjectActivitySerialzier, ProjectMemberSerialzier
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.viewsets import ModelViewSet
from rest_framework import viewsets
from .permissions import IsOwnerOrReadOnly
from .backend import IsOwnerFilterBackend, IsTaskFilterBackend

class ProjectCreateViewSet(ModelViewSet):
    serializer_class = ProjectCreateSerializer
    queryset = ProjectCreate.objects.all().order_by('-id')
    filter_backends = (filters.SearchFilter,IsOwnerFilterBackend)
    permission_classes = ( IsAuthenticated,)
    search_fields = '__all__'

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ProjectCreateAllViewSet(ModelViewSet):
    serializer_class = ProjectCreateSerializer
    queryset = ProjectCreate.objects.all().order_by('-id')
    filter_backends = (filters.SearchFilter,)
    permission_classes = ( IsAuthenticated,)
    search_fields = '__all__'

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ProjectMemberyViewSet(ModelViewSet):
    serializer_class = ProjectMemberSerialzier
    queryset = ProjectMember.objects.all().order_by('-id')
    filter_backends = (filters.SearchFilter,)
    permission_classes = ( IsAuthenticated,)
    search_fields = '__all__'

class ProjectActivityViewSet(ModelViewSet):
    serializer_class = ProjectActivitySerialzier
    queryset = ProjectActivity.objects.all().order_by('-id')
    filter_backends = (filters.SearchFilter,)
    permission_classes = ( IsAuthenticated,)
    search_fields = '__all__'

class ProjectReportViewSet(ModelViewSet):
    serializer_class = ProjectReportSerialzier
    queryset = ProjectReport.objects.all().order_by('-id')
    filter_backends = (filters.SearchFilter,)
    permission_classes = ( IsAuthenticated,)
    search_fields = '__all__'

class ProjectFileViewSet(ModelViewSet):
    serializer_class = ProjectFileSerialzier
    queryset = ProjectFile.objects.all().order_by('-id')
    filter_backends = (filters.SearchFilter,)
    search_fields = '__all__'

class ProjectBugsViewSet(ModelViewSet):
    serializer_class = ProjectBugsSerialzier
    queryset = ProjectBugs.objects.all().order_by('-id')
    filter_backends = (filters.SearchFilter,IsTaskFilterBackend)
    permission_classes = ( IsAuthenticated,)
    search_fields = ['bugs', "id"]

class ProjectOwnerBugsViewSet(ModelViewSet):
    serializer_class = ProjectBugsSerialzier
    queryset = ProjectBugs.objects.all().order_by('-id')
    permission_classes = ( IsAuthenticated,)

class ProjectTaskViewSet(ModelViewSet):
    serializer_class = ProjectTaskSerialzier
    queryset = ProjectTask.objects.all().order_by('-id')
    filter_backends = (filters.SearchFilter,IsTaskFilterBackend)
    permission_classes = ( IsAuthenticated,)
    filterset_fields = ['tasks', "id"]
    search_fields = ['tasks', "id"]


class ProjectOwnerTaskViewSet(ModelViewSet):
    serializer_class = ProjectTaskSerialzier
    queryset = ProjectTask.objects.all().order_by('-id')
    permission_classes = ( IsAuthenticated,)

class ProjectChipViewSet(mixins.CreateModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = ProjectCreateChipSerialzier
    queryset = ProjectCreateChip.objects.all()
    search_fields = ('chips','ProjectCreatechip')

    def create(self, request, *args, **kwargs):
        is_many = isinstance(request.data, list)
        if not is_many:
            return super(ProjectChipViewSet, self).create(request, *args, **kwargs)
        else:
            serializer = self.get_serializer(data=request.data, many=True)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)