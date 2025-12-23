// import { useState, useEffect } from 'react';

// // Complete Mock Data with Pregnancy Care and Baby Care
// export const dashboardData = {
//   appointments: {
//     today: 8,
//     week: 42,
//     month: 156
//   },
//   consultations: {
//     today: 6,
//     week: 38,
//     month: 142
//   },
//   rescheduled: {
//     today: 2,
//     week: 8,
//     month: 25
//   },
//   cancelled: {
//     today: 1,
//     week: 5,
//     month: 18
//   },
//   pregnancyStats: {
//     activePatients: 15,
//     upcomingAppointments: 8,
//     homeVisits: 3,
//     trimesterBreakdown: { first: 4, second: 7, third: 4 }
//   },
//   babyCareStats: {
//     activeBabies: 12,
//     upcomingAppointments: 6,
//     plansBreakdown: { basic: 6, premium: 4, comprehensive: 2 }
//   },
//   recentConsultations: [
//     {
//       id: 1,
//       patientName: 'Sarah Johnson',
//       time: '10:30 AM',
//       date: '2024-01-15',
//       issue: 'Regular checkup and prescription renewal',
//       age: 45,
//       status: 'completed',
//       prescription: 'Medication A, Medication B',
//       notes: 'Patient responding well to treatment'
//     },
//     {
//       id: 2,
//       patientName: 'Michael Chen',
//       time: '11:15 AM',
//       date: '2024-01-15',
//       issue: 'Follow-up for blood pressure medication',
//       age: 62,
//       status: 'completed',
//       prescription: 'Blood Pressure Meds',
//       notes: 'BP under control, continue medication'
//     },
//     {
//       id: 3,
//       patientName: 'Mrs. Sharma (Baby Rohan)',
//       time: '2:00 PM',
//       date: '2024-01-15',
//       issue: 'Baby feeding consultation',
//       age: '3 months',
//       status: 'completed',
//       prescription: 'Feeding schedule adjustment',
//       notes: 'Breastfeeding going well',
//       type: 'baby'
//     },
//     {
//       id: 4,
//       patientName: 'Robert Williams',
//       time: '3:30 PM',
//       date: '2024-01-15',
//       issue: 'Diabetes management review',
//       age: 55,
//       status: 'completed',
//       prescription: 'Insulin, Diet Plan',
//       notes: 'Blood sugar levels improving'
//     }
//   ],
//   upcomingAppointments: [
//     {
//       id: 5,
//       patientName: 'Lisa Thompson',
//       time: '10:00 AM',
//       date: '2024-01-16',
//       issue: 'Annual physical examination',
//       age: 42,
//       duration: '30 mins',
//       type: 'Follow-up',
//       priority: 'normal',
//       status: 'scheduled'
//     },
//     {
//       id: 6,
//       patientName: 'Mr. Verma (Baby Aryan)',
//       time: '11:00 AM',
//       date: '2024-01-16',
//       issue: 'Baby vaccination follow-up',
//       age: '6 months',
//       duration: '45 mins',
//       type: 'Baby Care',
//       priority: 'high',
//       status: 'scheduled',
//       plan: 'comprehensive'
//     }
//   ],
//   rescheduledAppointments: [
//     {
//       id: 8,
//       patientName: 'Amit Patel',
//       time: '9:00 AM',
//       date: '2024-01-15',
//       issue: 'Fever and cold',
//       age: 35,
//       status: 'rescheduled',
//       originalDate: '2024-01-14',
//       newDate: '2024-01-15',
//       reason: 'Patient requested change'
//     }
//   ],
//   cancelledAppointments: [
//     {
//       id: 9,
//       patientName: 'Rajesh Kumar',
//       time: '3:00 PM',
//       date: '2024-01-17',
//       issue: 'General health checkup',
//       age: 40,
//       status: 'cancelled',
//       cancelledDate: '2024-01-15',
//       reason: 'Patient emergency'
//     }
//   ],
//   pendingAppointments: [
//     {
//       id: 10,
//       patientName: 'Rahul Verma',
//       time: '3:00 PM',
//       date: '2024-01-17',
//       issue: 'General health checkup',
//       age: 40,
//       duration: '30 mins',
//       type: 'New Patient',
//       priority: 'normal',
//       status: 'pending',
//       requestedDate: '2024-01-15'
//     }
//   ],
  
//   // Pregnancy Care Specific Data
//   pregnancyAppointments: {
//     pending: [
//       {
//         id: 1001,
//         patientName: 'Priya Sharma',
//         time: '10:00 AM',
//         date: '2024-01-16',
//         age: 29,
//         issue: 'Pregnancy checkup - First consultation',
//         duration: '60 mins',
//         type: 'Pregnancy Care',
//         status: 'pending',
//         requestedDate: '2024-01-15',
//         trimester: '1st',
//         weeks: 12,
//         isFirstConsultation: true,
//         consultationType: 'offline',
//         priority: 'high',
//         fee: 'Free',
//         location: 'Hospital',
//         notes: 'First consultation - Explain 9-month plan and packages'
//       },
//       {
//         id: 1002,
//         patientName: 'Meera Nair',
//         time: '11:30 AM',
//         date: '2024-01-16',
//         age: 31,
//         issue: 'Pregnancy follow-up - 2nd trimester',
//         duration: '45 mins',
//         type: 'Pregnancy Care',
//         status: 'pending',
//         requestedDate: '2024-01-15',
//         trimester: '2nd',
//         weeks: 24,
//         isFirstConsultation: false,
//         consultationType: 'online',
//         priority: 'normal',
//         fee: '₹800',
//         location: 'Online',
//         notes: 'Follow-up after glucose test'
//       }
//     ],
//     upcoming: [
//       {
//         id: 1003,
//         patientName: 'Swati Menon',
//         time: '2:00 PM',
//         date: '2024-01-17',
//         age: 27,
//         issue: 'Regular pregnancy checkup',
//         duration: '45 mins',
//         type: 'Pregnancy Care',
//         status: 'scheduled',
//         trimester: '3rd',
//         weeks: 32,
//         isFirstConsultation: false,
//         consultationType: 'home_visit',
//         priority: 'normal',
//         fee: '₹1500',
//         location: 'Home Visit',
//         notes: 'Home visit for detailed medical reports',
//         reports: ['ultrasound', 'blood_test', 'urine_analysis']
//       },
//       {
//         id: 1004,
//         patientName: 'Anjali Desai',
//         time: '3:30 PM',
//         date: '2024-01-17',
//         age: 30,
//         issue: 'Pregnancy nutrition consultation',
//         duration: '30 mins',
//         type: 'Pregnancy Care',
//         status: 'scheduled',
//         trimester: '2nd',
//         weeks: 20,
//         isFirstConsultation: false,
//         consultationType: 'online',
//         priority: 'normal',
//         fee: '₹600',
//         location: 'Online',
//         notes: 'Nutrition guidance for 2nd trimester'
//       }
//     ],
//     cancelled: [
//       {
//         id: 1006,
//         patientName: 'Neha Kapoor',
//         time: '11:00 AM',
//         date: '2024-01-15',
//         age: 32,
//         issue: 'Pregnancy checkup',
//         duration: '45 mins',
//         type: 'Pregnancy Care',
//         status: 'cancelled',
//         trimester: '2nd',
//         weeks: 18,
//         cancelledDate: '2024-01-14',
//         reason: 'Patient not feeling well',
//         consultationType: 'home_visit'
//       }
//     ]
//   },

//   // Baby Care Specific Data
//   babyCareAppointments: {
//     pending: [
//       {
//         id: 2001,
//         parentName: 'Mrs. Gupta',
//         babyName: 'Baby Arnav',
//         babyAge: '2 months',
//         time: '10:00 AM',
//         date: '2024-01-16',
//         issue: 'First baby care consultation',
//         feedingType: 'Formula',
//         consultationType: 'online',
//         plan: 'basic',
//         caregiverHours: '8 hours',
//         priority: 'normal',
//         fee: '₹500',
//         status: 'pending'
//       }
//     ],
//     upcoming: [
//       {
//         id: 2002,
//         parentName: 'Mr. Verma',
//         babyName: 'Baby Aryan',
//         babyAge: '6 months',
//         time: '2:00 PM',
//         date: '2024-01-17',
//         issue: 'Vaccination follow-up',
//         feedingType: 'Formula',
//         consultationType: 'offline',
//         plan: 'comprehensive',
//         caregiverHours: '24 hours',
//         priority: 'high',
//         fee: '₹1000',
//         status: 'scheduled',
//         caregiverNotes: 'Needs sleep schedule guidance'
//       },
//       {
//         id: 2003,
//         parentName: 'Mrs. Sharma',
//         babyName: 'Baby Rohan',
//         babyAge: '3 months',
//         time: '11:00 AM',
//         date: '2024-01-18',
//         issue: 'Feeding consultation',
//         feedingType: 'Breastfeeding',
//         consultationType: 'online',
//         plan: 'premium',
//         caregiverHours: '12 hours',
//         priority: 'normal',
//         fee: '₹800',
//         status: 'scheduled'
//       }
//     ],
//     cancelled: []
//   },

