import React, { useState, useEffect } from 'react';

const VendorProfile = ({
  userProfile,
  stock,
  orders,
  prescriptions,
  setShowNotificationsBellModal,
  setShowProfileModal,
  notifications
}) => {
  const [isOnline, setIsOnline] = useState(true);
  const [lastSeen, setLastSeen] = useState(new Date());

  // Check if legal and address details are filled (not just existing in object)
  const hasValidLegalData = 
    userProfile?.licenseNumber && userProfile.licenseNumber.trim() !== '' &&
    userProfile?.gstNumber && userProfile.gstNumber.trim() !== '' &&
    userProfile?.address && userProfile.address.trim() !== '' &&
    userProfile?.city && userProfile.city.trim() !== '' &&
    userProfile?.state && userProfile.state.trim() !== '' &&
    userProfile?.pincode && userProfile.pincode.trim() !== '';

  // Check if basic business info is complete
  const hasBasicBusinessInfo = 
    userProfile?.fullName && userProfile.fullName.trim() !== '' &&
    userProfile?.email && userProfile.email.trim() !== '' &&
    userProfile?.phone && userProfile.phone.trim() !== '';

  // Overall profile completion status
  const isProfileComplete = hasBasicBusinessInfo && hasValidLegalData;

  // Simulate real-time status updates
  useEffect(() => {
    const interval = setInterval(() => {
      setIsOnline(true);
      setLastSeen(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const toggleOnlineStatus = () => {
    if (!isProfileComplete) return; // Disable if profile incomplete
    
    const newStatus = !isOnline;
    setIsOnline(newStatus);
    setLastSeen(new Date());
    console.log(`Vendor status changed to: ${newStatus ? 'Online' : 'Offline'}`);
  };

  const formatLastSeen = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes === 1) return '1 minute ago';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours === 1) return '1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    return `${diffInDays} days ago`;
  };

  // Inline styles
  const styles = {
    mainContent: {
      padding: '24px',
      minHeight: '100vh',
      backgroundColor: '#f8fafc'
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
      gap: '16px'
    },
    notificationBell: {
      position: 'relative',
      backgroundColor: '#FFFFFF',
      border: '1px solid #E0F2F1',
      borderRadius: '8px',
      padding: '10px 12px',
      fontSize: '18px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    notificationBadge: {
      position: 'absolute',
      top: '-5px',
      right: '-5px',
      backgroundColor: '#EF4444',
      color: '#FFFFFF',
      borderRadius: '50%',
      width: '18px',
      height: '18px',
      fontSize: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '600'
    },
    greeting: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#124441',
      margin: '0 0 8px 0'
    },
    subtitle: {
      fontSize: '16px',
      color: '#4F6F6B',
      margin: 0
    },
    primaryButton: {
      backgroundColor: '#009688',
      color: '#FFFFFF',
      border: 'none',
      padding: '12px 20px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    profileContainer: {
      maxWidth: '800px',
      margin: '0 auto'
    },
    profileCard: {
      backgroundColor: '#FFFFFF',
      borderRadius: '16px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      border: '1px solid #E0F2F1',
      overflow: 'hidden',
      position: 'relative'
    },
    incompleteBadge: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      backgroundColor: '#EF4444',
      color: '#FFFFFF',
      padding: '8px 16px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      zIndex: 10
    },
    profileHeader: {
      padding: '30px',
      backgroundColor: isProfileComplete ? '#009688' : '#9CA3AF',
      color: '#FFFFFF',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    profileAvatarSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px'
    },
    profileAvatar: {
      fontSize: '60px',
      width: '100px',
      height: '100px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderRadius: '20px',
      border: '3px solid rgba(255,255,255,0.3)'
    },
    profileBasicInfo: {
      flex: 1
    },
    profileName: {
      fontSize: '28px',
      fontWeight: '700',
      margin: '0 0 8px 0',
      color: '#FFFFFF'
    },
    profileStatus: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      flexWrap: 'wrap'
    },
    statusButton: {
      backgroundColor: isOnline && isProfileComplete ? 'rgba(34, 197, 94, 0.2)' : 'rgba(156, 163, 175, 0.2)',
      color: '#FFFFFF',
      padding: '8px 16px',
      borderRadius: '20px',
      fontSize: '14px',
      fontWeight: '600',
      border: `2px solid ${isOnline && isProfileComplete ? 'rgba(34, 197, 94, 0.5)' : 'rgba(156, 163, 175, 0.5)'}`,
      cursor: isProfileComplete ? 'pointer' : 'not-allowed',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      opacity: isProfileComplete ? 1 : 0.6
    },
    lastSeen: {
      fontSize: '12px',
      color: 'rgba(255,255,255,0.8)',
      fontStyle: 'italic'
    },
    profileContent: {
      padding: '30px'
    },
    profileSection: {
      marginBottom: '30px',
      paddingBottom: '25px',
      borderBottom: '1px solid #E0F2F1'
    },
    profileSectionTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#124441',
      margin: '0 0 20px 0',
      paddingBottom: '10px',
      borderBottom: '2px solid #E0F2F1'
    },
    profileInfoGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '20px'
    },
    profileInfoItem: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      padding: '16px',
      backgroundColor: '#f8fafc',
      borderRadius: '10px',
      border: '1px solid #E0F2F1'
    },
    profileInfoLabel: {
      fontSize: '12px',
      fontWeight: '600',
      color: '#4F6F6B',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    profileInfoValue: {
      fontSize: '16px',
      color: '#124441',
      fontWeight: '500',
      lineHeight: '1.4'
    },
    completionWarning: {
      backgroundColor: '#fef3c7',
      border: '1px solid #f59e0b',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    warningText: {
      fontSize: '14px',
      color: '#92400e',
      fontWeight: '500',
      margin: 0
    },
    addDetailsSection: {
      backgroundColor: '#f8fafc',
      border: '2px dashed #E0F2F1',
      borderRadius: '12px',
      padding: '30px',
      textAlign: 'center',
      marginBottom: '30px'
    },
    addDetailsTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#124441',
      margin: '0 0 12px 0'
    },
    addDetailsText: {
      fontSize: '14px',
      color: '#4F6F6B',
      margin: '0 0 20px 0'
    },
    addDetailsButton: {
      backgroundColor: '#009688',
      color: '#FFFFFF',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      margin: '0 auto'
    }
  };

  return (
    <div style={styles.mainContent}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.greeting}>Pharmacy Profile</h1>
          <p style={styles.subtitle}>
            {isProfileComplete 
              ? 'Your pharmacy details and business information' 
              : 'Complete your profile to start accepting orders'
            }
          </p>
        </div>
        <div style={styles.headerActions}>
          <button 
            style={styles.notificationBell}
            onClick={() => setShowNotificationsBellModal(true)}
          >
            🔔
            {notifications.length > 0 && (
              <span style={styles.notificationBadge}>
                {notifications.length}
              </span>
            )}
          </button>
          <button 
            style={styles.primaryButton}
            onClick={() => setShowProfileModal(true)}
          >
            <span>✏️</span>
            {isProfileComplete ? 'Edit Profile' : 'Complete Profile'}
          </button>
        </div>
      </div>

      <div style={styles.profileContainer}>
        <div style={styles.profileCard}>
          {/* Profile Incomplete Badge - Show by default until all details are filled */}
          {!isProfileComplete && (
            <div style={styles.incompleteBadge}>
              ⚠️ Profile Incomplete
            </div>
          )}

          {/* Profile Header with Avatar */}
          <div style={styles.profileHeader}>
            <div style={styles.profileAvatarSection}>
              <div style={styles.profileAvatar}>👤</div>
              <div style={styles.profileBasicInfo}>
                <h2 style={styles.profileName}>
                  {userProfile?.pharmacyName && userProfile.pharmacyName.trim() !== '' 
                    ? userProfile.pharmacyName 
                    : 'Your Pharmacy Name'
                  }
                </h2>
                <div style={styles.profileStatus}>
                  <button 
                    style={styles.statusButton}
                    onClick={toggleOnlineStatus}
                    title={isProfileComplete ? `Click to go ${isOnline ? 'offline' : 'online'}` : 'Complete profile to go online'}
                  >
                    <span>
                      {isProfileComplete ? (isOnline ? '🟢' : '🔴') : '⚪'}
                    </span>
                    {isProfileComplete 
                      ? (isOnline ? 'Online' : 'Offline')
                      : 'Incomplete'
                    }
                  </button>
                  <span style={styles.lastSeen}>
                    Last updated: {formatLastSeen(lastSeen)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div style={styles.profileContent}>
            {/* Completion Warning - Show by default until profile is complete */}
            {!isProfileComplete && (
              <div style={styles.completionWarning}>
                <span>⚠️</span>
                <p style={styles.warningText}>
                  Complete your profile details to start accepting orders and unlock all features.
                </p>
              </div>
            )}

            {/* Business Information Section */}
            <div style={styles.profileSection}>
              <h3 style={styles.profileSectionTitle}>Business Information</h3>
              <div style={styles.profileInfoGrid}>
                <div style={styles.profileInfoItem}>
                  <span style={styles.profileInfoLabel}>Owner Name</span>
                  <span style={styles.profileInfoValue}>
                    {userProfile?.fullName && userProfile.fullName.trim() !== '' 
                      ? userProfile.fullName 
                      : 'Not provided'
                    }
                  </span>
                </div>
                <div style={styles.profileInfoItem}>
                  <span style={styles.profileInfoLabel}>Email</span>
                  <span style={styles.profileInfoValue}>
                    {userProfile?.email && userProfile.email.trim() !== '' 
                      ? userProfile.email 
                      : 'Not provided'
                    }
                  </span>
                </div>
                <div style={styles.profileInfoItem}>
                  <span style={styles.profileInfoLabel}>Phone</span>
                  <span style={styles.profileInfoValue}>
                    {userProfile?.phone && userProfile.phone.trim() !== '' 
                      ? userProfile.phone 
                      : 'Not provided'
                    }
                  </span>
                </div>
                <div style={styles.profileInfoItem}>
                  <span style={styles.profileInfoLabel}>Business Hours</span>
                  <span style={styles.profileInfoValue}>
                    {userProfile?.openingTime && userProfile.openingTime.trim() !== '' && 
                     userProfile?.closingTime && userProfile.closingTime.trim() !== ''
                      ? `${userProfile.openingTime} - ${userProfile.closingTime}`
                      : 'Not set'
                    }
                  </span>
                </div>
                <div style={styles.profileInfoItem}>
                  <span style={styles.profileInfoLabel}>Current Status</span>
                  <span style={{
                    ...styles.profileInfoValue, 
                    color: isProfileComplete ? (isOnline ? '#10b981' : '#ef4444') : '#4F6F6B',
                    fontWeight: '600'
                  }}>
                    {isProfileComplete 
                      ? (isOnline ? '🟢 Online - Accepting Orders' : '🔴 Offline - Not Accepting Orders')
                      : '⚪ Incomplete - Cannot Accept Orders'
                    }
                  </span>
                </div>
              </div>
            </div>

            {/* Legal & Address Details Section - ONLY SHOW WHEN DATA EXISTS */}
            {hasValidLegalData ? (
              <div style={styles.profileSection}>
                <h3 style={styles.profileSectionTitle}>Legal & Address Details</h3>
                <div style={styles.profileInfoGrid}>
                  <div style={styles.profileInfoItem}>
                    <span style={styles.profileInfoLabel}>License Number</span>
                    <span style={styles.profileInfoValue}>{userProfile.licenseNumber}</span>
                  </div>
                  <div style={styles.profileInfoItem}>
                    <span style={styles.profileInfoLabel}>GST Number</span>
                    <span style={styles.profileInfoValue}>{userProfile.gstNumber}</span>
                  </div>
                  <div style={styles.profileInfoItem}>
                    <span style={styles.profileInfoLabel}>Address</span>
                    <span style={styles.profileInfoValue}>{userProfile.address}</span>
                  </div>
                  <div style={styles.profileInfoItem}>
                    <span style={styles.profileInfoLabel}>City</span>
                    <span style={styles.profileInfoValue}>{userProfile.city}</span>
                  </div>
                  <div style={styles.profileInfoItem}>
                    <span style={styles.profileInfoLabel}>State</span>
                    <span style={styles.profileInfoValue}>{userProfile.state}</span>
                  </div>
                  <div style={styles.profileInfoItem}>
                    <span style={styles.profileInfoLabel}>Pincode</span>
                    <span style={styles.profileInfoValue}>{userProfile.pincode}</span>
                  </div>
                </div>
              </div>
            ) : (
              /* Show add details section instead of empty state */
              <div style={styles.addDetailsSection}>
                <h3 style={styles.addDetailsTitle}>Add Legal & Address Details</h3>
                <p style={styles.addDetailsText}>
                  Complete your legal and business information to start accepting orders from customers.
                </p>
                <button 
                  style={styles.addDetailsButton}
                  onClick={() => setShowProfileModal(true)}
                >
                  <span>✏️</span>
                  Add Legal & Address Details
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorProfile;