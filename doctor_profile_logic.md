at 👍
Since everything is working now, you want a .md file that explains the logic + flow clearly.
Below is a READY-TO-COPY MARKDOWN FILE 📄
You can paste this into PROFILE_FLOW.md or any .md file.

# Doctor Profile Login & Update Flow (QuickMed)

This document explains **how doctor login, profile fetch, and profile update work**
between **React frontend** and **Django backend**.

---

## 1️⃣ LOGIN FLOW (JWT Authentication)

### Frontend
1. Doctor enters **email + password + role (doctor)**
2. Frontend calls:


POST /api/login/

3. Backend validates:
- Email exists
- Password matches
- user_type == doctor
4. Backend returns:
```json
{
  "access": "<JWT_ACCESS_TOKEN>",
  "refresh": "<JWT_REFRESH_TOKEN>",
  "user": {
    "id": 6,
    "email": "sai@gmail.com",
    "userType": "doctor",
    "fullName": "Sai"
  }
}


Frontend stores token:

localStorage.setItem("access_token", data.access);


📌 JWT token is mandatory for all profile APIs

2️⃣ GET DOCTOR PROFILE FLOW
API
GET /api/profile/

Backend

Protected by IsAuthenticated

Reads user from JWT token

Fetches profile using:

request.user.id

Serializer returns:
{
  "fullName": "Sai",
  "email": "sai@gmail.com",
  "phone": "7788888889",
  "medicalLicense": "TN/GEN/12345",
  "specialization": "cardio",
  "yearsOfExperience": 12,
  "clinicAddress": "fgkjbkbgfk",
  "city": "Guntur",
  "state": "AP",
  "pincode": "522002"
}

Frontend (doctorUtils.js)
useEffect(() => {
  const token = localStorage.getItem("access_token");
  if (!token) return;

  fetch("http://127.0.0.1:8000/api/profile/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then(data => {
      setUserProfile({
        fullName: data.fullName || "",
        email: data.email || "",
        phone: data.phone || "",
        specialization: data.specialization || "",
        licenseNumber: data.medicalLicense || "",
        experience: data.yearsOfExperience
          ? data.yearsOfExperience.toString()
          : "",
        hospital: data.clinicAddress || "",
        address: data.deliveryAddress || "",
        city: data.city || "",
        state: data.state || "",
        pincode: data.pincode || "",
      });
    });
}, []);


✅ This loads profile data when doctor dashboard opens.

3️⃣ UPDATE DOCTOR PROFILE FLOW
API
PATCH /api/profile/update/

Frontend

Sends JSON

Sends JWT token

fetch("http://127.0.0.1:8000/api/profile/update/", {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    fullName: updatedProfile.fullName,
    phone: updatedProfile.phone,
    medicalLicense: updatedProfile.licenseNumber,
    specialization: updatedProfile.specialization,
    yearsOfExperience: parseInt(updatedProfile.experience),
    clinicAddress: updatedProfile.hospital,
    deliveryAddress: updatedProfile.address,
    city: updatedProfile.city,
    state: updatedProfile.state,
    pincode: updatedProfile.pincode,
  }),
});

4️⃣ BACKEND UPDATE LOGIC (IMPORTANT)
Why 415 error happened earlier

Frontend sent JSON

Backend accepted only multipart/form-data

Fix

Backend must accept JSONParser

Final backend code
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser

@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
@parser_classes([JSONParser, MultiPartParser, FormParser])
def update_user_profile(request):
    profile = UserProfile.objects.get(id=request.user.id)

    serializer = UserProfileSerializer(
        profile,
        data=request.data,
        partial=True,
        context={"request": request}
    )

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=200)

    return Response(serializer.errors, status=400)

5️⃣ FIELD MAPPING (Frontend → Backend)
Frontend Field	Backend Model Field
fullName	full_name
licenseNumber	medical_license
specialization	specialization
experience	years_of_experience
hospital	clinic_address
address	delivery_address
city	city
state	state
pincode	pincode
6️⃣ FINAL RESULT

✅ Login works
✅ Profile loads after login
✅ Profile updates correctly
✅ Data saved in database
✅ Page refresh keeps data

7️⃣ COMMON ERRORS & MEANING
Error	Meaning
401	Token not sent
403	Wrong role
415	Backend not accepting JSON
200	Success
✅ SUMMARY

JWT Token
→ GET profile
→ Load data
→ PATCH profile
→ Save to DB
→ Reload safe

Everything is now correct and production-ready ✅


---

If you want next:
- 📄 **API documentation `.md`**
- 📄 **Frontend flow `.md`**
- 📄 **Database schema `.md`**

Just tell me 👍