//   patients: [
//     {
//       id: 1,
//       name: 'Sarah Johnson',
//       lastVisit: '2024-01-15',
//       totalVisits: 12,
//       conditions: ['Hypertension', 'Diabetes'],
//       phone: '+91 98765 43210',
//       email: 'sarah.j@email.com',
//       bloodGroup: 'A+',
//       emergencyContact: '+91 98765 43211',
//       age: 45,
//       patientType: 'general',
//       medicalHistory: [
//         { date: '2024-01-15', diagnosis: 'Regular checkup', prescription: 'Medication A, Medication B' },
//         { date: '2023-12-10', diagnosis: 'Diabetes follow-up', prescription: 'Insulin adjustment' }
//       ]
//     },
//     {
//       id: 2,
//       name: 'Michael Chen',
//       lastVisit: '2024-01-15',
//       totalVisits: 8,
//       conditions: ['High Blood Pressure'],
//       phone: '+91 98765 43212',
//       email: 'michael.c@email.com',
//       bloodGroup: 'B+',
//       emergencyContact: '+91 98765 43213',
//       age: 62,
//       patientType: 'general',
//       medicalHistory: [
//         { date: '2024-01-15', diagnosis: 'BP follow-up', prescription: 'Blood Pressure Meds' }
//       ]
//     },
//     // Pregnancy Patients
//     {
//       id: 5,
//       name: 'Priya Sharma',
//       lastVisit: '2024-01-15',
//       totalVisits: 1,
//       conditions: ['Pregnancy - 1st Trimester', 'Normal Pregnancy'],
//       phone: '+91 98765 43218',
//       email: 'priya.s@email.com',
//       bloodGroup: 'O+',
//       emergencyContact: '+91 98765 43219 (Husband)',
//       age: 29,
//       patientType: 'pregnancy',
//       pregnancyDetails: {
//         trimester: '1st',
//         weeks: 12,
//         edd: '2024-07-20',
//         package: 'Basic Pregnancy Care',
//         isFirstConsultationFree: true,
//         consultationType: 'offline',
//         reports: [],
//         packageIncludes: ['Monthly checkups', 'Basic tests', 'Delivery assistance'],
//         nextAppointment: '2024-02-15',
//         doctorVisits: 1
//       },
//       medicalHistory: [
//         { 
//           date: '2024-01-15', 
//           diagnosis: 'First pregnancy consultation', 
//           prescription: 'Folic Acid, Prenatal Vitamins',
//           type: 'pregnancy',
//           consultationMode: 'offline',
//           notes: 'Explained 9-month plan. Selected Basic package.'
//         }
//       ]
//     },
//     {
//       id: 6,
//       name: 'Meera Nair',
//       lastVisit: '2023-12-20',
//       totalVisits: 3,
//       conditions: ['Pregnancy - 2nd Trimester', 'Gestational Diabetes'],
//       phone: '+91 98765 43220',
//       email: 'meera.n@email.com',
//       bloodGroup: 'B+',
//       emergencyContact: '+91 98765 43221 (Mother)',
//       age: 31,
//       patientType: 'pregnancy',
//       pregnancyDetails: {
//         trimester: '2nd',
//         weeks: 24,
//         edd: '2024-05-15',
//         package: 'Premium Pregnancy Care',
//         isFirstConsultationFree: false,
//         consultationType: 'online',
//         reports: ['ultrasound_20w', 'glucose_test', 'blood_report', 'urine_analysis'],
//         packageIncludes: ['Weekly checkups', 'All tests included', 'Home visits', 'Nutrition counseling'],
//         nextAppointment: '2024-01-30',
//         doctorVisits: 3
//       },
//       medicalHistory: [
//         { 
//           date: '2023-12-20', 
//           diagnosis: 'Pregnancy follow-up with gestational diabetes', 
//           prescription: 'Diet control, Regular monitoring',
//           type: 'pregnancy',
//           consultationMode: 'online',
//           notes: 'Glucose levels controlled with diet. Next visit for detailed reports.'
//         }
//       ]
//     },
//     // Baby Care Patients
//     {
//       id: 7,
//       name: 'Baby Rohan',
//       lastVisit: '2024-01-10',
//       totalVisits: 3,
//       conditions: ['Newborn Care', 'Regular Checkup'],
//       phone: '+91 98765 43222',
//       email: 'sharma.family@email.com',
//       bloodGroup: 'AB+',
//       emergencyContact: '+91 98765 43223 (Mother)',
//       age: '3 months',
//       patientType: 'baby',
//       babyCareDetails: {
//         package: 'premium',
//         age: '3 months',
//         weight: '6.2',
//         feedingType: 'Breastfeeding',
//         parentName: 'Mrs. Sharma',
//         parentPhone: '+91 98765 43222',
//         nextVaccination: 'Next month',
//         vaccinationDue: true,
//         reports: ['birth_certificate.pdf', 'vaccination_card.pdf', 'growth_chart.pdf'],
//         caregiverHours: '12 hours/day',
//         planFeatures: ['Enhanced hygiene', 'Play & developmental support', 'Daily reports']
//       },
//       medicalHistory: [
//         { 
//           date: '2024-01-10', 
//           diagnosis: 'Regular baby checkup', 
//           prescription: 'Vitamin D drops',
//           type: 'baby',
//           consultationMode: 'online',
//           notes: 'Growth normal. Feeding schedule established.'
//         }
//       ]
//     },
//     {
//       id: 8,
//       name: 'Baby Aryan',
//       lastVisit: '2024-01-08',
//       totalVisits: 5,
//       conditions: ['Vaccination Due', 'Growth Monitoring'],
//       phone: '+91 98765 43224',
//       email: 'verma.family@email.com',
//       bloodGroup: 'B+',
//       emergencyContact: '+91 98765 43225 (Father)',
//       age: '6 months',
//       patientType: 'baby',
//       babyCareDetails: {
//         package: 'comprehensive',
//         age: '6 months',
//         weight: '8.5',
//         feedingType: 'Formula',
//         parentName: 'Mr. Verma',
//         parentPhone: '+91 98765 43224',
//         nextVaccination: 'This week',
//         vaccinationDue: true,
//         reports: ['growth_chart.pdf', 'medical_history.pdf', 'vaccination_record.pdf'],
//         caregiverHours: '24×7',
//         planFeatures: ['24×7 caregiver', 'Pediatrician access', 'Premium supplies']
//       },
//       medicalHistory: [
//         { 
//           date: '2024-01-08', 
//           diagnosis: 'Vaccination follow-up', 
//           prescription: 'Regular vaccination schedule',
//           type: 'baby',
//           consultationMode: 'offline',
//           notes: 'Ready for next vaccination. Weight gain good.'
//         }
//       ]
//     }
//   ],
  
//   earningsHistory: {
//     daily: [
//       { date: '2024-01-15', amount: 2400, consultations: 6 },
//       { date: '2024-01-14', amount: 3200, consultations: 8 },
//       { date: '2024-01-13', amount: 2800, consultations: 7 },
//       { date: '2024-01-12', amount: 3600, consultations: 9 }
//     ],
//     weekly: [
//       { week: 'Week 2, Jan 2024', amount: 15200, consultations: 38 },
//       { week: 'Week 1, Jan 2024', amount: 16800, consultations: 42 },
//       { week: 'Week 4, Dec 2023', amount: 14400, consultations: 36 }
//     ],
//     monthly: [
//       { month: 'January 2024', amount: 56800, consultations: 142 },
//       { month: 'December 2023', amount: 61200, consultations: 153 },
//       { month: 'November 2023', amount: 52400, consultations: 131 }
//     ]
//   },
  
//   pregnancyPackages: [
//     {
//       id: 1,
//       name: 'Basic Pregnancy Care',
//       price: '₹25,000',
//       duration: '9 months',
//       features: [
//         'Monthly checkups',
//         'Basic tests (Blood, Urine)',
//         '2 Ultrasounds',
//         'Hospital delivery',
//         'Postnatal checkup'
//       ],
//       patients: 8
//     },
//     {
//       id: 2,
//       name: 'Premium Pregnancy Care',
//       price: '₹50,000',
//       duration: '9 months',
//       features: [
//         'Fortnightly checkups',
//         'All tests included',
//         '4 Ultrasounds',
//         'Home visits (3 times)',
//         'Nutrition counseling',
//         'Delivery & postnatal care'
//       ],
//       patients: 5
//     },
//     {
//       id: 3,
//       name: 'Comprehensive Pregnancy Care',
//       price: '₹75,000',
//       duration: '9 months',
//       features: [
//         'Weekly checkups',
//         'All tests & advanced scans',
//         'Unlimited home visits',
//         'Personalized nutrition plan',
//         'Delivery preparation classes',
//         'Complete postnatal care'
//       ],
//       patients: 2
//     }
//   ],

//   babyCarePlans: [
//     {
//       id: 'basic',
//       name: 'Basic Plan',
//       price: '₹8,999/month',
//       duration: 'Monthly subscription',
//       patients: '45 babies enrolled',
//       icon: '👶',
//       color: '#3B82F6',
//       features: [
//         'Supplies & hygiene essentials delivery',
//         'Diapers, wipes, skincare monthly',
//         'Basic feeding & diaper assistance',
//         'Light caregiving (up to 8 hours/day)',
//         'Basic hygiene & nursery maintenance',
//         'Monthly check-in advice line',
//         'Parent support chat'
//       ],
//       idealFor: 'Newborns & early months',
//       coverage: '8 hours/day caregiver support'
//     },
//     {
//       id: 'premium',
//       name: 'Premium Plan',
//       price: '₹14,999/month',
//       duration: 'Monthly subscription',
//       patients: '28 babies enrolled',
//       icon: '🌟',
//       color: '#8B5CF6',
//       features: [
//         'Everything in Basic Plan',
//         'Extended caregiver (12 hours/day)',
//         'Enhanced hygiene & regular bathing',
//         'Nursery cleaning & management',
//         'Play & developmental support',
//         'Sleep & routine establishment',
//         'Daily/weekly progress reports',
//         'Age-appropriate toys & activities',
//         'Feeding schedule management'
//       ],
//       idealFor: 'Working parents, busy households',
//       coverage: '12 hours/day day+night support'
//     },
//     {
//       id: 'comprehensive',
//       name: 'Comprehensive Plan',
//       price: '₹24,999/month',
//       duration: 'Monthly subscription',
//       patients: '15 babies enrolled',
//       icon: '👑',
//       color: '#10B981',
//       features: [
//         'Everything in Premium Plan',
//         '24×7 live-in caregiver/nanny',
//         'Health monitoring & vaccination reminders',
//         'Pediatrician consultation access',
//         'Lactation & nutrition guidance',
//         'Sleep-training & parenting coaching',
//         'Postnatal & mother support',
//         'Premium organic supplies',
//         'Monthly baby-kit box',
//         'Replacement guarantee',
//         'Long-term contract options'
//       ],
//       idealFor: 'Both parents working, full support needed',
//       coverage: '24×7 round-the-clock care'
//     }
//   ]
// };

// // Update navigation to include Pregnancy Care and Baby Care
// export const navigationItems = [
//   { id: 'dashboard', label: 'Dashboard', icon: '📊' },
//   { id: 'appointments', label: 'Appointments', icon: '📅' },
//   { id: 'pregnancyCare', label: 'Pregnancy Care', icon: '🤰' },
//   { id: 'babyCare', label: 'Baby Care', icon: '👶' },
//   { id: 'patients', label: 'All Patients', icon: '👥' },
//   { id: 'earnings', label: 'Earnings', icon: '💰' },
//   { id: 'timeslots', label: 'Time Slots', icon: '⏰' }
// ];

// // Custom Hook for Window Size Detection
// export const useWindowSize = () => {
//   const [windowSize, setWindowSize] = useState({
//     width: typeof window !== 'undefined' ? window.innerWidth : 1200,
//     height: typeof window !== 'undefined' ? window.innerHeight : 800,
//   });

//   useEffect(() => {
//     if (typeof window === 'undefined') return;

//     const handleResize = () => {
//       setWindowSize({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     };

//     window.addEventListener('resize', handleResize);
//     handleResize();
    
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return windowSize;
// };

// // Custom Hook for State Management
// export const useDoctorState = (user) => {
//   const [activePage, setActivePage] = useState('dashboard');
//   const [timeRange, setTimeRange] = useState('today');
//   const [consultationDetails, setConsultationDetails] = useState(null);
//   const [appointmentFilter, setAppointmentFilter] = useState('upcoming');
//   const [patientSearch, setPatientSearch] = useState('');
//   const [earningFilter, setEarningFilter] = useState('daily');
//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [showNotificationsModal, setShowNotificationsModal] = useState(false);
//   const [showMessagesModal, setShowMessagesModal] = useState(false);
//   const [showChatbotModal, setShowChatbotModal] = useState(false);
//   const [selectedPatient, setSelectedPatient] = useState(null);
//   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [timeslots, setTimeslots] = useState([]);
//   const [pregnancyFilter, setPregnancyFilter] = useState('upcoming');
//   const [babyCareFilter, setBabyCareFilter] = useState('upcoming'); // New state for baby care filter

//   const windowSize = useWindowSize();

//   // Auto-close sidebar when switching to mobile
//   useEffect(() => {
//     if (windowSize.width > 768 && !isSidebarOpen) {
//       setIsSidebarOpen(false);
//     }
//   }, [windowSize.width, isSidebarOpen]);

//   const [userProfile, setUserProfile] = useState({
//     fullName: user?.fullName || 'Dr. John Doe',
//     email: user?.email || 'doctor@example.com',
//     phone: user?.phone || '+91 98765 43210',
//     specialization: user?.specialization || 'Gynecologist & Pediatrician',
//     licenseNumber: user?.licenseNumber || 'GYN-PED-2024-12345',
//     experience: user?.experience || '15 years',
//     hospital: user?.hospital || 'City General Hospital',
//     address: user?.address || 'Medical Complex, Sector 15, Noida',
//     city: user?.city || 'Noida',
//     state: user?.state || 'Uttar Pradesh',
//     pincode: user?.pincode || '201301'
//   });

//   const [notifications, setNotifications] = useState([
//     {
//       id: 1,
//       type: 'appointment',
//       title: 'New Pregnancy Appointment Request',
//       message: 'Priya Sharma requested first pregnancy consultation',
//       time: '10 minutes ago',
//       read: false,
//       priority: 'high',
//       category: 'pregnancy'
//     },
//     {
//       id: 2,
//       type: 'reminder',
//       title: 'Baby Care Home Visit',
//       message: 'Baby Aryan vaccination follow-up tomorrow at 2 PM',
//       time: '1 hour ago',
//       read: true,
//       priority: 'medium',
//       category: 'baby'
//     },
//     {
//       id: 3,
//       type: 'message',
//       title: 'New Message from Parent',
//       message: 'Mrs. Sharma sent baby feeding update',
//       time: '2 hours ago',
//       read: false,
//       priority: 'medium',
//       category: 'baby'
//     }
//   ]);

