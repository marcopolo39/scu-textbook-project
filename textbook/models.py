from django.db import models
from django.contrib.auth import get_user_model
from accounts.models import User

STATE_CHOICES = (
    ('F', 'For Sale'),
    ('S', 'Sold'),
    ('D', 'Draft'),
)

class Textbook(models.Model):
    owner = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    # ISBN can be 13 or 10 digits (They should not be entered with '-')
    # for example ISBN = 9780321334879 not 978-0-321-33478-9
    isbn = models.CharField(max_length=13)
    # 9 digit max with 2 decimal places means that 9,999,999.99 is the max retail price
    price = models.DecimalField(max_digits=9, decimal_places=2)
    state = models.CharField(max_length=1, default='F', choices=STATE_CHOICES)
    comment = models.CharField(max_length=300, blank=True, null=True)
    # Static Image Field not added yet
    
    def __str__(self):
        return self.isbn