# authentication.py
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import exceptions
from .models import BlacklistedToken

class JWTAuthenticationWithBlacklist(JWTAuthentication):
    def authenticate(self, request):
        # Standard JWT validation
        result = super().authenticate(request)
        if result is None:
            return None

        user, token = result
        raw_token = str(token)

        # Check if token is blacklisted
        if BlacklistedToken.objects.filter(token=raw_token).exists():
            raise exceptions.AuthenticationFailed('Token has been blacklisted. Please log in again.')

        return (user, token)