//   const [appointments, setAppointments] = useState({
//     upcoming: [],
//     rescheduled: [],
//     cancelled: [],
//     pending: []
//   });

//   const [patientNotes, setPatientNotes] = useState({});
//   const [patientMessages, setPatientMessages] = useState({});
//   const [formErrors, setFormErrors] = useState({});

//   useEffect(() => {
//     // Initialize appointments
//     setAppointments({
//       upcoming: dashboardData.upcomingAppointments,
//       rescheduled: dashboardData.rescheduledAppointments,
//       cancelled: dashboardData.cancelledAppointments,
//       pending: dashboardData.pendingAppointments
//     });

//     // Initialize messages
//     const initialMessages = {
//       'Priya Sharma': [
//         {
//           id: 1,
//           from: 'patient',
//           message: 'Hello Doctor, I uploaded my reports in File Locker.',
//           timestamp: '2024-01-15T14:30:00',
//           read: true,
//           category: 'pregnancy'
//         },
//         {
//           id: 2,
//           from: 'doctor',
//           message: 'I reviewed your reports. Everything looks normal for 12 weeks.',
//           timestamp: '2024-01-15T14:35:00',
//           read: true,
//           category: 'pregnancy'
//         }
//       ],
//       'Mrs. Sharma': [
//         {
//           id: 1,
//           from: 'parent',
//           message: 'Doctor, Baby Rohan is feeding well. Should I continue same schedule?',
//           timestamp: '2024-01-15T10:15:00',
//           read: true,
//           category: 'baby'
//         }
//       ],
//       'Mr. Verma': [
//         {
//           id: 1,
//           from: 'parent',
//           message: 'Baby Aryan has slight fever after vaccination. What should I do?',
//           timestamp: '2024-01-14T16:20:00',
//           read: false,
//           category: 'baby'
//         }
//       ]
//     };

//     setPatientMessages(initialMessages);
//   }, []);

//   return {
//     activePage,
//     setActivePage,
//     timeRange,
//     setTimeRange,
//     consultationDetails,
//     setConsultationDetails,
//     appointmentFilter,
//     setAppointmentFilter,
//     patientSearch,
//     setPatientSearch,
//     earningFilter,
//     setEarningFilter,
//     showProfileModal,
//     setShowProfileModal,
//     showNotificationsModal,
//     setShowNotificationsModal,
//     showMessagesModal,
//     setShowMessagesModal,
//     showChatbotModal,
//     setShowChatbotModal,
//     selectedPatient,
//     setSelectedPatient,
//     showLogoutConfirm,
//     setShowLogoutConfirm,
//     userProfile,
//     setUserProfile,
//     notifications,
//     setNotifications,
//     appointments,
//     setAppointments,
//     patientNotes,
//     setPatientNotes,
//     patientMessages,
//     setPatientMessages,
//     formErrors,
//     setFormErrors,
//     isSidebarOpen,
//     setIsSidebarOpen,
//     windowSize,
//     timeslots,
//     setTimeslots,
//     pregnancyFilter,
//     setPregnancyFilter,
//     babyCareFilter,
//     setBabyCareFilter // New state for baby care
//   };
// };

// // Custom Hook for Actions
// export const useDoctorActions = (state) => {
//   const {
//     userProfile,
//     setUserProfile,
//     appointments,
//     setAppointments,
//     patientMessages,
//     setPatientMessages,
//     patientNotes,
//     setPatientNotes,
//     notifications,
//     setNotifications,
//     setConsultationDetails,
//     setFormErrors,
//     setShowMessagesModal,
//     setSelectedPatient,
//     setShowProfileModal,
//     setShowNotificationsModal,
//     setShowLogoutConfirm,
//     setIsSidebarOpen,
//     windowSize,
//     setActivePage,
//     timeslots,
//     setTimeslots,
//     setPregnancyFilter,
//     setBabyCareFilter
//   } = state;

//   const getUnreadMessagesCount = () => {
//     let count = 0;
//     if (patientMessages && typeof patientMessages === 'object') {
//       Object.values(patientMessages).forEach(messages => {
//         if (Array.isArray(messages)) {
//           messages.forEach(msg => {
//             if ((msg.from === 'patient' || msg.from === 'parent') && !msg.read) {
//               count++;
//             }
//           });
//         }
//       });
//     }
//     return count;
//   };

//   const getUnreadNotificationsCount = () => {
//     return notifications.filter(notification => !notification.read).length;
//   };

//   const handleStartConversation = (patient) => {
//     if (!patient || !patient.name) return;
//     setSelectedPatient(patient);
//     setShowMessagesModal(true);
    
//     if (windowSize && windowSize.width <= 768) {
//       setIsSidebarOpen(false);
//     }
//   };

//   const handleMarkAsRead = (patientName) => {
//     setPatientMessages(prev => {
//       const updated = { ...prev };
//       if (updated[patientName]) {
//         updated[patientName] = updated[patientName].map(msg => ({
//           ...msg,
//           read: true
//         }));
//       }
//       return updated;
//     });
//   };

//   const handleSendMessage = (patientName, message) => {
//     if (!message.trim()) return;

//     const newMessage = {
//       id: Date.now(),
//       from: 'doctor',
//       message: message,
//       timestamp: new Date().toISOString(),
//       read: true
//     };

//     setPatientMessages(prev => ({
//       ...prev,
//       [patientName]: [...(prev[patientName] || []), newMessage]
//     }));
//   };

//   // Pregnancy-specific actions
//   const handleApprovePregnancyAppointment = (appointmentId) => {
//     const appointment = dashboardData.pregnancyAppointments.pending.find(
//       apt => apt.id === appointmentId
//     );
    
//     if (appointment) {
//       // For first consultation, ensure it's offline
//       if (appointment.isFirstConsultation && appointment.consultationType !== 'offline') {
//         alert('First pregnancy consultation must be offline at hospital.');
//         return;
//       }
      
//       // Move to upcoming appointments
//       const updatedAppointment = {
//         ...appointment,
//         status: 'scheduled'
//       };
      
//       // Show success message
//       showNotification(
//         'Pregnancy Appointment Approved',
//         `Approved ${appointment.isFirstConsultation ? 'first' : ''} consultation with ${appointment.patientName}`
//       );
      
//       return updatedAppointment;
//     }
//     return null;
//   };

//   // Baby Care specific actions
//   const handleApproveBabyCareAppointment = (appointmentId) => {
//     const appointment = dashboardData.babyCareAppointments.pending.find(
//       apt => apt.id === appointmentId
//     );
    
//     if (appointment) {
//       const updatedAppointment = {
//         ...appointment,
//         status: 'scheduled'
//       };
      
//       showNotification(
//         'Baby Care Appointment Approved',
//         `Approved consultation for ${appointment.babyName}`
//       );
      
//       return updatedAppointment;
//     }
//     return null;
//   };

//   const handleUpdateBabyCarePlan = (babyName, planId) => {
//     showNotification(
//       'Baby Care Plan Updated',
//       `Updated ${babyName}'s care plan to ${planId}`
//     );
    
//     return true;
//   };

//   const handleScheduleHomeVisit = (patientName, date, time) => {
//     const homeVisitAppointment = {
//       id: Date.now(),
//       patientName,
//       date,
//       time,
//       issue: 'Home visit for detailed medical reports',
//       type: patientName.includes('Baby') ? 'Baby Care' : 'Pregnancy Care',
//       consultationType: 'home_visit',
//       status: 'scheduled',
//       priority: 'normal'
//     };
    
//     showNotification(
//       'Home Visit Scheduled',
//       `Scheduled home visit for ${patientName} on ${date} at ${time}`
//     );
    
//     return homeVisitAppointment;
//   };

//   const handleUploadReportToLocker = (patientName, reportType, file) => {
//     showNotification(
//       'Report Uploaded',
//       `${reportType} report uploaded to ${patientName}'s File Locker`
//     );
    
//     return true;
//   };

//   const handleViewPregnancyReports = (patientName) => {
//     const patient = dashboardData.patients.find(p => p.name === patientName && p.patientType === 'pregnancy');
    
//     if (patient && patient.pregnancyDetails && patient.pregnancyDetails.reports) {
//       const reports = patient.pregnancyDetails.reports;
      
//       const reportsWindow = window.open('', '_blank');
//       if (reportsWindow) {
//         reportsWindow.document.write(`
//           <html>
//             <head>
//               <title>Pregnancy Reports - ${patientName}</title>
//               <style>
//                 body { font-family: Arial, sans-serif; margin: 20px; }
//                 .header { border-bottom: 2px solid #009688; padding-bottom: 10px; margin-bottom: 20px; }
//                 .report-item { border: 1px solid #ddd; padding: 15px; margin-bottom: 10px; border-radius: 5px; }
//                 .report-type { font-weight: bold; color: #009688; }
//                 .upload-date { color: #4F6F6B; font-size: 12px; }
//               </style>
//             </head>
//             <body>
//               <div class="header">
//                 <h1>Pregnancy Reports - ${patientName}</h1>
//                 <p><strong>Trimester:</strong> ${patient.pregnancyDetails.trimester} | <strong>Weeks:</strong> ${patient.pregnancyDetails.weeks}</p>
//               </div>
//               <h2>Medical Reports in File Locker</h2>
//               ${reports.map((report, index) => `
//                 <div class="report-item">
//                   <p class="report-type">${report.replace(/_/g, ' ').toUpperCase()}</p>
//                   <p class="upload-date">Uploaded: ${new Date().toLocaleDateString()}</p>
//                   <button onclick="alert('Viewing ${report} report')">View Report</button>
//                   <button onclick="alert('Downloading ${report} report')">Download</button>
//                 </div>
//               `).join('')}
//             </body>
//           </html>
//         `);
//         reportsWindow.document.close();
//       }
//     } else {
//       alert('No reports found in File Locker for this patient.');
//     }
//   };

//   const handleUpdatePregnancyPackage = (patientName, packageName) => {
//     showNotification(
//       'Package Updated',
//       `Updated ${patientName}'s pregnancy package to ${packageName}`
//     );
    
//     return true;
//   };

//   const handleStartConsultation = (appointmentId) => {
//     const appointment = appointments.upcoming.find(apt => apt.id === appointmentId);
//     if (appointment) {
//       setAppointments(prev => ({
//         ...prev,
//         upcoming: prev.upcoming.filter(apt => apt.id !== appointmentId)
//       }));
      
//       if (windowSize && windowSize.width <= 768) {
//         showNotification('Consultation Started', `Started consultation with ${appointment.patientName}`);
//       }
      
//       return appointment;
//     }
//     return null;
//   };

//   const handleCancelAppointment = (appointmentId) => {
//     const appointment = appointments.upcoming.find(apt => apt.id === appointmentId);
//     if (appointment) {
//       const confirmMessage = `Are you sure you want to cancel the appointment with ${appointment.patientName}?`;
//       if (window.confirm(confirmMessage)) {
//         const cancelledAppointment = {
//           ...appointment,
//           status: 'cancelled',
//           cancelledDate: new Date().toISOString().split('T')[0],
//           reason: 'Doctor cancelled'
//         };

//         setAppointments(prev => ({
//           ...prev,
//           upcoming: prev.upcoming.filter(apt => apt.id !== appointmentId),
//           cancelled: [...prev.cancelled, cancelledAppointment]
//         }));

//         if (windowSize && windowSize.width <= 768) {
//           showNotification('Appointment Cancelled', `Cancelled appointment with ${appointment.patientName}`);
//         }
//       }
//     }
//   };

