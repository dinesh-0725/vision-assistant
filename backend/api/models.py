

from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=20, blank=True)
    emergency_contact = models.CharField(max_length=100, blank=True)
    language_preference = models.CharField(max_length=10, default='en')
    created_at = models.DateTimeField(auto_now_add=True)
    emergency_emails = models.TextField(blank=True, null=True,help_text="Comma-separated emails for emergency contacts")
    emergency_telegram_chat_ids = models.TextField(blank=True, null=True,help_text="Comma-separated Telegram chat IDs to notify")
    emergency_contact_phone = models.CharField(max_length=20, blank=True, null=True)


from django.utils import timezone

def default_start_date():
    return timezone.now().date().isoformat()  # return string for SQLite

class MedicationReminder(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    medicine_name = models.CharField(max_length=200)
    dosage_info = models.CharField(max_length=200, blank=True)
    time_of_day = models.TimeField()
    repeat_frequency = models.CharField(
        max_length=50,
        choices=[('daily','Daily'),('weekly','Weekly'),('monthly','Monthly')]
    )
    duration_days = models.IntegerField(default=30)
    start_date = models.DateField(default=default_start_date)
    end_date = models.DateField(null=True, blank=True)
    active = models.BooleanField(default=True)




from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class VoiceNote(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    audio_file = models.FileField(upload_to='voice_notes/', blank=True, null=True)
    transcript = models.TextField(blank=True)
    reminder_date = models.DateField(default=timezone.now)  # Separate date
    reminder_time = models.TimeField(default=timezone.now)  # Separate time
    notified = models.BooleanField(default=False)  # If reminder sent
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.user.username})"


class Expense(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    date = models.DateField(default=timezone.now)
    created_at = models.DateTimeField(auto_now_add=True)


class ObjectDetectionLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    detected_object = models.CharField(max_length=200)
    confidence = models.FloatField()
    image = models.ImageField(upload_to='detections/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)


class VoiceUserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    voice_secret_code = models.CharField(max_length=100)  # e.g., "vision123"
    voice_greeting_name = models.CharField(max_length=100, default="Friend")  # How to greet user
    is_voice_user = models.BooleanField(default=True)
    phone_number = models.CharField(max_length=15, unique=True, default="0000000000")
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.username} - Voice User"
    
class BlacklistedToken(models.Model):
    # token = models.CharField(max_length=500, unique=True)
    token = models.TextField(unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    blacklisted_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Blacklisted token for {self.user.username}"


class EmergencyAlert(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    alert_type = models.CharField(max_length=100, default='general')  # 'medical', 'safety', etc.
    message = models.TextField(default="Emergency! Please help me.")
    location_text = models.CharField(max_length=255, blank=True, null=True)
    location_lat = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    location_lng = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"SOS from {self.user.username} at {self.created_at}"

    def map_link(self):
        if self.location_lat is not None and self.location_lng is not None:
            return f"https://www.google.com/maps/search/?api=1&query={self.location_lat},{self.location_lng}"
        return None

    def formatted_message(self):
        base = (
            f"🚨 SOS ALERT 🚨\n"
            f"User: {self.user.get_full_name() or self.user.username}\n"
            f"Message: {self.message}\n"
        )
        if self.location_text:
            base += f"Location: {self.location_text}\n"
        link = self.map_link()
        if link:
            base += f"Map: {link}\n"
        base += f"Time: {self.created_at.strftime('%Y-%m-%d %H:%M:%S')}\n"
        return base