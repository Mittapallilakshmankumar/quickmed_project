// // BaseLogin.js - Updated with Your Color Scheme
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';

// const BaseLogin = ({ userType, userDetails, onLoginSuccess, isLinkedAccount = false }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   // Get state from navigation (coming from signup)
//   const { signupSuccess, registeredEmail } = location.state || {};
  
//   // Email/Password Login States
//   const [email, setEmail] = useState(registeredEmail || '');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
  
//   // OTP Login States (only for users)
//   const [phone, setPhone] = useState('');
//   const [otp, setOtp] = useState('');
//   const [showOtpField, setShowOtpField] = useState(false);
//   const [otpTimer, setOtpTimer] = useState(0);
  
//   // Common States
//   const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'otp'
//   const [showToast, setShowToast] = useState(false);
//   const [toastMessage, setToastMessage] = useState('');
//   const [toastType, setToastType] = useState('success');
//   const [showForgotPassword, setShowForgotPassword] = useState(false);
//   const [forgotEmail, setForgotEmail] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [formErrors, setFormErrors] = useState({});

//   // Color Variables using your palette
//   const colors = {
//     primary: '#009688',
//     mint: '#4DB6AC',
//     softbg: '#E0F2F1',
//     white: '#FFFFFF',
//     darktext: '#124441',
//     softtext: '#4F6F6B'
//   };
//   // User-specific content based on userType
//   const userTypeContent = {
//     user: {
//       title: "Patient Portal",
//       quote: "Your health is our priority. Access your medical records, book appointments, and manage prescriptions all in one place.",
//       gradient: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.darktext} 100%)`,
//       features: [
//         { icon: "📋", text: "View medical records & history" },
//         { icon: "📅", text: "Book doctor appointments online" },
//         { icon: "💊", text: "Order medicines & track delivery" },
//         { icon: "📄", text: "Access digital prescriptions" },
//         { icon: "💬", text: "Chat with healthcare providers" }
//       ]
//     },
//     vendor: {
//       title: "Pharmacy Vendor Portal",
//       quote: "Manage your pharmacy inventory, process orders, and serve patients efficiently with our comprehensive vendor tools.",
//       gradient: `linear-gradient(135deg, ${colors.mint} 0%, #00695C 100%)`,
//       features: [
//         { icon: "📦", text: "Manage medicine inventory" },
//         { icon: "📋", text: "Process patient orders" },
//         { icon: "💰", text: "Track sales & revenue" },
//         { icon: "🚚", text: "Coordinate with delivery partners" },
//         { icon: "⭐", text: "Manage customer reviews" }
//       ]
//     },
//     delivery: {
//       title: "Medical Delivery Portal",
//       quote: "Join our network of healthcare heroes delivering medicines and supplies to those in need.",
//       gradient: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.darktext} 100%)`,
//       features: [
//         { icon: "📦", text: "View delivery assignments" },
//         { icon: "🗺️", text: "Track delivery routes" },
//         { icon: "🔄", text: "Update delivery status" },
//         { icon: "💰", text: "Earn delivery commissions" },
//         { icon: "⭐", text: "Access customer feedback" }
//       ]
//     },
//     doctor: {
//       title: "Doctor's Portal",
//       quote: "Provide exceptional care to your patients with our comprehensive medical practice management tools.",
//       gradient: `linear-gradient(135deg, ${colors.primary} 0%, #00695C 100%)`,
//       features: [
//         { icon: "👨‍⚕️", text: "Manage patient appointments" },
//         { icon: "📄", text: "Write digital prescriptions" },
//         { icon: "🏥", text: "Access patient medical history" },
//         { icon: "💬", text: "Consult with patients online" },
//         { icon: "📊", text: "Track practice analytics" }
//       ]
//     },
//     guardian: {
//       title: "Guardian Portal",
//       quote: "Care for your loved ones. Monitor their health, manage appointments, and ensure they receive the best care.",
//       gradient: `linear-gradient(135deg, ${colors.mint} 0%, ${colors.primary} 100%)`,
//       features: [
//         { icon: "👨‍👩‍👧", text: "Monitor dependent health records" },
//         { icon: "📅", text: "Schedule appointments for dependents" },
//         { icon: "💊", text: "Manage medication schedules" },
//         { icon: "🚨", text: "Emergency access to medical info" },
//         { icon: "📱", text: "Real-time health updates" }
//       ]
//     },
//     wife: {
//       title: "Family Care Portal",
//       quote: "Manage your family's healthcare needs from one place. Stay informed and proactive about family health.",
//       gradient: `linear-gradient(135deg, #E91E63 0%, ${colors.primary} 100%)`,
//       features: [
//         { icon: "👨‍👩‍👧‍👦", text: "Manage family health profiles" },
//         { icon: "📋", text: "Access family medical records" },
//         { icon: "💊", text: "Order medicines for family members" },
//         { icon: "🏥", text: "Coordinate family appointments" },
//         { icon: "📞", text: "Emergency family contact management" }
//       ]
//     }
//   };

//   // Get content for current user type
//   const currentContent = userTypeContent[userType] || userTypeContent.user;

//   // Check if user type should have OTP login
//   const shouldShowOTP = () => {
//     return userType === 'user' || userType === 'guardian' || userType === 'wife';
//   };

//   // Show signup success message if coming from signup
//   useEffect(() => {
//     if (signupSuccess) {
//       showToastMessage(`Account created successfully! Please login with your credentials.`, 'success');
//     }
//   }, [signupSuccess]);

//   // Timer for OTP
//   useEffect(() => {
//     let interval;
//     if (otpTimer > 0) {
//       interval = setInterval(() => {
//         setOtpTimer(prev => prev - 1);
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [otpTimer]);

//   // Initialize from localStorage for email login
//   useEffect(() => {
//     const remembered = localStorage.getItem('rememberMe');
//     if (remembered && loginMethod === 'email') {
//       try {
//         const rememberData = JSON.parse(remembered);
//         if (rememberData.userType === userType) {
//           setEmail(rememberData.email || '');
//           setRememberMe(true);
//         }
//       } catch (error) {
//         console.error('Error parsing remembered user:', error);
//       }
//     }
//   }, [userType, loginMethod]);

//   // Handle rememberMe toggle
//   const handleRememberMeChange = (e) => {
//     const isChecked = e.target.checked;
//     setRememberMe(isChecked);
    
//     if (!isChecked) {
//       localStorage.removeItem('rememberMe');
//     }
//   };

//   // Email/Password Authentication
//   const authenticateUser = (email, password, userType) => {
//     const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
//     const mockUsers = [
//       { email: 'user@quickmed.com', password: 'password123', userType: 'user', fullName: 'Demo User' },
//       { email: 'vendor@quickmed.com', password: 'password123', userType: 'vendor', fullName: 'Demo Vendor' },
//       { email: 'delivery@quickmed.com', password: 'password123', userType: 'delivery', fullName: 'Demo Delivery Partner' },
//       { email: 'doctor@quickmed.com', password: 'password123', userType: 'doctor', fullName: 'Demo Doctor' }
//     ];

//     const allUsers = [...registeredUsers, ...mockUsers];
    
//     const user = allUsers.find(u => 
//       u.email.toLowerCase() === email.toLowerCase() && 
//       u.password === password && 
//       u.userType === userType
//     );

//     return user;
//   };

//   // Generate OTP (only for users)
//   const generateOTP = () => {
//     // For demo purposes, always return 1234 for testing
//     return "1234";
//   };

//   // Validate phone number
//   const validatePhone = (phoneNumber) => {
//     const phoneRegex = /^[6-9]\d{9}$/;
//     return phoneRegex.test(phoneNumber.replace(/\D/g, ''));
//   };

//   // Form Validation
//   const validateForm = () => {
//     const errors = {};
    
//     if (loginMethod === 'email') {
//       if (!email.trim()) {
//         errors.email = 'Email is required';
//       } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//         errors.email = 'Please enter a valid email address';
//       }
      
//       if (!password.trim()) {
//         errors.password = 'Password is required';
//       }
//     } else if (shouldShowOTP()) {
//       const phoneNumber = phone.replace(/\D/g, '');
//       if (!phoneNumber) {
//         errors.phone = 'Phone number is required';
//       } else if (!validatePhone(phoneNumber)) {
//         errors.phone = 'Please enter a valid 10-digit Indian mobile number';
//       }
      
//       if (showOtpField && (!otp || otp.length !== 4)) {
//         errors.otp = 'Please enter a valid 4-digit OTP';
//       }
//     }
    
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   // Handle Email/Password Login (for all user types)
//   const handleEmailLogin = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       showToastMessage('Please fill in all required fields correctly', 'error');
//       return;
//     }

//     setIsLoading(true);
//     setFormErrors({});
    
//     try {
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       const user = authenticateUser(email, password, userType);
      
//       if (user) {
//         showToastMessage(`Welcome back, ${user.fullName || user.email}!`, 'success');
        
//         if (rememberMe) {
//           localStorage.setItem('rememberMe', JSON.stringify({
//             email: user.email,
//             userType: user.userType
//           }));
//         } else {
//           localStorage.removeItem('rememberMe');
//         }
        
//         localStorage.setItem('currentUser', JSON.stringify(user));
//         localStorage.setItem('lastLoginType', userType);
        
//         setEmail('');
//         setPassword('');
//         setRememberMe(false);
        
//         navigate(`/${userType}/dashboard`);
        
//         if (onLoginSuccess) {
//           onLoginSuccess(user);
//         }
//       } else {
//         showToastMessage('Invalid email or password. Please try again.', 'error');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       showToastMessage('An error occurred during login. Please try again.', 'error');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle OTP Login (only for users)
//   const handleSendOTP = async (e) => {
//     e?.preventDefault();
    
//     const phoneNumber = phone.replace(/\D/g, '');
    
//     if (!validatePhone(phoneNumber)) {
//       showToastMessage('Please enter a valid 10-digit Indian mobile number', 'error');
//       return;
//     }

//     setIsLoading(true);
    
//     try {
//       const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
//       const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
//       const combinedUsers = [...allUsers, ...registeredUsers];
      
//       const usersWithPhone = combinedUsers.filter(user => {
//         const userPhone = user.phone?.replace(/\D/g, '');
//         return userPhone === phoneNumber;
//       });

//       if (isLinkedAccount && usersWithPhone.length === 0) {
//         showToastMessage('No primary account found with this number', 'error');
//         setIsLoading(false);
//         return;
//       }

//       const generatedOtp = generateOTP();
//       const otpData = {
//         phone: phoneNumber,
//         otp: generatedOtp,
//         timestamp: Date.now(),
//         allowedRoles: usersWithPhone.map(user => user.userType)
//       };

//       const primaryUser = usersWithPhone.find(user => user.userType === 'user');
//       if (primaryUser?.linkedAccounts) {
//         otpData.allowedRoles = [...otpData.allowedRoles, ...primaryUser.linkedAccounts];
//       }

//       localStorage.setItem(`otp_${phoneNumber}`, JSON.stringify(otpData));
      
//       console.log(`OTP for ${phoneNumber}: ${generatedOtp} (Demo OTP: 1234)`);
      
//       showToastMessage(`OTP sent to ${phoneNumber} (Demo OTP: ${generatedOtp})`, 'success');
//       setShowOtpField(true);
//       setOtpTimer(60);
      
//     } catch (error) {
//       console.error('Error sending OTP:', error);
//       showToastMessage('Failed to send OTP. Please try again.', 'error');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleVerifyOTP = async (e) => {
//     e?.preventDefault();
    
//     if (!otp || otp.length !== 4) {
//       showToastMessage('Please enter a valid 4-digit OTP', 'error');
//       return;
//     }

//     setIsLoading(true);
    
//     try {
//       const phoneNumber = phone.replace(/\D/g, '');
//       const storedOtpData = JSON.parse(localStorage.getItem(`otp_${phoneNumber}`) || '{}');
      
//       // For demo, accept "1234" as valid OTP regardless of stored value
//       const isValidOTP = storedOtpData.otp === otp || otp === "1234";
      
//       if (!isValidOTP) {
//         showToastMessage('Invalid OTP. Please try again.', 'error');
//         setIsLoading(false);
//         return;
//       }
      
//       const currentTime = Date.now();
//       const otpAge = currentTime - storedOtpData.timestamp;
//       if (otpAge > 5 * 60 * 1000) {
//         showToastMessage('OTP has expired. Please request a new one.', 'error');
//         setIsLoading(false);
//         return;
//       }
      
//       const allowedRoles = storedOtpData.allowedRoles || [];
//       if (!allowedRoles.includes(userType) && userType !== 'user') {
//         showToastMessage(`This number is not registered for ${userDetails.label} access. Please check your role.`, 'error');
//         setIsLoading(false);
//         return;
//       }
      
//       const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
//       const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
//       const combinedUsers = [...allUsers, ...registeredUsers];
      
//       let user;
      
//       user = combinedUsers.find(u => 
//         u.phone?.replace(/\D/g, '') === phoneNumber && 
//         u.userType === userType
//       );
      
//       if (!user && userType !== 'user') {
//         const primaryUser = combinedUsers.find(u => 
//           u.phone?.replace(/\D/g, '') === phoneNumber && 
//           u.userType === 'user'
//         );
        
//         if (primaryUser) {
//           user = {
//             ...primaryUser,
//             userType: userType,
//             isLinkedAccount: true,
//             linkedFrom: primaryUser.id,
//             permissions: getPermissionsForRole(userType)
//           };
//         }
//       }
      
//       // Create demo user if not found (for testing)
//       if (!user && userType === 'user') {
//         user = {
//           id: `demo_${Date.now()}`,
//           phone: phoneNumber,
//           userType: 'user',
//           fullName: `Demo User ${phoneNumber.slice(-4)}`,
//           email: `user${phoneNumber.slice(-4)}@quickmed.com`
//         };
//       }
      
//       if (user) {
//         showToastMessage(`Welcome back, ${user.fullName || userDetails.label}!`, 'success');
        
//         localStorage.setItem('currentUser', JSON.stringify(user));
//         localStorage.setItem('lastLoginType', userType);
        
//         localStorage.removeItem(`otp_${phoneNumber}`);
        
//         navigate(`/${userType}/dashboard`);
        
//         if (onLoginSuccess) {
//           onLoginSuccess(user);
//         }
//       } else {
//         showToastMessage('Account not found. Please check your details.', 'error');
//       }
      
//     } catch (error) {
//       console.error('Error verifying OTP:', error);
//       showToastMessage('An error occurred. Please try again.', 'error');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getPermissionsForRole = (role) => {
//     const permissions = {
//       user: ['view_own_records', 'book_appointments', 'order_medicines', 'view_prescriptions'],
//       guardian: ['view_dependent_records', 'book_appointments', 'track_deliveries', 'emergency_access'],
//       wife: ['view_family_records', 'book_appointments', 'order_medicines', 'manage_prescriptions', 'emergency_access']
//     };
//     return permissions[role] || [];
//   };

//   const handleForgotPassword = async (e) => {
//     e.preventDefault();
    
//     if (!forgotEmail.trim()) {
//       showToastMessage('Please enter your email address', 'error');
//       return;
//     }

//     setIsLoading(true);
    
//     try {
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       showToastMessage(`Password reset link sent to ${forgotEmail}`, 'success');
//       setShowForgotPassword(false);
//       setForgotEmail('');
//     } catch (error) {
//       showToastMessage('Failed to send reset link. Please try again.', 'error');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const showToastMessage = (message, type) => {
//     setToastMessage(message);
//     setToastType(type);
//     setShowToast(true);
//     setTimeout(() => setShowToast(false), 3000);
//   };

//   const handleBackToSelection = () => {
//     navigate('/login');
//   };

//   const handleBackToHome = () => {
//     navigate('/');
//   };

//   const handleLoginMethodChange = (method) => {
//     setLoginMethod(method);
//     setShowOtpField(false);
//     setOtp('');
//     setFormErrors({});
//   };

//   const UserTypeIcon = () => {
//     const iconProps = {
//       width: "100",
//       height: "100",
//       viewBox: "0 0 24 24",
//       fill: "none",
//       stroke: colors.white,
//       strokeWidth: "1.5"
//     };

//     switch(userType) {
//       case 'user':
//         return (
//           <svg {...iconProps}>
//             <circle cx="12" cy="7" r="4"></circle>
//             <path d="M5 21v-2a7 7 0 0 1 14 0v2"></path>
//           </svg>
//         );
//       case 'vendor':
//         return (
//           <svg {...iconProps}>
//             <rect x="3" y="3" width="18" height="18" rx="2"></rect>
//             <line x1="9" y1="9" x2="15" y2="15"></line>
//             <line x1="15" y1="9" x2="9" y2="15"></line>
//           </svg>
//         );
//       case 'delivery':
//         return (
//           <svg {...iconProps}>
//             <circle cx="12" cy="12" r="10"></circle>
//             <polyline points="12 6 12 12 16 14"></polyline>
//           </svg>
//         );
//       case 'doctor':
//         return (
//           <svg {...iconProps}>
//             <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
//             <circle cx="9" cy="7" r="4"></circle>
//             <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
//             <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
//           </svg>
//         );
//       case 'guardian':
//         return (
//           <svg {...iconProps}>
//             <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
//             <circle cx="9" cy="7" r="4"></circle>
//             <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
//             <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
//           </svg>
//         );
//       case 'wife':
//         return (
//           <svg {...iconProps}>
//             <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
//             <circle cx="9" cy="7" r="4"></circle>
//             <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
//             <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
//           </svg>
//         );
//       default:
//         return (
//           <svg {...iconProps}>
//             <circle cx="12" cy="7" r="4"></circle>
//             <path d="M5 21v-2a7 7 0 0 1 14 0v2"></path>
//           </svg>
//         );
//     }
//   };

//   const EyeIcon = () => (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2">
//       <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
//       <circle cx="12" cy="12" r="3"></circle>
//     </svg>
//   );

//   const EyeOffIcon = () => (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2">
//       <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
//       <line x1="1" y1="1" x2="23" y2="23"></line>
//     </svg>
//   );

//   return (
//     <div className="login-container">
//       {/* Toast Message */}
//       {showToast && (
//         <div className={`toast-message ${toastType}`}>
//           {toastType === 'success' ? '✅ ' : '❌ '}{toastMessage}
//         </div>
//       )}

//       {/* Forgot Password Modal */}
//       {showForgotPassword && (
//         <div className="forgot-password-modal">
//           <div className="modal-content">
//             <h3>Reset Password</h3>
//             <p>Enter your email to receive a reset link</p>
            
//             <form onSubmit={handleForgotPassword}>
//               <div className="input-group">
//                 <input
//                   type="email"
//                   value={forgotEmail}
//                   onChange={(e) => setForgotEmail(e.target.value)}
//                   required
//                   placeholder="Enter your email"
//                   disabled={isLoading}
//                 />
//               </div>
              
//               <div className="modal-buttons">
//                 <button
//                   type="button"
//                   onClick={() => setShowForgotPassword(false)}
//                   disabled={isLoading}
//                   className="cancel-btn"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className="submit-btn"
//                 >
//                   {isLoading ? 'Sending...' : 'Send Link'}
//                 </button>
//               </div>
//             </form>
//           </div>
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
//         {/* Left Side - User Info (Dynamic based on userType) */}
//         <div 
//           className="left-section"
//           style={{ background: currentContent.gradient }}
//         >
//           <div className="user-icon">
//             <UserTypeIcon />
//           </div>
          
//           <h2 className="user-title">
//             {currentContent.title}
//           </h2>
          
//           <p className="user-quote">
//             {currentContent.quote}
//           </p>
          
//           <div className="features-list">
//             {currentContent.features.map((feature, index) => (
//               <div className="feature-item" key={index}>
//                 <span className="feature-icon">{feature.icon}</span>
//                 <span>{feature.text}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Right Side - Login Form */}
//         <div className="right-section">
//           <div className="form-header">
//             <h1 className="app-title">QUICKMED</h1>
//             <h2 className="login-title">{userDetails.label} Login</h2>
//             <p className="login-subtitle">
//               {isLinkedAccount 
//                 ? `Linked access to ${userType === 'guardian' ? 'dependent' : 'family'} account`
//                 : shouldShowOTP() ? 'Choose your preferred login method' : 'Enter your credentials to login'
//               }
//             </p>
//           </div>

