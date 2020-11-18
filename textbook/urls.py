from django.urls import path, include

from knox.views import LogoutView

from .views import (
    TextbookCreateView,
    TextbookISBNCreateView,
    TextbookDetailVeiw,
    TextbookDestroyView,
    TextbookListView,
    TextbookUpdateView,
)

urlpatterns = [
    path('list/', TextbookListView.as_view(), name='textbook-list'),
    path('list/<str:isbn>/', TextbookDetailVeiw.as_view(), name='textbook-detail'),
    path('delete/<int:pk>/', TextbookDestroyView.as_view(), name='textbook-destroy'),
    path('create-isbn/', TextbookISBNCreateView.as_view(), name='textbook-create-isbn'),
    path('create/', TextbookCreateView.as_view(), name='textbook-create'),
    path('update/<int:pk>/', TextbookUpdateView.as_view(), name='textbook-update'),
]