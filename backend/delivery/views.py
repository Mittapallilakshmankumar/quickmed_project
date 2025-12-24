
# from rest_framework.decorators import api_view, permission_classes, parser_classes
# from rest_framework.permissions import AllowAny
# from rest_framework.parsers import MultiPartParser, FormParser
# from rest_framework.response import Response
# from rest_framework import status

# from .serializers import DeliveryPartnerSerializer


# @api_view(["POST"])
# @permission_classes([AllowAny])
# @parser_classes([MultiPartParser, FormParser])  # ✅ REQUIRED for file uploads
# def delivery_signup(request):

#     # ✅ CORRECT: no files=
#     serializer = DeliveryPartnerSerializer(data=request.data)

#     if serializer.is_valid():
#         obj = serializer.save()
#         return Response(
#             {
#                 "message": "Delivery partner registered",
#                 "id": obj.id,
#                 "email": obj.email
#             },
#             status=status.HTTP_201_CREATED
#         )

#     print("ERRORS:", serializer.errors)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(["POST"])
# @permission_classes([AllowAny])
# def delivery_login(request):
#     email = request.data.get("email")

#     if not email:
#         return Response(
#             {"error": "Email is required"},
#             status=status.HTTP_400_BAD_REQUEST
#         )

#     from .models import DeliveryPartner

#     try:
#         delivery = DeliveryPartner.objects.get(email=email)
#     except DeliveryPartner.DoesNotExist:
#         return Response(
#             {"error": "Invalid delivery email"},
#             status=status.HTTP_401_UNAUTHORIZED
#         )

#     # ✅ LOGIN SUCCESS
#     return Response({
#         "id": delivery.id,
#         "email": delivery.email,
#         "fullName": delivery.full_name,
#         "userType": "delivery",
#         "status": delivery.status
#     }, status=status.HTTP_200_OK)


from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response
from rest_framework import status
 
from .serializers import DeliveryPartnerSerializer, DeliveryPartnerProfileSerializer
from .models import DeliveryPartner
 
 
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
 
 
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_delivery_profile(request):
    """Get delivery partner profile"""
    try:
        # Get delivery partner linked to the authenticated user
        delivery_partner = DeliveryPartner.objects.get(user=request.user)
    except DeliveryPartner.DoesNotExist:
        return Response(
            {"error": "Delivery partner profile not found"},
            status=status.HTTP_404_NOT_FOUND
        )
   
    serializer = DeliveryPartnerProfileSerializer(delivery_partner, context={'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)
 
 
@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
@parser_classes([JSONParser, MultiPartParser, FormParser])
def update_delivery_profile(request):
    """Update delivery partner profile"""
    try:
        # Get delivery partner linked to the authenticated user
        delivery_partner = DeliveryPartner.objects.get(user=request.user)
    except DeliveryPartner.DoesNotExist:
        return Response(
            {"error": "Delivery partner profile not found"},
            status=status.HTTP_404_NOT_FOUND
        )
   
    # Prepare data for serializer (only DeliveryPartner fields)
    # serializer_data = {
    #     'full_name': request.data.get('full_name'),
    #     'phone': request.data.get('phone'),
    #     'vehicle_number': request.data.get('vehicle_number'),
    # }
@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
@parser_classes([JSONParser, MultiPartParser, FormParser])
def update_delivery_profile(request):
    try:
        delivery_partner = DeliveryPartner.objects.get(user=request.user)
    except DeliveryPartner.DoesNotExist:
        return Response(
            {"error": "Delivery partner profile not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = DeliveryPartnerProfileSerializer(
        delivery_partner,
        data=request.data,          # ✅ SEND FULL DATA
        partial=True,
        context={"request": request}
    )

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Remove None values
    serializer_data = {k: v for k, v in serializer_data.items() if v is not None}
   
    serializer = DeliveryPartnerProfileSerializer(
        delivery_partner,
        data=serializer_data,
        partial=True,
        context={'request': request}  # ✅ Pass request to serializer for additional fields
    )
   
    if serializer.is_valid():
        serializer.save()
       
        # Refresh from database to get updated data
        delivery_partner.refresh_from_db()
       
        # Return updated data with all fields
        response_serializer = DeliveryPartnerProfileSerializer(delivery_partner, context={'request': request})
        return Response(response_serializer.data, status=status.HTTP_200_OK)
   
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 