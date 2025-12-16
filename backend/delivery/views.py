from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .serializers import DeliveryPartnerSerializer

@api_view(["POST"])
@permission_classes([AllowAny])
def delivery_signup(request):
    serializer = DeliveryPartnerSerializer(
        data=request.data,
        files=request.FILES   # ✅ REQUIRED
    )

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

    print("ERRORS:", serializer.errors)  # DEBUG
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
