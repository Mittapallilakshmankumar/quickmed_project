from django.urls import path
from .views import contact_request, contact_list,reviews

urlpatterns = [
    path("contact/", contact_request, name="contact_request"),
    path("contact-list/", contact_list, name="contact_list"),
     path("reviews/", reviews, name="reviews"),
]
