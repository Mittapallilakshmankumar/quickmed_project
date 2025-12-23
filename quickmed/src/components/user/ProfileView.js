// import React, { useState, useEffect, useCallback } from 'react';
// import { useProfile } from './ProfileContext';

// const ProfileView = ({ setActiveView }) => {
//   // Get profile and functions from ProfileContext
//   const { profile, updateProfile, updateProfilePhoto, removeProfilePhoto } = useProfile();

//   const [localProfile, setLocalProfile] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     streetAddress: "",
//     apartment: "",
//     city: "",
//     state: "",
//     pincode: "",
//     district: "", // Add district field
//     country: "India",
//     dateOfBirth: "",
//     age: "",
//     gender: "",
//     profilePhoto: "",
//     emergencyContact: "",
//     linkedAccounts: []
//   });

//   const [localFormErrors, setLocalFormErrors] = useState({});
//   const [localIsFormValid, setLocalIsFormValid] = useState(false);
//   const [localIsFormTouched, setLocalIsFormTouched] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [saveStatus, setSaveStatus] = useState('');
//   const [hasChanges, setHasChanges] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [pincodeLoading, setPincodeLoading] = useState(false); // Add loading state for pincode lookup
//   const [pincodeData, setPincodeData] = useState(null); // Store pincode API response
  
//   // Modal states
//   const [showModal, setShowModal] = useState(false);
//   const [modalType, setModalType] = useState('');
//   const [modalTitle, setModalTitle] = useState('');
//   const [modalMessage, setModalMessage] = useState('');
//   const [modalAction, setModalAction] = useState(null);

//   // Store initial profile data to track changes
//   const [initialProfile, setInitialProfile] = useState(null);

//   // Scroll to top when component mounts
//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   }, []);

//   // Enhanced navigation handler
//   const handleBackToDashboard = () => {
//     setActiveView("dashboard");
//   };

//   // Modal Styles with new color scheme
//   const modalStyles = {
//     overlay: {
//       position: 'fixed',
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       backgroundColor: 'rgba(18, 68, 65, 0.8)',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       zIndex: 1000,
//       animation: 'fadeIn 0.3s ease-out'
//     },
//     modal: {
//       backgroundColor: '#FFFFFF',
//       padding: '2rem',
//       borderRadius: '12px',
//       maxWidth: '400px',
//       width: '90%',
//       textAlign: 'center',
//       boxShadow: '0 10px 30px rgba(18, 68, 65, 0.2)',
//       animation: 'slideUp 0.3s ease-out',
//       border: '1px solid #E0F2F1'
//     },
//     modalIcon: {
//       fontSize: '3rem',
//       marginBottom: '1rem'
//     },
//     modalTitle: {
//       color: '#009688',
//       fontSize: '1.5rem',
//       margin: '0 0 0.5rem 0',
//       fontWeight: '700'
//     },
//     modalMessage: {
//       color: '#4F6F6B',
//       fontSize: '1rem',
//       marginBottom: '1.5rem',
//       lineHeight: '1.5'
//     },
//     modalButtons: {
//       display: 'flex',
//       gap: '1rem',
//       justifyContent: 'center',
//       marginTop: '1rem'
//     },
//     primaryButton: {
//       padding: '0.75rem 2rem',
//       backgroundColor: '#009688',
//       color: '#FFFFFF',
//       border: 'none',
//       borderRadius: '8px',
//       cursor: 'pointer',
//       fontWeight: '600',
//       fontSize: '0.9rem',
//       transition: 'all 0.3s ease',
//       boxShadow: '0 2px 8px rgba(0, 150, 136, 0.3)',
//       minWidth: '120px'
//     },
//     secondaryButton: {
//       padding: '0.75rem 2rem',
//       backgroundColor: 'transparent',
//       color: '#009688',
//       border: '2px solid #009688',
//       borderRadius: '8px',
//       cursor: 'pointer',
//       fontWeight: '600',
//       fontSize: '0.9rem',
//       transition: 'all 0.3s ease',
//       minWidth: '120px'
//     },
//     warningButton: {
//       padding: '0.75rem 2rem',
//       backgroundColor: '#FF6B6B',
//       color: '#FFFFFF',
//       border: 'none',
//       borderRadius: '8px',
//       cursor: 'pointer',
//       fontWeight: '600',
//       fontSize: '0.9rem',
//       transition: 'all 0.3s ease',
//       boxShadow: '0 2px 8px rgba(255, 107, 107, 0.3)',
//       minWidth: '120px'
//     }
//   };

//   // Add CSS animation for success message and modal
//   useEffect(() => {
//     const style = document.createElement('style');
//     style.textContent = `
//       @keyframes slideDown {
//         from {
//           opacity: 0;
//           transform: translateY(-20px);
//         }
//         to {
//           opacity: 1;
//           transform: translateY(0);
//         }
//       }
//       @keyframes fadeIn {
//         from {
//           opacity: 0;
//         }
//         to {
//           opacity: 1;
//         }
//       }
//       @keyframes slideUp {
//         from {
//           opacity: 0;
//           transform: translateY(30px);
//         }
//         to {
//           opacity: 1;
//           transform: translateY(0);
//         }
//       }
//     `;
//     document.head.appendChild(style);

//     return () => {
//       document.head.removeChild(style);
//     };
//   }, []);

//   // Modal Functions
//   const showModalPopup = (type, title, message, action = null) => {
//     setModalType(type);
//     setModalTitle(title);
//     setModalMessage(message);
//     setModalAction(() => action);
//     setShowModal(true);
//   };

//   const hideModal = () => {
//     setShowModal(false);
//     setModalType('');
//     setModalTitle('');
//     setModalMessage('');
//     setModalAction(null);
//   };

//   // Get modal icon based on type
//   const getModalIcon = () => {
//     switch (modalType) {
//       case 'success':
//         return '✅';
//       case 'warning':
//         return '⚠️';
//       case 'error':
//         return '❌';
//       case 'info':
//         return 'ℹ️';
//       default:
//         return 'ℹ️';
//     }
//   };

//   // Get modal button style based on type
//   const getModalButtonStyle = (isPrimary = true) => {
//     switch (modalType) {
//       case 'warning':
//         return isPrimary ? modalStyles.warningButton : modalStyles.secondaryButton;
//       default:
//         return isPrimary ? modalStyles.primaryButton : modalStyles.secondaryButton;
//     }
//   };

//   // Helper function to check if two profiles are equal
//   const areProfilesEqual = (profile1, profile2) => {
//     if (!profile1 || !profile2) return false;
    
//     const fieldsToCompare = [
//       'firstName', 'lastName', 'email', 'phone', 'streetAddress',
//       'apartment', 'city', 'state', 'pincode', 'district', 'country',
//       'dateOfBirth', 'age', 'gender', 'emergencyContact', 'profilePhoto'
//     ];
    
//     return fieldsToCompare.every(field => {
//       const val1 = profile1[field] || '';
//       const val2 = profile2[field] || '';
//       return val1.toString().trim() === val2.toString().trim();
//     });
//   };

//   // Helper function to calculate age from DOB
//   const calculateAgeFromDOB = (dateOfBirth) => {
//     if (!dateOfBirth) return "";
    
//     const dob = new Date(dateOfBirth);
//     const today = new Date();
    
//     if (dob > today) return "0";
    
//     let age = today.getFullYear() - dob.getFullYear();
//     const monthDiff = today.getMonth() - dob.getMonth();
    
//     if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
//       age--;
//     }
    
//     return age > 0 ? age.toString() : "0";
//   };

//   // Function to fetch pincode details
//   const fetchPincodeDetails = async (pincode) => {
//     if (!pincode || pincode.length !== 6) {
//       return null;
//     }
    
//     try {
//       setPincodeLoading(true);
//       // Using a free pincode API
//       const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
//       const data = await response.json();
      
//       if (data && data[0] && data[0].Status === "Success") {
//         const postOffice = data[0].PostOffice[0];
//         return {
//           district: postOffice.District || '',
//           state: postOffice.State || '',
//           country: postOffice.Country || 'India'
//         };
//       }
//       return null;
//     } catch (error) {
//       console.error('Error fetching pincode details:', error);
//       return null;
//     } finally {
//       setPincodeLoading(false);
//     }
//   };

//   // Enhanced function to parse profile data
//   const parseProfileData = useCallback((profileData) => {
//     if (!profileData) return null;
    
//     console.log('Parsing profile data:', profileData);
    
//     // Parse fullName into firstName and lastName
//     const fullName = profileData.fullName || "";
//     const nameParts = fullName.trim().split(' ');
//     const firstName = nameParts[0] || "";
//     const lastName = nameParts.slice(1).join(' ') || "";
    
//     // Parse address into components
//     const address = profileData.address || "";
//     let streetAddress = "";
//     let apartment = "";
//     let city = profileData.city || "";
//     let state = profileData.state || "";
//     let pincode = profileData.pincode || "";
//     let district = profileData.district || "";
    
//     if (address.includes(',')) {
//       const addressParts = address.split(',');
//       streetAddress = addressParts[0] || "";
      
//       // Try to extract city, state, pincode from address if not already provided
//       if (!city && addressParts.length >= 3) {
//         city = addressParts[addressParts.length - 3]?.trim() || "";
//       }
//       if (!state && addressParts.length >= 2) {
//         state = addressParts[addressParts.length - 2]?.trim() || "";
//       }
//       if (!pincode && addressParts.length >= 1) {
//         pincode = addressParts[addressParts.length - 1]?.trim() || "";
//       }
      
//       // If we have more than 1 part, the rest might be apartment
//       if (addressParts.length > 1) {
//         apartment = addressParts.slice(1, -2).join(', ').trim() || "";
//       }
//     } else {
//       streetAddress = address;
//     }
    
//     const parsedProfile = {
//       firstName,
//       lastName,
//       email: profileData.email || "",
//       phone: profileData.phone || "",
//       streetAddress: streetAddress.trim(),
//       apartment: apartment.trim(),
//       city: city.trim(),
//       state: state.trim(),
//       pincode: pincode.trim(),
//       district: district.trim(), // Add district
//       country: profileData.country || "India",
//       dateOfBirth: profileData.dateOfBirth || "",
//       age: profileData.age || calculateAgeFromDOB(profileData.dateOfBirth),
//       gender: profileData.gender || "",
//       profilePhoto: profileData.profilePhoto || "",
//       emergencyContact: profileData.emergencyContact || "",
//       linkedAccounts: profileData.linkedAccounts || []
//     };
    
//     console.log('Parsed profile:', parsedProfile);
//     return parsedProfile;
//   }, []);

//   // Real-time profile sync from context - Enhanced to handle signup data
//   useEffect(() => {
//     console.log('Profile context updated:', profile);
    
//     if (!profile) {
//       setIsLoading(false);
//       return;
//     }
    
//     const parsedProfile = parseProfileData(profile);
    
//     if (parsedProfile) {
//       console.log('Setting local profile from parsed data:', parsedProfile);
      
//       // Only update if profile has changed
//       if (!areProfilesEqual(localProfile, parsedProfile)) {
//         setLocalProfile(parsedProfile);
//         setInitialProfile(parsedProfile);
//         setHasChanges(false);
//         setIsLoading(false);
//       }
//     } else {
//       setIsLoading(false);
//     }
//   }, [profile, parseProfileData]);

//   // Track changes in form
//   useEffect(() => {
//     if (initialProfile && !isLoading) {
//       const hasFormChanges = !areProfilesEqual(localProfile, initialProfile);
//       setHasChanges(hasFormChanges);
//     }
//   }, [localProfile, initialProfile, isLoading]);

//   // Real-time age calculation
//   useEffect(() => {
//     if (!localProfile.dateOfBirth || !isEditMode) return;

//     const calculatedAge = calculateAgeFromDOB(localProfile.dateOfBirth);
//     if (calculatedAge !== localProfile.age) {
//       setLocalProfile(prev => ({ ...prev, age: calculatedAge }));
//     }
//   }, [localProfile.dateOfBirth, localProfile.age, isEditMode]);

//   // Effect to fetch pincode details when pincode changes
//   useEffect(() => {
//     if (isEditMode && localProfile.pincode && localProfile.pincode.length === 6) {
//       const fetchPincode = async () => {
//         const pincodeData = await fetchPincodeDetails(localProfile.pincode);
//         if (pincodeData) {
//           // Auto-fill state and district based on pincode
//           setLocalProfile(prev => ({
//             ...prev,
//             state: pincodeData.state || prev.state,
//             district: pincodeData.district || prev.district,
//             country: pincodeData.country || prev.country
//           }));
//         }
//       };
      
//       // Debounce the API call
//       const timer = setTimeout(() => {
//         fetchPincode();
//       }, 1000);
      
//       return () => clearTimeout(timer);
//     }
//   }, [localProfile.pincode, isEditMode]);

//   // Enhanced validation that triggers on form submit
//   const validateLocalForm = useCallback((triggerAll = false) => {
//     const errors = {};

//     // Trigger validation for all fields on save
//     const shouldValidate = (field) => {
//       return triggerAll || localIsFormTouched || localProfile[field] !== '';
//     };

//     // First Name validation
//     if (!localProfile.firstName.trim()) {
//       errors.firstName = "First name is required";
//     } else if (localProfile.firstName.trim().length < 2) {
//       errors.firstName = "First name should be at least 2 characters long";
//     } else if (!/^[A-Za-z]{2,}$/.test(localProfile.firstName.trim())) {
//       errors.firstName = "First name should contain only letters";
//     }

//     // Last Name validation (optional)
//     if (localProfile.lastName && localProfile.lastName.trim() && !/^[A-Za-z\s]{0,}$/.test(localProfile.lastName.trim())) {
//       errors.lastName = "Last name should contain only letters";
//     }

//     // Email validation
//     if (!localProfile.email.trim()) {
//       errors.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(localProfile.email.trim())) {
//       errors.email = "Enter a valid email address";
//     }

//     // Phone validation
//     if (!localProfile.phone.trim()) {
//       errors.phone = "Phone number is required";
//     } else if (!/^[6-9]\d{9}$/.test(localProfile.phone.trim())) {
//       errors.phone = "Enter a valid 10-digit number starting with 6-9";
//     }

//     // Street Address validation
//     if (!localProfile.streetAddress.trim()) {
//       errors.streetAddress = "Street address is required";
//     } else if (localProfile.streetAddress.trim().length < 5) {
//       errors.streetAddress = "Street address should be at least 5 characters long";
//     }

//     // City validation - REMOVED: City is now optional
//     if (localProfile.city && localProfile.city.trim() && !/^[A-Za-z\s]{2,}$/.test(localProfile.city.trim())) {
//       errors.city = "City should contain only letters and be at least 2 characters";
//     }

//     // District validation (optional but recommended)
//     if (!localProfile.district.trim()) {
//       errors.district = "District is required (automatically fetched from pincode)";
//     } else if (!/^[A-Za-z\s]{2,}$/.test(localProfile.district.trim())) {
//       errors.district = "District should contain only letters and be at least 2 characters";
//     }

//     // State validation
//     if (!localProfile.state.trim()) {
//       errors.state = "State is required";
//     } else if (!/^[A-Za-z\s]{2,}$/.test(localProfile.state.trim())) {
//       errors.state = "State should contain only letters and be at least 2 characters";
//     }

//     // Pincode validation
//     if (!localProfile.pincode) {
//       errors.pincode = "Pincode is required";
//     } else if (!/^\d{6}$/.test(localProfile.pincode.trim())) {
//       errors.pincode = "Pincode must be exactly 6 digits";
//     } else if (pincodeLoading) {
//       errors.pincode = "Verifying pincode...";
//     } else if (!localProfile.district && !pincodeLoading) {
//       errors.pincode = "Enter a valid Indian pincode";
//     }

//     // Date of Birth validation - FIXED: Allow today's date
//     if (!localProfile.dateOfBirth) {
//       errors.dateOfBirth = "Date of birth is required";
//     } else {
//       const dob = new Date(localProfile.dateOfBirth);
//       const today = new Date();
      
//       // Set both to midnight for date-only comparison
//       const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
//       const dobMidnight = new Date(dob.getFullYear(), dob.getMonth(), dob.getDate());
      
//       if (dobMidnight > todayMidnight) {
//         errors.dateOfBirth = "Date of birth cannot be in the future";
//       }
//     }

//     // Age validation
//     if (!localProfile.age) {
//       errors.age = "Age is required";
//     } else if (parseInt(localProfile.age) <= 0) {
//       errors.age = "Age must be a positive number";
//     } else if (parseInt(localProfile.age) > 120) {
//       errors.age = "Please enter a valid age";
//     }

//     // Gender validation
//     if (!localProfile.gender) {
//       errors.gender = "Please select your gender";
//     }

//     // Emergency Contact validation (optional but if provided, validate)
//     if (localProfile.emergencyContact && localProfile.emergencyContact.trim() && !/^[6-9]\d{9}$/.test(localProfile.emergencyContact.trim())) {
//       errors.emergencyContact = "Enter a valid 10-digit number starting with 6-9";
//     }

//     setLocalFormErrors(errors);
//     const isValid = Object.keys(errors).length === 0;
//     setLocalIsFormValid(isValid);
    
//     return isValid;
//   }, [localProfile, localIsFormTouched, pincodeLoading]);

//   // Real-time validation on every change
//   useEffect(() => {
//     if (localIsFormTouched && isEditMode) {
//       validateLocalForm(false);
//     }
//   }, [localProfile, localIsFormTouched, validateLocalForm, isEditMode]);

//   // Real-time input handlers
//   const handleLocalProfileChange = (e) => {
//     if (!isEditMode) return;
    
//     const { name, value } = e.target;
//     let updatedValue = value;

//     // Real-time input formatting and validation
//     switch (name) {
//       case "firstName":
//       case "lastName":
//         updatedValue = value.replace(/[^A-Za-z\s]/g, "");
//         break;
//       case "city":
//       case "state":
//       case "country":
//       case "district":
//         updatedValue = value.replace(/[^A-Za-z\s]/g, "");
//         break;
//       case "pincode":
//         updatedValue = value.replace(/\D/g, "").slice(0, 6);
//         break;
//       case "phone":
//         updatedValue = value.replace(/\D/g, "").slice(0, 10);
//         break;
//       case "emergencyContact":
//         updatedValue = value.replace(/\D/g, "").slice(0, 10);
//         break;
//       default:
//         break;
//     }

//     setLocalProfile(prev => ({ ...prev, [name]: updatedValue }));
//     setLocalIsFormTouched(true);
    
//     // Clear save status when user starts typing
//     if (saveStatus) {
//       setSaveStatus('');
//     }
//   };

//   const handleLocalProfileBlur = (e) => {
//     if (!isEditMode) return;
    
//     const { name, value } = e.target;
    
//     // Auto-trim on blur
//     if (value && typeof value === 'string') {
//       const trimmedValue = value.trim();
//       if (trimmedValue !== value) {
//         setLocalProfile(prev => ({ ...prev, [name]: trimmedValue }));
//       }
//     }
    
//     // Trigger validation for this field
//     if (isEditMode) {
//       validateLocalForm(false);
//     }
//   };

//   // Real-time profile photo handling
//   const handlePhotoUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Real-time file validation
//     if (!file.type.startsWith('image/')) {
//       showModalPopup('error', 'Invalid File', 'Please select a valid image file (JPG, PNG, GIF, etc.)');
//       return;
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       showModalPopup('error', 'File Too Large', 'Image size should be less than 5MB');
//       return;
//     }

//     try {
//       setSaveStatus('🔄 Uploading photo...');
      
//       const imgURL = URL.createObjectURL(file);
      
//       // Update profile photo using context function
//       await updateProfilePhoto(imgURL);
      
//       // Update local state
//       setLocalProfile(prev => ({ ...prev, profilePhoto: imgURL }));
//       setHasChanges(true);
      
//       showModalPopup('success', 'Photo Updated', 'Your profile photo has been updated successfully!');
//       setSaveStatus('');
//     } catch (error) {
//       console.error('Error uploading photo:', error);
//       showModalPopup('error', 'Upload Failed', 'Error uploading photo. Please try again.');
//     }
//   };

//   const handleRemovePhoto = async () => {
//     try {
//       setSaveStatus('🔄 Removing photo...');
      
//       // Remove profile photo using context function
//       await removeProfilePhoto();
      
//       // Update local state
//       setLocalProfile(prev => ({ ...prev, profilePhoto: "" }));
//       setHasChanges(true);
      
//       showModalPopup('success', 'Photo Removed', 'Your profile photo has been removed successfully!');
//       setSaveStatus('');
//     } catch (error) {
//       console.error('Error removing photo:', error);
//       showModalPopup('error', 'Remove Failed', 'Error removing photo. Please try again.');
//     }
//   };

