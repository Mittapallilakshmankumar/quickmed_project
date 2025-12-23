import React from 'react';

const DoctorSidebar = ({
  activePage,
  setActivePage,
  userProfile,
  setShowProfileModal,
  setShowLogoutConfirm,
  navigationItems,
  isSidebarOpen,
  setIsSidebarOpen
}) => {
  const isMobile = window.innerWidth <= 768;

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          style={styles.overlay}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      <div style={{
        ...styles.sidebar,
        transform: isMobile ? (isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)') : 'translateX(0)',
        width: isMobile ? '280px' : '280px'
      }}>
        <div style={styles.sidebarHeader}>
          <div style={styles.logoContainer}>
            <img 
              src="/Quickmed_logo.png" 
              alt="QuickMed Logo" 
              style={styles.logoImage}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div style={styles.logoFallback}></div>
            <div style={styles.logoTextContainer}>
              <h1 style={styles.logo}>QUICKMED</h1>
              <p style={styles.doctorTitle}>Doctor Portal</p>
            </div>
          </div>
          {isMobile && (
            <button 
              style={styles.closeButton}
              onClick={() => setIsSidebarOpen(false)}
            >
              ✕
            </button>
          )}
        </div>

        {/* Doctor Profile Section - Moved to top */}
        <div style={styles.profileSection}>
          <button 
            style={styles.profileButton}
            onClick={() => setShowProfileModal(true)}
          >
            <div style={styles.userInfo}>
              <div style={styles.userAvatar}>👨‍⚕️</div>
              <div style={styles.userDetails}>
                <p style={styles.userName}>Dr. {userProfile.fullName?.split(' ')[0] || 'User'}</p>
                <p style={styles.userSpecialization}>{userProfile.specialization || 'General Physician'}</p>
              </div>
            </div>
          </button>
        </div>
        
        <nav style={styles.navigation}>
          {navigationItems.map(item => (
            <button
              key={item.id}
              style={{
                ...styles.navButton,
                ...(activePage === item.id && styles.navButtonActive)
              }}
              onClick={() => {
                setActivePage(item.id);
                if (isMobile) setIsSidebarOpen(false);
              }}
            >
              <span style={styles.navIcon}>{item.icon}</span>
              <span style={styles.navLabel}>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Fixed Bottom Section with only Logout */}
        <div style={styles.bottomSection}>
          <div style={styles.sidebarFooter}>
            <button 
              style={styles.logoutButton} 
              onClick={() => setShowLogoutConfirm(true)}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  sidebar: {
    backgroundColor: '#E0F2F1',
    color: '#124441',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    height: '100vh',
    left: 0,
    top: 0,
    zIndex: 1000,
    transition: 'transform 0.3s ease',
    overflow: 'hidden',
    justifyContent: 'space-between',
    borderRight: '1px solid rgba(18, 68, 65, 0.1)'
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 999
  },
  sidebarHeader: {
    padding: '24px 20px 16px',
    borderBottom: '1px solid rgba(18, 68, 65, 0.1)',
    position: 'relative',
    flexShrink: 0
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
    objectFit: 'cover',
    border: '1px solid rgba(18, 68, 65, 0.1)'
  },
  logoFallback: {
    fontSize: '24px',
    width: '40px',
    height: '40px',
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4DB6AC',
    borderRadius: '8px'
  },
  logoTextContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  logo: {
    fontSize: '22px',
    fontWeight: '700',
    margin: '0 0 4px 0',
    color: '#009688',
    letterSpacing: '0.5px'
  },
  doctorTitle: {
    fontSize: '12px',
    opacity: 0.8,
    margin: 0,
    fontWeight: '500',
    color: '#4F6F6B'
  },
  closeButton: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: 'none',
    border: 'none',
    color: '#124441',
    fontSize: '20px',
    cursor: 'pointer',
    opacity: 0.7
  },
  profileSection: {
    padding: '16px 20px',
    borderBottom: '1px solid rgba(18, 68, 65, 0.1)',
    flexShrink: 0,
    backgroundColor: '#FFFFFF'
  },
  profileButton: {
    width: '100%',
    padding: '0',
    backgroundColor: 'transparent',
    color: '#124441',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'background-color 0.3s ease'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    borderRadius: '6px',
    transition: 'background-color 0.3s ease',
    backgroundColor: '#F5F9F9'
  },
  userAvatar: {
    fontSize: '32px',
    flexShrink: 0,
    width: '44px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4DB6AC',
    borderRadius: '10px',
    border: '2px solid #009688'
  },
  userDetails: {
    flex: 1,
    minWidth: 0
  },
  userName: {
    margin: '0 0 4px 0',
    fontWeight: '600',
    fontSize: '14px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: '#124441'
  },
  userSpecialization: {
    margin: 0,
    fontSize: '12px',
    opacity: 0.8,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: '#4F6F6B'
  },
  navigation: {
    flex: 1,
    padding: '16px 0',
    overflow: 'hidden',
    flexShrink: 1
  },
  navButton: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '14px 20px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#4F6F6B',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative'
  },
  navButtonActive: {
    backgroundColor: '#FFFFFF',
    color: '#009688',
    fontWeight: '600',
    borderLeft: '4px solid #009688'
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
  bottomSection: {
    flexShrink: 0,
    borderTop: '1px solid rgba(18, 68, 65, 0.1)',
    backgroundColor: '#FFFFFF'
  },
  sidebarFooter: {
    padding: '16px 20px'
  },
  logoutButton: {
    width: '100%',
    padding: '10px 16px',
    backgroundColor: '#009688',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '14px',
    transition: 'all 0.3s ease'
  }
};

export default DoctorSidebar;