from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Posts, PostComment
from diary.permissions import IsOwnerOrReadOnly


class PostCommentSerializer(ModelSerializer):

    class Meta:
        model = PostComment
        fields = '__all__'

class PostSerializer(ModelSerializer):
    user = SerializerMethodField(read_only=True)
    post_comment = PostCommentSerializer(required=False, many=True)
    comment_count = SerializerMethodField()
    
    class Meta:
        model= Posts
        fields = ('id', 'user', 'posted_id', 'img', 'content', 'timestamp', 'post_comment','comment_count')

    def get_user(self, obj):
        return str(obj.user.username)

    def get_comment_count(self, obj):
        return obj.post_comment.count()


