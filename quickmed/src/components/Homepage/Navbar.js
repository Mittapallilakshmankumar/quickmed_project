import React, { useState, useEffect } from "react";

const Navbar = ({
  activeSection,
  onSectionChange,
  onNavigateToAuth,
  isMobileMenuOpen,
  onMobileMenuToggle,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size on load & resize
  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth <= 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  // ======================================
  //   MEDICAL UI COLOR PALETTE
  // ======================================
  const colors = {
    primary: "#009688",
    mint: "#4DB6AC",
    softbg: "#E0F2F1",
    white: "#FFFFFF",
    darktext: "#124441",
    softtext: "#4F6F6B",
    // Added accent color for Partner button
  };

  // ======================================
  //   NAVBAR STYLES
  // ======================================
  const styles = {
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: isMobile ? "0.8rem 1rem" : "1rem 2rem",
      background: colors.white,
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      position: "sticky",
      top: 0,
      zIndex: 999,
      borderBottom: `3px solid ${colors.primary}`,
    },
    logo: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      cursor: "pointer",
      flexShrink: 0,
    },
    logoImage: {
      width: isMobile ? "45px" : "55px",
      height: isMobile ? "45px" : "55px",
      objectFit: "contain",
    },
    logoText: {
      margin: 0,
      fontSize: isMobile ? "1.7rem" : "2.2rem",
      fontWeight: "bold",
      color: colors.primary,
      lineHeight: 1,
    },
    tagline: {
      fontSize: isMobile ? "0.7rem" : "0.85rem",
      color: colors.softtext,
      marginTop: "-5px",
    },

    // Desktop Navigation
    nav: {
      display: isMobile ? "none" : "flex",
      alignItems: "center",
      gap: "0.8rem",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    navButton: {
      padding: "0.55rem 1rem",
      background: "transparent",
      border: "2px solid transparent",
      borderRadius: "25px",
      fontSize: "0.95rem",
      cursor: "pointer",
      fontWeight: "600",
      color: colors.darktext,
      transition: "all 0.25s ease",
      whiteSpace: "nowrap",
    },
    activeNavButton: {
      background: colors.primary,
      color: colors.white,
      boxShadow: "0px 4px 10px rgba(0,150,136,0.28)",
    },
    partnerButton: {
      padding: "0.55rem 1.2rem",
      
      border: "2px solid transparent",
      borderRadius: "25px",
      fontSize: "0.95rem",
      cursor: "pointer",
      fontWeight: "600",
      color: colors.white,
      transition: "all 0.25s ease",
      whiteSpace: "nowrap",
      marginLeft: "0.5rem",
      boxShadow: "0px 4px 10px rgba(255,107,53,0.25)",
    },
    partnerButtonHover: {
      background: "#009688",
      transform: "translateY(-2px)",
      boxShadow: "0px 6px 15px rgba(255,107,53,0.35)",
    },

    // Desktop Auth Buttons
    authButtons: {
      display: isMobile ? "none" : "flex",
      alignItems: "center",
      gap: "1rem",
      marginLeft: "0.5rem",
    },
    loginButton: {
      padding: "0.55rem 1.2rem",
      borderRadius: "25px",
      background: "transparent",
      border: `2px solid ${colors.primary}`,
      color: colors.primary,
      cursor: "pointer",
      transition: "0.3s",
      fontWeight: "600",
      whiteSpace: "nowrap",
    },

    // Mobile Menu Button (Hamburger Icon)
    mobileMenuButton: {
      display: isMobile ? "flex" : "none",
      background: "transparent",
      border: `2px solid ${colors.primary}`,
      padding: "0.5rem",
      borderRadius: "8px",
      cursor: "pointer",
      color: colors.primary,
      fontSize: "1.5rem",
      alignItems: "center",
      justifyContent: "center",
      width: "44px",
      height: "44px",
      flexDirection: "column",
      gap: "4px",
    },
    hamburgerLine: {
      width: "24px",
      height: "3px",
      backgroundColor: colors.primary,
      borderRadius: "2px",
      transition: "all 0.3s ease",
    },
    hamburgerLineTop: {
      transform: isMobileMenuOpen ? "rotate(45deg) translate(6px, 6px)" : "none",
    },
    hamburgerLineMiddle: {
      opacity: isMobileMenuOpen ? 0 : 1,
    },
    hamburgerLineBottom: {
      transform: isMobileMenuOpen ? "rotate(-45deg) translate(6px, -6px)" : "none",
    },

    // Mobile Navigation Drawer
    mobileNav: {
      position: "fixed",
      top: "0",
      left: 0,
      right: 0,
      bottom: 0,
      background: colors.white,
      padding: "5rem 1.5rem 2rem",
      boxShadow: "0 6px 25px rgba(0,0,0,0.1)",
      zIndex: 998,
      transform: isMobileMenuOpen ? "translateX(0)" : "translateX(-100%)",
      transition: "transform 0.35s ease-in-out",
      display: "flex",
      flexDirection: "column",
      overflowY: "auto",
    },
    mobileNavHeader: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      padding: "1rem",
      background: colors.white,
      borderBottom: `1px solid ${colors.softbg}`,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    mobileNavCloseButton: {
      background: colors.softbg,
      border: "none",
      borderRadius: "8px",
      width: "44px",
      height: "44px",
      fontSize: "1.5rem",
      color: colors.primary,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    mobileNavButton: {
      padding: "1rem",
      borderRadius: "10px",
      background: colors.softbg,
      marginBottom: "0.8rem",
      fontSize: "1.1rem",
      fontWeight: "600",
      border: "none",
      color: colors.darktext,
      cursor: "pointer",
      transition: "0.3s",
      textAlign: "left",
    },
    mobileActiveNavButton: {
      background: colors.primary,
      color: colors.white,
      boxShadow: "0px 4px 10px rgba(0,150,136,0.25)",
    },
    mobilePartnerButton: {
      padding: "1rem",
      borderRadius: "10px",
      background: colors.accent,
      marginBottom: "0.8rem",
      fontSize: "1.1rem",
      fontWeight: "600",
      border: "none",
      color: colors.white,
      cursor: "pointer",
      transition: "0.3s",
      textAlign: "left",
      boxShadow: "0px 4px 10px rgba(0,150,136,0.25)",
    },

    mobileLoginButton: {
      padding: "1rem",
      borderRadius: "10px",
      background: colors.white,
      border: `2px solid ${colors.primary}`,
      color: colors.primary,
      fontSize: "1.1rem",
      fontWeight: "600",
      cursor: "pointer",
      marginTop: "1rem",
      transition: "0.3s",
    },
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Us" },
    { id: "services", label: "Services" },
    { id: "doctors", label: "Doctors" },
    { id: "reviews", label: "Reviews" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <>
      {/* MAIN NAVBAR */}
      <header style={styles.header}>
        {/* LOGO */}
        <div style={styles.logo} onClick={() => onSectionChange("home")}>
          <img 
            src="/QuickMed_logo.png" 
            alt="QuickMed" 
            style={styles.logoImage}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTUiIGhlaWdodD0iNTUiIHZpZXdCb3g9IjAgMCA1NSA1NSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjU1IiBoZWlnaHQ9IjU1IiByeD0iMTIiIGZpbGw9IiMwMDk2ODgiLz4KPHBhdGggZD0iTTE1IDI1TDI1IDM1TDQwIDIwIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K";
            }}
          />
          <div>
            <h1 style={styles.logoText}>QUICKMED</h1>
            <p style={styles.tagline}>Quick Care • Smarter Health</p>
          </div>
        </div>

        {/* DESKTOP NAV LINKS */}
        <nav style={styles.nav}>
          {navItems.map((item) => (
            <button
              key={item.id}
              style={{
                ...styles.navButton,
                ...(activeSection === item.id ? styles.activeNavButton : {}),
              }}
              onClick={() => onSectionChange(item.id)}
            >
              {item.label}
            </button>
          ))}

          {/* LOGIN BUTTON */}
          <div style={styles.authButtons}>
            <button 
              style={styles.loginButton} 
              onClick={onNavigateToAuth}
              onMouseEnter={(e) => {
                e.target.style.background = colors.primary;
                e.target.style.color = colors.white;
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = colors.primary;
              }}
            >
              Login
            </button>
          </div>
        </nav>

        {/* MOBILE MENU BUTTON (HAMBURGER) */}
        <button 
          style={styles.mobileMenuButton} 
          onClick={onMobileMenuToggle}
          aria-label="Toggle menu"
        >
          <span style={{...styles.hamburgerLine, ...styles.hamburgerLineTop}} />
          <span style={{...styles.hamburgerLine, ...styles.hamburgerLineMiddle}} />
          <span style={{...styles.hamburgerLine, ...styles.hamburgerLineBottom}} />
        </button>
      </header>

      {/* MOBILE SLIDE-IN MENU */}
      <nav style={styles.mobileNav}>
        {/* Mobile Menu Header */}
        <div style={styles.mobileNavHeader}>
          <div style={styles.logo} onClick={() => {
            onSectionChange("home");
            onMobileMenuToggle();
          }}>
            <img 
              src="/Quickmed img.png" 
              alt="QuickMed" 
              style={{...styles.logoImage, width: "40px", height: "40px"}}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iOCIgb3BhY2l0eT0iMC4xIiBmaWxsPSIjMDA5Njg4Ii8+CjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcng9IjgiIHN0cm9rZT0iIzAwOTY4OCIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxwYXRoIGQ9Ik0xMiAxOEwyMiAyOEwzMiAxOCIgc3Ryb2tlPSIjMDA5Njg4IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K";
              }}
            />
            <div>
              <h1 style={{...styles.logoText, fontSize: "1.5rem"}}>QUICKMED</h1>
            </div>
          </div>
          <button 
            style={styles.mobileNavCloseButton} 
            onClick={onMobileMenuToggle}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Mobile Navigation Items */}
        {navItems.map((item) => (
          <button
            key={item.id}
            style={{
              ...styles.mobileNavButton,
              ...(activeSection === item.id ? styles.mobileActiveNavButton : {}),
            }}
            onClick={() => {
              onSectionChange(item.id);
              onMobileMenuToggle();
            }}
          >
            {item.label}
          </button>
        ))}

        {/* MOBILE LOGIN */}
        <button
          style={styles.mobileLoginButton}
          onClick={() => {
            onNavigateToAuth();
            onMobileMenuToggle();
          }}
          onTouchStart={(e) => {
            e.target.style.background = colors.primary;
            e.target.style.color = colors.white;
          }}
          onTouchEnd={(e) => {
            e.target.style.background = colors.white;
            e.target.style.color = colors.primary;
          }}
        >
          Login
        </button>
      </nav>
    </>
  );
};

export default Navbar;