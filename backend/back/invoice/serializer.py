from account.models import Profile, image
from .models import InvoiceAdd, InvoiceProjectJoin, Notifications, Subs, AllignDashboard
from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer, SerializerMethodField


class InvoiceSerializer(ModelSerializer):

    class Meta:
        model = InvoiceAdd
        fields = ('id', 'user', 'invoice', 'requested_by')

class AllignDashboardSerializer(ModelSerializer):
    user = SerializerMethodField(read_only=True)

    class Meta:
        model = AllignDashboard
        fields = '__all__'

    def get_user(self, obj):
        return str(obj.user.username)

class SubsSerializer(ModelSerializer):

    class Meta:
        model = Subs
        fields = '__all__'

class InvoiceProjectJoinSerializer(ModelSerializer):

    class Meta:
        model = InvoiceProjectJoin
        fields = '__all__'

class NotificationsSerializer(ModelSerializer):
    class Meta:
        model= Notifications
        fields = '__all__'



class ProfileSerializer(ModelSerializer):

    class Meta:
        model = Profile
        fields = ('id', 'teamName')


class ImageSerializer(ModelSerializer):

    class Meta:
        model = image
        fields = ('id', 'image')





class AddUserListSerializer(ModelSerializer):
    image = ImageSerializer()
    profile = ProfileSerializer()
    useradd = InvoiceSerializer(required=False, many=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'image', 'profile', 'useradd')

    def get_user(self, obj):
        return str(obj.user.username)


class AddUserInvoiceSerializer(ModelSerializer):
    user = SerializerMethodField(read_only=True)

    class Meta:
        model = Profile
        fields = ('id', 'user', 'teamName',)

    def get_user(self, obj):
        return str(obj.user.username)
