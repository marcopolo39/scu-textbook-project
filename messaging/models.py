from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Chat(models.Model):
    members = models.ManyToManyField(User, related_name='chats')

    def __str__(self):
        return '{}'.format(' <-> '.join(self.members.all().values_list('username', flat=True)))


class Message(models.Model):
    sender = models.ForeignKey(get_user_model(), related_name='sender', on_delete=models.CASCADE)
    receiver = models.ForeignKey(get_user_model(), related_name='recipient', on_delete=models.CASCADE)
    message = models.CharField(max_length=1500)
    timestamp = models.DateTimeField(auto_now=True)
    chat = models.ForeignKey(Chat, related_name='chat', on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.sender.username + " -> " + self.receiver.username

    class Meta:
        ordering = ['-timestamp']


