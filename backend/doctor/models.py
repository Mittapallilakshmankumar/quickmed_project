from django.db import models
from django.conf import settings

class TimeSlot(models.Model):
    doctor = models.ForeignKey(
        settings.AUTH_USER_MODEL,   # ✅ FIX HERE
        on_delete=models.CASCADE,
        related_name="doctor_slots"
    )
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    duration = models.IntegerField()
    is_available = models.BooleanField(default=True)
    is_booked = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.doctor} - {self.date} {self.start_time}"
