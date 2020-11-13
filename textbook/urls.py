from django.urls import path, include

from knox.views import LogoutView

from .views import (
    TextbookCreateView,
    TextbookISBNCreateView,
    TextbookDetailVeiw,
    TextbookDestroyView,
    TextbookListView,
)

urlpatterns = [
    path('list/', TextbookListView.as_view(), name='textbook-list'),
    path('list/<int:pk>/', TextbookDetailVeiw.as_view(), name='textbook-detail'),
    path('list/<int:pk>/delete/', TextbookDestroyView.as_view(), name='textbook-destroy'),
    path('create-isbn/', TextbookISBNCreateView.as_view(), name='textbook-create-isbn'),
    path('create/', TextbookCreateView.as_view(), name='textbook-create')
]