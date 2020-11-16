from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Messages

User = get_user_model()


class MessageSerializer(serializers.ModelSerializer):

    sender = serializers.StringRelatedField()
    receiver = serializers.StringRelatedField()

    class Meta:
        model = Messages
        fields = ('sender', 'receiver', 'message', 'timestamp')


class MessageListSerializer(serializers.Serializer):

    username = serializers.CharField()