from django.contrib import admin
from .models import ContactRequest, Review

@admin.register(ContactRequest)
class ContactRequestAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "email",
        "phone",
        "service",
        "created_at",
    )
    search_fields = ("name", "email", "phone")
    list_filter = ("service", "created_at")




@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "rating", "is_approved", "created_at")
    list_filter = ("rating", "is_approved")
    search_fields = ("name", "email", "comment")