//   // Enhanced edit mode handler
//   const handleEditModeToggle = () => {
//     setIsEditMode(true);
//     // Mark all fields as touched to show validation errors
//     setLocalIsFormTouched(true);
//     // Trigger validation for all fields
//     validateLocalForm(true);
//   };

//   // Cancel Edit with modal confirmation
//   const handleCancelEditWithModal = () => {
//     if (hasChanges) {
//       showModalPopup(
//         'warning',
//         'Discard Changes?',
//         'You have unsaved changes. Are you sure you want to cancel?',
//         () => {
//           handleCancelEdit();
//           hideModal();
//         }
//       );
//     } else {
//       handleCancelEdit();
//     }
//   };

//   // Cancel Edit implementation
//   const handleCancelEdit = () => {
//     if (!profile) return;
    
//     const parsedProfile = parseProfileData(profile);
//     if (parsedProfile) {
//       setLocalProfile(parsedProfile);
//       setInitialProfile(parsedProfile);
//     }
    
//     setLocalFormErrors({});
//     setLocalIsFormTouched(false);
//     setHasChanges(false);
//     setIsEditMode(false);
//     setSaveStatus('');
//     setPincodeLoading(false);
//     setPincodeData(null);
//   };

//   // Real-time form submission - Enhanced to include all signup fields
//   const handleLocalProfileUpdate = async (e) => {
//     e.preventDefault();

//     if (!isEditMode) {
//       handleEditModeToggle();
//       return;
//     }

//     // Check if there are any actual changes
//     if (!hasChanges) {
//       showModalPopup(
//         'info',
//         'No Changes Detected',
//         'You haven\'t made any changes to save.',
//         () => {
//           setIsEditMode(false);
//           hideModal();
//         }
//       );
//       return;
//     }

//     // Final validation check with all fields
//     const isValid = validateLocalForm(true);
//     if (!isValid) {
//       showModalPopup(
//         'error',
//         'Validation Error',
//         'Please fix all validation errors before submitting.',
//         () => hideModal()
//       );
//       return;
//     }

//     setIsSubmitting(true);
//     setSaveStatus('🔄 Saving profile changes...');

//     try {
//       // Combine name fields
//       const fullName = `${localProfile.firstName} ${localProfile.lastName}`.trim();
      
//       // Combine address fields (include district)
//       const addressParts = [
//         localProfile.streetAddress,
//         localProfile.apartment,
//         localProfile.city, // City is optional now
//         localProfile.district, // Include district
//         localProfile.state,
//         localProfile.pincode
//       ].filter(part => part && part.trim());
      
//       const address = addressParts.join(', ');

//       // Create the updated profile data including all fields from signup
//       const updatedProfileData = {
//         fullName: fullName,
//         email: localProfile.email,
//         phone: localProfile.phone,
//         address: address,
//         city: localProfile.city || '', // City is optional
//         state: localProfile.state,
//         pincode: localProfile.pincode,
//         district: localProfile.district, // Add district
//         country: localProfile.country,
//         dateOfBirth: localProfile.dateOfBirth,
//         age: localProfile.age,
//         gender: localProfile.gender,
//         profilePhoto: localProfile.profilePhoto || '',
//         emergencyContact: localProfile.emergencyContact || '',
//         linkedAccounts: localProfile.linkedAccounts || [],
//         lastUpdated: new Date().toISOString()
//       };

//       console.log('Updating profile with data:', updatedProfileData);
      
//       // Call updateProfile from context - this will update both context and localStorage
//       await updateProfile(updatedProfileData);
      
//       // Update initial profile to current state
//       setInitialProfile(localProfile);
//       setHasChanges(false);
      
//       // Show success modal
//       showModalPopup(
//         'success',
//         'Profile Updated Successfully!',
//         'Your profile information has been saved successfully.',
//         () => {
//           setLocalIsFormTouched(false);
//           setIsEditMode(false);
//           hideModal();
//         }
//       );
      
//     } catch (error) {
//       console.error('Profile update error:', error);
//       showModalPopup(
//         'error',
//         'Update Failed',
//         'Error updating profile. Please try again.',
//         () => hideModal()
//       );
//     } finally {
//       setIsSubmitting(false);
//       setSaveStatus('');
//     }
//   };

//   // Helper function to get input styles
//   const getInputStyle = (fieldName) => {
//     const baseStyle = {
//       padding: '0.75rem',
//       border: '2px solid #E0F6F4',
//       borderRadius: '8px',
//       fontSize: '0.9rem',
//       transition: 'all 0.3s ease',
//       cursor: 'text',
//       fontFamily: 'inherit',
//       backgroundColor: '#FFFFFF',
//       color: '#124441'
//     };
//     const errorStyle = localFormErrors[fieldName] ? {
//       borderColor: '#FF6B6B !important',
//       backgroundColor: '#FFF5F5',
//     } : {};
//     const disabledStyle = !isEditMode ? {
//       backgroundColor: '#E0F6F4',
//       color: '#4F6F6B',
//       cursor: 'not-allowed',
//       borderColor: '#4DB6AC',
//     } : {};
//     const focusStyle = isEditMode ? {
//       borderColor: '#009688',
//       boxShadow: '0 0 0 2px rgba(0, 150, 136, 0.1)',
//       outline: 'none'
//     } : {};
//     const pincodeLoadingStyle = (fieldName === 'pincode' && pincodeLoading) ? {
//       borderColor: '#FF9800',
//       backgroundImage: 'linear-gradient(45deg, #FF9800 25%, transparent 25%, transparent 50%, #FF9800 50%, #FF9800 75%, transparent 75%, transparent)',
//       backgroundSize: '20px 20px',
//       animation: 'loadingBar 1s infinite linear',
//     } : {};
    
//     return {
//       ...baseStyle,
//       ...errorStyle,
//       ...disabledStyle,
//       ...focusStyle,
//       ...pincodeLoadingStyle,
//       cursor: !isEditMode ? 'not-allowed' : 'text'
//     };
//   };

//   // Check if profile is complete (updated to include district instead of required city)
//   const isProfileComplete = () => {
//     const requiredFields = ['firstName', 'email', 'phone', 'streetAddress', 'district', 'state', 'pincode', 'dateOfBirth', 'gender'];
//     return requiredFields.every(field => localProfile[field] && localProfile[field].trim());
//   };

//   // Get save status style
//   const getSaveStatusStyle = () => {
//     const baseStyle = {
//       textAlign: 'center',
//       padding: '0.75rem',
//       marginTop: '0.75rem',
//       borderRadius: '6px',
//       fontWeight: '500',
//       fontSize: '0.85rem',
//     };
    
//     if (saveStatus.includes('✅')) return { ...baseStyle, backgroundColor: '#E0F6F4', color: '#009688', border: '2px solid #4DB6AC' };
//     if (saveStatus.includes('❌')) return { ...baseStyle, backgroundColor: '#FFE5E5', color: '#FF6B6B', border: '2px solid #FF6B6B' };
//     if (saveStatus.includes('🔄')) return { ...baseStyle, backgroundColor: '#E0F6F4', color: '#009688', border: '2px solid #4DB6AC' };
//     return baseStyle;
//   };

//   // Add loading animation for pincode
//   useEffect(() => {
//     const style = document.createElement('style');
//     style.textContent = `
//       @keyframes loadingBar {
//         0% {
//           backgroundPosition: 0 0;
//         }
//         100% {
//           backgroundPosition: 20px 0;
//         }
//       }
//     `;
//     document.head.appendChild(style);

//     return () => {
//       document.head.removeChild(style);
//     };
//   }, []);

//   // Modal Component
//   const Modal = () => {
//     if (!showModal) return null;

//     return (
//       <div style={modalStyles.overlay} onClick={hideModal}>
//         <div style={modalStyles.modal} onClick={(e) => e.stopPropagation()}>
//           <div style={modalStyles.modalIcon}>{getModalIcon()}</div>
//           <h3 style={modalStyles.modalTitle}>{modalTitle}</h3>
//           <p style={modalStyles.modalMessage}>{modalMessage}</p>
//           <div style={modalStyles.modalButtons}>
//             {modalType === 'warning' ? (
//               <>
//                 <button
//                   style={getModalButtonStyle(true)}
//                   onClick={() => {
//                     if (modalAction) modalAction();
//                   }}
//                   onMouseEnter={(e) => {
//                     e.target.style.backgroundColor = '#cc0000';
//                     e.target.style.transform = 'translateY(-1px)';
//                   }}
//                   onMouseLeave={(e) => {
//                     e.target.style.backgroundColor = '#FF6B6B';
//                     e.target.style.transform = 'translateY(0)';
//                   }}
//                 >
//                   Discard Changes
//                 </button>
//                 <button
//                   style={getModalButtonStyle(false)}
//                   onClick={hideModal}
//                   onMouseEnter={(e) => {
//                     e.target.style.backgroundColor = '#009688';
//                     e.target.style.color = '#FFFFFF';
//                   }}
//                   onMouseLeave={(e) => {
//                     e.target.style.backgroundColor = 'transparent';
//                     e.target.style.color = '#009688';
//                   }}
//                 >
//                   Continue Editing
//                 </button>
//               </>
//             ) : modalType === 'info' ? (
//               <>
//                 <button
//                   style={getModalButtonStyle(true)}
//                   onClick={() => {
//                     if (modalAction) {
//                       modalAction();
//                     } else {
//                       hideModal();
//                     }
//                   }}
//                   onMouseEnter={(e) => {
//                     e.target.style.backgroundColor = '#00796B';
//                     e.target.style.transform = 'translateY(-1px)';
//                   }}
//                   onMouseLeave={(e) => {
//                     e.target.style.backgroundColor = '#009688';
//                     e.target.style.transform = 'translateY(0)';
//                   }}
//                 >
//                   Continue
//                 </button>
//               </>
//             ) : (
//               <button
//                 style={getModalButtonStyle(true)}
//                 onClick={() => {
//                   if (modalAction) {
//                     modalAction();
//                   } else {
//                     hideModal();
//                   }
//                 }}
//                 onMouseEnter={(e) => {
//                   e.target.style.backgroundColor = '#00796B';
//                   e.target.style.transform = 'translateY(-1px)';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.backgroundColor = '#009688';
//                   e.target.style.transform = 'translateY(0)';
//                 }}
//               >
//                 {modalType === 'success' ? 'Continue' : 'OK'}
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Profile-specific styles with new color scheme
//   const styles = {
//     profileContainer: {
//       marginTop: '140px',
//       padding: '2rem 1rem 1rem 1rem',
//       maxWidth: '800px',
//       marginLeft: 'auto',
//       marginRight: 'auto',
//       minHeight: 'calc(100vh - 120px)',
//       backgroundColor: '#E0F6F4',
//       fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
//       position: 'relative',
//       zIndex: 1,
//     },
//     loadingContainer: {
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       minHeight: '400px',
//     },
//     loadingText: {
//       color: '#009688',
//       fontSize: '1.2rem',
//       fontWeight: '600',
//     },
//     pageHeader: {
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       gap: '2rem',
//       marginBottom: '2rem',
//       textAlign: 'center',
//       position: 'relative',
//     },
//     backButton: {
//       padding: '0.75rem 1.5rem',
//       backgroundColor: 'transparent',
//       marginTop: '1.5rem',
//       color: '#009688',
//       border: '2px solid #009688',
//       borderRadius: '8px',
//       cursor: 'pointer',
//       fontSize: '0.9rem',
//       fontWeight: '600',
//       transition: 'all 0.3s ease',
//       alignSelf: 'flex-start',
//       position: 'relative',
//       zIndex: 2,
//       marginBottom: '0.5rem',
//       minWidth: '180px',
//     },
//     headerContent: {
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       gap: '0.75rem',
//       width: '100%',
//     },
//     sectionTitle: {
//       color: '#124441',
//       fontSize: '2rem',
//       margin: 0,
//       fontWeight: '800',
//       background: 'linear-gradient(135deg, #009688, #4DB6AC)',
//       WebkitBackgroundClip: 'text',
//       WebkitTextFillColor: 'transparent',
//       backgroundClip: 'text',
//     },
//     profileStatus: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.75rem',
//     },
//     statusComplete: {
//       color: '#009688',
//       fontWeight: '700',
//       fontSize: '0.9rem',
//       padding: '0.5rem 1rem',
//       backgroundColor: '#E0F6F4',
//       borderRadius: '20px',
//       border: '2px solid #4DB6AC',
//     },
//     statusIncomplete: {
//       color: '#FF9800',
//       fontWeight: '700',
//       fontSize: '0.9rem',
//       padding: '0.5rem 1rem',
//       backgroundColor: '#FFF3E0',
//       borderRadius: '20px',
//       border: '2px solid #FF9800',
//     },
//     profilePhotoSection: {
//       backgroundColor: '#FFFFFF',
//       padding: '1.5rem',
//       borderRadius: '12px',
//       boxShadow: '0 4px 16px rgba(18, 68, 65, 0.1)',
//       marginBottom: '1.5rem',
//       textAlign: 'center',
//       border: '2px solid #E0F6F4',
//     },
//     profilePhotoContainer: {
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       gap: '1rem',
//     },
//     profilePhotoPreview: {
//       width: '120px',
//       height: '120px',
//       borderRadius: '50%',
//       backgroundColor: '#E0F6F4',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       overflow: 'hidden',
//       border: '3px solid #009688',
//       boxShadow: '0 2px 8px rgba(0, 150, 136, 0.3)',
//       position: 'relative',
//     },
//     profilePhotoImage: {
//       width: '100%',
//       height: '100%',
//       objectFit: 'cover',
//     },
//     profilePhotoPlaceholder: {
//       fontSize: '3rem',
//       color: '#009688',
//       fontWeight: 'bold',
//     },
//     profilePhotoActions: {
//       display: 'flex',
//       gap: '0.75rem',
//       flexWrap: 'wrap',
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     uploadPhotoButton: {
//       padding: '0.75rem 1.5rem',
//       backgroundColor: '#4DB6AC',
//       color: '#FFFFFF',
//       border: 'none',
//       borderRadius: '8px',
//       cursor: 'pointer',
//       fontWeight: '600',
//       fontSize: '0.9rem',
//       transition: 'all 0.3s ease',
//       display: 'inline-flex',
//       alignItems: 'center',
//       gap: '0.5rem',
//       boxShadow: '0 2px 8px rgba(77, 182, 172, 0.3)',
//     },
//     removePhotoButton: {
//       padding: '0.75rem 1.5rem',
//       backgroundColor: '#FF6B6B',
//       color: '#FFFFFF',
//       border: 'none',
//       borderRadius: '8px',
//       cursor: 'pointer',
//       fontWeight: '600',
//       fontSize: '0.9rem',
//       transition: 'all 0.3s ease',
//       boxShadow: '0 2px 8px rgba(255, 107, 107, 0.3)',
//     },
//     editProfileButton: {
//       padding: '0.75rem 2rem',
//       backgroundColor: '#009688',
//       color: '#FFFFFF',
//       border: 'none',
//       borderRadius: '8px',
//       cursor: 'pointer',
//       fontWeight: '600',
//       fontSize: '0.9rem',
//       transition: 'all 0.3s ease',
//       display: 'inline-flex',
//       alignItems: 'center',
//       gap: '0.5rem',
//       boxShadow: '0 2px 8px rgba(0, 150, 136, 0.3)',
//       minWidth: '160px',
//     },
//     profileForm: {
//       backgroundColor: '#FFFFFF',
//       padding: '1.5rem',
//       borderRadius: '12px',
//       boxShadow: '0 4px 16px rgba(18, 68, 65, 0.1)',
//       border: '2px solid #E0F6F4',
//     },
//     formGrid: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
//       gap: '1rem',
//       marginBottom: '1.5rem',
//     },
//     formGroup: {
//       display: 'flex',
//       flexDirection: 'column',
//     },
//     formLabel: {
//       marginBottom: '0.5rem',
//       color: '#124441',
//       fontWeight: '600',
//       fontSize: '0.9rem',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.25rem',
//     },
//     requiredMarker: {
//       color: '#FF6B6B',
//       fontSize: '1rem',
//     },
//     formError: {
//       color: '#FF6B6B',
//       fontSize: '0.8rem',
//       marginTop: '0.25rem',
//       fontWeight: '500',
//     },
//     formTextarea: {
//       padding: '0.75rem',
//       border: '2px solid #E0F6F4',
//       borderRadius: '8px',
//       fontSize: '0.9rem',
//       resize: 'vertical',
//       minHeight: '80px',
//       fontFamily: 'inherit',
//       cursor: 'text',
//       backgroundColor: '#FFFFFF',
//       color: '#124441',
//     },
//     fieldNote: {
//       color: '#4F6F6B',
//       fontSize: '0.8rem',
//       marginTop: '0.25rem',
//       fontStyle: 'italic',
//     },
//     phoneInputContainer: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.5rem',
//       width: '100%',
//     },
//     phonePrefix: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.5rem',
//       padding: '0.75rem 1rem',
//       backgroundColor: '#E0F6F4',
//       borderRadius: '8px',
//       fontWeight: '600',
//       color: '#009688',
//       fontSize: '0.9rem',
//       border: '2px solid #4DB6AC',
//       minWidth: '100px',
//       justifyContent: 'center',
//       flexShrink: 0,
//     },
//     actionButtons: {
//       display: 'flex',
//       gap: '0.75rem',
//       justifyContent: 'center',
//       marginTop: '1.5rem',
//       paddingTop: '1.5rem',
//       borderTop: '2px solid #E0F6F4',
//     },
//     updateButton: {
//       padding: '0.75rem 2rem',
//       backgroundColor: '#009688',
//       color: '#FFFFFF',
//       border: 'none',
//       borderRadius: '8px',
//       cursor: 'pointer',
//       fontWeight: '600',
//       fontSize: '0.9rem',
//       transition: 'all 0.3s ease',
//       boxShadow: '0 2px 8px rgba(0, 150, 136, 0.3)',
//       minWidth: '160px',
//     },
//     updateButtonDisabled: {
//       backgroundColor: '#B2DFDB',
//       cursor: 'not-allowed',
//       boxShadow: 'none',
//       color: '#4F6F6B',
//     },
//     cancelButton: {
//       padding: '0.75rem 2rem',
//       backgroundColor: 'transparent',
//       color: '#009688',
//       border: '2px solid #009688',
//       borderRadius: '8px',
//       cursor: 'pointer',
//       fontWeight: '600',
//       fontSize: '0.9rem',
//       transition: 'all 0.3s ease',
//       minWidth: '120px',
//     },
//     validationSummary: {
//       backgroundColor: '#FFF5F5',
//       border: '2px solid #FF6B6B',
//       borderRadius: '8px',
//       padding: '1rem',
//       marginBottom: '1.5rem',
//     },
//     validationSummaryTitle: {
//       color: '#FF6B6B',
//       margin: '0 0 0.5rem 0',
//       fontSize: '1rem',
//       fontWeight: '600',
//     },
//     validationSummaryList: {
//       margin: 0,
//       paddingLeft: '1.5rem',
//     },
//     validationSummaryItem: {
//       color: '#D32F2F',
//       fontSize: '0.85rem',
//       marginBottom: '0.25rem',
//     },
//     autoFilledField: {
//       backgroundColor: '#F0FFF8',
//       borderColor: '#4CAF50',
//       borderStyle: 'dashed',
//     },
//   };

//   // Get validation summary
//   const getValidationSummary = () => {
//     const errorCount = Object.keys(localFormErrors).length;
//     if (errorCount === 0 || !localIsFormTouched) return null;

//     return (
//       <div style={styles.validationSummary}>
//         <h4 style={styles.validationSummaryTitle}>
//           ⚠️ Please fix {errorCount} error{errorCount !== 1 ? 's' : ''} before saving:
//         </h4>
//         <ul style={styles.validationSummaryList}>
//           {Object.entries(localFormErrors).map(([field, error]) => (
//             <li key={field} style={styles.validationSummaryItem}>
//               {error}
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   };

//   // Show loading state
//   if (isLoading) {
//     return (
//       <div style={styles.profileContainer}>
//         <div style={styles.loadingContainer}>
//           <div style={styles.loadingText}>Loading profile data...</div>
//         </div>
//       </div>
//     );
//   }

//   // Show empty state if no profile
//   if (!profile) {
//     return (
//       <div style={styles.profileContainer}>
//         <div style={styles.pageHeader}>
//           <button 
//             style={styles.backButton} 
//             onClick={handleBackToDashboard}
//             aria-label="Back to dashboard"
//             onMouseEnter={(e) => {
//               e.target.style.backgroundColor = '#009688';
//               e.target.style.color = '#FFFFFF';
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.backgroundColor = 'transparent';
//               e.target.style.color = '#009688';
//             }}
//           >
//             ← Back to Dashboard
//           </button>
//           <div style={styles.headerContent}>
//             <h2 style={styles.sectionTitle}>My Profile</h2>
//           </div>
//         </div>
//         <div style={styles.profileForm}>
//           <div style={{ textAlign: 'center', padding: '3rem' }}>
//             <h3 style={{ color: '#124441', marginBottom: '1rem' }}>No Profile Data Found</h3>
//             <p style={{ color: '#4F6F6B', marginBottom: '2rem' }}>
//               Please complete your signup to create a profile.
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Modal />
      
