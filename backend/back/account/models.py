from django.db import models
from django.contrib.auth.models import User
import datetime


class Profile(models.Model):
    user = models.OneToOneField(
        User, related_name='profile', on_delete=models.CASCADE)
    teamName = models.CharField(max_length=50, default='default_team_name')
    team_image = models.ImageField(
        upload_to="team_image", default="/default/default-team-avatar.png")
    background_image = models.ImageField(
        upload_to="profile_bg_image", default="/default/profile-bg.jpg")
    location = models.CharField(
        max_length=70, blank=True, null=True, default="")
    phone_number = models.IntegerField(default=0)
    designation = models.CharField(max_length=20, default="")
    about_me = models.TextField(
        max_length=500, default="", blank=True, null=True)
    gender = models.CharField(default="", max_length=10)
    address = models.CharField(default='', max_length=500)
    occupation = models.CharField(default="", max_length=100)
    skills = models.CharField(default="", max_length=100)
    jobs = models.CharField(default="", max_length=100)


    def __str__(self):
        return self.user.username


class ProfileAccess(models.Model):
    user = models.ForeignKey(
        User, related_name='allow', on_delete=models.CASCADE)
    post = models.BooleanField(default=True)
    images = models.BooleanField(default=True)
    info = models.BooleanField(default=True)



class image(models.Model):
    user = models.OneToOneField(
        User, related_name='image', on_delete=models.CASCADE)
    image = models.ImageField(
        upload_to="user_image/%Y/%m/%d/", default="/default/download_1.jpeg")


class Message(models.Model):
    user = models.ForeignKey(
        User, related_name='message', on_delete=models.CASCADE)
    message= models.CharField(max_length=1000)
    message_by = models.CharField(max_length=100)
    timestamp = models.DateTimeField(default=datetime.datetime.now())
