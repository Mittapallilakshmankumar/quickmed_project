

from rest_framework import serializers
from .models import UserProfile
from django.contrib.auth.hashers import make_password


class SignupSerializer(serializers.ModelSerializer):

    # 🔹 frontend → backend mapping
    fullName = serializers.CharField(source="full_name")
    userType = serializers.CharField(source="user_type")

    dateOfBirth = serializers.DateField(
        source="date_of_birth", required=False, allow_null=True
    )
    deliveryAddress = serializers.CharField(
        source="delivery_address", required=False, allow_blank=True
    )
    emergencyContact = serializers.CharField(
        source="emergency_contact", required=False, allow_blank=True
    )

    gstNumber = serializers.CharField(
        source="gst_number", required=False, allow_blank=True
    )
    businessLicense = serializers.CharField(
        source="business_license", required=False, allow_blank=True
    )
    pharmacyName = serializers.CharField(
        source="pharmacy_name", required=False, allow_blank=True
    )

    vehicleNumber = serializers.CharField(
        source="vehicle_number", required=False, allow_blank=True
    )
    vehicleType = serializers.CharField(
        source="vehicle_type", required=False, allow_blank=True
    )
    idProofNumber = serializers.CharField(
        source="id_proof_number", required=False, allow_blank=True
    )
    idProofType = serializers.CharField(
        source="id_proof_type", required=False, allow_blank=True
    )

    medicalLicense = serializers.CharField(
        source="medical_license", required=False, allow_blank=True
    )
    specialization = serializers.CharField(
        required=False, allow_blank=True
    )
    yearsOfExperience = serializers.IntegerField(
        source="years_of_experience", required=False, allow_null=True
    )
    consultationFee = serializers.DecimalField(
        source="consultation_fee",
        max_digits=8,
        decimal_places=2,
        required=False,
        allow_null=True
    )
    clinicAddress = serializers.CharField(
        source="clinic_address", required=False, allow_blank=True
    )

    class Meta:
        model = UserProfile
        fields = [
            "fullName",
            "email",
            "phone",
            "password",
            "userType",

            "dateOfBirth",
            "gender",
            "deliveryAddress",
            "emergencyContact",

            "gstNumber",
            "businessLicense",
            "pharmacyName",

            "vehicleNumber",
            "vehicleType",
            "idProofNumber",
            "idProofType",

            "medicalLicense",
            "specialization",
            "yearsOfExperience",
            "consultationFee",
            "clinicAddress",
        ]
        extra_kwargs = {
            "password": {"write_only": True}
        }

    def create(self, validated_data):
        validated_data["password"] = make_password(
            validated_data["password"]
        )
        return super().create(validated_data)


class UserProfileSerializer(serializers.ModelSerializer):

    fullName = serializers.CharField(source="full_name", required=False)
    userType = serializers.CharField(source="user_type", read_only=True)

    dateOfBirth = serializers.DateField(
        source="date_of_birth", required=False, allow_null=True
    )
    deliveryAddress = serializers.CharField(
        source="delivery_address", required=False, allow_blank=True
    )
    emergencyContact = serializers.CharField(
        source="emergency_contact", required=False, allow_blank=True
    )

    # 👨‍⚕️ DOCTOR FIELDS (THIS WAS MISSING)
    medicalLicense = serializers.CharField(
        source="medical_license", required=False, allow_blank=True
    )
    specialization = serializers.CharField(
        required=False, allow_blank=True
    )
    yearsOfExperience = serializers.IntegerField(
        source="years_of_experience", required=False, allow_null=True
    )
    consultationFee = serializers.DecimalField(
        source="consultation_fee",
        max_digits=8,
        decimal_places=2,
        required=False,
        allow_null=True
    )
    clinicAddress = serializers.CharField(
        source="clinic_address", required=False, allow_blank=True
    )
    # 🏪 VENDOR FIELDS
    gstNumber = serializers.CharField(
    source="gst_number", required=False, allow_blank=True
   )
    businessLicense = serializers.CharField(
    source="business_license", required=False, allow_blank=True
    )
    pharmacyName = serializers.CharField(
    source="pharmacy_name", required=False, allow_blank=True
    )
    businessAddress = serializers.CharField(
    source="business_address", required=False, allow_blank=True
    )
    # ⏰ VENDOR TIMINGS
    openingTime = serializers.TimeField(
    source="opening_time", required=False, allow_null=True
    )
    closingTime = serializers.TimeField(
    source="closing_time", required=False, allow_null=True
     )



    class Meta:
        model = UserProfile
        fields = [
            "fullName",
            "email",
            "phone",
            "userType",
            "dateOfBirth",
            "gender",
            "deliveryAddress",
            "emergencyContact",

            # doctor
            "medicalLicense",
            "specialization",
            "yearsOfExperience",
            "consultationFee",
            "clinicAddress",


             # 🏪 vendor
             "gstNumber",
             "businessLicense",
             "pharmacyName",
             "businessAddress",

               # ⏰ VENDOR TIMINGS (ADD THIS)
              "openingTime",
              "closingTime",

            # 🔥 LOCATION (THIS WAS MISSING)
            "city",
            "state",
            "pincode",
        ]
