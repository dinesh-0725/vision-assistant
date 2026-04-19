# # # from django.shortcuts import render

# # # # Create your views here.


# # from rest_framework import status
# # from rest_framework.decorators import api_view, permission_classes
# # from rest_framework.response import Response
# # from rest_framework.permissions import AllowAny, IsAuthenticated
# # from django.contrib.auth import authenticate, login, logout
# # from django.contrib.auth.models import User
# # from api.serializers import UserSerializer



# # from rest_framework import status
# # from rest_framework.decorators import api_view, permission_classes
# # from rest_framework.response import Response
# # from rest_framework.permissions import AllowAny, IsAuthenticated
# # from django.contrib.auth import authenticate, login, logout
# # from django.contrib.auth.models import User
# # from api.models import VoiceUserProfile
# # from api.serializers import UserSerializer, VoiceUserProfileSerializer
# # from django.views.decorators.csrf import csrf_exempt
# # import re


# # from django.views.decorators.csrf import csrf_exempt
# # from django.utils.decorators import method_decorator

# # # @api_view(['POST'])
# # # @permission_classes([AllowAny])
# # # @csrf_exempt  # This should work now
# # # def voice_register(request):
# # #     voice_secret = request.data.get('voice_secret', '').strip().lower()
# # #     greeting_name = request.data.get('greeting_name', 'Friend').strip()
    
# # #     if not voice_secret:
# # #         return Response({
# # #             'error': 'Voice secret code is required',
# # #             'spoken_response': 'Please provide a voice secret code.'
# # #         }, status=400)
    
# # #     # Check if voice secret already exists
# # #     from api.models import VoiceUserProfile
# # #     from django.contrib.auth.models import User
    
# # #     if VoiceUserProfile.objects.filter(voice_secret_code=voice_secret).exists():
# # #         return Response({
# # #             'error': 'Voice secret already registered',
# # #             'spoken_response': 'This voice code is already taken. Please choose a different one.'
# # #         }, status=400)
    
# # #     # Create user with voice secret
# # #     username = f"voice_user_{voice_secret}"
# # #     user = User.objects.create_user(
# # #         username=username,
# # #         email=f"{voice_secret}@visionassist.com",
# # #         password=f"voice_pass_{voice_secret}"  # Backup password
# # #     )
    
# # #     # Create voice profile
# # #     voice_profile = VoiceUserProfile.objects.create(
# # #         user=user,
# # #         voice_secret_code=voice_secret,
# # #         voice_greeting_name=greeting_name
# # #     )
    
# # #     # Auto-login after registration
# # #     from django.contrib.auth import login
# # #     login(request, user)
    
# # #     from api.serializers import UserSerializer, VoiceUserProfileSerializer
    
# # #     return Response({
# # #         'message': 'Voice registration successful',
# # #         'user': UserSerializer(user).data,
# # #         'voice_profile': VoiceUserProfileSerializer(voice_profile).data,
# # #         'spoken_response': f'Welcome {greeting_name}! Your voice code "{voice_secret}" has been registered successfully.'
# # #     })


# # @api_view(['POST'])
# # @permission_classes([AllowAny])
# # def voice_register(request):
# #     """Register with voice secret"""
# #     voice_secret = request.data.get('voice_secret', '').strip().lower()
# #     greeting_name = request.data.get('greeting_name', 'Friend').strip()
    
# #     if not voice_secret:
# #         return Response({'error': 'Voice secret required'}, status=400)
    
# #     if VoiceUserProfile.objects.filter(voice_secret_code=voice_secret).exists():
# #         return Response({'error': 'Voice secret already exists'}, status=400)
    
# #     # Create user
# #     username = f"voice_user_{voice_secret}"
# #     user = User.objects.create_user(
# #         username=username,
# #         email=f"{voice_secret}@visionassist.com",
# #         password=f"voice_pass_{voice_secret}"
# #     )
    
# #     # Create voice profile
# #     voice_profile = VoiceUserProfile.objects.create(
# #         user=user,
# #         voice_secret_code=voice_secret,
# #         voice_greeting_name=greeting_name
# #     )
    
# #     return Response({
# #         'message': 'Registration successful',
# #         'user_id': user.id,  # Return user ID for reference
# #         'voice_secret': voice_secret,  # This is their "token"
# #         'spoken_response': f'Welcome {greeting_name}! Registration complete.'
# #     })

# # @api_view(['POST'])
# # @permission_classes([AllowAny])
# # def voice_verify(request):
# #     """Verify voice secret and return user info"""
# #     voice_secret = request.data.get('voice_secret', '').strip().lower()
    
# #     if not voice_secret:
# #         return Response({'error': 'Voice secret required'}, status=400)
    
# #     try:
# #         voice_profile = VoiceUserProfile.objects.get(voice_secret_code=voice_secret)
        
# #         return Response({
# #             'message': 'Verification successful',
# #             'user_id': voice_profile.user.id,
# #             'greeting_name': voice_profile.voice_greeting_name,
# #             'spoken_response': f'Welcome back, {voice_profile.voice_greeting_name}!'
# #         })
        
# #     except VoiceUserProfile.DoesNotExist:
# #         return Response({'error': 'Invalid voice secret'}, status=401)
    
# # @api_view(['POST'])
# # @permission_classes([AllowAny])
# # def voice_login(request):
# #     voice_input = request.data.get('voice_input', '').strip().lower()
    
# #     if not voice_input:
# #         return Response({
# #             'error': 'Voice input is required',
# #             'spoken_response': 'Please speak your voice secret code.'
# #         }, status=400)
    
