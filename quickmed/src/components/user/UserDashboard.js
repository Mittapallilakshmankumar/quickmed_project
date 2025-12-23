// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import Header from './Header';
// import ProfileView from './ProfileView';
// import AppointmentsView from './AppointmentsView';
// import OrdersView from './OrdersView';
// import MedicineView from './MedicineView';
// import CartView from './CartView';
// import ConsultationView from './ConsultationView';
// import LiveTrackingView from './LiveTrackingView';
// import NotificationsPage from './NotificationsPage';
// import FullNotificationsPage from './FullNotificationsPage';
// import Modals from './Modals';
// import Products from './Products';
// import AIChatbotWidget from './AIChatbotWidget';
// import VehicleDashboard from './VehicleDashboard';
// import { ProfileProvider, useProfile } from './ProfileContext';

// // Import the new views
// import PregnancyCareView from './PregnancyCareView';
// import LabTestsView from './LabTestsView';
// import HealthRecordsView from './HealthRecordsView';
// import BloodBankView from './BloodBankView';
// import BabyCareView from './BabyCareView';

// // Color Scheme Constants
// const COLORS = {
//   primary: '#009688',        // Teal - Main brand color
//   mint: '#4DB6AC',          // Light teal/mint
//   softbg: '#E0F2F1',        // Very light teal background
//   white: '#FFFFFF',         // White
//   darktext: '#124441',      // Dark teal text
//   softtext: '#4F6F6B'       // Muted teal text
// };

// // Error Boundary Component
// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError() {
//     return { hasError: true };
//   }

//   render() {
//     if (this.state.hasError) {
//       return (
//         <div style={{ padding: '20px', textAlign: 'center' }}>
//           <h2>Something went wrong</h2>
//           <button onClick={() => this.setState({ hasError: false })}>
//             Try Again
//           </button>
//         </div>
//       );
//     }
//     return this.props.children;
//   }
// }

// // Mock Data
// const DOCTORS = [
//   {
//     id: '1', name: 'Dr. Brahma Gadikoto', specialty: 'General Physician',
//     experience: '15+ years', languages: 'English, Hindi, Telugu',
//     consultationFee: '730', availableSlots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM']
//   },
//   {
//     id: '2', name: 'Dr. Charitha Kasturi', specialty: 'Pediatrician',
//     experience: '12+ years', languages: 'English, Hindi, Tamil',
//     consultationFee: '850', availableSlots: ['09:30 AM', '10:30 AM', '11:30 AM', '02:30 PM', '03:30 PM', '04:30 PM']
//   },
//   {
//     id: '3', name: 'Dr. Rajesh Kumar', specialty: 'Cardiologist',
//     experience: '18+ years', languages: 'English, Hindi',
//     consultationFee: '1200', availableSlots: ['10:00 AM', '11:00 AM', '12:00 PM', '03:00 PM', '04:00 PM', '05:00 PM']
//   }
// ];

// const MEDICINES = [
//   { id: 1, name: 'Aspirin 75mg', price: 25, vendor: 'WellCare Store', category: 'OTC', description: 'Low-dose aspirin for heart health' },
//   { id: 2, name: 'Paracetamol 500mg', price: 30, vendor: 'City Pharmacy', category: 'OTC', description: 'Effective relief from fever and pain' },
//   { id: 3, name: 'Ibuprofen 400mg', price: 35, vendor: 'HealthPlus Medicines', category: 'OTC', description: 'Anti-inflammatory pain relief' },
//   { id: 4, name: 'Vitamin C 1000mg', price: 40, vendor: 'WellCare Store', category: 'Vitamins', description: 'Immune system support' },
//   { id: 5, name: 'Amoxicillin 500mg', price: 120, vendor: 'City Pharmacy', category: 'Prescription', description: 'Antibiotic for bacterial infections' },
//   { id: 6, name: 'Blood Pressure Monitor', price: 899, vendor: 'HealthPlus Medicines', category: 'Equipment', description: 'Digital automatic monitoring' }
// ];

// const PHARMACIES = [
//   { 
//     id: 1, name: 'City Pharmacy', distance: '1.1 km', deliveryTime: '20 min', rating: 4.5,
//     medicines: [
//       { id: 2, name: 'Paracetamol 500mg', price: 30, category: 'OTC' },
//       { id: 5, name: 'Amoxicillin 500mg', price: 120, category: 'Prescription' }
//     ]
//   },
//   { 
//     id: 2, name: 'WellCare Store', distance: '1.6 km', deliveryTime: '25 min', rating: 4.8,
//     medicines: [
//       { id: 1, name: 'Aspirin 75mg', price: 25, category: 'OTC' },
//       { id: 4, name: 'Vitamin C 1000mg', price: 40, category: 'Vitamins' }
//     ]
//   }
// ];

// const CHATBOT_RESPONSES = {
//   'hello': "Hello! I'm your QuickMed assistant. How can I help you with medicines or doctor consultations today?",
//   'hi': "Hi there! Welcome to QuickMed. How can I assist you with healthcare services?",
//   'medicine': "We offer a wide range of medicines. You can search for specific medicines, upload prescriptions, or browse categories.",
//   'doctor': "We have certified doctors available for online consultations.",
//   'delivery': "We offer fast delivery within 2 hours for medicines and 24/7 doctor consultations.",
//   'payment': "We accept all major payment methods including UPI, credit/debit cards, net banking, and wallet payments.",
//   'prescription': "You can upload your prescription in the Medicine section.",
//   'emergency': "For medical emergencies, please contact your nearest hospital immediately or call emergency services at 108.",
//   'default': "I understand you're asking about healthcare services. I can help with medicine orders, doctor appointments, delivery tracking, and general health queries."
// };

// const DASHBOARD_STYLES = {
//   container: { 
//     minHeight: '40vh', 
//     backgroundColor: COLORS.softbg, 
//     overflowX: 'hidden',
//     width: '100%',
//     maxWidth: '100vw'
//   },
//   mainContent: { 
//     padding: 'max(15px, 1.5vw)', 
//     maxWidth: '1400px', 
//     margin: '0 auto', 
//     marginTop: '0', 
//     width: '100%',
//     boxSizing: 'border-box'
//   },
//   welcomeSection: { 
//     textAlign: 'center', 
//     marginBottom: 'max(25px, 2.5vw)', 
//     padding: 'max(25px, 2.5vw) max(15px, 1.5vw)',
//     backgroundColor: COLORS.white, 
//     borderRadius: '15px', 
//     boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//     width: '100%', 
//     marginTop: '90px',
//     borderBottom: `4px solid ${COLORS.primary}`,
//     boxSizing: 'border-box'
//   },
//   welcomeTitle: { 
//     fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', 
//     fontWeight: 'bold', 
//     color: COLORS.primary, 
//     marginBottom: 'max(10px, 1vw)',
//     lineHeight: '1.3'
//   },
//   welcomeSubtitle: { 
//     fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', 
//     color: COLORS.softtext, 
//     maxWidth: 'min(700px, 90%)', 
//     margin: '0 auto',
//     lineHeight: '1.6'
//   },
//   serviceGrid: { 
//     display: 'grid', 
//     gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', 
//     gap: 'max(20px, 2vw)', 
//     marginBottom: 'max(20px, 2vw)', 
//     width: '100%'
//   },
//   serviceCard: { 
//     backgroundColor: COLORS.white, 
//     borderRadius: '12px', 
//     padding: 'max(20px, 2vw) max(15px, 1.5vw)', 
//     textAlign: 'center', 
//     boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
//     cursor: 'pointer', 
//     transition: 'all 0.2s ease', 
//     border: `1px solid ${COLORS.mint}20`, 
//     minHeight: 'min(300px, auto)',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'space-between'
//   },
//   serviceIcon: { 
//     fontSize: 'clamp(2rem, 4vw, 2.5rem)', 
//     marginBottom: 'max(15px, 1.5vw)', 
//     height: 'clamp(50px, 6vw, 60px)'
//   },
//   serviceTitle: { 
//     fontSize: 'clamp(1rem, 2vw, 1.2rem)', 
//     fontWeight: 'bold', 
//     color: COLORS.primary, 
//     marginBottom: 'max(10px, 1vw)',
//     lineHeight: '1.3'
//   },
//   serviceDescription: { 
//     fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)', 
//     color: COLORS.softtext, 
//     marginBottom: 'max(15px, 1.5vw)', 
//     flexGrow: 1,
//     lineHeight: '1.5'
//   },
//   serviceButton: { 
//     backgroundColor: COLORS.primary, 
//     color: COLORS.white, 
//     border: 'none', 
//     padding: 'max(10px, 1vw) max(20px, 2vw)', 
//     borderRadius: '20px', 
//     fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)', 
//     fontWeight: 'bold', 
//     cursor: 'pointer', 
//     width: '100%',
//     transition: 'background-color 0.3s ease'
//   },
//   subscriptionGrid: { 
//     display: 'grid', 
//     gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', 
//     gap: 'max(25px, 2.5vw)', 
//     width: '100%'
//   },
//   subscriptionCard: { 
//     backgroundColor: COLORS.white, 
//     borderRadius: '15px', 
//     padding: 'max(25px, 2.5vw) max(20px, 2vw)', 
//     textAlign: 'center', 
//     boxShadow: '0 4px 15px rgba(0,0,0,0.1)', 
//     border: `2px solid ${COLORS.mint}30`,
//     transition: 'all 0.3s ease',
//     display: 'flex',
//     flexDirection: 'column',
//     minHeight: 'min(450px, auto)',
//     position: 'relative'
//   },
//   subscriptionHeader: { 
//     paddingBottom: 'max(15px, 1.5vw)', 
//     borderBottom: `2px solid ${COLORS.softbg}`,
//     marginBottom: 'max(20px, 2vw)'
//   },
//   subscriptionTitle: { 
//     fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', 
//     fontWeight: 'bold', 
//     color: COLORS.primary, 
//     marginBottom: 'max(10px, 1vw)',
//     lineHeight: '1.3'
//   },
//   subscriptionPrice: { 
//     fontSize: 'clamp(1.8rem, 3vw, 2.2rem)', 
//     fontWeight: 'bold', 
//     color: COLORS.darktext, 
//     marginBottom: 'max(5px, 0.5vw)'
//   },
//   subscriptionDuration: { 
//     fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)', 
//     color: COLORS.softtext, 
//     marginBottom: 'max(15px, 1.5vw)'
//   },
//   featureList: { 
//     textAlign: 'left', 
//     margin: 'max(20px, 2vw) 0',
//     flexGrow: 1
//   },
//   featureItem: { 
//     display: 'flex', 
//     alignItems: 'center', 
//     marginBottom: 'max(12px, 1.2vw)',
//     fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)',
//     lineHeight: '1.4'
//   },
//   infoGrid: { 
//     display: 'grid', 
//     gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', 
//     gap: 'max(20px, 2vw)', 
//     width: '100%'
//   },
//   infoCard: { 
//     backgroundColor: COLORS.softbg, 
//     borderRadius: '12px', 
//     padding: 'max(20px, 2vw) max(15px, 1.5vw)', 
//     border: `1px solid ${COLORS.mint}30`, 
//     minHeight: 'min(260px, auto)'
//   }
// };

// const SERVICES = [
//   { 
//     view: 'medicine',  
//     title: 'Medicine Delivery', 
//     desc: 'Get prescribed medicines delivered within 2 hours. Upload prescriptions for quick verification.',
//     icon: '💊'
//   },
//   { 
//     view: 'consultation',  
//     title: 'Doctor Consultation', 
//     desc: 'Connect with certified doctors online for video consultations. Available 24/7 for all your healthcare needs.',
//     icon: '👨‍⚕️'
//   },
//   { 
//     view: 'products',  
//     title: 'Product Catalog', 
//     desc: 'Browse complete medicine catalog with detailed information, health guides, and expert recommendations.',
//     icon: '🛒'
//   },
//   { 
//     view: 'pregnancy-care',  
//     title: 'Pregnancy Care', 
//     desc: 'Track your pregnancy journey, appointments, and baby\'s development week by week.',
//     icon: '🤰'
//   },
//   { 
//     view: 'lab-tests', 
//     title: 'Lab Tests', 
//     desc: 'Book diagnostic tests, view results online, and track your health metrics.',
//     icon: '🔬'
//   },
//   { 
//     view: 'health-records', 
//     title: 'Health Records', 
//     desc: 'Store and access your complete medical history, lab results, prescriptions securely.',
//     icon: '📋'
//   },
//   { 
//     view: 'blood-bank',  
//     title: 'Blood Bank', 
//     desc: 'Find blood donors, request blood, donate blood, and save lives with our services.',
//     icon: '🩸'
//   },
//   { 
//     view: 'baby-care',  
//     title: 'Baby Care', 
//     desc: 'Track your baby\'s growth, vaccination schedule, feeding, and development milestones.',
//     icon: '👶'
//   },
//   {
//     view: 'vehicle-dashboard',
//     title: 'Vehicle Dashboard',
//     desc: 'View ambulance, cab, auto, and bike availability near your location in real-time.',
//     icon: '🚗'
//   }
// ];

// // Subscription Plans Data
// const SUBSCRIPTION_PLANS = {
//   babyCare: [
//     {
//       id: 'baby-monthly',
//       title: 'Baby Care Monthly',
//       price: 499,
//       duration: 'month',
//       savings: 'Save 10%',
//       popular: false,
//       features: [
//         'Personalized baby diet plan by age',
//         'Daily activity & growth monitoring',
//         'Health check reminders',
//         'Vaccination schedule tracker',
//         'Access to pediatric expert tips',
//         'Weekly progress reports',
//         '24/7 pediatric nurse support',
//         'Emergency consultation priority'
//       ]
//     },
//     {
//       id: 'baby-annual',
//       title: 'Baby Care Annual',
//       price: 4999,
//       duration: 'year',
//       savings: 'Save 25%',
//       popular: true,
//       features: [
//         'All Monthly plan features',
//         '4 free pediatric consultations',
//         'Free vaccination at home',
//         'Monthly developmental assessment',
//         'Personal growth chart analysis',
//         'Nutritional supplements guidance',
//         'Milestone achievement rewards',
//         'Priority emergency response'
//       ]
//     }
//   ],
//   pregnancyCare: [
//     {
//       id: 'pregnancy-basic',
//       title: 'Basic Pregnancy Care',
//       price: 25000,
//       duration: '9 months',
//       patientsEnrolled: '450+ Patients',
//       popular: false,
//       features: [
//         'Monthly checkups',
//         'Basic tests (Blood, Urine)',
//         '2 Ultrasounds',
//         'Hospital delivery',
//         'Postnatal checkup'
//       ]
//     },
//     {
//       id: 'pregnancy-premium',
//       title: 'Premium Pregnancy Care',
//       price: 50000,
//       duration: '9 months',
//       patientsEnrolled: '680+ Patients',
//       popular: true,
//       features: [
//         'Fortnightly checkups',
//         'All tests included',
//         '4 Ultrasounds',
//         'Home visits (3 times)',
//         'Nutrition counseling',
//         'Delivery & postnatal care'
//       ]
//     },
//     {
//       id: 'pregnancy-comprehensive',
//       title: 'Comprehensive Pregnancy Care',
//       price: 75000,
//       duration: '9 months',
//       patientsEnrolled: '320+ Patients',
//       popular: false,
//       features: [
//         'Weekly checkups',
//         'All tests & advanced scans',
//         'Unlimited home visits',
//         'Personalized nutrition plan',
//         'Delivery preparation classes',
//         'Complete postnatal care'
//       ]
//     }
//   ]
// };

// // Helper function to get consistent button text
// const getButtonText = (title) => {
//   const words = title.split(' ');
//   if (words.length <= 2) return title;
//   return words.slice(0, 2).join(' ');
// };

// // Helper function to save cart to localStorage
// const saveCartToLocalStorage = (cart) => {
//   try {
//     const cartData = {
//       items: cart,
//       timestamp: new Date().getTime(),
//       expiresIn: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
//     };
//     localStorage.setItem('quickmed_cart', JSON.stringify(cartData));
//   } catch (error) {
//     console.error('Error saving cart to localStorage:', error);
//   }
// };

// // Helper function to load cart from localStorage
// const loadCartFromLocalStorage = () => {
//   try {
//     const savedCart = localStorage.getItem('quickmed_cart');
//     if (savedCart) {
//       const cartData = JSON.parse(savedCart);
//       const now = new Date().getTime();
      
//       // Check if cart has expired (more than 7 days old)
//       if (now - cartData.timestamp < cartData.expiresIn) {
//         return cartData.items || [];
//       } else {
//         // Clear expired cart
//         localStorage.removeItem('quickmed_cart');
//       }
//     }
//   } catch (error) {
//     console.error('Error loading cart from localStorage:', error);
//     localStorage.removeItem('quickmed_cart');
//   }
//   return [];
// };

// // Helper function to save appointments to localStorage
// const saveAppointmentsToLocalStorage = (appointments) => {
//   try {
//     localStorage.setItem('userAppointments', JSON.stringify(appointments));
//   } catch (error) {
//     console.error('Error saving appointments to localStorage:', error);
//   }
// };

// // Helper function to load appointments from localStorage
// const loadAppointmentsFromLocalStorage = () => {
//   try {
//     const savedAppointments = localStorage.getItem('userAppointments');
//     if (savedAppointments) {
//       return JSON.parse(savedAppointments);
//     }
//   } catch (error) {
//     console.error('Error loading appointments from localStorage:', error);
//   }
//   return [];
// };

// // Add Razorpay script dynamically
// const loadRazorpayScript = () => {
//   return new Promise((resolve) => {
//     if (window.Razorpay) {
//       resolve(true);
//       return;
//     }
//     const script = document.createElement('script');
//     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//     script.onload = () => {
//       resolve(true);
//     };
//     script.onerror = () => {
//       resolve(false);
//     };
//     document.body.appendChild(script);
//   });
// };

// const UserDashboardContent = ({ user, onLogout, onWriteReview }) => {
//   const { profile, updateProfile } = useProfile();
//   const location = useLocation();
//   const navigate = useNavigate();
  
//   // Get initial view from URL
//   const getInitialView = () => {
//     const path = location.pathname;
//     const segments = path.split('/');
//     const currentView = segments[segments.length - 1];
    
//     const validViews = [
//       'dashboard', 'profile', 'appointments', 'orders', 'medicine',
//       'products', 'cart', 'consultation', 'live-tracking', 'notifications',
//       'pregnancy-care', 'lab-tests', 'health-records', 'blood-bank', 'baby-care', 'vehicle-dashboard'
//     ];
    
//     return validViews.includes(currentView) ? currentView : 'dashboard';
//   };
  
//   const [activeView, setActiveView] = useState(getInitialView());
//   const [cart, setCart] = useState(() => loadCartFromLocalStorage());
//   const [searchQuery, setSearchQuery] = useState('');
//   const [orders, setOrders] = useState([]);
//   const [showCheckoutConfirm, setShowCheckoutConfirm] = useState(false);
//   const [paymentLoading, setPaymentLoading] = useState(false);
//   const [showChatbot, setShowChatbot] = useState(false);
//   const [chatMessages, setChatMessages] = useState([{ id: 1, text: "Hello! I'm your QuickMed assistant. How can I help you today?", sender: 'bot', timestamp: new Date() }]);
//   const [userMessage, setUserMessage] = useState('');
//   const [doctorChats, setDoctorChats] = useState({});
//   const [pharmacySearchQueries, setPharmacySearchQueries] = useState({});
//   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
//   const [showProfileDropdown, setShowProfileDropdown] = useState(false);
//   const [showProfilePhotoModal, setShowProfilePhotoModal] = useState(false);
//   const [profilePhotoFile, setProfilePhotoFile] = useState(null);
//   const [profilePhotoPreview, setProfilePhotoPreview] = useState(profile?.profilePhoto || null);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [showFullNotifications, setShowFullNotifications] = useState(false);
//   const [notifications, setNotifications] = useState([
//     { id: 1, title: 'Order Confirmed', message: 'Your order ORD001 has been confirmed', timestamp: new Date(Date.now() - 300000), read: false, type: 'order' },
//     { id: 2, title: 'Delivery Update', message: 'Your order is out for delivery', timestamp: new Date(Date.now() - 600000), read: false, type: 'delivery' }
//   ]);
//   const [orderFilter, setOrderFilter] = useState('all');
//   const [prescriptionFile, setPrescriptionFile] = useState(null);
//   const [prescriptionPreview, setPrescriptionPreview] = useState(null);
//   const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
//   const [trackingOrder, setTrackingOrder] = useState(null);
//   const [selectedPharmacy, setSelectedPharmacy] = useState(null);
//   const [showPharmacyStore, setShowPharmacyStore] = useState(false);
//   const [appointments, setAppointments] = useState(() => loadAppointmentsFromLocalStorage());
//   const [appointmentFilter, setAppointmentFilter] = useState('all');
//   const [doctorSearchQuery, setDoctorSearchQuery] = useState('');
//   const [selectedSpecialty, setSelectedSpecialty] = useState('');
//   const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
//   const [selectedExperience, setSelectedExperience] = useState('');
//   const [selectedLanguage, setSelectedLanguage] = useState('');
//   const [razorpayLoaded, setRazorpayLoaded] = useState(false);

//   // New state for subscription modal - REMOVED showSubscriptionModal
//   const [selectedSubscription, setSelectedSubscription] = useState(null);
//   const [showUpgradeModal, setShowUpgradeModal] = useState(false);
//   const [selectedUpgradePlan, setSelectedUpgradePlan] = useState(null);
//   const [userSubscriptions, setUserSubscriptions] = useState([]);

//   // New state for phone confirmation
//   const [showPhoneConfirm, setShowPhoneConfirm] = useState(false);
//   const [tempPhone, setTempPhone] = useState('');
//   const [paymentPlan, setPaymentPlan] = useState(null);
//   const [checkoutData, setCheckoutData] = useState(null);
//   const [paymentType, setPaymentType] = useState(''); // 'subscription' or 'checkout'

//   const chatInputRef = useRef(null);
//   const chatMessagesEndRef = useRef(null);
//   const profilePhotoInputRef = useRef(null);
//   const notificationRef = useRef(null);
//   const profileRef = useRef(null);