//       <div style={styles.profileContainer}>
//         {/* Compact Header */}
//         <div style={styles.pageHeader}>
//           <button 
//             style={styles.backButton} 
//             onClick={handleBackToDashboard}
//             aria-label="Back to dashboard"
//             onMouseEnter={(e) => {
//               e.target.style.backgroundColor = '#009688';
//               e.target.style.color = '#FFFFFF';
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.backgroundColor = 'transparent';
//               e.target.style.color = '#009688';
//             }}
//           >
//             ← Back to Dashboard
//           </button>
//           <div style={styles.headerContent}>
//             <h2 style={styles.sectionTitle}>My Profile</h2>
//             {!isEditMode && (
//               <div style={styles.profileStatus}>
//                 <span style={isProfileComplete() ? styles.statusComplete : styles.statusIncomplete}>
//                   {isProfileComplete() ? '✅ Profile Complete' : '⚠ Profile Incomplete'}
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Profile Photo Section - Compact */}
//         <div style={styles.profilePhotoSection}>
//           <div style={styles.profilePhotoContainer}>
//             <div style={styles.profilePhotoPreview}>
//               {localProfile.profilePhoto ? (
//                 <img
//                   src={localProfile.profilePhoto}
//                   alt="Profile"
//                   style={styles.profilePhotoImage}
//                   onError={(e) => {
//                     e.target.style.display = 'none';
//                     handleRemovePhoto();
//                   }}
//                 />
//               ) : (
//                 <div style={styles.profilePhotoPlaceholder}>
//                   {localProfile.firstName?.charAt(0).toUpperCase() || "👤"}
//                 </div>
//               )}
//             </div>

//             <div style={styles.profilePhotoActions}>
//               {!isEditMode ? (
//                 <button
//                   style={styles.editProfileButton}
//                   onClick={handleEditModeToggle}
//                   type="button"
//                   onMouseEnter={(e) => {
//                     e.target.style.backgroundColor = '#00796B';
//                     e.target.style.transform = 'translateY(-1px)';
//                   }}
//                   onMouseLeave={(e) => {
//                     e.target.style.backgroundColor = '#009688';
//                     e.target.style.transform = 'translateY(0)';
//                   }}
//                 >
//                   ✏️ Edit Profile
//                 </button>
//               ) : (
//                 <>
//                   <label style={styles.uploadPhotoButton}>
//                     📷 Update Photo
//                     <input
//                       type="file"
//                       accept="image/*"
//                       hidden
//                       onChange={handlePhotoUpload}
//                     />
//                   </label>

//                   {localProfile.profilePhoto && (
//                     <button
//                       style={styles.removePhotoButton}
//                       type="button"
//                       onClick={handleRemovePhoto}
//                       onMouseEnter={(e) => {
//                         e.target.style.backgroundColor = '#cc0000';
//                         e.target.style.transform = 'translateY(-1px)';
//                       }}
//                       onMouseLeave={(e) => {
//                         e.target.style.backgroundColor = '#FF6B6B';
//                         e.target.style.transform = 'translateY(0)';
//                       }}
//                     >
//                       Remove
//                     </button>
//                   )}
//                 </>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Validation Summary */}
//         {getValidationSummary()}

//         {/* Save Status Display */}
//         {saveStatus && (
//           <div style={getSaveStatusStyle()}>
//             {saveStatus}
//           </div>
//         )}

//         {/* Profile Form - Compact */}
//         <form onSubmit={handleLocalProfileUpdate} style={styles.profileForm}>
//           <div style={styles.formGrid}>
//             {/* Name Section */}
//             <div style={styles.formGroup}>
//               <label style={styles.formLabel}>
//                 First Name <span style={styles.requiredMarker}>*</span>
//               </label>
//               <input
//                 type="text"
//                 name="firstName"
//                 value={localProfile.firstName}
//                 onChange={handleLocalProfileChange}
//                 onBlur={handleLocalProfileBlur}
//                 placeholder="Enter your first name"
//                 style={getInputStyle("firstName")}
//                 disabled={!isEditMode}
//                 onFocus={(e) => e.target.style.borderColor = '#009688'}
//               />
//               {localFormErrors.firstName && (
//                 <span style={styles.formError}>{localFormErrors.firstName}</span>
//               )}
//             </div>

//             <div style={styles.formGroup}>
//               <label style={styles.formLabel}>Last Name</label>
//               <input
//                 type="text"
//                 name="lastName"
//                 value={localProfile.lastName}
//                 onChange={handleLocalProfileChange}
//                 onBlur={handleLocalProfileBlur}
//                 placeholder="Enter your last name"
//                 style={getInputStyle("lastName")}
//                 disabled={!isEditMode}
//                 onFocus={(e) => e.target.style.borderColor = '#009688'}
//               />
//               {localFormErrors.lastName && (
//                 <span style={styles.formError}>{localFormErrors.lastName}</span>
//               )}
//             </div>

//             {/* Contact Information */}
//             <div style={styles.formGroup}>
//               <label style={styles.formLabel}>
//                 Email <span style={styles.requiredMarker}>*</span>
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={localProfile.email}
//                 onChange={handleLocalProfileChange}
//                 onBlur={handleLocalProfileBlur}
//                 placeholder="Enter your email address"
//                 style={getInputStyle("email")}
//                 disabled={!isEditMode}
//                 onFocus={(e) => e.target.style.borderColor = '#009688'}
//               />
//               {localFormErrors.email && (
//                 <span style={styles.formError}>{localFormErrors.email}</span>
//               )}
//             </div>

//             {/* Phone Field - Extended container */}
//             <div style={styles.formGroup}>
//               <label style={styles.formLabel}>
//                 Phone <span style={styles.requiredMarker}>*</span>
//               </label>
//               <div style={styles.phoneInputContainer}>
//                 <div style={styles.phonePrefix}>🇮🇳 +91</div>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={localProfile.phone}
//                   onChange={handleLocalProfileChange}
//                   onBlur={handleLocalProfileBlur}
//                   style={getInputStyle("phone")}
//                   placeholder="10-digit mobile number"
//                   maxLength="10"
//                   disabled={!isEditMode}
//                   onFocus={(e) => e.target.style.borderColor = '#009688'}
//                 />
//               </div>
//               {localFormErrors.phone && (
//                 <span style={styles.formError}>{localFormErrors.phone}</span>
//               )}
//             </div>

//             {/* Emergency Contact */}
//             <div style={styles.formGroup}>
//               <label style={styles.formLabel}>Emergency Contact</label>
//               <div style={styles.phoneInputContainer}>
//                 <div style={styles.phonePrefix}>🇮🇳 +91</div>
//                 <input
//                   type="tel"
//                   name="emergencyContact"
//                   value={localProfile.emergencyContact}
//                   onChange={handleLocalProfileChange}
//                   onBlur={handleLocalProfileBlur}
//                   style={getInputStyle("emergencyContact")}
//                   placeholder="10-digit emergency number"
//                   maxLength="10"
//                   disabled={!isEditMode}
//                   onFocus={(e) => e.target.style.borderColor = '#009688'}
//                 />
//               </div>
//               {localFormErrors.emergencyContact && (
//                 <span style={styles.formError}>{localFormErrors.emergencyContact}</span>
//               )}
//               <p style={styles.fieldNote}>Optional - for emergency notifications</p>
//             </div>

//             {/* Personal Information */}
//             <div style={styles.formGroup}>
//               <label style={styles.formLabel}>
//                 Date of Birth <span style={styles.requiredMarker}>*</span>
//               </label>
//               <input
//                 type="date"
//                 name="dateOfBirth"
//                 value={localProfile.dateOfBirth}
//                 onChange={handleLocalProfileChange}
//                 style={getInputStyle("dateOfBirth")}
//                 disabled={!isEditMode}
//                 max={new Date().toISOString().split('T')[0]}
//                 onFocus={(e) => e.target.style.borderColor = '#009688'}
//               />
//               {localFormErrors.dateOfBirth && (
//                 <span style={styles.formError}>{localFormErrors.dateOfBirth}</span>
//               )}
//               <p style={styles.fieldNote}>Today's date is allowed</p>
//             </div>

//             {/* Age Field (Read-only) */}
//             <div style={styles.formGroup}>
//               <label style={styles.formLabel}>
//                 Age <span style={styles.requiredMarker}>*</span>
//               </label>
//               <input
//                 type="text"
//                 name="age"
//                 value={localProfile.age ? `${localProfile.age} years` : ""}
//                 readOnly
//                 style={getInputStyle("age")}
//               />
//               <p style={styles.fieldNote}>Automatically calculated from date of birth</p>
//               {localFormErrors.age && (
//                 <span style={styles.formError}>{localFormErrors.age}</span>
//               )}
//             </div>

//             {/* Gender Field */}
//             <div style={styles.formGroup}>
//               <label style={styles.formLabel}>
//                 Gender <span style={styles.requiredMarker}>*</span>
//               </label>
//               <select
//                 name="gender"
//                 value={localProfile.gender}
//                 onChange={handleLocalProfileChange}
//                 style={getInputStyle("gender")}
//                 disabled={!isEditMode}
//                 onFocus={(e) => e.target.style.borderColor = '#009688'}
//               >
//                 <option value="">Select Gender</option>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//                 <option value="other">Other</option>
//                 <option value="prefer-not-to-say">Prefer not to say</option>
//               </select>
//               {localFormErrors.gender && (
//                 <span style={styles.formError}>{localFormErrors.gender}</span>
//               )}
//             </div>

//             {/* Address Section */}
//             <div style={styles.formGroup}>
//               <label style={styles.formLabel}>
//                 Street Address <span style={styles.requiredMarker}>*</span>
//               </label>
//               <textarea
//                 name="streetAddress"
//                 rows="2"
//                 value={localProfile.streetAddress}
//                 onChange={handleLocalProfileChange}
//                 onBlur={handleLocalProfileBlur}
//                 style={getInputStyle("streetAddress")}
//                 disabled={!isEditMode}
//                 placeholder="House number, street name"
//                 onFocus={(e) => e.target.style.borderColor = '#009688'}
//               />
//               {localFormErrors.streetAddress && (
//                 <span style={styles.formError}>{localFormErrors.streetAddress}</span>
//               )}
//             </div>

//             <div style={styles.formGroup}>
//               <label style={styles.formLabel}>Apartment/Building (Optional)</label>
//               <input
//                 type="text"
//                 name="apartment"
//                 value={localProfile.apartment}
//                 onChange={handleLocalProfileChange}
//                 onBlur={handleLocalProfileBlur}
//                 placeholder="Apartment, suite, building"
//                 style={getInputStyle("apartment")}
//                 disabled={!isEditMode}
//                 onFocus={(e) => e.target.style.borderColor = '#009688'}
//               />
//             </div>

//             {/* City Field - Now Optional */}
//             <div style={styles.formGroup}>
//               <label style={styles.formLabel}>City (Optional)</label>
//               <input
//                 type="text"
//                 name="city"
//                 value={localProfile.city}
//                 onChange={handleLocalProfileChange}
//                 onBlur={handleLocalProfileBlur}
//                 placeholder="Enter your city (optional)"
//                 style={getInputStyle("city")}
//                 disabled={!isEditMode}
//                 onFocus={(e) => e.target.style.borderColor = '#009688'}
//               />
//               {localFormErrors.city && (
//                 <span style={styles.formError}>{localFormErrors.city}</span>
//               )}
//               <p style={styles.fieldNote}>Optional - District will be auto-filled from pincode</p>
//             </div>

//             {/* District Field - Auto-filled from pincode */}
//             <div style={styles.formGroup}>
//               <label style={styles.formLabel}>
//                 District <span style={styles.requiredMarker}>*</span>
//               </label>
//               <input
//                 type="text"
//                 name="district"
//                 value={localProfile.district}
//                 onChange={handleLocalProfileChange}
//                 onBlur={handleLocalProfileBlur}
//                 placeholder="District (auto-filled from pincode)"
//                 style={{
//                   ...getInputStyle("district"),
//                   ...(localProfile.district && !localFormErrors.district && styles.autoFilledField)
//                 }}
//                 disabled={!isEditMode}
//                 onFocus={(e) => e.target.style.borderColor = '#009688'}
//                 readOnly={!!localProfile.district && pincodeData}
//               />
//               {localFormErrors.district && (
//                 <span style={styles.formError}>{localFormErrors.district}</span>
//               )}
//               <p style={styles.fieldNote}>
//                 {pincodeLoading 
//                   ? "🔍 Looking up district from pincode..." 
//                   : localProfile.district 
//                     ? "✅ Auto-filled from pincode" 
//                     : "Enter pincode to auto-fill district"}
//               </p>
//             </div>

//             <div style={styles.formGroup}>
//               <label style={styles.formLabel}>
//                 State <span style={styles.requiredMarker}>*</span>
//               </label>
//               <input
//                 type="text"
//                 name="state"
//                 value={localProfile.state}
//                 onChange={handleLocalProfileChange}
//                 onBlur={handleLocalProfileBlur}
//                 placeholder="State"
//                 style={{
//                   ...getInputStyle("state"),
//                   ...(localProfile.state && !localFormErrors.state && localProfile.pincode && styles.autoFilledField)
//                 }}
//                 disabled={!isEditMode}
//                 onFocus={(e) => e.target.style.borderColor = '#009688'}
//                 readOnly={!!localProfile.state && pincodeData}
//               />
//               {localFormErrors.state && (
//                 <span style={styles.formError}>{localFormErrors.state}</span>
//               )}
//               <p style={styles.fieldNote}>
//                 {pincodeLoading 
//                   ? "🔍 Looking up state from pincode..." 
//                   : localProfile.state && localProfile.pincode
//                     ? "✅ Auto-filled from pincode" 
//                     : "Enter pincode to auto-fill state"}
//               </p>
//             </div>

//             <div style={styles.formGroup}>
//               <label style={styles.formLabel}>
//                 Pincode <span style={styles.requiredMarker}>*</span>
//               </label>
//               <input
//                 type="text"
//                 name="pincode"
//                 value={localProfile.pincode}
//                 onChange={handleLocalProfileChange}
//                 placeholder="6-digit pincode"
//                 maxLength="6"
//                 style={getInputStyle("pincode")}
//                 disabled={!isEditMode}
//                 onFocus={(e) => e.target.style.borderColor = '#009688'}
//               />
//               {localFormErrors.pincode && (
//                 <span style={styles.formError}>
//                   {localFormErrors.pincode}
//                   {pincodeLoading && " (Verifying...)"}
//                 </span>
//               )}
//               <p style={styles.fieldNote}>
//                 {pincodeLoading 
//                   ? "🔍 Verifying pincode and fetching district..." 
//                   : "Enter 6-digit Indian pincode to auto-fill district & state"}
//               </p>
//             </div>

//             <div style={styles.formGroup}>
//               <label style={styles.formLabel}>Country</label>
//               <input
//                 type="text"
//                 name="country"
//                 value={localProfile.country}
//                 onChange={handleLocalProfileChange}
//                 onBlur={handleLocalProfileBlur}
//                 placeholder="Enter your country"
//                 style={getInputStyle("country")}
//                 disabled={!isEditMode}
//                 onFocus={(e) => e.target.style.borderColor = '#009688'}
//               />
//               {localFormErrors.country && (
//                 <span style={styles.formError}>{localFormErrors.country}</span>
//               )}
//             </div>
//           </div>

//           {/* Linked Accounts Section (Read-only if exists) */}
//           {localProfile.linkedAccounts && localProfile.linkedAccounts.length > 0 && (
//             <div style={{
//               backgroundColor: '#E0F6F4',
//               padding: '1rem',
//               borderRadius: '8px',
//               marginBottom: '1.5rem'
//             }}>
//               <h4 style={{ color: '#124441', marginBottom: '0.5rem' }}>Linked Accounts</h4>
//               <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
//                 {localProfile.linkedAccounts.map((account, index) => (
//                   <span key={index} style={{
//                     backgroundColor: '#009688',
//                     color: 'white',
//                     padding: '0.25rem 0.75rem',
//                     borderRadius: '4px',
//                     fontSize: '0.85rem'
//                   }}>
//                     {account === 'guardian' ? '👨‍👩‍👧‍👦 Guardian' : '💑 Spouse'}
//                   </span>
//                 ))}
//               </div>
//               <p style={{ color: '#4F6F6B', fontSize: '0.85rem', marginTop: '0.5rem' }}>
//                 These accounts were set up during signup and can access your profile
//               </p>
//             </div>
//           )}

//           {/* Action Buttons - Compact */}
//           {isEditMode && (
//             <div style={styles.actionButtons}>
//               <button
//                 type="submit"
//                 style={{
//                   ...styles.updateButton,
//                   ...((!localIsFormValid || !hasChanges) && styles.updateButtonDisabled),
//                   ...(isSubmitting && styles.updateButtonDisabled)
//                 }}
//                 disabled={!localIsFormValid || !hasChanges || isSubmitting}
//                 onMouseEnter={(e) => {
//                   if (!isSubmitting && localIsFormValid && hasChanges) {
//                     e.target.style.backgroundColor = '#00796B';
//                     e.target.style.transform = 'translateY(-1px)';
//                   }
//                 }}
//                 onMouseLeave={(e) => {
//                   if (!isSubmitting && localIsFormValid && hasChanges) {
//                     e.target.style.backgroundColor = '#009688';
//                     e.target.style.transform = 'translateY(0)';
//                   }
//                 }}
//               >
//                 {isSubmitting ? "🔄 Saving..." : hasChanges ? "Save Changes" : "No Changes"}
//               </button>
//               <button
//                 type="button"
//                 style={styles.cancelButton}
//                 onClick={handleCancelEditWithModal}
//                 disabled={isSubmitting}
//                 onMouseEnter={(e) => {
//                   e.target.style.backgroundColor = '#009688';
//                   e.target.style.color = '#FFFFFF';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.backgroundColor = 'transparent';
//                   e.target.style.color = '#009688';
//                 }}
//               >
//                 Cancel
//               </button>
//             </div>
//           )}
//         </form>
//       </div>
//     </>
//   );
// };

// export default ProfileView;






// import React, { useState, useEffect, useCallback } from 'react';
// import { useProfile } from './ProfileContext';



// const ProfileView = ({ setActiveView }) => {
//   // Get profile and functions from ProfileContext
//   const { profile, updateProfile, updateProfilePhoto, removeProfilePhoto } = useProfile();

//   const [localProfile, setLocalProfile] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     streetAddress: "",
//     apartment: "",
//     city: "",
//     state: "",
//     pincode: "",
//     district: "", // Add district field
//     country: "India",
//     dateOfBirth: "",
//     age: "",
//     gender: "",
//     profilePhoto: "",
//     emergencyContact: "",
//     linkedAccounts: []
//   });
//   useEffect(() => {
//   if (!profile) return;

//   const nameParts = profile.fullName?.split(" ") || [];

//   setLocalProfile({
//     firstName: nameParts[0] || "",
//     lastName: nameParts.slice(1).join(" ") || "",
//     email: profile.email || "",
//     phone: profile.phone || "",
//     // phone: profile.phone || profile.emergencyContact || "",

//     // streetAddress: profile.address || "",
//     streetAddress: profile.deliveryAddress || "",
//     apartment: profile.apartment || "",
//     city: profile.city || "",
//     district: profile.district || "",
//     state: profile.state || "",
//     pincode: profile.pincode || "",
//     country: "India",
//     dateOfBirth: profile.dateOfBirth || "",
//     gender: profile.gender || "",
//     emergencyContact: profile.emergencyContact || "",
//   });
// }, [profile]);


//   const [localFormErrors, setLocalFormErrors] = useState({});
//   const [localIsFormValid, setLocalIsFormValid] = useState(false);
//   const [localIsFormTouched, setLocalIsFormTouched] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [photoPreview, setPhotoPreview] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [saveStatus, setSaveStatus] = useState('');
//   const [hasChanges, setHasChanges] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [pincodeLoading, setPincodeLoading] = useState(false); // Add loading state for pincode lookup
//   const [pincodeData, setPincodeData] = useState(null); // Store pincode API response
  
//   // Modal states
//   const [showModal, setShowModal] = useState(false);
//   const [modalType, setModalType] = useState('');
//   const [modalTitle, setModalTitle] = useState('');
//   const [modalMessage, setModalMessage] = useState('');
//   const [modalAction, setModalAction] = useState(null);

//   // Store initial profile data to track changes
//   const [initialProfile, setInitialProfile] = useState(null);

//   // Scroll to top when component mounts
//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   }, []);