# #     try:
# #         from api.models import VoiceUserProfile
# #         from api.serializers import UserSerializer, VoiceUserProfileSerializer
        
# #         # Find user by voice secret (NO SESSION LOGIN)
# #         voice_profile = VoiceUserProfile.objects.get(voice_secret_code=voice_input)
# #         user = voice_profile.user
        
# #         # Return user info WITHOUT creating session
# #         return Response({
# #             'message': 'Voice login successful',
# #             'user_id': user.id,  # Most important - use this for all APIs
# #             'greeting_name': voice_profile.voice_greeting_name,
# #             'spoken_response': f'Welcome back, {voice_profile.voice_greeting_name}! How can I assist you today?'
# #         })
        
# #     except VoiceUserProfile.DoesNotExist:
# #         return Response({
# #             'error': 'Invalid voice secret code',
# #             'spoken_response': 'Voice code not recognized. Please try again or register a new code.'
# #         }, status=401)
        
        
# # @api_view(['POST'])
# # @permission_classes([IsAuthenticated])
# # def voice_logout(request):
# #     """Logout current user"""
# #     logout(request)
# #     return Response({
# #         'message': 'Logout successful',
# #         'spoken_response': 'Goodbye! Session ended successfully.'
# #     })

# # # @api_view(['GET'])
# # # @permission_classes([IsAuthenticated])
# # # def get_voice_profile(request):
# # #     """Get current user's voice profile"""
# # #     try:
# # #         voice_profile = VoiceUserProfile.objects.get(user=request.user)
# # #         return Response(VoiceUserProfileSerializer(voice_profile).data)
# # #     except VoiceUserProfile.DoesNotExist:
# # #         return Response({
# # #             'error': 'Voice profile not found',
# # #             'spoken_response': 'Voice profile not setup.'
# # #         }, status=status.HTTP_404_NOT_FOUND)

# # @api_view(['GET'])
# # @permission_classes([AllowAny])
# # def get_voice_profile(request):
# #     """Get profile for specific user_id"""
# #     user_id = request.GET.get('user_id')
    
# #     if not user_id:
# #         return Response({
# #             'error': 'User ID is required',
# #             'spoken_response': 'User identification is needed.'
# #         }, status=400)
    
# #     try:
# #         user = User.objects.get(id=user_id)
# #         voice_profile = VoiceUserProfile.objects.get(user=user)
        
# #         # Get counts for THIS user only
# #         medication_count = MedicationReminder.objects.filter(user=user).count()
# #         expense_count = Expense.objects.filter(user=user).count()
# #         alert_count = EmergencyAlert.objects.filter(user=user).count()
# #         note_count = VoiceNote.objects.filter(user=user).count()
        
# #         return Response({
# #             'user_id': user.id,
# #             'greeting_name': voice_profile.voice_greeting_name,
# #             'summary': {
# #                 'medication_reminders': medication_count,
# #                 'expenses_tracked': expense_count,
# #                 'emergency_alerts': alert_count,
# #                 'voice_notes': note_count
# #             },
# #             'spoken_response': f'You have {medication_count} medications, {expense_count} expenses, and {note_count} voice notes.'
# #         })
        
# #     except (User.DoesNotExist, VoiceUserProfile.DoesNotExist):
# #         return Response({'error': 'Profile not found'}, status=404)

# # @api_view(['POST'])
# # @permission_classes([IsAuthenticated])
# # def update_voice_secret(request):
# #     """Update voice secret code"""
# #     new_secret = request.data.get('new_voice_secret', '').strip().lower()
    
# #     if not new_secret:
# #         return Response({
# #             'error': 'New voice secret is required',
# #             'spoken_response': 'Please provide a new voice secret code.'
# #         }, status=status.HTTP_400_BAD_REQUEST)
    
# #     # Check if new secret already exists
# #     if VoiceUserProfile.objects.filter(voice_secret_code=new_secret).exclude(user=request.user).exists():
# #         return Response({
# #             'error': 'Voice secret already taken',
# #             'spoken_response': 'This voice code is already in use. Please choose a different one.'
# #         }, status=status.HTTP_400_BAD_REQUEST)
    
# #     voice_profile, created = VoiceUserProfile.objects.get_or_create(
# #         user=request.user,
# #         defaults={'voice_secret_code': new_secret}
# #     )
    
# #     if not created:
# #         voice_profile.voice_secret_code = new_secret
# #         voice_profile.save()
    
# #     return Response({
# #         'message': 'Voice secret updated successfully',
# #         'voice_profile': VoiceUserProfileSerializer(voice_profile).data,
# #         'spoken_response': f'Your voice code has been updated to "{new_secret}".'
# #     })
    
    
    
# # @api_view(['POST'])
# # @permission_classes([AllowAny])
# # def register_user(request):
# #     username = request.data.get('username')
# #     email = request.data.get('email')
# #     password = request.data.get('password')
    
# #     if User.objects.filter(username=username).exists():
# #         return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
    
# #     user = User.objects.create_user(username=username, email=email, password=password)
# #     return Response({
# #         'message': 'User created successfully',
# #         'user': UserSerializer(user).data
# #     })

# # @api_view(['POST'])
# # @permission_classes([AllowAny])
# # def login_user(request):
# #     username = request.data.get('username')
# #     password = request.data.get('password')
    
# #     user = authenticate(request, username=username, password=password)
    
# #     if user is not None:
# #         login(request, user)
# #         return Response({
# #             'message': 'Login successful',
# #             'user': UserSerializer(user).data
# #         })
# #     else:
# #         return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

