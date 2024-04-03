from django.urls import path
from .views import *
 
urlpatterns = [ 
    path('community/', Search.as_view()),
    path('create-community/', CreateCommunity.as_view()),
    path('mycommunities/', CommunitiesJoined.as_view()),
    path('join-community/', JoinCommunity.as_view()),
    # path('update-community/<pk>/', UpdateCommunity.as_view()),
    path('communities/<pk>', InfoEditLeaveCommunity.as_view()),
    path('homepage/communities', HomepageCommunities.as_view()),
    path('communities/<pk>/delete', DeleteCommunityImg.as_view()),
]