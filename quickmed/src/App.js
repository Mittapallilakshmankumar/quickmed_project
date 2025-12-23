// // App.js - Complete Consolidated Version with DeliverySignup Integration
// import React, { useState, useEffect, useCallback } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
// import './App.css';

// // Import Homepage Component
// import Home from './components/Homepage/HomePage';
// import Footer from './components/Homepage/Footer';

// // Import Main Authentication Components
// import MainLogin from './components/MainLogin';

// // Import Regular Role Components
// import UserLogin from './components/UserLogin';
// import VendorLogin from './components/VendorLogin';
// import DeliveryLogin from './components/DeliveryLogin';
// import DoctorLogin from './components/DoctorLogin';
// import UserSignup from './components/UserSignup';
// import VendorSignup from './components/VendorSignup';
// import DeliverySignup from './components/DeliverySignup'; // Import DeliverySignup
// import DoctorSignup from './components/DoctorSignup';

// // Import Dashboard Components
// import DoctorDashboard from './components/doctor/DoctorDashboard';
// import UserDashboard from './components/user/UserDashboard';
// import VendorDashboard from './components/vendor/VendorDashboard';
// import DeliveryDashboard from './components/delivery/DeliveryDashboard';

// // Import Profile Components
// import ProfileView from './components/user/ProfileView';

// // Import Context Provider
// import { ProfileProvider } from './components/user/ProfileContext';

// // Main App Component
// function App() {
//   return (
//     <ProfileProvider>
//       <Router>
//         <AppWrapper />
//       </Router>
//     </ProfileProvider>
//   );
// }

// // App Wrapper Component with integrated logic
// const AppWrapper = () => {
//   const [currentUser, setCurrentUser] = useState(() => {
//     try {
//       const user = localStorage.getItem('currentUser');
//       return user ? JSON.parse(user) : null;
//     } catch (error) {
//       console.error('Error parsing user data:', error);
//       localStorage.removeItem('currentUser');
//       return null;
//     }
//   });
  
//   const [showReviewModal, setShowReviewModal] = useState(false);
//   const [reviews, setReviews] = useState(() => {
//     try {
//       const savedReviews = localStorage.getItem('quickmed-reviews');
//       return savedReviews ? JSON.parse(savedReviews) : [];
//     } catch (error) {
//       console.error('Error parsing reviews:', error);
//       return [];
//     }
//   });
  
//   const navigate = useNavigate();
//   const location = useLocation();

//   // User type to page mapping (including linked accounts)
//   const userTypeToPageMap = useCallback((userType) => {
//     const map = {
//       vendor: '/vendor/dashboard',
//       doctor: '/doctor/dashboard',
//       delivery: '/delivery/dashboard',
//       user: '/user/dashboard',
//       patient: '/user/dashboard',
//       guardian: '/guardian/dashboard',
//       wife: '/wife/dashboard'
//     };
//     return map[userType] || '/user/dashboard';
//   }, []);

//   // Check if user type is a linked account
//   const isLinkedAccountType = useCallback((userType) => {
//     return ['guardian', 'wife'].includes(userType);
//   }, []);

//   // Check for logged-in user on mount and route changes
//   useEffect(() => {
//     const user = localStorage.getItem('currentUser');
//     if (user) {
//       try {
//         const userData = JSON.parse(user);
//         setCurrentUser(userData);
        
//         // Also set legacy token for compatibility
//         localStorage.setItem('token', 'user-authenticated');
//         localStorage.setItem('userRole', userData.userType);
        
//         // Check if it's a linked account
//         const isLinked = isLinkedAccountType(userData.userType);
//         if (isLinked) {
//           localStorage.setItem('isLinkedAccount', 'true');
//         } else {
//           localStorage.removeItem('isLinkedAccount');
//         }
        
//         // Prevent redirecting if already on correct user route
//         const isUserRoute = location.pathname.startsWith('/user/') || 
//                            location.pathname.startsWith('/doctor/') || 
//                            location.pathname.startsWith('/vendor/') || 
//                            location.pathname.startsWith('/delivery/') ||
//                            location.pathname.startsWith('/guardian/') ||
//                            location.pathname.startsWith('/wife/');
        
//         if (!isUserRoute && (location.pathname === '/' || location.pathname === '/home' || location.pathname === '/login')) {
//           const redirectPath = userTypeToPageMap(userData.userType);
//           navigate(redirectPath);
//         }
//       } catch (error) {
//         console.error('Error parsing user data:', error);
//         localStorage.removeItem('currentUser');
//         localStorage.removeItem('token');
//         localStorage.removeItem('userRole');
//         localStorage.removeItem('isLinkedAccount');
//         setCurrentUser(null);
//       }
//     }
//   }, [location.pathname, navigate, userTypeToPageMap, isLinkedAccountType]);

//   // Authentication handlers
//   const handleLoginSuccess = useCallback((user) => {
//     setCurrentUser(user);
//     localStorage.setItem('currentUser', JSON.stringify(user));
//     localStorage.setItem('token', 'user-authenticated');
//     localStorage.setItem('userRole', user.userType);
    
//     // Set linked account flag if applicable
//     if (isLinkedAccountType(user.userType)) {
//       localStorage.setItem('isLinkedAccount', 'true');
//     } else {
//       localStorage.removeItem('isLinkedAccount');
//     }
    
