from rest_framework import generics, permissions
from django.contrib.auth import get_user_model
from .serializers import MessageSerializer

User = get_user_model()


class MessageView(generics.ListCreateAPIView):

    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = MessageSerializer

    def get_queryset(self):
        user = User.objects.filter(
            username=self.request.query_params.get('send_to', None))[0]

        messages_sent = self.request.user.sender.filter(receiver=user.id)
        messages_received = self.request.user.recipient.filter(sender=user.id)
        all_messages = messages_sent | messages_received
        return all_messages

    def perform_create(self, serializer):
        recipient = User.objects.filter(
            username=self.request.data['send_to'])[0]
        serializer.save(sender=self.request.user, receiver=recipient)
