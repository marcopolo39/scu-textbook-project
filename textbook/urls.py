from django.urls import path
from .views import TextbookList

urlpatterns = [
    path('textbooks/', TextbookList.as_view()),
]