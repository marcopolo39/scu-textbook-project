from django.db import models
from textbook.models import Textbook

class Cart(models.Model):
    textbooks = models.ManyToManyField(Textbook, related_name='textbooks')
    # The default max length for django usernames is 30
    owner_username = models.CharField(max_length=30)
    total_cost = models.FloatField()