//   const handleApproveAppointment = (appointmentId) => {
//     const appointment = appointments.pending.find(apt => apt.id === appointmentId);
//     if (appointment) {
//       setAppointments(prev => ({
//         ...prev,
//         pending: prev.pending.filter(apt => apt.id !== appointmentId),
//         upcoming: [...prev.upcoming, { ...appointment, status: 'scheduled' }]
//       }));

//       if (windowSize && windowSize.width <= 768) {
//         showNotification('Appointment Approved', `Approved appointment with ${appointment.patientName}`);
//       }
//     }
//   };

//   const handleRejectAppointment = (appointmentId) => {
//     const appointment = appointments.pending.find(apt => apt.id === appointmentId);
//     if (appointment) {
//       const confirmMessage = `Are you sure you want to reject the appointment request from ${appointment.patientName}?`;
//       if (window.confirm(confirmMessage)) {
//         setAppointments(prev => ({
//           ...prev,
//           pending: prev.pending.filter(apt => apt.id !== appointmentId)
//         }));

//         if (windowSize && windowSize.width <= 768) {
//           showNotification('Appointment Rejected', `Rejected appointment with ${appointment.patientName}`);
//         }
//       }
//     }
//   };

//   const handleAddNotes = (patientName) => {
//     const currentNotes = patientNotes[patientName] || '';
//     const notes = prompt(`Add notes for ${patientName}:`, currentNotes);
//     if (notes !== null) {
//       setPatientNotes(prev => ({
//         ...prev,
//         [patientName]: notes
//       }));

//       if (windowSize && windowSize.width <= 768) {
//         showNotification('Notes Added', `Added notes for ${patientName}`);
//       }
//     }
//   };

//   const handleViewFullHistory = (patientName) => {
//     const patient = dashboardData.patients.find(p => p.name === patientName);
//     if (patient) {
//       const isMobileView = windowSize ? windowSize.width <= 768 : window.innerWidth <= 768;
      
//       if (isMobileView) {
//         const historyHTML = `
//           <html>
//             <head>
//               <title>Medical History - ${patientName}</title>
//               <meta name="viewport" content="width=device-width, initial-scale=1.0">
//               <style>
//                 body { 
//                   font-family: Arial, sans-serif; 
//                   margin: 15px; 
//                   line-height: 1.4;
//                   color: #124441;
//                 }
//                 .header { 
//                   border-bottom: 2px solid #009688; 
//                   padding-bottom: 10px; 
//                   margin-bottom: 20px; 
//                 }
//                 .history-item { 
//                   border: 1px solid #ddd; 
//                   padding: 12px; 
//                   margin-bottom: 10px; 
//                   border-radius: 8px;
//                   background: #E0F2F1;
//                 }
//                 .diagnosis { 
//                   font-weight: bold; 
//                   color: #009688; 
//                   margin: 5px 0;
//                 }
//                 .prescription { 
//                   color: #4F6F6B; 
//                   margin: 5px 0;
//                 }
//                 .back-button {
//                   background: #009688;
//                   color: white;
//                   border: none;
//                   padding: 10px 15px;
//                   border-radius: 5px;
//                   cursor: pointer;
//                   margin-bottom: 15px;
//                 }
//                 @media (max-width: 768px) {
//                   body { margin: 10px; }
//                   .history-item { padding: 10px; }
//                 }
//               </style>
//             </head>
//             <body>
//               <button class="back-button" onclick="window.history.back()">← Back</button>
//               <div class="header">
//                 <h1>Medical History - ${patientName}</h1>
//                 <p><strong>Age:</strong> ${patient.age} | <strong>Blood Group:</strong> ${patient.bloodGroup}</p>
//                 <p><strong>Conditions:</strong> ${patient.conditions.join(', ')}</p>
//                 ${patient.patientType === 'pregnancy' ? `
//                   <p><strong>Pregnancy:</strong> ${patient.pregnancyDetails.trimester} Trimester (${patient.pregnancyDetails.weeks} weeks)</p>
//                   <p><strong>EDD:</strong> ${patient.pregnancyDetails.edd}</p>
//                 ` : patient.patientType === 'baby' ? `
//                   <p><strong>Baby Care Plan:</strong> ${patient.babyCareDetails?.package || 'N/A'}</p>
//                   <p><strong>Feeding Type:</strong> ${patient.babyCareDetails?.feedingType || 'N/A'}</p>
//                 ` : ''}
//               </div>
//               <h2>Medical Records</h2>
//               ${patient.medicalHistory.map(record => `
//                 <div class="history-item">
//                   <p><strong>Date:</strong> ${record.date}</p>
//                   <p class="diagnosis">Diagnosis: ${record.diagnosis}</p>
//                   <p class="prescription">Prescription: ${record.prescription}</p>
//                   ${record.notes ? `<p><strong>Notes:</strong> ${record.notes}</p>` : ''}
//                 </div>
//               `).join('')}
//             </body>
//           </html>
//         `;
        
//         const historyWindow = window.open('', '_blank');
//         if (historyWindow) {
//           historyWindow.document.write(historyHTML);
//           historyWindow.document.close();
//         }
//       } else {
//         const historyWindow = window.open('', '_blank');
//         if (historyWindow) {
//           historyWindow.document.write(`
//             <html>
//               <head>
//                 <title>Medical History - ${patientName}</title>
//                 <style>
//                   body { font-family: Arial, sans-serif; margin: 20px; color: #124441; }
//                   .header { border-bottom: 2px solid #009688; padding-bottom: 10px; margin-bottom: 20px; }
//                   .history-item { border: 1px solid #ddd; padding: 15px; margin-bottom: 10px; border-radius: 5px; background: #E0F2F1; }
//                   .diagnosis { font-weight: bold; color: #009688; }
//                   .prescription { color: #4F6F6B; }
//                 </style>
//               </head>
//               <body>
//                 <div class="header">
//                   <h1>Medical History - ${patientName}</h1>
//                   <p><strong>Age:</strong> ${patient.age} | <strong>Blood Group:</strong> ${patient.bloodGroup}</p>
//                   <p><strong>Conditions:</strong> ${patient.conditions.join(', ')}</p>
//                   ${patient.patientType === 'pregnancy' ? `
//                     <p><strong>Pregnancy:</strong> ${patient.pregnancyDetails.trimester} Trimester (${patient.pregnancyDetails.weeks} weeks)</p>
//                     <p><strong>EDD:</strong> ${patient.pregnancyDetails.edd}</p>
//                   ` : patient.patientType === 'baby' ? `
//                     <p><strong>Baby Care Plan:</strong> ${patient.babyCareDetails?.package || 'N/A'}</p>
//                     <p><strong>Feeding Type:</strong> ${patient.babyCareDetails?.feedingType || 'N/A'}</p>
//                   ` : ''}
//                 </div>
//                 <h2>Medical Records</h2>
//                 ${patient.medicalHistory.map(record => `
//                   <div class="history-item">
//                     <p><strong>Date:</strong> ${record.date}</p>
//                     <p class="diagnosis">Diagnosis: ${record.diagnosis}</p>
//                     <p class="prescription">Prescription: ${record.prescription}</p>
//                   </div>
//                 `).join('')}
//               </body>
//             </html>
//           `);
//           historyWindow.document.close();
//         }
//       }
//     }
//   };

//   const handleProfileUpdate = (updatedProfile) => {
//     if (validateForm(updatedProfile)) {
//       setUserProfile(updatedProfile);
//       setShowProfileModal(false);
//       setFormErrors({});
      
//       if (windowSize && windowSize.width <= 768) {
//         showNotification('Profile Updated', 'Your profile has been updated successfully');
//       }
//     }
//   };

//   const handleMarkNotificationAsRead = (notificationId) => {
//     setNotifications(prev =>
//       prev.map(notification =>
//         notification.id === notificationId
//           ? { ...notification, read: true }
//           : notification
//       )
//     );
//   };

//   const handleMarkAllNotificationsAsRead = () => {
//     setNotifications(prev =>
//       prev.map(notification => ({ ...notification, read: true }))
//     );
    
//     if (windowSize && windowSize.width <= 768) {
//       showNotification('Notifications', 'All notifications marked as read');
//     }
//   };

//   const handleClearAllNotifications = () => {
//     setNotifications([]);
    
//     if (windowSize && windowSize.width <= 768) {
//       showNotification('Notifications', 'All notifications cleared');
//     }
//   };

//   const showNotification = (title, message) => {
//     if ('Notification' in window && Notification.permission === 'granted') {
//       new Notification(title, { body: message });
//     } else if ('Notification' in window && Notification.permission !== 'denied') {
//       Notification.requestPermission().then(permission => {
//         if (permission === 'granted') {
//           new Notification(title, { body: message });
//         } else {
//           alert(`${title}: ${message}`);
//         }
//       });
//     } else {
//       alert(`${title}: ${message}`);
//     }
//   };

//   // Timeslot Management Actions
//   const addTimeslot = (slot) => {
//     setTimeslots(prev => [...prev, slot]);
//     showNotification('Time Slot Added', `Added slot for ${slot.date} at ${slot.startTime}`);
//   };

//   const updateTimeslot = (updatedSlot) => {
//     setTimeslots(prev => 
//       prev.map(slot => 
//         slot.id === updatedSlot.id ? updatedSlot : slot
//       )
//     );
//     showNotification('Time Slot Updated', `Updated slot for ${updatedSlot.date}`);
//   };

//   const deleteTimeslot = (slotId) => {
//     setTimeslots(prev => prev.filter(slot => slot.id !== slotId));
//     showNotification('Time Slot Deleted', 'Time slot has been removed');
//   };

//   const toggleTimeslotAvailability = (slotId) => {
//     setTimeslots(prev =>
//       prev.map(slot =>
//         slot.id === slotId 
//           ? { ...slot, isAvailable: !slot.isAvailable }
//           : slot
//       )
//     );
//   };

//   // Form validation
//   const validateForm = (formData) => {
//     const errors = {};

//     const validateEmail = (email) => {
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       return emailRegex.test(email);
//     };

//     const validatePhone = (phone) => {
//       const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
//       return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
//     };

//     const validateName = (name) => {
//       const nameRegex = /^[a-zA-Z\s]*$/;
//       return nameRegex.test(name) && name.trim().length > 0;
//     };

//     const validatePincode = (pincode) => {
//       if (!pincode) return true;
//       const pincodeRegex = /^[1-9][0-9]{5}$/;
//       return pincodeRegex.test(pincode);
//     };

//     const validateLicenseNumber = (license) => {
//       const licenseRegex = /^[A-Za-z0-9\-]+$/;
//       return licenseRegex.test(license) && license.trim().length > 0;
//     };

//     const validateExperience = (experience) => {
//       const experienceRegex = /^[0-9]+\s*(years|yrs)?$/i;
//       return experienceRegex.test(experience) && experience.trim().length > 0;
//     };

//     if (!validateName(formData.fullName)) {
//       errors.fullName = 'Please enter a valid name (letters and spaces only)';
//     }

//     if (!validateEmail(formData.email)) {
//       errors.email = 'Please enter a valid email address';
//     }

//     if (!validatePhone(formData.phone)) {
//       errors.phone = 'Please enter a valid phone number';
//     }

//     if (!formData.specialization.trim()) {
//       errors.specialization = 'Specialization is required';
//     }

//     if (!validateLicenseNumber(formData.licenseNumber)) {
//       errors.licenseNumber = 'Please enter a valid license number';
//     }

//     if (!validateExperience(formData.experience)) {
//       errors.experience = 'Please enter valid experience (e.g., "12 years")';
//     }