//   // Enhanced navigation handler
//   const handleBackToDashboard = () => {
//     setActiveView("dashboard");
//   };

//   // Modal Styles with new color scheme
//   const modalStyles = {
//     overlay: {
//       position: 'fixed',
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       backgroundColor: 'rgba(18, 68, 65, 0.8)',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       zIndex: 1000,
//       animation: 'fadeIn 0.3s ease-out'
//     },
//     modal: {
//       backgroundColor: '#FFFFFF',
//       padding: '2rem',
//       borderRadius: '12px',
//       maxWidth: '400px',
//       width: '90%',
//       textAlign: 'center',
//       boxShadow: '0 10px 30px rgba(18, 68, 65, 0.2)',
//       animation: 'slideUp 0.3s ease-out',
//       border: '1px solid #E0F2F1'
//     },
//     modalIcon: {
//       fontSize: '3rem',
//       marginBottom: '1rem'
//     },
//     modalTitle: {
//       color: '#009688',
//       fontSize: '1.5rem',
//       margin: '0 0 0.5rem 0',
//       fontWeight: '700'
//     },
//     modalMessage: {
//       color: '#4F6F6B',
//       fontSize: '1rem',
//       marginBottom: '1.5rem',
//       lineHeight: '1.5'
//     },
//     modalButtons: {
//       display: 'flex',
//       gap: '1rem',
//       justifyContent: 'center',
//       marginTop: '1rem'
//     },
//     primaryButton: {
//       padding: '0.75rem 2rem',
//       backgroundColor: '#009688',
//       color: '#FFFFFF',
//       border: 'none',
//       borderRadius: '8px',
//       cursor: 'pointer',
//       fontWeight: '600',
//       fontSize: '0.9rem',
//       transition: 'all 0.3s ease',
//       boxShadow: '0 2px 8px rgba(0, 150, 136, 0.3)',
//       minWidth: '120px'
//     },
//     secondaryButton: {
//       padding: '0.75rem 2rem',
//       backgroundColor: 'transparent',
//       color: '#009688',
//       border: '2px solid #009688',
//       borderRadius: '8px',
//       cursor: 'pointer',
//       fontWeight: '600',
//       fontSize: '0.9rem',
//       transition: 'all 0.3s ease',
//       minWidth: '120px'
//     },
//     warningButton: {
//       padding: '0.75rem 2rem',
//       backgroundColor: '#FF6B6B',
//       color: '#FFFFFF',
//       border: 'none',
//       borderRadius: '8px',
//       cursor: 'pointer',
//       fontWeight: '600',
//       fontSize: '0.9rem',
//       transition: 'all 0.3s ease',
//       boxShadow: '0 2px 8px rgba(255, 107, 107, 0.3)',
//       minWidth: '120px'
//     }
//   };

//   // Add CSS animation for success message and modal
//   useEffect(() => {
//     const style = document.createElement('style');
//     style.textContent = `
//       @keyframes slideDown {
//         from {
//           opacity: 0;
//           transform: translateY(-20px);
//         }
//         to {
//           opacity: 1;
//           transform: translateY(0);
//         }
//       }
//       @keyframes fadeIn {
//         from {
//           opacity: 0;
//         }
//         to {
//           opacity: 1;
//         }
//       }
//       @keyframes slideUp {
//         from {
//           opacity: 0;
//           transform: translateY(30px);
//         }
//         to {
//           opacity: 1;
//           transform: translateY(0);
//         }
//       }
//     `;
//     document.head.appendChild(style);

//     return () => {
//       document.head.removeChild(style);
//     };
//   }, []);

//   // Modal Functions
//   const showModalPopup = (type, title, message, action = null) => {
//     setModalType(type);
//     setModalTitle(title);
//     setModalMessage(message);
//     setModalAction(() => action);
//     setShowModal(true);
//   };

//   const hideModal = () => {
//     setShowModal(false);
//     setModalType('');
//     setModalTitle('');
//     setModalMessage('');
//     setModalAction(null);
//   };

//   // Get modal icon based on type
//   const getModalIcon = () => {
//     switch (modalType) {
//       case 'success':
//         return '✅';
//       case 'warning':
//         return '⚠️';
//       case 'error':
//         return '❌';
//       case 'info':
//         return 'ℹ️';
//       default:
//         return 'ℹ️';
//     }
//   };

//   // Get modal button style based on type
//   const getModalButtonStyle = (isPrimary = true) => {
//     switch (modalType) {
//       case 'warning':
//         return isPrimary ? modalStyles.warningButton : modalStyles.secondaryButton;
//       default:
//         return isPrimary ? modalStyles.primaryButton : modalStyles.secondaryButton;
//     }
//   };

//   // Helper function to check if two profiles are equal
//   const areProfilesEqual = (profile1, profile2) => {
//     if (!profile1 || !profile2) return false;
    
//     const fieldsToCompare = [
//       'firstName', 'lastName', 'email', 'phone', 'streetAddress',
//       'apartment', 'city', 'state', 'pincode', 'district', 'country',
//       'dateOfBirth', 'age', 'gender', 'emergencyContact', 'profilePhoto'
//     ];
    
//     return fieldsToCompare.every(field => {
//       const val1 = profile1[field] || '';
//       const val2 = profile2[field] || '';
//       return val1.toString().trim() === val2.toString().trim();
//     });
//   };

//   // Helper function to calculate age from DOB
//   const calculateAgeFromDOB = (dateOfBirth) => {
//     if (!dateOfBirth) return "";
    
//     const dob = new Date(dateOfBirth);
//     const today = new Date();
    
//     if (dob > today) return "0";
    
//     let age = today.getFullYear() - dob.getFullYear();
//     const monthDiff = today.getMonth() - dob.getMonth();
    
//     if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
//       age--;
//     }
    
//     return age > 0 ? age.toString() : "0";
//   };

//   // Function to fetch pincode details
//   const fetchPincodeDetails = async (pincode) => {
//     if (!pincode || pincode.length !== 6) {
//       return null;
//     }
    
//     try {
//       setPincodeLoading(true);
//       // Using a free pincode API
//       const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
//       const data = await response.json();
      
//       if (data && data[0] && data[0].Status === "Success") {
//         const postOffice = data[0].PostOffice[0];
//         return {
//           district: postOffice.District || '',
//           state: postOffice.State || '',
//           country: postOffice.Country || 'India'
//         };
//       }
//       return null;
//     } catch (error) {
//       console.error('Error fetching pincode details:', error);
//       return null;
//     } finally {
//       setPincodeLoading(false);
//     }
//   };

// const parseProfileData = useCallback((profileData) => {
//   if (!profileData) return null;

//   console.log("Parsing profile data:", profileData);

//   // ✅ BACKEND SENDS camelCase
//   const fullName = profileData.fullName || "";
//   const nameParts = fullName.trim().split(" ");
//   const firstName = nameParts[0] || "";
//   const lastName = nameParts.slice(1).join(" ") || "";

//   // const address = profileData.deliveryAddress || "";
//   // const address = profileData.address || "";
//   const address = profileData.deliveryAddress || "";

//   return {
//     firstName,
//     lastName,
//     email: profileData.email || "",
//     phone: profileData.phone || "",

//     streetAddress: address,
//     apartment: "",
//     city: profileData.city || "",
//     state: profileData.state || "",
//     pincode: profileData.pincode || "",
//     district: "",

//     country: "India",
//     dateOfBirth: profileData.dateOfBirth || "",
//     age: profileData.dateOfBirth
//       ? calculateAgeFromDOB(profileData.dateOfBirth)
//       : "",
//     gender: profileData.gender || "",
//     emergencyContact: profileData.emergencyContact || "",
//     profilePhoto: profileData.profilePhoto || "",
//     linkedAccounts: [],
//   };
// }, []);


//   // Real-time profile sync from context - Enhanced to handle signup data
//   useEffect(() => {
//     console.log('Profile context updated:', profile);
    
//     if (!profile) {
//       setIsLoading(false);
//       return;
//     }
    
//     const parsedProfile = parseProfileData(profile);
    
//     if (parsedProfile) {
//       console.log('Setting local profile from parsed data:', parsedProfile);
      
//       // Only update if profile has changed
//       if (!areProfilesEqual(localProfile, parsedProfile)) {
//         setLocalProfile(parsedProfile);
//         setInitialProfile(parsedProfile);
//         setHasChanges(false);
//         setIsLoading(false);
//       }
//     } else {
//       setIsLoading(false);
//     }
//   }, [profile, parseProfileData]);

//   // Track changes in form
//   useEffect(() => {
//     if (initialProfile && !isLoading) {
//       const hasFormChanges = !areProfilesEqual(localProfile, initialProfile);
//       setHasChanges(hasFormChanges);
//     }
//   }, [localProfile, initialProfile, isLoading]);

//   // Real-time age calculation
//   useEffect(() => {
//     if (!localProfile.dateOfBirth || !isEditMode) return;

//     const calculatedAge = calculateAgeFromDOB(localProfile.dateOfBirth);
//     if (calculatedAge !== localProfile.age) {
//       setLocalProfile(prev => ({ ...prev, age: calculatedAge }));
//     }
//   }, [localProfile.dateOfBirth, localProfile.age, isEditMode]);

//   // Effect to fetch pincode details when pincode changes
//   useEffect(() => {
//     if (isEditMode && localProfile.pincode && localProfile.pincode.length === 6) {
//       const fetchPincode = async () => {
//         const pincodeData = await fetchPincodeDetails(localProfile.pincode);
//         if (pincodeData) {
//           // Auto-fill state and district based on pincode
//           setLocalProfile(prev => ({
//             ...prev,
//             state: pincodeData.state || prev.state,
//             district: pincodeData.district || prev.district,
//             country: pincodeData.country || prev.country
//           }));
//         }
//       };
      
//       // Debounce the API call
//       const timer = setTimeout(() => {
//         fetchPincode();
//       }, 1000);
      
//       return () => clearTimeout(timer);
//     }
//   }, [localProfile.pincode, isEditMode]);

//   // Enhanced validation that triggers on form submit
//   const validateLocalForm = useCallback((triggerAll = false) => {
//     const errors = {};

//     // Trigger validation for all fields on save
//     const shouldValidate = (field) => {
//       return triggerAll || localIsFormTouched || localProfile[field] !== '';
//     };

//     // First Name validation
//     if (!localProfile.firstName.trim()) {
//       errors.firstName = "First name is required";
//     } else if (localProfile.firstName.trim().length < 2) {
//       errors.firstName = "First name should be at least 2 characters long";
//     } else if (!/^[A-Za-z]{2,}$/.test(localProfile.firstName.trim())) {
//       errors.firstName = "First name should contain only letters";
//     }

//     // Last Name validation (optional)
//     if (localProfile.lastName && localProfile.lastName.trim() && !/^[A-Za-z\s]{0,}$/.test(localProfile.lastName.trim())) {
//       errors.lastName = "Last name should contain only letters";
//     }

//     // Email validation
//     if (!localProfile.email.trim()) {
//       errors.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(localProfile.email.trim())) {
//       errors.email = "Enter a valid email address";
//     }

//     // Phone validation
//     if (!localProfile.phone.trim()) {
//       errors.phone = "Phone number is required";
//     } else if (!/^[6-9]\d{9}$/.test(localProfile.phone.trim())) {
//       errors.phone = "Enter a valid 10-digit number starting with 6-9";
//     }

//     // Street Address validation
//     if (!localProfile.streetAddress.trim()) {
//       errors.streetAddress = "Street address is required";
//     } else if (localProfile.streetAddress.trim().length < 5) {
//       errors.streetAddress = "Street address should be at least 5 characters long";
//     }

//     // City validation - REMOVED: City is now optional
//     if (localProfile.city && localProfile.city.trim() && !/^[A-Za-z\s]{2,}$/.test(localProfile.city.trim())) {
//       errors.city = "City should contain only letters and be at least 2 characters";
//     }

//     // District validation (optional but recommended)
//     if (!localProfile.district.trim()) {
//       errors.district = "District is required (automatically fetched from pincode)";
//     } else if (!/^[A-Za-z\s]{2,}$/.test(localProfile.district.trim())) {
//       errors.district = "District should contain only letters and be at least 2 characters";
//     }

//     // State validation
//     if (!localProfile.state.trim()) {
//       errors.state = "State is required";
//     } else if (!/^[A-Za-z\s]{2,}$/.test(localProfile.state.trim())) {
//       errors.state = "State should contain only letters and be at least 2 characters";
//     }

//     // Pincode validation
//     if (!localProfile.pincode) {
//       errors.pincode = "Pincode is required";
//     } else if (!/^\d{6}$/.test(localProfile.pincode.trim())) {
//       errors.pincode = "Pincode must be exactly 6 digits";
//     } else if (pincodeLoading) {
//       errors.pincode = "Verifying pincode...";
//     } else if (!localProfile.district && !pincodeLoading) {
//       errors.pincode = "Enter a valid Indian pincode";
//     }

//     // Date of Birth validation - FIXED: Allow today's date
//     if (!localProfile.dateOfBirth) {
//       errors.dateOfBirth = "Date of birth is required";
//     } else {
//       const dob = new Date(localProfile.dateOfBirth);
//       const today = new Date();
      
//       // Set both to midnight for date-only comparison
//       const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
//       const dobMidnight = new Date(dob.getFullYear(), dob.getMonth(), dob.getDate());
      
//       if (dobMidnight > todayMidnight) {
//         errors.dateOfBirth = "Date of birth cannot be in the future";
//       }
//     }

//     // Age validation
//     if (!localProfile.age) {
//       errors.age = "Age is required";
//     } else if (parseInt(localProfile.age) <= 0) {
//       errors.age = "Age must be a positive number";
//     } else if (parseInt(localProfile.age) > 120) {
//       errors.age = "Please enter a valid age";
//     }

//     // Gender validation
//     if (!localProfile.gender) {
//       errors.gender = "Please select your gender";
//     }

//     // Emergency Contact validation (optional but if provided, validate)
//     if (localProfile.emergencyContact && localProfile.emergencyContact.trim() && !/^[6-9]\d{9}$/.test(localProfile.emergencyContact.trim())) {
//       errors.emergencyContact = "Enter a valid 10-digit number starting with 6-9";
//     }

//     setLocalFormErrors(errors);
//     const isValid = Object.keys(errors).length === 0;
//     setLocalIsFormValid(isValid);
    
//     return isValid;
//   }, [localProfile, localIsFormTouched, pincodeLoading]);

//   // Real-time validation on every change
//   useEffect(() => {
//     if (localIsFormTouched && isEditMode) {
//       validateLocalForm(false);
//     }
//   }, [localProfile, localIsFormTouched, validateLocalForm, isEditMode]);

//   // Real-time input handlers
//   const handleLocalProfileChange = (e) => {
//     if (!isEditMode) return;
    
//     const { name, value } = e.target;
//     let updatedValue = value;

//     // Real-time input formatting and validation
//     switch (name) {
//       case "firstName":
//       case "lastName":
//         updatedValue = value.replace(/[^A-Za-z\s]/g, "");
//         break;
//       case "city":
//       case "state":
//       case "country":
//       case "district":
//         updatedValue = value.replace(/[^A-Za-z\s]/g, "");
//         break;
//       case "pincode":
//         updatedValue = value.replace(/\D/g, "").slice(0, 6);
//         break;
//       case "phone":
//         updatedValue = value.replace(/\D/g, "").slice(0, 10);
//         break;
//       case "emergencyContact":
//         updatedValue = value.replace(/\D/g, "").slice(0, 10);
//         break;
//       default:
//         break;
//     }

//     setLocalProfile(prev => ({ ...prev, [name]: updatedValue }));
//     setLocalIsFormTouched(true);
    
//     // Clear save status when user starts typing
//     if (saveStatus) {
//       setSaveStatus('');
//     }
//   };

//   const handleLocalProfileBlur = (e) => {
//     if (!isEditMode) return;
    
//     const { name, value } = e.target;
    
//     // Auto-trim on blur
//     if (value && typeof value === 'string') {
//       const trimmedValue = value.trim();
//       if (trimmedValue !== value) {
//         setLocalProfile(prev => ({ ...prev, [name]: trimmedValue }));
//       }
//     }
    
//     // Trigger validation for this field
//     if (isEditMode) {
//       validateLocalForm(false);
//     }
//   };

//   // Real-time profile photo handling
//   const handlePhotoUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Real-time file validation
//     if (!file.type.startsWith('image/')) {
//       showModalPopup('error', 'Invalid File', 'Please select a valid image file (JPG, PNG, GIF, etc.)');
//       return;
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       showModalPopup('error', 'File Too Large', 'Image size should be less than 5MB');
//       return;
//     }

//     try {
//       setSaveStatus('🔄 Uploading photo...');
      
//       // const imgURL = URL.createObjectURL(file);
      
//       // Update profile photo using context function
//       // await updateProfilePhoto(imgURL);
      
//       // // Update local state
//       // setLocalProfile(prev => ({ ...prev, profilePhoto: imgURL }));
//       setLocalProfile(prev => ({
//     ...prev,
//     profilePhoto: file
//   }));
//      // create preview for UI
//   const previewUrl = URL.createObjectURL(file);
//   setPhotoPreview(previewUrl);
//       setHasChanges(true);
      
//       showModalPopup('success', 'Photo Updated', 'Your profile photo has been updated successfully!');
//       setSaveStatus('');
//     } catch (error) {
//       console.error('Error uploading photo:', error);
//       showModalPopup('error', 'Upload Failed', 'Error uploading photo. Please try again.');
//     }
//   };

//   const handleRemovePhoto = async () => {
//     try {
//       setSaveStatus('🔄 Removing photo...');
      
//       // Remove profile photo using context function
//       await removeProfilePhoto();
      
//       // Update local state
//       setLocalProfile(prev => ({ ...prev, profilePhoto: "" }));
//       setHasChanges(true);
      
//       showModalPopup('success', 'Photo Removed', 'Your profile photo has been removed successfully!');
//       setSaveStatus('');
//     } catch (error) {
//       console.error('Error removing photo:', error);
//       showModalPopup('error', 'Remove Failed', 'Error removing photo. Please try again.');
//     }
//   };

//   // Enhanced edit mode handler
//   const handleEditModeToggle = () => {
//     setIsEditMode(true);
//     // Mark all fields as touched to show validation errors
//     setLocalIsFormTouched(true);
//     // Trigger validation for all fields
//     validateLocalForm(true);
//   };

//   // Cancel Edit with modal confirmation
//   const handleCancelEditWithModal = () => {
//     if (hasChanges) {
//       showModalPopup(
//         'warning',
//         'Discard Changes?',
//         'You have unsaved changes. Are you sure you want to cancel?',
//         () => {
//           handleCancelEdit();
//           hideModal();
//         }
//       );
//     } else {
//       handleCancelEdit();
//     }
//   };

//   // Cancel Edit implementation
//   const handleCancelEdit = () => {
//     if (!profile) return;
    
//     const parsedProfile = parseProfileData(profile);
//     if (parsedProfile) {
//       setLocalProfile(parsedProfile);
//       setInitialProfile(parsedProfile);
//     }
    
//     setLocalFormErrors({});
//     setLocalIsFormTouched(false);
//     setHasChanges(false);
//     setIsEditMode(false);
//     setSaveStatus('');
//     setPincodeLoading(false);
//     setPincodeData(null);
//   };

//   // Real-time form submission - Enhanced to include all signup fields
//   const handleLocalProfileUpdate = async (e) => {
//     e.preventDefault();

//     if (!isEditMode) {
//       handleEditModeToggle();
//       return;
//     }

//     // Check if there are any actual changes
//     if (!hasChanges) {
//       showModalPopup(
//         'info',
//         'No Changes Detected',
//         'You haven\'t made any changes to save.',
//         () => {
//           setIsEditMode(false);
//           hideModal();
//         }
//       );
//       return;
//     }

//     // Final validation check with all fields
//     const isValid = validateLocalForm(true);
//     if (!isValid) {
//       showModalPopup(
//         'error',
//         'Validation Error',
//         'Please fix all validation errors before submitting.',
//         () => hideModal()
//       );
//       return;
//     }

//     setIsSubmitting(true);
//     setSaveStatus('🔄 Saving profile changes...');

//     try {
//       // Combine name fields
//       const fullName = `${localProfile.firstName} ${localProfile.lastName}`.trim();
      
//       // Combine address fields (include district)
//       const addressParts = [
//         localProfile.streetAddress,
//         localProfile.apartment,
//         localProfile.city, // City is optional now
//         localProfile.district, // Include district
//         localProfile.state,
//         localProfile.pincode
//       ].filter(part => part && part.trim());
      
//       const address = addressParts.join(', ');