//   const [healthRecords, setHealthRecords] = useState({
//     conditions: [{ id: 1, condition: 'Hypertension', diagnosedDate: '2022-03-15', status: 'Controlled', severity: 'Mild', treatment: 'Medication & Lifestyle changes' }],
//     labResults: [{ id: 1, test: 'Complete Blood Count', result: 'Normal', date: '2024-01-15', status: 'Normal', lab: 'Metropolis Laboratory' }],
//     vitals: [{ id: 1, type: 'Blood Pressure', value: '120/80 mmHg', date: '2024-01-20', status: 'Normal' }],
//     allergies: [{ id: 1, allergen: 'Penicillin', severity: 'Severe', reaction: 'Anaphylaxis', diagnosed: '2018-05-20' }],
//     surgical: [{ id: 1, procedure: 'Appendectomy', date: '2015-07-10', hospital: 'City General Hospital', surgeon: 'Dr. Ramesh Kumar' }]
//   });

//   const deliveryPartner = {
//     id: 'DP001', name: 'Rahul Kumar', phone: '+91 9876543210', vehicle: 'Bike',
//     vehicleNumber: 'KA01AB1234', rating: 4.7, status: 'picked_up', estimatedTime: '25 min'
//   };

//   const specialties = ['General Physician', 'Pediatrician', 'Cardiologist', 'Dermatologist', 'Orthopedic'];
//   const allTimeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];

//   // Sync URL changes with activeView state
//   useEffect(() => {
//     // Get current view from URL pathname
//     const path = location.pathname;
//     const segments = path.split('/');
//     const currentView = segments[segments.length - 1];
    
//     // List of valid views
//     const validViews = [
//       'dashboard', 'profile', 'appointments', 'orders', 'medicine',
//       'products', 'cart', 'consultation', 'live-tracking', 'notifications',
//       'pregnancy-care', 'lab-tests', 'health-records', 'blood-bank', 'baby-care', 'vehicle-dashboard'
//     ];
    
//     // If URL contains a valid view and it's different from current activeView, update state
//     if (validViews.includes(currentView) && currentView !== activeView) {
//       setActiveView(currentView);
//     }
//   }, [location.pathname, activeView]);

//   // Initialize activeView on component mount
//   useEffect(() => {
//     // Ensure URL matches active view
//     if (activeView === 'dashboard' && !location.pathname.endsWith('/dashboard') && !location.pathname.endsWith('/user')) {
//       navigate('/user/dashboard', { replace: true });
//     } else if (activeView !== 'dashboard' && !location.pathname.endsWith(`/${activeView}`)) {
//       navigate(`/user/${activeView}`, { replace: true });
//     }
//   }, [activeView, navigate, location.pathname]);

//   // Save appointments to localStorage whenever they change
//   useEffect(() => {
//     saveAppointmentsToLocalStorage(appointments);
//   }, [appointments]);

//   // Save cart to localStorage whenever it changes
//   useEffect(() => {
//     saveCartToLocalStorage(cart);
//   }, [cart]);

//   // Core Functions
//   const handleNavigation = useCallback((view) => {
//     // Update URL first
//     if (view === 'dashboard') {
//       navigate('/user/dashboard');
//     } else {
//       navigate(`/user/${view}`);
//     }
    
//     // Then update the state after a tiny delay to ensure URL change is processed
//     setTimeout(() => {
//       setActiveView(view);
//     }, 10);
    
//     // Scroll to top
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   }, [navigate]);

//   const safeSetActiveView = useCallback((view) => handleNavigation(view), [handleNavigation]);

//   // Notification Functions
//   const addNotification = useCallback((title, message, type = 'info') => {
//     setNotifications(prev => [{ id: Date.now(), title, message, timestamp: new Date(), read: false, type }, ...prev]);
//   }, []);

//   const markAsRead = useCallback((id) => {
//     setNotifications(prev => prev.map(notif => notif.id === id ? { ...notif, read: true } : notif));
//   }, []);

//   const markAllAsRead = useCallback(() => {
//     setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
//   }, []);

//   const deleteNotification = useCallback((id) => {
//     setNotifications(prev => prev.filter(notif => notif.id !== id));
//   }, []);

//   const deleteAllNotifications = useCallback(() => setNotifications([]), []);

//   const getUnreadCount = useCallback(() => notifications.filter(n => !n.read).length, [notifications]);

//   const addHealthRecord = (type, record) => {
//     setHealthRecords(prev => ({ ...prev, [type]: [...prev[type], { ...record, id: Date.now() }] }));
//     addNotification('Health Record Added', `New ${type} record added`, 'health');
//   };

//   // Cart Functions with localStorage persistence
//   const addToCart = useCallback((medicine) => {
//     setCart(prev => {
//       const existingItem = prev.find(item => item.id === medicine.id);
//       let newCart;
      
//       if (existingItem) {
//         newCart = prev.map(item => 
//           item.id === medicine.id 
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         newCart = [...prev, { ...medicine, quantity: 1 }];
//       }
      
//       return newCart;
//     });
    
//     addNotification('Medicine Added', `${medicine.name} added to cart`, 'order');
//   }, [addNotification]);

//   const removeFromCart = useCallback((id) => {
//     setCart(prev => {
//       const newCart = prev.filter(item => item.id !== id);
//       return newCart;
//     });
//   }, []);

//   const updateQuantity = useCallback((id, quantity) => {
//     setCart(prev => {
//       let newCart;
      
//       if (quantity === 0) {
//         newCart = prev.filter(item => item.id !== id);
//       } else {
//         newCart = prev.map(item => 
//           item.id === id ? { ...item, quantity } : item
//         );
//       }
      
//       return newCart;
//     });
//   }, []);

//   const clearCart = useCallback(() => {
//     setCart([]);
//   }, []);

//   const getTotalPrice = useCallback(() => 
//     cart.reduce((total, item) => total + (item.price * item.quantity), 0), 
//     [cart]
//   );

//   const getTotalItems = useCallback(() => 
//     cart.reduce((total, item) => total + item.quantity, 0), 
//     [cart]
//   );

//   // Initialize Razorpay
//   useEffect(() => {
//     const initializeRazorpay = async () => {
//       const isLoaded = await loadRazorpayScript();
//       setRazorpayLoaded(isLoaded);
//       if (!isLoaded) {
//         console.error('Failed to load Razorpay script');
//       }
//     };
//     initializeRazorpay();
//   }, []);

//   // ========== PHONE CONFIRMATION FUNCTIONS ==========
  
//   const showPhoneConfirmation = (plan, type = 'subscription') => {
//     setPaymentPlan(plan);
//     setPaymentType(type);
//     setTempPhone(profile?.phone || '');
//     setShowPhoneConfirm(true);
//   };

//   const handlePhoneConfirm = () => {
//     if (tempPhone.length !== 10) {
//       alert('Please enter a valid 10-digit mobile number');
//       return;
//     }
    
//     // Update profile if phone changed
//     if (tempPhone !== profile?.phone) {
//       updateProfile({ ...profile, phone: tempPhone });
//     }
    
//     // Only close the modal
//     setShowPhoneConfirm(false);
    
//     // Based on payment type, initiate the actual payment
//     if (paymentType === 'subscription' && paymentPlan) {
//       proceedWithSubscriptionPayment(paymentPlan, tempPhone);
//     } else if (paymentType === 'checkout' && checkoutData) {
//       proceedWithCheckoutPayment(checkoutData, tempPhone);
//     } else {
//       // For backward compatibility with old flow
//       initiatePayment();
//     }
    
//     // Reset state (except phone which we want to keep for Razorpay)
//     setPaymentPlan(null);
//     setCheckoutData(null);
//     setPaymentType('');
//   };

//   // ========== UPDATED PAYMENT FUNCTIONS ==========

//   // Subscription Payment with Phone Confirmation - DIRECT PAYMENT (NO POPUP)
//   const initiateSubscriptionPayment = async (plan) => {
//     if (!razorpayLoaded) {
//       addNotification('Payment Error', 'Payment service is not available. Please try again.', 'error');
//       return false;
//     }

//     // Show phone confirmation modal instead of subscription info popup
//     showPhoneConfirmation(plan, 'subscription');
//     return true;
//   };

//   const proceedWithSubscriptionPayment = async (plan, phoneNumber) => {
//     setPaymentLoading(true);

//     try {
//       const options = {
//         key: 'rzp_test_1DP5mmOlF5G5ag',
//         amount: plan.price * 100,
//         currency: 'INR',
//         name: 'QuickMed Healthcare',
//         description: `${plan.title} Subscription`,
//         handler: (response) => handleSubscriptionPaymentSuccess(response, plan),
//         prefill: {
//           name: profile?.fullName || 'Customer',
//           email: profile?.email || 'customer@example.com',
//           contact: phoneNumber  // Use confirmed phone number
//         },
//         theme: { color: COLORS.primary },
//         modal: {
//           ondismiss: () => {
//             setPaymentLoading(false);
//             addNotification('Payment Cancelled', 'Your subscription payment was cancelled.', 'alert');
//           }
//         }
//       };

//       const razorpayInstance = new window.Razorpay(options);
//       razorpayInstance.open();
//       return true;
//     } catch (error) {
//       console.error('Error initiating payment:', error);
//       setPaymentLoading(false);
//       addNotification('Payment Error', 'Failed to initiate payment. Please try again.', 'error');
//       return false;
//     }
//   };

//   // Handle subscription payment success
//   const handleSubscriptionPaymentSuccess = async (paymentResponse, plan) => {
//     try {
//       // Verify payment with your backend (simulated here)
//       await verifySubscriptionPayment(paymentResponse);
      
//       // Create new subscription
//       const startDate = new Date();
//       const endDate = new Date(startDate);
      
//       // For pregnancy plans, set end date to 9 months from now
//       if (plan.id.includes('pregnancy')) {
//         endDate.setMonth(endDate.getMonth() + 9);
//       } else if (plan.duration === 'month') {
//         endDate.setMonth(endDate.getMonth() + 1);
//       } else if (plan.duration === 'year') {
//         endDate.setFullYear(endDate.getFullYear() + 1);
//       }
      
//       const newSubscription = {
//         id: `sub-${Date.now()}`,
//         planId: plan.id,
//         title: plan.title,
//         planType: plan.id.includes('pregnancy') ? 'pregnancyCare' : 'babyCare',
//         status: 'active',
//         startDate: startDate.toISOString().split('T')[0],
//         endDate: endDate.toISOString().split('T')[0],
//         price: plan.price,
//         duration: plan.duration,
//         paymentId: paymentResponse.razorpay_payment_id,
//         orderId: paymentResponse.razorpay_order_id,
//         features: plan.features
//       };
      
//       // Update user subscriptions
//       setUserSubscriptions(prev => {
//         const filtered = prev.filter(sub => 
//           !(sub.planType === newSubscription.planType && sub.status === 'active')
//         );
//         return [newSubscription, ...filtered];
//       });
      
//       setPaymentLoading(false);
      
//       // Clear selected subscription
//       setSelectedSubscription(null);
      
//       addNotification(
//         'Subscription Activated',
//         `Your ${plan.title} has been activated successfully!`,
//         'success'
//       );
      
//       return true;
//     } catch (error) {
//       console.error('Payment verification failed:', error);
//       setPaymentLoading(false);
//       addNotification('Payment Failed', 'Payment verification failed. Please contact support.', 'error');
//       return false;
//     }
//   };

//   // Verify subscription payment (simulate backend call)
//   const verifySubscriptionPayment = () => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve({ success: true });
//       }, 2000);
//     });
//   };

//   // Handle subscription from PregnancyCareView - DIRECT TO PAYMENT
//   const handleSubscribe = async (plan) => {
//     setSelectedSubscription(plan);
    
//     // Initiate payment directly without showing subscription info popup
//     const paymentInitiated = await initiateSubscriptionPayment(plan);
    
//     if (!paymentInitiated) {
//       addNotification('Payment Error', 'Failed to initiate payment for subscription.', 'error');
//     }
//   };

//   // Handle upgrade subscription
//   const handleUpgradeSubscription = async (upgradeData) => {
//     const { subscription, annualPlan } = upgradeData;
    
//     if (!subscription || !annualPlan) {
//       addNotification('Upgrade Error', 'Unable to process upgrade. Please try again.', 'error');
//       return;
//     }
    
//     setSelectedUpgradePlan(upgradeData);
//     setShowUpgradeModal(true);
    
//     // Calculate upgrade price (annual - remaining value of current subscription)
//     const upgradePrice = annualPlan.price - calculateRemainingValue(subscription);
    
//     const paymentInitiated = await initiateSubscriptionPayment({
//       ...annualPlan,
//       price: Math.max(upgradePrice, 0)
//     });
    
//     if (!paymentInitiated) {
//       addNotification('Upgrade Error', 'Failed to process upgrade payment.', 'error');
//     }
//   };

//   // Calculate remaining value of current subscription
//   const calculateRemainingValue = (subscription) => {
//     if (!subscription.endDate) return 0;
    
//     const endDate = new Date(subscription.endDate);
//     const now = new Date();
//     const totalDays = (endDate - new Date(subscription.startDate)) / (1000 * 60 * 60 * 24);
//     const remainingDays = Math.max(0, (endDate - now) / (1000 * 60 * 60 * 24));
    
//     return Math.round((remainingDays / totalDays) * subscription.price);
//   };

//   // Check if user is subscribed to a plan
//   const isSubscribed = (planType) => {
//     return userSubscriptions.some(sub => 
//       sub.planType === planType && sub.status === 'active'
//     );
//   };

//   // Appointment Functions
//   const handleBookAppointment = (appointmentData) => {
//     const newAppointment = {
//       id: `APT-${Date.now()}`,
//       doctorName: appointmentData.doctorName,
//       specialty: appointmentData.doctorSpecialty,
//       date: appointmentData.date,
//       time: appointmentData.time,
//       status: appointmentData.status || 'scheduled',
//       consultationType: appointmentData.type === 'home' ? 'Home Consultation' : 'Video Consultation',
//       payment: appointmentData.payment || null,
//       priority: appointmentData.priority || 'L2',
//       fee: appointmentData.fee || 0
//     };
    
//     const updatedAppointments = [newAppointment, ...appointments];
//     setAppointments(updatedAppointments);
    
//     const notificationMessage = appointmentData.payment 
//       ? `Appointment with ${appointmentData.doctorName} confirmed! Payment: ₹${appointmentData.fee}`
//       : `Appointment with ${appointmentData.doctorName} scheduled for ${appointmentData.date} at ${appointmentData.time}`;
    
//     addNotification(
//       'Appointment Booked',
//       notificationMessage,
//       'appointment'
//     );
//   };

//   const startDoctorChat = (doctor) => console.log('Starting chat with:', doctor.name);
//   const viewAppointmentDetails = (appointment) => console.log('Viewing appointment details:', appointment);

//   const filteredDoctors = DOCTORS.filter(doctor => {
//     const matchesSearch = doctor.name.toLowerCase().includes(doctorSearchQuery.toLowerCase()) ||
//                          doctor.specialty.toLowerCase().includes(doctorSearchQuery.toLowerCase());
//     const matchesSpecialty = !selectedSpecialty || doctor.specialty === selectedSpecialty;
//     const matchesTimeSlot = !selectedTimeSlot || doctor.availableSlots.includes(selectedTimeSlot);
//     return matchesSearch && matchesSpecialty && matchesTimeSlot;
//   });

//   // AI Chatbot
//   const generateBotResponse = (message) => {
//     const msg = message.toLowerCase();
//     if (msg.includes('hello') || msg.includes('hi')) return CHATBOT_RESPONSES.hello;
//     if (msg.includes('medicine') || msg.includes('drug') || msg.includes('pill')) return CHATBOT_RESPONSES.medicine;
//     if (msg.includes('doctor') || msg.includes('consult') || msg.includes('appointment')) return CHATBOT_RESPONSES.doctor;
//     if (msg.includes('delivery') || msg.includes('shipping') || msg.includes('time')) return CHATBOT_RESPONSES.delivery;
//     if (msg.includes('payment') || msg.includes('pay') || msg.includes('money')) return CHATBOT_RESPONSES.payment;
//     if (msg.includes('prescription') || msg.includes('upload')) return CHATBOT_RESPONSES.prescription;
//     if (msg.includes('emergency') || msg.includes('urgent') || msg.includes('help')) return CHATBOT_RESPONSES.emergency;
//     return CHATBOT_RESPONSES.default;
//   };

//   const sendMessage = () => {
//     if (!userMessage.trim()) return;
//     const newMsg = { id: Date.now(), text: userMessage, sender: 'user', timestamp: new Date() };
//     setChatMessages(prev => [...prev, newMsg]);
//     setUserMessage('');
//     setTimeout(() => {
//       const response = { id: Date.now() + 1, text: generateBotResponse(userMessage), sender: 'bot', timestamp: new Date() };
//       setChatMessages(prev => [...prev, response]);
//       chatInputRef.current?.focus();
//     }, 1000);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   // Doctor Chat
//   const sendDoctorMessage = (doctorId, message) => {
//     if (!message.trim()) return;
//     const newMsg = { id: Date.now(), text: message, sender: 'user', timestamp: new Date() };
//     setDoctorChats(prev => ({ ...prev, [doctorId]: [...(prev[doctorId] || []), newMsg] }));
//     setTimeout(() => {
//       const response = { id: Date.now() + 1, text: "Thank you for your message. I'll review your concerns and get back to you shortly.", sender: 'doctor', timestamp: new Date() };
//       setDoctorChats(prev => ({ ...prev, [doctorId]: [...(prev[doctorId] || []), response] }));
//     }, 2000);
//   };

//   // Pharmacy Functions
//   const handlePharmacySearch = (pharmacyId, query) => {
//     setPharmacySearchQueries(prev => ({ ...prev, [pharmacyId]: query }));
//   };

//   const getFilteredPharmacyMedicines = (pharmacy) => {
//     const query = pharmacySearchQueries[pharmacy.id] || '';
//     return !query.trim() ? pharmacy.medicines : pharmacy.medicines.filter(m => m.name.toLowerCase().includes(query.toLowerCase()));
//   };

//   const viewPharmacyStore = (pharmacy) => {
//     setSelectedPharmacy(pharmacy);
//     setShowPharmacyStore(true);
//   };

//   const addToCartFromPharmacy = addToCart;

//   // Prescription Functions
//   const handlePrescriptionUpload = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;
//     const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
//     if (!validTypes.includes(file.type) || file.size > 5 * 1024 * 1024) {
//       alert(file.size > 5 * 1024 * 1024 ? 'File size should be less than 5MB' : 'Please upload a valid prescription file (JPG, PNG, or PDF)');
//       return;
//     }
//     setPrescriptionFile(file);
//     if (file.type.startsWith('image/')) {
//       const reader = new FileReader();
//       reader.onload = (e) => setPrescriptionPreview(e.target.result);
//       reader.readAsDataURL(file);
//     }
//     setShowPrescriptionModal(true);
//     addNotification('Prescription Uploaded', 'Your prescription has been uploaded successfully', 'prescription');
//   };

//   const handlePrescriptionSubmit = () => {
//     if (!prescriptionFile) {
//       alert('Please select a prescription file first');
//       return;
//     }
//     alert(`Prescription "${prescriptionFile.name}" uploaded successfully! Our team will verify it shortly.`);
//     setShowPrescriptionModal(false);
//     setPrescriptionFile(null);
//     setPrescriptionPreview(null);
//   };

//   // Profile Photo Functions
//   const handleProfilePhotoUpload = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;
//     if (!file.type.startsWith('image/') || file.size > 5 * 1024 * 1024) {
//       alert(file.size > 5 * 1024 * 1024 ? 'File size should be less than 5MB' : 'Please select an image file (JPG, PNG, etc.)');
//       return;
//     }
//     setProfilePhotoFile(file);
//     const reader = new FileReader();
//     reader.onload = (e) => setProfilePhotoPreview(e.target.result);
//     reader.readAsDataURL(file);
//     setShowProfilePhotoModal(true);
//   };

//   const handleProfilePhotoSubmit = async () => {
//     if (!profilePhotoFile) {
//       alert('Please select a profile photo first');
//       return;
//     }
//     try {
//       await updateProfilePhotoAPI({ profilePhoto: profilePhotoFile });
//       const updatedProfile = { ...profile, profilePhoto: profilePhotoPreview };
//       updateProfile(updatedProfile);
//       setProfilePhotoFile(null);
//       if (profilePhotoInputRef.current) {
//         profilePhotoInputRef.current.value = '';
//       }
//       alert('Profile photo updated successfully!');
//       addNotification('Profile Photo Updated', 'Your profile photo has been updated successfully', 'info');
//       setShowProfilePhotoModal(false);
//     } catch {
//       alert('Error updating profile photo. Please try again.');
//     }
//   };

//   const updateProfilePhotoAPI = () => new Promise(resolve => setTimeout(() => resolve({ success: true }), 1000));

//   const removeProfilePhoto = () => {
//     const updatedProfile = { ...profile, profilePhoto: null };
//     updateProfile(updatedProfile);
//     setProfilePhotoPreview(null);
//     setProfilePhotoFile(null);
//     if (profilePhotoInputRef.current) {
//       profilePhotoInputRef.current.value = '';
//     }
//     alert('Profile photo removed successfully!');
//     addNotification('Profile Photo Removed', 'Your profile photo has been removed', 'info');
//   };

//   const triggerProfilePhotoUpload = () => profilePhotoInputRef.current?.click();

//   // Order Functions - FIXED: Add null check for trackingOrder
//   const startLiveTracking = (order) => {
//     if (!order) {
//       console.error('No order provided for tracking');
//       addNotification('Tracking Error', 'No order selected for tracking', 'error');
//       return;
//     }
    
//     // Ensure the order has the required structure
//     const trackingOrderWithItems = {
//       ...order,
//       items: order.items || [], // Default to empty array if items is undefined
//       deliveryPartner: order.deliveryPartner || deliveryPartner,
//       status: order.status || 'In Transit',
//       total: order.total || 0
//     };
    
//     setTrackingOrder(trackingOrderWithItems);
//     safeSetActiveView('live-tracking');
//     addNotification('Live Tracking Started', `You can now track your order ${order.id} in real-time`, 'tracking');
//   };

