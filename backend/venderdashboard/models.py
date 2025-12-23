from django.db import models
from accounts.models import UserProfile

class VendorMedicine(models.Model):

    vendor = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE,
        related_name="vendormedicine"
    )

    medicine_name = models.CharField(max_length=200)
    category = models.CharField(max_length=100)

    quantity = models.PositiveIntegerField()
    # min_stock = models.PositiveIntegerField()
    min_stock = models.PositiveIntegerField(default=0)
    supplier = models.CharField(max_length=200, blank=True, null=True)

    price = models.DecimalField(max_digits=10, decimal_places=2)

    expiry_date = models.DateField()

    # supplier = models.CharField(max_length=200)
    batch_no = models.CharField(max_length=100)

    prescription_required = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.medicine_name
