from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Diary


class DiarySerializer(ModelSerializer):
    user = SerializerMethodField(read_only=True)

    class Meta:
        model = Diary
        fields = '__all__'

    def get_user(self, obj):
        return str(obj.user.username)
