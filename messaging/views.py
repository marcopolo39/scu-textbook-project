from .models import Messages
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from .serializers import MessageSerializer

User = get_user_model()


class MessageView(generics.ListCreateAPIView):

    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = MessageSerializer


    def get_queryset(self):
        print(self.request.data)
        messages_sent = self.request.user.sender.filter(receiver=self.request.data['send_to'])
        messages_received = self.request.user.recipient.filter(sender=self.request.data['send_to'])
        all_messages = messages_sent | messages_received
        return all_messages

