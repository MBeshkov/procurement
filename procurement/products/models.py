from django.db import models
from django.contrib.auth.models import User

class Product(models.Model):
    name = models.CharField(max_length = 1000)
    score = models.DecimalField(max_digits=4, decimal_places=2)
    category = models.CharField(max_length = 5000)
    materials = models.CharField(max_length = 5000)
    user = models.ForeignKey(User, on_delete = models.CASCADE, blank = True, null = True)

    def __str__(self):
        return self.name