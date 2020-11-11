from django.shortcuts import render
from .models import Textbook
from rest_framework import generics
from django.views.generic import ListView
from rest_framework.response import Response
from .serializers import TextbookSerializer

class TextbookList(ListView):
    model = Textbook

class RegisterTextbookAPI(generics.GenericAPIView):
    serializer_class = TextbookSerializer
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        textbook = serializer.save()
        return Response({
            "textbook": TextbookSerializer(textbook, context=self.get_serializer_context()).data
        })

class TextbookAPI(generics.RetrieveAPIView):
    serializer_class = TextbookSerializer
    def get_object(self):
        return self.request.textbook