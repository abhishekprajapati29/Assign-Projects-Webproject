from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, image, Message, ProfileAccess
from django.contrib.auth import authenticate
from rest_framework.serializers import CharField, ValidationError, SerializerMethodField


class ProfileSerializer(serializers.ModelSerializer):
    user = SerializerMethodField(read_only=True)
    email = SerializerMethodField(read_only=True)

    class Meta:
        model = Profile
        fields = ('id', 'user', 'location', 'teamName','team_image','background_image', 'email',
                  'phone_number', 'designation', 'about_me','gender','address','occupation', 'skills', 'jobs')

    def get_user(self, obj):
        return str(obj.user.username)

    def get_email(self, obj):
        return str(obj.user.email)


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'


class CustomTokenSerializer(serializers.Serializer):
    token = serializers.CharField()


class ProfileAccessSerializer(serializers.ModelSerializer):
    user = SerializerMethodField(read_only=True)

    class Meta:
        model = ProfileAccess
        fields = '__all__'

    def get_user(self, obj):
        return str(obj.user.username)


class ImageSerializer(serializers.ModelSerializer):
    user = SerializerMethodField(read_only=True)

    class Meta:
        model = image
        fields = '__all__'

    def get_user(self, obj):
        return str(obj.user.username)


class UserPasswordSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            'password',
        )

        extra_kwargs = {
            "password": {"write_only": True},
        }

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()
    image = ImageSerializer()

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'profile', 'image')



class UserStatusSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class RegisterSerializer(serializers.ModelSerializer):
    password1 = CharField()

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'password1')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password'],
        )
        return user

    def validate_password1(self, value):
        data = self.get_initial()
        password = data.get('password')
        password1 = value
        if password != password1:
            raise ValidationError("Password must Match")
        return value

    def validate(self, data):
        email = data['email']
        user_qs = User.objects.filter(email=email)
        if user_qs.exists():
            raise ValidationError("Email already Exists")
        return data


class LoginSerializer(serializers.ModelSerializer):
    username = CharField()
    password = CharField()

    class Meta:
        model = User
        fields = ('username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Invalid Username and Password!")
