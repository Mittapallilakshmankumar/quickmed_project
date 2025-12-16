from django.urls import path
from .views import signup,login,get_user_profile, update_user_profile

urlpatterns = [
    path("signup/", signup, name="signup"),
    path("login/", login, name="login"),
    path("profile/", get_user_profile),#get,doctor,vender,user
    path("profile/update/", update_user_profile),#patch/post doctor,vender,user
]
