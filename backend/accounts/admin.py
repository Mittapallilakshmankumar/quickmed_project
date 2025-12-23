from django.contrib import admin
from .models import UserProfile


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "full_name",
        "email",
        "phone",
        "user_type",
        "city",
        "state",
        "is_active",
        "is_staff",
        "created_at",
    )

    search_fields = (
        "full_name",
        "email",
        "phone",
        "pharmacy_name",
    )

    list_filter = (
        "user_type",
        "is_active",
        "is_staff",
        "state",
        "created_at",
    )

    list_per_page = 25

    readonly_fields = (
        "created_at",
        "updated_at",
        "last_login",
    )

    fieldsets = (
        ("Basic Information", {
            "fields": (
                "full_name",
                "email",
                "phone",
                "user_type",
            )
        }),

        ("Personal Details", {
            "fields": (
                "date_of_birth",
                "gender",
                "delivery_address",
                "emergency_contact",
                "profile_photo",
            )
        }),

        ("Vendor Details", {
            "fields": (
                "pharmacy_name",
                "business_license",
                "gst_number",
                "business_address",
                "opening_time",
                "closing_time",
            ),
            "classes": ("collapse",),
        }),

        ("Doctor Details", {
            "fields": (
                "medical_license",
                "specialization",
                "years_of_experience",
                "consultation_fee",
                "clinic_address",
            ),
            "classes": ("collapse",),
        }),

        ("Delivery Details", {
            "fields": (
                "vehicle_number",
                "vehicle_type",
                "id_proof_number",
                "id_proof_type",
            ),
            "classes": ("collapse",),
        }),

        ("Location", {
            "fields": (
                "city",
                "state",
                "pincode",
            )
        }),

        ("System Info", {
            "fields": (
                "is_active",
                "is_staff",
                "last_login",
                "created_at",
                "updated_at",
            )
        }),
    )
