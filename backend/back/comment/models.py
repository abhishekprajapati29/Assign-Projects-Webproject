from django.db import models
from django.contrib.auth.models import User


class Comment(models.Model):
    user = models.ForeignKey(
        User, related_name='comment', on_delete=models.CASCADE)
    teamName = models.CharField(max_length=50, default="")
    message = models.TextField(max_length=450, default=' ')
    timestamp = models.DateTimeField(auto_now_add=True)
