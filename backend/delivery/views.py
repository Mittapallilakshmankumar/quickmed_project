
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status

from .serializers import DeliveryPartnerSerializer


@api_view(["POST"])
@permission_classes([AllowAny])
@parser_classes([MultiPartParser, FormParser])  # ✅ REQUIRED for file uploads
def delivery_signup(request):

    # ✅ CORRECT: no files=
    serializer = DeliveryPartnerSerializer(data=request.data)

    if serializer.is_valid():
        obj = serializer.save()
        return Response(
            {
                "message": "Delivery partner registered",
                "id": obj.id,
                "email": obj.email
            },
            status=status.HTTP_201_CREATED
        )

    print("ERRORS:", serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([AllowAny])
def delivery_login(request):
    email = request.data.get("email")

    if not email:
        return Response(
            {"error": "Email is required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    from .models import DeliveryPartner

    try:
        delivery = DeliveryPartner.objects.get(email=email)
    except DeliveryPartner.DoesNotExist:
        return Response(
            {"error": "Invalid delivery email"},
            status=status.HTTP_401_UNAUTHORIZED
        )

    # ✅ LOGIN SUCCESS
    return Response({
        "id": delivery.id,
        "email": delivery.email,
        "fullName": delivery.full_name,
        "userType": "delivery",
        "status": delivery.status
    }, status=status.HTTP_200_OK)
