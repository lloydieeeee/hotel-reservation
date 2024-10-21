from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

# TODO: CRUD of Rooms | DONE with role based

urlpatterns = [
    path('customer/sign-up/', views.CustomerRegistrationView.as_view()),
    path('customer/sign-in/', views.CustomerLoginView.as_view()),
    path('customer/', views.CustomerView.as_view()),
    path('token/refresh/', views.RefreshTokenView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
