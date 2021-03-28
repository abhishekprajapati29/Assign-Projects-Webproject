from rest_framework.serializers import ModelSerializer, SerializerMethodField, HyperlinkedModelSerializer
from .models import Images, ImageList


class ImageListSerializer(ModelSerializer):
    user = SerializerMethodField(read_only=True)
    class Meta:
        model = ImageList
        fields = (
            'id',
            'user',
            'album_id',
            'src',
            'thumbnail',
            'thumbnailWidth',
            'thumbnailHeight',
            'caption',
            'size',
            'favourite'
        )
        
    def get_user(self, obj):
        return str(obj.user.username)


class ImageFolderSerializer(ModelSerializer):
    user = SerializerMethodField(read_only=True)
    imagelist = ImageListSerializer(required=False, many=True)

    class Meta:
        model = Images
        fields = ('id', 'user', 'title','timestamp', 'image', 'imagelist', 'favourite')

    def get_user(self, obj):
        return str(obj.user.username)