# # @api_view(['POST'])
# # @permission_classes([IsAuthenticated])
# # def logout_user(request):
# #     logout(request)
# #     return Response({'message': 'Logout successful'})



# from rest_framework import status
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.response import Response
# from rest_framework.permissions import AllowAny, IsAuthenticated
# from django.contrib.auth import authenticate, login, logout
# from django.contrib.auth.models import User
# from api.models import VoiceUserProfile, MedicationReminder, Expense, EmergencyAlert, VoiceNote  # ADD MISSING IMPORTS
# from api.serializers import UserSerializer, VoiceUserProfileSerializer

# @api_view(['POST'])
# @permission_classes([AllowAny])
# def voice_register(request):
#     """Register with voice secret"""
#     voice_secret = request.data.get('voice_secret', '').strip().lower()
#     greeting_name = request.data.get('greeting_name', 'Friend').strip()
    
#     if not voice_secret:
#         return Response({'error': 'Voice secret required'}, status=400)
    
#     if VoiceUserProfile.objects.filter(voice_secret_code=voice_secret).exists():
#         return Response({'error': 'Voice secret already exists'}, status=400)
    
#     # Create user
#     username = f"voice_user_{voice_secret}"
#     user = User.objects.create_user(
#         username=username,
#         email=f"{voice_secret}@visionassist.com",
#         password=f"voice_pass_{voice_secret}"
#     )
    
#     # Create voice profile
#     voice_profile = VoiceUserProfile.objects.create(
#         user=user,
#         voice_secret_code=voice_secret,
#         voice_greeting_name=greeting_name
#     )
    
#     return Response({
#         'message': 'Registration successful',
#         'user_id': user.id,
#         'voice_secret': voice_secret,
#         'spoken_response': f'Welcome {greeting_name}! Registration complete.'
#     })

# @api_view(['POST'])
# @permission_classes([AllowAny])
# def voice_verify(request):
#     """Verify voice secret and return user info"""
#     voice_secret = request.data.get('voice_secret', '').strip().lower()
    
#     if not voice_secret:
#         return Response({'error': 'Voice secret required'}, status=400)
    
#     try:
#         voice_profile = VoiceUserProfile.objects.get(voice_secret_code=voice_secret)
        
#         return Response({
#             'message': 'Verification successful',
#             'user_id': voice_profile.user.id,
#             'greeting_name': voice_profile.voice_greeting_name,
#             'spoken_response': f'Welcome back, {voice_profile.voice_greeting_name}!'
#         })
        
#     except VoiceUserProfile.DoesNotExist:
#         return Response({'error': 'Invalid voice secret'}, status=401)

# @api_view(['POST'])
# @permission_classes([AllowAny])
# def voice_login(request):
#     """Login with voice secret"""
#     voice_input = request.data.get('voice_input', '').strip().lower()
    
#     if not voice_input:
#         return Response({
#             'error': 'Voice input is required',
#             'spoken_response': 'Please speak your voice secret code.'
#         }, status=400)
    
#     try:
#         # Find user by voice secret
#         voice_profile = VoiceUserProfile.objects.get(voice_secret_code=voice_input)
#         user = voice_profile.user
        
#         return Response({
#             'message': 'Voice login successful',
#             'user_id': user.id,
#             'greeting_name': voice_profile.voice_greeting_name,
#             'spoken_response': f'Welcome back, {voice_profile.voice_greeting_name}! How can I assist you today?'
#         })
        
#     except VoiceUserProfile.DoesNotExist:
#         return Response({
#             'error': 'Invalid voice secret code',
#             'spoken_response': 'Voice code not recognized. Please try again or register a new code.'
#         }, status=401)

# # REMOVE OR FIX THIS FUNCTION - It uses session auth but you disabled sessions
# # @api_view(['POST'])
# # @permission_classes([IsAuthenticated])
# # def voice_logout(request):
# #     """Logout current user"""
# #     logout(request)
# #     return Response({
# #         'message': 'Logout successful',
# #         'spoken_response': 'Goodbye! Session ended successfully.'
# #     })

# @api_view(['POST'])
# @permission_classes([AllowAny])
# def voice_logout(request):
#     """Simple voice logout - always returns success"""
#     return Response({
#         'message': 'Logout successful',
#         'spoken_response': 'Goodbye! You have been logged out successfully.'
#     })
    
# @api_view(['GET'])
# @permission_classes([AllowAny])
# def get_voice_profile(request):
#     """Get profile for specific user_id"""
#     user_id = request.GET.get('user_id')
    
#     if not user_id:
#         return Response({
#             'error': 'User ID is required',
#             'spoken_response': 'User identification is needed.'
#         }, status=400)
    
#     try:
#         user = User.objects.get(id=user_id)
#         voice_profile = VoiceUserProfile.objects.get(user=user)
        
#         # Get counts for THIS user only
#         medication_count = MedicationReminder.objects.filter(user=user).count()
#         expense_count = Expense.objects.filter(user=user).count()
#         alert_count = EmergencyAlert.objects.filter(user=user).count()
#         note_count = VoiceNote.objects.filter(user=user).count()
        
#         return Response({
#             'user_id': user.id,
#             'greeting_name': voice_profile.voice_greeting_name,
#             'summary': {
#                 'medication_reminders': medication_count,
#                 'expenses_tracked': expense_count,
#                 'emergency_alerts': alert_count,
#                 'voice_notes': note_count
#             },
#             'spoken_response': f'You have {medication_count} medications, {expense_count} expenses, and {note_count} voice notes.'
#         })
        
