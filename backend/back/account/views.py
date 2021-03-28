from rest_framework.generics import GenericAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from knox.models import AuthToken
from .serializer import UserSerializer,MessageSerializer,UserStatusSerializer, RegisterSerializer, LoginSerializer, ProfileSerializer, ImageSerializer, UserPasswordSerializer, ProfileAccessSerializer
from rest_framework import permissions
from .models import Profile, image, Message, ProfileAccess
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from .backend import IsOwnerFilterBackend
from rest_framework import filters
from django.contrib.auth.models import User
from rest_framework.generics import RetrieveAPIView
from django.dispatch import receiver
from django_rest_passwordreset.signals import reset_password_token_created
from rest_framework.views import APIView
from rest_framework import parsers, renderers, status
from .serializer import CustomTokenSerializer
from django_rest_passwordreset.models import ResetPasswordToken
from django_rest_passwordreset.views import get_password_reset_token_expiry_time
from django.utils import timezone
from datetime import timedelta

from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string




class RegisterAPI(GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = AuthToken.objects.create(user)[1]
        return Response({
            "user": UserSerializer(user,
                                   context=self.get_serializer_context()).data,
            "token": token
        })


class LoginAPI(GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        token = AuthToken.objects.create(user)[1]
        return Response({
            "user": UserSerializer(user,
                                   context=self.get_serializer_context()).data,
            "token": token
        })


class UserProfileAPI(ModelViewSet):
    permission_classes = (IsAuthenticated,)

    filter_backends = [DjangoFilterBackend, IsOwnerFilterBackend]
    filterset_fields = ['teamName', ]

    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UserAPIUpdate(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserPasswordSerializer

class MessageAPIView(ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    filter_backends = [IsOwnerFilterBackend, DjangoFilterBackend]

class UserListProfileAPI(ModelViewSet):
    permission_classes = (IsAuthenticated,)
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['username', ]
    filterset_fields = ['profile__teamName', "id", "username"]

    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_object(self):
        return self.request.user


class UserStatusAPI(RetrieveAPIView):
    serializer_class = UserStatusSerializer
    queryset = User.objects.all()

    def get_object(self):
        return self.request.user


class UserAPI(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    filter_backends = [IsOwnerFilterBackend, ]

    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_object(self):
        return self.request.user


class ImageChangeAPI(ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    filter_backends = [IsOwnerFilterBackend, ]
    serializer_class = ImageSerializer
    queryset = image.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ProfileAccessAPI(ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    filter_backends = [DjangoFilterBackend, ]
    serializer_class = ProfileAccessSerializer
    queryset = ProfileAccess.objects.all()
    filterset_fields = ['user',]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class UserImageAPI(ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = ImageSerializer
    queryset = image.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CustomPasswordResetView:

    @receiver(reset_password_token_created)
    def password_reset_token_created(sender, reset_password_token, *args, **kwargs):
        """
          Handles password reset tokens
          When a token is created, an e-mail needs to be sent to the user
        """
        # send an e-mail to the user
        site_url = "http://localhost:8001"
        site_shortcut_name= "http://localhost:8001"
        site_full_name="http://localhost:8001"
        context = {
            'current_user': reset_password_token.user,
            'username': reset_password_token.user.username,
            'email': reset_password_token.user.email,
            'reset_password_url': "{}/validate_token/{}".format(site_url, reset_password_token.key),
            'site_name': site_shortcut_name,
            'site_domain': site_url
        }

        # render email text
        email_html_message = render_to_string('email/user_reset_password.html', context)
        email_plaintext_message = render_to_string('email/user_reset_password.txt', context)

        msg = EmailMultiAlternatives(
            # title:
            "Password Reset for {}".format(site_full_name),
            # message:
            email_plaintext_message,
            # from:
            "noreply@{}".format(site_url),
            # to:
            [reset_password_token.user.email]
        )
        msg.attach_alternative(email_html_message, "text/html")
        msg.send()


class CustomPasswordTokenVerificationView(APIView):
    """
      An Api View which provides a method to verifiy that a given pw-reset token is valid before actually confirming the
      reset.
    """
    throttle_classes = ()
    permission_classes = ()
    parser_classes = (parsers.FormParser, parsers.MultiPartParser, parsers.JSONParser,)
    renderer_classes = (renderers.JSONRenderer,)
    serializer_class = CustomTokenSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        token = serializer.validated_data['token']

        # get token validation time
        password_reset_token_validation_time = get_password_reset_token_expiry_time()

        # find token
        reset_password_token = ResetPasswordToken.objects.filter(key=token).first()

        if reset_password_token is None:
            return Response({'status': 'invalid'}, status=status.HTTP_404_NOT_FOUND)

        # check expiry date
        expiry_date = reset_password_token.created_at + timedelta(hours=password_reset_token_validation_time)

        if timezone.now() > expiry_date:
            # delete expired token
            reset_password_token.delete()
            return Response({'status': 'expired'}, status=status.HTTP_404_NOT_FOUND)

        # check if user has password to change
        if not reset_password_token.user.has_usable_password():
            return Response({'status': 'irrelevant'})

        return Response({'status': 'OK'})