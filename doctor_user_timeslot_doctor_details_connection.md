 📘 Doctor ↔ User Time Slot Connection (Backend Flow)

This document explains **how doctor details and time slots move from backend to user side**
using the existing backend code.

---

## 🧱 DATABASE LAYER

### 📂 File: `doctor/models.py`

```python
class TimeSlot(models.Model):
    doctor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="doctor_slots"
    )
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    duration = models.IntegerField()
    is_available = models.BooleanField(default=True)
    is_booked = models.BooleanField(default=False)

#####################
🔑 Meaning
Each row = ONE doctor time slot

doctor → links slot to doctor (User table)

is_available → doctor enabled/disabled slot

is_booked → user booked or not
##############

🧩 SERIALIZERS (DATA SHAPE)
📂 File: doctor/serializers.py
Doctor short details
python
Copy code
class DoctorMiniSerializer(serializers.ModelSerializer):
    fullName = serializers.CharField(source="full_name")

    class Meta:
        model = UserProfile
        fields = [
            "id",
            "fullName",
            "specialization",
            "years_of_experience",
            "consultation_fee",
            "clinic_address",
        ]
Time slot serializer (USED BY BOTH USER & DOCTOR)
python
Copy code
class TimeSlotSerializer(serializers.ModelSerializer):
    doctor_details = DoctorMiniSerializer(source="doctor", read_only=True)

    class Meta:
        model = TimeSlot
        fields = [
            "id",
            "doctor",
            "doctor_details",
            "date",
            "start_time",
            "end_time",
            "duration",
            "is_available",
            "is_booked",
        ]
🔑 Result
Whenever a slot is returned, doctor name, specialization, fee also come.
###################################
🧑‍⚕️ DOCTOR SIDE APIs
1️⃣ Doctor create / view slots
URL

swift
Copy code
GET  /api/doctor/timeslots/
POST /api/doctor/timeslots/
########################################
📂 File: doctor/views.py
python
Copy code
@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def doctor_timeslots(request):
    doctor = request.user
GET
Returns only logged-in doctor’s slots

Used in Doctor Dashboard

POST
Creates slot
Doctor auto-linked using request.user
##################################################

2️⃣ Toggle availability (Doctor)
URL

bash
Copy code
PATCH /api/doctor/timeslots/<slot_id>/toggle/
python
Copy code
slot.is_available = not slot.is_available
slot.save()
Doctor can enable / disable slot

Booked slot ❌ cannot be modified

3️⃣ Delete slot (Doctor)
URL

bash
Copy code
DELETE /api/doctor/timeslots/<slot_id>/delete/
Removes slot

Booked slot ❌ cannot be deleted
############################################
👨‍⚕️ DOCTOR LIST (USER SIDE)
4️⃣ Doctor list API
URL

swift
Copy code
GET /api/doctor/list/
📂 File: doctor/views.py
python
Copy code
def doctor_list(request):
    doctors = UserProfile.objects.filter(user_type="doctor")
Used in
User consultation page

Shows doctor cards (name, specialization, fee)
###############################################
👤 USER SIDE APIs
5️⃣ User fetch available slots
URL

sql
Copy code
GET /api/doctor/user/timeslots/
#################################################
📂 File: doctor/views.py
python
Copy code
@api_view(["GET"])
@permission_classes([AllowAny])
def user_available_slots(request):
    slots = TimeSlot.objects.filter(
        is_available=True,
        is_booked=False
    )
🔑 This API
Shows ALL doctors’ available slots

Used in User Consultation page

Past / disabled / booked slots ❌ excluded

Example Response
json
Copy code
{
  "id": 10,
  "doctor": 5,
  "doctor_details": {
    "fullName": "Dr Lakshman",
    "specialization": "pediatric",
    "consultation_fee": 500
  },
  "date": "2025-01-10",
  "start_time": "10:00:00",
  "end_time": "10:30:00"
}

################################################
6️⃣ User books slot
URL

bash
Copy code
POST /api/doctor/timeslots/<slot_id>/book/
📂 File: doctor/views.py
python
Copy code
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def book_slot(request, slot_id):
Logic
Checks slot exists

Checks not already booked

Marks:

python
Copy code
slot.is_booked = True
slot.is_available = False
Result
Slot disappears from user list

Other users can’t book same slot
###############################################

🔁 COMPLETE DATA FLOW
bash
Copy code
Doctor Dashboard
    ↓ POST /timeslots/
TimeSlot table
    ↓ GET /user/timeslots/
User Consultation Page
    ↓ POST /timeslots/{id}/book/
Slot booked & hidden
#################################

🧠 IMPORTANT RULES
✔ Doctor never sends slots to user
✔ User always FETCHES from backend
✔ Backend controls truth
✔ Frontend only displays
#################################################################################################
📌 FRONTEND MUST USE THESE URLS
Purpose	                   Method	             URL
Doctor list	                 GET	       /api/doctor/list/
User slots	                 GET	     /api/doctor/user/timeslots/
Doctor slots	             GET	     /api/doctor/timeslots/
Add slot	                 POST        	/api/doctor/timeslots/
Toggle	                     PATCH   	/api/doctor/timeslots/{id}/toggle/
Delete	                     DELETE	   /api/doctor/timeslots/{id}/delete/
Book slot	                  POST   	/api/doctor/timeslots/{id}/book/

################################################################################################
🔴 DOCTOR SIDE APIs (Doctor Dashboard)

These URLs are used ONLY by doctors after login.

🔐 Requires IsAuthenticated (doctor token)
#user side this urls

Purpose	            Method	         URL	                          Who uses it
View own slots	     GET	/api/doctor/timeslots/	                  👨‍⚕️ Doctor
Add new slot	    POST	/api/doctor/timeslots/	                  👨‍⚕️ Doctor
Toggle availability	PATCH	/api/doctor/timeslots/{id}/toggle/	      👨‍⚕️ Doctor
Delete slot	        DELETE	/api/doctor/timeslots/{id}/delete/	      👨‍⚕️ Doctor
#############

Doctor dashboard

Doctor time-slot management page

❌ User should never call these.

🟢 USER SIDE APIs (User Dashboard)

These URLs are used ONLY by users.

Purpose	                Method	        URL	                        Who uses it
See available slots	    GET	        /api/doctor/user/timeslots/	     👤 User
Book slot             	POST	/api/doctor/timeslots/{id}/book/	 👤 User
✅ Used in
##
User consultation page

Slot selection modal

Booking flow

🟡 COMMON API (Used by USER side, but data belongs to doctors)
Purpose	Method	URL	Used by
Doctor list	GET	/api/doctor/list/	👤 User
Why common?

Data = doctors

Viewer = users

Doctors do not call this

🧠 FINAL CLASSIFICATION (VERY IMPORTANT)
👨‍⚕️ Doctor-side only
GET    /api/doctor/timeslots/
POST   /api/doctor/timeslots/
PATCH  /api/doctor/timeslots/{id}/toggle/
DELETE /api/doctor/timeslots/{id}/delete/

👤 User-side only
GET  /api/doctor/user/timeslots/
POST /api/doctor/timeslots/{id}/book/

👥 Common (used by user)
GET /api/doctor/list/



🔁 HOW DATA FLOWS (Simple)
Doctor adds slots
   ↓
TimeSlot table
   ↓
User fetches available slots
   ↓
User books slot
   ↓
Slot becomes booked & disappears