#     except (User.DoesNotExist, VoiceUserProfile.DoesNotExist):
#         return Response({'error': 'Profile not found'}, status=404)

# # REMOVE OR FIX THIS FUNCTION - It uses session auth but you disabled sessions
# # @api_view(['POST'])
# # @permission_classes([IsAuthenticated])
# # def update_voice_secret(request):
# #     """Update voice secret code"""
# #     new_secret = request.data.get('new_voice_secret', '').strip().lower()
# #     
# #     if not new_secret:
# #         return Response({
# #             'error': 'New voice secret is required',
# #             'spoken_response': 'Please provide a new voice secret code.'
# #         }, status=status.HTTP_400_BAD_REQUEST)
# #     
# #     # Check if new secret already exists
# #     if VoiceUserProfile.objects.filter(voice_secret_code=new_secret).exclude(user=request.user).exists():
# #         return Response({
# #             'error': 'Voice secret already taken',
# #             'spoken_response': 'This voice code is already in use. Please choose a different one.'
# #         }, status=status.HTTP_400_BAD_REQUEST)
# #     
# #     voice_profile, created = VoiceUserProfile.objects.get_or_create(
# #         user=request.user,
# #         defaults={'voice_secret_code': new_secret}
# #     )
# #     
# #     if not created:
# #         voice_profile.voice_secret_code = new_secret
# #         voice_profile.save()
# #     
# #     return Response({
# #         'message': 'Voice secret updated successfully',
# #         'voice_profile': VoiceUserProfileSerializer(voice_profile).data,
# #         'spoken_response': f'Your voice code has been updated to "{new_secret}".'
# #     })

# @api_view(['POST'])
# @permission_classes([AllowAny])
# def register_user(request):
#     """Traditional username/password registration"""
#     username = request.data.get('username')
#     email = request.data.get('email')
#     password = request.data.get('password')
    
#     if User.objects.filter(username=username).exists():
#         return Response({'error': 'Username already exists'}, status=400)
    
#     user = User.objects.create_user(username=username, email=email, password=password)
#     return Response({
#         'message': 'User created successfully',
#         'user': UserSerializer(user).data
#     })

# @api_view(['POST'])
# @permission_classes([AllowAny])
# def login_user(request):
#     """Traditional username/password login"""
#     username = request.data.get('username')
#     password = request.data.get('password')
    
#     user = authenticate(request, username=username, password=password)
    
#     if user is not None:
#         login(request, user)
#         return Response({
#             'message': 'Login successful',
#             'user': UserSerializer(user).data
#         })
#     else:
#         return Response({'error': 'Invalid credentials'}, status=401)

# # REMOVE OR FIX THIS FUNCTION - It uses session auth but you disabled sessions
# # @api_view(['POST'])
# # @permission_classes([IsAuthenticated])
# # def logout_user(request):
# #     logout(request)
# #     return Response({'message': 'Logout successful'})



# from rest_framework import status
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.response import Response
# from rest_framework.permissions import AllowAny, IsAuthenticated
# from django.contrib.auth.models import User
# from api.models import VoiceUserProfile, MedicationReminder, Expense, EmergencyAlert, VoiceNote

# @api_view(['POST'])
# @permission_classes([AllowAny])
# def voice_register(request):
#     voice_secret = request.data.get('voice_secret', '').strip().lower()
#     greeting_name = request.data.get('greeting_name', 'Friend').strip()
#     phone_number = request.data.get('phone_number', '').strip()
    
#     if not voice_secret:
#         return Response({'error': 'Voice secret required'}, status=400)
#     if not phone_number:
#         return Response({'error': 'Phone number required'}, status=400)
    
#     # Check if voice secret already exists
#     if VoiceUserProfile.objects.filter(voice_secret_code=voice_secret).exists():
#         return Response({
#             'error': 'Voice secret already exists',
#             'spoken_response': 'This secret code is already taken. Please choose a different one.'
#         }, status=400)
    
#     # Check if phone number already exists
#     if VoiceUserProfile.objects.filter(phone_number=phone_number).exists():
#         return Response({
#             'error': 'Phone number already registered',
#             'spoken_response': 'This phone number is already registered. Please use forgot secret code if you lost your code.'
#         }, status=400)
    
#     # Create user
#     username = f"voice_user_{phone_number}"
#     user = User.objects.create_user(
#         username=username,
#         password=f"voice_pass_{voice_secret}"
#     )
    
#     # Create voice profile with phone number
#     voice_profile = VoiceUserProfile.objects.create(
#         user=user,
#         voice_secret_code=voice_secret,
#         voice_greeting_name=greeting_name,
#         phone_number=phone_number
#     )
    
#     return Response({
#         'message': 'Registration successful',
#         'user_id': user.id,
#         'spoken_response': f'Welcome {greeting_name}! Registration complete with phone number {phone_number}.'
#     })

# @api_view(['POST'])
# @permission_classes([AllowAny])
# def voice_login(request):
#     voice_input = request.data.get('voice_input', '').strip().lower()
    
#     if not voice_input:
#         return Response({
#             'error': 'Voice input is required',
#             'spoken_response': 'Please speak your secret code.'
#         }, status=400)
    
#     try:
#         voice_profile = VoiceUserProfile.objects.get(voice_secret_code=voice_input)
#         user = voice_profile.user
        
#         # CREATE SESSION - This is the key!
#         from django.contrib.auth import login
#         login(request, user)
        