//   const callDeliveryPartner = () => {
//     if (trackingOrder?.deliveryPartner) {
//       alert(`Calling delivery partner: ${trackingOrder.deliveryPartner.name}\nPhone: ${trackingOrder.deliveryPartner.phone}`);
//     } else {
//       alert(`Calling delivery partner: ${deliveryPartner.name}\nPhone: ${deliveryPartner.phone}`);
//     }
//   };

//   const getDeliveryStatusText = (status) => {
//     const statusMap = {
//       'ordered': 'Order Placed',
//       'confirmed': 'Order Confirmed',
//       'preparing': 'Preparing Your Order',
//       'picked_up': 'Picked Up',
//       'on_the_way': 'On the Way',
//       'delivered': 'Delivered'
//     };
//     return statusMap[status] || status;
//   };

//   const getDeliveryProgress = (status) => {
//     const progressMap = {
//       'ordered': 20,
//       'confirmed': 40,
//       'preparing': 60,
//       'picked_up': 80,
//       'on_the_way': 90,
//       'delivered': 100
//     };
//     return progressMap[status] || 0;
//   };

//   // ===== UPDATED PAYMENT FUNCTIONS WITH PHONE CONFIRMATION =====
  
//   // Original payment function for backward compatibility
//   const initiatePayment = async () => {
//     if (cart.length === 0) {
//       alert('Your cart is empty!');
//       return;
//     }
//     if (!window.Razorpay) {
//       alert('Payment system is loading, please try again in a moment.');
//       return;
//     }
    
//     // Show phone confirmation first
//     setCheckoutData({
//       cartItems: cart,
//       totalAmount: getTotalPrice(),
//       subtotal: getTotalPrice(),
//       tip: 0,
//       selectedItems: cart.map(item => item.id)
//     });
//     setPaymentType('checkout');
//     setTempPhone(profile?.phone || '');
//     setShowPhoneConfirm(true);
//   };

//   // Updated handleCheckoutConfirmation to include phone confirmation
//   const handleCheckoutConfirmation = async (checkoutData) => {
//     console.log('Checkout data received:', checkoutData);
    
//     if (!checkoutData || !checkoutData.cartItems || checkoutData.cartItems.length === 0) {
//       alert('Invalid checkout data. Please try again.');
//       return;
//     }
    
//     if (!window.Razorpay) {
//       alert('Payment system is loading, please try again in a moment.');
//       return;
//     }
    
//     // Store checkout data and show phone confirmation
//     setCheckoutData(checkoutData);
//     showPhoneConfirmation(checkoutData, 'checkout');
//   };

//   // Proceed with checkout payment after phone confirmation
//   const proceedWithCheckoutPayment = async (checkoutData, phoneNumber) => {
//     setPaymentLoading(true);
    
//     try {
//       // Use the totalAmount from checkoutData (which includes tip)
//       const razorpayAmount = checkoutData.totalAmount * 100; // Convert to paise
      
//       const options = {
//         key: 'rzp_test_1DP5mmOlF5G5ag',
//         amount: razorpayAmount,
//         currency: 'INR',
//         name: 'QuickMed Pharmacy',
//         description: `Order with ${checkoutData.selectedItems?.length || checkoutData.cartItems?.length || 0} item(s)`,
//         handler: (response) => handlePaymentSuccess(response, checkoutData),
//         prefill: {
//           name: checkoutData.address?.fullName || profile?.fullName || 'Customer',
//           contact: phoneNumber, // Use confirmed phone number
//           email: profile?.email || 'customer@example.com'
//         },
//         theme: { color: COLORS.primary },
//         modal: {
//           ondismiss: () => {
//             setPaymentLoading(false);
//             console.log('Payment was cancelled');
//           }
//         }
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
      
//     } catch (error) {
//       console.error('Error initiating payment:', error);
//       setPaymentLoading(false);
//     }
//   };

//   // Updated handlePaymentSuccess to handle tip data
//   const handlePaymentSuccess = async (paymentResponse, checkoutData = null) => {
//     try {
//       // Verify payment with your backend (simulated here)
//       await verifyPayment(paymentResponse);
      
//       const orderId = `ORD${Date.now()}`;
      
//       // If checkoutData is provided (from CartView with tip), use it
//       if (checkoutData) {
//         const newOrder = {
//           id: orderId,
//           date: new Date().toISOString().split('T')[0],
//           items: checkoutData.cartItems || [],
//           total: checkoutData.totalAmount || getTotalPrice(),
//           subtotal: checkoutData.subtotal || (checkoutData.totalAmount - (checkoutData.tip || 0)),
//           tip: checkoutData.tip || 0,
//           status: 'Confirmed',
//           paymentId: paymentResponse.razorpay_payment_id,
//           orderId: paymentResponse.razorpay_order_id,
//           signature: paymentResponse.razorpay_signature,
//           trackingAvailable: true,
//           deliveryPartner: { 
//             name: 'Rahul Kumar', 
//             phone: '+91 9876543210', 
//             estimatedTime: '30 min' 
//           },
//           address: checkoutData.address || null,
//           selectedItems: checkoutData.selectedItems || []
//         };
        
//         setOrders(prev => [newOrder, ...prev]);
        
//         // Remove selected items from cart
//         if (checkoutData.selectedItems && checkoutData.selectedItems.length > 0) {
//           setCart(prev => prev.filter(item => !checkoutData.selectedItems.includes(item.id)));
//         } else {
//           clearCart();
//         }
        
//         addNotification(
//           'Order Confirmed', 
//           `Your order ${orderId} has been placed successfully${checkoutData.tip > 0 ? ` with a ₹${checkoutData.tip} tip` : ''}`, 
//           'order'
//         );
        
//       } else {
//         // Original logic for regular checkout
//         const newOrder = {
//           id: orderId,
//           date: new Date().toISOString().split('T')[0],
//           items: [...cart],
//           total: getTotalPrice(),
//           subtotal: getTotalPrice(),
//           tip: 0,
//           status: 'Confirmed',
//           paymentId: paymentResponse.razorpay_payment_id,
//           orderId: paymentResponse.razorpay_order_id,
//           signature: paymentResponse.razorpay_signature,
//           trackingAvailable: true,
//           deliveryPartner: { 
//             name: 'Rahul Kumar', 
//             phone: '+91 9876543210', 
//             estimatedTime: '30 min' 
//           }
//         };
        
//         setOrders(prev => [newOrder, ...prev]);
//         clearCart();
        
//         addNotification(
//           'Order Confirmed', 
//           `Your order ${orderId} has been placed successfully`, 
//           'order'
//         );
//       }
      
//       safeSetActiveView('orders');
//       console.log('Payment successful! Order ID:', orderId);
      
//     } catch (error) {
//       console.error('Payment verification failed:', error);
//     } finally {
//       setPaymentLoading(false);
//     }
//   };

//   const verifyPayment = () => new Promise(resolve => setTimeout(() => resolve({ success: true }), 1000));

//   // Old confirmation modal handlers (keep for backward compatibility)
//   const handleConfirmCheckout = () => {
//     setShowCheckoutConfirm(false);
//     initiatePayment();
//   };

//   const handleCancelCheckout = () => setShowCheckoutConfirm(false);
//   const confirmLogout = () => {
//     setShowLogoutConfirm(false);
//     onLogout();
//   };
//   const cancelLogout = () => setShowLogoutConfirm(false);

//   // Filter Functions
//   const filteredMedicines = MEDICINES.filter(medicine =>
//     medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     medicine.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     medicine.category.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const filteredOrders = orders.filter(order => {
//     if (orderFilter === 'all') return true;
//     if (orderFilter === 'delivered') return order.status === 'Delivered';
//     if (orderFilter === 'in-transit') return order.status === 'In Transit' || order.status === 'On the Way';
//     if (orderFilter === 'pending') return order.status === 'Pending';
//     return true;
//   });

//   // Effects - FIXED: Ensure trackingOrder has items property
//   useEffect(() => {
//     const ordersData = [
//       {
//         id: 'ORD001',
//         date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
//         items: [{ name: 'Paracetamol 500mg', quantity: 2, price: 30 }, { name: 'Vitamin C 1000mg', quantity: 1, price: 40 }],
//         total: 100,
//         subtotal: 100,
//         tip: 0,
//         status: 'Delivered',
//         trackingAvailable: false
//       },
//       {
//         id: 'ORD002',
//         date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
//         items: [{ name: 'Aspirin 75mg', quantity: 1, price: 25 }],
//         total: 25,
//         subtotal: 25,
//         tip: 0,
//         status: 'In Transit',
//         trackingAvailable: true,
//         deliveryPartner: { name: 'Rahul Kumar', phone: '+91 9876543210', estimatedTime: '25 min' }
//       }
//     ];
    
//     setOrders(ordersData);
    
//     // Set trackingOrder with proper items array
//     const trackingOrderData = ordersData.find(o => o.trackingAvailable && (o.status === 'In Transit' || o.status === 'On the Way'));
//     if (trackingOrderData) {
//       setTrackingOrder({
//         ...trackingOrderData,
//         items: trackingOrderData.items || [] // Ensure items exists
//       });
//     }

