from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class DeliveryPartner(models.Model):
    # User will be linked AFTER approval
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    # Basic info
    full_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    email = models.EmailField(unique=True, null=True, blank=True)

    # Document numbers
    aadhar_number = models.CharField(max_length=12)
    pan_number = models.CharField(max_length=10)
    driving_license_number = models.CharField(max_length=20)
    vehicle_number = models.CharField(max_length=15)

    # Document images
    aadhar_front = models.ImageField(upload_to="delivery/aadhar/", null=True, blank=True)
    aadhar_back = models.ImageField(upload_to="delivery/aadhar/", null=True, blank=True)
    pan_card = models.ImageField(upload_to="delivery/pan/", null=True, blank=True)
    license_front = models.ImageField(upload_to="delivery/license/", null=True, blank=True)
    license_back = models.ImageField(upload_to="delivery/license/", null=True, blank=True)
    vehicle_rc = models.ImageField(upload_to="delivery/vehicle/", null=True, blank=True)
    live_photo = models.ImageField(upload_to="delivery/selfie/", null=True, blank=True)

    # Verification flags
    is_phone_verified = models.BooleanField(default=False)
    is_email_verified = models.BooleanField(default=False)
    is_aadhar_verified = models.BooleanField(default=False)

    status = models.CharField(
        max_length=20,
        choices=[
            ("pending", "Pending"),
            ("approved", "Approved"),
            ("rejected", "Rejected")
        ],
        default="pending"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.full_name
