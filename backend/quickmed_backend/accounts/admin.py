from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


class CustomUserAdmin(UserAdmin):
    model = User

    # 🟢 WHAT YOU SEE IN USER LIST PAGE
    list_display = (
        "email",
        "fullName",
        "phone",
        "userType",
        "dateOfBirth",
        "gender",
        "is_active",
        "is_staff",
    )
    list_filter = ("userType", "gender", "is_active", "is_staff")

    # 🟢 HOW FIELDS ARE ORGANIZED INSIDE USER DETAILS PAGE
    fieldsets = (
        ("Login Info", {"fields": ("email", "password")}),
        
        ("Personal Details", {
            "fields": (
                "fullName",
                "phone",
                "userType",
                "dateOfBirth",
                "gender",
                "address",
                "emergencyContact",
                "linkedAccounts",
            )
        }),

        ("Permissions", {
            "fields": (
                "is_active",
                "is_staff",
                "is_superuser",
                "groups",
                "user_permissions",
            )
        }),

        ("Verification", {"fields": ("isVerified",)}),
    )

    # 🟢 When adding a new user in admin
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": (
                "email",
                "fullName",
                "phone",
                "userType",
                "password1",
                "password2",
                "is_staff",
                "is_active",
            ),
        }),
    )

    search_fields = ("email", "fullName", "phone")
    ordering = ("email",)


admin.site.register(User, CustomUserAdmin)