//           {/* Signup Success Message */}
//           {signupSuccess && (
//             <div className="success-message">
//               <div className="success-icon">✓</div>
//               <div>
//                 <h4>Account Created Successfully!</h4>
//                 <p>Your account has been created. Please login with your credentials.</p>
//               </div>
//             </div>
//           )}

//           {/* Login Method Toggle - Only show for users, guardians, and wives */}
//           {shouldShowOTP() && (
//             <div className="login-method-toggle">
//               <button
//                 type="button"
//                 className={`method-btn ${loginMethod === 'email' ? 'active' : ''}`}
//                 onClick={() => handleLoginMethodChange('email')}
//                 disabled={isLoading}
//                 style={{ 
//                   backgroundColor: loginMethod === 'email' ? colors.primary : '',
//                   borderColor: loginMethod === 'email' ? colors.primary : ''
//                 }}
//               >
//                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
//                   <polyline points="22,6 12,13 2,6"></polyline>
//                 </svg>
//                 Email Login
//               </button>
//               <button
//                 type="button"
//                 className={`method-btn ${loginMethod === 'otp' ? 'active' : ''}`}
//                 onClick={() => handleLoginMethodChange('otp')}
//                 disabled={isLoading}
//                 style={{ 
//                   backgroundColor: loginMethod === 'otp' ? colors.primary : '',
//                   borderColor: loginMethod === 'otp' ? colors.primary : ''
//                 }}
//               >
//                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
//                 </svg>
//                 OTP Login
//               </button>
//             </div>
//           )}

//           {/* Email Login Form - For all user types */}
//           {!shouldShowOTP() || loginMethod === 'email' ? (
//             <form onSubmit={handleEmailLogin}>
//               <div className="input-group">
//                 <label>{userType === 'delivery' ? 'Partner Email' : 'Email Address'}</label>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   placeholder={`${userType}@example.com`}
//                   disabled={isLoading}
//                   className={formErrors.email ? 'error' : ''}
//                   style={{ borderColor: formErrors.email ? '#f44336' : colors.softbg }}
//                 />
//                 {formErrors.email && (
//                   <div className="error-message">{formErrors.email}</div>
//                 )}
//                 {signupSuccess && (
//                   <div className="input-hint">
//                     Email pre-filled from your recent signup
//                   </div>
//                 )}
//               </div>

//               <div className="input-group">
//                 <label>Password</label>
//                 <div className="password-input-wrapper">
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                     placeholder="Enter your password"
//                     disabled={isLoading}
//                     className={formErrors.password ? 'error' : ''}
//                     style={{ borderColor: formErrors.password ? '#f44336' : colors.softbg }}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="password-toggle"
//                     disabled={isLoading}
//                     tabIndex={0}
//                   >
//                     {showPassword ? <EyeOffIcon /> : <EyeIcon />}
//                   </button>
//                 </div>
//                 {formErrors.password && (
//                   <div className="error-message">{formErrors.password}</div>
//                 )}
//               </div>

//               <div className="form-options">
//                 <label className="remember-me">
//                   <input
//                     type="checkbox"
//                     checked={rememberMe}
//                     onChange={handleRememberMeChange}
//                     disabled={isLoading}
//                   />
//                   <span>Remember me</span>
//                 </label>
                
//                 <span 
//                   onClick={() => !isLoading && setShowForgotPassword(true)}
//                   className="forgot-password-link"
//                   tabIndex={0}
//                   role="button"
//                   style={{ color: colors.primary }}
//                 >
//                   Forgot Password?
//                 </span>
//               </div>
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="login-btn"
//                 style={{ 
//                   background: currentContent.gradient,
//                   '--hover-color': colors.primary
//                 }}
//               >
//                 {isLoading ? 'Signing In...' : `Login as ${userDetails.label}`}
//               </button>
//             </form>
//           ) : (
//             /* OTP Login Form - Only for users, guardians, and wives */
//             <form onSubmit={showOtpField ? handleVerifyOTP : handleSendOTP}>
//               <div className="input-group">
//                 <label>Phone Number *</label>
//                 <div className="phone-input-wrapper">
//                   <span className="country-code">+91</span>
//                   <input
//                     type="tel"
//                     value={phone}
//                     onChange={(e) => {
//                       const value = e.target.value.replace(/\D/g, '');
//                       if (value.length <= 10) {
//                         setPhone(value);
//                         if (formErrors.phone) {
//                           setFormErrors({ ...formErrors, phone: '' });
//                         }
//                       }
//                     }}
//                     required
//                     placeholder="Enter 10-digit mobile number"
//                     disabled={isLoading || showOtpField}
//                     className={formErrors.phone ? 'error' : ''}
//                     style={{ borderColor: formErrors.phone ? '#f44336' : colors.softbg }}
//                     maxLength={10}
//                   />
//                 </div>
//                 {formErrors.phone && (
//                   <div className="error-message">{formErrors.phone}</div>
//                 )}
//               </div>

//               {showOtpField && (
//                 <div className="input-group">
//                   <label>Enter OTP *</label>
//                   <div className="otp-input-wrapper">
//                     <input
//                       type="text"
//                       value={otp}
//                       onChange={(e) => {
//                         const value = e.target.value.replace(/\D/g, '');
//                         if (value.length <= 4) {
//                           setOtp(value);
//                         }
//                       }}
//                       required
//                       placeholder="Enter 4-digit OTP"
//                       disabled={isLoading}
//                       className="otp-input"
//                       maxLength={4}
//                     />
//                     {otpTimer > 0 ? (
//                       <span className="otp-timer">
//                         Resend OTP in {otpTimer}s
//                       </span>
//                     ) : (
//                       <button
//                         type="button"
//                         onClick={handleSendOTP}
//                         className="resend-otp-btn"
//                         disabled={isLoading}
//                         style={{ color: colors.primary }}
//                       >
//                         Resend OTP
//                       </button>
//                     )}
//                   </div>
//                   {formErrors.otp && (
//                     <div className="error-message">{formErrors.otp}</div>
//                   )}
//                   <div className="otp-hint">
//                     OTP sent to +91{phone}
//                   </div>
//                 </div>
//               )}

//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="login-btn"
//                 style={{ 
//                   background: currentContent.gradient,
//                   '--hover-color': colors.primary
//                 }}
//               >
//                 {isLoading 
//                   ? 'Processing...' 
//                   : showOtpField 
//                     ? 'Verify OTP & Login' 
//                     : 'Send OTP'
//                 }
//               </button>
//             </form>
//           )}

//           {/* Demo Note for OTP */}
//           {shouldShowOTP() && loginMethod === 'otp' && !showOtpField && (
//             <div className="demo-note">
//               <p>💡 <strong>Demo Note:</strong> Enter any valid Indian mobile number (10 digits). OTP is always <strong>1234</strong> for testing.</p>
//             </div>
//           )}

//           {shouldShowOTP() && loginMethod === 'otp' && showOtpField && (
//             <div className="demo-note">
//               <p>🔑 <strong>Demo OTP:</strong> Use <strong>1234</strong> to login (works for any phone number)</p>
//             </div>
//           )}

//           <div className="signup-section">
//             <p>
//               Don't have an account?{' '}
//               <span 
//                 onClick={() => !isLoading && navigate(`/signup/${userType}`)}
//                 className="signup-link"
//                 role="button"
//                 tabIndex={0}
//                 style={{ color: colors.primary }}
//               >
//                 Sign up as {userDetails.label}
//               </span>
//             </p>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         /* Color Variables using your palette */
//         :root {
//           --primary: ${colors.primary};
//           --mint: ${colors.mint};
//           --softbg: ${colors.softbg};
//           --white: ${colors.white};
//           --darktext: ${colors.darktext};
//           --softtext: ${colors.softtext};
//           --primary-dark: #00897B;
//         }

//         .login-container {
//           min-height: 100vh;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
//           background: linear-gradient(135deg, var(--softbg) 0%, var(--white) 50%, var(--softbg) 100%);
//           padding: 65px;
//           position: relative;
//         }

//         /* Success Message */
//         .success-message {
//           display: flex;
//           align-items: center;
//           gap: 15px;
//           background-color: #d4edda;
//           border: 1px solid #c3e6cb;
//           color: #155724;
//           padding: 15px;
//           border-radius: 8px;
//           margin-bottom: 20px;
//           animation: fadeIn 0.5s ease;
//         }

//         .success-icon {
//           width: 40px;
//           height: 40px;
//           background-color: var(--darktext);
//           color: white;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 20px;
//           font-weight: bold;
//         }

//         .success-message h4 {
//           margin: 0 0 5px 0;
//           font-size: 16px;
//         }

//         .success-message p {
//           margin: 0;
//           font-size: 14px;
//           opacity: 0.9;
//         }

//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         /* Toast Message */
//         .toast-message {
//           position: fixed;
//           top: 20px;
//           right: 20px;
//           padding: 12px 20px;
//           border-radius: 8px;
//           font-size: 14px;
//           font-weight: 500;
//           z-index: 1000;
//           animation: slideIn 0.3s ease;
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//         }

//         .toast-message.success {
//           background-color: #d4edda;
//           color: #155724;
//           border: 1px solid #c3e6cb;
//         }

//         .toast-message.error {
//           background-color: #f8d7da;
//           color: #721c24;
//           border: 1px solid #f5c6cb;
//         }

//         .toast-message.info {
//           background-color: #d1ecf1;
//           color: #0c5460;
//           border: 1px solid #bee5eb;
//         }

//         @keyframes slideIn {
//           from {
//             transform: translateX(100%);
//             opacity: 0;
//           }
//           to {
//             transform: translateX(0);
//             opacity: 1;
//           }
//         }

//         /* Forgot Password Modal */
//         .forgot-password-modal {
//           position: fixed;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background-color: rgba(0, 0, 0, 0.5);
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           z-index: 1000;
//         }

//         .modal-content {
//           background-color: var(--white);
//           padding: 30px;
//           border-radius: 12px;
//           width: 90%;
//           max-width: 400px;
//           box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
//         }

//         .modal-content h3 {
//           color: var(--darktext);
//           margin: 0 0 10px 0;
//         }

//         .modal-content p {
//           color: var(--softtext);
//           margin: 0 0 20px 0;
//           font-size: 14px;
//         }

//         .modal-buttons {
//           display: flex;
//           gap: 10px;
//           margin-top: 20px;
//         }

//         .cancel-btn, .submit-btn {
//           flex: 1;
//           padding: 12px;
//           border: none;
//           border-radius: 8px;
//           font-size: 14px;
//           font-weight: 500;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .cancel-btn {
//           background-color: var(--softbg);
//           color: var(--softtext);
//         }

//         .cancel-btn:hover:not(:disabled) {
//           background-color: #E0E0E0;
//         }

//         .submit-btn {
//           background-color: var(--primary);
//           color: var(--white);
//         }

//         .submit-btn:hover:not(:disabled) {
//           background-color: var(--primary-dark);
//         }

//         .cancel-btn:disabled,
//         .submit-btn:disabled {
//           opacity: 0.6;
//           cursor: not-allowed;
//         }

//         /* Back Buttons */
//         .back-buttons {
//           position: absolute;
//           top: 20px;
//           left: 20px;
//           display: flex;
//           gap: 10px;
//         }

//         .back-home-btn,
//         .back-selection-btn {
//           padding: 8px 16px;
//           background-color: var(--white);
//           color: var(--primary);
//           border: 2px solid var(--primary);
//           border-radius: 6px;
//           font-size: 14px;
//           font-weight: 500;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .back-home-btn:hover:not(:disabled),
//         .back-selection-btn:hover:not(:disabled) {
//           background-color: var(--primary);
//           color: var(--white);
//         }

//         .back-home-btn:disabled,
//         .back-selection-btn:disabled {
//           opacity: 0.5;
//           cursor: not-allowed;
//         }

//         /* Main Card */
//         .main-card {
//           display: flex;
//           width: 100%;
//           max-width: 1200px;
//           min-height: 600px;
//           background-color: var(--white);
//           border-radius: 20px;
//           overflow: hidden;
//           box-shadow: 0 15px 40px rgba(0, 150, 136, 0.15);
//         }

//         /* Left Section */
//         .left-section {
//           flex: 1;
//           padding: 50px 40px;
//           color: var(--white);
//           display: flex;
//           flex-direction: column;
//         }

//         .user-icon {
//           margin-bottom: 30px;
//         }

//         .user-title {
//           font-size: 32px;
//           font-weight: 700;
//           margin: 0 0 15px 0;
//           line-height: 1.2;
//         }

//         .user-quote {
//           font-size: 16px;
//           line-height: 1.6;
//           margin: 0 0 40px 0;
//           opacity: 0.9;
//         }

//         .features-list {
//           flex: 1;
//           display: flex;
//           flex-direction: column;
//           gap: 15px;
//         }

//         .feature-item {
//           display: flex;
//           align-items: center;
//           gap: 15px;
//           font-size: 15px;
//           background-color: rgba(255, 255, 255, 0.1);
//           padding: 15px;
//           border-radius: 10px;
//           backdrop-filter: blur(10px);
//           border: 1px solid rgba(255, 255, 255, 0.2);
//           transition: transform 0.3s ease, background-color 0.3s ease;
//         }

//         .feature-item:hover {
//           transform: translateX(5px);
//           background-color: rgba(255, 255, 255, 0.15);
//         }

//         .feature-icon {
//           font-size: 20px;
//           min-width: 30px;
//         }

//         /* Right Section */
//         .right-section {
//           flex: 1;
//           padding: 50px 60px;
//           display: flex;
//           flex-direction: column;
//         }

//         .form-header {
//           margin-bottom: 40px;
//           text-align: center;
//         }

//         .app-title {
//           color: var(--primary);
//           font-size: 36px;
//           font-weight: 700;
//           margin: 0 0 10px 0;
//           letter-spacing: 1px;
//         }

//         .login-title {
//           color: var(--darktext);
//           font-size: 28px;
//           font-weight: 600;
//           margin: 0 0 10px 0;
//         }

//         .login-subtitle {
//           color: var(--softtext);
//           font-size: 14px;
//           margin: 0;
//           min-height: 20px;
//         }

//         /* Login Method Toggle */
//         .login-method-toggle {
//           display: flex;
//           gap: 10px;
//           margin-bottom: 25px;
//           border: 1px solid var(--softbg);
//           border-radius: 8px;
//           padding: 4px;
//           background-color: var(--white);
//         }

//         .method-btn {
//           flex: 1;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 8px;
//           padding: 12px;
//           background: none;
//           border: none;
//           border-radius: 6px;
//           font-size: 14px;
//           font-weight: 500;
//           cursor: pointer;
//           color: var(--softtext);
//           transition: all 0.3s ease;
//         }

//         .method-btn:hover:not(:disabled) {
//           background-color: var(--softbg);
//           color: var(--darktext);
//         }

//         .method-btn.active {
//           color: var(--white);
//           box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
//         }

//         .method-btn:disabled {
//           opacity: 0.7;
//           cursor: not-allowed;
//         }

//         .method-btn svg {
//           stroke: currentColor;
//         }

//         /* Input Groups */
//         .input-group {
//           margin-bottom: 25px;
//         }

//         .input-group label {
//           display: block;
//           color: var(--darktext);
//           font-size: 14px;
//           font-weight: 500;
//           margin-bottom: 8px;
//         }

//         .input-group input {
//           width: 100%;
//           padding: 15px;
//           border: 2px solid var(--softbg);
//           border-radius: 10px;
//           font-size: 15px;
//           color: var(--darktext);
//           background-color: var(--white);
//           transition: all 0.3s ease;
//           box-sizing: border-box;
//         }

//         .input-group input:focus {
//           outline: none;
//           border-color: var(--primary);
//           box-shadow: 0 0 0 3px rgba(0, 150, 136, 0.1);
//         }

//         .input-group input.error {
//           border-color: #f44336 !important;
//         }

//         .input-group input:disabled {
//           background-color: #f5f5f5;
//           cursor: not-allowed;
//         }

//         .input-hint {
//           font-size: 12px;
//           color: var(--softtext);
//           margin-top: 5px;
//           font-style: italic;
//         }

//                 /* Password Input */
//         .password-input-wrapper {
//           position: relative;
//         }

//         .password-input-wrapper input {
//           width: 100%;
//           padding: 15px 45px 15px 15px;
//           border: 2px solid var(--softbg);
//           border-radius: 10px;
//           font-size: 15px;
//           color: var(--darktext);
//           background-color: var(--white);
//           transition: all 0.3s ease;
//           box-sizing: border-box;
//           font-family: 'Courier New', monospace;
//           letter-spacing: 1px;
//         }

//         .password-toggle {
//           position: absolute;
//           right: 15px;
//           top: 50%;
//           transform: translateY(-50%);
//           background: none;
//           border: none;
//           cursor: pointer;
//           padding: 0;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           width: 24px;
//           height: 24px;
//           border-radius: 4px; /* Changed from 50% to 4px */
//           transition: all 0.3s ease;
//           z-index: 2;
//           background-color: transparent; /* Explicitly set */
//         }

//         .password-toggle:hover:not(:disabled) {
//           background-color: var(--softbg);
//           transform: translateY(-50%) scale(1.05); /* Scale instead of background expansion */
//         }

//         .password-toggle:focus {
//           outline: 2px solid var(--primary);
//           outline-offset: 2px;
//         }

//         .password-toggle:disabled {
//           opacity: 0.5;
//           cursor: not-allowed;
//         }

//         /* Phone Input */
//         .phone-input-wrapper {
//           display: flex;
//           align-items: center;
//           border: 2px solid var(--softbg);
//           border-radius: 10px;
//           overflow: hidden;
//         }

//         .phone-input-wrapper:focus-within {
//           border-color: var(--primary);
//           box-shadow: 0 0 0 3px rgba(0, 150, 136, 0.1);
//         }

//         .country-code {
//           padding: 15px;
//           background-color: var(--softbg);
//           color: var(--darktext);
//           font-weight: 500;
//           border-right: 2px solid var(--softbg);
//         }

//         .phone-input-wrapper input {
//           flex: 1;
//           border: none;
//           padding: 15px;
//           border-radius: 0;
//         }

//         .phone-input-wrapper input:focus {
//           outline: none;
//           box-shadow: none;
//         }

//         /* OTP Input */
//         .otp-input-wrapper {
//           display: flex;
//           gap: 10px;
//           align-items: center;
//         }

//         .otp-input {
//           flex: 1;
//           text-align: center;
//           letter-spacing: 10px;
//           font-size: 20px;
//           font-weight: 600;
//           color: var(--darktext);
//         }

//         .otp-timer {
//           color: var(--softtext);
//           font-size: 13px;
//           min-width: 120px;
//           text-align: right;
//         }

//         .resend-otp-btn {
//           background: none;
//           border: none;
//           font-size: 13px;
//           font-weight: 500;
//           cursor: pointer;
//           min-width: 120px;
//           text-align: right;
//         }

//         .resend-otp-btn:hover:not(:disabled) {
//           text-decoration: underline;
//         }

//         .resend-otp-btn:disabled {
//           opacity: 0.5;
//           cursor: not-allowed;
//         }

//         .otp-hint {
//           font-size: 12px;
//           color: var(--softtext);
//           margin-top: 5px;
//         }

//         /* Error Message */
//         .error-message {
//           color: #f44336;
//           font-size: 12px;
//           margin-top: 5px;
//         }

//         /* Form Options */
//         .form-options {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 30px;
//         }

//         .remember-me {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           cursor: pointer;
//           color: var(--softtext);
//           font-size: 14px;
//         }

//         .remember-me input {
//           width: 16px;
//           height: 16px;
//           cursor: pointer;
//         }

