// // BaseSignup.js - Integrated Version with Duplicate Validation and Profile Integration
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// // Create a simple ProfileContext if it doesn't exist yet
// const createProfileContext = () => {
//   const defaultProfile = {
//     fullName: '',
//     email: '',
//     phone: '',
//     address: '',
//     city: '',
//     state: '',
//     pincode: '',
//     country: 'India',
//     dateOfBirth: '',
//     age: '',
//     gender: '',
//     profilePhoto: '',
//     userType: 'user',
//     linkedAccounts: [],
//     lastUpdated: '',
//     bloodGroup: 'Not specified',
//     emergencyContact: '',
//     healthMetrics: {
//       height: '',
//       weight: '',
//       bmi: '',
//       bloodPressure: '',
//       lastCheckup: ''
//     },
//     medicalHistory: {
//       conditions: [],
//       allergies: [],
//       medications: [],
//       surgeries: []
//     },
//     insurance: {
//       provider: '',
//       policyNumber: '',
//       validity: ''
//     },
//     isActive: true,
//     createdAt: ''
//   };

//   // Helper function to calculate age
//   const calculateAge = (birthDate) => {
//     if (!birthDate) return '';
//     const today = new Date();
//     const birth = new Date(birthDate);
//     let age = today.getFullYear() - birth.getFullYear();
//     const monthDiff = today.getMonth() - birth.getMonth();
    
//     if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
//       age--;
//     }
//     return age > 0 ? age.toString() : "0";
//   };

//   // Parse address into components
//   const parseAddress = (address) => {
//     if (!address) return { city: '', state: '', pincode: '' };
    
//     let city = '';
//     let state = '';
//     let pincode = '';
    
//     const addressParts = address.split(',');
    
//     // Look for pincode (6-digit number)
//     for (let i = addressParts.length - 1; i >= 0; i--) {
//       const part = addressParts[i].trim();
//       if (/^\d{6}$/.test(part)) {
//         pincode = part;
//         if (i > 0) {
//           city = addressParts[i - 1].trim();
//         }
//         if (i > 1) {
//           state = addressParts[i - 2].trim();
//         }
//         break;
//       }
//     }
    
//     // If no pincode found, take last 3 parts
//     if (!pincode && addressParts.length >= 3) {
//       pincode = addressParts[addressParts.length - 1].trim();
//       city = addressParts[addressParts.length - 2].trim();
//       state = addressParts[addressParts.length - 3].trim();
//     }
    
//     return { city, state, pincode };
//   };

//   return {
//     // Function to set profile from signup data
//     setProfileFromSignup: (signupData) => {
//       console.log('Setting profile from signup data:', signupData);
      
//       const address = signupData.address || signupData.deliveryAddress || '';
//       const { city, state, pincode } = parseAddress(address);
      
//       const newProfile = {
//         ...defaultProfile,
//         fullName: signupData.fullName || '',
//         email: signupData.email || '',
//         phone: signupData.phone || '',
//         address: address,
//         city: signupData.city || city || '',
//         state: signupData.state || state || '',
//         pincode: signupData.pincode || pincode || '',
//         country: signupData.country || 'India',
//         dateOfBirth: signupData.dateOfBirth || '',
//         age: signupData.age || calculateAge(signupData.dateOfBirth) || '',
//         gender: signupData.gender || '',
//         profilePhoto: signupData.profilePhoto || '',
//         userType: signupData.userType || 'user',
//         linkedAccounts: signupData.linkedAccounts || [],
//         emergencyContact: signupData.emergencyContact || '',
//         isActive: true,
//         createdAt: new Date().toISOString(),
//         lastUpdated: new Date().toISOString(),
//         bloodGroup: signupData.bloodGroup || defaultProfile.bloodGroup
//       };
      
//       console.log('New profile created from signup:', newProfile);
      
//       // Save to localStorage
//       localStorage.setItem('userProfile', JSON.stringify(newProfile));
      
//       if (signupData.phone) {
//         localStorage.setItem(`userProfile_${signupData.phone}`, JSON.stringify(newProfile));
//       }
      
//       return newProfile;
//     },
    
//     // Function to get current profile
//     getProfile: () => {
//       try {
//         const saved = localStorage.getItem('userProfile');
//         return saved ? JSON.parse(saved) : defaultProfile;
//       } catch (error) {
//         console.error('Error getting profile:', error);
//         return defaultProfile;
//       }
//     },
    
//     // Function to update profile
//     updateProfile: (profileData) => {
//       try {
//         const currentProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
//         const updatedProfile = {
//           ...defaultProfile,
//           ...currentProfile,
//           ...profileData,
//           lastUpdated: new Date().toISOString()
//         };
        
//         localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
//         return updatedProfile;
//       } catch (error) {
//         console.error('Error updating profile:', error);
//         return defaultProfile;
//       }
//     },
    
//     // Helper function to calculate age (export for use in component)
//     calculateAge
//   };
// };

// // Initialize profile context
// const profileContext = createProfileContext();

// const BaseSignup = ({ userType, userDetails, onSignupSuccess }) => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: '',
//     dateOfBirth: '', // Added for patient/user
//     gender: '', // Added for patient/user
//     deliveryAddress: '', // Added for patient/user
//     emergencyContact: '', // Added for patient/user
//     ...userDetails.extraFields
//   });
//   const [errors, setErrors] = useState({});
//   const [showToast, setShowToast] = useState(false);
//   const [toastMessage, setToastMessage] = useState('');
//   const [toastType, setToastType] = useState('success');
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [currentStep, setCurrentStep] = useState(1);
//   const [acceptedTerms, setAcceptedTerms] = useState(false);
//   const [passwordStrength, setPasswordStrength] = useState({
//     score: 0,
//     message: 'Very Weak',
//     color: '#f44336'
//   });

//   // Calculate total steps based on userDetails
//   const totalSteps = userDetails.hasExtraStep ? 4 : 3;

//   // Helper function to calculate age from date of birth
//   const calculateAge = (birthDate) => {
//     if (!birthDate) return '';
//     const today = new Date();
//     const birth = new Date(birthDate);
//     let age = today.getFullYear() - birth.getFullYear();
//     const monthDiff = today.getMonth() - birth.getMonth();
    
//     if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
//       age--;
//     }
//     return age > 0 ? age.toString() : "0";
//   };

//   // Function to check for existing users (email and phone)
//   const checkExistingUsers = (email, phone, emergencyContact = '') => {
//     const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
//     const errors = {};
    
//     // Check for existing email
//     const emailExists = registeredUsers.find(user => 
//       user.email.toLowerCase() === email.toLowerCase()
//     );
    
//     if (emailExists) {
//       errors.email = `Email already registered as ${emailExists.userType}.`;
//     }
    
//     // Check for existing phone number (normalize by removing non-digits)
//     const phoneDigits = phone.replace(/\D/g, '');
//     const phoneExists = registeredUsers.find(user => {
//       const userPhoneDigits = user.phone.replace(/\D/g, '');
//       return userPhoneDigits === phoneDigits && phoneDigits.length > 0;
//     });
    
//     if (phoneExists) {
//       errors.phone = `Mobile number already registered as ${phoneExists.userType}.`;
//     }
    
//     // Check for existing emergency contact (for patient/user)
//     if (emergencyContact) {
//       const emergencyDigits = emergencyContact.replace(/\D/g, '');
//       const emergencyExists = registeredUsers.find(user => {
//         const userPhoneDigits = user.phone.replace(/\D/g, '');
//         const userEmergencyDigits = user.emergencyContact ? user.emergencyContact.replace(/\D/g, '') : '';
//         return (userPhoneDigits === emergencyDigits || userEmergencyDigits === emergencyDigits) && emergencyDigits.length > 0;
//       });
      
//       if (emergencyExists) {
//         errors.emergencyContact = `Emergency contact already registered as ${emergencyExists.userType}.`;
//       }
      
//       // Check if emergency contact is same as primary phone
//       if (phoneDigits === emergencyDigits) {
//         errors.emergencyContact = 'Emergency contact cannot be the same as your primary phone number';
//       }
//     }
    
//     return errors;
//   };

//   // Enhanced validation functions for different user types
//   const validateGSTNumber = (gstNumber) => {
//     if (!gstNumber.trim()) {
//       return { isValid: false, message: 'GST number is required' };
//     }
    
//     // GST number format validation (15 characters, alphanumeric)
//     const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
//     const isValid = gstRegex.test(gstNumber.toUpperCase());
    
//     if (!isValid) {
//       return { isValid: false, message: 'Please enter a valid 15-digit GST number (format: 22AAAAA0000A1Z5)' };
//     }
    
//     return { isValid: true, message: '' };
//   };

//   const validateBusinessLicense = (licenseNumber) => {
//     if (!licenseNumber.trim()) {
//       return { isValid: false, message: 'Business license number is required' };
//     }
    
//     // Business license format: at least 8 characters, alphanumeric
//     const licenseRegex = /^[A-Z0-9]{8,20}$/;
//     const isValid = licenseRegex.test(licenseNumber.toUpperCase());
    
//     if (!isValid) {
//       return { isValid: false, message: 'Please enter a valid business license number (8-20 alphanumeric characters)' };
//     }
    
//     return { isValid: true, message: '' };
//   };

//   const validateVehicleRegistration = (vehicleNumber) => {
//     if (!vehicleNumber.trim()) {
//       return { isValid: false, message: 'Vehicle registration number is required' };
//     }
    
//     // Indian vehicle registration number format: MH-12-AB-1234 or KA-01-AB-1234
//     const vehicleRegex = /^[A-Z]{2}\s?[0-9]{2}\s?[A-Z]{1,2}\s?[0-9]{4}$/;
//     const isValid = vehicleRegex.test(vehicleNumber.toUpperCase().replace(/\s/g, ''));
    
//     if (!isValid) {
//       return { isValid: false, message: 'Please enter a valid vehicle registration number (format: MH-12-AB-1234)' };
//     }
    
//     return { isValid: true, message: '' };
//   };

//   const validateIdProofNumber = (idNumber) => {
//     if (!idNumber.trim()) {
//       return { isValid: false, message: 'ID proof number is required' };
//     }
    
//     // Accept Aadhaar (12 digits), PAN (10 alphanumeric), or Driving License (varies)
//     const aadhaarRegex = /^[2-9]{1}[0-9]{3}\s?[0-9]{4}\s?[0-9]{4}$/;
//     const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
//     const dlRegex = /^[A-Z]{2}[0-9]{2}\s?[0-9]{11}$/;
    
//     const isValid = aadhaarRegex.test(idNumber) || panRegex.test(idNumber.toUpperCase()) || dlRegex.test(idNumber.toUpperCase());
    
//     if (!isValid) {
//       return { isValid: false, message: 'Please enter a valid Aadhaar (12 digits), PAN (10 characters), or Driving License number' };
//     }
    
//     return { isValid: true, message: '' };
//   };

//   const validateMedicalLicense = (licenseNumber) => {
//     if (!licenseNumber.trim()) {
//       return { isValid: false, message: 'Medical license number is required' };
//     }
    
//     // Medical license format: MCI-12345 or state-specific format
//     const mciRegex = /^MCI\/[0-9]{5,10}$/;
//     const stateRegex = /^[A-Z]{2}\/[A-Z]{3}\/[0-9]{5,8}$/;
    
//     const isValid = mciRegex.test(licenseNumber.toUpperCase()) || stateRegex.test(licenseNumber.toUpperCase());
    
//     if (!isValid) {
//       return { isValid: false, message: 'Please enter a valid medical license number (format: MCI/12345 or State/Specialty/12345)' };
//     }
    
//     return { isValid: true, message: '' };
//   };

//   const validateYearsOfExperience = (years) => {
//     if (!years.trim()) {
//       return { isValid: false, message: 'Years of experience is required' };
//     }
    
//     const yearsNum = parseInt(years, 10);
//     if (isNaN(yearsNum) || yearsNum < 0 || yearsNum > 60) {
//       return { isValid: false, message: 'Please enter valid years of experience (0-60)' };
//     }
    
//     return { isValid: true, message: '' };
//   };

//   const validateConsultationFee = (fee) => {
//     if (!fee.trim()) {
//       return { isValid: false, message: 'Consultation fee is required' };
//     }
    
//     const feeNum = parseFloat(fee);
//     if (isNaN(feeNum) || feeNum < 0 || feeNum > 10000) {
//       return { isValid: false, message: 'Please enter valid consultation fee (0-10000)' };
//     }
    
//     return { isValid: true, message: '' };
//   };

//   // Date of Birth validation
//   const validateDateOfBirth = (date) => {
//     if (!date.trim()) {
//       return { isValid: false, message: 'Date of birth is required' };
//     }
    
//     const dob = new Date(date);
//     const today = new Date();
    
//     // Check if date is in the future
//     if (dob > today) {
//       return { isValid: false, message: 'Date of birth cannot be in the future' };
//     }
    
//     // Check if user is at least 1 year old
//     const age = calculateAge(date);
//     if (parseInt(age) < 1) {
//       return { isValid: false, message: 'You must be at least 1 year old' };
//     }
    
//     // Check if user is not older than 150 years
//     if (parseInt(age) > 150) {
//       return { isValid: false, message: 'Please enter a valid date of birth' };
//     }
    
//     return { isValid: true, message: '' };
//   };

//   // Emergency contact validation
//   const validateEmergencyContact = (contact) => {
//     if (!contact.trim()) {
//       return { isValid: false, message: 'Emergency contact is required' };
//     }
    
//     // Remove all non-digits
//     const digits = contact.replace(/\D/g, '');
    
//     // Must be exactly 10 digits and start with 6,7,8,9
//     const isValid = /^[6-9]\d{9}$/.test(digits);
    
//     if (!isValid) {
//       return { isValid: false, message: 'Please enter a valid 10-digit Indian mobile number starting with 6,7,8,9' };
//     }
    
//     return { isValid: true, message: '' };
//   };

//   // Enhanced Password strength checker with stronger requirements
//   const checkPasswordStrength = (password) => {
//     let score = 0;
//     const requirements = {
//       length: false,
//       uppercase: false,
//       lowercase: false,
//       number: false,
//       special: false,
//       noCommon: true
//     };
    
//     // Check length (minimum 12 characters for strong password)
//     if (password.length >= 8) {
//       score += 0.5;
//       if (password.length >= 12) {
//         score += 1;
//         requirements.length = true;
//       }
//     }
    
//     // Check for uppercase letters
//     if (/[A-Z]/.test(password)) {
//       score += 1;
//       requirements.uppercase = true;
//     }
    
//     // Check for lowercase letters
//     if (/[a-z]/.test(password)) {
//       score += 1;
//       requirements.lowercase = true;
//     }
    
//     // Check for numbers
//     if (/[0-9]/.test(password)) {
//       score += 1;
//       requirements.number = true;
//     }
    
//     // Check for special characters
//     if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
//       score += 1;
//       requirements.special = true;
//     }
    
//     // Check for common passwords
//     const commonPasswords = [
//       'password', '12345678', 'qwerty123', 'admin123', 'welcome123',
//       'letmein', 'monkey', 'dragon', 'baseball', 'football',
//       'password123', 'admin', '123456789', '1234567890'
//     ];
    
//     if (commonPasswords.includes(password.toLowerCase())) {
//       score = 0;
//       requirements.noCommon = false;
//     }
    
//     // Check for sequential characters
//     if (/(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789|890)/i.test(password)) {
//       score -= 1;
//     }
    
//     // Determine strength level with stricter criteria
//     let message, color;
//     if (score >= 4.5 && requirements.length && requirements.uppercase && 
//         requirements.lowercase && requirements.number && requirements.special && requirements.noCommon) {
//       message = 'Very Strong';
//       color = '#4CAF50'; // Green
//     } else if (score >= 3.5 && requirements.length && requirements.uppercase && 
//                requirements.lowercase && requirements.number) {
//       message = 'Strong';
//       color = '#8BC34A'; // Light Green
//     } else if (score >= 2.5 && requirements.length) {
//       message = 'Good';
//       color = '#FFC107'; // Yellow
//     } else if (score >= 1.5) {
//       message = 'Fair';
//       color = '#FF9800'; // Orange
//     } else {
//       message = 'Weak';
//       color = '#f44336'; // Red
//     }
    
//     if (password.length === 0) {
//       message = 'Enter a password';
//       score = 0;
//       color = '#9e9e9e';
//     }
    
//     return { score, message, color, requirements };
//   };

//   // Real-time email validation
//   const validateEmail = (email) => {
//     if (!email.trim()) {
//       return { isValid: false, message: 'Email is required' };
//     }
    
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const isValid = emailRegex.test(email);
    
//     if (!isValid) {
//       return { isValid: false, message: 'Please enter a valid email address' };
//     }
    
//     return { isValid: true, message: '' };
//   };

//   // Enhanced password validation
//   const validatePassword = (password) => {
//     if (!password) {
//       return { isValid: false, message: 'Password is required' };
//     }
    
//     if (password.length < 12) {
//       return { isValid: false, message: 'Password must be at least 12 characters long' };
//     }
    
//     if (!/[A-Z]/.test(password)) {
//       return { isValid: false, message: 'Password must contain at least one uppercase letter' };
//     }
    
//     if (!/[a-z]/.test(password)) {
//       return { isValid: false, message: 'Password must contain at least one lowercase letter' };
//     }
    
//     if (!/[0-9]/.test(password)) {
//       return { isValid: false, message: 'Password must contain at least one number' };
//     }
    
//     if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
//       return { isValid: false, message: 'Password must contain at least one special character' };
//     }
    
//     // Check for common passwords
//     const commonPasswords = [
//       'password', '12345678', 'qwerty123', 'admin123', 'welcome123',
//       'letmein', 'monkey', 'dragon', 'baseball', 'football',
//       'password123', 'admin', '123456789', '1234567890'
//     ];
    
//     if (commonPasswords.includes(password.toLowerCase())) {
//       return { isValid: false, message: 'This password is too common. Please choose a stronger password' };
//     }
    
//     // Check for sequential characters
//     if (/(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789|890)/i.test(password)) {
//       return { isValid: false, message: 'Avoid sequential characters in your password' };
//     }
    
//     return { isValid: true, message: '' };
//   };

//   // User type specific validation
//   const validateUserTypeFields = () => {
//     const newErrors = {};
    
//     if (userType === 'vendor') {
//       const gstValidation = validateGSTNumber(formData.gstNumber || '');
//       if (!gstValidation.isValid) {
//         newErrors.gstNumber = gstValidation.message;
//       }
      
//       const licenseValidation = validateBusinessLicense(formData.businessLicense || '');
//       if (!licenseValidation.isValid) {
//         newErrors.businessLicense = licenseValidation.message;
//       }
//     }
    
//     if (userType === 'delivery') {
//       const vehicleValidation = validateVehicleRegistration(formData.vehicleNumber || '');
//       if (!vehicleValidation.isValid) {
//         newErrors.vehicleNumber = vehicleValidation.message;
//       }
      
//       const idProofValidation = validateIdProofNumber(formData.idProofNumber || '');
//       if (!idProofValidation.isValid) {
//         newErrors.idProofNumber = idProofValidation.message;
//       }
//     }
    
//     if (userType === 'doctor') {
//       const medicalLicenseValidation = validateMedicalLicense(formData.medicalLicense || '');
//       if (!medicalLicenseValidation.isValid) {
//         newErrors.medicalLicense = medicalLicenseValidation.message;
//       }
      
//       const experienceValidation = validateYearsOfExperience(formData.yearsOfExperience || '');
//       if (!experienceValidation.isValid) {
//         newErrors.yearsOfExperience = experienceValidation.message;
//       }
      
//       const feeValidation = validateConsultationFee(formData.consultationFee || '');
//       if (!feeValidation.isValid) {
//         newErrors.consultationFee = feeValidation.message;
//       }
//     }
    
//     // Patient/User specific validations
//     if (userType === 'user' || userType === 'patient') {
//       const dobValidation = validateDateOfBirth(formData.dateOfBirth || '');
//       if (!dobValidation.isValid) {
//         newErrors.dateOfBirth = dobValidation.message;
//       }
      
//       if (!formData.gender) {
//         newErrors.gender = 'Gender is required';
//       }
      
//       if (!formData.deliveryAddress) {
//         newErrors.deliveryAddress = 'Delivery address is required';
//       }
      
//       const emergencyValidation = validateEmergencyContact(formData.emergencyContact || '');
//       if (!emergencyValidation.isValid) {
//         newErrors.emergencyContact = emergencyValidation.message;
//       }
//     }
    
//     return newErrors;
//   };

//   // Form validation
//   const validateForm = () => {
//     const newErrors = {};
    
//     // Full name validation - only alphabets and spaces
//     if (!formData.fullName.trim()) {
//       newErrors.fullName = 'Full name is required';
//     } else if (!/^[A-Za-z\s]+$/.test(formData.fullName.trim())) {
//       newErrors.fullName = 'Full name should contain only alphabets and spaces';
//     }
    
//     // Email validation
//     const emailValidation = validateEmail(formData.email);
//     if (!emailValidation.isValid) {
//       newErrors.email = emailValidation.message;
//     }
    
//     // Phone number validation - Indian mobile numbers starting with 6,7,8,9
//     if (!formData.phone.trim()) {
//       newErrors.phone = 'Phone number is required';
//     } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ''))) {
//       newErrors.phone = 'Please enter a valid 10-digit Indian mobile number starting with 6,7,8,9';
//     }
    
//     // Check for existing users (email and phone)
//     if (formData.email.trim() && formData.phone.trim()) {
//       const duplicateErrors = checkExistingUsers(formData.email, formData.phone, formData.emergencyContact);
//       Object.assign(newErrors, duplicateErrors);
//     }
    
//     // Enhanced password validation
//     const passwordValidation = validatePassword(formData.password);
//     if (!passwordValidation.isValid) {
//       newErrors.password = passwordValidation.message;
//     }
    
//     // Confirm password validation
//     if (!formData.confirmPassword) {
//       newErrors.confirmPassword = 'Please confirm your password';
//     } else if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }
    
//     // User type specific validations
//     const userTypeErrors = validateUserTypeFields();
//     Object.assign(newErrors, userTypeErrors);
    
//     // Custom field validations
//     if (userDetails.extraFields) {
//       Object.keys(userDetails.extraFields).forEach(field => {
//         if (!formData[field] && userDetails.fieldValidations?.[field]?.required) {
//           newErrors[field] = userDetails.fieldValidations[field].message;
//         }
//       });
//     }
    
//     return newErrors;
//   };

//   // Update password strength when password changes
//   useEffect(() => {
//     const strength = checkPasswordStrength(formData.password);
//     setPasswordStrength(strength);
//   }, [formData.password]);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
    
//     // Full name - only allow alphabets and spaces
//     if (name === 'fullName') {
//       const filteredValue = value.replace(/[^A-Za-z\s]/g, '');
//       setFormData(prev => ({
//         ...prev,
//         [name]: filteredValue
//       }));
      
//       // Clear error for this field
//       if (errors.fullName) {
//         setErrors(prev => ({ ...prev, fullName: '' }));
//       }
//     } 
//     // Email - real-time validation and duplicate check
//     else if (name === 'email') {
//       setFormData(prev => ({
//         ...prev,
//         [name]: value
//       }));
      
//       const validation = validateEmail(value);
//       if (!validation.isValid && value.trim()) {
//         setErrors(prev => ({ ...prev, email: validation.message }));
//       } else if (value.trim()) {
//         // Check for duplicate email in real-time
//         const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
//         const emailExists = registeredUsers.find(user => 
//           user.email.toLowerCase() === value.toLowerCase()
//         );
        
//         if (emailExists) {
//           setErrors(prev => ({ ...prev, email: `Email already registered as ${emailExists.userType}.` }));
//         } else {
//           setErrors(prev => ({ ...prev, email: '' }));
//         }
//       } else {
//         setErrors(prev => ({ ...prev, email: '' }));
//       }
//     }
//     // Phone number - format, validate and duplicate check
//     else if (name === 'phone') {
//       // Remove all non-digits
//       let digits = value.replace(/\D/g, '');
      
//       // Only allow numbers starting with 6,7,8,9
//       if (digits.length > 0) {
//         const firstDigit = digits[0];
//         if (!['6', '7', '8', '9'].includes(firstDigit)) {
//           return;
//         }
//       }
      
//       // Limit to 10 digits
//       if (digits.length > 10) {
//         digits = digits.substring(0, 10);
//       }
      
//       setFormData(prev => ({
//         ...prev,
//         [name]: digits
//       }));
      