#         return Response({
#             'message': 'Login successful',
#             'user_id': user.id,
#             'greeting_name': voice_profile.voice_greeting_name,
#             'spoken_response': f'Welcome back, {voice_profile.voice_greeting_name}! How can I assist you today?'
#         })
        
#     except VoiceUserProfile.DoesNotExist:
#         return Response({
#             'error': 'Invalid secret code',
#             'spoken_response': 'Secret code not recognized. Please try again.'
#         }, status=401)

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])  # Require login
# def voice_logout(request):
#     from django.contrib.auth import logout
#     logout(request)
#     return Response({
#         'message': 'Logout successful', 
#         'spoken_response': 'Goodbye! You have been logged out.'
#     })

# # @api_view(['POST'])
# # @permission_classes([AllowAny])
# # def voice_login(request):
# #     voice_input = request.data.get('voice_input', '').strip().lower()
    
# #     if not voice_input:
# #         return Response({
# #             'error': 'Voice input is required',
# #             'spoken_response': 'Please speak your secret code.'
# #         }, status=400)
    
# #     try:
# #         voice_profile = VoiceUserProfile.objects.get(voice_secret_code=voice_input)
# #         user = voice_profile.user
        
# #         return Response({
# #             'message': 'Login successful',
# #             'user_id': user.id,
# #             'greeting_name': voice_profile.voice_greeting_name,
# #             'spoken_response': f'Welcome back, {voice_profile.voice_greeting_name}! How can I assist you today?'
# #         })
        
# #     except VoiceUserProfile.DoesNotExist:
# #         return Response({
# #             'error': 'Invalid secret code',
# #             'spoken_response': 'Secret code not recognized. Please try again or use forgot secret code.'
# #         }, status=401)

# @api_view(['POST'])
# @permission_classes([AllowAny])
# def forgot_secret_code(request):
#     phone_number = request.data.get('phone_number', '').strip()
#     greeting_name = request.data.get('greeting_name', '').strip()
    
#     if not phone_number:
#         return Response({
#             'error': 'Phone number is required',
#             'spoken_response': 'Please provide your registered phone number.'
#         }, status=400)
    
#     if not greeting_name:
#         return Response({
#             'error': 'Name is required',
#             'spoken_response': 'Please provide your registered name for verification.'
#         }, status=400)
    
#     try:
#         # Find user by phone number and name
#         voice_profile = VoiceUserProfile.objects.get(
#             phone_number=phone_number, 
#             voice_greeting_name__iexact=greeting_name
#         )
        
#         # Generate new secret code (you can make this more sophisticated)
#         import random
#         import string
#         new_secret = ''.join(random.choices(string.ascii_lowercase + string.digits, k=6))
        
#         # Update the secret code while preserving all user data
#         old_secret = voice_profile.voice_secret_code
#         voice_profile.voice_secret_code = new_secret
#         voice_profile.save()
        
#         return Response({
#             'message': 'Secret code reset successfully',
#             'new_secret': new_secret,
#             'greeting_name': voice_profile.voice_greeting_name,
#             'spoken_response': f'Hello {voice_profile.voice_greeting_name}! Your new secret code is {new_secret}. All your previous data is preserved.'
#         })
        
#     except VoiceUserProfile.DoesNotExist:
#         return Response({
#             'error': 'Account not found',
#             'spoken_response': 'No account found with this phone number and name combination. Please check your details.'
#         }, status=404)

# # @api_view(['POST'])
# # @permission_classes([AllowAny])
# # def voice_logout(request):
# #     return Response({
# #         'message': 'Logout successful', 
# #         'spoken_response': 'Goodbye! You have been logged out.'
# #     })

# # @api_view(['GET'])
# # @permission_classes([AllowAny])
# # def get_voice_profile(request):
# #     user_id = request.GET.get('user_id')
    
# #     if not user_id:
# #         return Response({'error': 'User ID is required'}, status=400)
    
# #     try:
# #         user = User.objects.get(id=user_id)
# #         voice_profile = VoiceUserProfile.objects.get(user=user)
        
# #         medication_count = MedicationReminder.objects.filter(user=user).count()
# #         expense_count = Expense.objects.filter(user=user).count()
# #         alert_count = EmergencyAlert.objects.filter(user=user).count()
# #         note_count = VoiceNote.objects.filter(user=user).count()
        
# #         return Response({
# #             'user_id': user.id,
# #             'greeting_name': voice_profile.voice_greeting_name,
# #             'phone_number': voice_profile.phone_number,
# #             'summary': {
# #                 'medication_reminders': medication_count,
# #                 'expenses_tracked': expense_count,
# #                 'emergency_alerts': alert_count,
# #                 'voice_notes': note_count
# #             },
# #             'spoken_response': f'You have {medication_count} medications, {expense_count} expenses, and {note_count} voice notes.'
# #         })
        
# #     except (User.DoesNotExist, VoiceUserProfile.DoesNotExist):
# #         return Response({'error': 'Profile not found'}, status=404)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])  # Only logged-in users
# def get_voice_profile(request):
#     """Get profile for currently logged-in user"""
#     try:
#         user = request.user  # Automatically the logged-in user
#         voice_profile = VoiceUserProfile.objects.get(user=user)
        
#         medication_count = MedicationReminder.objects.filter(user=user).count()
#         expense_count = Expense.objects.filter(user=user).count()
#         alert_count = EmergencyAlert.objects.filter(user=user).count()
#         note_count = VoiceNote.objects.filter(user=user).count()
        
