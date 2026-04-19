from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *


# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ('id', 'username', 'email', 'first_name', 'last_name')

# class VoiceUserProfileSerializer(serializers.ModelSerializer):
#     user = UserSerializer(read_only=True)
    
#     class Meta:
#         model = VoiceUserProfile
#         fields = '__all__'
        
# class UserProfileSerializer(serializers.ModelSerializer):
#     user = UserSerializer(read_only=True)
    
#     class Meta:
#         model = UserProfile
#         fields = '__all__'

# api/serializers.py
from rest_framework import serializers
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from .models import UserProfile, VoiceUserProfile
from django.contrib.auth import get_user_model
import re

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')

class VoiceUserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = VoiceUserProfile
        fields = '__all__'

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    # Allow clients to pass list or comma string for convenience
    emergency_emails = serializers.CharField(allow_blank=True, allow_null=True, required=False)
    emergency_contact_phone = serializers.CharField(allow_blank=True, required=False)

    class Meta:
        model = UserProfile
        fields = '__all__'
        read_only_fields = ['user', 'created_at']

    def validate_emergency_emails(self, value):
        """
        Accept either:
         - comma separated string "a@x.com, b@y.com"
         - or JSON array represented as string '["a@..","b@.."]' (optional)
        Normalize and return comma-separated string of valid emails.
        """
        if not value:
            return ""

        # If it's a list passed in (rare), join it
        if isinstance(value, (list, tuple)):
            emails = value
        else:
            # split by comma
            emails = [e.strip() for e in value.split(',') if e.strip()]

        clean = []
        for e in emails:
            try:
                validate_email(e)
                clean.append(e)
            except ValidationError:
                raise serializers.ValidationError(f"Invalid email: {e}")

        # Return normalized comma-separated string
        return ",".join(clean)
    def validate_emergency_contact_phone(self, value):
        if not value:
            return ""
        phones = [p.strip() for p in value.split(',') if p.strip()]
        # basic phone regex: allow + and digits, 7-15 digits
        pattern = re.compile(r'^\+?\d{7,15}$')
        for p in phones:
            if not pattern.match(p):
                raise serializers.ValidationError(f"Invalid phone number format: {p}. Use digits or +countrycode.")
        return ",".join(phones)
    def update(self, instance, validated_data):
        # emergency_emails already validated and normalized by validate_emergency_emails
        em = validated_data.pop('emergency_emails', None)
        phones = validated_data.pop('emergency_contact_phone', None)
        if em is not None:
            instance.emergency_emails = em
        if phones is not None:
            instance.emergency_contact_phone = phones
        for attr, val in validated_data.items():
            setattr(instance, attr, val)
        instance.save()
        return instance


class MedicationReminderSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicationReminder
        fields = [
            'id', 'user', 'medicine_name', 'dosage_info', 
            'time_of_day', 'repeat_frequency', 'start_date', 'end_date', 'active'
        ]
        read_only_fields = ['user', 'start_date']
    def validate_end_date(self, value):
        if value < timezone.now().date():
            raise serializers.ValidationError("End date cannot be in the past.")
        return value
        


from rest_framework import serializers
from .models import VoiceNote
from django.utils import timezone



# class ExpenseSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Expense
#         fields = '__all__'

# class EmergencyAlertSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = EmergencyAlert
#         fields = '__all__'

# class ObjectDetectionLogSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ObjectDetectionLog
#         fields = '__all__'

from rest_framework import serializers
from .models import VoiceNote
from django.utils import timezone
import datetime

class VoiceNoteSerializer(serializers.ModelSerializer):
    reminder_date = serializers.DateField()
    reminder_time = serializers.TimeField()

    class Meta:
        model = VoiceNote
        fields = [
            'id', 'user', 'title', 'audio_file', 'transcript',
            'reminder_date', 'reminder_time', 'notified', 'created_at'
        ]
        read_only_fields = ['user', 'notified', 'created_at']

    def validate_reminder_date(self, value):
        if value < timezone.now().date():
            raise serializers.ValidationError("Reminder date cannot be in the past.")
        return value

    def validate_reminder_time(self, value):
        date = self.initial_data.get('reminder_date')
        if date:
            date = datetime.date.fromisoformat(date)
            now = timezone.localtime()
            if date == now.date() and value < now.time():
                raise serializers.ValidationError("Reminder time cannot be in the past for today.")
        return value


# class EmergencyAlertSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = EmergencyAlert
#         fields = ['id', 'user', 'alert_type', 'message', 'location', 'is_active', 'created_at']
#         read_only_fields = ['user', 'created_at']

from rest_framework import serializers
from .models import EmergencyAlert
from rest_framework import serializers
from .models import EmergencyAlert

class EmergencyAlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmergencyAlert
        fields = [
            'id', 'user', 'alert_type', 'message',
            'location_text', 'location_lat', 'location_lng',
            'is_active', 'created_at'
        ]
        read_only_fields = ['user', 'created_at']
