from django.db import models
from django.contrib.auth import get_user_model


# Create your models here.
class Messages(models.Model):
    sender = models.ForeignKey(get_user_model(), related_name='sender', on_delete=models.CASCADE)
    receiver = models.ForeignKey(get_user_model(), related_name='recipient', on_delete=models.CASCADE)
    message = models.CharField(max_length=1500)
    timestamp = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.sender.username + " -> " + self.receiver.username

    def getRecieverUsername(self):
        return self.receiver.username