//       // Check for duplicate phone in real-time
//       if (digits.length === 10) {
//         const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
//         const phoneExists = registeredUsers.find(user => {
//           const userPhoneDigits = user.phone.replace(/\D/g, '');
//           return userPhoneDigits === digits;
//         });
        
//         if (phoneExists) {
//           setErrors(prev => ({ ...prev, phone: `Mobile number already registered as ${phoneExists.userType}.` }));
//         } else {
//           setErrors(prev => ({ ...prev, phone: '' }));
//         }
//       } else {
//         setErrors(prev => ({ ...prev, phone: '' }));
//       }
//     }
//     // Password - real-time strength check
//     else if (name === 'password') {
//       setFormData(prev => ({
//         ...prev,
//         [name]: value
//       }));
      
//       if (value === formData.confirmPassword && errors.confirmPassword) {
//         setErrors(prev => ({ ...prev, confirmPassword: '' }));
//       }
      
//       const strength = checkPasswordStrength(value);
//       setPasswordStrength(strength);
      
//       // Clear error for this field
//       if (errors.password) {
//         setErrors(prev => ({ ...prev, password: '' }));
//       }
//     }
//     // Confirm password - real-time matching check
//     else if (name === 'confirmPassword') {
//       setFormData(prev => ({
//         ...prev,
//         [name]: value
//       }));
      
//       if (value && value !== formData.password) {
//         setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
//       } else if (errors.confirmPassword) {
//         setErrors(prev => ({ ...prev, confirmPassword: '' }));
//       }
//     }
//     // Emergency contact - same validation as phone with duplicate check
//     else if (name === 'emergencyContact') {
//       let digits = value.replace(/\D/g, '');
      
//       if (digits.length > 0) {
//         const firstDigit = digits[0];
//         if (!['6', '7', '8', '9'].includes(firstDigit)) {
//           return;
//         }
//       }
      
//       if (digits.length > 10) {
//         digits = digits.substring(0, 10);
//       }
      
//       setFormData(prev => ({
//         ...prev,
//         [name]: digits
//       }));
      
//       const validation = validateEmergencyContact(digits);
//       if (!validation.isValid) {
//         setErrors(prev => ({ ...prev, emergencyContact: validation.message }));
//       } else if (digits.length === 10) {
//         // Check for duplicate emergency contact in real-time
//         const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
//         const emergencyExists = registeredUsers.find(user => {
//           const userPhoneDigits = user.phone.replace(/\D/g, '');
//           const userEmergencyDigits = user.emergencyContact ? user.emergencyContact.replace(/\D/g, '') : '';
//           return userPhoneDigits === digits || userEmergencyDigits === digits;
//         });
        
//         // Check if emergency contact is same as primary phone
//         const primaryPhone = formData.phone.replace(/\D/g, '');
//         if (digits === primaryPhone) {
//           setErrors(prev => ({ ...prev, emergencyContact: 'Emergency contact cannot be the same as your primary phone number' }));
//         } else if (emergencyExists) {
//           setErrors(prev => ({ ...prev, emergencyContact: `Emergency contact already registered as ${emergencyExists.userType}.` }));
//         } else {
//           setErrors(prev => ({ ...prev, emergencyContact: '' }));
//         }
//       } else {
//         setErrors(prev => ({ ...prev, emergencyContact: '' }));
//       }
//     }
//     // Date of Birth - validate date
//     else if (name === 'dateOfBirth') {
//       setFormData(prev => ({
//         ...prev,
//         [name]: value
//       }));
      
//       if (value) {
//         const validation = validateDateOfBirth(value);
//         if (!validation.isValid) {
//           setErrors(prev => ({ ...prev, dateOfBirth: validation.message }));
//         } else {
//           setErrors(prev => ({ ...prev, dateOfBirth: '' }));
//         }
//       }
//     }
//     // Vendor specific fields
//     else if (name === 'gstNumber') {
//       setFormData(prev => ({
//         ...prev,
//         [name]: value.toUpperCase()
//       }));
      
//       const validation = validateGSTNumber(value);
//       if (!validation.isValid && value.trim()) {
//         setErrors(prev => ({ ...prev, gstNumber: validation.message }));
//       } else {
//         setErrors(prev => ({ ...prev, gstNumber: '' }));
//       }
//     }
//     else if (name === 'businessLicense') {
//       setFormData(prev => ({
//         ...prev,
//         [name]: value.toUpperCase()
//       }));
      
//       const validation = validateBusinessLicense(value);
//       if (!validation.isValid && value.trim()) {
//         setErrors(prev => ({ ...prev, businessLicense: validation.message }));
//       } else {
//         setErrors(prev => ({ ...prev, businessLicense: '' }));
//       }
//     }
//     // Delivery specific fields
//     else if (name === 'vehicleNumber') {
//       setFormData(prev => ({
//         ...prev,
//         [name]: value.toUpperCase()
//       }));
      
//       const validation = validateVehicleRegistration(value);
//       if (!validation.isValid && value.trim()) {
//         setErrors(prev => ({ ...prev, vehicleNumber: validation.message }));
//       } else {
//         setErrors(prev => ({ ...prev, vehicleNumber: '' }));
//       }
//     }
//     else if (name === 'idProofNumber') {
//       setFormData(prev => ({
//         ...prev,
//         [name]: value.toUpperCase()
//       }));
      
//       const validation = validateIdProofNumber(value);
//       if (!validation.isValid && value.trim()) {
//         setErrors(prev => ({ ...prev, idProofNumber: validation.message }));
//       } else {
//         setErrors(prev => ({ ...prev, idProofNumber: '' }));
//       }
//     }
//     // Doctor specific fields
//     else if (name === 'medicalLicense') {
//       setFormData(prev => ({
//         ...prev,
//         [name]: value.toUpperCase()
//       }));
      
//       const validation = validateMedicalLicense(value);
//       if (!validation.isValid && value.trim()) {
//         setErrors(prev => ({ ...prev, medicalLicense: validation.message }));
//       } else {
//         setErrors(prev => ({ ...prev, medicalLicense: '' }));
//       }
//     }
//     else if (name === 'yearsOfExperience') {
//       // Only allow numbers, prevent negative values
//       const numValue = value.replace(/[^0-9]/g, '');
//       const limitedValue = numValue.length > 2 ? numValue.substring(0, 2) : numValue;
      
//       setFormData(prev => ({
//         ...prev,
//         [name]: limitedValue
//       }));
      
//       const validation = validateYearsOfExperience(limitedValue);
//       if (!validation.isValid && limitedValue.trim()) {
//         setErrors(prev => ({ ...prev, yearsOfExperience: validation.message }));
//       } else {
//         setErrors(prev => ({ ...prev, yearsOfExperience: '' }));
//       }
//     }
//     else if (name === 'consultationFee') {
//       // Only allow numbers and decimal point, prevent negative values
//       const numValue = value.replace(/[^0-9.]/g, '');
//       // Remove multiple decimal points
//       const parts = numValue.split('.');
//       const sanitizedValue = parts[0] + (parts.length > 1 ? '.' + parts.slice(1).join('') : '');
      
//       setFormData(prev => ({
//         ...prev,
//         [name]: sanitizedValue
//       }));
      
//       const validation = validateConsultationFee(sanitizedValue);
//       if (!validation.isValid && sanitizedValue.trim()) {
//         setErrors(prev => ({ ...prev, consultationFee: validation.message }));
//       } else {
//         setErrors(prev => ({ ...prev, consultationFee: '' }));
//       }
//     }
//     // For other fields (gender, deliveryAddress, etc.)
//     else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: type === 'checkbox' ? checked : value
//       }));
      
//       // Clear error for this field when user starts typing
//       if (errors[name]) {
//         setErrors(prev => ({ ...prev, [name]: '' }));
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (currentStep < totalSteps) {
//       nextStep();
//       return;
//     }
    
//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       showToastMessage('Please fix the errors in the form', 'error');
//       return;
//     }
    
//     if (!acceptedTerms) {
//       showToastMessage('Please accept the terms and conditions', 'error');
//       return;
//     }
    
//     setIsLoading(true);
    
//     try {
//       await new Promise(resolve => setTimeout(resolve, 2000));
      
//       let finalUserData = { ...formData };
//       if (userDetails.onExtraStepSubmit) {
//         finalUserData = userDetails.onExtraStepSubmit(formData);
//       }
      
//       // Final duplicate check before saving
//       const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
//       const phoneDigits = formData.phone.replace(/\D/g, '');
//       const emergencyPhoneDigits = formData.emergencyContact ? formData.emergencyContact.replace(/\D/g, '') : '';
      
//       const emailExists = registeredUsers.find(user => 
//         user.email.toLowerCase() === formData.email.toLowerCase()
//       );
      
//       const phoneExists = registeredUsers.find(user => {
//         const userPhoneDigits = user.phone.replace(/\D/g, '');
//         return userPhoneDigits === phoneDigits;
//       });
      
//       // For patient/user, also check emergency contact
//       let emergencyContactExists = null;
//       if (emergencyPhoneDigits) {
//         emergencyContactExists = registeredUsers.find(user => {
//           const userPhoneDigits = user.phone.replace(/\D/g, '');
//           const userEmergencyDigits = user.emergencyContact ? user.emergencyContact.replace(/\D/g, '') : '';
//           return userPhoneDigits === emergencyPhoneDigits || userEmergencyDigits === emergencyPhoneDigits;
//         });
//       }
      
//       if (emailExists) {
//         showToastMessage(`Email already registered as ${emailExists.userType}. Please use a different email.`, 'error');
//         setIsLoading(false);
//         return;
//       }
      
//       if (phoneExists) {
//         showToastMessage(`Mobile number already registered as ${phoneExists.userType}. Please use a different number.`, 'error');
//         setIsLoading(false);
//         return;
//       }
      
//       if (emergencyContactExists) {
//         showToastMessage(`Emergency contact number already registered as ${emergencyContactExists.userType}. Please use a different number.`, 'error');
//         setIsLoading(false);
//         return;
//       }
      
//       const newUser = {
//         id: Date.now(),
//         ...finalUserData,
//         userType: userType,
//         createdAt: new Date().toISOString(),
//         isVerified: false,
//         // Add additional metadata
//         verificationStatus: 'pending',
//         lastLogin: null,
//         profileComplete: true
//       };
      
//       const updatedUsers = [...registeredUsers, newUser];
//       localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
//       localStorage.setItem('recentSignupType', userType);
      
//       // INTEGRATION POINT: Save to ProfileContext
//       const signupProfileData = {
//         fullName: formData.fullName,
//         email: formData.email,
//         phone: formData.phone,
//         address: formData.deliveryAddress || formData.address || '',
//         country: 'India',
//         dateOfBirth: formData.dateOfBirth,
//         age: calculateAge(formData.dateOfBirth) || '',
//         gender: formData.gender,
//         userType: userType,
//         emergencyContact: formData.emergencyContact
//       };
      
//       console.log('Saving profile data from signup:', signupProfileData);
//       profileContext.setProfileFromSignup(signupProfileData);
      
//       // Also store in session for immediate use
//       sessionStorage.setItem('currentUser', JSON.stringify(newUser));
      
//       showToastMessage(`Successfully registered as ${userDetails.label}! Redirecting to login...`, 'success');
      
//       setTimeout(() => {
//         navigate(`/login/${userType}`, { 
//           state: { 
//             signupSuccess: true,
//             registeredEmail: newUser.email,
//             registeredPhone: newUser.phone
//           }
//         });
//       }, 1500);
      
//     } catch (error) {
//       console.error('Signup error:', error);
//       showToastMessage('Registration failed. Please try again.', 'error');
//       setIsLoading(false);
//     }
//   };

//   const showToastMessage = (message, type) => {
//     setToastMessage(message);
//     setToastType(type);
//     setShowToast(true);
//     setTimeout(() => setShowToast(false), 3000);
//   };

//   const handleBackToLogin = () => {
//     navigate(`/login/${userType}`);
//   };

//   const handleBackToSelection = () => {
//     navigate('/login');
//   };

//   const handleBackToHome = () => {
//     navigate('/');
//   };

//   // Step navigation with validation
//   const nextStep = () => {
//     if (currentStep === 1) {
//       const step1Fields = ['fullName', 'email', 'phone'];
//       const step1Errors = {};
//       let hasErrors = false;
      
//       step1Fields.forEach(field => {
//         if (!formData[field]) {
//           step1Errors[field] = 'This field is required';
//           hasErrors = true;
//         }
//       });
      
//       const emailValidation = validateEmail(formData.email);
//       if (!emailValidation.isValid) {
//         step1Errors.email = emailValidation.message;
//         hasErrors = true;
//       }
      
//       if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ''))) {
//         step1Errors.phone = 'Please enter a valid 10-digit Indian mobile number starting with 6,7,8,9';
//         hasErrors = true;
//       }
      
//       // Check for existing users when moving to next step
//       if (formData.email.trim() && formData.phone.trim()) {
//         const duplicateErrors = checkExistingUsers(formData.email, formData.phone);
//         Object.assign(step1Errors, duplicateErrors);
//         if (Object.keys(duplicateErrors).length > 0) {
//           hasErrors = true;
//         }
//       }
      
//       if (hasErrors) {
//         setErrors(step1Errors);
//         showToastMessage('Please fix the errors before proceeding', 'error');
//         return;
//       }
//     }
    
//     if (currentStep === 2) {
//       const step2Errors = {};
//       let hasErrors = false;
      
//       const passwordValidation = validatePassword(formData.password);
//       if (!passwordValidation.isValid) {
//         step2Errors.password = passwordValidation.message;
//         hasErrors = true;
//       }
      
//       if (!formData.confirmPassword) {
//         step2Errors.confirmPassword = 'Please confirm your password';
//         hasErrors = true;
//       } else if (formData.password !== formData.confirmPassword) {
//         step2Errors.confirmPassword = 'Passwords do not match';
//         hasErrors = true;
//       }
      
//       if (hasErrors) {
//         setErrors(step2Errors);
//         showToastMessage('Please fix the password errors before proceeding', 'error');
//         return;
//       }
//     }
    
//     setCurrentStep(prev => prev + 1);
//   };

//   const prevStep = () => {
//     setCurrentStep(prev => prev - 1);
//   };

//   // Custom Eye Icon Components
//   const EyeIcon = () => (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#009688" strokeWidth="2">
//       <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
//       <circle cx="12" cy="12" r="3"></circle>
//     </svg>
//   );

//   const EyeOffIcon = () => (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#009688" strokeWidth="2">
//       <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
//       <line x1="1" y1="1" x2="23" y2="23"></line>
//     </svg>
//   );

//   // Get maximum date for date picker (today)
//   const getMaxDate = () => {
//     const today = new Date();
//     const year = today.getFullYear();
//     const month = String(today.getMonth() + 1).padStart(2, '0');
//     const day = String(today.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

//   // Get minimum date for date picker (150 years ago)
//   const getMinDate = () => {
//     const today = new Date();
//     const year = today.getFullYear() - 150;
//     const month = String(today.getMonth() + 1).padStart(2, '0');
//     const day = String(today.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

//   // Password strength indicator component
//   const PasswordStrengthIndicator = () => {
//     const segments = [];
//     const totalSegments = 6;
    
//     for (let i = 0; i < totalSegments; i++) {
//       const isActive = i <= Math.floor(passwordStrength.score);
//       segments.push(
//         <div 
//           key={i}
//           className="strength-segment"
//           style={{
//             backgroundColor: isActive ? passwordStrength.color : '#e0e0e0',
//             width: '100%',
//             height: '4px',
//             borderRadius: '2px',
//             transition: 'all 0.3s ease'
//           }}
//         />
//       );
//     }
    
//     return (
//       <div className="strength-indicator">
//         <div className="strength-bar" style={{ display: 'flex', gap: '4px', marginTop: '5px' }}>
//           {segments}
//         </div>
//         <div 
//           className="strength-text"
//           style={{ 
//             color: passwordStrength.color,
//             fontSize: '12px',
//             marginTop: '5px',
//             fontWeight: 'bold'
//           }}
//         >
//           {passwordStrength.message}
//         </div>
//       </div>
//     );
//   };

//   // Password requirements checklist
//   const PasswordRequirements = () => {
//     const requirements = passwordStrength.requirements || {};
    
//     const requirementChecks = [
//       { key: 'length', label: 'At least 12 characters long', met: requirements.length },
//       { key: 'uppercase', label: 'Contains uppercase letter (A-Z)', met: requirements.uppercase },
//       { key: 'lowercase', label: 'Contains lowercase letter (a-z)', met: requirements.lowercase },
//       { key: 'number', label: 'Contains number (0-9)', met: requirements.number },
//       { key: 'special', label: 'Contains special character (!@#$%^&*)', met: requirements.special },
//       { key: 'noCommon', label: 'Not a common password', met: requirements.noCommon }
//     ];
    
//     return (
//       <div className="password-requirements">
//         <div className="requirements-title" style={{ fontSize: '13px', fontWeight: 600, color: '#124441', marginBottom: '8px' }}>
//           Password Requirements:
//         </div>
//         <div className="requirements-list" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
//           {requirementChecks.map((req, index) => (
//             <div 
//               key={index} 
//               className="requirement-item"
//               style={{ 
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '8px',
//                 fontSize: '12px',
//                 color: req.met ? '#4CAF50' : '#9e9e9e'
//               }}
//             >
//               <span style={{ fontSize: '14px' }}>
//                 {req.met ? '✓' : '○'}
//               </span>
//               <span style={{ textDecoration: req.met ? 'none' : 'line-through', opacity: req.met ? 1 : 0.7 }}>
//                 {req.label}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   // User type specific custom fields
//   const getUserTypeCustomFields = () => {
//     switch (userType) {
//       case 'vendor':
//         return [
//           {
//             name: 'gstNumber',
//             label: 'GST Number',
//             type: 'text',
//             placeholder: 'Enter 15-digit GST number (e.g., 22AAAAA0000A1Z5)',
//             required: true
//           },
//           {
//             name: 'businessLicense',
//             label: 'Business License Number',
//             type: 'text',
//             placeholder: 'Enter business license number (8-20 alphanumeric)',
//             required: true
//           },
//           {
//             name: 'pharmacyName',
//             label: 'Pharmacy/Hospital Name',
//             type: 'text',
//             placeholder: 'Enter your pharmacy or hospital name',
//             required: true
//           },
//           {
//             name: 'address',
//             label: 'Business Address',
//             type: 'textarea',
//             placeholder: 'Enter complete business address',
//             required: true
//           }
//         ];
        
//       case 'delivery':
//         return [
//           {
//             name: 'vehicleNumber',
//             label: 'Vehicle Registration Number',
//             type: 'text',
//             placeholder: 'Enter vehicle number (e.g., MH-12-AB-1234)',
//             required: true
//           },
//           {
//             name: 'vehicleType',
//             label: 'Vehicle Type',
//             type: 'select',
//             options: [
//               { value: 'bike', label: 'Bike' },
//               { value: 'scooter', label: 'Scooter' },
//               { value: 'car', label: 'Car' },
//               { value: 'van', label: 'Van' }
//             ],
//             required: true
//           },
//           {
//             name: 'idProofNumber',
//             label: 'ID Proof Number',
//             type: 'text',
//             placeholder: 'Enter Aadhaar, PAN, or Driving License number',
//             required: true
//           },
//           {
//             name: 'idProofType',
//             label: 'ID Proof Type',
//             type: 'select',
//             options: [
//               { value: 'aadhaar', label: 'Aadhaar Card' },
//               { value: 'pan', label: 'PAN Card' },
//               { value: 'dl', label: 'Driving License' },
//               { value: 'voter', label: 'Voter ID' }
//             ],
//             required: true
//           }
//         ];
        
//       case 'doctor':
//         return [
//           {
//             name: 'medicalLicense',
//             label: 'Medical License Number',
//             type: 'text',
//             placeholder: 'Enter medical license number (e.g., MCI/12345)',
//             required: true
//           },
//           {
//             name: 'specialization',
//             label: 'Specialization',
//             type: 'select',
//             options: [
//               { value: 'general', label: 'General Physician' },
//               { value: 'cardio', label: 'Cardiologist' },
//               { value: 'neuro', label: 'Neurologist' },
//               { value: 'ortho', label: 'Orthopedic' },
//               { value: 'pediatric', label: 'Pediatrician' },
//               { value: 'gynec', label: 'Gynecologist' },
//               { value: 'dental', label: 'Dentist' },
//               { value: 'dermat', label: 'Dermatologist' }
//             ],
//             required: true
//           },
//           {
//             name: 'yearsOfExperience',
//             label: 'Years of Experience',
//             type: 'number',
//             placeholder: 'Enter years of experience (0-60)',
//             required: true,
//             min: 0,
//             max: 60
//           },
//           {
//             name: 'consultationFee',
//             label: 'Consultation Fee (₹)',
//             type: 'number',
//             placeholder: 'Enter consultation fee (0-10000)',
//             required: true,
//             min: 0,
//             max: 10000,
//             step: 50
//           },
//           {
//             name: 'clinicAddress',
//             label: 'Clinic/Hospital Address',
//             type: 'textarea',
//             placeholder: 'Enter your clinic or hospital address',
//             required: true
//           }
//         ];
        
//       case 'user':
//       case 'patient':
//         return [
//           {
//             name: 'dateOfBirth',
//             label: 'Date of Birth',
//             type: 'date',
//             required: true
//           },
//           {
//             name: 'gender',
//             label: 'Gender',
//             type: 'select',
//             options: [
//               { value: 'male', label: 'Male' },
//               { value: 'female', label: 'Female' },
//               { value: 'other', label: 'Other' },
//               { value: 'prefer-not-to-say', label: 'Prefer not to say' }
//             ],
//             required: true
//           },
//           {
//             name: 'deliveryAddress',
//             label: 'Delivery Address',
//             type: 'textarea',
//             placeholder: 'Enter your complete address for medicine delivery',
//             required: true
//           },
//           {
//             name: 'emergencyContact',
//             label: 'Emergency Contact Number',
//             type: 'tel',
//             placeholder: 'Enter emergency contact number',
//             required: true,
//             maxLength: 10
//           }
//         ];
        
//       default:
//         return userDetails.customFields || [];
//     }
//   };

//   // Render step content
//   const renderStepContent = () => {
//     const customFields = getUserTypeCustomFields();
    
//     switch (currentStep) {
//       case 1:
//         return (
//           <div className="step-content">
//             <h3 className="step-title">Personal Information</h3>
            
//             <div className="input-group">
//               <label>Full Name *</label>
//               <input
//                 type="text"
//                 name="fullName"
//                 value={formData.fullName}
//                 onChange={handleInputChange}
//                 placeholder="Enter your full name (alphabets only)"
//                 disabled={isLoading}
//                 className={errors.fullName ? 'error' : ''}
//                 maxLength={50}
//               />
//               {errors.fullName && <span className="error-message">{errors.fullName}</span>}
//               <div className="input-hint">
//                 Only alphabets and spaces allowed
//               </div>
//             </div>
            
//             <div className="input-group">
//               <label>Email Address *</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 placeholder="Enter your email address"
//                 disabled={isLoading}
//                 className={errors.email ? 'error' : ''}
//               />
//               {errors.email && <span className={`error-message ${errors.email.includes('already registered') ? 'duplicate-error' : ''}`}>
//                 {errors.email}
//               </span>}
//               <div className="input-hint">
//                 We'll send a verification email to this address
//               </div>
//             </div>
            
//             <div className="input-group">
//               <label>Phone Number *</label>
//               <input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleInputChange}
//                 placeholder="Enter 10-digit mobile number"
//                 disabled={isLoading}
//                 className={errors.phone ? 'error' : ''}
//                 maxLength={10}
//               />
//               {errors.phone && <span className={`error-message ${errors.phone.includes('already registered') ? 'duplicate-error' : ''}`}>
//                 {errors.phone}
//               </span>}
//               <div className="input-hint">
//                 10-digit Indian mobile number starting with 6,7,8,9
//               </div>
//             </div>
//           </div>
//         );
        
//       case 2:
//         return (
//           <div className="step-content">
//             <h3 className="step-title">Account Security</h3>
            
//             <div className="input-group">
//               <label>Password *</label>
//               <div className="password-input-wrapper">
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   placeholder="Create a strong password (min. 12 characters)"
//                   disabled={isLoading}
//                   className={errors.password ? 'error' : ''}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="password-toggle"
//                   disabled={isLoading}
//                   aria-label={showPassword ? "Hide password" : "Show password"}
//                 >
//                   {showPassword ? <EyeOffIcon /> : <EyeIcon />}
//                 </button>
//               </div>
//               {errors.password && <span className="error-message">{errors.password}</span>}
              
//               <PasswordStrengthIndicator />
              
//               <PasswordRequirements />
              
//               <div className="password-guidelines" style={{ marginTop: '15px', padding: '10px', backgroundColor: '#F5F5F5', borderRadius: '6px' }}>
//                 <div style={{ fontSize: '12px', fontWeight: 600, color: '#124441', marginBottom: '5px' }}>Password Guidelines:</div>
//                 <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '11px', color: '#4F6F6B' }}>
//                   <li>Use a mix of letters, numbers, and special characters</li>
//                   <li>Avoid common words or personal information</li>
//                   <li>Don't use sequential characters (123, abc)</li>
//                   <li>Consider using a passphrase</li>
//                 </ul>
//               </div>
//             </div>
            
//             <div className="input-group">
//               <label>Confirm Password *</label>
//               <div className="password-input-wrapper">
//                 <input
//                   type={showConfirmPassword ? 'text' : 'password'}
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleInputChange}
//                   placeholder="Re-enter your password for confirmation"
//                   disabled={isLoading}
//                   className={errors.confirmPassword ? 'error' : ''}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="password-toggle"
//                   disabled={isLoading}
//                   aria-label={showConfirmPassword ? "Hide password" : "Show password"}
//                 >
//                   {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
//                 </button>
//               </div>
//               {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              
//               {formData.confirmPassword && formData.password === formData.confirmPassword && (
//                 <div className="success-message">
//                   ✓ Passwords match
//                 </div>
//               )}
              
