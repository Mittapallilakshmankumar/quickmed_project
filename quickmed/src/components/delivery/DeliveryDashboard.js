// src/components/delivery/DeliveryDashboard.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Toast from './Toast';
import LogoutConfirmation from './LogoutConfirmation';
import AIChatBoard from './AIChatBoard';
import ProfileImageUpload from './ProfileImageUpload';
import Sidebar from './Sidebar';
import NotificationsPanel from './NotificationsPanel';
import TaskDetailsModal from './TaskDetailsModal';
import Dashboard from './Dashboard';
import DeliveryHistory from './DeliveryHistory';
import Earnings from './Earnings';
import Performance from './Performance';
import Profile from './Profile';
import './DeliveryDashboard.css';

// Notification sound
const playNotificationSound = () => {
  if (typeof window !== 'undefined' && window.AudioContext) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.1);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  }
};

const DeliveryDashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTask, setSelectedTask] = useState(null);
  const [isOnline, setIsOnline] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [showProfileImageUpload, setShowProfileImageUpload] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [toast, setToast] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Refs for click outside detection
  const notificationsRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Determine active page from route
  const getActivePageFromRoute = () => {
    const path = location.pathname;
    if (path === '/delivery-dashboard' || path === '/delivery-dashboard/dashboard') return 'dashboard';
    if (path === '/delivery-dashboard/delivery-history') return 'tasks';
    if (path === '/delivery-dashboard/earnings') return 'earnings';
    if (path === '/delivery-dashboard/performance') return 'performance';
    if (path === '/delivery-dashboard/profile') return 'profile';
    return 'dashboard';
  };

  const activePage = getActivePageFromRoute();

  // Show toast function
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  // Generate unique ID for delivery agent
  const generateAgentId = () => {
    const timestamp = new Date().getTime().toString(36);
    const randomStr = Math.random().toString(36).substr(2, 5);
    return `DA-${timestamp}-${randomStr}`.toUpperCase();
  };

  // Initialize profile data
  const [profileData, setProfileData] = useState({
    agentId: generateAgentId(),
    fullName: user?.fullName || 'Saketi Adarsh',
    email: user?.email || 'saketiadarsh79@gmail.com',
    phone: user?.phone || '+91 73829 70467',
    address: 'A Square buildings',
    city: 'Vishakapatanam',
    pincode: '532458',
    dateOfBirth: '',
    age: '45',
    gender: '',
    currentLocation: 'Sector 18, Noida',
    vehicleType: 'Motorcycle',
    vehicleNumber: 'DL01AB1234',
    joinedDate: '2023-05-24',
    totalDeliveries: 1245,
    rating: 5.0,
    completionRate: '99%',
    averageRating: 4.9,
    responseTime: '9 mins',
    profileImage: null
  });

  // Enhanced delivery data with pending orders
  const [deliveryData, setDeliveryData] = useState({
    stats: {
      totalToday: 0,
      inProgress: 0,
      completed: 0,
      cancelled: 0,
      todayEarnings: 0,
      pending: 0
    },
    pendingTasks: [
      {
        id: 3,
        orderId: 'ORD-003',
        customerName: 'Anita Desai',
        customerPhone: '+91 98765 43212',
        pickupLocation: 'MedPlus Pharmacy, Sector 18',
        deliveryLocation: 'C-12, Sector 12, Noida',
        items: ['Pain Relief Spray', 'Bandages'],
        priority: 'Medium',
        status: 'pending',
        estimatedTime: '20 mins',
        distance: '2.5 km',
        amount: 30,
        assignedTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        specialInstructions: 'Ring bell twice',
        currentLocation: 'Sector 18, Noida',
        routeProgress: 0
      }
    ],
    assignedTasks: [
      {
        id: 1,
        orderId: 'ORD-001',
        customerName: 'Rajesh Kumar',
        customerPhone: '+91 98765 43210',
        pickupLocation: 'MedPlus Pharmacy, MG Road',
        deliveryLocation: 'H-12, Sector 15, Noida',
        items: ['Paracetamol', 'Vitamin C', 'Cough Syrup'],
        priority: 'High',
        status: 'assigned',
        estimatedTime: '30 mins',
        distance: '4.2 km',
        amount: 45,
        assignedTime: '09:00 AM',
        specialInstructions: 'Call before delivery',
        currentLocation: 'Sector 18, Noida',
        routeProgress: 0
      },
      {
        id: 2,
        orderId: 'ORD-002',
        customerName: 'Priya Sharma',
        customerPhone: '+91 98765 43211',
        pickupLocation: 'Apollo Pharmacy, Connaught Place',
        deliveryLocation: 'B-5, Preet Vihar, Delhi',
        items: ['Insulin', 'Blood Pressure Monitor'],
        priority: 'Medium',
        status: 'in-progress',
        estimatedTime: '25 mins',
        distance: '3.8 km',
        amount: 35,
        assignedTime: '09:15 AM',
        specialInstructions: 'Handle with care - medical equipment',
        currentLocation: 'Connaught Place, Delhi',
        routeProgress: 45
      }
    ],
    completedTasks: [
      {
        id: 101,
        orderId: 'ORD-101',
        customerName: 'Arun Sharma',
        customerPhone: '+91 98765 43218',
        pickupLocation: 'City Medical Store, Sector 18',
        deliveryLocation: 'A-12, Sector 15, Noida',
        items: ['Blood Pressure Medicine', 'Vitamin D3'],
        completedTime: '10:45 AM',
        amount: 65,
        rating: 5,
        feedback: 'Very prompt delivery, excellent service',
        deliveryDate: new Date().toISOString().split('T')[0]
      }
    ],
    cancelledTasks: [],
    notifications: [
      {
        id: 1,
        type: 'order',
        title: 'New Delivery Assignment',
        message: 'You have been assigned a new delivery order ORD-006',
        time: '10 minutes ago',
        read: false,
        action: 'view'
      }
    ]
  });

  const [notifications, setNotifications] = useState(deliveryData.notifications);

  // Screen size detection
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
      
      // Close mobile menu on tablet/desktop
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Simulate new orders coming in
  useEffect(() => {
    if (!isOnline) return;

    const orderInterval = setInterval(() => {
      // 20% chance of new order every 30 seconds
      if (Math.random() < 0.2) {
        const newOrderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
        const newOrder = {
          id: Date.now(),
          orderId: newOrderId,
          customerName: ['Amit Patel', 'Sneha Reddy', 'Rohan Singh', 'Priya Iyer'][Math.floor(Math.random() * 4)],
          customerPhone: `+91 ${Math.floor(7000000000 + Math.random() * 3000000000)}`,
          pickupLocation: ['MedPlus Pharmacy', 'Apollo Pharmacy', 'City Medical', 'Wellness Store'][Math.floor(Math.random() * 4)],
          deliveryLocation: `Sector ${Math.floor(10 + Math.random() * 20)}, Noida`,
          items: [['Paracetamol', 'Vitamin C'], ['Cold Medicine', 'Cough Syrup'], ['Pain Relief', 'Bandages']][Math.floor(Math.random() * 3)],
          priority: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
          status: 'pending',
          estimatedTime: `${Math.floor(15 + Math.random() * 30)} mins`,
          distance: `${(2 + Math.random() * 5).toFixed(1)} km`,
          amount: Math.floor(30 + Math.random() * 50),
          assignedTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          specialInstructions: Math.random() > 0.7 ? 'Call before delivery' : '',
          currentLocation: 'Sector 18, Noida',
          routeProgress: 0
        };

        setDeliveryData(prev => ({
          ...prev,
          pendingTasks: [...prev.pendingTasks, newOrder],
          notifications: [
            {
              id: Date.now(),
              type: 'order',
              title: 'New Delivery Available',
              message: `New order ${newOrderId} is available for acceptance`,
              time: 'Just now',
              read: false,
              action: 'view'
            },
            ...prev.notifications
          ]
        }));

        setNotifications(prev => [
          {
            id: Date.now(),
            type: 'order',
            title: 'New Delivery Available',
            message: `New order ${newOrderId} is available for acceptance`,
            time: 'Just now',
            read: false,
            action: 'view'
          },
          ...prev
        ]);

        // Play notification sound
        playNotificationSound();
        showToast(`New delivery order ${newOrderId} available!`, 'info');
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(orderInterval);
  }, [isOnline]);

  // Update real-time stats
  useEffect(() => {
    const realTimeStats = {
      totalToday: deliveryData.assignedTasks.length + deliveryData.pendingTasks.length,
      inProgress: deliveryData.assignedTasks.filter(task => task.status === 'in-progress').length,
      completed: deliveryData.completedTasks.filter(task => 
        task.deliveryDate === new Date().toISOString().split('T')[0]
      ).length,
      cancelled: deliveryData.cancelledTasks.filter(task =>
        task.cancelledDate === new Date().toISOString().split('T')[0]
      ).length,
      todayEarnings: deliveryData.completedTasks
        .filter(task => task.deliveryDate === new Date().toISOString().split('T')[0])
        .reduce((sum, task) => sum + task.amount, 0),
      pending: deliveryData.pendingTasks.length
    };

    setDeliveryData(prev => ({
      ...prev,
      stats: realTimeStats
    }));
  }, [deliveryData.assignedTasks, deliveryData.pendingTasks, deliveryData.completedTasks, deliveryData.cancelledTasks]);

  // Click outside handler for notifications and mobile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Handle notifications
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      
      // Handle mobile menu
      if (mobileMenuRef.current && 
          !mobileMenuRef.current.contains(event.target) &&
          !event.target.closest('.mobile-menu-toggle')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Navigate to different pages
  const navigateTo = (page) => {
    const routes = {
      'dashboard': '/delivery-dashboard',
      'tasks': '/delivery-dashboard/delivery-history',
      'earnings': '/delivery-dashboard/earnings',
      'performance': '/delivery-dashboard/performance',
      'profile': '/delivery-dashboard/profile'
    };
    
    if (routes[page]) {
      navigate(routes[page]);
    }
    
    // Close mobile menu on mobile
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  // Task Management Functions
  const acceptDelivery = (taskId) => {
    const task = deliveryData.pendingTasks.find(t => t.id === taskId);
    if (task) {
      const acceptedTask = {
        ...task,
        status: 'assigned'
      };

      setDeliveryData(prev => ({
        ...prev,
        pendingTasks: prev.pendingTasks.filter(t => t.id !== taskId),
        assignedTasks: [acceptedTask, ...prev.assignedTasks],
        notifications: [
          {
            id: Date.now(),
            type: 'order',
            title: 'Delivery Accepted',
            message: `You have accepted order ${task.orderId}`,
            time: 'Just now',
            read: false,
            action: 'view'
          },
          ...prev.notifications
        ]
      }));

      setNotifications(prev => [
        {
          id: Date.now(),
          type: 'order',
          title: 'Delivery Accepted',
          message: `You have accepted order ${task.orderId}`,
          time: 'Just now',
          read: false,
          action: 'view'
        },
        ...prev
      ]);

      showToast(`Delivery ${task.orderId} accepted successfully!`, 'success');
      setSelectedTask(null);
    }
  };

  const startDelivery = (taskId) => {
    setDeliveryData(prev => ({
      ...prev,
      assignedTasks: prev.assignedTasks.map(task =>
        task.id === taskId ? { ...task, status: 'in-progress' } : task
      )
    }));
    setSelectedTask(null);
    showToast('Delivery started!', 'success');
  };

  const markDelivered = (taskId) => {
    const task = deliveryData.assignedTasks.find(t => t.id === taskId);
    if (task) {
      const completedTask = {
        ...task,
        status: 'delivered',
        completedTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        rating: Math.floor(Math.random() * 2) + 4,
        deliveryDate: new Date().toISOString().split('T')[0],
        feedback: 'Delivery completed successfully'
      };

      setDeliveryData(prev => ({
        ...prev,
        assignedTasks: prev.assignedTasks.filter(t => t.id !== taskId),
        completedTasks: [completedTask, ...prev.completedTasks],
        notifications: [
          {
            id: Date.now(),
            type: 'order',
            title: 'Delivery Completed',
            message: `Order ${task.orderId} delivered successfully`,
            time: 'Just now',
            read: false,
            action: 'view'
          },
          ...prev.notifications
        ]
      }));

      setNotifications(prev => [
        {
          id: Date.now(),
          type: 'order',
          title: 'Delivery Completed',
          message: `Order ${task.orderId} delivered successfully`,
          time: 'Just now',
          read: false,
          action: 'view'
        },
        ...prev
      ]);

      showToast(`Delivery ${task.orderId} completed!`, 'success');
    }
  };

  const cancelDelivery = (taskId) => {
    let task;
    let sourceArray = 'assignedTasks';
    
    task = deliveryData.assignedTasks.find(t => t.id === taskId);
    if (!task) {
      task = deliveryData.pendingTasks.find(t => t.id === taskId);
      sourceArray = 'pendingTasks';
    }

    if (task) {
      const cancelledTask = {
        ...task,
        status: 'cancelled',
        cancelledTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        reason: 'Delivery cancelled by agent',
        cancelledDate: new Date().toISOString().split('T')[0]
      };

      setDeliveryData(prev => ({
        ...prev,
        [sourceArray]: prev[sourceArray].filter(t => t.id !== taskId),
        cancelledTasks: [cancelledTask, ...prev.cancelledTasks],
        notifications: [
          {
            id: Date.now(),
            type: 'order',
            title: 'Delivery Cancelled',
            message: `Order ${task.orderId} has been cancelled`,
            time: 'Just now',
            read: false,
            action: 'view'
          },
          ...prev.notifications
        ]
      }));

      showToast(`Delivery ${task.orderId} cancelled`, 'warning');
      setSelectedTask(null);
    }
  };

  const getDirections = (task) => {
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(profileData.currentLocation)}&destination=${encodeURIComponent(task.deliveryLocation)}&travelmode=driving`;
    window.open(directionsUrl, '_blank');
  };

  const contactCustomer = (task) => {
    window.open(`tel:${task.customerPhone}`);
  };

  // Notification functions
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    }
  };

  const getUnreadCount = () => {
    return notifications.filter(notif => !notif.read).length;
  };

  const handleViewAllNotifications = () => {
    setShowNotifications(false);
    showToast('View All Notifications feature coming soon!', 'info');
  };

  // AI Chat functions
  const toggleAIChat = () => {
    setShowAIChat(!showAIChat);
  };

  // Profile Image functions
  const handleProfileImageChange = (newImage) => {
    setProfileData(prev => ({
      ...prev,
      profileImage: newImage
    }));
    showToast('Profile image updated successfully!', 'success');
  };

  // Online status toggle
  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
    showToast(
      isOnline ? 'You are now offline' : 'You are now online',
      isOnline ? 'warning' : 'success'
    );
  };

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Logout handlers
  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    setTimeout(() => {
      onLogout();
    }, 500);
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  // Common props for all components
  const commonProps = {
    profileData,
    deliveryData,
    isOnline,
    toggleOnlineStatus,
    showToast,
    setSelectedTask,
    toggleNotifications,
    getUnreadCount,
    toggleAIChat,
    setShowProfileImageUpload,
    handleProfileImageChange,
    navigateTo,
    acceptDelivery,
    startDelivery,
    markDelivered,
    cancelDelivery,
    getDirections,
    contactCustomer,
    isMobile,
    isTablet
  };

  // Render main content based on active page
  const renderMainContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard {...commonProps} />;
      case 'tasks':
        return <DeliveryHistory {...commonProps} />;
      case 'earnings':
        return <Earnings {...commonProps} />;
      case 'performance':
        return <Performance {...commonProps} />;
      case 'profile':
        return <Profile {...commonProps} />;
      default:
        return <Dashboard {...commonProps} />;
    }
  };

  const styles = {
    container: {
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#E0F2F1',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      position: 'relative'
    },
    content: {
      flex: 1,
      marginLeft: isMobile ? '0' : isTablet ? '240px' : '280px',
      padding: isMobile ? '0' : '0',
      transition: 'margin-left 0.3s ease'
    },
    mobileHeader: {
      display: isMobile ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem',
      backgroundColor: '#FFFFFF',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    },
    mobileMenuToggle: {
      background: 'none',
      border: 'none',
      fontSize: '1.5rem',
      cursor: 'pointer',
      color: '#124441'
    },
    mobileSidebar: {
      position: 'fixed',
      top: 0,
      left: isMobileMenuOpen ? '0' : '-280px',
      width: '280px',
      height: '100vh',
      backgroundColor: '#FFFFFF',
      boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
      zIndex: 1000,
      transition: 'left 0.3s ease'
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 999,
      display: isMobileMenuOpen ? 'block' : 'none'
    }
  };

  return (
    <div style={styles.container}>
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <LogoutConfirmation
          onConfirm={confirmLogout}
          onCancel={cancelLogout}
        />
      )}

      {/* AI Chat Board */}
      <AIChatBoard 
        isOpen={showAIChat}
        onClose={() => setShowAIChat(false)}
        user={user}
        isMobile={isMobile}
      />

      {/* Profile Image Upload Modal */}
      {showProfileImageUpload && (
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
          zIndex: 1000
        }}>
          <ProfileImageUpload
            currentImage={profileData.profileImage}
            onImageChange={handleProfileImageChange}
            onCancel={() => setShowProfileImageUpload(false)}
          />
        </div>
      )}

      {/* Mobile Header */}
      {isMobile && (
        <div style={styles.mobileHeader}>
          <button 
            className="mobile-menu-toggle"
            style={styles.mobileMenuToggle}
            onClick={toggleMobileMenu}
          >
            ☰
          </button>
          <h3 style={{ margin: 0, color: '#124441', fontSize: '1.1rem' }}>Delivery Dashboard</h3>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button 
              onClick={toggleNotifications}
              style={{ 
                background: 'none', 
                border: '1px solid #4DB6AC',
                borderRadius: '8px',
                backgroundColor: '#FFFFFF',
                position: 'relative', 
                cursor: 'pointer',
                fontSize: '1.2rem',
                padding: '8px'
              }}
            >
              🔔
              {getUnreadCount() > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  backgroundColor: '#009688',
                  color: '#FFFFFF',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  fontSize: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {getUnreadCount()}
                </span>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {isMobile && (
        <div style={styles.overlay} onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar Navigation */}
      {isMobile ? (
        <div ref={mobileMenuRef} style={styles.mobileSidebar}>
          <Sidebar
            activePage={activePage}
            setActivePage={navigateTo}
            profileData={profileData}
            isOnline={isOnline}
            onLogout={handleLogout}
            onToggleAIChat={toggleAIChat}
            isMobile={isMobile}
          />
        </div>
      ) : (
        <Sidebar
          activePage={activePage}
          setActivePage={navigateTo}
          profileData={profileData}
          isOnline={isOnline}
          onLogout={handleLogout}
          onToggleAIChat={toggleAIChat}
          isMobile={isMobile}
          isTablet={isTablet}
        />
      )}

      <div style={styles.content}>
        {renderMainContent()}
      </div>

      {/* Notifications Panel */}
      <div ref={notificationsRef}>
        <NotificationsPanel
          showNotifications={showNotifications}
          notifications={notifications}
          onClose={toggleNotifications}
          onViewAll={handleViewAllNotifications}
          isMobile={isMobile}
        />
      </div>

      {/* Task Details Modal */}
      {selectedTask && (
        <TaskDetailsModal
          selectedTask={selectedTask}
          onClose={() => setSelectedTask(null)}
          onGetDirections={getDirections}
          onContactCustomer={contactCustomer}
          onStartDelivery={startDelivery}
          onMarkDelivered={markDelivered}
          onCancelDelivery={cancelDelivery}
          onAcceptDelivery={acceptDelivery}
          isMobile={isMobile}
        />
      )}

      {/* Floating Action Button for Mobile */}
      {isMobile && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          zIndex: 100
        }}>
          <button
            onClick={toggleAIChat}
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: '#009688',
              color: '#FFFFFF',
              border: 'none',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              fontSize: '24px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            🤖
          </button>
          
          <button
            onClick={toggleOnlineStatus}
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: isOnline ? '#009688' : '#4F6F6B',
              color: '#FFFFFF',
              border: 'none',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              fontSize: '24px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {isOnline ? '✓' : '✕'}
          </button>
        </div>
      )}
    </div>
  );
};

export default DeliveryDashboard;