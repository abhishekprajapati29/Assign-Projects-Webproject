from django.db import models
from django.contrib.auth.models import User
import datetime


class InvoiceAdd(models.Model):
    user = models.ForeignKey(
        User, related_name='useradd', on_delete=models.CASCADE)
    invoice = models.CharField(max_length=60, default=" Invoice")
    requested_by = models.IntegerField(default=-1)


class InvoiceProjectJoin(models.Model):
    user = models.ForeignKey(
        User, related_name='memadd', on_delete=models.CASCADE)
    requested_by = models.CharField(max_length=50)
    invoice = models.CharField(max_length=60, default="Mem Invoice")
    message= models.CharField(max_length=60, default="Mem Invoice")
    project_name_to_join = models.CharField(max_length=100)
    project_number = models.IntegerField(default=-1)
    timestamp = models.DateTimeField(default=datetime.datetime.now())


class Notifications(models.Model):
    user = models.ForeignKey(
        User, related_name='notification', on_delete=models.CASCADE)
    posted_by = models.CharField(max_length=50)
    content = models.CharField(max_length=60, default="notification")
    timestamp = models.DateTimeField(default=datetime.datetime.now())


class Subs(models.Model):
    username= models.CharField(max_length=50,default=" ")
    status= models.CharField(max_length=50,default=" ")
    order_id= models.CharField(max_length=50,default=" ")
    amount= models.CharField(max_length=50,default=" ")
    bank_name= models.CharField(max_length=50,default=" ")
    transaction_id= models.CharField(max_length=50,default=" ")
    txn_date= models.CharField(max_length=50,default=datetime.datetime.now())

    def __str__(self):
        return self.username

class AllignDashboard(models.Model):
    user = models.ForeignKey(
        User, related_name='AllignDashboard', on_delete=models.CASCADE)
    todo = models.BooleanField(default=True)
    team = models.BooleanField(default=True)
    diary = models.BooleanField(default=True)
    post = models.BooleanField(default=True)




