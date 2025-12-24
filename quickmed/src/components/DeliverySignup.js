// import React, { useState, useEffect } from 'react';

// const DeliverySignup = ({ onSwitchToLogin, onSignupSuccess, onSwitchToRoleSelection }) => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: '',
//     // Delivery specific fields
//     aadharNumber: '',
//     panNumber: '',
//     vehicleNumber: '',
//     drivingLicenseNumber: ''
//   });
  
//   const [formErrors, setFormErrors] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: '',
//     aadharNumber: '',
//     panNumber: '',
//     vehicleNumber: '',
//     drivingLicenseNumber: ''
//   });
  
//   const [showToast, setShowToast] = useState(false);
//   const [toastMessage, setToastMessage] = useState('');
//   const [toastType, setToastType] = useState('success');
//   const [isLoading, setIsLoading] = useState(false);
//   const [agreeToTerms, setAgreeToTerms] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
//   // Delivery specific state
//   const [currentStep, setCurrentStep] = useState(1);
//   const [aadharFront, setAadharFront] = useState(null);
//   const [aadharBack, setAadharBack] = useState(null);
//   const [drivingLicenseFront, setDrivingLicenseFront] = useState(null);
//   const [drivingLicenseBack, setDrivingLicenseBack] = useState(null);
//   const [panCard, setPanCard] = useState(null);
//   const [vehicleRC, setVehicleRC] = useState(null);
//   const [livePhoto, setLivePhoto] = useState(null);
//   const [isPhoneVerified, setIsPhoneVerified] = useState(false);
//   const [isEmailVerified, setIsEmailVerified] = useState(false);
//   const [isAadharVerified, setIsAadharVerified] = useState(false);
//   const [aadharOtpSent, setAadharOtpSent] = useState(false);
//   const [aadharOtp, setAadharOtp] = useState('');
  
//   // Verification states
//   const [phoneOtpSent, setPhoneOtpSent] = useState(false);
//   const [phoneOtp, setPhoneOtp] = useState('');
//   const [emailOtpSent, setEmailOtpSent] = useState(false);
//   const [emailOtp, setEmailOtp] = useState('');
//   const [verificationLoading, setVerificationLoading] = useState({
//     phone: false,
//     email: false,
//     aadhar: false
//   });

//   // NEW: Edit mode states
//   const [isEditingEmail, setIsEditingEmail] = useState(false);
//   const [isEditingPhone, setIsEditingPhone] = useState(false);
//   const [originalEmail, setOriginalEmail] = useState('');
//   const [originalPhone, setOriginalPhone] = useState('');

//   // NEW: Track user existence during typing
//   const [existingUsers, setExistingUsers] = useState([]);

//   // Load existing users on component mount
//   useEffect(() => {
//     const storedUsers = localStorage.getItem('registeredUsers');
//     if (storedUsers) {
//       setExistingUsers(JSON.parse(storedUsers));
//     }
//   }, []);

//   // SVG Icons
//   const HomeIcon = () => (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//       <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
//     </svg>
//   );

//   const ChangeRoleIcon = () => (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//       <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
//     </svg>
//   );

//   const EyeIcon = () => (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
//       <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
//     </svg>
//   );

//   const EyeOffIcon = () => (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
//       <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
//     </svg>
//   );

//   const CheckIcon = () => (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//       <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
//     </svg>
//   );

//   const CloseIcon = () => (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//       <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
//     </svg>
//   );

//   const UploadIcon = () => (
//     <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
//       <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
//     </svg>
//   );

//   const SuccessIcon = () => (
//     <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
//       <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
//     </svg>
//   );

//   const ErrorIcon = () => (
//     <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
//       <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
//     </svg>
//   );

//   const InfoIcon = () => (
//     <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
//       <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
//     </svg>
//   );

//   const DeliveryIcon = () => (
//     <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
//       <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
//     </svg>
//   );

//   const StepIcon = ({ number, active }) => (
//     <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
//       <circle cx="18" cy="18" r="17" stroke={active ? "#4DB6AC" : "rgba(255,255,255,0.3)"} strokeWidth="2"/>
//       <circle cx="18" cy="18" r="16" fill={active ? "white" : "transparent"}/>
//       <text x="18" y="22" textAnchor="middle" fontSize="14" fontWeight="600" fill={active ? "#009688" : "rgba(255,255,255,0.7)"}>
//         {number}
//       </text>
//     </svg>
//   );

//   const BenefitCheckIcon = () => (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="#4DB6AC">
//       <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
//     </svg>
//   );

//   const DocumentIcon = () => (
//     <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
//       <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
//     </svg>
//   );

//   const PhoneIcon = () => (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//       <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
//     </svg>
//   );

//   const EmailIcon = () => (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//       <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
//     </svg>
//   );

//   const EditIcon = () => (
//     <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
//       <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
//     </svg>
//   );

//   const CancelIcon = () => (
//     <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
//       <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
//     </svg>
//   );

//   const LoadingIcon = () => (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//       <path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z"/>
//     </svg>
//   );

//   // NEW: Check if email/phone already exists in system
//   const checkEmailExists = (email) => {
//     return existingUsers.some(user => user.email === email);
//   };

//   const checkPhoneExists = (phone) => {
//     return existingUsers.some(user => user.phone === phone);
//   };

//   // NEW: Enhanced validation functions with existence check
//   const validateEmailWithExistence = (email) => {
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     if (!email.trim()) return 'Email is required';
//     if (!emailRegex.test(email)) return 'Please enter a valid email address';
    
//     // Check if email exists (but not if we're editing and it's the same email)
//     if (!isEditingEmail && checkEmailExists(email)) {
//       return 'Email already registered. Please use a different email or login.';
//     }
    
//     return '';
//   };

//   const validatePhoneWithExistence = (phone) => {
//     const phoneRegex = /^[6-9]\d{9}$/;
//     if (!phone.trim()) return 'Phone number is required';
//     if (!phoneRegex.test(phone)) return 'Please enter a valid phone number';
    
//     // Check if phone exists (but not if we're editing and it's the same phone)
//     if (!isEditingPhone && checkPhoneExists(phone)) {
//       return 'Phone number already registered. Please use a different number or login.';
//     }
    
//     return '';
//   };

//   // NEW: Handle edit mode for email
//   const handleEditEmail = () => {
//     setIsEditingEmail(true);
//     setIsEmailVerified(false);
//     setEmailOtpSent(false);
//     setEmailOtp('');
//   };

//   // NEW: Handle edit mode for phone
//   const handleEditPhone = () => {
//     setIsEditingPhone(true);
//     setIsPhoneVerified(false);
//     setPhoneOtpSent(false);
//     setPhoneOtp('');
//   };

//   // NEW: Cancel edit mode
//   const handleCancelEditEmail = () => {
//     setIsEditingEmail(false);
//     setFormData(prev => ({ ...prev, email: originalEmail }));
//     setIsEmailVerified(true); // Re-verify since we're going back to original
//   };

//   const handleCancelEditPhone = () => {
//     setIsEditingPhone(false);
//     setFormData(prev => ({ ...prev, phone: originalPhone }));
//     setIsPhoneVerified(true); // Re-verify since we're going back to original
//   };

//   // Original validation functions (keep for other fields)
//   const validateName = (name) => {
//     const nameRegex = /^[A-Za-z\s]{2,}$/;
//     if (!name.trim()) return 'Full name is required';
//     if (!nameRegex.test(name)) return 'Name should contain only alphabets and spaces (min 2 characters)';
//     return '';
//   };

//   const validatePassword = (password) => {
//     const minLength = 8;
//     const hasUpperCase = /[A-Z]/.test(password);
//     const hasLowerCase = /[a-z]/.test(password);
//     const hasNumbers = /\d/.test(password);
//     const hasSpecialChar = /[!@#$%^&*]/.test(password);
    
//     return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
//   };

//   const validateAadhar = (aadhar) => {
//     const aadharRegex = /^\d{12}$/;
//     if (!aadhar.trim()) return 'Aadhar number is required';
//     if (!aadharRegex.test(aadhar)) return 'Aadhar must be 12 digits';
//     return '';
//   };

//   const validatePAN = (pan) => {
//     const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
//     if (!pan.trim()) return 'PAN number is required';
//     if (!panRegex.test(pan)) return 'Invalid PAN format (e.g., ABCDE1234F)';
//     return '';
//   };

//   const validateVehicleNumber = (vehicle) => {
//     const vehicleRegex = /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{4}$/;
//     if (!vehicle.trim()) return 'Vehicle number is required';
//     if (!vehicleRegex.test(vehicle)) return 'Invalid vehicle number format (e.g., KA01AB1234)';
//     if (vehicle.length > 10) return 'Vehicle number max 10 characters';
//     return '';
//   };

//   const validateDrivingLicense = (license) => {
//     const licenseRegex = /^[A-Z0-9]{10,16}$/;
//     if (!license.trim()) return 'Driving license number is required';
//     if (!licenseRegex.test(license)) return 'Invalid driving license number (10-16 alphanumeric characters)';
//     return '';
//   };

//   // Mock OTP generation
//   const generateMockOtp = () => {
//     return Math.floor(100000 + Math.random() * 900000).toString();
//   };

//   // Add a safe wrapper for onSwitchToLogin
//   const handleSwitchToLogin = () => {
//     if (typeof onSwitchToLogin === 'function') {
//       onSwitchToLogin();
//     } else {
//       console.warn('onSwitchToLogin prop is not provided');
//       setToastMessage('Login switch function not available');
//       setToastType('error');
//       setShowToast(true);
//       setTimeout(() => setShowToast(false), 3000);
//     }
//   };

//   // Add a safe wrapper for onSwitchToRoleSelection
//   const handleSwitchToRoleSelection = () => {
//     if (typeof onSwitchToRoleSelection === 'function') {
//       onSwitchToRoleSelection();
//     } else {
//       console.warn('onSwitchToRoleSelection prop is not provided');
//       setToastMessage('Role selection function not available');
//       setToastType('error');
//       setShowToast(true);
//       setTimeout(() => setShowToast(false), 3000);
//     }
//   };

//   // Home navigation handler
//   const handleHomeNavigation = () => {
//     window.location.href = '/';
//   };

//   // Phone verification handlers
//   const sendPhoneOtp = async () => {
//     const phoneError = validatePhoneWithExistence(formData.phone);
//     if (phoneError) {
//       setFormErrors(prev => ({ ...prev, phone: phoneError }));
//       setToastMessage('Please enter a valid phone number');
//       setToastType('error');
//       setShowToast(true);
//       setTimeout(() => setShowToast(false), 3000);
//       return;
//     }
    
//     setVerificationLoading(prev => ({ ...prev, phone: true }));
    
//     // Simulate API call delay
//     await new Promise(resolve => setTimeout(resolve, 1500));
    
//     const mockOtp = generateMockOtp();
//     setPhoneOtp(mockOtp);
//     setPhoneOtpSent(true);
    
//     setToastMessage(`OTP ${mockOtp} sent to ${formData.phone} (Mock)`);
//     setToastType('success');
//     setShowToast(true);
//     setVerificationLoading(prev => ({ ...prev, phone: false }));
    
//     setTimeout(() => setShowToast(false), 4000);
//   };

//   const verifyPhoneOtp = async () => {
//     if (!phoneOtp) {
//       setToastMessage('Please enter the OTP');
//       setToastType('error');
//       setShowToast(true);
//       setTimeout(() => setShowToast(false), 3000);
//       return;
//     }
    
//     setVerificationLoading(prev => ({ ...prev, phone: true }));
    
//     await new Promise(resolve => setTimeout(resolve, 1000));
    
//     if (phoneOtp.length === 6) {
//       setIsPhoneVerified(true);
//       setIsEditingPhone(false); // Exit edit mode
//       setOriginalPhone(formData.phone); // Save as original
//       setToastMessage('Phone number verified successfully!');
//       setToastType('success');
//     } else {
//       setToastMessage('Invalid OTP. Please try again.');
//       setToastType('error');
//     }
    
//     setShowToast(true);
//     setVerificationLoading(prev => ({ ...prev, phone: false }));
//     setTimeout(() => setShowToast(false), 3000);
//   };

//   // Email verification handlers
//   const sendEmailOtp = async () => {
//     const emailError = validateEmailWithExistence(formData.email);
//     if (emailError) {
//       setFormErrors(prev => ({ ...prev, email: emailError }));
//       setToastMessage('Please enter a valid email address');
//       setToastType('error');
//       setShowToast(true);
//       setTimeout(() => setShowToast(false), 3000);
//       return;
//     }
    
//     setVerificationLoading(prev => ({ ...prev, email: true }));
    
//     await new Promise(resolve => setTimeout(resolve, 1500));
    
//     const mockOtp = generateMockOtp();
//     setEmailOtp(mockOtp);
//     setEmailOtpSent(true);
    
//     setToastMessage(`OTP ${mockOtp} sent to ${formData.email} (Mock)`);
//     setToastType('success');
//     setShowToast(true);
//     setVerificationLoading(prev => ({ ...prev, email: false }));
    
//     setTimeout(() => setShowToast(false), 4000);
//   };

//   const verifyEmailOtp = async () => {
//     if (!emailOtp) {
//       setToastMessage('Please enter the OTP');
//       setToastType('error');
//       setShowToast(true);
//       setTimeout(() => setShowToast(false), 3000);
//       return;
//     }
    
//     setVerificationLoading(prev => ({ ...prev, email: true }));
    
//     await new Promise(resolve => setTimeout(resolve, 1000));
    
//     if (emailOtp.length === 6) {
//       setIsEmailVerified(true);
//       setIsEditingEmail(false); // Exit edit mode
//       setOriginalEmail(formData.email); // Save as original
//       setToastMessage('Email verified successfully!');
//       setToastType('success');
//     } else {
//       setToastMessage('Invalid OTP. Please try again.');
//       setToastType('error');
//     }
    
//     setShowToast(true);
//     setVerificationLoading(prev => ({ ...prev, email: false }));
//     setTimeout(() => setShowToast(false), 3000);
//   };

//   // Aadhar verification handlers
//   const sendAadharOtp = async () => {
//     if (!formData.aadharNumber || formErrors.aadharNumber) {
//       setToastMessage('Please enter a valid Aadhar number');
//       setToastType('error');
//       setShowToast(true);
//       setTimeout(() => setShowToast(false), 3000);
//       return;
//     }
    
//     setVerificationLoading(prev => ({ ...prev, aadhar: true }));
    
//     await new Promise(resolve => setTimeout(resolve, 2000));
    
//     const mockOtp = generateMockOtp();
//     setAadharOtp(mockOtp);
//     setAadharOtpSent(true);
    
//     setToastMessage(`Aadhar OTP ${mockOtp} sent for verification (Mock)`);
//     setToastType('success');
//     setShowToast(true);
//     setVerificationLoading(prev => ({ ...prev, aadhar: false }));
    
//     setTimeout(() => setShowToast(false), 4000);
//   };

//   const verifyAadharOtp = async () => {
//     if (!aadharOtp) {
//       setToastMessage('Please enter the OTP');
//       setToastType('error');
//       setShowToast(true);
//       setTimeout(() => setShowToast(false), 3000);
//       return;
//     }
    
//     setVerificationLoading(prev => ({ ...prev, aadhar: true }));
    
//     await new Promise(resolve => setTimeout(resolve, 1500));
    
//     if (aadharOtp.length === 6) {
//       setIsAadharVerified(true);
//       setToastMessage('Aadhar verified successfully!');
//       setToastType('success');
//       setShowToast(true);
//     } else {
//       setToastMessage('Invalid OTP. Please try again.');
//       setToastType('error');
//       setShowToast(true);
//     }
    
