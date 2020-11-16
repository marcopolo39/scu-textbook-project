from rest_framework import generics, permissions
from django.contrib.auth import get_user_model
from .serializers import MessageSerializer, MessageListSerializer
from .models import Messages

User = get_user_model()


class MessageDetailView(generics.ListCreateAPIView):

    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = MessageSerializer

    def get_queryset(self):
        user = User.objects.filter(username=self.request.data['send_to'])[0]
        messages_sent = self.request.user.sender.filter(receiver=user.id)
        messages_received = self.request.user.recipient.filter(sender=user.id)
        all_messages = messages_sent | messages_received
        return all_messages

    def perform_create(self, serializer):
        recipient = User.objects.filter(username=self.request.data['send_to'])[0]
        serializer.save(sender=self.request.user, receiver=recipient)


class MessageListView(generics.ListAPIView):

    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = MessageListSerializer

    def get_queryset(self):
        messages_sent = self.request.user.sender.all()
        messages_received = self.request.user.recipient.all()
        all_messages = messages_sent | messages_received
        contacts = {}
        for message in all_messages:
            if message.sender is not self.request.user and message.sender not in contacts:
                contacts[message.sender] = message.sender.username
            if message.receiver is not self.request.user and message.receiver not in contacts:
                contacts[message.receiver] = message.receiver.username
        print(contacts)
        return contacts