//       // Create the updated profile data including all fields from signup
//       const updatedProfileData = {
//         fullName: fullName,
//         // email: localProfile.email,
//         // phone: localProfile.phone,
//         address: address,
//         city: localProfile.city || '', // City is optional
//         state: localProfile.state,
//         pincode: localProfile.pincode,
//         district: localProfile.district, // Add district
//         country: localProfile.country,
//         dateOfBirth: localProfile.dateOfBirth,
//         age: localProfile.age,
//         gender: localProfile.gender,
//         apartment: localProfile.apartment,
//         lastName: localProfile.lastName, 
  
//         emergencyContact: localProfile.emergencyContact || '',
//         linkedAccounts: localProfile.linkedAccounts || [],
//          profilePhoto: localProfile.profilePhoto,
//         lastUpdated: new Date().toISOString()
//       };

//       console.log('Updating profile with data:', updatedProfileData);
      
//       // Call updateProfile from context - this will update both context and localStorage
//       await updateProfile(updatedProfileData);
      
//       // Update initial profile to current state
//       setInitialProfile(localProfile);
//       setHasChanges(false);
      
//       // Show success modal
//       showModalPopup(
//         'success',
//         'Profile Updated Successfully!',
//         'Your profile information has been saved successfully.',
//         () => {
//           setLocalIsFormTouched(false);
//           setIsEditMode(false);
//           hideModal();
//         }
//       );
      
//     } catch (error) {
//       console.error('Profile update error:', error);
//       showModalPopup(
//         'error',
//         'Update Failed',
//         'Error updating profile. Please try again.',
//         () => hideModal()
//       );
//     } finally {
//       setIsSubmitting(false);
//       setSaveStatus('');
//     }
//   };

//   // Helper function to get input styles
//   const getInputStyle = (fieldName) => {
//     const baseStyle = {
//       padding: '0.75rem',
//       border: '2px solid #E0F6F4',
//       borderRadius: '8px',
//       fontSize: '0.9rem',
//       transition: 'all 0.3s ease',
//       cursor: 'text',
//       fontFamily: 'inherit',
//       backgroundColor: '#FFFFFF',
//       color: '#124441'
//     };
//     const errorStyle = localFormErrors[fieldName] ? {
//       borderColor: '#FF6B6B !important',
//       backgroundColor: '#FFF5F5',
//     } : {};
//     const disabledStyle = !isEditMode ? {
//       backgroundColor: '#E0F6F4',
//       color: '#4F6F6B',
//       cursor: 'not-allowed',
//       borderColor: '#4DB6AC',
//     } : {};
//     const focusStyle = isEditMode ? {
//       borderColor: '#009688',
//       boxShadow: '0 0 0 2px rgba(0, 150, 136, 0.1)',
//       outline: 'none'
//     } : {};
//     const pincodeLoadingStyle = (fieldName === 'pincode' && pincodeLoading) ? {
//       borderColor: '#FF9800',
//       backgroundImage: 'linear-gradient(45deg, #FF9800 25%, transparent 25%, transparent 50%, #FF9800 50%, #FF9800 75%, transparent 75%, transparent)',
//       backgroundSize: '20px 20px',
//       animation: 'loadingBar 1s infinite linear',
//     } : {};
    
//     return {
//       ...baseStyle,
//       ...errorStyle,
//       ...disabledStyle,
//       ...focusStyle,
//       ...pincodeLoadingStyle,
//       cursor: !isEditMode ? 'not-allowed' : 'text'
//     };
//   };

//   // Check if profile is complete (updated to include district instead of required city)
//   const isProfileComplete = () => {
//     const requiredFields = ['firstName', 'email', 'phone', 'streetAddress', 'district', 'state', 'pincode', 'dateOfBirth', 'gender'];
//     return requiredFields.every(field => localProfile[field] && localProfile[field].trim());
//   };

//   // Get save status style
//   const getSaveStatusStyle = () => {
//     const baseStyle = {
//       textAlign: 'center',
//       padding: '0.75rem',
//       marginTop: '0.75rem',
//       borderRadius: '6px',
//       fontWeight: '500',
//       fontSize: '0.85rem',
//     };
    
//     if (saveStatus.includes('✅')) return { ...baseStyle, backgroundColor: '#E0F6F4', color: '#009688', border: '2px solid #4DB6AC' };
//     if (saveStatus.includes('❌')) return { ...baseStyle, backgroundColor: '#FFE5E5', color: '#FF6B6B', border: '2px solid #FF6B6B' };
//     if (saveStatus.includes('🔄')) return { ...baseStyle, backgroundColor: '#E0F6F4', color: '#009688', border: '2px solid #4DB6AC' };
//     return baseStyle;
//   };

//   // Add loading animation for pincode
//   useEffect(() => {
//     const style = document.createElement('style');
//     style.textContent = `
//       @keyframes loadingBar {
//         0% {
//           backgroundPosition: 0 0;
//         }
//         100% {
//           backgroundPosition: 20px 0;
//         }
//       }
//     `;
//     document.head.appendChild(style);

//     return () => {
//       document.head.removeChild(style);
//     };
//   }, []);

//   // Modal Component
//   const Modal = () => {
//     if (!showModal) return null;

//     return (
//       <div style={modalStyles.overlay} onClick={hideModal}>
//         <div style={modalStyles.modal} onClick={(e) => e.stopPropagation()}>
//           <div style={modalStyles.modalIcon}>{getModalIcon()}</div>
//           <h3 style={modalStyles.modalTitle}>{modalTitle}</h3>
//           <p style={modalStyles.modalMessage}>{modalMessage}</p>
//           <div style={modalStyles.modalButtons}>
//             {modalType === 'warning' ? (
//               <>
//                 <button
//                   style={getModalButtonStyle(true)}
//                   onClick={() => {
//                     if (modalAction) modalAction();
//                   }}
//                   onMouseEnter={(e) => {
//                     e.target.style.backgroundColor = '#cc0000';
//                     e.target.style.transform = 'translateY(-1px)';
//                   }}
//                   onMouseLeave={(e) => {
//                     e.target.style.backgroundColor = '#FF6B6B';
//                     e.target.style.transform = 'translateY(0)';
//                   }}
//                 >
//                   Discard Changes
//                 </button>
//                 <button
//                   style={getModalButtonStyle(false)}
//                   onClick={hideModal}
//                   onMouseEnter={(e) => {
//                     e.target.style.backgroundColor = '#009688';
//                     e.target.style.color = '#FFFFFF';
//                   }}
//                   onMouseLeave={(e) => {
//                     e.target.style.backgroundColor = 'transparent';
//                     e.target.style.color = '#009688';
//                   }}
//                 >
//                   Continue Editing
//                 </button>
//               </>
//             ) : modalType === 'info' ? (
//               <>
//                 <button
//                   style={getModalButtonStyle(true)}
//                   onClick={() => {
//                     if (modalAction) {
//                       modalAction();
//                     } else {
//                       hideModal();
//                     }
//                   }}
//                   onMouseEnter={(e) => {
//                     e.target.style.backgroundColor = '#00796B';
//                     e.target.style.transform = 'translateY(-1px)';
//                   }}
//                   onMouseLeave={(e) => {
//                     e.target.style.backgroundColor = '#009688';
//                     e.target.style.transform = 'translateY(0)';
//                   }}
//                 >
//                   Continue
//                 </button>
//               </>
//             ) : (
//               <button
//                 style={getModalButtonStyle(true)}
//                 onClick={() => {
//                   if (modalAction) {
//                     modalAction();
//                   } else {
//                     hideModal();
//                   }
//                 }}
//                 onMouseEnter={(e) => {
//                   e.target.style.backgroundColor = '#00796B';
//                   e.target.style.transform = 'translateY(-1px)';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.backgroundColor = '#009688';
//                   e.target.style.transform = 'translateY(0)';
//                 }}
//               >
//                 {modalType === 'success' ? 'Continue' : 'OK'}
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Profile-specific styles with new color scheme
//   const styles = {
//     profileContainer: {
//       marginTop: '140px',
//       padding: '2rem 1rem 1rem 1rem',
//       maxWidth: '800px',
//       marginLeft: 'auto',
//       marginRight: 'auto',
//       minHeight: 'calc(100vh - 120px)',
//       backgroundColor: '#E0F6F4',
//       fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
//       position: 'relative',
//       zIndex: 1,
//     },
//     loadingContainer: {
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       minHeight: '400px',
//     },
//     loadingText: {
//       color: '#009688',
//       fontSize: '1.2rem',
//       fontWeight: '600',
//     },
//     pageHeader: {
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       gap: '2rem',
//       marginBottom: '2rem',
//       textAlign: 'center',
//       position: 'relative',
//     },
//     backButton: {
//       padding: '0.75rem 1.5rem',
//       backgroundColor: 'transparent',
//       marginTop: '1.5rem',
//       color: '#009688',
//       border: '2px solid #009688',
//       borderRadius: '8px',
//       cursor: 'pointer',
//       fontSize: '0.9rem',
//       fontWeight: '600',
//       transition: 'all 0.3s ease',
//       alignSelf: 'flex-start',
//       position: 'relative',
//       zIndex: 2,
//       marginBottom: '0.5rem',
//       minWidth: '180px',
//     },
//     headerContent: {
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       gap: '0.75rem',
//       width: '100%',
//     },
//     sectionTitle: {
//       color: '#124441',
//       fontSize: '2rem',
//       margin: 0,
//       fontWeight: '800',
//       background: 'linear-gradient(135deg, #009688, #4DB6AC)',
//       WebkitBackgroundClip: 'text',
//       WebkitTextFillColor: 'transparent',
//       backgroundClip: 'text',
//     },
//     profileStatus: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.75rem',
//     },
//     statusComplete: {
//       color: '#009688',
//       fontWeight: '700',
//       fontSize: '0.9rem',
//       padding: '0.5rem 1rem',
//       backgroundColor: '#E0F6F4',
//       borderRadius: '20px',
//       border: '2px solid #4DB6AC',
//     },
//     statusIncomplete: {
//       color: '#FF9800',
//       fontWeight: '700',
//       fontSize: '0.9rem',
//       padding: '0.5rem 1rem',
//       backgroundColor: '#FFF3E0',
//       borderRadius: '20px',
//       border: '2px solid #FF9800',
//     },
//     profilePhotoSection: {
//       backgroundColor: '#FFFFFF',
//       padding: '1.5rem',
//       borderRadius: '12px',
//       boxShadow: '0 4px 16px rgba(18, 68, 65, 0.1)',
//       marginBottom: '1.5rem',
//       textAlign: 'center',
//       border: '2px solid #E0F6F4',
//     },
//     profilePhotoContainer: {
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       gap: '1rem',
//     },
//     profilePhotoPreview: {
//       width: '120px',
//       height: '120px',
//       borderRadius: '50%',
//       backgroundColor: '#E0F6F4',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       overflow: 'hidden',
//       border: '3px solid #009688',
//       boxShadow: '0 2px 8px rgba(0, 150, 136, 0.3)',
//       position: 'relative',
//     },
//     profilePhotoImage: {
//       width: '100%',
//       height: '100%',
//       objectFit: 'cover',
//     },
//     profilePhotoPlaceholder: {
//       fontSize: '3rem',
//       color: '#009688',
//       fontWeight: 'bold',
//     },
//     profilePhotoActions: {
//       display: 'flex',
//       gap: '0.75rem',
//       flexWrap: 'wrap',
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     uploadPhotoButton: {
//       padding: '0.75rem 1.5rem',
//       backgroundColor: '#4DB6AC',
//       color: '#FFFFFF',
//       border: 'none',
//       borderRadius: '8px',
//       cursor: 'pointer',
//       fontWeight: '600',
//       fontSize: '0.9rem',
//       transition: 'all 0.3s ease',
//       display: 'inline-flex',
//       alignItems: 'center',
//       gap: '0.5rem',
//       boxShadow: '0 2px 8px rgba(77, 182, 172, 0.3)',
//     },
//     removePhotoButton: {
//       padding: '0.75rem 1.5rem',
//       backgroundColor: '#FF6B6B',
//       color: '#FFFFFF',
//       border: 'none',
//       borderRadius: '8px',
//       cursor: 'pointer',
//       fontWeight: '600',
//       fontSize: '0.9rem',
//       transition: 'all 0.3s ease',
//       boxShadow: '0 2px 8px rgba(255, 107, 107, 0.3)',
//     },
//     editProfileButton: {
//       padding: '0.75rem 2rem',
//       backgroundColor: '#009688',
//       color: '#FFFFFF',
//       border: 'none',
//       borderRadius: '8px',
//       cursor: 'pointer',
//       fontWeight: '600',
//       fontSize: '0.9rem',
//       transition: 'all 0.3s ease',
//       display: 'inline-flex',
//       alignItems: 'center',
//       gap: '0.5rem',
//       boxShadow: '0 2px 8px rgba(0, 150, 136, 0.3)',
//       minWidth: '160px',
//     },
//     profileForm: {
//       backgroundColor: '#FFFFFF',
//       padding: '1.5rem',
//       borderRadius: '12px',
//       boxShadow: '0 4px 16px rgba(18, 68, 65, 0.1)',
//       border: '2px solid #E0F6F4',
//     },
//     formGrid: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
//       gap: '1rem',
//       marginBottom: '1.5rem',
//     },
//     formGroup: {
//       display: 'flex',
//       flexDirection: 'column',
//     },
//     formLabel: {
//       marginBottom: '0.5rem',
//       color: '#124441',
//       fontWeight: '600',
//       fontSize: '0.9rem',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.25rem',
//     },
//     requiredMarker: {
//       color: '#FF6B6B',
//       fontSize: '1rem',
//     },
//     formError: {
//       color: '#FF6B6B',
//       fontSize: '0.8rem',
//       marginTop: '0.25rem',
//       fontWeight: '500',
//     },
//     formTextarea: {
//       padding: '0.75rem',
//       border: '2px solid #E0F6F4',
//       borderRadius: '8px',
//       fontSize: '0.9rem',
//       resize: 'vertical',
//       minHeight: '80px',
//       fontFamily: 'inherit',
//       cursor: 'text',
//       backgroundColor: '#FFFFFF',
//       color: '#124441',
//     },
//     fieldNote: {
//       color: '#4F6F6B',
//       fontSize: '0.8rem',
//       marginTop: '0.25rem',
//       fontStyle: 'italic',
//     },
//     phoneInputContainer: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.5rem',
//       width: '100%',
//     },
//     phonePrefix: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.5rem',
//       padding: '0.75rem 1rem',
//       backgroundColor: '#E0F6F4',
//       borderRadius: '8px',
//       fontWeight: '600',
//       color: '#009688',
//       fontSize: '0.9rem',
//       border: '2px solid #4DB6AC',
//       minWidth: '100px',
//       justifyContent: 'center',
//       flexShrink: 0,
//     },
//     actionButtons: {
//       display: 'flex',
//       gap: '0.75rem',
//       justifyContent: 'center',
//       marginTop: '1.5rem',
//       paddingTop: '1.5rem',
//       borderTop: '2px solid #E0F6F4',
//     },
//     updateButton: {
//       padding: '0.75rem 2rem',
//       backgroundColor: '#009688',
//       color: '#FFFFFF',
//       border: 'none',
//       borderRadius: '8px',
//       cursor: 'pointer',
//       fontWeight: '600',
//       fontSize: '0.9rem',
//       transition: 'all 0.3s ease',
//       boxShadow: '0 2px 8px rgba(0, 150, 136, 0.3)',
//       minWidth: '160px',
//     },
//     updateButtonDisabled: {
//       backgroundColor: '#B2DFDB',
//       cursor: 'not-allowed',
//       boxShadow: 'none',
//       color: '#4F6F6B',
//     },
//     cancelButton: {
//       padding: '0.75rem 2rem',
//       backgroundColor: 'transparent',
//       color: '#009688',
//       border: '2px solid #009688',
//       borderRadius: '8px',
//       cursor: 'pointer',
//       fontWeight: '600',
//       fontSize: '0.9rem',
//       transition: 'all 0.3s ease',
//       minWidth: '120px',
//     },
//     validationSummary: {
//       backgroundColor: '#FFF5F5',
//       border: '2px solid #FF6B6B',
//       borderRadius: '8px',
//       padding: '1rem',
//       marginBottom: '1.5rem',
//     },
//     validationSummaryTitle: {
//       color: '#FF6B6B',
//       margin: '0 0 0.5rem 0',
//       fontSize: '1rem',
//       fontWeight: '600',
//     },
//     validationSummaryList: {
//       margin: 0,
//       paddingLeft: '1.5rem',
//     },
//     validationSummaryItem: {
//       color: '#D32F2F',
//       fontSize: '0.85rem',
//       marginBottom: '0.25rem',
//     },
//     autoFilledField: {
//       backgroundColor: '#F0FFF8',
//       borderColor: '#4CAF50',
//       borderStyle: 'dashed',
//     },
//   };

//   // Get validation summary
//   const getValidationSummary = () => {
//     const errorCount = Object.keys(localFormErrors).length;
//     if (errorCount === 0 || !localIsFormTouched) return null;

//     return (
//       <div style={styles.validationSummary}>
//         <h4 style={styles.validationSummaryTitle}>
//           ⚠️ Please fix {errorCount} error{errorCount !== 1 ? 's' : ''} before saving:
//         </h4>
//         <ul style={styles.validationSummaryList}>
//           {Object.entries(localFormErrors).map(([field, error]) => (
//             <li key={field} style={styles.validationSummaryItem}>
//               {error}
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   };

//   // Show loading state
//   if (isLoading) {
//     return (
//       <div style={styles.profileContainer}>
//         <div style={styles.loadingContainer}>
//           <div style={styles.loadingText}>Loading profile data...</div>
//         </div>
//       </div>
//     );
//   }

//   // Show empty state if no profile
//   if (!profile) {
//     return (
//       <div style={styles.profileContainer}>
//         <div style={styles.pageHeader}>
//           <button 
//             style={styles.backButton} 
//             onClick={handleBackToDashboard}
//             aria-label="Back to dashboard"
//             onMouseEnter={(e) => {
//               e.target.style.backgroundColor = '#009688';
//               e.target.style.color = '#FFFFFF';
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.backgroundColor = 'transparent';
//               e.target.style.color = '#009688';
//             }}
//           >
//             ← Back to Dashboard
//           </button>
//           <div style={styles.headerContent}>
//             <h2 style={styles.sectionTitle}>My Profile</h2>
//           </div>
//         </div>
//         <div style={styles.profileForm}>
//           <div style={{ textAlign: 'center', padding: '3rem' }}>
//             <h3 style={{ color: '#124441', marginBottom: '1rem' }}>No Profile Data Found</h3>
//             <p style={{ color: '#4F6F6B', marginBottom: '2rem' }}>
//               Please complete your signup to create a profile.
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Modal />
      
//       <div style={styles.profileContainer}>
//         {/* Compact Header */}
//         <div style={styles.pageHeader}>
//           <button 
//             style={styles.backButton} 
//             onClick={handleBackToDashboard}
//             aria-label="Back to dashboard"
//             onMouseEnter={(e) => {
//               e.target.style.backgroundColor = '#009688';
//               e.target.style.color = '#FFFFFF';
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.backgroundColor = 'transparent';
//               e.target.style.color = '#009688';
//             }}
//           >
//             ← Back to Dashboard
//           </button>
//           <div style={styles.headerContent}>
//             <h2 style={styles.sectionTitle}>My Profile</h2>
//             {!isEditMode && (
//               <div style={styles.profileStatus}>
//                 <span style={isProfileComplete() ? styles.statusComplete : styles.statusIncomplete}>
//                   {isProfileComplete() ? '✅ Profile Complete' : '⚠ Profile Incomplete'}
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Profile Photo Section - Compact */}
//         <div style={styles.profilePhotoSection}>
//           <div style={styles.profilePhotoContainer}>
//             <div style={styles.profilePhotoPreview}>
//               {localProfile.profilePhoto ? (
                
// //  <img
// //   src={
// //     photoPreview
// //       ? photoPreview
// //       : localProfile.profilePhoto
// //         ? `http://127.0.0.1:8000${localProfile.profilePhoto}`
// //         : ""
// //   }
// //   alt="Profile"
// //   style={styles.profilePhotoImage}
// // />

// <img
//   src={
//     photoPreview
//       ? photoPreview
//       : localProfile.profilePhoto?.startsWith("http")
//         ? localProfile.profilePhoto
//         : localProfile.profilePhoto
//           ? `http://127.0.0.1:8000${localProfile.profilePhoto}`
//           : ""
//   }
//   alt="Profile"
//   style={styles.profilePhotoImage}
// />




//               ) : (
//                 <div style={styles.profilePhotoPlaceholder}>
//                   {localProfile.firstName?.charAt(0).toUpperCase() || "👤"}
//                 </div>
//               )}
//             </div>

