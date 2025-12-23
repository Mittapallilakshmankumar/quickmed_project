from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny#this is used for the to send a medicine to the user dashbord 
from rest_framework.response import Response
from rest_framework import status

from .models import VendorMedicine
from .serializers import VendorMedicineSerializer
from accounts.models import UserProfile


# ==================================================
# ADD MEDICINE (POST)
# ==================================================
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_vendor_medicine(request):
    """
    Add medicine for logged-in vendor
    """

    try:
        # 1️⃣ Get logged-in vendor using email
        vendor = UserProfile.objects.get(
            email=request.user.email,
            user_type="vendor"
        )

        # 2️⃣ Validate request data
        serializer = VendorMedicineSerializer(
    data=request.data,
    context={"request": request}
)

        if serializer.is_valid():
            # 3️⃣ Save medicine with vendor
            serializer.save(vendor=vendor)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print("❌ SERIALIZER ERRORS:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except UserProfile.DoesNotExist:
        return Response(
            {"error": "Vendor profile not found"},
            status=status.HTTP_404_NOT_FOUND
        )


# ==================================================
# LIST MEDICINES (GET)
# ==================================================
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def vendor_medicine_list(request):
    """
    Get medicines for logged-in vendor only
    """

    try:
        # 1️⃣ Get logged-in vendor
        vendor = UserProfile.objects.get(
            email=request.user.email,
            user_type="vendor"
        )

        # 2️⃣ Fetch only this vendor medicines
        medicines = VendorMedicine.objects.filter(vendor=vendor)

        # 3️⃣ Serialize and return
        serializer = VendorMedicineSerializer(medicines, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except UserProfile.DoesNotExist:
        return Response(
            {"error": "Vendor profile not found"},
            status=status.HTTP_404_NOT_FOUND
        )
# ==================================================
# GET / UPDATE / DELETE SINGLE MEDICINE
# ==================================================
@api_view(["GET", "PATCH", "DELETE"])
@permission_classes([IsAuthenticated])
def vendor_medicine_detail(request, pk):
    """
    Get / Update / Delete a single medicine (vendor only)
    """

    try:
        # 1️⃣ Get logged-in vendor
        vendor = UserProfile.objects.get(
            email=request.user.email,
            user_type="vendor"
        )

        # 2️⃣ Get medicine that belongs to this vendor
        medicine = VendorMedicine.objects.get(id=pk, vendor=vendor)

    except UserProfile.DoesNotExist:
        return Response(
            {"error": "Vendor profile not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    except VendorMedicine.DoesNotExist:
        return Response(
            {"error": "Medicine not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    # 🔹 UPDATE MEDICINE
    if request.method == "PATCH":
        serializer = VendorMedicineSerializer(
            medicine,
            data=request.data,
            partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 🔹 GET SINGLE MEDICINE
    if request.method == "GET":
        serializer = VendorMedicineSerializer(medicine)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 🔹 DELETE MEDICINE
    if request.method == "DELETE":
        medicine.delete()
        return Response(
            {"message": "Medicine deleted successfully"},
            status=status.HTTP_204_NO_CONTENT
        )


# ==================================================
# PUBLIC MEDICINE LIST (USER) to see medicine inth euser side this is needed
# ==================================================
@api_view(["GET"])
@permission_classes([AllowAny])
def public_medicine_list(request):
    """
    User can see all medicines added by vendors
    """
    medicines = VendorMedicine.objects.all()
    serializer = VendorMedicineSerializer(medicines, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)