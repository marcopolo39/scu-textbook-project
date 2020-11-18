from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Message, Chat

User = get_user_model()


class MemberSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', )


class CreateChatSerializer(serializers.ModelSerializer):

    members = serializers.SlugRelatedField(many=True, slug_field='username', queryset=User.objects.all())

    class Meta:
        model = Chat
        fields = ('members',)

    def create(self, validated_data):
        members = validated_data.pop('members')
        chat = Chat.objects.create(**validated_data)
        for user in members:
            chat.members.add(user)
        return chat


class MessageSerializer(serializers.ModelSerializer):

    sender = serializers.StringRelatedField()
    receiver = serializers.StringRelatedField()

    class Meta:
        model = Message
        fields = ('sender', 'receiver', 'message', 'timestamp')


class MessageListSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username',)