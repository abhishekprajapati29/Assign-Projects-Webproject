from django.db import models
from django.conf import settings


class Posts(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    posted_id = models.CharField(max_length=50,blank=True, null=True)
    img = models.ImageField(upload_to='posts', blank=True, null=True)
    content = models.TextField(max_length=800, blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.posted_id
    
class PostComment(models.Model):
    user = models.ForeignKey(Posts, related_name='post_comment', on_delete=models.CASCADE)
    comment_content = models.TextField(max_length=1000)
    commented_by = models.CharField(max_length=500)
    comment_timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.commented_by
    

