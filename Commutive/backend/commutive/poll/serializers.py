from rest_framework import serializers
from .models import *
from users.models import MyUser
from django.db.models import Count

class MembersInfoserializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ['username']


class PollSerializer(serializers.ModelSerializer):
    class Meta:
        model = Poll
        fields = ['id', 'communityID', 'time']

class ChoiceSerializer(serializers.ModelSerializer):
    candid_username = serializers.CharField(source='choice.username', read_only=True)
    rate = serializers.SerializerMethodField()
    voted_by = MembersInfoserializer(source='voters', read_only=True, many=True)

    def get_rate(self, instance):
        poll_choices = PollChoice.objects.filter(poll_id=instance.poll_id)
        if not poll_choices:
            return 0
        
        poll_choices = list(poll_choices.values_list(Count('voters'), flat=True))
        poll_choices = list(filter(None, poll_choices)) 
        if sum(poll_choices) == 0:
            return 0
        rate = instance.voters.count() * 100 / sum(poll_choices)
        return rate

    class Meta:
        model = PollChoice
        fields = ['id', 'rate', 'candid_username', 'poll_id', 'voted_by']

class PollChoiceSerializer(serializers.ModelSerializer):
    candidates = serializers.SerializerMethodField('get_candidates')

    def get_candidates(self, id):
        qs = PollChoice.objects.filter(poll_id=id.id)
        serializer = ChoiceSerializer(instance=qs, many=True)
        return serializer.data

    class Meta:
        model = Poll
        fields = ['id', 'communityID', 'time', 'candidates']
        