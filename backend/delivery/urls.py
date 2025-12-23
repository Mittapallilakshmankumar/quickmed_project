from django.urls import path
from .views import delivery_signup,delivery_login

urlpatterns = [
    path("signup/", delivery_signup, name="delivery-signup"),
     path("login/", delivery_login, name="delivery-login"),
]
