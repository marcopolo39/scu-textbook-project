from rest_framework import serializers
from .models import Textbook

class TextbookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Textbook
        fields = ['textbookId', 'owner', 'isbn', 'price', 'state']
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['title'] = get_ISBN_Title(instance.isbn)
        return data


def get_ISBN_Title(isbn):
    # returns isbn until I add exceptions
    return isbn
        
    

    

    