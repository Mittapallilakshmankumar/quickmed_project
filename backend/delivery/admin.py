from django.contrib import admin
from .models import DeliveryPartner

@admin.register(DeliveryPartner)
class DeliveryPartnerAdmin(admin.ModelAdmin):
    list_display = (
        "full_name",
        "email",
        "phone",
        "status",
        "created_at",
    )
