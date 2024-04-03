from django.db import models
from users.models import MyUser
from community.models import community

# Create your models here.
class notifications(models.Model):
    text=models.TextField()
    user = models.CharField(max_length=150, blank=True)
    newNotif = models.BooleanField(default=True)