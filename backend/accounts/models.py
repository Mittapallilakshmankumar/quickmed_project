



from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager
)

# =========================================================
# USER MANAGER
# =========================================================
class UserProfileManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)  # 🔐 Encrypt password
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("user_type", "admin")

        return self.create_user(email, password, **extra_fields)


# =========================================================
# USER MODEL (AUTH USER)
# =========================================================
class UserProfile(AbstractBaseUser, PermissionsMixin):

    # ---------------- USER TYPES ----------------
    USER_TYPES = (
        ('user', 'User'),
        ('patient', 'Patient'),
        ('doctor', 'Doctor'),
        ('vendor', 'Vendor'),
        ('delivery', 'Delivery'),
        ('admin', 'Admin'),
    )

    GENDER_CHOICES = (
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other'),
        ('prefer-not-to-say', 'Prefer Not To Say'),
    )

    # ---------------- AUTH FIELDS ----------------
    email = models.EmailField(unique=True)
    phone = models.CharField(
    max_length=15,
    unique=True,
    null=True,
    blank=True
)
    full_name = models.CharField(max_length=100)
    
    user_type = models.CharField(max_length=20, choices=USER_TYPES)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    # ---------------- USER / PATIENT ----------------
    last_name = models.CharField(max_length=50, blank=True, null=True)
    # apartment = models.CharField(max_length=100, blank=True, null=True)
    apartment = models.TextField(blank=True, null=True)
    # district = models.CharField(max_length=100, blank=True, null=True)
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=30, choices=GENDER_CHOICES, blank=True)
    # delivery_address = models.TextField(blank=True)
    delivery_address = models.TextField(blank=True, null=True)
    # emergency_contact = models.CharField(max_length=15, blank=True)
    emergency_contact = models.CharField(max_length=15, blank=True, null=True)
    # pincode = models.CharField(max_length=6)
    pincode = models.CharField(max_length=6, blank=True, null=True)
    # USER / PATIENT ADDRESS (NEW)
    address = models.TextField(blank=True, null=True)


    profile_photo = models.ImageField(
        upload_to="profile_photos/",
        null=True,
        blank=True
    )

    # ---------------- VENDOR ----------------
    gst_number = models.CharField(max_length=20, blank=True)
    business_license = models.CharField(max_length=30, blank=True)
    pharmacy_name = models.CharField(max_length=150, blank=True)
    # business_address = models.TextField(blank=True)
    business_address = models.TextField(blank=True, null=True)

    opening_time = models.TimeField(null=True, blank=True)
    closing_time = models.TimeField(null=True, blank=True)

    # ---------------- DELIVERY ----------------
    vehicle_number = models.CharField(max_length=20, blank=True)
    vehicle_type = models.CharField(max_length=20, blank=True)
    id_proof_number = models.CharField(max_length=30, blank=True)
    id_proof_type = models.CharField(max_length=20, blank=True)

    # ---------------- DOCTOR ----------------
    medical_license = models.CharField(max_length=30, blank=True)
    specialization = models.CharField(max_length=50, blank=True)
    years_of_experience = models.IntegerField(null=True, blank=True)
    consultation_fee = models.DecimalField(
        max_digits=8,
        decimal_places=2,
        null=True,
        blank=True
    )
    clinic_address = models.TextField(blank=True)

    # ---------------- LOCATION ----------------
   
    district = models.TextField(blank=True, null=True)
    city = models.TextField(blank=True, null=True)
    state = models.TextField(blank=True, null=True)
    # ---------------- META ----------------
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # ---------------- DJANGO AUTH CONFIG ----------------
    objects = UserProfileManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return f"{self.full_name} ({self.user_type})"
