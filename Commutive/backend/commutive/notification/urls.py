from django.urls import path
from django.conf.urls import include, url
from .views import *

urlpatterns = [
    path('users/notifications', ListOfNotifications.as_view()),
    path('users/new-notifications', NewNotifications.as_view()),
    path('users/notifications/counts', NewNotificationsCount.as_view()),
]