//         .remember-me:has(input:disabled) {
//           opacity: 0.6;
//           cursor: not-allowed;
//         }

//         .forgot-password-link {
//           font-size: 14px;
//           font-weight: 500;
//           cursor: pointer;
//           text-decoration: none;
//         }

//         .forgot-password-link:hover {
//           text-decoration: underline;
//         }

//         /* Demo Credentials Button */
//         .demo-credentials {
//           margin-bottom: 20px;
//         }

//         .demo-btn {
//           width: 100%;
//           padding: 12px;
//           background-color: transparent;
//           border: 2px solid;
//           border-radius: 10px;
//           font-size: 14px;
//           font-weight: 500;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .demo-btn:hover:not(:disabled) {
//           background-color: var(--primary);
//           color: var(--white) !important;
//         }

//         .demo-btn:disabled {
//           opacity: 0.6;
//           cursor: not-allowed;
//         }

//         /* Login Button */
//         .login-btn {
//           width: 100%;
//           padding: 16px;
//           color: var(--white);
//           border: none;
//           border-radius: 10px;
//           font-size: 16px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           margin-bottom: 25px;
//         }

//         .login-btn:hover:not(:disabled) {
//           transform: translateY(-2px);
//           box-shadow: 0 6px 20px rgba(0, 150, 136, 0.3);
//           opacity: 0.9;
//         }

//         .login-btn:disabled {
//           opacity: 0.6;
//           cursor: not-allowed;
//         }

//         /* Demo Note */
//         .demo-note {
//           font-size: 12px;
//           color: var(--softtext);
//           background-color: var(--softbg);
//           padding: 12px;
//           border-radius: 10px;
//           margin-top: 15px;
//           border-left: 4px solid var(--mint);
//         }

//         .demo-note p {
//           margin: 0;
//         }

//         /* Signup Section */
//         .signup-section {
//           text-align: center;
//           margin-top: auto;
//           padding-top: 20px;
//           border-top: 1px solid var(--softbg);
//         }

//         .signup-section p {
//           color: var(--softtext);
//           font-size: 14px;
//           margin: 0;
//         }

//         .signup-link {
//           font-weight: 600;
//           cursor: pointer;
//           text-decoration: none;
//         }

//         .signup-link:hover {
//           text-decoration: underline;
//         }

//         /* Responsive Design */
//         @media (max-width: 768px) {
//           .login-container {
//             padding: 10px;
//           }

//           .main-card {
//             flex-direction: column;
//             min-height: auto;
//           }

//           .left-section,
//           .right-section {
//             padding: 30px 20px;
//           }

//           .user-title {
//             font-size: 24px;
//           }

//           .user-quote {
//             font-size: 14px;
//           }

//           .app-title {
//             font-size: 28px;
//           }

//           .login-title {
//             font-size: 22px;
//           }

//           .login-method-toggle {
//             flex-direction: column;
//           }

//           .back-buttons {
//             flex-direction: column;
//             gap: 5px;
//           }
//         }

//         @media (max-width: 480px) {
//           .left-section,
//           .right-section {
//             padding: 20px 15px;
//           }

//           .form-options {
//             flex-direction: column;
//             align-items: flex-start;
//             gap: 10px;
//           }

//           .forgot-password-link {
//             align-self: flex-end;
//           }

//           .modal-content {
//             padding: 20px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default BaseLogin;



// // BaseLogin.js - Updated with Your Color Scheme
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// const API_BASE_URL = "http://127.0.0.1:8000/api";

// const BaseLogin = ({ userType, userDetails, onLoginSuccess, isLinkedAccount = false }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   // Get state from navigation (coming from signup)
//   const { signupSuccess, registeredEmail } = location.state || {};
  
//   // Email/Password Login States
//   const [email, setEmail] = useState(registeredEmail || '');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
  
//   // OTP Login States (only for users)
//   const [phone, setPhone] = useState('');
//   const [otp, setOtp] = useState('');
//   const [showOtpField, setShowOtpField] = useState(false);
//   const [otpTimer, setOtpTimer] = useState(0);
  
//   // Common States
//   const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'otp'
//   const [showToast, setShowToast] = useState(false);
//   const [toastMessage, setToastMessage] = useState('');
//   const [toastType, setToastType] = useState('success');
//   const [showForgotPassword, setShowForgotPassword] = useState(false);
//   const [forgotEmail, setForgotEmail] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [formErrors, setFormErrors] = useState({});

//   // Color Variables using your palette
//   const colors = {
//     primary: '#009688',
//     mint: '#4DB6AC',
//     softbg: '#E0F2F1',
//     white: '#FFFFFF',
//     darktext: '#124441',
//     softtext: '#4F6F6B'
//   };
//   // User-specific content based on userType
//   const userTypeContent = {
//     user: {
//       title: "Patient Portal",
//       quote: "Your health is our priority. Access your medical records, book appointments, and manage prescriptions all in one place.",
//       gradient: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.darktext} 100%)`,
//       features: [
//         { icon: "📋", text: "View medical records & history" },
//         { icon: "📅", text: "Book doctor appointments online" },
//         { icon: "💊", text: "Order medicines & track delivery" },
//         { icon: "📄", text: "Access digital prescriptions" },
//         { icon: "💬", text: "Chat with healthcare providers" }
//       ]
//     },
//     vendor: {
//       title: "Pharmacy Vendor Portal",
//       quote: "Manage your pharmacy inventory, process orders, and serve patients efficiently with our comprehensive vendor tools.",
//       gradient: `linear-gradient(135deg, ${colors.mint} 0%, #00695C 100%)`,
//       features: [
//         { icon: "📦", text: "Manage medicine inventory" },
//         { icon: "📋", text: "Process patient orders" },
//         { icon: "💰", text: "Track sales & revenue" },
//         { icon: "🚚", text: "Coordinate with delivery partners" },
//         { icon: "⭐", text: "Manage customer reviews" }
//       ]
//     },
//     delivery: {
//       title: "Medical Delivery Portal",
//       quote: "Join our network of healthcare heroes delivering medicines and supplies to those in need.",
//       gradient: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.darktext} 100%)`,
//       features: [
//         { icon: "📦", text: "View delivery assignments" },
//         { icon: "🗺️", text: "Track delivery routes" },
//         { icon: "🔄", text: "Update delivery status" },
//         { icon: "💰", text: "Earn delivery commissions" },
//         { icon: "⭐", text: "Access customer feedback" }
//       ]
//     },
//     doctor: {
//       title: "Doctor's Portal",
//       quote: "Provide exceptional care to your patients with our comprehensive medical practice management tools.",
//       gradient: `linear-gradient(135deg, ${colors.primary} 0%, #00695C 100%)`,
//       features: [
//         { icon: "👨‍⚕️", text: "Manage patient appointments" },
//         { icon: "📄", text: "Write digital prescriptions" },
//         { icon: "🏥", text: "Access patient medical history" },
//         { icon: "💬", text: "Consult with patients online" },
//         { icon: "📊", text: "Track practice analytics" }
//       ]
//     },
//     guardian: {
//       title: "Guardian Portal",
//       quote: "Care for your loved ones. Monitor their health, manage appointments, and ensure they receive the best care.",
//       gradient: `linear-gradient(135deg, ${colors.mint} 0%, ${colors.primary} 100%)`,
//       features: [
//         { icon: "👨‍👩‍👧", text: "Monitor dependent health records" },
//         { icon: "📅", text: "Schedule appointments for dependents" },
//         { icon: "💊", text: "Manage medication schedules" },
//         { icon: "🚨", text: "Emergency access to medical info" },
//         { icon: "📱", text: "Real-time health updates" }
//       ]
//     },
//     wife: {
//       title: "Family Care Portal",
//       quote: "Manage your family's healthcare needs from one place. Stay informed and proactive about family health.",
//       gradient: `linear-gradient(135deg, #E91E63 0%, ${colors.primary} 100%)`,
//       features: [
//         { icon: "👨‍👩‍👧‍👦", text: "Manage family health profiles" },
//         { icon: "📋", text: "Access family medical records" },
//         { icon: "💊", text: "Order medicines for family members" },
//         { icon: "🏥", text: "Coordinate family appointments" },
//         { icon: "📞", text: "Emergency family contact management" }
//       ]
//     }
//   };

//   // Get content for current user type
//   const currentContent = userTypeContent[userType] || userTypeContent.user;

//   // Check if user type should have OTP login
//   const shouldShowOTP = () => {
//     return userType === 'user' || userType === 'guardian' || userType === 'wife';
//   };

//   // Show signup success message if coming from signup
//   useEffect(() => {
//     if (signupSuccess) {
//       showToastMessage(`Account created successfully! Please login with your credentials.`, 'success');
//     }
//   }, [signupSuccess]);

//   // Timer for OTP
//   useEffect(() => {
//     let interval;
//     if (otpTimer > 0) {
//       interval = setInterval(() => {
//         setOtpTimer(prev => prev - 1);
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [otpTimer]);

//   // Initialize from localStorage for email login
//   useEffect(() => {
//     const remembered = localStorage.getItem('rememberMe');
//     if (remembered && loginMethod === 'email') {
//       try {
//         const rememberData = JSON.parse(remembered);
//         if (rememberData.userType === userType) {
//           setEmail(rememberData.email || '');
//           setRememberMe(true);
//         }
//       } catch (error) {
//         console.error('Error parsing remembered user:', error);
//       }
//     }
//   }, [userType, loginMethod]);

//   // Handle rememberMe toggle
//   const handleRememberMeChange = (e) => {
//     const isChecked = e.target.checked;
//     setRememberMe(isChecked);
    
//     if (!isChecked) {
//       localStorage.removeItem('rememberMe');
//     }
//   };

//   // Generate OTP (only for users)
//   const generateOTP = () => {
//     // For demo purposes, always return 1234 for testing
//     return "1234";
//   };

//   // Validate phone number
//   const validatePhone = (phoneNumber) => {
//     const phoneRegex = /^[6-9]\d{9}$/;
//     return phoneRegex.test(phoneNumber.replace(/\D/g, ''));
//   };

//   // Form Validation
//   const validateForm = () => {
//     const errors = {};
    
//     if (loginMethod === 'email') {
//       if (!email.trim()) {
//         errors.email = 'Email is required';
//       } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//         errors.email = 'Please enter a valid email address';
//       }
      
//       if (!password.trim()) {
//         errors.password = 'Password is required';
//       }
//     } else if (shouldShowOTP()) {
//       const phoneNumber = phone.replace(/\D/g, '');
//       if (!phoneNumber) {
//         errors.phone = 'Phone number is required';
//       } else if (!validatePhone(phoneNumber)) {
//         errors.phone = 'Please enter a valid 10-digit Indian mobile number';
//       }
      
//       if (showOtpField && (!otp || otp.length !== 4)) {
//         errors.otp = 'Please enter a valid 4-digit OTP';
//       }
//     }
    
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   // Handle Email/Password Login (for all user types)
//   const handleEmailLogin = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       showToastMessage('Please fill in all required fields correctly', 'error');
//       return;
//     }

//     setIsLoading(true);
//     setFormErrors({});
//     try {
//   const response = await fetch(`${API_BASE_URL}/login/`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       email: email,
//       password: password,
//       userType: userType.toLowerCase(),
//     }),
//   });

//   const data = await response.json();

//   if (!response.ok) {
//     showToastMessage(data.error || "Login failed", "error");
//     return;
//   }

//   localStorage.setItem("currentUser", JSON.stringify(data.user));
//   localStorage.setItem("lastLoginType", data.user.userType);

//   showToastMessage(`Welcome ${data.user.fullName}`, "success");

//   navigate(`/${data.user.userType}/dashboard`);

//   if (onLoginSuccess) {
//     onLoginSuccess(data.user);
//   }

// } catch (error) {
//   console.error("Login error:", error);
//   showToastMessage("Server error. Please try again.", "error");
// } finally {
//   setIsLoading(false);
// }
//   };

    

//   // Handle OTP Login (only for users)
//   const handleSendOTP = async (e) => {
//     e?.preventDefault();
    
//     const phoneNumber = phone.replace(/\D/g, '');
    
//     if (!validatePhone(phoneNumber)) {
//       showToastMessage('Please enter a valid 10-digit Indian mobile number', 'error');
//       return;
//     }

//     setIsLoading(true);
    
//     try {
//       const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
//       const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
//       const combinedUsers = [...allUsers, ...registeredUsers];
      
//       const usersWithPhone = combinedUsers.filter(user => {
//         const userPhone = user.phone?.replace(/\D/g, '');
//         return userPhone === phoneNumber;
//       });

//       if (isLinkedAccount && usersWithPhone.length === 0) {
//         showToastMessage('No primary account found with this number', 'error');
//         setIsLoading(false);
//         return;
//       }

//       const generatedOtp = generateOTP();
//       const otpData = {
//         phone: phoneNumber,
//         otp: generatedOtp,
//         timestamp: Date.now(),
//         allowedRoles: usersWithPhone.map(user => user.userType)
//       };

//       const primaryUser = usersWithPhone.find(user => user.userType === 'user');
//       if (primaryUser?.linkedAccounts) {
//         otpData.allowedRoles = [...otpData.allowedRoles, ...primaryUser.linkedAccounts];
//       }

//       localStorage.setItem(`otp_${phoneNumber}`, JSON.stringify(otpData));
      
//       console.log(`OTP for ${phoneNumber}: ${generatedOtp} (Demo OTP: 1234)`);
      
//       showToastMessage(`OTP sent to ${phoneNumber} (Demo OTP: ${generatedOtp})`, 'success');
//       setShowOtpField(true);
//       setOtpTimer(60);
      
//     } catch (error) {
//       console.error('Error sending OTP:', error);
//       showToastMessage('Failed to send OTP. Please try again.', 'error');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleVerifyOTP = async (e) => {
//     e?.preventDefault();
    
//     if (!otp || otp.length !== 4) {
//       showToastMessage('Please enter a valid 4-digit OTP', 'error');
//       return;
//     }

//     setIsLoading(true);
    
//     try {
//       const phoneNumber = phone.replace(/\D/g, '');
//       const storedOtpData = JSON.parse(localStorage.getItem(`otp_${phoneNumber}`) || '{}');
      
//       // For demo, accept "1234" as valid OTP regardless of stored value
//       const isValidOTP = storedOtpData.otp === otp || otp === "1234";
      
//       if (!isValidOTP) {
//         showToastMessage('Invalid OTP. Please try again.', 'error');
//         setIsLoading(false);
//         return;
//       }
      
//       const currentTime = Date.now();
//       const otpAge = currentTime - storedOtpData.timestamp;
//       if (otpAge > 5 * 60 * 1000) {
//         showToastMessage('OTP has expired. Please request a new one.', 'error');
//         setIsLoading(false);
//         return;
//       }
      
//       const allowedRoles = storedOtpData.allowedRoles || [];
//       if (!allowedRoles.includes(userType) && userType !== 'user') {
//         showToastMessage(`This number is not registered for ${userDetails.label} access. Please check your role.`, 'error');
//         setIsLoading(false);
//         return;
//       }
      
//       const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
//       const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
//       const combinedUsers = [...allUsers, ...registeredUsers];
      
//       let user;
      
//       user = combinedUsers.find(u => 
//         u.phone?.replace(/\D/g, '') === phoneNumber && 
//         u.userType === userType
//       );
      
//       if (!user && userType !== 'user') {
//         const primaryUser = combinedUsers.find(u => 
//           u.phone?.replace(/\D/g, '') === phoneNumber && 
//           u.userType === 'user'
//         );
        
//         if (primaryUser) {
//           user = {
//             ...primaryUser,
//             userType: userType,
//             isLinkedAccount: true,
//             linkedFrom: primaryUser.id,
//             permissions: getPermissionsForRole(userType)
//           };
//         }
//       }
      
//       // Create demo user if not found (for testing)
//       if (!user && userType === 'user') {
//         user = {
//           id: `demo_${Date.now()}`,
//           phone: phoneNumber,
//           userType: 'user',
//           fullName: `Demo User ${phoneNumber.slice(-4)}`,
//           email: `user${phoneNumber.slice(-4)}@quickmed.com`
//         };
//       }
      
//       if (user) {
//         showToastMessage(`Welcome back, ${user.fullName || userDetails.label}!`, 'success');
        
//         localStorage.setItem('currentUser', JSON.stringify(user));
//         localStorage.setItem('lastLoginType', userType);
        
//         localStorage.removeItem(`otp_${phoneNumber}`);
        
//         navigate(`/${userType}/dashboard`);
        
//         if (onLoginSuccess) {
//           onLoginSuccess(user);
//         }
//       } else {
//         showToastMessage('Account not found. Please check your details.', 'error');
//       }
      
//     } catch (error) {
//       console.error('Error verifying OTP:', error);
//       showToastMessage('An error occurred. Please try again.', 'error');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getPermissionsForRole = (role) => {
//     const permissions = {
//       user: ['view_own_records', 'book_appointments', 'order_medicines', 'view_prescriptions'],
//       guardian: ['view_dependent_records', 'book_appointments', 'track_deliveries', 'emergency_access'],
//       wife: ['view_family_records', 'book_appointments', 'order_medicines', 'manage_prescriptions', 'emergency_access']
//     };
//     return permissions[role] || [];
//   };

//   const handleForgotPassword = async (e) => {
//     e.preventDefault();
    
//     if (!forgotEmail.trim()) {
//       showToastMessage('Please enter your email address', 'error');
//       return;
//     }

//     setIsLoading(true);
    
//     try {
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       showToastMessage(`Password reset link sent to ${forgotEmail}`, 'success');
//       setShowForgotPassword(false);
//       setForgotEmail('');
//     } catch (error) {
//       showToastMessage('Failed to send reset link. Please try again.', 'error');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const showToastMessage = (message, type) => {
//     setToastMessage(message);
//     setToastType(type);
//     setShowToast(true);
//     setTimeout(() => setShowToast(false), 3000);
//   };

//   const handleBackToSelection = () => {
//     navigate('/login');
//   };

//   const handleBackToHome = () => {
//     navigate('/');
//   };

//   const handleLoginMethodChange = (method) => {
//     setLoginMethod(method);
//     setShowOtpField(false);
//     setOtp('');
//     setFormErrors({});
//   };

//   const UserTypeIcon = () => {
//     const iconProps = {
//       width: "100",
//       height: "100",
//       viewBox: "0 0 24 24",
//       fill: "none",
//       stroke: colors.white,
//       strokeWidth: "1.5"
//     };

//     switch(userType) {
//       case 'user':
//         return (
//           <svg {...iconProps}>
//             <circle cx="12" cy="7" r="4"></circle>
//             <path d="M5 21v-2a7 7 0 0 1 14 0v2"></path>
//           </svg>
//         );
//       case 'vendor':
//         return (
//           <svg {...iconProps}>
//             <rect x="3" y="3" width="18" height="18" rx="2"></rect>
//             <line x1="9" y1="9" x2="15" y2="15"></line>
//             <line x1="15" y1="9" x2="9" y2="15"></line>
//           </svg>
//         );
//       case 'delivery':
//         return (
//           <svg {...iconProps}>
//             <circle cx="12" cy="12" r="10"></circle>
//             <polyline points="12 6 12 12 16 14"></polyline>
//           </svg>
//         );
//       case 'doctor':
//         return (
//           <svg {...iconProps}>
//             <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
//             <circle cx="9" cy="7" r="4"></circle>
//             <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
//             <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
//           </svg>
//         );
//       case 'guardian':
//         return (
//           <svg {...iconProps}>
//             <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
//             <circle cx="9" cy="7" r="4"></circle>
//             <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
//             <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
//           </svg>
//         );
//       case 'wife':
//         return (
//           <svg {...iconProps}>
//             <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
//             <circle cx="9" cy="7" r="4"></circle>
//             <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
//             <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
//           </svg>
//         );
//       default:
//         return (
//           <svg {...iconProps}>
//             <circle cx="12" cy="7" r="4"></circle>
//             <path d="M5 21v-2a7 7 0 0 1 14 0v2"></path>
//           </svg>
//         );
//     }
//   };

