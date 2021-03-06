from rest_framework import serializers
from .models import Textbook

class TextbookISBNSerializer(serializers.ModelSerializer):

    owner = serializers.StringRelatedField()
    class Meta:
        model = Textbook
        fields = (
            'isbn',
            'volume_edition',
            'price', 
            'condition',
            'comments',
            'owner',
            'title',
            'authors',
            'state',
            'image'
        )
        read_only_fields = ('title', 'owner', 'authors',)

class TextbookTitleSerializer(serializers.ModelSerializer):
    owner = serializers.StringRelatedField()
    class Meta:
        model = Textbook
        fields = (
            'title',
            'volume_edition',
            'authors',
            'isbn', 
            'price', 
            'condition',
            'comments',
            'owner',
            'pk',
            'state',
            'image'
        )
        read_only_fields = ('owner', 'pk', )

        
    

    

    