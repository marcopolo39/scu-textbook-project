from django.contrib.auth.base_user import BaseUserManager


class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """

    def create_user(self, username, email, first_name, last_name, school, location, paypal_username, profile_img, password=None,
                    **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError("Please enter a valid email address")
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, first_name=first_name, last_name=last_name, school=school,
                          location=location, paypal_username=paypal_username, profile_img=profile_img, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, email, first_name, last_name, school, location, paypal_username, profile_img, password=None,
                    **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser is not staff.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser is not superuser')
        return self.create_user(username, email, first_name, last_name, school, location, paypal_username, profile_img, password, **extra_fields)