//   const EyeIcon = () => (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2">
//       <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
//       <circle cx="12" cy="12" r="3"></circle>
//     </svg>
//   );

//   const EyeOffIcon = () => (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2">
//       <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
//       <line x1="1" y1="1" x2="23" y2="23"></line>
//     </svg>
//   );

//   return (
//     <div className="login-container">
//       {/* Toast Message */}
//       {showToast && (
//         <div className={`toast-message ${toastType}`}>
//           {toastType === 'success' ? '✅ ' : '❌ '}{toastMessage}
//         </div>
//       )}

//       {/* Forgot Password Modal */}
//       {showForgotPassword && (
//         <div className="forgot-password-modal">
//           <div className="modal-content">
//             <h3>Reset Password</h3>
//             <p>Enter your email to receive a reset link</p>
            
//             <form onSubmit={handleForgotPassword}>
//               <div className="input-group">
//                 <input
//                   type="email"
//                   value={forgotEmail}
//                   onChange={(e) => setForgotEmail(e.target.value)}
//                   required
//                   placeholder="Enter your email"
//                   disabled={isLoading}
//                 />
//               </div>
              
//               <div className="modal-buttons">
//                 <button
//                   type="button"
//                   onClick={() => setShowForgotPassword(false)}
//                   disabled={isLoading}
//                   className="cancel-btn"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className="submit-btn"
//                 >
//                   {isLoading ? 'Sending...' : 'Send Link'}
//                 </button>
//               </div>
//             </form>
//           </div>
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
//         {/* Left Side - User Info (Dynamic based on userType) */}
//         <div 
//           className="left-section"
//           style={{ background: currentContent.gradient }}
//         >
//           <div className="user-icon">
//             <UserTypeIcon />
//           </div>
          
//           <h2 className="user-title">
//             {currentContent.title}
//           </h2>
          
//           <p className="user-quote">
//             {currentContent.quote}
//           </p>
          
//           <div className="features-list">
//             {currentContent.features.map((feature, index) => (
//               <div className="feature-item" key={index}>
//                 <span className="feature-icon">{feature.icon}</span>
//                 <span>{feature.text}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Right Side - Login Form */}
//         <div className="right-section">
//           <div className="form-header">
//             <h1 className="app-title">QUICKMED</h1>
//             <h2 className="login-title">{userDetails.label} Login</h2>
//             <p className="login-subtitle">
//               {isLinkedAccount 
//                 ? `Linked access to ${userType === 'guardian' ? 'dependent' : 'family'} account`
//                 : shouldShowOTP() ? 'Choose your preferred login method' : 'Enter your credentials to login'
//               }
//             </p>
//           </div>

//           {/* Signup Success Message */}
//           {signupSuccess && (
//             <div className="success-message">
//               <div className="success-icon">✓</div>
//               <div>
//                 <h4>Account Created Successfully!</h4>
//                 <p>Your account has been created. Please login with your credentials.</p>
//               </div>
//             </div>
//           )}

//           {/* Login Method Toggle - Only show for users, guardians, and wives */}
//           {shouldShowOTP() && (
//             <div className="login-method-toggle">
//               <button
//                 type="button"
//                 className={`method-btn ${loginMethod === 'email' ? 'active' : ''}`}
//                 onClick={() => handleLoginMethodChange('email')}
//                 disabled={isLoading}
//                 style={{ 
//                   backgroundColor: loginMethod === 'email' ? colors.primary : '',
//                   borderColor: loginMethod === 'email' ? colors.primary : ''
//                 }}
//               >
//                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
//                   <polyline points="22,6 12,13 2,6"></polyline>
//                 </svg>
//                 Email Login
//               </button>
//               <button
//                 type="button"
//                 className={`method-btn ${loginMethod === 'otp' ? 'active' : ''}`}
//                 onClick={() => handleLoginMethodChange('otp')}
//                 disabled={isLoading}
//                 style={{ 
//                   backgroundColor: loginMethod === 'otp' ? colors.primary : '',
//                   borderColor: loginMethod === 'otp' ? colors.primary : ''
//                 }}
//               >
//                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
//                 </svg>
//                 OTP Login
//               </button>
//             </div>
//           )}

//           {/* Email Login Form - For all user types */}
//           {!shouldShowOTP() || loginMethod === 'email' ? (
//             <form onSubmit={handleEmailLogin}>
//               <div className="input-group">
//                 <label>{userType === 'delivery' ? 'Partner Email' : 'Email Address'}</label>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   placeholder={`${userType}@example.com`}
//                   disabled={isLoading}
//                   className={formErrors.email ? 'error' : ''}
//                   style={{ borderColor: formErrors.email ? '#f44336' : colors.softbg }}
//                 />
//                 {formErrors.email && (
//                   <div className="error-message">{formErrors.email}</div>
//                 )}
//                 {signupSuccess && (
//                   <div className="input-hint">
//                     Email pre-filled from your recent signup
//                   </div>
//                 )}
//               </div>

//               <div className="input-group">
//                 <label>Password</label>
//                 <div className="password-input-wrapper">
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                     placeholder="Enter your password"
//                     disabled={isLoading}
//                     className={formErrors.password ? 'error' : ''}
//                     style={{ borderColor: formErrors.password ? '#f44336' : colors.softbg }}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="password-toggle"
//                     disabled={isLoading}
//                     tabIndex={0}
//                   >
//                     {showPassword ? <EyeOffIcon /> : <EyeIcon />}
//                   </button>
//                 </div>
//                 {formErrors.password && (
//                   <div className="error-message">{formErrors.password}</div>
//                 )}
//               </div>

//               <div className="form-options">
//                 <label className="remember-me">
//                   <input
//                     type="checkbox"
//                     checked={rememberMe}
//                     onChange={handleRememberMeChange}
//                     disabled={isLoading}
//                   />
//                   <span>Remember me</span>
//                 </label>
                
//                 <span 
//                   onClick={() => !isLoading && setShowForgotPassword(true)}
//                   className="forgot-password-link"
//                   tabIndex={0}
//                   role="button"
//                   style={{ color: colors.primary }}
//                 >
//                   Forgot Password?
//                 </span>
//               </div>
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="login-btn"
//                 style={{ 
//                   background: currentContent.gradient,
//                   '--hover-color': colors.primary
//                 }}
//               >
//                 {isLoading ? 'Signing In...' : `Login as ${userDetails.label}`}
//               </button>
//             </form>
//           ) : (
//             /* OTP Login Form - Only for users, guardians, and wives */
//             <form onSubmit={showOtpField ? handleVerifyOTP : handleSendOTP}>
//               <div className="input-group">
//                 <label>Phone Number *</label>
//                 <div className="phone-input-wrapper">
//                   <span className="country-code">+91</span>
//                   <input
//                     type="tel"
//                     value={phone}
//                     onChange={(e) => {
//                       const value = e.target.value.replace(/\D/g, '');
//                       if (value.length <= 10) {
//                         setPhone(value);
//                         if (formErrors.phone) {
//                           setFormErrors({ ...formErrors, phone: '' });
//                         }
//                       }
//                     }}
//                     required
//                     placeholder="Enter 10-digit mobile number"
//                     disabled={isLoading || showOtpField}
//                     className={formErrors.phone ? 'error' : ''}
//                     style={{ borderColor: formErrors.phone ? '#f44336' : colors.softbg }}
//                     maxLength={10}
//                   />
//                 </div>
//                 {formErrors.phone && (
//                   <div className="error-message">{formErrors.phone}</div>
//                 )}
//               </div>

//               {showOtpField && (
//                 <div className="input-group">
//                   <label>Enter OTP *</label>
//                   <div className="otp-input-wrapper">
//                     <input
//                       type="text"
//                       value={otp}
//                       onChange={(e) => {
//                         const value = e.target.value.replace(/\D/g, '');
//                         if (value.length <= 4) {
//                           setOtp(value);
//                         }
//                       }}
//                       required
//                       placeholder="Enter 4-digit OTP"
//                       disabled={isLoading}
//                       className="otp-input"
//                       maxLength={4}
//                     />
//                     {otpTimer > 0 ? (
//                       <span className="otp-timer">
//                         Resend OTP in {otpTimer}s
//                       </span>
//                     ) : (
//                       <button
//                         type="button"
//                         onClick={handleSendOTP}
//                         className="resend-otp-btn"
//                         disabled={isLoading}
//                         style={{ color: colors.primary }}
//                       >
//                         Resend OTP
//                       </button>
//                     )}
//                   </div>
//                   {formErrors.otp && (
//                     <div className="error-message">{formErrors.otp}</div>
//                   )}
//                   <div className="otp-hint">
//                     OTP sent to +91{phone}
//                   </div>
//                 </div>
//               )}

//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="login-btn"
//                 style={{ 
//                   background: currentContent.gradient,
//                   '--hover-color': colors.primary
//                 }}
//               >
//                 {isLoading 
//                   ? 'Processing...' 
//                   : showOtpField 
//                     ? 'Verify OTP & Login' 
//                     : 'Send OTP'
//                 }
//               </button>
//             </form>
//           )}

//           {/* Demo Note for OTP */}
//           {shouldShowOTP() && loginMethod === 'otp' && !showOtpField && (
//             <div className="demo-note">
//               <p>💡 <strong>Demo Note:</strong> Enter any valid Indian mobile number (10 digits). OTP is always <strong>1234</strong> for testing.</p>
//             </div>
//           )}

//           {shouldShowOTP() && loginMethod === 'otp' && showOtpField && (
//             <div className="demo-note">
//               <p>🔑 <strong>Demo OTP:</strong> Use <strong>1234</strong> to login (works for any phone number)</p>
//             </div>
//           )}

//           <div className="signup-section">
//             <p>
//               Don't have an account?{' '}
//               <span 
//                 onClick={() => !isLoading && navigate(`/signup/${userType}`)}
//                 className="signup-link"
//                 role="button"
//                 tabIndex={0}
//                 style={{ color: colors.primary }}
//               >
//                 Sign up as {userDetails.label}
//               </span>
//             </p>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         /* Color Variables using your palette */
//         :root {
//           --primary: ${colors.primary};
//           --mint: ${colors.mint};
//           --softbg: ${colors.softbg};
//           --white: ${colors.white};
//           --darktext: ${colors.darktext};
//           --softtext: ${colors.softtext};
//           --primary-dark: #00897B;
//         }

//         .login-container {
//           min-height: 100vh;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
//           background: linear-gradient(135deg, var(--softbg) 0%, var(--white) 50%, var(--softbg) 100%);
//           padding: 65px;
//           position: relative;
//         }

//         /* Success Message */
//         .success-message {
//           display: flex;
//           align-items: center;
//           gap: 15px;
//           background-color: #d4edda;
//           border: 1px solid #c3e6cb;
//           color: #155724;
//           padding: 15px;
//           border-radius: 8px;
//           margin-bottom: 20px;
//           animation: fadeIn 0.5s ease;
//         }

//         .success-icon {
//           width: 40px;
//           height: 40px;
//           background-color: var(--darktext);
//           color: white;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 20px;
//           font-weight: bold;
//         }

//         .success-message h4 {
//           margin: 0 0 5px 0;
//           font-size: 16px;
//         }

//         .success-message p {
//           margin: 0;
//           font-size: 14px;
//           opacity: 0.9;
//         }

//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         /* Toast Message */
//         .toast-message {
//           position: fixed;
//           top: 20px;
//           right: 20px;
//           padding: 12px 20px;
//           border-radius: 8px;
//           font-size: 14px;
//           font-weight: 500;
//           z-index: 1000;
//           animation: slideIn 0.3s ease;
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//         }

//         .toast-message.success {
//           background-color: #d4edda;
//           color: #155724;
//           border: 1px solid #c3e6cb;
//         }

//         .toast-message.error {
//           background-color: #f8d7da;
//           color: #721c24;
//           border: 1px solid #f5c6cb;
//         }

//         .toast-message.info {
//           background-color: #d1ecf1;
//           color: #0c5460;
//           border: 1px solid #bee5eb;
//         }

//         @keyframes slideIn {
//           from {
//             transform: translateX(100%);
//             opacity: 0;
//           }
//           to {
//             transform: translateX(0);
//             opacity: 1;
//           }
//         }

//         /* Forgot Password Modal */
//         .forgot-password-modal {
//           position: fixed;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background-color: rgba(0, 0, 0, 0.5);
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           z-index: 1000;
//         }

//         .modal-content {
//           background-color: var(--white);
//           padding: 30px;
//           border-radius: 12px;
//           width: 90%;
//           max-width: 400px;
//           box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
//         }

//         .modal-content h3 {
//           color: var(--darktext);
//           margin: 0 0 10px 0;
//         }

//         .modal-content p {
//           color: var(--softtext);
//           margin: 0 0 20px 0;
//           font-size: 14px;
//         }

//         .modal-buttons {
//           display: flex;
//           gap: 10px;
//           margin-top: 20px;
//         }

//         .cancel-btn, .submit-btn {
//           flex: 1;
//           padding: 12px;
//           border: none;
//           border-radius: 8px;
//           font-size: 14px;
//           font-weight: 500;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .cancel-btn {
//           background-color: var(--softbg);
//           color: var(--softtext);
//         }

//         .cancel-btn:hover:not(:disabled) {
//           background-color: #E0E0E0;
//         }

//         .submit-btn {
//           background-color: var(--primary);
//           color: var(--white);
//         }

//         .submit-btn:hover:not(:disabled) {
//           background-color: var(--primary-dark);
//         }

//         .cancel-btn:disabled,
//         .submit-btn:disabled {
//           opacity: 0.6;
//           cursor: not-allowed;
//         }

//         /* Back Buttons */
//         .back-buttons {
//           position: absolute;
//           top: 20px;
//           left: 20px;
//           display: flex;
//           gap: 10px;
//         }

//         .back-home-btn,
//         .back-selection-btn {
//           padding: 8px 16px;
//           background-color: var(--white);
//           color: var(--primary);
//           border: 2px solid var(--primary);
//           border-radius: 6px;
//           font-size: 14px;
//           font-weight: 500;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .back-home-btn:hover:not(:disabled),
//         .back-selection-btn:hover:not(:disabled) {
//           background-color: var(--primary);
//           color: var(--white);
//         }

//         .back-home-btn:disabled,
//         .back-selection-btn:disabled {
//           opacity: 0.5;
//           cursor: not-allowed;
//         }

//         /* Main Card */
//         .main-card {
//           display: flex;
//           width: 100%;
//           max-width: 1200px;
//           min-height: 600px;
//           background-color: var(--white);
//           border-radius: 20px;
//           overflow: hidden;
//           box-shadow: 0 15px 40px rgba(0, 150, 136, 0.15);
//         }

//         /* Left Section */
//         .left-section {
//           flex: 1;
//           padding: 50px 40px;
//           color: var(--white);
//           display: flex;
//           flex-direction: column;
//         }

//         .user-icon {
//           margin-bottom: 30px;
//         }

//         .user-title {
//           font-size: 32px;
//           font-weight: 700;
//           margin: 0 0 15px 0;
//           line-height: 1.2;
//         }

//         .user-quote {
//           font-size: 16px;
//           line-height: 1.6;
//           margin: 0 0 40px 0;
//           opacity: 0.9;
//         }

//         .features-list {
//           flex: 1;
//           display: flex;
//           flex-direction: column;
//           gap: 15px;
//         }

//         .feature-item {
//           display: flex;
//           align-items: center;
//           gap: 15px;
//           font-size: 15px;
//           background-color: rgba(255, 255, 255, 0.1);
//           padding: 15px;
//           border-radius: 10px;
//           backdrop-filter: blur(10px);
//           border: 1px solid rgba(255, 255, 255, 0.2);
//           transition: transform 0.3s ease, background-color 0.3s ease;
//         }

//         .feature-item:hover {
//           transform: translateX(5px);
//           background-color: rgba(255, 255, 255, 0.15);
//         }

//         .feature-icon {
//           font-size: 20px;
//           min-width: 30px;
//         }

//         /* Right Section */
//         .right-section {
//           flex: 1;
//           padding: 50px 60px;
//           display: flex;
//           flex-direction: column;
//         }

//         .form-header {
//           margin-bottom: 40px;
//           text-align: center;
//         }

//         .app-title {
//           color: var(--primary);
//           font-size: 36px;
//           font-weight: 700;
//           margin: 0 0 10px 0;
//           letter-spacing: 1px;
//         }

//         .login-title {
//           color: var(--darktext);
//           font-size: 28px;
//           font-weight: 600;
//           margin: 0 0 10px 0;
//         }

//         .login-subtitle {
//           color: var(--softtext);
//           font-size: 14px;
//           margin: 0;
//           min-height: 20px;
//         }

//         /* Login Method Toggle */
//         .login-method-toggle {
//           display: flex;
//           gap: 10px;
//           margin-bottom: 25px;
//           border: 1px solid var(--softbg);
//           border-radius: 8px;
//           padding: 4px;
//           background-color: var(--white);
//         }

//         .method-btn {
//           flex: 1;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 8px;
//           padding: 12px;
//           background: none;
//           border: none;
//           border-radius: 6px;
//           font-size: 14px;
//           font-weight: 500;
//           cursor: pointer;
//           color: var(--softtext);
//           transition: all 0.3s ease;
//         }

//         .method-btn:hover:not(:disabled) {
//           background-color: var(--softbg);
//           color: var(--darktext);
//         }

//         .method-btn.active {
//           color: var(--white);
//           box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
//         }

//         .method-btn:disabled {
//           opacity: 0.7;
//           cursor: not-allowed;
//         }

//         .method-btn svg {
//           stroke: currentColor;
//         }

//         /* Input Groups */
//         .input-group {
//           margin-bottom: 25px;
//         }

//         .input-group label {
//           display: block;
//           color: var(--darktext);
//           font-size: 14px;
//           font-weight: 500;
//           margin-bottom: 8px;
//         }

//         .input-group input {
//           width: 100%;
//           padding: 15px;
//           border: 2px solid var(--softbg);
//           border-radius: 10px;
//           font-size: 15px;
//           color: var(--darktext);
//           background-color: var(--white);
//           transition: all 0.3s ease;
//           box-sizing: border-box;
//         }

//         .input-group input:focus {
//           outline: none;
//           border-color: var(--primary);
//           box-shadow: 0 0 0 3px rgba(0, 150, 136, 0.1);
//         }

//         .input-group input.error {
//           border-color: #f44336 !important;
//         }

//         .input-group input:disabled {
//           background-color: #f5f5f5;
//           cursor: not-allowed;
//         }

//         .input-hint {
//           font-size: 12px;
//           color: var(--softtext);
//           margin-top: 5px;
//           font-style: italic;
//         }

//                 /* Password Input */
//         .password-input-wrapper {
//           position: relative;
//         }

//         .password-input-wrapper input {
//           width: 100%;
//           padding: 15px 45px 15px 15px;
//           border: 2px solid var(--softbg);
//           border-radius: 10px;
//           font-size: 15px;
//           color: var(--darktext);
//           background-color: var(--white);
//           transition: all 0.3s ease;
//           box-sizing: border-box;
//           font-family: 'Courier New', monospace;
//           letter-spacing: 1px;
//         }

//         .password-toggle {
//           position: absolute;
//           right: 15px;
//           top: 50%;
//           transform: translateY(-50%);
//           background: none;
//           border: none;
//           cursor: pointer;
//           padding: 0;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           width: 24px;
//           height: 24px;
//           border-radius: 4px; /* Changed from 50% to 4px */
//           transition: all 0.3s ease;
//           z-index: 2;
//           background-color: transparent; /* Explicitly set */
//         }

//         .password-toggle:hover:not(:disabled) {
//           background-color: var(--softbg);
//           transform: translateY(-50%) scale(1.05); /* Scale instead of background expansion */
//         }

//         .password-toggle:focus {
//           outline: 2px solid var(--primary);
//           outline-offset: 2px;
//         }

