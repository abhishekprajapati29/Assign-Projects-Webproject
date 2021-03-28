from django.db import models
from datetime import datetime
# Create your models here.
from django.conf import settings


class todo(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, default="AnonymousUser",
                             on_delete=models.CASCADE)
    title = models.CharField(max_length=20)
    description = models.TextField(max_length=400)
    completed = models.BooleanField(default=False)
    timestamp = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return self.title


class TodoChip(models.Model):
    todochip = models.ForeignKey(todo, related_name="todochip", on_delete= models.CASCADE)
    chips = models.CharField(max_length=30, default='asdf')
