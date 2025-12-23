from django.urls import path
from .views import add_vendor_medicine, vendor_medicine_list,vendor_medicine_detail, public_medicine_list 

urlpatterns = [
    path("medicines/", vendor_medicine_list),
    path("medicines/add/", add_vendor_medicine),
    path("medicines/<int:pk>/", vendor_medicine_detail),
     # user
    path("medicines/public/", public_medicine_list),  # ✅ ADD THIS #vender to user connection
]
