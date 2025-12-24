

# from rest_framework import serializers
# from .models import DeliveryPartner

# class DeliveryPartnerSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = DeliveryPartner
#         fields = [
#             "id",
#             "full_name",
#             "email",                 # ✅ REQUIRED
#             "phone",
#             "aadhar_number",
#             "pan_number",
#             "driving_license_number",
#             "vehicle_number",
#             "aadhar_front",
#             "aadhar_back",
#             "pan_card",
#             "license_front",
#             "license_back",
#             "vehicle_rc",
#             "live_photo",
#             "status",
#             "created_at",
#         ]


from rest_framework import serializers
from .models import DeliveryPartner, DeliveryProfile
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
 
User = get_user_model()
 
class DeliveryPartnerSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
   
    class Meta:
        model = DeliveryPartner
        fields = [
            "id",
            "full_name",
            "email",                 # ✅ REQUIRED
            "phone",
            "password",              # ✅ ADDED for UserProfile creation
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
 
    def validate(self, attrs):
        """
        Lightweight validation to surface friendly errors instead of server failures.
        """
        email = attrs.get("email")
        phone = attrs.get("phone")
        password = attrs.get("password")
 
        # Email required
        if not email:
            raise serializers.ValidationError({"email": "Email is required"})
 
        # Prevent duplicate email across DeliveryPartner or UserProfile
        if DeliveryPartner.objects.filter(email=email).exists() or User.objects.filter(email=email).exists():
            raise serializers.ValidationError({"email": "Email already registered"})
 
        # Prevent duplicate phone across UserProfile
        if phone and User.objects.filter(phone=phone).exists():
            raise serializers.ValidationError({"phone": "Phone already registered"})
 
        # Basic password check (keep minimal to avoid changing flow)
        if password and len(password) < 6:
            raise serializers.ValidationError({"password": "Password must be at least 6 characters"})
 
        return attrs
 
    def create(self, validated_data):
        """
        Create DeliveryPartner and linked UserProfile for authentication.
        """
        # Extract password (required for auth user)
        password = validated_data.pop('password')
 
        email = validated_data.get('email')
        full_name = validated_data.get('full_name')
        phone = validated_data.get('phone')
 
        if not email:
            raise serializers.ValidationError({"email": "Email is required."})
 
        # Prevent duplicate auth users
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError({"email": "A user with this email already exists."})
 
        # If a DeliveryPartner exists without a linked user, link it
        existing_delivery = DeliveryPartner.objects.filter(email=email).first()
        if existing_delivery:
            if not existing_delivery.user:
                user = User.objects.create_user(
                    email=email,
                    password=password,
                    full_name=full_name or existing_delivery.full_name,
                    phone=phone or existing_delivery.phone,
                    user_type='delivery'
                )
                existing_delivery.user = user
                existing_delivery.save()
                return existing_delivery
            else:
                raise serializers.ValidationError({"email": "A user with this email already exists."})
 
        # Create auth user
        try:
            user = User.objects.create_user(
                email=email,
                password=password,
                full_name=full_name,
                phone=phone,
                user_type='delivery'
            )
        except Exception as e:
            raise serializers.ValidationError({"error": f"Failed to create user account: {str(e)}"})
 
        # Create delivery partner and link user
        try:
            delivery_partner = DeliveryPartner.objects.create(
                user=user,
                **validated_data
            )
        except Exception as e:
            user.delete()  # rollback
            raise serializers.ValidationError({"error": f"Failed to create delivery partner: {str(e)}"})
 
        return delivery_partner
 
class DeliveryPartnerProfileSerializer(serializers.ModelSerializer):
    """Serializer for delivery partner profile (read/update, no password)"""
    fullName = serializers.CharField(source="full_name")
    # vehicleNumber = serializers.CharField(source="vehicle_number")
    vehicleNumber = serializers.SerializerMethodField()
    
    email = serializers.EmailField(read_only=True)  # Email cannot be changed
    current_location = serializers.SerializerMethodField()
    vehicle_type = serializers.SerializerMethodField()
    emergency_contact1_name = serializers.SerializerMethodField()
    emergency_contact1_phone = serializers.SerializerMethodField()
    emergency_contact1_relation = serializers.SerializerMethodField()
    emergency_contact2_name = serializers.SerializerMethodField()
    emergency_contact2_phone = serializers.SerializerMethodField()
    emergency_contact2_relation = serializers.SerializerMethodField()
    bank_account_number = serializers.SerializerMethodField()
    bank_account_holder = serializers.SerializerMethodField()
    bank_name = serializers.SerializerMethodField()
    ifsc_code = serializers.SerializerMethodField()
    upi_id = serializers.SerializerMethodField()
   
    class Meta:
        model = DeliveryPartner
        fields = [
            "id",
            # "full_name",
            "fullName",
            "email",
            "phone",
            # "vehicle_number",
            "vehicleNumber",

            "vehicle_type",  # ✅ From UserProfile
            "current_location",  # ✅ From UserProfile.address
            "aadhar_number",
            "pan_number",
            "driving_license_number",
            "status",
            "created_at",
            # Emergency Contacts (stored in UserProfile fields)
            "emergency_contact1_name",
            "emergency_contact1_phone",
            "emergency_contact1_relation",
            "emergency_contact2_name",
            "emergency_contact2_phone",
            "emergency_contact2_relation",
            # Bank Details (stored in UserProfile fields)
            "bank_account_number",
            "bank_account_holder",
            "bank_name",
            "ifsc_code",
            "upi_id",
        ]
        read_only_fields = ["aadhar_number", "pan_number", "driving_license_number", "status", "created_at"]
   
    # Helper to get/create profile
    def _get_profile(self, obj):
        if not obj.user:
            return None
        profile, _ = DeliveryProfile.objects.get_or_create(
            user=obj.user,
            defaults={"delivery_partner": obj}
        )
        if not profile.delivery_partner:
            profile.delivery_partner = obj
            profile.save(update_fields=["delivery_partner"])
        return profile
 
    def get_current_location(self, obj):
        profile = self._get_profile(obj)
        return profile.current_location if profile else ''
   
    def get_vehicle_type(self, obj):
        profile = self._get_profile(obj)
        return profile.vehicle_type if profile else ''
    
    def get_vehicleNumber(self, obj):
        # from signup
        if obj.vehicle_number:
            return obj.vehicle_number

        # from profile
        profile = self._get_profile(obj)
        if profile and profile.vehicle_number:
            return profile.vehicle_number

        return ""
   
    def get_emergency_contact1_name(self, obj):
        profile = self._get_profile(obj)
        return profile.emergency_contact1_name if profile else ''
   
    def get_emergency_contact1_phone(self, obj):
        profile = self._get_profile(obj)
        return profile.emergency_contact1_phone if profile else ''
   
    def get_emergency_contact1_relation(self, obj):
        profile = self._get_profile(obj)
        return profile.emergency_contact1_relation if profile else ''
   
    def get_emergency_contact2_name(self, obj):
        profile = self._get_profile(obj)
        return profile.emergency_contact2_name if profile else ''
   
    def get_emergency_contact2_phone(self, obj):
        profile = self._get_profile(obj)
        return profile.emergency_contact2_phone if profile else ''
   
    def get_emergency_contact2_relation(self, obj):
        profile = self._get_profile(obj)
        return profile.emergency_contact2_relation if profile else ''
   
    def get_bank_account_number(self, obj):
        profile = self._get_profile(obj)
        return profile.bank_account_number if profile else ''
   
    def get_bank_account_holder(self, obj):
        profile = self._get_profile(obj)
        return profile.bank_account_holder if profile else ''
   
    def get_bank_name(self, obj):
        profile = self._get_profile(obj)
        return profile.bank_name if profile else ''
   
    def get_ifsc_code(self, obj):
        profile = self._get_profile(obj)
        return profile.ifsc_code if profile else ''
   
    def get_upi_id(self, obj):
        profile = self._get_profile(obj)
        return profile.upi_id if profile else ''
   
    def update(self, instance, validated_data):
        """Update delivery partner and related UserProfile"""
        # Update DeliveryPartner fields
        instance.full_name = validated_data.get('full_name', instance.full_name)
        instance.phone = validated_data.get('phone', instance.phone)
        instance.vehicle_number = validated_data.get('vehicle_number', instance.vehicle_number)
        instance.save()
       
        # Update UserProfile if linked
        if instance.user:
            # Update basic fields
            if 'phone' in validated_data:
                instance.user.phone = validated_data['phone']
            if 'full_name' in validated_data:
                instance.user.full_name = validated_data['full_name']
            if 'vehicle_number' in validated_data:
                instance.user.vehicle_number = validated_data['vehicle_number']
 
            # Update DeliveryProfile (separate table)
            request = self.context.get('request')
            profile = self._get_profile(instance)
            if request and profile:
                # Current location & vehicle
                if 'current_location' in request.data:
                    profile.current_location = request.data['current_location']
                if 'vehicle_type' in request.data:
                    profile.vehicle_type = request.data['vehicle_type']
                if 'vehicle_number' in request.data:
                    profile.vehicle_number = request.data['vehicle_number']
 
                # Emergency contacts
                if 'emergency_contact1_name' in request.data:
                    profile.emergency_contact1_name = request.data['emergency_contact1_name']
                if 'emergency_contact1_phone' in request.data:
                    profile.emergency_contact1_phone = request.data['emergency_contact1_phone']
                    # keep legacy emergency_contact on user for backwards compatibility
                    instance.user.emergency_contact = request.data['emergency_contact1_phone']
                if 'emergency_contact1_relation' in request.data:
                    profile.emergency_contact1_relation = request.data['emergency_contact1_relation']
                if 'emergency_contact2_name' in request.data:
                    profile.emergency_contact2_name = request.data['emergency_contact2_name']
                if 'emergency_contact2_phone' in request.data:
                    profile.emergency_contact2_phone = request.data['emergency_contact2_phone']
                if 'emergency_contact2_relation' in request.data:
                    profile.emergency_contact2_relation = request.data['emergency_contact2_relation']
 
                # Bank
                if 'bank_account_number' in request.data:
                    profile.bank_account_number = request.data['bank_account_number']
                if 'bank_account_holder' in request.data:
                    profile.bank_account_holder = request.data['bank_account_holder']
                if 'bank_name' in request.data:
                    profile.bank_name = request.data['bank_name']
                if 'ifsc_code' in request.data:
                    profile.ifsc_code = request.data['ifsc_code']
                if 'upi_id' in request.data:
                    profile.upi_id = request.data['upi_id']
 
                profile.save()
            instance.user.save()
       
        return instance
   
    def create(self, validated_data):
        # Extract password
        password = validated_data.pop('password')
       
        # Get email and other user data
        email = validated_data.get('email')
        full_name = validated_data.get('full_name')
        phone = validated_data.get('phone')
       
        if not email:
            raise serializers.ValidationError({"email": "Email is required."})
       
        # Check if UserProfile already exists
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError({"email": "A user with this email already exists."})
       
        # Check if DeliveryPartner with this email already exists (but no UserProfile)
        existing_delivery = DeliveryPartner.objects.filter(email=email).first()
        if existing_delivery:
            # If DeliveryPartner exists but has no UserProfile, create one and link it
            if not existing_delivery.user:
                user = User.objects.create_user(
                    email=email,
                    password=password,
                    full_name=full_name or existing_delivery.full_name,
                    phone=phone or existing_delivery.phone,
                    user_type='delivery'
                )
                existing_delivery.user = user
                existing_delivery.save()
                return existing_delivery
            else:
                raise serializers.ValidationError({"email": "A user with this email already exists."})
       
        # Create UserProfile for authentication
        try:
            user = User.objects.create_user(
                email=email,
                password=password,
                full_name=full_name,
                phone=phone,
                user_type='delivery'
            )
        except Exception as e:
            raise serializers.ValidationError({"error": f"Failed to create user account: {str(e)}"})
       
        # Create DeliveryPartner and link to UserProfile
        try:
            delivery_partner = DeliveryPartner.objects.create(
                user=user,
                **validated_data
            )
        except Exception as e:
            # Rollback: delete the user if DeliveryPartner creation fails
            user.delete()
            raise serializers.ValidationError({"error": f"Failed to create delivery partner: {str(e)}"})
       
        return delivery_partner
 