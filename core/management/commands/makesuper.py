from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    def handle(self, *args, **options):
        User = get_user_model()
        qs = User.objects.filter(username='admin')

        if not qs.exists():
            User.objects.create_superuser(
                'admin',                        # This is the username
                'admin@tempemail.com',
                'adminFirst',
                'adminLast',
                'adminSchool',
                'Kazakhstan',
                'adminPaypal',
                None,                           # There is no profile image
                '&FindABookAdmin4923#$'         # This is the password
            )
            