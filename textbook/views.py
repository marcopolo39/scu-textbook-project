import requests
import json
from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
)

from .models import Textbook
from .serializers import TextbookISBNSerializer, TextbookTitleSerializer
from .permissions import isTextbookOwnerPermission

URL = 'https://www.googleapis.com/books/v1/volumes?q=isbn:'
USER = get_user_model()

class TextbookListView(generics.ListAPIView):
    queryset = Textbook.objects.all()
    serializer_class = TextbookTitleSerializer

# Might change this to isbn
class TextbookDetailVeiw(generics.RetrieveAPIView):
    queryset = Textbook.objects.all()
    serializer_class = TextbookTitleSerializer
    lookup_field = "pk"
        

class TextbookDestroyView(generics.DestroyAPIView):
    queryset = Textbook.objects.all()
    serializer_class = TextbookISBNSerializer
    permission_classes = (IsAuthenticated, isTextbookOwnerPermission)

class TextbookCreateView(generics.CreateAPIView):
    queryset = Textbook.objects.all()
    serializer_class = TextbookTitleSerializer
    permission_classes = (IsAuthenticated, )

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=self.request.user)
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

class TextbookISBNCreateView(generics.CreateAPIView):
    queryset = Textbook.objects.all()
    serializer_class = TextbookISBNSerializer
    permission_classes = (IsAuthenticated, )

    def create(self, request, *args, **kwargs):
        isbn = request.data['isbn']

        try:
            r = requests.get(URL + isbn)
            bookData = r.json()
            title = bookData['items'][0]['volumeInfo']['title']
            bookAuthors = bookData['items'][0]['volumeInfo']['authors']
            serializer = TextbookISBNSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(title=title, owner=self.request.user, authors=", ".join(bookAuthors))
                return Response(serializer.data, status=HTTP_201_CREATED)
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
        except:
            print('Bad ISBN')
            return Response(status=HTTP_400_BAD_REQUEST)

# Use update view with HTML PATCH request
class TextbookUpdateView(generics.UpdateAPIView):
    queryset = Textbook.objects.all()
    serializer_class = TextbookTitleSerializer
    permission_classes = (IsAuthenticated, isTextbookOwnerPermission)


    