//               {formData.confirmPassword && formData.password !== formData.confirmPassword && (
//                 <div className="error-message" style={{ marginTop: '5px', padding: '4px 8px', fontSize: '12px' }}>
//                   ❌ Passwords do not match
//                 </div>
//               )}
//             </div>
//           </div>
//         );
        
//       case 3:
//         return (
//           <div className="step-content">
//             <h3 className="step-title">{userDetails.label} Details</h3>
//             {customFields.map((field, index) => (
//               <div key={index} className="input-group">
//                 <label>
//                   {field.label}
//                   {field.required && ' *'}
//                 </label>
//                 {field.type === 'textarea' ? (
//                   <textarea
//                     name={field.name}
//                     value={formData[field.name] || ''}
//                     onChange={handleInputChange}
//                     placeholder={field.placeholder}
//                     disabled={isLoading}
//                     rows={4}
//                     className={errors[field.name] ? 'error' : ''}
//                   />
//                 ) : field.type === 'select' ? (
//                   <select
//                     name={field.name}
//                     value={formData[field.name] || ''}
//                     onChange={handleInputChange}
//                     disabled={isLoading}
//                     className={errors[field.name] ? 'error' : ''}
//                   >
//                     <option value="">Select {field.label}</option>
//                     {field.options?.map((option, idx) => (
//                       <option key={idx} value={option.value}>
//                         {option.label}
//                       </option>
//                     ))}
//                   </select>
//                 ) : field.type === 'number' ? (
//                   <input
//                     type="number"
//                     name={field.name}
//                     value={formData[field.name] || ''}
//                     onChange={handleInputChange}
//                     placeholder={field.placeholder}
//                     disabled={isLoading}
//                     className={errors[field.name] ? 'error' : ''}
//                     min={field.min || 0}
//                     max={field.max || 1000000}
//                     step={field.step || 1}
//                   />
//                 ) : field.type === 'date' ? (
//                   <input
//                     type="date"
//                     name={field.name}
//                     value={formData[field.name] || ''}
//                     onChange={handleInputChange}
//                     disabled={isLoading}
//                     className={errors[field.name] ? 'error' : ''}
//                     max={getMaxDate()}
//                     min={getMinDate()}
//                   />
//                 ) : (
//                   <input
//                     type={field.type || 'text'}
//                     name={field.name}
//                     value={formData[field.name] || ''}
//                     onChange={handleInputChange}
//                     placeholder={field.placeholder}
//                     disabled={isLoading}
//                     className={errors[field.name] ? 'error' : ''}
//                     maxLength={field.maxLength}
//                   />
//                 )}
//                 {errors[field.name] && (
//                   <span className={`error-message ${errors[field.name].includes('already registered') ? 'duplicate-error' : ''}`}>
//                     {errors[field.name]}
//                   </span>
//                 )}
//                 {field.name === 'emergencyContact' && (
//                   <div className="input-hint">
//                     10-digit Indian mobile number starting with 6,7,8,9
//                   </div>
//                 )}
//               </div>
//             ))}
            
//             <div className="terms-section">
//               <label className="terms-checkbox">
//                 <input
//                   type="checkbox"
//                   checked={acceptedTerms}
//                   onChange={(e) => setAcceptedTerms(e.target.checked)}
//                   disabled={isLoading}
//                 />
//                 <span>
//                   I agree to the Terms of Service and Privacy Policy
//                 </span>
//               </label>
//             </div>
//           </div>
//         );
        
//       case 4:
//         return (
//           <div className="step-content">
//             <h3 className="step-title">Additional Information</h3>
//             {userDetails.extraStepContent ? (
//               userDetails.extraStepContent(formData, handleInputChange, errors)
//             ) : (
//               <p>No additional information required.</p>
//             )}
//           </div>
//         );
        
//       default:
//         return null;
//     }
//   };

//   // Generate step labels based on user type
//   const getStepLabels = () => {
//     const labels = [
//       { number: 1, label: 'Personal Info' },
//       { number: 2, label: 'Security' },
//       { number: 3, label: userDetails.label + ' Details' }
//     ];
    
//     if (userDetails.hasExtraStep) {
//       labels.push({ number: 4, label: 'Additional Info' });
//     }
    
//     return labels;
//   };

//   const stepLabels = getStepLabels();

//   return (
//     <div className="signup-container">
//       {/* Toast Message */}
//       {showToast && (
//         <div className={`toast-message ${toastType}`}>
//           {toastType === 'success' ? '✅ ' : '❌ '}{toastMessage}
//         </div>
//       )}

//       {/* Back Buttons */}
//       <div className="back-buttons">
//         <button 
//           onClick={handleBackToHome}
//           className="back-home-btn"
//           disabled={isLoading}
//         >
//           ← Home
//         </button>
//         <button 
//           onClick={handleBackToSelection}
//           className="back-selection-btn"
//           disabled={isLoading}
//         >
//           ← Change Role
//         </button>
//       </div>

//       {/* Main Card Container */}
//       <div className="main-card">
//         {/* Left Side - User Info */}
//         <div className="left-section">
//           <div className="user-icon">
//             {userDetails.icon}
//           </div>
          
//           <h2 className="user-title">
//             Join as {userDetails.title}
//           </h2>
          
//           <p className="user-quote">
//             {userDetails.quote}
//           </p>
          
//           {/* Progress Steps */}
//           <div className="progress-steps">
//             {stepLabels.map((step) => (
//               <div key={step.number} className="step-indicator">
//                 <div className={`step-circle ${currentStep === step.number ? 'active' : currentStep > step.number ? 'completed' : ''}`}>
//                   {currentStep > step.number ? '✓' : step.number}
//                 </div>
//                 <span className="step-label">
//                   {step.label}
//                 </span>
//               </div>
//             ))}
//           </div>
          
//           <div className="benefits-list">
//             <h4>Benefits:</h4>
//             {userDetails.benefits?.map((benefit, index) => (
//               <div key={index} className="benefit-item">
//                 <span className="benefit-icon">✓</span>
//                 <span>{benefit}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Right Side - Signup Form */}
//         <div className="right-section">
//           <div className="form-header">
//             <h1 className="app-title">QUICKMED</h1>
//             <h2 className="signup-title">Create {userDetails.label} Account</h2>
//             <p className="signup-subtitle">Step {currentStep} of {totalSteps}</p>
//           </div>

//           <form onSubmit={handleSubmit}>
//             {renderStepContent()}
            
//             <div className="form-navigation">
//               {currentStep > 1 && (
//                 <button
//                   type="button"
//                   onClick={prevStep}
//                   disabled={isLoading}
//                   className="nav-btn prev-btn"
//                 >
//                   ← Previous
//                 </button>
//               )}
              
//               {currentStep < totalSteps ? (
//                 <button
//                   type="button"
//                   onClick={nextStep}
//                   disabled={isLoading}
//                   className="nav-btn next-btn"
//                 >
//                   Next →
//                 </button>
//               ) : (
//                 <button
//                   type="submit"
//                   disabled={isLoading || !acceptedTerms}
//                   className="submit-btn"
//                 >
//                   {isLoading ? 'Creating Account...' : 'Complete Registration'}
//                 </button>
//               )}
//             </div>
//           </form>

//           <div className="login-section">
//             <p>
//               Already have an account?{' '}
//               <span 
//                 onClick={() => !isLoading && handleBackToLogin()}
//                 className="login-link"
//                 role="button"
//                 tabIndex={0}
//               >
//                 Login here
//               </span>
//             </p>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .signup-container {
//           min-height: 100vh;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
//           background: linear-gradient(135deg, #E0F2F1 0%, #FFFFFF 50%, #E0F2F1 100%);
//           padding: 65px;
//           position: relative;
//         }

//         .back-buttons {
//           position: absolute;
//           top: 20px;
//           left: 20px;
//           display: flex;
//           gap: 10px;
//           z-index: 10;
//         }

//         .back-home-btn, .back-selection-btn {
//           padding: 10px 20px;
//           background-color: #FFFFFF;
//           color: #009688;
//           border: 2px solid #009688;
//           border-radius: 8px;
//           font-size: 14px;
//           font-weight: 500;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           box-shadow: 0 2px 8px rgba(0,0,0,0.1);
//         }

//         .back-home-btn:hover:not(:disabled),
//         .back-selection-btn:hover:not(:disabled) {
//           background-color: #009688;
//           color: #FFFFFF;
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(0, 150, 136, 0.3);
//         }

//         .back-home-btn:disabled,
//         .back-selection-btn:disabled {
//           opacity: 0.7;
//           cursor: not-allowed;
//           transform: none;
//         }

//         .toast-message {
//           position: fixed;
//           top: 20px;
//           right: 20px;
//           background-color: #009688;
//           color: white;
//           padding: 12px 20px;
//           border-radius: 8px;
//           box-shadow: 0 4px 12px rgba(0,0,0,0.15);
//           z-index: 1000;
//           animation: slideInRight 0.3s ease-out;
//           font-size: 14px;
//           font-weight: 500;
//           max-width: 400px;
//         }

//         .toast-message.error {
//           background-color: #F44336;
//         }

//         .main-card {
//           display: flex;
//           width: 100%;
//           max-width: 1200px;
//           background-color: white;
//           border-radius: 16px;
//           box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
//           overflow: hidden;
//           min-height: 650px;
//         }

//         /* Left Section */
//         .left-section {
//           flex: 1;
//           background: linear-gradient(135deg, #009688 0%, #00796B 100%);
//           color: white;
//           padding: 40px;
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//           text-align: center;
//         }

//         .user-icon {
//           font-size: 60px;
//           margin-bottom: 30px;
//         }

//         .user-title {
//           font-size: 28px;
//           font-weight: 700;
//           margin-bottom: 20px;
//           line-height: 1.3;
//         }

//         .user-quote {
//           font-size: 16px;
//           line-height: 1.6;
//           opacity: 0.9;
//           margin-bottom: 40px;
//         }

//         .progress-steps {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 40px;
//           position: relative;
//         }

//         .progress-steps::before {
//           content: '';
//           position: absolute;
//           top: 20px;
//           left: 5%;
//           right: 5%;
//           height: 2px;
//           background-color: rgba(255,255,255,0.3);
//           z-index: 1;
//         }

//         .step-indicator {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           position: relative;
//           z-index: 2;
//           flex: 1;
//           min-width: 80px;
//         }

//         .step-circle {
//           width: 40px;
//           height: 40px;
//           border-radius: 50%;
//           background-color: rgba(255,255,255,0.2);
//           color: white;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-weight: 600;
//           margin-bottom: 8px;
//           transition: all 0.3s ease;
//         }

//         .step-circle.active {
//           background-color: #FFFFFF;
//           color: #009688;
//           transform: scale(1.1);
//           box-shadow: 0 4px 12px rgba(255,255,255,0.3);
//         }

//         .step-circle.completed {
//           background-color: #4DB6AC;
//           color: white;
//         }

//         .step-label {
//           font-size: 12px;
//           opacity: 0.9;
//           text-align: center;
//           max-width: 80px;
//         }

//         .benefits-list {
//           text-align: left;
//           background-color: rgba(255,255,255,0.1);
//           padding: 20px;
//           border-radius: 10px;
//         }

//         .benefits-list h4 {
//           margin: 0 0 15px 0;
//           font-size: 18px;
//           opacity: 0.9;
//         }

//         .benefit-item {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//           margin-bottom: 12px;
//           font-size: 14px;
//           opacity: 0.9;
//         }

//         .benefit-icon {
//           color: #4DB6AC;
//           font-weight: bold;
//           font-size: 16px;
//         }

//         /* Right Section */
//         .right-section {
//           flex: 1.2;
//           padding: 50px 40px;
//           display: flex;
//           flex-direction: column;
//         }

//         .form-header {
//           text-align: center;
//           margin-bottom: 30px;
//         }

//         .app-title {
//           font-size: 32px;
//           font-weight: 700;
//           margin-bottom: 8px;
//           color: #009688;
//         }

//         .signup-title {
//           color: #124441;
//           font-size: 24px;
//           font-weight: 600;
//           margin-bottom: 4px;
//         }

//         .signup-subtitle {
//           color: #4F6F6B;
//           font-size: 14px;
//           margin: 0;
//         }

//         .step-content {
//           flex: 1;
//         }

//         .step-title {
//           color: #124441;
//           font-size: 18px;
//           margin-bottom: 25px;
//           padding-bottom: 10px;
//           border-bottom: 2px solid #E0F2F1;
//         }

//         .input-group {
//           margin-bottom: 20px;
//         }

//         .input-group label {
//           display: block;
//           margin-bottom: 8px;
//           font-weight: 500;
//           color: #124441;
//           font-size: 14px;
//         }

//         .input-group input,
//         .input-group select,
//         .input-group textarea {
//           width: 100%;
//           padding: 14px 16px;
//           border: 1px solid #E0F2F1;
//           border-radius: 8px;
//           font-size: 14px;
//           box-sizing: border-box;
//           outline: none;
//           transition: all 0.2s ease;
//           color: #124441;
//           background-color: #FAFAFA;
//           font-family: 'Inter', sans-serif;
//         }

//         /* Date input specific styling */
//         .input-group input[type="date"] {
//           position: relative;
//         }

//         .input-group input[type="date"]::-webkit-calendar-picker-indicator {
//           background: transparent;
//           bottom: 0;
//           color: transparent;
//           cursor: pointer;
//           height: auto;
//           left: 0;
//           position: absolute;
//           right: 0;
//           top: 0;
//           width: auto;
//         }

//         .input-group input[type="date"]::after {
//           content: "📅";
//           position: absolute;
//           right: 15px;
//           top: 50%;
//           transform: translateY(-50%);
//           color: #4F6F6B;
//           pointer-events: none;
//         }

//         /* Number input specific styling */
//         .input-group input[type="number"]::-webkit-inner-spin-button,
//         .input-group input[type="number"]::-webkit-outer-spin-button {
//           -webkit-appearance: none;
//           margin: 0;
//         }

//         .input-group input[type="number"] {
//           -moz-appearance: textfield;
//         }

//         .password-input-wrapper {
//           position: relative;
//         }

//         .password-input-wrapper input {
//           padding-right: 50px !important;
//         }

//         .password-toggle {
//           position: absolute;
//           right: 12px;
//           top: 50%;
//           transform: translateY(-50%);
//           background: none;
//           border: none;
//           cursor: pointer;
//           color: #4F6F6B;
//           padding: 4px;
//           border-radius: 4px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           width: 32px;
//           height: 32px;
//           transition: all 0.2s ease;
//           z-index: 2;
//         }

//         .password-toggle:hover:not(:disabled) {
//           background-color: #E0F2F1;
//           color: #009688;
//           transform: translateY(-50%) scale(1.1);
//         }

//         .password-toggle:disabled {
//           opacity: 0.7;
//           cursor: not-allowed;
//           transform: translateY(-50%);
//         }

//         .input-group input:focus,
//         .input-group select:focus,
//         .input-group textarea:focus {
//           border-color: #009688;
//           box-shadow: 0 0 0 3px rgba(0, 150, 136, 0.1);
//           background-color: #FFFFFF;
//         }

//         .input-group input.error,
//         .input-group select.error,
//         .input-group textarea.error {
//           border-color: #F44336;
//         }

//         .input-group input:disabled,
//         .input-group select:disabled,
//         .input-group textarea:disabled {
//           opacity: 0.7;
//           cursor: not-allowed;
//           background-color: #F5F5F5;
//         }

//         .error-message {
//           color: #F44336;
//           font-size: 12px;
//           margin-top: 5px;
//           display: block;
//           font-weight: 500;
//           padding: 4px 8px;
//           background-color: rgba(244, 67, 54, 0.1);
//           border-radius: 4px;
//           border-left: 3px solid #F44336;
//           animation: fadeIn 0.3s ease;
//         }

//         .error-message.duplicate-error {
//           background-color: rgba(255, 152, 0, 0.1);
//           border-left: 3px solid #FF9800;
//           color: #FF9800;
//         }

//         .success-message {
//           color: #4CAF50;
//           font-size: 12px;
//           margin-top: 5px;
//           display: block;
//           font-weight: 500;
//           padding: 4px 8px;
//           background-color: rgba(76, 175, 80, 0.1);
//           border-radius: 4px;
//           border-left: 3px solid #4CAF50;
//         }

//         .input-hint {
//           color: #4F6F6B;
//           font-size: 12px;
//           margin-top: 4px;
//           font-style: italic;
//         }

//         .terms-section {
//           margin-top: 30px;
//           padding: 20px;
//           background-color: #F9F9F9;
//           border-radius: 8px;
//           border: 1px solid #E0F2F1;
//         }

//         .terms-checkbox {
//           display: flex;
//           align-items: flex-start;
//           gap: 10px;
//           cursor: pointer;
//           color: #124441;
//           font-size: 14px;
//           line-height: 1.5;
//         }

//         .terms-checkbox input {
//           margin-top: 3px;
//           accent-color: #009688;
//         }

//         .form-navigation {
//           display: flex;
//           justify-content: space-between;
//           margin-top: 40px;
//           padding-top: 20px;
//           border-top: 1px solid #E0F2F1;
//         }

//         .nav-btn {
//           padding: 12px 24px;
//           border: 2px solid #009688;
//           background-color: white;
//           color: #009688;
//           border-radius: 8px;
//           font-size: 14px;
//           font-weight: 500;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .nav-btn:hover:not(:disabled) {
//           background-color: #009688;
//           color: white;
//           transform: translateY(-2px);
//         }

//         .nav-btn:disabled {
//           opacity: 0.7;
//           cursor: not-allowed;
//           transform: none;
//         }

//         .next-btn {
//           margin-left: auto;
//         }

//         .submit-btn {
//           padding: 14px 30px;
//           background-color: #009688;
//           color: white;
//           border: none;
//           border-radius: 8px;
//           font-size: 16px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           width: 100%;
//         }

//         .submit-btn:hover:not(:disabled) {
//           background-color: #00796B;
//           transform: translateY(-2px);
//           box-shadow: 0 6px 20px rgba(0, 150, 136, 0.4);
//         }

//         .submit-btn:disabled {
//           opacity: 0.7;
//           cursor: not-allowed;
//           animation: pulse 1.5s ease-in-out infinite;
//           transform: none;
//         }

//         .login-section {
//           margin-top: 30px;
//           text-align: center;
//           padding-top: 20px;
//           border-top: 1px solid #E0F2F1;
//         }

//         .login-section p {
//           color: #4F6F6B;
//           font-size: 14px;
//           margin: 0;
//         }

//         .login-link {
//           color: #009688;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.2s ease;
//           padding: 2px 6px;
//           border-radius: 4px;
//           text-decoration: none;
//           display: inline-block;
//         }

//         .login-link:hover {
//           color: #00796B;
//           background-color: #E0F2F1;
//           transform: translateY(-1px);
//         }

