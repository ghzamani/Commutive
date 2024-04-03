from django.urls import path
from .views import *

urlpatterns = [
    path('communities/<pk>/events', EventView.as_view()),
    path('communities/<pk>/events/<id>/members', JoinEvent.as_view()), ##ino ba ghazal harf bezanam
    path('users/<username>/events', UserEvent.as_view()), ## url moskel dare nemidonam chi mishe ### ino beporsm !!!!!
    path('communities/<pk>/new-events/', NewEvents.as_view())
]