//         .password-toggle:disabled {
//           opacity: 0.5;
//           cursor: not-allowed;
//         }

//         /* Phone Input */
//         .phone-input-wrapper {
//           display: flex;
//           align-items: center;
//           border: 2px solid var(--softbg);
//           border-radius: 10px;
//           overflow: hidden;
//         }

//         .phone-input-wrapper:focus-within {
//           border-color: var(--primary);
//           box-shadow: 0 0 0 3px rgba(0, 150, 136, 0.1);
//         }

//         .country-code {
//           padding: 15px;
//           background-color: var(--softbg);
//           color: var(--darktext);
//           font-weight: 500;
//           border-right: 2px solid var(--softbg);
//         }

//         .phone-input-wrapper input {
//           flex: 1;
//           border: none;
//           padding: 15px;
//           border-radius: 0;
//         }

//         .phone-input-wrapper input:focus {
//           outline: none;
//           box-shadow: none;
//         }

//         /* OTP Input */
//         .otp-input-wrapper {
//           display: flex;
//           gap: 10px;
//           align-items: center;
//         }

//         .otp-input {
//           flex: 1;
//           text-align: center;
//           letter-spacing: 10px;
//           font-size: 20px;
//           font-weight: 600;
//           color: var(--darktext);
//         }

//         .otp-timer {
//           color: var(--softtext);
//           font-size: 13px;
//           min-width: 120px;
//           text-align: right;
//         }

//         .resend-otp-btn {
//           background: none;
//           border: none;
//           font-size: 13px;
//           font-weight: 500;
//           cursor: pointer;
//           min-width: 120px;
//           text-align: right;
//         }

//         .resend-otp-btn:hover:not(:disabled) {
//           text-decoration: underline;
//         }

//         .resend-otp-btn:disabled {
//           opacity: 0.5;
//           cursor: not-allowed;
//         }

//         .otp-hint {
//           font-size: 12px;
//           color: var(--softtext);
//           margin-top: 5px;
//         }

//         /* Error Message */
//         .error-message {
//           color: #f44336;
//           font-size: 12px;
//           margin-top: 5px;
//         }

//         /* Form Options */
//         .form-options {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 30px;
//         }

//         .remember-me {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           cursor: pointer;
//           color: var(--softtext);
//           font-size: 14px;
//         }

//         .remember-me input {
//           width: 16px;
//           height: 16px;
//           cursor: pointer;
//         }

//         .remember-me:has(input:disabled) {
//           opacity: 0.6;
//           cursor: not-allowed;
//         }

//         .forgot-password-link {
//           font-size: 14px;
//           font-weight: 500;
//           cursor: pointer;
//           text-decoration: none;
//         }

//         .forgot-password-link:hover {
//           text-decoration: underline;
//         }

//         /* Demo Credentials Button */
//         .demo-credentials {
//           margin-bottom: 20px;
//         }

//         .demo-btn {
//           width: 100%;
//           padding: 12px;
//           background-color: transparent;
//           border: 2px solid;
//           border-radius: 10px;
//           font-size: 14px;
//           font-weight: 500;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .demo-btn:hover:not(:disabled) {
//           background-color: var(--primary);
//           color: var(--white) !important;
//         }

//         .demo-btn:disabled {
//           opacity: 0.6;
//           cursor: not-allowed;
//         }

//         /* Login Button */
//         .login-btn {
//           width: 100%;
//           padding: 16px;
//           color: var(--white);
//           border: none;
//           border-radius: 10px;
//           font-size: 16px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           margin-bottom: 25px;
//         }

//         .login-btn:hover:not(:disabled) {
//           transform: translateY(-2px);
//           box-shadow: 0 6px 20px rgba(0, 150, 136, 0.3);
//           opacity: 0.9;
//         }

//         .login-btn:disabled {
//           opacity: 0.6;
//           cursor: not-allowed;
//         }

//         /* Demo Note */
//         .demo-note {
//           font-size: 12px;
//           color: var(--softtext);
//           background-color: var(--softbg);
//           padding: 12px;
//           border-radius: 10px;
//           margin-top: 15px;
//           border-left: 4px solid var(--mint);
//         }

//         .demo-note p {
//           margin: 0;
//         }

//         /* Signup Section */
//         .signup-section {
//           text-align: center;
//           margin-top: auto;
//           padding-top: 20px;
//           border-top: 1px solid var(--softbg);
//         }

//         .signup-section p {
//           color: var(--softtext);
//           font-size: 14px;
//           margin: 0;
//         }

//         .signup-link {
//           font-weight: 600;
//           cursor: pointer;
//           text-decoration: none;
//         }

//         .signup-link:hover {
//           text-decoration: underline;
//         }

//         /* Responsive Design */
//         @media (max-width: 768px) {
//           .login-container {
//             padding: 10px;
//           }

//           .main-card {
//             flex-direction: column;
//             min-height: auto;
//           }

//           .left-section,
//           .right-section {
//             padding: 30px 20px;
//           }

//           .user-title {
//             font-size: 24px;
//           }

//           .user-quote {
//             font-size: 14px;
//           }

//           .app-title {
//             font-size: 28px;
//           }

//           .login-title {
//             font-size: 22px;
//           }

//           .login-method-toggle {
//             flex-direction: column;
//           }

//           .back-buttons {
//             flex-direction: column;
//             gap: 5px;
//           }
//         }

//         @media (max-width: 480px) {
//           .left-section,
//           .right-section {
//             padding: 20px 15px;
//           }

//           .form-options {
//             flex-direction: column;
//             align-items: flex-start;
//             gap: 10px;
//           }

//           .forgot-password-link {
//             align-self: flex-end;
//           }

//           .modal-content {
//             padding: 20px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };
// export default BaseLogin;






// // BaseLogin.js - Updated with Your Color Scheme
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// const API_BASE_URL = "http://127.0.0.1:8000/api";

// const BaseLogin = ({ userType, userDetails, onLoginSuccess, isLinkedAccount = false }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   // Get state from navigation (coming from signup)
//   const { signupSuccess, registeredEmail } = location.state || {};
  
//   // Email/Password Login States
//   const [email, setEmail] = useState(registeredEmail || '');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
  
//   // OTP Login States (only for users)
//   const [phone, setPhone] = useState('');
//   const [otp, setOtp] = useState('');
//   const [showOtpField, setShowOtpField] = useState(false);
//   const [otpTimer, setOtpTimer] = useState(0);
  
//   // Common States
//   const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'otp'
//   const [showToast, setShowToast] = useState(false);
//   const [toastMessage, setToastMessage] = useState('');
//   const [toastType, setToastType] = useState('success');
//   const [showForgotPassword, setShowForgotPassword] = useState(false);
//   const [forgotEmail, setForgotEmail] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [formErrors, setFormErrors] = useState({});

//   // Color Variables using your palette
//   const colors = {
//     primary: '#009688',
//     mint: '#4DB6AC',
//     softbg: '#E0F2F1',
//     white: '#FFFFFF',
//     darktext: '#124441',
//     softtext: '#4F6F6B'
//   };
//   // User-specific content based on userType
//   const userTypeContent = {
//     user: {
//       title: "Patient Portal",
//       quote: "Your health is our priority. Access your medical records, book appointments, and manage prescriptions all in one place.",
//       gradient: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.darktext} 100%)`,
//       features: [
//         { icon: "📋", text: "View medical records & history" },
//         { icon: "📅", text: "Book doctor appointments online" },
//         { icon: "💊", text: "Order medicines & track delivery" },
//         { icon: "📄", text: "Access digital prescriptions" },
//         { icon: "💬", text: "Chat with healthcare providers" }
//       ]
//     },
//     vendor: {
//       title: "Pharmacy Vendor Portal",
//       quote: "Manage your pharmacy inventory, process orders, and serve patients efficiently with our comprehensive vendor tools.",
//       gradient: `linear-gradient(135deg, ${colors.mint} 0%, #00695C 100%)`,
//       features: [
//         { icon: "📦", text: "Manage medicine inventory" },
//         { icon: "📋", text: "Process patient orders" },
//         { icon: "💰", text: "Track sales & revenue" },
//         { icon: "🚚", text: "Coordinate with delivery partners" },
//         { icon: "⭐", text: "Manage customer reviews" }
//       ]
//     },
//     delivery: {
//       title: "Medical Delivery Portal",
//       quote: "Join our network of healthcare heroes delivering medicines and supplies to those in need.",
//       gradient: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.darktext} 100%)`,
//       features: [
//         { icon: "📦", text: "View delivery assignments" },
//         { icon: "🗺️", text: "Track delivery routes" },
//         { icon: "🔄", text: "Update delivery status" },
//         { icon: "💰", text: "Earn delivery commissions" },
//         { icon: "⭐", text: "Access customer feedback" }
//       ]
//     },
//     doctor: {
//       title: "Doctor's Portal",
//       quote: "Provide exceptional care to your patients with our comprehensive medical practice management tools.",
//       gradient: `linear-gradient(135deg, ${colors.primary} 0%, #00695C 100%)`,
//       features: [
//         { icon: "👨‍⚕️", text: "Manage patient appointments" },
//         { icon: "📄", text: "Write digital prescriptions" },
//         { icon: "🏥", text: "Access patient medical history" },
//         { icon: "💬", text: "Consult with patients online" },
//         { icon: "📊", text: "Track practice analytics" }
//       ]
//     },
//     guardian: {
//       title: "Guardian Portal",
//       quote: "Care for your loved ones. Monitor their health, manage appointments, and ensure they receive the best care.",
//       gradient: `linear-gradient(135deg, ${colors.mint} 0%, ${colors.primary} 100%)`,
//       features: [
//         { icon: "👨‍👩‍👧", text: "Monitor dependent health records" },
//         { icon: "📅", text: "Schedule appointments for dependents" },
//         { icon: "💊", text: "Manage medication schedules" },
//         { icon: "🚨", text: "Emergency access to medical info" },
//         { icon: "📱", text: "Real-time health updates" }
//       ]
//     },
//     wife: {
//       title: "Family Care Portal",
//       quote: "Manage your family's healthcare needs from one place. Stay informed and proactive about family health.",
//       gradient: `linear-gradient(135deg, #E91E63 0%, ${colors.primary} 100%)`,
//       features: [
//         { icon: "👨‍👩‍👧‍👦", text: "Manage family health profiles" },
//         { icon: "📋", text: "Access family medical records" },
//         { icon: "💊", text: "Order medicines for family members" },
//         { icon: "🏥", text: "Coordinate family appointments" },
//         { icon: "📞", text: "Emergency family contact management" }
//       ]
//     }
//   };

//   // Get content for current user type
//   const currentContent = userTypeContent[userType] || userTypeContent.user;

//   // Check if user type should have OTP login
//   const shouldShowOTP = () => {
//     return userType === 'user' || userType === 'guardian' || userType === 'wife';
//   };

//   // Show signup success message if coming from signup
//   useEffect(() => {
//     if (signupSuccess) {
//       showToastMessage(`Account created successfully! Please login with your credentials.`, 'success');
//     }
//   }, [signupSuccess]);

//   // Timer for OTP
//   useEffect(() => {
//     let interval;
//     if (otpTimer > 0) {
//       interval = setInterval(() => {
//         setOtpTimer(prev => prev - 1);
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [otpTimer]);

//   // Initialize from localStorage for email login
//   useEffect(() => {
//     const remembered = localStorage.getItem('rememberMe');
//     if (remembered && loginMethod === 'email') {
//       try {
//         const rememberData = JSON.parse(remembered);
//         if (rememberData.userType === userType) {
//           setEmail(rememberData.email || '');
//           setRememberMe(true);
//         }
//       } catch (error) {
//         console.error('Error parsing remembered user:', error);
//       }
//     }
//   }, [userType, loginMethod]);

//   // Handle rememberMe toggle
//   const handleRememberMeChange = (e) => {
//     const isChecked = e.target.checked;
//     setRememberMe(isChecked);
    
//     if (!isChecked) {
//       localStorage.removeItem('rememberMe');
//     }
//   };

//   // Generate OTP (only for users)
//   const generateOTP = () => {
//     // For demo purposes, always return 1234 for testing
//     return "1234";
//   };

//   // Validate phone number
//   const validatePhone = (phoneNumber) => {
//     const phoneRegex = /^[6-9]\d{9}$/;
//     return phoneRegex.test(phoneNumber.replace(/\D/g, ''));
//   };

//   // Form Validation
//   const validateForm = () => {
//     const errors = {};
    
//     if (loginMethod === 'email') {
//       if (!email.trim()) {
//         errors.email = 'Email is required';
//       } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//         errors.email = 'Please enter a valid email address';
//       }
      
//       if (!password.trim()) {
//         errors.password = 'Password is required';
//       }
//     } else if (shouldShowOTP()) {
//       const phoneNumber = phone.replace(/\D/g, '');
//       if (!phoneNumber) {
//         errors.phone = 'Phone number is required';
//       } else if (!validatePhone(phoneNumber)) {
//         errors.phone = 'Please enter a valid 10-digit Indian mobile number';
//       }
      
//       if (showOtpField && (!otp || otp.length !== 4)) {
//         errors.otp = 'Please enter a valid 4-digit OTP';
//       }
//     }
    
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   // Handle Email/Password Login (for all user types)
//   const handleEmailLogin = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       showToastMessage('Please fill in all required fields correctly', 'error');
//       return;
//     }

//     setIsLoading(true);
//     setFormErrors({});
//     try {
//   const response = await fetch(`${API_BASE_URL}/login/`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       email: email,
//       password: password,
//       userType: userType.toLowerCase(),
//     }),
//   });

//   const data = await response.json();

//   if (!response.ok) {
//     showToastMessage(data.error || "Login failed", "error");
//     return;
//   }
//   // ✅ FETCH USER PROFILE AFTER LOGIN
// const profileResponse = await fetch(
//   `${API_BASE_URL}/accounts/profile/?email=${data.user.email}`
// );

// if (profileResponse.ok) {
//   const profileData = await profileResponse.json();

//   // save profile so Profile page can use it
//   localStorage.setItem("userProfile", JSON.stringify(profileData));
// }
// navigate(`/${data.user.userType}/dashboard`);

//   localStorage.setItem("currentUser", JSON.stringify(data.user));
//   localStorage.setItem("lastLoginType", data.user.userType);

//   showToastMessage(`Welcome ${data.user.fullName}`, "success");

//   navigate(`/${data.user.userType}/dashboard`);

//   if (onLoginSuccess) {
//     onLoginSuccess(data.user);
//   }

// } catch (error) {
//   console.error("Login error:", error);
//   showToastMessage("Server error. Please try again.", "error");
// } finally {
//   setIsLoading(false);
// }
//   };

    

//   // Handle OTP Login (only for users)
//   const handleSendOTP = async (e) => {
//     e?.preventDefault();
    
//     const phoneNumber = phone.replace(/\D/g, '');
    
//     if (!validatePhone(phoneNumber)) {
//       showToastMessage('Please enter a valid 10-digit Indian mobile number', 'error');
//       return;
//     }

//     setIsLoading(true);
    
//     try {
//       const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
//       const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
//       const combinedUsers = [...allUsers, ...registeredUsers];
      
//       const usersWithPhone = combinedUsers.filter(user => {
//         const userPhone = user.phone?.replace(/\D/g, '');
//         return userPhone === phoneNumber;
//       });

//       if (isLinkedAccount && usersWithPhone.length === 0) {
//         showToastMessage('No primary account found with this number', 'error');
//         setIsLoading(false);
//         return;
//       }

//       const generatedOtp = generateOTP();
//       const otpData = {
//         phone: phoneNumber,
//         otp: generatedOtp,
//         timestamp: Date.now(),
//         allowedRoles: usersWithPhone.map(user => user.userType)
//       };

//       const primaryUser = usersWithPhone.find(user => user.userType === 'user');
//       if (primaryUser?.linkedAccounts) {
//         otpData.allowedRoles = [...otpData.allowedRoles, ...primaryUser.linkedAccounts];
//       }

//       localStorage.setItem(`otp_${phoneNumber}`, JSON.stringify(otpData));
      
//       console.log(`OTP for ${phoneNumber}: ${generatedOtp} (Demo OTP: 1234)`);
      
//       showToastMessage(`OTP sent to ${phoneNumber} (Demo OTP: ${generatedOtp})`, 'success');
//       setShowOtpField(true);
//       setOtpTimer(60);
      
//     } catch (error) {
//       console.error('Error sending OTP:', error);
//       showToastMessage('Failed to send OTP. Please try again.', 'error');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleVerifyOTP = async (e) => {
//     e?.preventDefault();
    
//     if (!otp || otp.length !== 4) {
//       showToastMessage('Please enter a valid 4-digit OTP', 'error');
//       return;
//     }

//     setIsLoading(true);
    
//     try {
//       const phoneNumber = phone.replace(/\D/g, '');
//       const storedOtpData = JSON.parse(localStorage.getItem(`otp_${phoneNumber}`) || '{}');
      
//       // For demo, accept "1234" as valid OTP regardless of stored value
//       const isValidOTP = storedOtpData.otp === otp || otp === "1234";
      
//       if (!isValidOTP) {
//         showToastMessage('Invalid OTP. Please try again.', 'error');
//         setIsLoading(false);
//         return;
//       }
      
//       const currentTime = Date.now();
//       const otpAge = currentTime - storedOtpData.timestamp;
//       if (otpAge > 5 * 60 * 1000) {
//         showToastMessage('OTP has expired. Please request a new one.', 'error');
//         setIsLoading(false);
//         return;
//       }
      
//       const allowedRoles = storedOtpData.allowedRoles || [];
//       if (!allowedRoles.includes(userType) && userType !== 'user') {
//         showToastMessage(`This number is not registered for ${userDetails.label} access. Please check your role.`, 'error');
//         setIsLoading(false);
//         return;
//       }
      
//       const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
//       const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
//       const combinedUsers = [...allUsers, ...registeredUsers];
      
//       let user;
      
//       user = combinedUsers.find(u => 
//         u.phone?.replace(/\D/g, '') === phoneNumber && 
//         u.userType === userType
//       );
      
//       if (!user && userType !== 'user') {
//         const primaryUser = combinedUsers.find(u => 
//           u.phone?.replace(/\D/g, '') === phoneNumber && 
//           u.userType === 'user'
//         );
        
//         if (primaryUser) {
//           user = {
//             ...primaryUser,
//             userType: userType,
//             isLinkedAccount: true,
//             linkedFrom: primaryUser.id,
//             permissions: getPermissionsForRole(userType)
//           };
//         }
//       }
      
//       // Create demo user if not found (for testing)
//       if (!user && userType === 'user') {
//         user = {
//           id: `demo_${Date.now()}`,
//           phone: phoneNumber,
//           userType: 'user',
//           fullName: `Demo User ${phoneNumber.slice(-4)}`,
//           email: `user${phoneNumber.slice(-4)}@quickmed.com`
//         };
//       }
      
//       if (user) {
//         showToastMessage(`Welcome back, ${user.fullName || userDetails.label}!`, 'success');
        
//         localStorage.setItem('currentUser', JSON.stringify(user));
//         localStorage.setItem('lastLoginType', userType);
        
//         localStorage.removeItem(`otp_${phoneNumber}`);
        
//         navigate(`/${userType}/dashboard`);
        
//         if (onLoginSuccess) {
//           onLoginSuccess(user);
//         }
//       } else {
//         showToastMessage('Account not found. Please check your details.', 'error');
//       }
      
//     } catch (error) {
//       console.error('Error verifying OTP:', error);
//       showToastMessage('An error occurred. Please try again.', 'error');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getPermissionsForRole = (role) => {
//     const permissions = {
//       user: ['view_own_records', 'book_appointments', 'order_medicines', 'view_prescriptions'],
//       guardian: ['view_dependent_records', 'book_appointments', 'track_deliveries', 'emergency_access'],
//       wife: ['view_family_records', 'book_appointments', 'order_medicines', 'manage_prescriptions', 'emergency_access']
//     };
//     return permissions[role] || [];
//   };

