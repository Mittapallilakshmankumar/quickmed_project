


from rest_framework import serializers
from .models import UserProfile
from django.contrib.auth.hashers import make_password

#signup
class SignupSerializer(serializers.ModelSerializer):

    # 🔹 frontend → backend mapping
    fullName = serializers.CharField(source="full_name")#user,vender,doctor
    userType = serializers.CharField(source="user_type")#user,vender,doctor
    #user
    dateOfBirth = serializers.DateField(
        source="date_of_birth", required=False, allow_null=True
    )
    #user
    deliveryAddress = serializers.CharField(
        source="address", required=False, allow_blank=True
    )
    #user
    emergencyContact = serializers.CharField(
        source="emergency_contact", required=False, allow_blank=True
    )
    #vender
    gstNumber = serializers.CharField(
        source="gst_number", required=False, allow_blank=True
    )
    #vender
    businessLicense = serializers.CharField(
        source="business_license", required=False, allow_blank=True
    )
    #vender
    businessAddress = serializers.CharField(
    source="business_address",
    required=False,
    allow_blank=True
    )
    #vender
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
    #doctor
    medicalLicense = serializers.CharField(
        source="medical_license", required=False, allow_blank=True
    )
    #doctor
    specialization = serializers.CharField(
        required=False, allow_blank=True
    )
    #doctor
    yearsOfExperience = serializers.IntegerField(
        source="years_of_experience", required=False, allow_null=True
    )
    #doctor
    consultationFee = serializers.DecimalField(
        source="consultation_fee",
        max_digits=8,
        decimal_places=2,
        required=False,
        allow_null=True
    )
    #doctor
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
            "businessAddress",

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

#userprofile
class UserProfileSerializer(serializers.ModelSerializer):
    #vender#user#doctor
    fullName = serializers.CharField(source="full_name", required=False)
    userType = serializers.CharField(source="user_type", read_only=True)
    
    #venderfields#doctor
    city = serializers.CharField(required=False, allow_blank=True)
    #vender#doctor
    state = serializers.CharField(required=False, allow_blank=True)
    #user#doctor
    pincode = serializers.CharField(
    required=False,
    allow_blank=True,
    allow_null=True
    )

   
        # 🔥 THIS LINE SAVES IMAGE#user
    profilePhoto = serializers.ImageField(
        source="profile_photo",
        required=False,
        allow_null=True
    )


    #user
    dateOfBirth = serializers.DateField(
        source="date_of_birth", required=False, allow_null=True
    )
     #user
    deliveryAddress = serializers.CharField(
    source="address",
    required=False,
    allow_blank=True,
    allow_null=True
    )
    #user
    emergencyContact = serializers.CharField(
        source="emergency_contact", required=False, allow_blank=True
    )
    #user
    lastName = serializers.CharField(
    source="last_name", required=False, allow_blank=True
    )
    #user
    apartment = serializers.CharField(
    required=False,
    allow_blank=True,
    allow_null=True
    )

    
    district = serializers.CharField(
    required=False,
    allow_blank=True,
    allow_null=True
    )


    # 👨‍⚕️ DOCTOR FIELDS (THIS WAS MISSING)
    #doctor
    medicalLicense = serializers.CharField(
        source="medical_license", required=False, allow_blank=True
    )
    #doctor
    specialization = serializers.CharField(
        required=False, allow_blank=True
    )
    #doctor
    yearsOfExperience = serializers.IntegerField(
        source="years_of_experience", required=False, allow_null=True
    )
    #doctor
    consultationFee = serializers.DecimalField(
        source="consultation_fee",
        max_digits=8,
        decimal_places=2,
        required=False,
        allow_null=True
    )
    #doctor
    clinicAddress = serializers.CharField(
        source="clinic_address", required=False, allow_blank=True
    )
    # 🏪 VENDOR FIELDS
    #vender
    gstNumber = serializers.CharField(
    source="gst_number", required=False, allow_blank=True
   )
    #vender
    businessLicense = serializers.CharField(
    source="business_license", required=False, allow_blank=True
    )
    #vender
    pharmacyName = serializers.CharField(
    source="pharmacy_name", required=False, allow_blank=True
    )
    #vender
    businessAddress = serializers.CharField(
    source="business_address", required=False, allow_blank=True
    )
    # ⏰ VENDOR TIMINGS
    openingTime = serializers.TimeField(
    source="opening_time", required=False, allow_null=True
    )
    #vender
    closingTime = serializers.TimeField(
    source="closing_time", required=False, allow_null=True
     )



    class Meta:
        model = UserProfile
        fields = [
            "fullName",
             "lastName", 
            "email",
            "profilePhoto",
            "phone",
            "userType",
            "dateOfBirth",
            "gender",
            "deliveryAddress",
             "apartment",         # ✅ ADD
             "district",          # ✅ ADD
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