//     // Initialize mock subscriptions for demo
//     setUserSubscriptions([
//       {
//         id: 'sub1',
//         planId: 'pregnancy-basic',
//         title: 'Basic Pregnancy Care',
//         planType: 'pregnancyCare',
//         status: 'inactive',
//         startDate: '2024-01-01',
//         endDate: '2024-10-01',
//         price: 25000,
//         duration: '9 months',
//         features: SUBSCRIPTION_PLANS.pregnancyCare[0].features
//       }
//     ]);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       // Close profile dropdown
//       if (profileRef.current && !profileRef.current.contains(event.target)) {
//         setShowProfileDropdown(false);
//       }
//     };
    
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   useEffect(() => {
//     if (showChatbot) setTimeout(() => chatInputRef.current?.focus(), 100);
//   }, [showChatbot]);

//   useEffect(() => {
//     chatMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [chatMessages]);

//   useEffect(() => {
//     if (profile?.profilePhoto) setProfilePhotoPreview(profile.profilePhoto);
//   }, [profile?.profilePhoto]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (Math.random() < 0.2) {
//         const types = [
//           { type: 'order', titles: ['Order Shipped', 'Delivery Update'], messages: ['Your order is out for delivery', 'Delivery partner has picked up your order'] },
//           { type: 'appointment', titles: ['Appointment Reminder', 'Doctor Available'], messages: ['Your appointment starts in 30 minutes', 'Your preferred doctor is now available'] },
//           { type: 'promotion', titles: ['Special Offer', 'Discount Available'], messages: ['Get 20% off on all medicines this week', 'Special discount on health checkups'] }
//         ];
//         const randomType = types[Math.floor(Math.random() * types.length)];
//         const newNotif = {
//           id: Date.now(),
//           title: randomType.titles[0],
//           message: randomType.messages[0],
//           timestamp: new Date(),
//           read: false,
//           type: randomType.type
//         };
//         setNotifications(prev => [newNotif, ...prev]);
//       }
//     }, 15000);
//     return () => clearInterval(interval);
//   }, []);

//   // ========== MODAL COMPONENTS ==========
  
//   // Phone Confirmation Modal Component - FIXED: Only continue when button is clicked
//   const PhoneConfirmationModal = () => {
//     if (!showPhoneConfirm) return null;

//     const handlePhoneConfirmClick = () => {
//       if (tempPhone.length !== 10) {
//         alert('Please enter a valid 10-digit mobile number');
//         return;
//       }
      
//       // Update profile if phone changed
//       if (tempPhone !== profile?.phone) {
//         updateProfile({ ...profile, phone: tempPhone });
//       }
      
//       // Close the modal first
//       setShowPhoneConfirm(false);
      
//       // Based on payment type, initiate the actual payment
//       if (paymentType === 'subscription' && paymentPlan) {
//         proceedWithSubscriptionPayment(paymentPlan, tempPhone);
//       } else if (paymentType === 'checkout' && checkoutData) {
//         proceedWithCheckoutPayment(checkoutData, tempPhone);
//       } else {
//         // For backward compatibility with old flow
//         initiatePayment();
//       }
      
//       // Reset state
//       setPaymentPlan(null);
//       setCheckoutData(null);
//       setPaymentType('');
//     };

//     return (
//       <div style={{
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         backgroundColor: 'rgba(0,0,0,0.5)',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         zIndex: 10000,
//         padding: 'max(20px, 2vw)'
//       }}>
//         <div style={{
//           backgroundColor: COLORS.white,
//           borderRadius: '15px',
//           padding: 'max(30px, 3vw) max(25px, 2.5vw)',
//           maxWidth: 'min(500px, 90vw)',
//           width: '100%',
//           boxSizing: 'border-box'
//         }}>
//           <h3 style={{ 
//             fontSize: 'clamp(1.2rem, 3vw, 1.4rem)', 
//             fontWeight: 'bold', 
//             color: COLORS.primary, 
//             marginBottom: 'max(15px, 1.5vw)',
//             textAlign: 'center'
//           }}>
//             Edit contact details
//           </h3>
          
//           <p style={{ 
//             fontSize: 'clamp(0.9rem, 2vw, 1rem)', 
//             color: COLORS.softtext, 
//             marginBottom: 'max(25px, 2.5vw)',
//             lineHeight: '1.5',
//             textAlign: 'center'
//           }}>
//             Enter mobile number to continue
//           </p>
          
//           <div style={{ marginBottom: 'max(25px, 2.5vw)' }}>
//             <div style={{
//               display: 'flex',
//               alignItems: 'center',
//               border: `1px solid ${tempPhone.length === 10 ? '#4CAF50' : COLORS.mint}`,
//               borderRadius: '8px',
//               padding: 'max(12px, 1.2vw) max(15px, 1.5vw)',
//               backgroundColor: '#f9f9f9',
//               marginBottom: 'max(10px, 1vw)'
//             }}>
//               <div style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 marginRight: '10px',
//                 paddingRight: '10px',
//                 borderRight: `1px solid ${COLORS.mint}`
//               }}>
//                 <span style={{ 
//                   fontSize: 'clamp(1rem, 2vw, 1.1rem)', 
//                   color: COLORS.darktext,
//                   marginRight: '8px'
//                 }}>+91</span>
//                 <span style={{ 
//                   fontSize: 'clamp(0.9rem, 1.5vw, 1rem)', 
//                   color: COLORS.softtext 
//                 }}>▼</span>
//               </div>
//               <input
//                 type="tel"
//                 value={tempPhone}
//                 onChange={(e) => setTempPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
//                 placeholder="6300604470"
//                 style={{
//                   flex: 1,
//                   border: 'none',
//                   outline: 'none',
//                   backgroundColor: 'transparent',
//                   fontSize: 'clamp(1rem, 2vw, 1.1rem)',
//                   color: COLORS.darktext,
//                   minWidth: '0'
//                 }}
//                 maxLength={10}
//                 autoFocus
//                 // REMOVED: Don't automatically submit on Enter key or when reaching 10 digits
//                 // Only allow manual submission via the Continue button
//                 onKeyDown={(e) => {
//                   if (e.key === 'Enter' && tempPhone.length === 10) {
//                     // Prevent automatic submission when pressing Enter
//                     e.preventDefault();
//                   }
//                 }}
//               />
//             </div>
            
//             <div style={{ 
//               fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)', 
//               color: COLORS.softtext,
//               marginTop: 'max(5px, 0.5vw)',
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center'
//             }}>
//               <span>{tempPhone.length}/10 digits</span>
//               {tempPhone.length === 10 && (
//                 <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>✓ Valid number</span>
//               )}
//             </div>
//           </div>
          
//           <div style={{ 
//             display: 'flex', 
//             gap: 'max(15px, 1.5vw)', 
//             justifyContent: 'center'
//           }}>
//             <button
//               onClick={() => {
//                 setShowPhoneConfirm(false);
//                 setPaymentPlan(null);
//                 setCheckoutData(null);
//                 setTempPhone('');
//                 setPaymentType('');
//                 setPaymentLoading(false);
//               }}
//               style={{
//                 backgroundColor: 'transparent',
//                 color: COLORS.softtext,
//                 border: `1px solid ${COLORS.mint}`,
//                 padding: 'max(12px, 1.2vw) max(24px, 2.4vw)',
//                 borderRadius: '25px',
//                 fontSize: 'clamp(0.9rem, 2vw, 1rem)',
//                 cursor: 'pointer',
//                 flex: 1,
//                 transition: 'all 0.3s ease',
//                 minWidth: '120px'
//               }}
//               onMouseEnter={(e) => {
//                 e.target.style.backgroundColor = COLORS.softbg;
//                 e.target.style.borderColor = COLORS.primary;
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style.backgroundColor = 'transparent';
//                 e.target.style.borderColor = COLORS.mint;
//               }}
//             >
//               Cancel
//             </button>
            
//             <button
//               onClick={handlePhoneConfirmClick}
//               disabled={tempPhone.length !== 10}
//               style={{
//                 backgroundColor: tempPhone.length === 10 ? COLORS.primary : '#ccc',
//                 color: COLORS.white,
//                 border: 'none',
//                 padding: 'max(12px, 1.2vw) max(24px, 2.4vw)',
//                 borderRadius: '25px',
//                 fontSize: 'clamp(0.9rem, 2vw, 1rem)',
//                 fontWeight: 'bold',
//                 cursor: tempPhone.length === 10 ? 'pointer' : 'not-allowed',
//                 flex: 1,
//                 transition: 'background-color 0.3s ease',
//                 minWidth: '120px'
//               }}
//               onMouseEnter={(e) => {
//                 if (tempPhone.length === 10) {
//                   e.target.style.backgroundColor = '#00897B';
//                 }
//               }}
//               onMouseLeave={(e) => {
//                 if (tempPhone.length === 10) {
//                   e.target.style.backgroundColor = COLORS.primary;
//                 }
//               }}
//             >
//               Continue
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // ========== COMPONENTS ==========
  
//   const SubscriptionSection = () => {
//     return (
//       <section style={{ 
//         backgroundColor: COLORS.white, 
//         borderRadius: '15px', 
//         padding: 'max(25px, 2.5vw) max(20px, 2vw)', 
//         marginBottom: 'max(30px, 3vw)',
//         boxSizing: 'border-box'
//       }}>
//         <h2 style={{ 
//           fontSize: 'clamp(1.4rem, 3.5vw, 2rem)', 
//           fontWeight: 'bold', 
//           color: COLORS.primary, 
//           marginBottom: 'max(10px, 1vw)', 
//           textAlign: 'center',
//           lineHeight: '1.3'
//         }}>
//           Premium Care Subscriptions
//         </h2>
//         <p style={{ 
//           fontSize: 'clamp(0.9rem, 2vw, 1rem)', 
//           color: COLORS.softtext, 
//           marginBottom: 'max(25px, 2.5vw)', 
//           textAlign: 'center',
//           lineHeight: '1.6'
//         }}>
//           Subscribe for comprehensive healthcare support and exclusive benefits
//         </p>
        
//         {/* Pregnancy Care Subscriptions */}
//         <div style={{ marginBottom: 'max(30px, 3vw)' }}>
//           <h3 style={{ 
//             fontSize: 'clamp(1.2rem, 3vw, 1.3rem)', 
//             fontWeight: 'bold', 
//             color: COLORS.primary, 
//             marginBottom: 'max(20px, 2vw)', 
//             textAlign: 'center',
//             lineHeight: '1.3'
//           }}>
//             Pregnancy Care Plans
//           </h3>
//           <div style={DASHBOARD_STYLES.subscriptionGrid}>
//             {SUBSCRIPTION_PLANS.pregnancyCare.map(plan => {
//               const isActive = userSubscriptions.some(sub => 
//                 sub.planId === plan.id && sub.status === 'active'
//               );
              
//               return (
//                 <div
//                   key={plan.id}
//                   style={{
//                     ...DASHBOARD_STYLES.subscriptionCard,
//                     border: plan.popular ? `2px solid ${COLORS.primary}` : `2px solid ${COLORS.mint}30`,
//                     position: 'relative'
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.transform = 'translateY(-10px)';
//                     e.currentTarget.style.boxShadow = `0 12px 30px ${COLORS.primary}25`;
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.transform = 'translateY(0)';
//                     e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
//                   }}
//                 >
//                   {plan.popular && (
//                     <div style={{
//                       position: 'absolute',
//                       top: '-12px',
//                       left: '50%',
//                       transform: 'translateX(-50%)',
//                       backgroundColor: COLORS.primary,
//                       color: COLORS.white,
//                       padding: 'max(6px, 0.6vw) max(20px, 2vw)',
//                       borderRadius: '20px',
//                       fontSize: 'clamp(0.7rem, 1.5vw, 0.8rem)',
//                       fontWeight: 'bold',
//                       zIndex: 1,
//                       whiteSpace: 'nowrap'
//                     }}>
//                       MOST POPULAR
//                     </div>
//                   )}
                  
//                   {plan.patientsEnrolled && (
//                     <div style={{
//                       position: 'absolute',
//                       top: '15px',
//                       right: '15px',
//                       backgroundColor: '#2196F3',
//                       color: COLORS.white,
//                       padding: 'max(4px, 0.4vw) max(10px, 1vw)',
//                       borderRadius: '12px',
//                       fontSize: 'clamp(0.7rem, 1.5vw, 0.75rem)',
//                       fontWeight: 'bold'
//                     }}>
//                       {plan.patientsEnrolled}
//                     </div>
//                   )}
                  
//                   <div style={DASHBOARD_STYLES.subscriptionHeader}>
//                     <h3 style={DASHBOARD_STYLES.subscriptionTitle}>{plan.title}</h3>
//                     <div style={DASHBOARD_STYLES.subscriptionPrice}>₹{plan.price.toLocaleString()}</div>
//                     <div style={DASHBOARD_STYLES.subscriptionDuration}>{plan.duration}</div>
//                   </div>
                  
//                   <div style={DASHBOARD_STYLES.featureList}>
//                     {plan.features.map((feature, index) => (
//                       <div key={index} style={DASHBOARD_STYLES.featureItem}>
//                         <span style={{ color: '#4CAF50', marginRight: '10px' }}>✓</span>
//                         <span style={{ color: COLORS.darktext }}>{feature}</span>
//                       </div>
//                     ))}
//                   </div>
                  
//                   {isActive ? (
//                     <div style={{
//                       backgroundColor: '#e8f5e9',
//                       color: '#2e7d32',
//                       padding: 'max(12px, 1.2vw)',
//                       borderRadius: '25px',
//                       fontSize: 'clamp(0.9rem, 2vw, 1rem)',
//                       fontWeight: 'bold',
//                       textAlign: 'center',
//                       marginTop: 'auto'
//                     }}>
//                       ✓ Active Subscription
//                     </div>
//                   ) : (
//                     <button
//                       onClick={() => handleSubscribe(plan)}
//                       style={{
//                         backgroundColor: COLORS.primary,
//                         color: COLORS.white,
//                         border: 'none',
//                         padding: 'max(12px, 1.2vw) max(24px, 2.4vw)',
//                         borderRadius: '25px',
//                         fontSize: 'clamp(0.9rem, 2vw, 1rem)',
//                         fontWeight: 'bold',
//                         cursor: 'pointer',
//                         width: '100%',
//                         marginTop: 'auto',
//                         transition: 'background-color 0.3s ease'
//                       }}
//                       onMouseEnter={(e) => e.target.style.backgroundColor = '#00897B'}
//                       onMouseLeave={(e) => e.target.style.backgroundColor = COLORS.primary}
//                     >
//                       Subscribe Now
//                     </button>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Baby Care Subscriptions */}
//         <div style={{ marginBottom: 'max(30px, 3vw)' }}>
//           <h3 style={{ 
//             fontSize: 'clamp(1.2rem, 3vw, 1.3rem)', 
//             fontWeight: 'bold', 
//             color: COLORS.primary, 
//             marginBottom: 'max(20px, 2vw)', 
//             textAlign: 'center',
//             lineHeight: '1.3'
//           }}>
//             Baby Care Plans
//           </h3>
//           <div style={DASHBOARD_STYLES.subscriptionGrid}>
//             {SUBSCRIPTION_PLANS.babyCare.map(plan => {
//               const isActive = userSubscriptions.some(sub => 
//                 sub.planId === plan.id && sub.status === 'active'
//               );
//               const activeSubscription = userSubscriptions.find(sub => 
//                 sub.planType === 'babyCare' && sub.status === 'active'
//               );
//               const canUpgrade = activeSubscription && activeSubscription.duration === 'month' && plan.duration === 'year';
              
//               return (
//                 <div
//                   key={plan.id}
//                   style={{
//                     ...DASHBOARD_STYLES.subscriptionCard,
//                     border: plan.popular ? `2px solid ${COLORS.primary}` : `2px solid ${COLORS.mint}30`,
//                     position: 'relative'
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.transform = 'translateY(-10px)';
//                     e.currentTarget.style.boxShadow = `0 12px 30px ${COLORS.primary}25`;
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.transform = 'translateY(0)';
//                     e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
//                   }}
//                 >
//                   {plan.popular && (
//                     <div style={{
//                       position: 'absolute',
//                       top: '-12px',
//                       left: '50%',
//                       transform: 'translateX(-50%)',
//                       backgroundColor: COLORS.primary,
//                       color: COLORS.white,
//                       padding: 'max(6px, 0.6vw) max(20px, 2vw)',
//                       borderRadius: '20px',
//                       fontSize: 'clamp(0.7rem, 1.5vw, 0.8rem)',
//                       fontWeight: 'bold',
//                       zIndex: 1,
//                       whiteSpace: 'nowrap'
//                     }}>
//                       MOST POPULAR
//                     </div>
//                   )}
                  
//                   {plan.savings && (
//                     <div style={{
//                       position: 'absolute',
//                       top: '15px',
//                       right: '15px',
//                       backgroundColor: '#4CAF50',
//                       color: COLORS.white,
//                       padding: 'max(4px, 0.4vw) max(10px, 1vw)',
//                       borderRadius: '12px',
//                       fontSize: 'clamp(0.7rem, 1.5vw, 0.75rem)',
//                       fontWeight: 'bold'
//                     }}>
//                       {plan.savings}
//                     </div>
//                   )}
                  
//                   <div style={DASHBOARD_STYLES.subscriptionHeader}>
//                     <h3 style={DASHBOARD_STYLES.subscriptionTitle}>{plan.title}</h3>
//                     <div style={DASHBOARD_STYLES.subscriptionPrice}>₹{plan.price}</div>
//                     <div style={DASHBOARD_STYLES.subscriptionDuration}>per {plan.duration}</div>
//                   </div>
                  
//                   <div style={DASHBOARD_STYLES.featureList}>
//                     {plan.features.slice(0, 6).map((feature, index) => (
//                       <div key={index} style={DASHBOARD_STYLES.featureItem}>
//                         <span style={{ color: '#4CAF50', marginRight: '10px' }}>✓</span>
//                         <span style={{ color: COLORS.darktext }}>{feature}</span>
//                       </div>
//                     ))}
//                     {plan.features.length > 6 && (
//                       <div style={{ ...DASHBOARD_STYLES.featureItem, color: COLORS.primary, fontWeight: 'bold' }}>
//                         <span style={{ marginRight: '10px' }}>+</span>
//                         <span>And {plan.features.length - 6} more features...</span>
//                       </div>
//                     )}
//                   </div>
                  
//                   {isActive ? (
//                     <div style={{
//                       backgroundColor: '#e8f5e9',
//                       color: '#2e7d32',
//                       padding: 'max(12px, 1.2vw)',
//                       borderRadius: '25px',
//                       fontSize: 'clamp(0.9rem, 2vw, 1rem)',
//                       fontWeight: 'bold',
//                       textAlign: 'center',
//                       marginTop: 'auto'
//                     }}>
//                       ✓ Active Subscription
//                     </div>
//                   ) : canUpgrade ? (
//                     <button
//                       onClick={() => handleUpgradeSubscription({
//                         planType: 'babyCare',
//                         subscription: activeSubscription,
//                         annualPlan: plan
//                       })}
//                       style={{
//                         backgroundColor: '#ff9800',
//                         color: COLORS.white,
//                         border: 'none',
//                         padding: 'max(12px, 1.2vw) max(24px, 2.4vw)',
//                         borderRadius: '25px',
//                         fontSize: 'clamp(0.9rem, 2vw, 1rem)',
//                         fontWeight: 'bold',
//                         cursor: 'pointer',
//                         width: '100%',
//                         marginTop: 'auto',
//                         transition: 'background-color 0.3s ease'
//                       }}
//                       onMouseEnter={(e) => e.target.style.backgroundColor = '#f57c00'}
//                       onMouseLeave={(e) => e.target.style.backgroundColor = '#ff9800'}
//                     >
//                       Upgrade Now
//                     </button>
//                   ) : (
//                     <button
//                       onClick={() => handleSubscribe(plan)}
//                       style={{
//                         backgroundColor: COLORS.primary,
//                         color: COLORS.white,
//                         border: 'none',
//                         padding: 'max(12px, 1.2vw) max(24px, 2.4vw)',
//                         borderRadius: '25px',
//                         fontSize: 'clamp(0.9rem, 2vw, 1rem)',
//                         fontWeight: 'bold',
//                         cursor: 'pointer',
//                         width: '100%',
//                         marginTop: 'auto',
//                         transition: 'background-color 0.3s ease'
//                       }}
//                       onMouseEnter={(e) => e.target.style.backgroundColor = '#00897B'}
//                       onMouseLeave={(e) => e.target.style.backgroundColor = COLORS.primary}
//                     >
//                       Subscribe Now
//                     </button>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Subscription Benefits */}
//         <div style={{ 
//           backgroundColor: COLORS.softbg, 
//           borderRadius: '12px', 
//           padding: 'max(20px, 2vw) max(15px, 1.5vw)', 
//           marginTop: 'max(30px, 3vw)',
//           textAlign: 'center'
//         }}>
//           <h4 style={{ 
//             fontSize: 'clamp(1rem, 2.5vw, 1.1rem)', 
//             fontWeight: 'bold', 
//             color: COLORS.primary, 
//             marginBottom: 'max(15px, 1.5vw)',
//             lineHeight: '1.3'
//           }}>
//             Why Subscribe?
//           </h4>
//           <div style={{ 
//             display: 'flex', 
//             justifyContent: 'center', 
//             gap: 'max(20px, 2vw)', 
//             flexWrap: 'wrap' 
//           }}>
//             {[
//               { icon: '📞', text: '24/7 Expert Support' },
//               { icon: '🎯', text: 'Personalized Care Plans' },
//               { icon: '💰', text: 'Cost Savings' },
//               { icon: '⚡', text: 'Priority Services' },
//               { icon: '📊', text: 'Progress Tracking' }
//             ].map((benefit, index) => (
//               <div key={index} style={{ 
//                 textAlign: 'center', 
//                 minWidth: 'min(120px, 100%)',
//                 flex: '1 1 min(120px, 100%)'
//               }}>
//                 <div style={{ 
//                   fontSize: 'clamp(1.5rem, 3vw, 2rem)', 
//                   marginBottom: 'max(8px, 0.8vw)' 
//                 }}>
//                   {benefit.icon}
//                 </div>
//                 <span style={{ 
//                   fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)', 
//                   color: COLORS.softtext,
//                   lineHeight: '1.4'
//                 }}>
//                   {benefit.text}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   };

//   const DashboardView = () => (
//     <>
//       {/* Welcome Section */}
//       <section style={DASHBOARD_STYLES.welcomeSection}>
//         <div style={{ 
//           display: 'flex', 
//           alignItems: 'center', 
//           justifyContent: 'center', 
//           flexWrap: 'wrap',
//           gap: 'max(15px, 1.5vw)',
//           marginTop: '50px',
//           marginBottom: 'max(15px, 1.5vw)'
//         }}>
//           {profile?.profilePhoto ? (
//             <img 
//               src={profile.profilePhoto} 
//               alt="Profile" 
//               style={{
//                 width: 'clamp(50px, 6vw, 60px)',
//                 height: 'clamp(50px, 6vw, 60px)',
//                 borderRadius: '50%',
//                 border: `3px solid ${COLORS.primary}`,
//                 objectFit: 'cover'
//               }}
//             />
//           ) : (
//             <div style={{
//               width: 'clamp(50px, 6vw, 60px)',
//               height: 'clamp(50px, 6vw, 60px)',
//               borderRadius: '50%',
//               backgroundColor: COLORS.primary,
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               color: COLORS.white,
//               fontSize: 'clamp(20px, 3vw, 24px)',
//               border: `3px solid ${COLORS.primary}`
//             }}>
//               {profile?.fullName?.charAt(0) || 'U'}
//             </div>
//           )}
//           <div>
//             <h2 style={{ 
//               ...DASHBOARD_STYLES.welcomeTitle, 
//               marginBottom: 'max(5px, 0.5vw)',
//               fontSize: 'clamp(1.5rem, 4vw, 2.2rem)'
//             }}>
//               Welcome back, {profile?.fullName || 'User'}! 
//             </h2>
//             <p style={{ 
//               fontSize: 'clamp(0.9rem, 2vw, 1rem)', 
//               color: COLORS.softtext,
//               marginBottom: 'max(5px, 0.5vw)',
//               lineHeight: '1.4'
//             }}>
//               <span style={{ color: COLORS.primary, fontWeight: '600' }}>Last login:</span> Today at {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
//             </p>
//           </div>
//         </div>
//         <p style={{ 
//           ...DASHBOARD_STYLES.welcomeSubtitle,
//           fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
//           lineHeight: '1.6',
//           maxWidth: 'min(800px, 90%)'
//         }}>
//           Your health is our priority. Access quality healthcare services instantly with QuickMed's comprehensive platform.
//         </p>
//         <div style={{
//           display: 'flex',
//           justifyContent: 'center',
//           gap: 'max(15px, 1.5vw)',
//           marginTop: 'max(20px, 2vw)',
//           flexWrap: 'wrap'
//         }}>
//           <div style={{
//             backgroundColor: `${COLORS.mint}20`,
//             padding: 'max(10px, 1vw) max(20px, 2vw)',
//             borderRadius: '25px',
//             display: 'flex',
//             alignItems: 'center',
//             gap: 'max(8px, 0.8vw)',
//             flex: '1 1 min(200px, 100%)'
//           }}>
//             <span style={{ color: COLORS.primary, fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}>📅</span>
//             <span style={{ 
//               fontWeight: '500', 
//               color: COLORS.darktext,
//               fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)'
//             }}>
//               {appointments.length} Active Appointments
//             </span>
//           </div>
//           <div style={{
//             backgroundColor: `${COLORS.mint}20`,
//             padding: 'max(10px, 1vw) max(20px, 2vw)',
//             borderRadius: '25px',
//             display: 'flex',
//             alignItems: 'center',
//             gap: 'max(8px, 0.8vw)',
//             flex: '1 1 min(200px, 100%)'
//           }}>
//             <span style={{ color: COLORS.primary, fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}>📦</span>
//             <span style={{ 
//               fontWeight: '500', 
//               color: COLORS.darktext,
//               fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)'
//             }}>
//               {orders.filter(o => o.status !== 'Delivered').length} Pending Orders
//             </span>
//           </div>
//           <div style={{
//             backgroundColor: `${COLORS.mint}20`,
//             padding: 'max(10px, 1vw) max(20px, 2vw)',
//             borderRadius: '25px',
//             display: 'flex',
//             alignItems: 'center',
//             gap: 'max(8px, 0.8vw)',
//             flex: '1 1 min(200px, 100%)'
//           }}>
//               <span style={{ color: COLORS.primary, fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}>🛒</span>
//             <span style={{ 
//               fontWeight: '500', 
//               color: COLORS.darktext,
//               fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)'
//             }}>
//               {getTotalItems()} Items in Cart
//             </span>
//           </div>
//           <div style={{
//             backgroundColor: `${COLORS.mint}20`,
//             padding: 'max(10px, 1vw) max(20px, 2vw)',
//             borderRadius: '25px',
//             display: 'flex',
//             alignItems: 'center',
//             gap: 'max(8px, 0.8vw)',
//             flex: '1 1 min(200px, 100%)'
//           }}>
//             <span style={{ color: COLORS.primary, fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}>⭐</span>
//             <span style={{ 
//               fontWeight: '500', 
//               color: COLORS.darktext,
//               fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)'
//             }}>
//               Explore Premium Subscriptions
//             </span>
//           </div>
//         </div>
//       </section>

//       {/* Main Content */}
//       <div style={DASHBOARD_STYLES.mainContent}>
//         <div style={DASHBOARD_STYLES.serviceGrid}>
//           {SERVICES.map(service => (
//             <div
//               key={service.view}
//               style={{
//                 ...DASHBOARD_STYLES.serviceCard,
//                 display: 'flex',
//                 flexDirection: 'column',
//                 justifyContent: 'space-between'
//               }}
//               // Card container has no onClick handler - only hover effects
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.transform = 'translateY(-5px)';
//                 e.currentTarget.style.boxShadow = `0 8px 25px ${COLORS.primary}15`;
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = 'translateY(0)';
//                 e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
//               }}
//             >
//               <div style={{ flex: 1 }}>
//                 <div style={DASHBOARD_STYLES.serviceIcon}>{service.icon}</div>
//                 <h3 style={DASHBOARD_STYLES.serviceTitle}>{service.title}</h3>
//                 <p style={DASHBOARD_STYLES.serviceDescription}>{service.desc}</p>
//               </div>
//               <button
//                 style={{
//                   ...DASHBOARD_STYLES.serviceButton,
//                   marginTop: 'auto',
//                   width: '100%',
//                 }}
//                 onMouseEnter={(e) => e.target.style.backgroundColor = '#00897B'}
//                 onMouseLeave={(e) => e.target.style.backgroundColor = COLORS.primary}
//                 onClick={(e) => {
//                   e.preventDefault();
//                   e.stopPropagation();
//                   handleNavigation(service.view);
//                 }}
//               >
//                 {getButtonText(service.title)}
//               </button>
//             </div>
//           ))}
//         </div>
        
//         {/* Subscription Plans Section */}
//         <SubscriptionSection />
        
//         <section style={{ 
//           backgroundColor: COLORS.white, 
//           borderRadius: '15px', 
//           padding: 'max(30px, 3vw) max(25px, 2.5vw)', 
//           marginBottom: 'max(30px, 3vw)',
//           boxSizing: 'border-box'
//         }}>
//           <h2 style={{ 
//             fontSize: 'clamp(1.4rem, 3.5vw, 2rem)', 
//             fontWeight: 'bold', 
//             color: COLORS.primary, 
//             marginBottom: 'max(25px, 2.5vw)', 
//             textAlign: 'center',
//             lineHeight: '1.3'
//           }}>
//             Healthcare Information & Guidelines
//           </h2>
//           <div style={DASHBOARD_STYLES.infoGrid}>
//             {[
//               { 
//                 icon: '💊',
//                 title: 'Medicine Safety Guidelines', 
//                 content: ['Always follow prescription instructions', 'Check expiry dates before consumption', 'Store medicines in proper conditions', 'Avoid self-medication without consultation'] 
//               },
//               { 
//                 icon: '👨‍⚕️',
//                 title: 'Online Consultation Benefits', 
//                 content: ['Time-saving with no travel required', 'Access specialists from anywhere', 'Private and confidential consultations', 'Easy follow-up appointments'] 
//               },
//               { 
//                 icon: '🚨',
//                 title: 'Emergency Preparedness', 
//                 content: ['Contact emergency services immediately (108)', 'Maintain a well-stocked first aid kit', 'Keep emergency medical contacts ready', 'Have medical records easily accessible'] 
//               }
//             ].map(info => (
//               <div key={info.title} style={DASHBOARD_STYLES.infoCard}>
//                 <h3 style={{ 
//                   fontSize: 'clamp(1.1rem, 2.5vw, 1.2rem)', 
//                   fontWeight: 'bold', 
//                   color: COLORS.primary, 
//                   marginBottom: 'max(15px, 1.5vw)',
//                   lineHeight: '1.3'
//                 }}>
//                   <span>{info.icon}</span> {info.title}
//                 </h3>
//                 <ul style={{ paddingLeft: '15px', margin: '12px 0' }}>
//                   {info.content.map(item => (
//                     <li key={item} style={{ 
//                       marginBottom: 'max(6px, 0.6vw)', 
//                       fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
//                       lineHeight: '1.5',
//                       color: COLORS.darktext
//                     }}>
//                       {item}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </section>
//       </div>
//     </>
//   );

//   const appointmentProps = {
//     appointments,
//     appointmentFilter,
//     setAppointmentFilter,
//     doctors: DOCTORS,
//     specialties,
//     allTimeSlots,
//     doctorSearchQuery,
//     setDoctorSearchQuery,
//     selectedSpecialty,
//     setSelectedSpecialty,
//     selectedTimeSlot,
//     setSelectedTimeSlot,
//     selectedExperience,
//     setSelectedExperience,
//     selectedLanguage,
//     setSelectedLanguage,
//     filteredDoctors,
//     handleBookAppointment,
//     startDoctorChat,
//     viewAppointmentDetails,
//     setActiveView: safeSetActiveView,
//     colors: COLORS
//   };

//   const modalProps = {
//     showProfilePhotoModal,
//     showDoctorChat: false,
//     showCheckoutConfirm,
//     showPrescriptionModal,
//     showLogoutConfirm,
//     showPharmacyStore,
//     showAppointmentDetails: false,
//     activeDoctorChat: null,
//     doctorChats,
//     selectedPharmacy,
//     selectedAppointment: null,
//     prescriptionFile,
//     prescriptionPreview,
//     profilePhotoFile,
//     profilePhotoPreview,
//     profile,
//     cart,
//     getTotalPrice,
//     paymentLoading,
//     getFilteredPharmacyMedicines,
//     pharmacySearchQueries,
//     handlePharmacySearch,
//     addToCartFromPharmacy,
//     updateQuantity,
//     sendDoctorMessage,
//     handlePrescriptionUpload,
//     handlePrescriptionSubmit,
//     handleConfirmCheckout,
//     handleCancelCheckout,
//     confirmLogout,
//     cancelLogout,
//     handleProfilePhotoSubmit,
//     removeProfilePhoto,
//     handleProfilePhotoUpload,
//     setShowProfilePhotoModal,
//     setShowDoctorChat: () => {},
//     setShowCheckoutConfirm,
//     setShowPrescriptionModal,
//     setShowLogoutConfirm,
//     setShowPharmacyStore,
//     setShowAppointmentDetails: () => {},
//     setActiveView: safeSetActiveView,
//     colors: COLORS
//   };

//   // FIXED: Add null check for trackingOrder when passing to LiveTrackingView
//   const getSafeTrackingOrder = () => {
//     if (!trackingOrder) {
//       // Return a safe default order if trackingOrder is null
//       return {
//         id: 'ORD000',
//         date: new Date().toISOString().split('T')[0],
//         items: [],
//         total: 0,
//         subtotal: 0,
//         tip: 0,
//         status: 'No active tracking',
//         trackingAvailable: false
//       };
//     }
//     return trackingOrder;
//   };

//   return (
//     <ErrorBoundary>
//       <div style={DASHBOARD_STYLES.container}>
//         <Header
//           activeView={activeView}
//           setActiveView={safeSetActiveView}
//           cart={cart}
//           getTotalItems={getTotalItems}
//           notifications={notifications}
//           markAsRead={markAsRead}
//           markAllAsRead={markAllAsRead}
//           getUnreadCount={getUnreadCount}
//           handleNotificationsClick={() => setShowNotifications(!showNotifications)}
//           toggleProfileDropdown={() => setShowProfileDropdown(prev => !prev)}
//           showProfileDropdown={showProfileDropdown}
//           setShowProfileDropdown={setShowProfileDropdown}
//           handleLogoutClick={() => setShowLogoutConfirm(true)}
//           notificationRef={notificationRef}
//           profileRef={profileRef}
//           profilePhotoInputRef={profilePhotoInputRef}
//           handleProfilePhotoUpload={handleProfilePhotoUpload}
//           triggerProfilePhotoUpload={triggerProfilePhotoUpload}
//           profile={profile}
//           colors={COLORS}
//         />
//         {showNotifications && (
//           <NotificationsPage
//             showNotifications={showNotifications}
//             notifications={notifications}
//             onClose={() => setShowNotifications(false)}
//             onViewAll={() => {
//               setShowNotifications(false);
//               setShowFullNotifications(true);
//             }}
//             markAsRead={markAsRead}
//             markAllAsRead={markAllAsRead}
//             deleteNotification={deleteNotification}
//             onNotificationsChange={setNotifications}
//             colors={COLORS}
//           />
//         )}
//         {showFullNotifications && (
//           <FullNotificationsPage
//             notifications={notifications}
//             onBack={() => setShowFullNotifications(false)}
//             markAsRead={markAsRead}
//             markAllAsRead={markAllAsRead}
//             deleteNotification={deleteNotification}
//             deleteAllNotifications={deleteAllNotifications}
//             onNotificationsChange={setNotifications}
//             colors={COLORS}
//           />
//         )}
//         <AIChatbotWidget
//           showChatbot={showChatbot}
//           toggleChatbot={() => setShowChatbot(!showChatbot)}
//           chatMessages={chatMessages}
//           userMessage={userMessage}
//           handleUserMessage={(e) => setUserMessage(e.target.value)}
//           sendMessage={sendMessage}
//           handleKeyPress={handleKeyPress}
//           chatInputRef={chatInputRef}
//           chatMessagesEndRef={chatMessagesEndRef}
//           colors={COLORS}
//         />
//         <Modals {...modalProps} />
        
//         {/* Phone Confirmation Modal - FIXED VERSION */}
//         <PhoneConfirmationModal />
        
//         {/* Render the correct view based on activeView */}
//         {activeView === 'dashboard' && <DashboardView />}
//         {activeView === 'profile' && (
//           <ProfileView
//             triggerProfilePhotoUpload={triggerProfilePhotoUpload}
//             removeProfilePhoto={removeProfilePhoto}
//             userProfile={profile}
//             updateProfile={updateProfile}
//             setActiveView={safeSetActiveView}
//             colors={COLORS}
//           />
//         )}
//         {activeView === 'appointments' && (
//           <AppointmentsView
//             {...appointmentProps}
//             setActiveView={safeSetActiveView}
//             colors={COLORS}
//           />
//         )}
//         {activeView === 'orders' && (
//           <OrdersView
//             orders={orders}
//             filteredOrders={filteredOrders}
//             startLiveTracking={startLiveTracking}
//             orderFilter={orderFilter}
//             setOrderFilter={setOrderFilter}
//             setActiveView={safeSetActiveView}
//             colors={COLORS}
//           />
//         )}
//         {activeView === 'medicine' && (
//           <MedicineView
//             searchQuery={searchQuery}
//             setSearchQuery={setSearchQuery}
//             medicines={MEDICINES}
//             filteredMedicines={filteredMedicines}
//             cart={cart}
//             addToCart={addToCart}
//             updateQuantity={updateQuantity}
//             pharmacies={PHARMACIES}
//             viewPharmacyStore={viewPharmacyStore}
//             handlePrescriptionUpload={handlePrescriptionUpload}
//             setActiveView={safeSetActiveView}
//             colors={COLORS}
//           />
//         )}
        
//         {activeView === 'products' && (
//           <Products
//             searchQuery={searchQuery}
//             setSearchQuery={setSearchQuery}
//             cart={cart}
//             addToCart={addToCart}
//             updateQuantity={updateQuantity}
//             setActiveView={safeSetActiveView}
//             colors={COLORS}
//           />
//         )}
//         {activeView === 'cart' && (
//           <CartView
//             cart={cart}
//             updateQuantity={updateQuantity}
//             removeFromCart={removeFromCart}
//             getTotalPrice={getTotalPrice}
//             handleCheckoutConfirmation={handleCheckoutConfirmation}
//             paymentLoading={paymentLoading}
//             setActiveView={safeSetActiveView}
//             colors={COLORS}
//           />
//         )}
//         {activeView === 'consultation' && (
//           <ConsultationView
//             {...appointmentProps}
//             setActiveView={safeSetActiveView}
//             profile={profile}
//             addNotification={addNotification}
//             handleBookAppointment={handleBookAppointment}
//             colors={COLORS}
//           />
//         )}
//         {activeView === 'live-tracking' && (
//           <LiveTrackingView
//             trackingOrder={getSafeTrackingOrder()} // FIXED: Use safe tracking order
//             deliveryPartner={deliveryPartner}
//             callDeliveryPartner={callDeliveryPartner}
//             getDeliveryProgress={getDeliveryProgress}
//             getDeliveryStatusText={getDeliveryStatusText}
//             setActiveView={safeSetActiveView}
//             colors={COLORS}
//           />
//         )}
//         {activeView === 'notifications' && (
//           <FullNotificationsPage
//             notifications={notifications}
//             onBack={() => safeSetActiveView('dashboard')}
//             markAsRead={markAsRead}
//             markAllAsRead={markAllAsRead}
//             deleteNotification={deleteNotification}
//             deleteAllNotifications={deleteAllNotifications}
//             onNotificationsChange={setNotifications}
//             colors={COLORS}
//           />
//         )}
//         {activeView === 'pregnancy-care' && (
//           <PregnancyCareView
//             user={profile}
//             addNotification={addNotification}
//             setActiveView={safeSetActiveView}
//             userSubscriptions={userSubscriptions}
//             isSubscribed={isSubscribed('pregnancyCare')}
//             handleSubscribe={handleSubscribe}
//             handleUpgradeSubscription={handleUpgradeSubscription}
//             paymentLoading={paymentLoading}
//             showSubscriptionModal={false} // REMOVED: No subscription modal
//             setShowSubscriptionModal={() => {}} // REMOVED: No subscription modal
//             selectedSubscription={selectedSubscription}
//             setSelectedSubscription={setSelectedSubscription}
//             showUpgradeModal={showUpgradeModal}
//             setShowUpgradeModal={setShowUpgradeModal}
//             selectedUpgradePlan={selectedUpgradePlan}
//             setSelectedUpgradePlan={setSelectedUpgradePlan}
//             colors={COLORS}
//           />
//         )}
//         {activeView === 'lab-tests' && (
//           <LabTestsView
//             setActiveView={safeSetActiveView}
//             addNotification={addNotification}
//             colors={COLORS}
//           />
//         )}
//         {activeView === 'health-records' && (
//           <HealthRecordsView
//             setActiveView={safeSetActiveView}
//             healthRecords={healthRecords}
//             addHealthRecord={addHealthRecord}
//             colors={COLORS}
//           />
//         )}
//         {activeView === 'blood-bank' && (
//           <BloodBankView
//             setActiveView={safeSetActiveView}
//             addNotification={addNotification}
//             colors={COLORS}
//           />
//         )}
//         {activeView === 'baby-care' && (
//           <BabyCareView
//             setActiveView={safeSetActiveView}
//             addNotification={addNotification}
//             colors={COLORS}
//           />
//         )}
//         {activeView === 'vehicle-dashboard' && (
//           <VehicleDashboard
//             setActiveView={safeSetActiveView}
//             addNotification={addNotification}
//             colors={COLORS}
//           />
//         )}
//       </div>
//     </ErrorBoundary>
//   );
// };

// const UserDashboard = ({ user, onLogout, onWriteReview }) => (
//   <ProfileProvider user={user}>
//     <UserDashboardContent user={user} onLogout={onLogout} onWriteReview={onWriteReview} />
//   </ProfileProvider>
// );

// export default UserDashboard;


// 
// 


import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import ProfileView from './ProfileView';
import AppointmentsView from './AppointmentsView';
import OrdersView from './OrdersView';
import MedicineView from './MedicineView';
import CartView from './CartView';
import ConsultationView from './ConsultationView';
import LiveTrackingView from './LiveTrackingView';
import NotificationsPage from './NotificationsPage';
import FullNotificationsPage from './FullNotificationsPage';
import Modals from './Modals';
import Products from './Products';
import AIChatbotWidget from './AIChatbotWidget';
import VehicleDashboard from './VehicleDashboard';
import { ProfileProvider, useProfile } from './ProfileContext';

// Import the new views
import PregnancyCareView from './PregnancyCareView';
import LabTestsView from './LabTestsView';
import HealthRecordsView from './HealthRecordsView';
import BloodBankView from './BloodBankView';
import BabyCareView from './BabyCareView';

// Color Scheme Constants
const COLORS = {
  primary: '#009688',        // Teal - Main brand color
  mint: '#4DB6AC',          // Light teal/mint
  softbg: '#E0F2F1',        // Very light teal background
  white: '#FFFFFF',         // White
  darktext: '#124441',      // Dark teal text
  softtext: '#4F6F6B'       // Muted teal text
};

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>Something went wrong</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Mock Data
const DOCTORS = [
  {
    id: '1', name: 'Dr. Brahma Gadikoto', specialty: 'General Physician',
    experience: '15+ years', languages: 'English, Hindi, Telugu',
    consultationFee: '730', availableSlots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM']
  },
  {
    id: '2', name: 'Dr. Charitha Kasturi', specialty: 'Pediatrician',
    experience: '12+ years', languages: 'English, Hindi, Tamil',
    consultationFee: '850', availableSlots: ['09:30 AM', '10:30 AM', '11:30 AM', '02:30 PM', '03:30 PM', '04:30 PM']
  },
  {
    id: '3', name: 'Dr. Rajesh Kumar', specialty: 'Cardiologist',
    experience: '18+ years', languages: 'English, Hindi',
    consultationFee: '1200', availableSlots: ['10:00 AM', '11:00 AM', '12:00 PM', '03:00 PM', '04:00 PM', '05:00 PM']
  }
];



const PHARMACIES = [
  { 
    id: 1, name: 'City Pharmacy', distance: '1.1 km', deliveryTime: '20 min', rating: 4.5,
    medicines: [
      { id: 2, name: 'Paracetamol 500mg', price: 30, category: 'OTC' },
      { id: 5, name: 'Amoxicillin 500mg', price: 120, category: 'Prescription' }
    ]
  },
  { 
    id: 2, name: 'WellCare Store', distance: '1.6 km', deliveryTime: '25 min', rating: 4.8,
    medicines: [
      { id: 1, name: 'Aspirin 75mg', price: 25, category: 'OTC' },
      { id: 4, name: 'Vitamin C 1000mg', price: 40, category: 'Vitamins' }
    ]
  }
];

const CHATBOT_RESPONSES = {
  'hello': "Hello! I'm your QuickMed assistant. How can I help you with medicines or doctor consultations today?",
  'hi': "Hi there! Welcome to QuickMed. How can I assist you with healthcare services?",
  'medicine': "We offer a wide range of medicines. You can search for specific medicines, upload prescriptions, or browse categories.",
  'doctor': "We have certified doctors available for online consultations.",
  'delivery': "We offer fast delivery within 2 hours for medicines and 24/7 doctor consultations.",
  'payment': "We accept all major payment methods including UPI, credit/debit cards, net banking, and wallet payments.",
  'prescription': "You can upload your prescription in the Medicine section.",
  'emergency': "For medical emergencies, please contact your nearest hospital immediately or call emergency services at 108.",
  'default': "I understand you're asking about healthcare services. I can help with medicine orders, doctor appointments, delivery tracking, and general health queries."
};

const DASHBOARD_STYLES = {
  container: { 
    minHeight: '40vh', 
    backgroundColor: COLORS.softbg, 
    overflowX: 'hidden',
    width: '100%',
    maxWidth: '100vw'
  },
  mainContent: { 
    padding: 'max(15px, 1.5vw)', 
    maxWidth: '1400px', 
    margin: '0 auto', 
    marginTop: '0', 
    width: '100%',
    boxSizing: 'border-box'
  },
  welcomeSection: { 
    textAlign: 'center', 
    marginBottom: 'max(25px, 2.5vw)', 
    padding: 'max(25px, 2.5vw) max(15px, 1.5vw)',
    backgroundColor: COLORS.white, 
    borderRadius: '15px', 
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '100%', 
    marginTop: '90px',
    borderBottom: `4px solid ${COLORS.primary}`,
    boxSizing: 'border-box'
  },
  welcomeTitle: { 
    fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', 
    fontWeight: 'bold', 
    color: COLORS.primary, 
    marginBottom: 'max(10px, 1vw)',
    lineHeight: '1.3'
  },
  welcomeSubtitle: { 
    fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', 
    color: COLORS.softtext, 
    maxWidth: 'min(700px, 90%)', 
    margin: '0 auto',
    lineHeight: '1.6'
  },
  serviceGrid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', 
    gap: 'max(20px, 2vw)', 
    marginBottom: 'max(20px, 2vw)', 
    width: '100%'
  },
  serviceCard: { 
    backgroundColor: COLORS.white, 
    borderRadius: '12px', 
    padding: 'max(20px, 2vw) max(15px, 1.5vw)', 
    textAlign: 'center', 
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
    cursor: 'pointer', 
    transition: 'all 0.2s ease', 
    border: `1px solid ${COLORS.mint}20`, 
    minHeight: 'min(300px, auto)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  serviceIcon: { 
    fontSize: 'clamp(2rem, 4vw, 2.5rem)', 
    marginBottom: 'max(15px, 1.5vw)', 
    height: 'clamp(50px, 6vw, 60px)'
  },
  serviceTitle: { 
    fontSize: 'clamp(1rem, 2vw, 1.2rem)', 
    fontWeight: 'bold', 
    color: COLORS.primary, 
    marginBottom: 'max(10px, 1vw)',
    lineHeight: '1.3'
  },
  serviceDescription: { 
    fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)', 
    color: COLORS.softtext, 
    marginBottom: 'max(15px, 1.5vw)', 
    flexGrow: 1,
    lineHeight: '1.5'
  },
  serviceButton: { 
    backgroundColor: COLORS.primary, 
    color: COLORS.white, 
    border: 'none', 
    padding: 'max(10px, 1vw) max(20px, 2vw)', 
    borderRadius: '20px', 
    fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)', 
    fontWeight: 'bold', 
    cursor: 'pointer', 
    width: '100%',
    transition: 'background-color 0.3s ease'
  },
  subscriptionGrid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', 
    gap: 'max(25px, 2.5vw)', 
    width: '100%'
  },
  subscriptionCard: { 
    backgroundColor: COLORS.white, 
    borderRadius: '15px', 
    padding: 'max(25px, 2.5vw) max(20px, 2vw)', 
    textAlign: 'center', 
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)', 
    border: `2px solid ${COLORS.mint}30`,
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 'min(450px, auto)',
    position: 'relative'
  },
  subscriptionHeader: { 
    paddingBottom: 'max(15px, 1.5vw)', 
    borderBottom: `2px solid ${COLORS.softbg}`,
    marginBottom: 'max(20px, 2vw)'
  },
  subscriptionTitle: { 
    fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', 
    fontWeight: 'bold', 
    color: COLORS.primary, 
    marginBottom: 'max(10px, 1vw)',
    lineHeight: '1.3'
  },
  subscriptionPrice: { 
    fontSize: 'clamp(1.8rem, 3vw, 2.2rem)', 
    fontWeight: 'bold', 
    color: COLORS.darktext, 
    marginBottom: 'max(5px, 0.5vw)'
  },
  subscriptionDuration: { 
    fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)', 
    color: COLORS.softtext, 
    marginBottom: 'max(15px, 1.5vw)'
  },
  featureList: { 
    textAlign: 'left', 
    margin: 'max(20px, 2vw) 0',
    flexGrow: 1
  },
  featureItem: { 
    display: 'flex', 
    alignItems: 'center', 
    marginBottom: 'max(12px, 1.2vw)',
    fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)',
    lineHeight: '1.4'
  },
  infoGrid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', 
    gap: 'max(20px, 2vw)', 
    width: '100%'
  },
  infoCard: { 
    backgroundColor: COLORS.softbg, 
    borderRadius: '12px', 
    padding: 'max(20px, 2vw) max(15px, 1.5vw)', 
    border: `1px solid ${COLORS.mint}30`, 
    minHeight: 'min(260px, auto)'
  }
};

