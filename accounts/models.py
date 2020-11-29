from django.db import models
from .managers import CustomUserManager
from django.contrib.auth.models import (
    AbstractBaseUser, AbstractUser
)


class User(AbstractUser):
    # username = models.CharField(max_length=255, null=True)
    email = models.EmailField(max_length=255, unique=True)
    school = models.CharField(max_length=255, blank=True)
    location = models.CharField(max_length=255, blank=True)
    paypal_username = models.CharField(max_length=100, blank=True, null=True)

    REQUIRED_FIELDS = ['email', 'first_name', 'last_name', 'school', 'location']

    objects = CustomUserManager()