//             <div style={styles.profilePhotoActions}>
//               {!isEditMode ? (
//                 <button
//                   style={styles.editProfileButton}
//                   onClick={handleEditModeToggle}
//                   type="button"
//                   onMouseEnter={(e) => {
//                     e.target.style.backgroundColor = '#00796B';
//                     e.target.style.transform = 'translateY(-1px)';
//                   }}
//                   onMouseLeave={(e) => {
//                     e.target.style.backgroundColor = '#009688';
//                     e.target.style.transform = 'translateY(0)';
//                   }}
//                 >
//                   ✏️ Edit Profile
//                 </button>
//               ) : (
//                 <>
//                   <label style={styles.uploadPhotoButton}>
//                     📷 Update Photo
//                     <input
//                       type="file"
//                       accept="image/*"
//                       hidden
//                       onChange={handlePhotoUpload}
//                     />
//                   </label>

//                   {localProfile.profilePhoto && (
//                     <button
//                       style={styles.removePhotoButton}
//                       type="button"
//                       onClick={handleRemovePhoto}
//                       onMouseEnter={(e) => {
//                         e.target.style.backgroundColor = '#cc0000';
//                         e.target.style.transform = 'translateY(-1px)';
//                       }}
//                       onMouseLeave={(e) => {
//                         e.target.style.backgroundColor = '#FF6B6B';
//                         e.target.style.transform = 'translateY(0)';
//                       }}
//                     >
//                       Remove
//                     </button>
//                   )}
//                 </>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Validation Summary */}
//         {getValidationSummary()}

//         {/* Save Status Display */}
//         {saveStatus && (
//           <div style={getSaveStatusStyle()}>
//             {saveStatus}
//           </div>
//         )}

//         {/* Profile Form - Compact */}
//         <form onSubmit={handleLocalProfileUpdate} style={styles.profileForm}>
//           <div style={styles.formGrid}>
//             {/* Name Section */}
//             <div style={styles.formGroup}>
//               <label style={styles.formLabel}>
//                 First Name <span style={styles.requiredMarker}>*</span>
//               </label>
//               <input
//                 type="text"
//                 name="firstName"
//                 value={localProfile.firstName}
//                 onChange={handleLocalProfileChange}
//                 onBlur={handleLocalProfileBlur}
//                 placeholder="Enter your first name"
//                 style={getInputStyle("firstName")}
//                 disabled={!isEditMode}
//                 onFocus={(e) => e.target.style.borderColor = '#009688'}
//               />
//               {localFormErrors.firstName && (
//                 <span style={styles.formError}>{localFormErrors.firstName}</span>
//               )}
//             </div>

//             <div style={styles.formGroup}>
//               <label style={styles.formLabel}>Last Name</label>
//               <input
//                 type="text"
//                 name="lastName"
//                 value={localProfile.lastName}
//                 onChange={handleLocalProfileChange}
//                 onBlur={handleLocalProfileBlur}
//                 placeholder="Enter your last name"
//                 style={getInputStyle("lastName")}
//                 disabled={!isEditMode}
//                 onFocus={(e) => e.target.style.borderColor = '#009688'}
//               />
//               {localFormErrors.lastName && (
//                 <span style={styles.formError}>{localFormErrors.lastName}</span>
//               )}
//             </div>

//             {/* Contact Information */}
//             <div style={styles.formGroup}>
//               <label style={styles.formLabel}>
//                 Email <span style={styles.requiredMarker}>*</span>
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={localProfile.email}
//                 onChange={handleLocalProfileChange}
//                 onBlur={handleLocalProfileBlur}
//                 placeholder="Enter your email address"
//                 style={getInputStyle("email")}
//                 disabled={!isEditMode}
//                 onFocus={(e) => e.target.style.borderColor = '#009688'}
//               />
//               {localFormErrors.email && (
//                 <span style={styles.formError}>{localFormErrors.email}</span>
//               )}
//             </div>

//             {/* Phone Field - Extended container */}
//             <div style={styles.formGroup}>
//               <label style={styles.formLabel}>
//                 Phone <span style={styles.requiredMarker}>*</span>
//               </label>
//               <div style={styles.phoneInputContainer}>
//                 <div style={styles.phonePrefix}>🇮🇳 +91</div>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={localProfile.phone}
//                   onChange={handleLocalProfileChange}
//                   onBlur={handleLocalProfileBlur}
//                   style={getInputStyle("phone")}
//                   placeholder="10-digit mobile number"
//                   maxLength="10"
//                   disabled={!isEditMode}

//                   onFocus={(e) => e.target.style.borderColor = '#009688'}
//                 />
//               </div>
//               {localFormErrors.phone && (
//                 <span style={styles.formError}>{localFormErrors.phone}</span>
//               )}
//             </div>

//             {/* Emergency Contact */}
//             <div style={styles.formGroup}>
//               <label style={styles.formLabel}>Emergency Contact</label>
//               <div style={styles.phoneInputContainer}>
//                 <div style={styles.phonePrefix}>🇮🇳 +91</div>
//                 <input
//                   type="tel"
//                   name="emergencyContact"
//                   value={localProfile.emergencyContact}
//                   onChange={handleLocalProfileChange}
//                   onBlur={handleLocalProfileBlur}
//                   style={getInputStyle("emergencyContact")}
//                   placeholder="10-digit emergency number"
//                   maxLength="10"
//                   disabled={!isEditMode}
//                   onFocus={(e) => e.target.style.borderColor = '#009688'}
//                 />
//               </div>
//               {localFormErrors.emergencyContact && (
//                 <span style={styles.formError}>{localFormErrors.emergencyContact}</span>
//               )}
//               <p style={styles.fieldNote}>Optional - for emergency notifications</p>
//             </div>

//             {/* Personal Information */}
//             <div style={styles.formGroup}>
//               <label style={styles.formLabel}>
//                 Date of Birth <span style={styles.requiredMarker}>*</span>
//               </label>
//               <input
//                 type="date"
//                 name="dateOfBirth"
//                 value={localProfile.dateOfBirth}
//                 onChange={handleLocalProfileChange}
//                 style={getInputStyle("dateOfBirth")}
//                 disabled={!isEditMode}
//                 max={new Date().toISOString().split('T')[0]}
//                 onFocus={(e) => e.target.style.borderColor = '#009688'}
//               />
//               {localFormErrors.dateOfBirth && (
//                 <span style={styles.formError}>{localFormErrors.dateOfBirth}</span>
//               )}
//               <p style={styles.fieldNote}>Today's date is allowed</p>
//             </div>

//             {/* Age Field (Read-only) */}
//             <div style={styles.formGroup}>
//               <label style={styles.formLabel}>
//                 Age <span style={styles.requiredMarker}>*</span>
//               </label>
//               <input
//                 type="text"
//                 name="age"
//                 value={localProfile.age ? `${localProfile.age} years` : ""}
//                 readOnly
//                 style={getInputStyle("age")}
//               />
//               <p style={styles.fieldNote}>Automatically calculated from date of birth</p>
//               {localFormErrors.age && (
//                 <span style={styles.formError}>{localFormErrors.age}</span>
//               )}
//             </div>

//             {/* Gender Field */}
//             <div style={styles.formGroup}>
//               <label style={styles.formLabel}>
//                 Gender <span style={styles.requiredMarker}>*</span>
//               </label>
//               <select
//                 name="gender"
//                 value={localProfile.gender}
//                 onChange={handleLocalProfileChange}
//                 style={getInputStyle("gender")}
//                 disabled={!isEditMode}
//                 onFocus={(e) => e.target.style.borderColor = '#009688'}
//               >
//                 <option value="">Select Gender</option>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//                 <option value="other">Other</option>
//                 <option value="prefer-not-to-say">Prefer not to say</option>
//               </select>
//               {localFormErrors.gender && (
//                 <span style={styles.formError}>{localFormErrors.gender}</span>
//               )}
//             </div>

//             {/* Address Section */}
//             <div style={styles.formGroup}>
//               <label style={styles.formLabel}>
//                 Street Address <span style={styles.requiredMarker}>*</span>
//               </label>
//               <textarea
//                 name="streetAddress"
//                 rows="2"
//                 value={localProfile.streetAddress}
//                 onChange={handleLocalProfileChange}
//                 onBlur={handleLocalProfileBlur}
//                 style={getInputStyle("streetAddress")}
//                 disabled={!isEditMode}
//                 placeholder="House number, street name"
//                 onFocus={(e) => e.target.style.borderColor = '#009688'}
//               />
//               {localFormErrors.streetAddress && (
//                 <span style={styles.formError}>{localFormErrors.streetAddress}</span>
//               )}
//             </div>

//             <div style={styles.formGroup}>
//               <label style={styles.formLabel}>Apartment/Building (Optional)</label>
//               <input
//                 type="text"
//                 name="apartment"
//                 value={localProfile.apartment}
//                 onChange={handleLocalProfileChange}
//                 onBlur={handleLocalProfileBlur}
//                 placeholder="Apartment, suite, building"
//                 style={getInputStyle("apartment")}
//                 disabled={!isEditMode}
//                 onFocus={(e) => e.target.style.borderColor = '#009688'}
//               />
//             </div>

//             {/* City Field - Now Optional */}
//             <div style={styles.formGroup}>
//               <label style={styles.formLabel}>City (Optional)</label>
//               <input
//                 type="text"
//                 name="city"
//                 value={localProfile.city}
//                 onChange={handleLocalProfileChange}
//                 onBlur={handleLocalProfileBlur}
//                 placeholder="Enter your city (optional)"
//                 style={getInputStyle("city")}
//                 disabled={!isEditMode}
//                 onFocus={(e) => e.target.style.borderColor = '#009688'}
//               />
//               {localFormErrors.city && (
//                 <span style={styles.formError}>{localFormErrors.city}</span>
//               )}
//               <p style={styles.fieldNote}>Optional - District will be auto-filled from pincode</p>
//             </div>

//             {/* District Field - Auto-filled from pincode */}
//             <div style={styles.formGroup}>
//               <label style={styles.formLabel}>
//                 District <span style={styles.requiredMarker}>*</span>
//               </label>
//               <input
//                 type="text"
//                 name="district"
//                 value={localProfile.district}
//                 onChange={handleLocalProfileChange}
//                 onBlur={handleLocalProfileBlur}
//                 placeholder="District (auto-filled from pincode)"
//                 style={{
//                   ...getInputStyle("district"),
//                   ...(localProfile.district && !localFormErrors.district && styles.autoFilledField)
//                 }}
//                 disabled={!isEditMode}
//                 onFocus={(e) => e.target.style.borderColor = '#009688'}
//                 readOnly={!!localProfile.district && pincodeData}
//               />
//               {localFormErrors.district && (
//                 <span style={styles.formError}>{localFormErrors.district}</span>
//               )}
//               <p style={styles.fieldNote}>
//                 {pincodeLoading 
//                   ? "🔍 Looking up district from pincode..." 
//                   : localProfile.district 
//                     ? "✅ Auto-filled from pincode" 
//                     : "Enter pincode to auto-fill district"}
//               </p>
//             </div>

//             <div style={styles.formGroup}>
//               <label style={styles.formLabel}>
//                 State <span style={styles.requiredMarker}>*</span>
//               </label>
//               <input
//                 type="text"
//                 name="state"
//                 value={localProfile.state}
//                 onChange={handleLocalProfileChange}
//                 onBlur={handleLocalProfileBlur}
//                 placeholder="State"
//                 style={{
//                   ...getInputStyle("state"),
//                   ...(localProfile.state && !localFormErrors.state && localProfile.pincode && styles.autoFilledField)
//                 }}
//                 disabled={!isEditMode}
//                 onFocus={(e) => e.target.style.borderColor = '#009688'}
//                 readOnly={!!localProfile.state && pincodeData}
//               />
//               {localFormErrors.state && (
//                 <span style={styles.formError}>{localFormErrors.state}</span>
//               )}
//               <p style={styles.fieldNote}>
//                 {pincodeLoading 
//                   ? "🔍 Looking up state from pincode..." 
//                   : localProfile.state && localProfile.pincode
//                     ? "✅ Auto-filled from pincode" 
//                     : "Enter pincode to auto-fill state"}
//               </p>
//             </div>

//             <div style={styles.formGroup}>
//               <label style={styles.formLabel}>
//                 Pincode <span style={styles.requiredMarker}>*</span>
//               </label>
//               <input
//                 type="text"
//                 name="pincode"
//                 value={localProfile.pincode}
//                 onChange={handleLocalProfileChange}
//                 placeholder="6-digit pincode"
//                 maxLength="6"
//                 style={getInputStyle("pincode")}
//                 disabled={!isEditMode}
//                 onFocus={(e) => e.target.style.borderColor = '#009688'}
//               />
//               {localFormErrors.pincode && (
//                 <span style={styles.formError}>
//                   {localFormErrors.pincode}
//                   {pincodeLoading && " (Verifying...)"}
//                 </span>
//               )}
//               <p style={styles.fieldNote}>
//                 {pincodeLoading 
//                   ? "🔍 Verifying pincode and fetching district..." 
//                   : "Enter 6-digit Indian pincode to auto-fill district & state"}
//               </p>
//             </div>

//             <div style={styles.formGroup}>
//               <label style={styles.formLabel}>Country</label>
//               <input
//                 type="text"
//                 name="country"
//                 value={localProfile.country}
//                 onChange={handleLocalProfileChange}
//                 onBlur={handleLocalProfileBlur}
//                 placeholder="Enter your country"
//                 style={getInputStyle("country")}
//                 disabled={!isEditMode}
//                 onFocus={(e) => e.target.style.borderColor = '#009688'}
//               />
//               {localFormErrors.country && (
//                 <span style={styles.formError}>{localFormErrors.country}</span>
//               )}
//             </div>
//           </div>

//           {/* Linked Accounts Section (Read-only if exists) */}
//           {localProfile.linkedAccounts && localProfile.linkedAccounts.length > 0 && (
//             <div style={{
//               backgroundColor: '#E0F6F4',
//               padding: '1rem',
//               borderRadius: '8px',
//               marginBottom: '1.5rem'
//             }}>
//               <h4 style={{ color: '#124441', marginBottom: '0.5rem' }}>Linked Accounts</h4>
//               <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
//                 {localProfile.linkedAccounts.map((account, index) => (
//                   <span key={index} style={{
//                     backgroundColor: '#009688',
//                     color: 'white',
//                     padding: '0.25rem 0.75rem',
//                     borderRadius: '4px',
//                     fontSize: '0.85rem'
//                   }}>
//                     {account === 'guardian' ? '👨‍👩‍👧‍👦 Guardian' : '💑 Spouse'}
//                   </span>
//                 ))}
//               </div>
//               <p style={{ color: '#4F6F6B', fontSize: '0.85rem', marginTop: '0.5rem' }}>
//                 These accounts were set up during signup and can access your profile
//               </p>
//             </div>
//           )}

//           {/* Action Buttons - Compact */}
//           {isEditMode && (
//             <div style={styles.actionButtons}>
//               <button
//                 type="submit"
//                 style={{
//                   ...styles.updateButton,
//                   ...((!localIsFormValid || !hasChanges) && styles.updateButtonDisabled),
//                   ...(isSubmitting && styles.updateButtonDisabled)
//                 }}
//                 disabled={!localIsFormValid || !hasChanges || isSubmitting}
//                 onMouseEnter={(e) => {
//                   if (!isSubmitting && localIsFormValid && hasChanges) {
//                     e.target.style.backgroundColor = '#00796B';
//                     e.target.style.transform = 'translateY(-1px)';
//                   }
//                 }}
//                 onMouseLeave={(e) => {
//                   if (!isSubmitting && localIsFormValid && hasChanges) {
//                     e.target.style.backgroundColor = '#009688';
//                     e.target.style.transform = 'translateY(0)';
//                   }
//                 }}
//               >
//                 {isSubmitting ? "🔄 Saving..." : hasChanges ? "Save Changes" : "No Changes"}
//               </button>
//               <button
//                 type="button"
//                 style={styles.cancelButton}
//                 onClick={handleCancelEditWithModal}
//                 disabled={isSubmitting}
//                 onMouseEnter={(e) => {
//                   e.target.style.backgroundColor = '#009688';
//                   e.target.style.color = '#FFFFFF';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.backgroundColor = 'transparent';
//                   e.target.style.color = '#009688';
//                 }}
//               >
//                 Cancel
//               </button>
//             </div>
//           )}
//         </form>
//       </div>
//     </>
//   );
// };

// export default ProfileView;












import React, { useState, useEffect, useCallback } from 'react';
import { useProfile } from './ProfileContext';



