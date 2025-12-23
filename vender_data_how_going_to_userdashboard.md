📄 Vendor → User Medicine Flow (QuickMed)
📌 Goal of This Task

When a vendor adds medicines, the same medicines must appear in the user dashboard.

To achieve this, we connected:

Vendor Dashboard

Django Backend

User Dashboard
################

🧱 1. Database Layer (Model)
📍 Model Used
VendorMedicine


This table stores:

medicine_name

category

price

quantity

prescription_required

vendor (ForeignKey)

📌 Important

Vendor adds data → saved here

User only reads data → from here

################

🧩 2. Backend Layer (Django REST API)

We created two types of APIs:

🔐 A. Vendor APIs (Protected)

Used only by vendor dashboard

API	Purpose
POST /api/vendor/medicines/add/	Vendor adds medicine
GET /api/vendor/medicines/	Vendor sees own medicines
PATCH /api/vendor/medicines/<id>/	Vendor updates medicine

These APIs:

Require login

Use IsAuthenticated

Filter by logged-in vendor

🌍 B. Public API (For Users)
✅ This is the MOST IMPORTANT API
GET /api/vendor/medicines/public/

Why we created this?

User must not call vendor APIs

User only needs to see medicines

No authentication required (or minimal)

📍 Backend Code (public_medicine_list)
@api_view(["GET"])
def public_medicine_list(request):
    medicines = VendorMedicine.objects.all()
    serializer = VendorMedicineSerializer(medicines, many=True)
    return Response(serializer.data)


📌 What this does

Reads all medicines from DB

Converts them to JSON

Sends them to frontend

#########################################
🧭 3. URL Routing (Very Important Fix)
📍 Main urls.py
path("api/vendor/", include("venderdashboard.urls")),

📍 App venderdashboard/urls.py
urlpatterns = [
    path("medicines/", vendor_medicine_list),
    path("medicines/add/", add_vendor_medicine),
    path("medicines/<int:pk>/", vendor_medicine_detail),

    # USER API
    path("medicines/public/", public_medicine_list),
]


📌 Why this mattered

Earlier → 404 error

Because app URLs were not included

After fixing → API became reachable

############################################
🖥️ 4. User Dashboard (React Frontend)
🔴 Old Situation (Problem)

User dashboard was using:

MEDICINES.filter(...)


Problems:

MEDICINES was static (fake data)

Backend data was ignored

ESLint error: MEDICINES is not defined

✅ What We Changed
A. Created state to hold backend data
const [medicines, setMedicines] = useState([]);

B. Fetch medicines from backend (IMPORTANT)
useEffect(() => {
  fetch("http://127.0.0.1:8000/api/vendor/medicines/public/")
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data)) {
        setMedicines(data);
      } else {
        setMedicines([]);
      }
    })
    .catch(() => setMedicines([]));
}, []);


📌 What this does

Calls public API

Receives JSON list

Stores it in medicines state

C. Filtering logic (Search)
const filteredMedicines = Array.isArray(medicines)
  ? medicines.filter(medicine =>
      medicine.medicine_name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      medicine.category
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
  : [];


📌 Why this is safe

Prevents .filter is not a function error

App never crashes

######################################################

🧠 5. Data Flow (Most Important to Understand)
Vendor Dashboard
   ↓ (POST)
Add Medicine API
   ↓
VendorMedicine Table (DB)
   ↓
Public Medicines API
   ↓
UserDashboard useEffect (fetch)
   ↓
setMedicines(data)
   ↓
filteredMedicines
   ↓
MedicineView UI

#################################################################

🛠️ 6. Errors We Fixed (Summary)
Error	Reason	Fix
MEDICINES not defined	Static data removed	Use medicines state
404 /api/vendor/medicines/	Wrong URL	Use /public/
.then() error	Broken useEffect	Fixed brackets
filter is not a function	API returned object	Array.isArray()
Empty UI	Vendor API used	Public API used
✅ Final Result

✔ Vendor adds medicine
✔ Saved in database
✔ Public API exposes it
✔ User dashboard fetches it
✔ Medicines visible to user


###################################################
🏁 Final Rule (Remember This)

Vendor APIs → Vendor Dashboard
Public APIs → User Dashboard