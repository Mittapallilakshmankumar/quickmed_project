# from rest_framework import serializers
# from .models import User


# class SignupSerializer(serializers.ModelSerializer):
#     password = serializers.CharField(write_only=True)

#     class Meta:
#         model = User
#         fields = ["fullName", "email", "phone", "password", "userType"]

#     def create(self, validated_data):
#         user = User.objects.create_user(
#             email=validated_data["email"],
#             password=validated_data["password"],
#             fullName=validated_data["fullName"],
#             phone=validated_data["phone"],
#             userType=validated_data["userType"]
#         )
#         return user


from rest_framework import serializers
from .models import User

class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            "fullName", "email", "phone", "password", "userType",
            "dateOfBirth", "gender", "address", "emergencyContact",
            "linkedAccounts"
        ]
        extra_kwargs = {
            "linkedAccounts": {"required": False},
            "dateOfBirth": {"required": False},
            "gender": {"required": False},
            "address": {"required": False},
            "emergencyContact": {"required": False},
        }

    def create(self, validated_data):
        password = validated_data.pop("password")  # remove password
        user = User.objects.create(
            **validated_data
        )
        user.set_password(password)
        user.save()
        return user
