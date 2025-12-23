import React, { useState, useEffect } from 'react';

const AboutUs = ({ onNavigateToAuth }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [showLearnMoreModal, setShowLearnMoreModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showAppointmentData, setShowAppointmentData] = useState(false); // New state for appointment data

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width <= 1024 && width > 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    setIsVisible(true);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleBookAppointment = () => {
    // First show appointment data
    setShowAppointmentData(true);
  };

  const handleLoginConfirm = () => {
    setShowLoginPrompt(false);
    if (onNavigateToAuth) {
      onNavigateToAuth();
    }
  };

  const handleLoginCancel = () => {
    setShowLoginPrompt(false);
  };

  const handleLearnMore = () => {
    setShowLearnMoreModal(true);
  };

  const closeLearnMoreModal = () => {
    setShowLearnMoreModal(false);
  };

  const closeAppointmentData = () => {
    setShowAppointmentData(false);
  };

  const handleAppointmentProceed = () => {
    // Close appointment data modal and show login prompt
    setShowAppointmentData(false);
    setShowLoginPrompt(true);
  };

  const handleBackdropClick = (e, modalType) => {
    if (e.target === e.currentTarget) {
      if (modalType === 'learnMore') {
        closeLearnMoreModal();
      } else if (modalType === 'appointmentData') {
        closeAppointmentData();
      }
    }
  };

  // Color palette
  const PRIMARY = '#009688';
  const MINT = '#4DB6AC';
  const SOFT_BG = '#E0F2F1';
  const WHITE = '#FFFFFF';
  const DARK_TEXT = '#124441';
  const SOFT_TEXT = '#4F6F6B';

  // Appointment data
  const appointmentTypes = [
    {
      id: 1,
      type: 'Pregnancy Care',
      icon: '🤰',
      duration: '45-60 mins',
      price: '₹1200',
      features: [
        'Trimester-wise consultation',
        'Scan & test planning',
        'Diet & exercise guidance',
        'Risk assessment'
      ],
      availableSlots: ['Today 4:00 PM', 'Tomorrow 10:00 AM', 'Tomorrow 3:00 PM']
    },
    {
      id: 2,
      type: 'Baby & Child Care',
      icon: '👶',
      duration: '30-45 mins',
      price: '₹900',
      features: [
        'Vaccination consultation',
        'Growth monitoring',
        'Nutrition advice',
        'Developmental check'
      ],
      availableSlots: ['Today 5:00 PM', 'Tomorrow 11:00 AM', 'Tomorrow 4:00 PM']
    },
    {
      id: 3,
      type: 'General & Family Care',
      icon: '👨‍👩‍👧‍👦',
      duration: '20-30 mins',
      price: '₹600',
      features: [
        'General consultation',
        'Prescription review',
        'Chronic care follow-up',
        'Medication advice'
      ],
      availableSlots: ['Today 6:00 PM', 'Tomorrow 9:00 AM', 'Tomorrow 2:00 PM']
    }
  ];

  const styles = {
    about: {
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${SOFT_BG} 0%, ${WHITE} 55%, ${SOFT_BG} 100%)`,
      position: 'relative',
      overflowX: 'hidden',
      padding: isMobile ? '56px 8px 32px' : isTablet ? '72px 16px 40px' : '80px 24px 48px',
    },
    container: {
      maxWidth: '1240px',
      width: '100%',
      margin: '0 auto',
      position: 'relative',
      zIndex: 1,
    },

    /* HERO */
    header: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'minmax(0,1.4fr) minmax(0,1fr)',
      gap: isMobile ? '20px' : '36px',
      alignItems: 'center',
      marginBottom: isMobile ? '32px' : '56px',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease-out',
    },
    heroText: {
      textAlign: isMobile ? 'center' : 'left',
      padding: isMobile ? '0 6px' : 0,
    },
    badgeRow: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px',
      justifyContent: isMobile ? 'center' : 'flex-start',
      marginBottom: '10px',
    },
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      backgroundColor: 'rgba(0,150,136,0.12)',
      color: PRIMARY,
      padding: '4px 12px',
      borderRadius: '999px',
      fontSize: '10px',
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      maxWidth: '100%',
      whiteSpace: 'nowrap',
    },
    sectionTitle: {
      fontSize: isMobile ? '26px' : isTablet ? '34px' : '40px',
      fontWeight: 700,
      color: DARK_TEXT,
      marginBottom: '10px',
      lineHeight: 1.25,
      wordBreak: 'break-word',
    },
    highlight: {
      backgroundImage: `linear-gradient(120deg, rgba(0,150,136,0.18), rgba(77,182,172,0.18))`,
      borderRadius: '12px',
      padding: '3px 8px',
      display: 'inline-block',
    },
    sectionSubtitle: {
      fontSize: isMobile ? '13px' : '15px',
      color: SOFT_TEXT,
      maxWidth: '580px',
      lineHeight: 1.7,
      margin: isMobile ? '0 auto' : '0',
    },
    heroStats: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      marginTop: '18px',
      justifyContent: isMobile ? 'center' : 'flex-start',
    },
    heroStatChip: {
      padding: '7px 12px',
      borderRadius: '999px',
      backgroundColor: WHITE,
      border: `1px solid rgba(0,150,136,0.2)`,
      fontSize: '11px',
      color: SOFT_TEXT,
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
      maxWidth: isMobile ? '100%' : '320px',
    },

    heroCard: {
      backgroundColor: WHITE,
      borderRadius: '22px',
      padding: isMobile ? '12px' : '18px',
      boxShadow: '0 18px 42px rgba(0,0,0,0.08)',
      border: `1px solid rgba(0,150,136,0.15)`,
      width: '100%',
    },
    heroImageWrapper: {
      borderRadius: '16px',
      overflow: 'hidden',
      position: 'relative',
      marginBottom: '10px',
      width: '100%',
    },
    heroImage: {
      width: '100%',
      height: isMobile ? '210px' : isTablet ? '230px' : '260px',
      objectFit: 'cover',
      display: 'block',
    },
    heroTag: {
      position: 'absolute',
      left: '10px',
      right: '10px',
      bottom: '10px',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      color: WHITE,
      padding: '6px 10px',
      borderRadius: '10px',
      fontSize: '10px',
      lineHeight: 1.5,
    },
    heroMetaRow: {
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '8px',
      fontSize: '11px',
      color: SOFT_TEXT,
    },
    heroScore: {
      fontWeight: 700,
      color: PRIMARY,
      fontSize: '16px',
    },

    /* ABOUT QUICKMED */
    aboutQuickMedSection: {
      marginBottom: isMobile ? '32px' : '48px',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease-out 0.15s',
    },
    sectionHeaderRow: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: isMobile ? 'flex-start' : 'center',
      gap: '10px',
      marginBottom: '14px',
    },
    sectionHeading: {
      fontSize: isMobile ? '18px' : '22px',
      fontWeight: 700,
      color: DARK_TEXT,
    },
    sectionSmallText: {
      fontSize: '13px',
      color: SOFT_TEXT,
      maxWidth: isMobile ? '100%' : '520px',
      lineHeight: 1.7,
    },
    aboutQuickGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'minmax(0,1.5fr) minmax(0,1fr)',
      gap: isMobile ? '12px' : '20px',
    },
    aboutCard: {
      backgroundColor: WHITE,
      borderRadius: '16px',
      padding: isMobile ? '12px 10px' : '16px 14px',
      border: `1px solid rgba(0,150,136,0.15)`,
      boxShadow: '0 8px 28px rgba(0,0,0,0.04)',
      fontSize: '13px',
      color: SOFT_TEXT,
      lineHeight: 1.8,
    },
    aboutList: {
      marginTop: '8px',
      paddingLeft: '16px',
      fontSize: '12px',
    },
    aboutHighlight: {
      backgroundColor: SOFT_BG,
      borderRadius: '14px',
      padding: isMobile ? '10px' : '12px',
      fontSize: '12px',
      color: DARK_TEXT,
      border: `1px solid rgba(0,150,136,0.2)`,
    },

    /* CARE PROGRAMS */
    careSection: {
      backgroundColor: WHITE,
      borderRadius: '22px',
      padding: isMobile ? '18px 10px' : '24px 18px',
      boxShadow: '0 12px 40px rgba(0,0,0,0.06)',
      border: `1px solid rgba(0,150,136,0.15)`,
      marginBottom: isMobile ? '34px' : '52px',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease-out 0.3s',
    },
    careHeaderText: {
      fontSize: '13px',
      color: SOFT_TEXT,
      maxWidth: isMobile ? '100%' : '560px',
      lineHeight: 1.7,
      marginBottom: '8px',
    },
    careGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile
        ? '1fr'
        : isTablet
        ? 'repeat(2, minmax(0,1fr))'
        : 'repeat(3, minmax(0,1fr))',
      gap: isMobile ? '14px' : '18px',
    },
    careCard: {
      borderRadius: '18px',
      overflow: 'hidden',
      border: `1px solid rgba(0,150,136,0.18)`,
      backgroundColor: SOFT_BG,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      transition: 'all 0.3s ease',
    },
    careImageWrapper: {
      height: isMobile ? '140px' : '160px',
      overflow: 'hidden',
      width: '100%',
    },
    careImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
      transform: 'scale(1.02)',
      transition: 'transform 0.3s ease',
    },
    careBody: {
      padding: '12px 12px 14px',
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      flex: 1,
    },
    careLabelRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '11px',
      color: PRIMARY,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
    },
    careTitle: {
      fontSize: '15px',
      fontWeight: 700,
      color: DARK_TEXT,
    },
    careText: {
      fontSize: '12px',
      color: SOFT_TEXT,
      lineHeight: 1.7,
    },
    careTagList: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px',
      marginTop: '4px',
      fontSize: '10px',
    },
    careTag: {
      padding: '4px 7px',
      borderRadius: '999px',
      backgroundColor: WHITE,
      border: `1px solid rgba(0,150,136,0.18)`,
      color: SOFT_TEXT,
      whiteSpace: 'nowrap',
    },

    /* MODULES */
    modulesSection: {
      marginBottom: isMobile ? '34px' : '50px',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease-out 0.45s',
    },
    modulesGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile
        ? '1fr'
        : isTablet
        ? 'repeat(2,minmax(0,1fr))'
        : 'repeat(4,minmax(0,1fr))',
      gap: isMobile ? '14px' : '18px',
    },
    moduleCard: {
      backgroundColor: WHITE,
      borderRadius: '16px',
      padding: isMobile ? '12px 10px' : '14px 12px',
      border: `1px solid rgba(0,150,136,0.15)`,
      boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      fontSize: '12px',
      color: SOFT_TEXT,
      height: '100%',
      transition: 'all 0.3s ease',
    },
    modulePill: {
      alignSelf: 'flex-start',
      padding: '3px 9px',
      borderRadius: '999px',
      backgroundColor: SOFT_BG,
      color: PRIMARY,
      fontSize: '10px',
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
    },
    moduleTitleRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      flexWrap: 'wrap',
    },
    moduleIcon: {
      fontSize: '18px',
    },
    moduleTitle: {
      fontSize: '14px',
      fontWeight: 700,
      color: DARK_TEXT,
    },
    moduleList: {
      marginTop: '4px',
      paddingLeft: '16px',
    },

    /* FLOW */
    flowSection: {
      backgroundColor: WHITE,
      borderRadius: '22px',
      padding: isMobile ? '16px 10px' : '22px 18px',
      boxShadow: '0 12px 38px rgba(0,0,0,0.05)',
      border: `1px solid rgba(0,150,136,0.15)`,
      marginBottom: isMobile ? '34px' : '50px',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease-out 0.6s',
    },
    flowGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'minmax(0,2fr) minmax(0,1.2fr)',
      gap: isMobile ? '12px' : '20px',
      alignItems: 'stretch',
    },
    flowList: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, minmax(0,1fr))',
      gap: '8px',
      fontSize: '12px',
    },
    flowStep: {
      backgroundColor: SOFT_BG,
      borderRadius: '12px',
      padding: '8px 8px',
      border: `1px solid rgba(0,150,136,0.2)`,
      height: '100%',
    },
    flowStepNumber: {
      fontSize: '10px',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      color: PRIMARY,
      marginBottom: '3px',
      fontWeight: 600,
    },
    flowStepText: {
      fontSize: '12px',
      color: SOFT_TEXT,
    },
    flowMiniMap: {
      borderRadius: '16px',
      overflow: 'hidden',
      border: `1px solid rgba(0,150,136,0.2)`,
      position: 'relative',
      width: '100%',
    },
    flowImage: {
      width: '100%',
      height: isMobile ? '170px' : isTablet ? '190px' : '210px',
      objectFit: 'cover',
      display: 'block',
    },
    flowOverlay: {
      position: 'absolute',
      bottom: '8px',
      left: '8px',
      right: '8px',
      backgroundColor: 'rgba(0, 0, 0, 0.55)',
      color: WHITE,
      borderRadius: '10px',
      padding: '6px 8px',
      fontSize: '10px',
      lineHeight: 1.5,
    },

    /* TECH & WHY */
    techWhyWrapper: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, minmax(0,1fr))',
      gap: isMobile ? '14px' : '18px',
      marginBottom: isMobile ? '30px' : '44px',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease-out 0.75s',
    },
    infoCard: {
      backgroundColor: WHITE,
      borderRadius: '18px',
      padding: isMobile ? '14px 12px' : '16px 14px',
      boxShadow: '0 10px 34px rgba(0,0,0,0.05)',
      border: `1px solid rgba(0,150,136,0.15)`,
      fontSize: '12px',
      color: SOFT_TEXT,
      lineHeight: 1.7,
    },
    infoTitle: {
      fontSize: isMobile ? '17px' : '19px',
      fontWeight: 700,
      color: DARK_TEXT,
      marginBottom: '6px',
    },
    infoList: {
      marginTop: '6px',
      paddingLeft: '16px',
    },

    /* NUTSHELL + TEAM + CTA */
    nutshellSection: {
      marginBottom: isMobile ? '26px' : '36px',
      textAlign: 'center',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease-out 0.9s',
    },
    nutshellText: {
      fontSize: '13px',
      color: SOFT_TEXT,
      maxWidth: '640px',
      margin: '0 auto',
      lineHeight: 1.7,
      padding: '0 8px',
    },

    teamSection: {
      marginBottom: isMobile ? '32px' : '46px',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease-out 1s',
    },
    teamTitle: {
      fontSize: isMobile ? '20px' : '24px',
      textAlign: 'center',
      fontWeight: 700,
      color: DARK_TEXT,
      marginBottom: '18px',
    },
    teamGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile
        ? '1fr'
        : isTablet
        ? 'repeat(2,minmax(0,1fr))'
        : 'repeat(3,minmax(0,1fr))',
      gap: isMobile ? '14px' : '18px',
    },
    teamMember: {
      backgroundColor: WHITE,
      borderRadius: '16px',
      padding: isMobile ? '14px 10px' : '16px 12px',
      textAlign: 'center',
      border: `1px solid rgba(0,150,136,0.15)`,
      boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
      transition: 'all 0.3s ease',
      height: '100%',
    },
    memberAvatar: {
      fontSize: isMobile ? '38px' : '44px',
      marginBottom: '6px',
    },
    memberName: {
      fontSize: '14px',
      fontWeight: 600,
      color: DARK_TEXT,
      marginBottom: '3px',
    },
    memberRole: {
      fontSize: '12px',
      color: PRIMARY,
      fontWeight: 500,
      marginBottom: '4px',
    },
    memberBio: {
      fontSize: '11px',
      color: SOFT_TEXT,
      lineHeight: 1.6,
    },

    ctaSection: {
      backgroundColor: 'rgba(0,150,136,0.06)',
      padding: isMobile ? '22px 12px' : '28px 18px',
      borderRadius: '22px',
      textAlign: 'center',
      border: `1px solid rgba(0,150,136,0.18)`,
      backdropFilter: 'blur(6px)',
    },
    ctaTitle: {
      fontSize: isMobile ? '20px' : '24px',
      fontWeight: 700,
      color: DARK_TEXT,
      marginBottom: '8px',
    },
    ctaDescription: {
      fontSize: '13px',
      color: SOFT_TEXT,
      marginBottom: '18px',
      maxWidth: '620px',
      marginInline: 'auto',
      lineHeight: 1.7,
      padding: '0 8px',
    },
    ctaButtons: {
      display: 'flex',
      gap: '10px',
      justifyContent: 'center',
      flexWrap: 'wrap',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: 'center',
    },
    btnPrimary: {
      backgroundColor: PRIMARY,
      color: WHITE,
      border: 'none',
      padding: isMobile ? '9px 18px' : '11px 22px',
      borderRadius: '999px',
      fontSize: '14px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 6px 18px rgba(0,150,136,0.4)',
      minWidth: isMobile ? '200px' : 'auto',
    },
    btnSecondary: {
      backgroundColor: 'transparent',
      color: PRIMARY,
      border: `2px solid ${PRIMARY}`,
      padding: isMobile ? '9px 18px' : '11px 22px',
      borderRadius: '999px',
      fontSize: '14px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      minWidth: isMobile ? '200px' : 'auto',
    },

    /* MODALS */
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: isMobile ? '1rem' : '2rem',
      backdropFilter: 'blur(4px)',
    },
    modalContent: {
      backgroundColor: WHITE,
      padding: isMobile ? '1.2rem' : '2.1rem',
      borderRadius: '18px',
      maxWidth: isMobile ? '95%' : '840px',
      width: '100%',
      maxHeight: isMobile ? '90vh' : '80vh',
      overflowY: 'auto',
      boxShadow: '0 24px 70px rgba(0,0,0,0.28)',
      border: `1px solid rgba(0,150,136,0.2)`,
      position: 'relative',
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.2rem',
      paddingBottom: '0.7rem',
      borderBottom: `2px solid ${PRIMARY}`,
      gap: '8px',
    },
    modalTitle: {
      fontSize: isMobile ? '1.25rem' : '1.5rem',
      color: DARK_TEXT,
      fontWeight: 700,
      margin: 0,
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '1.3rem',
      color: PRIMARY,
      cursor: 'pointer',
      padding: '0.35rem',
      borderRadius: '999px',
      width: '34px',
      height: '34px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
      flexShrink: 0,
    },
    modalBody: {
      color: DARK_TEXT,
      lineHeight: 1.7,
      fontSize: isMobile ? '0.9rem' : '0.96rem',
    },
    modalSection: {
      marginBottom: '1.3rem',
    },
    modalHeading: {
      fontSize: isMobile ? '0.98rem' : '1.05rem',
      color: PRIMARY,
      fontWeight: 600,
      marginBottom: '0.45rem',
    },
    modalText: {
      fontSize: '0.9rem',
      color: SOFT_TEXT,
      marginBottom: '0.45rem',
    },
    featureList: {
      listStyle: 'none',
      padding: 0,
      margin: '0.5rem 0',
    },
    featureItem: {
      padding: '0.4rem 0',
      borderBottom: '1px solid #f0f0f0',
      display: 'flex',
      gap: '0.7rem',
      fontSize: '0.88rem',
      color: SOFT_TEXT,
      alignItems: 'flex-start',
    },
    featureIcon: {
      color: PRIMARY,
      fontSize: '1.05rem',
      marginTop: '0.12rem',
      flexShrink: 0,
    },

    // Appointment Data Modal Styles
    appointmentModalContent: {
      backgroundColor: WHITE,
      padding: isMobile ? '1rem' : '1.8rem',
      borderRadius: '18px',
      maxWidth: isMobile ? '95%' : '900px',
      width: '100%',
      maxHeight: isMobile ? '90vh' : '85vh',
      overflowY: 'auto',
      boxShadow: '0 24px 70px rgba(0,0,0,0.28)',
      border: `1px solid rgba(0,150,136,0.2)`,
      position: 'relative',
    },
    appointmentGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gap: '1rem',
      marginBottom: '1.5rem',
    },
    appointmentCard: {
      backgroundColor: SOFT_BG,
      borderRadius: '12px',
      padding: '1rem',
      border: `1px solid rgba(0,150,136,0.15)`,
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    appointmentCardSelected: {
      backgroundColor: 'rgba(0,150,136,0.1)',
      border: `2px solid ${PRIMARY}`,
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(0,150,136,0.15)',
    },
    appointmentIcon: {
      fontSize: '2rem',
      marginBottom: '0.5rem',
    },
    appointmentType: {
      fontSize: '1.1rem',
      fontWeight: 600,
      color: DARK_TEXT,
      marginBottom: '0.25rem',
    },
    appointmentDetails: {
      fontSize: '0.85rem',
      color: SOFT_TEXT,
      marginBottom: '0.5rem',
    },
    appointmentPrice: {
      fontSize: '1.2rem',
      fontWeight: 700,
      color: PRIMARY,
      margin: '0.5rem 0',
    },
    appointmentFeatures: {
      listStyle: 'none',
      padding: 0,
      margin: '0.5rem 0',
      fontSize: '0.8rem',
      color: SOFT_TEXT,
    },
    appointmentFeature: {
      marginBottom: '0.25rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    appointmentSlots: {
      backgroundColor: WHITE,
      borderRadius: '12px',
      padding: '1rem',
      border: `1px solid rgba(0,150,136,0.1)`,
    },
    slotTitle: {
      fontSize: '1rem',
      fontWeight: 600,
      color: DARK_TEXT,
      marginBottom: '0.75rem',
    },
    slotGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gap: '0.5rem',
    },
    slotButton: {
      backgroundColor: SOFT_BG,
      border: `1px solid rgba(0,150,136,0.2)`,
      borderRadius: '8px',
      padding: '0.75rem 0.5rem',
      fontSize: '0.85rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textAlign: 'center',
    },
    slotButtonSelected: {
      backgroundColor: PRIMARY,
      color: WHITE,
      border: `1px solid ${PRIMARY}`,
    },
    appointmentFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '1.5rem',
      paddingTop: '1rem',
      borderTop: `1px solid rgba(0,150,136,0.1)`,
    },
    appointmentSummary: {
      fontSize: '0.9rem',
      color: SOFT_TEXT,
    },
    appointmentActions: {
      display: 'flex',
      gap: '0.75rem',
    },
    btnCancel: {
      backgroundColor: 'transparent',
      color: SOFT_TEXT,
      border: `1px solid ${SOFT_TEXT}`,
      padding: '0.75rem 1.5rem',
      borderRadius: '999px',
      fontSize: '0.9rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    btnProceed: {
      backgroundColor: PRIMARY,
      color: WHITE,
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '999px',
      fontSize: '0.9rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 6px 18px rgba(0,150,136,0.4)',
    },

    loginPromptModal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: isMobile ? '0.7rem' : '1rem',
      backdropFilter: 'blur(3px)',
    },
    loginPromptContent: {
      backgroundColor: WHITE,
      padding: isMobile ? '1.2rem' : '1.8rem',
      borderRadius: '16px',
      maxWidth: isMobile ? '92%' : '380px',
      width: '100%',
      boxShadow: '0 22px 50px rgba(0,0,0,0.32)',
      textAlign: 'center',
      border: `1px solid rgba(0,150,136,0.18)`,
    },
    loginPromptTitle: {
      fontSize: isMobile ? '1.15rem' : '1.3rem',
      color: DARK_TEXT,
      marginBottom: '0.7rem',
      fontWeight: 700,
    },
    loginPromptText: {
      fontSize: isMobile ? '0.92rem' : '0.98rem',
      color: SOFT_TEXT,
      marginBottom: '1.3rem',
      lineHeight: 1.6,
    },
    loginPromptButtons: {
      display: 'flex',
      gap: '0.7rem',
      justifyContent: 'center',
      flexDirection: isMobile ? 'column' : 'row',
    },
    loginButton: {
      padding: isMobile ? '0.75rem 2rem' : '0.85rem 2.2rem',
      backgroundColor: PRIMARY,
      color: WHITE,
      border: 'none',
      borderRadius: '999px',
      cursor: 'pointer',
      fontSize: isMobile ? '0.9rem' : '0.98rem',
      fontWeight: 'bold',
      transition: 'all 0.3s ease',
      flex: isMobile ? 1 : 'none',
      boxShadow: '0 6px 18px rgba(0,150,136,0.45)',
    },
    cancelLoginButton: {
      padding: isMobile ? '0.75rem 2rem' : '0.85rem 2.2rem',
      backgroundColor: SOFT_TEXT,
      color: WHITE,
      border: 'none',
      borderRadius: '999px',
      cursor: 'pointer',
      fontSize: isMobile ? '0.9rem' : '0.98rem',
      fontWeight: 'bold',
      transition: 'all 0.3s ease',
      flex: isMobile ? 1 : 'none',
    },
  };

  /* DATA */

  const carePrograms = [
    {
      label: 'Pregnancy Care',
      icon: '🤰',
      image:
        'https://images.pexels.com/photos/3845129/pexels-photo-3845129.jpeg?auto=compress&cs=tinysrgb&w=1200',
      text:
        'End-to-end antenatal and postnatal care with trimester-wise plans, doctor consults, and smart reminders for scans, tests, and medicines.',
      tags: ['Trimester plans', 'Diet & exercise', 'High-risk monitoring', '24/7 support'],
    },
    {
      label: 'Baby & Child Care',
      icon: '👶',
      image:
        'https://images.pexels.com/photos/3952069/pexels-photo-3952069.jpeg?auto=compress&cs=tinysrgb&w=1200',
      text:
        'Support from newborn to school-going age—vaccination tracking, growth charts, online paediatric consults, and parent guidance.',
      tags: ['Vaccination tracker', 'Growth charts', 'Paediatric consults', 'Parent education'],
    },
    {
      label: 'General & Family Care',
      icon: '🏥',
      image:
        'https://images.pexels.com/photos/6129681/pexels-photo-6129681.jpeg?auto=compress&cs=tinysrgb&w=1200',
      text:
        'Everyday health services for the full family—e-consultations, chronic disease management, diagnostics, and medicine delivery.',
      tags: ['Online doctors', 'Chronic care', 'Diagnostics', 'Doorstep medicines'],
    },
  ];

  const modules = [
    {
      icon: '👤',
      title: 'User Module',
      pill: 'Patients & Families',
      points: [
        'Create and manage multi-member family profiles.',
        'Order medicines with prescription upload and real-time tracking.',
        'Book doctor consultations and follow-up appointments.',
        'Use AutoPay for monthly refills and access chatbot assistance.',
      ],
    },
    {
      icon: '🩺',
      title: 'Doctor Module',
      pill: 'Clinicians',
      points: [
        'Maintain professional profile and availability slots.',
        'View patient history and previous prescriptions in one place.',
        'Provide secure online consultations and digital prescriptions.',
        'Track earnings, appointment volume, and performance metrics.',
      ],
    },
    {
      icon: '🏪',
      title: 'Vendor Module',
      pill: 'Pharmacies',
      points: [
        'Register pharmacy and manage live stock and pricing.',
        'Receive orders based on location and prescription validation.',
        'View order history and fulfillment metrics.',
        'Monitor earnings and performance dashboards.',
      ],
    },
    {
      icon: '🚚',
      title: 'Delivery Module',
      pill: 'Delivery Partners',
      points: [
        'Register as a delivery partner and verify identity.',
        'Receive daily delivery tasks with route optimisation.',
        'Use real-time GPS navigation to reach users quickly.',
        'Update delivery status and track earnings transparently.',
      ],
    },
  ];

  const flowSteps = [
    'User places a medicine order or books a consultation.',
    'System validates prescription and checks availability.',
    'Nearest eligible pharmacy/vendor receives the request.',
    'Vendor prepares and confirms the order in the system.',
    'Delivery partner picks up the order from the pharmacy.',
    'Real-time GPS tracking guides delivery to the user.',
    'User receives medicine, leaves feedback, and records are updated.',
  ];

  const techPoints = [
    'Secure authentication and role-based access for all modules.',
    'Automated prescription verification and compliance checks.',
    'Real-time GPS navigation for delivery partners.',
    'Cloud-based storage for scalable and safe health data.',
    'Automated subscription billing for monthly medicines.',
    'Analytics dashboards for doctors, vendors, and admins.',
  ];

  const whyPoints = [
    'Fast access to medicines with location-aware delivery.',
    'Quicker online doctor consultations with proper history.',
    'Reliable vendor–pharmacy integration to avoid stockouts.',
    'Transparent, real-time delivery updates for patients.',
    'Strong support for chronic patients, new mothers, and families.',
    '24/7 availability of essential digital healthcare services.',
  ];

  const teamMembers = [
    {
      avatar: '👩‍⚕️',
      name: 'Dr. Ananya Reddy',
      role: 'Lead Obstetrician & Women\'s Health',
      bio: '15+ years in high-risk pregnancy care and evidence-based maternal medicine.',
    },
    {
      avatar: '👨‍⚕️',
      name: 'Dr. Arjun Mehta',
      role: 'Senior Paediatrician',
      bio: 'Focused on newborn, infant, and child health with preventive care programs.',
    },
    {
      avatar: '👨‍💻',
      name: 'Suresh Kumar',
      role: 'Head of Digital Health',
      bio: 'Leads product & engineering for secure, real-time digital healthcare journeys.',
    },
  ];

  /* MODALS */

  const LearnMoreModal = ({ onClose }) => (
    <div style={styles.modalOverlay} onClick={(e) => handleBackdropClick(e, 'learnMore')}>
      <div style={styles.modalContent}>
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>Deep-dive into our care experience</h2>
          <button
            style={styles.closeButton}
            onClick={onClose}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = SOFT_BG;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
            }}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div style={styles.modalBody}>
          <div style={styles.modalSection}>
            <h3 style={styles.modalHeading}>Real-time, end-to-end healthcare flow</h3>
            <p style={styles.modalText}>
              Every order or appointment on QuickMed travels across the same integrated
              flow: user → doctor → pharmacy → delivery, backed by secure cloud services
              and live status updates.
            </p>
            <ul style={styles.featureList}>
              <li style={styles.featureItem}>
                <span style={styles.featureIcon}>📍</span>
                <div>Live delivery tracking with GPS for complete transparency.</div>
              </li>
              <li style={styles.featureItem}>
                <span style={styles.featureIcon}>📱</span>
                <div>Digital prescriptions and health records on web and mobile.</div>
              </li>
              <li style={styles.featureItem}>
                <span style={styles.featureIcon}>⏱️</span>
                <div>Reminders for refills, vaccines, scans, and follow-ups.</div>
              </li>
            </ul>
          </div>

          <div style={styles.modalSection}>
            <h3 style={styles.modalHeading}>Designed for pregnant women & new parents</h3>
            <p style={styles.modalText}>
              QuickMed combines clinical expertise, reminders, and digital records to
              make pregnancy and early parenthood safer and simpler.
            </p>
            <ul style={styles.featureList}>
              <li style={styles.featureItem}>
                <span style={styles.featureIcon}>🤰</span>
                <div>Trimester-based checklists, symptom logs, and risk alerts.</div>
              </li>
              <li style={styles.featureItem}>
                <span style={styles.featureIcon}>👶</span>
                <div>Baby vaccination tracker with alerts and paediatrician sync.</div>
              </li>
              <li style={styles.featureItem}>
                <span style={styles.featureIcon}>👨‍👩‍👧</span>
                <div>One login for mother, baby, elders, and the whole family.</div>
              </li>
            </ul>
          </div>

          <div style={styles.modalSection}>
            <h3 style={styles.modalHeading}>Built on secure, modern technology</h3>
            <p style={styles.modalText}>
              We use secure authentication, encrypted data, and cloud infrastructure with
              monitoring and analytics built in.
            </p>
            <ul style={styles.featureList}>
              <li style={styles.featureItem}>
                <span style={styles.featureIcon}>🔒</span>
                <div>End-to-end encryption for sensitive medical data.</div>
              </li>
              <li style={styles.featureItem}>
                <span style={styles.featureIcon}>☁️</span>
                <div>Highly available cloud storage for fast, reliable access.</div>
              </li>
              <li style={styles.featureItem}>
                <span style={styles.featureIcon}>📊</span>
                <div>Real-time dashboards to monitor quality and performance.</div>
              </li>
            </ul>
          </div>

          <div style={styles.modalSection}>
            <h3 style={styles.modalHeading}>Start small, grow with us</h3>
            <p style={styles.modalText}>
              Begin with a single consultation or order and gradually move more of your
              family's healthcare into QuickMed as you gain confidence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Appointment Data Modal Component
  const AppointmentDataModal = ({ onClose, onProceed }) => {
    const [selectedAppointment, setSelectedAppointment] = useState(appointmentTypes[0]);
    const [selectedSlot, setSelectedSlot] = useState('');

    return (
      <div style={styles.modalOverlay} onClick={(e) => handleBackdropClick(e, 'appointmentData')}>
        <div style={styles.appointmentModalContent}>
          <div style={styles.modalHeader}>
            <h2 style={styles.modalTitle}>Book Your Appointment</h2>
            <button
              style={styles.closeButton}
              onClick={onClose}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = SOFT_BG;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>

          <div style={styles.modalBody}>
            <p style={styles.modalText}>
              Select the type of appointment you need and choose a convenient time slot.
            </p>

            <div style={styles.appointmentGrid}>
              {appointmentTypes.map((appointment) => (
                <div
                  key={appointment.id}
                  style={{
                    ...styles.appointmentCard,
                    ...(selectedAppointment.id === appointment.id && styles.appointmentCardSelected)
                  }}
                  onClick={() => setSelectedAppointment(appointment)}
                  onMouseEnter={(e) => {
                    if (selectedAppointment.id !== appointment.id) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,150,136,0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedAppointment.id !== appointment.id) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                >
                  <div style={styles.appointmentIcon}>{appointment.icon}</div>
                  <h3 style={styles.appointmentType}>{appointment.type}</h3>
                  <div style={styles.appointmentDetails}>
                    Duration: {appointment.duration}
                  </div>
                  <div style={styles.appointmentPrice}>{appointment.price}</div>
                  <ul style={styles.appointmentFeatures}>
                    {appointment.features.map((feature, index) => (
                      <li key={index} style={styles.appointmentFeature}>
                        <span>✓</span> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div style={styles.appointmentSlots}>
              <h3 style={styles.slotTitle}>Available Time Slots</h3>
              <div style={styles.slotGrid}>
                {selectedAppointment.availableSlots.map((slot, index) => (
                  <button
                    key={index}
                    style={{
                      ...styles.slotButton,
                      ...(selectedSlot === slot && styles.slotButtonSelected)
                    }}
                    onClick={() => setSelectedSlot(slot)}
                    onMouseEnter={(e) => {
                      if (selectedSlot !== slot) {
                        e.currentTarget.style.backgroundColor = 'rgba(0,150,136,0.1)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedSlot !== slot) {
                        e.currentTarget.style.backgroundColor = SOFT_BG;
                      }
                    }}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div style={styles.appointmentFooter}>
              <div style={styles.appointmentSummary}>
                {selectedAppointment.type} appointment • {selectedAppointment.duration} • {selectedAppointment.price}
                {selectedSlot && ` • ${selectedSlot}`}
              </div>
              <div style={styles.appointmentActions}>
                <button
                  style={styles.btnCancel}
                  onClick={onClose}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = SOFT_TEXT;
                    e.target.style.color = WHITE;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = SOFT_TEXT;
                  }}
                >
                  Cancel
                </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const LoginPromptModal = ({ onConfirm, onCancel }) => (
    <div style={styles.loginPromptModal} onClick={onCancel}>
      <div style={styles.loginPromptContent} onClick={(e) => e.stopPropagation()}>
        <h2 style={styles.loginPromptTitle}>Login to continue</h2>
        <p style={styles.loginPromptText}>
          Please login or create an account to book pregnancy, baby care, or general
          health appointments and manage your family's health records in real time.
        </p>
        <div style={styles.loginPromptButtons}>
          <button
            style={styles.cancelLoginButton}
            onClick={onCancel}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#2f4f4b';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = SOFT_TEXT;
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Cancel
          </button>
          <button
            style={styles.loginButton}
            onClick={onConfirm}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = MINT;
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = PRIMARY;
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );

  /* JSX */

  return (
    <>
      <section style={styles.about}>
        <div style={styles.container}>
          {/* HERO */}
          <header style={styles.header}>
            <div style={styles.heroText}>
              <div style={styles.badgeRow}>
                <span style={styles.badge}>Pregnancy Care</span>
                <span style={styles.badge}>Baby & Child Care</span>
                <span style={styles.badge}>Family & General Care</span>
              </div>
              <h1 style={styles.sectionTitle}>
                Care you need,
                <br />
                <span style={styles.highlight}>when you need it.</span>
              </h1>
              <p style={styles.sectionSubtitle}>
                QuickMed is your all-in-one digital healthcare partner. From pregnancy
                journeys and baby vaccinations to daily family health needs, we connect
                users, doctors, pharmacies, and delivery partners on one secure platform.
              </p>

              <div style={styles.heroStats}>
                <div style={styles.heroStatChip}>
                  <span>👨‍👩‍👧‍👦</span>
                  <span>20,000+ families supported across pregnancy, baby, and general care</span>
                </div>
                <div style={styles.heroStatChip}>
                  <span>⏱️</span>
                  <span>Real-time tracking for orders and appointments</span>
                </div>
              </div>
            </div>

            <div style={styles.heroCard}>
              <div style={styles.heroImageWrapper}>
                <img
                  src="https://images.pexels.com/photos/6129045/pexels-photo-6129045.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Doctor with a pregnant woman and her partner during consultation"
                  style={styles.heroImage}
                />
                <div style={styles.heroTag}>
                  Integrated pregnancy, baby, and family care backed by doctors, verified
                  pharmacies, and live delivery tracking.
                </div>
              </div>
              <div style={styles.heroMetaRow}>
                <div>
                  <div style={styles.heroScore}>4.9 / 5</div>
                  <div>Average patient experience rating</div>
                </div>
                <div>
                  <strong>Modules:</strong> User • Doctor • Vendor • Delivery
                </div>
              </div>
            </div>
          </header>

          {/* ABOUT QUICKMED */}
          <section style={styles.aboutQuickMedSection}>
            <div style={styles.sectionHeaderRow}>
              <h2 style={styles.sectionHeading}>What is QuickMed?</h2>
              <p style={styles.sectionSmallText}>
                QuickMed is a unified digital healthcare system. It combines user,
                doctor, vendor, and delivery modules so that ordering medicines, booking
                consultations, and tracking care happens in one continuous, real-time
                flow.
              </p>
            </div>
            <div style={styles.aboutQuickGrid}>
              <div style={styles.aboutCard}>
                QuickMed brings together patients, doctors, pharmacies, and delivery
                partners into a single ecosystem. Users can upload prescriptions, book
                both in-person and online consultations, and track each step—from
                prescription validation to dispatch and doorstep delivery—in real time.
                <ul style={styles.aboutList}>
                  <li>All modules stay in sync to reduce delays and confusion.</li>
                  <li>Digital prescriptions and records avoid paper loss and repetition.</li>
                  <li>Every family member's records stay organised under one account.</li>
                </ul>
              </div>
              <div style={styles.aboutHighlight}>
                <strong>Built for modern families:</strong> chronic patients, expecting
                mothers, infants, and elders can all use the same platform, with
                personalised journeys and reminders tuned to their stage of life.
              </div>
            </div>
          </section>

          {/* CARE PROGRAMS */}
          <section style={styles.careSection}>
            <div style={styles.sectionHeaderRow}>
              <h2 style={styles.sectionHeading}>Care programs on our website</h2>
              <p style={styles.careHeaderText}>
                We offer specialised programs for pregnancy care, baby & child health,
                and general family care. Each program combines doctor guidance, digital
                tracking, and pharmacy + delivery services.
              </p>
            </div>
            <div style={styles.careGrid}>
              {carePrograms.map((item, idx) => (
                <div
                  key={idx}
                  style={styles.careCard}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    const img = e.currentTarget.querySelector('img');
                    if (img) img.style.transform = 'scale(1.06)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    const img = e.currentTarget.querySelector('img');
                    if (img) img.style.transform = 'scale(1.02)';
                  }}
                >
                  <div style={styles.careImageWrapper}>
                    <img src={item.image} alt={item.label} style={styles.careImage} />
                  </div>
                  <div style={styles.careBody}>
                    <div style={styles.careLabelRow}>
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                    <h3 style={styles.careTitle}>{item.label}</h3>
                    <p style={styles.careText}>{item.text}</p>
                    <div style={styles.careTagList}>
                      {item.tags.map((tag, i) => (
                        <span key={i} style={styles.careTag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* MODULES */}
          <section style={styles.modulesSection}>
            <div style={styles.sectionHeaderRow}>
              <h2 style={styles.sectionHeading}>Four integrated modules</h2>
              <p style={styles.sectionSmallText}>
                The website and app are powered by four modules that work together in
                real time. Every action—order, consult, dispatch, or delivery—is routed
                through these modules to keep care transparent and efficient.
              </p>
            </div>
            <div style={styles.modulesGrid}>
              {modules.map((mod, idx) => (
                <div
                  key={idx}
                  style={styles.moduleCard}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow =
                      '0 14px 34px rgba(0,0,0,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow =
                      '0 10px 30px rgba(0,0,0,0.05)';
                  }}
                >
                  <span style={styles.modulePill}>{mod.pill}</span>
                  <div style={styles.moduleTitleRow}>
                    <span style={styles.moduleIcon}>{mod.icon}</span>
                    <h3 style={styles.moduleTitle}>{mod.title}</h3>
                  </div>
                  <ul style={styles.moduleList}>
                    {mod.points.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* FLOW */}
          <section style={styles.flowSection}>
            <div style={styles.sectionHeaderRow}>
              <h2 style={styles.sectionHeading}>How QuickMed works (end-to-end)</h2>
              <p style={styles.sectionSmallText}>
                From the moment a user places an order or books a consultation, the
                platform coordinates doctors, vendors, and delivery agents to fulfil the
                request quickly and safely.
              </p>
            </div>
            <div style={styles.flowGrid}>
              <div>
                <div style={styles.flowList}>
                  {flowSteps.map((text, index) => (
                    <div key={index} style={styles.flowStep}>
                      <div style={styles.flowStepNumber}>STEP {index + 1}</div>
                      <div style={styles.flowStepText}>{text}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={styles.flowMiniMap}>
                <img
                  src="https://images.pexels.com/photos/7446670/pexels-photo-7446670.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Delivery agent following GPS route"
                  style={styles.flowImage}
                />
                <div style={styles.flowOverlay}>
                  Real-time GPS navigation guides delivery partners while live status
                  updates keep users informed from dispatch to doorstep.
                </div>
              </div>
            </div>
          </section>

          {/* TECH + WHY */}
          <section style={styles.techWhyWrapper}>
            <div style={styles.infoCard}>
              <h3 style={styles.infoTitle}>Technology & architecture</h3>
              <p>
                QuickMed runs on a secure, scalable architecture built to handle
                high-volume consultations and orders while protecting sensitive health
                data.
              </p>
              <ul style={styles.infoList}>
                {techPoints.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
            <div style={styles.infoCard}>
              <h3 style={styles.infoTitle}>Why QuickMed?</h3>
              <p>
                We focus on closing everyday gaps in healthcare—speed, transparency,
                availability, and continuity across different care providers.
              </p>
              <ul style={styles.infoList}>
                {whyPoints.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* NUTSHELL */}
          <section style={styles.nutshellSection}>
            <h2 style={styles.sectionHeading}>In a nutshell</h2>
            <p style={styles.nutshellText}>
              QuickMed is a complete digital healthcare system that unites users,
              doctors, vendors, and delivery teams on one platform—simplifying services,
              improving accessibility, and ensuring timely care when it matters most.
            </p>
          </section>

          {/* TEAM */}
          <section style={styles.teamSection}>
            <h2 style={styles.teamTitle}>Clinical & digital leadership</h2>
            <div style={styles.teamGrid}>
              {teamMembers.map((member, idx) => (
                <div
                  key={idx}
                  style={styles.teamMember}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow =
                      '0 16px 40px rgba(0,0,0,0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow =
                      '0 10px 30px rgba(0,0,0,0.06)';
                  }}
                >
                  <div style={styles.memberAvatar}>{member.avatar}</div>
                  <h3 style={styles.memberName}>{member.name}</h3>
                  <p style={styles.memberRole}>{member.role}</p>
                  <p style={styles.memberBio}>{member.bio}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section style={styles.ctaSection}>
            <h2 style={styles.ctaTitle}>Ready to experience QuickMed?</h2>
            <p style={styles.ctaDescription}>
              Start with a pregnancy consult, book a baby vaccination, or order your
              monthly medicines. Your family's complete healthcare journey—from
              appointments and prescriptions to delivery and records—can live in one
              simple, secure place.
            </p>
            <div style={styles.ctaButtons}>
              <button
                style={styles.btnPrimary}
                onClick={handleBookAppointment}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = MINT;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow =
                    '0 10px 24px rgba(0,150,136,0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = PRIMARY;
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow =
                    '0 6px 18px rgba(0,150,136,0.4)';
                }}
              >
                Book Appointment
              </button>
              <button
                style={styles.btnSecondary}
                onClick={handleLearnMore}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = PRIMARY;
                  e.currentTarget.style.color = WHITE;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = PRIMARY;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Learn More
              </button>
            </div>
          </section>
        </div>
      </section>

      {/* MODALS */}
      {showLearnMoreModal && <LearnMoreModal onClose={closeLearnMoreModal} />}
      {showAppointmentData && (
        <AppointmentDataModal 
          onClose={closeAppointmentData}
          onProceed={handleAppointmentProceed}
        />
      )}
      {showLoginPrompt && (
        <LoginPromptModal
          onConfirm={handleLoginConfirm}
          onCancel={handleLoginCancel}
        />
      )}
    </>
  );
};

export default AboutUs;