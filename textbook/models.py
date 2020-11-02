from django.db import models

# Create your models here.
class Textbook(models.Model):
    # Textbook_id should be the combination of the user_id and isbn number followed by a count
    # The count is necessary if they are selling the same textbook more than once
    isbn = models.CharField(max_length=13)
    price = models.DecimalField(max_digits=9,decimal_places=2)
    state = models.IntegerField()
    textbookPicture = models.CharField(max_length=100, default="temp")
    textbookId = models.CharField(max_length=26, default="temp", unique=True)

    #REQUIRED_FIELDS =
    
    def __str__(self):
        return self.textbookId

    # Should filter using Textbook.objects.filter(textbookId__startswith='User_id')