//         @keyframes slideInRight {
//           from {
//             transform: translateX(100%);
//             opacity: 0;
//           }
//           to {
//             transform: translateX(0);
//             opacity: 1;
//           }
//         }
        
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(-5px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes pulse {
//           0% { opacity: 1; }
//           50% { opacity: 0.7; }
//           100% { opacity: 1; }
//         }

//         /* Responsive Styles */
//         @media (max-width: 1024px) {
//           .main-card {
//             max-width: 900px;
//           }
          
//           .progress-steps::before {
//             left: 8%;
//             right: 8%;
//           }
//         }

//         @media (max-width: 768px) {
//           .main-card {
//             flex-direction: column;
//             min-height: auto;
//             margin-top: 80px;
//             max-width: 500px;
//           }

//           .back-buttons {
//             flex-direction: column;
//             top: 10px;
//             left: 10px;
//           }

//           .left-section {
//             padding: 30px 20px;
//             min-height: 300px;
//           }

//           .user-icon {
//             font-size: 40px;
//           }

//           .user-title {
//             font-size: 22px;
//           }

//           .user-quote {
//             font-size: 14px;
//           }

//           .right-section {
//             padding: 30px 20px;
//           }

//           .progress-steps {
//             margin-bottom: 30px;
//           }

//           .step-circle {
//             width: 35px;
//             height: 35px;
//             font-size: 14px;
//           }

//           .step-label {
//             font-size: 10px;
//           }

//           .form-navigation {
//             flex-direction: column;
//             gap: 15px;
//           }

//           .nav-btn {
//             width: 100%;
//           }
//         }

//         @media (max-width: 480px) {
//           .left-section {
//             padding: 20px 15px;
//             min-height: 250px;
//           }

//           .right-section {
//             padding: 20px 15px;
//           }

//           .app-title {
//             font-size: 28px;
//           }

//           .signup-title {
//             font-size: 20px;
//           }
          
//           .progress-steps::before {
//             left: 12%;
//             right: 12%;
//           }
          
//           .step-label {
//             font-size: 9px;
//             max-width: 60px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default BaseSignup;




// // BaseSignup.js - Integrated Version with Duplicate Validation and Profile Integration
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// const API_BASE_URL = "http://127.0.0.1:8000/api";

// // Create a simple ProfileContext if it doesn't exist yet
// const createProfileContext = () => {
//   const defaultProfile = {
//     fullName: '',
//     email: '',
//     phone: '',
//     address: '',
//     city: '',
//     state: '',
//     pincode: '',
//     country: 'India',
//     dateOfBirth: '',
//     age: '',
//     gender: '',
//     profilePhoto: '',
//     userType: 'user',
//     linkedAccounts: [],
//     lastUpdated: '',
//     bloodGroup: 'Not specified',
//     emergencyContact: '',
//     healthMetrics: {
//       height: '',
//       weight: '',
//       bmi: '',
//       bloodPressure: '',
//       lastCheckup: ''
//     },
//     medicalHistory: {
//       conditions: [],
//       allergies: [],
//       medications: [],
//       surgeries: []
//     },
//     insurance: {
//       provider: '',
//       policyNumber: '',
//       validity: ''
//     },
//     isActive: true,
//     createdAt: ''
//   };

//   // Helper function to calculate age
//   const calculateAge = (birthDate) => {
//     if (!birthDate) return '';
//     const today = new Date();
//     const birth = new Date(birthDate);
//     let age = today.getFullYear() - birth.getFullYear();
//     const monthDiff = today.getMonth() - birth.getMonth();
    
//     if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
//       age--;
//     }
//     return age > 0 ? age.toString() : "0";
//   };

//   // Parse address into components
//   const parseAddress = (address) => {
//     if (!address) return { city: '', state: '', pincode: '' };
    
//     let city = '';
//     let state = '';
//     let pincode = '';
    
//     const addressParts = address.split(',');
    
//     // Look for pincode (6-digit number)
//     for (let i = addressParts.length - 1; i >= 0; i--) {
//       const part = addressParts[i].trim();
//       if (/^\d{6}$/.test(part)) {
//         pincode = part;
//         if (i > 0) {
//           city = addressParts[i - 1].trim();
//         }
//         if (i > 1) {
//           state = addressParts[i - 2].trim();
//         }
//         break;
//       }
//     }
    
//     // If no pincode found, take last 3 parts
//     if (!pincode && addressParts.length >= 3) {
//       pincode = addressParts[addressParts.length - 1].trim();
//       city = addressParts[addressParts.length - 2].trim();
//       state = addressParts[addressParts.length - 3].trim();
//     }
    
//     return { city, state, pincode };
//   };

//   return {
//     // Function to set profile from signup data
//     setProfileFromSignup: (signupData) => {
//       console.log('Setting profile from signup data:', signupData);
      
//       const address = signupData.address || signupData.deliveryAddress || '';
//       const { city, state, pincode } = parseAddress(address);
      
//       const newProfile = {
//         ...defaultProfile,
//         fullName: signupData.fullName || '',
//         email: signupData.email || '',
//         phone: signupData.phone || '',
//         address: address,
//         city: signupData.city || city || '',
//         state: signupData.state || state || '',
//         pincode: signupData.pincode || pincode || '',
//         country: signupData.country || 'India',
//         dateOfBirth: signupData.dateOfBirth || '',
//         age: signupData.age || calculateAge(signupData.dateOfBirth) || '',
//         gender: signupData.gender || '',
//         profilePhoto: signupData.profilePhoto || '',
//         userType: signupData.userType || 'user',
//         linkedAccounts: signupData.linkedAccounts || [],
//         emergencyContact: signupData.emergencyContact || '',
//         isActive: true,
//         createdAt: new Date().toISOString(),
//         lastUpdated: new Date().toISOString(),
//         bloodGroup: signupData.bloodGroup || defaultProfile.bloodGroup
//       };
      
//       console.log('New profile created from signup:', newProfile);
      
//       // Save to localStorage
//       localStorage.setItem('userProfile', JSON.stringify(newProfile));
      
//       if (signupData.phone) {
//         localStorage.setItem(`userProfile_${signupData.phone}`, JSON.stringify(newProfile));
//       }
      
//       return newProfile;
//     },
    
//     // Function to get current profile
//     getProfile: () => {
//       try {
//         const saved = localStorage.getItem('userProfile');
//         return saved ? JSON.parse(saved) : defaultProfile;
//       } catch (error) {
//         console.error('Error getting profile:', error);
//         return defaultProfile;
//       }
//     },
    
//     // Function to update profile
//     updateProfile: (profileData) => {
//       try {
//         const currentProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
//         const updatedProfile = {
//           ...defaultProfile,
//           ...currentProfile,
//           ...profileData,
//           lastUpdated: new Date().toISOString()
//         };
        
//         localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
//         return updatedProfile;
//       } catch (error) {
//         console.error('Error updating profile:', error);
//         return defaultProfile;
//       }
//     },
    
//     // Helper function to calculate age (export for use in component)
//     calculateAge
//   };
// };

// // Initialize profile context
// const profileContext = createProfileContext();

// const BaseSignup = ({ userType, userDetails, onSignupSuccess }) => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: '',
//     dateOfBirth: '', // Added for patient/user
//     gender: '', // Added for patient/user
//     deliveryAddress: '', // Added for patient/user
//     emergencyContact: '', // Added for patient/user
//     ...userDetails.extraFields
//   });
//   const [errors, setErrors] = useState({});
//   const [showToast, setShowToast] = useState(false);
//   const [toastMessage, setToastMessage] = useState('');
//   const [toastType, setToastType] = useState('success');
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [currentStep, setCurrentStep] = useState(1);
//   const [acceptedTerms, setAcceptedTerms] = useState(false);
//   const [passwordStrength, setPasswordStrength] = useState({
//     score: 0,
//     message: 'Very Weak',
//     color: '#f44336'
//   });

//   // Calculate total steps based on userDetails
//   const totalSteps = userDetails.hasExtraStep ? 4 : 3;

//   // Helper function to calculate age from date of birth
//   const calculateAge = (birthDate) => {
//     if (!birthDate) return '';
//     const today = new Date();
//     const birth = new Date(birthDate);
//     let age = today.getFullYear() - birth.getFullYear();
//     const monthDiff = today.getMonth() - birth.getMonth();
    
//     if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
//       age--;
//     }
//     return age > 0 ? age.toString() : "0";
//   };

//   // Function to check for existing users (email and phone)
//   const checkExistingUsers = (email, phone, emergencyContact = '') => {
//     const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
//     const errors = {};
    
//     // Check for existing email
//     const emailExists = registeredUsers.find(user => 
//       user.email.toLowerCase() === email.toLowerCase()
//     );
    
//     if (emailExists) {
//       errors.email = `Email already registered as ${emailExists.userType}.`;
//     }
    
//     // Check for existing phone number (normalize by removing non-digits)
//     const phoneDigits = phone.replace(/\D/g, '');
//     const phoneExists = registeredUsers.find(user => {
//       const userPhoneDigits = user.phone.replace(/\D/g, '');
//       return userPhoneDigits === phoneDigits && phoneDigits.length > 0;
//     });
    
//     if (phoneExists) {
//       errors.phone = `Mobile number already registered as ${phoneExists.userType}.`;
//     }
    
//     // Check for existing emergency contact (for patient/user)
//     if (emergencyContact) {
//       const emergencyDigits = emergencyContact.replace(/\D/g, '');
//       const emergencyExists = registeredUsers.find(user => {
//         const userPhoneDigits = user.phone.replace(/\D/g, '');
//         const userEmergencyDigits = user.emergencyContact ? user.emergencyContact.replace(/\D/g, '') : '';
//         return (userPhoneDigits === emergencyDigits || userEmergencyDigits === emergencyDigits) && emergencyDigits.length > 0;
//       });
      
//       if (emergencyExists) {
//         errors.emergencyContact = `Emergency contact already registered as ${emergencyExists.userType}.`;
//       }
      
//       // Check if emergency contact is same as primary phone
//       if (phoneDigits === emergencyDigits) {
//         errors.emergencyContact = 'Emergency contact cannot be the same as your primary phone number';
//       }
//     }
    
//     return errors;
//   };

//   // Enhanced validation functions for different user types
//   const validateGSTNumber = (gstNumber) => {
//     if (!gstNumber.trim()) {
//       return { isValid: false, message: 'GST number is required' };
//     }
    
//     // GST number format validation (15 characters, alphanumeric)
//     const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
//     const isValid = gstRegex.test(gstNumber.toUpperCase());
    
//     if (!isValid) {
//       return { isValid: false, message: 'Please enter a valid 15-digit GST number (format: 22AAAAA0000A1Z5)' };
//     }
    
//     return { isValid: true, message: '' };
//   };

//   const validateBusinessLicense = (licenseNumber) => {
//     if (!licenseNumber.trim()) {
//       return { isValid: false, message: 'Business license number is required' };
//     }
    
//     // Business license format: at least 8 characters, alphanumeric
//     const licenseRegex = /^[A-Z0-9]{8,20}$/;
//     const isValid = licenseRegex.test(licenseNumber.toUpperCase());
    
//     if (!isValid) {
//       return { isValid: false, message: 'Please enter a valid business license number (8-20 alphanumeric characters)' };
//     }
    
//     return { isValid: true, message: '' };
//   };

//   const validateVehicleRegistration = (vehicleNumber) => {
//     if (!vehicleNumber.trim()) {
//       return { isValid: false, message: 'Vehicle registration number is required' };
//     }
    
//     // Indian vehicle registration number format: MH-12-AB-1234 or KA-01-AB-1234
//     const vehicleRegex = /^[A-Z]{2}\s?[0-9]{2}\s?[A-Z]{1,2}\s?[0-9]{4}$/;
//     const isValid = vehicleRegex.test(vehicleNumber.toUpperCase().replace(/\s/g, ''));
    
//     if (!isValid) {
//       return { isValid: false, message: 'Please enter a valid vehicle registration number (format: MH-12-AB-1234)' };
//     }
    
//     return { isValid: true, message: '' };
//   };

//   const validateIdProofNumber = (idNumber) => {
//     if (!idNumber.trim()) {
//       return { isValid: false, message: 'ID proof number is required' };
//     }
    
//     // Accept Aadhaar (12 digits), PAN (10 alphanumeric), or Driving License (varies)
//     const aadhaarRegex = /^[2-9]{1}[0-9]{3}\s?[0-9]{4}\s?[0-9]{4}$/;
//     const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
//     const dlRegex = /^[A-Z]{2}[0-9]{2}\s?[0-9]{11}$/;
    
//     const isValid = aadhaarRegex.test(idNumber) || panRegex.test(idNumber.toUpperCase()) || dlRegex.test(idNumber.toUpperCase());
    
//     if (!isValid) {
//       return { isValid: false, message: 'Please enter a valid Aadhaar (12 digits), PAN (10 characters), or Driving License number' };
//     }
    
//     return { isValid: true, message: '' };
//   };

//   const validateMedicalLicense = (licenseNumber) => {
//     if (!licenseNumber.trim()) {
//       return { isValid: false, message: 'Medical license number is required' };
//     }
    
//     // Medical license format: MCI-12345 or state-specific format
//     const mciRegex = /^MCI\/[0-9]{5,10}$/;
//     const stateRegex = /^[A-Z]{2}\/[A-Z]{3}\/[0-9]{5,8}$/;
    
//     const isValid = mciRegex.test(licenseNumber.toUpperCase()) || stateRegex.test(licenseNumber.toUpperCase());
    
//     if (!isValid) {
//       return { isValid: false, message: 'Please enter a valid medical license number (format: MCI/12345 or State/Specialty/12345)' };
//     }
    
//     return { isValid: true, message: '' };
//   };

//   const validateYearsOfExperience = (years) => {
//     if (!years.trim()) {
//       return { isValid: false, message: 'Years of experience is required' };
//     }
    
//     const yearsNum = parseInt(years, 10);
//     if (isNaN(yearsNum) || yearsNum < 0 || yearsNum > 60) {
//       return { isValid: false, message: 'Please enter valid years of experience (0-60)' };
//     }
    
//     return { isValid: true, message: '' };
//   };

//   const validateConsultationFee = (fee) => {
//     if (!fee.trim()) {
//       return { isValid: false, message: 'Consultation fee is required' };
//     }
    
//     const feeNum = parseFloat(fee);
//     if (isNaN(feeNum) || feeNum < 0 || feeNum > 10000) {
//       return { isValid: false, message: 'Please enter valid consultation fee (0-10000)' };
//     }
    
//     return { isValid: true, message: '' };
//   };

//   // Date of Birth validation
//   const validateDateOfBirth = (date) => {
//     if (!date.trim()) {
//       return { isValid: false, message: 'Date of birth is required' };
//     }
    
//     const dob = new Date(date);
//     const today = new Date();
    
//     // Check if date is in the future
//     if (dob > today) {
//       return { isValid: false, message: 'Date of birth cannot be in the future' };
//     }
    
//     // Check if user is at least 1 year old
//     const age = calculateAge(date);
//     if (parseInt(age) < 1) {
//       return { isValid: false, message: 'You must be at least 1 year old' };
//     }
    
//     // Check if user is not older than 150 years
//     if (parseInt(age) > 150) {
//       return { isValid: false, message: 'Please enter a valid date of birth' };
//     }
    
//     return { isValid: true, message: '' };
//   };

//   // Emergency contact validation
//   const validateEmergencyContact = (contact) => {
//     if (!contact.trim()) {
//       return { isValid: false, message: 'Emergency contact is required' };
//     }
    
//     // Remove all non-digits
//     const digits = contact.replace(/\D/g, '');
    
//     // Must be exactly 10 digits and start with 6,7,8,9
//     const isValid = /^[6-9]\d{9}$/.test(digits);
    
//     if (!isValid) {
//       return { isValid: false, message: 'Please enter a valid 10-digit Indian mobile number starting with 6,7,8,9' };
//     }
    
//     return { isValid: true, message: '' };
//   };

//   // Enhanced Password strength checker with stronger requirements
//   const checkPasswordStrength = (password) => {
//     let score = 0;
//     const requirements = {
//       length: false,
//       uppercase: false,
//       lowercase: false,
//       number: false,
//       special: false,
//       noCommon: true
//     };
    
//     // Check length (minimum 12 characters for strong password)
//     if (password.length >= 8) {
//       score += 0.5;
//       if (password.length >= 12) {
//         score += 1;
//         requirements.length = true;
//       }
//     }
    
//     // Check for uppercase letters
//     if (/[A-Z]/.test(password)) {
//       score += 1;
//       requirements.uppercase = true;
//     }
    
//     // Check for lowercase letters
//     if (/[a-z]/.test(password)) {
//       score += 1;
//       requirements.lowercase = true;
//     }
    
//     // Check for numbers
//     if (/[0-9]/.test(password)) {
//       score += 1;
//       requirements.number = true;
//     }
    
//     // Check for special characters
//     if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
//       score += 1;
//       requirements.special = true;
//     }
    
//     // Check for common passwords
//     const commonPasswords = [
//       'password', '12345678', 'qwerty123', 'admin123', 'welcome123',
//       'letmein', 'monkey', 'dragon', 'baseball', 'football',
//       'password123', 'admin', '123456789', '1234567890'
//     ];
    
//     if (commonPasswords.includes(password.toLowerCase())) {
//       score = 0;
//       requirements.noCommon = false;
//     }
    
//     // Check for sequential characters
//     if (/(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789|890)/i.test(password)) {
//       score -= 1;
//     }
    
//     // Determine strength level with stricter criteria
//     let message, color;
//     if (score >= 4.5 && requirements.length && requirements.uppercase && 
//         requirements.lowercase && requirements.number && requirements.special && requirements.noCommon) {
//       message = 'Very Strong';
//       color = '#4CAF50'; // Green
//     } else if (score >= 3.5 && requirements.length && requirements.uppercase && 
//                requirements.lowercase && requirements.number) {
//       message = 'Strong';
//       color = '#8BC34A'; // Light Green
//     } else if (score >= 2.5 && requirements.length) {
//       message = 'Good';
//       color = '#FFC107'; // Yellow
//     } else if (score >= 1.5) {
//       message = 'Fair';
//       color = '#FF9800'; // Orange
//     } else {
//       message = 'Weak';
//       color = '#f44336'; // Red
//     }
    
//     if (password.length === 0) {
//       message = 'Enter a password';
//       score = 0;
//       color = '#9e9e9e';
//     }
    
//     return { score, message, color, requirements };
//   };

//   // Real-time email validation
//   const validateEmail = (email) => {
//     if (!email.trim()) {
//       return { isValid: false, message: 'Email is required' };
//     }
    
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const isValid = emailRegex.test(email);
    
//     if (!isValid) {
//       return { isValid: false, message: 'Please enter a valid email address' };
//     }
    
//     return { isValid: true, message: '' };
//   };

//   // Enhanced password validation
//   const validatePassword = (password) => {
//     if (!password) {
//       return { isValid: false, message: 'Password is required' };
//     }
    
//     if (password.length < 12) {
//       return { isValid: false, message: 'Password must be at least 12 characters long' };
//     }
    
//     if (!/[A-Z]/.test(password)) {
//       return { isValid: false, message: 'Password must contain at least one uppercase letter' };
//     }
    
//     if (!/[a-z]/.test(password)) {
//       return { isValid: false, message: 'Password must contain at least one lowercase letter' };
//     }
    
//     if (!/[0-9]/.test(password)) {
//       return { isValid: false, message: 'Password must contain at least one number' };
//     }
    
//     if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
//       return { isValid: false, message: 'Password must contain at least one special character' };
//     }
    
//     // Check for common passwords
//     const commonPasswords = [
//       'password', '12345678', 'qwerty123', 'admin123', 'welcome123',
//       'letmein', 'monkey', 'dragon', 'baseball', 'football',
//       'password123', 'admin', '123456789', '1234567890'
//     ];
    
//     if (commonPasswords.includes(password.toLowerCase())) {
//       return { isValid: false, message: 'This password is too common. Please choose a stronger password' };
//     }
    
//     // Check for sequential characters
//     if (/(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789|890)/i.test(password)) {
//       return { isValid: false, message: 'Avoid sequential characters in your password' };
//     }
    
//     return { isValid: true, message: '' };
//   };

//   // User type specific validation
//   const validateUserTypeFields = () => {
//     const newErrors = {};
    
//     if (userType === 'vendor') {
//       const gstValidation = validateGSTNumber(formData.gstNumber || '');
//       if (!gstValidation.isValid) {
//         newErrors.gstNumber = gstValidation.message;
//       }
      
//       const licenseValidation = validateBusinessLicense(formData.businessLicense || '');
//       if (!licenseValidation.isValid) {
//         newErrors.businessLicense = licenseValidation.message;
//       }
//     }
    
//     if (userType === 'delivery') {
//       const vehicleValidation = validateVehicleRegistration(formData.vehicleNumber || '');
//       if (!vehicleValidation.isValid) {
//         newErrors.vehicleNumber = vehicleValidation.message;
//       }
      
//       const idProofValidation = validateIdProofNumber(formData.idProofNumber || '');
//       if (!idProofValidation.isValid) {
//         newErrors.idProofNumber = idProofValidation.message;
//       }
//     }
    
//     if (userType === 'doctor') {
//       const medicalLicenseValidation = validateMedicalLicense(formData.medicalLicense || '');
//       if (!medicalLicenseValidation.isValid) {
//         newErrors.medicalLicense = medicalLicenseValidation.message;
//       }
      
//       const experienceValidation = validateYearsOfExperience(formData.yearsOfExperience || '');
//       if (!experienceValidation.isValid) {
//         newErrors.yearsOfExperience = experienceValidation.message;
//       }
      
//       const feeValidation = validateConsultationFee(formData.consultationFee || '');
//       if (!feeValidation.isValid) {
//         newErrors.consultationFee = feeValidation.message;
//       }
//     }
    
//     // Patient/User specific validations
//     if (userType === 'user' || userType === 'patient') {
//       const dobValidation = validateDateOfBirth(formData.dateOfBirth || '');
//       if (!dobValidation.isValid) {
//         newErrors.dateOfBirth = dobValidation.message;
//       }
      
//       if (!formData.gender) {
//         newErrors.gender = 'Gender is required';
//       }
      
//       if (!formData.deliveryAddress) {
//         newErrors.deliveryAddress = 'Delivery address is required';
//       }
      
//       const emergencyValidation = validateEmergencyContact(formData.emergencyContact || '');
//       if (!emergencyValidation.isValid) {
//         newErrors.emergencyContact = emergencyValidation.message;
//       }
//     }
    
//     return newErrors;
//   };

//   // Form validation
//   const validateForm = () => {
//     const newErrors = {};
    
//     // Full name validation - only alphabets and spaces
//     if (!formData.fullName.trim()) {
//       newErrors.fullName = 'Full name is required';
//     } else if (!/^[A-Za-z\s]+$/.test(formData.fullName.trim())) {
//       newErrors.fullName = 'Full name should contain only alphabets and spaces';
//     }
    
//     // Email validation
//     const emailValidation = validateEmail(formData.email);
//     if (!emailValidation.isValid) {
//       newErrors.email = emailValidation.message;
//     }
    
//     // Phone number validation - Indian mobile numbers starting with 6,7,8,9
//     if (!formData.phone.trim()) {
//       newErrors.phone = 'Phone number is required';
//     } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ''))) {
//       newErrors.phone = 'Please enter a valid 10-digit Indian mobile number starting with 6,7,8,9';
//     }
    
//     // Check for existing users (email and phone)
//     if (formData.email.trim() && formData.phone.trim()) {
//       const duplicateErrors = checkExistingUsers(formData.email, formData.phone, formData.emergencyContact);
//       Object.assign(newErrors, duplicateErrors);
//     }
    
//     // Enhanced password validation
//     const passwordValidation = validatePassword(formData.password);
//     if (!passwordValidation.isValid) {
//       newErrors.password = passwordValidation.message;
//     }
    
//     // Confirm password validation
//     if (!formData.confirmPassword) {
//       newErrors.confirmPassword = 'Please confirm your password';
//     } else if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }
    
//     // User type specific validations
//     const userTypeErrors = validateUserTypeFields();
//     Object.assign(newErrors, userTypeErrors);
    
//     // Custom field validations
//     if (userDetails.extraFields) {
//       Object.keys(userDetails.extraFields).forEach(field => {
//         if (!formData[field] && userDetails.fieldValidations?.[field]?.required) {
//           newErrors[field] = userDetails.fieldValidations[field].message;
//         }
//       });
//     }
    
//     return newErrors;
//   };

//   // Update password strength when password changes
//   useEffect(() => {
//     const strength = checkPasswordStrength(formData.password);
//     setPasswordStrength(strength);
//   }, [formData.password]);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
    
//     // Full name - only allow alphabets and spaces
//     if (name === 'fullName') {
//       const filteredValue = value.replace(/[^A-Za-z\s]/g, '');
//       setFormData(prev => ({
//         ...prev,
//         [name]: filteredValue
//       }));
      
//       // Clear error for this field
//       if (errors.fullName) {
//         setErrors(prev => ({ ...prev, fullName: '' }));
//       }
//     } 
//     // Email - real-time validation and duplicate check
//     else if (name === 'email') {
//       setFormData(prev => ({
//         ...prev,
//         [name]: value
//       }));
      
//       const validation = validateEmail(value);
//       if (!validation.isValid && value.trim()) {
//         setErrors(prev => ({ ...prev, email: validation.message }));
//       } else if (value.trim()) {
//         // Check for duplicate email in real-time
//         const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
//         const emailExists = registeredUsers.find(user => 
//           user.email.toLowerCase() === value.toLowerCase()
//         );
        
//         if (emailExists) {
//           setErrors(prev => ({ ...prev, email: `Email already registered as ${emailExists.userType}.` }));
//         } else {
//           setErrors(prev => ({ ...prev, email: '' }));
//         }
//       } else {
//         setErrors(prev => ({ ...prev, email: '' }));
//       }
//     }
//     // Phone number - format, validate and duplicate check
//     else if (name === 'phone') {
//       // Remove all non-digits
//       let digits = value.replace(/\D/g, '');
      
//       // Only allow numbers starting with 6,7,8,9
//       if (digits.length > 0) {
//         const firstDigit = digits[0];
//         if (!['6', '7', '8', '9'].includes(firstDigit)) {
//           return;
//         }
//       }
      
//       // Limit to 10 digits
//       if (digits.length > 10) {
//         digits = digits.substring(0, 10);
//       }
      
//       setFormData(prev => ({
//         ...prev,
//         [name]: digits
//       }));
      
//       // Check for duplicate phone in real-time
//       if (digits.length === 10) {
//         const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
//         const phoneExists = registeredUsers.find(user => {
//           const userPhoneDigits = user.phone.replace(/\D/g, '');
//           return userPhoneDigits === digits;
//         });
        
//         if (phoneExists) {
//           setErrors(prev => ({ ...prev, phone: `Mobile number already registered as ${phoneExists.userType}.` }));
//         } else {
//           setErrors(prev => ({ ...prev, phone: '' }));
//         }
//       } else {
//         setErrors(prev => ({ ...prev, phone: '' }));
//       }
//     }
//     // Password - real-time strength check
//     else if (name === 'password') {
//       setFormData(prev => ({
//         ...prev,
//         [name]: value
//       }));
      
//       if (value === formData.confirmPassword && errors.confirmPassword) {
//         setErrors(prev => ({ ...prev, confirmPassword: '' }));
//       }
      
//       const strength = checkPasswordStrength(value);
//       setPasswordStrength(strength);
      
//       // Clear error for this field
//       if (errors.password) {
//         setErrors(prev => ({ ...prev, password: '' }));
//       }
//     }
//     // Confirm password - real-time matching check
//     else if (name === 'confirmPassword') {
//       setFormData(prev => ({
//         ...prev,
//         [name]: value
//       }));
      
//       if (value && value !== formData.password) {
//         setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
//       } else if (errors.confirmPassword) {
//         setErrors(prev => ({ ...prev, confirmPassword: '' }));
//       }
//     }
//     // Emergency contact - same validation as phone with duplicate check
//     else if (name === 'emergencyContact') {
//       let digits = value.replace(/\D/g, '');
      
//       if (digits.length > 0) {
//         const firstDigit = digits[0];
//         if (!['6', '7', '8', '9'].includes(firstDigit)) {
//           return;
//         }
//       }
      
//       if (digits.length > 10) {
//         digits = digits.substring(0, 10);
//       }
      
//       setFormData(prev => ({
//         ...prev,
//         [name]: digits
//       }));
      
//       const validation = validateEmergencyContact(digits);
//       if (!validation.isValid) {
//         setErrors(prev => ({ ...prev, emergencyContact: validation.message }));
//       } else if (digits.length === 10) {
//         // Check for duplicate emergency contact in real-time
//         const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
//         const emergencyExists = registeredUsers.find(user => {
//           const userPhoneDigits = user.phone.replace(/\D/g, '');
//           const userEmergencyDigits = user.emergencyContact ? user.emergencyContact.replace(/\D/g, '') : '';
//           return userPhoneDigits === digits || userEmergencyDigits === digits;
//         });
        
//         // Check if emergency contact is same as primary phone
//         const primaryPhone = formData.phone.replace(/\D/g, '');
//         if (digits === primaryPhone) {
//           setErrors(prev => ({ ...prev, emergencyContact: 'Emergency contact cannot be the same as your primary phone number' }));
//         } else if (emergencyExists) {
//           setErrors(prev => ({ ...prev, emergencyContact: `Emergency contact already registered as ${emergencyExists.userType}.` }));
//         } else {
//           setErrors(prev => ({ ...prev, emergencyContact: '' }));
//         }
//       } else {
//         setErrors(prev => ({ ...prev, emergencyContact: '' }));
//       }
//     }
//     // Date of Birth - validate date
//     else if (name === 'dateOfBirth') {
//       setFormData(prev => ({
//         ...prev,
//         [name]: value
//       }));
      
//       if (value) {
//         const validation = validateDateOfBirth(value);
//         if (!validation.isValid) {
//           setErrors(prev => ({ ...prev, dateOfBirth: validation.message }));
//         } else {
//           setErrors(prev => ({ ...prev, dateOfBirth: '' }));
//         }
//       }
//     }
//     // Vendor specific fields
//     else if (name === 'gstNumber') {
//       setFormData(prev => ({
//         ...prev,
//         [name]: value.toUpperCase()
//       }));
      
//       const validation = validateGSTNumber(value);
//       if (!validation.isValid && value.trim()) {
//         setErrors(prev => ({ ...prev, gstNumber: validation.message }));
//       } else {
//         setErrors(prev => ({ ...prev, gstNumber: '' }));
//       }
//     }
//     else if (name === 'businessLicense') {
//       setFormData(prev => ({
//         ...prev,
//         [name]: value.toUpperCase()
//       }));
      
//       const validation = validateBusinessLicense(value);
//       if (!validation.isValid && value.trim()) {
//         setErrors(prev => ({ ...prev, businessLicense: validation.message }));
//       } else {
//         setErrors(prev => ({ ...prev, businessLicense: '' }));
//       }
//     }
//     // Delivery specific fields
//     else if (name === 'vehicleNumber') {
//       setFormData(prev => ({
//         ...prev,
//         [name]: value.toUpperCase()
//       }));
      
//       const validation = validateVehicleRegistration(value);
//       if (!validation.isValid && value.trim()) {
//         setErrors(prev => ({ ...prev, vehicleNumber: validation.message }));
//       } else {
//         setErrors(prev => ({ ...prev, vehicleNumber: '' }));
//       }
//     }
//     else if (name === 'idProofNumber') {
//       setFormData(prev => ({
//         ...prev,
//         [name]: value.toUpperCase()
//       }));
      
//       const validation = validateIdProofNumber(value);
//       if (!validation.isValid && value.trim()) {
//         setErrors(prev => ({ ...prev, idProofNumber: validation.message }));
//       } else {
//         setErrors(prev => ({ ...prev, idProofNumber: '' }));
//       }
//     }
//     // Doctor specific fields
//     else if (name === 'medicalLicense') {
//       setFormData(prev => ({
//         ...prev,
//         [name]: value.toUpperCase()
//       }));
      
//       const validation = validateMedicalLicense(value);
//       if (!validation.isValid && value.trim()) {
//         setErrors(prev => ({ ...prev, medicalLicense: validation.message }));
//       } else {
//         setErrors(prev => ({ ...prev, medicalLicense: '' }));
//       }
//     }
//     else if (name === 'yearsOfExperience') {
//       // Only allow numbers, prevent negative values
//       const numValue = value.replace(/[^0-9]/g, '');
//       const limitedValue = numValue.length > 2 ? numValue.substring(0, 2) : numValue;
      
//       setFormData(prev => ({
//         ...prev,
//         [name]: limitedValue
//       }));
      
//       const validation = validateYearsOfExperience(limitedValue);
//       if (!validation.isValid && limitedValue.trim()) {
//         setErrors(prev => ({ ...prev, yearsOfExperience: validation.message }));
//       } else {
//         setErrors(prev => ({ ...prev, yearsOfExperience: '' }));
//       }
//     }
//     else if (name === 'consultationFee') {
//       // Only allow numbers and decimal point, prevent negative values
//       const numValue = value.replace(/[^0-9.]/g, '');
//       // Remove multiple decimal points
//       const parts = numValue.split('.');
//       const sanitizedValue = parts[0] + (parts.length > 1 ? '.' + parts.slice(1).join('') : '');
      
//       setFormData(prev => ({
//         ...prev,
//         [name]: sanitizedValue
//       }));
      
//       const validation = validateConsultationFee(sanitizedValue);
//       if (!validation.isValid && sanitizedValue.trim()) {
//         setErrors(prev => ({ ...prev, consultationFee: validation.message }));
//       } else {
//         setErrors(prev => ({ ...prev, consultationFee: '' }));
//       }
//     }
//     // For other fields (gender, deliveryAddress, etc.)
//     else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: type === 'checkbox' ? checked : value
//       }));
      
//       // Clear error for this field when user starts typing
//       if (errors[name]) {
//         setErrors(prev => ({ ...prev, [name]: '' }));
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (currentStep < totalSteps) {
//       nextStep();
//       return;
//     }
    
//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       showToastMessage('Please fix the errors in the form', 'error');
//       return;
//     }
    
//     if (!acceptedTerms) {
//       showToastMessage('Please accept the terms and conditions', 'error');
//       return;
//     }
    
//     setIsLoading(true);
    
//     try {
//       const payload = {
//   fullName: formData.fullName,
//   email: formData.email,
//   phone: formData.phone,
//   password: formData.password,
//   userType: userType,

//   dateOfBirth: formData.dateOfBirth || null,
//   gender: formData.gender || "",
//   deliveryAddress: formData.deliveryAddress || "",
//   emergencyContact: formData.emergencyContact || "",

//   gstNumber: formData.gstNumber || "",
//   businessLicense: formData.businessLicense || "",
//   pharmacyName: formData.pharmacyName || "",

//   vehicleNumber: formData.vehicleNumber || "",
//   vehicleType: formData.vehicleType || "",
//   idProofNumber: formData.idProofNumber || "",
//   idProofType: formData.idProofType || "",

//   medicalLicense: formData.medicalLicense || "",
//   specialization: formData.specialization || "",
//   yearsOfExperience: formData.yearsOfExperience || null,
//   consultationFee: formData.consultationFee || null,
//   clinicAddress: formData.clinicAddress || "",
// };


// const response = await fetch(`${API_BASE_URL}/signup/`, {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(payload),
// });

// const data = await response.json();

// if (!response.ok) {
//   showToastMessage(data.message || "Signup failed", "error");
//   setIsLoading(false);
//   return;
// }

// showToastMessage("Signup successful! Redirecting to login...", "success");

// setTimeout(() => {
//   navigate(`/login/${userType}`, {
//     state: {
//       signupSuccess: true,
//       registeredEmail: formData.email,
//     },
//   });
// }, 1500);

    
      
//     } catch (error) {
//       console.error('Signup error:', error);
//       showToastMessage('Registration failed. Please try again.', 'error');
//       setIsLoading(false);
//     }
//   };

//   const showToastMessage = (message, type) => {
//     setToastMessage(message);
//     setToastType(type);
//     setShowToast(true);
//     setTimeout(() => setShowToast(false), 3000);
//   };

//   const handleBackToLogin = () => {
//     navigate(`/login/${userType}`);
//   };

//   const handleBackToSelection = () => {
//     navigate('/login');
//   };

//   const handleBackToHome = () => {
//     navigate('/');
//   };

//   // Step navigation with validation
//   const nextStep = () => {
//     if (currentStep === 1) {
//       const step1Fields = ['fullName', 'email', 'phone'];
//       const step1Errors = {};
//       let hasErrors = false;
      
//       step1Fields.forEach(field => {
//         if (!formData[field]) {
//           step1Errors[field] = 'This field is required';
//           hasErrors = true;
//         }
//       });
      
//       const emailValidation = validateEmail(formData.email);
//       if (!emailValidation.isValid) {
//         step1Errors.email = emailValidation.message;
//         hasErrors = true;
//       }
      
//       if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ''))) {
//         step1Errors.phone = 'Please enter a valid 10-digit Indian mobile number starting with 6,7,8,9';
//         hasErrors = true;
//       }
      
//       // Check for existing users when moving to next step
//       if (formData.email.trim() && formData.phone.trim()) {
//         const duplicateErrors = checkExistingUsers(formData.email, formData.phone);
//         Object.assign(step1Errors, duplicateErrors);
//         if (Object.keys(duplicateErrors).length > 0) {
//           hasErrors = true;
//         }
//       }
      
//       if (hasErrors) {
//         setErrors(step1Errors);
//         showToastMessage('Please fix the errors before proceeding', 'error');
//         return;
//       }
//     }
    
//     if (currentStep === 2) {
//       const step2Errors = {};
//       let hasErrors = false;
      
//       const passwordValidation = validatePassword(formData.password);
//       if (!passwordValidation.isValid) {
//         step2Errors.password = passwordValidation.message;
//         hasErrors = true;
//       }
      
//       if (!formData.confirmPassword) {
//         step2Errors.confirmPassword = 'Please confirm your password';
//         hasErrors = true;
//       } else if (formData.password !== formData.confirmPassword) {
//         step2Errors.confirmPassword = 'Passwords do not match';
//         hasErrors = true;
//       }
      
//       if (hasErrors) {
//         setErrors(step2Errors);
//         showToastMessage('Please fix the password errors before proceeding', 'error');
//         return;
//       }
//     }
    
//     setCurrentStep(prev => prev + 1);
//   };

//   const prevStep = () => {
//     setCurrentStep(prev => prev - 1);
//   };

//   // Custom Eye Icon Components
//   const EyeIcon = () => (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#009688" strokeWidth="2">
//       <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
//       <circle cx="12" cy="12" r="3"></circle>
//     </svg>
//   );

//   const EyeOffIcon = () => (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#009688" strokeWidth="2">
//       <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
//       <line x1="1" y1="1" x2="23" y2="23"></line>
//     </svg>
//   );

//   // Get maximum date for date picker (today)
//   const getMaxDate = () => {
//     const today = new Date();
//     const year = today.getFullYear();
//     const month = String(today.getMonth() + 1).padStart(2, '0');
//     const day = String(today.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

//   // Get minimum date for date picker (150 years ago)
//   const getMinDate = () => {
//     const today = new Date();
//     const year = today.getFullYear() - 150;
//     const month = String(today.getMonth() + 1).padStart(2, '0');
//     const day = String(today.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

//   // Password strength indicator component
//   const PasswordStrengthIndicator = () => {
//     const segments = [];
//     const totalSegments = 6;
    
//     for (let i = 0; i < totalSegments; i++) {
//       const isActive = i <= Math.floor(passwordStrength.score);
//       segments.push(
//         <div 
//           key={i}
//           className="strength-segment"
//           style={{
//             backgroundColor: isActive ? passwordStrength.color : '#e0e0e0',
//             width: '100%',
//             height: '4px',
//             borderRadius: '2px',
//             transition: 'all 0.3s ease'
//           }}
//         />
//       );
//     }
    
//     return (
//       <div className="strength-indicator">
//         <div className="strength-bar" style={{ display: 'flex', gap: '4px', marginTop: '5px' }}>
//           {segments}
//         </div>
//         <div 
//           className="strength-text"
//           style={{ 
//             color: passwordStrength.color,
//             fontSize: '12px',
//             marginTop: '5px',
//             fontWeight: 'bold'
//           }}
//         >
//           {passwordStrength.message}
//         </div>
//       </div>
//     );
//   };

//   // Password requirements checklist
//   const PasswordRequirements = () => {
//     const requirements = passwordStrength.requirements || {};
    
//     const requirementChecks = [
//       { key: 'length', label: 'At least 12 characters long', met: requirements.length },
//       { key: 'uppercase', label: 'Contains uppercase letter (A-Z)', met: requirements.uppercase },
//       { key: 'lowercase', label: 'Contains lowercase letter (a-z)', met: requirements.lowercase },
//       { key: 'number', label: 'Contains number (0-9)', met: requirements.number },
//       { key: 'special', label: 'Contains special character (!@#$%^&*)', met: requirements.special },
//       { key: 'noCommon', label: 'Not a common password', met: requirements.noCommon }
//     ];
    
//     return (
//       <div className="password-requirements">
//         <div className="requirements-title" style={{ fontSize: '13px', fontWeight: 600, color: '#124441', marginBottom: '8px' }}>
//           Password Requirements:
//         </div>
//         <div className="requirements-list" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
//           {requirementChecks.map((req, index) => (
//             <div 
//               key={index} 
//               className="requirement-item"
//               style={{ 
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '8px',
//                 fontSize: '12px',
//                 color: req.met ? '#4CAF50' : '#9e9e9e'
//               }}
//             >
//               <span style={{ fontSize: '14px' }}>
//                 {req.met ? '✓' : '○'}
//               </span>
//               <span style={{ textDecoration: req.met ? 'none' : 'line-through', opacity: req.met ? 1 : 0.7 }}>
//                 {req.label}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   // User type specific custom fields
//   const getUserTypeCustomFields = () => {
//     switch (userType) {
//       case 'vendor':
//         return [
//           {
//             name: 'gstNumber',
//             label: 'GST Number',
//             type: 'text',
//             placeholder: 'Enter 15-digit GST number (e.g., 22AAAAA0000A1Z5)',
//             required: true
//           },
//           {
//             name: 'businessLicense',
//             label: 'Business License Number',
//             type: 'text',
//             placeholder: 'Enter business license number (8-20 alphanumeric)',
//             required: true
//           },
//           {
//             name: 'pharmacyName',
//             label: 'Pharmacy/Hospital Name',
//             type: 'text',
//             placeholder: 'Enter your pharmacy or hospital name',
//             required: true
//           },
//           {
//             name: 'address',
//             label: 'Business Address',
//             type: 'textarea',
//             placeholder: 'Enter complete business address',
//             required: true
//           }
//         ];
        
//       case 'delivery':
//         return [
//           {
//             name: 'vehicleNumber',
//             label: 'Vehicle Registration Number',
//             type: 'text',
//             placeholder: 'Enter vehicle number (e.g., MH-12-AB-1234)',
//             required: true
//           },
//           {
//             name: 'vehicleType',
//             label: 'Vehicle Type',
//             type: 'select',
//             options: [
//               { value: 'bike', label: 'Bike' },
//               { value: 'scooter', label: 'Scooter' },
//               { value: 'car', label: 'Car' },
//               { value: 'van', label: 'Van' }
//             ],
//             required: true
//           },
//           {
//             name: 'idProofNumber',
//             label: 'ID Proof Number',
//             type: 'text',
//             placeholder: 'Enter Aadhaar, PAN, or Driving License number',
//             required: true
//           },
//           {
//             name: 'idProofType',
//             label: 'ID Proof Type',
//             type: 'select',
//             options: [
//               { value: 'aadhaar', label: 'Aadhaar Card' },
//               { value: 'pan', label: 'PAN Card' },
//               { value: 'dl', label: 'Driving License' },
//               { value: 'voter', label: 'Voter ID' }
//             ],
//             required: true
//           }
//         ];
        
//       case 'doctor':
//         return [
//           {
//             name: 'medicalLicense',
//             label: 'Medical License Number',
//             type: 'text',
//             placeholder: 'Enter medical license number (e.g., MCI/12345)',
//             required: true
//           },
//           {
//             name: 'specialization',
//             label: 'Specialization',
//             type: 'select',
//             options: [
//               { value: 'general', label: 'General Physician' },
//               { value: 'cardio', label: 'Cardiologist' },
//               { value: 'neuro', label: 'Neurologist' },
//               { value: 'ortho', label: 'Orthopedic' },
//               { value: 'pediatric', label: 'Pediatrician' },
//               { value: 'gynec', label: 'Gynecologist' },
//               { value: 'dental', label: 'Dentist' },
//               { value: 'dermat', label: 'Dermatologist' }
//             ],
//             required: true
//           },
//           {
//             name: 'yearsOfExperience',
//             label: 'Years of Experience',
//             type: 'number',
//             placeholder: 'Enter years of experience (0-60)',
//             required: true,
//             min: 0,
//             max: 60
//           },
//           {
//             name: 'consultationFee',
//             label: 'Consultation Fee (₹)',
//             type: 'number',
//             placeholder: 'Enter consultation fee (0-10000)',
//             required: true,
//             min: 0,
//             max: 10000,
//             step: 50
//           },
//           {
//             name: 'clinicAddress',
//             label: 'Clinic/Hospital Address',
//             type: 'textarea',
//             placeholder: 'Enter your clinic or hospital address',
//             required: true
//           }
//         ];
        
//       case 'user':
//       case 'patient':
//         return [
//           {
//             name: 'dateOfBirth',
//             label: 'Date of Birth',
//             type: 'date',
//             required: true
//           },
//           {
//             name: 'gender',
//             label: 'Gender',
//             type: 'select',
//             options: [
//               { value: 'male', label: 'Male' },
//               { value: 'female', label: 'Female' },
//               { value: 'other', label: 'Other' },
//               { value: 'prefer-not-to-say', label: 'Prefer not to say' }
//             ],
//             required: true
//           },
//           {
//             name: 'deliveryAddress',
//             label: 'Delivery Address',
//             type: 'textarea',
//             placeholder: 'Enter your complete address for medicine delivery',
//             required: true
//           },
//           {
//             name: 'emergencyContact',
//             label: 'Emergency Contact Number',
//             type: 'tel',
//             placeholder: 'Enter emergency contact number',
//             required: true,
//             maxLength: 10
//           }
//         ];
        
//       default:
//         return userDetails.customFields || [];
//     }
//   };

//   // Render step content
//   const renderStepContent = () => {
//     const customFields = getUserTypeCustomFields();
    
//     switch (currentStep) {
//       case 1:
//         return (
//           <div className="step-content">
//             <h3 className="step-title">Personal Information</h3>
            
//             <div className="input-group">
//               <label>Full Name *</label>
//               <input
//                 type="text"
//                 name="fullName"
//                 value={formData.fullName}
//                 onChange={handleInputChange}
//                 placeholder="Enter your full name (alphabets only)"
//                 disabled={isLoading}
//                 className={errors.fullName ? 'error' : ''}
//                 maxLength={50}
//               />
//               {errors.fullName && <span className="error-message">{errors.fullName}</span>}
//               <div className="input-hint">
//                 Only alphabets and spaces allowed
//               </div>
//             </div>
            
//             <div className="input-group">
//               <label>Email Address *</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 placeholder="Enter your email address"
//                 disabled={isLoading}
//                 className={errors.email ? 'error' : ''}
//               />
//               {errors.email && <span className={`error-message ${errors.email.includes('already registered') ? 'duplicate-error' : ''}`}>
//                 {errors.email}
//               </span>}
//               <div className="input-hint">
//                 We'll send a verification email to this address
//               </div>
//             </div>
            
//             <div className="input-group">
//               <label>Phone Number *</label>
//               <input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleInputChange}
//                 placeholder="Enter 10-digit mobile number"
//                 disabled={isLoading}
//                 className={errors.phone ? 'error' : ''}
//                 maxLength={10}
//               />
//               {errors.phone && <span className={`error-message ${errors.phone.includes('already registered') ? 'duplicate-error' : ''}`}>
//                 {errors.phone}
//               </span>}
//               <div className="input-hint">
//                 10-digit Indian mobile number starting with 6,7,8,9
//               </div>
//             </div>
//           </div>
//         );
        
//       case 2:
//         return (
//           <div className="step-content">
//             <h3 className="step-title">Account Security</h3>
            
//             <div className="input-group">
//               <label>Password *</label>
//               <div className="password-input-wrapper">
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   placeholder="Create a strong password (min. 12 characters)"
//                   disabled={isLoading}
//                   className={errors.password ? 'error' : ''}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="password-toggle"
//                   disabled={isLoading}
//                   aria-label={showPassword ? "Hide password" : "Show password"}
//                 >
//                   {showPassword ? <EyeOffIcon /> : <EyeIcon />}
//                 </button>
//               </div>
//               {errors.password && <span className="error-message">{errors.password}</span>}
              
//               <PasswordStrengthIndicator />
              
//               <PasswordRequirements />
              
//               <div className="password-guidelines" style={{ marginTop: '15px', padding: '10px', backgroundColor: '#F5F5F5', borderRadius: '6px' }}>
//                 <div style={{ fontSize: '12px', fontWeight: 600, color: '#124441', marginBottom: '5px' }}>Password Guidelines:</div>
//                 <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '11px', color: '#4F6F6B' }}>
//                   <li>Use a mix of letters, numbers, and special characters</li>
//                   <li>Avoid common words or personal information</li>
//                   <li>Don't use sequential characters (123, abc)</li>
//                   <li>Consider using a passphrase</li>
//                 </ul>
//               </div>
//             </div>
            
//             <div className="input-group">
//               <label>Confirm Password *</label>
//               <div className="password-input-wrapper">
//                 <input
//                   type={showConfirmPassword ? 'text' : 'password'}
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleInputChange}
//                   placeholder="Re-enter your password for confirmation"
//                   disabled={isLoading}
//                   className={errors.confirmPassword ? 'error' : ''}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="password-toggle"
//                   disabled={isLoading}
//                   aria-label={showConfirmPassword ? "Hide password" : "Show password"}
//                 >
//                   {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
//                 </button>
//               </div>
//               {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              
//               {formData.confirmPassword && formData.password === formData.confirmPassword && (
//                 <div className="success-message">
//                   ✓ Passwords match
//                 </div>
//               )}
              
//               {formData.confirmPassword && formData.password !== formData.confirmPassword && (
//                 <div className="error-message" style={{ marginTop: '5px', padding: '4px 8px', fontSize: '12px' }}>
//                   ❌ Passwords do not match
//                 </div>
//               )}
//             </div>
//           </div>
//         );
        
//       case 3:
//         return (
//           <div className="step-content">
//             <h3 className="step-title">{userDetails.label} Details</h3>
//             {customFields.map((field, index) => (
//               <div key={index} className="input-group">
//                 <label>
//                   {field.label}
//                   {field.required && ' *'}
//                 </label>
//                 {field.type === 'textarea' ? (
//                   <textarea
//                     name={field.name}
//                     value={formData[field.name] || ''}
//                     onChange={handleInputChange}
//                     placeholder={field.placeholder}
//                     disabled={isLoading}
//                     rows={4}
//                     className={errors[field.name] ? 'error' : ''}
//                   />
//                 ) : field.type === 'select' ? (
//                   <select
//                     name={field.name}
//                     value={formData[field.name] || ''}
//                     onChange={handleInputChange}
//                     disabled={isLoading}
//                     className={errors[field.name] ? 'error' : ''}
//                   >
//                     <option value="">Select {field.label}</option>
//                     {field.options?.map((option, idx) => (
//                       <option key={idx} value={option.value}>
//                         {option.label}
//                       </option>
//                     ))}
//                   </select>
//                 ) : field.type === 'number' ? (
//                   <input
//                     type="number"
//                     name={field.name}
//                     value={formData[field.name] || ''}
//                     onChange={handleInputChange}
//                     placeholder={field.placeholder}
//                     disabled={isLoading}
//                     className={errors[field.name] ? 'error' : ''}
//                     min={field.min || 0}
//                     max={field.max || 1000000}
//                     step={field.step || 1}
//                   />
//                 ) : field.type === 'date' ? (
//                   <input
//                     type="date"
//                     name={field.name}
//                     value={formData[field.name] || ''}
//                     onChange={handleInputChange}
//                     disabled={isLoading}
//                     className={errors[field.name] ? 'error' : ''}
//                     max={getMaxDate()}
//                     min={getMinDate()}
//                   />
//                 ) : (
//                   <input
//                     type={field.type || 'text'}
//                     name={field.name}
//                     value={formData[field.name] || ''}
//                     onChange={handleInputChange}
//                     placeholder={field.placeholder}
//                     disabled={isLoading}
//                     className={errors[field.name] ? 'error' : ''}
//                     maxLength={field.maxLength}
//                   />
//                 )}
//                 {errors[field.name] && (
//                   <span className={`error-message ${errors[field.name].includes('already registered') ? 'duplicate-error' : ''}`}>
//                     {errors[field.name]}
//                   </span>
//                 )}
//                 {field.name === 'emergencyContact' && (
//                   <div className="input-hint">
//                     10-digit Indian mobile number starting with 6,7,8,9
//                   </div>
//                 )}
//               </div>
//             ))}
            
//             <div className="terms-section">
//               <label className="terms-checkbox">
//                 <input
//                   type="checkbox"
//                   checked={acceptedTerms}
//                   onChange={(e) => setAcceptedTerms(e.target.checked)}
//                   disabled={isLoading}
//                 />
//                 <span>
//                   I agree to the Terms of Service and Privacy Policy
//                 </span>
//               </label>
//             </div>
//           </div>
//         );
        
//       case 4:
//         return (
//           <div className="step-content">
//             <h3 className="step-title">Additional Information</h3>
//             {userDetails.extraStepContent ? (
//               userDetails.extraStepContent(formData, handleInputChange, errors)
//             ) : (
//               <p>No additional information required.</p>
//             )}
//           </div>
//         );
        
//       default:
//         return null;
//     }
//   };

//   // Generate step labels based on user type
//   const getStepLabels = () => {
//     const labels = [
//       { number: 1, label: 'Personal Info' },
//       { number: 2, label: 'Security' },
//       { number: 3, label: userDetails.label + ' Details' }
//     ];
    
//     if (userDetails.hasExtraStep) {
//       labels.push({ number: 4, label: 'Additional Info' });
//     }
    
//     return labels;
//   };

//   const stepLabels = getStepLabels();

//   return (
//     <div className="signup-container">
//       {/* Toast Message */}
//       {showToast && (
//         <div className={`toast-message ${toastType}`}>
//           {toastType === 'success' ? '✅ ' : '❌ '}{toastMessage}
//         </div>
//       )}

//       {/* Back Buttons */}
//       <div className="back-buttons">
//         <button 
//           onClick={handleBackToHome}
//           className="back-home-btn"
//           disabled={isLoading}
//         >
//           ← Home
//         </button>
//         <button 
//           onClick={handleBackToSelection}
//           className="back-selection-btn"
//           disabled={isLoading}
//         >
//           ← Change Role
//         </button>
//       </div>

//       {/* Main Card Container */}
//       <div className="main-card">
//         {/* Left Side - User Info */}
//         <div className="left-section">
//           <div className="user-icon">
//             {userDetails.icon}
//           </div>
          
//           <h2 className="user-title">
//             Join as {userDetails.title}
//           </h2>
          
//           <p className="user-quote">
//             {userDetails.quote}
//           </p>
          
//           {/* Progress Steps */}
//           <div className="progress-steps">
//             {stepLabels.map((step) => (
//               <div key={step.number} className="step-indicator">
//                 <div className={`step-circle ${currentStep === step.number ? 'active' : currentStep > step.number ? 'completed' : ''}`}>
//                   {currentStep > step.number ? '✓' : step.number}
//                 </div>
//                 <span className="step-label">
//                   {step.label}
//                 </span>
//               </div>
//             ))}
//           </div>
          
//           <div className="benefits-list">
//             <h4>Benefits:</h4>
//             {userDetails.benefits?.map((benefit, index) => (
//               <div key={index} className="benefit-item">
//                 <span className="benefit-icon">✓</span>
//                 <span>{benefit}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Right Side - Signup Form */}
//         <div className="right-section">
//           <div className="form-header">
//             <h1 className="app-title">QUICKMED</h1>
//             <h2 className="signup-title">Create {userDetails.label} Account</h2>
//             <p className="signup-subtitle">Step {currentStep} of {totalSteps}</p>
//           </div>

//           <form onSubmit={handleSubmit}>
//             {renderStepContent()}
            
//             <div className="form-navigation">
//               {currentStep > 1 && (
//                 <button
//                   type="button"
//                   onClick={prevStep}
//                   disabled={isLoading}
//                   className="nav-btn prev-btn"
//                 >
//                   ← Previous
//                 </button>
//               )}
              
//               {currentStep < totalSteps ? (
//                 <button
//                   type="button"
//                   onClick={nextStep}
//                   disabled={isLoading}
//                   className="nav-btn next-btn"
//                 >
//                   Next →
//                 </button>
//               ) : (
//                 <button
//                   type="submit"
//                   disabled={isLoading || !acceptedTerms}
//                   className="submit-btn"
//                 >
//                   {isLoading ? 'Creating Account...' : 'Complete Registration'}
//                 </button>
//               )}
//             </div>
//           </form>

//           <div className="login-section">
//             <p>
//               Already have an account?{' '}
//               <span 
//                 onClick={() => !isLoading && handleBackToLogin()}
//                 className="login-link"
//                 role="button"
//                 tabIndex={0}
//               >
//                 Login here
//               </span>
//             </p>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .signup-container {
//           min-height: 100vh;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
//           background: linear-gradient(135deg, #E0F2F1 0%, #FFFFFF 50%, #E0F2F1 100%);
//           padding: 65px;
//           position: relative;
//         }

//         .back-buttons {
//           position: absolute;
//           top: 20px;
//           left: 20px;
//           display: flex;
//           gap: 10px;
//           z-index: 10;
//         }

//         .back-home-btn, .back-selection-btn {
//           padding: 10px 20px;
//           background-color: #FFFFFF;
//           color: #009688;
//           border: 2px solid #009688;
//           border-radius: 8px;
//           font-size: 14px;
//           font-weight: 500;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           box-shadow: 0 2px 8px rgba(0,0,0,0.1);
//         }

//         .back-home-btn:hover:not(:disabled),
//         .back-selection-btn:hover:not(:disabled) {
//           background-color: #009688;
//           color: #FFFFFF;
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(0, 150, 136, 0.3);
//         }

//         .back-home-btn:disabled,
//         .back-selection-btn:disabled {
//           opacity: 0.7;
//           cursor: not-allowed;
//           transform: none;
//         }

//         .toast-message {
//           position: fixed;
//           top: 20px;
//           right: 20px;
//           background-color: #009688;
//           color: white;
//           padding: 12px 20px;
//           border-radius: 8px;
//           box-shadow: 0 4px 12px rgba(0,0,0,0.15);
//           z-index: 1000;
//           animation: slideInRight 0.3s ease-out;
//           font-size: 14px;
//           font-weight: 500;
//           max-width: 400px;
//         }

//         .toast-message.error {
//           background-color: #F44336;
//         }

//         .main-card {
//           display: flex;
//           width: 100%;
//           max-width: 1200px;
//           background-color: white;
//           border-radius: 16px;
//           box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
//           overflow: hidden;
//           min-height: 650px;
//         }

//         /* Left Section */
//         .left-section {
//           flex: 1;
//           background: linear-gradient(135deg, #009688 0%, #00796B 100%);
//           color: white;
//           padding: 40px;
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//           text-align: center;
//         }

//         .user-icon {
//           font-size: 60px;
//           margin-bottom: 30px;
//         }

//         .user-title {
//           font-size: 28px;
//           font-weight: 700;
//           margin-bottom: 20px;
//           line-height: 1.3;
//         }

//         .user-quote {
//           font-size: 16px;
//           line-height: 1.6;
//           opacity: 0.9;
//           margin-bottom: 40px;
//         }

//         .progress-steps {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 40px;
//           position: relative;
//         }

//         .progress-steps::before {
//           content: '';
//           position: absolute;
//           top: 20px;
//           left: 5%;
//           right: 5%;
//           height: 2px;
//           background-color: rgba(255,255,255,0.3);
//           z-index: 1;
//         }

//         .step-indicator {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           position: relative;
//           z-index: 2;
//           flex: 1;
//           min-width: 80px;
//         }

//         .step-circle {
//           width: 40px;
//           height: 40px;
//           border-radius: 50%;
//           background-color: rgba(255,255,255,0.2);
//           color: white;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-weight: 600;
//           margin-bottom: 8px;
//           transition: all 0.3s ease;
//         }

//         .step-circle.active {
//           background-color: #FFFFFF;
//           color: #009688;
//           transform: scale(1.1);
//           box-shadow: 0 4px 12px rgba(255,255,255,0.3);
//         }

//         .step-circle.completed {
//           background-color: #4DB6AC;
//           color: white;
//         }

//         .step-label {
//           font-size: 12px;
//           opacity: 0.9;
//           text-align: center;
//           max-width: 80px;
//         }

//         .benefits-list {
//           text-align: left;
//           background-color: rgba(255,255,255,0.1);
//           padding: 20px;
//           border-radius: 10px;
//         }

//         .benefits-list h4 {
//           margin: 0 0 15px 0;
//           font-size: 18px;
//           opacity: 0.9;
//         }

//         .benefit-item {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//           margin-bottom: 12px;
//           font-size: 14px;
//           opacity: 0.9;
//         }

//         .benefit-icon {
//           color: #4DB6AC;
//           font-weight: bold;
//           font-size: 16px;
//         }

//         /* Right Section */
//         .right-section {
//           flex: 1.2;
//           padding: 50px 40px;
//           display: flex;
//           flex-direction: column;
//         }

//         .form-header {
//           text-align: center;
//           margin-bottom: 30px;
//         }

//         .app-title {
//           font-size: 32px;
//           font-weight: 700;
//           margin-bottom: 8px;
//           color: #009688;
//         }

//         .signup-title {
//           color: #124441;
//           font-size: 24px;
//           font-weight: 600;
//           margin-bottom: 4px;
//         }

//         .signup-subtitle {
//           color: #4F6F6B;
//           font-size: 14px;
//           margin: 0;
//         }

//         .step-content {
//           flex: 1;
//         }

//         .step-title {
//           color: #124441;
//           font-size: 18px;
//           margin-bottom: 25px;
//           padding-bottom: 10px;
//           border-bottom: 2px solid #E0F2F1;
//         }

//         .input-group {
//           margin-bottom: 20px;
//         }

//         .input-group label {
//           display: block;
//           margin-bottom: 8px;
//           font-weight: 500;
//           color: #124441;
//           font-size: 14px;
//         }

//         .input-group input,
//         .input-group select,
//         .input-group textarea {
//           width: 100%;
//           padding: 14px 16px;
//           border: 1px solid #E0F2F1;
//           border-radius: 8px;
//           font-size: 14px;
//           box-sizing: border-box;
//           outline: none;
//           transition: all 0.2s ease;
//           color: #124441;
//           background-color: #FAFAFA;
//           font-family: 'Inter', sans-serif;
//         }

//         /* Date input specific styling */
//         .input-group input[type="date"] {
//           position: relative;
//         }

//         .input-group input[type="date"]::-webkit-calendar-picker-indicator {
//           background: transparent;
//           bottom: 0;
//           color: transparent;
//           cursor: pointer;
//           height: auto;
//           left: 0;
//           position: absolute;
//           right: 0;
//           top: 0;
//           width: auto;
//         }

//         .input-group input[type="date"]::after {
//           content: "📅";
//           position: absolute;
//           right: 15px;
//           top: 50%;
//           transform: translateY(-50%);
//           color: #4F6F6B;
//           pointer-events: none;
//         }

//         /* Number input specific styling */
//         .input-group input[type="number"]::-webkit-inner-spin-button,
//         .input-group input[type="number"]::-webkit-outer-spin-button {
//           -webkit-appearance: none;
//           margin: 0;
//         }

//         .input-group input[type="number"] {
//           -moz-appearance: textfield;
//         }

//         .password-input-wrapper {
//           position: relative;
//         }

//         .password-input-wrapper input {
//           padding-right: 50px !important;
//         }

//         .password-toggle {
//           position: absolute;
//           right: 12px;
//           top: 50%;
//           transform: translateY(-50%);
//           background: none;
//           border: none;
//           cursor: pointer;
//           color: #4F6F6B;
//           padding: 4px;
//           border-radius: 4px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           width: 32px;
//           height: 32px;
//           transition: all 0.2s ease;
//           z-index: 2;
//         }

//         .password-toggle:hover:not(:disabled) {
//           background-color: #E0F2F1;
//           color: #009688;
//           transform: translateY(-50%) scale(1.1);
//         }

//         .password-toggle:disabled {
//           opacity: 0.7;
//           cursor: not-allowed;
//           transform: translateY(-50%);
//         }

//         .input-group input:focus,
//         .input-group select:focus,
//         .input-group textarea:focus {
//           border-color: #009688;
//           box-shadow: 0 0 0 3px rgba(0, 150, 136, 0.1);
//           background-color: #FFFFFF;
//         }

//         .input-group input.error,
//         .input-group select.error,
//         .input-group textarea.error {
//           border-color: #F44336;
//         }

//         .input-group input:disabled,
//         .input-group select:disabled,
//         .input-group textarea:disabled {
//           opacity: 0.7;
//           cursor: not-allowed;
//           background-color: #F5F5F5;
//         }

//         .error-message {
//           color: #F44336;
//           font-size: 12px;
//           margin-top: 5px;
//           display: block;
//           font-weight: 500;
//           padding: 4px 8px;
//           background-color: rgba(244, 67, 54, 0.1);
//           border-radius: 4px;
//           border-left: 3px solid #F44336;
//           animation: fadeIn 0.3s ease;
//         }

//         .error-message.duplicate-error {
//           background-color: rgba(255, 152, 0, 0.1);
//           border-left: 3px solid #FF9800;
//           color: #FF9800;
//         }

//         .success-message {
//           color: #4CAF50;
//           font-size: 12px;
//           margin-top: 5px;
//           display: block;
//           font-weight: 500;
//           padding: 4px 8px;
//           background-color: rgba(76, 175, 80, 0.1);
//           border-radius: 4px;
//           border-left: 3px solid #4CAF50;
//         }

//         .input-hint {
//           color: #4F6F6B;
//           font-size: 12px;
//           margin-top: 4px;
//           font-style: italic;
//         }

//         .terms-section {
//           margin-top: 30px;
//           padding: 20px;
//           background-color: #F9F9F9;
//           border-radius: 8px;
//           border: 1px solid #E0F2F1;
//         }

//         .terms-checkbox {
//           display: flex;
//           align-items: flex-start;
//           gap: 10px;
//           cursor: pointer;
//           color: #124441;
//           font-size: 14px;
//           line-height: 1.5;
//         }

//         .terms-checkbox input {
//           margin-top: 3px;
//           accent-color: #009688;
//         }

//         .form-navigation {
//           display: flex;
//           justify-content: space-between;
//           margin-top: 40px;
//           padding-top: 20px;
//           border-top: 1px solid #E0F2F1;
//         }

//         .nav-btn {
//           padding: 12px 24px;
//           border: 2px solid #009688;
//           background-color: white;
//           color: #009688;
//           border-radius: 8px;
//           font-size: 14px;
//           font-weight: 500;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .nav-btn:hover:not(:disabled) {
//           background-color: #009688;
//           color: white;
//           transform: translateY(-2px);
//         }

//         .nav-btn:disabled {
//           opacity: 0.7;
//           cursor: not-allowed;
//           transform: none;
//         }

//         .next-btn {
//           margin-left: auto;
//         }

//         .submit-btn {
//           padding: 14px 30px;
//           background-color: #009688;
//           color: white;
//           border: none;
//           border-radius: 8px;
//           font-size: 16px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           width: 100%;
//         }

//         .submit-btn:hover:not(:disabled) {
//           background-color: #00796B;
//           transform: translateY(-2px);
//           box-shadow: 0 6px 20px rgba(0, 150, 136, 0.4);
//         }

//         .submit-btn:disabled {
//           opacity: 0.7;
//           cursor: not-allowed;
//           animation: pulse 1.5s ease-in-out infinite;
//           transform: none;
//         }

//         .login-section {
//           margin-top: 30px;
//           text-align: center;
//           padding-top: 20px;
//           border-top: 1px solid #E0F2F1;
//         }

//         .login-section p {
//           color: #4F6F6B;
//           font-size: 14px;
//           margin: 0;
//         }

//         .login-link {
//           color: #009688;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.2s ease;
//           padding: 2px 6px;
//           border-radius: 4px;
//           text-decoration: none;
//           display: inline-block;
//         }

//         .login-link:hover {
//           color: #00796B;
//           background-color: #E0F2F1;
//           transform: translateY(-1px);
//         }

//         @keyframes slideInRight {
//           from {
//             transform: translateX(100%);
//             opacity: 0;
//           }
//           to {
//             transform: translateX(0);
//             opacity: 1;
//           }
//         }
        
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(-5px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes pulse {
//           0% { opacity: 1; }
//           50% { opacity: 0.7; }
//           100% { opacity: 1; }
//         }

//         /* Responsive Styles */
//         @media (max-width: 1024px) {
//           .main-card {
//             max-width: 900px;
//           }
          
//           .progress-steps::before {
//             left: 8%;
//             right: 8%;
//           }
//         }

//         @media (max-width: 768px) {
//           .main-card {
//             flex-direction: column;
//             min-height: auto;
//             margin-top: 80px;
//             max-width: 500px;
//           }

//           .back-buttons {
//             flex-direction: column;
//             top: 10px;
//             left: 10px;
//           }

//           .left-section {
//             padding: 30px 20px;
//             min-height: 300px;
//           }

//           .user-icon {
//             font-size: 40px;
//           }

//           .user-title {
//             font-size: 22px;
//           }

//           .user-quote {
//             font-size: 14px;
//           }

//           .right-section {
//             padding: 30px 20px;
//           }

//           .progress-steps {
//             margin-bottom: 30px;
//           }

//           .step-circle {
//             width: 35px;
//             height: 35px;
//             font-size: 14px;
//           }

//           .step-label {
//             font-size: 10px;
//           }

//           .form-navigation {
//             flex-direction: column;
//             gap: 15px;
//           }

//           .nav-btn {
//             width: 100%;
//           }
//         }

//         @media (max-width: 480px) {
//           .left-section {
//             padding: 20px 15px;
//             min-height: 250px;
//           }

//           .right-section {
//             padding: 20px 15px;
//           }

//           .app-title {
//             font-size: 28px;
//           }

//           .signup-title {
//             font-size: 20px;
//           }
          
//           .progress-steps::before {
//             left: 12%;
//             right: 12%;
//           }
          
//           .step-label {
//             font-size: 9px;
//             max-width: 60px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default BaseSignup;








// BaseSignup.js - Integrated Version with Duplicate Validation and Profile Integration
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const API_BASE_URL = "http://127.0.0.1:8000/api";

// Create a simple ProfileContext if it doesn't exist yet
const createProfileContext = () => {
  const defaultProfile = {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    dateOfBirth: '',
    age: '',
    gender: '',
    profilePhoto: '',
    userType: 'user',
    linkedAccounts: [],
    lastUpdated: '',
    bloodGroup: 'Not specified',
    emergencyContact: '',
    healthMetrics: {
      height: '',
      weight: '',
      bmi: '',
      bloodPressure: '',
      lastCheckup: ''
    },
    medicalHistory: {
      conditions: [],
      allergies: [],
      medications: [],
      surgeries: []
    },
    insurance: {
      provider: '',
      policyNumber: '',
      validity: ''
    },
    isActive: true,
    createdAt: ''
  };

  // Helper function to calculate age
  const calculateAge = (birthDate) => {
    if (!birthDate) return '';
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age > 0 ? age.toString() : "0";
  };

  // Parse address into components
  const parseAddress = (address) => {
    if (!address) return { city: '', state: '', pincode: '' };
    
    let city = '';
    let state = '';
    let pincode = '';
    
    const addressParts = address.split(',');
    
    // Look for pincode (6-digit number)
    for (let i = addressParts.length - 1; i >= 0; i--) {
      const part = addressParts[i].trim();
      if (/^\d{6}$/.test(part)) {
        pincode = part;
        if (i > 0) {
          city = addressParts[i - 1].trim();
        }
        if (i > 1) {
          state = addressParts[i - 2].trim();
        }
        break;
      }
    }
    
    // If no pincode found, take last 3 parts
    if (!pincode && addressParts.length >= 3) {
      pincode = addressParts[addressParts.length - 1].trim();
      city = addressParts[addressParts.length - 2].trim();
      state = addressParts[addressParts.length - 3].trim();
    }
    
    return { city, state, pincode };
  };

  return {
    // Function to set profile from signup data
    setProfileFromSignup: (signupData) => {
      console.log('Setting profile from signup data:', signupData);
      
      const address = signupData.address || signupData.deliveryAddress || '';
      const { city, state, pincode } = parseAddress(address);
      
      const newProfile = {
        ...defaultProfile,
        fullName: signupData.fullName || '',
        email: signupData.email || '',
        phone: signupData.phone || '',
        address: address,
        city: signupData.city || city || '',
        state: signupData.state || state || '',
        pincode: signupData.pincode || pincode || '',
        country: signupData.country || 'India',
        dateOfBirth: signupData.dateOfBirth || '',
        age: signupData.age || calculateAge(signupData.dateOfBirth) || '',
        gender: signupData.gender || '',
        profilePhoto: signupData.profilePhoto || '',
        userType: signupData.userType || 'user',
        linkedAccounts: signupData.linkedAccounts || [],
        emergencyContact: signupData.emergencyContact || '',
        isActive: true,
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        bloodGroup: signupData.bloodGroup || defaultProfile.bloodGroup
      };
      
      console.log('New profile created from signup:', newProfile);
      
      // Save to localStorage
      localStorage.setItem('userProfile', JSON.stringify(newProfile));
      
      if (signupData.phone) {
        localStorage.setItem(`userProfile_${signupData.phone}`, JSON.stringify(newProfile));
      }
      
      return newProfile;
    },
    
    // Function to get current profile
    getProfile: () => {
      try {
        const saved = localStorage.getItem('userProfile');
        return saved ? JSON.parse(saved) : defaultProfile;
      } catch (error) {
        console.error('Error getting profile:', error);
        return defaultProfile;
      }
    },
    
    // Function to update profile
    updateProfile: (profileData) => {
      try {
        const currentProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
        const updatedProfile = {
          ...defaultProfile,
          ...currentProfile,
          ...profileData,
          lastUpdated: new Date().toISOString()
        };
        
        localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
        return updatedProfile;
      } catch (error) {
        console.error('Error updating profile:', error);
        return defaultProfile;
      }
    },
    
    // Helper function to calculate age (export for use in component)
    calculateAge
  };
};

// Initialize profile context
const profileContext = createProfileContext();

const BaseSignup = ({ userType, userDetails, onSignupSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '', // Added for patient/user
    gender: '', // Added for patient/user
    deliveryAddress: '', // Added for patient/user
    emergencyContact: '', // Added for patient/user
    ...userDetails.extraFields
  });
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: 'Very Weak',
    color: '#f44336'
  });

  // Calculate total steps based on userDetails
  const totalSteps = userDetails.hasExtraStep ? 4 : 3;

  // Helper function to calculate age from date of birth
  const calculateAge = (birthDate) => {
    if (!birthDate) return '';
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age > 0 ? age.toString() : "0";
  };

  // Function to check for existing users (email and phone)
  const checkExistingUsers = (email, phone, emergencyContact = '') => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const errors = {};
    
    // Check for existing email
    const emailExists = registeredUsers.find(user => 
      user.email.toLowerCase() === email.toLowerCase()
    );
    
    if (emailExists) {
      errors.email = `Email already registered as ${emailExists.userType}.`;
    }
    
    // Check for existing phone number (normalize by removing non-digits)
    const phoneDigits = phone.replace(/\D/g, '');
    const phoneExists = registeredUsers.find(user => {
      const userPhoneDigits = user.phone.replace(/\D/g, '');
      return userPhoneDigits === phoneDigits && phoneDigits.length > 0;
    });
    
    if (phoneExists) {
      errors.phone = `Mobile number already registered as ${phoneExists.userType}.`;
    }
    
    // Check for existing emergency contact (for patient/user)
    if (emergencyContact) {
      const emergencyDigits = emergencyContact.replace(/\D/g, '');
      const emergencyExists = registeredUsers.find(user => {
        const userPhoneDigits = user.phone.replace(/\D/g, '');
        const userEmergencyDigits = user.emergencyContact ? user.emergencyContact.replace(/\D/g, '') : '';
        return (userPhoneDigits === emergencyDigits || userEmergencyDigits === emergencyDigits) && emergencyDigits.length > 0;
      });
      
      if (emergencyExists) {
        errors.emergencyContact = `Emergency contact already registered as ${emergencyExists.userType}.`;
      }
      
      // Check if emergency contact is same as primary phone
      if (phoneDigits === emergencyDigits) {
        errors.emergencyContact = 'Emergency contact cannot be the same as your primary phone number';
      }
    }
    
    return errors;
  };

  // Enhanced validation functions for different user types
  const validateGSTNumber = (gstNumber) => {
    if (!gstNumber.trim()) {
      return { isValid: false, message: 'GST number is required' };
    }
    
    // GST number format validation (15 characters, alphanumeric)
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    const isValid = gstRegex.test(gstNumber.toUpperCase());
    
    if (!isValid) {
      return { isValid: false, message: 'Please enter a valid 15-digit GST number (format: 22AAAAA0000A1Z5)' };
    }
    
    return { isValid: true, message: '' };
  };

  const validateBusinessLicense = (licenseNumber) => {
    if (!licenseNumber.trim()) {
      return { isValid: false, message: 'Business license number is required' };
    }
    
    // Business license format: at least 8 characters, alphanumeric
    const licenseRegex = /^[A-Z0-9]{8,20}$/;
    const isValid = licenseRegex.test(licenseNumber.toUpperCase());
    
    if (!isValid) {
      return { isValid: false, message: 'Please enter a valid business license number (8-20 alphanumeric characters)' };
    }
    
    return { isValid: true, message: '' };
  };

  const validateVehicleRegistration = (vehicleNumber) => {
    if (!vehicleNumber.trim()) {
      return { isValid: false, message: 'Vehicle registration number is required' };
    }
    
    // Indian vehicle registration number format: MH-12-AB-1234 or KA-01-AB-1234
    const vehicleRegex = /^[A-Z]{2}\s?[0-9]{2}\s?[A-Z]{1,2}\s?[0-9]{4}$/;
    const isValid = vehicleRegex.test(vehicleNumber.toUpperCase().replace(/\s/g, ''));
    
    if (!isValid) {
      return { isValid: false, message: 'Please enter a valid vehicle registration number (format: MH-12-AB-1234)' };
    }
    
    return { isValid: true, message: '' };
  };

  const validateIdProofNumber = (idNumber) => {
    if (!idNumber.trim()) {
      return { isValid: false, message: 'ID proof number is required' };
    }
    
    // Accept Aadhaar (12 digits), PAN (10 alphanumeric), or Driving License (varies)
    const aadhaarRegex = /^[2-9]{1}[0-9]{3}\s?[0-9]{4}\s?[0-9]{4}$/;
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const dlRegex = /^[A-Z]{2}[0-9]{2}\s?[0-9]{11}$/;
    
    const isValid = aadhaarRegex.test(idNumber) || panRegex.test(idNumber.toUpperCase()) || dlRegex.test(idNumber.toUpperCase());
    
    if (!isValid) {
      return { isValid: false, message: 'Please enter a valid Aadhaar (12 digits), PAN (10 characters), or Driving License number' };
    }
    
    return { isValid: true, message: '' };
  };

  const validateMedicalLicense = (licenseNumber) => {
  if (!licenseNumber || !licenseNumber.trim()) {
    return { isValid: false, message: 'Medical license number is required' };
  }

  const license = licenseNumber.toUpperCase().trim();

  const regex = /^(MCI\/\d{5,10}|[A-Z]{2}\/[A-Z]{3}\/\d{5,8})$/;

  if (!regex.test(license)) {
    return {
      isValid: false,
      message: 'Format should be: MCI/12345 or TN/GEN/12345'
    };
  }

  return { isValid: true, message: '' };
};


  const validateYearsOfExperience = (years) => {
    if (!years.trim()) {
      return { isValid: false, message: 'Years of experience is required' };
    }
    
    const yearsNum = parseInt(years, 10);
    if (isNaN(yearsNum) || yearsNum < 0 || yearsNum > 60) {
      return { isValid: false, message: 'Please enter valid years of experience (0-60)' };
    }
    
    return { isValid: true, message: '' };
  };

  const validateConsultationFee = (fee) => {
    if (!fee.trim()) {
      return { isValid: false, message: 'Consultation fee is required' };
    }
    
    const feeNum = parseFloat(fee);
    if (isNaN(feeNum) || feeNum < 0 || feeNum > 10000) {
      return { isValid: false, message: 'Please enter valid consultation fee (0-10000)' };
    }
    
    return { isValid: true, message: '' };
  };

  // Date of Birth validation
  const validateDateOfBirth = (date) => {
    if (!date.trim()) {
      return { isValid: false, message: 'Date of birth is required' };
    }
    
    const dob = new Date(date);
    const today = new Date();
    
    // Check if date is in the future
    if (dob > today) {
      return { isValid: false, message: 'Date of birth cannot be in the future' };
    }
    
    // Check if user is at least 1 year old
    const age = calculateAge(date);
    if (parseInt(age) < 1) {
      return { isValid: false, message: 'You must be at least 1 year old' };
    }
    
    // Check if user is not older than 150 years
    if (parseInt(age) > 150) {
      return { isValid: false, message: 'Please enter a valid date of birth' };
    }
    
    return { isValid: true, message: '' };
  };

  // Emergency contact validation
  const validateEmergencyContact = (contact) => {
    if (!contact.trim()) {
      return { isValid: false, message: 'Emergency contact is required' };
    }
    
    // Remove all non-digits
    const digits = contact.replace(/\D/g, '');
    
    // Must be exactly 10 digits and start with 6,7,8,9
    const isValid = /^[6-9]\d{9}$/.test(digits);
    
    if (!isValid) {
      return { isValid: false, message: 'Please enter a valid 10-digit Indian mobile number starting with 6,7,8,9' };
    }
    
    return { isValid: true, message: '' };
  };

  // Enhanced Password strength checker with stronger requirements
  const checkPasswordStrength = (password) => {
    let score = 0;
    const requirements = {
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      special: false,
      noCommon: true
    };
    
    // Check length (minimum 12 characters for strong password)
    if (password.length >= 8) {
      score += 0.5;
      if (password.length >= 12) {
        score += 1;
        requirements.length = true;
      }
    }
    
    // Check for uppercase letters
    if (/[A-Z]/.test(password)) {
      score += 1;
      requirements.uppercase = true;
    }
    
    // Check for lowercase letters
    if (/[a-z]/.test(password)) {
      score += 1;
      requirements.lowercase = true;
    }
    
    // Check for numbers
    if (/[0-9]/.test(password)) {
      score += 1;
      requirements.number = true;
    }
    
    // Check for special characters
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      score += 1;
      requirements.special = true;
    }
    
    // Check for common passwords
    const commonPasswords = [
      'password', '12345678', 'qwerty123', 'admin123', 'welcome123',
      'letmein', 'monkey', 'dragon', 'baseball', 'football',
      'password123', 'admin', '123456789', '1234567890'
    ];
    
    if (commonPasswords.includes(password.toLowerCase())) {
      score = 0;
      requirements.noCommon = false;
    }
    
    // Check for sequential characters
    if (/(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789|890)/i.test(password)) {
      score -= 1;
    }
    
    // Determine strength level with stricter criteria
    let message, color;
    if (score >= 4.5 && requirements.length && requirements.uppercase && 
        requirements.lowercase && requirements.number && requirements.special && requirements.noCommon) {
      message = 'Very Strong';
      color = '#4CAF50'; // Green
    } else if (score >= 3.5 && requirements.length && requirements.uppercase && 
               requirements.lowercase && requirements.number) {
      message = 'Strong';
      color = '#8BC34A'; // Light Green
    } else if (score >= 2.5 && requirements.length) {
      message = 'Good';
      color = '#FFC107'; // Yellow
    } else if (score >= 1.5) {
      message = 'Fair';
      color = '#FF9800'; // Orange
    } else {
      message = 'Weak';
      color = '#f44336'; // Red
    }
    
    if (password.length === 0) {
      message = 'Enter a password';
      score = 0;
      color = '#9e9e9e';
    }
    
    return { score, message, color, requirements };
  };

  // Real-time email validation
  const validateEmail = (email) => {
    if (!email.trim()) {
      return { isValid: false, message: 'Email is required' };
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    
    if (!isValid) {
      return { isValid: false, message: 'Please enter a valid email address' };
    }
    
    return { isValid: true, message: '' };
  };

  // Enhanced password validation
  const validatePassword = (password) => {
    if (!password) {
      return { isValid: false, message: 'Password is required' };
    }
    
    if (password.length < 12) {
      return { isValid: false, message: 'Password must be at least 12 characters long' };
    }
    
    if (!/[A-Z]/.test(password)) {
      return { isValid: false, message: 'Password must contain at least one uppercase letter' };
    }
    
    if (!/[a-z]/.test(password)) {
      return { isValid: false, message: 'Password must contain at least one lowercase letter' };
    }
    
    if (!/[0-9]/.test(password)) {
      return { isValid: false, message: 'Password must contain at least one number' };
    }
    
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      return { isValid: false, message: 'Password must contain at least one special character' };
    }
    
    // Check for common passwords
    const commonPasswords = [
      'password', '12345678', 'qwerty123', 'admin123', 'welcome123',
      'letmein', 'monkey', 'dragon', 'baseball', 'football',
      'password123', 'admin', '123456789', '1234567890'
    ];
    
    if (commonPasswords.includes(password.toLowerCase())) {
      return { isValid: false, message: 'This password is too common. Please choose a stronger password' };
    }
    
    // Check for sequential characters
    if (/(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789|890)/i.test(password)) {
      return { isValid: false, message: 'Avoid sequential characters in your password' };
    }
    
    return { isValid: true, message: '' };
  };

  // User type specific validation
  const validateUserTypeFields = () => {
    const newErrors = {};
    
    if (userType === 'vendor') {
      const gstValidation = validateGSTNumber(formData.gstNumber || '');
      if (!gstValidation.isValid) {
        newErrors.gstNumber = gstValidation.message;
      }
      
      const licenseValidation = validateBusinessLicense(formData.businessLicense || '');
      if (!licenseValidation.isValid) {
        newErrors.businessLicense = licenseValidation.message;
      }
    }
    
    if (userType === 'delivery') {
      const vehicleValidation = validateVehicleRegistration(formData.vehicleNumber || '');
      if (!vehicleValidation.isValid) {
        newErrors.vehicleNumber = vehicleValidation.message;
      }
      
      const idProofValidation = validateIdProofNumber(formData.idProofNumber || '');
      if (!idProofValidation.isValid) {
        newErrors.idProofNumber = idProofValidation.message;
      }
    }
    
    if (userType === 'doctor') {
      const medicalLicenseValidation = validateMedicalLicense(formData.medicalLicense || '');
      if (!medicalLicenseValidation.isValid) {
        newErrors.medicalLicense = medicalLicenseValidation.message;
      }
      
      const experienceValidation = validateYearsOfExperience(formData.yearsOfExperience || '');
      if (!experienceValidation.isValid) {
        newErrors.yearsOfExperience = experienceValidation.message;
      }
      
      const feeValidation = validateConsultationFee(formData.consultationFee || '');
      if (!feeValidation.isValid) {
        newErrors.consultationFee = feeValidation.message;
      }
    }
    
    // Patient/User specific validations
    if (userType === 'user' || userType === 'patient') {
      const dobValidation = validateDateOfBirth(formData.dateOfBirth || '');
      if (!dobValidation.isValid) {
        newErrors.dateOfBirth = dobValidation.message;
      }
      
      if (!formData.gender) {
        newErrors.gender = 'Gender is required';
      }
      
      if (!formData.deliveryAddress) {
        newErrors.deliveryAddress = 'Delivery address is required';
      }
      
      const emergencyValidation = validateEmergencyContact(formData.emergencyContact || '');
      if (!emergencyValidation.isValid) {
        newErrors.emergencyContact = emergencyValidation.message;
      }
    }
    
    return newErrors;
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    // Full name validation - only alphabets and spaces
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (!/^[A-Za-z\s]+$/.test(formData.fullName.trim())) {
      newErrors.fullName = 'Full name should contain only alphabets and spaces';
    }
    
    // Email validation
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.message;
    }
    
    // Phone number validation - Indian mobile numbers starting with 6,7,8,9
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number starting with 6,7,8,9';
    }
    
    // Check for existing users (email and phone)
    if (formData.email.trim() && formData.phone.trim()) {
      const duplicateErrors = checkExistingUsers(formData.email, formData.phone, formData.emergencyContact);
      Object.assign(newErrors, duplicateErrors);
    }
    
    // Enhanced password validation
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.message;
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // User type specific validations
    const userTypeErrors = validateUserTypeFields();
    Object.assign(newErrors, userTypeErrors);
    
    // Custom field validations
    if (userDetails.extraFields) {
      Object.keys(userDetails.extraFields).forEach(field => {
        if (!formData[field] && userDetails.fieldValidations?.[field]?.required) {
          newErrors[field] = userDetails.fieldValidations[field].message;
        }
      });
    }
    
    return newErrors;
  };

  // Update password strength when password changes
  useEffect(() => {
    const strength = checkPasswordStrength(formData.password);
    setPasswordStrength(strength);
  }, [formData.password]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Full name - only allow alphabets and spaces
    if (name === 'fullName') {
      const filteredValue = value.replace(/[^A-Za-z\s]/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: filteredValue
      }));
      
      // Clear error for this field
      if (errors.fullName) {
        setErrors(prev => ({ ...prev, fullName: '' }));
      }
    } 
    // Email - real-time validation and duplicate check
    else if (name === 'email') {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      
      const validation = validateEmail(value);
      if (!validation.isValid && value.trim()) {
        setErrors(prev => ({ ...prev, email: validation.message }));
      } else if (value.trim()) {
        // Check for duplicate email in real-time
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const emailExists = registeredUsers.find(user => 
          user.email.toLowerCase() === value.toLowerCase()
        );
        
        if (emailExists) {
          setErrors(prev => ({ ...prev, email: `Email already registered as ${emailExists.userType}.` }));
        } else {
          setErrors(prev => ({ ...prev, email: '' }));
        }
      } else {
        setErrors(prev => ({ ...prev, email: '' }));
      }
    }
    // Phone number - format, validate and duplicate check
    else if (name === 'phone') {
      // Remove all non-digits
      let digits = value.replace(/\D/g, '');
      
      // Only allow numbers starting with 6,7,8,9
      if (digits.length > 0) {
        const firstDigit = digits[0];
        if (!['6', '7', '8', '9'].includes(firstDigit)) {
          return;
        }
      }
      
      // Limit to 10 digits
      if (digits.length > 10) {
        digits = digits.substring(0, 10);
      }
      
      setFormData(prev => ({
        ...prev,
        [name]: digits
      }));
      
      // Check for duplicate phone in real-time
      if (digits.length === 10) {
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const phoneExists = registeredUsers.find(user => {
          const userPhoneDigits = user.phone.replace(/\D/g, '');
          return userPhoneDigits === digits;
        });
        
        if (phoneExists) {
          setErrors(prev => ({ ...prev, phone: `Mobile number already registered as ${phoneExists.userType}.` }));
        } else {
          setErrors(prev => ({ ...prev, phone: '' }));
        }
      } else {
        setErrors(prev => ({ ...prev, phone: '' }));
      }
    }
    // Password - real-time strength check
    else if (name === 'password') {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      
      if (value === formData.confirmPassword && errors.confirmPassword) {
        setErrors(prev => ({ ...prev, confirmPassword: '' }));
      }
      
      const strength = checkPasswordStrength(value);
      setPasswordStrength(strength);
      
      // Clear error for this field
      if (errors.password) {
        setErrors(prev => ({ ...prev, password: '' }));
      }
    }
    // Confirm password - real-time matching check
    else if (name === 'confirmPassword') {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      
      if (value && value !== formData.password) {
        setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      } else if (errors.confirmPassword) {
        setErrors(prev => ({ ...prev, confirmPassword: '' }));
      }
    }
    // Emergency contact - same validation as phone with duplicate check
    else if (name === 'emergencyContact') {
      let digits = value.replace(/\D/g, '');
      
      if (digits.length > 0) {
        const firstDigit = digits[0];
        if (!['6', '7', '8', '9'].includes(firstDigit)) {
          return;
        }
      }
      
      if (digits.length > 10) {
        digits = digits.substring(0, 10);
      }
      
      setFormData(prev => ({
        ...prev,
        [name]: digits
      }));
      
      const validation = validateEmergencyContact(digits);
      if (!validation.isValid) {
        setErrors(prev => ({ ...prev, emergencyContact: validation.message }));
      } else if (digits.length === 10) {
        // Check for duplicate emergency contact in real-time
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const emergencyExists = registeredUsers.find(user => {
          const userPhoneDigits = user.phone.replace(/\D/g, '');
          const userEmergencyDigits = user.emergencyContact ? user.emergencyContact.replace(/\D/g, '') : '';
          return userPhoneDigits === digits || userEmergencyDigits === digits;
        });
        
        // Check if emergency contact is same as primary phone
        const primaryPhone = formData.phone.replace(/\D/g, '');
        if (digits === primaryPhone) {
          setErrors(prev => ({ ...prev, emergencyContact: 'Emergency contact cannot be the same as your primary phone number' }));
        } else if (emergencyExists) {
          setErrors(prev => ({ ...prev, emergencyContact: `Emergency contact already registered as ${emergencyExists.userType}.` }));
        } else {
          setErrors(prev => ({ ...prev, emergencyContact: '' }));
        }
      } else {
        setErrors(prev => ({ ...prev, emergencyContact: '' }));
      }
    }
    // Date of Birth - validate date
    else if (name === 'dateOfBirth') {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      
      if (value) {
        const validation = validateDateOfBirth(value);
        if (!validation.isValid) {
          setErrors(prev => ({ ...prev, dateOfBirth: validation.message }));
        } else {
          setErrors(prev => ({ ...prev, dateOfBirth: '' }));
        }
      }
    }
    // Vendor specific fields
    else if (name === 'gstNumber') {
      setFormData(prev => ({
        ...prev,
        [name]: value.toUpperCase()
      }));
      
      const validation = validateGSTNumber(value);
      if (!validation.isValid && value.trim()) {
        setErrors(prev => ({ ...prev, gstNumber: validation.message }));
      } else {
        setErrors(prev => ({ ...prev, gstNumber: '' }));
      }
    }
    else if (name === 'businessLicense') {
      setFormData(prev => ({
        ...prev,
        [name]: value.toUpperCase()
      }));
      
      const validation = validateBusinessLicense(value);
      if (!validation.isValid && value.trim()) {
        setErrors(prev => ({ ...prev, businessLicense: validation.message }));
      } else {
        setErrors(prev => ({ ...prev, businessLicense: '' }));
      }
    }
    // Delivery specific fields
    else if (name === 'vehicleNumber') {
      setFormData(prev => ({
        ...prev,
        [name]: value.toUpperCase()
      }));
      
      const validation = validateVehicleRegistration(value);
      if (!validation.isValid && value.trim()) {
        setErrors(prev => ({ ...prev, vehicleNumber: validation.message }));
      } else {
        setErrors(prev => ({ ...prev, vehicleNumber: '' }));
      }
    }
    else if (name === 'idProofNumber') {
      setFormData(prev => ({
        ...prev,
        [name]: value.toUpperCase()
      }));
      
      const validation = validateIdProofNumber(value);
      if (!validation.isValid && value.trim()) {
        setErrors(prev => ({ ...prev, idProofNumber: validation.message }));
      } else {
        setErrors(prev => ({ ...prev, idProofNumber: '' }));
      }
    }
    // Doctor specific fields
    else if (name === 'medicalLicense') {
  const upperValue = value.toUpperCase().trim();

  setFormData(prev => ({
    ...prev,
    medicalLicense: upperValue
  }));

  const validation = validateMedicalLicense(upperValue);

  if (!validation.isValid && upperValue) {
    setErrors(prev => ({
      ...prev,
      medicalLicense: validation.message
    }));
  } else {
    setErrors(prev => ({
      ...prev,
      medicalLicense: ''
    }));
  }
}

    else if (name === 'yearsOfExperience') {
      // Only allow numbers, prevent negative values
      const numValue = value.replace(/[^0-9]/g, '');
      const limitedValue = numValue.length > 2 ? numValue.substring(0, 2) : numValue;
      
      setFormData(prev => ({
        ...prev,
        [name]: limitedValue
      }));
      
      const validation = validateYearsOfExperience(limitedValue);
      if (!validation.isValid && limitedValue.trim()) {
        setErrors(prev => ({ ...prev, yearsOfExperience: validation.message }));
      } else {
        setErrors(prev => ({ ...prev, yearsOfExperience: '' }));
      }
    }
    else if (name === 'consultationFee') {
      // Only allow numbers and decimal point, prevent negative values
      const numValue = value.replace(/[^0-9.]/g, '');
      // Remove multiple decimal points
      const parts = numValue.split('.');
      const sanitizedValue = parts[0] + (parts.length > 1 ? '.' + parts.slice(1).join('') : '');
      
      setFormData(prev => ({
        ...prev,
        [name]: sanitizedValue
      }));
      
      const validation = validateConsultationFee(sanitizedValue);
      if (!validation.isValid && sanitizedValue.trim()) {
        setErrors(prev => ({ ...prev, consultationFee: validation.message }));
      } else {
        setErrors(prev => ({ ...prev, consultationFee: '' }));
      }
    }
    // For other fields (gender, deliveryAddress, etc.)
    else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
      
      // Clear error for this field when user starts typing
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (currentStep < totalSteps) {
      nextStep();
      return;
    }
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showToastMessage('Please fix the errors in the form', 'error');
      return;
    }
    
    if (!acceptedTerms) {
      showToastMessage('Please accept the terms and conditions', 'error');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const payload = {
  fullName: formData.fullName,
  email: formData.email,
  phone: formData.phone,
  password: formData.password,
  userType: userType,

  dateOfBirth: formData.dateOfBirth || null,
  gender: formData.gender || "",
  deliveryAddress: formData.deliveryAddress || "",
  emergencyContact: formData.emergencyContact || "",

  gstNumber: formData.gstNumber || "",
  businessLicense: formData.businessLicense || "",
  pharmacyName: formData.pharmacyName || "",
  businessAddress: formData.address || "", 

  vehicleNumber: formData.vehicleNumber || "",
  vehicleType: formData.vehicleType || "",
  idProofNumber: formData.idProofNumber || "",
  idProofType: formData.idProofType || "",

  medicalLicense: formData.medicalLicense || "",
  specialization: formData.specialization || "",
  yearsOfExperience: formData.yearsOfExperience || null,
  consultationFee: formData.consultationFee || null,
  clinicAddress: formData.clinicAddress || "",
};


const response = await fetch(`${API_BASE_URL}/signup/`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(payload),
});

