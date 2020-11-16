from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated 

from cart.models import Cart

class CartListView(generics.RetrieveAPIView):
    queryset = Cart.objects.all()
    serializer = 
    permission_classes = (IsAuthenticated, )

