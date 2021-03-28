from django.db import models
from django.conf import settings
# Create your models here.
from datetime import datetime


class Images(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    image = models.ImageField(upload_to='image')
    title = models.CharField(max_length=60)
    update_date = models.DateField(auto_now=True, auto_now_add=False)
    timestamp = models.DateTimeField(default=datetime.now)
    favourite = models.BooleanField(default=False)

    def __str__(self):
        return self.title


class ImageList(models.Model):
    album_id = models.ForeignKey(
        Images, related_name="imagelist", on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE, default=1) 
    src = models.ImageField(upload_to='imageslist')
    thumbnail = models.ImageField(upload_to='imageslist', default="")
    thumbnailWidth = models.IntegerField(default=320)
    thumbnailHeight = models.IntegerField(default=174)
    size = models.IntegerField(default=0)
    caption = models.CharField(default="", max_length=50)
    timestamp = models.DateTimeField(auto_now_add=True)
    favourite = models.BooleanField(default=False)

    def __str__(self):
        return self.caption
    
