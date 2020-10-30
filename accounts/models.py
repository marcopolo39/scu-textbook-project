from django.db import models
from .managers import CustomUserManager
from django.contrib.auth.models import (
 AbstractBaseUser, AbstractUser
)


class User(AbstractUser):
    username = None
    email = models.EmailField(max_length=255, unique=True)
    school = models.CharField(max_length=255, blank=True)
    location = models.CharField(max_length=255, blank=True)

    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = ['first_name', 'last_name', 'school', 'location',]

    objects = CustomUserManager()