//     if (formData.pincode && !validatePincode(formData.pincode)) {
//       errors.pincode = 'Please enter a valid 6-digit pincode';
//     }

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   return {
//     getUnreadMessagesCount,
//     getUnreadNotificationsCount,
//     handleStartConversation,
//     handleMarkAsRead,
//     handleSendMessage,
//     handleStartConsultation,
//     handleCancelAppointment,
//     handleApproveAppointment,
//     handleRejectAppointment,
//     handleAddNotes,
//     handleViewFullHistory,
//     handleProfileUpdate,
//     handleMarkNotificationAsRead,
//     handleMarkAllNotificationsAsRead,
//     handleClearAllNotifications,
//     showNotification,
//     validateForm,
//     addTimeslot,
//     updateTimeslot,
//     deleteTimeslot,
//     toggleTimeslotAvailability,
//     // Pregnancy-specific actions
//     handleApprovePregnancyAppointment,
//     handleScheduleHomeVisit,
//     handleUploadReportToLocker,
//     handleViewPregnancyReports,
//     handleUpdatePregnancyPackage,
//     setPregnancyFilter,
//     // Baby Care specific actions
//     handleApproveBabyCareAppointment,
//     handleUpdateBabyCarePlan,
//     setBabyCareFilter
//   };
// };







import { useState, useEffect } from 'react';

// Complete Mock Data with Pregnancy Care and Baby Care
export const dashboardData = {
  appointments: {
    today: 8,
    week: 42,
    month: 156
  },
  consultations: {
    today: 6,
    week: 38,
    month: 142
  },
  rescheduled: {
    today: 2,
    week: 8,
    month: 25
  },
  cancelled: {
    today: 1,
    week: 5,
    month: 18
  },
  pregnancyStats: {
    activePatients: 15,
    upcomingAppointments: 8,
    homeVisits: 3,
    trimesterBreakdown: { first: 4, second: 7, third: 4 }
  },
  babyCareStats: {
    activeBabies: 12,
    upcomingAppointments: 6,
    plansBreakdown: { basic: 6, premium: 4, comprehensive: 2 }
  },
  recentConsultations: [
    {
      id: 1,
      patientName: 'Sarah Johnson',
      time: '10:30 AM',
      date: '2024-01-15',
      issue: 'Regular checkup and prescription renewal',
      age: 45,
      status: 'completed',
      prescription: 'Medication A, Medication B',
      notes: 'Patient responding well to treatment'
    },
    {
      id: 2,
      patientName: 'Michael Chen',
      time: '11:15 AM',
      date: '2024-01-15',
      issue: 'Follow-up for blood pressure medication',
      age: 62,
      status: 'completed',
      prescription: 'Blood Pressure Meds',
      notes: 'BP under control, continue medication'
    },
    {
      id: 3,
      patientName: 'Mrs. Sharma (Baby Rohan)',
      time: '2:00 PM',
      date: '2024-01-15',
      issue: 'Baby feeding consultation',
      age: '3 months',
      status: 'completed',
      prescription: 'Feeding schedule adjustment',
      notes: 'Breastfeeding going well',
      type: 'baby'
    },
    {
      id: 4,
      patientName: 'Robert Williams',
      time: '3:30 PM',
      date: '2024-01-15',
      issue: 'Diabetes management review',
      age: 55,
      status: 'completed',
      prescription: 'Insulin, Diet Plan',
      notes: 'Blood sugar levels improving'
    }
  ],
  upcomingAppointments: [
    {
      id: 5,
      patientName: 'Lisa Thompson',
      time: '10:00 AM',
      date: '2024-01-16',
      issue: 'Annual physical examination',
      age: 42,
      duration: '30 mins',
      type: 'Follow-up',
      priority: 'normal',
      status: 'scheduled'
    },
    {
      id: 6,
      patientName: 'Mr. Verma (Baby Aryan)',
      time: '11:00 AM',
      date: '2024-01-16',
      issue: 'Baby vaccination follow-up',
      age: '6 months',
      duration: '45 mins',
      type: 'Baby Care',
      priority: 'high',
      status: 'scheduled',
      plan: 'comprehensive'
    }
  ],
  rescheduledAppointments: [
    {
      id: 8,
      patientName: 'Amit Patel',
      time: '9:00 AM',
      date: '2024-01-15',
      issue: 'Fever and cold',
      age: 35,
      status: 'rescheduled',
      originalDate: '2024-01-14',
      newDate: '2024-01-15',
      reason: 'Patient requested change'
    }
  ],
  cancelledAppointments: [
    {
      id: 9,
      patientName: 'Rajesh Kumar',
      time: '3:00 PM',
      date: '2024-01-17',
      issue: 'General health checkup',
      age: 40,
      status: 'cancelled',
      cancelledDate: '2024-01-15',
      reason: 'Patient emergency'
    }
  ],
  pendingAppointments: [
    {
      id: 10,
      patientName: 'Rahul Verma',
      time: '3:00 PM',
      date: '2024-01-17',
      issue: 'General health checkup',
      age: 40,
      duration: '30 mins',
      type: 'New Patient',
      priority: 'normal',
      status: 'pending',
      requestedDate: '2024-01-15'
    }
  ],
  
  // Pregnancy Care Specific Data
  pregnancyAppointments: {
    pending: [
      {
        id: 1001,
        patientName: 'Priya Sharma',
        time: '10:00 AM',
        date: '2024-01-16',
        age: 29,
        issue: 'Pregnancy checkup - First consultation',
        duration: '60 mins',
        type: 'Pregnancy Care',
        status: 'pending',
        requestedDate: '2024-01-15',
        trimester: '1st',
        weeks: 12,
        isFirstConsultation: true,
        consultationType: 'offline',
        priority: 'high',
        fee: 'Free',
        location: 'Hospital',
        notes: 'First consultation - Explain 9-month plan and packages'
      },
      {
        id: 1002,
        patientName: 'Meera Nair',
        time: '11:30 AM',
        date: '2024-01-16',
        age: 31,
        issue: 'Pregnancy follow-up - 2nd trimester',
        duration: '45 mins',
        type: 'Pregnancy Care',
        status: 'pending',
        requestedDate: '2024-01-15',
        trimester: '2nd',
        weeks: 24,
        isFirstConsultation: false,
        consultationType: 'online',
        priority: 'normal',
        fee: '₹800',
        location: 'Online',
        notes: 'Follow-up after glucose test'
      }
    ],
    upcoming: [
      {
        id: 1003,
        patientName: 'Swati Menon',
        time: '2:00 PM',
        date: '2024-01-17',
        age: 27,
        issue: 'Regular pregnancy checkup',
        duration: '45 mins',
        type: 'Pregnancy Care',
        status: 'scheduled',
        trimester: '3rd',
        weeks: 32,
        isFirstConsultation: false,
        consultationType: 'home_visit',
        priority: 'normal',
        fee: '₹1500',
        location: 'Home Visit',
        notes: 'Home visit for detailed medical reports',
        reports: ['ultrasound', 'blood_test', 'urine_analysis']
      },
      {
        id: 1004,
        patientName: 'Anjali Desai',
        time: '3:30 PM',
        date: '2024-01-17',
        age: 30,
        issue: 'Pregnancy nutrition consultation',
        duration: '30 mins',
        type: 'Pregnancy Care',
        status: 'scheduled',
        trimester: '2nd',
        weeks: 20,
        isFirstConsultation: false,
        consultationType: 'online',
        priority: 'normal',
        fee: '₹600',
        location: 'Online',
        notes: 'Nutrition guidance for 2nd trimester'
      }
    ],
    cancelled: [
      {
        id: 1006,
        patientName: 'Neha Kapoor',
        time: '11:00 AM',
        date: '2024-01-15',
        age: 32,
        issue: 'Pregnancy checkup',
        duration: '45 mins',
        type: 'Pregnancy Care',
        status: 'cancelled',
        trimester: '2nd',
        weeks: 18,
        cancelledDate: '2024-01-14',
        reason: 'Patient not feeling well',
        consultationType: 'home_visit'
      }
    ]
  },

  // Baby Care Specific Data
  babyCareAppointments: {
    pending: [
      {
        id: 2001,
        parentName: 'Mrs. Gupta',
        babyName: 'Baby Arnav',
        babyAge: '2 months',
        time: '10:00 AM',
        date: '2024-01-16',
        issue: 'First baby care consultation',
        feedingType: 'Formula',
        consultationType: 'online',
        plan: 'basic',
        caregiverHours: '8 hours',
        priority: 'normal',
        fee: '₹500',
        status: 'pending'
      }
    ],
    upcoming: [
      {
        id: 2002,
        parentName: 'Mr. Verma',
        babyName: 'Baby Aryan',
        babyAge: '6 months',
        time: '2:00 PM',
        date: '2024-01-17',
        issue: 'Vaccination follow-up',
        feedingType: 'Formula',
        consultationType: 'offline',
        plan: 'comprehensive',
        caregiverHours: '24 hours',
        priority: 'high',
        fee: '₹1000',
        status: 'scheduled',
        caregiverNotes: 'Needs sleep schedule guidance'
      },
      {
        id: 2003,
        parentName: 'Mrs. Sharma',
        babyName: 'Baby Rohan',
        babyAge: '3 months',
        time: '11:00 AM',
        date: '2024-01-18',
        issue: 'Feeding consultation',
        feedingType: 'Breastfeeding',
        consultationType: 'online',
        plan: 'premium',
        caregiverHours: '12 hours',
        priority: 'normal',
        fee: '₹800',
        status: 'scheduled'
      }
    ],
    cancelled: []
  },

  patients: [
    {
      id: 1,
      name: 'Sarah Johnson',
      lastVisit: '2024-01-15',
      totalVisits: 12,
      conditions: ['Hypertension', 'Diabetes'],
      phone: '+91 98765 43210',
      email: 'sarah.j@email.com',
      bloodGroup: 'A+',
      emergencyContact: '+91 98765 43211',
      age: 45,
      patientType: 'general',
      medicalHistory: [
        { date: '2024-01-15', diagnosis: 'Regular checkup', prescription: 'Medication A, Medication B' },
        { date: '2023-12-10', diagnosis: 'Diabetes follow-up', prescription: 'Insulin adjustment' }
      ]
    },
    {
      id: 2,
      name: 'Michael Chen',
      lastVisit: '2024-01-15',
      totalVisits: 8,
      conditions: ['High Blood Pressure'],
      phone: '+91 98765 43212',
      email: 'michael.c@email.com',
      bloodGroup: 'B+',
      emergencyContact: '+91 98765 43213',
      age: 62,
      patientType: 'general',
      medicalHistory: [
        { date: '2024-01-15', diagnosis: 'BP follow-up', prescription: 'Blood Pressure Meds' }
      ]
    },
    // Pregnancy Patients
    {
      id: 5,
      name: 'Priya Sharma',
      lastVisit: '2024-01-15',
      totalVisits: 1,
      conditions: ['Pregnancy - 1st Trimester', 'Normal Pregnancy'],
      phone: '+91 98765 43218',
      email: 'priya.s@email.com',
      bloodGroup: 'O+',
      emergencyContact: '+91 98765 43219 (Husband)',
      age: 29,
      patientType: 'pregnancy',
      pregnancyDetails: {
        trimester: '1st',
        weeks: 12,
        edd: '2024-07-20',
        package: 'Basic Pregnancy Care',
        isFirstConsultationFree: true,
        consultationType: 'offline',
        reports: [],
        packageIncludes: ['Monthly checkups', 'Basic tests', 'Delivery assistance'],
        nextAppointment: '2024-02-15',
        doctorVisits: 1
      },
      medicalHistory: [
        { 
          date: '2024-01-15', 
          diagnosis: 'First pregnancy consultation', 
          prescription: 'Folic Acid, Prenatal Vitamins',
          type: 'pregnancy',
          consultationMode: 'offline',
          notes: 'Explained 9-month plan. Selected Basic package.'
        }
      ]
    },
    {
      id: 6,
      name: 'Meera Nair',
      lastVisit: '2023-12-20',
      totalVisits: 3,
      conditions: ['Pregnancy - 2nd Trimester', 'Gestational Diabetes'],
      phone: '+91 98765 43220',
      email: 'meera.n@email.com',
      bloodGroup: 'B+',
      emergencyContact: '+91 98765 43221 (Mother)',
      age: 31,
      patientType: 'pregnancy',
      pregnancyDetails: {
        trimester: '2nd',
        weeks: 24,
        edd: '2024-05-15',
        package: 'Premium Pregnancy Care',
        isFirstConsultationFree: false,
        consultationType: 'online',
        reports: ['ultrasound_20w', 'glucose_test', 'blood_report', 'urine_analysis'],
        packageIncludes: ['Weekly checkups', 'All tests included', 'Home visits', 'Nutrition counseling'],
        nextAppointment: '2024-01-30',
        doctorVisits: 3
      },
      medicalHistory: [
        { 
          date: '2023-12-20', 
          diagnosis: 'Pregnancy follow-up with gestational diabetes', 
          prescription: 'Diet control, Regular monitoring',
          type: 'pregnancy',
          consultationMode: 'online',
          notes: 'Glucose levels controlled with diet. Next visit for detailed reports.'
        }
      ]
    },
    // Baby Care Patients
    {
      id: 7,
      name: 'Baby Rohan',
      lastVisit: '2024-01-10',
      totalVisits: 3,
      conditions: ['Newborn Care', 'Regular Checkup'],
      phone: '+91 98765 43222',
      email: 'sharma.family@email.com',
      bloodGroup: 'AB+',
      emergencyContact: '+91 98765 43223 (Mother)',
      age: '3 months',
      patientType: 'baby',
      babyCareDetails: {
        package: 'premium',
        age: '3 months',
        weight: '6.2',
        feedingType: 'Breastfeeding',
        parentName: 'Mrs. Sharma',
        parentPhone: '+91 98765 43222',
        nextVaccination: 'Next month',
        vaccinationDue: true,
        reports: ['birth_certificate.pdf', 'vaccination_card.pdf', 'growth_chart.pdf'],
        caregiverHours: '12 hours/day',
        planFeatures: ['Enhanced hygiene', 'Play & developmental support', 'Daily reports']
      },
      medicalHistory: [
        { 
          date: '2024-01-10', 
          diagnosis: 'Regular baby checkup', 
          prescription: 'Vitamin D drops',
          type: 'baby',
          consultationMode: 'online',
          notes: 'Growth normal. Feeding schedule established.'
        }
      ]
    },
    {
      id: 8,
      name: 'Baby Aryan',
      lastVisit: '2024-01-08',
      totalVisits: 5,
      conditions: ['Vaccination Due', 'Growth Monitoring'],
      phone: '+91 98765 43224',
      email: 'verma.family@email.com',
      bloodGroup: 'B+',
      emergencyContact: '+91 98765 43225 (Father)',
      age: '6 months',
      patientType: 'baby',
      babyCareDetails: {
        package: 'comprehensive',
        age: '6 months',
        weight: '8.5',
        feedingType: 'Formula',
        parentName: 'Mr. Verma',
        parentPhone: '+91 98765 43224',
        nextVaccination: 'This week',
        vaccinationDue: true,
        reports: ['growth_chart.pdf', 'medical_history.pdf', 'vaccination_record.pdf'],
        caregiverHours: '24×7',
        planFeatures: ['24×7 caregiver', 'Pediatrician access', 'Premium supplies']
      },
      medicalHistory: [
        { 
          date: '2024-01-08', 
          diagnosis: 'Vaccination follow-up', 
          prescription: 'Regular vaccination schedule',
          type: 'baby',
          consultationMode: 'offline',
          notes: 'Ready for next vaccination. Weight gain good.'
        }
      ]
    }
  ],
  
  earningsHistory: {
    daily: [
      { date: '2024-01-15', amount: 2400, consultations: 6 },
      { date: '2024-01-14', amount: 3200, consultations: 8 },
      { date: '2024-01-13', amount: 2800, consultations: 7 },
      { date: '2024-01-12', amount: 3600, consultations: 9 }
    ],
    weekly: [
      { week: 'Week 2, Jan 2024', amount: 15200, consultations: 38 },
      { week: 'Week 1, Jan 2024', amount: 16800, consultations: 42 },
      { week: 'Week 4, Dec 2023', amount: 14400, consultations: 36 }
    ],
    monthly: [
      { month: 'January 2024', amount: 56800, consultations: 142 },
      { month: 'December 2023', amount: 61200, consultations: 153 },
      { month: 'November 2023', amount: 52400, consultations: 131 }
    ]
  },
  
  pregnancyPackages: [
    {
      id: 1,
      name: 'Basic Pregnancy Care',
      price: '₹25,000',
      duration: '9 months',
      features: [
        'Monthly checkups',
        'Basic tests (Blood, Urine)',
        '2 Ultrasounds',
        'Hospital delivery',
        'Postnatal checkup'
      ],
      patients: 8
    },
    {
      id: 2,
      name: 'Premium Pregnancy Care',
      price: '₹50,000',
      duration: '9 months',
      features: [
        'Fortnightly checkups',
        'All tests included',
        '4 Ultrasounds',
        'Home visits (3 times)',
        'Nutrition counseling',
        'Delivery & postnatal care'
      ],
      patients: 5
    },
    {
      id: 3,
      name: 'Comprehensive Pregnancy Care',
      price: '₹75,000',
      duration: '9 months',
      features: [
        'Weekly checkups',
        'All tests & advanced scans',
        'Unlimited home visits',
        'Personalized nutrition plan',
        'Delivery preparation classes',
        'Complete postnatal care'
      ],
      patients: 2
    }
  ],

  babyCarePlans: [
    {
      id: 'basic',
      name: 'Basic Plan',
      price: '₹8,999/month',
      duration: 'Monthly subscription',
      patients: '45 babies enrolled',
      icon: '👶',
      color: '#3B82F6',
      features: [
        'Supplies & hygiene essentials delivery',
        'Diapers, wipes, skincare monthly',
        'Basic feeding & diaper assistance',
        'Light caregiving (up to 8 hours/day)',
        'Basic hygiene & nursery maintenance',
        'Monthly check-in advice line',
        'Parent support chat'
      ],
      idealFor: 'Newborns & early months',
      coverage: '8 hours/day caregiver support'
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: '₹14,999/month',
      duration: 'Monthly subscription',
      patients: '28 babies enrolled',
      icon: '🌟',
      color: '#8B5CF6',
      features: [
        'Everything in Basic Plan',
        'Extended caregiver (12 hours/day)',
        'Enhanced hygiene & regular bathing',
        'Nursery cleaning & management',
        'Play & developmental support',
        'Sleep & routine establishment',
        'Daily/weekly progress reports',
        'Age-appropriate toys & activities',
        'Feeding schedule management'
      ],
      idealFor: 'Working parents, busy households',
      coverage: '12 hours/day day+night support'
    },
    {
      id: 'comprehensive',
      name: 'Comprehensive Plan',
      price: '₹24,999/month',
      duration: 'Monthly subscription',
      patients: '15 babies enrolled',
      icon: '👑',
      color: '#10B981',
      features: [
        'Everything in Premium Plan',
        '24×7 live-in caregiver/nanny',
        'Health monitoring & vaccination reminders',
        'Pediatrician consultation access',
        'Lactation & nutrition guidance',
        'Sleep-training & parenting coaching',
        'Postnatal & mother support',
        'Premium organic supplies',
        'Monthly baby-kit box',
        'Replacement guarantee',
        'Long-term contract options'
      ],
      idealFor: 'Both parents working, full support needed',
      coverage: '24×7 round-the-clock care'
    }
  ]
};

// Update navigation to include Pregnancy Care and Baby Care
export const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'appointments', label: 'Appointments', icon: '📅' },
  { id: 'pregnancyCare', label: 'Pregnancy Care', icon: '🤰' },
  { id: 'babyCare', label: 'Baby Care', icon: '👶' },
  { id: 'patients', label: 'All Patients', icon: '👥' },
  { id: 'earnings', label: 'Earnings', icon: '💰' },
  { id: 'timeslots', label: 'Time Slots', icon: '⏰' }
];

