from django.db import models
from textbook.models import Textbook

# Create your models here.
class Cart(models.Model):
    owner = models.CharField(max_length=30)
    textbooks = models.ManyToManyField(Textbook)
    