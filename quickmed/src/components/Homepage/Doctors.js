import React, { useState, useEffect } from 'react';

const Doctors = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width <= 1024 && width > 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    // Add fade-in animation
    setIsVisible(true);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Hide navbar and body overflow when modal is open
  useEffect(() => {
    if (selectedDoctor) {
      document.body.style.overflow = 'hidden';
      
      const navbarSelectors = [
        'header',
        'nav',
        '.navbar',
        '[class*="navbar"]',
        '[class*="header"]',
        '[class*="nav"]'
      ];
      
      navbarSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
          if (!element.hasAttribute('data-original-display')) {
            element.setAttribute('data-original-display', element.style.display || '');
          }
          element.style.display = 'none';
        });
      });
    } else {
      document.body.style.overflow = 'unset';
      
      const elements = document.querySelectorAll('[data-original-display]');
      elements.forEach(element => {
        const originalDisplay = element.getAttribute('data-original-display');
        element.style.display = originalDisplay;
        element.removeAttribute('data-original-display');
      });
    }
  }, [selectedDoctor]);

  const styles = {
    // Main Doctors Section with Bubble Background
    doctors: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #E0F2F1 0%, #FFFFFF 50%, #E0F2F1 100%)',
      position: 'relative',
      overflow: 'hidden',
      padding: isMobile ? '4rem 1rem' : isTablet ? '5rem 2rem' : '6rem 2rem',
    },
    floatingElements: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 1,
    },
    floatingElement: {
      position: 'absolute',
      background: 'rgba(0, 150, 136, 0.1)',
      borderRadius: '50%',
      animation: 'float 6s ease-in-out infinite',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 2,
    },
    sectionTitle: {
      fontSize: isMobile ? '2.5rem' : isTablet ? '3rem' : '3.5rem',
      textAlign: 'center',
      marginBottom: '1rem',
      color: '#124441',
      fontWeight: '700',
      background: 'linear-gradient(45deg, #009688, #4DB6AC)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease-out',
    },
    sectionSubtitle: {
      fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem',
      textAlign: 'center',
      marginBottom: isMobile ? '3rem' : '4rem',
      color: '#4F6F6B',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease-out 0.2s',
    },
    doctorsGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
      gap: isMobile ? '1.5rem' : '2rem',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease-out 0.4s',
    },
    doctorCard: {
      padding: isMobile ? '1.5rem' : '2rem',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      boxShadow: '0 8px 30px rgba(0, 150, 136, 0.1)',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      position: 'relative',
      backdropFilter: 'blur(10px)',
      border: '2px solid transparent',
    },
    doctorImage: {
      width: isMobile ? '100px' : '120px',
      height: isMobile ? '100px' : '120px',
      borderRadius: '50%',
      backgroundColor: '#E0F2F1',
      margin: '0 auto 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: isMobile ? '1.5rem' : '2rem',
      color: '#009688',
      border: '4px solid #4DB6AC',
    },
    rating: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      backgroundColor: '#FFD700',
      color: '#000',
      padding: '0.3rem 0.8rem',
      borderRadius: '15px',
      fontSize: '0.9rem',
      fontWeight: 'bold',
    },
    doctorName: {
      fontSize: isMobile ? '1.2rem' : '1.3rem',
      marginBottom: '0.5rem',
      color: '#124441',
      fontWeight: '600',
    },
    doctorSpecialty: {
      fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem',
      marginBottom: '0.5rem',
      color: '#009688',
      fontWeight: '500',
    },
    doctorExperience: {
      color: '#4F6F6B',
      marginBottom: '1.5rem',
      fontSize: isMobile ? '0.9rem' : '1rem',
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.8rem',
    },
    viewProfileButton: {
      padding: isMobile ? '0.6rem 1.2rem' : '0.8rem 1.5rem',
      backgroundColor: '#009688',
      color: 'white',
      border: '2px solid #009688',
      borderRadius: '25px',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      fontSize: isMobile ? '0.9rem' : '1rem',
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
    },
    // Profile Modal Styles
    profileModal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(18, 68, 65, 0.9)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: isMobile ? '1rem' : '2rem',
      backdropFilter: 'blur(5px)',
    },
    profileContent: {
      backgroundColor: 'white',
      padding: isMobile ? '1.5rem' : '2.5rem',
      borderRadius: '20px',
      maxWidth: '600px',
      width: '100%',
      maxHeight: '90vh',
      overflowY: 'auto',
      position: 'relative',
      boxShadow: '0 25px 50px rgba(18, 68, 65, 0.3)',
    },
    closeButton: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      background: 'none',
      border: 'none',
      fontSize: '1.5rem',
      cursor: 'pointer',
      color: '#009688',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
      zIndex: 1001,
    },
    profileHeader: {
      textAlign: 'center',
      marginBottom: '2rem',
    },
    profileImage: {
      width: isMobile ? '120px' : '150px',
      height: isMobile ? '120px' : '150px',
      borderRadius: '50%',
      backgroundColor: '#E0F2F1',
      margin: '0 auto 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: isMobile ? '2rem' : '2.5rem',
      color: '#009688',
      border: '4px solid #4DB6AC',
    },
    profileName: {
      fontSize: isMobile ? '1.5rem' : '1.8rem',
      marginBottom: '0.5rem',
      color: '#124441',
      fontWeight: '600',
    },
    profileSpecialty: {
      fontSize: isMobile ? '1.1rem' : '1.3rem',
      marginBottom: '0.5rem',
      color: '#009688',
      fontWeight: '500',
    },
    profileRating: {
      backgroundColor: '#FFD700',
      color: '#000',
      padding: '0.3rem 0.8rem',
      borderRadius: '15px',
      fontSize: '0.9rem',
      fontWeight: 'bold',
      display: 'inline-block',
      marginBottom: '1rem',
    },
    profileDetails: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: '1rem',
      marginBottom: '2rem',
    },
    detailItem: {
      padding: '1rem',
      backgroundColor: '#f8f9fa',
      borderRadius: '10px',
      textAlign: 'left',
    },
    detailLabel: {
      fontWeight: '600',
      color: '#124441',
      marginBottom: '0.3rem',
      fontSize: isMobile ? '0.85rem' : '0.9rem',
    },
    detailValue: {
      color: '#4F6F6B',
      fontSize: isMobile ? '0.85rem' : '0.9rem',
    },
    fullWidthDetail: {
      gridColumn: '1 / -1',
    },
    // Consultation Information Styles
    consultationInfo: {
      backgroundColor: '#E0F2F1',
      border: '1px solid #4DB6AC',
      padding: '1.5rem',
      borderRadius: '15px',
      marginTop: '1.5rem',
      textAlign: 'left',
      fontSize: isMobile ? '0.9rem' : '1rem',
      lineHeight: '1.6',
    },
    infoTitle: {
      color: '#009688',
      fontWeight: '600',
      marginBottom: '0.8rem',
      fontSize: isMobile ? '1rem' : '1.1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    infoItem: {
      marginBottom: '0.5rem',
      color: '#124441',
      display: 'flex',
      alignItems: 'flex-start',
      paddingLeft: '0.5rem',
    },
    infoIcon: {
      marginRight: '0.5rem',
      color: '#009688',
      minWidth: '20px',
      fontWeight: 'bold',
    },
    contactSection: {
      marginTop: '1.5rem',
      paddingTop: '1rem',
      borderTop: '2px dashed #4DB6AC',
    },
    contactTitle: {
      color: '#009688',
      fontWeight: '600',
      marginBottom: '0.5rem',
      fontSize: isMobile ? '1rem' : '1.1rem',
    },
  };

  const doctors = [
    {
      id: 1,
      name: 'Dr. Priya Sharma',
      specialty: 'General Physician',
      experience: '10 years',
      rating: '4.9',
      initial: 'PS',
      education: 'MBBS, MD - General Medicine',
      languages: 'English, Hindi, Tamil',
      consultationFee: '₹500',
      availability: 'Mon-Sat: 9 AM - 6 PM',
      workingHours: { start: 9, end: 18 },
      about: 'Specialized in general medicine with 10 years of experience. Expertise in chronic disease management and preventive healthcare.',
      patients: '5000+',
      clinicName: 'Wellness Care Clinic',
      clinicAddress: '123 Health Street, Mumbai',
      contact: '+91-9876543210'
    },
    {
      id: 2,
      name: 'Dr. Rajesh Kumar',
      specialty: 'Cardiologist',
      experience: '12 years',
      rating: '4.8',
      initial: 'RK',
      education: 'MBBS, MD - Cardiology, DM - Cardiology',
      languages: 'English, Hindi',
      consultationFee: '₹800',
      availability: 'Mon-Fri: 10 AM - 4 PM',
      workingHours: { start: 10, end: 16 },
      about: 'Senior cardiologist with expertise in heart disease prevention and treatment. Performed 1000+ successful procedures.',
      patients: '3000+',
      clinicName: 'Heart Care Specialists',
      clinicAddress: '456 Cardiac Lane, Delhi',
      contact: '+91-9876543211'
    },
    {
      id: 3,
      name: 'Dr. Anjali Mehta',
      specialty: 'Pediatrician',
      experience: '8 years',
      rating: '4.9',
      initial: 'AM',
      education: 'MBBS, MD - Pediatrics',
      languages: 'English, Hindi, Gujarati',
      consultationFee: '₹600',
      availability: 'Mon-Sat: 8 AM - 5 PM',
      workingHours: { start: 8, end: 17 },
      about: 'Dedicated pediatrician with expertise in child healthcare, vaccination, and growth monitoring.',
      patients: '4000+',
      clinicName: 'Little Stars Pediatric Clinic',
      clinicAddress: '789 Child Care Road, Ahmedabad',
      contact: '+91-9876543212'
    },
    {
      id: 4,
      name: 'Dr. Sanjay Verma',
      specialty: 'Orthopedic',
      experience: '15 years',
      rating: '4.7',
      initial: 'SV',
      education: 'MBBS, MS - Orthopedics',
      languages: 'English, Hindi, Punjabi',
      consultationFee: '₹700',
      availability: 'Tue-Sat: 11 AM - 7 PM',
      workingHours: { start: 11, end: 19 },
      about: 'Orthopedic surgeon specializing in joint replacement and sports injuries. 15 years of surgical experience.',
      patients: '6000+',
      clinicName: 'Bone & Joint Care Center',
      clinicAddress: '321 Ortho Street, Chandigarh',
      contact: '+91-9876543213'
    },
    {
      id: 5,
      name: 'Dr. Neha Gupta',
      specialty: 'Dermatologist',
      experience: '9 years',
      rating: '4.8',
      initial: 'NG',
      education: 'MBBS, MD - Dermatology',
      languages: 'English, Hindi, Bengali',
      consultationFee: '₹750',
      availability: 'Mon-Fri: 9 AM - 5 PM',
      workingHours: { start: 9, end: 17 },
      about: 'Skin and hair specialist with expertise in cosmetic dermatology and skin disease treatment.',
      patients: '3500+',
      clinicName: 'Skin & Beauty Clinic',
      clinicAddress: '654 Skin Care Avenue, Kolkata',
      contact: '+91-9876543214'
    },
    {
      id: 6,
      name: 'Dr. Amit Patel',
      specialty: 'Psychiatrist',
      experience: '11 years',
      rating: '4.9',
      initial: 'AP',
      education: 'MBBS, MD - Psychiatry',
      languages: 'English, Hindi, Marathi',
      consultationFee: '₹900',
      availability: 'Mon-Sat: 10 AM - 6 PM',
      workingHours: { start: 10, end: 18 },
      about: 'Mental health specialist with expertise in anxiety, depression, and relationship counseling.',
      patients: '2000+',
      clinicName: 'Mind Wellness Center',
      clinicAddress: '987 Mental Health Road, Pune',
      contact: '+91-9876543215'
    }
  ];

  const handleViewProfile = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleCloseProfile = () => {
    setSelectedDoctor(null);
  };

  // Generate floating elements
  const floatingElements = Array.from({ length: isMobile ? 8 : 15 }, (_, i) => ({
    id: i,
    size: Math.random() * (isMobile ? 50 : 100) + (isMobile ? 30 : 50),
    left: Math.random() * 100,
    top: Math.random() * 100,
    animationDelay: Math.random() * 5,
  }));

  // Consultation Information Component
  const ConsultationInformation = ({ doctor }) => (
    <div style={styles.consultationInfo}>
      <h4 style={styles.infoTitle}>
        <span>ℹ️</span> Consultation Information
      </h4>
      
      <div style={styles.infoItem}>
        <span style={styles.infoIcon}>•</span>
        <span><strong>Consultation Fee:</strong> {doctor.consultationFee} per session</span>
      </div>
      <div style={styles.infoItem}>
        <span style={styles.infoIcon}>•</span>
        <span><strong>Average Session Duration:</strong> 15-20 minutes</span>
      </div>
      <div style={styles.infoItem}>
        <span style={styles.infoIcon}>•</span>
        <span><strong>Mode of Consultation:</strong> In-person at clinic</span>
      </div>
      <div style={styles.infoItem}>
        <span style={styles.infoIcon}>•</span>
        <span><strong>Follow-up Sessions:</strong> Recommended as per treatment plan</span>
      </div>
      <div style={styles.infoItem}>
        <span style={styles.infoIcon}>•</span>
        <span><strong>Payment Methods:</strong> Cash, UPI, Credit/Debit Cards</span>
      </div>
      
      <div style={styles.contactSection}>
        <h5 style={styles.contactTitle}> Clinic Address</h5>
        <div style={styles.infoItem}>
          <span style={styles.infoIcon}></span>
          <span>{doctor.clinicName}</span>
        </div>
        <div style={styles.infoItem}>
          <span style={styles.infoIcon}></span>
          <span>{doctor.clinicAddress}</span>
        </div>
        <div style={styles.infoItem}>
          <span style={styles.infoIcon}></span>
          <span>{doctor.contact}</span>
        </div>
      </div>
    </div>
  );

  return (
    <section style={styles.doctors}>
      {/* Floating Background Elements */}
      <div style={styles.floatingElements}>
        {floatingElements.map((element) => (
          <div
            key={element.id}
            style={{
              ...styles.floatingElement,
              width: element.size,
              height: element.size,
              left: `${element.left}%`,
              top: `${element.top}%`,
              animationDelay: `${element.animationDelay}s`,
            }}
          />
        ))}
      </div>

      <div style={styles.container}>
        <h2 style={styles.sectionTitle}>
          Our Medical Experts
        </h2>
        <p style={styles.sectionSubtitle}>
          Connect with certified healthcare professionals at their clinics
        </p>
        
        <div style={styles.doctorsGrid}>
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              style={styles.doctorCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 150, 136, 0.15)';
                e.currentTarget.style.borderColor = '#011210ff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 150, 136, 0.1)';
                e.currentTarget.style.borderColor = 'transparent';
              }}
            >
              <div style={styles.rating}>⭐ {doctor.rating}</div>
              <div style={styles.doctorImage}>{doctor.initial}</div>
              <h3 style={styles.doctorName}>{doctor.name}</h3>
              <p style={styles.doctorSpecialty}>{doctor.specialty}</p>
              <p style={styles.doctorExperience}>Experience: {doctor.experience}</p>
              <p style={{...styles.doctorExperience, fontSize: '0.8rem', color: '#009688', fontWeight: '500'}}>
                Available: {doctor.availability}
              </p>
              
              <div style={styles.buttonContainer}>
                <button
                  style={styles.viewProfileButton}
                  onClick={() => handleViewProfile(doctor)}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#00796B';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 5px 15px rgba(0, 150, 136, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#009688';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  View Profile & Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Doctor Profile Modal */}
        {selectedDoctor && (
          <div style={styles.profileModal} onClick={handleCloseProfile}>
            <div style={styles.profileContent} onClick={(e) => e.stopPropagation()}>
              <button 
                style={styles.closeButton}
                onClick={handleCloseProfile}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#E0F2F1';
                  e.target.style.color = '#009688';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#009688';
                }}
              >
                ×
              </button>
              
              <div style={styles.profileHeader}>
                <div style={styles.profileImage}>{selectedDoctor.initial}</div>
                <h2 style={styles.profileName}>{selectedDoctor.name}</h2>
                <p style={styles.profileSpecialty}>{selectedDoctor.specialty}</p>
                <div style={styles.profileRating}>⭐ {selectedDoctor.rating} Rating</div>
              </div>

              <div style={styles.profileDetails}>
                <div style={styles.detailItem}>
                  <div style={styles.detailLabel}>Education</div>
                  <div style={styles.detailValue}>{selectedDoctor.education}</div>
                </div>
                <div style={styles.detailItem}>
                  <div style={styles.detailLabel}>Experience</div>
                  <div style={styles.detailValue}>{selectedDoctor.experience}</div>
                </div>
                <div style={styles.detailItem}>
                  <div style={styles.detailLabel}>Languages</div>
                  <div style={styles.detailValue}>{selectedDoctor.languages}</div>
                </div>
                <div style={styles.detailItem}>
                  <div style={styles.detailLabel}>Fee</div>
                  <div style={styles.detailValue}>{selectedDoctor.consultationFee}</div>
                </div>
                <div style={{...styles.detailItem, ...styles.fullWidthDetail}}>
                  <div style={styles.detailLabel}>Availability</div>
                  <div style={styles.detailValue}>{selectedDoctor.availability}</div>
                </div>
                <div style={{...styles.detailItem, ...styles.fullWidthDetail}}>
                  <div style={styles.detailLabel}>About</div>
                  <div style={styles.detailValue}>{selectedDoctor.about}</div>
                </div>
              </div>

              {/* Consultation Information Section */}
              <ConsultationInformation doctor={selectedDoctor} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Doctors;