//     const redirectPath = userTypeToPageMap(user.userType);
//     navigate(redirectPath);
//   }, [navigate, userTypeToPageMap, isLinkedAccountType]);

//   const handleLogout = useCallback(() => {
//     localStorage.removeItem('currentUser');
//     localStorage.removeItem('token');
//     localStorage.removeItem('userRole');
//     localStorage.removeItem('isLinkedAccount');
//     setCurrentUser(null);
//     navigate('/');
//   }, [navigate]);

//   const handleSignupSuccess = useCallback((user) => {
//     setCurrentUser(user);
//     localStorage.setItem('currentUser', JSON.stringify(user));
//     localStorage.setItem('token', 'user-authenticated');
//     localStorage.setItem('userRole', user.userType);
    
//     // For user signup, check if they want to enable linked accounts
//     if (user.userType === 'user' && user.linkedAccounts && user.linkedAccounts.length > 0) {
//       // Store linked accounts configuration
//       localStorage.setItem(`linked_accounts_${user.id}`, JSON.stringify(user.linkedAccounts));
//     }
    
//     const redirectPath = userTypeToPageMap(user.userType);
//     navigate(redirectPath);
//   }, [navigate, userTypeToPageMap]);

//   const handleWriteReview = useCallback(() => {
//     setShowReviewModal(true);
//   }, []);

//   const handleReviewSubmit = useCallback((newReview) => {
//     const reviewToAdd = {
//       ...newReview,
//       avatar: newReview.name.split(' ').map(n => n[0]).join('').toUpperCase(),
//       id: Date.now()
//     };
    
//     const updatedReviews = [reviewToAdd, ...reviews];
//     setReviews(updatedReviews);
//     localStorage.setItem('quickmed-reviews', JSON.stringify(updatedReviews));
//     setShowReviewModal(false);
//   }, [reviews]);

//   const handleCloseReviewModal = useCallback(() => {
//     setShowReviewModal(false);
//   }, []);

//   // Protected Route Component
//   const ProtectedRoute = useCallback(({ children, requiredType }) => {
//     if (!currentUser) {
//       return <Navigate to="/login" replace />;
//     }
    
//     // For linked accounts, check if they have permission
//     if (isLinkedAccountType(requiredType)) {
//       const isLinkedAccount = localStorage.getItem('isLinkedAccount') === 'true';
//       if (!isLinkedAccount) {
//         // Check if current user has permission to access as this linked type
//         const primaryUserId = currentUser.id || currentUser.linkedFrom;
//         const linkedAccounts = JSON.parse(localStorage.getItem(`linked_accounts_${primaryUserId}`) || '[]');
        
//         if (!linkedAccounts.includes(requiredType)) {
//           return <Navigate to="/login" replace />;
//         }
//       }
//     }
    
//     if (currentUser.userType !== requiredType) {
//       return <Navigate to={`/login/${requiredType}`} replace />;
//     }
    
//     return children;
//   }, [currentUser, isLinkedAccountType]);

//   // Public Route Component (redirects if already logged in)
//   const PublicRoute = useCallback(({ children, redirectTo = '/' }) => {
//     if (currentUser) {
//       return <Navigate to={userTypeToPageMap(currentUser.userType)} replace />;
//     }
//     return children;
//   }, [currentUser, userTypeToPageMap]);

//   // User Route Handler Component
//   const UserRouteHandler = useCallback(() => {
//     return (
//       <ProtectedRoute requiredType="user">
//         <UserDashboard 
//           user={currentUser}
//           onLogout={handleLogout}
//           onWriteReview={handleWriteReview}
//         />
//       </ProtectedRoute>
//     );
//   }, [ProtectedRoute, currentUser, handleLogout, handleWriteReview]);

//   // Guardian Route Handler
//   const GuardianRouteHandler = useCallback(() => {
//     return (
//       <ProtectedRoute requiredType="guardian">
//           </ProtectedRoute>
//     );
//   }, [ProtectedRoute, currentUser, handleLogout]);

//   // Wife Route Handler
//   const WifeRouteHandler = useCallback(() => {
//     return (
//       <ProtectedRoute requiredType="wife">

//       </ProtectedRoute>
//     );
//   }, [ProtectedRoute, currentUser, handleLogout]);

//   // Vendor Route Handler
//   const VendorRouteHandler = useCallback(() => {
//     return (
//       <ProtectedRoute requiredType="vendor">
//         <VendorDashboard
//           user={currentUser}
//           onLogout={handleLogout}
//         />
//       </ProtectedRoute>
//     );
//   }, [ProtectedRoute, currentUser, handleLogout]);

//   // Doctor Route Handler
//   const DoctorRouteHandler = useCallback(() => {
//     return (
//       <ProtectedRoute requiredType="doctor">
//         <DoctorDashboard
//           user={currentUser}
//           onLogout={handleLogout}
//         />
//       </ProtectedRoute>
//     );
//   }, [ProtectedRoute, currentUser, handleLogout]);