#         return Response({
#             'user_id': user.id,
#             'greeting_name': voice_profile.voice_greeting_name,
#             'phone_number': voice_profile.phone_number,
#             'summary': {
#                 'medication_reminders': medication_count,
#                 'expenses_tracked': expense_count,
#                 'emergency_alerts': alert_count,
#                 'voice_notes': note_count
#             },
#             'spoken_response': f'You have {medication_count} medications, {expense_count} expenses, and {note_count} voice notes.'
#         })
        
#     except VoiceUserProfile.DoesNotExist:
#         return Response({'error': 'Voice profile not found'}, status=404)





# from rest_framework import status
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.response import Response
# from rest_framework.permissions import AllowAny, IsAuthenticated
# from django.contrib.auth.models import User
# from api.models import VoiceUserProfile, MedicationReminder, Expense, EmergencyAlert, VoiceNote
# from rest_framework_simplejwt.tokens import RefreshToken

# @api_view(['POST'])
# @permission_classes([AllowAny])
# def voice_register(request):
#     voice_secret = request.data.get('voice_secret', '').strip().lower()
#     greeting_name = request.data.get('greeting_name', 'Friend').strip()
#     phone_number = request.data.get('phone_number', '').strip()
    
#     if not voice_secret:
#         return Response({'error': 'Voice secret required'}, status=400)
#     if not phone_number:
#         return Response({'error': 'Phone number required'}, status=400)
    
#     if VoiceUserProfile.objects.filter(voice_secret_code=voice_secret).exists():
#         return Response({
#             'error': 'Voice secret already exists',
#             'spoken_response': 'This secret code is already taken. Please choose a different one.'
#         }, status=400)
    
#     if VoiceUserProfile.objects.filter(phone_number=phone_number).exists():
#         return Response({
#             'error': 'Phone number already registered',
#             'spoken_response': 'This phone number is already registered.'
#         }, status=400)
    
#     username = f"voice_user_{phone_number}"
#     user = User.objects.create_user(
#         username=username,
#         password=f"voice_pass_{voice_secret}"
#     )
    
#     voice_profile = VoiceUserProfile.objects.create(
#         user=user,
#         voice_secret_code=voice_secret,
#         voice_greeting_name=greeting_name,
#         phone_number=phone_number
#     )
    
#     refresh = RefreshToken.for_user(user)
    
#     return Response({
#         'message': 'Registration successful',
#         'user_id': user.id,
#         'access_token': str(refresh.access_token),
#         'refresh_token': str(refresh),
#         'spoken_response': f'Welcome {greeting_name}! Registration complete.'
#     })

# @api_view(['POST'])
# @permission_classes([AllowAny])
# def voice_login(request):
#     voice_input = request.data.get('voice_input', '').strip().lower()
    
#     if not voice_input:
#         return Response({
#             'error': 'Voice input is required',
#             'spoken_response': 'Please speak your secret code.'
#         }, status=400)
    
#     try:
#         voice_profile = VoiceUserProfile.objects.get(voice_secret_code=voice_input)
#         user = voice_profile.user
        
#         refresh = RefreshToken.for_user(user)
        
#         return Response({
#             'message': 'Login successful',
#             'user_id': user.id,
#             'access_token': str(refresh.access_token),
#             'refresh_token': str(refresh),
#             'greeting_name': voice_profile.voice_greeting_name,
#             'spoken_response': f'Welcome back, {voice_profile.voice_greeting_name}!'
#         })
        
#     except VoiceUserProfile.DoesNotExist:
#         return Response({
#             'error': 'Invalid secret code',
#             'spoken_response': 'Secret code not recognized. Please try again.'
#         }, status=401)

# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
# from rest_framework_simplejwt.exceptions import TokenError

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def voice_logout(request):
#     """
#     Logout user by blacklisting both refresh and access tokens.
#     """
#     try:
#         # Get tokens from request headers/body
#         auth_header = request.META.get('HTTP_AUTHORIZATION', '')
#         refresh_token = request.data.get('refresh_token')

#         # Blacklist access token
#         if auth_header.startswith('Bearer '):
#             access_token = auth_header.split(' ')[1]
#             try:
#                 token = AccessToken(access_token)
#                 token.blacklist()   # immediately invalidates
#             except TokenError:
#                 pass

#         # Blacklist refresh token (optional)
#         if refresh_token:
#             try:
#                 refresh = RefreshToken(refresh_token)
#                 refresh.blacklist()
#             except TokenError:
#                 pass

#         return Response({
#             'message': 'Logout successful',
#             'spoken_response': 'Goodbye! You have been logged out successfully.'
#         })

#     except Exception as e:
#         return Response({
#             'message': 'Logout error',
#             'error': str(e)
#         }, status=400)

        
# # @api_view(['POST'])
# # @permission_classes([IsAuthenticated])
# # def voice_logout(request):
# #     return Response({
# #         'message': 'Logout successful', 
# #         'spoken_response': 'Goodbye! You have been logged out.'
# #     })

# @api_view(['POST'])
# @permission_classes([AllowAny])
# def forgot_secret_code(request):
#     phone_number = request.data.get('phone_number', '').strip()
#     greeting_name = request.data.get('greeting_name', '').strip()
    
#     if not phone_number:
#         return Response({
#             'error': 'Phone number is required',
#             'spoken_response': 'Please provide your registered phone number.'
#         }, status=400)
    
#     if not greeting_name:
#         return Response({
#             'error': 'Name is required',
#             'spoken_response': 'Please provide your registered name for verification.'
#         }, status=400)
    
#     try:
#         voice_profile = VoiceUserProfile.objects.get(
#             phone_number=phone_number, 
#             voice_greeting_name__iexact=greeting_name
#         )
        
