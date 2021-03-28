from django.shortcuts import render
from .serializer import AddUserInvoiceSerializer,InvoiceSerializer,SubsSerializer, AllignDashboardSerializer, NotificationsSerializer, NotificationsSerializer, AddUserListSerializer, ProfileSerializer, InvoiceProjectJoinSerializer
from rest_framework.viewsets import ModelViewSet
from account.models import Profile
from .models import InvoiceAdd, InvoiceProjectJoin, Notifications, Subs, AllignDashboard
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from .backend import IsOwnerFilterBackend


class InvoiceAPI(ModelViewSet):
    serializer_class = InvoiceSerializer
    queryset = InvoiceAdd.objects.all()


class AllignDashboardAPI(ModelViewSet):
    serializer_class = AllignDashboardSerializer
    queryset = AllignDashboard.objects.all()
    permission_classes = (IsAuthenticated,)

    filter_backends = [IsOwnerFilterBackend, ]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class SubsAPI(ModelViewSet):
    serializer_class = SubsSerializer
    queryset = Subs.objects.all()
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    filterset_fields = ['username', ]


class NotificationAPI(ModelViewSet):
    serializer_class = NotificationsSerializer
    queryset = Notifications.objects.all()
    filter_backends = [filters.SearchFilter, IsOwnerFilterBackend]

class AddAPI(ModelViewSet):
    serializer_class = AddUserInvoiceSerializer
    queryset = Profile.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ProfileAPI(ModelViewSet):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

class InvoiceProjectJoinAPI(ModelViewSet):
    serializer_class = InvoiceProjectJoinSerializer
    queryset = InvoiceProjectJoin.objects.all()
    permission_classes = (IsAuthenticated,)
    filter_backends = [filters.SearchFilter, IsOwnerFilterBackend]

class AddUserListAPIView(ModelViewSet):
    serializer_class = AddUserListSerializer
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    filterset_fields = ['profile__teamName',]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