//   // Delivery Route Handler
//   const DeliveryRouteHandler = useCallback(() => {
//     return (
//       <ProtectedRoute requiredType="delivery">
//         <DeliveryDashboard
//           user={currentUser}
//           onLogout={handleLogout}
//         />
//       </ProtectedRoute>
//     );
//   }, [ProtectedRoute, currentUser, handleLogout]);

//   // Check if current route is a dashboard route
//   const isDashboardRoute = useCallback(() => {
//     const path = location.pathname;
    
//     const dashboardPaths = [
//       '/doctor/dashboard',
//       '/user/dashboard',
//       '/vendor/dashboard',
//       '/delivery/dashboard',
//       '/guardian/dashboard',
//       '/wife/dashboard',
//       '/doctor-dashboard',
//       '/user-dashboard',
//       '/vendor-dashboard',
//       '/delivery-dashboard',
//       '/guardian-dashboard',
//       '/wife-dashboard'
//     ];
    
//     const isDashboard = dashboardPaths.some(dashboardPath => path.startsWith(dashboardPath));
    
//     const isDeliverySubRoute = 
//       path === '/delivery/dashboard/delivery-history' ||
//       path === '/delivery/dashboard/earnings' ||
//       path === '/delivery/dashboard/performance' ||
//       path === '/delivery/dashboard/profile';
    
//     const isWildcardUserRoute = 
//       (path.startsWith('/user/') && path !== '/user') ||
//       (path.startsWith('/doctor/') && path !== '/doctor') ||
//       (path.startsWith('/vendor/') && path !== '/vendor') ||
//       (path.startsWith('/delivery/') && path !== '/delivery') ||
//       (path.startsWith('/guardian/') && path !== '/guardian') ||
//       (path.startsWith('/wife/') && path !== '/wife');
    
//     return isDashboard || isDeliverySubRoute || isWildcardUserRoute;
//   }, [location.pathname]);

//   // Navigation handlers for HomePage
//   const handleNavigateToLogin = useCallback(() => {
//     navigate('/login');
//   }, [navigate]);

//   const handleNavigateToHome = useCallback(() => {
//     navigate('/');
//   }, [navigate]);

//   // Handle individual login success
//   const handleIndividualLoginSuccess = useCallback((user) => {
//     handleLoginSuccess(user);
//   }, [handleLoginSuccess]);

//   // Handle user signup success (for profile integration)
//   const handleUserSignupSuccess = useCallback((signupData) => {
//     console.log('Signup successful:', signupData);
//     // Transform signup data to match user object structure
//     const userData = {
//       ...signupData,
//       userType: 'user',
//       id: Date.now().toString()
//     };
//     handleSignupSuccess(userData);
//   }, [handleSignupSuccess]);

//   // Handle delivery signup success
//   const handleDeliverySignupSuccess = useCallback((user) => {
//     console.log('Delivery signup successful:', user);
//     // Transform delivery signup data to match user object structure
//     const userData = {
//       ...user,
//       userType: 'delivery',
//       id: Date.now().toString(),
//       createdAt: new Date().toISOString(),
//       isActive: true,
//       deliveriesCompleted: 0,
//       rating: 0,
//       earnings: 0
//     };
//     handleSignupSuccess(userData);
//   }, [handleSignupSuccess]);

//   // Handle switch to login (for DeliverySignup component)
//   const handleSwitchToLogin = useCallback(() => {
//     navigate('/login/delivery');
//   }, [navigate]);

//   // Handle switch to role selection (for DeliverySignup component)
//   const handleSwitchToRoleSelection = useCallback(() => {
//     navigate('/login');
//   }, [navigate]);

//   return (
//     <div className="App">
//       <main>
//         <Routes>
//           {/* Public Routes - Using Home component */}
//           <Route path="/" element={<Home />} />
//           <Route path="/home" element={<Navigate to="/" replace />} />
//           <Route path="/about" element={<Home />} />
//           <Route path="/contact" element={<Home />} />
//           <Route path="/doctors" element={<Home />} />
//           <Route path="/services" element={<Home />} />
//           <Route path="/reviews" element={<Home />} />
          
//           {/* Main Login Selection - Public */}
//           <Route path="/login" element={
//             <PublicRoute>
//               <MainLogin />
//             </PublicRoute>
//           } />
          
//           {/* Individual Login Pages - Public */}
//           <Route 
//             path="/login/user" 
//             element={
//               <PublicRoute>
//                 <UserLogin onLoginSuccess={handleIndividualLoginSuccess} />
//               </PublicRoute>
//             } 
//           />
//           <Route 
//             path="/login/vendor" 
//             element={
//               <PublicRoute>
//                 <VendorLogin onLoginSuccess={handleIndividualLoginSuccess} />
//               </PublicRoute>
//             } 
//           />
//           <Route 
//             path="/login/delivery" 
//             element={
//               <PublicRoute>
//                 <DeliveryLogin onLoginSuccess={handleIndividualLoginSuccess} />
//               </PublicRoute>
//             } 
//           />
//           <Route 
//             path="/login/doctor" 
//             element={
//               <PublicRoute>
//                 <DoctorLogin onLoginSuccess={handleIndividualLoginSuccess} />
//               </PublicRoute>
//             } 
//           />
          