const SERVICES = [
  { 
    view: 'medicine',  
    title: 'Medicine Delivery', 
    desc: 'Get prescribed medicines delivered within 2 hours. Upload prescriptions for quick verification.',
    icon: '💊'
  },
  { 
    view: 'consultation',  
    title: 'Doctor Consultation', 
    desc: 'Connect with certified doctors online for video consultations. Available 24/7 for all your healthcare needs.',
    icon: '👨‍⚕️'
  },
  { 
    view: 'products',  
    title: 'Product Catalog', 
    desc: 'Browse complete medicine catalog with detailed information, health guides, and expert recommendations.',
    icon: '🛒'
  },
  { 
    view: 'pregnancy-care',  
    title: 'Pregnancy Care', 
    desc: 'Track your pregnancy journey, appointments, and baby\'s development week by week.',
    icon: '🤰'
  },
  { 
    view: 'lab-tests', 
    title: 'Lab Tests', 
    desc: 'Book diagnostic tests, view results online, and track your health metrics.',
    icon: '🔬'
  },
  { 
    view: 'health-records', 
    title: 'Health Records', 
    desc: 'Store and access your complete medical history, lab results, prescriptions securely.',
    icon: '📋'
  },
  { 
    view: 'blood-bank',  
    title: 'Blood Bank', 
    desc: 'Find blood donors, request blood, donate blood, and save lives with our services.',
    icon: '🩸'
  },
  { 
    view: 'baby-care',  
    title: 'Baby Care', 
    desc: 'Track your baby\'s growth, vaccination schedule, feeding, and development milestones.',
    icon: '👶'
  },
  {
    view: 'vehicle-dashboard',
    title: 'Vehicle Dashboard',
    desc: 'View ambulance, cab, auto, and bike availability near your location in real-time.',
    icon: '🚗'
  }
];

// Subscription Plans Data
const SUBSCRIPTION_PLANS = {
  babyCare: [
    {
      id: 'baby-monthly',
      title: 'Baby Care Monthly',
      price: 499,
      duration: 'month',
      savings: 'Save 10%',
      popular: false,
      features: [
        'Personalized baby diet plan by age',
        'Daily activity & growth monitoring',
        'Health check reminders',
        'Vaccination schedule tracker',
        'Access to pediatric expert tips',
        'Weekly progress reports',
        '24/7 pediatric nurse support',
        'Emergency consultation priority'
      ]
    },
    {
      id: 'baby-annual',
      title: 'Baby Care Annual',
      price: 4999,
      duration: 'year',
      savings: 'Save 25%',
      popular: true,
      features: [
        'All Monthly plan features',
        '4 free pediatric consultations',
        'Free vaccination at home',
        'Monthly developmental assessment',
        'Personal growth chart analysis',
        'Nutritional supplements guidance',
        'Milestone achievement rewards',
        'Priority emergency response'
      ]
    }
  ],
  pregnancyCare: [
    {
      id: 'pregnancy-basic',
      title: 'Basic Pregnancy Care',
      price: 25000,
      duration: '9 months',
      patientsEnrolled: '450+ Patients',
      popular: false,
      features: [
        'Monthly checkups',
        'Basic tests (Blood, Urine)',
        '2 Ultrasounds',
        'Hospital delivery',
        'Postnatal checkup'
      ]
    },
    {
      id: 'pregnancy-premium',
      title: 'Premium Pregnancy Care',
      price: 50000,
      duration: '9 months',
      patientsEnrolled: '680+ Patients',
      popular: true,
      features: [
        'Fortnightly checkups',
        'All tests included',
        '4 Ultrasounds',
        'Home visits (3 times)',
        'Nutrition counseling',
        'Delivery & postnatal care'
      ]
    },
    {
      id: 'pregnancy-comprehensive',
      title: 'Comprehensive Pregnancy Care',
      price: 75000,
      duration: '9 months',
      patientsEnrolled: '320+ Patients',
      popular: false,
      features: [
        'Weekly checkups',
        'All tests & advanced scans',
        'Unlimited home visits',
        'Personalized nutrition plan',
        'Delivery preparation classes',
        'Complete postnatal care'
      ]
    }
  ]
};

// Helper function to get consistent button text
const getButtonText = (title) => {
  const words = title.split(' ');
  if (words.length <= 2) return title;
  return words.slice(0, 2).join(' ');
};

