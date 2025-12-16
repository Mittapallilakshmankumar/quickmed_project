from django.db import models


class UserProfile(models.Model):

    USER_TYPES = (
        ('user', 'User'),
        ('patient', 'Patient'),
        ('doctor', 'Doctor'),
        ('vendor', 'Vendor'),
        ('delivery', 'Delivery'),
    )

    GENDER_CHOICES = (
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other'),
        ('prefer-not-to-say', 'Prefer Not To Say'),
    )

    # ---------------- BASIC SIGNUP FIELDS ----------------
    full_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, unique=True)
    password = models.CharField(max_length=255)   # encrypted
    user_type = models.CharField(max_length=20, choices=USER_TYPES)

    # ---------------- USER / PATIENT FIELDS ----------------
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=30, choices=GENDER_CHOICES, blank=True)
    delivery_address = models.TextField(blank=True)
    emergency_contact = models.CharField(max_length=15, blank=True)
    profile_photo = models.ImageField(
    upload_to="profile_photos/",
    null=True,
    blank=True
     )


    # ---------------- VENDOR FIELDS ----------------
    gst_number = models.CharField(max_length=20, blank=True)
    business_license = models.CharField(max_length=30, blank=True)
    pharmacy_name = models.CharField(max_length=150, blank=True)
    business_address = models.TextField(blank=True)
   
      # ---------------- VENDOR TIMING ----------------
    opening_time = models.TimeField(null=True, blank=True)
    closing_time = models.TimeField(null=True, blank=True)

   
    # ---------------- DELIVERY FIELDS ----------------
    vehicle_number = models.CharField(max_length=20, blank=True)
    vehicle_type = models.CharField(max_length=20, blank=True)
    id_proof_number = models.CharField(max_length=30, blank=True)
    id_proof_type = models.CharField(max_length=20, blank=True)

    # ---------------- DOCTOR FIELDS ----------------
    medical_license = models.CharField(max_length=30, blank=True)
    specialization = models.CharField(max_length=50, blank=True)
    years_of_experience = models.IntegerField(null=True, blank=True)
    consultation_fee = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    clinic_address = models.TextField(blank=True)
    # ---------------- LOCATION FIELDS ----------------
  
    # ----- doctor profiles fiellds LOCATION FIELDS #---vender profiles fileds--------------
    city = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    pincode = models.CharField(max_length=6, blank=True, null=True)

    # ---------------- COMMON META ----------------
    is_verified = models.BooleanField(default=False)
    verification_status = models.CharField(max_length=20, default="pending")
    last_login = models.DateTimeField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.full_name} ({self.user_type})"
