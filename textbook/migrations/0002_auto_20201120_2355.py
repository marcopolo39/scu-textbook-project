# Generated by Django 3.1.2 on 2020-11-20 23:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('textbook', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='textbook',
            old_name='comment',
            new_name='condition',
        ),
    ]