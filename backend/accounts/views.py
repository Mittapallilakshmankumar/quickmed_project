from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import UserProfile
from .serializers import SignupSerializer,UserProfileSerializer
from django.contrib.auth.hashers import check_password

#signup

@api_view(["POST"])
def signup(request):
    data = request.data

    # Duplicate email check
    if UserProfile.objects.filter(email=data.get("email")).exists():
        return Response(
            {"message": "Email already registered"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Duplicate phone check
    if UserProfile.objects.filter(phone=data.get("phone")).exists():
        return Response(
            {"message": "Phone number already registered"},
            status=status.HTTP_400_BAD_REQUEST
        )

    serializer = SignupSerializer(data=data)

    if serializer.is_valid():
        serializer.save()
        return Response(
            {"message": "Signup successful"},
            status=status.HTTP_201_CREATED
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

###login



@api_view(["POST"])
def login(request):
    email = request.data.get("email")
    password = request.data.get("password")
    user_type = request.data.get("userType")

    print("LOGIN INPUT 👉", email, password, user_type)

    try:
        user = UserProfile.objects.get(email=email)
    except UserProfile.DoesNotExist:
        print("❌ EMAIL NOT FOUND")
        return Response({"error": "Invalid credentials"}, status=401)

    print("DB VALUES 👉", user.email, user.password, user.user_type)

    # ✅ FIXED PASSWORD CHECK
    if not check_password(password, user.password):
        print("❌ PASSWORD MISMATCH")
        return Response({"error": "Invalid credentials"}, status=401)

    if user.user_type != user_type:
        print("❌ ROLE MISMATCH")
        return Response({"error": "Invalid role"}, status=403)

    print("✅ LOGIN SUCCESS")

    return Response({
        "message": "Login successful",
        "user": {
            "id": user.id,
            "email": user.email,
            "userType": user.user_type,
            "fullName": user.full_name
        }
    }, status=200)




###userprfile user,vender,doctore


@api_view(["GET"])
def get_user_profile(request):
    email = request.query_params.get("email")

    if not email:
        return Response({"error": "Email required"}, status=400)

    try:
        profile = UserProfile.objects.get(email=email)
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)

    except UserProfile.DoesNotExist:
        return Response({"error": "Profile not found"}, status=404)







@api_view(["POST", "PATCH"])
def update_user_profile(request):
    email = request.data.get("email")

    if not email:
        return Response({"error": "Email required"}, status=400)

    profile = UserProfile.objects.filter(email=email).first()

    # 🆕 CREATE PROFILE (POST)
    if request.method == "POST" and profile is None:
        serializer = UserProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    # ✏️ UPDATE PROFILE (PATCH)
    if profile:
        serializer = UserProfileSerializer(
            profile,
            data=request.data,
            partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)

    return Response({"error": "Profile not found"}, status=404)
