from django.db import models
from community.models import *
from users.models import *

# Create your models here.
class Poll(models.Model):
    communityID = models.ForeignKey(community, on_delete=models.CASCADE, blank=True, null=True, related_name='poll')
    time = models.DateTimeField(auto_now=False, auto_now_add=True, blank=True)
    
class PollChoice(models.Model):
    choice = models.ForeignKey(MyUser, on_delete=models.CASCADE, related_name='poll_choice')
    poll_id = models.IntegerField()
    voters = models.ManyToManyField(MyUser, default=None, related_name='users_voted')
