


from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import SignupSerializer
from django.contrib.auth.hashers import check_password

# ------------------------------------
# SIGNUP (already done by you)
# ------------------------------------
@api_view(["POST"])
def signup(request):
    serializer = SignupSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User registered successfully"}, status=201)
    return Response(serializer.errors, status=400)


# ------------------------------------
# EMAIL LOGIN
# ------------------------------------
@api_view(["POST"])
def email_login(request):
    email = request.data.get("email")
    password = request.data.get("password")
    userType = request.data.get("userType")

    try:
        user = User.objects.get(email=email, userType=userType)
    except User.DoesNotExist:
        return Response({"message": "Invalid login"}, status=400)

    if not check_password(password, user.password):
        return Response({"message": "Invalid credentials"}, status=400)

    return Response({
        "message": "Login successful",
        "user": {
            "fullName": user.fullName,
            "email": user.email,
            "phone": user.phone,
            "userType": user.userType
        }
    }, status=200)


# ------------------------------------
# SEND OTP
# ------------------------------------
@api_view(["POST"])
def send_otp(request):
    phone = request.data.get("phone")

    try:
        user = User.objects.get(phone=phone)
    except User.DoesNotExist:
        return Response({"message": "Phone not registered"}, status=400)

    request.session[f"otp_{phone}"] = "1234"  # Demo OTP
    return Response({"message": "OTP sent"}, status=200)


# ------------------------------------
# VERIFY OTP
# ------------------------------------
@api_view(["POST"])
def verify_otp(request):
    phone = request.data.get("phone")
    otp = request.data.get("otp")
    userType = request.data.get("userType")

    saved_otp = request.session.get(f"otp_{phone}")

    if saved_otp != otp:
        return Response({"message": "Invalid OTP"}, status=400)

    try:
        user = User.objects.get(phone=phone, userType=userType)
    except User.DoesNotExist:
        return Response({"message": "User not found"}, status=400)

    return Response({
        "message": "Login successful",
        "user": {
            "fullName": user.fullName,
            "email": user.email,
            "phone": user.phone,
            "userType": user.userType
        }
    }, status=200)