//           {/* Guardian/Wife Login Pages - Public */}
//           <Route 
//             path="/login/guardian" 
//             element={
//               <PublicRoute>
//               </PublicRoute>
//             } 
//           />
//           <Route 
//             path="/login/wife" 
//             element={
//               <PublicRoute>
//               </PublicRoute>
//             } 
//           />
          
//           {/* Signup Pages - Public (Individual) */}
//           <Route 
//             path="/signup/user" 
//             element={
//               <PublicRoute>
//                 <UserSignup onSignupSuccess={handleUserSignupSuccess} />
//               </PublicRoute>
//             } 
//           />
//           <Route 
//             path="/signup/vendor" 
//             element={
//               <PublicRoute>
//                 <VendorSignup onSignupSuccess={handleSignupSuccess} />
//               </PublicRoute>
//             } 
//           />
//           <Route 
//             path="/signup/delivery" 
//             element={
//               <PublicRoute>
//                 <DeliverySignup 
//                   onSwitchToLogin={handleSwitchToLogin}
//                   onSwitchToRoleSelection={handleSwitchToRoleSelection}
//                   // onSignupSuccess={handleDeliverySignupSuccess}
//                 />
//               </PublicRoute>
//             } 
//           />
//           <Route 
//             path="/signup/doctor" 
//             element={
//               <PublicRoute>
//                 <DoctorSignup onSignupSuccess={handleSignupSuccess} />
//               </PublicRoute>
//             } 
//           />
          
//           {/* Profile View Route - Protected */}
//           <Route 
//             path="/profile" 
//             element={
//               <ProtectedRoute requiredType="user">
//                 <ProfileView 
//                   setActiveView={(view) => {
//                     if (view === 'signup') {
//                       // Redirect to signup or handle appropriately
//                       navigate('/signup/user');
//                     } else {
//                       // Handle other view changes
//                       console.log('Profile view change:', view);
//                     }
//                   }}
//                 />
//               </ProtectedRoute>
//             } 
//           />
          
//           {/* Doctor Routes */}
//           <Route path="/doctor/dashboard" element={<DoctorRouteHandler />} />
//           <Route path="/doctor/dashboard/*" element={<DoctorRouteHandler />} />
//           <Route path="/doctor/*" element={<DoctorRouteHandler />} />

//           {/* User Routes */}
//           <Route path="/user/dashboard" element={<UserRouteHandler />} />
//           <Route path="/user/dashboard/*" element={<UserRouteHandler />} />
//           <Route path="/user/*" element={<UserRouteHandler />} />
          
//           {/* Guardian Routes */}
//           <Route path="/guardian/dashboard" element={<GuardianRouteHandler />} />
//           <Route path="/guardian/dashboard/*" element={<GuardianRouteHandler />} />
//           <Route path="/guardian/*" element={<GuardianRouteHandler />} />
          
//           {/* Wife Routes */}
//           <Route path="/wife/dashboard" element={<WifeRouteHandler />} />
//           <Route path="/wife/dashboard/*" element={<WifeRouteHandler />} />
//           <Route path="/wife/*" element={<WifeRouteHandler />} />
          
//           {/* User Sub-routes */}
//           <Route path="/user/profile" element={<UserRouteHandler />} />
//           <Route path="/user/consultation" element={<UserRouteHandler />} />
//           <Route path="/user/appointments" element={<UserRouteHandler />} />
//           <Route path="/user/orders" element={<UserRouteHandler />} />
//           <Route path="/user/medicine" element={<UserRouteHandler />} />
//           <Route path="/user/products" element={<UserRouteHandler />} />
//           <Route path="/user/cart" element={<UserRouteHandler />} />
//           <Route path="/user/live-tracking" element={<UserRouteHandler />} />
//           <Route path="/user/notifications" element={<UserRouteHandler />} />
//           <Route path="/user/pregnancy-care" element={<UserRouteHandler />} />
//           <Route path="/user/baby-care" element={<UserRouteHandler />} />
//           <Route path="/user/lab-tests" element={<UserRouteHandler />} />
//           <Route path="/user/health-records" element={<UserRouteHandler />} />
//           <Route path="/user/blood-bank" element={<UserRouteHandler />} />

//           {/* Vendor Routes */}
//           <Route path="/vendor/dashboard" element={<VendorRouteHandler />} />
//           <Route path="/vendor/dashboard/*" element={<VendorRouteHandler />} />
//           <Route path="/vendor/*" element={<VendorRouteHandler />} />

//           {/* Delivery Routes */}
//           <Route path="/delivery/dashboard" element={<DeliveryRouteHandler />} />
//           <Route path="/delivery/dashboard/*" element={<DeliveryRouteHandler />} />
//           <Route path="/delivery/*" element={<DeliveryRouteHandler />} />
//           <Route path="/delivery/dashboard/delivery-history" element={<DeliveryRouteHandler />} />
//           <Route path="/delivery/dashboard/earnings" element={<DeliveryRouteHandler />} />
//           <Route path="/delivery/dashboard/performance" element={<DeliveryRouteHandler />} />
//           <Route path="/delivery/dashboard/profile" element={<DeliveryRouteHandler />} />

