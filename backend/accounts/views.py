






from rest_framework.decorators import api_view, parser_classes, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import check_password
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny

from .models import UserProfile
from .serializers import SignupSerializer, UserProfileSerializer


# ============================
# SIGNUP
# ============================
@api_view(["POST"])
@permission_classes([AllowAny]) 
def signup(request):
    data = request.data

    if UserProfile.objects.filter(email=data.get("email")).exists():
        return Response({"message": "Email already registered"}, status=400)

    if UserProfile.objects.filter(phone=data.get("phone")).exists():
        return Response({"message": "Phone already registered"}, status=400)

    serializer = SignupSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Signup successful"}, status=201)

    return Response(serializer.errors, status=400)


# ============================
# LOGIN (JWT)
# ============================
@api_view(["POST"])
@permission_classes([AllowAny])
def login(request):
    email = request.data.get("email")
    password = request.data.get("password")
    user_type = request.data.get("userType")

    try:
        user = UserProfile.objects.get(email=email)
    except UserProfile.DoesNotExist:
        return Response({"error": "Invalid credentials"}, status=401)

    if not check_password(password, user.password):
        return Response({"error": "Invalid credentials"}, status=401)

    if user.user_type != user_type:
        return Response({"error": "Invalid role"}, status=403)

    refresh = RefreshToken.for_user(user)

    return Response({
        "access": str(refresh.access_token),
        "refresh": str(refresh),
        "user": {
            "id": user.id,
            "email": user.email,
            "userType": user.user_type,
            "fullName": user.full_name
        }
    }, status=200)


# ============================
# GET PROFILE (JWT REQUIRED)
# ============================
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    try:
        profile = UserProfile.objects.get(id=request.user.id)
    except UserProfile.DoesNotExist:
        return Response({"detail": "Profile not found"}, status=404)

    serializer = UserProfileSerializer(profile, context={"request": request})
    return Response(serializer.data, status=200)




@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
# @parser_classes([MultiPartParser, FormParser])
@parser_classes([JSONParser, MultiPartParser, FormParser])

def update_user_profile(request):
    try:
        profile = UserProfile.objects.get(id=request.user.id)
    except UserProfile.DoesNotExist:
        return Response({"detail": "Profile not found"}, status=404)

    
    serializer = UserProfileSerializer(
        profile,
        data=request.data,
        partial=True
    )

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=200)

    return Response(serializer.errors, status=400)