//     setVerificationLoading(prev => ({ ...prev, aadhar: false }));
//     setTimeout(() => setShowToast(false), 3000);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
    
//     let processedValue = value;
    
//     if (name === 'fullName') {
//       processedValue = value.replace(/[^A-Za-z\s]/g, '');
//     } else if (name === 'phone') {
//       processedValue = value.replace(/\D/g, '').slice(0, 10);
//     } else if (name === 'aadharNumber') {
//       processedValue = value.replace(/\D/g, '').slice(0, 12);
//     } else if (name === 'panNumber') {
//       processedValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
//     } else if (name === 'vehicleNumber') {
//       processedValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
//     } else if (name === 'drivingLicenseNumber') {
//       processedValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 16);
//     } else if (name === 'email') {
//       // Clear OTP and verification status if email is changed
//       if (isEmailVerified && value !== originalEmail) {
//         setIsEmailVerified(false);
//         setEmailOtpSent(false);
//         setEmailOtp('');
//       }
//     } else if (name === 'phone') {
//       // Clear OTP and verification status if phone is changed
//       if (isPhoneVerified && value !== originalPhone) {
//         setIsPhoneVerified(false);
//         setPhoneOtpSent(false);
//         setPhoneOtp('');
//       }
//     }
    
//     setFormData({
//       ...formData,
//       [name]: processedValue
//     });

//     // Clear error for this field when user starts typing
//     if (formErrors[name]) {
//       setFormErrors({
//         ...formErrors,
//         [name]: ''
//       });
//     }
//   };

//   const handleBlur = (e) => {
//     const { name, value } = e.target;
//     let error = '';

//     switch (name) {
//       case 'fullName':
//         error = validateName(value);
//         break;
//       case 'email':
//         error = validateEmailWithExistence(value);
//         break;
//       case 'phone':
//         error = validatePhoneWithExistence(value);
//         break;
//       case 'password':
//         if (value && !validatePassword(value)) {
//           error = 'Password must be 8+ characters with uppercase, lowercase, number & special character';
//         }
//         break;
//       case 'confirmPassword':
//         if (value && value !== formData.password) {
//           error = 'Passwords do not match';
//         }
//         break;
//       case 'aadharNumber':
//         error = validateAadhar(value);
//         break;
//       case 'panNumber':
//         error = validatePAN(value);
//         break;
//       case 'vehicleNumber':
//         error = validateVehicleNumber(value);
//         break;
//       case 'drivingLicenseNumber':
//         error = validateDrivingLicense(value);
//         break;
//       default:
//         break;
//     }

//     setFormErrors({
//       ...formErrors,
//       [name]: error
//     });
//   };

//   // ... [rest of the file upload handlers remain the same] ...

//   // File upload handlers (keep as is)
//   const handleFileUpload = (fileType, file) => {
//     if (!file) return;

//     const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
//     const maxSize = 5 * 1024 * 1024;

//     if (!validImageTypes.includes(file.type)) {
//       setToastMessage('Please upload a valid image (JPEG, JPG, PNG)');
//       setToastType('error');
//       setShowToast(true);
//       setTimeout(() => setShowToast(false), 3000);
//       return;
//     }

//     if (file.size > maxSize) {
//       setToastMessage('File size should be less than 5MB');
//       setToastType('error');
//       setShowToast(true);
//       setTimeout(() => setShowToast(false), 3000);
//       return;
//     }

//     switch (fileType) {
//       case 'aadharFront':
//         setAadharFront(file);
//         break;
//       case 'aadharBack':
//         setAadharBack(file);
//         break;
//       case 'drivingLicenseFront':
//         setDrivingLicenseFront(file);
//         break;
//       case 'drivingLicenseBack':
//         setDrivingLicenseBack(file);
//         break;
//       case 'panCard':
//         setPanCard(file);
//         break;
//       case 'vehicleRC':
//         setVehicleRC(file);
//         break;
//       case 'livePhoto':
//         setLivePhoto(file);
//         break;
//       default:
//         break;
//     }
//   };

//   const nextStep = () => {
//     if (currentStep === 1) {
//       const nameError = validateName(formData.fullName);
//       const emailError = validateEmailWithExistence(formData.email);
//       const phoneError = validatePhoneWithExistence(formData.phone);
//       const passwordError = formData.password && !validatePassword(formData.password) 
//         ? 'Invalid password' : '';
//       const confirmPasswordError = formData.confirmPassword && formData.password !== formData.confirmPassword 
//         ? 'Passwords do not match' : '';

//       const errors = {
//         fullName: nameError,
//         email: emailError,
//         phone: phoneError,
//         password: passwordError,
//         confirmPassword: confirmPasswordError
//       };

//       setFormErrors(errors);

//       if (Object.values(errors).some(error => error !== '') || !agreeToTerms) {
//         setToastMessage('Please fix all errors and agree to terms');
//         setToastType('error');
//         setShowToast(true);
//         setTimeout(() => setShowToast(false), 3000);
//         return;
//       }

//       if (!isPhoneVerified || !isEmailVerified) {
//         setToastMessage('Please verify your phone and email before proceeding');
//         setToastType('error');
//         setShowToast(true);
//         setTimeout(() => setShowToast(false), 3000);
//         return;
//       }
//     } else if (currentStep === 2) {
//       const aadharError = validateAadhar(formData.aadharNumber);
//       const panError = validatePAN(formData.panNumber);
      
//       setFormErrors(prev => ({
//         ...prev,
//         aadharNumber: aadharError,
//         panNumber: panError
//       }));

//       if (aadharError || panError || !aadharFront || !aadharBack || !panCard) {
//         setToastMessage('Please complete all Aadhar and PAN details');
//         setToastType('error');
//         setShowToast(true);
//         setTimeout(() => setShowToast(false), 3000);
//         return;
//       }

//       if (!isAadharVerified) {
//         setToastMessage('Please verify your Aadhar with OTP before proceeding');
//         setToastType('error');
//         setShowToast(true);
//         setTimeout(() => setShowToast(false), 3000);
//         return;
//       }
//     } else if (currentStep === 3) {
//       const vehicleError = validateVehicleNumber(formData.vehicleNumber);
//       const licenseError = validateDrivingLicense(formData.drivingLicenseNumber);
      
//       setFormErrors(prev => ({
//         ...prev,
//         vehicleNumber: vehicleError,
//         drivingLicenseNumber: licenseError
//       }));

//       if (vehicleError || licenseError || !drivingLicenseFront || !drivingLicenseBack || !vehicleRC) {
//         setToastMessage('Please complete all driving license and vehicle details');
//         setToastType('error');
//         setShowToast(true);
//         setTimeout(() => setShowToast(false), 3000);
//         return;
//       }
//     }

//     setCurrentStep(currentStep + 1);
//   };

//   const prevStep = () => {
//     setCurrentStep(currentStep - 1);
//   };

//   // Check if user already exists
//   const checkExistingUser = () => {
//     const storedUsers = localStorage.getItem('registeredUsers');
//     if (!storedUsers) return null;
    
//     const existingUsers = JSON.parse(storedUsers);
//     return existingUsers.find(user => 
//       user.email === formData.email || user.phone === formData.phone
//     );
//   };

//   // Handle Submit Function
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (currentStep < 4) {
//       setToastMessage('Please complete all verification steps');
//       setToastType('error');
//       setShowToast(true);
//       setTimeout(() => setShowToast(false), 3000);
//       return;
//     }

//     // Validate all fields
//     const errors = {
//       fullName: validateName(formData.fullName),
//       email: validateEmailWithExistence(formData.email),
//       phone: validatePhoneWithExistence(formData.phone),
//       password: formData.password && !validatePassword(formData.password) ? 'Invalid password' : '',
//       confirmPassword: formData.confirmPassword && formData.password !== formData.confirmPassword ? 'Passwords do not match' : '',
//       aadharNumber: validateAadhar(formData.aadharNumber),
//       panNumber: validatePAN(formData.panNumber),
//       vehicleNumber: validateVehicleNumber(formData.vehicleNumber),
//       drivingLicenseNumber: validateDrivingLicense(formData.drivingLicenseNumber)
//     };

//     setFormErrors(errors);

//     if (Object.values(errors).some(error => error !== '') || !agreeToTerms) {
//       setToastMessage('Please fix all errors and agree to terms');
//       setToastType('error');
//       setShowToast(true);
//       setIsLoading(false);
//       setTimeout(() => setShowToast(false), 3000);
//       return;
//     }

//     // Check if all documents are uploaded
//     const requiredDocs = [aadharFront, aadharBack, drivingLicenseFront, drivingLicenseBack, panCard, vehicleRC, livePhoto];
//     if (requiredDocs.some(doc => !doc)) {
//       setToastMessage('Please upload all required documents');
//       setToastType('error');
//       setShowToast(true);
//       setIsLoading(false);
//       setTimeout(() => setShowToast(false), 3000);
//       return;
//     }

//     // Final check for existing user
//     const existingUser = checkExistingUser();
//     if (existingUser) {
//       setToastMessage('User already exists with this email or phone number');
//       setToastType('error');
//       setShowToast(true);
//       setTimeout(() => setShowToast(false), 3000);
//       return;
//     }

//     setIsLoading(true);

//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 1000));

//     // Create user object with proper structure
//     const newUser = {
//       id: Date.now(),
//       fullName: formData.fullName,
//       email: formData.email,
//       phone: formData.phone,
//       password: formData.password,
//       userType: 'delivery',
//       createdAt: new Date().toISOString(),
//       documents: {
//         aadharNumber: formData.aadharNumber,
//         panNumber: formData.panNumber,
//         vehicleNumber: formData.vehicleNumber,
//         drivingLicenseNumber: formData.drivingLicenseNumber,
//         aadharFrontFileName: aadharFront ? aadharFront.name : '',
//         aadharBackFileName: aadharBack ? aadharBack.name : '',
//         drivingLicenseFrontFileName: drivingLicenseFront ? drivingLicenseFront.name : '',
//         drivingLicenseBackFileName: drivingLicenseBack ? drivingLicenseBack.name : '',
//         panCardFileName: panCard ? panCard.name : '',
//         vehicleRCFileName: vehicleRC ? vehicleRC.name : '',
//         livePhotoFileName: livePhoto ? livePhoto.name : ''
//       },
//       verification: {
//         isPhoneVerified: true,
//         isEmailVerified: true,
//         isAadharVerified: true,
//         status: 'pending'
//       },
//       isActive: true,
//       deliveriesCompleted: 0,
//       rating: 0,
//       earnings: 0
//     };

//     const storedUsers = localStorage.getItem('registeredUsers');
//     const existingUsers = storedUsers ? JSON.parse(storedUsers) : [];
//     const updatedUsers = [...existingUsers, newUser];
    
//     localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));

//     // Also set current user in localStorage for immediate login
//     localStorage.setItem('currentUser', JSON.stringify({
//       id: newUser.id,
//       fullName: newUser.fullName,
//       email: newUser.email,
//       userType: newUser.userType,
//       isVerified: true
//     }));

//     setToastMessage(`Account created! Welcome ${formData.fullName}`);
//     setToastType('success');
//     setShowToast(true);
    
//     // Reset form
//     setFormData({
//       fullName: '',
//       email: '',
//       phone: '',
//       password: '',
//       confirmPassword: '',
//       aadharNumber: '',
//       panNumber: '',
//       vehicleNumber: '',
//       drivingLicenseNumber: ''
//     });
//     setFormErrors({});
//     setAgreeToTerms(false);
//     setShowPassword(false);
//     setShowConfirmPassword(false);
//     setCurrentStep(1);
//     setAadharFront(null);
//     setAadharBack(null);
//     setDrivingLicenseFront(null);
//     setDrivingLicenseBack(null);
//     setPanCard(null);
//     setVehicleRC(null);
//     setLivePhoto(null);
//     setIsPhoneVerified(false);
//     setIsEmailVerified(false);
//     setIsAadharVerified(false);
//     setAadharOtpSent(false);
//     setAadharOtp('');
//     setPhoneOtpSent(false);
//     setPhoneOtp('');
//     setEmailOtpSent(false);
//     setEmailOtp('');
//     setIsEditingEmail(false);
//     setIsEditingPhone(false);
//     setOriginalEmail('');
//     setOriginalPhone('');

//     setTimeout(() => {
//       setShowToast(false);
//       if (onSignupSuccess) {
//         onSignupSuccess();
//       }
//     }, 2000);

//     setIsLoading(false);
//   };

//   const passwordStrength = validatePassword(formData.password) ? 'strong' : 'weak';

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword(!showConfirmPassword);
//   };

//   // File upload component with SVG Icons
//   const FileUploadField = ({ label, file, onFileChange, required = false }) => (
//     <div style={{ marginBottom: '16px', textAlign: 'left' }}>
//       <label style={{
//         display: 'block',
//         marginBottom: '6px',
//         fontWeight: '500',
//         color: '#124441',
//         fontSize: '13px'
//       }}>
//         {label} {required && '*'}
//       </label>
//       <div style={{
//         border: '2px dashed #4DB6AC',
//         borderRadius: '8px',
//         padding: '20px',
//         textAlign: 'center',
//         backgroundColor: file ? '#E0F2F1' : '#FFFFFF',
//         cursor: 'pointer',
//         position: 'relative'
//       }}>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => onFileChange(e.target.files[0])}
//           style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%',
//             opacity: 0,
//             cursor: 'pointer'
//           }}
//         />
//         {file ? (
//           <div>
//             <div style={{ marginBottom: '8px' }}>
//               <SuccessIcon />
//             </div>
//             <div style={{ fontSize: '12px', color: '#009688' }}>File uploaded</div>
//             <div style={{ fontSize: '10px', color: '#4F6F6B' }}>{file.name}</div>
//           </div>
//         ) : (
//           <div>
//             <div style={{ marginBottom: '8px' }}>
//               <UploadIcon />
//             </div>
//             <div style={{ fontSize: '12px', color: '#4F6F6B' }}>Click to upload</div>
//             <div style={{ fontSize: '10px', color: '#4DB6AC' }}>JPEG, PNG (Max 5MB)</div>
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   // Step 1: Basic Information (UPDATED with SVG Icons)
//   const renderStep1 = () => (
//     <div>
//       <div style={{ marginBottom: '16px', textAlign: 'left' }}>
//         <label style={labelStyle}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="#124441">
//               <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
//             </svg>
//             Full Name
//           </div>
//         </label>
//         <input
//           type="text"
//           name="fullName"
//           value={formData.fullName}
//           onChange={handleChange}
//           onBlur={handleBlur}
//           required
//           placeholder="Enter your full name"
//           style={inputStyle(formErrors.fullName)}
//         />
//         {formErrors.fullName && <div style={errorStyle}>{formErrors.fullName}</div>}
//       </div>

//       {/* Email with OTP Verification - UPDATED with Edit Mode and SVG Icons */}
//       <div style={{ marginBottom: '16px', textAlign: 'left' }}>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
//           <label style={labelStyle}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
//               <EmailIcon />
//               Email Address
//             </div>
//           </label>
//           {isEmailVerified && !isEditingEmail && (
//             <button
//               type="button"
//               onClick={handleEditEmail}
//               style={{
//                 fontSize: '11px',
//                 backgroundColor: 'transparent',
//                 color: '#009688',
//                 border: '1px solid #009688',
//                 borderRadius: '4px',
//                 padding: '4px 8px',
//                 cursor: 'pointer',
//                 fontWeight: '500',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '4px'
//               }}
//             >
//               <EditIcon />
//               Edit
//             </button>
//           )}
//           {isEditingEmail && (
//             <button
//               type="button"
//               onClick={handleCancelEditEmail}
//               style={{
//                 fontSize: '11px',
//                 backgroundColor: 'transparent',
//                 color: '#EF4444',
//                 border: '1px solid #EF4444',
//                 borderRadius: '4px',
//                 padding: '4px 8px',
//                 cursor: 'pointer',
//                 fontWeight: '500',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '4px'
//               }}
//             >
//               <CancelIcon />
//               Cancel
//             </button>
//           )}
//         </div>
        
//         <div style={{ position: 'relative' }}>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             required
//             placeholder="Enter your email"
//             style={{
//               ...inputStyle(formErrors.email),
//               paddingLeft: '36px',
//               paddingRight: isEmailVerified && !isEditingEmail ? '120px' : emailOtpSent ? '200px' : '120px',
//               borderColor: isEmailVerified ? '#009688' : formErrors.email ? '#EF4444' : '#4DB6AC'
//             }}
//             disabled={isEmailVerified && !isEditingEmail}
//           />
          
//           <div style={{
//             position: 'absolute',
//             left: '12px',
//             top: '50%',
//             transform: 'translateY(-50%)',
//             color: isEmailVerified ? '#009688' : formErrors.email ? '#EF4444' : '#4DB6AC'
//           }}>
//             <EmailIcon />
//           </div>
          
//           {!isEmailVerified || isEditingEmail ? (
//             <button
//               type="button"
//               onClick={emailOtpSent ? null : sendEmailOtp}
//               disabled={emailOtpSent || verificationLoading.email || !formData.email || formErrors.email}
//               style={{
//                 position: 'absolute',
//                 right: emailOtpSent ? '100px' : '8px',
//                 top: '50%',
//                 transform: 'translateY(-50%)',
//                 padding: '6px 12px',
//                 fontSize: '11px',
//                 backgroundColor: emailOtpSent ? '#4F6F6B' : '#009688',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '4px',
//                 cursor: (emailOtpSent || verificationLoading.email || !formData.email || formErrors.email) ? 'not-allowed' : 'pointer',
//                 opacity: (emailOtpSent || !formData.email || formErrors.email) ? 0.6 : 1,
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '4px'
//               }}
//             >
//               {verificationLoading.email ? (
//                 <>
//                   <LoadingIcon />
//                   Sending...
//                 </>
//               ) : emailOtpSent ? (
//                 <>
//                   <CheckIcon />
//                   OTP Sent
//                 </>
//               ) : (
//                 'Send OTP'
//               )}
//             </button>
//           ) : (
//             <div style={{
//               position: 'absolute',
//               right: '8px',
//               top: '50%',
//               transform: 'translateY(-50%)',
//               padding: '6px 12px',
//               fontSize: '11px',
//               backgroundColor: '#009688',
//               color: 'white',
//               border: 'none',
//               borderRadius: '4px',
//               display: 'flex',
//               alignItems: 'center',
//               gap: '4px'
//             }}>
//               <CheckIcon />
//               Verified
//             </div>
//           )}
//         </div>
//         {formErrors.email && <div style={errorStyle}>{formErrors.email}</div>}
        
//         {/* Email OTP Input */}
//         {emailOtpSent && (!isEmailVerified || isEditingEmail) && (
//           <div style={{ marginTop: '8px' }}>
//             <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
//               <input
//                 type="text"
//                 value={emailOtp}
//                 onChange={(e) => setEmailOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
//                 placeholder="Enter 6-digit OTP"
//                 style={{...inputStyle(false), flex: 1, paddingLeft: '36px'}}
//               />
//               <div style={{
//                 position: 'absolute',
//                 left: '12px',
//                 top: '50%',
//                 transform: 'translateY(-50%)',
//                 color: '#4DB6AC'
//               }}>
//                 <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//                   <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
//                 </svg>
//               </div>
//               <button
//                 type="button"
//                 onClick={verifyEmailOtp}
//                 disabled={verificationLoading.email || !emailOtp || emailOtp.length !== 6}
//                 style={{
//                   padding: '10px 16px',
//                   fontSize: '12px',
//                   backgroundColor: '#009688',
//                   color: 'white',
//                   border: 'none',
//                   borderRadius: '6px',
//                   cursor: (verificationLoading.email || !emailOtp || emailOtp.length !== 6) ? 'not-allowed' : 'pointer',
//                   opacity: (!emailOtp || emailOtp.length !== 6) ? 0.6 : 1,
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '4px'
//                 }}
//               >
//                 {verificationLoading.email ? (
//                   <>
//                     <LoadingIcon />
//                     Verifying...
//                   </>
//                 ) : (
//                   <>
//                     <CheckIcon />
//                     Verify
//                   </>
//                 )}
//               </button>
//             </div>
//             <div style={{ fontSize: '11px', color: '#4F6F6B', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
//               <InfoIcon />
//               Check your email for OTP (Mock: {emailOtp})
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Phone with OTP Verification - UPDATED with Edit Mode and SVG Icons */}
//       <div style={{ marginBottom: '16px', textAlign: 'left' }}>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
//           <label style={labelStyle}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
//               <PhoneIcon />
//               Phone Number
//             </div>
//           </label>
//           {isPhoneVerified && !isEditingPhone && (
//             <button
//               type="button"
//               onClick={handleEditPhone}
//               style={{
//                 fontSize: '11px',
//                 backgroundColor: 'transparent',
//                 color: '#009688',
//                 border: '1px solid #009688',
//                 borderRadius: '4px',
//                 padding: '4px 8px',
//                 cursor: 'pointer',
//                 fontWeight: '500',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '4px'
//               }}
//             >
//               <EditIcon />
//               Edit
//             </button>
//           )}
//           {isEditingPhone && (
//             <button
//               type="button"
//               onClick={handleCancelEditPhone}
//               style={{
//                 fontSize: '11px',
//                 backgroundColor: 'transparent',
//                 color: '#EF4444',
//                 border: '1px solid #EF4444',
//                 borderRadius: '4px',
//                 padding: '4px 8px',
//                 cursor: 'pointer',
//                 fontWeight: '500',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '4px'
//               }}
//             >
//               <CancelIcon />
//               Cancel
//             </button>
//           )}
//         </div>
        
