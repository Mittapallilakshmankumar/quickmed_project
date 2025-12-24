
from django.urls import path
from .views import delivery_signup, delivery_login, get_delivery_profile, update_delivery_profile
 
urlpatterns = [
    path("signup/", delivery_signup, name="delivery-signup"),#signup for the delivery
    path("login/", delivery_login, name="delivery-login"),#login for the delivery
    path("profile/", get_delivery_profile, name="delivery-profile"),#to see te profile
    path("profile/update/", update_delivery_profile, name="delivery-profile-update"),#profile update
]