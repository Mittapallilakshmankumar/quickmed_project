import React, { useState } from 'react';

const Sidebar = ({ activePage, setActivePage, profileData, isOnline, onLogout, onToggleAIChat }) => {
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  const styles = {
    sidebar: {
      width: '280px',
      backgroundColor: '#FFFFFF', // white
      color: '#124441', // darktext
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      height: '100vh',
      left: 0,
      top: 0,
      overflowY: 'auto',
      borderRight: '1px solid #4DB6AC' // mint border
    },
    sidebarHeader: {
      padding: '24px 20px 16px',
      borderBottom: '1px solid #E0F2F1', // softbg border
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    logoImage: {
      width: '40px',
      height: '40px',
      borderRadius: '8px',
      objectFit: 'cover'
    },
    logoPlaceholder: {
      width: '40px',
      height: '40px',
      borderRadius: '8px',
      backgroundColor: '#E0F2F1', // softbg
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
      border: '2px solid #4DB6AC' // mint
    },
    logoText: {
      fontSize: '22px',
      fontWeight: '700',
      margin: '0 0 4px 0',
      color: '#009688', // primary
      letterSpacing: '0.5px'
    },
    agentTitle: {
      fontSize: '12px',
      opacity: 0.8,
      margin: 0,
      fontWeight: '400',
      color: '#4F6F6B' // softtext
    },
    profileSection: {
      padding: '16px 20px',
      borderBottom: '1px solid #E0F2F1', // softbg border
      backgroundColor: '#F8FAFC'
    },
    profileInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    userAvatar: {
      position: 'relative',
      cursor: 'pointer'
    },
    sidebarProfileImage: {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      objectFit: 'cover',
      border: '2px solid #4DB6AC', // mint border
      cursor: 'pointer'
    },
    sidebarAvatarPlaceholder: {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      backgroundColor: '#E0F2F1', // softbg
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
      border: '2px solid #4DB6AC', // mint
      cursor: 'pointer',
      color: '#009688' // primary
    },
    userDetails: {
      flex: 1
    },
    userName: {
      margin: '0 0 4px 0',
      fontWeight: '600',
      fontSize: '14px',
      color: '#124441' // darktext
    },
    onlineStatusSmall: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '12px',
      opacity: 0.8,
      color: '#4F6F6B' // softtext
    },
    statusDot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      display: 'inline-block'
    },
    navigation: {
      flex: 1,
      padding: '16px 0'
    },
    navButton: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      padding: '14px 20px',
      backgroundColor: 'transparent',
      border: 'none',
      color: '#4F6F6B', // softtext
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      opacity: 0.8
    },
    navButtonActive: {
      backgroundColor: '#E0F2F1', // softbg
      opacity: 1,
      color: '#009688', // primary
      fontWeight: '600',
      borderLeft: '4px solid #009688' // primary accent border
    },
    navIcon: {
      fontSize: '18px',
      marginRight: '12px',
      width: '20px',
      textAlign: 'center',
      flexShrink: 0
    },
    navLabel: {
      fontWeight: '500',
      fontSize: '14px'
    },
    sidebarFooter: {
      padding: '16px 20px',
      borderTop: '1px solid #E0F2F1', // softbg border
      backgroundColor: '#F8FAFC'
    },
    sidebarActions: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    logoutButton: {
      width: '100%',
      padding: '10px 16px',
      backgroundColor: '#E0F2F1', // softbg
      color: '#124441', // darktext
      border: '1px solid #4DB6AC', // mint
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '500',
      fontSize: '14px',
      transition: 'background-color 0.3s ease'
    },
    logoutButtonHover: {
      backgroundColor: '#4DB6AC', // mint
      color: '#FFFFFF' // white
    },
    // Profile Popup Styles
    profilePopup: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#FFFFFF', // white
      borderRadius: '12px',
      padding: '24px',
      width: '400px',
      maxWidth: '90vw',
      maxHeight: '80vh',
      overflowY: 'auto',
      boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
      zIndex: 1000,
      color: '#124441', // darktext
      border: '1px solid #4DB6AC' // mint
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      zIndex: 999
    },
    popupHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '20px',
      paddingBottom: '16px',
      borderBottom: '1px solid #E0F2F1' // softbg
    },
    popupTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#009688', // primary
      margin: 0
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '24px',
      cursor: 'pointer',
      color: '#4F6F6B', // softtext
      padding: '4px'
    },
    profileDetails: {
      display: 'grid',
      gap: '16px'
    },
    detailRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 0',
      borderBottom: '1px solid #F8FAFC'
    },
    detailLabel: {
      fontWeight: '500',
      color: '#4F6F6B', // softtext
      fontSize: '14px'
    },
    detailValue: {
      fontWeight: '400',
      color: '#124441', // darktext
      fontSize: '14px',
      textAlign: 'right'
    },
    notProvided: {
      color: '#9CA3AF',
      fontStyle: 'italic'
    },
    popupActions: {
      display: 'flex',
      gap: '12px',
      marginTop: '24px'
    },
    fullProfileButton: {
      flex: 1,
      padding: '12px',
      backgroundColor: '#009688', // primary
      color: '#FFFFFF', // white
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '500',
      fontSize: '14px',
      transition: 'background-color 0.3s ease'
    },
    // Scrollbar styles
    scrollbar: {
      scrollbarWidth: 'thin',
      scrollbarColor: '#4DB6AC #E0F2F1' // mint and softbg
    },
    scrollbarWebkit: {
      '&::-webkit-scrollbar': {
        width: '6px'
      },
      '&::-webkit-scrollbar-track': {
        background: '#E0F2F1', // softbg
        borderRadius: '3px'
      },
      '&::-webkit-scrollbar-thumb': {
        background: '#4DB6AC', // mint
        borderRadius: '3px'
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: '#009688' // primary
      }
    }
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'earnings', label: 'Earnings', icon: '💰' },
    { id: 'performance', label: 'Performance', icon: '📈' },
    { id: 'tasks', label: 'Delivery History', icon: '📦' }
  ];

  const getDisplayName = () => {
    return profileData.fullName || 'Jagan';
  };

  const getProfileData = () => {
    return {
      name: profileData.fullName || 'Jagan',
      email: profileData.email || 'yerrajagan29@gmail.com',
      phone: profileData.phone || '6300604470',
      age: profileData.age || 'Not provided',
      city: profileData.city || 'Not provided',
      address: profileData.address || 'Not provided'
    };
  };

  const handleProfileImageClick = () => {
    setShowProfilePopup(true);
  };

  const handleClosePopup = () => {
    setShowProfilePopup(false);
  };

  const handleViewFullProfile = () => {
    setActivePage('profile');
    setShowProfilePopup(false);
  };

  // Logo configuration - replace with your actual logo URL
  const logoConfig = {
    url: 'QuickMed_logo.png',
    alt: 'QuickMed'
  };

  const profileInfo = getProfileData();

  return (
    <>
      <div style={{...styles.sidebar, ...styles.scrollbar, ...styles.scrollbarWebkit}}>
        {/* Header with Logo and Title */}
        <div style={styles.sidebarHeader}>
          <div style={styles.logoContainer}>
            {logoConfig.url ? (
              <img 
                src={logoConfig.url} 
                alt={logoConfig.alt}
                style={styles.logoImage}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              <div style={styles.logoPlaceholder}>🏥</div>
            )}
            <div>
              <h1 style={styles.logoText}>QUICKMED</h1>
              <p style={styles.agentTitle}>Delivery Portal</p>
            </div>
          </div>
        </div>

        {/* Profile Section below the title */}
        <div style={styles.profileSection}>
          <div style={styles.profileInfo}>
            <div style={styles.userAvatar} onClick={handleProfileImageClick}>
              {profileData.profileImage ? (
                <img 
                  src={profileData.profileImage} 
                  alt="Profile" 
                  style={styles.sidebarProfileImage}
                />
              ) : (
                <div style={styles.sidebarAvatarPlaceholder}>👤</div>
              )}
            </div>
            <div style={styles.userDetails}>
              <p style={styles.userName}>{getDisplayName()}</p>
              <div style={styles.onlineStatusSmall}>
                <span style={{
                  ...styles.statusDot,
                  backgroundColor: isOnline ? '#4DB6AC' : '#9CA3AF' // mint when online
                }}></span>
                <span>{isOnline ? 'Online' : 'Offline'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav style={styles.navigation}>
          {navigationItems.map(item => (
            <button
              key={item.id}
              style={{
                ...styles.navButton,
                ...(activePage === item.id ? styles.navButtonActive : {})
              }}
              onClick={() => setActivePage(item.id)}
              onMouseEnter={(e) => {
                if (activePage !== item.id) {
                  e.currentTarget.style.backgroundColor = '#F8FAFC';
                  e.currentTarget.style.color = '#124441';
                }
              }}
              onMouseLeave={(e) => {
                if (activePage !== item.id) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#4F6F6B';
                }
              }}
            >
              <span style={styles.navIcon}>{item.icon}</span>
              <span style={styles.navLabel}>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer Actions */}
        <div style={styles.sidebarFooter}>
          <div style={styles.sidebarActions}>
            <button 
              style={styles.logoutButton} 
              onClick={onLogout}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#4DB6AC';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#E0F2F1';
                e.currentTarget.style.color = '#124441';
              }}
            >
               Logout
            </button>
          </div>
        </div>
      </div>

      {/* Profile Popup */}
      {showProfilePopup && (
        <>
          <div style={styles.overlay} onClick={handleClosePopup}></div>
          <div style={styles.profilePopup}>
            <div style={styles.popupHeader}>
              <h2 style={styles.popupTitle}>Profile Details</h2>
              <button style={styles.closeButton} onClick={handleClosePopup}>
                ×
              </button>
            </div>
            
            <div style={styles.profileDetails}>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Name:</span>
                <span style={styles.detailValue}>{profileInfo.name}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Email:</span>
                <span style={styles.detailValue}>{profileInfo.email}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Phone:</span>
                <span style={styles.detailValue}>{profileInfo.phone}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Age:</span>
                <span style={{...styles.detailValue, ...(profileInfo.age === 'Not provided' && styles.notProvided)}}>
                  {profileInfo.age}
                </span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>City:</span>
                <span style={{...styles.detailValue, ...(profileInfo.city === 'Not provided' && styles.notProvided)}}>
                  {profileInfo.city}
                </span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Address:</span>
                <span style={{...styles.detailValue, ...(profileInfo.address === 'Not provided' && styles.notProvided)}}>
                  {profileInfo.address}
                </span>
              </div>
            </div>

            <div style={styles.popupActions}>
              <button 
                style={styles.fullProfileButton} 
                onClick={handleViewFullProfile}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#4DB6AC';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#009688';
                }}
              >
                View Full Profile
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;