//         <div style={{ position: 'relative' }}>
//           <input
//             type="tel"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             required
//             placeholder="Enter your 10-digit phone number"
//             style={{
//               ...inputStyle(formErrors.phone),
//               paddingLeft: '36px',
//               paddingRight: isPhoneVerified && !isEditingPhone ? '120px' : phoneOtpSent ? '200px' : '120px',
//               borderColor: isPhoneVerified ? '#009688' : formErrors.phone ? '#EF4444' : '#4DB6AC'
//             }}
//             disabled={isPhoneVerified && !isEditingPhone}
//           />
          
//           <div style={{
//             position: 'absolute',
//             left: '12px',
//             top: '50%',
//             transform: 'translateY(-50%)',
//             color: isPhoneVerified ? '#009688' : formErrors.phone ? '#EF4444' : '#4DB6AC'
//           }}>
//             <PhoneIcon />
//           </div>
          
//           {!isPhoneVerified || isEditingPhone ? (
//             <button
//               type="button"
//               onClick={phoneOtpSent ? null : sendPhoneOtp}
//               disabled={phoneOtpSent || verificationLoading.phone || !formData.phone || formErrors.phone}
//               style={{
//                 position: 'absolute',
//                 right: phoneOtpSent ? '100px' : '8px',
//                 top: '50%',
//                 transform: 'translateY(-50%)',
//                 padding: '6px 12px',
//                 fontSize: '11px',
//                 backgroundColor: phoneOtpSent ? '#4F6F6B' : '#009688',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '4px',
//                 cursor: (phoneOtpSent || verificationLoading.phone || !formData.phone || formErrors.phone) ? 'not-allowed' : 'pointer',
//                 opacity: (phoneOtpSent || !formData.phone || formErrors.phone) ? 0.6 : 1,
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '4px'
//               }}
//             >
//               {verificationLoading.phone ? (
//                 <>
//                   <LoadingIcon />
//                   Sending...
//                 </>
//               ) : phoneOtpSent ? (
//                 <>
//                   <CheckIcon />
//                   OTP Sent
//                 </>
//               ) : (
//                 'Send OTP'
//               )}
//             </button>
//           ) : (
//             <div style={{
//               position: 'absolute',
//               right: '8px',
//               top: '50%',
//               transform: 'translateY(-50%)',
//               padding: '6px 12px',
//               fontSize: '11px',
//               backgroundColor: '#009688',
//               color: 'white',
//               border: 'none',
//               borderRadius: '4px',
//               display: 'flex',
//               alignItems: 'center',
//               gap: '4px'
//             }}>
//               <CheckIcon />
//               Verified
//             </div>
//           )}
//         </div>
//         {formErrors.phone && <div style={errorStyle}>{formErrors.phone}</div>}
        
//         {/* Phone OTP Input */}
//         {phoneOtpSent && (!isPhoneVerified || isEditingPhone) && (
//           <div style={{ marginTop: '8px' }}>
//             <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
//               <input
//                 type="text"
//                 value={phoneOtp}
//                 onChange={(e) => setPhoneOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
//                 placeholder="Enter 6-digit OTP"
//                 style={{...inputStyle(false), flex: 1, paddingLeft: '36px'}}
//               />
//               <div style={{
//                 position: 'absolute',
//                 left: '12px',
//                 top: '50%',
//                 transform: 'translateY(-50%)',
//                 color: '#4DB6AC'
//               }}>
//                 <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//                   <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
//                 </svg>
//               </div>
//               <button
//                 type="button"
//                 onClick={verifyPhoneOtp}
//                 disabled={verificationLoading.phone || !phoneOtp || phoneOtp.length !== 6}
//                 style={{
//                   padding: '10px 16px',
//                   fontSize: '12px',
//                   backgroundColor: '#009688',
//                   color: 'white',
//                   border: 'none',
//                   borderRadius: '6px',
//                   cursor: (verificationLoading.phone || !phoneOtp || phoneOtp.length !== 6) ? 'not-allowed' : 'pointer',
//                   opacity: (!phoneOtp || phoneOtp.length !== 6) ? 0.6 : 1,
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '4px'
//                 }}
//               >
//                 {verificationLoading.phone ? (
//                   <>
//                     <LoadingIcon />
//                     Verifying...
//                   </>
//                 ) : (
//                   <>
//                     <CheckIcon />
//                     Verify
//                   </>
//                 )}
//               </button>
//             </div>
//             <div style={{ fontSize: '11px', color: '#4F6F6B', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
//               <InfoIcon />
//               Check your phone for OTP (Mock: {phoneOtp})
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Password Fields with SVG Icons */}
//       <div style={{ marginBottom: '16px', textAlign: 'left' }}>
//         <label style={labelStyle}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="#124441">
//               <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
//             </svg>
//             Password
//           </div>
//         </label>
//         <div style={{ position: 'relative' }}>
//           <input
//             type={showPassword ? 'text' : 'password'}
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             required
//             placeholder="Create a strong password"
//             style={{...inputStyle(formErrors.password), paddingLeft: '36px', paddingRight: '45px'}}
//           />
//           <div style={{
//             position: 'absolute',
//             left: '12px',
//             top: '50%',
//             transform: 'translateY(-50%)',
//             color: formErrors.password ? '#EF4444' : '#4DB6AC'
//           }}>
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//               <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
//             </svg>
//           </div>
//           <button
//             type="button"
//             onClick={togglePasswordVisibility}
//             style={{
//               position: 'absolute',
//               right: '12px',
//               top: '50%',
//               transform: 'translateY(-50%)',
//               background: 'none',
//               border: 'none',
//               cursor: 'pointer',
//               color: '#4F6F6B',
//               padding: '4px',
//               borderRadius: '4px',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               width: '30px',
//               height: '30px'
//             }}
//           >
//             {showPassword ? <EyeOffIcon /> : <EyeIcon />}
//           </button>
//         </div>
//         {formData.password && !formErrors.password && (
//           <div style={passwordStrength === 'strong' ? successStyle : errorStyle}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
//               {passwordStrength === 'strong' ? <CheckIcon /> : <CloseIcon />}
//               {passwordStrength === 'strong' ? 'Strong password' : 'Weak password'}
//             </div>
//           </div>
//         )}
//         {formErrors.password && (
//           <div style={errorStyle}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
//               <CloseIcon />
//               {formErrors.password}
//             </div>
//           </div>
//         )}
//       </div>

//       <div style={{ marginBottom: '20px', textAlign: 'left' }}>
//         <label style={labelStyle}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="#124441">
//               <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
//             </svg>
//             Confirm Password
//           </div>
//         </label>
//         <div style={{ position: 'relative' }}>
//           <input
//             type={showConfirmPassword ? 'text' : 'password'}
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             required
//             placeholder="Confirm your password"
//             style={{...inputStyle(formErrors.confirmPassword), paddingLeft: '36px', paddingRight: '45px'}}
//           />
//           <div style={{
//             position: 'absolute',
//             left: '12px',
//             top: '50%',
//             transform: 'translateY(-50%)',
//             color: formErrors.confirmPassword ? '#EF4444' : '#4DB6AC'
//           }}>
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//               <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
//             </svg>
//           </div>
//           <button
//             type="button"
//             onClick={toggleConfirmPasswordVisibility}
//             style={{
//               position: 'absolute',
//               right: '12px',
//               top: '50%',
//               transform: 'translateY(-50%)',
//               background: 'none',
//               border: 'none',
//               cursor: 'pointer',
//               color: '#4F6F6B',
//               padding: '4px',
//               borderRadius: '4px',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               width: '30px',
//               height: '30px'
//             }}
//           >
//             {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
//           </button>
//         </div>
//         {formErrors.confirmPassword && (
//           <div style={errorStyle}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
//               <CloseIcon />
//               {formErrors.confirmPassword}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Verification Status - UPDATED with SVG Icons */}
//       {(isPhoneVerified || isEmailVerified) && (
//         <div style={{
//           backgroundColor: '#E0F2F1',
//           border: '1px solid #009688',
//           borderRadius: '8px',
//           padding: '12px',
//           marginBottom: '16px'
//         }}>
//           <div style={{ fontSize: '12px', fontWeight: '600', color: '#124441', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
//             <InfoIcon />
//             Verification Status:
//           </div>
//           <div style={{ fontSize: '11px', color: '#4F6F6B', display: 'flex', flexDirection: 'column', gap: '4px' }}>
//             {isPhoneVerified && (
//               <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
//                 <CheckIcon />
//                 Phone Number Verified {isEditingPhone ? '(Editing...)' : ''}
//               </div>
//             )}
//             {isEmailVerified && (
//               <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
//                 <CheckIcon />
//                 Email Address Verified {isEditingEmail ? '(Editing...)' : ''}
//               </div>
//             )}
//             {(!isPhoneVerified || !isEmailVerified) && (
//               <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
//                 <InfoIcon />
//                 Please complete all verifications to proceed
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );

