# Doctor Timeslot Scheduling – Full Flow Documentation

## App Name
doctor

---

## 1. OVERALL FLOW (BIG PICTURE)

Doctor logs in  
⬇  
Doctor opens **Schedule / Time Slots page**  
⬇  
Frontend calls backend API  
⬇  
Backend returns only **logged-in doctor’s slots**  
⬇  
Doctor can:
- View slots
- Add slot
- Mark Busy / Free
- Delete slot

All actions are saved in **database**.

---

## 2. AUTHENTICATION FLOW

### Login
- Doctor logs in
- Backend returns:
  - access_token
  - refresh_token

### Frontend stores token
```js
localStorage.setItem("access_token", token)
Every API call sends token
http
Copy code
Authorization: Bearer <access_token>
This ensures:
✅ Doctor sees only his slots
✅ Another doctor cannot see these slots

3. DATABASE MODEL (Backend)
doctor/models.py
python
Copy code
class TimeSlot(models.Model):
    doctor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="timeslots"
    )
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    duration = models.IntegerField()
    is_available = models.BooleanField(default=True)
    is_booked = models.BooleanField(default=False)
Important
doctor field connects slot to logged-in doctor

Each doctor has different slots

4. BACKEND URLS (VERY IMPORTANT)
Base URL
ruby
Copy code
http://127.0.0.1:8000/api/doctor/
4.1 GET – Fetch doctor slots
swift
Copy code
GET /api/doctor/timeslots/
✔ Returns only slots of logged-in doctor
✔ Used when page loads

4.2 POST – Add new slot
swift
Copy code
POST /api/doctor/timeslots/
Request Body
json
Copy code
{
  "date": "2025-01-20",
  "start_time": "10:00",
  "end_time": "10:30",
  "duration": 30
}
✔ Slot saved with logged-in doctor
✔ Returned slot added to UI

4.3 PATCH – Toggle availability
bash
Copy code
PATCH /api/doctor/timeslots/<id>/toggle/
✔ Changes:

Available → Busy

Busy → Available

✔ Booked slots cannot change

4.4 DELETE – Remove slot
bash
Copy code
DELETE /api/doctor/timeslots/<id>/delete/
✔ Slot removed from DB
✔ UI updates immediately


5. FRONTEND FILE
File Name
Copy code
TimeSlotsContent.js
Used In
Doctor Dashboard → Schedule Page

6. FRONTEND API CONNECTIONS
Fetch slots (on page load)
js
Copy code
useEffect(() => {
  fetch("http://127.0.0.1:8000/api/doctor/timeslots/", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  })
}, [])
Add slot
js
Copy code
fetch("http://127.0.0.1:8000/api/doctor/timeslots/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
  body: JSON.stringify(payload),
})
Toggle busy/free
js
Copy code
fetch(`/api/doctor/timeslots/${id}/toggle/`, {
  method: "PATCH",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
})
Delete slot
js
Copy code
fetch(`/api/doctor/timeslots/${id}/delete/`, {
  method: "DELETE",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
})
7. FIELD NAME MATCHING (CRITICAL)
Backend → Frontend fields
Backend Field	Frontend Usage
start_time	slot.start_time
end_time	slot.end_time
is_available	slot.is_available
is_booked	slot.is_booked

❌ Do NOT use camelCase
✅ Use backend field names exactly

8. WHY ERROR HAPPENED (EXPLAINED)
Error:
bash
Copy code
Cannot read properties of undefined (reading 'localeCompare')
Reason:
Frontend used:

js
Copy code
slot.startTime
But backend sent:

js
Copy code
start_time
So undefined.localeCompare() crashed the app.

9. FINAL FLOW SUMMARY
Doctor Login
⬇
Token stored in browser
⬇
Doctor Schedule page opens
⬇
GET timeslots API called
⬇
Doctor adds / edits slots
⬇
Backend saves data
⬇
Doctor sees updated slots

✔ Each doctor has separate schedule

