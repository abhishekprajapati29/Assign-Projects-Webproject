from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Comment
from account.models import image
from django.contrib.auth.models import User

class CommentSerializer(ModelSerializer):
    user = SerializerMethodField()

    class Meta:
        model = Comment
        fields = '__all__'

    def get_user(self, obj):
        return str(obj.user.username)

class ImageSerializer(ModelSerializer):

    class Meta:
        model = image
        fields = ('id', 'image')

class ChatSerializer(ModelSerializer):
    image = ImageSerializer()
    comment = CommentSerializer(required=False, many=True)

    class Meta:
        model = User
        fields = ('id', 'image', 'comment')