//   // Step 2: Aadhar & PAN Verification (with SVG Icons)
//   const renderStep2 = () => (
//     <div>
//       <div style={{ marginBottom: '16px', textAlign: 'left' }}>
//         <label style={labelStyle}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="#124441">
//               <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"/>
//             </svg>
//             Aadhar Number
//           </div>
//         </label>
//         <div style={{ position: 'relative' }}>
//           <input
//             type="text"
//             name="aadharNumber"
//             value={formData.aadharNumber}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             required
//             placeholder="Enter 12-digit Aadhar number"
//             style={{
//               ...inputStyle(formErrors.aadharNumber),
//               paddingLeft: '36px',
//               paddingRight: aadharOtpSent ? '200px' : '120px',
//               borderColor: isAadharVerified ? '#009688' : formErrors.aadharNumber ? '#EF4444' : '#4DB6AC'
//             }}
//           />
//           <div style={{
//             position: 'absolute',
//             left: '12px',
//             top: '50%',
//             transform: 'translateY(-50%)',
//             color: isAadharVerified ? '#009688' : formErrors.aadharNumber ? '#EF4444' : '#4DB6AC'
//           }}>
//             <DocumentIcon />
//           </div>
//           {!isAadharVerified ? (
//             <button
//               type="button"
//               onClick={aadharOtpSent ? null : sendAadharOtp}
//               disabled={aadharOtpSent || verificationLoading.aadhar || !formData.aadharNumber || formErrors.aadharNumber}
//               style={{
//                 position: 'absolute',
//                 right: aadharOtpSent ? '100px' : '8px',
//                 top: '50%',
//                 transform: 'translateY(-50%)',
//                 padding: '6px 12px',
//                 fontSize: '11px',
//                 backgroundColor: aadharOtpSent ? '#4F6F6B' : '#009688',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '4px',
//                 cursor: (aadharOtpSent || verificationLoading.aadhar || !formData.aadharNumber || formErrors.aadharNumber) ? 'not-allowed' : 'pointer',
//                 opacity: (aadharOtpSent || !formData.aadharNumber || formErrors.aadharNumber) ? 0.6 : 1,
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '4px'
//               }}
//             >
//               {verificationLoading.aadhar ? (
//                 <>
//                   <LoadingIcon />
//                   Sending...
//                 </>
//               ) : aadharOtpSent ? (
//                 <>
//                   <CheckIcon />
//                   OTP Sent
//                 </>
//               ) : (
//                 'Send OTP'
//               )}
//             </button>
//           ) : (
//             <div style={{
//               position: 'absolute',
//               right: '8px',
//               top: '50%',
//               transform: 'translateY(-50%)',
//               padding: '6px 12px',
//               fontSize: '11px',
//               backgroundColor: '#009688',
//               color: 'white',
//               border: 'none',
//               borderRadius: '4px',
//               display: 'flex',
//               alignItems: 'center',
//               gap: '4px'
//             }}>
//               <CheckIcon />
//               Verified
//             </div>
//           )}
//         </div>
//         {formErrors.aadharNumber && (
//           <div style={errorStyle}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
//               <CloseIcon />
//               {formErrors.aadharNumber}
//             </div>
//           </div>
//         )}
//       </div>

//       {aadharOtpSent && !isAadharVerified && (
//         <div style={{ marginBottom: '16px', textAlign: 'left' }}>
//           <label style={labelStyle}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="#124441">
//                 <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/>
//               </svg>
//               Aadhar OTP
//             </div>
//           </label>
//           <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
//             <div style={{ position: 'relative', flex: 1 }}>
//               <input
//                 type="text"
//                 value={aadharOtp}
//                 onChange={(e) => setAadharOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
//                 placeholder="Enter 6-digit OTP"
//                 style={{...inputStyle(false), paddingLeft: '36px'}}
//               />
//               <div style={{
//                 position: 'absolute',
//                 left: '12px',
//                 top: '50%',
//                 transform: 'translateY(-50%)',
//                 color: '#4DB6AC'
//               }}>
//                 <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//                   <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
//                 </svg>
//               </div>
//             </div>
//             <button
//               type="button"
//               onClick={verifyAadharOtp}
//               disabled={verificationLoading.aadhar || !aadharOtp || aadharOtp.length !== 6}
//               style={{
//                 padding: '10px 16px',
//                 fontSize: '12px',
//                 backgroundColor: '#009688',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '6px',
//                 cursor: (verificationLoading.aadhar || !aadharOtp || aadharOtp.length !== 6) ? 'not-allowed' : 'pointer',
//                 opacity: (!aadharOtp || aadharOtp.length !== 6) ? 0.6 : 1,
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '4px'
//               }}
//             >
//               {verificationLoading.aadhar ? (
//                 <>
//                   <LoadingIcon />
//                   Verifying...
//                 </>
//               ) : (
//                 <>
//                   <CheckIcon />
//                   Verify OTP
//                 </>
//               )}
//             </button>
//           </div>
//           <div style={{ fontSize: '11px', color: '#4F6F6B', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
//             <InfoIcon />
//             Aadhar OTP sent (Mock: {aadharOtp})
//           </div>
//         </div>
//       )}

//       <div style={{ marginBottom: '16px', textAlign: 'left' }}>
//         <label style={labelStyle}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="#124441">
//               <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
//             </svg>
//             PAN Number
//           </div>
//         </label>
//         <input
//           type="text"
//           name="panNumber"
//           value={formData.panNumber}
//           onChange={handleChange}
//           onBlur={handleBlur}
//           required
//           placeholder="Enter PAN number (e.g., ABCDE1234F)"
//           maxLength="10"
//           style={{...inputStyle(formErrors.panNumber), paddingLeft: '36px'}}
//         />
//         {formErrors.panNumber && (
//           <div style={errorStyle}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
//               <CloseIcon />
//               {formErrors.panNumber}
//             </div>
//           </div>
//         )}
//       </div>

//       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
//         <FileUploadField
//           label="Aadhar Front"
//           file={aadharFront}
//           onFileChange={(file) => handleFileUpload('aadharFront', file)}
//           required
//         />
//         <FileUploadField
//           label="Aadhar Back"
//           file={aadharBack}
//           onFileChange={(file) => handleFileUpload('aadharBack', file)}
//           required
//         />
//       </div>

//       <FileUploadField
//         label="PAN Card"
//         file={panCard}
//         onFileChange={(file) => handleFileUpload('panCard', file)}
//         required
//       />
//     </div>
//   );

//   // Step 3: Driving License & Vehicle Details (with SVG Icons)
//   const renderStep3 = () => (
//     <div>
//       <div style={{ marginBottom: '16px', textAlign: 'left' }}>
//         <label style={labelStyle}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="#124441">
//               <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H15V3H9v2H6.5c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
//             </svg>
//             Driving License Number
//           </div>
//         </label>
//         <input
//           type="text"
//           name="drivingLicenseNumber"
//           value={formData.drivingLicenseNumber}
//           onChange={handleChange}
//           onBlur={handleBlur}
//           required
//           placeholder="Enter driving license number (10-16 chars)"
//           maxLength="16"
//           style={{...inputStyle(formErrors.drivingLicenseNumber), paddingLeft: '36px'}}
//         />
//         {formErrors.drivingLicenseNumber && (
//           <div style={errorStyle}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
//               <CloseIcon />
//               {formErrors.drivingLicenseNumber}
//             </div>
//           </div>
//         )}
//       </div>

//       <div style={{ marginBottom: '16px', textAlign: 'left' }}>
//         <label style={labelStyle}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="#124441">
//               <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H15V3H9v2H6.5c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
//             </svg>
//             Vehicle Number
//           </div>
//         </label>
//         <input
//           type="text"
//           name="vehicleNumber"
//           value={formData.vehicleNumber}
//           onChange={handleChange}
//           onBlur={handleBlur}
//           required
//           placeholder="Enter vehicle number (e.g., KA01AB1234)"
//           maxLength="10"
//           style={{...inputStyle(formErrors.vehicleNumber), paddingLeft: '36px'}}
//         />
//         {formErrors.vehicleNumber && (
//           <div style={errorStyle}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
//               <CloseIcon />
//               {formErrors.vehicleNumber}
//             </div>
//           </div>
//         )}
//       </div>

//       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
//         <FileUploadField
//           label="Driving License Front"
//           file={drivingLicenseFront}
//           onFileChange={(file) => handleFileUpload('drivingLicenseFront', file)}
//           required
//         />
//         <FileUploadField
//           label="Driving License Back"
//           file={drivingLicenseBack}
//           onFileChange={(file) => handleFileUpload('drivingLicenseBack', file)}
//           required
//         />
//       </div>

//       <FileUploadField
//         label="Vehicle RC"
//         file={vehicleRC}
//         onFileChange={(file) => handleFileUpload('vehicleRC', file)}
//         required
//       />
//     </div>
//   );

//   // Step 4: Final Verification (with SVG Icons)
//   const renderStep4 = () => (
//     <div>
//       <FileUploadField
//         label="Live Photo (Selfie)"
//         file={livePhoto}
//         onFileChange={(file) => handleFileUpload('livePhoto', file)}
//         required
//       />
      
//       <div style={{
//         backgroundColor: '#E0F2F1',
//         border: '1px solid #009688',
//         borderRadius: '8px',
//         padding: '16px',
//         marginBottom: '20px',
//         textAlign: 'center'
//       }}>
//         <div style={{ marginBottom: '8px' }}>
//           <DocumentIcon />
//         </div>
//         <h4 style={{ margin: '0 0 8px 0', color: '#124441' }}>Verification Summary</h4>
//         <div style={{ fontSize: '12px', color: '#4F6F6B', textAlign: 'left' }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
//             {isPhoneVerified && isEmailVerified ? <CheckIcon /> : <CloseIcon />}
//             Basic Information: {isPhoneVerified && isEmailVerified ? 'Completed' : 'Pending'}
//           </div>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
//             {isPhoneVerified && isEmailVerified ? <CheckIcon /> : <CloseIcon />}
//             Phone & Email: {isPhoneVerified && isEmailVerified ? 'Verified' : 'Pending'}
//           </div>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
//             {isAadharVerified ? <CheckIcon /> : <CloseIcon />}
//             Aadhar: {isAadharVerified ? 'Verified' : 'Pending'}
//           </div>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
//             {panCard ? <CheckIcon /> : <CloseIcon />}
//             PAN Card: {panCard ? 'Uploaded' : 'Pending'}
//           </div>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
//             {drivingLicenseFront && drivingLicenseBack ? <CheckIcon /> : <CloseIcon />}
//             Driving License: {drivingLicenseFront && drivingLicenseBack ? 'Uploaded' : 'Pending'}
//           </div>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
//             {vehicleRC ? <CheckIcon /> : <CloseIcon />}
//             Vehicle RC: {vehicleRC ? 'Uploaded' : 'Pending'}
//           </div>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
//             {livePhoto ? <CheckIcon /> : <CloseIcon />}
//             Live Photo: {livePhoto ? 'Uploaded' : 'Pending'}
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   // Common styles
//   const labelStyle = {
//     display: 'block',
//     marginBottom: '6px',
//     fontWeight: '500',
//     color: '#124441',
//     fontSize: '13px'
//   };

//   const inputStyle = (hasError) => ({
//     width: '100%',
//     padding: '12px 14px',
//     border: `1px solid ${hasError ? '#EF4444' : '#4DB6AC'}`,
//     borderRadius: '8px',
//     fontSize: '14px',
//     boxSizing: 'border-box',
//     outline: 'none',
//     transition: 'border-color 0.2s ease',
//     color: '#124441',
//     backgroundColor: '#FFFFFF'
//   });

//   const errorStyle = {
//     marginTop: '4px',
//     fontSize: '11px',
//     color: '#EF4444',
//     fontWeight: '500'
//   };

//   const successStyle = {
//     marginTop: '4px',
//     fontSize: '11px',
//     color: '#009688',
//     fontWeight: '500'
//   };

//   return (
//     <div style={containerStyle}>
//       {showToast && (
//         <div style={toastStyle(toastType)}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//             {toastType === 'success' ? <SuccessIcon /> : <ErrorIcon />}
//             {toastMessage}
//           </div>
//         </div>
//       )}

//       {/* Top Navigation Buttons */}
//       <div style={topNavContainerStyle}>
//         <button 
//           style={homeButtonStyle}
//           onClick={handleHomeNavigation}
//         >
//           <HomeIcon />
//           Home
//         </button>
//         <button 
//           style={changeRoleButtonStyle}
//           onClick={handleSwitchToRoleSelection}
//         >
//           <ChangeRoleIcon />
//           Change Role
//         </button>
//       </div>

//       <div style={cardContainerStyle}>
//         {/* Left Side - Updated Design */}
//         <div style={leftSideStyle}>
//           <div style={contentStyle}>
//             <div style={{ marginBottom: '16px' }}>
//               <DeliveryIcon />
//             </div>
//             <h2 style={titleStyle}>
//               Join as a Delivery Partner
//             </h2>
            
//             <p style={quoteStyle}>
//               Join our network of trusted delivery partners and earn competitive rates
//             </p>
            
//             {/* Progress Steps */}
//             <div style={stepsContainerStyle}>
//               <div style={stepStyle(currentStep >= 1)}>
//                 <StepIcon number="1" active={currentStep >= 1} />
//                 <div>
//                   <div style={stepTitleStyle}>Personal Info</div>
//                   <div style={stepSubtitleStyle}>Basic details & contact</div>
//                 </div>
//               </div>
              
//               <div style={stepDividerStyle}></div>
              
//               <div style={stepStyle(currentStep >= 2)}>
//                 <StepIcon number="2" active={currentStep >= 2} />
//                 <div>
//                   <div style={stepTitleStyle}>Security</div>
//                   <div style={stepSubtitleStyle}>Aadhar & PAN verification</div>
//                 </div>
//               </div>
              
//               <div style={stepDividerStyle}></div>
              
//               <div style={stepStyle(currentStep >= 3)}>
//                 <StepIcon number="3" active={currentStep >= 3} />
//                 <div>
//                   <div style={stepTitleStyle}>Delivery Partner Details</div>
//                   <div style={stepSubtitleStyle}>License & vehicle info</div>
//                 </div>
//               </div>
//             </div>
            
//             {/* Benefits Section */}
//             <div style={benefitsContainerStyle}>
//               <h4 style={benefitsTitleStyle}>Benefits:</h4>
//               <div style={benefitsListStyle}>
//                 <div style={benefitItemStyle}>
//                   <BenefitCheckIcon />
//                   <span>Flexible working hours</span>
//                 </div>
//                 <div style={benefitItemStyle}>
//                   <BenefitCheckIcon />
//                   <span>Competitive commission rates</span>
//                 </div>
//                 <div style={benefitItemStyle}>
//                   <BenefitCheckIcon />
//                   <span>Real-time delivery tracking</span>
//                 </div>
//                 <div style={benefitItemStyle}>
//                   <BenefitCheckIcon />
//                   <span>Weekly payments</span>
//                 </div>
//                 <div style={benefitItemStyle}>
//                   <BenefitCheckIcon />
//                   <span>Insurance coverage</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Side - Signup Form */}
//         <div style={rightSideStyle}>
//           <div style={headerStyle}>
//             <h1 style={appNameStyle}>QUICKMED</h1>
//             <h2 style={formTitleStyle}>
//               Delivery Partner Registration (Step {currentStep}/4)
//             </h2>
//           </div>

//           <form onSubmit={handleSubmit}>
//             <>
//               {currentStep === 1 && renderStep1()}
//               {currentStep === 2 && renderStep2()}
//               {currentStep === 3 && renderStep3()}
//               {currentStep === 4 && renderStep4()}
//             </>

//             {/* Terms and Conditions Checkbox */}
//             <div style={{ marginBottom: '20px', textAlign: 'left' }}>
//               <label style={termsLabelStyle}>
//                 <input
//                   type="checkbox"
//                   checked={agreeToTerms}
//                   onChange={(e) => setAgreeToTerms(e.target.checked)}
//                   style={{ marginTop: '2px' }}
//                 />
//                 <span>
//                   I agree to the{' '}
//                   <a 
//                     href="https://drive.google.com/file/d/1bZkQuNNdVootx27yQ0lMbIpqn83oIrYn/view?usp=sharing"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     style={linkStyle}
//                     onClick={(e) => e.preventDefault()}
//                   >
//                     Terms of Service
//                   </a>{' '}
//                   and{' '}
//                   <a 
//                     href="https://drive.google.com/file/d/1D3PHKle-WG-A9sJv2f4O2ZjBzoGaKLzo/view?usp=sharing"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     style={linkStyle}
//                     onClick={(e) => e.preventDefault()}
//                   >
//                     Privacy Policy
//                   </a>
//                 </span>
//               </label>
//             </div>