// Helper function to save cart to localStorage
const saveCartToLocalStorage = (cart) => {
  try {
    const cartData = {
      items: cart,
      timestamp: new Date().getTime(),
      expiresIn: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
    };
    localStorage.setItem('quickmed_cart', JSON.stringify(cartData));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

// Helper function to load cart from localStorage
const loadCartFromLocalStorage = () => {
  try {
    const savedCart = localStorage.getItem('quickmed_cart');
    if (savedCart) {
      const cartData = JSON.parse(savedCart);
      const now = new Date().getTime();
      
      // Check if cart has expired (more than 7 days old)
      if (now - cartData.timestamp < cartData.expiresIn) {
        return cartData.items || [];
      } else {
        // Clear expired cart
        localStorage.removeItem('quickmed_cart');
      }
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    localStorage.removeItem('quickmed_cart');
  }
  return [];
};

// Helper function to save appointments to localStorage
const saveAppointmentsToLocalStorage = (appointments) => {
  try {
    localStorage.setItem('userAppointments', JSON.stringify(appointments));
  } catch (error) {
    console.error('Error saving appointments to localStorage:', error);
  }
};

// Helper function to load appointments from localStorage
const loadAppointmentsFromLocalStorage = () => {
  try {
    const savedAppointments = localStorage.getItem('userAppointments');
    if (savedAppointments) {
      return JSON.parse(savedAppointments);
    }
  } catch (error) {
    console.error('Error loading appointments from localStorage:', error);
  }
  return [];
};

// Add Razorpay script dynamically
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const UserDashboardContent = ({ user, onLogout, onWriteReview }) => {
  const { profile, updateProfile } = useProfile();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get initial view from URL
  const getInitialView = () => {
    const path = location.pathname;
    const segments = path.split('/');
    const currentView = segments[segments.length - 1];
    
    const validViews = [
      'dashboard', 'profile', 'appointments', 'orders', 'medicine',
      'products', 'cart', 'consultation', 'live-tracking', 'notifications',
      'pregnancy-care', 'lab-tests', 'health-records', 'blood-bank', 'baby-care', 'vehicle-dashboard'
    ];
    
    return validViews.includes(currentView) ? currentView : 'dashboard';
  };
  
  const [activeView, setActiveView] = useState(getInitialView());
  const [cart, setCart] = useState(() => loadCartFromLocalStorage());
  const [searchQuery, setSearchQuery] = useState('');
  const [medicines, setMedicines] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showCheckoutConfirm, setShowCheckoutConfirm] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState([{ id: 1, text: "Hello! I'm your QuickMed assistant. How can I help you today?", sender: 'bot', timestamp: new Date() }]);
  const [userMessage, setUserMessage] = useState('');
  const [doctorChats, setDoctorChats] = useState({});
  const [pharmacySearchQueries, setPharmacySearchQueries] = useState({});
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showProfilePhotoModal, setShowProfilePhotoModal] = useState(false);
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(profile?.profilePhoto || null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showFullNotifications, setShowFullNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Order Confirmed', message: 'Your order ORD001 has been confirmed', timestamp: new Date(Date.now() - 300000), read: false, type: 'order' },
    { id: 2, title: 'Delivery Update', message: 'Your order is out for delivery', timestamp: new Date(Date.now() - 600000), read: false, type: 'delivery' }
  ]);
  const [orderFilter, setOrderFilter] = useState('all');
  const [prescriptionFile, setPrescriptionFile] = useState(null);
  const [prescriptionPreview, setPrescriptionPreview] = useState(null);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [trackingOrder, setTrackingOrder] = useState(null);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [showPharmacyStore, setShowPharmacyStore] = useState(false);
  const [appointments, setAppointments] = useState(() => loadAppointmentsFromLocalStorage());
  const [appointmentFilter, setAppointmentFilter] = useState('all');
  const [doctorSearchQuery, setDoctorSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // New state for subscription modal - REMOVED showSubscriptionModal
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedUpgradePlan, setSelectedUpgradePlan] = useState(null);
  const [userSubscriptions, setUserSubscriptions] = useState([]);

  // New state for phone confirmation
  const [showPhoneConfirm, setShowPhoneConfirm] = useState(false);
  const [tempPhone, setTempPhone] = useState('');
  const [paymentPlan, setPaymentPlan] = useState(null);
  const [checkoutData, setCheckoutData] = useState(null);
  const [paymentType, setPaymentType] = useState(''); // 'subscription' or 'checkout'

  const chatInputRef = useRef(null);
  const chatMessagesEndRef = useRef(null);
  const profilePhotoInputRef = useRef(null);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  const [healthRecords, setHealthRecords] = useState({
    conditions: [{ id: 1, condition: 'Hypertension', diagnosedDate: '2022-03-15', status: 'Controlled', severity: 'Mild', treatment: 'Medication & Lifestyle changes' }],
    labResults: [{ id: 1, test: 'Complete Blood Count', result: 'Normal', date: '2024-01-15', status: 'Normal', lab: 'Metropolis Laboratory' }],
    vitals: [{ id: 1, type: 'Blood Pressure', value: '120/80 mmHg', date: '2024-01-20', status: 'Normal' }],
    allergies: [{ id: 1, allergen: 'Penicillin', severity: 'Severe', reaction: 'Anaphylaxis', diagnosed: '2018-05-20' }],
    surgical: [{ id: 1, procedure: 'Appendectomy', date: '2015-07-10', hospital: 'City General Hospital', surgeon: 'Dr. Ramesh Kumar' }]
  });

  const deliveryPartner = {
    id: 'DP001', name: 'Rahul Kumar', phone: '+91 9876543210', vehicle: 'Bike',
    vehicleNumber: 'KA01AB1234', rating: 4.7, status: 'picked_up', estimatedTime: '25 min'
  };

  const specialties = ['General Physician', 'Pediatrician', 'Cardiologist', 'Dermatologist', 'Orthopedic'];
  const allTimeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];

  // Sync URL changes with activeView state
  useEffect(() => {
    // Get current view from URL pathname
    const path = location.pathname;
    const segments = path.split('/');
    const currentView = segments[segments.length - 1];
    
    // List of valid views
    const validViews = [
      'dashboard', 'profile', 'appointments', 'orders', 'medicine',
      'products', 'cart', 'consultation', 'live-tracking', 'notifications',
      'pregnancy-care', 'lab-tests', 'health-records', 'blood-bank', 'baby-care', 'vehicle-dashboard'
    ];
    
    // If URL contains a valid view and it's different from current activeView, update state
    if (validViews.includes(currentView) && currentView !== activeView) {
      setActiveView(currentView);
    }
  }, [location.pathname, activeView]);

  // Initialize activeView on component mount
  useEffect(() => {
    // Ensure URL matches active view
    if (activeView === 'dashboard' && !location.pathname.endsWith('/dashboard') && !location.pathname.endsWith('/user')) {
      navigate('/user/dashboard', { replace: true });
    } else if (activeView !== 'dashboard' && !location.pathname.endsWith(`/${activeView}`)) {
      navigate(`/user/${activeView}`, { replace: true });
    }
  }, [activeView, navigate, location.pathname]);

  // Save appointments to localStorage whenever they change
  useEffect(() => {
    saveAppointmentsToLocalStorage(appointments);
  }, [appointments]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    saveCartToLocalStorage(cart);
  }, [cart]);
  // ✅ STEP 3: Fetch medicines from backend
