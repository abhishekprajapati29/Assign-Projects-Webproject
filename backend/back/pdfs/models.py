from django.db import models
from django.contrib.auth.models import User
from datetime import datetime

class File(models.Model):
    user = models.ForeignKey(User, related_name="file",
                             on_delete=models.CASCADE)
    title = models.CharField(max_length=500, blank=True, null=True)
    file = models.FileField(upload_to="File", blank=False, null=False)
    type = models.CharField(max_length=50, default="")
    size = models.IntegerField(default=0)
    favourite = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