//   const handleForgotPassword = async (e) => {
//     e.preventDefault();
    
//     if (!forgotEmail.trim()) {
//       showToastMessage('Please enter your email address', 'error');
//       return;
//     }

//     setIsLoading(true);
    
//     try {
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       showToastMessage(`Password reset link sent to ${forgotEmail}`, 'success');
//       setShowForgotPassword(false);
//       setForgotEmail('');
//     } catch (error) {
//       showToastMessage('Failed to send reset link. Please try again.', 'error');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const showToastMessage = (message, type) => {
//     setToastMessage(message);
//     setToastType(type);
//     setShowToast(true);
//     setTimeout(() => setShowToast(false), 3000);
//   };

//   const handleBackToSelection = () => {
//     navigate('/login');
//   };

//   const handleBackToHome = () => {
//     navigate('/');
//   };

//   const handleLoginMethodChange = (method) => {
//     setLoginMethod(method);
//     setShowOtpField(false);
//     setOtp('');
//     setFormErrors({});
//   };

//   const UserTypeIcon = () => {
//     const iconProps = {
//       width: "100",
//       height: "100",
//       viewBox: "0 0 24 24",
//       fill: "none",
//       stroke: colors.white,
//       strokeWidth: "1.5"
//     };

//     switch(userType) {
//       case 'user':
//         return (
//           <svg {...iconProps}>
//             <circle cx="12" cy="7" r="4"></circle>
//             <path d="M5 21v-2a7 7 0 0 1 14 0v2"></path>
//           </svg>
//         );
//       case 'vendor':
//         return (
//           <svg {...iconProps}>
//             <rect x="3" y="3" width="18" height="18" rx="2"></rect>
//             <line x1="9" y1="9" x2="15" y2="15"></line>
//             <line x1="15" y1="9" x2="9" y2="15"></line>
//           </svg>
//         );
//       case 'delivery':
//         return (
//           <svg {...iconProps}>
//             <circle cx="12" cy="12" r="10"></circle>
//             <polyline points="12 6 12 12 16 14"></polyline>
//           </svg>
//         );
//       case 'doctor':
//         return (
//           <svg {...iconProps}>
//             <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
//             <circle cx="9" cy="7" r="4"></circle>
//             <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
//             <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
//           </svg>
//         );
//       case 'guardian':
//         return (
//           <svg {...iconProps}>
//             <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
//             <circle cx="9" cy="7" r="4"></circle>
//             <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
//             <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
//           </svg>
//         );
//       case 'wife':
//         return (
//           <svg {...iconProps}>
//             <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
//             <circle cx="9" cy="7" r="4"></circle>
//             <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
//             <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
//           </svg>
//         );
//       default:
//         return (
//           <svg {...iconProps}>
//             <circle cx="12" cy="7" r="4"></circle>
//             <path d="M5 21v-2a7 7 0 0 1 14 0v2"></path>
//           </svg>
//         );
//     }
//   };

//   const EyeIcon = () => (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2">
//       <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
//       <circle cx="12" cy="12" r="3"></circle>
//     </svg>
//   );

//   const EyeOffIcon = () => (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2">
//       <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
//       <line x1="1" y1="1" x2="23" y2="23"></line>
//     </svg>
//   );

//   return (
//     <div className="login-container">
//       {/* Toast Message */}
//       {showToast && (
//         <div className={`toast-message ${toastType}`}>
//           {toastType === 'success' ? '✅ ' : '❌ '}{toastMessage}
//         </div>
//       )}

//       {/* Forgot Password Modal */}
//       {showForgotPassword && (
//         <div className="forgot-password-modal">
//           <div className="modal-content">
//             <h3>Reset Password</h3>
//             <p>Enter your email to receive a reset link</p>
            
//             <form onSubmit={handleForgotPassword}>
//               <div className="input-group">
//                 <input
//                   type="email"
//                   value={forgotEmail}
//                   onChange={(e) => setForgotEmail(e.target.value)}
//                   required
//                   placeholder="Enter your email"
//                   disabled={isLoading}
//                 />
//               </div>
              
//               <div className="modal-buttons">
//                 <button
//                   type="button"
//                   onClick={() => setShowForgotPassword(false)}
//                   disabled={isLoading}
//                   className="cancel-btn"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className="submit-btn"
//                 >
//                   {isLoading ? 'Sending...' : 'Send Link'}
//                 </button>
//               </div>
//             </form>
//           </div>
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
//         {/* Left Side - User Info (Dynamic based on userType) */}
//         <div 
//           className="left-section"
//           style={{ background: currentContent.gradient }}
//         >
//           <div className="user-icon">
//             <UserTypeIcon />
//           </div>
          
//           <h2 className="user-title">
//             {currentContent.title}
//           </h2>
          
//           <p className="user-quote">
//             {currentContent.quote}
//           </p>
          
//           <div className="features-list">
//             {currentContent.features.map((feature, index) => (
//               <div className="feature-item" key={index}>
//                 <span className="feature-icon">{feature.icon}</span>
//                 <span>{feature.text}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Right Side - Login Form */}
//         <div className="right-section">
//           <div className="form-header">
//             <h1 className="app-title">QUICKMED</h1>
//             <h2 className="login-title">{userDetails.label} Login</h2>
//             <p className="login-subtitle">
//               {isLinkedAccount 
//                 ? `Linked access to ${userType === 'guardian' ? 'dependent' : 'family'} account`
//                 : shouldShowOTP() ? 'Choose your preferred login method' : 'Enter your credentials to login'
//               }
//             </p>
//           </div>

//           {/* Signup Success Message */}
//           {signupSuccess && (
//             <div className="success-message">
//               <div className="success-icon">✓</div>
//               <div>
//                 <h4>Account Created Successfully!</h4>
//                 <p>Your account has been created. Please login with your credentials.</p>
//               </div>
//             </div>
//           )}

//           {/* Login Method Toggle - Only show for users, guardians, and wives */}
//           {shouldShowOTP() && (
//             <div className="login-method-toggle">
//               <button
//                 type="button"
//                 className={`method-btn ${loginMethod === 'email' ? 'active' : ''}`}
//                 onClick={() => handleLoginMethodChange('email')}
//                 disabled={isLoading}
//                 style={{ 
//                   backgroundColor: loginMethod === 'email' ? colors.primary : '',
//                   borderColor: loginMethod === 'email' ? colors.primary : ''
//                 }}
//               >
//                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
//                   <polyline points="22,6 12,13 2,6"></polyline>
//                 </svg>
//                 Email Login
//               </button>
//               <button
//                 type="button"
//                 className={`method-btn ${loginMethod === 'otp' ? 'active' : ''}`}
//                 onClick={() => handleLoginMethodChange('otp')}
//                 disabled={isLoading}
//                 style={{ 
//                   backgroundColor: loginMethod === 'otp' ? colors.primary : '',
//                   borderColor: loginMethod === 'otp' ? colors.primary : ''
//                 }}
//               >
//                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
//                 </svg>
//                 OTP Login
//               </button>
//             </div>
//           )}

//           {/* Email Login Form - For all user types */}
//           {!shouldShowOTP() || loginMethod === 'email' ? (
//             <form onSubmit={handleEmailLogin}>
//               <div className="input-group">
//                 <label>{userType === 'delivery' ? 'Partner Email' : 'Email Address'}</label>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   placeholder={`${userType}@example.com`}
//                   disabled={isLoading}
//                   className={formErrors.email ? 'error' : ''}
//                   style={{ borderColor: formErrors.email ? '#f44336' : colors.softbg }}
//                 />
//                 {formErrors.email && (
//                   <div className="error-message">{formErrors.email}</div>
//                 )}
//                 {signupSuccess && (
//                   <div className="input-hint">
//                     Email pre-filled from your recent signup
//                   </div>
//                 )}
//               </div>

//               <div className="input-group">
//                 <label>Password</label>
//                 <div className="password-input-wrapper">
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                     placeholder="Enter your password"
//                     disabled={isLoading}
//                     className={formErrors.password ? 'error' : ''}
//                     style={{ borderColor: formErrors.password ? '#f44336' : colors.softbg }}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="password-toggle"
//                     disabled={isLoading}
//                     tabIndex={0}
//                   >
//                     {showPassword ? <EyeOffIcon /> : <EyeIcon />}
//                   </button>
//                 </div>
//                 {formErrors.password && (
//                   <div className="error-message">{formErrors.password}</div>
//                 )}
//               </div>

//               <div className="form-options">
//                 <label className="remember-me">
//                   <input
//                     type="checkbox"
//                     checked={rememberMe}
//                     onChange={handleRememberMeChange}
//                     disabled={isLoading}
//                   />
//                   <span>Remember me</span>
//                 </label>
                
//                 <span 
//                   onClick={() => !isLoading && setShowForgotPassword(true)}
//                   className="forgot-password-link"
//                   tabIndex={0}
//                   role="button"
//                   style={{ color: colors.primary }}
//                 >
//                   Forgot Password?
//                 </span>
//               </div>
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="login-btn"
//                 style={{ 
//                   background: currentContent.gradient,
//                   '--hover-color': colors.primary
//                 }}
//               >
//                 {isLoading ? 'Signing In...' : `Login as ${userDetails.label}`}
//               </button>
//             </form>
//           ) : (
//             /* OTP Login Form - Only for users, guardians, and wives */
//             <form onSubmit={showOtpField ? handleVerifyOTP : handleSendOTP}>
//               <div className="input-group">
//                 <label>Phone Number *</label>
//                 <div className="phone-input-wrapper">
//                   <span className="country-code">+91</span>
//                   <input
//                     type="tel"
//                     value={phone}
//                     onChange={(e) => {
//                       const value = e.target.value.replace(/\D/g, '');
//                       if (value.length <= 10) {
//                         setPhone(value);
//                         if (formErrors.phone) {
//                           setFormErrors({ ...formErrors, phone: '' });
//                         }
//                       }
//                     }}
//                     required
//                     placeholder="Enter 10-digit mobile number"
//                     disabled={isLoading || showOtpField}
//                     className={formErrors.phone ? 'error' : ''}
//                     style={{ borderColor: formErrors.phone ? '#f44336' : colors.softbg }}
//                     maxLength={10}
//                   />
//                 </div>
//                 {formErrors.phone && (
//                   <div className="error-message">{formErrors.phone}</div>
//                 )}
//               </div>

//               {showOtpField && (
//                 <div className="input-group">
//                   <label>Enter OTP *</label>
//                   <div className="otp-input-wrapper">
//                     <input
//                       type="text"
//                       value={otp}
//                       onChange={(e) => {
//                         const value = e.target.value.replace(/\D/g, '');
//                         if (value.length <= 4) {
//                           setOtp(value);
//                         }
//                       }}
//                       required
//                       placeholder="Enter 4-digit OTP"
//                       disabled={isLoading}
//                       className="otp-input"
//                       maxLength={4}
//                     />
//                     {otpTimer > 0 ? (
//                       <span className="otp-timer">
//                         Resend OTP in {otpTimer}s
//                       </span>
//                     ) : (
//                       <button
//                         type="button"
//                         onClick={handleSendOTP}
//                         className="resend-otp-btn"
//                         disabled={isLoading}
//                         style={{ color: colors.primary }}
//                       >
//                         Resend OTP
//                       </button>
//                     )}
//                   </div>
//                   {formErrors.otp && (
//                     <div className="error-message">{formErrors.otp}</div>
//                   )}
//                   <div className="otp-hint">
//                     OTP sent to +91{phone}
//                   </div>
//                 </div>
//               )}

//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="login-btn"
//                 style={{ 
//                   background: currentContent.gradient,
//                   '--hover-color': colors.primary
//                 }}
//               >
//                 {isLoading 
//                   ? 'Processing...' 
//                   : showOtpField 
//                     ? 'Verify OTP & Login' 
//                     : 'Send OTP'
//                 }
//               </button>
//             </form>
//           )}

//           {/* Demo Note for OTP */}
//           {shouldShowOTP() && loginMethod === 'otp' && !showOtpField && (
//             <div className="demo-note">
//               <p>💡 <strong>Demo Note:</strong> Enter any valid Indian mobile number (10 digits). OTP is always <strong>1234</strong> for testing.</p>
//             </div>
//           )}

//           {shouldShowOTP() && loginMethod === 'otp' && showOtpField && (
//             <div className="demo-note">
//               <p>🔑 <strong>Demo OTP:</strong> Use <strong>1234</strong> to login (works for any phone number)</p>
//             </div>
//           )}

//           <div className="signup-section">
//             <p>
//               Don't have an account?{' '}
//               <span 
//                 onClick={() => !isLoading && navigate(`/signup/${userType}`)}
//                 className="signup-link"
//                 role="button"
//                 tabIndex={0}
//                 style={{ color: colors.primary }}
//               >
//                 Sign up as {userDetails.label}
//               </span>
//             </p>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         /* Color Variables using your palette */
//         :root {
//           --primary: ${colors.primary};
//           --mint: ${colors.mint};
//           --softbg: ${colors.softbg};
//           --white: ${colors.white};
//           --darktext: ${colors.darktext};
//           --softtext: ${colors.softtext};
//           --primary-dark: #00897B;
//         }

//         .login-container {
//           min-height: 100vh;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
//           background: linear-gradient(135deg, var(--softbg) 0%, var(--white) 50%, var(--softbg) 100%);
//           padding: 65px;
//           position: relative;
//         }

//         /* Success Message */
//         .success-message {
//           display: flex;
//           align-items: center;
//           gap: 15px;
//           background-color: #d4edda;
//           border: 1px solid #c3e6cb;
//           color: #155724;
//           padding: 15px;
//           border-radius: 8px;
//           margin-bottom: 20px;
//           animation: fadeIn 0.5s ease;
//         }

//         .success-icon {
//           width: 40px;
//           height: 40px;
//           background-color: var(--darktext);
//           color: white;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 20px;
//           font-weight: bold;
//         }

//         .success-message h4 {
//           margin: 0 0 5px 0;
//           font-size: 16px;
//         }

//         .success-message p {
//           margin: 0;
//           font-size: 14px;
//           opacity: 0.9;
//         }

//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         /* Toast Message */
//         .toast-message {
//           position: fixed;
//           top: 20px;
//           right: 20px;
//           padding: 12px 20px;
//           border-radius: 8px;
//           font-size: 14px;
//           font-weight: 500;
//           z-index: 1000;
//           animation: slideIn 0.3s ease;
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//         }

//         .toast-message.success {
//           background-color: #d4edda;
//           color: #155724;
//           border: 1px solid #c3e6cb;
//         }

//         .toast-message.error {
//           background-color: #f8d7da;
//           color: #721c24;
//           border: 1px solid #f5c6cb;
//         }

//         .toast-message.info {
//           background-color: #d1ecf1;
//           color: #0c5460;
//           border: 1px solid #bee5eb;
//         }

//         @keyframes slideIn {
//           from {
//             transform: translateX(100%);
//             opacity: 0;
//           }
//           to {
//             transform: translateX(0);
//             opacity: 1;
//           }
//         }

//         /* Forgot Password Modal */
//         .forgot-password-modal {
//           position: fixed;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background-color: rgba(0, 0, 0, 0.5);
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           z-index: 1000;
//         }

//         .modal-content {
//           background-color: var(--white);
//           padding: 30px;
//           border-radius: 12px;
//           width: 90%;
//           max-width: 400px;
//           box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
//         }

//         .modal-content h3 {
//           color: var(--darktext);
//           margin: 0 0 10px 0;
//         }

//         .modal-content p {
//           color: var(--softtext);
//           margin: 0 0 20px 0;
//           font-size: 14px;
//         }

//         .modal-buttons {
//           display: flex;
//           gap: 10px;
//           margin-top: 20px;
//         }

//         .cancel-btn, .submit-btn {
//           flex: 1;
//           padding: 12px;
//           border: none;
//           border-radius: 8px;
//           font-size: 14px;
//           font-weight: 500;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .cancel-btn {
//           background-color: var(--softbg);
//           color: var(--softtext);
//         }

//         .cancel-btn:hover:not(:disabled) {
//           background-color: #E0E0E0;
//         }

//         .submit-btn {
//           background-color: var(--primary);
//           color: var(--white);
//         }

//         .submit-btn:hover:not(:disabled) {
//           background-color: var(--primary-dark);
//         }

//         .cancel-btn:disabled,
//         .submit-btn:disabled {
//           opacity: 0.6;
//           cursor: not-allowed;
//         }

//         /* Back Buttons */
//         .back-buttons {
//           position: absolute;
//           top: 20px;
//           left: 20px;
//           display: flex;
//           gap: 10px;
//         }

//         .back-home-btn,
//         .back-selection-btn {
//           padding: 8px 16px;
//           background-color: var(--white);
//           color: var(--primary);
//           border: 2px solid var(--primary);
//           border-radius: 6px;
//           font-size: 14px;
//           font-weight: 500;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .back-home-btn:hover:not(:disabled),
//         .back-selection-btn:hover:not(:disabled) {
//           background-color: var(--primary);
//           color: var(--white);
//         }

//         .back-home-btn:disabled,
//         .back-selection-btn:disabled {
//           opacity: 0.5;
//           cursor: not-allowed;
//         }

//         /* Main Card */
//         .main-card {
//           display: flex;
//           width: 100%;
//           max-width: 1200px;
//           min-height: 600px;
//           background-color: var(--white);
//           border-radius: 20px;
//           overflow: hidden;
//           box-shadow: 0 15px 40px rgba(0, 150, 136, 0.15);
//         }

//         /* Left Section */
//         .left-section {
//           flex: 1;
//           padding: 50px 40px;
//           color: var(--white);
//           display: flex;
//           flex-direction: column;
//         }

//         .user-icon {
//           margin-bottom: 30px;
//         }

//         .user-title {
//           font-size: 32px;
//           font-weight: 700;
//           margin: 0 0 15px 0;
//           line-height: 1.2;
//         }

//         .user-quote {
//           font-size: 16px;
//           line-height: 1.6;
//           margin: 0 0 40px 0;
//           opacity: 0.9;
//         }

//         .features-list {
//           flex: 1;
//           display: flex;
//           flex-direction: column;
//           gap: 15px;
//         }

//         .feature-item {
//           display: flex;
//           align-items: center;
//           gap: 15px;
//           font-size: 15px;
//           background-color: rgba(255, 255, 255, 0.1);
//           padding: 15px;
//           border-radius: 10px;
//           backdrop-filter: blur(10px);
//           border: 1px solid rgba(255, 255, 255, 0.2);
//           transition: transform 0.3s ease, background-color 0.3s ease;
//         }

//         .feature-item:hover {
//           transform: translateX(5px);
//           background-color: rgba(255, 255, 255, 0.15);
//         }

//         .feature-icon {
//           font-size: 20px;
//           min-width: 30px;
//         }

//         /* Right Section */
//         .right-section {
//           flex: 1;
//           padding: 50px 60px;
//           display: flex;
//           flex-direction: column;
//         }

//         .form-header {
//           margin-bottom: 40px;
//           text-align: center;
//         }

//         .app-title {
//           color: var(--primary);
//           font-size: 36px;
//           font-weight: 700;
//           margin: 0 0 10px 0;
//           letter-spacing: 1px;
//         }

//         .login-title {
//           color: var(--darktext);
//           font-size: 28px;
//           font-weight: 600;
//           margin: 0 0 10px 0;
//         }

//         .login-subtitle {
//           color: var(--softtext);
//           font-size: 14px;
//           margin: 0;
//           min-height: 20px;
//         }

//         /* Login Method Toggle */
//         .login-method-toggle {
//           display: flex;
//           gap: 10px;
//           margin-bottom: 25px;
//           border: 1px solid var(--softbg);
//           border-radius: 8px;
//           padding: 4px;
//           background-color: var(--white);
//         }

