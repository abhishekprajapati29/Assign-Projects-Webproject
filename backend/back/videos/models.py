from django.db import models
from datetime import datetime
# Create your models here.
from django.db import models
from django.contrib.auth.models import User


class Video(models.Model):
    user = models.ForeignKey(User, related_name="video",
                             on_delete=models.CASCADE)
    title = models.CharField(max_length=500, blank=True, null=True)
    Video = models.FileField(upload_to="Video", blank=False, null=False)
    type = models.CharField(max_length=50, default="")
    size = models.IntegerField(default=0)
    favourite = models.BooleanField(default=False)
    timestamp = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return self.title
