🧩 STEP 0 — USER OPENS VENDOR DASHBOARD

📄 File

src/components/vendor/VendorDashboard.js


📦 State used

const [userProfile, setUserProfile] = useState({
  fullName: "",
  email: "",
  phone: "",
  pharmacyName: "",
  licenseNumber: "",
  gstNumber: "",
  businessAddress: "",
  openingTime: "",
  closingTime: "",
  city: "",
  state: "",
  pincode: ""
});


👉 This is UI state only (browser memory)



############################################

🧩 STEP 1 — PAGE LOAD (GET PROFILE FROM BACKEND)
📡 URL CALLED
GET http://127.0.0.1:8000/api/profile/?email=laxman@gmail.com

📄 Backend View
@api_view(["GET"])
def get_user_profile(request):


📂 File

backend/accounts/views.py

🔄 DATA FLOW (GET)
Browser
  ↓ GET
/api/profile/?email=...
  ↓
get_user_profile()
  ↓
UserProfile.objects.get(email)
  ↓
UserProfileSerializer
  ↓
JSON Response
  ↓
Frontend setUserProfile()

📦 Response JSON (example)
{
  "fullName": "lakshamn",
  "email": "laxman@gmail.com",
  "phone": "7793938456",
  "pharmacyName": "apollo",
  "businessLicense": "VENDOR2024",
  "gstNumber": "22AAAAA0000A1Z5",
  "businessAddress": "",
  "openingTime": null,
  "closingTime": null,
  "city": "Dachepalle",
  "state": "Andhra Pradesh",
  "pincode": "522417"
}


✔ Data now appears in frontend form
❌ If field missing here → it will NEVER show in UI



##########################################
🧩 STEP 2 — USER EDITS PROFILE (MODAL)

📄 Component

ProfileModal (VendorModals.js)


User types:

Address

Opening Time

Closing Time

📌 This only updates React state

onChange → setUserProfile({...})


⚠️ Nothing saved yet


###############################################

🧩 STEP 3 — USER CLICKS "UPDATE PROFILE"
📄 Frontend Function
handleProfileUpdate()


📍 File

VendorDashboard.js

📡 URL USED
PATCH http://127.0.0.1:8000/api/profile/update/

📤 DATA SENT (Frontend → Backend)
{
  email: "laxman@gmail.com",

  fullName: "lakshamn",
  phone: "7793938456",

  pharmacyName: "apollo",
  businessLicense: "VENDOR2024",
  gstNumber: "22AAAAA0000A1Z5",
  businessAddress: "Dachepalle main road",

  openingTime: "09:00",
  closingTime: "22:00",

  city: "Dachepalle",
  state: "Andhra Pradesh",
  pincode: "522417"
}


👉 Frontend uses camelCase ONLY


######################

🧩 STEP 4 — BACKEND RECEIVES & SAVES DATA
📄 Backend View
@api_view(["POST", "PATCH"])
def update_user_profile(request):


📂 File:

backend/accounts/views.py

🔄 DATA FLOW (PATCH)
PATCH request
  ↓
update_user_profile()
  ↓
UserProfile.objects.filter(email)
  ↓
UserProfileSerializer(profile, data=request.data, partial=True)
  ↓
serializer.is_valid()
  ↓
serializer.save()
  ↓
DATABASE UPDATED

🧠 MOST IMPORTANT PART — SERIALIZER MAPPING

📄 File

backend/accounts/serializers.py

🔁 Translator (THIS IS WHERE MAGIC HAPPENS)
businessAddress = serializers.CharField(
    source="business_address"
)

openingTime = serializers.TimeField(
    source="opening_time"
)

closingTime = serializers.TimeField(
    source="closing_time"
)

Frontend key	Model field
businessAddress	business_address
openingTime	opening_time
closingTime	closing_time

❗ If this mapping is missing → data will not save


#################
🧩 STEP 5 — PAGE REFRESH (WHY DATA DISAPPEARS)

After refresh:

Page reload
 → Step 1 runs again (GET profile)

❌ If DB does NOT have:

business_address

opening_time

closing_time

Then response will be:

{
  "businessAddress": "",
  "openingTime": null,
  "closingTime": null
}



👉 UI looks empty
👉 You think “not saved”
👉 Root cause = backend save failed



🚨 YOUR CURRENT PROBLEM (100% CONFIRMED)
❌ Why address & timing NOT saving?

Because ONE of these is wrong (or more):

❌ Field missing in UserProfile model

❌ Serializer mapping missing / mismatch

❌ Frontend sending snake_case sometimes

❌ Time format invalid ("09:00 AM" ❌)


#############

✅ FINAL GOLDEN RULE (REMEMBER THIS)
Frontend   → camelCase
Serializer → maps camelCase → snake_case
Model      → snake_case






##############
React (camelCase)
   ↓
Serializer (maps)
   ↓
Django Model (snake_case)
   ↓
Database
