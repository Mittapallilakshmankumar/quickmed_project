// LabTestsView.js - Complete Version with Razorpay Integration
import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';

const LabTestsView = ({ setActiveView, addNotification, profile }) => {
  const [activeTab, setActiveTab] = useState('book');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFamilyMember, setSelectedFamilyMember] = useState('self');
  const [selectedLab, setSelectedLab] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [liveTracking, setLiveTracking] = useState(false);
  const [estimatedArrival, setEstimatedArrival] = useState(15);
  const [reportProgress, setReportProgress] = useState(0);
  const [downloadingReport, setDownloadingReport] = useState(null);
  const [selectedTests, setSelectedTests] = useState([]);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [showPhoneConfirm, setShowPhoneConfirm] = useState(false);
  const [tempPhone, setTempPhone] = useState(profile?.phone || '');
  const [checkoutData, setCheckoutData] = useState(null);
  
  const searchInputRef = useRef(null);
  
  const [bookingHistory, setBookingHistory] = useState([
    {
      id: 'LAB001',
      tests: ['Complete Blood Count', 'Liver Function Test'],
      lab: 'Metropolis Laboratory',
      date: '2024-01-15',
      time: '08:00 AM',
      status: 'Completed',
      results: 'Available',
      amount: 1200,
      familyMember: 'Self',
      phlebotomist: 'Dr. Ramesh Kumar',
      trackingId: 'TRK001',
      sampleCollectionTime: '08:15 AM',
      reportReadyTime: '2024-01-16 10:30 AM',
      reportData: {
        patientName: 'John Doe',
        age: 28,
        gender: 'Male',
        referenceNo: 'LAB001',
        collectedDate: '2024-01-15',
        reportedDate: '2024-01-16',
        tests: [
          {
            name: 'Complete Blood Count (CBC)',
            results: [
              { parameter: 'Hemoglobin', value: '14.2', unit: 'g/dL', normalRange: '13.5-17.5', status: 'normal' },
              { parameter: 'RBC Count', value: '4.8', unit: 'million/µL', normalRange: '4.5-5.5', status: 'normal' },
              { parameter: 'WBC Count', value: '7.2', unit: 'thousand/µL', normalRange: '4.0-11.0', status: 'normal' },
              { parameter: 'Platelet Count', value: '250', unit: 'thousand/µL', normalRange: '150-400', status: 'normal' },
              { parameter: 'Hematocrit', value: '42', unit: '%', normalRange: '40-50', status: 'normal' }
            ]
          },
          {
            name: 'Liver Function Test (LFT)',
            results: [
              { parameter: 'SGOT (AST)', value: '22', unit: 'U/L', normalRange: '0-40', status: 'normal' },
              { parameter: 'SGPT (ALT)', value: '25', unit: 'U/L', normalRange: '0-41', status: 'normal' },
              { parameter: 'Alkaline Phosphatase', value: '85', unit: 'U/L', normalRange: '44-147', status: 'normal' },
              { parameter: 'Total Bilirubin', value: '0.8', unit: 'mg/dL', normalRange: '0.2-1.2', status: 'normal' },
              { parameter: 'Direct Bilirubin', value: '0.2', unit: 'mg/dL', normalRange: '0.0-0.3', status: 'normal' }
            ]
          }
        ],
        labDetails: {
          name: 'Metropolis Laboratory',
          address: '123 Health Street, Medical Complex, Bangalore',
          accreditation: 'NABL, CAP Certified',
          labDirector: 'Dr. Rajesh Verma',
          phone: '+91 80 2345 6789',
          email: 'reports@metropolisindia.com'
        },
        interpretation: 'All parameters are within normal limits. No significant abnormalities detected.',
        recommendations: [
          'Maintain healthy lifestyle with regular exercise',
          'Continue with balanced diet rich in fruits and vegetables',
          'Follow up annually for routine health checkup'
        ]
      }
    },
    {
      id: 'LAB002',
      tests: ['Thyroid Profile', 'Vitamin D'],
      lab: 'Thyrocare',
      date: '2024-01-20',
      time: '10:30 AM',
      status: 'Sample Collected',
      results: 'Testing in Progress',
      amount: 1500,
      familyMember: 'Mother',
      phlebotomist: 'Dr. Priya Sharma',
      trackingId: 'TRK002',
      sampleCollectionTime: '10:45 AM',
      reportProgress: 60
    }
  ]);

  // SVG Icons
  const Icons = {
    Book: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
        <line x1="8" y1="6" x2="16" y2="6"/>
        <line x1="8" y1="10" x2="16" y2="10"/>
        <line x1="8" y1="14" x2="12" y2="14"/>
      </svg>
    ),
    History: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    Labs: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    Search: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
    Blood: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
        <path d="M8 12h8"/>
      </svg>
    ),
    Hormone: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12" y2="16"/>
      </svg>
    ),
    Organ: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF9800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
        <path d="M8 12h8"/>
      </svg>
    ),
    Metabolic: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9C27B0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20"/>
        <path d="M2 12h20"/>
        <circle cx="12" cy="12" r="4"/>
      </svg>
    ),
    Vitamin: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    Cardiac: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F44336" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    Routine: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#607D8B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    AllTests: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#009688" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    Popular: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    Time: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    Fasting: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    Add: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="16"/>
        <line x1="8" y1="12" x2="16" y2="12"/>
      </svg>
    ),
    Check: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
    User: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
    Hospital: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    Calendar: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    Payment: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
        <line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
    ),
    Track: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3"/>
        <circle cx="6" cy="12" r="3"/>
        <circle cx="18" cy="19" r="3"/>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
      </svg>
    ),
    Download: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
    ),
    View: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    Location: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    Star: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    Clock: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    Phone: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    Map: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
        <line x1="8" y1="2" x2="8" y2="18"/>
        <line x1="16" y1="6" x2="16" y2="22"/>
      </svg>
    ),
    Progress: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    Back: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"/>
        <polyline points="12 19 5 12 12 5"/>
      </svg>
    )
  };

  // Static data
  const familyMembers = [
    { id: 'self', name: 'Self', relation: 'Self', age: 28 },
    { id: 'father', name: 'Rajesh Kumar', relation: 'Father', age: 58 },
    { id: 'mother', name: 'Sita Devi', relation: 'Mother', age: 55 },
    { id: 'spouse', name: 'Priya Sharma', relation: 'Spouse', age: 27 },
    { id: 'child', name: 'Aarav Kumar', relation: 'Son', age: 4 }
  ];

  const labTests = [
    {
      id: 1,
      name: 'Complete Blood Count (CBC)',
      category: 'blood',
      price: 400,
      fasting: 'Not Required',
      reportTime: '6 hours',
      description: 'Measures different components of blood including red cells, white cells, and platelets. Essential for overall health screening.',
      popular: true,
      image: 'https://arthdiagnostics.com/wp-content/uploads/2024/11/CBC-Test-in-Udaipur-350x250.jpg',
      recommendedFor: ['Anemia screening', 'Infection detection', 'General health checkup'],
      preparation: 'No special preparation required'
    },
    {
      id: 2,
      name: 'Thyroid Profile (TSH, T3, T4)',
      category: 'hormone',
      price: 600,
      fasting: 'Fasting Required',
      reportTime: '24 hours',
      description: 'Comprehensive thyroid function test including T3, T4, and TSH levels. Detects hyper/hypothyroidism.',
      popular: true,
      image: 'https://cdn1.healthians.com/blog/wp-content/uploads/2021/02/74.jpg',
      recommendedFor: ['Weight changes', 'Fatigue', 'Mood swings'],
      preparation: '8-12 hours fasting recommended'
    },
    {
      id: 3,
      name: 'Liver Function Test (LFT)',
      category: 'organ',
      price: 800,
      fasting: 'Fasting Required',
      reportTime: '12 hours',
      description: 'Assesses liver health by measuring enzymes, proteins, and bilirubin. Detects liver damage.',
      popular: false,
      image: 'https://www.shutterstock.com/shutterstock/photos/2587246243/display_1500/stock-vector-liver-function-tests-are-blood-tests-that-measure-different-substances-produced-by-your-liver-2587246243.jpg',
      recommendedFor: ['Alcohol consumption', 'Medication monitoring', 'Jaundice'],
      preparation: '10-12 hours fasting required'
    },
    {
      id: 4,
      name: 'Kidney Function Test (KFT)',
      category: 'organ',
      price: 700,
      fasting: 'Fasting Required',
      reportTime: '12 hours',
      description: 'Evaluates kidney function through creatinine, urea, and electrolyte levels.',
      popular: false,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbJFQMnDD62kh4AoSPYL77bqBJRnTqGLpM1g&s',
      recommendedFor: ['High BP patients', 'Diabetes patients', 'Swelling in legs'],
      preparation: '10-12 hours fasting required'
    },
    {
      id: 5,
      name: 'Diabetes Screening (HbA1c + Fasting)',
      category: 'metabolic',
      price: 300,
      fasting: 'Fasting Required',
      reportTime: '24 hours',
      description: 'Comprehensive diabetes screening including HbA1c and fasting blood glucose.',
      popular: true,
      image: 'https://www.metropolisindia.com/upgrade/blog/upload/2020/12/hba1c-checkup-importance-Metropolis-Healthcare.jpg',
      recommendedFor: ['Family history of diabetes', 'Frequent urination', 'Increased thirst'],
      preparation: '8-10 hours fasting required'
    },
    {
      id: 6,
      name: 'Vitamin D (25-OH) Test',
      category: 'vitamin',
      price: 900,
      fasting: 'Not Required',
      reportTime: '48 hours',
      description: 'Measures Vitamin D levels essential for bone health, immunity and mood regulation.',
      popular: true,
      image: 'https://images.apollo247.in/pd-cms/cms/inline-images/Vitamin-D-Test-Details_0.jpg',
      recommendedFor: ['Bone pain', 'Fatigue', 'Weak immunity'],
      preparation: 'No special preparation'
    },
    {
      id: 7,
      name: 'Lipid Profile',
      category: 'cardiac',
      price: 500,
      fasting: 'Fasting Required',
      reportTime: '12 hours',
      description: 'Complete cholesterol check including HDL, LDL, triglycerides and total cholesterol.',
      popular: true,
      image: 'https://karaulidiagnostics.com/wp-content/uploads/2024/08/1613636799_Lipid_big_450.jpg',
      recommendedFor: ['Heart health check', 'High cholesterol', 'Family history'],
      preparation: '12-14 hours fasting required'
    },
    {
      id: 8,
      name: 'Complete Urine Examination',
      category: 'routine',
      price: 200,
      fasting: 'Not Required',
      reportTime: '4 hours',
      description: 'Complete urine analysis for kidney function, diabetes and urinary tract infections.',
      popular: false,
      image: 'https://images.apollo247.in/pd-cms/cms/inline-images/Urine-Routine-Test-Details_0.jpg',
      recommendedFor: ['UTI symptoms', 'Kidney issues', 'Routine checkup'],
      preparation: 'First morning sample preferred'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Tests', icon: 'AllTests', color: '#009688', count: 8 },
    { id: 'blood', name: 'Blood Tests', icon: 'Blood', color: '#FF6B6B', count: 4 },
    { id: 'hormone', name: 'Hormone Tests', icon: 'Hormone', color: '#4CAF50', count: 1 },
    { id: 'organ', name: 'Organ Function', icon: 'Organ', color: '#FF9800', count: 2 },
    { id: 'metabolic', name: 'Metabolic', icon: 'Metabolic', color: '#9C27B0', count: 1 },
    { id: 'vitamin', name: 'Vitamin Tests', icon: 'Vitamin', color: '#00BCD4', count: 1 },
    { id: 'cardiac', name: 'Cardiac', icon: 'Cardiac', color: '#F44336', count: 1 },
    { id: 'routine', name: 'Routine', icon: 'Routine', color: '#607D8B', count: 1 }
  ];

  const labs = [
    {
      id: 1,
      name: 'Metropolis Laboratory',
      rating: 4.5,
      distance: '1.2 km',
      sampleCollection: 'Home Service Available',
      timing: '6:00 AM - 10:00 PM',
      image: 'https://www.metropolisindia.com/newdata/images/labs/mumbai/mumbai_lab_1.jpg',
      address: '123 Health Street, Medical Complex',
      homeCollectionFee: 99,
      labVisitDiscount: 10,
      phlebotomists: 5,
      averageWaitTime: '10-15 mins',
      accreditation: 'NABL, CAP'
    },
    {
      id: 2,
      name: 'Thyrocare',
      rating: 4.3,
      distance: '2.1 km',
      sampleCollection: 'Home & Lab Service',
      timing: '7:00 AM - 9:00 PM',
      image: 'https://inc42.com/cdn-cgi/image/quality=75/https://asset.inc42.com/2021/07/thyrocare-pharmeasy-cci-featured.jpg',
      address: '456 Diagnostic Road, Health Hub',
      homeCollectionFee: 149,
      labVisitDiscount: 15,
      phlebotomists: 8,
      averageWaitTime: '15-20 mins',
      accreditation: 'NABL, ISO'
    },
    {
      id: 3,
      name: 'Lal Path Labs',
      rating: 4.6,
      distance: '1.8 km',
      sampleCollection: 'Home Service Available',
      timing: '6:30 AM - 8:00 PM',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQox6Z8_GalcucXC5ZbcUlmFNkiolSc-J0r5A&s',
      address: '789 Wellness Avenue',
      homeCollectionFee: 129,
      labVisitDiscount: 20,
      phlebotomists: 6,
      averageWaitTime: '5-10 mins',
      accreditation: 'NABL, NABH'
    }
  ];

  const timeSlots = [
    { id: 1, time: '08:00 AM - 09:00 AM', available: true },
    { id: 2, time: '09:00 AM - 10:00 AM', available: true },
    { id: 3, time: '10:00 AM - 11:00 AM', available: false },
    { id: 4, time: '11:00 AM - 12:00 PM', available: true },
    { id: 5, time: '12:00 PM - 01:00 PM', available: true },
    { id: 6, time: '02:00 PM - 03:00 PM', available: true },
    { id: 7, time: '04:00 PM - 05:00 PM', available: true },
    { id: 8, time: '06:00 PM - 07:00 PM', available: true }
  ];

  // Get selected family member data
  const selectedFamilyMemberData = useMemo(() => {
    return familyMembers.find(m => m.id === selectedFamilyMember);
  }, [selectedFamilyMember]);

  // Calculate total price
  const totalPrice = useMemo(() => {
    const testsTotal = selectedTests.reduce((total, item) => total + item.price, 0);
    const homeCollectionFee = selectedLab?.homeCollectionFee || 0;
    return testsTotal + homeCollectionFee;
  }, [selectedTests, selectedLab]);

  // Filter tests
  const filteredTests = useMemo(() => {
    return labTests.filter(test => {
      const matchesSearch = test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           test.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || test.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

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

  // Load Razorpay script
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

  // Phone Confirmation Modal Component
  const PhoneConfirmationModal = () => {
    if (!showPhoneConfirm) return null;

    const handlePhoneConfirmClick = () => {
      if (tempPhone.length !== 10) {
        alert('Please enter a valid 10-digit mobile number');
        return;
      }
      
      // Close the modal
      setShowPhoneConfirm(false);
      
      // Proceed with payment using confirmed phone number
      if (checkoutData) {
        proceedWithPayment(checkoutData, tempPhone);
      }
      
      // Reset state
      setCheckoutData(null);
      setTempPhone(profile?.phone || '');
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
          backgroundColor: '#FFFFFF',
          borderRadius: '15px',
          padding: 'max(30px, 3vw) max(25px, 2.5vw)',
          maxWidth: 'min(500px, 90vw)',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <h3 style={{ 
            fontSize: 'clamp(1.2rem, 3vw, 1.4rem)', 
            fontWeight: 'bold', 
            color: '#009688', 
            marginBottom: 'max(15px, 1.5vw)',
            textAlign: 'center'
          }}>
            Edit contact details
          </h3>
          
          <p style={{ 
            fontSize: 'clamp(0.9rem, 2vw, 1rem)', 
            color: '#4F6F6B', 
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
              border: `1px solid ${tempPhone.length === 10 ? '#4CAF50' : '#4DB6AC'}`,
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
                borderRight: '1px solid #4DB6AC'
              }}>
                <span style={{ 
                  fontSize: 'clamp(1rem, 2vw, 1.1rem)', 
                  color: '#124441',
                  marginRight: '8px'
                }}>+91</span>
                <span style={{ 
                  fontSize: 'clamp(0.9rem, 1.5vw, 1rem)', 
                  color: '#4F6F6B' 
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
                  color: '#124441',
                  minWidth: '0'
                }}
                maxLength={10}
                autoFocus
              />
            </div>
            
            <div style={{ 
              fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)', 
              color: '#4F6F6B',
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
                setCheckoutData(null);
                setTempPhone('');
                setPaymentLoading(false);
              }}
              style={{
                backgroundColor: 'transparent',
                color: '#4F6F6B',
                border: '1px solid #4DB6AC',
                padding: 'max(12px, 1.2vw) max(24px, 2.4vw)',
                borderRadius: '25px',
                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                cursor: 'pointer',
                flex: 1,
                transition: 'all 0.3s ease',
                minWidth: '120px'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#E0F2F1';
                e.target.style.borderColor = '#009688';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.borderColor = '#4DB6AC';
              }}
            >
              Cancel
            </button>
            
            <button
              onClick={handlePhoneConfirmClick}
              disabled={tempPhone.length !== 10}
              style={{
                backgroundColor: tempPhone.length === 10 ? '#009688' : '#ccc',
                color: '#FFFFFF',
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
                  e.target.style.backgroundColor = '#009688';
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

  // Generate dummy PDF report
  const generateReportPDF = (booking) => {
    if (!booking.reportData) return null;
    
    const { patientName, age, gender, referenceNo, collectedDate, reportedDate, tests, labDetails, interpretation, recommendations } = booking.reportData;
    
    const reportContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          .header { text-align: center; border-bottom: 2px solid #009688; padding-bottom: 20px; margin-bottom: 30px; }
          .header h1 { color: #009688; margin: 0; }
          .header h2 { color: #4F6F6B; margin: 10px 0; }
          .patient-info { background: #f5f5f5; padding: 20px; border-radius: 10px; margin-bottom: 30px; }
          .info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
          .info-item { margin: 5px 0; }
          .test-section { margin: 30px 0; }
          .test-header { background: #009688; color: white; padding: 10px; border-radius: 5px 5px 0 0; }
          .test-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          .test-table th, .test-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
          .test-table th { background: #f5f5f5; }
          .normal { color: #4CAF50; }
          .abnormal { color: #F44336; }
          .lab-info { background: #E0F2F1; padding: 20px; border-radius: 10px; margin: 30px 0; }
          .footer { text-align: center; margin-top: 50px; color: #666; font-size: 12px; }
          .signature { margin-top: 50px; text-align: right; }
          .stamp { position: absolute; right: 50px; opacity: 0.8; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${labDetails.name}</h1>
          <h2>Laboratory Test Report</h2>
          <p>${labDetails.accreditation}</p>
        </div>
        
        <div class="patient-info">
          <div class="info-grid">
            <div class="info-item"><strong>Patient Name:</strong> ${patientName}</div>
            <div class="info-item"><strong>Age/Gender:</strong> ${age} years / ${gender}</div>
            <div class="info-item"><strong>Reference No:</strong> ${referenceNo}</div>
            <div class="info-item"><strong>Report Date:</strong> ${reportedDate}</div>
            <div class="info-item"><strong>Collected Date:</strong> ${collectedDate}</div>
            <div class="info-item"><strong>Sample Type:</strong> Blood</div>
          </div>
        </div>
        
        ${tests.map(test => `
          <div class="test-section">
            <div class="test-header">
              <h3 style="margin: 0;">${test.name}</h3>
            </div>
            <table class="test-table">
              <thead>
                <tr>
                  <th>Test Parameter</th>
                  <th>Result</th>
                  <th>Unit</th>
                  <th>Reference Range</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${test.results.map(result => `
                  <tr>
                    <td>${result.parameter}</td>
                    <td>${result.value}</td>
                    <td>${result.unit}</td>
                    <td>${result.normalRange}</td>
                    <td class="${result.status}">${result.status === 'normal' ? 'Normal ✓' : 'Abnormal ✗'}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `).join('')}
        
        <div class="lab-info">
          <h3>Laboratory Details</h3>
          <p><strong>Lab:</strong> ${labDetails.name}</p>
          <p><strong>Address:</strong> ${labDetails.address}</p>
          <p><strong>Phone:</strong> ${labDetails.phone}</p>
          <p><strong>Email:</strong> ${labDetails.email}</p>
          <p><strong>Lab Director:</strong> ${labDetails.labDirector}</p>
        </div>
        
        <div>
          <h3>Interpretation</h3>
          <p>${interpretation}</p>
        </div>
        
        <div>
          <h3>Recommendations</h3>
          <ul>
            ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
          </ul>
        </div>
        
        <div class="signature">
          <p><strong>Authorized Signatory</strong></p>
          <p>${labDetails.labDirector}</p>
          <p>Lab Director</p>
        </div>
        
        <div class="footer">
          <p>This is a digitally signed report. No physical signature required.</p>
          <p>Report generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
          <p>Confidential - For patient use only</p>
        </div>
      </body>
      </html>
    `;
    
    return reportContent;
  };

  // Download report with progress simulation
  const downloadReport = useCallback(async (bookingId) => {
    const booking = bookingHistory.find(b => b.id === bookingId);
    if (!booking || booking.results !== 'Available') return;
    
    setDownloadingReport(bookingId);
    
    try {
      // Simulate download progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      // Generate PDF content
      const pdfContent = generateReportPDF(booking);
      
      // Create Blob and download
      const blob = new Blob([pdfContent], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Lab_Report_${booking.id}_${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      addNotification('Report Downloaded', `${booking.tests[0]} report downloaded successfully`, 'lab');
    } catch (error) {
      console.error('Error downloading report:', error);
      addNotification('Download Failed', 'Failed to download report. Please try again.', 'error');
    } finally {
      setDownloadingReport(null);
    }
  }, [bookingHistory, addNotification]);

  // Show phone confirmation modal
  const showPhoneConfirmation = (checkoutData) => {
    setCheckoutData(checkoutData);
    setTempPhone(profile?.phone || '');
    setShowPhoneConfirm(true);
  };

  // Proceed with payment after phone confirmation
  const proceedWithPayment = async (checkoutData, phoneNumber) => {
    setPaymentLoading(true);

    try {
      const options = {
        key: 'rzp_test_1DP5mmOlF5G5ag',
        amount: checkoutData.amount * 100,
        currency: 'INR',
        name: 'QuickMed Lab Services',
        description: `Lab Tests for ${selectedFamilyMemberData?.name || 'Self'}`,
        handler: (response) => handlePaymentSuccess(response, checkoutData),
        prefill: {
          name: selectedFamilyMemberData?.name || 'Patient',
          email: profile?.email || 'patient@example.com',
          contact: phoneNumber  // Use confirmed phone number
        },
        theme: { color: '#009688' },
        modal: {
          ondismiss: () => {
            setPaymentLoading(false);
            addNotification('Payment Cancelled', 'Your payment was cancelled.', 'alert');
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

  // Main payment function with phone confirmation
  const processPayment = useCallback(async () => {
    if (selectedTests.length === 0) {
      alert('Please select tests to book first');
      return;
    }

    if (!razorpayLoaded) {
      addNotification('Payment Error', 'Payment service is loading. Please try again.', 'error');
      return;
    }

    // Prepare checkout data
    const checkoutData = {
      amount: totalPrice,
      tests: selectedTests,
      patient: selectedFamilyMemberData?.name || 'Self',
      lab: selectedLab?.name,
      timeSlot: selectedTimeSlot?.time
    };

    // Show phone confirmation first
    showPhoneConfirmation(checkoutData);
  }, [selectedTests, totalPrice, selectedFamilyMemberData, selectedLab, selectedTimeSlot, razorpayLoaded, addNotification]);

  // Handle payment success
  const handlePaymentSuccess = async (paymentResponse, checkoutData) => {
    try {
      // Verify payment (simulated)
      await verifyPayment(paymentResponse);
      
      // Create booking
      const newBooking = {
        id: `LAB${Date.now()}`,
        tests: selectedTests.map(item => item.name),
        lab: selectedLab?.name || 'Home Collection',
        date: new Date().toISOString().split('T')[0],
        time: selectedTimeSlot?.time || 'Morning Slot',
        status: 'Phlebotomist Assigned',
        results: 'Pending',
        amount: totalPrice,
        familyMember: selectedFamilyMemberData?.name || 'Self',
        phlebotomist: 'Dr. Ramesh Kumar',
        phone: '+91 98765 43210',
        trackingId: `TRK${Date.now()}`,
        estimatedArrival: '15 minutes',
        homeCollectionFee: selectedLab?.homeCollectionFee || 0,
        paymentId: paymentResponse.razorpay_payment_id,
        orderId: paymentResponse.razorpay_order_id,
        signature: paymentResponse.razorpay_signature,
        paymentStatus: 'Completed',
        paymentDate: new Date().toISOString()
      };
      
      // Update state
      setCurrentBooking(newBooking);
      setBookingHistory(prev => [newBooking, ...prev]);
      setSelectedTests([]);
      setSelectedLab(null);
      setSelectedTimeSlot(null);
      setBookingStep(6);
      setPaymentLoading(false);
      
      addNotification(
        'Payment Successful',
        `Your lab tests have been booked successfully! Order ID: ${newBooking.id}`,
        'success'
      );

      // Send booking details to Razorpay dashboard (simulated)
      console.log('Payment details sent to Razorpay dashboard:', {
        payment_id: paymentResponse.razorpay_payment_id,
        order_id: paymentResponse.razorpay_order_id,
        amount: totalPrice,
        currency: 'INR',
        customer: selectedFamilyMemberData?.name || 'Self',
        tests: selectedTests.map(t => t.name),
        lab: selectedLab?.name,
        time_slot: selectedTimeSlot?.time,
        status: 'captured'
      });

      // Simulate phlebotomist assignment
      setTimeout(() => {
        setCurrentBooking(prev => ({ ...prev, status: 'On the Way' }));
        addNotification('Phlebotomist En Route', 'Your phlebotomist is on the way', 'lab');
      }, 3000);

      setTimeout(() => {
        setCurrentBooking(prev => ({ ...prev, status: 'Sample Collected' }));
        addNotification('Sample Collected', 'Blood sample has been collected', 'lab');
      }, 60000);

      return true;
    } catch (error) {
      console.error('Payment verification failed:', error);
      setPaymentLoading(false);
      addNotification('Payment Failed', 'Payment verification failed. Please contact support.', 'error');
      return false;
    }
  };

  // Verify payment (simulated)
  const verifyPayment = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 2000);
    });
  };

  // Event handlers
  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleCategoryClick = useCallback((categoryId) => {
    setSelectedCategory(categoryId);
  }, []);

  const handleTabClick = useCallback((tab) => {
    setActiveTab(tab);
    if (tab === 'book') setBookingStep(1);
  }, []);

  const handleTestSelection = useCallback((test) => {
    setSelectedTests(prev => {
      const existing = prev.find(item => item.id === test.id);
      if (existing) {
        return prev.filter(item => item.id !== test.id);
      } else {
        return [...prev, test];
      }
    });
    
    const isSelected = selectedTests.some(item => item.id === test.id);
    addNotification(
      isSelected ? 'Test Removed' : 'Test Selected',
      `${test.name} ${isSelected ? 'removed from selection' : 'added for booking'}`,
      'lab'
    );
  }, [selectedTests, addNotification]);

  const handleFamilyMemberClick = useCallback((memberId) => {
    setSelectedFamilyMember(memberId);
  }, []);

  const handleLabClick = useCallback((lab) => {
    setSelectedLab(lab);
  }, []);

  const handleTimeSlotClick = useCallback((slot) => {
    if (slot.available) {
      setSelectedTimeSlot(slot);
    }
  }, []);

  const proceedToFamilySelection = useCallback(() => {
    if (selectedTests.length === 0) {
      alert('Please select tests to book first');
      return;
    }
    setBookingStep(2);
  }, [selectedTests]);

  const proceedToLabSelection = useCallback(() => {
    setBookingStep(3);
  }, []);

  const proceedToTimeSlot = useCallback(() => {
    if (!selectedLab) {
      alert('Please select a lab first');
      return;
    }
    setBookingStep(4);
  }, [selectedLab]);

  const proceedToPayment = useCallback(() => {
    if (!selectedTimeSlot) {
      alert('Please select a time slot');
      return;
    }
    setBookingStep(5);
  }, [selectedTimeSlot]);

  const viewReportDetails = useCallback((booking) => {
    setCurrentBooking(booking);
    setActiveTab('book');
    setBookingStep(6);
  }, [setActiveTab]);

  const viewFullReport = useCallback((booking) => {
    if (!booking.reportData) {
      alert('Report data not available yet');
      return;
    }
    
    const reportWindow = window.open('', '_blank', 'width=1200,height=800');
    const reportContent = generateReportPDF(booking);
    reportWindow.document.write(reportContent);
    reportWindow.document.close();
  }, []);

  const startLiveTracking = useCallback(() => {
    setLiveTracking(true);
    addNotification('Live Tracking Started', 'You can now track phlebotomist location', 'lab');
  }, [addNotification]);

  // Format numbers with commas for Indian numbering system
  const formatIndianNumber = (number) => {
    return new Intl.NumberFormat('en-IN').format(number);
  };

  // Render category icon
  const renderCategoryIcon = (iconName) => {
    const IconComponent = Icons[iconName];
    return IconComponent ? <IconComponent /> : null;
  };

  // Styles
  const styles = {
    container: {
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
      marginTop: '120px',
      minHeight: 'calc(100vh - 120px)',
      width: '100%',
      boxSizing: 'border-box',
      backgroundColor: '#E0F2F1'
    },
    headerRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
      marginTop: '40px',
      flexWrap: 'wrap',
      gap: '1rem'
    },
    titleSection: {
      textAlign: 'center',
      flex: 1,
      minWidth: '300px'
    },
    title: {
      color: '#124441',
      fontSize: '2rem',
      margin: '0 0 0.5rem 0',
      fontWeight: '700'
    },
    subtitle: {
      color: '#4F6F6B',
      margin: 0,
      fontSize: '1rem'
    },
    tabs: {
      display: 'flex',
      gap: '10px',
      marginBottom: '20px',
      flexWrap: 'wrap',
      overflowX: 'auto',
      paddingBottom: '5px'
    },
    tab: {
      padding: '12px 24px',
      borderRadius: '25px',
      border: '1px solid #4DB6AC',
      backgroundColor: '#FFFFFF',
      color: '#4F6F6B',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      whiteSpace: 'nowrap',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    activeTab: {
      backgroundColor: '#009688',
      color: '#FFFFFF',
      borderColor: '#009688'
    },
    contentCard: {
      backgroundColor: '#FFFFFF',
      borderRadius: '15px',
      padding: '25px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      marginBottom: '25px',
      border: '1px solid #4DB6AC',
      transition: 'all 0.3s ease'
    },
    searchBox: {
      width: '100%',
      padding: '15px 25px 15px 50px',
      borderRadius: '12px',
      border: '1px solid #4DB6AC',
      fontSize: '1rem',
      marginBottom: '20px',
      backgroundColor: '#FFFFFF',
      color: '#124441',
      boxSizing: 'border-box'
    },
    searchContainer: {
      position: 'relative',
      marginBottom: '20px'
    },
    searchIcon: {
      position: 'absolute',
      left: '20px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#4F6F6B'
    },
    categories: {
      display: 'flex',
      gap: '10px',
      overflowX: 'auto',
      paddingBottom: '15px',
      marginBottom: '20px',
      '&::-webkit-scrollbar': {
        height: '4px'
      },
      '&::-webkit-scrollbar-track': {
        background: '#f1f1f1'
      },
      '&::-webkit-scrollbar-thumb': {
        background: '#4DB6AC'
      }
    },
    category: {
      padding: '12px 20px',
      borderRadius: '25px',
      border: '1px solid #4DB6AC',
      backgroundColor: '#FFFFFF',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
      color: '#4F6F6B',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    activeCategory: {
      backgroundColor: '#009688',
      color: '#FFFFFF',
      borderColor: '#009688'
    },
    testsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '25px'
    },
    testCard: {
      backgroundColor: '#FFFFFF',
      borderRadius: '15px',
      padding: '20px',
      boxShadow: '0 3px 15px rgba(0,0,0,0.05)',
      border: '1px solid #4DB6AC',
      transition: 'all 0.3s ease',
      position: 'relative',
      cursor: 'pointer'
    },
    testImage: {
      width: '100%',
      height: '150px',
      borderRadius: '10px',
      objectFit: 'cover',
      marginBottom: '15px'
    },
    testName: {
      fontSize: '1.1rem',
      fontWeight: 'bold',
      color: '#124441',
      marginBottom: '10px'
    },
    testDescription: {
      fontSize: '0.9rem',
      color: '#4F6F6B',
      marginBottom: '15px',
      lineHeight: '1.5'
    },
    testDetails: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '15px',
      flexWrap: 'wrap',
      gap: '10px'
    },
    testPrice: {
      fontSize: '1.3rem',
      fontWeight: 'bold',
      color: '#009688'
    },
    testInfo: {
      fontSize: '0.85rem',
      color: '#4F6F6B',
      display: 'flex',
      alignItems: 'center',
      gap: '5px'
    },
    button: {
      backgroundColor: '#009688',
      color: '#FFFFFF',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.95rem',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      width: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    },
    secondaryButton: {
      backgroundColor: '#FFFFFF',
      color: '#009688',
      border: '1px solid #009688',
      padding: '12px 24px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.95rem',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      width: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    },
    bookingCard: {
      backgroundColor: '#FFFFFF',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '15px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      border: '1px solid #4DB6AC',
      transition: 'all 0.3s ease'
    },
    sectionTitle: {
      fontSize: '1.3rem',
      fontWeight: 'bold',
      color: '#124441',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    headerActions: {
      display: 'flex',
      gap: '15px',
      alignItems: 'center',
      flexWrap: 'wrap',
      justifyContent: 'flex-end'
    },
    stepIndicator: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px',
      padding: '20px',
      backgroundColor: '#FFFFFF',
      borderRadius: '12px',
      border: '1px solid #4DB6AC'
    },
    step: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1,
      position: 'relative'
    },
    stepNumber: {
      width: '35px',
      height: '35px',
      borderRadius: '50%',
      backgroundColor: '#E0F2F1',
      color: '#4F6F6B',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      marginBottom: '10px',
      border: '2px solid #4DB6AC'
    },
    activeStep: {
      backgroundColor: '#009688',
      color: '#FFFFFF',
      borderColor: '#009688'
    },
    stepName: {
      fontSize: '0.85rem',
      color: '#4F6F6B',
      textAlign: 'center',
      whiteSpace: 'nowrap'
    },
    activeStepName: {
      color: '#009688',
      fontWeight: 'bold'
    },
    stepLine: {
      position: 'absolute',
      top: '17px',
      left: '50%',
      width: '100%',
      height: '2px',
      backgroundColor: '#4DB6AC',
      zIndex: -1
    },
    familyMemberCard: {
      padding: '20px',
      border: '2px solid #E0F2F1',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      backgroundColor: '#FFFFFF'
    },
    selectedFamilyMember: {
      borderColor: '#009688',
      backgroundColor: '#E0F2F1'
    },
    labCard: {
      padding: '20px',
      border: '2px solid #E0F2F1',
      borderRadius: '12px',
      marginBottom: '15px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      backgroundColor: '#FFFFFF'
    },
    selectedLab: {
      borderColor: '#009688',
      backgroundColor: '#E0F2F1'
    },
    timeSlot: {
      padding: '12px',
      border: '1px solid #4DB6AC',
      borderRadius: '8px',
      margin: '5px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      backgroundColor: '#FFFFFF',
      color: '#124441',
      minWidth: '150px',
      textAlign: 'center'
    },
    selectedTimeSlot: {
      backgroundColor: '#009688',
      color: '#FFFFFF',
      borderColor: '#009688'
    },
    unavailableTimeSlot: {
      backgroundColor: '#F5F5F5',
      color: '#999',
      borderColor: '#DDD',
      cursor: 'not-allowed'
    },
    trackingMap: {
      width: '100%',
      height: '300px',
      backgroundColor: '#E0F2F1',
      borderRadius: '12px',
      marginBottom: '20px',
      border: '1px solid #4DB6AC',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    progressBar: {
      width: '100%',
      height: '10px',
      backgroundColor: '#E0F2F1',
      borderRadius: '5px',
      margin: '20px 0',
      overflow: 'hidden'
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#009688',
      borderRadius: '5px',
      transition: 'width 0.3s ease'
    },
    statusTimeline: {
      padding: '20px',
      borderLeft: '2px solid #4DB6AC',
      marginLeft: '10px'
    },
    statusItem: {
      position: 'relative',
      paddingLeft: '25px',
      marginBottom: '25px'
    },
    statusDot: {
      position: 'absolute',
      left: '-11px',
      top: '0',
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      backgroundColor: '#FFFFFF',
      border: '2px solid #4DB6AC'
    },
    activeStatusDot: {
      backgroundColor: '#009688',
      borderColor: '#009688'
    },
    completedStatusDot: {
      backgroundColor: '#4CAF50',
      borderColor: '#4CAF50'
    },
    backButton: {
      padding: '0.5rem 1rem',
      backgroundColor: 'transparent',
      color: '#009688',
      border: '1px solid #009688',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      marginRight: '1rem',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '5px'
    },
    selectionBadge: {
      position: 'absolute',
      top: '25px',
      right: '25px',
      backgroundColor: '#4CAF50',
      color: '#FFFFFF',
      padding: '3px 12px',
      borderRadius: '12px',
      fontSize: '0.75rem',
      fontWeight: 'bold',
      zIndex: 1,
      display: 'flex',
      alignItems: 'center',
      gap: '5px'
    },
    popularBadge: {
      position: 'absolute',
      top: '25px',
      right: '25px',
      backgroundColor: '#FF6B6B',
      color: '#FFFFFF',
      padding: '3px 12px',
      borderRadius: '12px',
      fontSize: '0.75rem',
      fontWeight: 'bold',
      zIndex: 1,
      display: 'flex',
      alignItems: 'center',
      gap: '5px'
    }
  };

  // Render search input
  const renderSearchInput = () => (
    <div style={styles.searchContainer}>
      <Icons.Search />
      <input
        key="search-input"
        type="text"
        placeholder="Search for lab tests (e.g., CBC, Thyroid, Vitamin D)..."
        style={styles.searchBox}
        value={searchQuery}
        onChange={handleSearchChange}
        ref={searchInputRef}
      />
    </div>
  );

  // Render categories
  const renderCategories = () => (
    <div style={styles.categories}>
      {categories.map(category => (
        <button
          key={category.id}
          style={{
            ...styles.category,
            ...(selectedCategory === category.id ? styles.activeCategory : {}),
            borderColor: category.color
          }}
          onClick={() => handleCategoryClick(category.id)}
        >
          <span style={{ color: selectedCategory === category.id ? '#FFFFFF' : category.color }}>
            {renderCategoryIcon(category.icon)}
          </span>
          {category.name} ({category.count})
        </button>
      ))}
    </div>
  );

  // Render test card
  const renderTestCard = (test) => {
    const isSelected = selectedTests.some(item => item.id === test.id);
    const IconComponent = Icons[test.category.charAt(0).toUpperCase() + test.category.slice(1)] || Icons.AllTests;
    
    return (
      <div 
        key={test.id}
        style={styles.testCard}
        onClick={() => handleTestSelection(test)}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 150, 136, 0.15)';
          e.currentTarget.style.transform = 'translateY(-5px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 3px 15px rgba(0,0,0,0.05)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <img src={test.image} alt={test.name} style={styles.testImage} />
        
        {isSelected ? (
          <div style={styles.selectionBadge}>
            <Icons.Check />
            Selected
          </div>
        ) : test.popular ? (
          <div style={styles.popularBadge}>
            <Icons.Popular />
            Popular
          </div>
        ) : null}
        
        <div style={styles.testName}>
          <IconComponent />
          {test.name}
        </div>
        <div style={styles.testDescription}>{test.description}</div>
        <div style={styles.testDetails}>
          <div>
            <div style={styles.testPrice}>₹{formatIndianNumber(test.price)}</div>
            <div style={styles.testInfo}>
              <Icons.Time />
              Report: {test.reportTime}
            </div>
          </div>
          <div>
            <div style={styles.testInfo}>
              <Icons.Fasting />
              {test.fasting}
            </div>
            <div style={{...styles.testInfo, fontSize: '0.8rem', color: '#009688'}}>
              {test.recommendedFor[0]}
            </div>
          </div>
        </div>
        <button 
          style={{
            ...styles.button,
            backgroundColor: isSelected ? '#4CAF50' : '#009688',
            marginTop: '10px'
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleTestSelection(test);
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = isSelected ? '#45a049' : '#4DB6AC';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = isSelected ? '#4CAF50' : '#009688';
          }}
        >
          {isSelected ? (
            <>
              <Icons.Check />
              Selected
            </>
          ) : (
            <>
              <Icons.Add />
              Select Test
            </>
          )}
        </button>
      </div>
    );
  };

  // Step 1: Test Selection
  const renderStep1 = () => (
    <>
      <div style={styles.contentCard}>
        {renderSearchInput()}
        {renderCategories()}
      </div>

      <div style={styles.testsGrid}>
        {filteredTests.map(test => renderTestCard(test))}
      </div>

      {selectedTests.length > 0 && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000
        }}>
          <button
            style={{
              ...styles.button,
              padding: '15px 30px',
              fontSize: '1rem',
              borderRadius: '25px',
              boxShadow: '0 4px 15px rgba(0, 150, 136, 0.3)'
            }}
            onClick={proceedToFamilySelection}
          >
            <Icons.User />
            Book {selectedTests.length} Test{selectedTests.length > 1 ? 's' : ''} →
          </button>
        </div>
      )}
    </>
  );

  // Step 2: Family Member Selection
  const renderStep2 = () => (
    <div style={styles.contentCard}>
      <h3 style={styles.sectionTitle}>
        <Icons.User />
        Select Family Member
      </h3>
      <p style={{ color: '#4F6F6B', marginBottom: '20px' }}>
        Select who these tests are for. You can book tests for yourself or family members.
      </p>
      <div style={styles.testsGrid}>
        {familyMembers.map(member => (
          <div
            key={member.id}
            style={{
              ...styles.familyMemberCard,
              ...(selectedFamilyMember === member.id ? styles.selectedFamilyMember : {})
            }}
            onClick={() => handleFamilyMemberClick(member.id)}
          >
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>
              {member.id === 'self' ? '👤' : 
               member.id === 'father' ? '👨' :
               member.id === 'mother' ? '👩' :
               member.id === 'spouse' ? '💑' : '👶'}
            </div>
            <div style={{ fontWeight: 'bold', color: '#124441' }}>{member.name}</div>
            <div style={{ color: '#4F6F6B', fontSize: '0.9rem' }}>
              {member.relation} • {member.age} years
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
        <button 
          style={styles.secondaryButton}
          onClick={() => setBookingStep(1)}
        >
          <Icons.Back />
          Back
        </button>
        <button 
          style={styles.button}
          onClick={proceedToLabSelection}
        >
          Next: Select Lab
          <Icons.Hospital />
        </button>
      </div>
    </div>
  );

  // Step 3: Lab Selection
  const renderStep3 = () => (
    <div style={styles.contentCard}>
      <h3 style={styles.sectionTitle}>
        <Icons.Hospital />
        Select Laboratory
      </h3>
      <p style={{ color: '#4F6F6B', marginBottom: '20px' }}>
        Choose a lab for sample collection. Home service available for all labs.
      </p>
      {labs.map(lab => (
        <div
          key={lab.id}
          style={{
            ...styles.labCard,
            ...(selectedLab?.id === lab.id ? styles.selectedLab : {})
          }}
          onClick={() => handleLabClick(lab)}
        >
          <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
            <img src={lab.image} alt={lab.name} style={{ width: '100px', height: '80px', borderRadius: '8px' }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontWeight: 'bold', color: '#124441', fontSize: '1.1rem' }}>
                    {lab.name}
                  </div>
                  <div style={{ color: '#4F6F6B', fontSize: '0.9rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Icons.Location />
                    {lab.address}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icons.Star />
                  <span style={{ fontWeight: 'bold', color: '#124441' }}>{lab.rating}</span>
                  <span style={{ color: '#4F6F6B' }}>({lab.distance})</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '20px', marginTop: '15px', flexWrap: 'wrap' }}>
                <div style={styles.testInfo}>
                  🏠 Home Collection: ₹{lab.homeCollectionFee}
                </div>
                <div style={{...styles.testInfo, display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Icons.Clock />
                  {lab.timing}
                </div>
                <div style={styles.testInfo}>
                  👨‍⚕️ {lab.phlebotomists} phlebotomists
                </div>
              </div>
              <div style={{ marginTop: '10px', color: '#009688', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                🏆 {lab.accreditation}
              </div>
            </div>
          </div>
        </div>
      ))}
      <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
        <button 
          style={styles.secondaryButton}
          onClick={() => setBookingStep(2)}
        >
          <Icons.Back />
          Back
        </button>
        <button 
          style={styles.button}
          onClick={proceedToTimeSlot}
          disabled={!selectedLab}
        >
          Next: Select Time Slot
          <Icons.Calendar />
        </button>
      </div>
    </div>
  );

  // Step 4: Time Slot Selection
  const renderStep4 = () => (
    <div style={styles.contentCard}>
      <h3 style={styles.sectionTitle}>
        <Icons.Calendar />
        Select Time Slot
      </h3>
      <p style={{ color: '#4F6F6B', marginBottom: '20px' }}>
        Choose your preferred time for sample collection. Slots update in real-time.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '30px' }}>
        {timeSlots.map(slot => (
          <button
            key={slot.id}
            style={{
              ...styles.timeSlot,
              ...(selectedTimeSlot?.id === slot.id ? styles.selectedTimeSlot : {}),
              ...(!slot.available ? styles.unavailableTimeSlot : {})
            }}
            onClick={() => handleTimeSlotClick(slot)}
            disabled={!slot.available}
          >
            {slot.time}
            {!slot.available && ' (Booked)'}
          </button>
        ))}
      </div>
      <div style={{ 
        backgroundColor: '#E0F2F1', 
        padding: '20px', 
        borderRadius: '10px',
        border: '1px solid #4DB6AC',
        marginBottom: '20px'
      }}>
        <div style={{ fontWeight: 'bold', color: '#124441', marginBottom: '10px' }}>
          Booking Summary
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <span style={{ color: '#4F6F6B' }}>Tests ({selectedTests.length})</span>
          <span style={{ fontWeight: 'bold' }}>₹{selectedTests.reduce((sum, item) => sum + item.price, 0)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <span style={{ color: '#4F6F6B' }}>Home Collection Fee</span>
          <span style={{ fontWeight: 'bold' }}>₹{selectedLab?.homeCollectionFee || 0}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #4DB6AC' }}>
          <span style={{ color: '#124441', fontWeight: 'bold' }}>Total Amount</span>
          <span style={{ color: '#009688', fontWeight: 'bold', fontSize: '1.2rem' }}>
            ₹{totalPrice}
          </span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '15px' }}>
        <button 
          style={styles.secondaryButton}
          onClick={() => setBookingStep(3)}
        >
          <Icons.Back />
          Back
        </button>
        <button 
          style={styles.button}
          onClick={proceedToPayment}
          disabled={!selectedTimeSlot}
        >
          Proceed to Payment
          <Icons.Payment />
        </button>
      </div>
    </div>
  );

  // Step 5: Payment
  const renderStep5 = () => (
    <div style={styles.contentCard}>
      <h3 style={styles.sectionTitle}>
        <Icons.Payment />
        Payment
      </h3>
      <div style={{ 
        backgroundColor: '#E0F2F1', 
        padding: '30px', 
        borderRadius: '10px',
        border: '1px solid #4DB6AC',
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '20px' }}>💳</div>
        <div style={{ fontWeight: 'bold', color: '#124441', fontSize: '1.2rem', marginBottom: '10px' }}>
          Total Amount: ₹{formatIndianNumber(totalPrice)}
        </div>
        <div style={{ color: '#4F6F6B', marginBottom: '30px' }}>
          Secure payment powered by Razorpay
        </div>
        
        <div style={{ textAlign: 'left', marginBottom: '30px', backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '8px' }}>
          <div style={{ fontWeight: 'bold', color: '#124441', marginBottom: '15px' }}>Booking Details:</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#4F6F6B' }}>For:</span>
            <span style={{ fontWeight: '500' }}>{selectedFamilyMemberData?.name || 'Self'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#4F6F6B' }}>Lab:</span>
            <span style={{ fontWeight: '500' }}>{selectedLab?.name}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#4F6F6B' }}>Time:</span>
            <span style={{ fontWeight: '500' }}>{selectedTimeSlot?.time}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #E0F2F1' }}>
            <span style={{ color: '#4F6F6B' }}>Tests:</span>
            <span style={{ fontWeight: '500' }}>{selectedTests.map(t => t.name).join(', ')}</span>
          </div>
        </div>

        <button 
          style={{
            ...styles.button,
            padding: '15px 40px',
            fontSize: '1.1rem',
            maxWidth: '300px',
            backgroundColor: paymentLoading ? '#4F6F6B' : '#009688'
          }}
          onClick={processPayment}
          disabled={paymentLoading}
        >
          {paymentLoading ? (
            <>
              <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block', marginRight: '10px' }}>⟳</span>
              Processing...
            </>
          ) : (
            <>
              <Icons.Payment />
              Pay ₹{formatIndianNumber(totalPrice)} with Razorpay
            </>
          )}
        </button>
        
        <div style={{ marginTop: '20px', fontSize: '0.85rem', color: '#4F6F6B' }}>
          🔒 100% Secure Payment | SSL Encrypted
        </div>
      </div>
      <button 
        style={styles.secondaryButton}
        onClick={() => setBookingStep(4)}
        disabled={paymentLoading}
      >
        <Icons.Back />
        Back
      </button>
    </div>
  );

  // Step 6: Tracking
  const renderStep6 = () => (
    <div style={styles.contentCard}>
      <h3 style={styles.sectionTitle}>
        <Icons.Track />
        Sample Collection Tracking
      </h3>
      <div style={{ 
        backgroundColor: '#4CAF50', 
        color: '#FFFFFF', 
        padding: '15px', 
        borderRadius: '8px',
        marginBottom: '20px',
        textAlign: 'center',
        fontWeight: 'bold'
      }}>
        ✅ Booking Confirmed! Order #{currentBooking.id}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '30px' }}>
        <div style={{ flex: 1, minWidth: '250px' }}>
          <div style={styles.sectionTitle}>
            <Icons.User />
            Phlebotomist Details
          </div>
          <div style={{ backgroundColor: '#E0F2F1', padding: '20px', borderRadius: '8px' }}>
            <div style={{ fontWeight: 'bold', color: '#124441' }}>{currentBooking.phlebotomist}</div>
            <div style={{ color: '#4F6F6B', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Icons.Phone />
              {currentBooking.phone}
            </div>
            <div style={{ color: '#4F6F6B', marginTop: '5px' }}>🆔 Tracking ID: {currentBooking.trackingId}</div>
            {currentBooking.paymentId && (
              <div style={{ color: '#4F6F6B', marginTop: '5px', fontSize: '0.9rem' }}>
                Payment ID: {currentBooking.paymentId}
              </div>
            )}
          </div>
        </div>
        <div style={{ flex: 1, minWidth: '250px' }}>
          <div style={styles.sectionTitle}>
            <Icons.Hospital />
            Test Details
          </div>
          <div style={{ backgroundColor: '#E0F2F1', padding: '20px', borderRadius: '8px' }}>
            <div style={{ color: '#124441', fontWeight: '500' }}>For: {currentBooking.familyMember}</div>
            <div style={{ color: '#4F6F6B', marginTop: '10px' }}>
              {currentBooking.tests.map((test, idx) => (
                <div key={idx}>• {test}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={styles.sectionTitle}>
        <Icons.Map />
        Live Tracking
      </div>
      <div style={styles.trackingMap}>
        <div style={{
          textAlign: 'center',
          color: '#124441'
        }}>
          <div style={{ fontSize: '3rem' }}>🗺️</div>
          <div style={{ fontWeight: 'bold', marginTop: '10px' }}>Live Tracking Active</div>
          <div style={{ marginTop: '5px' }}>Phlebotomist is {estimatedArrival} mins away</div>
        </div>
      </div>
      <button 
        style={{ ...styles.button, marginBottom: '20px' }}
        onClick={startLiveTracking}
      >
        <Icons.Track />
        {liveTracking ? 'Live Tracking Active' : 'Start Live Tracking'}
      </button>

      <div style={styles.sectionTitle}>
        <Icons.Progress />
        Collection Status
      </div>
      <div style={styles.statusTimeline}>
        {['Phlebotomist Assigned', 'On the Way', 'Sample Collected', 'Sample at Lab', 'Testing', 'Report Ready'].map((status, idx) => {
          const isActive = idx === ['Phlebotomist Assigned', 'On the Way', 'Sample Collected', 'Sample at Lab', 'Testing', 'Report Ready']
            .indexOf(currentBooking.status);
          const isCompleted = idx < isActive;
          
          return (
            <div key={status} style={styles.statusItem}>
              <div style={{
                ...styles.statusDot,
                ...(isCompleted ? styles.completedStatusDot : {}),
                ...(idx === isActive ? styles.activeStatusDot : {})
              }}></div>
              <div style={{ fontWeight: idx <= isActive ? 'bold' : 'normal', color: '#124441' }}>
                {status}
              </div>
              <div style={{ color: '#4F6F6B', fontSize: '0.9rem', marginTop: '5px' }}>
                {idx === 0 && currentBooking.date} {idx === 1 && `ETA: ${estimatedArrival} mins`}
                {idx === 2 && currentBooking.time} {idx === 5 && 'Digital report available for download'}
              </div>
            </div>
          );
        })}
      </div>

      {currentBooking.status === 'Sample Collected' && (
        <div style={{ marginTop: '30px' }}>
          <div style={styles.sectionTitle}>
            <Icons.Progress />
            Report Progress
          </div>
          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${reportProgress}%` }}></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4F6F6B' }}>
            <span>Sample Received</span>
            <span>{reportProgress}%</span>
            <span>Report Ready</span>
          </div>
        </div>
      )}
    </div>
  );

  // Book Tests Tab
  const renderBookTestsTab = () => {
    switch (bookingStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      case 5:
        return renderStep5();
      case 6:
        return currentBooking ? renderStep6() : null;
      default:
        return renderStep1();
    }
  };

  // History Tab
  const renderHistoryTab = () => (
    <div style={styles.contentCard}>
      <h3 style={styles.sectionTitle}>
        <Icons.History />
        Test History & Reports
      </h3>
      {bookingHistory.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#4F6F6B' }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📄</div>
          <div style={{ color: '#124441', fontWeight: '500' }}>No test history found</div>
          <div style={{ fontSize: '0.9rem', marginTop: '10px' }}>Book your first test to see history here</div>
        </div>
      ) : (
        <div>
          {bookingHistory.map(booking => (
            <div 
              key={booking.id} 
              style={{
                ...styles.bookingCard,
                cursor: 'pointer'
              }}
              onClick={() => viewReportDetails(booking)}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 150, 136, 0.1)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px', flexWrap: 'wrap', gap: '15px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <div style={{ fontWeight: 'bold', color: '#124441', fontSize: '1.1rem' }}>Booking #{booking.id}</div>
                    <div style={{
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      backgroundColor: booking.status === 'Completed' ? '#E8F5E9' : 
                                     booking.status === 'Sample Collected' ? '#E3F2FD' : 
                                     booking.status === 'Phlebotomist Assigned' ? '#FFF3E0' : '#F5F5F5',
                      color: booking.status === 'Completed' ? '#2E7D32' : 
                            booking.status === 'Sample Collected' ? '#1565C0' :
                            booking.status === 'Phlebotomist Assigned' ? '#F57C00' : '#757575',
                      border: '1px solid #4DB6AC'
                    }}>
                      {booking.status}
                    </div>
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#4F6F6B', marginTop: '5px' }}>
                    <strong>For:</strong> {booking.familyMember || 'Self'}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#4F6F6B', marginTop: '5px' }}>
                    {booking.tests.slice(0, 2).join(', ')}
                    {booking.tests.length > 2 && ` +${booking.tests.length - 2} more`}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#4F6F6B', marginTop: '5px' }}>
                    {booking.lab} • {booking.date} at {booking.time}
                    {booking.phlebotomist && ` • 👨‍⚕️ ${booking.phlebotomist}`}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 'bold', color: '#009688', fontSize: '1.2rem' }}>₹{booking.amount}</div>
                  <div style={{ fontSize: '0.8rem', color: '#4F6F6B', marginTop: '5px' }}>
                    {booking.results}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginTop: '15px' }}>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {booking.results === 'Available' ? (
                    <>
                      <button 
                        style={{
                          backgroundColor: downloadingReport === booking.id ? '#4F6F6B' : '#009688',
                          color: '#FFFFFF',
                          border: 'none',
                          padding: '8px 20px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          fontWeight: '500',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          minWidth: '140px',
                          justifyContent: 'center'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadReport(booking.id);
                        }}
                        disabled={downloadingReport === booking.id}
                      >
                        {downloadingReport === booking.id ? (
                          <>
                            <span style={{ animation: 'spin 1s linear infinite' }}>⟳</span>
                            Downloading...
                          </>
                        ) : (
                          <>
                            <Icons.Download />
                            Download PDF
                          </>
                        )}
                      </button>
                      <button 
                        style={{
                          backgroundColor: 'transparent',
                          color: '#009688',
                          border: '1px solid #009688',
                          padding: '8px 20px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          fontWeight: '500',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          viewFullReport(booking);
                        }}
                      >
                        <Icons.View />
                        View Report
                      </button>
                    </>
                  ) : booking.reportProgress ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '100px', height: '6px', backgroundColor: '#E0F2F1', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${booking.reportProgress}%`, height: '100%', backgroundColor: '#009688' }}></div>
                      </div>
                      <span style={{ fontSize: '0.85rem', color: '#4F6F6B' }}>{booking.reportProgress}%</span>
                    </div>
                  ) : null}
                </div>
                <button 
                  style={{
                    backgroundColor: 'transparent',
                    color: '#009688',
                    border: '1px solid #009688',
                    padding: '6px 15px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    viewReportDetails(booking);
                  }}
                >
                  View Details
                  <Icons.View />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Labs Tab
  const renderLabsTab = () => (
    <div style={styles.contentCard}>
      <h3 style={styles.sectionTitle}>
        <Icons.Labs />
        Nearby Diagnostic Centers
      </h3>
      <p style={{ color: '#4F6F6B', marginBottom: '20px' }}>
        Choose from NABL accredited labs with home collection service
      </p>
      <div style={styles.testsGrid}>
        {labs.map(lab => (
          <div 
            key={lab.id} 
            style={styles.testCard}
            onClick={() => {
              handleLabClick(lab);
              addNotification('Lab Selected', `${lab.name} selected. You can now book tests from this lab.`, 'lab');
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 150, 136, 0.15)';
              e.currentTarget.style.transform = 'translateY(-5px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 3px 15px rgba(0,0,0,0.05)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <img src={lab.image} alt={lab.name} style={styles.testImage} />
            <div style={styles.testName}>{lab.name}</div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <Icons.Star />
              <span style={{ color: '#124441', fontWeight: 'bold', marginLeft: '5px' }}>{lab.rating}</span>
              <span style={{ marginLeft: '10px', color: '#4F6F6B', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Icons.Location />
                {lab.distance} away
              </span>
            </div>
            <div style={{ fontSize: '0.9rem', color: '#4F6F6B', marginBottom: '10px' }}>
              🏠 {lab.sampleCollection}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#4F6F6B', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Icons.Clock />
              {lab.timing}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#009688', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '5px' }}>
              🏆 {lab.accreditation.split(', ')[0]}
            </div>
            <button 
              style={styles.button}
              onClick={(e) => {
                e.stopPropagation();
                handleLabClick(lab);
                handleTabClick('book');
                setBookingStep(3);
              }}
            >
              <Icons.Book />
              Book from this Lab
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  // Step Indicator
  const renderStepIndicator = () => {
    if (bookingStep <= 1 || bookingStep >= 6) return null;
    
    return (
      <div style={styles.stepIndicator}>
        {[1, 2, 3, 4, 5].map(step => (
          <div key={step} style={styles.step}>
            <div style={{ ...styles.stepNumber, ...(step <= bookingStep ? styles.activeStep : {}) }}>
              {step}
            </div>
            <div style={{ ...styles.stepName, ...(step <= bookingStep ? styles.activeStepName : {}) }}>
              {step === 1 && 'Select Tests'}
              {step === 2 && 'Family Member'}
              {step === 3 && 'Choose Lab'}
              {step === 4 && 'Time Slot'}
              {step === 5 && 'Payment'}
            </div>
            {step < 5 && <div style={styles.stepLine}></div>}
          </div>
        ))}
      </div>
    );
  };

  // Back Button component
  const BackButton = ({ onClick, text = 'Back' }) => (
    <button 
      style={styles.backButton}
      onClick={onClick}
      type="button"
    >
      <Icons.Back />
      {text}
    </button>
  );

  // Add CSS animation for spinner
  const spinnerStyle = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  return (
    <>
      <style>{spinnerStyle}</style>
      
      {/* Phone Confirmation Modal */}
      <PhoneConfirmationModal />
      
      <div style={styles.container}>
        {/* Header Row with Back Button */}
        <div style={styles.headerRow}>
          <BackButton onClick={() => setActiveView('dashboard')} text="Dashboard" />
          
          <div style={styles.titleSection}>
            <h1 style={styles.title}>Lab Tests 🔬</h1>
            <p style={styles.subtitle}>Book tests, track collection, download digital reports</p>
          </div>

          <div style={styles.headerActions}>
            {currentBooking && (
              <button 
                style={{
                  ...styles.tab,
                  backgroundColor: '#009688',
                  color: '#FFFFFF'
                }}
                onClick={() => {
                  handleTabClick('book');
                  setBookingStep(6);
                }}
              >
                <Icons.Track />
                Track #{currentBooking.id}
              </button>
            )}
          </div>
        </div>

        {/* Step Indicator for Booking Flow */}
        {renderStepIndicator()}

        {/* Main Tabs */}
        <div style={styles.tabs}>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'book' ? styles.activeTab : {})
            }}
            onClick={() => handleTabClick('book')}
          >
            <Icons.Book />
            Book Tests
          </button>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'history' ? styles.activeTab : {})
            }}
            onClick={() => handleTabClick('history')}
          >
            <Icons.History />
            History & Reports
          </button>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'labs' ? styles.activeTab : {})
            }}
            onClick={() => handleTabClick('labs')}
          >
            <Icons.Labs />
            Labs
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'book' && renderBookTestsTab()}
        {activeTab === 'history' && renderHistoryTab()}
        {activeTab === 'labs' && renderLabsTab()}
      </div>
    </>
  );
};

export default LabTestsView;