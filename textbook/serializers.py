from rest_framework import serializers
from .models import Textbook

class TextbookISBNSerializer(serializers.ModelSerializer):
    class Meta:
        model = Textbook
        fields = (
            'isbn',
            'price', 
            'comment',
        )
        read_only_fields = ('title', 'owner')

class TextbookTitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Textbook
        fields = (
            'title',
            'isbn', 
            'price', 
            'comment',
            'owner',
        )
        #read_only_fields = ('owner', )

def get_ISBN_Title(isbn):
    #
    return isbn
        
    

    

    