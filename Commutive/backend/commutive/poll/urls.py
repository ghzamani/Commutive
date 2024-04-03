from django.urls import path
from .views import *

urlpatterns = [
    path('communities/<id>/polls', MakePoll.as_view()),
    path('communities/<id>/polls/<pk>', Vote.as_view()),
    path('communities/<id>/poll/latest', LatestActivePoll.as_view())

]