//           {/* Alternative routes */}
//           <Route path="/user-dashboard" element={<UserRouteHandler />} />
//           <Route path="/vendor-dashboard" element={<VendorRouteHandler />} />
//           <Route path="/doctor-dashboard" element={<DoctorRouteHandler />} />
//           <Route path="/delivery-dashboard" element={<DeliveryRouteHandler />} />
//           <Route path="/delivery-dashboard/*" element={<DeliveryRouteHandler />} />
//           <Route path="/guardian-dashboard" element={<GuardianRouteHandler />} />
//           <Route path="/wife-dashboard" element={<WifeRouteHandler />} />

//           {/* 404 Page */}
//           <Route path="*" element={
//             <div className="not-found">
//               <h1>404 - Page Not Found</h1>
//               <p>The page you're looking for doesn't exist.</p>
//               <a href="/">Go to Home</a>
//             </div>
//           } />
//         </Routes>
//       </main>

//       {/* Conditionally render Footer */}
//       {!isDashboardRoute() && location.pathname !== '/login' && location.pathname !== '/signup' && 
//        !location.pathname.startsWith('/login/') && !location.pathname.startsWith('/signup/') && <Footer />}
//     </div>
//   );
// };

// export default App;






// App.js - Complete Consolidated Version with DeliverySignup Integration
import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import './App.css';

// Import Homepage Component
import Home from './components/Homepage/HomePage';
import Footer from './components/Homepage/Footer';

// Import Main Authentication Components
import MainLogin from './components/MainLogin';

// Import Regular Role Components
import UserLogin from './components/UserLogin';
import VendorLogin from './components/VendorLogin';
import DeliveryLogin from './components/DeliveryLogin';
import DoctorLogin from './components/DoctorLogin';
import UserSignup from './components/UserSignup';
import VendorSignup from './components/VendorSignup';
import DeliverySignup from './components/DeliverySignup'; // Import DeliverySignup
import DoctorSignup from './components/DoctorSignup';

// Import Dashboard Components
import DoctorDashboard from './components/doctor/DoctorDashboard';
import UserDashboard from './components/user/UserDashboard';
import VendorDashboard from './components/vendor/VendorDashboard';
import DeliveryDashboard from './components/delivery/DeliveryDashboard';

// Import Profile Components
import ProfileView from './components/user/ProfileView';

// Import Context Provider
import { ProfileProvider } from './components/user/ProfileContext';

// Main App Component
function App() {
  return (
    <ProfileProvider>
      <Router>
        <AppWrapper />
      </Router>
    </ProfileProvider>
  );
}

