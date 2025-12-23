from django.db import models

class ContactRequest(models.Model):
    SERVICE_CHOICES = [
        ('medicine-delivery', 'Medicine Delivery'),
        ('doctor-consultation', 'Doctor Consultation'),
        ('Baby-care', 'Baby Care'),
        ('Pregnancy-care', 'Pregnancy Care'),
        ('General-physician', 'General Physician'),
        ('Other', 'Other'),
    ]

    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=10)
    service = models.CharField(max_length=50, choices=SERVICE_CHOICES)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.service}"




class Review(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    rating = models.PositiveSmallIntegerField()
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_approved = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} - {self.rating}⭐"
