# from django.contrib import admin
# from .models import UserProfile

# admin.site.register(UserProfile)


# accounts/admin.py

from django.contrib import admin
from .models import UserProfile


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):

    # 🔹 Columns shown in admin list view
    list_display = (
        "id",
        "full_name",
        "email",
        "phone",
        "user_type",
        "city",
        "state",
        "is_verified",
        "created_at",
    )

    # 🔍 Search box
    search_fields = (
        "full_name",
        "email",
        "phone",
        "pharmacy_name",
    )

    # 🧭 Right-side filters
    list_filter = (
        "user_type",
        "is_verified",
        "state",
        "created_at",
    )

    # ✏️ Editable fields directly in list
    list_editable = (
        "is_verified",
    )

    # 📄 Pagination
    list_per_page = 25

    # 📌 Read-only fields
    readonly_fields = (
        "created_at",
        "updated_at",
        "last_login",
    )

    # 🧩 Form layout grouping
    fieldsets = (
        ("Basic Information", {
            "fields": (
                "full_name",
                "email",
                "phone",
                "password",
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

        ("Verification & Meta", {
            "fields": (
                "is_verified",
                "verification_status",
                "last_login",
                "created_at",
                "updated_at",
            )
        }),
    )
