from django.db import models
from users.models import MyUser
from community.models import community
# Create your models here.
class Event(models.Model):
    title=models.CharField(max_length=150) ## inke blank= false
    description=models.TextField(blank=True)
    startDate=models.DateTimeField(auto_now=False, auto_now_add=False)
    endDate=models.DateTimeField(auto_now=False, auto_now_add=False)
    photo = models.ImageField(upload_to='events/' , null=True)
    join_users=models.ManyToManyField(MyUser,  default=None, related_name='users_join')
    creator = models.CharField(max_length=150, blank=True)
    community = models.ForeignKey(community, on_delete=models.CASCADE, blank=True, related_name='event_community',null=True)

    def __str__(self):
        return self.title