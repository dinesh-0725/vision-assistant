# # from django.shortcuts import render
#@Pgowthamkumar23
# # # Create your views here.

# api/views.py (add)
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import UserProfile
from .serializers import UserProfileSerializer

class UserProfileViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def retrieve(self, request):
        # GET /api/profile/
        profile, _ = UserProfile.objects.get_or_create(user=request.user)
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)

    def partial_update(self, request):
        # PATCH /api/profile/
        profile, _ = UserProfile.objects.get_or_create(user=request.user)
        serializer = UserProfileSerializer(profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from .models import *
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import exceptions
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken


from .serializers import MedicationReminderSerializer
from .authentication import JWTAuthenticationWithBlacklist


class MedicationReminderViewSet(viewsets.ModelViewSet):
    serializer_class = MedicationReminderSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return MedicationReminder.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Automatically assign the logged-in user
        serializer.save(user=self.request.user)


    


from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import VoiceNote
from .serializers import VoiceNoteSerializer
from .authentication import JWTAuthenticationWithBlacklist

class VoiceNoteViewSet(viewsets.ModelViewSet):
    serializer_class = VoiceNoteSerializer
    authentication_classes = [JWTAuthenticationWithBlacklist]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return VoiceNote.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# api/views.py
import logging
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.conf import settings

from .models import EmergencyAlert, UserProfile
from .serializers import EmergencyAlertSerializer
from .utils import send_email_to_list

logger = logging.getLogger(__name__)

class EmergencyAlertViewSet(viewsets.ModelViewSet):
    serializer_class = EmergencyAlertSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return EmergencyAlert.objects.filter(user=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        sos = serializer.save(user=self.request.user)
        self.notify_emergency_contacts(sos)

    # inside EmergencyAlertViewSet.notify_emergency_contacts
    def notify_emergency_contacts(self, sos: EmergencyAlert):
        message = sos.formatted_message()
        subject = "🚨 SOS Emergency Alert!"
        sent_any = False

        try:
            profile = UserProfile.objects.get(user=sos.user)
        except UserProfile.DoesNotExist:
            profile = None

        emails = []
        if profile and profile.emergency_emails:
            emails = [e.strip() for e in profile.emergency_emails.split(',') if e.strip()]

        if emails:
            ok = send_email_to_list(subject, message, emails)
            sent_any = sent_any or ok

        if sent_any:
            logger.info("Emergency emails sent for alert id=%s", sos.id)
        else:
            logger.warning("No emergency emails sent for alert id=%s (no emails configured or send failed)", sos.id)

    # def notify_emergency_contacts(self, sos: EmergencyAlert):
    #     """
    #     Only send email notifications to emergency_emails listed in user's profile.
    #     """
    #     try:
    #         profile = UserProfile.objects.get(user=sos.user)
    #     except UserProfile.DoesNotExist:
    #         profile = None

    #     message = sos.formatted_message()
    #     subject = "🚨 SOS Emergency Alert!"

    #     sent_any = False

    #     if profile and profile.emergency_emails:
    #         emails = [e.strip() for e in profile.emergency_emails.split(',') if e.strip()]
    #         ok = send_email_to_list(subject, message, emails)
    #         sent_any = sent_any or ok

    #     if sent_any:
    #         logger.info("Emergency emails sent for alert id=%s", sos.id)
    #     else:
    #         logger.warning("No emergency emails sent for alert id=%s (no emails configured or send failed)", sos.id)
            
            
            
    # Optionally override create to return a friendly message
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({"message": "SOS Alert created and notifications triggered (email)."}, status=status.HTTP_201_CREATED)



