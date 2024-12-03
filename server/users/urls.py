from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework_simplejwt.views import TokenVerifyView
from . import views

urlpatterns = [
    path('token/csrf/', views.ObtainCsrfToken.as_view()),
    path('token/refresh/', views.RefreshTokenView.as_view()),
    path('token/verify/', TokenVerifyView.as_view()),
    path('token/logout/', views.LogoutView.as_view()),
    path('admin/sign-in/', views.AdminLoginView.as_view()),
    path('customer/sign-up/', views.CustomerRegistrationView.as_view()),
    path('customer/sign-in/', views.CustomerLoginView.as_view()),
    path('customer/', views.CustomerView.as_view()),
    path('admin/', views.AdminView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
