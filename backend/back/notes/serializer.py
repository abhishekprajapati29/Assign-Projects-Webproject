from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Note, NoteChip

class NoteChipSerializer(ModelSerializer):
    class Meta:
        model = NoteChip
        fields = '__all__'


class NoteSerializer(ModelSerializer):
    user = SerializerMethodField(read_only=True)
    notechip = NoteChipSerializer(read_only=True,many=True)

    class Meta:
        model = Note
        fields = '__all__'

    def get_user(self, obj):
        return str(obj.user.username)
