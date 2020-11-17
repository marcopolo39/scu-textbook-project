from django.urls import path
from .views import MessageDetailView, ChatListView, ChatCreateView

urlpatterns = [
    path("conversation/", MessageDetailView.as_view()),
    path("chat-list/", ChatListView.as_view()),
    path("create-chat/", ChatCreateView.as_view())
]