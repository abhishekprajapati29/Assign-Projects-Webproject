from django.db import models
from django.conf import settings
# Create your models here.
import datetime
now = datetime.datetime.now()


class Diary(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    title = models.CharField(max_length=150, default='')
    text = models.TextField()
    posted_date = models.DateTimeField(
        auto_now_add=True, blank=True, null=True)
