from django.db import models
from accounts.models import User

# Create your models here.
class Textbook(models.Model):
    textbookId = models.CharField(max_length=100, unique=True, primary_key=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    isbn = models.CharField(max_length=13)
    price = models.DecimalField(max_digits=9,decimal_places=2)
    state = models.IntegerField()
    #textbookPicture = models.CharField(max_length=100)
    
    def __str__(self):
        return self.textbookId
