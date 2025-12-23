import React, { useRef, useEffect, useState } from 'react';
import { useProfile } from './ProfileContext';

const Header = ({
  activeView,
  setActiveView,
  cart,
  notifications,
  getUnreadCount,
  handleNotificationsClick,
  toggleProfileDropdown,
  showProfileDropdown,
  setShowProfileDropdown,
  handleLogoutClick,
  profilePhotoInputRef,
  handleProfilePhotoUpload,
}) => {
  const { profile } = useProfile();
  const profileRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Enhanced navigation handler
  const handleNavigation = (view) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setActiveView(view);
      setIsMobileMenuOpen(false);
    }, 100);
  };

  // Profile click handler
  const handleProfileClick = (e) => {
    e.stopPropagation();
    toggleProfileDropdown();
  };

  // Profile navigation handler
  const handleProfileNavigation = (view) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setActiveView(view);
      setShowProfileDropdown(false);
    }, 100);
  };

  // Cart navigation handler
  const handleCartNavigation = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setActiveView('cart');
      setIsMobileMenuOpen(false);
    }, 100);
  };

  // Handle clicks outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.hamburger-icon')) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setShowProfileDropdown, isMobileMenuOpen]);

  // Navigation items
  const navItems = [
    { key: 'dashboard', label: 'Home' },
    { key: 'appointments', label: 'Appointments' },
    { key: 'orders', label: 'Orders' }
  ];

  // Color constants
  const colors = {
    primary: '#009688',
    mint: '#4DB6AC',
    softbg: '#E0F2F1',
    white: '#FFFFFF',
    darktext: '#124441',
    softtext: '#4F6F6B'
  };

  // Reusable style function
  const getResponsiveStyle = (mobileVal, desktopVal) => isMobile ? mobileVal : desktopVal;

  // Header styles
  const styles = {
    header: {
      backgroundColor: colors.softbg,
      color: colors.darktext,
      boxShadow: `0 4px 20px rgba(0, 150, 136, 0.15)`,
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
    },
    topSection: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.8rem 1rem',
      borderBottom: `1px solid ${colors.mint}20`,
      flexWrap: 'wrap',
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      marginLeft: getResponsiveStyle('0', '-25px'),
      flex: 1,
    },
    logoImage: {
      width: getResponsiveStyle('60px', '80px'),
      height: getResponsiveStyle('30px', '40px'),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      borderRadius: '8px',
      overflow: 'hidden',
      flexShrink: 0,
    },
    logoText: { display: 'flex', flexDirection: 'column' },
    appName: {
      fontSize: getResponsiveStyle('1.1rem', '1.4rem'),
      margin: 0,
      fontWeight: 'bold',
      background: `linear-gradient(135deg, ${colors.darktext}, ${colors.primary})`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    taglineContainer: {
      display: getResponsiveStyle('none', 'flex'),
      alignItems: 'center',
      gap: '0.75rem',
      marginTop: '0.25rem',
    },
    tagline: {
      fontSize: '0.85rem',
      opacity: 0.9,
      fontWeight: '500',
      color: colors.softtext,
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      flexShrink: 0,
    },
    userText: {
      display: getResponsiveStyle('none', 'flex'),
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
    welcomeText: {
      fontSize: '0.8rem',
      opacity: 0.8,
      color: colors.softtext,
    },
    userName: {
      fontSize: '0.85rem',
      fontWeight: '500',
      color: colors.darktext,
    },
    profileContainer: {
      position: 'relative',
      cursor: 'pointer',
    },
    profileAvatar: {
      width: getResponsiveStyle('30px', '34px'),
      height: getResponsiveStyle('30px', '34px'),
      fontSize: getResponsiveStyle('0.9rem', '1rem'),
      borderRadius: '50%',
      backgroundColor: colors.primary,
      color: colors.white,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      border: `2px solid ${colors.mint}`,
      transition: 'all 0.3s ease',
      overflow: 'hidden',
    },
    hamburgerButton: {
      display: getResponsiveStyle('flex', 'none'),
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '40px',
      height: '40px',
      backgroundColor: `${colors.mint}20`,
      border: `1px solid ${colors.mint}40`,
      borderRadius: '8px',
      cursor: 'pointer',
      padding: '8px',
      marginLeft: '10px',
    },
    dropdown: {
      position: 'absolute',
      top: '100%',
      right: 0,
      width: getResponsiveStyle('280px', '320px'),
      backgroundColor: colors.white,
      borderRadius: '12px',
      boxShadow: `0 10px 30px rgba(18, 68, 65, 0.2)`,
      zIndex: 2000,
      marginTop: '0.5rem',
      overflow: 'hidden',
      border: `1px solid ${colors.mint}20`,
    },
    dropdownHeader: {
      padding: getResponsiveStyle('1rem', '1.2rem 1.5rem'),
      backgroundColor: colors.primary,
      color: colors.white,
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
    },
    dropdownAvatar: {
      width: getResponsiveStyle('40px', '50px'),
      height: getResponsiveStyle('40px', '50px'),
      borderRadius: '50%',
      backgroundColor: colors.mint,
      color: colors.white,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      fontSize: getResponsiveStyle('1rem', '1.2rem'),
      border: `2px solid ${colors.white}50`,
      overflow: 'hidden',
    },
    dropdownUserInfo: { flex: 1 },
    dropdownUserName: {
      margin: 0,
      fontSize: getResponsiveStyle('1rem', '1.1rem'),
      fontWeight: '600',
    },
    dropdownUserEmail: {
      margin: '0.25rem 0 0 0',
      fontSize: getResponsiveStyle('0.8rem', '0.85rem'),
      opacity: 0.9,
    },
    dropdownContent: {
      padding: getResponsiveStyle('0.8rem 1rem', '1rem 1.5rem'),
    },
    profileGrid: {
      display: 'grid',
      gridTemplateColumns: getResponsiveStyle('1fr', '1fr 1fr'),
      gap: '0.75rem',
      marginBottom: '1rem',
    },
    profileField: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.25rem',
    },
    profileLabel: {
      color: colors.softtext,
      fontSize: getResponsiveStyle('0.7rem', '0.75rem'),
      fontWeight: '500',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
    profileValue: {
      color: colors.darktext,
      fontSize: getResponsiveStyle('0.8rem', '0.85rem'),
      fontWeight: '600',
    },
    emptyValue: {
      color: colors.softtext,
      fontStyle: 'italic',
      fontSize: getResponsiveStyle('0.8rem', '0.85rem'),
    },
    dropdownActions: {
      padding: getResponsiveStyle('0.8rem 1rem', '1rem 1.5rem'),
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      borderTop: `1px solid ${colors.softbg}`,
    },
    profileButton: {
      padding: getResponsiveStyle('0.6rem 0.8rem', '0.75rem 1rem'),
      backgroundColor: colors.primary,
      color: colors.white,
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: getResponsiveStyle('0.8rem', '0.9rem'),
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
    },
    bottomSection: {
      display: getResponsiveStyle('none', 'flex'),
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.5rem 1rem',
      backgroundColor: `${colors.mint}10`,
      overflowX: 'auto',
    },
    nav: { display: 'flex', alignItems: 'center' },
    navItems: {
      display: 'flex',
      gap: '0.3rem',
      flexWrap: 'nowrap',
    },
    navButtonBase: {
      padding: '0.45rem 0.75rem',
      fontSize: '0.78rem',
      borderRadius: '6px',
      whiteSpace: 'nowrap',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    navButtonActive: {
      backgroundColor: `${colors.primary}20`,
      color: colors.darktext,
      boxShadow: `0 2px 8px ${colors.mint}30`,
    },
    navButtonInactive: {
      backgroundColor: 'transparent',
      color: colors.softtext,
    },
    actionsContainer: {
      display: getResponsiveStyle('none', 'flex'),
      alignItems: 'center',
      gap: '1rem',
    },
    iconContainer: {
      position: 'relative',
      display: 'inline-block'
    },
    iconWrapper: {
      display: 'flex',
      alignItems: 'center',
      padding: '0.5rem',
      backgroundColor: `${colors.mint}20`,
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      border: `1px solid ${colors.mint}40`,
    },
    icon: {
      position: 'relative',
      fontSize: '1.5rem',
    },
    badge: {
      position: 'absolute',
      top: '-8px',
      right: '-8px',
      color: colors.white,
      borderRadius: '50%',
      width: '20px',
      height: '20px',
      fontSize: '0.75rem',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: `2px solid ${colors.softbg}`
    },
    notificationBadge: { backgroundColor: '#ef4444' },
    cartBadge: { backgroundColor: colors.primary },
    logoutButton: {
      padding: '0.75rem 1.5rem',
      backgroundColor: `${colors.mint}20`,
      color: colors.darktext,
      border: `1px solid ${colors.mint}40`,
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '0.95rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease',
    },
    // Mobile Menu Styles
    mobileMenuOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(18, 68, 65, 0.5)',
      zIndex: 999,
      display: isMobileMenuOpen ? 'block' : 'none',
    },
    mobileMenu: {
      position: 'fixed',
      top: '80px',
      right: '1rem',
      backgroundColor: colors.white,
      borderRadius: '12px',
      boxShadow: `0 10px 30px rgba(18, 68, 65, 0.2)`,
      zIndex: 1000,
      width: '280px',
      padding: '1rem',
      display: isMobileMenuOpen ? 'block' : 'none',
    },
    mobileNavItems: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      marginBottom: '1rem',
    },
    mobileNavButtonBase: {
      padding: '0.75rem 1rem',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      textAlign: 'left',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      transition: 'all 0.3s ease',
    },
    mobileNavButton: {
      backgroundColor: 'transparent',
      color: colors.darktext,
    },
    mobileNavButtonActive: {
      backgroundColor: `${colors.primary}15`,
      color: colors.primary,
      fontWeight: '600',
    },
    mobileActions: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      borderTop: `1px solid ${colors.softbg}`,
      paddingTop: '1rem',
    },
    mobileIconButton: {
      padding: '0.75rem 1rem',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      textAlign: 'left',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      transition: 'all 0.3s ease',
      color: colors.darktext,
    },
    mobileIconButtonWithBadge: {
      padding: '0.75rem 1rem',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      textAlign: 'left',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      transition: 'all 0.3s ease',
      color: colors.darktext,
    },
    mobileBadge: {
      backgroundColor: '#ef4444',
      color: colors.white,
      borderRadius: '50%',
      width: '20px',
      height: '20px',
      fontSize: '0.7rem',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mobileCartBadge: {
      backgroundColor: colors.primary,
      color: colors.white,
      borderRadius: '50%',
      width: '20px',
      height: '20px',
      fontSize: '0.7rem',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
  };

  const unreadCount = getUnreadCount();
  const getNavButtonStyle = (isActive) => ({
    ...styles.navButtonBase,
    ...(isActive ? styles.navButtonActive : styles.navButtonInactive)
  });

  const getMobileNavButtonStyle = (isActive) => ({
    ...styles.mobileNavButtonBase,
    ...(isActive ? styles.mobileNavButtonActive : styles.mobileNavButton)
  });

  return (
    <header style={styles.header}>
      {/* Top Section */}
      <div style={styles.topSection}>
        <div style={styles.logoContainer}>
          <div style={styles.logoImage}>
            <img 
              src="/QuickMed_logo.png"
              alt="QuickMed Logo"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              onError={(e) => e.target.style.display = 'none'}
            />
          </div>
          <div style={styles.logoText}>
            <h1 style={styles.appName}>QUICKMED</h1>
            <div style={styles.taglineContainer}>
              <span style={styles.tagline}>Quick Care, Smarter Health</span>
            </div>
          </div>
        </div>
        
        <div style={styles.userInfo}>
          <div style={styles.userText}>
            <span style={styles.welcomeText}>Welcome,</span>
            <span style={styles.userName}>
              {profile?.fullName || 'User'}
            </span>
          </div>
          
          {/* Hamburger Menu */}
          <button 
            className="hamburger-icon"
            style={styles.hamburgerButton}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div style={{
              width: '20px',
              height: '2px',
              backgroundColor: colors.darktext,
              margin: '2px 0',
              transition: 'all 0.3s ease',
              borderRadius: '2px',
              transform: isMobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
            }} />
            <div style={{
              width: '20px',
              height: '2px',
              backgroundColor: colors.darktext,
              margin: '2px 0',
              transition: 'all 0.3s ease',
              borderRadius: '2px',
              opacity: isMobileMenuOpen ? 0 : 1
            }} />
            <div style={{
              width: '20px',
              height: '2px',
              backgroundColor: colors.darktext,
              margin: '2px 0',
              transition: 'all 0.3s ease',
              borderRadius: '2px',
              transform: isMobileMenuOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none'
            }} />
          </button>

          <div ref={profileRef} style={styles.profileContainer} onClick={handleProfileClick}>
            <div style={styles.profileAvatar}>
              {profile?.profilePhoto ? (
                <img src={profile.profilePhoto} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                profile?.fullName?.charAt(0)?.toUpperCase() || 'U'
              )}
            </div>
            
            {showProfileDropdown && (
              <div style={styles.dropdown}>
                <div style={styles.dropdownHeader}>
                  <div style={styles.dropdownAvatar}>
                    {profile?.profilePhoto ? (
                      <img src={profile.profilePhoto} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      profile?.fullName?.charAt(0)?.toUpperCase() || 'U'
                    )}
                  </div>
                  <div style={styles.dropdownUserInfo}>
                    <h4 style={styles.dropdownUserName}>{profile?.fullName || 'User'}</h4>
                    <p style={styles.dropdownUserEmail}>{profile?.email || 'No email provided'}</p>
                  </div>
                </div>

                <div style={styles.dropdownContent}>
                  <div style={styles.profileGrid}>
                    {[
                      { label: 'Phone', value: profile?.phone },
                      { label: 'Age', value: profile?.age ? `${profile.age} years` : null },
                      { label: 'Gender', value: profile?.gender ? profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1) : null },
                      { label: 'City', value: profile?.city }
                    ].map((field, index) => (
                      <div key={index} style={styles.profileField}>
                        <span style={styles.profileLabel}>{field.label}</span>
                        <span style={field.value ? styles.profileValue : styles.emptyValue}>
                          {field.value || 'Not provided'}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div style={styles.profileField}>
                    <span style={styles.profileLabel}>Address</span>
                    <span style={profile?.address ? styles.profileValue : styles.emptyValue}>
                      {profile?.address || 'Not provided'}
                    </span>
                  </div>
                </div>

                <div style={styles.dropdownActions}>
                  <button style={styles.profileButton} onClick={() => handleProfileNavigation('profile')} type="button">
                     View Full Profile
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div style={styles.bottomSection}>
        <div style={styles.nav}>
          <nav style={styles.navItems}>
            {navItems.map(item => (
              <button key={item.key} style={getNavButtonStyle(activeView === item.key)} onClick={() => handleNavigation(item.key)} type="button">
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div style={styles.actionsContainer}>
          <div style={styles.iconWrapper} onClick={handleCartNavigation}>
            <div style={styles.iconContainer}>
              <div style={styles.icon}>
                🛒
                {cart.length > 0 && <span style={{ ...styles.badge, ...styles.cartBadge }}>{cart.length}</span>}
              </div>
            </div>
          </div>

          <div style={styles.iconWrapper}>
            <button
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              onClick={handleNotificationsClick}
              aria-label="Notifications"
            >
              <div style={styles.icon}>
                🔔
                {unreadCount > 0 && <span style={{ ...styles.badge, ...styles.notificationBadge }}>{unreadCount}</span>}
              </div>
            </button>
          </div>

          <button style={styles.logoutButton} onClick={handleLogoutClick} type="button">
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div style={styles.mobileMenuOverlay} onClick={() => setIsMobileMenuOpen(false)} />

      {/* Mobile Menu */}
      <div className="mobile-menu" style={styles.mobileMenu}>
        <nav style={styles.mobileNavItems}>
          {navItems.map(item => (
            <button key={item.key} style={getMobileNavButtonStyle(activeView === item.key)} onClick={() => handleNavigation(item.key)} type="button">
              {item.label}
            </button>
          ))}
        </nav>

        <div style={styles.mobileActions}>
          <button style={styles.mobileIconButtonWithBadge} onClick={handleCartNavigation} type="button">
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>🛒 Cart</span>
            {cart.length > 0 && <span style={styles.mobileCartBadge}>{cart.length}</span>}
          </button>

          <button style={styles.mobileIconButtonWithBadge} onClick={handleNotificationsClick} type="button">
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>🔔 Notifications</span>
            {unreadCount > 0 && <span style={styles.mobileBadge}>{unreadCount}</span>}
          </button>

          <button style={styles.mobileIconButton} onClick={handleLogoutClick} type="button">
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}> Logout</span>
          </button>
        </div>
      </div>

      <input type="file" ref={profilePhotoInputRef} onChange={handleProfilePhotoUpload} accept="image/*" style={{ display: 'none' }} />
    </header>
  );
};

export default Header;