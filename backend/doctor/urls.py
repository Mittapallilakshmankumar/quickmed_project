from django.urls import path
from .views import (
    doctor_timeslots,
    toggle_slot_availability,
    delete_slot,
    doctor_list,
    user_available_slots,
    book_slot
)

urlpatterns = [
    # 🔴 DOCTOR DASHBOARD
    path("timeslots/", doctor_timeslots),  # GET, POST
    path("timeslots/<int:slot_id>/toggle/", toggle_slot_availability),#doctor time slot doctor side
    path("timeslots/<int:slot_id>/delete/", delete_slot),#doctor time slot doctor side
    
    # 🔴 COMMON (ALL DOCTORS)
    path("list/", doctor_list), #all doctors 
    
    # 👇 USER SIDE
    path("user/timeslots/", user_available_slots),#user see doctors details
    path("timeslots/<int:slot_id>/book/", book_slot),#user to book a frontend in the user dashbaord 
]