//             {/* Navigation Buttons for Delivery */}
//             <div style={navigationButtonsStyle}>
//               {currentStep > 1 && (
//                 <button
//                   type="button"
//                   onClick={prevStep}
//                   style={secondaryButtonStyle}
//                 >
//                   ← Previous
//                 </button>
//               )}
//               {currentStep < 4 ? (
//                 <button
//                   type="button"
//                   onClick={nextStep}
//                   style={primaryButtonStyle}
//                 >
//                   Next →
//                 </button>
//               ) : (
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   style={{...primaryButtonStyle, opacity: isLoading ? 0.7 : 1}}
//                 >
//                   {isLoading ? (
//                     <>
//                       <LoadingIcon />
//                       Creating Account...
//                     </>
//                   ) : (
//                     'Complete Registration'
//                   )}
//                 </button>
//               )}
//             </div>
//           </form>

//           <div style={switchAuthStyle}>
//             <p style={switchTextStyle}>
//               Already have an account? <span 
//                 onClick={() => !isLoading && handleSwitchToLogin()}
//                 style={switchLinkStyle}
//               >
//                 Login here 
//               </span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Styles
// const containerStyle = {
//   minHeight: '100vh',
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'center',
//   alignItems: 'center',
//   fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
//   backgroundColor: '#E0F2F1',
//   padding: '20px',
//   position: 'relative'
// };

// const topNavContainerStyle = {
//   position: 'absolute',
//   top: '20px',
//   left: '20px',
//   display: 'flex',
//   gap: '12px',
//   zIndex: 100
// };

// const homeButtonStyle = {
//   padding: '10px 20px',
//   backgroundColor: '#009688',
//   color: 'white',
//   border: 'none',
//   borderRadius: '8px',
//   fontSize: '14px',
//   fontWeight: '500',
//   cursor: 'pointer',
//   transition: 'all 0.3s ease',
//   boxShadow: '0 2px 8px rgba(0, 150, 136, 0.3)',
//   display: 'flex',
//   alignItems: 'center',
//   gap: '6px'
// };

// const changeRoleButtonStyle = {
//   padding: '10px 20px',
//   backgroundColor: 'white',
//   color: '#009688',
//   border: '2px solid #009688',
//   borderRadius: '8px',
//   fontSize: '14px',
//   fontWeight: '500',
//   cursor: 'pointer',
//   transition: 'all 0.3s ease',
//   display: 'flex',
//   alignItems: 'center',
//   gap: '6px'
// };

// const toastStyle = (type) => ({
//   position: 'fixed',
//   top: '80px',
//   right: '20px',
//   backgroundColor: type === 'success' ? '#009688' : '#EF4444',
//   color: 'white',
//   padding: '12px 20px',
//   borderRadius: '8px',
//   boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
//   zIndex: 1000,
//   animation: 'slideInRight 0.3s ease-out',
//   fontSize: '14px',
//   fontWeight: '500'
// });

// const cardContainerStyle = {
//   display: 'flex',
//   width: '100%',
//   maxWidth: '1200px',
//   backgroundColor: 'white',
//   borderRadius: '16px',
//   boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
//   overflow: 'hidden',
//   minHeight: '700px',
//   marginTop: '60px'
// };

// const leftSideStyle = {
//   flex: 1,
//   background: `linear-gradient(135deg, #009688 0%, #00796B 100%)`,
//   color: 'white',
//   padding: '50px 40px',
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'center'
// };

// const contentStyle = {
//   textAlign: 'center'
// };

// const titleStyle = {
//   fontSize: '28px',
//   fontWeight: '700',
//   marginBottom: '16px',
//   lineHeight: '1.3'
// };

// const quoteStyle = {
//   fontSize: '16px',
//   lineHeight: '1.6',
//   opacity: 0.9,
//   marginBottom: '40px',
//   maxWidth: '400px',
//   marginLeft: 'auto',
//   marginRight: 'auto'
// };

// // Steps container
// const stepsContainerStyle = {
//   marginBottom: '40px',
//   textAlign: 'left'
// };

// const stepStyle = (isActive) => ({
//   display: 'flex',
//   alignItems: 'center',
//   gap: '16px',
//   marginBottom: '24px',
//   opacity: isActive ? 1 : 0.7
// });

// const stepTitleStyle = {
//   fontSize: '16px',
//   fontWeight: '600',
//   marginBottom: '4px'
// };

// const stepSubtitleStyle = {
//   fontSize: '12px',
//   opacity: 0.8
// };

// const stepDividerStyle = {
//   height: '20px',
//   width: '2px',
//   backgroundColor: 'rgba(255, 255, 255, 0.3)',
//   marginLeft: '27px',
//   marginBottom: '8px'
// };

// // Benefits section
// const benefitsContainerStyle = {
//   backgroundColor: 'rgba(255, 255, 255, 0.1)',
//   borderRadius: '12px',
//   padding: '20px',
//   textAlign: 'left'
// };

// const benefitsTitleStyle = {
//   fontSize: '18px',
//   fontWeight: '600',
//   marginBottom: '16px',
//   marginTop: 0
// };

// const benefitsListStyle = {
//   display: 'flex',
//   flexDirection: 'column',
//   gap: '12px'
// };

// const benefitItemStyle = {
//   display: 'flex',
//   alignItems: 'center',
//   gap: '12px',
//   fontSize: '14px'
// };

// const rightSideStyle = {
//   flex: 1,
//   padding: '40px',
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'center',
//   overflowY: 'auto'
// };

// const headerStyle = {
//   textAlign: 'center',
//   marginBottom: '30px'
// };

// const appNameStyle = {
//   fontSize: '32px',
//   fontWeight: '700',
//   marginBottom: '8px',
//   color: '#009688'
// };

// const formTitleStyle = {
//   color: '#124441',
//   fontSize: '20px',
//   fontWeight: '600',
//   marginBottom: '4px'
// };

// const termsLabelStyle = {
//   display: 'flex',
//   alignItems: 'flex-start',
//   gap: '8px',
//   cursor: 'pointer',
//   fontSize: '13px',
//   color: '#124441'
// };

// const linkStyle = {
//   color: '#009688',
//   fontWeight: '500',
//   cursor: 'pointer',
//   textDecoration: 'underline'
// };

// const navigationButtonsStyle = {
//   display: 'flex',
//   gap: '12px',
//   marginBottom: '20px'
// };

// const primaryButtonStyle = {
//   flex: 1,
//   padding: '14px',
//   backgroundColor: '#009688',
//   color: 'white',
//   border: 'none',
//   borderRadius: '8px',
//   fontSize: '14px',
//   fontWeight: '600',
//   cursor: 'pointer',
//   transition: 'all 0.3s ease',
//   boxShadow: '0 4px 12px rgba(0, 150, 136, 0.3)',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   gap: '8px'
// };

// const secondaryButtonStyle = {
//   flex: 1,
//   padding: '14px',
//   backgroundColor: 'transparent',
//   color: '#009688',
//   border: '2px solid #009688',
//   borderRadius: '8px',
//   fontSize: '14px',
//   fontWeight: '600',
//   cursor: 'pointer',
//   transition: 'all 0.3s ease'
// };

// const switchAuthStyle = {
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   marginTop: '20px'
// };

// const switchTextStyle = {
//   color: '#4F6F6B',
//   fontSize: '14px',
//   textAlign: 'center',
//   margin: 0
// };

// const switchLinkStyle = {
//   color: '#009688',
//   fontWeight: '600',
//   cursor: 'pointer'
// };

// export default DeliverySignup;









