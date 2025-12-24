from django.contrib import admin
from .models import TimeSlot

@admin.register(TimeSlot)
class TimeSlotAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "doctor",
        "date",
        "start_time",
        "end_time",
        "duration",
        "is_available",
        "is_booked",
    )
    list_filter = ("date", "is_available", "is_booked")
    search_fields = ("doctor__username", "doctor__email")
    ordering = ("date", "start_time")
