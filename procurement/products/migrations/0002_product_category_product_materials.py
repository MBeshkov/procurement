# Generated by Django 5.0.2 on 2024-02-24 22:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='category',
            field=models.CharField(default='lorem ipsum', max_length=5000),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='product',
            name='materials',
            field=models.CharField(default='lorem ipsum dolor', max_length=5000),
            preserve_default=False,
        ),
    ]
