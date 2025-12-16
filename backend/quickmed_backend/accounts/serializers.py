


# from rest_framework import serializers
# from .models import User

# class SignupSerializer(serializers.ModelSerializer):
#     password = serializers.CharField(write_only=True)

#     class Meta:
#         model = User
#         fields = [
#             "fullName", "email", "phone", "password", "userType",
#             "dateOfBirth", "gender", "address", "emergencyContact",
#             "linkedAccounts"
#         ]
#         extra_kwargs = {
#             "linkedAccounts": {"required": False},
#             "dateOfBirth": {"required": False},
#             "gender": {"required": False},
#             "address": {"required": False},
#             "emergencyContact": {"required": False},
#         }

#     def create(self, validated_data):
#         password = validated_data.pop("password")  # remove password
#         user = User.objects.create(
#             **validated_data
#         )
#         user.set_password(password)
#         user.save()
#         return user



from rest_framework import serializers
from .models import User

class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = "__all__"   # <-- this makes ALL fields save
        extra_kwargs = {
            "password": {"write_only": True},
        }

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user