// ✅ STEP 3: Fetch PUBLIC medicines for USER
useEffect(() => {
  fetch("http://127.0.0.1:8000/api/vendor/medicines/public/")
    .then((res) => res.json())
    .then((data) => {
      console.log("Public medicines received:", data);

      if (Array.isArray(data)) {
        setMedicines(data);
      } else {
        console.error("Public medicines API error:", data);
        setMedicines([]);
      }
    })
    .catch((error) => {
      console.error("Error fetching public medicines:", error);
      setMedicines([]);
    });
}, []);




  // Core Functions
  const handleNavigation = useCallback((view) => {
    // Update URL first
    if (view === 'dashboard') {
      navigate('/user/dashboard');
    } else {
      navigate(`/user/${view}`);
    }
    
    // Then update the state after a tiny delay to ensure URL change is processed
    setTimeout(() => {
      setActiveView(view);
    }, 10);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate]);

  const safeSetActiveView = useCallback((view) => handleNavigation(view), [handleNavigation]);

  // Notification Functions
  const addNotification = useCallback((title, message, type = 'info') => {
    setNotifications(prev => [{ id: Date.now(), title, message, timestamp: new Date(), read: false, type }, ...prev]);
  }, []);

  const markAsRead = useCallback((id) => {
    setNotifications(prev => prev.map(notif => notif.id === id ? { ...notif, read: true } : notif));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  }, []);

  const deleteNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  }, []);

  const deleteAllNotifications = useCallback(() => setNotifications([]), []);

  const getUnreadCount = useCallback(() => notifications.filter(n => !n.read).length, [notifications]);

  const addHealthRecord = (type, record) => {
    setHealthRecords(prev => ({ ...prev, [type]: [...prev[type], { ...record, id: Date.now() }] }));
    addNotification('Health Record Added', `New ${type} record added`, 'health');
  };

  // Cart Functions with localStorage persistence
  const addToCart = useCallback((medicine) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === medicine.id);
      let newCart;
      
      if (existingItem) {
        newCart = prev.map(item => 
          item.id === medicine.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCart = [...prev, { ...medicine, quantity: 1 }];
      }
      
      return newCart;
    });
    
    addNotification('Medicine Added', `${medicine.name} added to cart`, 'order');
  }, [addNotification]);

  const removeFromCart = useCallback((id) => {
    setCart(prev => {
      const newCart = prev.filter(item => item.id !== id);
      return newCart;
    });
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    setCart(prev => {
      let newCart;
      
      if (quantity === 0) {
        newCart = prev.filter(item => item.id !== id);
      } else {
        newCart = prev.map(item => 
          item.id === id ? { ...item, quantity } : item
        );
      }
      
      return newCart;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const getTotalPrice = useCallback(() => 
    cart.reduce((total, item) => total + (item.price * item.quantity), 0), 
    [cart]
  );

  const getTotalItems = useCallback(() => 
    cart.reduce((total, item) => total + item.quantity, 0), 
    [cart]
  );

  // Initialize Razorpay
  useEffect(() => {
    const initializeRazorpay = async () => {
      const isLoaded = await loadRazorpayScript();
      setRazorpayLoaded(isLoaded);
      if (!isLoaded) {
        console.error('Failed to load Razorpay script');
      }
    };
    initializeRazorpay();
  }, []);

  // ========== PHONE CONFIRMATION FUNCTIONS ==========
  
  const showPhoneConfirmation = (plan, type = 'subscription') => {
    setPaymentPlan(plan);
    setPaymentType(type);
    setTempPhone(profile?.phone || '');
    setShowPhoneConfirm(true);
  };

  const handlePhoneConfirm = () => {
    if (tempPhone.length !== 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }
    
    // Update profile if phone changed
    if (tempPhone !== profile?.phone) {
      updateProfile({ ...profile, phone: tempPhone });
    }
    
    // Only close the modal
    setShowPhoneConfirm(false);
    
    // Based on payment type, initiate the actual payment
    if (paymentType === 'subscription' && paymentPlan) {
      proceedWithSubscriptionPayment(paymentPlan, tempPhone);
    } else if (paymentType === 'checkout' && checkoutData) {
      proceedWithCheckoutPayment(checkoutData, tempPhone);
    } else {
      // For backward compatibility with old flow
      initiatePayment();
    }
    
    // Reset state (except phone which we want to keep for Razorpay)
    setPaymentPlan(null);
    setCheckoutData(null);
    setPaymentType('');
  };

  // ========== UPDATED PAYMENT FUNCTIONS ==========

  // Subscription Payment with Phone Confirmation - DIRECT PAYMENT (NO POPUP)
  const initiateSubscriptionPayment = async (plan) => {
    if (!razorpayLoaded) {
      addNotification('Payment Error', 'Payment service is not available. Please try again.', 'error');
      return false;
    }

    // Show phone confirmation modal instead of subscription info popup
    showPhoneConfirmation(plan, 'subscription');
    return true;
  };

  const proceedWithSubscriptionPayment = async (plan, phoneNumber) => {
    setPaymentLoading(true);

    try {
      const options = {
        key: 'rzp_test_1DP5mmOlF5G5ag',
        amount: plan.price * 100,
        currency: 'INR',
        name: 'QuickMed Healthcare',
        description: `${plan.title} Subscription`,
        handler: (response) => handleSubscriptionPaymentSuccess(response, plan),
        prefill: {
          name: profile?.fullName || 'Customer',
          email: profile?.email || 'customer@example.com',
          contact: phoneNumber  // Use confirmed phone number
        },
        theme: { color: COLORS.primary },
        modal: {
          ondismiss: () => {
            setPaymentLoading(false);
            addNotification('Payment Cancelled', 'Your subscription payment was cancelled.', 'alert');
          }
        }
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
      return true;
    } catch (error) {
      console.error('Error initiating payment:', error);
      setPaymentLoading(false);
      addNotification('Payment Error', 'Failed to initiate payment. Please try again.', 'error');
      return false;
    }
  };

  // Handle subscription payment success
  const handleSubscriptionPaymentSuccess = async (paymentResponse, plan) => {
    try {
      // Verify payment with your backend (simulated here)
      await verifySubscriptionPayment(paymentResponse);
      
      // Create new subscription
      const startDate = new Date();
      const endDate = new Date(startDate);
      
      // For pregnancy plans, set end date to 9 months from now
      if (plan.id.includes('pregnancy')) {
        endDate.setMonth(endDate.getMonth() + 9);
      } else if (plan.duration === 'month') {
        endDate.setMonth(endDate.getMonth() + 1);
      } else if (plan.duration === 'year') {
        endDate.setFullYear(endDate.getFullYear() + 1);
      }
      
      const newSubscription = {
        id: `sub-${Date.now()}`,
        planId: plan.id,
        title: plan.title,
        planType: plan.id.includes('pregnancy') ? 'pregnancyCare' : 'babyCare',
        status: 'active',
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        price: plan.price,
        duration: plan.duration,
        paymentId: paymentResponse.razorpay_payment_id,
        orderId: paymentResponse.razorpay_order_id,
        features: plan.features
      };
      
      // Update user subscriptions
      setUserSubscriptions(prev => {
        const filtered = prev.filter(sub => 
          !(sub.planType === newSubscription.planType && sub.status === 'active')
        );
        return [newSubscription, ...filtered];
      });
      
      setPaymentLoading(false);
      
      // Clear selected subscription
      setSelectedSubscription(null);
      
      addNotification(
        'Subscription Activated',
        `Your ${plan.title} has been activated successfully!`,
        'success'
      );
      
      return true;
    } catch (error) {
      console.error('Payment verification failed:', error);
      setPaymentLoading(false);
      addNotification('Payment Failed', 'Payment verification failed. Please contact support.', 'error');
      return false;
    }
  };

  // Verify subscription payment (simulate backend call)
  const verifySubscriptionPayment = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 2000);
    });
  };

  // Handle subscription from PregnancyCareView - DIRECT TO PAYMENT
  const handleSubscribe = async (plan) => {
    setSelectedSubscription(plan);
    
    // Initiate payment directly without showing subscription info popup
    const paymentInitiated = await initiateSubscriptionPayment(plan);
    
    if (!paymentInitiated) {
      addNotification('Payment Error', 'Failed to initiate payment for subscription.', 'error');
    }
  };

  // Handle upgrade subscription
  const handleUpgradeSubscription = async (upgradeData) => {
    const { subscription, annualPlan } = upgradeData;
    
    if (!subscription || !annualPlan) {
      addNotification('Upgrade Error', 'Unable to process upgrade. Please try again.', 'error');
      return;
    }
    
    setSelectedUpgradePlan(upgradeData);
    setShowUpgradeModal(true);
    
    // Calculate upgrade price (annual - remaining value of current subscription)
    const upgradePrice = annualPlan.price - calculateRemainingValue(subscription);
    
    const paymentInitiated = await initiateSubscriptionPayment({
      ...annualPlan,
      price: Math.max(upgradePrice, 0)
    });
    
    if (!paymentInitiated) {
      addNotification('Upgrade Error', 'Failed to process upgrade payment.', 'error');
    }
  };

  // Calculate remaining value of current subscription
  const calculateRemainingValue = (subscription) => {
    if (!subscription.endDate) return 0;
    
    const endDate = new Date(subscription.endDate);
    const now = new Date();
    const totalDays = (endDate - new Date(subscription.startDate)) / (1000 * 60 * 60 * 24);
    const remainingDays = Math.max(0, (endDate - now) / (1000 * 60 * 60 * 24));
    
    return Math.round((remainingDays / totalDays) * subscription.price);
  };

  // Check if user is subscribed to a plan
  const isSubscribed = (planType) => {
    return userSubscriptions.some(sub => 
      sub.planType === planType && sub.status === 'active'
    );
  };

  // Appointment Functions
  const handleBookAppointment = (appointmentData) => {
    const newAppointment = {
      id: `APT-${Date.now()}`,
      doctorName: appointmentData.doctorName,
      specialty: appointmentData.doctorSpecialty,
      date: appointmentData.date,
      time: appointmentData.time,
      status: appointmentData.status || 'scheduled',
      consultationType: appointmentData.type === 'home' ? 'Home Consultation' : 'Video Consultation',
      payment: appointmentData.payment || null,
      priority: appointmentData.priority || 'L2',
      fee: appointmentData.fee || 0
    };
    
    const updatedAppointments = [newAppointment, ...appointments];
    setAppointments(updatedAppointments);
    
    const notificationMessage = appointmentData.payment 
      ? `Appointment with ${appointmentData.doctorName} confirmed! Payment: ₹${appointmentData.fee}`
      : `Appointment with ${appointmentData.doctorName} scheduled for ${appointmentData.date} at ${appointmentData.time}`;
    
    addNotification(
      'Appointment Booked',
      notificationMessage,
      'appointment'
    );
  };

  const startDoctorChat = (doctor) => console.log('Starting chat with:', doctor.name);
  const viewAppointmentDetails = (appointment) => console.log('Viewing appointment details:', appointment);

  const filteredDoctors = DOCTORS.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(doctorSearchQuery.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(doctorSearchQuery.toLowerCase());
    const matchesSpecialty = !selectedSpecialty || doctor.specialty === selectedSpecialty;
    const matchesTimeSlot = !selectedTimeSlot || doctor.availableSlots.includes(selectedTimeSlot);
    return matchesSearch && matchesSpecialty && matchesTimeSlot;
  });

  // AI Chatbot
  const generateBotResponse = (message) => {
    const msg = message.toLowerCase();
    if (msg.includes('hello') || msg.includes('hi')) return CHATBOT_RESPONSES.hello;
    if (msg.includes('medicine') || msg.includes('drug') || msg.includes('pill')) return CHATBOT_RESPONSES.medicine;
    if (msg.includes('doctor') || msg.includes('consult') || msg.includes('appointment')) return CHATBOT_RESPONSES.doctor;
    if (msg.includes('delivery') || msg.includes('shipping') || msg.includes('time')) return CHATBOT_RESPONSES.delivery;
    if (msg.includes('payment') || msg.includes('pay') || msg.includes('money')) return CHATBOT_RESPONSES.payment;
    if (msg.includes('prescription') || msg.includes('upload')) return CHATBOT_RESPONSES.prescription;
    if (msg.includes('emergency') || msg.includes('urgent') || msg.includes('help')) return CHATBOT_RESPONSES.emergency;
    return CHATBOT_RESPONSES.default;
  };

  const sendMessage = () => {
    if (!userMessage.trim()) return;
    const newMsg = { id: Date.now(), text: userMessage, sender: 'user', timestamp: new Date() };
    setChatMessages(prev => [...prev, newMsg]);
    setUserMessage('');
    setTimeout(() => {
      const response = { id: Date.now() + 1, text: generateBotResponse(userMessage), sender: 'bot', timestamp: new Date() };
      setChatMessages(prev => [...prev, response]);
      chatInputRef.current?.focus();
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Doctor Chat
  const sendDoctorMessage = (doctorId, message) => {
    if (!message.trim()) return;
    const newMsg = { id: Date.now(), text: message, sender: 'user', timestamp: new Date() };
    setDoctorChats(prev => ({ ...prev, [doctorId]: [...(prev[doctorId] || []), newMsg] }));
    setTimeout(() => {
      const response = { id: Date.now() + 1, text: "Thank you for your message. I'll review your concerns and get back to you shortly.", sender: 'doctor', timestamp: new Date() };
      setDoctorChats(prev => ({ ...prev, [doctorId]: [...(prev[doctorId] || []), response] }));
    }, 2000);
  };

  // Pharmacy Functions
  const handlePharmacySearch = (pharmacyId, query) => {
    setPharmacySearchQueries(prev => ({ ...prev, [pharmacyId]: query }));
  };

  const getFilteredPharmacyMedicines = (pharmacy) => {
    const query = pharmacySearchQueries[pharmacy.id] || '';
    return !query.trim() ? pharmacy.medicines : pharmacy.medicines.filter(m => m.name.toLowerCase().includes(query.toLowerCase()));
  };

  const viewPharmacyStore = (pharmacy) => {
    setSelectedPharmacy(pharmacy);
    setShowPharmacyStore(true);
  };

  const addToCartFromPharmacy = addToCart;

  // Prescription Functions
  const handlePrescriptionUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!validTypes.includes(file.type) || file.size > 5 * 1024 * 1024) {
      alert(file.size > 5 * 1024 * 1024 ? 'File size should be less than 5MB' : 'Please upload a valid prescription file (JPG, PNG, or PDF)');
      return;
    }
    setPrescriptionFile(file);
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setPrescriptionPreview(e.target.result);
      reader.readAsDataURL(file);
    }
    setShowPrescriptionModal(true);
    addNotification('Prescription Uploaded', 'Your prescription has been uploaded successfully', 'prescription');
  };

  const handlePrescriptionSubmit = () => {
    if (!prescriptionFile) {
      alert('Please select a prescription file first');
      return;
    }
    alert(`Prescription "${prescriptionFile.name}" uploaded successfully! Our team will verify it shortly.`);
    setShowPrescriptionModal(false);
    setPrescriptionFile(null);
    setPrescriptionPreview(null);
  };

  // Profile Photo Functions
  const handleProfilePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/') || file.size > 5 * 1024 * 1024) {
      alert(file.size > 5 * 1024 * 1024 ? 'File size should be less than 5MB' : 'Please select an image file (JPG, PNG, etc.)');
      return;
    }
    setProfilePhotoFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setProfilePhotoPreview(e.target.result);
    reader.readAsDataURL(file);
    setShowProfilePhotoModal(true);
  };

  const handleProfilePhotoSubmit = async () => {
    if (!profilePhotoFile) {
      alert('Please select a profile photo first');
      return;
    }
    try {
      await updateProfilePhotoAPI({ profilePhoto: profilePhotoFile });
      const updatedProfile = { ...profile, profilePhoto: profilePhotoPreview };
      updateProfile(updatedProfile);
      setProfilePhotoFile(null);
      if (profilePhotoInputRef.current) {
        profilePhotoInputRef.current.value = '';
      }
      alert('Profile photo updated successfully!');
      addNotification('Profile Photo Updated', 'Your profile photo has been updated successfully', 'info');
      setShowProfilePhotoModal(false);
    } catch {
      alert('Error updating profile photo. Please try again.');
    }
  };

  const updateProfilePhotoAPI = () => new Promise(resolve => setTimeout(() => resolve({ success: true }), 1000));

  const removeProfilePhoto = () => {
    const updatedProfile = { ...profile, profilePhoto: null };
    updateProfile(updatedProfile);
    setProfilePhotoPreview(null);
    setProfilePhotoFile(null);
    if (profilePhotoInputRef.current) {
      profilePhotoInputRef.current.value = '';
    }
    alert('Profile photo removed successfully!');
    addNotification('Profile Photo Removed', 'Your profile photo has been removed', 'info');
  };

  const triggerProfilePhotoUpload = () => profilePhotoInputRef.current?.click();

  // Order Functions - FIXED: Add null check for trackingOrder
  const startLiveTracking = (order) => {
    if (!order) {
      console.error('No order provided for tracking');
      addNotification('Tracking Error', 'No order selected for tracking', 'error');
      return;
    }
    
    // Ensure the order has the required structure
    const trackingOrderWithItems = {
      ...order,
      items: order.items || [], // Default to empty array if items is undefined
      deliveryPartner: order.deliveryPartner || deliveryPartner,
      status: order.status || 'In Transit',
      total: order.total || 0
    };
    
    setTrackingOrder(trackingOrderWithItems);
    safeSetActiveView('live-tracking');
    addNotification('Live Tracking Started', `You can now track your order ${order.id} in real-time`, 'tracking');
  };

  const callDeliveryPartner = () => {
    if (trackingOrder?.deliveryPartner) {
      alert(`Calling delivery partner: ${trackingOrder.deliveryPartner.name}\nPhone: ${trackingOrder.deliveryPartner.phone}`);
    } else {
      alert(`Calling delivery partner: ${deliveryPartner.name}\nPhone: ${deliveryPartner.phone}`);
    }
  };

  const getDeliveryStatusText = (status) => {
    const statusMap = {
      'ordered': 'Order Placed',
      'confirmed': 'Order Confirmed',
      'preparing': 'Preparing Your Order',
      'picked_up': 'Picked Up',
      'on_the_way': 'On the Way',
      'delivered': 'Delivered'
    };
    return statusMap[status] || status;
  };

  const getDeliveryProgress = (status) => {
    const progressMap = {
      'ordered': 20,
      'confirmed': 40,
      'preparing': 60,
      'picked_up': 80,
      'on_the_way': 90,
      'delivered': 100
    };
    return progressMap[status] || 0;
  };

  // ===== UPDATED PAYMENT FUNCTIONS WITH PHONE CONFIRMATION =====
  
  // Original payment function for backward compatibility
  const initiatePayment = async () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    if (!window.Razorpay) {
      alert('Payment system is loading, please try again in a moment.');
      return;
    }
    
    // Show phone confirmation first
    setCheckoutData({
      cartItems: cart,
      totalAmount: getTotalPrice(),
      subtotal: getTotalPrice(),
      tip: 0,
      selectedItems: cart.map(item => item.id)
    });
    setPaymentType('checkout');
    setTempPhone(profile?.phone || '');
    setShowPhoneConfirm(true);
  };

  // Updated handleCheckoutConfirmation to include phone confirmation
  const handleCheckoutConfirmation = async (checkoutData) => {
    console.log('Checkout data received:', checkoutData);
    
    if (!checkoutData || !checkoutData.cartItems || checkoutData.cartItems.length === 0) {
      alert('Invalid checkout data. Please try again.');
      return;
    }
    
    if (!window.Razorpay) {
      alert('Payment system is loading, please try again in a moment.');
      return;
    }
    
    // Store checkout data and show phone confirmation
    setCheckoutData(checkoutData);
    showPhoneConfirmation(checkoutData, 'checkout');
  };

  // Proceed with checkout payment after phone confirmation
  const proceedWithCheckoutPayment = async (checkoutData, phoneNumber) => {
    setPaymentLoading(true);
    
    try {
      // Use the totalAmount from checkoutData (which includes tip)
      const razorpayAmount = checkoutData.totalAmount * 100; // Convert to paise
      
      const options = {
        key: 'rzp_test_1DP5mmOlF5G5ag',
        amount: razorpayAmount,
        currency: 'INR',
        name: 'QuickMed Pharmacy',
        description: `Order with ${checkoutData.selectedItems?.length || checkoutData.cartItems?.length || 0} item(s)`,
        handler: (response) => handlePaymentSuccess(response, checkoutData),
        prefill: {
          name: checkoutData.address?.fullName || profile?.fullName || 'Customer',
          contact: phoneNumber, // Use confirmed phone number
          email: profile?.email || 'customer@example.com'
        },
        theme: { color: COLORS.primary },
        modal: {
          ondismiss: () => {
            setPaymentLoading(false);
            console.log('Payment was cancelled');
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      
    } catch (error) {
      console.error('Error initiating payment:', error);
      setPaymentLoading(false);
    }
  };

  // Updated handlePaymentSuccess to handle tip data
  const handlePaymentSuccess = async (paymentResponse, checkoutData = null) => {
    try {
      // Verify payment with your backend (simulated here)
      await verifyPayment(paymentResponse);
      
      const orderId = `ORD${Date.now()}`;
      
      // If checkoutData is provided (from CartView with tip), use it
      if (checkoutData) {
        const newOrder = {
          id: orderId,
          date: new Date().toISOString().split('T')[0],
          items: checkoutData.cartItems || [],
          total: checkoutData.totalAmount || getTotalPrice(),
          subtotal: checkoutData.subtotal || (checkoutData.totalAmount - (checkoutData.tip || 0)),
          tip: checkoutData.tip || 0,
          status: 'Confirmed',
          paymentId: paymentResponse.razorpay_payment_id,
          orderId: paymentResponse.razorpay_order_id,
          signature: paymentResponse.razorpay_signature,
          trackingAvailable: true,
          deliveryPartner: { 
            name: 'Rahul Kumar', 
            phone: '+91 9876543210', 
            estimatedTime: '30 min' 
          },
          address: checkoutData.address || null,
          selectedItems: checkoutData.selectedItems || []
        };
        
        setOrders(prev => [newOrder, ...prev]);
        
        // Remove selected items from cart
        if (checkoutData.selectedItems && checkoutData.selectedItems.length > 0) {
          setCart(prev => prev.filter(item => !checkoutData.selectedItems.includes(item.id)));
        } else {
          clearCart();
        }
        
        addNotification(
          'Order Confirmed', 
          `Your order ${orderId} has been placed successfully${checkoutData.tip > 0 ? ` with a ₹${checkoutData.tip} tip` : ''}`, 
          'order'
        );
        
      } else {
        // Original logic for regular checkout
        const newOrder = {
          id: orderId,
          date: new Date().toISOString().split('T')[0],
          items: [...cart],
          total: getTotalPrice(),
          subtotal: getTotalPrice(),
          tip: 0,
          status: 'Confirmed',
          paymentId: paymentResponse.razorpay_payment_id,
          orderId: paymentResponse.razorpay_order_id,
          signature: paymentResponse.razorpay_signature,
          trackingAvailable: true,
          deliveryPartner: { 
            name: 'Rahul Kumar', 
            phone: '+91 9876543210', 
            estimatedTime: '30 min' 
          }
        };
        
        setOrders(prev => [newOrder, ...prev]);
        clearCart();
        
        addNotification(
          'Order Confirmed', 
          `Your order ${orderId} has been placed successfully`, 
          'order'
        );
      }
      
      safeSetActiveView('orders');
      console.log('Payment successful! Order ID:', orderId);
      
    } catch (error) {
      console.error('Payment verification failed:', error);
    } finally {
      setPaymentLoading(false);
    }
  };

  const verifyPayment = () => new Promise(resolve => setTimeout(() => resolve({ success: true }), 1000));

  // Old confirmation modal handlers (keep for backward compatibility)
  const handleConfirmCheckout = () => {
    setShowCheckoutConfirm(false);
    initiatePayment();
  };

  const handleCancelCheckout = () => setShowCheckoutConfirm(false);
  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    onLogout();
  };
  const cancelLogout = () => setShowLogoutConfirm(false);

  // Filter Functions
  // const filteredMedicines = MEDICINES.filter(medicine =>
  //   medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //   medicine.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //   medicine.category.toLowerCase().includes(searchQuery.toLowerCase())
  // );
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



  const filteredOrders = orders.filter(order => {
    if (orderFilter === 'all') return true;
    if (orderFilter === 'delivered') return order.status === 'Delivered';
    if (orderFilter === 'in-transit') return order.status === 'In Transit' || order.status === 'On the Way';
    if (orderFilter === 'pending') return order.status === 'Pending';
    return true;
  });

  // Effects - FIXED: Ensure trackingOrder has items property
  useEffect(() => {
    const ordersData = [
      {
        id: 'ORD001',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        items: [{ name: 'Paracetamol 500mg', quantity: 2, price: 30 }, { name: 'Vitamin C 1000mg', quantity: 1, price: 40 }],
        total: 100,
        subtotal: 100,
        tip: 0,
        status: 'Delivered',
        trackingAvailable: false
      },
      {
        id: 'ORD002',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        items: [{ name: 'Aspirin 75mg', quantity: 1, price: 25 }],
        total: 25,
        subtotal: 25,
        tip: 0,
        status: 'In Transit',
        trackingAvailable: true,
        deliveryPartner: { name: 'Rahul Kumar', phone: '+91 9876543210', estimatedTime: '25 min' }
      }
    ];
    
    setOrders(ordersData);
    
    // Set trackingOrder with proper items array
    const trackingOrderData = ordersData.find(o => o.trackingAvailable && (o.status === 'In Transit' || o.status === 'On the Way'));
    if (trackingOrderData) {
      setTrackingOrder({
        ...trackingOrderData,
        items: trackingOrderData.items || [] // Ensure items exists
      });
    }

    // Initialize mock subscriptions for demo
    setUserSubscriptions([
      {
        id: 'sub1',
        planId: 'pregnancy-basic',
        title: 'Basic Pregnancy Care',
        planType: 'pregnancyCare',
        status: 'inactive',
        startDate: '2024-01-01',
        endDate: '2024-10-01',
        price: 25000,
        duration: '9 months',
        features: SUBSCRIPTION_PLANS.pregnancyCare[0].features
      }
    ]);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close profile dropdown
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (showChatbot) setTimeout(() => chatInputRef.current?.focus(), 100);
  }, [showChatbot]);

  useEffect(() => {
    chatMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  useEffect(() => {
    if (profile?.profilePhoto) setProfilePhotoPreview(profile.profilePhoto);
  }, [profile?.profilePhoto]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.2) {
        const types = [
          { type: 'order', titles: ['Order Shipped', 'Delivery Update'], messages: ['Your order is out for delivery', 'Delivery partner has picked up your order'] },
          { type: 'appointment', titles: ['Appointment Reminder', 'Doctor Available'], messages: ['Your appointment starts in 30 minutes', 'Your preferred doctor is now available'] },
          { type: 'promotion', titles: ['Special Offer', 'Discount Available'], messages: ['Get 20% off on all medicines this week', 'Special discount on health checkups'] }
        ];
        const randomType = types[Math.floor(Math.random() * types.length)];
        const newNotif = {
          id: Date.now(),
          title: randomType.titles[0],
          message: randomType.messages[0],
          timestamp: new Date(),
          read: false,
          type: randomType.type
        };
        setNotifications(prev => [newNotif, ...prev]);
      }
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // ========== MODAL COMPONENTS ==========
  
  // Phone Confirmation Modal Component - FIXED: Only continue when button is clicked
  const PhoneConfirmationModal = () => {
    if (!showPhoneConfirm) return null;

    const handlePhoneConfirmClick = () => {
      if (tempPhone.length !== 10) {
        alert('Please enter a valid 10-digit mobile number');
        return;
      }
      
      // Update profile if phone changed
      if (tempPhone !== profile?.phone) {
        updateProfile({ ...profile, phone: tempPhone });
      }
      
      // Close the modal first
      setShowPhoneConfirm(false);
      
      // Based on payment type, initiate the actual payment
      if (paymentType === 'subscription' && paymentPlan) {
        proceedWithSubscriptionPayment(paymentPlan, tempPhone);
      } else if (paymentType === 'checkout' && checkoutData) {
        proceedWithCheckoutPayment(checkoutData, tempPhone);
      } else {
        // For backward compatibility with old flow
        initiatePayment();
      }
      
      // Reset state
      setPaymentPlan(null);
      setCheckoutData(null);
      setPaymentType('');
    };

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        padding: 'max(20px, 2vw)'
      }}>
        <div style={{
          backgroundColor: COLORS.white,
          borderRadius: '15px',
          padding: 'max(30px, 3vw) max(25px, 2.5vw)',
          maxWidth: 'min(500px, 90vw)',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <h3 style={{ 
            fontSize: 'clamp(1.2rem, 3vw, 1.4rem)', 
            fontWeight: 'bold', 
            color: COLORS.primary, 
            marginBottom: 'max(15px, 1.5vw)',
            textAlign: 'center'
          }}>
            Edit contact details
          </h3>
          
          <p style={{ 
            fontSize: 'clamp(0.9rem, 2vw, 1rem)', 
            color: COLORS.softtext, 
            marginBottom: 'max(25px, 2.5vw)',
            lineHeight: '1.5',
            textAlign: 'center'
          }}>
            Enter mobile number to continue
          </p>
          
          <div style={{ marginBottom: 'max(25px, 2.5vw)' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              border: `1px solid ${tempPhone.length === 10 ? '#4CAF50' : COLORS.mint}`,
              borderRadius: '8px',
              padding: 'max(12px, 1.2vw) max(15px, 1.5vw)',
              backgroundColor: '#f9f9f9',
              marginBottom: 'max(10px, 1vw)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginRight: '10px',
                paddingRight: '10px',
                borderRight: `1px solid ${COLORS.mint}`
              }}>
                <span style={{ 
                  fontSize: 'clamp(1rem, 2vw, 1.1rem)', 
                  color: COLORS.darktext,
                  marginRight: '8px'
                }}>+91</span>
                <span style={{ 
                  fontSize: 'clamp(0.9rem, 1.5vw, 1rem)', 
                  color: COLORS.softtext 
                }}>▼</span>
              </div>
              <input
                type="tel"
                value={tempPhone}
                onChange={(e) => setTempPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="6300604470"
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                  color: COLORS.darktext,
                  minWidth: '0'
                }}
                maxLength={10}
                autoFocus
                // REMOVED: Don't automatically submit on Enter key or when reaching 10 digits
                // Only allow manual submission via the Continue button
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && tempPhone.length === 10) {
                    // Prevent automatic submission when pressing Enter
                    e.preventDefault();
                  }
                }}
              />
            </div>
            
            <div style={{ 
              fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)', 
              color: COLORS.softtext,
              marginTop: 'max(5px, 0.5vw)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>{tempPhone.length}/10 digits</span>
              {tempPhone.length === 10 && (
                <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>✓ Valid number</span>
              )}
            </div>
          </div>
          
          <div style={{ 
            display: 'flex', 
            gap: 'max(15px, 1.5vw)', 
            justifyContent: 'center'
          }}>
            <button
              onClick={() => {
                setShowPhoneConfirm(false);
                setPaymentPlan(null);
                setCheckoutData(null);
                setTempPhone('');
                setPaymentType('');
                setPaymentLoading(false);
              }}
              style={{
                backgroundColor: 'transparent',
                color: COLORS.softtext,
                border: `1px solid ${COLORS.mint}`,
                padding: 'max(12px, 1.2vw) max(24px, 2.4vw)',
                borderRadius: '25px',
                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                cursor: 'pointer',
                flex: 1,
                transition: 'all 0.3s ease',
                minWidth: '120px'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = COLORS.softbg;
                e.target.style.borderColor = COLORS.primary;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.borderColor = COLORS.mint;
              }}
            >
              Cancel
            </button>
            
            <button
              onClick={handlePhoneConfirmClick}
              disabled={tempPhone.length !== 10}
              style={{
                backgroundColor: tempPhone.length === 10 ? COLORS.primary : '#ccc',
                color: COLORS.white,
                border: 'none',
                padding: 'max(12px, 1.2vw) max(24px, 2.4vw)',
                borderRadius: '25px',
                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                fontWeight: 'bold',
                cursor: tempPhone.length === 10 ? 'pointer' : 'not-allowed',
                flex: 1,
                transition: 'background-color 0.3s ease',
                minWidth: '120px'
              }}
              onMouseEnter={(e) => {
                if (tempPhone.length === 10) {
                  e.target.style.backgroundColor = '#00897B';
                }
              }}
              onMouseLeave={(e) => {
                if (tempPhone.length === 10) {
                  e.target.style.backgroundColor = COLORS.primary;
                }
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ========== COMPONENTS ==========
  
  const SubscriptionSection = () => {
    return (
      <section style={{ 
        backgroundColor: COLORS.white, 
        borderRadius: '15px', 
        padding: 'max(25px, 2.5vw) max(20px, 2vw)', 
        marginBottom: 'max(30px, 3vw)',
        boxSizing: 'border-box'
      }}>
        <h2 style={{ 
          fontSize: 'clamp(1.4rem, 3.5vw, 2rem)', 
          fontWeight: 'bold', 
          color: COLORS.primary, 
          marginBottom: 'max(10px, 1vw)', 
          textAlign: 'center',
          lineHeight: '1.3'
        }}>
          Premium Care Subscriptions
        </h2>
        <p style={{ 
          fontSize: 'clamp(0.9rem, 2vw, 1rem)', 
          color: COLORS.softtext, 
          marginBottom: 'max(25px, 2.5vw)', 
          textAlign: 'center',
          lineHeight: '1.6'
        }}>
          Subscribe for comprehensive healthcare support and exclusive benefits
        </p>
        
        {/* Pregnancy Care Subscriptions */}
        <div style={{ marginBottom: 'max(30px, 3vw)' }}>
          <h3 style={{ 
            fontSize: 'clamp(1.2rem, 3vw, 1.3rem)', 
            fontWeight: 'bold', 
            color: COLORS.primary, 
            marginBottom: 'max(20px, 2vw)', 
            textAlign: 'center',
            lineHeight: '1.3'
          }}>
            Pregnancy Care Plans
          </h3>
          <div style={DASHBOARD_STYLES.subscriptionGrid}>
            {SUBSCRIPTION_PLANS.pregnancyCare.map(plan => {
              const isActive = userSubscriptions.some(sub => 
                sub.planId === plan.id && sub.status === 'active'
              );
              
              return (
                <div
                  key={plan.id}
                  style={{
                    ...DASHBOARD_STYLES.subscriptionCard,
                    border: plan.popular ? `2px solid ${COLORS.primary}` : `2px solid ${COLORS.mint}30`,
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = `0 12px 30px ${COLORS.primary}25`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                  }}
                >
                  {plan.popular && (
                    <div style={{
                      position: 'absolute',
                      top: '-12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: COLORS.primary,
                      color: COLORS.white,
                      padding: 'max(6px, 0.6vw) max(20px, 2vw)',
                      borderRadius: '20px',
                      fontSize: 'clamp(0.7rem, 1.5vw, 0.8rem)',
                      fontWeight: 'bold',
                      zIndex: 1,
                      whiteSpace: 'nowrap'
                    }}>
                      MOST POPULAR
                    </div>
                  )}
                  
                  {plan.patientsEnrolled && (
                    <div style={{
                      position: 'absolute',
                      top: '15px',
                      right: '15px',
                      backgroundColor: '#2196F3',
                      color: COLORS.white,
                      padding: 'max(4px, 0.4vw) max(10px, 1vw)',
                      borderRadius: '12px',
                      fontSize: 'clamp(0.7rem, 1.5vw, 0.75rem)',
                      fontWeight: 'bold'
                    }}>
                      {plan.patientsEnrolled}
                    </div>
                  )}
                  
                  <div style={DASHBOARD_STYLES.subscriptionHeader}>
                    <h3 style={DASHBOARD_STYLES.subscriptionTitle}>{plan.title}</h3>
                    <div style={DASHBOARD_STYLES.subscriptionPrice}>₹{plan.price.toLocaleString()}</div>
                    <div style={DASHBOARD_STYLES.subscriptionDuration}>{plan.duration}</div>
                  </div>
                  
                  <div style={DASHBOARD_STYLES.featureList}>
                    {plan.features.map((feature, index) => (
                      <div key={index} style={DASHBOARD_STYLES.featureItem}>
                        <span style={{ color: '#4CAF50', marginRight: '10px' }}>✓</span>
                        <span style={{ color: COLORS.darktext }}>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {isActive ? (
                    <div style={{
                      backgroundColor: '#e8f5e9',
                      color: '#2e7d32',
                      padding: 'max(12px, 1.2vw)',
                      borderRadius: '25px',
                      fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      marginTop: 'auto'
                    }}>
                      ✓ Active Subscription
                    </div>
                  ) : (
                    <button
                      onClick={() => handleSubscribe(plan)}
                      style={{
                        backgroundColor: COLORS.primary,
                        color: COLORS.white,
                        border: 'none',
                        padding: 'max(12px, 1.2vw) max(24px, 2.4vw)',
                        borderRadius: '25px',
                        fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        width: '100%',
                        marginTop: 'auto',
                        transition: 'background-color 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#00897B'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = COLORS.primary}
                    >
                      Subscribe Now
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Baby Care Subscriptions */}
        <div style={{ marginBottom: 'max(30px, 3vw)' }}>
          <h3 style={{ 
            fontSize: 'clamp(1.2rem, 3vw, 1.3rem)', 
            fontWeight: 'bold', 
            color: COLORS.primary, 
            marginBottom: 'max(20px, 2vw)', 
            textAlign: 'center',
            lineHeight: '1.3'
          }}>
            Baby Care Plans
          </h3>
          <div style={DASHBOARD_STYLES.subscriptionGrid}>
            {SUBSCRIPTION_PLANS.babyCare.map(plan => {
              const isActive = userSubscriptions.some(sub => 
                sub.planId === plan.id && sub.status === 'active'
              );
              const activeSubscription = userSubscriptions.find(sub => 
                sub.planType === 'babyCare' && sub.status === 'active'
              );
              const canUpgrade = activeSubscription && activeSubscription.duration === 'month' && plan.duration === 'year';
              
              return (
                <div
                  key={plan.id}
                  style={{
                    ...DASHBOARD_STYLES.subscriptionCard,
                    border: plan.popular ? `2px solid ${COLORS.primary}` : `2px solid ${COLORS.mint}30`,
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = `0 12px 30px ${COLORS.primary}25`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                  }}
                >
                  {plan.popular && (
                    <div style={{
                      position: 'absolute',
                      top: '-12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: COLORS.primary,
                      color: COLORS.white,
                      padding: 'max(6px, 0.6vw) max(20px, 2vw)',
                      borderRadius: '20px',
                      fontSize: 'clamp(0.7rem, 1.5vw, 0.8rem)',
                      fontWeight: 'bold',
                      zIndex: 1,
                      whiteSpace: 'nowrap'
                    }}>
                      MOST POPULAR
                    </div>
                  )}
                  
                  {plan.savings && (
                    <div style={{
                      position: 'absolute',
                      top: '15px',
                      right: '15px',
                      backgroundColor: '#4CAF50',
                      color: COLORS.white,
                      padding: 'max(4px, 0.4vw) max(10px, 1vw)',
                      borderRadius: '12px',
                      fontSize: 'clamp(0.7rem, 1.5vw, 0.75rem)',
                      fontWeight: 'bold'
                    }}>
                      {plan.savings}
                    </div>
                  )}
                  
                  <div style={DASHBOARD_STYLES.subscriptionHeader}>
                    <h3 style={DASHBOARD_STYLES.subscriptionTitle}>{plan.title}</h3>
                    <div style={DASHBOARD_STYLES.subscriptionPrice}>₹{plan.price}</div>
                    <div style={DASHBOARD_STYLES.subscriptionDuration}>per {plan.duration}</div>
                  </div>
                  
                  <div style={DASHBOARD_STYLES.featureList}>
                    {plan.features.slice(0, 6).map((feature, index) => (
                      <div key={index} style={DASHBOARD_STYLES.featureItem}>
                        <span style={{ color: '#4CAF50', marginRight: '10px' }}>✓</span>
                        <span style={{ color: COLORS.darktext }}>{feature}</span>
                      </div>
                    ))}
                    {plan.features.length > 6 && (
                      <div style={{ ...DASHBOARD_STYLES.featureItem, color: COLORS.primary, fontWeight: 'bold' }}>
                        <span style={{ marginRight: '10px' }}>+</span>
                        <span>And {plan.features.length - 6} more features...</span>
                      </div>
                    )}
                  </div>
                  
                  {isActive ? (
                    <div style={{
                      backgroundColor: '#e8f5e9',
                      color: '#2e7d32',
                      padding: 'max(12px, 1.2vw)',
                      borderRadius: '25px',
                      fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      marginTop: 'auto'
                    }}>
                      ✓ Active Subscription
                    </div>
                  ) : canUpgrade ? (
                    <button
                      onClick={() => handleUpgradeSubscription({
                        planType: 'babyCare',
                        subscription: activeSubscription,
                        annualPlan: plan
                      })}
                      style={{
                        backgroundColor: '#ff9800',
                        color: COLORS.white,
                        border: 'none',
                        padding: 'max(12px, 1.2vw) max(24px, 2.4vw)',
                        borderRadius: '25px',
                        fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        width: '100%',
                        marginTop: 'auto',
                        transition: 'background-color 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#f57c00'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#ff9800'}
                    >
                      Upgrade Now
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSubscribe(plan)}
                      style={{
                        backgroundColor: COLORS.primary,
                        color: COLORS.white,
                        border: 'none',
                        padding: 'max(12px, 1.2vw) max(24px, 2.4vw)',
                        borderRadius: '25px',
                        fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        width: '100%',
                        marginTop: 'auto',
                        transition: 'background-color 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#00897B'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = COLORS.primary}
                    >
                      Subscribe Now
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Subscription Benefits */}
        <div style={{ 
          backgroundColor: COLORS.softbg, 
          borderRadius: '12px', 
          padding: 'max(20px, 2vw) max(15px, 1.5vw)', 
          marginTop: 'max(30px, 3vw)',
          textAlign: 'center'
        }}>
          <h4 style={{ 
            fontSize: 'clamp(1rem, 2.5vw, 1.1rem)', 
            fontWeight: 'bold', 
            color: COLORS.primary, 
            marginBottom: 'max(15px, 1.5vw)',
            lineHeight: '1.3'
          }}>
            Why Subscribe?
          </h4>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 'max(20px, 2vw)', 
            flexWrap: 'wrap' 
          }}>
            {[
              { icon: '📞', text: '24/7 Expert Support' },
              { icon: '🎯', text: 'Personalized Care Plans' },
              { icon: '💰', text: 'Cost Savings' },
              { icon: '⚡', text: 'Priority Services' },
              { icon: '📊', text: 'Progress Tracking' }
            ].map((benefit, index) => (
              <div key={index} style={{ 
                textAlign: 'center', 
                minWidth: 'min(120px, 100%)',
                flex: '1 1 min(120px, 100%)'
              }}>
                <div style={{ 
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)', 
                  marginBottom: 'max(8px, 0.8vw)' 
                }}>
                  {benefit.icon}
                </div>
                <span style={{ 
                  fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)', 
                  color: COLORS.softtext,
                  lineHeight: '1.4'
                }}>
                  {benefit.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const DashboardView = () => (
    <>
      {/* Welcome Section */}
      <section style={DASHBOARD_STYLES.welcomeSection}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          flexWrap: 'wrap',
          gap: 'max(15px, 1.5vw)',
          marginTop: '50px',
          marginBottom: 'max(15px, 1.5vw)'
        }}>
          {profile?.profilePhoto ? (
            <img 
              src={profile.profilePhoto} 
              alt="Profile" 
              style={{
                width: 'clamp(50px, 6vw, 60px)',
                height: 'clamp(50px, 6vw, 60px)',
                borderRadius: '50%',
                border: `3px solid ${COLORS.primary}`,
                objectFit: 'cover'
              }}
            />
          ) : (
            <div style={{
              width: 'clamp(50px, 6vw, 60px)',
              height: 'clamp(50px, 6vw, 60px)',
              borderRadius: '50%',
              backgroundColor: COLORS.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: COLORS.white,
              fontSize: 'clamp(20px, 3vw, 24px)',
              border: `3px solid ${COLORS.primary}`
            }}>
              {profile?.fullName?.charAt(0) || 'U'}
            </div>
          )}
          <div>
            <h2 style={{ 
              ...DASHBOARD_STYLES.welcomeTitle, 
              marginBottom: 'max(5px, 0.5vw)',
              fontSize: 'clamp(1.5rem, 4vw, 2.2rem)'
            }}>
              Welcome back, {profile?.fullName || 'User'}! 
            </h2>
            <p style={{ 
              fontSize: 'clamp(0.9rem, 2vw, 1rem)', 
              color: COLORS.softtext,
              marginBottom: 'max(5px, 0.5vw)',
              lineHeight: '1.4'
            }}>
              <span style={{ color: COLORS.primary, fontWeight: '600' }}>Last login:</span> Today at {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </p>
          </div>
        </div>
        <p style={{ 
          ...DASHBOARD_STYLES.welcomeSubtitle,
          fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
          lineHeight: '1.6',
          maxWidth: 'min(800px, 90%)'
        }}>
          Your health is our priority. Access quality healthcare services instantly with QuickMed's comprehensive platform.
        </p>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'max(15px, 1.5vw)',
          marginTop: 'max(20px, 2vw)',
          flexWrap: 'wrap'
        }}>
          <div style={{
            backgroundColor: `${COLORS.mint}20`,
            padding: 'max(10px, 1vw) max(20px, 2vw)',
            borderRadius: '25px',
            display: 'flex',
            alignItems: 'center',
            gap: 'max(8px, 0.8vw)',
            flex: '1 1 min(200px, 100%)'
          }}>
            <span style={{ color: COLORS.primary, fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}>📅</span>
            <span style={{ 
              fontWeight: '500', 
              color: COLORS.darktext,
              fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)'
            }}>
              {appointments.length} Active Appointments
            </span>
          </div>
          <div style={{
            backgroundColor: `${COLORS.mint}20`,
            padding: 'max(10px, 1vw) max(20px, 2vw)',
            borderRadius: '25px',
            display: 'flex',
            alignItems: 'center',
            gap: 'max(8px, 0.8vw)',
            flex: '1 1 min(200px, 100%)'
          }}>
            <span style={{ color: COLORS.primary, fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}>📦</span>
            <span style={{ 
              fontWeight: '500', 
              color: COLORS.darktext,
              fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)'
            }}>
              {orders.filter(o => o.status !== 'Delivered').length} Pending Orders
            </span>
          </div>
          <div style={{
            backgroundColor: `${COLORS.mint}20`,
            padding: 'max(10px, 1vw) max(20px, 2vw)',
            borderRadius: '25px',
            display: 'flex',
            alignItems: 'center',
            gap: 'max(8px, 0.8vw)',
            flex: '1 1 min(200px, 100%)'
          }}>
              <span style={{ color: COLORS.primary, fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}>🛒</span>
            <span style={{ 
              fontWeight: '500', 
              color: COLORS.darktext,
              fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)'
            }}>
              {getTotalItems()} Items in Cart
            </span>
          </div>
          <div style={{
            backgroundColor: `${COLORS.mint}20`,
            padding: 'max(10px, 1vw) max(20px, 2vw)',
            borderRadius: '25px',
            display: 'flex',
            alignItems: 'center',
            gap: 'max(8px, 0.8vw)',
            flex: '1 1 min(200px, 100%)'
          }}>
            <span style={{ color: COLORS.primary, fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}>⭐</span>
            <span style={{ 
              fontWeight: '500', 
              color: COLORS.darktext,
              fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)'
            }}>
              Explore Premium Subscriptions
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div style={DASHBOARD_STYLES.mainContent}>
        <div style={DASHBOARD_STYLES.serviceGrid}>
          {SERVICES.map(service => (
            <div
              key={service.view}
              style={{
                ...DASHBOARD_STYLES.serviceCard,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              // Card container has no onClick handler - only hover effects
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = `0 8px 25px ${COLORS.primary}15`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={DASHBOARD_STYLES.serviceIcon}>{service.icon}</div>
                <h3 style={DASHBOARD_STYLES.serviceTitle}>{service.title}</h3>
                <p style={DASHBOARD_STYLES.serviceDescription}>{service.desc}</p>
              </div>
              <button
                style={{
                  ...DASHBOARD_STYLES.serviceButton,
                  marginTop: 'auto',
                  width: '100%',
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#00897B'}
                onMouseLeave={(e) => e.target.style.backgroundColor = COLORS.primary}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleNavigation(service.view);
                }}
              >
                {getButtonText(service.title)}
              </button>
            </div>
          ))}
        </div>
        
        {/* Subscription Plans Section */}
        <SubscriptionSection />
        
        <section style={{ 
          backgroundColor: COLORS.white, 
          borderRadius: '15px', 
          padding: 'max(30px, 3vw) max(25px, 2.5vw)', 
          marginBottom: 'max(30px, 3vw)',
          boxSizing: 'border-box'
        }}>
          <h2 style={{ 
            fontSize: 'clamp(1.4rem, 3.5vw, 2rem)', 
            fontWeight: 'bold', 
            color: COLORS.primary, 
            marginBottom: 'max(25px, 2.5vw)', 
            textAlign: 'center',
            lineHeight: '1.3'
          }}>
            Healthcare Information & Guidelines
          </h2>
          <div style={DASHBOARD_STYLES.infoGrid}>
            {[
              { 
                icon: '💊',
                title: 'Medicine Safety Guidelines', 
                content: ['Always follow prescription instructions', 'Check expiry dates before consumption', 'Store medicines in proper conditions', 'Avoid self-medication without consultation'] 
              },
              { 
                icon: '👨‍⚕️',
                title: 'Online Consultation Benefits', 
                content: ['Time-saving with no travel required', 'Access specialists from anywhere', 'Private and confidential consultations', 'Easy follow-up appointments'] 
              },
              { 
                icon: '🚨',
                title: 'Emergency Preparedness', 
                content: ['Contact emergency services immediately (108)', 'Maintain a well-stocked first aid kit', 'Keep emergency medical contacts ready', 'Have medical records easily accessible'] 
              }
            ].map(info => (
              <div key={info.title} style={DASHBOARD_STYLES.infoCard}>
                <h3 style={{ 
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.2rem)', 
                  fontWeight: 'bold', 
                  color: COLORS.primary, 
                  marginBottom: 'max(15px, 1.5vw)',
                  lineHeight: '1.3'
                }}>
                  <span>{info.icon}</span> {info.title}
                </h3>
                <ul style={{ paddingLeft: '15px', margin: '12px 0' }}>
                  {info.content.map(item => (
                    <li key={item} style={{ 
                      marginBottom: 'max(6px, 0.6vw)', 
                      fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
                      lineHeight: '1.5',
                      color: COLORS.darktext
                    }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );

  const appointmentProps = {
    appointments,
    appointmentFilter,
    setAppointmentFilter,
    doctors: DOCTORS,
    specialties,
    allTimeSlots,
    doctorSearchQuery,
    setDoctorSearchQuery,
    selectedSpecialty,
    setSelectedSpecialty,
    selectedTimeSlot,
    setSelectedTimeSlot,
    selectedExperience,
    setSelectedExperience,
    selectedLanguage,
    setSelectedLanguage,
    filteredDoctors,
    handleBookAppointment,
    startDoctorChat,
    viewAppointmentDetails,
    setActiveView: safeSetActiveView,
    colors: COLORS
  };

  const modalProps = {
    showProfilePhotoModal,
    showDoctorChat: false,
    showCheckoutConfirm,
    showPrescriptionModal,
    showLogoutConfirm,
    showPharmacyStore,
    showAppointmentDetails: false,
    activeDoctorChat: null,
    doctorChats,
    selectedPharmacy,
    selectedAppointment: null,
    prescriptionFile,
    prescriptionPreview,
    profilePhotoFile,
    profilePhotoPreview,
    profile,
    cart,
    getTotalPrice,
    paymentLoading,
    getFilteredPharmacyMedicines,
    pharmacySearchQueries,
    handlePharmacySearch,
    addToCartFromPharmacy,
    updateQuantity,
    sendDoctorMessage,
    handlePrescriptionUpload,
    handlePrescriptionSubmit,
    handleConfirmCheckout,
    handleCancelCheckout,
    confirmLogout,
    cancelLogout,
    handleProfilePhotoSubmit,
    removeProfilePhoto,
    handleProfilePhotoUpload,
    setShowProfilePhotoModal,
    setShowDoctorChat: () => {},
    setShowCheckoutConfirm,
    setShowPrescriptionModal,
    setShowLogoutConfirm,
    setShowPharmacyStore,
    setShowAppointmentDetails: () => {},
    setActiveView: safeSetActiveView,
    colors: COLORS
  };

  // FIXED: Add null check for trackingOrder when passing to LiveTrackingView
  const getSafeTrackingOrder = () => {
    if (!trackingOrder) {
      // Return a safe default order if trackingOrder is null
      return {
        id: 'ORD000',
        date: new Date().toISOString().split('T')[0],
        items: [],
        total: 0,
        subtotal: 0,
        tip: 0,
        status: 'No active tracking',
        trackingAvailable: false
      };
    }
    return trackingOrder;
  };

  return (
    <ErrorBoundary>
      <div style={DASHBOARD_STYLES.container}>
        <Header
          activeView={activeView}
          setActiveView={safeSetActiveView}
          cart={cart}
          getTotalItems={getTotalItems}
          notifications={notifications}
          markAsRead={markAsRead}
          markAllAsRead={markAllAsRead}
          getUnreadCount={getUnreadCount}
          handleNotificationsClick={() => setShowNotifications(!showNotifications)}
          toggleProfileDropdown={() => setShowProfileDropdown(prev => !prev)}
          showProfileDropdown={showProfileDropdown}
          setShowProfileDropdown={setShowProfileDropdown}
          handleLogoutClick={() => setShowLogoutConfirm(true)}
          notificationRef={notificationRef}
          profileRef={profileRef}
          profilePhotoInputRef={profilePhotoInputRef}
          handleProfilePhotoUpload={handleProfilePhotoUpload}
          triggerProfilePhotoUpload={triggerProfilePhotoUpload}
          profile={profile}
          colors={COLORS}
        />
        {showNotifications && (
          <NotificationsPage
            showNotifications={showNotifications}
            notifications={notifications}
            onClose={() => setShowNotifications(false)}
            onViewAll={() => {
              setShowNotifications(false);
              setShowFullNotifications(true);
            }}
            markAsRead={markAsRead}
            markAllAsRead={markAllAsRead}
            deleteNotification={deleteNotification}
            onNotificationsChange={setNotifications}
            colors={COLORS}
          />
        )}
        {showFullNotifications && (
          <FullNotificationsPage
            notifications={notifications}
            onBack={() => setShowFullNotifications(false)}
            markAsRead={markAsRead}
            markAllAsRead={markAllAsRead}
            deleteNotification={deleteNotification}
            deleteAllNotifications={deleteAllNotifications}
            onNotificationsChange={setNotifications}
            colors={COLORS}
          />
        )}
        <AIChatbotWidget
          showChatbot={showChatbot}
          toggleChatbot={() => setShowChatbot(!showChatbot)}
          chatMessages={chatMessages}
          userMessage={userMessage}
          handleUserMessage={(e) => setUserMessage(e.target.value)}
          sendMessage={sendMessage}
          handleKeyPress={handleKeyPress}
          chatInputRef={chatInputRef}
          chatMessagesEndRef={chatMessagesEndRef}
          colors={COLORS}
        />
        <Modals {...modalProps} />
        
        {/* Phone Confirmation Modal - FIXED VERSION */}
        <PhoneConfirmationModal />
        
        {/* Render the correct view based on activeView */}
        {activeView === 'dashboard' && <DashboardView />}
        {activeView === 'profile' && (
          <ProfileView
            triggerProfilePhotoUpload={triggerProfilePhotoUpload}
            removeProfilePhoto={removeProfilePhoto}
            userProfile={profile}
            updateProfile={updateProfile}
            setActiveView={safeSetActiveView}
            colors={COLORS}
          />
        )}
        {activeView === 'appointments' && (
          <AppointmentsView
            {...appointmentProps}
            setActiveView={safeSetActiveView}
            colors={COLORS}
          />
        )}
        {activeView === 'orders' && (
          <OrdersView
            orders={orders}
            filteredOrders={filteredOrders}
            startLiveTracking={startLiveTracking}
            orderFilter={orderFilter}
            setOrderFilter={setOrderFilter}
            setActiveView={safeSetActiveView}
            colors={COLORS}
          />
        )}
        {activeView === 'medicine' && (
          <MedicineView
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
             medicines={medicines}
            filteredMedicines={filteredMedicines}
            cart={cart}
            addToCart={addToCart}
            updateQuantity={updateQuantity}
            pharmacies={PHARMACIES}
            viewPharmacyStore={viewPharmacyStore}
            handlePrescriptionUpload={handlePrescriptionUpload}
            setActiveView={safeSetActiveView}
            colors={COLORS}
          />
        )}
        
        {activeView === 'products' && (
          <Products
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            cart={cart}
            addToCart={addToCart}
            updateQuantity={updateQuantity}
            setActiveView={safeSetActiveView}
            colors={COLORS}
          />
        )}
        {activeView === 'cart' && (
          <CartView
            cart={cart}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            getTotalPrice={getTotalPrice}
            handleCheckoutConfirmation={handleCheckoutConfirmation}
            paymentLoading={paymentLoading}
            setActiveView={safeSetActiveView}
            colors={COLORS}
          />
        )}
        {activeView === 'consultation' && (
          <ConsultationView
            {...appointmentProps}
            setActiveView={safeSetActiveView}
            profile={profile}
            addNotification={addNotification}
            handleBookAppointment={handleBookAppointment}
            colors={COLORS}
          />
        )}
        {activeView === 'live-tracking' && (
          <LiveTrackingView
            trackingOrder={getSafeTrackingOrder()} // FIXED: Use safe tracking order
            deliveryPartner={deliveryPartner}
            callDeliveryPartner={callDeliveryPartner}
            getDeliveryProgress={getDeliveryProgress}
            getDeliveryStatusText={getDeliveryStatusText}
            setActiveView={safeSetActiveView}
            colors={COLORS}
          />
        )}
        {activeView === 'notifications' && (
          <FullNotificationsPage
            notifications={notifications}
            onBack={() => safeSetActiveView('dashboard')}
            markAsRead={markAsRead}
            markAllAsRead={markAllAsRead}
            deleteNotification={deleteNotification}
            deleteAllNotifications={deleteAllNotifications}
            onNotificationsChange={setNotifications}
            colors={COLORS}
          />
        )}
        {activeView === 'pregnancy-care' && (
          <PregnancyCareView
            user={profile}
            addNotification={addNotification}
            setActiveView={safeSetActiveView}
            userSubscriptions={userSubscriptions}
            isSubscribed={isSubscribed('pregnancyCare')}
            handleSubscribe={handleSubscribe}
            handleUpgradeSubscription={handleUpgradeSubscription}
            paymentLoading={paymentLoading}
            showSubscriptionModal={false} // REMOVED: No subscription modal
            setShowSubscriptionModal={() => {}} // REMOVED: No subscription modal
            selectedSubscription={selectedSubscription}
            setSelectedSubscription={setSelectedSubscription}
            showUpgradeModal={showUpgradeModal}
            setShowUpgradeModal={setShowUpgradeModal}
            selectedUpgradePlan={selectedUpgradePlan}
            setSelectedUpgradePlan={setSelectedUpgradePlan}
            colors={COLORS}
          />
        )}
        {activeView === 'lab-tests' && (
          <LabTestsView
            setActiveView={safeSetActiveView}
            addNotification={addNotification}
            colors={COLORS}
          />
        )}
        {activeView === 'health-records' && (
          <HealthRecordsView
            setActiveView={safeSetActiveView}
            healthRecords={healthRecords}
            addHealthRecord={addHealthRecord}
            colors={COLORS}
          />
        )}
        {activeView === 'blood-bank' && (
          <BloodBankView
            setActiveView={safeSetActiveView}
            addNotification={addNotification}
            colors={COLORS}
          />
        )}
        {activeView === 'baby-care' && (
          <BabyCareView
            setActiveView={safeSetActiveView}
            addNotification={addNotification}
            colors={COLORS}
          />
        )}
        {activeView === 'vehicle-dashboard' && (
          <VehicleDashboard
            setActiveView={safeSetActiveView}
            addNotification={addNotification}
            colors={COLORS}
          />
        )}
      </div>
    </ErrorBoundary>
  );
};

const UserDashboard = ({ user, onLogout, onWriteReview }) => (
  <ProfileProvider user={user}>
    <UserDashboardContent user={user} onLogout={onLogout} onWriteReview={onWriteReview} />
  </ProfileProvider>
);

export default UserDashboard;