// Custom Hook for Window Size Detection
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

// Custom Hook for State Management
export const useDoctorState = (user) => {
  const [activePage, setActivePage] = useState('dashboard');
  const [timeRange, setTimeRange] = useState('today');
  const [consultationDetails, setConsultationDetails] = useState(null);
  const [appointmentFilter, setAppointmentFilter] = useState('upcoming');
  const [patientSearch, setPatientSearch] = useState('');
  const [earningFilter, setEarningFilter] = useState('daily');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showMessagesModal, setShowMessagesModal] = useState(false);
  const [showChatbotModal, setShowChatbotModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [timeslots, setTimeslots] = useState([]);
  const [pregnancyFilter, setPregnancyFilter] = useState('upcoming');
  const [babyCareFilter, setBabyCareFilter] = useState('upcoming'); // New state for baby care filter

  const windowSize = useWindowSize();

  // Auto-close sidebar when switching to mobile
  useEffect(() => {
    if (windowSize.width > 768 && !isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  }, [windowSize.width, isSidebarOpen]);

  const [userProfile, setUserProfile] = useState({
  fullName: user?.fullName || '',
  email: user?.email || '',
  phone: user?.phone || '',
  specialization: '',
  licenseNumber: '',
  experience: '',
  hospital: '',
  address: '',
  city: '',
  state: '',
  pincode: ''
});

// ✅ ADD HERE
// useEffect(() => {
//   const fetchDoctorProfile = async () => {
//     const storedUser = JSON.parse(localStorage.getItem("currentUser"));
//     if (!storedUser?.email) return;

//     const res = await fetch(
//       `http://127.0.0.1:8000/api/profile/?email=${storedUser.email}`
//     );

//     if (res.ok) {
//   const data = await res.json();

//   setUserProfile({
//     fullName: data.fullName || '',
//     email: data.email || '',
//     phone: data.phone || '',
//     specialization: data.specialization || '',
//     licenseNumber: data.medicalLicense || '',
//     experience: data.yearsOfExperience
//       ? data.yearsOfExperience.toString()
//       : '',
//     hospital: data.clinicAddress || '',
//     address: data.clinicAddress || '',
//     city: data.city || '',
//     state: data.state || '',
//     pincode: data.pincode || ''
//   });
// }

//   };

//   fetchDoctorProfile();
// }, []);
// useEffect(() => {
//   const token = localStorage.getItem("access_token");

//   if (!token) return;

//   fetch("http://127.0.0.1:8000/api/profile/", {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   })
//     .then(res => res.json())
//     .then(data => {
//       setUserProfile({
//       //   fullName: data.fullName,
//       //   email: data.email,
//       //   phone: data.phone,
//       //   specialization: data.specialization,
//       //   licenseNumber: data.medicalLicense,
//       //   experience: data.yearsOfExperience,
//       //   address: data.clinicAddress,
//       //   city: data.city,
//       //   state: data.state,
//       //   pincode: data.pincode,
//       // });
      
//     });
// }, []);
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


  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'appointment',
      title: 'New Pregnancy Appointment Request',
      message: 'Priya Sharma requested first pregnancy consultation',
      time: '10 minutes ago',
      read: false,
      priority: 'high',
      category: 'pregnancy'
    },
    {
      id: 2,
      type: 'reminder',
      title: 'Baby Care Home Visit',
      message: 'Baby Aryan vaccination follow-up tomorrow at 2 PM',
      time: '1 hour ago',
      read: true,
      priority: 'medium',
      category: 'baby'
    },
    {
      id: 3,
      type: 'message',
      title: 'New Message from Parent',
      message: 'Mrs. Sharma sent baby feeding update',
      time: '2 hours ago',
      read: false,
      priority: 'medium',
      category: 'baby'
    }
  ]);

  const [appointments, setAppointments] = useState({
    upcoming: [],
    rescheduled: [],
    cancelled: [],
    pending: []
  });

  const [patientNotes, setPatientNotes] = useState({});
  const [patientMessages, setPatientMessages] = useState({});
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    // Initialize appointments
    setAppointments({
      upcoming: dashboardData.upcomingAppointments,
      rescheduled: dashboardData.rescheduledAppointments,
      cancelled: dashboardData.cancelledAppointments,
      pending: dashboardData.pendingAppointments
    });

    // Initialize messages
    const initialMessages = {
      'Priya Sharma': [
        {
          id: 1,
          from: 'patient',
          message: 'Hello Doctor, I uploaded my reports in File Locker.',
          timestamp: '2024-01-15T14:30:00',
          read: true,
          category: 'pregnancy'
        },
        {
          id: 2,
          from: 'doctor',
          message: 'I reviewed your reports. Everything looks normal for 12 weeks.',
          timestamp: '2024-01-15T14:35:00',
          read: true,
          category: 'pregnancy'
        }
      ],
      'Mrs. Sharma': [
        {
          id: 1,
          from: 'parent',
          message: 'Doctor, Baby Rohan is feeding well. Should I continue same schedule?',
          timestamp: '2024-01-15T10:15:00',
          read: true,
          category: 'baby'
        }
      ],
      'Mr. Verma': [
        {
          id: 1,
          from: 'parent',
          message: 'Baby Aryan has slight fever after vaccination. What should I do?',
          timestamp: '2024-01-14T16:20:00',
          read: false,
          category: 'baby'
        }
      ]
    };

    setPatientMessages(initialMessages);
  }, []);

  return {
    activePage,
    setActivePage,
    timeRange,
    setTimeRange,
    consultationDetails,
    setConsultationDetails,
    appointmentFilter,
    setAppointmentFilter,
    patientSearch,
    setPatientSearch,
    earningFilter,
    setEarningFilter,
    showProfileModal,
    setShowProfileModal,
    showNotificationsModal,
    setShowNotificationsModal,
    showMessagesModal,
    setShowMessagesModal,
    showChatbotModal,
    setShowChatbotModal,
    selectedPatient,
    setSelectedPatient,
    showLogoutConfirm,
    setShowLogoutConfirm,
    userProfile,
    setUserProfile,
    notifications,
    setNotifications,
    appointments,
    setAppointments,
    patientNotes,
    setPatientNotes,
    patientMessages,
    setPatientMessages,
    formErrors,
    setFormErrors,
    isSidebarOpen,
    setIsSidebarOpen,
    windowSize,
    timeslots,
    setTimeslots,
    pregnancyFilter,
    setPregnancyFilter,
    babyCareFilter,
    setBabyCareFilter // New state for baby care
  };
};