const data = await response.json();

if (!response.ok) {
  showToastMessage(data.message || "Signup failed", "error");
  setIsLoading(false);
  return;
}

showToastMessage("Signup successful! Redirecting to login...", "success");


setTimeout(() => {
  navigate(`/login/${userType}`, {
    state: {
      signupSuccess: true,
      registeredEmail: formData.email,
    },
  });
}, 1500);

    
      
    } catch (error) {
      console.error('Signup error:', error);
      showToastMessage('Registration failed. Please try again.', 'error');
      setIsLoading(false);
    }
  };

  const showToastMessage = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleBackToLogin = () => {
    navigate(`/login/${userType}`);
  };

  const handleBackToSelection = () => {
    navigate('/login');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  // Step navigation with validation
  const nextStep = () => {
    if (currentStep === 1) {
      const step1Fields = ['fullName', 'email', 'phone'];
      const step1Errors = {};
      let hasErrors = false;
      
      step1Fields.forEach(field => {
        if (!formData[field]) {
          step1Errors[field] = 'This field is required';
          hasErrors = true;
        }
      });
      
      const emailValidation = validateEmail(formData.email);
      if (!emailValidation.isValid) {
        step1Errors.email = emailValidation.message;
        hasErrors = true;
      }
      
      if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ''))) {
        step1Errors.phone = 'Please enter a valid 10-digit Indian mobile number starting with 6,7,8,9';
        hasErrors = true;
      }
      
      // Check for existing users when moving to next step
      if (formData.email.trim() && formData.phone.trim()) {
        const duplicateErrors = checkExistingUsers(formData.email, formData.phone);
        Object.assign(step1Errors, duplicateErrors);
        if (Object.keys(duplicateErrors).length > 0) {
          hasErrors = true;
        }
      }
      
      if (hasErrors) {
        setErrors(step1Errors);
        showToastMessage('Please fix the errors before proceeding', 'error');
        return;
      }
    }
    
    if (currentStep === 2) {
      const step2Errors = {};
      let hasErrors = false;
      
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        step2Errors.password = passwordValidation.message;
        hasErrors = true;
      }
      
      if (!formData.confirmPassword) {
        step2Errors.confirmPassword = 'Please confirm your password';
        hasErrors = true;
      } else if (formData.password !== formData.confirmPassword) {
        step2Errors.confirmPassword = 'Passwords do not match';
        hasErrors = true;
      }
      
      if (hasErrors) {
        setErrors(step2Errors);
        showToastMessage('Please fix the password errors before proceeding', 'error');
        return;
      }
    }
    
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  // Custom Eye Icon Components
  const EyeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#009688" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );

  const EyeOffIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#009688" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
  );

  // Get maximum date for date picker (today)
  const getMaxDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Get minimum date for date picker (150 years ago)
  const getMinDate = () => {
    const today = new Date();
    const year = today.getFullYear() - 150;
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Password strength indicator component
  const PasswordStrengthIndicator = () => {
    const segments = [];
    const totalSegments = 6;
    
    for (let i = 0; i < totalSegments; i++) {
      const isActive = i <= Math.floor(passwordStrength.score);
      segments.push(
        <div 
          key={i}
          className="strength-segment"
          style={{
            backgroundColor: isActive ? passwordStrength.color : '#e0e0e0',
            width: '100%',
            height: '4px',
            borderRadius: '2px',
            transition: 'all 0.3s ease'
          }}
        />
      );
    }
    
    return (
      <div className="strength-indicator">
        <div className="strength-bar" style={{ display: 'flex', gap: '4px', marginTop: '5px' }}>
          {segments}
        </div>
        <div 
          className="strength-text"
          style={{ 
            color: passwordStrength.color,
            fontSize: '12px',
            marginTop: '5px',
            fontWeight: 'bold'
          }}
        >
          {passwordStrength.message}
        </div>
      </div>
    );
  };

  // Password requirements checklist
  const PasswordRequirements = () => {
    const requirements = passwordStrength.requirements || {};
    
    const requirementChecks = [
      { key: 'length', label: 'At least 12 characters long', met: requirements.length },
      { key: 'uppercase', label: 'Contains uppercase letter (A-Z)', met: requirements.uppercase },
      { key: 'lowercase', label: 'Contains lowercase letter (a-z)', met: requirements.lowercase },
      { key: 'number', label: 'Contains number (0-9)', met: requirements.number },
      { key: 'special', label: 'Contains special character (!@#$%^&*)', met: requirements.special },
      { key: 'noCommon', label: 'Not a common password', met: requirements.noCommon }
    ];
    
    return (
      <div className="password-requirements">
        <div className="requirements-title" style={{ fontSize: '13px', fontWeight: 600, color: '#124441', marginBottom: '8px' }}>
          Password Requirements:
        </div>
        <div className="requirements-list" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {requirementChecks.map((req, index) => (
            <div 
              key={index} 
              className="requirement-item"
              style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '12px',
                color: req.met ? '#4CAF50' : '#9e9e9e'
              }}
            >
              <span style={{ fontSize: '14px' }}>
                {req.met ? '✓' : '○'}
              </span>
              <span style={{ textDecoration: req.met ? 'none' : 'line-through', opacity: req.met ? 1 : 0.7 }}>
                {req.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // User type specific custom fields
  const getUserTypeCustomFields = () => {
    switch (userType) {
      case 'vendor':
        return [
          {
            name: 'gstNumber',
            label: 'GST Number',
            type: 'text',
            placeholder: 'Enter 15-digit GST number (e.g., 22AAAAA0000A1Z5)',
            required: true
          },
          {
            name: 'businessLicense',
            label: 'Business License Number',
            type: 'text',
            placeholder: 'Enter business license number (8-20 alphanumeric)',
            required: true
          },
          {
            name: 'pharmacyName',
            label: 'Pharmacy/Hospital Name',
            type: 'text',
            placeholder: 'Enter your pharmacy or hospital name',
            required: true
          },
          {
            name: 'address',
            label: 'Business Address',
            type: 'textarea',
            placeholder: 'Enter complete business address',
            required: true
          }
        ];
        
      case 'delivery':
        return [
          {
            name: 'vehicleNumber',
            label: 'Vehicle Registration Number',
            type: 'text',
            placeholder: 'Enter vehicle number (e.g., MH-12-AB-1234)',
            required: true
          },
          {
            name: 'vehicleType',
            label: 'Vehicle Type',
            type: 'select',
            options: [
              { value: 'bike', label: 'Bike' },
              { value: 'scooter', label: 'Scooter' },
              { value: 'car', label: 'Car' },
              { value: 'van', label: 'Van' }
            ],
            required: true
          },
          {
            name: 'idProofNumber',
            label: 'ID Proof Number',
            type: 'text',
            placeholder: 'Enter Aadhaar, PAN, or Driving License number',
            required: true
          },
          {
            name: 'idProofType',
            label: 'ID Proof Type',
            type: 'select',
            options: [
              { value: 'aadhaar', label: 'Aadhaar Card' },
              { value: 'pan', label: 'PAN Card' },
              { value: 'dl', label: 'Driving License' },
              { value: 'voter', label: 'Voter ID' }
            ],
            required: true
          }
        ];
        
      case 'doctor':
        return [
          {
            name: 'medicalLicense',
            label: 'Medical License Number',
            type: 'text',
            placeholder: 'Enter medical license number (e.g., MCI/12345)',
            required: true
          },
          {
            name: 'specialization',
            label: 'Specialization',
            type: 'select',
            options: [
              { value: 'general', label: 'General Physician' },
              { value: 'cardio', label: 'Cardiologist' },
              { value: 'neuro', label: 'Neurologist' },
              { value: 'ortho', label: 'Orthopedic' },
              { value: 'pediatric', label: 'Pediatrician' },
              { value: 'gynec', label: 'Gynecologist' },
              { value: 'dental', label: 'Dentist' },
              { value: 'dermat', label: 'Dermatologist' }
            ],
            required: true
          },
          {
            name: 'yearsOfExperience',
            label: 'Years of Experience',
            type: 'number',
            placeholder: 'Enter years of experience (0-60)',
            required: true,
            min: 0,
            max: 60
          },
          {
            name: 'consultationFee',
            label: 'Consultation Fee (₹)',
            type: 'number',
            placeholder: 'Enter consultation fee (0-10000)',
            required: true,
            min: 0,
            max: 10000,
            step: 50
          },
          {
            name: 'clinicAddress',
            label: 'Clinic/Hospital Address',
            type: 'textarea',
            placeholder: 'Enter your clinic or hospital address',
            required: true
          }
        ];
        
      case 'user':
      case 'patient':
        return [
          {
            name: 'dateOfBirth',
            label: 'Date of Birth',
            type: 'date',
            required: true
          },
          {
            name: 'gender',
            label: 'Gender',
            type: 'select',
            options: [
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
              { value: 'other', label: 'Other' },
              { value: 'prefer-not-to-say', label: 'Prefer not to say' }
            ],
            required: true
          },
          {
            name: 'deliveryAddress',
            label: 'Delivery Address',
            type: 'textarea',
            placeholder: 'Enter your complete address for medicine delivery',
            required: true
          },
          {
            name: 'emergencyContact',
            label: 'Emergency Contact Number',
            type: 'tel',
            placeholder: 'Enter emergency contact number',
            required: true,
            maxLength: 10
          }
        ];
        
      default:
        return userDetails.customFields || [];
    }
  };

  // Render step content
  const renderStepContent = () => {
    const customFields = getUserTypeCustomFields();
    
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content">
            <h3 className="step-title">Personal Information</h3>
            
            <div className="input-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name (alphabets only)"
                disabled={isLoading}
                className={errors.fullName ? 'error' : ''}
                maxLength={50}
              />
              {errors.fullName && <span className="error-message">{errors.fullName}</span>}
              <div className="input-hint">
                Only alphabets and spaces allowed
              </div>
            </div>
            
            <div className="input-group">
              <label>Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                disabled={isLoading}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className={`error-message ${errors.email.includes('already registered') ? 'duplicate-error' : ''}`}>
                {errors.email}
              </span>}
              <div className="input-hint">
                We'll send a verification email to this address
              </div>
            </div>
            
            <div className="input-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter 10-digit mobile number"
                disabled={isLoading}
                className={errors.phone ? 'error' : ''}
                maxLength={10}
              />
              {errors.phone && <span className={`error-message ${errors.phone.includes('already registered') ? 'duplicate-error' : ''}`}>
                {errors.phone}
              </span>}
              <div className="input-hint">
                10-digit Indian mobile number starting with 6,7,8,9
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="step-content">
            <h3 className="step-title">Account Security</h3>
            
            <div className="input-group">
              <label>Password *</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a strong password (min. 12 characters)"
                  disabled={isLoading}
                  className={errors.password ? 'error' : ''}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                  disabled={isLoading}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
              
              <PasswordStrengthIndicator />
              
              <PasswordRequirements />
              
              <div className="password-guidelines" style={{ marginTop: '15px', padding: '10px', backgroundColor: '#F5F5F5', borderRadius: '6px' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#124441', marginBottom: '5px' }}>Password Guidelines:</div>
                <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '11px', color: '#4F6F6B' }}>
                  <li>Use a mix of letters, numbers, and special characters</li>
                  <li>Avoid common words or personal information</li>
                  <li>Don't use sequential characters (123, abc)</li>
                  <li>Consider using a passphrase</li>
                </ul>
              </div>
            </div>
            
            <div className="input-group">
              <label>Confirm Password *</label>
              <div className="password-input-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Re-enter your password for confirmation"
                  disabled={isLoading}
                  className={errors.confirmPassword ? 'error' : ''}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="password-toggle"
                  disabled={isLoading}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              
              {formData.confirmPassword && formData.password === formData.confirmPassword && (
                <div className="success-message">
                  ✓ Passwords match
                </div>
              )}
              
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <div className="error-message" style={{ marginTop: '5px', padding: '4px 8px', fontSize: '12px' }}>
                  ❌ Passwords do not match
                </div>
              )}
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="step-content">
            <h3 className="step-title">{userDetails.label} Details</h3>
            {customFields.map((field, index) => (
              <div key={index} className="input-group">
                <label>
                  {field.label}
                  {field.required && ' *'}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    disabled={isLoading}
                    rows={4}
                    className={errors[field.name] ? 'error' : ''}
                  />
                ) : field.type === 'select' ? (
                  <select
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className={errors[field.name] ? 'error' : ''}
                  >
                    <option value="">Select {field.label}</option>
                    {field.options?.map((option, idx) => (
                      <option key={idx} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === 'number' ? (
                  <input
                    type="number"
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    disabled={isLoading}
                    className={errors[field.name] ? 'error' : ''}
                    min={field.min || 0}
                    max={field.max || 1000000}
                    step={field.step || 1}
                  />
                ) : field.type === 'date' ? (
                  <input
                    type="date"
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className={errors[field.name] ? 'error' : ''}
                    max={getMaxDate()}
                    min={getMinDate()}
                  />
                ) : (
                  <input
                    type={field.type || 'text'}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    disabled={isLoading}
                    className={errors[field.name] ? 'error' : ''}
                    maxLength={field.maxLength}
                  />
                )}
                {errors[field.name] && (
                  <span className={`error-message ${errors[field.name].includes('already registered') ? 'duplicate-error' : ''}`}>
                    {errors[field.name]}
                  </span>
                )}
                {field.name === 'emergencyContact' && (
                  <div className="input-hint">
                    10-digit Indian mobile number starting with 6,7,8,9
                  </div>
                )}
              </div>
            ))}
            
            <div className="terms-section">
              <label className="terms-checkbox">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  disabled={isLoading}
                />
                <span>
                  I agree to the Terms of Service and Privacy Policy
                </span>
              </label>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="step-content">
            <h3 className="step-title">Additional Information</h3>
            {userDetails.extraStepContent ? (
              userDetails.extraStepContent(formData, handleInputChange, errors)
            ) : (
              <p>No additional information required.</p>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };

  // Generate step labels based on user type
  const getStepLabels = () => {
    const labels = [
      { number: 1, label: 'Personal Info' },
      { number: 2, label: 'Security' },
      { number: 3, label: userDetails.label + ' Details' }
    ];
    
    if (userDetails.hasExtraStep) {
      labels.push({ number: 4, label: 'Additional Info' });
    }
    
    return labels;
  };

  const stepLabels = getStepLabels();

  return (
    <div className="signup-container">
      {/* Toast Message */}
      {showToast && (
        <div className={`toast-message ${toastType}`}>
          {toastType === 'success' ? '✅ ' : '❌ '}{toastMessage}
        </div>
      )}

      {/* Back Buttons */}
      <div className="back-buttons">
        <button 
          onClick={handleBackToHome}
          className="back-home-btn"
          disabled={isLoading}
        >
          ← Home
        </button>
        <button 
          onClick={handleBackToSelection}
          className="back-selection-btn"
          disabled={isLoading}
        >
          ← Change Role
        </button>
      </div>

      {/* Main Card Container */}
      <div className="main-card">
        {/* Left Side - User Info */}
        <div className="left-section">
          <div className="user-icon">
            {userDetails.icon}
          </div>
          
          <h2 className="user-title">
            Join as {userDetails.title}
          </h2>
          
          <p className="user-quote">
            {userDetails.quote}
          </p>
          
          {/* Progress Steps */}
          <div className="progress-steps">
            {stepLabels.map((step) => (
              <div key={step.number} className="step-indicator">
                <div className={`step-circle ${currentStep === step.number ? 'active' : currentStep > step.number ? 'completed' : ''}`}>
                  {currentStep > step.number ? '✓' : step.number}
                </div>
                <span className="step-label">
                  {step.label}
                </span>
              </div>
            ))}
          </div>
          
          <div className="benefits-list">
            <h4>Benefits:</h4>
            {userDetails.benefits?.map((benefit, index) => (
              <div key={index} className="benefit-item">
                <span className="benefit-icon">✓</span>
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="right-section">
          <div className="form-header">
            <h1 className="app-title">QUICKMED</h1>
            <h2 className="signup-title">Create {userDetails.label} Account</h2>
            <p className="signup-subtitle">Step {currentStep} of {totalSteps}</p>
          </div>

          <form onSubmit={handleSubmit}>
            {renderStepContent()}
            
            <div className="form-navigation">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={isLoading}
                  className="nav-btn prev-btn"
                >
                  ← Previous
                </button>
              )}
              
              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={isLoading}
                  className="nav-btn next-btn"
                >
                  Next →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading || !acceptedTerms}
                  className="submit-btn"
                >
                  {isLoading ? 'Creating Account...' : 'Complete Registration'}
                </button>
              )}
            </div>
          </form>

          <div className="login-section">
            <p>
              Already have an account?{' '}
              <span 
                onClick={() => !isLoading && handleBackToLogin()}
                className="login-link"
                role="button"
                tabIndex={0}
              >
                Login here
              </span>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .signup-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: linear-gradient(135deg, #E0F2F1 0%, #FFFFFF 50%, #E0F2F1 100%);
          padding: 65px;
          position: relative;
        }

        .back-buttons {
          position: absolute;
          top: 20px;
          left: 20px;
          display: flex;
          gap: 10px;
          z-index: 10;
        }

        .back-home-btn, .back-selection-btn {
          padding: 10px 20px;
          background-color: #FFFFFF;
          color: #009688;
          border: 2px solid #009688;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .back-home-btn:hover:not(:disabled),
        .back-selection-btn:hover:not(:disabled) {
          background-color: #009688;
          color: #FFFFFF;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 150, 136, 0.3);
        }

        .back-home-btn:disabled,
        .back-selection-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .toast-message {
          position: fixed;
          top: 20px;
          right: 20px;
          background-color: #009688;
          color: white;
          padding: 12px 20px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          z-index: 1000;
          animation: slideInRight 0.3s ease-out;
          font-size: 14px;
          font-weight: 500;
          max-width: 400px;
        }

        .toast-message.error {
          background-color: #F44336;
        }

        .main-card {
          display: flex;
          width: 100%;
          max-width: 1200px;
          background-color: white;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          min-height: 650px;
        }

        /* Left Section */
        .left-section {
          flex: 1;
          background: linear-gradient(135deg, #009688 0%, #00796B 100%);
          color: white;
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
        }

        .user-icon {
          font-size: 60px;
          margin-bottom: 30px;
        }

        .user-title {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 20px;
          line-height: 1.3;
        }

        .user-quote {
          font-size: 16px;
          line-height: 1.6;
          opacity: 0.9;
          margin-bottom: 40px;
        }

        .progress-steps {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
          position: relative;
        }

        .progress-steps::before {
          content: '';
          position: absolute;
          top: 20px;
          left: 5%;
          right: 5%;
          height: 2px;
          background-color: rgba(255,255,255,0.3);
          z-index: 1;
        }

        .step-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 2;
          flex: 1;
          min-width: 80px;
        }

        .step-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: rgba(255,255,255,0.2);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          margin-bottom: 8px;
          transition: all 0.3s ease;
        }

        .step-circle.active {
          background-color: #FFFFFF;
          color: #009688;
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(255,255,255,0.3);
        }

        .step-circle.completed {
          background-color: #4DB6AC;
          color: white;
        }

        .step-label {
          font-size: 12px;
          opacity: 0.9;
          text-align: center;
          max-width: 80px;
        }

        .benefits-list {
          text-align: left;
          background-color: rgba(255,255,255,0.1);
          padding: 20px;
          border-radius: 10px;
        }

        .benefits-list h4 {
          margin: 0 0 15px 0;
          font-size: 18px;
          opacity: 0.9;
        }

        .benefit-item {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
          font-size: 14px;
          opacity: 0.9;
        }

        .benefit-icon {
          color: #4DB6AC;
          font-weight: bold;
          font-size: 16px;
        }

        /* Right Section */
        .right-section {
          flex: 1.2;
          padding: 50px 40px;
          display: flex;
          flex-direction: column;
        }

        .form-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .app-title {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 8px;
          color: #009688;
        }

        .signup-title {
          color: #124441;
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .signup-subtitle {
          color: #4F6F6B;
          font-size: 14px;
          margin: 0;
        }

        .step-content {
          flex: 1;
        }

        .step-title {
          color: #124441;
          font-size: 18px;
          margin-bottom: 25px;
          padding-bottom: 10px;
          border-bottom: 2px solid #E0F2F1;
        }

        .input-group {
          margin-bottom: 20px;
        }

        .input-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #124441;
          font-size: 14px;
        }

        .input-group input,
        .input-group select,
        .input-group textarea {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid #E0F2F1;
          border-radius: 8px;
          font-size: 14px;
          box-sizing: border-box;
          outline: none;
          transition: all 0.2s ease;
          color: #124441;
          background-color: #FAFAFA;
          font-family: 'Inter', sans-serif;
        }

        /* Date input specific styling */
        .input-group input[type="date"] {
          position: relative;
        }

        .input-group input[type="date"]::-webkit-calendar-picker-indicator {
          background: transparent;
          bottom: 0;
          color: transparent;
          cursor: pointer;
          height: auto;
          left: 0;
          position: absolute;
          right: 0;
          top: 0;
          width: auto;
        }

        .input-group input[type="date"]::after {
          content: "📅";
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: #4F6F6B;
          pointer-events: none;
        }

        /* Number input specific styling */
        .input-group input[type="number"]::-webkit-inner-spin-button,
        .input-group input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        .input-group input[type="number"] {
          -moz-appearance: textfield;
        }

        .password-input-wrapper {
          position: relative;
        }

        .password-input-wrapper input {
          padding-right: 50px !important;
        }

        .password-toggle {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #4F6F6B;
          padding: 4px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          transition: all 0.2s ease;
          z-index: 2;
        }

        .password-toggle:hover:not(:disabled) {
          background-color: #E0F2F1;
          color: #009688;
          transform: translateY(-50%) scale(1.1);
        }

        .password-toggle:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: translateY(-50%);
        }

        .input-group input:focus,
        .input-group select:focus,
        .input-group textarea:focus {
          border-color: #009688;
          box-shadow: 0 0 0 3px rgba(0, 150, 136, 0.1);
          background-color: #FFFFFF;
        }

        .input-group input.error,
        .input-group select.error,
        .input-group textarea.error {
          border-color: #F44336;
        }

        .input-group input:disabled,
        .input-group select:disabled,
        .input-group textarea:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          background-color: #F5F5F5;
        }

        .error-message {
          color: #F44336;
          font-size: 12px;
          margin-top: 5px;
          display: block;
          font-weight: 500;
          padding: 4px 8px;
          background-color: rgba(244, 67, 54, 0.1);
          border-radius: 4px;
          border-left: 3px solid #F44336;
          animation: fadeIn 0.3s ease;
        }

        .error-message.duplicate-error {
          background-color: rgba(255, 152, 0, 0.1);
          border-left: 3px solid #FF9800;
          color: #FF9800;
        }

        .success-message {
          color: #4CAF50;
          font-size: 12px;
          margin-top: 5px;
          display: block;
          font-weight: 500;
          padding: 4px 8px;
          background-color: rgba(76, 175, 80, 0.1);
          border-radius: 4px;
          border-left: 3px solid #4CAF50;
        }

        .input-hint {
          color: #4F6F6B;
          font-size: 12px;
          margin-top: 4px;
          font-style: italic;
        }

        .terms-section {
          margin-top: 30px;
          padding: 20px;
          background-color: #F9F9F9;
          border-radius: 8px;
          border: 1px solid #E0F2F1;
        }

        .terms-checkbox {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          cursor: pointer;
          color: #124441;
          font-size: 14px;
          line-height: 1.5;
        }

        .terms-checkbox input {
          margin-top: 3px;
          accent-color: #009688;
        }

        .form-navigation {
          display: flex;
          justify-content: space-between;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #E0F2F1;
        }

        .nav-btn {
          padding: 12px 24px;
          border: 2px solid #009688;
          background-color: white;
          color: #009688;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .nav-btn:hover:not(:disabled) {
          background-color: #009688;
          color: white;
          transform: translateY(-2px);
        }

        .nav-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .next-btn {
          margin-left: auto;
        }

        .submit-btn {
          padding: 14px 30px;
          background-color: #009688;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
        }

        .submit-btn:hover:not(:disabled) {
          background-color: #00796B;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 150, 136, 0.4);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          animation: pulse 1.5s ease-in-out infinite;
          transform: none;
        }

        .login-section {
          margin-top: 30px;
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid #E0F2F1;
        }

        .login-section p {
          color: #4F6F6B;
          font-size: 14px;
          margin: 0;
        }

        .login-link {
          color: #009688;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          padding: 2px 6px;
          border-radius: 4px;
          text-decoration: none;
          display: inline-block;
        }

        .login-link:hover {
          color: #00796B;
          background-color: #E0F2F1;
          transform: translateY(-1px);
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.7; }
          100% { opacity: 1; }
        }

        /* Responsive Styles */
        @media (max-width: 1024px) {
          .main-card {
            max-width: 900px;
          }
          
          .progress-steps::before {
            left: 8%;
            right: 8%;
          }
        }

        @media (max-width: 768px) {
          .main-card {
            flex-direction: column;
            min-height: auto;
            margin-top: 80px;
            max-width: 500px;
          }

          .back-buttons {
            flex-direction: column;
            top: 10px;
            left: 10px;
          }

          .left-section {
            padding: 30px 20px;
            min-height: 300px;
          }

          .user-icon {
            font-size: 40px;
          }

          .user-title {
            font-size: 22px;
          }

          .user-quote {
            font-size: 14px;
          }

          .right-section {
            padding: 30px 20px;
          }

          .progress-steps {
            margin-bottom: 30px;
          }

          .step-circle {
            width: 35px;
            height: 35px;
            font-size: 14px;
          }

          .step-label {
            font-size: 10px;
          }

          .form-navigation {
            flex-direction: column;
            gap: 15px;
          }

          .nav-btn {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .left-section {
            padding: 20px 15px;
            min-height: 250px;
          }

          .right-section {
            padding: 20px 15px;
          }

          .app-title {
            font-size: 28px;
          }

          .signup-title {
            font-size: 20px;
          }
          
          .progress-steps::before {
            left: 12%;
            right: 12%;
          }
          
          .step-label {
            font-size: 9px;
            max-width: 60px;
          }
        }
      `}</style>
    </div>
  );
};

export default BaseSignup;





