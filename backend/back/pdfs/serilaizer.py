from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import File


class FileSerializer(ModelSerializer):
    user = SerializerMethodField(read_only=True)

    class Meta:
        model = File
        fields = '__all__'

    def get_user(self, obj):
        return str(obj.user.username)
