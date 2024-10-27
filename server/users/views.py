from django.conf import settings
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie

from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .models import Customer
from .serializers import CustomerSerializer


@method_decorator(ensure_csrf_cookie, name='dispatch')
class ObtainCsrfToken(APIView):
    permission_classes = [AllowAny]

    def get(self, request, format=None):
        try:
            csrf_cookie = request.META['CSRF_COOKIE']

            response = Response({
                'csrftoken': csrf_cookie
            }, status=status.HTTP_200_OK)
        except:
            response = Response({
                'csrftoken': 'Csrf cookie not set or found'
            }, status=status.HTTP_400_BAD_REQUEST)

        return response


class RefreshTokenView(TokenRefreshView):
    def get(self, request, *args, **kwargs):
        refresh = request.COOKIES.get('refreshtoken')

        serializer = TokenRefreshSerializer(data={'refresh': refresh})
        serializer.is_valid(raise_exception=True)

        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class ObtainTokenSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        return data


class AdminLoginView(TokenObtainPairView):
    serializer_class = ObtainTokenSerializer

    def post(self, request, *args, **kwargs):
        email = request.data['email']

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        user = Customer.objects.get(email=email)

        if user.role == 'ADMIN' or user.role == 'RECEPTIONIST':
            response = Response(data, status=status.HTTP_200_OK)

            response.set_cookie(
                key=settings.SIMPLE_JWT['AUTH_COOKIE'],
                value=data['refresh'],
                httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                path=settings.SIMPLE_JWT['AUTH_COOKIE_PATH'],
                samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
                max_age=settings.SIMPLE_JWT['AUTH_COOKIE_MAX_AGE']
            )
        else:
            response = Response({
                "detail": "No active account found with the given credentials"
            }, status=status.HTTP_401_UNAUTHORIZED)

        return response


class CustomerView(APIView):
    def get(self, request, format=None):
        snippets = Customer.customer.all()
        serializer = CustomerSerializer(snippets, many=True)
        return Response(serializer.data)


class CustomerRegistrationView(APIView):
    def post(self, request, format=None):
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomerLoginView(TokenObtainPairView):
    serializer_class = ObtainTokenSerializer

    def post(self, request, *args, **kwargs):
        email = request.data['email']

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        user = Customer.objects.get(email=email)

        if user.role == 'CUSTOMER':
            response = Response(data, status=status.HTTP_200_OK)

            response.set_cookie(
                key=settings.SIMPLE_JWT['AUTH_COOKIE'],
                value=data['refresh'],
                httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                path=settings.SIMPLE_JWT['AUTH_COOKIE_PATH'],
                samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
                max_age=settings.SIMPLE_JWT['AUTH_COOKIE_MAX_AGE']
            )
        else:
            response = Response({
                "detail": "No active account found with the given credentials"
            }, status=status.HTTP_401_UNAUTHORIZED)

        return response


class LogoutView(APIView):
    def post(self, request, *args, **kwargs):
        refresh = request.COOKIES.get('refreshtoken')
        token = RefreshToken(refresh)
        token.blacklist()

        response = Response(status=status.HTTP_204_NO_CONTENT)
        response.delete_cookie('refreshtoken')

        return response