// Custom Hook for Actions
export const useDoctorActions = (state) => {
  const {
    userProfile,
    setUserProfile,
    appointments,
    setAppointments,
    patientMessages,
    setPatientMessages,
    patientNotes,
    setPatientNotes,
    notifications,
    setNotifications,
    setConsultationDetails,
    setFormErrors,
    setShowMessagesModal,
    setSelectedPatient,
    setShowProfileModal,
    setShowNotificationsModal,
    setShowLogoutConfirm,
    setIsSidebarOpen,
    windowSize,
    setActivePage,
    timeslots,
    setTimeslots,
    setPregnancyFilter,
    setBabyCareFilter
  } = state;

  const getUnreadMessagesCount = () => {
    let count = 0;
    if (patientMessages && typeof patientMessages === 'object') {
      Object.values(patientMessages).forEach(messages => {
        if (Array.isArray(messages)) {
          messages.forEach(msg => {
            if ((msg.from === 'patient' || msg.from === 'parent') && !msg.read) {
              count++;
            }
          });
        }
      });
    }
    return count;
  };

  const getUnreadNotificationsCount = () => {
    return notifications.filter(notification => !notification.read).length;
  };

  const handleStartConversation = (patient) => {
    if (!patient || !patient.name) return;
    setSelectedPatient(patient);
    setShowMessagesModal(true);
    
    if (windowSize && windowSize.width <= 768) {
      setIsSidebarOpen(false);
    }
  };

  const handleMarkAsRead = (patientName) => {
    setPatientMessages(prev => {
      const updated = { ...prev };
      if (updated[patientName]) {
        updated[patientName] = updated[patientName].map(msg => ({
          ...msg,
          read: true
        }));
      }
      return updated;
    });
  };

  const handleSendMessage = (patientName, message) => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      from: 'doctor',
      message: message,
      timestamp: new Date().toISOString(),
      read: true
    };

    setPatientMessages(prev => ({
      ...prev,
      [patientName]: [...(prev[patientName] || []), newMessage]
    }));
  };

  // Pregnancy-specific actions
  const handleApprovePregnancyAppointment = (appointmentId) => {
    const appointment = dashboardData.pregnancyAppointments.pending.find(
      apt => apt.id === appointmentId
    );
    
    if (appointment) {
      // For first consultation, ensure it's offline
      if (appointment.isFirstConsultation && appointment.consultationType !== 'offline') {
        alert('First pregnancy consultation must be offline at hospital.');
        return;
      }
      
      // Move to upcoming appointments
      const updatedAppointment = {
        ...appointment,
        status: 'scheduled'
      };
      
      // Show success message
      showNotification(
        'Pregnancy Appointment Approved',
        `Approved ${appointment.isFirstConsultation ? 'first' : ''} consultation with ${appointment.patientName}`
      );
      
      return updatedAppointment;
    }
    return null;
  };

  // Baby Care specific actions
  const handleApproveBabyCareAppointment = (appointmentId) => {
    const appointment = dashboardData.babyCareAppointments.pending.find(
      apt => apt.id === appointmentId
    );
    
    if (appointment) {
      const updatedAppointment = {
        ...appointment,
        status: 'scheduled'
      };
      
      showNotification(
        'Baby Care Appointment Approved',
        `Approved consultation for ${appointment.babyName}`
      );
      
      return updatedAppointment;
    }
    return null;
  };

  const handleUpdateBabyCarePlan = (babyName, planId) => {
    showNotification(
      'Baby Care Plan Updated',
      `Updated ${babyName}'s care plan to ${planId}`
    );
    
    return true;
  };

  const handleScheduleHomeVisit = (patientName, date, time) => {
    const homeVisitAppointment = {
      id: Date.now(),
      patientName,
      date,
      time,
      issue: 'Home visit for detailed medical reports',
      type: patientName.includes('Baby') ? 'Baby Care' : 'Pregnancy Care',
      consultationType: 'home_visit',
      status: 'scheduled',
      priority: 'normal'
    };
    
    showNotification(
      'Home Visit Scheduled',
      `Scheduled home visit for ${patientName} on ${date} at ${time}`
    );
    
    return homeVisitAppointment;
  };

  const handleUploadReportToLocker = (patientName, reportType, file) => {
    showNotification(
      'Report Uploaded',
      `${reportType} report uploaded to ${patientName}'s File Locker`
    );
    
    return true;
  };

  const handleViewPregnancyReports = (patientName) => {
    const patient = dashboardData.patients.find(p => p.name === patientName && p.patientType === 'pregnancy');
    
    if (patient && patient.pregnancyDetails && patient.pregnancyDetails.reports) {
      const reports = patient.pregnancyDetails.reports;
      
      const reportsWindow = window.open('', '_blank');
      if (reportsWindow) {
        reportsWindow.document.write(`
          <html>
            <head>
              <title>Pregnancy Reports - ${patientName}</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .header { border-bottom: 2px solid #009688; padding-bottom: 10px; margin-bottom: 20px; }
                .report-item { border: 1px solid #ddd; padding: 15px; margin-bottom: 10px; border-radius: 5px; }
                .report-type { font-weight: bold; color: #009688; }
                .upload-date { color: #4F6F6B; font-size: 12px; }
              </style>
            </head>
            <body>
              <div class="header">
                <h1>Pregnancy Reports - ${patientName}</h1>
                <p><strong>Trimester:</strong> ${patient.pregnancyDetails.trimester} | <strong>Weeks:</strong> ${patient.pregnancyDetails.weeks}</p>
              </div>
              <h2>Medical Reports in File Locker</h2>
              ${reports.map((report, index) => `
                <div class="report-item">
                  <p class="report-type">${report.replace(/_/g, ' ').toUpperCase()}</p>
                  <p class="upload-date">Uploaded: ${new Date().toLocaleDateString()}</p>
                  <button onclick="alert('Viewing ${report} report')">View Report</button>
                  <button onclick="alert('Downloading ${report} report')">Download</button>
                </div>
              `).join('')}
            </body>
          </html>
        `);
        reportsWindow.document.close();
      }
    } else {
      alert('No reports found in File Locker for this patient.');
    }
  };

  const handleUpdatePregnancyPackage = (patientName, packageName) => {
    showNotification(
      'Package Updated',
      `Updated ${patientName}'s pregnancy package to ${packageName}`
    );
    
    return true;
  };

  const handleStartConsultation = (appointmentId) => {
    const appointment = appointments.upcoming.find(apt => apt.id === appointmentId);
    if (appointment) {
      setAppointments(prev => ({
        ...prev,
        upcoming: prev.upcoming.filter(apt => apt.id !== appointmentId)
      }));
      
      if (windowSize && windowSize.width <= 768) {
        showNotification('Consultation Started', `Started consultation with ${appointment.patientName}`);
      }
      
      return appointment;
    }
    return null;
  };

  const handleCancelAppointment = (appointmentId) => {
    const appointment = appointments.upcoming.find(apt => apt.id === appointmentId);
    if (appointment) {
      const confirmMessage = `Are you sure you want to cancel the appointment with ${appointment.patientName}?`;
      if (window.confirm(confirmMessage)) {
        const cancelledAppointment = {
          ...appointment,
          status: 'cancelled',
          cancelledDate: new Date().toISOString().split('T')[0],
          reason: 'Doctor cancelled'
        };

        setAppointments(prev => ({
          ...prev,
          upcoming: prev.upcoming.filter(apt => apt.id !== appointmentId),
          cancelled: [...prev.cancelled, cancelledAppointment]
        }));

        if (windowSize && windowSize.width <= 768) {
          showNotification('Appointment Cancelled', `Cancelled appointment with ${appointment.patientName}`);
        }
      }
    }
  };

  const handleApproveAppointment = (appointmentId) => {
    const appointment = appointments.pending.find(apt => apt.id === appointmentId);
    if (appointment) {
      setAppointments(prev => ({
        ...prev,
        pending: prev.pending.filter(apt => apt.id !== appointmentId),
        upcoming: [...prev.upcoming, { ...appointment, status: 'scheduled' }]
      }));

      if (windowSize && windowSize.width <= 768) {
        showNotification('Appointment Approved', `Approved appointment with ${appointment.patientName}`);
      }
    }
  };

  const handleRejectAppointment = (appointmentId) => {
    const appointment = appointments.pending.find(apt => apt.id === appointmentId);
    if (appointment) {
      const confirmMessage = `Are you sure you want to reject the appointment request from ${appointment.patientName}?`;
      if (window.confirm(confirmMessage)) {
        setAppointments(prev => ({
          ...prev,
          pending: prev.pending.filter(apt => apt.id !== appointmentId)
        }));

        if (windowSize && windowSize.width <= 768) {
          showNotification('Appointment Rejected', `Rejected appointment with ${appointment.patientName}`);
        }
      }
    }
  };

  const handleAddNotes = (patientName) => {
    const currentNotes = patientNotes[patientName] || '';
    const notes = prompt(`Add notes for ${patientName}:`, currentNotes);
    if (notes !== null) {
      setPatientNotes(prev => ({
        ...prev,
        [patientName]: notes
      }));

      if (windowSize && windowSize.width <= 768) {
        showNotification('Notes Added', `Added notes for ${patientName}`);
      }
    }
  };

  const handleViewFullHistory = (patientName) => {
    const patient = dashboardData.patients.find(p => p.name === patientName);
    if (patient) {
      const isMobileView = windowSize ? windowSize.width <= 768 : window.innerWidth <= 768;
      
      if (isMobileView) {
        const historyHTML = `
          <html>
            <head>
              <title>Medical History - ${patientName}</title>
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                body { 
                  font-family: Arial, sans-serif; 
                  margin: 15px; 
                  line-height: 1.4;
                  color: #124441;
                }
                .header { 
                  border-bottom: 2px solid #009688; 
                  padding-bottom: 10px; 
                  margin-bottom: 20px; 
                }
                .history-item { 
                  border: 1px solid #ddd; 
                  padding: 12px; 
                  margin-bottom: 10px; 
                  border-radius: 8px;
                  background: #E0F2F1;
                }
                .diagnosis { 
                  font-weight: bold; 
                  color: #009688; 
                  margin: 5px 0;
                }
                .prescription { 
                  color: #4F6F6B; 
                  margin: 5px 0;
                }
                .back-button {
                  background: #009688;
                  color: white;
                  border: none;
                  padding: 10px 15px;
                  border-radius: 5px;
                  cursor: pointer;
                  margin-bottom: 15px;
                }
                @media (max-width: 768px) {
                  body { margin: 10px; }
                  .history-item { padding: 10px; }
                }
              </style>
            </head>
            <body>
              <button class="back-button" onclick="window.history.back()">← Back</button>
              <div class="header">
                <h1>Medical History - ${patientName}</h1>
                <p><strong>Age:</strong> ${patient.age} | <strong>Blood Group:</strong> ${patient.bloodGroup}</p>
                <p><strong>Conditions:</strong> ${patient.conditions.join(', ')}</p>
                ${patient.patientType === 'pregnancy' ? `
                  <p><strong>Pregnancy:</strong> ${patient.pregnancyDetails.trimester} Trimester (${patient.pregnancyDetails.weeks} weeks)</p>
                  <p><strong>EDD:</strong> ${patient.pregnancyDetails.edd}</p>
                ` : patient.patientType === 'baby' ? `
                  <p><strong>Baby Care Plan:</strong> ${patient.babyCareDetails?.package || 'N/A'}</p>
                  <p><strong>Feeding Type:</strong> ${patient.babyCareDetails?.feedingType || 'N/A'}</p>
                ` : ''}
              </div>
              <h2>Medical Records</h2>
              ${patient.medicalHistory.map(record => `
                <div class="history-item">
                  <p><strong>Date:</strong> ${record.date}</p>
                  <p class="diagnosis">Diagnosis: ${record.diagnosis}</p>
                  <p class="prescription">Prescription: ${record.prescription}</p>
                  ${record.notes ? `<p><strong>Notes:</strong> ${record.notes}</p>` : ''}
                </div>
              `).join('')}
            </body>
          </html>
        `;
        
        const historyWindow = window.open('', '_blank');
        if (historyWindow) {
          historyWindow.document.write(historyHTML);
          historyWindow.document.close();
        }
      } else {
        const historyWindow = window.open('', '_blank');
        if (historyWindow) {
          historyWindow.document.write(`
            <html>
              <head>
                <title>Medical History - ${patientName}</title>
                <style>
                  body { font-family: Arial, sans-serif; margin: 20px; color: #124441; }
                  .header { border-bottom: 2px solid #009688; padding-bottom: 10px; margin-bottom: 20px; }
                  .history-item { border: 1px solid #ddd; padding: 15px; margin-bottom: 10px; border-radius: 5px; background: #E0F2F1; }
                  .diagnosis { font-weight: bold; color: #009688; }
                  .prescription { color: #4F6F6B; }
                </style>
              </head>
              <body>
                <div class="header">
                  <h1>Medical History - ${patientName}</h1>
                  <p><strong>Age:</strong> ${patient.age} | <strong>Blood Group:</strong> ${patient.bloodGroup}</p>
                  <p><strong>Conditions:</strong> ${patient.conditions.join(', ')}</p>
                  ${patient.patientType === 'pregnancy' ? `
                    <p><strong>Pregnancy:</strong> ${patient.pregnancyDetails.trimester} Trimester (${patient.pregnancyDetails.weeks} weeks)</p>
                    <p><strong>EDD:</strong> ${patient.pregnancyDetails.edd}</p>
                  ` : patient.patientType === 'baby' ? `
                    <p><strong>Baby Care Plan:</strong> ${patient.babyCareDetails?.package || 'N/A'}</p>
                    <p><strong>Feeding Type:</strong> ${patient.babyCareDetails?.feedingType || 'N/A'}</p>
                  ` : ''}
                </div>
                <h2>Medical Records</h2>
                ${patient.medicalHistory.map(record => `
                  <div class="history-item">
                    <p><strong>Date:</strong> ${record.date}</p>
                    <p class="diagnosis">Diagnosis: ${record.diagnosis}</p>
                    <p class="prescription">Prescription: ${record.prescription}</p>
                  </div>
                `).join('')}
              </body>
            </html>
          `);
          historyWindow.document.close();
        }
      }
    }
  };

  // const handleProfileUpdate = (updatedProfile) => {
  //   if (validateForm(updatedProfile)) {
  //     setUserProfile(updatedProfile);
  //     setShowProfileModal(false);
  //     setFormErrors({});
      
  //     if (windowSize && windowSize.width <= 768) {
  //       showNotification('Profile Updated', 'Your profile has been updated successfully');
  //     }
  //   }
  // };

