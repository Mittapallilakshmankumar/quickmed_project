from rest_framework import serializers
from .models import TimeSlot
from accounts.models import UserProfile   # ✅ ADD THIS


class DoctorMiniSerializer(serializers.ModelSerializer):
    fullName = serializers.CharField(source="full_name")

    class Meta:
        model = UserProfile
        fields = [
            "id",
            "fullName",
            "specialization",
            "years_of_experience",
            "consultation_fee",
            "clinic_address",
        ]


class TimeSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeSlot
        fields = [
            "id",
            "doctor",
            "date",
            "start_time",
            "end_time",
            "duration",
            "is_available",
            "is_booked",
        ]
