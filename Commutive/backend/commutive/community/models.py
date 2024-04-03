from django.db import models
from users.models import MyUser

# Create your models here.
class community(models.Model):    
    name = models.CharField(max_length=50)
    communityID = models.CharField(max_length=50, primary_key=True)
    photo = models.ImageField(upload_to='' , null=True)  
    description = models.TextField(blank=True)
    members = models.ManyToManyField(MyUser, blank=True, related_name='community')
    owner = models.ForeignKey(MyUser, on_delete=models.CASCADE, blank=True, related_name='owner', null=True)
    field_choices = [
        ('actor', 'actor'),
        ('anime', 'anime'),
        ('art', 'art'),
        ('astronomy', 'astronomy'),
        ('beauty', 'beauty'),
        ('book', 'book'),
        ('celebrities', 'celebrities'),
        ('comic', 'comic'),
        ('cooking', 'cooking'),
        ('game', 'game'),
        ('history', 'history'),
        ('medicine', 'medicine'),
        ('movie', 'movie'),
        ('music', 'music'),
        ('painting', 'painting'),
        ('sport', 'sport'),
        ('others', 'others'),
    ]
    field = models.CharField(max_length=50, choices=field_choices, default='others')
    admin = models.ForeignKey(MyUser, blank=True, null=True, on_delete=models.CASCADE, related_name='admin')


    def __str__(self):
        return self.communityID