#         import random
#         import string
#         new_secret = ''.join(random.choices(string.ascii_lowercase + string.digits, k=6))
        
#         old_secret = voice_profile.voice_secret_code
#         voice_profile.voice_secret_code = new_secret
#         voice_profile.save()
        
#         return Response({
#             'message': 'Secret code reset successfully',
#             'new_secret': new_secret,
#             'greeting_name': voice_profile.voice_greeting_name,
#             'spoken_response': f'Hello {voice_profile.voice_greeting_name}! Your new secret code is {new_secret}.'
#         })
        
#     except VoiceUserProfile.DoesNotExist:
#         return Response({
#             'error': 'Account not found',
#             'spoken_response': 'No account found with this phone number and name.'
#         }, status=404)

# @api_view(['POST'])
# @permission_classes([AllowAny])
# def token_refresh(request):
#     refresh_token = request.data.get('refresh_token')
    
#     if not refresh_token:
#         return Response({'error': 'Refresh token required'}, status=400)
    
#     try:
#         refresh = RefreshToken(refresh_token)
#         new_access_token = str(refresh.access_token)
        
#         return Response({
#             'access_token': new_access_token,
#             'message': 'Token refreshed successfully'
#         })
#     except Exception as e:
#         return Response({'error': 'Invalid refresh token'}, status=401)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_voice_profile(request):
#     try:
#         user = request.user
#         voice_profile = VoiceUserProfile.objects.get(user=user)
        
#         medication_count = MedicationReminder.objects.filter(user=user).count()
#         expense_count = Expense.objects.filter(user=user).count()
#         alert_count = EmergencyAlert.objects.filter(user=user).count()
#         note_count = VoiceNote.objects.filter(user=user).count()
        
#         return Response({
#             'user_id': user.id,
#             'greeting_name': voice_profile.voice_greeting_name,
#             'phone_number': voice_profile.phone_number,
#             'summary': {
#                 'medication_reminders': medication_count,
#                 'expenses_tracked': expense_count,
#                 'emergency_alerts': alert_count,
#                 'voice_notes': note_count
    #         },
    #         'spoken_response': f'You have {medication_count} medications, {expense_count} expenses, and {note_count} voice notes.'
    #     })
        
    # except VoiceUserProfile.DoesNotExist:
    #     return Response({'error': 'Voice profile not found'}, status=404)
    
    

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth.models import User
from api.models import VoiceUserProfile, MedicationReminder, Expense, VoiceNote, BlacklistedToken
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.exceptions import TokenError
from django.utils import timezone
import random
import string


# ---------------------------
# REGISTER
# ---------------------------
@api_view(['POST'])
@permission_classes([AllowAny])
def voice_register(request):
    voice_secret = request.data.get('voice_secret', '').strip().lower()
    greeting_name = request.data.get('greeting_name', 'Friend').strip()
    phone_number = request.data.get('phone_number', '').strip()
    
    if not voice_secret:
        return Response({'error': 'Voice secret required'}, status=400)
    if not phone_number:
        return Response({'error': 'Phone number required'}, status=400)
    
    if VoiceUserProfile.objects.filter(voice_secret_code=voice_secret).exists():
        return Response({
            'error': 'Voice secret already exists',
            'spoken_response': 'This secret code is already taken. Please choose a different one.'
        }, status=400)
    
    if VoiceUserProfile.objects.filter(phone_number=phone_number).exists():
        return Response({
            'error': 'Phone number already registered',
            'spoken_response': 'This phone number is already registered.'
        }, status=400)
    
    username = f"voice_user_{phone_number}"
    user = User.objects.create_user(
        username=username,
        password=f"voice_pass_{voice_secret}"
    )
    
    voice_profile = VoiceUserProfile.objects.create(
        user=user,
        voice_secret_code=voice_secret,
        voice_greeting_name=greeting_name,
        phone_number=phone_number
    )
    
    refresh = RefreshToken.for_user(user)
    
    return Response({
        'message': 'Registration successful',
        'user_id': user.id,
        'access_token': str(refresh.access_token),
        'refresh_token': str(refresh),
        'spoken_response': f'Welcome {greeting_name}! Registration complete.'
    })


# ---------------------------
# LOGIN
# ---------------------------
@api_view(['POST'])
@permission_classes([AllowAny])
def voice_login(request):
    voice_input = request.data.get('voice_input', '').strip().lower()
    
    if not voice_input:
        return Response({
            'error': 'Voice input is required',
            'spoken_response': 'Please speak your secret code.'
        }, status=400)
    
    try:
        voice_profile = VoiceUserProfile.objects.get(voice_secret_code=voice_input)
        user = voice_profile.user
        
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'message': 'Login successful',
            'user_id': user.id,
            'access_token': str(refresh.access_token),
            'refresh_token': str(refresh),
            'greeting_name': voice_profile.voice_greeting_name,
            'spoken_response': f'Welcome back, {voice_profile.voice_greeting_name}!'
        })
        
    except VoiceUserProfile.DoesNotExist:
        return Response({
            'error': 'Invalid secret code',
            'spoken_response': 'Secret code not recognized. Please try again.'
        }, status=401)


