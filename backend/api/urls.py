



from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import EmergencyAlertViewSet,UserProfileViewSet
from .roboflow_proxy import roboflow_detect

router = DefaultRouter()
router.register('medication-reminders', views.MedicationReminderViewSet, basename='medication-reminder')
router.register('voice-notes', views.VoiceNoteViewSet, basename='voice-note')
# router.register('emergency-alerts', views.EmergencyAlertViewSet, basename='emergency-alert')
router.register(r'emergency-alerts', EmergencyAlertViewSet, basename='emergency-alert')


urlpatterns = [
    path('', include(router.urls)),
    path('profile/', UserProfileViewSet.as_view({'get': 'retrieve', 'patch': 'partial_update'}), name='profile'),
    path('roboflow/detect/', roboflow_detect, name='roboflow_detect')
]