// App Wrapper Component with integrated logic
const AppWrapper = () => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const user = localStorage.getItem('currentUser');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.removeItem('currentUser');
      return null;
    }
  });
  
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviews, setReviews] = useState(() => {
    try {
      const savedReviews = localStorage.getItem('quickmed-reviews');
      return savedReviews ? JSON.parse(savedReviews) : [];
    } catch (error) {
      console.error('Error parsing reviews:', error);
      return [];
    }
  });
  
  const navigate = useNavigate();
  const location = useLocation();

  // User type to page mapping (including linked accounts)
  const userTypeToPageMap = useCallback((userType) => {
    const map = {
      vendor: '/vendor/dashboard',
      doctor: '/doctor/dashboard',
      delivery: '/delivery/dashboard',
      user: '/user/dashboard',
      patient: '/user/dashboard',
      guardian: '/guardian/dashboard',
      wife: '/wife/dashboard'
    };
    return map[userType] || '/user/dashboard';
  }, []);

  // Check if user type is a linked account
  const isLinkedAccountType = useCallback((userType) => {
    return ['guardian', 'wife'].includes(userType);
  }, []);

  // Check for logged-in user on mount and route changes
  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      try {
        const userData = JSON.parse(user);
        setCurrentUser(userData);
        
        // Also set legacy token for compatibility
        localStorage.setItem('token', 'user-authenticated');
        localStorage.setItem('userRole', userData.userType);
        
        // Check if it's a linked account
        const isLinked = isLinkedAccountType(userData.userType);
        if (isLinked) {
          localStorage.setItem('isLinkedAccount', 'true');
        } else {
          localStorage.removeItem('isLinkedAccount');
        }
        
        // Prevent redirecting if already on correct user route
        const isUserRoute = location.pathname.startsWith('/user/') || 
                           location.pathname.startsWith('/doctor/') || 
                           location.pathname.startsWith('/vendor/') || 
                           location.pathname.startsWith('/delivery/') ||
                           location.pathname.startsWith('/guardian/') ||
                           location.pathname.startsWith('/wife/');
        
        // if (!isUserRoute && (location.pathname === '/' || location.pathname === '/home')) {
        //   const redirectPath = userTypeToPageMap(userData.userType);
        //   navigate(redirectPath);
        // }
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        localStorage.removeItem('isLinkedAccount');
        setCurrentUser(null);
      }
    }
  }, [location.pathname, navigate, userTypeToPageMap, isLinkedAccountType]);

  // Authentication handlers
  const handleLoginSuccess = useCallback((user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('token', 'user-authenticated');
    localStorage.setItem('userRole', user.userType);
    
    // Set linked account flag if applicable
    if (isLinkedAccountType(user.userType)) {
      localStorage.setItem('isLinkedAccount', 'true');
    } else {
      localStorage.removeItem('isLinkedAccount');
    }
    
    const redirectPath = userTypeToPageMap(user.userType);
    navigate(redirectPath);
  }, [navigate, userTypeToPageMap, isLinkedAccountType]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('isLinkedAccount');
    setCurrentUser(null);
    navigate('/');
  }, [navigate]);

  const handleSignupSuccess = useCallback((user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('token', 'user-authenticated');
    localStorage.setItem('userRole', user.userType);
    
    // For user signup, check if they want to enable linked accounts
    if (user.userType === 'user' && user.linkedAccounts && user.linkedAccounts.length > 0) {
      // Store linked accounts configuration
      localStorage.setItem(`linked_accounts_${user.id}`, JSON.stringify(user.linkedAccounts));
    }
    
    const redirectPath = userTypeToPageMap(user.userType);
    navigate(redirectPath);
  }, [navigate, userTypeToPageMap]);

  const handleWriteReview = useCallback(() => {
    setShowReviewModal(true);
  }, []);

  const handleReviewSubmit = useCallback((newReview) => {
    const reviewToAdd = {
      ...newReview,
      avatar: newReview.name.split(' ').map(n => n[0]).join('').toUpperCase(),
      id: Date.now()
    };
    
    const updatedReviews = [reviewToAdd, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem('quickmed-reviews', JSON.stringify(updatedReviews));
    setShowReviewModal(false);
  }, [reviews]);

  const handleCloseReviewModal = useCallback(() => {
    setShowReviewModal(false);
  }, []);

  // Protected Route Component
  const ProtectedRoute = useCallback(({ children, requiredType }) => {
    if (!currentUser) {
      return <Navigate to="/login" replace />;
    }
    
    // For linked accounts, check if they have permission
    if (isLinkedAccountType(requiredType)) {
      const isLinkedAccount = localStorage.getItem('isLinkedAccount') === 'true';
      if (!isLinkedAccount) {
        // Check if current user has permission to access as this linked type
        const primaryUserId = currentUser.id || currentUser.linkedFrom;
        const linkedAccounts = JSON.parse(localStorage.getItem(`linked_accounts_${primaryUserId}`) || '[]');
        
        if (!linkedAccounts.includes(requiredType)) {
          return <Navigate to="/login" replace />;
        }
      }
    }
    
    if (currentUser.userType !== requiredType) {
      return <Navigate to={`/login/${requiredType}`} replace />;
    }
    
    return children;
  }, [currentUser, isLinkedAccountType]);

  // Public Route Component (redirects if already logged in)
  const PublicRoute = useCallback(({ children, redirectTo = '/' }) => {
    if (currentUser) {
      return <Navigate to={userTypeToPageMap(currentUser.userType)} replace />;
    }
    return children;
  }, [currentUser, userTypeToPageMap]);

  // User Route Handler Component
  const UserRouteHandler = useCallback(() => {
    return (
      <ProtectedRoute requiredType="user">
        <UserDashboard 
          user={currentUser}
          onLogout={handleLogout}
          onWriteReview={handleWriteReview}
        />
      </ProtectedRoute>
    );
  }, [ProtectedRoute, currentUser, handleLogout, handleWriteReview]);

  // Guardian Route Handler
  // const GuardianRouteHandler = useCallback(() => {
  //   return (
  //     <ProtectedRoute requiredType="guardian">
  //         </ProtectedRoute>
  //   );
  // }, [ProtectedRoute, currentUser, handleLogout]);
  const GuardianRouteHandler = () => {
  return (
    <ProtectedRoute requiredType="guardian">
      <div style={{ padding: 40 }}>
        <h2>Guardian Dashboard (Coming Soon)</h2>
      </div>
    </ProtectedRoute>
  );
};


  // Wife Route Handler
  // const WifeRouteHandler = useCallback(() => {
  //   return (
  //     <ProtectedRoute requiredType="wife">

  //     </ProtectedRoute>
  //   );
  // }, [ProtectedRoute, currentUser, handleLogout]);
  const WifeRouteHandler = () => {
  return (
    <ProtectedRoute requiredType="wife">
      <div style={{ padding: 40 }}>
        <h2>Wife Dashboard (Coming Soon)</h2>
      </div>
    </ProtectedRoute>
  );
};


  // Vendor Route Handler
  const VendorRouteHandler = useCallback(() => {
    return (
      <ProtectedRoute requiredType="vendor">
        <VendorDashboard
          user={currentUser}
          onLogout={handleLogout}
        />
      </ProtectedRoute>
    );
  }, [ProtectedRoute, currentUser, handleLogout]);

  // Doctor Route Handler
  const DoctorRouteHandler = useCallback(() => {
    return (
      <ProtectedRoute requiredType="doctor">
        <DoctorDashboard
          user={currentUser}
          onLogout={handleLogout}
        />
      </ProtectedRoute>
    );
  }, [ProtectedRoute, currentUser, handleLogout]);

  // Delivery Route Handler
  const DeliveryRouteHandler = useCallback(() => {
    return (
      <ProtectedRoute requiredType="delivery">
        <DeliveryDashboard
          user={currentUser}
          onLogout={handleLogout}
        />
      </ProtectedRoute>
    );
  }, [ProtectedRoute, currentUser, handleLogout]);

  // Check if current route is a dashboard route
  const isDashboardRoute = useCallback(() => {
    const path = location.pathname;
    
    const dashboardPaths = [
      '/doctor/dashboard',
      '/user/dashboard',
      '/vendor/dashboard',
      '/delivery/dashboard',
      '/guardian/dashboard',
      '/wife/dashboard',
      '/doctor-dashboard',
      '/user-dashboard',
      '/vendor-dashboard',
      '/delivery-dashboard',
      '/guardian-dashboard',
      '/wife-dashboard'
    ];
    
    const isDashboard = dashboardPaths.some(dashboardPath => path.startsWith(dashboardPath));
    
    const isDeliverySubRoute = 
      path === '/delivery/dashboard/delivery-history' ||
      path === '/delivery/dashboard/earnings' ||
      path === '/delivery/dashboard/performance' ||
      path === '/delivery/dashboard/profile';
    
    const isWildcardUserRoute = 
      (path.startsWith('/user/') && path !== '/user') ||
      (path.startsWith('/doctor/') && path !== '/doctor') ||
      (path.startsWith('/vendor/') && path !== '/vendor') ||
      (path.startsWith('/delivery/') && path !== '/delivery') ||
      (path.startsWith('/guardian/') && path !== '/guardian') ||
      (path.startsWith('/wife/') && path !== '/wife');
    
    return isDashboard || isDeliverySubRoute || isWildcardUserRoute;
  }, [location.pathname]);

  // Navigation handlers for HomePage
  const handleNavigateToLogin = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  const handleNavigateToHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  // Handle individual login success
  const handleIndividualLoginSuccess = useCallback((user) => {
    handleLoginSuccess(user);
  }, [handleLoginSuccess]);

  // Handle user signup success (for profile integration)
  const handleUserSignupSuccess = useCallback((signupData) => {
    console.log('Signup successful:', signupData);
    // Transform signup data to match user object structure
    const userData = {
      ...signupData,
      userType: 'user',
      id: Date.now().toString()
    };
    handleSignupSuccess(userData);
  }, [handleSignupSuccess]);

  // Handle delivery signup success
  // const handleDeliverySignupSuccess = useCallback((user) => {
  //   console.log('Delivery signup successful:', user);
  //   // Transform delivery signup data to match user object structure
  //   const userData = {
  //     ...user,
  //     userType: 'delivery',
  //     id: Date.now().toString(),
  //     createdAt: new Date().toISOString(),
  //     isActive: true,
  //     deliveriesCompleted: 0,
  //     rating: 0,
  //     earnings: 0
  //   };
  //   handleSignupSuccess(userData);
  // }, [handleSignupSuccess]);
  const handleDeliverySignupSuccess = useCallback((user) => {
  console.log('Delivery signup successful:', user);

  // ✅ AFTER SIGNUP → GO TO LOGIN PAGE
  navigate('/login/delivery');

}, [navigate]);


  // Handle switch to login (for DeliverySignup component)
  const handleSwitchToLogin = useCallback(() => {
    navigate('/login/delivery');
  }, [navigate]);

  // Handle switch to role selection (for DeliverySignup component)
  const handleSwitchToRoleSelection = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  return (
    <div className="App">
      <main>
        <Routes>
          {/* Public Routes - Using Home component */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/about" element={<Home />} />
          <Route path="/contact" element={<Home />} />
          <Route path="/doctors" element={<Home />} />
          <Route path="/services" element={<Home />} />
          <Route path="/reviews" element={<Home />} />
          
          {/* Main Login Selection - Public */}
          <Route path="/login" element={
            <PublicRoute>
              <MainLogin />
            </PublicRoute>
          } />
          
          {/* Individual Login Pages - Public */}
          <Route 
            path="/login/user" 
            element={
              <PublicRoute>
                <UserLogin onLoginSuccess={handleIndividualLoginSuccess} />
              </PublicRoute>
            } 
          />
          <Route 
            path="/login/vendor" 
            element={
              <PublicRoute>
                <VendorLogin onLoginSuccess={handleIndividualLoginSuccess} />
              </PublicRoute>
            } 
          />
          <Route 
            path="/login/delivery" 
            element={
              <PublicRoute>
                <DeliveryLogin onLoginSuccess={handleIndividualLoginSuccess} />
              </PublicRoute>
            } 
          />
          <Route 
            path="/login/doctor" 
            element={
              <PublicRoute>
                <DoctorLogin onLoginSuccess={handleIndividualLoginSuccess} />
              </PublicRoute>
            } 
          />
          
          {/* Guardian/Wife Login Pages - Public */}
          <Route 
            path="/login/guardian" 
            element={
              <PublicRoute>
              </PublicRoute>
            } 
          />
          <Route 
            path="/login/wife" 
            element={
              <PublicRoute>
              </PublicRoute>
            } 
          />
          
          {/* Signup Pages - Public (Individual) */}
          <Route 
            path="/signup/user" 
            element={
              <PublicRoute>
                <UserSignup onSignupSuccess={handleUserSignupSuccess} />
              </PublicRoute>
            } 
          />
          <Route 
            path="/signup/vendor" 
            element={
              <PublicRoute>
                <VendorSignup onSignupSuccess={handleSignupSuccess} />
              </PublicRoute>
            } 
          />
          <Route 
            path="/signup/delivery" 
            element={
              <PublicRoute>
                <DeliverySignup 
                  onSwitchToLogin={handleSwitchToLogin}
                  onSwitchToRoleSelection={handleSwitchToRoleSelection}
                  // onSignupSuccess={handleDeliverySignupSuccess}
                />
              </PublicRoute>
            } 
          />
          <Route 
            path="/signup/doctor" 
            element={
              <PublicRoute>
                <DoctorSignup onSignupSuccess={handleSignupSuccess} />
              </PublicRoute>
            } 
          />
          
          {/* Profile View Route - Protected */}
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute requiredType="user">
                <ProfileView 
                  setActiveView={(view) => {
                    if (view === 'signup') {
                      // Redirect to signup or handle appropriately
                      navigate('/signup/user');
                    } else {
                      // Handle other view changes
                      console.log('Profile view change:', view);
                    }
                  }}
                />
              </ProtectedRoute>
            } 
          />
          
          {/* Doctor Routes */}
          <Route path="/doctor/dashboard" element={<DoctorRouteHandler />} />
          <Route path="/doctor/dashboard/*" element={<DoctorRouteHandler />} />
          <Route path="/doctor/*" element={<DoctorRouteHandler />} />

          {/* User Routes */}
          <Route path="/user/dashboard" element={<UserRouteHandler />} />
          <Route path="/user/dashboard/*" element={<UserRouteHandler />} />
          <Route path="/user/*" element={<UserRouteHandler />} />
          
          {/* Guardian Routes */}
          <Route path="/guardian/dashboard" element={<GuardianRouteHandler />} />
          <Route path="/guardian/dashboard/*" element={<GuardianRouteHandler />} />
          <Route path="/guardian/*" element={<GuardianRouteHandler />} />
          
          {/* Wife Routes */}
          <Route path="/wife/dashboard" element={<WifeRouteHandler />} />
          <Route path="/wife/dashboard/*" element={<WifeRouteHandler />} />
          <Route path="/wife/*" element={<WifeRouteHandler />} />
          
          {/* User Sub-routes */}
          <Route path="/user/profile" element={<UserRouteHandler />} />
          <Route path="/user/consultation" element={<UserRouteHandler />} />
          <Route path="/user/appointments" element={<UserRouteHandler />} />
          <Route path="/user/orders" element={<UserRouteHandler />} />
          <Route path="/user/medicine" element={<UserRouteHandler />} />
          <Route path="/user/products" element={<UserRouteHandler />} />
          <Route path="/user/cart" element={<UserRouteHandler />} />
          <Route path="/user/live-tracking" element={<UserRouteHandler />} />
          <Route path="/user/notifications" element={<UserRouteHandler />} />
          <Route path="/user/pregnancy-care" element={<UserRouteHandler />} />
          <Route path="/user/baby-care" element={<UserRouteHandler />} />
          <Route path="/user/lab-tests" element={<UserRouteHandler />} />
          <Route path="/user/health-records" element={<UserRouteHandler />} />
          <Route path="/user/blood-bank" element={<UserRouteHandler />} />

          {/* Vendor Routes */}
          <Route path="/vendor/dashboard" element={<VendorRouteHandler />} />
          <Route path="/vendor/dashboard/*" element={<VendorRouteHandler />} />
          <Route path="/vendor/*" element={<VendorRouteHandler />} />

          {/* Delivery Routes */}
          <Route path="/delivery/dashboard" element={<DeliveryRouteHandler />} />
          <Route path="/delivery/dashboard/*" element={<DeliveryRouteHandler />} />
          <Route path="/delivery/*" element={<DeliveryRouteHandler />} />
          <Route path="/delivery/dashboard/delivery-history" element={<DeliveryRouteHandler />} />
          <Route path="/delivery/dashboard/earnings" element={<DeliveryRouteHandler />} />
          <Route path="/delivery/dashboard/performance" element={<DeliveryRouteHandler />} />
          <Route path="/delivery/dashboard/profile" element={<DeliveryRouteHandler />} />

          {/* Alternative routes */}
          <Route path="/user-dashboard" element={<UserRouteHandler />} />
          <Route path="/vendor-dashboard" element={<VendorRouteHandler />} />
          <Route path="/doctor-dashboard" element={<DoctorRouteHandler />} />
          <Route path="/delivery-dashboard" element={<DeliveryRouteHandler />} />
          <Route path="/delivery-dashboard/*" element={<DeliveryRouteHandler />} />
          <Route path="/guardian-dashboard" element={<GuardianRouteHandler />} />
          <Route path="/wife-dashboard" element={<WifeRouteHandler />} />

          {/* 404 Page */}
          <Route path="*" element={
            <div className="not-found">
              <h1>404 - Page Not Found</h1>
              <p>The page you're looking for doesn't exist.</p>
              <a href="/">Go to Home</a>
            </div>
          } />
        </Routes>
      </main>

      {/* Conditionally render Footer */}
      {!isDashboardRoute() && location.pathname !== '/login' && location.pathname !== '/signup' && 
       !location.pathname.startsWith('/login/') && !location.pathname.startsWith('/signup/') && <Footer />}
    </div>
  );
};

export default App;

