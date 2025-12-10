from django.urls import path
from .views import getReviews, addReview,save_contact

urlpatterns = [
    path('reviews/get/', getReviews),
    path('reviews/add/', addReview),
     path('save-contact/', save_contact),
]


