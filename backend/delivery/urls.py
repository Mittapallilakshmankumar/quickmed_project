from django.urls import path
from .views import delivery_signup

urlpatterns = [
    path("signup/", delivery_signup, name="delivery-signup"),
]
