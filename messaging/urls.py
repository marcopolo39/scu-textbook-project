from django.urls import path
from .views import MessageDetailView, MessageListView

urlpatterns = [
    path("conversation/", MessageDetailView.as_view()),
    path("message-list/", MessageListView.as_view())
]