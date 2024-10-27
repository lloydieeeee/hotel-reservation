from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path('room/', views.RoomDetail.as_view()),
    path('room-amenity/', views.RoomAmenityDetail.as_view()),
    path('room-type/', views.RoomTypeDetail.as_view()),

]

urlpatterns = format_suffix_patterns(urlpatterns)