//         .method-btn {
//           flex: 1;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 8px;
//           padding: 12px;
//           background: none;
//           border: none;
//           border-radius: 6px;
//           font-size: 14px;
//           font-weight: 500;
//           cursor: pointer;
//           color: var(--softtext);
//           transition: all 0.3s ease;
//         }

//         .method-btn:hover:not(:disabled) {
//           background-color: var(--softbg);
//           color: var(--darktext);
//         }

//         .method-btn.active {
//           color: var(--white);
//           box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
//         }

//         .method-btn:disabled {
//           opacity: 0.7;
//           cursor: not-allowed;
//         }

//         .method-btn svg {
//           stroke: currentColor;
//         }

//         /* Input Groups */
//         .input-group {
//           margin-bottom: 25px;
//         }

//         .input-group label {
//           display: block;
//           color: var(--darktext);
//           font-size: 14px;
//           font-weight: 500;
//           margin-bottom: 8px;
//         }

//         .input-group input {
//           width: 100%;
//           padding: 15px;
//           border: 2px solid var(--softbg);
//           border-radius: 10px;
//           font-size: 15px;
//           color: var(--darktext);
//           background-color: var(--white);
//           transition: all 0.3s ease;
//           box-sizing: border-box;
//         }

//         .input-group input:focus {
//           outline: none;
//           border-color: var(--primary);
//           box-shadow: 0 0 0 3px rgba(0, 150, 136, 0.1);
//         }

//         .input-group input.error {
//           border-color: #f44336 !important;
//         }

//         .input-group input:disabled {
//           background-color: #f5f5f5;
//           cursor: not-allowed;
//         }

//         .input-hint {
//           font-size: 12px;
//           color: var(--softtext);
//           margin-top: 5px;
//           font-style: italic;
//         }

//                 /* Password Input */
//         .password-input-wrapper {
//           position: relative;
//         }

//         .password-input-wrapper input {
//           width: 100%;
//           padding: 15px 45px 15px 15px;
//           border: 2px solid var(--softbg);
//           border-radius: 10px;
//           font-size: 15px;
//           color: var(--darktext);
//           background-color: var(--white);
//           transition: all 0.3s ease;
//           box-sizing: border-box;
//           font-family: 'Courier New', monospace;
//           letter-spacing: 1px;
//         }

//         .password-toggle {
//           position: absolute;
//           right: 15px;
//           top: 50%;
//           transform: translateY(-50%);
//           background: none;
//           border: none;
//           cursor: pointer;
//           padding: 0;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           width: 24px;
//           height: 24px;
//           border-radius: 4px; /* Changed from 50% to 4px */
//           transition: all 0.3s ease;
//           z-index: 2;
//           background-color: transparent; /* Explicitly set */
//         }

//         .password-toggle:hover:not(:disabled) {
//           background-color: var(--softbg);
//           transform: translateY(-50%) scale(1.05); /* Scale instead of background expansion */
//         }

//         .password-toggle:focus {
//           outline: 2px solid var(--primary);
//           outline-offset: 2px;
//         }

//         .password-toggle:disabled {
//           opacity: 0.5;
//           cursor: not-allowed;
//         }

//         /* Phone Input */
//         .phone-input-wrapper {
//           display: flex;
//           align-items: center;
//           border: 2px solid var(--softbg);
//           border-radius: 10px;
//           overflow: hidden;
//         }

//         .phone-input-wrapper:focus-within {
//           border-color: var(--primary);
//           box-shadow: 0 0 0 3px rgba(0, 150, 136, 0.1);
//         }

//         .country-code {
//           padding: 15px;
//           background-color: var(--softbg);
//           color: var(--darktext);
//           font-weight: 500;
//           border-right: 2px solid var(--softbg);
//         }

//         .phone-input-wrapper input {
//           flex: 1;
//           border: none;
//           padding: 15px;
//           border-radius: 0;
//         }

//         .phone-input-wrapper input:focus {
//           outline: none;
//           box-shadow: none;
//         }

//         /* OTP Input */
//         .otp-input-wrapper {
//           display: flex;
//           gap: 10px;
//           align-items: center;
//         }

//         .otp-input {
//           flex: 1;
//           text-align: center;
//           letter-spacing: 10px;
//           font-size: 20px;
//           font-weight: 600;
//           color: var(--darktext);
//         }

//         .otp-timer {
//           color: var(--softtext);
//           font-size: 13px;
//           min-width: 120px;
//           text-align: right;
//         }

//         .resend-otp-btn {
//           background: none;
//           border: none;
//           font-size: 13px;
//           font-weight: 500;
//           cursor: pointer;
//           min-width: 120px;
//           text-align: right;
//         }

//         .resend-otp-btn:hover:not(:disabled) {
//           text-decoration: underline;
//         }

//         .resend-otp-btn:disabled {
//           opacity: 0.5;
//           cursor: not-allowed;
//         }

//         .otp-hint {
//           font-size: 12px;
//           color: var(--softtext);
//           margin-top: 5px;
//         }

//         /* Error Message */
//         .error-message {
//           color: #f44336;
//           font-size: 12px;
//           margin-top: 5px;
//         }

//         /* Form Options */
//         .form-options {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 30px;
//         }

//         .remember-me {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           cursor: pointer;
//           color: var(--softtext);
//           font-size: 14px;
//         }

//         .remember-me input {
//           width: 16px;
//           height: 16px;
//           cursor: pointer;
//         }

//         .remember-me:has(input:disabled) {
//           opacity: 0.6;
//           cursor: not-allowed;
//         }

//         .forgot-password-link {
//           font-size: 14px;
//           font-weight: 500;
//           cursor: pointer;
//           text-decoration: none;
//         }

//         .forgot-password-link:hover {
//           text-decoration: underline;
//         }

//         /* Demo Credentials Button */
//         .demo-credentials {
//           margin-bottom: 20px;
//         }

//         .demo-btn {
//           width: 100%;
//           padding: 12px;
//           background-color: transparent;
//           border: 2px solid;
//           border-radius: 10px;
//           font-size: 14px;
//           font-weight: 500;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .demo-btn:hover:not(:disabled) {
//           background-color: var(--primary);
//           color: var(--white) !important;
//         }

//         .demo-btn:disabled {
//           opacity: 0.6;
//           cursor: not-allowed;
//         }

//         /* Login Button */
//         .login-btn {
//           width: 100%;
//           padding: 16px;
//           color: var(--white);
//           border: none;
//           border-radius: 10px;
//           font-size: 16px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           margin-bottom: 25px;
//         }

//         .login-btn:hover:not(:disabled) {
//           transform: translateY(-2px);
//           box-shadow: 0 6px 20px rgba(0, 150, 136, 0.3);
//           opacity: 0.9;
//         }

//         .login-btn:disabled {
//           opacity: 0.6;
//           cursor: not-allowed;
//         }

//         /* Demo Note */
//         .demo-note {
//           font-size: 12px;
//           color: var(--softtext);
//           background-color: var(--softbg);
//           padding: 12px;
//           border-radius: 10px;
//           margin-top: 15px;
//           border-left: 4px solid var(--mint);
//         }

//         .demo-note p {
//           margin: 0;
//         }

//         /* Signup Section */
//         .signup-section {
//           text-align: center;
//           margin-top: auto;
//           padding-top: 20px;
//           border-top: 1px solid var(--softbg);
//         }

//         .signup-section p {
//           color: var(--softtext);
//           font-size: 14px;
//           margin: 0;
//         }

//         .signup-link {
//           font-weight: 600;
//           cursor: pointer;
//           text-decoration: none;
//         }

//         .signup-link:hover {
//           text-decoration: underline;
//         }

//         /* Responsive Design */
//         @media (max-width: 768px) {
//           .login-container {
//             padding: 10px;
//           }

//           .main-card {
//             flex-direction: column;
//             min-height: auto;
//           }

//           .left-section,
//           .right-section {
//             padding: 30px 20px;
//           }

//           .user-title {
//             font-size: 24px;
//           }

//           .user-quote {
//             font-size: 14px;
//           }

//           .app-title {
//             font-size: 28px;
//           }

//           .login-title {
//             font-size: 22px;
//           }

//           .login-method-toggle {
//             flex-direction: column;
//           }

//           .back-buttons {
//             flex-direction: column;
//             gap: 5px;
//           }
//         }

//         @media (max-width: 480px) {
//           .left-section,
//           .right-section {
//             padding: 20px 15px;
//           }

//           .form-options {
//             flex-direction: column;
//             align-items: flex-start;
//             gap: 10px;
//           }

//           .forgot-password-link {
//             align-self: flex-end;
//           }

//           .modal-content {
//             padding: 20px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };
// export default BaseLogin;







// BaseLogin.js - Updated with Your Color Scheme
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
const API_BASE_URL = "http://127.0.0.1:8000/api";

