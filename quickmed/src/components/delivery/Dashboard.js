import React, { useState, useEffect, useRef } from 'react';
import LiveRouteTracker from './LiveRouteTracker';

const Dashboard = ({ 
  profileData, 
  deliveryData, 
  isOnline: propIsOnline, 
  toggleOnlineStatus, 
  setSelectedTask, 
  toggleNotifications, 
  getUnreadCount, 
  toggleAIChat,
  setActivePage 
}) => {
  const [selectedStat, setSelectedStat] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [availableOrders, setAvailableOrders] = useState([]);
  const [currentStep, setCurrentStep] = useState('available');
  const [incentives, setIncentives] = useState({
    today: 65,
    weekly: 420,
    monthly: 1800,
    completedDeliveries: 1,
    bonusEligible: true,
    customerTips: 25,
    joiningBonus: 500,
    referralBonus: 200,
    dailyTarget: 300,
    dailyOrdersCompleted: 1,
    dailyTargetAchieved: false
  });
  const [showProofModal, setShowProofModal] = useState(false);
  const [currentDeliveryForProof, setCurrentDeliveryForProof] = useState(null);
  const [proofImage, setProofImage] = useState(null);
  const [proofSignature, setProofSignature] = useState(null);
  const [customerOTP, setCustomerOTP] = useState('');
  const audioRef = useRef(null);
  const notificationIntervalRef = useRef(null);
  const proofImageInputRef = useRef(null);
  const signatureCanvasRef = useRef(null);

  // Safe function calls
  const safeSetActivePage = (page) => {
    if (typeof setActivePage === 'function') {
      setActivePage(page);
    }
  };

  const safeToggleOnlineStatus = (status) => {
    if (typeof toggleOnlineStatus === 'function') {
      toggleOnlineStatus(status);
    }
  };

  const safeSetSelectedTask = (task) => {
    if (typeof setSelectedTask === 'function') {
      setSelectedTask(task);
    }
  };

  const safeToggleNotifications = () => {
    if (typeof toggleNotifications === 'function') {
      toggleNotifications();
    }
  };

  const safeGetUnreadCount = () => {
    if (typeof getUnreadCount === 'function') {
      return getUnreadCount();
    }
    return 0;
  };

  const safeToggleAIChat = () => {
    if (typeof toggleAIChat === 'function') {
      toggleAIChat();
    }
  };

  // Sync with prop isOnline
  useEffect(() => {
    if (propIsOnline !== undefined) {
      setIsOnline(propIsOnline);
    }
  }, [propIsOnline]);

  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const styles = {
    mainContent: {
      padding: '30px',
      minHeight: '100vh',
      backgroundColor: isOnline ? '#E0F2F1' : '#000000',
      background: isOnline ? '#E0F2F1' : 'linear-gradient(135deg, #000000 0%, #0F2C2A 50%, #000000 100%)',
      transition: 'all 0.5s ease'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '30px'
    },
    headerActions: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    actionButtons: {
      display: 'flex',
      gap: '8px'
    },
    onlineStatus: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      backgroundColor: isOnline ? '#FFFFFF' : '#0F2C2A',
      padding: '8px 12px',
      borderRadius: '8px',
      border: isOnline ? '1px solid #4DB6AC' : '1px solid #4DB6AC40',
      color: isOnline ? '#124441' : '#E0F2F1',
      transition: 'all 0.3s ease'
    },
    statusDot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      display: 'inline-block'
    },
    statusText: {
      fontSize: '14px',
      fontWeight: '500',
      color: isOnline ? '#124441' : '#E0F2F1',
      transition: 'color 0.3s ease'
    },
    statusToggle: {
      backgroundColor: isOnline ? '#009688' : '#E0F2F1',
      color: isOnline ? '#FFFFFF' : '#124441',
      border: 'none',
      padding: '6px 12px',
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    aiChatButton: {
      backgroundColor: '#009688',
      color: '#FFFFFF',
      border: 'none',
      borderRadius: '50%',
      padding: '16px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '56px',
      height: '56px',
      gap: '6px',
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 1000,
      boxShadow: '0 4px 12px rgba(0, 150, 136, 0.3)'
    },
    notificationButton: {
      backgroundColor: isOnline ? '#FFFFFF' : '#0F2C2A',
      border: isOnline ? '1px solid #4DB6AC' : '1px solid #4DB6AC40',
      borderRadius: '8px',
      padding: '8px 12px',
      cursor: 'pointer',
      fontSize: '16px',
      position: 'relative',
      transition: 'all 0.3s ease',
      color: isOnline ? '#124441' : '#E0F2F1'
    },
    notificationBadge: {
      position: 'absolute',
      top: '-4px',
      right: '-4px',
      backgroundColor: '#009688',
      color: '#FFFFFF',
      borderRadius: '50%',
      width: '16px',
      height: '16px',
      fontSize: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold'
    },
    greeting: {
      fontSize: '28px',
      fontWeight: '700',
      color: isOnline ? '#124441' : '#E0F2F1',
      margin: '0 0 8px 0',
      transition: 'color 0.3s ease'
    },
    subtitle: {
      fontSize: '16px',
      color: isOnline ? '#4F6F6B' : '#E0F2F1B0',
      margin: 0,
      transition: 'color 0.3s ease'
    },
    dateDisplay: {
      fontSize: '14px',
      color: isOnline ? '#4F6F6B' : '#E0F2F1B0',
      fontWeight: '500',
      transition: 'color 0.3s ease'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(6, 1fr)',
      gap: '20px',
      marginBottom: '30px'
    },
    statCard: {
      backgroundColor: isOnline ? '#FFFFFF' : '#0F2C2A',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: isOnline ? '0 2px 4px rgba(0,0,0,0.05)' : '0 4px 15px rgba(224, 242, 241, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      border: isOnline ? '2px solid transparent' : '1px solid #4DB6AC20',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      minHeight: '120px'
    },
    statCardActive: {
      borderColor: '#009688',
      boxShadow: '0 4px 12px rgba(0, 150, 136, 0.2)',
      transform: 'translateY(-2px)'
    },
    statIcon: {
      fontSize: '24px',
      marginBottom: '12px',
      width: '50px',
      height: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '12px',
      backgroundColor: isOnline ? '#E0F2F1' : '#4DB6AC20',
      color: isOnline ? '#124441' : '#E0F2F1',
      transition: 'all 0.3s ease'
    },
    statContent: {
      textAlign: 'center'
    },
    statNumber: {
      fontSize: '24px',
      fontWeight: '700',
      color: isOnline ? '#124441' : '#E0F2F1',
      margin: '0 0 4px 0',
      transition: 'color 0.3s ease'
    },
    statLabel: {
      fontSize: '12px',
      color: isOnline ? '#4F6F6B' : '#E0F2F1B0',
      margin: 0,
      fontWeight: '500',
      transition: 'color 0.3s ease'
    },
    contentGrid: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: '30px'
    },
    section: {
      backgroundColor: isOnline ? '#FFFFFF' : '#0F2C2A',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: isOnline ? '0 2px 4px rgba(0,0,0,0.05)' : '0 4px 15px rgba(224, 242, 241, 0.1)',
      border: isOnline ? '1px solid #4DB6AC' : '1px solid #4DB6AC20',
      transition: 'all 0.3s ease'
    },
    sidebarSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    sectionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px'
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: isOnline ? '#124441' : '#E0F2F1',
      margin: 0,
      transition: 'color 0.3s ease'
    },
    viewAll: {
      fontSize: '14px',
      color: '#009688',
      fontWeight: '500',
      cursor: 'pointer'
    },
    tasksList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    taskCard: {
      padding: '20px',
      border: isOnline ? '1px solid #4DB6AC' : '1px solid #4DB6AC20',
      borderRadius: '10px',
      transition: 'all 0.3s ease',
      backgroundColor: isOnline ? '#FFFFFF' : '#0F2C2A'
    },
    taskHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '12px'
    },
    taskInfo: {
      flex: 1
    },
    orderId: {
      fontSize: '16px',
      fontWeight: '600',
      color: isOnline ? '#124441' : '#E0F2F1',
      margin: '0 0 4px 0',
      transition: 'color 0.3s ease'
    },
    customerName: {
      fontSize: '14px',
      color: isOnline ? '#4F6F6B' : '#E0F2F1B0',
      margin: 0,
      transition: 'color 0.3s ease'
    },
    taskStatus: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '4px'
    },
    statusBadge: {
      color: '#FFFFFF',
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '500'
    },
    priorityBadge: {
      fontSize: '12px',
      fontWeight: '500'
    },
    taskDetails: {
      marginBottom: '12px'
    },
    locationRow: {
      display: 'flex',
      alignItems: 'flex-start',
      marginBottom: '8px'
    },
    locationLabel: {
      fontSize: '12px',
      color: isOnline ? '#4F6F6B' : '#E0F2F1B0',
      fontWeight: '500',
      minWidth: '80px',
      transition: 'color 0.3s ease'
    },
    locationText: {
      fontSize: '14px',
      color: isOnline ? '#124441' : '#E0F2F1',
      flex: 1,
      transition: 'color 0.3s ease'
    },
    contactInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginTop: '4px'
    },
    contactButton: {
      backgroundColor: 'transparent',
      border: isOnline ? '1px solid #4DB6AC' : '1px solid #4DB6AC40',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      cursor: 'pointer',
      color: isOnline ? '#124441' : '#E0F2F1',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      transition: 'all 0.3s ease'
    },
    taskMeta: {
      display: 'flex',
      gap: '12px',
      marginBottom: '16px'
    },
    metaItem: {
      fontSize: '12px',
      color: isOnline ? '#4F6F6B' : '#E0F2F1B0',
      fontWeight: '500',
      transition: 'color 0.3s ease'
    },
    taskActions: {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap'
    },
    primaryButton: {
      backgroundColor: '#009688',
      color: '#FFFFFF',
      border: 'none',
      padding: '10px 16px',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    secondaryButton: {
      backgroundColor: 'transparent',
      color: '#009688',
      border: '1px solid #009688',
      padding: '9px 15px',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    successButton: {
      backgroundColor: '#10B981',
      color: '#FFFFFF',
      border: 'none',
      padding: '10px 16px',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    dangerButton: {
      backgroundColor: '#EF4444',
      color: '#FFFFFF',
      border: 'none',
      padding: '10px 16px',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    acceptButton: {
      backgroundColor: '#3B82F6',
      color: '#FFFFFF',
      border: 'none',
      padding: '10px 16px',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    directionButton: {
      backgroundColor: '#8B5CF6',
      color: '#FFFFFF',
      border: 'none',
      padding: '10px 16px',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    incentivesSection: {
      backgroundColor: isOnline ? '#FFFFFF' : '#0F2C2A',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: isOnline ? '0 2px 4px rgba(0,0,0,0.05)' : '0 4px 15px rgba(224, 242, 241, 0.1)',
      border: isOnline ? '1px solid #4DB6AC' : '1px solid #4DB6AC20',
      marginBottom: '20px',
      transition: 'all 0.3s ease'
    },
    incentivesHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px'
    },
    incentivesTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: isOnline ? '#124441' : '#E0F2F1',
      margin: 0,
      transition: 'color 0.3s ease'
    },
    incentivesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '16px'
    },
    incentiveCard: {
      backgroundColor: isOnline ? '#E0F2F1' : '#0F2C2A',
      padding: '16px',
      borderRadius: '8px',
      border: isOnline ? '1px solid #4DB6AC' : '1px solid #4DB6AC20',
      transition: 'all 0.3s ease'
    },
    incentiveAmount: {
      fontSize: '24px',
      fontWeight: '700',
      color: isOnline ? '#124441' : '#E0F2F1',
      margin: '0 0 4px 0',
      transition: 'color 0.3s ease'
    },
    incentiveLabel: {
      fontSize: '14px',
      color: isOnline ? '#4F6F6B' : '#E0F2F1B0',
      margin: 0,
      transition: 'color 0.3s ease'
    },
    bonusBadge: {
      backgroundColor: '#10B981',
      color: '#FFFFFF',
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '500',
      marginTop: '8px',
      display: 'inline-block'
    },
    specialIncentivesSection: {
      background: isOnline 
        ? 'linear-gradient(135deg, #009688 0%, #00796B 100%)' 
        : 'linear-gradient(135deg, #0F2C2A 0%, #124441 50%, #0F2C2A 100%)',
      borderRadius: '12px',
      padding: '24px',
      marginBottom: '20px',
      color: '#FFFFFF',
      border: isOnline ? 'none' : '1px solid #4DB6AC40',
      boxShadow: isOnline ? 'none' : '0 4px 20px rgba(224, 242, 241, 0.1)',
      transition: 'all 0.3s ease'
    },
    specialIncentiveCard: {
      backgroundColor: isOnline ? 'rgba(255, 255, 255, 0.1)' : 'rgba(224, 242, 241, 0.1)',
      padding: '16px',
      borderRadius: '8px',
      marginBottom: '12px',
      backdropFilter: 'blur(10px)',
      border: isOnline ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(224, 242, 241, 0.3)',
      transition: 'all 0.3s ease'
    },
    specialIncentiveTitle: {
      fontSize: '16px',
      fontWeight: '600',
      margin: '0 0 8px 0',
      color: '#FFFFFF'
    },
    specialIncentiveDesc: {
      fontSize: '12px',
      margin: 0,
      opacity: 0.9,
      color: '#FFFFFF'
    },
    targetAchievedMessage: {
      backgroundColor: '#E0F2F1',
      color: '#124441',
      padding: '16px',
      borderRadius: '8px',
      textAlign: 'center',
      marginBottom: '20px',
      fontWeight: '600',
      border: '1px solid #4DB6AC',
      boxShadow: '0 4px 15px rgba(0, 150, 136, 0.3)'
    },
    progressBar: {
      width: '100%',
      height: '8px',
      backgroundColor: isOnline ? '#E0F2F1' : '#124441',
      borderRadius: '4px',
      overflow: 'hidden',
      marginTop: '8px',
      transition: 'background-color 0.3s ease'
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#10B981',
      transition: 'width 0.3s ease'
    },
    deliveryProgress: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      padding: '16px',
      backgroundColor: isOnline ? '#E0F2F1' : '#0F2C2A',
      borderRadius: '8px',
      border: isOnline ? '1px solid #4DB6AC' : '1px solid #4DB6AC20',
      transition: 'all 0.3s ease'
    },
    progressStep: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
      flex: 1
    },
    progressDot: {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      backgroundColor: isOnline ? '#4DB6AC' : '#124441',
      position: 'relative',
      transition: 'background-color 0.3s ease'
    },
    progressDotActive: {
      backgroundColor: '#009688'
    },
    progressDotCompleted: {
      backgroundColor: '#10B981'
    },
    progressLabel: {
      fontSize: '12px',
      color: isOnline ? '#4F6F6B' : '#E0F2F1B0',
      textAlign: 'center',
      transition: 'color 0.3s ease'
    },
    progressLabelActive: {
      color: '#009688',
      fontWeight: '600'
    },
    progressLine: {
      flex: 1,
      height: '2px',
      backgroundColor: isOnline ? '#4DB6AC' : '#124441',
      margin: '0 8px',
      transition: 'background-color 0.3s ease'
    },
    progressLineActive: {
      backgroundColor: '#009688'
    },
    progressLineCompleted: {
      backgroundColor: '#10B981'
    },
    medicineTitle: {
      fontSize: '14px',
      fontWeight: '600',
      color: isOnline ? '#065F46' : '#4ade80',
      margin: '0 0 8px 0',
      transition: 'color 0.3s ease'
    },
    medicineList: {
      fontSize: '12px',
      color: isOnline ? '#047857' : '#86efac',
      margin: 0,
      lineHeight: '1.4',
      transition: 'color 0.3s ease'
    },
    goOnlineLargeButton: {
      backgroundColor: '#E0F2F1',
      color: '#124441',
      border: 'none',
      padding: '16px 32px',
      borderRadius: '12px',
      fontSize: '18px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      margin: '20px auto',
      boxShadow: '0 4px 20px rgba(0, 150, 136, 0.3)'
    },
    deliveryHistorySection: {
      backgroundColor: isOnline ? '#FFFFFF' : '#0F2C2A',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: isOnline ? '0 2px 4px rgba(0,0,0,0.05)' : '0 4px 15px rgba(224, 242, 241, 0.1)',
      border: isOnline ? '1px solid #4DB6AC' : '1px solid #4DB6AC20',
      marginBottom: '20px',
      transition: 'all 0.3s ease'
    },
    historyItem: {
      padding: '16px',
      border: isOnline ? '1px solid #4DB6AC' : '1px solid #4DB6AC20',
      borderRadius: '8px',
      marginBottom: '12px',
      backgroundColor: isOnline ? '#E0F2F1' : '#0F2C2A',
      transition: 'all 0.3s ease'
    },
    historyOrderId: {
      fontSize: '14px',
      fontWeight: '600',
      color: isOnline ? '#124441' : '#E0F2F1',
      margin: '0 0 4px 0'
    },
    historyDetails: {
      fontSize: '12px',
      color: isOnline ? '#4F6F6B' : '#E0F2F1B0',
      margin: '0 0 4px 0'
    },
    historyTime: {
      fontSize: '11px',
      color: isOnline ? '#9ca3af' : '#E0F2F180',
      margin: 0
    },
    // New Styles for Proof Modal
    proofModal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '20px'
    },
    proofModalContent: {
      backgroundColor: isOnline ? '#FFFFFF' : '#0F2C2A',
      borderRadius: '12px',
      padding: '30px',
      maxWidth: '500px',
      width: '100%',
      maxHeight: '90vh',
      overflowY: 'auto',
      border: isOnline ? '1px solid #4DB6AC' : '1px solid #4DB6AC20',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
      transition: 'all 0.3s ease'
    },
    proofModalTitle: {
      fontSize: '22px',
      fontWeight: '700',
      color: isOnline ? '#124441' : '#E0F2F1',
      margin: '0 0 20px 0',
      textAlign: 'center'
    },
    proofSection: {
      marginBottom: '25px'
    },
    proofLabel: {
      fontSize: '16px',
      fontWeight: '600',
      color: isOnline ? '#124441' : '#E0F2F1',
      margin: '0 0 12px 0',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    proofInput: {
      width: '100%',
      padding: '12px',
      borderRadius: '8px',
      border: isOnline ? '1px solid #4DB6AC' : '1px solid #4DB6AC40',
      backgroundColor: isOnline ? '#FFFFFF' : '#0F2C2A',
      color: isOnline ? '#124441' : '#E0F2F1',
      fontSize: '16px',
      marginBottom: '15px',
      transition: 'all 0.3s ease'
    },
    proofImageUpload: {
      border: '2px dashed',
      borderColor: isOnline ? '#4DB6AC' : '#4DB6AC40',
      borderRadius: '8px',
      padding: '30px 20px',
      textAlign: 'center',
      cursor: 'pointer',
      marginBottom: '15px',
      transition: 'all 0.3s ease'
    },
    proofImagePreview: {
      maxWidth: '100%',
      maxHeight: '200px',
      borderRadius: '8px',
      marginBottom: '15px',
      border: '1px solid #4DB6AC'
    },
    signatureCanvas: {
      border: '1px solid #4DB6AC',
      borderRadius: '8px',
      backgroundColor: '#FFFFFF',
      width: '100%',
      height: '150px',
      cursor: 'crosshair',
      marginBottom: '15px'
    },
    proofButtons: {
      display: 'flex',
      gap: '12px',
      marginTop: '25px'
    },
    proofSubmitButton: {
      backgroundColor: '#10B981',
      color: '#FFFFFF',
      border: 'none',
      padding: '14px 20px',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      flex: 1,
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    },
    proofCancelButton: {
      backgroundColor: 'transparent',
      color: isOnline ? '#4F6F6B' : '#E0F2F1B0',
      border: isOnline ? '1px solid #4DB6AC' : '1px solid #4DB6AC40',
      padding: '14px 20px',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      flex: 1,
      transition: 'all 0.3s ease'
    },
    customerDirectionButton: {
      backgroundColor: '#8B5CF6',
      color: '#FFFFFF',
      border: 'none',
      padding: '8px 12px',
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: '500',
      cursor: 'pointer',
      marginLeft: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      transition: 'all 0.3s ease'
    },
    cancelOrderButton: {
      backgroundColor: '#EF4444',
      color: '#FFFFFF',
      border: 'none',
      padding: '10px 16px',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      transition: 'all 0.3s ease'
    }
  };

  // Check for daily target achievement
  useEffect(() => {
    if (completedOrders.length >= 12 && !incentives.dailyTargetAchieved) {
      setIncentives(prev => ({
        ...prev,
        dailyTargetAchieved: true,
        today: prev.today + prev.dailyTarget
      }));
    }
  }, [completedOrders.length, incentives.dailyTargetAchieved]);

  // Initialize available orders with pharmacy details for Visakhapatnam
  useEffect(() => {
    const initialOrders = [
      {
        id: 'ORD001',
        orderId: 'MED001',
        customerName: 'Rajesh Kumar',
        customerPhone: '+91 98765 43210',
        pharmacyName: 'Apollo Pharmacy',
        pharmacyPhone: '+91 98765 43211',
        pharmacyLocation: 'Apollo Pharmacy, MVP Colony, Visakhapatnam',
        deliveryLocation: 'H-Block, Seethammadhara, Visakhapatnam',
        estimatedTime: '25 mins',
        distance: '3.2 km',
        amount: 45,
        tip: 10,
        status: 'pending',
        priority: 'High',
        instructions: 'Handle with care. Keep medicines in original packaging.',
        customerOTP: Math.floor(1000 + Math.random() * 9000).toString()
      }
    ];
    setAvailableOrders(initialOrders);
  }, []);

  // Simulate new pharmacy orders for Visakhapatnam
  useEffect(() => {
    if (!isOnline || acceptedOrders.length > 0 || availableOrders.length > 0 || incentives.dailyTargetAchieved) return;

    const orderInterval = setInterval(() => {
      setAvailableOrders(prev => {
        if (prev.length >= 1) return prev;
        
        const visakhapatnamPharmacies = [
          { name: 'Apollo Pharmacy', phone: '+91 98765 43211', area: 'MVP Colony' },
          { name: 'MedPlus Pharmacy', phone: '+91 98765 43213', area: 'Dwarakanagar' },
          { name: 'Fortis Pharmacy', phone: '+91 98765 43215', area: 'Siripuram' },
          { name: 'Max Healthcare Pharmacy', phone: '+91 98765 43217', area: 'Gajuwaka' },
          { name: 'City Pharmacy', phone: '+91 98765 43219', area: 'Akkayyapalem' }
        ];
        
        const visakhapatnamAreas = [
          'MVP Colony', 'Dwarakanagar', 'Siripuram', 'Gajuwaka', 'Akkayyapalem',
          'Seethammadhara', 'Madhurawada', 'Pendurthi', 'Anakapalle', 'Bheemili'
        ];
        
        const pharmacy = visakhapatnamPharmacies[Math.floor(Math.random() * visakhapatnamPharmacies.length)];
        const deliveryArea = visakhapatnamAreas.filter(a => a !== pharmacy.area)[Math.floor(Math.random() * (visakhapatnamAreas.length - 1))];
        
        const tipAmount = Math.random() > 0.3 ? Math.floor(Math.random() * 30) + 5 : 0;
        const newOrder = {
          id: `ORD${Date.now()}`,
          orderId: `MED${Date.now().toString().slice(-4)}`,
          customerName: ['Amit Sharma', 'Neha Gupta', 'Rohit Verma', 'Sneha Patel'][Math.floor(Math.random() * 4)],
          customerPhone: `+91 9${Math.floor(10000000 + Math.random() * 90000000)}`,
          pharmacyName: pharmacy.name,
          pharmacyPhone: pharmacy.phone,
          pharmacyLocation: `${pharmacy.name}, ${pharmacy.area}, Visakhapatnam`,
          deliveryLocation: `${deliveryArea}, Visakhapatnam`,
          estimatedTime: `${20 + Math.floor(Math.random() * 20)} mins`,
          distance: `${(2 + Math.random() * 4).toFixed(1)} km`,
          amount: 30 + Math.floor(Math.random() * 50),
          tip: tipAmount,
          status: 'pending',
          priority: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
          instructions: 'Handle with care. Keep medicines in original packaging.',
          customerOTP: Math.floor(1000 + Math.random() * 9000).toString()
        };
        
        return [newOrder];
      });
    }, 30000);

    return () => clearInterval(orderInterval);
  }, [isOnline, acceptedOrders.length, availableOrders.length, incentives.dailyTargetAchieved]);

  // Notification sound system
  useEffect(() => {
    if (isOnline && availableOrders.length > 0 && acceptedOrders.length === 0 && !incentives.dailyTargetAchieved) {
      notificationIntervalRef.current = setInterval(() => {
        if (audioRef.current) {
          audioRef.current.play().catch(e => console.log('Audio play failed:', e));
        }
      }, 5000);

      return () => {
        if (notificationIntervalRef.current) {
          clearInterval(notificationIntervalRef.current);
        }
      };
    } else {
      if (notificationIntervalRef.current) {
        clearInterval(notificationIntervalRef.current);
      }
    }
  }, [isOnline, availableOrders.length, acceptedOrders.length, incentives.dailyTargetAchieved]);

  // Initialize signature canvas
  useEffect(() => {
    if (signatureCanvasRef.current && showProofModal) {
      const canvas = signatureCanvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, [showProofModal]);

  const formatIndianCurrency = (amount) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const getDisplayName = () => {
    return profileData?.fullName?.split(' ')[0] || 'User';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#EF4444';
      case 'Medium': return '#F59E0B';
      case 'Low': return '#10B981';
      default: return '#4F6F6B';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#F59E0B';
      case 'assigned': return '#F59E0B';
      case 'pickup_reached': return '#3B82F6';
      case 'pickup_completed': return '#8B5CF6';
      case 'delivery_reached': return '#F59E0B';
      case 'delivery_completed': return '#10B981';
      case 'cancelled': return '#EF4444';
      default: return '#4F6F6B';
    }
  };

  const handleViewAllTasks = () => {
    safeSetActivePage('delivery-history');
  };

  const handleStatClick = (statKey) => {
    if (selectedStat === statKey) {
      setSelectedStat(null);
    } else {
      setSelectedStat(statKey);
    }
  };

  const handleToggleOnline = () => {
    const newOnlineStatus = !isOnline;
    setIsOnline(newOnlineStatus);
    
    if (newOnlineStatus) {
      setSelectedStat(null);
      setCurrentStep('available');
    } else {
      setAcceptedOrders([]);
      setCurrentStep('available');
    }
    
    safeToggleOnlineStatus(newOnlineStatus);
  };

  const handleAcceptOrder = (order) => {
    if (notificationIntervalRef.current) {
      clearInterval(notificationIntervalRef.current);
    }

    const acceptedOrder = {
      ...order,
      status: 'assigned',
      acceptedAt: new Date()
    };

    setAcceptedOrders([acceptedOrder]);
    setAvailableOrders([]);
    setCurrentStep('accepted');
    
    setIncentives(prev => ({
      ...prev,
      today: prev.today + order.amount
    }));
  };

  const handleCancelAvailableOrder = (order) => {
    setAvailableOrders(prev => prev.filter(o => o.id !== order.id));
  };

  const handleReachedPharmacy = (order) => {
    setAcceptedOrders(prev => 
      prev.map(o => 
        o.id === order.id ? { ...o, status: 'pickup_reached', pharmacyReachedAt: new Date() } : o
      )
    );
    setCurrentStep('pickup_reached');
  };

  const handlePickupCompleted = (order) => {
    setAcceptedOrders(prev => 
      prev.map(o => 
        o.id === order.id ? { ...o, status: 'pickup_completed', pickupCompletedAt: new Date() } : o
      )
    );
    setCurrentStep('pickup_completed');
  };

  const handleReachedCustomer = (order) => {
    setAcceptedOrders(prev => 
      prev.map(o => 
        o.id === order.id ? { ...o, status: 'delivery_reached', customerReachedAt: new Date() } : o
      )
    );
    setCurrentStep('delivery_reached');
  };

  const handleOpenProofModal = (order) => {
    setCurrentDeliveryForProof(order);
    setShowProofModal(true);
  };

  const handleProofImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignatureStart = (e) => {
    const canvas = signatureCanvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    
    ctx.beginPath();
    ctx.moveTo(
      e.clientX - rect.left,
      e.clientY - rect.top
    );
    
    canvas.isDrawing = true;
  };

  const handleSignatureMove = (e) => {
    const canvas = signatureCanvasRef.current;
    if (!canvas.isDrawing) return;
    
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    
    ctx.lineTo(
      e.clientX - rect.left,
      e.clientY - rect.top
    );
    ctx.strokeStyle = '#124441';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const handleSignatureEnd = () => {
    const canvas = signatureCanvasRef.current;
    canvas.isDrawing = false;
    setProofSignature(canvas.toDataURL());
  };

  const handleClearSignature = () => {
    const canvas = signatureCanvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setProofSignature(null);
  };

  const handleSubmitProof = () => {
    if (!customerOTP || customerOTP !== currentDeliveryForProof?.customerOTP) {
      alert('Please enter valid OTP');
      return;
    }

    if (!proofImage && !proofSignature) {
      alert('Please provide either photo proof or signature');
      return;
    }

    const deliveredOrder = {
      ...currentDeliveryForProof,
      status: 'delivery_completed',
      deliveredAt: new Date(),
      proofImage,
      proofSignature,
      proofOTP: customerOTP
    };

    setCompletedOrders(prev => [...prev, deliveredOrder]);
    setAcceptedOrders([]);
    setCurrentStep('available');
    
    setIncentives(prev => ({
      ...prev,
      completedDeliveries: prev.completedDeliveries + 1,
      dailyOrdersCompleted: prev.dailyOrdersCompleted + 1,
      weekly: prev.weekly + currentDeliveryForProof.amount,
      monthly: prev.monthly + currentDeliveryForProof.amount,
      today: prev.today + currentDeliveryForProof.amount + (currentDeliveryForProof.tip || 0),
      customerTips: prev.customerTips + (currentDeliveryForProof.tip || 0)
    }));

    setShowProofModal(false);
    setCurrentDeliveryForProof(null);
    setProofImage(null);
    setProofSignature(null);
    setCustomerOTP('');

    setTimeout(() => {
      safeSetActivePage('delivery-history');
    }, 2000);
  };

  const handleCancelOrder = (order) => {
    setAcceptedOrders(prev => prev.filter(o => o.id !== order.id));
    setAvailableOrders(prev => [...prev, { ...order, status: 'pending' }]);
    setCurrentStep('available');
  };

  const handleCallPharmacy = (phoneNumber) => {
    window.open(`tel:${phoneNumber}`, '_self');
  };

  const handleCallCustomer = (phoneNumber) => {
    window.open(`tel:${phoneNumber}`, '_self');
  };

  const handleGetDirections = (location, isCustomer = false) => {
    // Add "Visakhapatnam" to ensure directions are within the city
    const locationWithCity = `${location}, Visakhapatnam, Andhra Pradesh`;
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(locationWithCity)}`;
    window.open(mapsUrl, '_blank');
  };

  const getMedicines = (task) => {
    return task?.medicines || [];
  };

  // Update the progress steps to include proof submission
  const getProgressSteps = () => {
    const steps = [
      { label: 'Order Accepted', key: 'accepted' },
      { label: 'Reached Pharmacy', key: 'pickup_reached' },
      { label: 'Pickup Completed', key: 'pickup_completed' },
      { label: 'Reached Customer', key: 'delivery_reached' },
      { label: 'Proof Submitted', key: 'proof_submitted' }
    ];

    const currentIndex = steps.findIndex(step => step.key === currentStep);
    
    return steps.map((step, index) => {
      const isCompleted = index < currentIndex;
      const isActive = step.key === currentStep;
      
      return (
        <React.Fragment key={step.key}>
          {index > 0 && (
            <div 
              style={{
                ...styles.progressLine,
                ...(isCompleted && styles.progressLineCompleted),
                ...(index <= currentIndex && styles.progressLineActive)
              }}
            />
          )}
          <div style={styles.progressStep}>
            <div 
              style={{
                ...styles.progressDot,
                ...(isActive && styles.progressDotActive),
                ...(isCompleted && styles.progressDotCompleted)
              }}
            />
            <div 
              style={{
                ...styles.progressLabel,
                ...(isActive && styles.progressLabelActive)
              }}
            >
              {step.label}
            </div>
          </div>
        </React.Fragment>
      );
    });
  };

  // Proof of Delivery Modal
  const ProofModal = () => {
    if (!showProofModal) return null;

    return (
      <div style={styles.proofModal}>
        <div style={styles.proofModalContent}>
          <h2 style={styles.proofModalTitle}>📦 Proof of Delivery</h2>
          
          <div style={styles.proofSection}>
            <label style={styles.proofLabel}>
              🔢 Enter Customer OTP
            </label>
            <input
              type="text"
              placeholder="Enter 4-digit OTP shared by customer"
              value={customerOTP}
              onChange={(e) => setCustomerOTP(e.target.value)}
              maxLength="4"
              style={styles.proofInput}
            />
          </div>

          <div style={styles.proofSection}>
            <label style={styles.proofLabel}>
              📸 Upload Delivery Photo
            </label>
            <div 
              style={styles.proofImageUpload}
              onClick={() => proofImageInputRef.current.click()}
            >
              {proofImage ? (
                <img 
                  src={proofImage} 
                  alt="Proof" 
                  style={styles.proofImagePreview}
                />
              ) : (
                <>
                  <div style={{ fontSize: '48px', marginBottom: '10px' }}>📷</div>
                  <p style={{ color: isOnline ? '#4F6F6B' : '#E0F2F1B0', margin: 0 }}>
                    Click to take/upload photo
                  </p>
                  <p style={{ fontSize: '12px', color: isOnline ? '#9ca3af' : '#E0F2F180', margin: '5px 0 0 0' }}>
                    Show delivered items with customer/house number
                  </p>
                </>
              )}
            </div>
            <input
              type="file"
              ref={proofImageInputRef}
              accept="image/*"
              capture="environment"
              onChange={handleProofImageUpload}
              style={{ display: 'none' }}
            />
          </div>

          <div style={styles.proofSection}>
            <label style={styles.proofLabel}>
              ✍️ Customer Signature
            </label>
            <canvas
              ref={signatureCanvasRef}
              style={styles.signatureCanvas}
              onMouseDown={handleSignatureStart}
              onMouseMove={handleSignatureMove}
              onMouseUp={handleSignatureEnd}
              onMouseLeave={handleSignatureEnd}
              onTouchStart={(e) => {
                e.preventDefault();
                handleSignatureStart(e.touches[0]);
              }}
              onTouchMove={(e) => {
                e.preventDefault();
                handleSignatureMove(e.touches[0]);
              }}
              onTouchEnd={handleSignatureEnd}
            />
            <button
              style={{
                ...styles.secondaryButton,
                padding: '8px 12px',
                fontSize: '12px'
              }}
              onClick={handleClearSignature}
            >
              🗑️ Clear Signature
            </button>
          </div>

          <div style={styles.proofButtons}>
            <button
              style={styles.proofCancelButton}
              onClick={() => {
                setShowProofModal(false);
                setCurrentDeliveryForProof(null);
                setProofImage(null);
                setProofSignature(null);
                setCustomerOTP('');
              }}
            >
              Cancel
            </button>
            <button
              style={styles.proofSubmitButton}
              onClick={handleSubmitProof}
            >
              ✅ Submit Proof & Complete Delivery
            </button>
          </div>
        </div>
      </div>
    );
  };

  // If offline or target achieved, show special offline dashboard
  if (!isOnline || incentives.dailyTargetAchieved) {
    return (
      <div style={styles.mainContent}>
        <audio ref={audioRef} src="/Audio.mp4" preload="auto" />
        
        <div style={styles.header}>
          <div>
            <h1 style={styles.greeting}>{getCurrentGreeting()}, {getDisplayName()}</h1>
            <p style={styles.subtitle}>{incentives.dailyTargetAchieved ? '🎉 Daily Target Achieved! You earned ₹300 bonus' : 'Ready to start delivering?'}</p>
          </div>
          <div style={styles.headerActions}>
            <div style={styles.onlineStatus}>
              <span style={{
                ...styles.statusDot,
                backgroundColor: '#E0F2F1'
              }}></span>
              <span style={styles.statusText}>Offline</span>
              {!incentives.dailyTargetAchieved && (
                <button
                  style={styles.statusToggle}
                  onClick={handleToggleOnline}
                >
                  Go Online
                </button>
              )}
            </div>
            <div style={styles.dateDisplay}>
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
        </div>

        {incentives.dailyTargetAchieved && (
          <div style={styles.targetAchievedMessage}>
            🎉 Daily Target Achieved! You earned ₹300 bonus
          </div>
        )}     
        
        {/* Special Incentives Section */}
        <div style={styles.specialIncentivesSection}>
          <h2 style={{...styles.sectionTitle, color: '#E0F2F1', marginBottom: '20px'}}>
            Special Incentives & Offers
          </h2>
          
          <div style={styles.specialIncentiveCard}>
            <h3 style={styles.specialIncentiveTitle}>🎯 Daily Target Bonus</h3>
            <p style={styles.specialIncentiveDesc}>Complete 12 orders daily to earn ₹300 bonus</p>
            <div style={styles.progressBar}>
              <div style={{
                ...styles.progressFill,
                width: `${(incentives.dailyOrdersCompleted / 12) * 100}%`
              }}></div>
            </div>
            <p style={{...styles.specialIncentiveDesc, marginTop: '8px'}}>
              {incentives.dailyTargetAchieved 
                ? '🎉 Daily Target Achieved! You earned ₹300 bonus'
                : `Complete ${12 - incentives.dailyOrdersCompleted} more orders to reach daily target`
              }
            </p>
          </div>

          <div style={styles.specialIncentiveCard}>
            <h3 style={styles.specialIncentiveTitle}>👥 Referral Bonus</h3>
            <p style={styles.specialIncentiveDesc}>Refer friends and earn ₹200 per referral</p>
            <p style={{...styles.specialIncentiveDesc, marginTop: '8px', fontWeight: '600'}}>
              Available: {formatIndianCurrency(incentives.referralBonus)}
            </p>
          </div>

          <div style={styles.specialIncentiveCard}>
            <h3 style={styles.specialIncentiveTitle}>🎁 Joining Bonus</h3>
            <p style={styles.specialIncentiveDesc}>Welcome! Complete your first 5 orders to get ₹500</p>
            <p style={{...styles.specialIncentiveDesc, marginTop: '8px', fontWeight: '600'}}>
              Available: {formatIndianCurrency(incentives.joiningBonus)}
            </p>
          </div>

          <div style={styles.specialIncentiveCard}>
            <h3 style={styles.specialIncentiveTitle}>💝 Customer Tips</h3>
            <p style={styles.specialIncentiveDesc}>Customers can tip you for excellent service</p>
            <p style={{...styles.specialIncentiveDesc, marginTop: '8px', fontWeight: '600'}}>
              Earned: {formatIndianCurrency(incentives.customerTips)}
            </p>
          </div>

          {!incentives.dailyTargetAchieved && (
            <button
              style={styles.goOnlineLargeButton}
              onClick={handleToggleOnline}
            >
              Go Online
            </button>
          )}
        </div>
      </div>
    );
  }

  // Online mode - show full dashboard
  return (
    <div style={styles.mainContent}>
      <ProofModal />
      
      <div style={styles.header}>
        <div>
          <h1 style={styles.greeting}>{getCurrentGreeting()}, {getDisplayName()}</h1>
          <p style={styles.subtitle}>Here's your delivery overview for today</p>
        </div>
        <div style={styles.headerActions}>
          <div style={styles.onlineStatus}>
            <span style={{
              ...styles.statusDot,
              backgroundColor: '#10B981'
            }}></span>
            <span style={styles.statusText}>Online</span>
            <button
              style={styles.statusToggle}
              onClick={handleToggleOnline}
            >
              Go Offline
            </button>
          </div>
          <div style={styles.dateDisplay}>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
          <div style={styles.actionButtons}>
            <button
              style={styles.notificationButton}
              onClick={safeToggleNotifications}
            >
              🔔
              {safeGetUnreadCount() > 0 && (
                <span style={styles.notificationBadge}>{safeGetUnreadCount()}</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Incentives Section */}
      <div style={styles.incentivesSection}>
        <div style={styles.incentivesHeader}>
          <h2 style={styles.incentivesTitle}>Your Earnings & Incentives</h2>
        </div>
        <div style={styles.incentivesGrid}>
          <div style={styles.incentiveCard}>
            <h3 style={styles.incentiveAmount}>{formatIndianCurrency(incentives.today)}</h3>
            <p style={styles.incentiveLabel}>Today's Earnings</p>
            {incentives.customerTips > 0 && (
              <p style={{...styles.incentiveLabel, fontSize: '12px', marginTop: '4px'}}>
                Includes {formatIndianCurrency(incentives.customerTips)} tips
              </p>
            )}
          </div>
          <div style={styles.incentiveCard}>
            <h3 style={styles.incentiveAmount}>{formatIndianCurrency(incentives.weekly)}</h3>
            <p style={styles.incentiveLabel}>This Week</p>
          </div>
          <div style={styles.incentiveCard}>
            <h3 style={styles.incentiveAmount}>{formatIndianCurrency(incentives.monthly)}</h3>
            <p style={styles.incentiveLabel}>This Month</p>
          </div>
          <div style={styles.incentiveCard}>
            <h3 style={styles.incentiveAmount}>{incentives.completedDeliveries}</h3>
            <p style={styles.incentiveLabel}>Completed Deliveries</p>
            {incentives.bonusEligible && (
              <span style={styles.bonusBadge}>Bonus Eligible</span>
            )}
          </div>
        </div>
      </div>

      {/* Real-time Stats Grid */}
      <div style={styles.statsGrid}>
        <div 
          style={{
            ...styles.statCard,
            ...(selectedStat === 'totalToday' && styles.statCardActive)
          }}
          onClick={() => handleStatClick('totalToday')}
        >
          <div style={{ ...styles.statIcon, backgroundColor: '#E0F2F1' }}>📦</div>
          <div style={styles.statContent}>
            <h3 style={styles.statNumber}>{completedOrders.length + acceptedOrders.length}</h3>
            <p style={styles.statLabel}>Total Deliveries Today</p>
          </div>
        </div>

        <div 
          style={{
            ...styles.statCard,
            ...(selectedStat === 'pending' && styles.statCardActive)
          }}
          onClick={() => handleStatClick('pending')}
        >
          <div style={{ ...styles.statIcon, backgroundColor: '#E0F2F1' }}>⏳</div>
          <div style={styles.statContent}>
            <h3 style={styles.statNumber}>{availableOrders.length}</h3>
            <p style={styles.statLabel}>Pending Acceptance</p>
          </div>
        </div>

        <div 
          style={{
            ...styles.statCard,
            ...(selectedStat === 'inProgress' && styles.statCardActive)
          }}
          onClick={() => handleStatClick('inProgress')}
        >
          <div style={{ ...styles.statIcon, backgroundColor: '#E0F2F1' }}>🚚</div>
          <div style={styles.statContent}>
            <h3 style={styles.statNumber}>{acceptedOrders.filter(o => o.status !== 'assigned').length}</h3>
            <p style={styles.statLabel}>In Progress</p>
          </div>
        </div>

        <div 
          style={{
            ...styles.statCard,
            ...(selectedStat === 'completed' && styles.statCardActive)
          }}
          onClick={() => handleStatClick('completed')}
        >
          <div style={{ ...styles.statIcon, backgroundColor: '#E0F2F1' }}>✅</div>
          <div style={styles.statContent}>
            <h3 style={styles.statNumber}>{completedOrders.length}</h3>
            <p style={styles.statLabel}>Delivered</p>
          </div>
        </div>

        <div 
          style={{
            ...styles.statCard,
            ...(selectedStat === 'todayEarnings' && styles.statCardActive)
          }}
          onClick={() => handleStatClick('todayEarnings')}
        >
          <div style={{ ...styles.statIcon, backgroundColor: '#E0F2F1' }}>💰</div>
          <div style={styles.statContent}>
            <h3 style={styles.statNumber}>{formatIndianCurrency(incentives.today)}</h3>
            <p style={styles.statLabel}>Today's Earnings</p>
          </div>
        </div>

        <div 
          style={{
            ...styles.statCard,
            ...(selectedStat === 'cancelled' && styles.statCardActive)
          }}
          onClick={() => handleStatClick('cancelled')}
        >
          <div style={{ ...styles.statIcon, backgroundColor: '#E0F2F1' }}>❌</div>
          <div style={styles.statContent}>
            <h3 style={styles.statNumber}>0</h3>
            <p style={styles.statLabel}>Cancelled Orders</p>
          </div>
        </div>
      </div>

      <div style={styles.contentGrid}>
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>
              {acceptedOrders.length > 0 ? 'Current Deliveries' : 'Available Deliveries'}
            </h2>
            {completedOrders.length > 0 && (
              <span
                style={styles.viewAll}
                onClick={handleViewAllTasks}
              >
                View History
              </span>
            )}
          </div>

          {/* Delivery Progress Tracker */}
          {acceptedOrders.length > 0 && (
            <div style={styles.deliveryProgress}>
              {getProgressSteps()}
            </div>
          )}

          <div style={styles.tasksList}>
            {acceptedOrders.length > 0 ? (
              acceptedOrders.map(task => (
                <div key={task.id} style={styles.taskCard}>
                    <div style={styles.taskHeader}>
                    <div style={styles.taskInfo}>
                      <h4 style={styles.orderId}>{task.orderId}</h4>
                      <p style={styles.customerName}>{task.customerName}</p>
                    </div>
                    <div style={styles.taskStatus}>
                      <span style={{
                        ...styles.statusBadge,
                        backgroundColor: getStatusColor(task.status)
                      }}>
                        {task.status.replace('_', ' ').toUpperCase()}
                      </span>
                      <span style={{
                        ...styles.priorityBadge,
                        color: getPriorityColor(task.priority)
                      }}>
                        {task.priority}
                      </span>
                    </div>
                  </div>

                  <div style={styles.taskDetails}>
                    {/* Pharmacy Location */}
                    <div style={styles.locationRow}>
                      <span style={styles.locationLabel}>🏥 Pharmacy:</span>
                      <span style={styles.locationText}>
                        {task.pharmacyLocation}
                        <div style={styles.contactInfo}>
                          <button
                            style={styles.contactButton}
                            onClick={() => handleCallPharmacy(task.pharmacyPhone)}
                          >
                            📞 {task.pharmacyPhone}
                          </button>
                          <button
                            style={styles.directionButton}
                            onClick={() => handleGetDirections(task.pharmacyLocation)}
                          >
                            🗺️ Get Directions
                          </button>
                        </div>
                      </span>
                    </div>

                    {/* Delivery Location */}
                    <div style={styles.locationRow}>
                      <span style={styles.locationLabel}>🏠 Delivery:</span>
                      <span style={styles.locationText}>
                        {task.deliveryLocation}
                        <div style={styles.contactInfo}>
                          <button
                            style={styles.contactButton}
                            onClick={() => handleCallCustomer(task.customerPhone)}
                          >
                            📞 {task.customerPhone}
                          </button>
                          <button
                            style={styles.customerDirectionButton}
                            onClick={() => handleGetDirections(task.deliveryLocation, true)}
                          >
                            🗺️ Customer Directions
                          </button>
                        </div>
                      </span>
                    </div>
                  </div>

                  <div style={styles.taskMeta}>
                    <span style={styles.metaItem}>🕒 {task.estimatedTime}</span>
                    <span style={styles.metaItem}>📏 {task.distance}</span>
                    <span style={styles.metaItem}>💰 {formatIndianCurrency(task.amount)}</span>
                    {task.tip > 0 && (
                      <span style={{...styles.metaItem, color: '#10B981', fontWeight: '600'}}>
                        💝 Tip: {formatIndianCurrency(task.tip)}
                      </span>
                    )}
                  </div>

                  <div style={styles.taskActions}>
                    {task.status === 'assigned' && (
                      <>
                        <button
                          style={styles.primaryButton}
                          onClick={() => handleReachedPharmacy(task)}
                        >
                          🏥 I've Reached Pharmacy
                        </button>
                        <button
                          style={styles.directionButton}
                          onClick={() => handleGetDirections(task.pharmacyLocation)}
                        >
                          🗺️ Directions to Pharmacy
                        </button>
                      </>
                    )}

                    {task.status === 'pickup_reached' && (
                      <button
                        style={styles.successButton}
                        onClick={() => handlePickupCompleted(task)}
                      >
                        ✅ Pickup Completed
                      </button>
                    )}

                    {task.status === 'pickup_completed' && (
                      <button
                        style={styles.primaryButton}
                        onClick={() => handleReachedCustomer(task)}
                      >
                        🏠 I've Reached Customer
                      </button>
                    )}

                    {task.status === 'delivery_reached' && (
                      <button
                        style={styles.successButton}
                        onClick={() => handleOpenProofModal(task)}
                      >
                        📸 Submit Proof of Delivery
                      </button>
                    )}

                    <button
                      style={styles.cancelOrderButton}
                      onClick={() => handleCancelOrder(task)}
                    >
                      ❌ Cancel Order
                    </button>

                    <button
                      style={styles.secondaryButton}
                      onClick={() => safeSetSelectedTask({
                        ...task,
                        medicines: getMedicines(task)
                      })}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              availableOrders.map(task => (
                <div key={task.id} style={styles.taskCard}>
                    <div style={styles.taskHeader}>
                    <div style={styles.taskInfo}>
                      <h4 style={styles.orderId}>{task.orderId}</h4>
                      <p style={styles.customerName}>{task.customerName}</p>
                    </div>
                    <div style={styles.taskStatus}>
                      <span style={{
                        ...styles.statusBadge,
                        backgroundColor: getStatusColor(task.status)
                      }}>
                        {task.status}
                      </span>
                      <span style={{
                        ...styles.priorityBadge,
                        color: getPriorityColor(task.priority)
                      }}>
                        {task.priority}
                      </span>
                    </div>
                  </div>

                  <div style={styles.taskDetails}>
                    <div style={styles.locationRow}>
                      <span style={styles.locationLabel}>🏥 Pharmacy:</span>
                      <span style={styles.locationText}>{task.pharmacyLocation}</span>
                    </div>
                    <div style={styles.locationRow}>
                      <span style={styles.locationLabel}>🏠 Delivery:</span>
                      <span style={styles.locationText}>
                        {task.deliveryLocation}
                        <button
                          style={styles.customerDirectionButton}
                          onClick={() => handleGetDirections(task.deliveryLocation, true)}
                        >
                          🗺️ Customer Directions
                        </button>
                      </span>
                    </div>
                  </div>

                  <div style={styles.taskMeta}>
                    <span style={styles.metaItem}>🕒 {task.estimatedTime}</span>
                    <span style={styles.metaItem}>📏 {task.distance}</span>
                    <span style={styles.metaItem}>💰 {formatIndianCurrency(task.amount)}</span>
                    {task.tip > 0 && (
                      <span style={{...styles.metaItem, color: '#10B981', fontWeight: '600'}}>
                        💝 Potential Tip: {formatIndianCurrency(task.tip)}
                      </span>
                    )}
                  </div>

                  <div style={styles.taskActions}>
                    <button
                      style={styles.acceptButton}
                      onClick={() => handleAcceptOrder(task)}
                    >
                      ✅ Accept Delivery
                    </button>
                    <button
                      style={styles.cancelOrderButton}
                      onClick={() => handleCancelAvailableOrder(task)}
                    >
                      ❌ Cancel Order
                    </button>
                    <button
                      style={styles.secondaryButton}
                      onClick={() => safeSetSelectedTask({
                        ...task,
                        medicines: getMedicines(task)
                      })}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div style={styles.sidebarSection}>
          {/* Live Route Tracker */}
          {isOnline && acceptedOrders.length > 0 && (
            <LiveRouteTracker 
              deliveryData={deliveryData} 
              isOnline={isOnline} 
              currentOrder={acceptedOrders[0]}
              currentStep={currentStep}
            />
          )}

          {isOnline && acceptedOrders.length === 0 && (
            <LiveRouteTracker 
              deliveryData={deliveryData} 
              isOnline={isOnline} 
              currentOrder={null}
              currentStep={currentStep}
            />
          )}

          {/* Delivery History Section */}
          {completedOrders.length > 0 && (
            <div style={styles.deliveryHistorySection}>
              <div style={styles.sectionHeader}>
                <h2 style={styles.sectionTitle}>Recent Deliveries</h2>
                <span
                  style={styles.viewAll}
                  onClick={handleViewAllTasks}
                >
                  View All
                </span>
              </div>
              <div style={styles.tasksList}>
                {completedOrders.slice(-3).reverse().map((order, index) => (
                  <div key={order.id} style={styles.historyItem}>
                    <h4 style={styles.historyOrderId}>{order.orderId}</h4>
                    <p style={styles.historyDetails}>
                      {order.customerName} • {formatIndianCurrency(order.amount)}
                      {order.tip > 0 && ` + ${formatIndianCurrency(order.tip)} tip`}
                    </p>
                    {order.proofImage && (
                      <p style={{ fontSize: '11px', color: '#10B981', margin: '4px 0' }}>
                        📸 Proof submitted
                      </p>
                    )}
                    <p style={styles.historyTime}>
                      Delivered: {order.deliveredAt?.toLocaleTimeString() || 'Just now'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI Chat Button */}
      <button
        style={styles.aiChatButton}
        onClick={safeToggleAIChat}
        title="AI Assistant"
      >
        💬
      </button>
    </div>
  );
};

// Add default props to prevent errors
Dashboard.defaultProps = {
  profileData: {},
  deliveryData: {},
  isOnline: false,
  toggleOnlineStatus: () => {},
  setSelectedTask: () => {},
  toggleNotifications: () => {},
  getUnreadCount: () => 0,
  toggleAIChat: () => {},
  setActivePage: () => {}
};

export default Dashboard;