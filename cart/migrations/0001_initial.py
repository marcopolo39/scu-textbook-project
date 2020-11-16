# Generated by Django 3.1.3 on 2020-11-16 20:15

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('textbook', '0007_remove_textbook_textbookid'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cart',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('owner_username', models.CharField(max_length=30)),
                ('total_cost', models.FloatField()),
                ('textbooks', models.ManyToManyField(related_name='textbooks', to='textbook.Textbook')),
            ],
        ),
    ]
