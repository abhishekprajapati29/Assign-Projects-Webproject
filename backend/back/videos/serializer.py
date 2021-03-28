from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Video


class VideoSerializer(ModelSerializer):
    user = SerializerMethodField(read_only=True)
    video_count = SerializerMethodField()

    class Meta:
        model = Video
        fields = '__all__'

    def get_user(self, obj):
        return str(obj.user.username)

    def get_video_count(self, obj):
        return Video.objects.count()