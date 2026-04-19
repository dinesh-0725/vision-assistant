# # from django.urls import path
# # from . import views

# # urlpatterns = [
# #     # Voice Authentication
# #     path('voice-register/', views.voice_register, name='voice-register'),
# #     path('voice-login/', views.voice_login, name='voice-login'),
# #     path('voice-logout/', views.voice_logout, name='voice-logout'),
# #     path('voice-profile/', views.get_voice_profile, name='voice-profile'),
# #     path('update-voice-secret/', views.update_voice_secret, name='update-voice-secret'),
    
# #     # Traditional authentication (optional)
# #     path('register/', views.register_user, name='register'),
# #     path('login/', views.login_user, name='login'),
# #     path('logout/', views.logout_user, name='logout'),
# # ]

# # from django.urls import path
# # from . import views

# # urlpatterns = [
# #     # Voice Authentication
# #     path('voice-register/', views.voice_register, name='voice-register'),
# #     path('voice-login/', views.voice_login, name='voice-login'),
# #     path('voice-logout/', views.voice_logout, name='voice-logout'),  # ADD THIS BACK
# #     path('voice-profile/', views.get_voice_profile, name='voice-profile'),
# #     path('voice-verify/', views.voice_verify, name='voice-verify'),
    
# #     # Traditional authentication
# #     path('register/', views.register_user, name='register'),
# #     path('login/', views.login_user, name='login'),
# # ]

# # from django.urls import path
# # from . import views

# # urlpatterns = [
# #     path('voice-register/', views.voice_register, name='voice-register'),
# #     path('voice-login/', views.voice_login, name='voice-login'),
# #     path('voice-logout/', views.voice_logout, name='voice-logout'),
# #     path('voice-profile/', views.get_voice_profile, name='voice-profile'),
# #     path('forgot-secret/', views.forgot_secret_code, name='forgot-secret'),
# # ]

# from django.urls import path
# from . import views

# urlpatterns = [
#     path('voice-register/', views.voice_register, name='voice-register'),
#     path('voice-login/', views.voice_login, name='voice-login'),
#     path('voice-logout/', views.voice_logout, name='voice-logout'),
#     path('voice-profile/', views.get_voice_profile, name='voice-profile'),
#     path('forgot-secret/', views.forgot_secret_code, name='forgot-secret'),
# ]


from django.urls import path
from . import views

urlpatterns = [
    path('voice-register/', views.voice_register, name='voice-register'),
    path('voice-login/', views.voice_login, name='voice-login'),
    path('voice-logout/', views.voice_logout, name='voice-logout'),
    path('voice-profile/', views.get_voice_profile, name='voice-profile'),
    path('forgot-secret/', views.forgot_secret_code, name='forgot-secret'),
    path('token-refresh/', views.token_refresh, name='token-refresh'),
]