from rest_framework import serializers
from .models import ContactRequest,Review

class ContactRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactRequest
        fields = "__all__"



class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = [
            "id",
            "name",
            "email",
            "rating",
            "comment",
            "created_at",
        ]
