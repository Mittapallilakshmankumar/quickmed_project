import React from 'react';
import { navigationItems } from './VendorData';

const VendorSidebar = ({ 
  activePage, 
  setActivePage, 
  userProfile, 
  showMobileMenu, 
  toggleMobileMenu, 
  handleVendorClick, 
  handleLogout 
}) => {
  const colors = {
    primary: '#009688',
    mint: '#4DB6AC',
    softbg: '#E0F2F1',
    white: '#FFFFFF',
    darktext: '#124441',
    softtext: '#4F6F6B'
  };

  const sidebarStyle = {
    width: '280px',
    backgroundColor: colors.softbg,
    color: colors.darktext,
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    height: '100vh',
    left: 0,
    top: 0,
    zIndex: 1000,
    overflow: 'hidden',
    '@media (max-width: 768px)': {
      transform: showMobileMenu ? 'translateX(0)' : 'translateX(-100%)',
      transition: 'transform 0.3s ease'
    }
  };

  const sidebarHeaderStyle = {
    padding: '24px 20px 16px',
    position: 'relative',
    flexShrink: 0
  };

  const logoContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  const logoImageStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    objectFit: 'cover'
  };

  const logoFallbackStyle = {
    fontSize: '24px',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.mint,
    borderRadius: '8px'
  };

  const logoTextContainerStyle = {
    display: 'flex',
    flexDirection: 'column'
  };

  const logoStyle = {
    fontSize: '22px',
    fontWeight: '700',
    margin: '0 0 4px 0',
    color: colors.primary,
    letterSpacing: '0.5px'
  };

  const vendorTitleStyle = {
    fontSize: '12px',
    opacity: 0.8,
    margin: 0,
    fontWeight: '400',
    color: colors.softtext
  };

  const mobileCloseButtonStyle = {
    display: 'none',
    position: 'absolute',
    right: '16px',
    top: '24px',
    backgroundColor: 'transparent',
    border: 'none',
    color: colors.darktext,
    fontSize: '18px',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '4px',
    '@media (max-width: 768px)': {
      display: 'block'
    }
  };

  const vendorProfileSectionStyle = {
    padding: '16px 20px',
    flexShrink: 0,
    backgroundColor: colors.white
  };

  const vendorProfileStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    backgroundColor: colors.white,
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    '&:hover': {
      backgroundColor: colors.softbg,
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
    }
  };

  const vendorAvatarStyle = {
    fontSize: '28px',
    marginRight: '12px',
    width: '44px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.mint,
    borderRadius: '10px',
    flexShrink: 0,
    border: `2px solid ${colors.primary}`
  };

  const vendorDetailsStyle = {
    flex: 1,
    minWidth: 0
  };

  const vendorNameStyle = {
    margin: '0 0 4px 0',
    fontWeight: '600',
    fontSize: '14px',
    color: colors.darktext,
    lineHeight: '1.2',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  };

  const vendorEmailStyle = {
    margin: '0 0 2px 0',
    fontSize: '11px',
    opacity: 0.9,
    color: colors.softtext,
    lineHeight: '1.2',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  };

  const navigationStyle = {
    flex: 1,
    padding: '16px 0',
    overflow: 'hidden'
  };

  const navButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '14px 20px',
    backgroundColor: 'transparent',
    border: 'none',
    color: colors.darktext,
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    opacity: 0.8
  };

  const navButtonActiveStyle = {
    backgroundColor: colors.white,
    color: colors.primary,
    opacity: 1,
    fontWeight: '600',
    borderRight: `3px solid ${colors.primary}`
  };

  const navIconStyle = {
    fontSize: '18px',
    marginRight: '12px',
    width: '20px',
    textAlign: 'center',
    flexShrink: 0
  };

  const navLabelStyle = {
    fontWeight: '500',
    fontSize: '14px'
  };

  const sidebarFooterStyle = {
    padding: '16px 20px',
    flexShrink: 0,
    backgroundColor: colors.white
  };

  const logoutButtonStyle = {
    width: '100%',
    padding: '10px 16px',
    backgroundColor: colors.mint,
    color: colors.darktext,
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: colors.primary,
      color: colors.white
    }
  };

  return (
    <div style={sidebarStyle}>
      <div style={sidebarHeaderStyle}>
        <div style={logoContainerStyle}>
          <img 
            src="/Quickmed img.png" 
            alt="QuickMed Logo" 
            style={logoImageStyle}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <div style={logoTextContainerStyle}>
            <h1 style={logoStyle}>QUICKMED</h1>
            <p style={vendorTitleStyle}>Vendor Portal</p>
          </div>
        </div>
        <button 
          style={mobileCloseButtonStyle}
          onClick={toggleMobileMenu}
        >
          ✕
        </button>
      </div>

      {/* Vendor Profile at Top */}
      <div style={vendorProfileSectionStyle}>
        <div 
          style={vendorProfileStyle}
          onClick={handleVendorClick}
        >
          <div style={vendorAvatarStyle}>👤</div>
          <div style={vendorDetailsStyle}>
            <p style={vendorNameStyle}>{userProfile.fullName}</p>
            <p style={vendorEmailStyle}>{userProfile.email}</p>
          </div>
        </div>
      </div>
      
      <nav style={navigationStyle}>
        {navigationItems.map(item => (
          <button
            key={item.id}
            style={{
              ...navButtonStyle,
              ...(activePage === item.id ? navButtonActiveStyle : {})
            }}
            onClick={() => {
              setActivePage(item.id);
              toggleMobileMenu();
            }}
          >
            <span style={navIconStyle}>{item.icon}</span>
            <span style={navLabelStyle}>{item.label}</span>
          </button>
        ))}
      </nav>

      <div style={sidebarFooterStyle}>
        <button style={logoutButtonStyle} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default VendorSidebar;