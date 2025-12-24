# 🚚 Delivery Partner Profile – Full Data Flow (Frontend ↔ Backend)

This document explains:
- What changes were done
- Where changes were added
- Which API URL is used
- How data flows from UI → Backend → Database → UI again
- Why data was disappearing on refresh earlier

---
######################################################
## 1️⃣ PROBLEM STATEMENT (Before Fix)

### What was happening?
- Profile page showed fields (location, vehicle, bank, emergency contacts)
- User edited values and clicked **Save**
- UI showed success message
- ❌ On page refresh → all values disappeared
- ❌ Database table had NO data

### Why?
Because **Save button was NOT calling backend API**  
Only `console.log()` was used.

---############################################################

## 2️⃣ BACKEND STRUCTURE (Already Correct)

### 📦 Models Used

#### `DeliveryPartner` (Signup data – permanent)
```python
DeliveryPartner
- full_name
- email
- phone
- vehicle_number
- aadhar / pan / license
DeliveryProfile (Editable profile data)
python
Copy code
DeliveryProfile
- current_location
- vehicle_type
- emergency contacts
- bank details
👉 These two tables are linked using:

python
Copy code
user (OneToOne)
delivery_partner (OneToOne)
################################################################
3️⃣ BACKEND APIs USED
🔹 Get Profile (Fetch)
sql
Copy code
GET /api/delivery/profile/
Authorization: Bearer <access_token>
✔️ Returns:

name, email, phone (DeliveryPartner)

location, vehicle type, emergency, bank (DeliveryProfile)

🔹 Update Profile (Save)
pgsql
Copy code
PATCH /api/delivery/profile/update/
Authorization: Bearer <access_token>
Content-Type: application/json
✔️ Saves data into:

DeliveryProfile table

(vehicle_number also updates DeliveryPartner if needed)
######################################################################

4️⃣ FRONTEND CHANGE (MAIN FIX)
❌ OLD CODE (WRONG)
Location: Profile.js

js
Copy code
const handleSaveChanges = () => {
  console.log(formData);
  alert("Saved");
};
🚫 This does NOT talk to backend
🚫 Database never receives data
###############################################################
5️⃣ ✅ NEW CODE ADDED (CORRECT)
📍 File: Profile.js
🔹 Function Added
js
Copy code
const handleSaveChanges = async () => {
  const token = localStorage.getItem("access_token");

  const response = await fetch(
    "http://127.0.0.1:8000/api/delivery/profile/update/",
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        current_location: formData.currentLocation,
        vehicle_type: formData.vehicleType,
        vehicle_number: formData.vehicleNumber,

        emergency_contact1_name: formData.emergencyContact1Name,
        emergency_contact1_phone: formData.emergencyContact1Phone,
        emergency_contact1_relation: formData.emergencyContact1Relation,

        emergency_contact2_name: formData.emergencyContact2Name,
        emergency_contact2_phone: formData.emergencyContact2Phone,
        emergency_contact2_relation: formData.emergencyContact2Relation,

        bank_account_holder: formData.bankAccountHolder,
        bank_account_number: formData.bankAccountNumber,
        bank_name: formData.bankName,
        ifsc_code: formData.ifscCode,
        upi_id: formData.upiId,
      }),
    }
  );

  if (!response.ok) {
    alert("Save failed");
    return;
  }

  alert("Profile saved successfully");
};
########################################################
6️⃣ URL CONNECTION SUMMARY
Purpose	URL
Fetch profile	/api/delivery/profile/
Save profile	/api/delivery/profile/update/
Auth	JWT token from localStorage
#############################################################
7️⃣ DATA FLOW (IMPORTANT)
🔁 Complete Flow
pgsql
Copy code
User edits form
   ↓
Clicks Save
   ↓
handleSaveChanges()
   ↓
PATCH API call
   ↓
Django View
   ↓
DeliveryPartnerProfileSerializer.update()
   ↓
DeliveryProfile table updated
   ↓
User refreshes page
   ↓
GET /profile/
   ↓
Saved data shown
#######################################################
8️⃣ HOW TO VERIFY DATA IS SAVED
PostgreSQL / MySQL
sql
Copy code
SELECT * FROM delivery_deliveryprofile;
You should see:

current_location

vehicle_type

emergency contacts

bank details
#####################################################

9️⃣ FINAL RESULT (After Fix)
Feature	Status
Edit profile	✅
Save to DB	✅
Refresh keeps data	✅
Backend clean	✅
No static data	✅

🔚 FINAL NOTE
UI state ≠ Database

Only API calls can save data permanently.

This fix connects:
React → Django → Database → React