import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const DeliverySignup = ({ onSwitchToLogin, onSignupSuccess, onSwitchToRoleSelection }) => {
  
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    // Delivery specific fields
    aadharNumber: '',
    panNumber: '',
    vehicleNumber: '',
    drivingLicenseNumber: ''
  });
  
  const [formErrors, setFormErrors] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    aadharNumber: '',
    panNumber: '',
    vehicleNumber: '',
    drivingLicenseNumber: ''
  });
  
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [isLoading, setIsLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Delivery specific state
  const [currentStep, setCurrentStep] = useState(1);
  const [aadharFront, setAadharFront] = useState(null);
  const [aadharBack, setAadharBack] = useState(null);
  const [drivingLicenseFront, setDrivingLicenseFront] = useState(null);
  const [drivingLicenseBack, setDrivingLicenseBack] = useState(null);
  const [panCard, setPanCard] = useState(null);
  const [vehicleRC, setVehicleRC] = useState(null);
  const [livePhoto, setLivePhoto] = useState(null);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isAadharVerified, setIsAadharVerified] = useState(false);
  const [aadharOtpSent, setAadharOtpSent] = useState(false);
  const [aadharOtp, setAadharOtp] = useState('');
  
  // Verification states
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [phoneOtp, setPhoneOtp] = useState('');
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailOtp, setEmailOtp] = useState('');
  const [verificationLoading, setVerificationLoading] = useState({
    phone: false,
    email: false,
    aadhar: false
  });

  // NEW: Edit mode states
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [originalEmail, setOriginalEmail] = useState('');
  const [originalPhone, setOriginalPhone] = useState('');

  // NEW: Track user existence during typing
  const [existingUsers, setExistingUsers] = useState([]);

  // Load existing users on component mount
  useEffect(() => {
    const storedUsers = localStorage.getItem('registeredUsers');
    if (storedUsers) {
      setExistingUsers(JSON.parse(storedUsers));
    }
  }, []);

  // SVG Icons
  const HomeIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
    </svg>
  );

  const ChangeRoleIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
    </svg>
  );

  const EyeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
    </svg>
  );

  const EyeOffIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
    </svg>
  );

  const CheckIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
    </svg>
  );

  const CloseIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    </svg>
  );

  const UploadIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
    </svg>
  );

  const SuccessIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  );

  const ErrorIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
    </svg>
  );

  const InfoIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
    </svg>
  );

  const DeliveryIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
    </svg>
  );

  const StepIcon = ({ number, active }) => (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="17" stroke={active ? "#4DB6AC" : "rgba(255,255,255,0.3)"} strokeWidth="2"/>
      <circle cx="18" cy="18" r="16" fill={active ? "white" : "transparent"}/>
      <text x="18" y="22" textAnchor="middle" fontSize="14" fontWeight="600" fill={active ? "#009688" : "rgba(255,255,255,0.7)"}>
        {number}
      </text>
    </svg>
  );

  const BenefitCheckIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#4DB6AC">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
    </svg>
  );

  const DocumentIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
    </svg>
  );

  const PhoneIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
    </svg>
  );

  const EmailIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
  );

  const EditIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
    </svg>
  );

  const CancelIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
    </svg>
  );

  const LoadingIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z"/>
    </svg>
  );

  // NEW: Check if email/phone already exists in system
  const checkEmailExists = (email) => {
    return existingUsers.some(user => user.email === email);
  };

  const checkPhoneExists = (phone) => {
    return existingUsers.some(user => user.phone === phone);
  };

  // NEW: Enhanced validation functions with existence check
  const validateEmailWithExistence = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim()) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    
    // Check if email exists (but not if we're editing and it's the same email)
    if (!isEditingEmail && checkEmailExists(email)) {
      return 'Email already registered. Please use a different email or login.';
    }
    
    return '';
  };

  const validatePhoneWithExistence = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phone.trim()) return 'Phone number is required';
    if (!phoneRegex.test(phone)) return 'Please enter a valid phone number';
    
    // Check if phone exists (but not if we're editing and it's the same phone)
    if (!isEditingPhone && checkPhoneExists(phone)) {
      return 'Phone number already registered. Please use a different number or login.';
    }
    
    return '';
  };

  // NEW: Handle edit mode for email
  const handleEditEmail = () => {
    setIsEditingEmail(true);
    setIsEmailVerified(false);
    setEmailOtpSent(false);
    setEmailOtp('');
  };

  // NEW: Handle edit mode for phone
  const handleEditPhone = () => {
    setIsEditingPhone(true);
    setIsPhoneVerified(false);
    setPhoneOtpSent(false);
    setPhoneOtp('');
  };

  // NEW: Cancel edit mode
  const handleCancelEditEmail = () => {
    setIsEditingEmail(false);
    setFormData(prev => ({ ...prev, email: originalEmail }));
    setIsEmailVerified(true); // Re-verify since we're going back to original
  };

  const handleCancelEditPhone = () => {
    setIsEditingPhone(false);
    setFormData(prev => ({ ...prev, phone: originalPhone }));
    setIsPhoneVerified(true); // Re-verify since we're going back to original
  };

  // Original validation functions (keep for other fields)
  const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s]{2,}$/;
    if (!name.trim()) return 'Full name is required';
    if (!nameRegex.test(name)) return 'Name should contain only alphabets and spaces (min 2 characters)';
    return '';
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    
    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
  };

  const validateAadhar = (aadhar) => {
    const aadharRegex = /^\d{12}$/;
    if (!aadhar.trim()) return 'Aadhar number is required';
    if (!aadharRegex.test(aadhar)) return 'Aadhar must be 12 digits';
    return '';
  };

  const validatePAN = (pan) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!pan.trim()) return 'PAN number is required';
    if (!panRegex.test(pan)) return 'Invalid PAN format (e.g., ABCDE1234F)';
    return '';
  };

  const validateVehicleNumber = (vehicle) => {
    const vehicleRegex = /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{4}$/;
    if (!vehicle.trim()) return 'Vehicle number is required';
    if (!vehicleRegex.test(vehicle)) return 'Invalid vehicle number format (e.g., KA01AB1234)';
    if (vehicle.length > 10) return 'Vehicle number max 10 characters';
    return '';
  };

  const validateDrivingLicense = (license) => {
    const licenseRegex = /^[A-Z0-9]{10,16}$/;
    if (!license.trim()) return 'Driving license number is required';
    if (!licenseRegex.test(license)) return 'Invalid driving license number (10-16 alphanumeric characters)';
    return '';
  };

  // Mock OTP generation
  const generateMockOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Add a safe wrapper for onSwitchToLogin
  const handleSwitchToLogin = () => {
    if (typeof onSwitchToLogin === 'function') {
      onSwitchToLogin();
    } else {
      console.warn('onSwitchToLogin prop is not provided');
      setToastMessage('Login switch function not available');
      setToastType('error');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  // Add a safe wrapper for onSwitchToRoleSelection
  const handleSwitchToRoleSelection = () => {
    if (typeof onSwitchToRoleSelection === 'function') {
      onSwitchToRoleSelection();
    } else {
      console.warn('onSwitchToRoleSelection prop is not provided');
      setToastMessage('Role selection function not available');
      setToastType('error');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  // Home navigation handler
  const handleHomeNavigation = () => {
    window.location.href = '/';
  };

  // Phone verification handlers
  const sendPhoneOtp = async () => {
    const phoneError = validatePhoneWithExistence(formData.phone);
    if (phoneError) {
      setFormErrors(prev => ({ ...prev, phone: phoneError }));
      setToastMessage('Please enter a valid phone number');
      setToastType('error');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }
    
    setVerificationLoading(prev => ({ ...prev, phone: true }));
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockOtp = generateMockOtp();
    setPhoneOtp(mockOtp);
    setPhoneOtpSent(true);
    
    setToastMessage(`OTP ${mockOtp} sent to ${formData.phone} (Mock)`);
    setToastType('success');
    setShowToast(true);
    setVerificationLoading(prev => ({ ...prev, phone: false }));
    
    setTimeout(() => setShowToast(false), 4000);
  };

  const verifyPhoneOtp = async () => {
    if (!phoneOtp) {
      setToastMessage('Please enter the OTP');
      setToastType('error');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }
    
    setVerificationLoading(prev => ({ ...prev, phone: true }));
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (phoneOtp.length === 6) {
      setIsPhoneVerified(true);
      setIsEditingPhone(false); // Exit edit mode
      setOriginalPhone(formData.phone); // Save as original
      setToastMessage('Phone number verified successfully!');
      setToastType('success');
    } else {
      setToastMessage('Invalid OTP. Please try again.');
      setToastType('error');
    }
    
    setShowToast(true);
    setVerificationLoading(prev => ({ ...prev, phone: false }));
    setTimeout(() => setShowToast(false), 3000);
  };

  // Email verification handlers
  const sendEmailOtp = async () => {
    const emailError = validateEmailWithExistence(formData.email);
    if (emailError) {
      setFormErrors(prev => ({ ...prev, email: emailError }));
      setToastMessage('Please enter a valid email address');
      setToastType('error');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }
    
    setVerificationLoading(prev => ({ ...prev, email: true }));
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockOtp = generateMockOtp();
    setEmailOtp(mockOtp);
    setEmailOtpSent(true);
    
    setToastMessage(`OTP ${mockOtp} sent to ${formData.email} (Mock)`);
    setToastType('success');
    setShowToast(true);
    setVerificationLoading(prev => ({ ...prev, email: false }));
    
    setTimeout(() => setShowToast(false), 4000);
  };

  const verifyEmailOtp = async () => {
    if (!emailOtp) {
      setToastMessage('Please enter the OTP');
      setToastType('error');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }
    
    setVerificationLoading(prev => ({ ...prev, email: true }));
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (emailOtp.length === 6) {
      setIsEmailVerified(true);
      setIsEditingEmail(false); // Exit edit mode
      setOriginalEmail(formData.email); // Save as original
      setToastMessage('Email verified successfully!');
      setToastType('success');
    } else {
      setToastMessage('Invalid OTP. Please try again.');
      setToastType('error');
    }
    
    setShowToast(true);
    setVerificationLoading(prev => ({ ...prev, email: false }));
    setTimeout(() => setShowToast(false), 3000);
  };

  // Aadhar verification handlers
  const sendAadharOtp = async () => {
    if (!formData.aadharNumber || formErrors.aadharNumber) {
      setToastMessage('Please enter a valid Aadhar number');
      setToastType('error');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }
    
    setVerificationLoading(prev => ({ ...prev, aadhar: true }));
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockOtp = generateMockOtp();
    setAadharOtp(mockOtp);
    setAadharOtpSent(true);
    
    setToastMessage(`Aadhar OTP ${mockOtp} sent for verification (Mock)`);
    setToastType('success');
    setShowToast(true);
    setVerificationLoading(prev => ({ ...prev, aadhar: false }));
    
    setTimeout(() => setShowToast(false), 4000);
  };

  const verifyAadharOtp = async () => {
    if (!aadharOtp) {
      setToastMessage('Please enter the OTP');
      setToastType('error');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }
    
    setVerificationLoading(prev => ({ ...prev, aadhar: true }));
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (aadharOtp.length === 6) {
      setIsAadharVerified(true);
      setToastMessage('Aadhar verified successfully!');
      setToastType('success');
      setShowToast(true);
    } else {
      setToastMessage('Invalid OTP. Please try again.');
      setToastType('error');
      setShowToast(true);
    }
    
    setVerificationLoading(prev => ({ ...prev, aadhar: false }));
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    let processedValue = value;
    
    if (name === 'fullName') {
      processedValue = value.replace(/[^A-Za-z\s]/g, '');
    } else if (name === 'phone') {
      processedValue = value.replace(/\D/g, '').slice(0, 10);
    } else if (name === 'aadharNumber') {
      processedValue = value.replace(/\D/g, '').slice(0, 12);
    } else if (name === 'panNumber') {
      processedValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
    } else if (name === 'vehicleNumber') {
      processedValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
    } else if (name === 'drivingLicenseNumber') {
      processedValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 16);
    } else if (name === 'email') {
      // Clear OTP and verification status if email is changed
      if (isEmailVerified && value !== originalEmail) {
        setIsEmailVerified(false);
        setEmailOtpSent(false);
        setEmailOtp('');
      }
    } else if (name === 'phone') {
      // Clear OTP and verification status if phone is changed
      if (isPhoneVerified && value !== originalPhone) {
        setIsPhoneVerified(false);
        setPhoneOtpSent(false);
        setPhoneOtp('');
      }
    }
    
    setFormData({
      ...formData,
      [name]: processedValue
    });

    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = '';

    switch (name) {
      case 'fullName':
        error = validateName(value);
        break;
      case 'email':
        error = validateEmailWithExistence(value);
        break;
      case 'phone':
        error = validatePhoneWithExistence(value);
        break;
      case 'password':
        if (value && !validatePassword(value)) {
          error = 'Password must be 8+ characters with uppercase, lowercase, number & special character';
        }
        break;
      case 'confirmPassword':
        if (value && value !== formData.password) {
          error = 'Passwords do not match';
        }
        break;
      case 'aadharNumber':
        error = validateAadhar(value);
        break;
      case 'panNumber':
        error = validatePAN(value);
        break;
      case 'vehicleNumber':
        error = validateVehicleNumber(value);
        break;
      case 'drivingLicenseNumber':
        error = validateDrivingLicense(value);
        break;
      default:
        break;
    }

    setFormErrors({
      ...formErrors,
      [name]: error
    });
  };

  // ... [rest of the file upload handlers remain the same] ...

  // File upload handlers (keep as is)
  const handleFileUpload = (fileType, file) => {
    if (!file) return;

    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 5 * 1024 * 1024;

    if (!validImageTypes.includes(file.type)) {
      setToastMessage('Please upload a valid image (JPEG, JPG, PNG)');
      setToastType('error');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    if (file.size > maxSize) {
      setToastMessage('File size should be less than 5MB');
      setToastType('error');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    switch (fileType) {
      case 'aadharFront':
        setAadharFront(file);
        break;
      case 'aadharBack':
        setAadharBack(file);
        break;
      case 'drivingLicenseFront':
        setDrivingLicenseFront(file);
        break;
      case 'drivingLicenseBack':
        setDrivingLicenseBack(file);
        break;
      case 'panCard':
        setPanCard(file);
        break;
      case 'vehicleRC':
        setVehicleRC(file);
        break;
      case 'livePhoto':
        setLivePhoto(file);
        break;
      default:
        break;
    }
  };

  const nextStep = () => {
    if (currentStep === 1) {
      const nameError = validateName(formData.fullName);
      const emailError = validateEmailWithExistence(formData.email);
      const phoneError = validatePhoneWithExistence(formData.phone);
      const passwordError = formData.password && !validatePassword(formData.password) 
        ? 'Invalid password' : '';
      const confirmPasswordError = formData.confirmPassword && formData.password !== formData.confirmPassword 
        ? 'Passwords do not match' : '';

      const errors = {
        fullName: nameError,
        email: emailError,
        phone: phoneError,
        password: passwordError,
        confirmPassword: confirmPasswordError
      };

      setFormErrors(errors);

      if (Object.values(errors).some(error => error !== '') || !agreeToTerms) {
        setToastMessage('Please fix all errors and agree to terms');
        setToastType('error');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        return;
      }

      if (!isPhoneVerified || !isEmailVerified) {
        setToastMessage('Please verify your phone and email before proceeding');
        setToastType('error');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        return;
      }
    } else if (currentStep === 2) {
      const aadharError = validateAadhar(formData.aadharNumber);
      const panError = validatePAN(formData.panNumber);
      
      setFormErrors(prev => ({
        ...prev,
        aadharNumber: aadharError,
        panNumber: panError
      }));

      if (aadharError || panError || !aadharFront || !aadharBack || !panCard) {
        setToastMessage('Please complete all Aadhar and PAN details');
        setToastType('error');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        return;
      }

      if (!isAadharVerified) {
        setToastMessage('Please verify your Aadhar with OTP before proceeding');
        setToastType('error');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        return;
      }
    } else if (currentStep === 3) {
      const vehicleError = validateVehicleNumber(formData.vehicleNumber);
      const licenseError = validateDrivingLicense(formData.drivingLicenseNumber);
      
      setFormErrors(prev => ({
        ...prev,
        vehicleNumber: vehicleError,
        drivingLicenseNumber: licenseError
      }));

      if (vehicleError || licenseError || !drivingLicenseFront || !drivingLicenseBack || !vehicleRC) {
        setToastMessage('Please complete all driving license and vehicle details');
        setToastType('error');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        return;
      }
    }

    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Check if user already exists
  const checkExistingUser = () => {
    const storedUsers = localStorage.getItem('registeredUsers');
    if (!storedUsers) return null;
    
    const existingUsers = JSON.parse(storedUsers);
    return existingUsers.find(user => 
      user.email === formData.email || user.phone === formData.phone
    );
  };

  // Handle Submit Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (currentStep < 4) {
      setToastMessage('Please complete all verification steps');
      setToastType('error');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    // Validate all fields
    const errors = {
      fullName: validateName(formData.fullName),
      email: validateEmailWithExistence(formData.email),
      phone: validatePhoneWithExistence(formData.phone),
      password: formData.password && !validatePassword(formData.password) ? 'Invalid password' : '',
      confirmPassword: formData.confirmPassword && formData.password !== formData.confirmPassword ? 'Passwords do not match' : '',
      aadharNumber: validateAadhar(formData.aadharNumber),
      panNumber: validatePAN(formData.panNumber),
      vehicleNumber: validateVehicleNumber(formData.vehicleNumber),
      drivingLicenseNumber: validateDrivingLicense(formData.drivingLicenseNumber)
    };

    setFormErrors(errors);

    if (Object.values(errors).some(error => error !== '') || !agreeToTerms) {
      setToastMessage('Please fix all errors and agree to terms');
      setToastType('error');
      setShowToast(true);
      setIsLoading(false);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    // Check if all documents are uploaded
    const requiredDocs = [aadharFront, aadharBack, drivingLicenseFront, drivingLicenseBack, panCard, vehicleRC, livePhoto];
    if (requiredDocs.some(doc => !doc)) {
      setToastMessage('Please upload all required documents');
      setToastType('error');
      setShowToast(true);
      setIsLoading(false);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    // Final check for existing user
    const existingUser = checkExistingUser();
    if (existingUser) {
      setToastMessage('User already exists with this email or phone number');
      setToastType('error');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    setIsLoading(true);

    // Simulate API call
    // await new Promise(resolve => setTimeout(resolve, 1000));

    // // Create user object with proper structure
    // const newUser = {
    //   id: Date.now(),
    //   fullName: formData.fullName,
    //   email: formData.email,
    //   phone: formData.phone,
    //   password: formData.password,
    //   userType: 'delivery',
    //   createdAt: new Date().toISOString(),
    //   documents: {
    //     aadharNumber: formData.aadharNumber,
    //     panNumber: formData.panNumber,
    //     vehicleNumber: formData.vehicleNumber,
    //     drivingLicenseNumber: formData.drivingLicenseNumber,
    //     aadharFrontFileName: aadharFront ? aadharFront.name : '',
    //     aadharBackFileName: aadharBack ? aadharBack.name : '',
    //     drivingLicenseFrontFileName: drivingLicenseFront ? drivingLicenseFront.name : '',
    //     drivingLicenseBackFileName: drivingLicenseBack ? drivingLicenseBack.name : '',
    //     panCardFileName: panCard ? panCard.name : '',
    //     vehicleRCFileName: vehicleRC ? vehicleRC.name : '',
    //     livePhotoFileName: livePhoto ? livePhoto.name : ''
    //   },
    //   verification: {
    //     isPhoneVerified: true,
    //     isEmailVerified: true,
    //     isAadharVerified: true,
    //     status: 'pending'
    //   },
    //   isActive: true,
    //   deliveriesCompleted: 0,
    //   rating: 0,
    //   earnings: 0
    // };

    // const storedUsers = localStorage.getItem('registeredUsers');
    // const existingUsers = storedUsers ? JSON.parse(storedUsers) : [];
    // const updatedUsers = [...existingUsers, newUser];
    
    // localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));

    // // Also set current user in localStorage for immediate login
    // localStorage.setItem('currentUser', JSON.stringify({
    //   id: newUser.id,
    //   fullName: newUser.fullName,
    //   email: newUser.email,
    //   userType: newUser.userType,
    //   isVerified: true
    // }));
    // ✅ SEND DATA TO DJANGO BACKEND
const formDataToSend = new FormData();

formDataToSend.append("full_name", formData.fullName);
formDataToSend.append("email", formData.email); 
formDataToSend.append("phone", formData.phone);
formDataToSend.append("password", formData.password);  // ✅ ADDED: Send password for UserProfile creation
formDataToSend.append("aadhar_number", formData.aadharNumber);
formDataToSend.append("pan_number", formData.panNumber);
formDataToSend.append("vehicle_number", formData.vehicleNumber);
formDataToSend.append("driving_license_number", formData.drivingLicenseNumber);

// FILES
formDataToSend.append("aadhar_front", aadharFront);
formDataToSend.append("aadhar_back", aadharBack);
formDataToSend.append("pan_card", panCard);
formDataToSend.append("license_front", drivingLicenseFront);
formDataToSend.append("license_back", drivingLicenseBack);
formDataToSend.append("vehicle_rc", vehicleRC);
formDataToSend.append("live_photo", livePhoto);

try {
  const response = await fetch(
    "http://127.0.0.1:8000/api/delivery/signup/",
    {
      method: "POST",
      body: formDataToSend
    }
  );

  const data = await response.json();

  if (!response.ok) {
    // Show backend error message if available
    const msg =
      data?.error ||
      data?.detail ||
      (typeof data === "object"
        ? Object.values(data)[0]
        : null) ||
      "Signup failed";
    setToastMessage(msg);
    setToastType("error");
    setShowToast(true);
    setIsLoading(false);
    return;
  }

} catch (error) {
  console.error(error);
  setToastMessage("Server error");
  setToastType("error");
  setShowToast(true);
  setIsLoading(false);
  return;
}


    setToastMessage(`Account created! Welcome ${formData.fullName}`);
    setToastType('success');
    setShowToast(true);
    
    // Reset form
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      aadharNumber: '',
      panNumber: '',
      vehicleNumber: '',
      drivingLicenseNumber: ''
    });
    setFormErrors({});
    setAgreeToTerms(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
    setCurrentStep(1);
    setAadharFront(null);
    setAadharBack(null);
    setDrivingLicenseFront(null);
    setDrivingLicenseBack(null);
    setPanCard(null);
    setVehicleRC(null);
    setLivePhoto(null);
    setIsPhoneVerified(false);
    setIsEmailVerified(false);
    setIsAadharVerified(false);
    setAadharOtpSent(false);
    setAadharOtp('');
    setPhoneOtpSent(false);
    setPhoneOtp('');
    setEmailOtpSent(false);
    setEmailOtp('');
    setIsEditingEmail(false);
    setIsEditingPhone(false);
    setOriginalEmail('');
    setOriginalPhone('');

    // setTimeout(() => {
    //   setShowToast(false);
    //   if (onSignupSuccess) {
    //     onSignupSuccess();
    //   }
    // }, 2000);
    setTimeout(() => {
  setShowToast(false);
  navigate("/login/delivery", {
    state: {
      signupSuccess: true,
      registeredEmail: formData.email
    }
  });
}, 2000);

    setIsLoading(false);
  };

  const passwordStrength = validatePassword(formData.password) ? 'strong' : 'weak';

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // File upload component with SVG Icons
  const FileUploadField = ({ label, file, onFileChange, required = false }) => (
    <div style={{ marginBottom: '16px', textAlign: 'left' }}>
      <label style={{
        display: 'block',
        marginBottom: '6px',
        fontWeight: '500',
        color: '#124441',
        fontSize: '13px'
      }}>
        {label} {required && '*'}
      </label>
      <div style={{
        border: '2px dashed #4DB6AC',
        borderRadius: '8px',
        padding: '20px',
        textAlign: 'center',
        backgroundColor: file ? '#E0F2F1' : '#FFFFFF',
        cursor: 'pointer',
        position: 'relative'
      }}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => onFileChange(e.target.files[0])}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: 'pointer'
          }}
        />
        {file ? (
          <div>
            <div style={{ marginBottom: '8px' }}>
              <SuccessIcon />
            </div>
            <div style={{ fontSize: '12px', color: '#009688' }}>File uploaded</div>
            <div style={{ fontSize: '10px', color: '#4F6F6B' }}>{file.name}</div>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '8px' }}>
              <UploadIcon />
            </div>
            <div style={{ fontSize: '12px', color: '#4F6F6B' }}>Click to upload</div>
            <div style={{ fontSize: '10px', color: '#4DB6AC' }}>JPEG, PNG (Max 5MB)</div>
          </div>
        )}
      </div>
    </div>
  );

  // Step 1: Basic Information (UPDATED with SVG Icons)
  const renderStep1 = () => (
    <div>
      <div style={{ marginBottom: '16px', textAlign: 'left' }}>
        <label style={labelStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#124441">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            Full Name
          </div>
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          placeholder="Enter your full name"
          style={inputStyle(formErrors.fullName)}
        />
        {formErrors.fullName && <div style={errorStyle}>{formErrors.fullName}</div>}
      </div>

      {/* Email with OTP Verification - UPDATED with Edit Mode and SVG Icons */}
      <div style={{ marginBottom: '16px', textAlign: 'left' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <label style={labelStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <EmailIcon />
              Email Address
            </div>
          </label>
          {isEmailVerified && !isEditingEmail && (
            <button
              type="button"
              onClick={handleEditEmail}
              style={{
                fontSize: '11px',
                backgroundColor: 'transparent',
                color: '#009688',
                border: '1px solid #009688',
                borderRadius: '4px',
                padding: '4px 8px',
                cursor: 'pointer',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <EditIcon />
              Edit
            </button>
          )}
          {isEditingEmail && (
            <button
              type="button"
              onClick={handleCancelEditEmail}
              style={{
                fontSize: '11px',
                backgroundColor: 'transparent',
                color: '#EF4444',
                border: '1px solid #EF4444',
                borderRadius: '4px',
                padding: '4px 8px',
                cursor: 'pointer',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <CancelIcon />
              Cancel
            </button>
          )}
        </div>
        
        <div style={{ position: 'relative' }}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            placeholder="Enter your email"
            style={{
              ...inputStyle(formErrors.email),
              paddingLeft: '36px',
              paddingRight: isEmailVerified && !isEditingEmail ? '120px' : emailOtpSent ? '200px' : '120px',
              borderColor: isEmailVerified ? '#009688' : formErrors.email ? '#EF4444' : '#4DB6AC'
            }}
            disabled={isEmailVerified && !isEditingEmail}
          />
          
          <div style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: isEmailVerified ? '#009688' : formErrors.email ? '#EF4444' : '#4DB6AC'
          }}>
            <EmailIcon />
          </div>
          
          {!isEmailVerified || isEditingEmail ? (
            <button
              type="button"
              onClick={emailOtpSent ? null : sendEmailOtp}
              disabled={emailOtpSent || verificationLoading.email || !formData.email || formErrors.email}
              style={{
                position: 'absolute',
                right: emailOtpSent ? '100px' : '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                padding: '6px 12px',
                fontSize: '11px',
                backgroundColor: emailOtpSent ? '#4F6F6B' : '#009688',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: (emailOtpSent || verificationLoading.email || !formData.email || formErrors.email) ? 'not-allowed' : 'pointer',
                opacity: (emailOtpSent || !formData.email || formErrors.email) ? 0.6 : 1,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              {verificationLoading.email ? (
                <>
                  <LoadingIcon />
                  Sending...
                </>
              ) : emailOtpSent ? (
                <>
                  <CheckIcon />
                  OTP Sent
                </>
              ) : (
                'Send OTP'
              )}
            </button>
          ) : (
            <div style={{
              position: 'absolute',
              right: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              padding: '6px 12px',
              fontSize: '11px',
              backgroundColor: '#009688',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <CheckIcon />
              Verified
            </div>
          )}
        </div>
        {formErrors.email && <div style={errorStyle}>{formErrors.email}</div>}
        
        {/* Email OTP Input */}
        {emailOtpSent && (!isEmailVerified || isEditingEmail) && (
          <div style={{ marginTop: '8px' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <input
                type="text"
                value={emailOtp}
                onChange={(e) => setEmailOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="Enter 6-digit OTP"
                style={{...inputStyle(false), flex: 1, paddingLeft: '36px'}}
              />
              <div style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#4DB6AC'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <button
                type="button"
                onClick={verifyEmailOtp}
                disabled={verificationLoading.email || !emailOtp || emailOtp.length !== 6}
                style={{
                  padding: '10px 16px',
                  fontSize: '12px',
                  backgroundColor: '#009688',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: (verificationLoading.email || !emailOtp || emailOtp.length !== 6) ? 'not-allowed' : 'pointer',
                  opacity: (!emailOtp || emailOtp.length !== 6) ? 0.6 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                {verificationLoading.email ? (
                  <>
                    <LoadingIcon />
                    Verifying...
                  </>
                ) : (
                  <>
                    <CheckIcon />
                    Verify
                  </>
                )}
              </button>
            </div>
            <div style={{ fontSize: '11px', color: '#4F6F6B', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <InfoIcon />
              Check your email for OTP (Mock: {emailOtp})
            </div>
          </div>
        )}
      </div>

      {/* Phone with OTP Verification - UPDATED with Edit Mode and SVG Icons */}
      <div style={{ marginBottom: '16px', textAlign: 'left' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <label style={labelStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <PhoneIcon />
              Phone Number
            </div>
          </label>
          {isPhoneVerified && !isEditingPhone && (
            <button
              type="button"
              onClick={handleEditPhone}
              style={{
                fontSize: '11px',
                backgroundColor: 'transparent',
                color: '#009688',
                border: '1px solid #009688',
                borderRadius: '4px',
                padding: '4px 8px',
                cursor: 'pointer',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <EditIcon />
              Edit
            </button>
          )}
          {isEditingPhone && (
            <button
              type="button"
              onClick={handleCancelEditPhone}
              style={{
                fontSize: '11px',
                backgroundColor: 'transparent',
                color: '#EF4444',
                border: '1px solid #EF4444',
                borderRadius: '4px',
                padding: '4px 8px',
                cursor: 'pointer',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <CancelIcon />
              Cancel
            </button>
          )}
        </div>
        
        <div style={{ position: 'relative' }}>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            placeholder="Enter your 10-digit phone number"
            style={{
              ...inputStyle(formErrors.phone),
              paddingLeft: '36px',
              paddingRight: isPhoneVerified && !isEditingPhone ? '120px' : phoneOtpSent ? '200px' : '120px',
              borderColor: isPhoneVerified ? '#009688' : formErrors.phone ? '#EF4444' : '#4DB6AC'
            }}
            disabled={isPhoneVerified && !isEditingPhone}
          />
          
          <div style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: isPhoneVerified ? '#009688' : formErrors.phone ? '#EF4444' : '#4DB6AC'
          }}>
            <PhoneIcon />
          </div>
          
          {!isPhoneVerified || isEditingPhone ? (
            <button
              type="button"
              onClick={phoneOtpSent ? null : sendPhoneOtp}
              disabled={phoneOtpSent || verificationLoading.phone || !formData.phone || formErrors.phone}
              style={{
                position: 'absolute',
                right: phoneOtpSent ? '100px' : '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                padding: '6px 12px',
                fontSize: '11px',
                backgroundColor: phoneOtpSent ? '#4F6F6B' : '#009688',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: (phoneOtpSent || verificationLoading.phone || !formData.phone || formErrors.phone) ? 'not-allowed' : 'pointer',
                opacity: (phoneOtpSent || !formData.phone || formErrors.phone) ? 0.6 : 1,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              {verificationLoading.phone ? (
                <>
                  <LoadingIcon />
                  Sending...
                </>
              ) : phoneOtpSent ? (
                <>
                  <CheckIcon />
                  OTP Sent
                </>
              ) : (
                'Send OTP'
              )}
            </button>
          ) : (
            <div style={{
              position: 'absolute',
              right: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              padding: '6px 12px',
              fontSize: '11px',
              backgroundColor: '#009688',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <CheckIcon />
              Verified
            </div>
          )}
        </div>
        {formErrors.phone && <div style={errorStyle}>{formErrors.phone}</div>}
        
        {/* Phone OTP Input */}
        {phoneOtpSent && (!isPhoneVerified || isEditingPhone) && (
          <div style={{ marginTop: '8px' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <input
                type="text"
                value={phoneOtp}
                onChange={(e) => setPhoneOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="Enter 6-digit OTP"
                style={{...inputStyle(false), flex: 1, paddingLeft: '36px'}}
              />
              <div style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#4DB6AC'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              </div>
              <button
                type="button"
                onClick={verifyPhoneOtp}
                disabled={verificationLoading.phone || !phoneOtp || phoneOtp.length !== 6}
                style={{
                  padding: '10px 16px',
                  fontSize: '12px',
                  backgroundColor: '#009688',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: (verificationLoading.phone || !phoneOtp || phoneOtp.length !== 6) ? 'not-allowed' : 'pointer',
                  opacity: (!phoneOtp || phoneOtp.length !== 6) ? 0.6 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                {verificationLoading.phone ? (
                  <>
                    <LoadingIcon />
                    Verifying...
                  </>
                ) : (
                  <>
                    <CheckIcon />
                    Verify
                  </>
                )}
              </button>
            </div>
            <div style={{ fontSize: '11px', color: '#4F6F6B', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <InfoIcon />
              Check your phone for OTP (Mock: {phoneOtp})
            </div>
          </div>
        )}
      </div>

      {/* Password Fields with SVG Icons */}
      <div style={{ marginBottom: '16px', textAlign: 'left' }}>
        <label style={labelStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#124441">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
            </svg>
            Password
          </div>
        </label>
        <div style={{ position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            placeholder="Create a strong password"
            style={{...inputStyle(formErrors.password), paddingLeft: '36px', paddingRight: '45px'}}
          />
          <div style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: formErrors.password ? '#EF4444' : '#4DB6AC'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
            </svg>
          </div>
          <button
            type="button"
            onClick={togglePasswordVisibility}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#4F6F6B',
              padding: '4px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '30px',
              height: '30px'
            }}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        {formData.password && !formErrors.password && (
          <div style={passwordStrength === 'strong' ? successStyle : errorStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {passwordStrength === 'strong' ? <CheckIcon /> : <CloseIcon />}
              {passwordStrength === 'strong' ? 'Strong password' : 'Weak password'}
            </div>
          </div>
        )}
        {formErrors.password && (
          <div style={errorStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CloseIcon />
              {formErrors.password}
            </div>
          </div>
        )}
      </div>

      <div style={{ marginBottom: '20px', textAlign: 'left' }}>
        <label style={labelStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#124441">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
            </svg>
            Confirm Password
          </div>
        </label>
        <div style={{ position: 'relative' }}>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            placeholder="Confirm your password"
            style={{...inputStyle(formErrors.confirmPassword), paddingLeft: '36px', paddingRight: '45px'}}
          />
          <div style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: formErrors.confirmPassword ? '#EF4444' : '#4DB6AC'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          </div>
          <button
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#4F6F6B',
              padding: '4px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '30px',
              height: '30px'
            }}
          >
            {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        {formErrors.confirmPassword && (
          <div style={errorStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CloseIcon />
              {formErrors.confirmPassword}
            </div>
          </div>
        )}
      </div>

      {/* Verification Status - UPDATED with SVG Icons */}
      {(isPhoneVerified || isEmailVerified) && (
        <div style={{
          backgroundColor: '#E0F2F1',
          border: '1px solid #009688',
          borderRadius: '8px',
          padding: '12px',
          marginBottom: '16px'
        }}>
          <div style={{ fontSize: '12px', fontWeight: '600', color: '#124441', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <InfoIcon />
            Verification Status:
          </div>
          <div style={{ fontSize: '11px', color: '#4F6F6B', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {isPhoneVerified && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckIcon />
                Phone Number Verified {isEditingPhone ? '(Editing...)' : ''}
              </div>
            )}
            {isEmailVerified && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckIcon />
                Email Address Verified {isEditingEmail ? '(Editing...)' : ''}
              </div>
            )}
            {(!isPhoneVerified || !isEmailVerified) && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <InfoIcon />
                Please complete all verifications to proceed
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  // Step 2: Aadhar & PAN Verification (with SVG Icons)
  const renderStep2 = () => (
    <div>
      <div style={{ marginBottom: '16px', textAlign: 'left' }}>
        <label style={labelStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#124441">
              <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"/>
            </svg>
            Aadhar Number
          </div>
        </label>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            name="aadharNumber"
            value={formData.aadharNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            placeholder="Enter 12-digit Aadhar number"
            style={{
              ...inputStyle(formErrors.aadharNumber),
              paddingLeft: '36px',
              paddingRight: aadharOtpSent ? '200px' : '120px',
              borderColor: isAadharVerified ? '#009688' : formErrors.aadharNumber ? '#EF4444' : '#4DB6AC'
            }}
          />
          <div style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: isAadharVerified ? '#009688' : formErrors.aadharNumber ? '#EF4444' : '#4DB6AC'
          }}>
            <DocumentIcon />
          </div>
          {!isAadharVerified ? (
            <button
              type="button"
              onClick={aadharOtpSent ? null : sendAadharOtp}
              disabled={aadharOtpSent || verificationLoading.aadhar || !formData.aadharNumber || formErrors.aadharNumber}
              style={{
                position: 'absolute',
                right: aadharOtpSent ? '100px' : '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                padding: '6px 12px',
                fontSize: '11px',
                backgroundColor: aadharOtpSent ? '#4F6F6B' : '#009688',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: (aadharOtpSent || verificationLoading.aadhar || !formData.aadharNumber || formErrors.aadharNumber) ? 'not-allowed' : 'pointer',
                opacity: (aadharOtpSent || !formData.aadharNumber || formErrors.aadharNumber) ? 0.6 : 1,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              {verificationLoading.aadhar ? (
                <>
                  <LoadingIcon />
                  Sending...
                </>
              ) : aadharOtpSent ? (
                <>
                  <CheckIcon />
                  OTP Sent
                </>
              ) : (
                'Send OTP'
              )}
            </button>
          ) : (
            <div style={{
              position: 'absolute',
              right: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              padding: '6px 12px',
              fontSize: '11px',
              backgroundColor: '#009688',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <CheckIcon />
              Verified
            </div>
          )}
        </div>
        {formErrors.aadharNumber && (
          <div style={errorStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CloseIcon />
              {formErrors.aadharNumber}
            </div>
          </div>
        )}
      </div>

      {aadharOtpSent && !isAadharVerified && (
        <div style={{ marginBottom: '16px', textAlign: 'left' }}>
          <label style={labelStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#124441">
                <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/>
              </svg>
              Aadhar OTP
            </div>
          </label>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <input
                type="text"
                value={aadharOtp}
                onChange={(e) => setAadharOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="Enter 6-digit OTP"
                style={{...inputStyle(false), paddingLeft: '36px'}}
              />
              <div style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#4DB6AC'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
            </div>
            <button
              type="button"
              onClick={verifyAadharOtp}
              disabled={verificationLoading.aadhar || !aadharOtp || aadharOtp.length !== 6}
              style={{
                padding: '10px 16px',
                fontSize: '12px',
                backgroundColor: '#009688',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: (verificationLoading.aadhar || !aadharOtp || aadharOtp.length !== 6) ? 'not-allowed' : 'pointer',
                opacity: (!aadharOtp || aadharOtp.length !== 6) ? 0.6 : 1,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              {verificationLoading.aadhar ? (
                <>
                  <LoadingIcon />
                  Verifying...
                </>
              ) : (
                <>
                  <CheckIcon />
                  Verify OTP
                </>
              )}
            </button>
          </div>
          <div style={{ fontSize: '11px', color: '#4F6F6B', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <InfoIcon />
            Aadhar OTP sent (Mock: {aadharOtp})
          </div>
        </div>
      )}

      <div style={{ marginBottom: '16px', textAlign: 'left' }}>
        <label style={labelStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#124441">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
            </svg>
            PAN Number
          </div>
        </label>
        <input
          type="text"
          name="panNumber"
          value={formData.panNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          placeholder="Enter PAN number (e.g., ABCDE1234F)"
          maxLength="10"
          style={{...inputStyle(formErrors.panNumber), paddingLeft: '36px'}}
        />
        {formErrors.panNumber && (
          <div style={errorStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CloseIcon />
              {formErrors.panNumber}
            </div>
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
        <FileUploadField
          label="Aadhar Front"
          file={aadharFront}
          onFileChange={(file) => handleFileUpload('aadharFront', file)}
          required
        />
        <FileUploadField
          label="Aadhar Back"
          file={aadharBack}
          onFileChange={(file) => handleFileUpload('aadharBack', file)}
          required
        />
      </div>

      <FileUploadField
        label="PAN Card"
        file={panCard}
        onFileChange={(file) => handleFileUpload('panCard', file)}
        required
      />
    </div>
  );

  // Step 3: Driving License & Vehicle Details (with SVG Icons)
  const renderStep3 = () => (
    <div>
      <div style={{ marginBottom: '16px', textAlign: 'left' }}>
        <label style={labelStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#124441">
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H15V3H9v2H6.5c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
            </svg>
            Driving License Number
          </div>
        </label>
        <input
          type="text"
          name="drivingLicenseNumber"
          value={formData.drivingLicenseNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          placeholder="Enter driving license number (10-16 chars)"
          maxLength="16"
          style={{...inputStyle(formErrors.drivingLicenseNumber), paddingLeft: '36px'}}
        />
        {formErrors.drivingLicenseNumber && (
          <div style={errorStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CloseIcon />
              {formErrors.drivingLicenseNumber}
            </div>
          </div>
        )}
      </div>

      <div style={{ marginBottom: '16px', textAlign: 'left' }}>
        <label style={labelStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#124441">
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H15V3H9v2H6.5c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
            </svg>
            Vehicle Number
          </div>
        </label>
        <input
          type="text"
          name="vehicleNumber"
          value={formData.vehicleNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          placeholder="Enter vehicle number (e.g., KA01AB1234)"
          maxLength="10"
          style={{...inputStyle(formErrors.vehicleNumber), paddingLeft: '36px'}}
        />
        {formErrors.vehicleNumber && (
          <div style={errorStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CloseIcon />
              {formErrors.vehicleNumber}
            </div>
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
        <FileUploadField
          label="Driving License Front"
          file={drivingLicenseFront}
          onFileChange={(file) => handleFileUpload('drivingLicenseFront', file)}
          required
        />
        <FileUploadField
          label="Driving License Back"
          file={drivingLicenseBack}
          onFileChange={(file) => handleFileUpload('drivingLicenseBack', file)}
          required
        />
      </div>

      <FileUploadField
        label="Vehicle RC"
        file={vehicleRC}
        onFileChange={(file) => handleFileUpload('vehicleRC', file)}
        required
      />
    </div>
  );

  // Step 4: Final Verification (with SVG Icons)
  const renderStep4 = () => (
    <div>
      <FileUploadField
        label="Live Photo (Selfie)"
        file={livePhoto}
        onFileChange={(file) => handleFileUpload('livePhoto', file)}
        required
      />
      
      <div style={{
        backgroundColor: '#E0F2F1',
        border: '1px solid #009688',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        <div style={{ marginBottom: '8px' }}>
          <DocumentIcon />
        </div>
        <h4 style={{ margin: '0 0 8px 0', color: '#124441' }}>Verification Summary</h4>
        <div style={{ fontSize: '12px', color: '#4F6F6B', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            {isPhoneVerified && isEmailVerified ? <CheckIcon /> : <CloseIcon />}
            Basic Information: {isPhoneVerified && isEmailVerified ? 'Completed' : 'Pending'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            {isPhoneVerified && isEmailVerified ? <CheckIcon /> : <CloseIcon />}
            Phone & Email: {isPhoneVerified && isEmailVerified ? 'Verified' : 'Pending'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            {isAadharVerified ? <CheckIcon /> : <CloseIcon />}
            Aadhar: {isAadharVerified ? 'Verified' : 'Pending'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            {panCard ? <CheckIcon /> : <CloseIcon />}
            PAN Card: {panCard ? 'Uploaded' : 'Pending'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            {drivingLicenseFront && drivingLicenseBack ? <CheckIcon /> : <CloseIcon />}
            Driving License: {drivingLicenseFront && drivingLicenseBack ? 'Uploaded' : 'Pending'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            {vehicleRC ? <CheckIcon /> : <CloseIcon />}
            Vehicle RC: {vehicleRC ? 'Uploaded' : 'Pending'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {livePhoto ? <CheckIcon /> : <CloseIcon />}
            Live Photo: {livePhoto ? 'Uploaded' : 'Pending'}
          </div>
        </div>
      </div>
    </div>
  );

  // Common styles
  const labelStyle = {
    display: 'block',
    marginBottom: '6px',
    fontWeight: '500',
    color: '#124441',
    fontSize: '13px'
  };

  const inputStyle = (hasError) => ({
    width: '100%',
    padding: '12px 14px',
    border: `1px solid ${hasError ? '#EF4444' : '#4DB6AC'}`,
    borderRadius: '8px',
    fontSize: '14px',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    color: '#124441',
    backgroundColor: '#FFFFFF'
  });

  const errorStyle = {
    marginTop: '4px',
    fontSize: '11px',
    color: '#EF4444',
    fontWeight: '500'
  };

  const successStyle = {
    marginTop: '4px',
    fontSize: '11px',
    color: '#009688',
    fontWeight: '500'
  };

  return (
    <div style={containerStyle}>
      {showToast && (
        <div style={toastStyle(toastType)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {toastType === 'success' ? <SuccessIcon /> : <ErrorIcon />}
            {toastMessage}
          </div>
        </div>
      )}

      {/* Top Navigation Buttons */}
      <div style={topNavContainerStyle}>
        <button 
          style={homeButtonStyle}
          onClick={handleHomeNavigation}
        >
          <HomeIcon />
          Home
        </button>
        <button 
          style={changeRoleButtonStyle}
          onClick={handleSwitchToRoleSelection}
        >
          <ChangeRoleIcon />
          Change Role
        </button>
      </div>

      <div style={cardContainerStyle}>
        {/* Left Side - Updated Design */}
        <div style={leftSideStyle}>
          <div style={contentStyle}>
            <div style={{ marginBottom: '16px' }}>
              <DeliveryIcon />
            </div>
            <h2 style={titleStyle}>
              Join as a Delivery Partner
            </h2>
            
            <p style={quoteStyle}>
              Join our network of trusted delivery partners and earn competitive rates
            </p>
            
            {/* Progress Steps */}
            <div style={stepsContainerStyle}>
              <div style={stepStyle(currentStep >= 1)}>
                <StepIcon number="1" active={currentStep >= 1} />
                <div>
                  <div style={stepTitleStyle}>Personal Info</div>
                  <div style={stepSubtitleStyle}>Basic details & contact</div>
                </div>
              </div>
              
              <div style={stepDividerStyle}></div>
              
              <div style={stepStyle(currentStep >= 2)}>
                <StepIcon number="2" active={currentStep >= 2} />
                <div>
                  <div style={stepTitleStyle}>Security</div>
                  <div style={stepSubtitleStyle}>Aadhar & PAN verification</div>
                </div>
              </div>
              
              <div style={stepDividerStyle}></div>
              
              <div style={stepStyle(currentStep >= 3)}>
                <StepIcon number="3" active={currentStep >= 3} />
                <div>
                  <div style={stepTitleStyle}>Delivery Partner Details</div>
                  <div style={stepSubtitleStyle}>License & vehicle info</div>
                </div>
              </div>
            </div>
            
            {/* Benefits Section */}
            <div style={benefitsContainerStyle}>
              <h4 style={benefitsTitleStyle}>Benefits:</h4>
              <div style={benefitsListStyle}>
                <div style={benefitItemStyle}>
                  <BenefitCheckIcon />
                  <span>Flexible working hours</span>
                </div>
                <div style={benefitItemStyle}>
                  <BenefitCheckIcon />
                  <span>Competitive commission rates</span>
                </div>
                <div style={benefitItemStyle}>
                  <BenefitCheckIcon />
                  <span>Real-time delivery tracking</span>
                </div>
                <div style={benefitItemStyle}>
                  <BenefitCheckIcon />
                  <span>Weekly payments</span>
                </div>
                <div style={benefitItemStyle}>
                  <BenefitCheckIcon />
                  <span>Insurance coverage</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div style={rightSideStyle}>
          <div style={headerStyle}>
            <h1 style={appNameStyle}>QUICKMED</h1>
            <h2 style={formTitleStyle}>
              Delivery Partner Registration (Step {currentStep}/4)
            </h2>
          </div>

          <form onSubmit={handleSubmit}>
            <>
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}
            </>

            {/* Terms and Conditions Checkbox */}
            <div style={{ marginBottom: '20px', textAlign: 'left' }}>
              <label style={termsLabelStyle}>
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  style={{ marginTop: '2px' }}
                />
                <span>
                  I agree to the{' '}
                  <a 
                    href="https://drive.google.com/file/d/1bZkQuNNdVootx27yQ0lMbIpqn83oIrYn/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={linkStyle}
                    onClick={(e) => e.preventDefault()}
                  >
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a 
                    href="https://drive.google.com/file/d/1D3PHKle-WG-A9sJv2f4O2ZjBzoGaKLzo/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={linkStyle}
                    onClick={(e) => e.preventDefault()}
                  >
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>

            {/* Navigation Buttons for Delivery */}
            <div style={navigationButtonsStyle}>
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  style={secondaryButtonStyle}
                >
                  ← Previous
                </button>
              )}
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  style={primaryButtonStyle}
                >
                  Next →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  style={{...primaryButtonStyle, opacity: isLoading ? 0.7 : 1}}
                >
                  {isLoading ? (
                    <>
                      <LoadingIcon />
                      Creating Account...
                    </>
                  ) : (
                    'Complete Registration'
                  )}
                </button>
              )}
            </div>
          </form>

          <div style={switchAuthStyle}>
            <p style={switchTextStyle}>
              Already have an account? <span 
                onClick={() => !isLoading && handleSwitchToLogin()}
                style={switchLinkStyle}
              >
                Login here 
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  backgroundColor: '#E0F2F1',
  padding: '20px',
  position: 'relative'
};

const topNavContainerStyle = {
  position: 'absolute',
  top: '20px',
  left: '20px',
  display: 'flex',
  gap: '12px',
  zIndex: 100
};

const homeButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#009688',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: '0 2px 8px rgba(0, 150, 136, 0.3)',
  display: 'flex',
  alignItems: 'center',
  gap: '6px'
};

const changeRoleButtonStyle = {
  padding: '10px 20px',
  backgroundColor: 'white',
  color: '#009688',
  border: '2px solid #009688',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  gap: '6px'
};

const toastStyle = (type) => ({
  position: 'fixed',
  top: '80px',
  right: '20px',
  backgroundColor: type === 'success' ? '#009688' : '#EF4444',
  color: 'white',
  padding: '12px 20px',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  zIndex: 1000,
  animation: 'slideInRight 0.3s ease-out',
  fontSize: '14px',
  fontWeight: '500'
});

const cardContainerStyle = {
  display: 'flex',
  width: '100%',
  maxWidth: '1200px',
  backgroundColor: 'white',
  borderRadius: '16px',
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  minHeight: '700px',
  marginTop: '60px'
};

const leftSideStyle = {
  flex: 1,
  background: `linear-gradient(135deg, #009688 0%, #00796B 100%)`,
  color: 'white',
  padding: '50px 40px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
};

const contentStyle = {
  textAlign: 'center'
};

const titleStyle = {
  fontSize: '28px',
  fontWeight: '700',
  marginBottom: '16px',
  lineHeight: '1.3'
};

const quoteStyle = {
  fontSize: '16px',
  lineHeight: '1.6',
  opacity: 0.9,
  marginBottom: '40px',
  maxWidth: '400px',
  marginLeft: 'auto',
  marginRight: 'auto'
};

// Steps container
const stepsContainerStyle = {
  marginBottom: '40px',
  textAlign: 'left'
};

const stepStyle = (isActive) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  marginBottom: '24px',
  opacity: isActive ? 1 : 0.7
});

const stepTitleStyle = {
  fontSize: '16px',
  fontWeight: '600',
  marginBottom: '4px'
};

const stepSubtitleStyle = {
  fontSize: '12px',
  opacity: 0.8
};

const stepDividerStyle = {
  height: '20px',
  width: '2px',
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
  marginLeft: '27px',
  marginBottom: '8px'
};

// Benefits section
const benefitsContainerStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '12px',
  padding: '20px',
  textAlign: 'left'
};

const benefitsTitleStyle = {
  fontSize: '18px',
  fontWeight: '600',
  marginBottom: '16px',
  marginTop: 0
};

const benefitsListStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px'
};

const benefitItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  fontSize: '14px'
};

const rightSideStyle = {
  flex: 1,
  padding: '40px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  overflowY: 'auto'
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '30px'
};

const appNameStyle = {
  fontSize: '32px',
  fontWeight: '700',
  marginBottom: '8px',
  color: '#009688'
};

const formTitleStyle = {
  color: '#124441',
  fontSize: '20px',
  fontWeight: '600',
  marginBottom: '4px'
};

const termsLabelStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '8px',
  cursor: 'pointer',
  fontSize: '13px',
  color: '#124441'
};

const linkStyle = {
  color: '#009688',
  fontWeight: '500',
  cursor: 'pointer',
  textDecoration: 'underline'
};

const navigationButtonsStyle = {
  display: 'flex',
  gap: '12px',
  marginBottom: '20px'
};

const primaryButtonStyle = {
  flex: 1,
  padding: '14px',
  backgroundColor: '#009688',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 12px rgba(0, 150, 136, 0.3)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px'
};

const secondaryButtonStyle = {
  flex: 1,
  padding: '14px',
  backgroundColor: 'transparent',
  color: '#009688',
  border: '2px solid #009688',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s ease'
};

const switchAuthStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '20px'
};

const switchTextStyle = {
  color: '#4F6F6B',
  fontSize: '14px',
  textAlign: 'center',
  margin: 0
};

const switchLinkStyle = {
  color: '#009688',
  fontWeight: '600',
  cursor: 'pointer'
};

export default DeliverySignup;