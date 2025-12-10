from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Review,ContactRequest
from .serializers import ReviewSerializer,ContactSerializer

#review
@api_view(['GET'])
def getReviews(request):
    reviews = Review.objects.all().order_by('-id')
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def addReview(request):
    serializer = ReviewSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Review added successfully"})
    return Response(serializer.errors)


#contact

@api_view(['POST'])
def save_contact(request):
    serializer = ContactSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"status": "success", "message": "Contact request saved successfully!"})
    return Response({"status": "error", "errors": serializer.errors})
