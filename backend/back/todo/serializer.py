from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import todo, TodoChip


class TodoChipSerializer(ModelSerializer):
    class Meta:
        model = TodoChip
        fields = '__all__'


class TodoSerializer(ModelSerializer):
    user = SerializerMethodField(read_only=True)
    todochip = TodoChipSerializer(read_only=True,many=True)

    class Meta:
        model = todo
        fields = '__all__'

    def get_user(self, obj):
        return str(obj.user.username)
