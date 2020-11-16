from rest_framework import serializers
from .models import Textbook

class TextbookISBNSerializer(serializers.ModelSerializer):

    owner = serializers.StringRelatedField()
    class Meta:
        model = Textbook
        fields = (
            'isbn',
            'price', 
            'comment',
            'owner',
            'title',
        )
        read_only_fields = ('title', 'owner')

class TextbookTitleSerializer(serializers.ModelSerializer):
    owner = serializers.StringRelatedField()
    class Meta:
        model = Textbook
        fields = (
            'title',
            'isbn', 
            'price', 
            'comment',
            'owner',
            'pk',
        )
        read_only_fields = ('owner', 'pk', )

        
    

    

    