# ---------------------------
# LOGOUT
# ---------------------------
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def voice_logout(request):
    try:
        auth_header = request.META.get('HTTP_AUTHORIZATION', '')
        refresh_token = request.data.get('refresh_token')

        # --- Blacklist Access Token ---
        if auth_header.startswith('Bearer '):
            access_token = auth_header.split(' ')[1]
            if not BlacklistedToken.objects.filter(token=access_token).exists():
                BlacklistedToken.objects.create(
                    token=access_token,
                    user=request.user,
                    blacklisted_at=timezone.now()
                )

        # --- Blacklist Refresh Token (optional) ---
        if refresh_token:
            if not BlacklistedToken.objects.filter(token=refresh_token).exists():
                BlacklistedToken.objects.create(
                    token=refresh_token,
                    user=request.user,
                    blacklisted_at=timezone.now()
                )

        return Response({
            'message': 'Logout successful',
            'spoken_response': 'Goodbye! You have been logged out successfully.'
        })

    except Exception as e:
        return Response({
            'message': 'Logout error',
            'error': str(e)
        }, status=400)


# ---------------------------
# FORGOT SECRET CODE
# ---------------------------
# @api_view(['POST'])
# @permission_classes([AllowAny])
# def forgot_secret_code(request):
#     phone_number = request.data.get('phone_number', '').strip()
#     greeting_name = request.data.get('greeting_name', '').strip()
    
#     if not phone_number:
#         return Response({
#             'error': 'Phone number is required',
#             'spoken_response': 'Please provide your registered phone number.'
#         }, status=400)
    
#     if not greeting_name:
#         return Response({
#             'error': 'Name is required',
#             'spoken_response': 'Please provide your registered name for verification.'
#         }, status=400)
    
#     try:
#         voice_profile = VoiceUserProfile.objects.get(
#             phone_number=phone_number, 
#             voice_greeting_name__iexact=greeting_name
#         )
        
#         new_secret = ''.join(random.choices(string.ascii_lowercase + string.digits, k=6))
#         voice_profile.voice_secret_code = new_secret
#         voice_profile.save()
        
#         return Response({
#             'message': 'Secret code reset successfully',
#             'new_secret': new_secret,
#             'greeting_name': voice_profile.voice_greeting_name,
#             'spoken_response': f'Hello {voice_profile.voice_greeting_name}! Your new secret code is {new_secret}.'
#         })
        
#     except VoiceUserProfile.DoesNotExist:
#         return Response({
#             'error': 'Account not found',
#             'spoken_response': 'No account found with this phone number and name.'
#         }, status=404)

@api_view(['POST'])
@permission_classes([AllowAny])
def forgot_secret_code(request):
    phone_number = str(request.data.get('phone_number', '')).strip()
    greeting_name = str(request.data.get('greeting_name', '')).strip()
    
    if not phone_number:
        return Response({
            'error': 'Phone number is required',
            'spoken_response': 'Please provide your registered phone number.'
        }, status=400)
    
    if not greeting_name:
        return Response({
            'error': 'Name is required',
            'spoken_response': 'Please provide your registered name for verification.'
        }, status=400)
    
    try:
        voice_profile = VoiceUserProfile.objects.get(
            phone_number=phone_number, 
            voice_greeting_name__iexact=greeting_name
        )
        
        existing_secret = voice_profile.voice_secret_code
        
        return Response({
            'message': 'Secret code retrieved successfully',
            'secret_code': existing_secret,
            'greeting_name': voice_profile.voice_greeting_name,
            'spoken_response': f'Hello {voice_profile.voice_greeting_name}! Your secret code is {existing_secret}.'
        })
        
    except VoiceUserProfile.DoesNotExist:
        return Response({
            'error': 'Account not found',
            'spoken_response': 'No account found with this phone number and name.'
        }, status=404)

# ---------------------------
# TOKEN REFRESH
# ---------------------------
@api_view(['POST'])
@permission_classes([AllowAny])
def token_refresh(request):
    refresh_token = request.data.get('refresh_token')
    
    if not refresh_token:
        return Response({'error': 'Refresh token required'}, status=400)
    
    # Check if token is blacklisted
    if BlacklistedToken.objects.filter(token=refresh_token).exists():
        return Response({'error': 'Token has been blacklisted. Please log in again.'}, status=401)
    
    try:
        refresh = RefreshToken(refresh_token)
        new_access_token = str(refresh.access_token)
        return Response({
            'access_token': new_access_token,
            'message': 'Token refreshed successfully'
        })
    except Exception:
        return Response({'error': 'Invalid refresh token'}, status=401)


# ---------------------------
# VOICE PROFILE
# ---------------------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_voice_profile(request):
    try:
        auth_header = request.META.get('HTTP_AUTHORIZATION', '')
        if auth_header.startswith('Bearer '):
            access_token = auth_header.split(' ')[1]
            if BlacklistedToken.objects.filter(token=access_token).exists():
                return Response({'message': 'Please login again'}, status=401)

        user = request.user
        voice_profile = VoiceUserProfile.objects.get(user=user)
        
        medication_count = MedicationReminder.objects.filter(user=user).count()
        expense_count = Expense.objects.filter(user=user).count()
        # alert_count = EmergencyAlert.objects.filter(user=user).count()
        note_count = VoiceNote.objects.filter(user=user).count()
        
        return Response({
            'user_id': user.id,
            'greeting_name': voice_profile.voice_greeting_name,
            'phone_number': voice_profile.phone_number,
            'summary': {
                'medication_reminders': medication_count,
                'expenses_tracked': expense_count,
                # 'emergency_alerts': alert_count,
                'voice_notes': note_count
            },
            'spoken_response': f'You have {medication_count} medications, {expense_count} expenses, and {note_count} voice notes.'
        })
        
    except VoiceUserProfile.DoesNotExist:
        return Response({'error': 'Voice profile not found'}, status=404)
