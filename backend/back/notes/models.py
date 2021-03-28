from django.db import models
from django.contrib.auth.models import User
from datetime import datetime
# Create your models here.

class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    note_title= models.CharField(max_length=50)
    note_content = models.TextField(max_length=500)
    timestamp = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return self.note_title


class NoteChip(models.Model):
    notechip = models.ForeignKey(Note, related_name="notechip", on_delete= models.CASCADE)
    note_chips = models.CharField(max_length=30, default='asdf')
    