const ProfileView = ({ setActiveView }) => {
  // Get profile and functions from ProfileContext
  const { profile, updateProfile, updateProfilePhoto, removeProfilePhoto } = useProfile();

  const [localProfile, setLocalProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    streetAddress: "",
    apartment: "",
    city: "",
    state: "",
    pincode: "",
    district: "", // Add district field
    country: "India",
    dateOfBirth: "",
    age: "",
    gender: "",
    profilePhoto: "",
    emergencyContact: "",
    linkedAccounts: []
  });
  useEffect(() => {
  if (!profile) return;

  const nameParts = profile.fullName?.split(" ") || [];

  setLocalProfile({
    firstName: nameParts[0] || "",
    lastName: nameParts.slice(1).join(" ") || "",
    email: profile.email || "",
    phone: profile.phone || "",
  
    streetAddress: profile.deliveryAddress || "",
    apartment: profile.apartment || "",
    city: profile.city || "",
    district: profile.district || "",
    state: profile.state || "",
    pincode: profile.pincode || "",
    country: "India",
    dateOfBirth: profile.dateOfBirth || "",
    gender: profile.gender || "",
    emergencyContact: profile.emergencyContact || "",
  });
}, [profile]);


  const [localFormErrors, setLocalFormErrors] = useState({});
  const [localIsFormValid, setLocalIsFormValid] = useState(false);
  const [localIsFormTouched, setLocalIsFormTouched] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [photoPreview, setPhotoPreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pincodeLoading, setPincodeLoading] = useState(false); // Add loading state for pincode lookup
  const [pincodeData, setPincodeData] = useState(null); // Store pincode API response
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalAction, setModalAction] = useState(null);

  // Store initial profile data to track changes
  const [initialProfile, setInitialProfile] = useState(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Enhanced navigation handler
  const handleBackToDashboard = () => {
    setActiveView("dashboard");
  };

  // Modal Styles with new color scheme
  const modalStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(18, 68, 65, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      animation: 'fadeIn 0.3s ease-out'
    },
    modal: {
      backgroundColor: '#FFFFFF',
      padding: '2rem',
      borderRadius: '12px',
      maxWidth: '400px',
      width: '90%',
      textAlign: 'center',
      boxShadow: '0 10px 30px rgba(18, 68, 65, 0.2)',
      animation: 'slideUp 0.3s ease-out',
      border: '1px solid #E0F2F1'
    },
    modalIcon: {
      fontSize: '3rem',
      marginBottom: '1rem'
    },
    modalTitle: {
      color: '#009688',
      fontSize: '1.5rem',
      margin: '0 0 0.5rem 0',
      fontWeight: '700'
    },
    modalMessage: {
      color: '#4F6F6B',
      fontSize: '1rem',
      marginBottom: '1.5rem',
      lineHeight: '1.5'
    },
    modalButtons: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      marginTop: '1rem'
    },
    primaryButton: {
      padding: '0.75rem 2rem',
      backgroundColor: '#009688',
      color: '#FFFFFF',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 8px rgba(0, 150, 136, 0.3)',
      minWidth: '120px'
    },
    secondaryButton: {
      padding: '0.75rem 2rem',
      backgroundColor: 'transparent',
      color: '#009688',
      border: '2px solid #009688',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
      minWidth: '120px'
    },
    warningButton: {
      padding: '0.75rem 2rem',
      backgroundColor: '#FF6B6B',
      color: '#FFFFFF',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 8px rgba(255, 107, 107, 0.3)',
      minWidth: '120px'
    }
  };

  // Add CSS animation for success message and modal
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Modal Functions
  const showModalPopup = (type, title, message, action = null) => {
    setModalType(type);
    setModalTitle(title);
    setModalMessage(message);
    setModalAction(() => action);
    setShowModal(true);
  };

  const hideModal = () => {
    setShowModal(false);
    setModalType('');
    setModalTitle('');
    setModalMessage('');
    setModalAction(null);
  };

  // Get modal icon based on type
  const getModalIcon = () => {
    switch (modalType) {
      case 'success':
        return '✅';
      case 'warning':
        return '⚠️';
      case 'error':
        return '❌';
      case 'info':
        return 'ℹ️';
      default:
        return 'ℹ️';
    }
  };

  // Get modal button style based on type
  const getModalButtonStyle = (isPrimary = true) => {
    switch (modalType) {
      case 'warning':
        return isPrimary ? modalStyles.warningButton : modalStyles.secondaryButton;
      default:
        return isPrimary ? modalStyles.primaryButton : modalStyles.secondaryButton;
    }
  };

  // Helper function to check if two profiles are equal
  const areProfilesEqual = (profile1, profile2) => {
    if (!profile1 || !profile2) return false;
    
    const fieldsToCompare = [
      'firstName', 'lastName', 'email', 'phone', 'streetAddress',
      'apartment', 'city', 'state', 'pincode', 'district', 'country',
      'dateOfBirth', 'age', 'gender', 'emergencyContact', 'profilePhoto'
    ];
    
    return fieldsToCompare.every(field => {
      const val1 = profile1[field] || '';
      const val2 = profile2[field] || '';
      return val1.toString().trim() === val2.toString().trim();
    });
  };

  // Helper function to calculate age from DOB
  const calculateAgeFromDOB = (dateOfBirth) => {
    if (!dateOfBirth) return "";
    
    const dob = new Date(dateOfBirth);
    const today = new Date();
    
    if (dob > today) return "0";
    
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    
    return age > 0 ? age.toString() : "0";
  };

  // Function to fetch pincode details
  const fetchPincodeDetails = async (pincode) => {
    if (!pincode || pincode.length !== 6) {
      return null;
    }
    
    try {
      setPincodeLoading(true);
      // Using a free pincode API
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await response.json();
      
      if (data && data[0] && data[0].Status === "Success") {
        const postOffice = data[0].PostOffice[0];
        return {
          district: postOffice.District || '',
          state: postOffice.State || '',
          country: postOffice.Country || 'India'
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching pincode details:', error);
      return null;
    } finally {
      setPincodeLoading(false);
    }
  };

const parseProfileData = useCallback((profileData) => {
  if (!profileData) return null;

  console.log("Parsing profile data:", profileData);

  // ✅ BACKEND SENDS camelCase
  const fullName = profileData.fullName || "";
  const nameParts = fullName.trim().split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";


    const address = profileData.deliveryAddress || "";


  return {
    firstName,
    lastName,
    email: profileData.email || "",
    phone: profileData.phone || "",

 
   streetAddress: profileData.deliveryAddress || "",

     apartment: profileData.apartment || "",
    city: profileData.city || "",
    state: profileData.state || "",
    pincode: profileData.pincode || "",
        district: profileData.district || "",               

    country: "India",
    dateOfBirth: profileData.dateOfBirth || "",
    age: profileData.dateOfBirth
      ? calculateAgeFromDOB(profileData.dateOfBirth)
      : "",
    gender: profileData.gender || "",
    emergencyContact: profileData.emergencyContact || "",
    profilePhoto: profileData.profilePhoto || "",
    linkedAccounts: [],
  };
}, []);


  // Real-time profile sync from context - Enhanced to handle signup data
  useEffect(() => {
    console.log('Profile context updated:', profile);
    
    if (!profile) {
      setIsLoading(false);
      return;
    }
    
    const parsedProfile = parseProfileData(profile);
    
    if (parsedProfile) {
      console.log('Setting local profile from parsed data:', parsedProfile);
      
      // Only update if profile has changed
      if (!areProfilesEqual(localProfile, parsedProfile)) {
        setLocalProfile(parsedProfile);
        setInitialProfile(parsedProfile);
        setHasChanges(false);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, [profile, parseProfileData]);

  // Track changes in form
  useEffect(() => {
    if (initialProfile && !isLoading) {
      const hasFormChanges = !areProfilesEqual(localProfile, initialProfile);
      setHasChanges(hasFormChanges);
    }
  }, [localProfile, initialProfile, isLoading]);

  // Real-time age calculation
  useEffect(() => {
    if (!localProfile.dateOfBirth || !isEditMode) return;

    const calculatedAge = calculateAgeFromDOB(localProfile.dateOfBirth);
    if (calculatedAge !== localProfile.age) {
      setLocalProfile(prev => ({ ...prev, age: calculatedAge }));
    }
  }, [localProfile.dateOfBirth, localProfile.age, isEditMode]);

  // Effect to fetch pincode details when pincode changes
  useEffect(() => {
    if (isEditMode && localProfile.pincode && localProfile.pincode.length === 6) {
      const fetchPincode = async () => {
        const pincodeData = await fetchPincodeDetails(localProfile.pincode);
        if (pincodeData) {
          // Auto-fill state and district based on pincode
          setLocalProfile(prev => ({
            ...prev,
            state: pincodeData.state || prev.state,
            district: pincodeData.district || prev.district,
            country: pincodeData.country || prev.country
          }));
        }
      };
      
      // Debounce the API call
      const timer = setTimeout(() => {
        fetchPincode();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [localProfile.pincode, isEditMode]);

  // Enhanced validation that triggers on form submit
  const validateLocalForm = useCallback((triggerAll = false) => {
    const errors = {};

    // Trigger validation for all fields on save
    const shouldValidate = (field) => {
      return triggerAll || localIsFormTouched || localProfile[field] !== '';
    };

    // First Name validation
    if (!localProfile.firstName.trim()) {
      errors.firstName = "First name is required";
    } else if (localProfile.firstName.trim().length < 2) {
      errors.firstName = "First name should be at least 2 characters long";
    } else if (!/^[A-Za-z]{2,}$/.test(localProfile.firstName.trim())) {
      errors.firstName = "First name should contain only letters";
    }

    // Last Name validation (optional)
    if (localProfile.lastName && localProfile.lastName.trim() && !/^[A-Za-z\s]{0,}$/.test(localProfile.lastName.trim())) {
      errors.lastName = "Last name should contain only letters";
    }

    // Email validation
    if (!localProfile.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(localProfile.email.trim())) {
      errors.email = "Enter a valid email address";
    }

    // Phone validation
    if (!localProfile.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(localProfile.phone.trim())) {
      errors.phone = "Enter a valid 10-digit number starting with 6-9";
    }

    // Street Address validation
    if (!localProfile.streetAddress.trim()) {
      errors.streetAddress = "Street address is required";
    } else if (localProfile.streetAddress.trim().length < 5) {
      errors.streetAddress = "Street address should be at least 5 characters long";
    }

    // City validation - REMOVED: City is now optional
    if (localProfile.city && localProfile.city.trim() && !/^[A-Za-z\s]{2,}$/.test(localProfile.city.trim())) {
      errors.city = "City should contain only letters and be at least 2 characters";
    }

    // District validation (optional but recommended)
    if (!localProfile.district.trim()) {
      errors.district = "District is required (automatically fetched from pincode)";
    } else if (!/^[A-Za-z\s]{2,}$/.test(localProfile.district.trim())) {
      errors.district = "District should contain only letters and be at least 2 characters";
    }

    // State validation
    if (!localProfile.state.trim()) {
      errors.state = "State is required";
    } else if (!/^[A-Za-z\s]{2,}$/.test(localProfile.state.trim())) {
      errors.state = "State should contain only letters and be at least 2 characters";
    }

    // Pincode validation
    if (!localProfile.pincode) {
      errors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(localProfile.pincode.trim())) {
      errors.pincode = "Pincode must be exactly 6 digits";
    } else if (pincodeLoading) {
      errors.pincode = "Verifying pincode...";
    } else if (!localProfile.district && !pincodeLoading) {
      errors.pincode = "Enter a valid Indian pincode";
    }

    // Date of Birth validation - FIXED: Allow today's date
    if (!localProfile.dateOfBirth) {
      errors.dateOfBirth = "Date of birth is required";
    } else {
      const dob = new Date(localProfile.dateOfBirth);
      const today = new Date();
      
      // Set both to midnight for date-only comparison
      const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const dobMidnight = new Date(dob.getFullYear(), dob.getMonth(), dob.getDate());
      
      if (dobMidnight > todayMidnight) {
        errors.dateOfBirth = "Date of birth cannot be in the future";
      }
    }

    // Age validation
    if (!localProfile.age) {
      errors.age = "Age is required";
    } else if (parseInt(localProfile.age) <= 0) {
      errors.age = "Age must be a positive number";
    } else if (parseInt(localProfile.age) > 120) {
      errors.age = "Please enter a valid age";
    }

    // Gender validation
    if (!localProfile.gender) {
      errors.gender = "Please select your gender";
    }

    // Emergency Contact validation (optional but if provided, validate)
    if (localProfile.emergencyContact && localProfile.emergencyContact.trim() && !/^[6-9]\d{9}$/.test(localProfile.emergencyContact.trim())) {
      errors.emergencyContact = "Enter a valid 10-digit number starting with 6-9";
    }

    setLocalFormErrors(errors);
    const isValid = Object.keys(errors).length === 0;
    setLocalIsFormValid(isValid);
    
    return isValid;
  }, [localProfile, localIsFormTouched, pincodeLoading]);

  // Real-time validation on every change
  useEffect(() => {
    if (localIsFormTouched && isEditMode) {
      validateLocalForm(false);
    }
  }, [localProfile, localIsFormTouched, validateLocalForm, isEditMode]);

  // Real-time input handlers
  const handleLocalProfileChange = (e) => {
    if (!isEditMode) return;
    
    const { name, value } = e.target;
    let updatedValue = value;

    // Real-time input formatting and validation
    switch (name) {
      case "firstName":
      case "lastName":
        updatedValue = value.replace(/[^A-Za-z\s]/g, "");
        break;
      case "city":
      case "state":
      case "country":
      case "district":
        updatedValue = value.replace(/[^A-Za-z\s]/g, "");
        break;
      case "pincode":
        updatedValue = value.replace(/\D/g, "").slice(0, 6);
        break;
      case "phone":
        updatedValue = value.replace(/\D/g, "").slice(0, 10);
        break;
      case "emergencyContact":
        updatedValue = value.replace(/\D/g, "").slice(0, 10);
        break;
      default:
        break;
    }

    setLocalProfile(prev => ({ ...prev, [name]: updatedValue }));
    setLocalIsFormTouched(true);
    
    // Clear save status when user starts typing
    if (saveStatus) {
      setSaveStatus('');
    }
  };

  const handleLocalProfileBlur = (e) => {
    if (!isEditMode) return;
    
    const { name, value } = e.target;
    
    // Auto-trim on blur
    if (value && typeof value === 'string') {
      const trimmedValue = value.trim();
      if (trimmedValue !== value) {
        setLocalProfile(prev => ({ ...prev, [name]: trimmedValue }));
      }
    }
    
    // Trigger validation for this field
    if (isEditMode) {
      validateLocalForm(false);
    }
  };

  // Real-time profile photo handling
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Real-time file validation
    if (!file.type.startsWith('image/')) {
      showModalPopup('error', 'Invalid File', 'Please select a valid image file (JPG, PNG, GIF, etc.)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showModalPopup('error', 'File Too Large', 'Image size should be less than 5MB');
      return;
    }

    try {
      setSaveStatus('🔄 Uploading photo...');
      
      // const imgURL = URL.createObjectURL(file);
      
      // Update profile photo using context function
      // await updateProfilePhoto(imgURL);
      
      // // Update local state
      // setLocalProfile(prev => ({ ...prev, profilePhoto: imgURL }));
      setLocalProfile(prev => ({
    ...prev,
    profilePhoto: file
  }));
     // create preview for UI
  const previewUrl = URL.createObjectURL(file);
  setPhotoPreview(previewUrl);
      setHasChanges(true);
      
      showModalPopup('success', 'Photo Updated', 'Your profile photo has been updated successfully!');
      setSaveStatus('');
    } catch (error) {
      console.error('Error uploading photo:', error);
      showModalPopup('error', 'Upload Failed', 'Error uploading photo. Please try again.');
    }
  };

  const handleRemovePhoto = async () => {
    try {
      setSaveStatus('🔄 Removing photo...');
      
      // Remove profile photo using context function
      await removeProfilePhoto();
      
      // Update local state
      setLocalProfile(prev => ({ ...prev, profilePhoto: "" }));
      setHasChanges(true);
      
      showModalPopup('success', 'Photo Removed', 'Your profile photo has been removed successfully!');
      setSaveStatus('');
    } catch (error) {
      console.error('Error removing photo:', error);
      showModalPopup('error', 'Remove Failed', 'Error removing photo. Please try again.');
    }
  };

  // Enhanced edit mode handler
  const handleEditModeToggle = () => {
    setIsEditMode(true);
    // Mark all fields as touched to show validation errors
    setLocalIsFormTouched(true);
    // Trigger validation for all fields
    validateLocalForm(true);
  };

  // Cancel Edit with modal confirmation
  const handleCancelEditWithModal = () => {
    if (hasChanges) {
      showModalPopup(
        'warning',
        'Discard Changes?',
        'You have unsaved changes. Are you sure you want to cancel?',
        () => {
          handleCancelEdit();
          hideModal();
        }
      );
    } else {
      handleCancelEdit();
    }
  };

  // Cancel Edit implementation
  const handleCancelEdit = () => {
    if (!profile) return;
    
    const parsedProfile = parseProfileData(profile);
    if (parsedProfile) {
      setLocalProfile(parsedProfile);
      setInitialProfile(parsedProfile);
    }
    
    setLocalFormErrors({});
    setLocalIsFormTouched(false);
    setHasChanges(false);
    setIsEditMode(false);
    setSaveStatus('');
    setPincodeLoading(false);
    setPincodeData(null);
  };

  // Real-time form submission - Enhanced to include all signup fields
  const handleLocalProfileUpdate = async (e) => {
    e.preventDefault();

    if (!isEditMode) {
      handleEditModeToggle();
      return;
    }

    // Check if there are any actual changes
    if (!hasChanges) {
      showModalPopup(
        'info',
        'No Changes Detected',
        'You haven\'t made any changes to save.',
        () => {
          setIsEditMode(false);
          hideModal();
        }
      );
      return;
    }

    // Final validation check with all fields
    const isValid = validateLocalForm(true);
    if (!isValid) {
      showModalPopup(
        'error',
        'Validation Error',
        'Please fix all validation errors before submitting.',
        () => hideModal()
      );
      return;
    }

    setIsSubmitting(true);
    setSaveStatus('🔄 Saving profile changes...');

    try {
      // Combine name fields
      const fullName = `${localProfile.firstName} ${localProfile.lastName}`.trim();
      
      // Combine address fields (include district)
      

      // Create the updated profile data including all fields from signup
      const updatedProfileData = {
        fullName: fullName,
        address: localProfile.streetAddress,
        city: localProfile.city || '', // City is optional
        state: localProfile.state,
        pincode: localProfile.pincode,
        district: localProfile.district, // Add district
        country: localProfile.country,
        dateOfBirth: localProfile.dateOfBirth,
        age: localProfile.age,
        gender: localProfile.gender,
        apartment: localProfile.apartment,
        lastName: localProfile.lastName, 
  
        emergencyContact: localProfile.emergencyContact || '',
        linkedAccounts: localProfile.linkedAccounts || [],
         profilePhoto: localProfile.profilePhoto,
        lastUpdated: new Date().toISOString()
      };

      console.log('Updating profile with data:', updatedProfileData);
      
      // Call updateProfile from context - this will update both context and localStorage
      await updateProfile(updatedProfileData);
      
      // Update initial profile to current state
      setInitialProfile(localProfile);
      setHasChanges(false);
      
      // Show success modal
      showModalPopup(
        'success',
        'Profile Updated Successfully!',
        'Your profile information has been saved successfully.',
        () => {
          setLocalIsFormTouched(false);
          setIsEditMode(false);
          hideModal();
        }
      );
      
    } catch (error) {
      console.error('Profile update error:', error);
      showModalPopup(
        'error',
        'Update Failed',
        'Error updating profile. Please try again.',
        () => hideModal()
      );
    } finally {
      setIsSubmitting(false);
      setSaveStatus('');
    }
  };

  // Helper function to get input styles
  const getInputStyle = (fieldName) => {
    const baseStyle = {
      padding: '0.75rem',
      border: '2px solid #E0F6F4',
      borderRadius: '8px',
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
      cursor: 'text',
      fontFamily: 'inherit',
      backgroundColor: '#FFFFFF',
      color: '#124441'
    };
    const errorStyle = localFormErrors[fieldName] ? {
      borderColor: '#FF6B6B !important',
      backgroundColor: '#FFF5F5',
    } : {};
    const disabledStyle = !isEditMode ? {
      backgroundColor: '#E0F6F4',
      color: '#4F6F6B',
      cursor: 'not-allowed',
      borderColor: '#4DB6AC',
    } : {};
    const focusStyle = isEditMode ? {
      borderColor: '#009688',
      boxShadow: '0 0 0 2px rgba(0, 150, 136, 0.1)',
      outline: 'none'
    } : {};
    const pincodeLoadingStyle = (fieldName === 'pincode' && pincodeLoading) ? {
      borderColor: '#FF9800',
      backgroundImage: 'linear-gradient(45deg, #FF9800 25%, transparent 25%, transparent 50%, #FF9800 50%, #FF9800 75%, transparent 75%, transparent)',
      backgroundSize: '20px 20px',
      animation: 'loadingBar 1s infinite linear',
    } : {};
    
    return {
      ...baseStyle,
      ...errorStyle,
      ...disabledStyle,
      ...focusStyle,
      ...pincodeLoadingStyle,
      cursor: !isEditMode ? 'not-allowed' : 'text'
    };
  };

  // Check if profile is complete (updated to include district instead of required city)
  const isProfileComplete = () => {
    const requiredFields = ['firstName', 'email', 'phone', 'streetAddress', 'district', 'state', 'pincode', 'dateOfBirth', 'gender'];
    return requiredFields.every(field => localProfile[field] && localProfile[field].trim());
  };

  // Get save status style
  const getSaveStatusStyle = () => {
    const baseStyle = {
      textAlign: 'center',
      padding: '0.75rem',
      marginTop: '0.75rem',
      borderRadius: '6px',
      fontWeight: '500',
      fontSize: '0.85rem',
    };
    
    if (saveStatus.includes('✅')) return { ...baseStyle, backgroundColor: '#E0F6F4', color: '#009688', border: '2px solid #4DB6AC' };
    if (saveStatus.includes('❌')) return { ...baseStyle, backgroundColor: '#FFE5E5', color: '#FF6B6B', border: '2px solid #FF6B6B' };
    if (saveStatus.includes('🔄')) return { ...baseStyle, backgroundColor: '#E0F6F4', color: '#009688', border: '2px solid #4DB6AC' };
    return baseStyle;
  };

  // Add loading animation for pincode
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes loadingBar {
        0% {
          backgroundPosition: 0 0;
        }
        100% {
          backgroundPosition: 20px 0;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Modal Component
  const Modal = () => {
    if (!showModal) return null;

    return (
      <div style={modalStyles.overlay} onClick={hideModal}>
        <div style={modalStyles.modal} onClick={(e) => e.stopPropagation()}>
          <div style={modalStyles.modalIcon}>{getModalIcon()}</div>
          <h3 style={modalStyles.modalTitle}>{modalTitle}</h3>
          <p style={modalStyles.modalMessage}>{modalMessage}</p>
          <div style={modalStyles.modalButtons}>
            {modalType === 'warning' ? (
              <>
                <button
                  style={getModalButtonStyle(true)}
                  onClick={() => {
                    if (modalAction) modalAction();
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#cc0000';
                    e.target.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#FF6B6B';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  Discard Changes
                </button>
                <button
                  style={getModalButtonStyle(false)}
                  onClick={hideModal}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#009688';
                    e.target.style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#009688';
                  }}
                >
                  Continue Editing
                </button>
              </>
            ) : modalType === 'info' ? (
              <>
                <button
                  style={getModalButtonStyle(true)}
                  onClick={() => {
                    if (modalAction) {
                      modalAction();
                    } else {
                      hideModal();
                    }
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#00796B';
                    e.target.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#009688';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  Continue
                </button>
              </>
            ) : (
              <button
                style={getModalButtonStyle(true)}
                onClick={() => {
                  if (modalAction) {
                    modalAction();
                  } else {
                    hideModal();
                  }
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#00796B';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#009688';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                {modalType === 'success' ? 'Continue' : 'OK'}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Profile-specific styles with new color scheme
  const styles = {
    profileContainer: {
      marginTop: '140px',
      padding: '2rem 1rem 1rem 1rem',
      maxWidth: '800px',
      marginLeft: 'auto',
      marginRight: 'auto',
      minHeight: 'calc(100vh - 120px)',
      backgroundColor: '#E0F6F4',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      position: 'relative',
      zIndex: 1,
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '400px',
    },
    loadingText: {
      color: '#009688',
      fontSize: '1.2rem',
      fontWeight: '600',
    },
    pageHeader: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '2rem',
      marginBottom: '2rem',
      textAlign: 'center',
      position: 'relative',
    },
    backButton: {
      padding: '0.75rem 1.5rem',
      backgroundColor: 'transparent',
      marginTop: '1.5rem',
      color: '#009688',
      border: '2px solid #009688',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      alignSelf: 'flex-start',
      position: 'relative',
      zIndex: 2,
      marginBottom: '0.5rem',
      minWidth: '180px',
    },
    headerContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.75rem',
      width: '100%',
    },
    sectionTitle: {
      color: '#124441',
      fontSize: '2rem',
      margin: 0,
      fontWeight: '800',
      background: 'linear-gradient(135deg, #009688, #4DB6AC)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    profileStatus: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
    },
    statusComplete: {
      color: '#009688',
      fontWeight: '700',
      fontSize: '0.9rem',
      padding: '0.5rem 1rem',
      backgroundColor: '#E0F6F4',
      borderRadius: '20px',
      border: '2px solid #4DB6AC',
    },
    statusIncomplete: {
      color: '#FF9800',
      fontWeight: '700',
      fontSize: '0.9rem',
      padding: '0.5rem 1rem',
      backgroundColor: '#FFF3E0',
      borderRadius: '20px',
      border: '2px solid #FF9800',
    },
    profilePhotoSection: {
      backgroundColor: '#FFFFFF',
      padding: '1.5rem',
      borderRadius: '12px',
      boxShadow: '0 4px 16px rgba(18, 68, 65, 0.1)',
      marginBottom: '1.5rem',
      textAlign: 'center',
      border: '2px solid #E0F6F4',
    },
    profilePhotoContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
    },
    profilePhotoPreview: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      backgroundColor: '#E0F6F4',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      border: '3px solid #009688',
      boxShadow: '0 2px 8px rgba(0, 150, 136, 0.3)',
      position: 'relative',
    },
    profilePhotoImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    profilePhotoPlaceholder: {
      fontSize: '3rem',
      color: '#009688',
      fontWeight: 'bold',
    },
    profilePhotoActions: {
      display: 'flex',
      gap: '0.75rem',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
    },
    uploadPhotoButton: {
      padding: '0.75rem 1.5rem',
      backgroundColor: '#4DB6AC',
      color: '#FFFFFF',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      boxShadow: '0 2px 8px rgba(77, 182, 172, 0.3)',
    },
    removePhotoButton: {
      padding: '0.75rem 1.5rem',
      backgroundColor: '#FF6B6B',
      color: '#FFFFFF',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 8px rgba(255, 107, 107, 0.3)',
    },
    editProfileButton: {
      padding: '0.75rem 2rem',
      backgroundColor: '#009688',
      color: '#FFFFFF',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      boxShadow: '0 2px 8px rgba(0, 150, 136, 0.3)',
      minWidth: '160px',
    },
    profileForm: {
      backgroundColor: '#FFFFFF',
      padding: '1.5rem',
      borderRadius: '12px',
      boxShadow: '0 4px 16px rgba(18, 68, 65, 0.1)',
      border: '2px solid #E0F6F4',
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1rem',
      marginBottom: '1.5rem',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
    },
    formLabel: {
      marginBottom: '0.5rem',
      color: '#124441',
      fontWeight: '600',
      fontSize: '0.9rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
    },
    requiredMarker: {
      color: '#FF6B6B',
      fontSize: '1rem',
    },
    formError: {
      color: '#FF6B6B',
      fontSize: '0.8rem',
      marginTop: '0.25rem',
      fontWeight: '500',
    },
    formTextarea: {
      padding: '0.75rem',
      border: '2px solid #E0F6F4',
      borderRadius: '8px',
      fontSize: '0.9rem',
      resize: 'vertical',
      minHeight: '80px',
      fontFamily: 'inherit',
      cursor: 'text',
      backgroundColor: '#FFFFFF',
      color: '#124441',
    },
    fieldNote: {
      color: '#4F6F6B',
      fontSize: '0.8rem',
      marginTop: '0.25rem',
      fontStyle: 'italic',
    },
    phoneInputContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      width: '100%',
    },
    phonePrefix: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.75rem 1rem',
      backgroundColor: '#E0F6F4',
      borderRadius: '8px',
      fontWeight: '600',
      color: '#009688',
      fontSize: '0.9rem',
      border: '2px solid #4DB6AC',
      minWidth: '100px',
      justifyContent: 'center',
      flexShrink: 0,
    },
    actionButtons: {
      display: 'flex',
      gap: '0.75rem',
      justifyContent: 'center',
      marginTop: '1.5rem',
      paddingTop: '1.5rem',
      borderTop: '2px solid #E0F6F4',
    },
    updateButton: {
      padding: '0.75rem 2rem',
      backgroundColor: '#009688',
      color: '#FFFFFF',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 8px rgba(0, 150, 136, 0.3)',
      minWidth: '160px',
    },
    updateButtonDisabled: {
      backgroundColor: '#B2DFDB',
      cursor: 'not-allowed',
      boxShadow: 'none',
      color: '#4F6F6B',
    },
    cancelButton: {
      padding: '0.75rem 2rem',
      backgroundColor: 'transparent',
      color: '#009688',
      border: '2px solid #009688',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
      minWidth: '120px',
    },
    validationSummary: {
      backgroundColor: '#FFF5F5',
      border: '2px solid #FF6B6B',
      borderRadius: '8px',
      padding: '1rem',
      marginBottom: '1.5rem',
    },
    validationSummaryTitle: {
      color: '#FF6B6B',
      margin: '0 0 0.5rem 0',
      fontSize: '1rem',
      fontWeight: '600',
    },
    validationSummaryList: {
      margin: 0,
      paddingLeft: '1.5rem',
    },
    validationSummaryItem: {
      color: '#D32F2F',
      fontSize: '0.85rem',
      marginBottom: '0.25rem',
    },
    autoFilledField: {
      backgroundColor: '#F0FFF8',
      borderColor: '#4CAF50',
      borderStyle: 'dashed',
    },
  };

  // Get validation summary
  const getValidationSummary = () => {
    const errorCount = Object.keys(localFormErrors).length;
    if (errorCount === 0 || !localIsFormTouched) return null;

    return (
      <div style={styles.validationSummary}>
        <h4 style={styles.validationSummaryTitle}>
          ⚠️ Please fix {errorCount} error{errorCount !== 1 ? 's' : ''} before saving:
        </h4>
        <ul style={styles.validationSummaryList}>
          {Object.entries(localFormErrors).map(([field, error]) => (
            <li key={field} style={styles.validationSummaryItem}>
              {error}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // Show loading state
  if (isLoading) {
    return (
      <div style={styles.profileContainer}>
        <div style={styles.loadingContainer}>
          <div style={styles.loadingText}>Loading profile data...</div>
        </div>
      </div>
    );
  }

  // Show empty state if no profile
  if (!profile) {
    return (
      <div style={styles.profileContainer}>
        <div style={styles.pageHeader}>
          <button 
            style={styles.backButton} 
            onClick={handleBackToDashboard}
            aria-label="Back to dashboard"
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#009688';
              e.target.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#009688';
            }}
          >
            ← Back to Dashboard
          </button>
          <div style={styles.headerContent}>
            <h2 style={styles.sectionTitle}>My Profile</h2>
          </div>
        </div>
        <div style={styles.profileForm}>
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <h3 style={{ color: '#124441', marginBottom: '1rem' }}>No Profile Data Found</h3>
            <p style={{ color: '#4F6F6B', marginBottom: '2rem' }}>
              Please complete your signup to create a profile.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Modal />
      
      <div style={styles.profileContainer}>
        {/* Compact Header */}
        <div style={styles.pageHeader}>
          <button 
            style={styles.backButton} 
            onClick={handleBackToDashboard}
            aria-label="Back to dashboard"
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#009688';
              e.target.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#009688';
            }}
          >
            ← Back to Dashboard
          </button>
          <div style={styles.headerContent}>
            <h2 style={styles.sectionTitle}>My Profile</h2>
            {!isEditMode && (
              <div style={styles.profileStatus}>
                <span style={isProfileComplete() ? styles.statusComplete : styles.statusIncomplete}>
                  {isProfileComplete() ? '✅ Profile Complete' : '⚠ Profile Incomplete'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Profile Photo Section - Compact */}
        <div style={styles.profilePhotoSection}>
          <div style={styles.profilePhotoContainer}>
            <div style={styles.profilePhotoPreview}>
              {localProfile.profilePhoto ? (
                


<img
  src={
    photoPreview
      ? photoPreview
      : localProfile.profilePhoto?.startsWith("http")
        ? localProfile.profilePhoto
        : localProfile.profilePhoto
          ? `http://127.0.0.1:8000${localProfile.profilePhoto}`
          : ""
  }
  alt="Profile"
  style={styles.profilePhotoImage}
/>




              ) : (
                <div style={styles.profilePhotoPlaceholder}>
                  {localProfile.firstName?.charAt(0).toUpperCase() || "👤"}
                </div>
              )}
            </div>

            <div style={styles.profilePhotoActions}>
              {!isEditMode ? (
                <button
                  style={styles.editProfileButton}
                  onClick={handleEditModeToggle}
                  type="button"
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#00796B';
                    e.target.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#009688';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  ✏️ Edit Profile
                </button>
              ) : (
                <>
                  <label style={styles.uploadPhotoButton}>
                    📷 Update Photo
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handlePhotoUpload}
                    />
                  </label>

                  {localProfile.profilePhoto && (
                    <button
                      style={styles.removePhotoButton}
                      type="button"
                      onClick={handleRemovePhoto}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#cc0000';
                        e.target.style.transform = 'translateY(-1px)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#FF6B6B';
                        e.target.style.transform = 'translateY(0)';
                      }}
                    >
                      Remove
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Validation Summary */}
        {getValidationSummary()}

        {/* Save Status Display */}
        {saveStatus && (
          <div style={getSaveStatusStyle()}>
            {saveStatus}
          </div>
        )}

        {/* Profile Form - Compact */}
        <form onSubmit={handleLocalProfileUpdate} style={styles.profileForm}>
          <div style={styles.formGrid}>
            {/* Name Section */}
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>
                First Name <span style={styles.requiredMarker}>*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={localProfile.firstName}
                onChange={handleLocalProfileChange}
                onBlur={handleLocalProfileBlur}
                placeholder="Enter your first name"
                style={getInputStyle("firstName")}
                disabled={!isEditMode}
                onFocus={(e) => e.target.style.borderColor = '#009688'}
              />
              {localFormErrors.firstName && (
                <span style={styles.formError}>{localFormErrors.firstName}</span>
              )}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={localProfile.lastName}
                onChange={handleLocalProfileChange}
                onBlur={handleLocalProfileBlur}
                placeholder="Enter your last name"
                style={getInputStyle("lastName")}
                disabled={!isEditMode}
                onFocus={(e) => e.target.style.borderColor = '#009688'}
              />
              {localFormErrors.lastName && (
                <span style={styles.formError}>{localFormErrors.lastName}</span>
              )}
            </div>

            {/* Contact Information */}
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>
                Email <span style={styles.requiredMarker}>*</span>
              </label>
              <input
                type="email"
                name="email"
                value={localProfile.email}
                onChange={handleLocalProfileChange}
                onBlur={handleLocalProfileBlur}
                placeholder="Enter your email address"
                style={getInputStyle("email")}
                disabled={!isEditMode}
                onFocus={(e) => e.target.style.borderColor = '#009688'}
              />
              {localFormErrors.email && (
                <span style={styles.formError}>{localFormErrors.email}</span>
              )}
            </div>

            {/* Phone Field - Extended container */}
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>
                Phone <span style={styles.requiredMarker}>*</span>
              </label>
              <div style={styles.phoneInputContainer}>
                <div style={styles.phonePrefix}>🇮🇳 +91</div>
                <input
                  type="tel"
                  name="phone"
                  value={localProfile.phone}
                  onChange={handleLocalProfileChange}
                  onBlur={handleLocalProfileBlur}
                  style={getInputStyle("phone")}
                  placeholder="10-digit mobile number"
                  maxLength="10"
                  disabled={!isEditMode}

                  onFocus={(e) => e.target.style.borderColor = '#009688'}
                />
              </div>
              {localFormErrors.phone && (
                <span style={styles.formError}>{localFormErrors.phone}</span>
              )}
            </div>

            {/* Emergency Contact */}
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Emergency Contact</label>
              <div style={styles.phoneInputContainer}>
                <div style={styles.phonePrefix}>🇮🇳 +91</div>
                <input
                  type="tel"
                  name="emergencyContact"
                  value={localProfile.emergencyContact}
                  onChange={handleLocalProfileChange}
                  onBlur={handleLocalProfileBlur}
                  style={getInputStyle("emergencyContact")}
                  placeholder="10-digit emergency number"
                  maxLength="10"
                  disabled={!isEditMode}
                  onFocus={(e) => e.target.style.borderColor = '#009688'}
                />
              </div>
              {localFormErrors.emergencyContact && (
                <span style={styles.formError}>{localFormErrors.emergencyContact}</span>
              )}
              <p style={styles.fieldNote}>Optional - for emergency notifications</p>
            </div>

            {/* Personal Information */}
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>
                Date of Birth <span style={styles.requiredMarker}>*</span>
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={localProfile.dateOfBirth}
                onChange={handleLocalProfileChange}
                style={getInputStyle("dateOfBirth")}
                disabled={!isEditMode}
                max={new Date().toISOString().split('T')[0]}
                onFocus={(e) => e.target.style.borderColor = '#009688'}
              />
              {localFormErrors.dateOfBirth && (
                <span style={styles.formError}>{localFormErrors.dateOfBirth}</span>
              )}
              <p style={styles.fieldNote}>Today's date is allowed</p>
            </div>

            {/* Age Field (Read-only) */}
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>
                Age <span style={styles.requiredMarker}>*</span>
              </label>
              <input
                type="text"
                name="age"
                value={localProfile.age ? `${localProfile.age} years` : ""}
                readOnly
                style={getInputStyle("age")}
              />
              <p style={styles.fieldNote}>Automatically calculated from date of birth</p>
              {localFormErrors.age && (
                <span style={styles.formError}>{localFormErrors.age}</span>
              )}
            </div>

            {/* Gender Field */}
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>
                Gender <span style={styles.requiredMarker}>*</span>
              </label>
              <select
                name="gender"
                value={localProfile.gender}
                onChange={handleLocalProfileChange}
                style={getInputStyle("gender")}
                disabled={!isEditMode}
                onFocus={(e) => e.target.style.borderColor = '#009688'}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
              {localFormErrors.gender && (
                <span style={styles.formError}>{localFormErrors.gender}</span>
              )}
            </div>

            {/* Address Section */}
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>
                Street Address <span style={styles.requiredMarker}>*</span>
              </label>
              <textarea
                name="streetAddress"
                rows="2"
                value={localProfile.streetAddress}
                onChange={handleLocalProfileChange}
                onBlur={handleLocalProfileBlur}
                style={getInputStyle("streetAddress")}
                disabled={!isEditMode}
                placeholder="House number, street name"
                onFocus={(e) => e.target.style.borderColor = '#009688'}
              />
              {localFormErrors.streetAddress && (
                <span style={styles.formError}>{localFormErrors.streetAddress}</span>
              )}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Apartment/Building (Optional)</label>
              <input
                type="text"
                name="apartment"
                value={localProfile.apartment}
                onChange={handleLocalProfileChange}
                onBlur={handleLocalProfileBlur}
                placeholder="Apartment, suite, building"
                style={getInputStyle("apartment")}
                disabled={!isEditMode}
                onFocus={(e) => e.target.style.borderColor = '#009688'}
              />
            </div>

            {/* City Field - Now Optional */}
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>City (Optional)</label>
              <input
                type="text"
                name="city"
                value={localProfile.city}
                onChange={handleLocalProfileChange}
                onBlur={handleLocalProfileBlur}
                placeholder="Enter your city (optional)"
                style={getInputStyle("city")}
                disabled={!isEditMode}
                onFocus={(e) => e.target.style.borderColor = '#009688'}
              />
              {localFormErrors.city && (
                <span style={styles.formError}>{localFormErrors.city}</span>
              )}
              <p style={styles.fieldNote}>Optional - District will be auto-filled from pincode</p>
            </div>

            {/* District Field - Auto-filled from pincode */}
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>
                District <span style={styles.requiredMarker}>*</span>
              </label>
              <input
                type="text"
                name="district"
                value={localProfile.district}
                onChange={handleLocalProfileChange}
                onBlur={handleLocalProfileBlur}
                placeholder="District (auto-filled from pincode)"
                style={{
                  ...getInputStyle("district"),
                  ...(localProfile.district && !localFormErrors.district && styles.autoFilledField)
                }}
                disabled={!isEditMode}
                onFocus={(e) => e.target.style.borderColor = '#009688'}
                readOnly={!!localProfile.district && pincodeData}
              />
              {localFormErrors.district && (
                <span style={styles.formError}>{localFormErrors.district}</span>
              )}
              <p style={styles.fieldNote}>
                {pincodeLoading 
                  ? "🔍 Looking up district from pincode..." 
                  : localProfile.district 
                    ? "✅ Auto-filled from pincode" 
                    : "Enter pincode to auto-fill district"}
              </p>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>
                State <span style={styles.requiredMarker}>*</span>
              </label>
              <input
                type="text"
                name="state"
                value={localProfile.state}
                onChange={handleLocalProfileChange}
                onBlur={handleLocalProfileBlur}
                placeholder="State"
                style={{
                  ...getInputStyle("state"),
                  ...(localProfile.state && !localFormErrors.state && localProfile.pincode && styles.autoFilledField)
                }}
                disabled={!isEditMode}
                onFocus={(e) => e.target.style.borderColor = '#009688'}
                readOnly={!!localProfile.state && pincodeData}
              />
              {localFormErrors.state && (
                <span style={styles.formError}>{localFormErrors.state}</span>
              )}
              <p style={styles.fieldNote}>
                {pincodeLoading 
                  ? "🔍 Looking up state from pincode..." 
                  : localProfile.state && localProfile.pincode
                    ? "✅ Auto-filled from pincode" 
                    : "Enter pincode to auto-fill state"}
              </p>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>
                Pincode <span style={styles.requiredMarker}>*</span>
              </label>
              <input
                type="text"
                name="pincode"
                value={localProfile.pincode}
                onChange={handleLocalProfileChange}
                placeholder="6-digit pincode"
                maxLength="6"
                style={getInputStyle("pincode")}
                disabled={!isEditMode}
                onFocus={(e) => e.target.style.borderColor = '#009688'}
              />
              {localFormErrors.pincode && (
                <span style={styles.formError}>
                  {localFormErrors.pincode}
                  {pincodeLoading && " (Verifying...)"}
                </span>
              )}
              <p style={styles.fieldNote}>
                {pincodeLoading 
                  ? "🔍 Verifying pincode and fetching district..." 
                  : "Enter 6-digit Indian pincode to auto-fill district & state"}
              </p>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Country</label>
              <input
                type="text"
                name="country"
                value={localProfile.country}
                onChange={handleLocalProfileChange}
                onBlur={handleLocalProfileBlur}
                placeholder="Enter your country"
                style={getInputStyle("country")}
                disabled={!isEditMode}
                onFocus={(e) => e.target.style.borderColor = '#009688'}
              />
              {localFormErrors.country && (
                <span style={styles.formError}>{localFormErrors.country}</span>
              )}
            </div>
          </div>

          {/* Linked Accounts Section (Read-only if exists) */}
          {localProfile.linkedAccounts && localProfile.linkedAccounts.length > 0 && (
            <div style={{
              backgroundColor: '#E0F6F4',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1.5rem'
            }}>
              <h4 style={{ color: '#124441', marginBottom: '0.5rem' }}>Linked Accounts</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {localProfile.linkedAccounts.map((account, index) => (
                  <span key={index} style={{
                    backgroundColor: '#009688',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '4px',
                    fontSize: '0.85rem'
                  }}>
                    {account === 'guardian' ? '👨‍👩‍👧‍👦 Guardian' : '💑 Spouse'}
                  </span>
                ))}
              </div>
              <p style={{ color: '#4F6F6B', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                These accounts were set up during signup and can access your profile
              </p>
            </div>
          )}

          {/* Action Buttons - Compact */}
          {isEditMode && (
            <div style={styles.actionButtons}>
              <button
                type="submit"
                style={{
                  ...styles.updateButton,
                  ...((!localIsFormValid || !hasChanges) && styles.updateButtonDisabled),
                  ...(isSubmitting && styles.updateButtonDisabled)
                }}
                disabled={!localIsFormValid || !hasChanges || isSubmitting}
                onMouseEnter={(e) => {
                  if (!isSubmitting && localIsFormValid && hasChanges) {
                    e.target.style.backgroundColor = '#00796B';
                    e.target.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting && localIsFormValid && hasChanges) {
                    e.target.style.backgroundColor = '#009688';
                    e.target.style.transform = 'translateY(0)';
                  }
                }}
              >
                {isSubmitting ? "🔄 Saving..." : hasChanges ? "Save Changes" : "No Changes"}
              </button>
              <button
                type="button"
                style={styles.cancelButton}
                onClick={handleCancelEditWithModal}
                disabled={isSubmitting}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#009688';
                  e.target.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#009688';
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default ProfileView;