//  const handleProfileUpdate = async (updatedProfile) => {
//   if (!validateForm(updatedProfile)) return;

//   try {
//     const storedUser = JSON.parse(localStorage.getItem("currentUser"));
//     if (!storedUser?.email) {
//       alert("User not logged in");
//       return;
//     }

//     const response = await fetch(
//       "http://127.0.0.1:8000/api/profile/update/",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//   email: storedUser.email,

//   medicalLicense: updatedProfile.licenseNumber,
//   specialization: updatedProfile.specialization,
//   yearsOfExperience: parseInt(updatedProfile.experience),
//   clinicAddress: updatedProfile.address,

//   city: updatedProfile.city,
//   state: updatedProfile.state,
//   pincode: updatedProfile.pincode
// }),

//       }
//     );
// const token = localStorage.getItem("access_token");

// const response = await fetch(
//   "http://127.0.0.1:8000/api/profile/update/",
//   {
//     method: "PATCH", // ✅ MUST BE PATCH
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${token}` // ✅ MUST
//     },
//     body: JSON.stringify({
//       // BASIC
//       fullName: updatedProfile.fullName,
//       phone: updatedProfile.phone,

//       // DOCTOR
//       medicalLicense: updatedProfile.licenseNumber,
//       specialization: updatedProfile.specialization,
//       yearsOfExperience: parseInt(updatedProfile.experience),

//       // CLINIC & ADDRESS
//       clinicAddress: updatedProfile.hospital,
//       deliveryAddress: updatedProfile.address,

//       // LOCATION (🔥 THESE WERE NOT SAVING)
//       city: updatedProfile.city,
//       state: updatedProfile.state,
//       pincode: updatedProfile.pincode
//     }),
//   }
// );


//     if (!response.ok) {
//       const err = await response.json();
//       console.error("Profile update failed:", err);
//       alert("Profile update failed");
//       return;
//     }

//     const savedData = await response.json();

//     // 🔥 DB → UI update
//     setUserProfile(savedData);
//     setShowProfileModal(false);
//     setFormErrors({});
//     alert("Doctor profile saved successfully");

//   } catch (error) {
//     console.error("Doctor profile save error:", error);
//   }
// };
const handleProfileUpdate = async (updatedProfile) => {
  if (!validateForm(updatedProfile)) return;

  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("User not logged in");
      return;
    }

    const response = await fetch(
      "http://127.0.0.1:8000/api/profile/update/",
      {
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
      }
    );

    if (!response.ok) {
      alert("Profile update failed");
      return;
    }

    const savedData = await response.json();
    setUserProfile(savedData);
    setShowProfileModal(false);
    setFormErrors({});
    alert("Doctor profile saved successfully");

  } catch (error) {
    console.error(error);
  }
};

  const handleMarkNotificationAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
    
    if (windowSize && windowSize.width <= 768) {
      showNotification('Notifications', 'All notifications marked as read');
    }
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
    
    if (windowSize && windowSize.width <= 768) {
      showNotification('Notifications', 'All notifications cleared');
    }
  };

  const showNotification = (title, message) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body: message });
    } else if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification(title, { body: message });
        } else {
          alert(`${title}: ${message}`);
        }
      });
    } else {
      alert(`${title}: ${message}`);
    }
  };

  // Timeslot Management Actions
  const addTimeslot = (slot) => {
    setTimeslots(prev => [...prev, slot]);
    showNotification('Time Slot Added', `Added slot for ${slot.date} at ${slot.startTime}`);
  };

  const updateTimeslot = (updatedSlot) => {
    setTimeslots(prev => 
      prev.map(slot => 
        slot.id === updatedSlot.id ? updatedSlot : slot
      )
    );
    showNotification('Time Slot Updated', `Updated slot for ${updatedSlot.date}`);
  };

  const deleteTimeslot = (slotId) => {
    setTimeslots(prev => prev.filter(slot => slot.id !== slotId));
    showNotification('Time Slot Deleted', 'Time slot has been removed');
  };

  const toggleTimeslotAvailability = (slotId) => {
    setTimeslots(prev =>
      prev.map(slot =>
        slot.id === slotId 
          ? { ...slot, isAvailable: !slot.isAvailable }
          : slot
      )
    );
  };

  // Form validation
  const validateForm = (formData) => {
    const errors = {};

    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    };

    const validateName = (name) => {
      const nameRegex = /^[a-zA-Z\s]*$/;
      return nameRegex.test(name) && name.trim().length > 0;
    };

    const validatePincode = (pincode) => {
      if (!pincode) return true;
      const pincodeRegex = /^[1-9][0-9]{5}$/;
      return pincodeRegex.test(pincode);
    };

    const validateLicenseNumber = (license) => {
      const licenseRegex = /^[A-Za-z0-9\-\/]+$/;
      return licenseRegex.test(license) && license.trim().length > 0;
    };

    const validateExperience = (experience) => {
      const experienceRegex = /^[0-9]+\s*(years|yrs)?$/i;
      return experienceRegex.test(experience) && experience.trim().length > 0;
    };

    if (!validateName(formData.fullName)) {
      errors.fullName = 'Please enter a valid name (letters and spaces only)';
    }

    if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!validatePhone(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }

    if (!formData.specialization.trim()) {
      errors.specialization = 'Specialization is required';
    }

    // if (!validateLicenseNumber(formData.licenseNumber)) {
    //   errors.licenseNumber = 'Please enter a valid license number';
    // }
    if (
  formData.licenseNumber &&
  !validateLicenseNumber(formData.licenseNumber)
) {
  errors.licenseNumber = 'Please enter a valid license number';
}

    if (!validateExperience(formData.experience)) {
      errors.experience = 'Please enter valid experience (e.g., "12 years")';
    }

    if (formData.pincode && !validatePincode(formData.pincode)) {
      errors.pincode = 'Please enter a valid 6-digit pincode';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return {
    getUnreadMessagesCount,
    getUnreadNotificationsCount,
    handleStartConversation,
    handleMarkAsRead,
    handleSendMessage,
    handleStartConsultation,
    handleCancelAppointment,
    handleApproveAppointment,
    handleRejectAppointment,
    handleAddNotes,
    handleViewFullHistory,
    handleProfileUpdate,
    handleMarkNotificationAsRead,
    handleMarkAllNotificationsAsRead,
    handleClearAllNotifications,
    showNotification,
    validateForm,
    addTimeslot,
    updateTimeslot,
    deleteTimeslot,
    toggleTimeslotAvailability,
    // Pregnancy-specific actions
    handleApprovePregnancyAppointment,
    handleScheduleHomeVisit,
    handleUploadReportToLocker,
    handleViewPregnancyReports,
    handleUpdatePregnancyPackage,
    setPregnancyFilter,
    // Baby Care specific actions
    handleApproveBabyCareAppointment,
    handleUpdateBabyCarePlan,
    setBabyCareFilter
  };
};