const BaseLogin = ({ userType, userDetails, onLoginSuccess, isLinkedAccount = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get state from navigation (coming from signup)
  const { signupSuccess, registeredEmail } = location.state || {};
  
  // Email/Password Login States
  const [email, setEmail] = useState(registeredEmail || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // OTP Login States (only for users)
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  
  // Common States
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'otp'
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Color Variables using your palette
  const colors = {
    primary: '#009688',
    mint: '#4DB6AC',
    softbg: '#E0F2F1',
    white: '#FFFFFF',
    darktext: '#124441',
    softtext: '#4F6F6B'
  };
  // User-specific content based on userType
  const userTypeContent = {
    user: {
      title: "Patient Portal",
      quote: "Your health is our priority. Access your medical records, book appointments, and manage prescriptions all in one place.",
      gradient: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.darktext} 100%)`,
      features: [
        { icon: "📋", text: "View medical records & history" },
        { icon: "📅", text: "Book doctor appointments online" },
        { icon: "💊", text: "Order medicines & track delivery" },
        { icon: "📄", text: "Access digital prescriptions" },
        { icon: "💬", text: "Chat with healthcare providers" }
      ]
    },
    vendor: {
      title: "Pharmacy Vendor Portal",
      quote: "Manage your pharmacy inventory, process orders, and serve patients efficiently with our comprehensive vendor tools.",
      gradient: `linear-gradient(135deg, ${colors.mint} 0%, #00695C 100%)`,
      features: [
        { icon: "📦", text: "Manage medicine inventory" },
        { icon: "📋", text: "Process patient orders" },
        { icon: "💰", text: "Track sales & revenue" },
        { icon: "🚚", text: "Coordinate with delivery partners" },
        { icon: "⭐", text: "Manage customer reviews" }
      ]
    },
    delivery: {
      title: "Medical Delivery Portal",
      quote: "Join our network of healthcare heroes delivering medicines and supplies to those in need.",
      gradient: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.darktext} 100%)`,
      features: [
        { icon: "📦", text: "View delivery assignments" },
        { icon: "🗺️", text: "Track delivery routes" },
        { icon: "🔄", text: "Update delivery status" },
        { icon: "💰", text: "Earn delivery commissions" },
        { icon: "⭐", text: "Access customer feedback" }
      ]
    },
    doctor: {
      title: "Doctor's Portal",
      quote: "Provide exceptional care to your patients with our comprehensive medical practice management tools.",
      gradient: `linear-gradient(135deg, ${colors.primary} 0%, #00695C 100%)`,
      features: [
        { icon: "👨‍⚕️", text: "Manage patient appointments" },
        { icon: "📄", text: "Write digital prescriptions" },
        { icon: "🏥", text: "Access patient medical history" },
        { icon: "💬", text: "Consult with patients online" },
        { icon: "📊", text: "Track practice analytics" }
      ]
    },
    guardian: {
      title: "Guardian Portal",
      quote: "Care for your loved ones. Monitor their health, manage appointments, and ensure they receive the best care.",
      gradient: `linear-gradient(135deg, ${colors.mint} 0%, ${colors.primary} 100%)`,
      features: [
        { icon: "👨‍👩‍👧", text: "Monitor dependent health records" },
        { icon: "📅", text: "Schedule appointments for dependents" },
        { icon: "💊", text: "Manage medication schedules" },
        { icon: "🚨", text: "Emergency access to medical info" },
        { icon: "📱", text: "Real-time health updates" }
      ]
    },
    wife: {
      title: "Family Care Portal",
      quote: "Manage your family's healthcare needs from one place. Stay informed and proactive about family health.",
      gradient: `linear-gradient(135deg, #E91E63 0%, ${colors.primary} 100%)`,
      features: [
        { icon: "👨‍👩‍👧‍👦", text: "Manage family health profiles" },
        { icon: "📋", text: "Access family medical records" },
        { icon: "💊", text: "Order medicines for family members" },
        { icon: "🏥", text: "Coordinate family appointments" },
        { icon: "📞", text: "Emergency family contact management" }
      ]
    }
  };

  // Get content for current user type
  const currentContent = userTypeContent[userType] || userTypeContent.user;

  // Check if user type should have OTP login
  const shouldShowOTP = () => {
    return userType === 'user' || userType === 'guardian' || userType === 'wife';
  };

  // Show signup success message if coming from signup
  useEffect(() => {
    if (signupSuccess) {
      showToastMessage(`Account created successfully! Please login with your credentials.`, 'success');
    }
  }, [signupSuccess]);

  // Timer for OTP
  useEffect(() => {
    let interval;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  // Initialize from localStorage for email login
  useEffect(() => {
    const remembered = localStorage.getItem('rememberMe');
    if (remembered && loginMethod === 'email') {
      try {
        const rememberData = JSON.parse(remembered);
        if (rememberData.userType === userType) {
          setEmail(rememberData.email || '');
          setRememberMe(true);
        }
      } catch (error) {
        console.error('Error parsing remembered user:', error);
      }
    }
  }, [userType, loginMethod]);

  // Handle rememberMe toggle
  const handleRememberMeChange = (e) => {
    const isChecked = e.target.checked;
    setRememberMe(isChecked);
    
    if (!isChecked) {
      localStorage.removeItem('rememberMe');
    }
  };

  // Generate OTP (only for users)
  const generateOTP = () => {
    // For demo purposes, always return 1234 for testing
    return "1234";
  };

  // Validate phone number
  const validatePhone = (phoneNumber) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phoneNumber.replace(/\D/g, ''));
  };

  // Form Validation
  const validateForm = () => {
    const errors = {};
    
    if (loginMethod === 'email') {
      if (!email.trim()) {
        errors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = 'Please enter a valid email address';
      }
      
      if (!password.trim()) {
        errors.password = 'Password is required';
      }
    } else if (shouldShowOTP()) {
      const phoneNumber = phone.replace(/\D/g, '');
      if (!phoneNumber) {
        errors.phone = 'Phone number is required';
      } else if (!validatePhone(phoneNumber)) {
        errors.phone = 'Please enter a valid 10-digit Indian mobile number';
      }
      
      if (showOtpField && (!otp || otp.length !== 4)) {
        errors.otp = 'Please enter a valid 4-digit OTP';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

 
const handleEmailLogin = async (e) => {
  e.preventDefault();

  setIsLoading(true);

  try {
    const response = await fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        userType: userType,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || "Login failed");
      return;
    }

    // ✅ SAVE TOKEN (THIS IS IMPORTANT)
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);

    // ✅ SAVE USER
    localStorage.setItem("currentUser", JSON.stringify(data.user));

    alert("Login success");

    // ✅ GO TO DASHBOARD
    navigate(`/${data.user.userType}/dashboard`);

  } catch (error) {
    alert("Server error");
  } finally {
    setIsLoading(false);
  }
};

    

  // Handle OTP Login (only for users)
  const handleSendOTP = async (e) => {
    e?.preventDefault();
    
    const phoneNumber = phone.replace(/\D/g, '');
    
    if (!validatePhone(phoneNumber)) {
      showToastMessage('Please enter a valid 10-digit Indian mobile number', 'error');
      return;
    }

    setIsLoading(true);
    
    try {
      const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const combinedUsers = [...allUsers, ...registeredUsers];
      
      const usersWithPhone = combinedUsers.filter(user => {
        const userPhone = user.phone?.replace(/\D/g, '');
        return userPhone === phoneNumber;
      });

      if (isLinkedAccount && usersWithPhone.length === 0) {
        showToastMessage('No primary account found with this number', 'error');
        setIsLoading(false);
        return;
      }

      const generatedOtp = generateOTP();
      const otpData = {
        phone: phoneNumber,
        otp: generatedOtp,
        timestamp: Date.now(),
        allowedRoles: usersWithPhone.map(user => user.userType)
      };

      const primaryUser = usersWithPhone.find(user => user.userType === 'user');
      if (primaryUser?.linkedAccounts) {
        otpData.allowedRoles = [...otpData.allowedRoles, ...primaryUser.linkedAccounts];
      }

      localStorage.setItem(`otp_${phoneNumber}`, JSON.stringify(otpData));
      
      console.log(`OTP for ${phoneNumber}: ${generatedOtp} (Demo OTP: 1234)`);
      
      showToastMessage(`OTP sent to ${phoneNumber} (Demo OTP: ${generatedOtp})`, 'success');
      setShowOtpField(true);
      setOtpTimer(60);
      
    } catch (error) {
      console.error('Error sending OTP:', error);
      showToastMessage('Failed to send OTP. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e?.preventDefault();
    
    if (!otp || otp.length !== 4) {
      showToastMessage('Please enter a valid 4-digit OTP', 'error');
      return;
    }

    setIsLoading(true);
    
    try {
      const phoneNumber = phone.replace(/\D/g, '');
      const storedOtpData = JSON.parse(localStorage.getItem(`otp_${phoneNumber}`) || '{}');
      
      // For demo, accept "1234" as valid OTP regardless of stored value
      const isValidOTP = storedOtpData.otp === otp || otp === "1234";
      
      if (!isValidOTP) {
        showToastMessage('Invalid OTP. Please try again.', 'error');
        setIsLoading(false);
        return;
      }
      
      const currentTime = Date.now();
      const otpAge = currentTime - storedOtpData.timestamp;
      if (otpAge > 5 * 60 * 1000) {
        showToastMessage('OTP has expired. Please request a new one.', 'error');
        setIsLoading(false);
        return;
      }
      
      const allowedRoles = storedOtpData.allowedRoles || [];
      if (!allowedRoles.includes(userType) && userType !== 'user') {
        showToastMessage(`This number is not registered for ${userDetails.label} access. Please check your role.`, 'error');
        setIsLoading(false);
        return;
      }
      
      const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const combinedUsers = [...allUsers, ...registeredUsers];
      
      let user;
      
      user = combinedUsers.find(u => 
        u.phone?.replace(/\D/g, '') === phoneNumber && 
        u.userType === userType
      );
      
      if (!user && userType !== 'user') {
        const primaryUser = combinedUsers.find(u => 
          u.phone?.replace(/\D/g, '') === phoneNumber && 
          u.userType === 'user'
        );
        
        if (primaryUser) {
          user = {
            ...primaryUser,
            userType: userType,
            isLinkedAccount: true,
            linkedFrom: primaryUser.id,
            permissions: getPermissionsForRole(userType)
          };
        }
      }
      
      // Create demo user if not found (for testing)
      if (!user && userType === 'user') {
        user = {
          id: `demo_${Date.now()}`,
          phone: phoneNumber,
          userType: 'user',
          fullName: `Demo User ${phoneNumber.slice(-4)}`,
          email: `user${phoneNumber.slice(-4)}@quickmed.com`
        };
      }
      
      if (user) {
        showToastMessage(`Welcome back, ${user.fullName || userDetails.label}!`, 'success');
        
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('lastLoginType', userType);
        
        localStorage.removeItem(`otp_${phoneNumber}`);
        
        navigate(`/${userType}/dashboard`);
        
        if (onLoginSuccess) {
          onLoginSuccess(user);
        }
      } else {
        showToastMessage('Account not found. Please check your details.', 'error');
      }
      
    } catch (error) {
      console.error('Error verifying OTP:', error);
      showToastMessage('An error occurred. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const getPermissionsForRole = (role) => {
    const permissions = {
      user: ['view_own_records', 'book_appointments', 'order_medicines', 'view_prescriptions'],
      guardian: ['view_dependent_records', 'book_appointments', 'track_deliveries', 'emergency_access'],
      wife: ['view_family_records', 'book_appointments', 'order_medicines', 'manage_prescriptions', 'emergency_access']
    };
    return permissions[role] || [];
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!forgotEmail.trim()) {
      showToastMessage('Please enter your email address', 'error');
      return;
    }

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showToastMessage(`Password reset link sent to ${forgotEmail}`, 'success');
      setShowForgotPassword(false);
      setForgotEmail('');
    } catch (error) {
      showToastMessage('Failed to send reset link. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const showToastMessage = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleBackToSelection = () => {
    navigate('/login');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleLoginMethodChange = (method) => {
    setLoginMethod(method);
    setShowOtpField(false);
    setOtp('');
    setFormErrors({});
  };

  const UserTypeIcon = () => {
    const iconProps = {
      width: "100",
      height: "100",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: colors.white,
      strokeWidth: "1.5"
    };

    switch(userType) {
      case 'user':
        return (
          <svg {...iconProps}>
            <circle cx="12" cy="7" r="4"></circle>
            <path d="M5 21v-2a7 7 0 0 1 14 0v2"></path>
          </svg>
        );
      case 'vendor':
        return (
          <svg {...iconProps}>
            <rect x="3" y="3" width="18" height="18" rx="2"></rect>
            <line x1="9" y1="9" x2="15" y2="15"></line>
            <line x1="15" y1="9" x2="9" y2="15"></line>
          </svg>
        );
      case 'delivery':
        return (
          <svg {...iconProps}>
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        );
      case 'doctor':
        return (
          <svg {...iconProps}>
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        );
      case 'guardian':
        return (
          <svg {...iconProps}>
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        );
      case 'wife':
        return (
          <svg {...iconProps}>
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        );
      default:
        return (
          <svg {...iconProps}>
            <circle cx="12" cy="7" r="4"></circle>
            <path d="M5 21v-2a7 7 0 0 1 14 0v2"></path>
          </svg>
        );
    }
  };

  const EyeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );

  const EyeOffIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
  );

  return (
    <div className="login-container">
      {/* Toast Message */}
      {showToast && (
        <div className={`toast-message ${toastType}`}>
          {toastType === 'success' ? '✅ ' : '❌ '}{toastMessage}
        </div>
      )}

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="forgot-password-modal">
          <div className="modal-content">
            <h3>Reset Password</h3>
            <p>Enter your email to receive a reset link</p>
            
            <form onSubmit={handleForgotPassword}>
              <div className="input-group">
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
              </div>
              
              <div className="modal-buttons">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  disabled={isLoading}
                  className="cancel-btn"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="submit-btn"
                >
                  {isLoading ? 'Sending...' : 'Send Link'}
                </button>
              </div>
            </form>
          </div>
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
        {/* Left Side - User Info (Dynamic based on userType) */}
        <div 
          className="left-section"
          style={{ background: currentContent.gradient }}
        >
          <div className="user-icon">
            <UserTypeIcon />
          </div>
          
          <h2 className="user-title">
            {currentContent.title}
          </h2>
          
          <p className="user-quote">
            {currentContent.quote}
          </p>
          
          <div className="features-list">
            {currentContent.features.map((feature, index) => (
              <div className="feature-item" key={index}>
                <span className="feature-icon">{feature.icon}</span>
                <span>{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="right-section">
          <div className="form-header">
            <h1 className="app-title">QUICKMED</h1>
            <h2 className="login-title">{userDetails.label} Login</h2>
            <p className="login-subtitle">
              {isLinkedAccount 
                ? `Linked access to ${userType === 'guardian' ? 'dependent' : 'family'} account`
                : shouldShowOTP() ? 'Choose your preferred login method' : 'Enter your credentials to login'
              }
            </p>
          </div>

          {/* Signup Success Message */}
          {signupSuccess && (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <div>
                <h4>Account Created Successfully!</h4>
                <p>Your account has been created. Please login with your credentials.</p>
              </div>
            </div>
          )}

          {/* Login Method Toggle - Only show for users, guardians, and wives */}
          {shouldShowOTP() && (
            <div className="login-method-toggle">
              <button
                type="button"
                className={`method-btn ${loginMethod === 'email' ? 'active' : ''}`}
                onClick={() => handleLoginMethodChange('email')}
                disabled={isLoading}
                style={{ 
                  backgroundColor: loginMethod === 'email' ? colors.primary : '',
                  borderColor: loginMethod === 'email' ? colors.primary : ''
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                Email Login
              </button>
              <button
                type="button"
                className={`method-btn ${loginMethod === 'otp' ? 'active' : ''}`}
                onClick={() => handleLoginMethodChange('otp')}
                disabled={isLoading}
                style={{ 
                  backgroundColor: loginMethod === 'otp' ? colors.primary : '',
                  borderColor: loginMethod === 'otp' ? colors.primary : ''
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                OTP Login
              </button>
            </div>
          )}

          {/* Email Login Form - For all user types */}
          {!shouldShowOTP() || loginMethod === 'email' ? (
            <form onSubmit={handleEmailLogin}>
              <div className="input-group">
                <label>{userType === 'delivery' ? 'Partner Email' : 'Email Address'}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder={`${userType}@example.com`}
                  disabled={isLoading}
                  className={formErrors.email ? 'error' : ''}
                  style={{ borderColor: formErrors.email ? '#f44336' : colors.softbg }}
                />
                {formErrors.email && (
                  <div className="error-message">{formErrors.email}</div>
                )}
                {signupSuccess && (
                  <div className="input-hint">
                    Email pre-filled from your recent signup
                  </div>
                )}
              </div>

              <div className="input-group">
                <label>Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                    disabled={isLoading}
                    className={formErrors.password ? 'error' : ''}
                    style={{ borderColor: formErrors.password ? '#f44336' : colors.softbg }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle"
                    disabled={isLoading}
                    tabIndex={0}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
                {formErrors.password && (
                  <div className="error-message">{formErrors.password}</div>
                )}
              </div>

              <div className="form-options">
                <label className="remember-me">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                    disabled={isLoading}
                  />
                  <span>Remember me</span>
                </label>
                
                <span 
                  onClick={() => !isLoading && setShowForgotPassword(true)}
                  className="forgot-password-link"
                  tabIndex={0}
                  role="button"
                  style={{ color: colors.primary }}
                >
                  Forgot Password?
                </span>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="login-btn"
                style={{ 
                  background: currentContent.gradient,
                  '--hover-color': colors.primary
                }}
              >
                {isLoading ? 'Signing In...' : `Login as ${userDetails.label}`}
              </button>
            </form>
          ) : (
            /* OTP Login Form - Only for users, guardians, and wives */
            <form onSubmit={showOtpField ? handleVerifyOTP : handleSendOTP}>
              <div className="input-group">
                <label>Phone Number *</label>
                <div className="phone-input-wrapper">
                  <span className="country-code">+91</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      if (value.length <= 10) {
                        setPhone(value);
                        if (formErrors.phone) {
                          setFormErrors({ ...formErrors, phone: '' });
                        }
                      }
                    }}
                    required
                    placeholder="Enter 10-digit mobile number"
                    disabled={isLoading || showOtpField}
                    className={formErrors.phone ? 'error' : ''}
                    style={{ borderColor: formErrors.phone ? '#f44336' : colors.softbg }}
                    maxLength={10}
                  />
                </div>
                {formErrors.phone && (
                  <div className="error-message">{formErrors.phone}</div>
                )}
              </div>

              {showOtpField && (
                <div className="input-group">
                  <label>Enter OTP *</label>
                  <div className="otp-input-wrapper">
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        if (value.length <= 4) {
                          setOtp(value);
                        }
                      }}
                      required
                      placeholder="Enter 4-digit OTP"
                      disabled={isLoading}
                      className="otp-input"
                      maxLength={4}
                    />
                    {otpTimer > 0 ? (
                      <span className="otp-timer">
                        Resend OTP in {otpTimer}s
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSendOTP}
                        className="resend-otp-btn"
                        disabled={isLoading}
                        style={{ color: colors.primary }}
                      >
                        Resend OTP
                      </button>
                    )}
                  </div>
                  {formErrors.otp && (
                    <div className="error-message">{formErrors.otp}</div>
                  )}
                  <div className="otp-hint">
                    OTP sent to +91{phone}
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="login-btn"
                style={{ 
                  background: currentContent.gradient,
                  '--hover-color': colors.primary
                }}
              >
                {isLoading 
                  ? 'Processing...' 
                  : showOtpField 
                    ? 'Verify OTP & Login' 
                    : 'Send OTP'
                }
              </button>
            </form>
          )}

          {/* Demo Note for OTP */}
          {shouldShowOTP() && loginMethod === 'otp' && !showOtpField && (
            <div className="demo-note">
              <p>💡 <strong>Demo Note:</strong> Enter any valid Indian mobile number (10 digits). OTP is always <strong>1234</strong> for testing.</p>
            </div>
          )}

          {shouldShowOTP() && loginMethod === 'otp' && showOtpField && (
            <div className="demo-note">
              <p>🔑 <strong>Demo OTP:</strong> Use <strong>1234</strong> to login (works for any phone number)</p>
            </div>
          )}

          <div className="signup-section">
            <p>
              Don't have an account?{' '}
              <span 
                onClick={() => !isLoading && navigate(`/signup/${userType}`)}
                className="signup-link"
                role="button"
                tabIndex={0}
                style={{ color: colors.primary }}
              >
                Sign up as {userDetails.label}
              </span>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Color Variables using your palette */
        :root {
          --primary: ${colors.primary};
          --mint: ${colors.mint};
          --softbg: ${colors.softbg};
          --white: ${colors.white};
          --darktext: ${colors.darktext};
          --softtext: ${colors.softtext};
          --primary-dark: #00897B;
        }

        .login-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: linear-gradient(135deg, var(--softbg) 0%, var(--white) 50%, var(--softbg) 100%);
          padding: 65px;
          position: relative;
        }

        /* Success Message */
        .success-message {
          display: flex;
          align-items: center;
          gap: 15px;
          background-color: #d4edda;
          border: 1px solid #c3e6cb;
          color: #155724;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 20px;
          animation: fadeIn 0.5s ease;
        }

        .success-icon {
          width: 40px;
          height: 40px;
          background-color: var(--darktext);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: bold;
        }

        .success-message h4 {
          margin: 0 0 5px 0;
          font-size: 16px;
        }

        .success-message p {
          margin: 0;
          font-size: 14px;
          opacity: 0.9;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Toast Message */
        .toast-message {
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 12px 20px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          z-index: 1000;
          animation: slideIn 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .toast-message.success {
          background-color: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }

        .toast-message.error {
          background-color: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }

        .toast-message.info {
          background-color: #d1ecf1;
          color: #0c5460;
          border: 1px solid #bee5eb;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        /* Forgot Password Modal */
        .forgot-password-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-content {
          background-color: var(--white);
          padding: 30px;
          border-radius: 12px;
          width: 90%;
          max-width: 400px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .modal-content h3 {
          color: var(--darktext);
          margin: 0 0 10px 0;
        }

        .modal-content p {
          color: var(--softtext);
          margin: 0 0 20px 0;
          font-size: 14px;
        }

        .modal-buttons {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }

        .cancel-btn, .submit-btn {
          flex: 1;
          padding: 12px;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cancel-btn {
          background-color: var(--softbg);
          color: var(--softtext);
        }

        .cancel-btn:hover:not(:disabled) {
          background-color: #E0E0E0;
        }

        .submit-btn {
          background-color: var(--primary);
          color: var(--white);
        }

        .submit-btn:hover:not(:disabled) {
          background-color: var(--primary-dark);
        }

        .cancel-btn:disabled,
        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Back Buttons */
        .back-buttons {
          position: absolute;
          top: 20px;
          left: 20px;
          display: flex;
          gap: 10px;
        }

        .back-home-btn,
        .back-selection-btn {
          padding: 8px 16px;
          background-color: var(--white);
          color: var(--primary);
          border: 2px solid var(--primary);
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .back-home-btn:hover:not(:disabled),
        .back-selection-btn:hover:not(:disabled) {
          background-color: var(--primary);
          color: var(--white);
        }

        .back-home-btn:disabled,
        .back-selection-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Main Card */
        .main-card {
          display: flex;
          width: 100%;
          max-width: 1200px;
          min-height: 600px;
          background-color: var(--white);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 15px 40px rgba(0, 150, 136, 0.15);
        }

        /* Left Section */
        .left-section {
          flex: 1;
          padding: 50px 40px;
          color: var(--white);
          display: flex;
          flex-direction: column;
        }

        .user-icon {
          margin-bottom: 30px;
        }

        .user-title {
          font-size: 32px;
          font-weight: 700;
          margin: 0 0 15px 0;
          line-height: 1.2;
        }

        .user-quote {
          font-size: 16px;
          line-height: 1.6;
          margin: 0 0 40px 0;
          opacity: 0.9;
        }

        .features-list {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 15px;
          font-size: 15px;
          background-color: rgba(255, 255, 255, 0.1);
          padding: 15px;
          border-radius: 10px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: transform 0.3s ease, background-color 0.3s ease;
        }

        .feature-item:hover {
          transform: translateX(5px);
          background-color: rgba(255, 255, 255, 0.15);
        }

        .feature-icon {
          font-size: 20px;
          min-width: 30px;
        }

        /* Right Section */
        .right-section {
          flex: 1;
          padding: 50px 60px;
          display: flex;
          flex-direction: column;
        }

        .form-header {
          margin-bottom: 40px;
          text-align: center;
        }

        .app-title {
          color: var(--primary);
          font-size: 36px;
          font-weight: 700;
          margin: 0 0 10px 0;
          letter-spacing: 1px;
        }

        .login-title {
          color: var(--darktext);
          font-size: 28px;
          font-weight: 600;
          margin: 0 0 10px 0;
        }

        .login-subtitle {
          color: var(--softtext);
          font-size: 14px;
          margin: 0;
          min-height: 20px;
        }

        /* Login Method Toggle */
        .login-method-toggle {
          display: flex;
          gap: 10px;
          margin-bottom: 25px;
          border: 1px solid var(--softbg);
          border-radius: 8px;
          padding: 4px;
          background-color: var(--white);
        }

        .method-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          background: none;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          color: var(--softtext);
          transition: all 0.3s ease;
        }

        .method-btn:hover:not(:disabled) {
          background-color: var(--softbg);
          color: var(--darktext);
        }

        .method-btn.active {
          color: var(--white);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .method-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .method-btn svg {
          stroke: currentColor;
        }

        /* Input Groups */
        .input-group {
          margin-bottom: 25px;
        }

        .input-group label {
          display: block;
          color: var(--darktext);
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 8px;
        }

        .input-group input {
          width: 100%;
          padding: 15px;
          border: 2px solid var(--softbg);
          border-radius: 10px;
          font-size: 15px;
          color: var(--darktext);
          background-color: var(--white);
          transition: all 0.3s ease;
          box-sizing: border-box;
        }

        .input-group input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(0, 150, 136, 0.1);
        }

        .input-group input.error {
          border-color: #f44336 !important;
        }

        .input-group input:disabled {
          background-color: #f5f5f5;
          cursor: not-allowed;
        }

        .input-hint {
          font-size: 12px;
          color: var(--softtext);
          margin-top: 5px;
          font-style: italic;
        }

                /* Password Input */
        .password-input-wrapper {
          position: relative;
        }

        .password-input-wrapper input {
          width: 100%;
          padding: 15px 45px 15px 15px;
          border: 2px solid var(--softbg);
          border-radius: 10px;
          font-size: 15px;
          color: var(--darktext);
          background-color: var(--white);
          transition: all 0.3s ease;
          box-sizing: border-box;
          font-family: 'Courier New', monospace;
          letter-spacing: 1px;
        }

        .password-toggle {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 4px; /* Changed from 50% to 4px */
          transition: all 0.3s ease;
          z-index: 2;
          background-color: transparent; /* Explicitly set */
        }

        .password-toggle:hover:not(:disabled) {
          background-color: var(--softbg);
          transform: translateY(-50%) scale(1.05); /* Scale instead of background expansion */
        }

        .password-toggle:focus {
          outline: 2px solid var(--primary);
          outline-offset: 2px;
        }

        .password-toggle:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Phone Input */
        .phone-input-wrapper {
          display: flex;
          align-items: center;
          border: 2px solid var(--softbg);
          border-radius: 10px;
          overflow: hidden;
        }

        .phone-input-wrapper:focus-within {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(0, 150, 136, 0.1);
        }

        .country-code {
          padding: 15px;
          background-color: var(--softbg);
          color: var(--darktext);
          font-weight: 500;
          border-right: 2px solid var(--softbg);
        }

        .phone-input-wrapper input {
          flex: 1;
          border: none;
          padding: 15px;
          border-radius: 0;
        }

        .phone-input-wrapper input:focus {
          outline: none;
          box-shadow: none;
        }

        /* OTP Input */
        .otp-input-wrapper {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .otp-input {
          flex: 1;
          text-align: center;
          letter-spacing: 10px;
          font-size: 20px;
          font-weight: 600;
          color: var(--darktext);
        }

        .otp-timer {
          color: var(--softtext);
          font-size: 13px;
          min-width: 120px;
          text-align: right;
        }

        .resend-otp-btn {
          background: none;
          border: none;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          min-width: 120px;
          text-align: right;
        }

        .resend-otp-btn:hover:not(:disabled) {
          text-decoration: underline;
        }

        .resend-otp-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .otp-hint {
          font-size: 12px;
          color: var(--softtext);
          margin-top: 5px;
        }

        /* Error Message */
        .error-message {
          color: #f44336;
          font-size: 12px;
          margin-top: 5px;
        }

        /* Form Options */
        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .remember-me {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          color: var(--softtext);
          font-size: 14px;
        }

        .remember-me input {
          width: 16px;
          height: 16px;
          cursor: pointer;
        }

        .remember-me:has(input:disabled) {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .forgot-password-link {
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          text-decoration: none;
        }

        .forgot-password-link:hover {
          text-decoration: underline;
        }

        /* Demo Credentials Button */
        .demo-credentials {
          margin-bottom: 20px;
        }

        .demo-btn {
          width: 100%;
          padding: 12px;
          background-color: transparent;
          border: 2px solid;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .demo-btn:hover:not(:disabled) {
          background-color: var(--primary);
          color: var(--white) !important;
        }

        .demo-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Login Button */
        .login-btn {
          width: 100%;
          padding: 16px;
          color: var(--white);
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 25px;
        }

        .login-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 150, 136, 0.3);
          opacity: 0.9;
        }

        .login-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Demo Note */
        .demo-note {
          font-size: 12px;
          color: var(--softtext);
          background-color: var(--softbg);
          padding: 12px;
          border-radius: 10px;
          margin-top: 15px;
          border-left: 4px solid var(--mint);
        }

        .demo-note p {
          margin: 0;
        }

        /* Signup Section */
        .signup-section {
          text-align: center;
          margin-top: auto;
          padding-top: 20px;
          border-top: 1px solid var(--softbg);
        }

        .signup-section p {
          color: var(--softtext);
          font-size: 14px;
          margin: 0;
        }

        .signup-link {
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
        }

        .signup-link:hover {
          text-decoration: underline;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .login-container {
            padding: 10px;
          }

          .main-card {
            flex-direction: column;
            min-height: auto;
          }

          .left-section,
          .right-section {
            padding: 30px 20px;
          }

          .user-title {
            font-size: 24px;
          }

          .user-quote {
            font-size: 14px;
          }

          .app-title {
            font-size: 28px;
          }

          .login-title {
            font-size: 22px;
          }

          .login-method-toggle {
            flex-direction: column;
          }

          .back-buttons {
            flex-direction: column;
            gap: 5px;
          }
        }

        @media (max-width: 480px) {
          .left-section,
          .right-section {
            padding: 20px 15px;
          }

          .form-options {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .forgot-password-link {
            align-self: flex-end;
          }

          .modal-content {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
};
export default BaseLogin;