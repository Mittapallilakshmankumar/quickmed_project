

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

from .models import ContactRequest, Review
from .serializers import ContactRequestSerializer, ReviewSerializer


# ================= CONTACT =================

@api_view(["POST"])
@permission_classes([AllowAny])   # ✅ NOW IT WILL WORK
def contact_request(request):
    serializer = ContactRequestSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(
            {"message": "Contact request submitted successfully"},
            status=status.HTTP_201_CREATED
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([AllowAny])   # (optional)
def contact_list(request):
    contacts = ContactRequest.objects.all().order_by("-created_at")
    serializer = ContactRequestSerializer(contacts, many=True)
    return Response(serializer.data)


# ================= REVIEWS =================

@api_view(["GET", "POST"])
@permission_classes([AllowAny])   # ✅ recommended
def reviews(request):

    if request.method == "GET":
        reviews = Review.objects.filter(is_approved=True).order_by("-created_at")
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(is_approved=True)
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)
