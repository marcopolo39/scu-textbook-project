from rest_framework import generics, permissions
from django.contrib.auth import get_user_model
from .serializers import MessageSerializer, MessageListSerializer, CreateChatSerializer
from .models import Message, Chat
from django.core.exceptions import ObjectDoesNotExist

User = get_user_model()


class MessageDetailView(generics.ListCreateAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = MessageSerializer

    def get_queryset(self):
        chat = Chat.objects.filter(members__username=self.request.user.username).filter(
            members__username=self.request.query_params.get('send_to', None))[0]
        messages = Message.objects.filter(chat=chat)
        return messages

    def perform_create(self, serializer):
        recipient = User.objects.filter(username=self.request.data['send_to'])[0]
        chat = Chat.objects.filter(members__username=self.request.user.username).filter(members__username=recipient.username)[0]
        serializer.save(sender=self.request.user, receiver=recipient, chat=chat)


class ChatListView(generics.ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = MessageListSerializer

    def get_queryset(self):
        my_chats = self.request.user.chats.all()
        contacts = User.objects.none()
        for chat in my_chats:
            contacts = contacts | chat.members.exclude(username=self.request.user.username)
        return contacts


class ChatCreateView(generics.CreateAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = CreateChatSerializer
    queryset = Chat.objects.all()

    def perform_create(self, serializer):
        recipient = User.objects.filter(username=self.request.data['members'][0])[0]
        serializer.save(members=[self.request.user.id, recipient.id])