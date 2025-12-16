# from rest_framework import serializers
# from .models import DeliveryPartner


# class DeliveryPartnerSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = DeliveryPartner
#         fields = "__all__"



from rest_framework import serializers
from .models import DeliveryPartner

class DeliveryPartnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryPartner
        fields = [
            "id",
            "full_name",
            "email",                 # ✅ REQUIRED
            "phone",
            "aadhar_number",
            "pan_number",
            "driving_license_number",
            "vehicle_number",
            "aadhar_front",
            "aadhar_back",
            "pan_card",
            "license_front",
            "license_back",
            "vehicle_rc",
            "live_photo",
            "status",
            "created_at",
        ]
