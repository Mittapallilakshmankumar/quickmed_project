import React, { useState, useEffect } from 'react';

// Main Services Component
const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const styles = {
    // Main Services Section with Bubble Background
    services: {
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
      color: '#009688',
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
    servicesGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
      gap: isMobile ? '1.5rem' : '2rem',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease-out 0.4s',
    },
    serviceCard: {
      padding: isMobile ? '2rem 1.5rem' : '2.5rem',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '20px',
      boxShadow: '0 8px 30px rgba(0, 150, 136, 0.1)',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      border: '2px solid transparent',
      backdropFilter: 'blur(10px)',
      position: 'relative',
      overflow: 'hidden',
    },
    serviceIcon: {
      fontSize: isMobile ? '3.5rem' : '4rem',
      marginBottom: '1.5rem',
      background: 'linear-gradient(45deg, #009688, #4DB6AC)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    serviceTitle: {
      fontSize: isMobile ? '1.3rem' : '1.5rem',
      marginBottom: '1rem',
      color: '#124441',
      fontWeight: '600',
    },
    serviceDescription: {
      color: '#4F6F6B',
      lineHeight: '1.6',
      marginBottom: '2rem',
      fontSize: isMobile ? '0.9rem' : '1rem',
    },
    serviceFeatures: {
      listStyle: 'none',
      padding: '0',
      margin: '1.5rem 0',
      textAlign: 'left',
    },
    serviceFeatureItem: {
      padding: '0.5rem 0',
      color: '#4F6F6B',
      fontSize: isMobile ? '0.85rem' : '0.95rem',
      position: 'relative',
      paddingLeft: '1.5rem',
    },
    featureBullet: {
      position: 'absolute',
      left: '0',
      color: '#009688',
      fontWeight: 'bold',
    },
    learnMoreButton: {
      padding: isMobile ? '0.7rem 1.2rem' : '0.8rem 1.5rem',
      backgroundColor: 'transparent',
      color: '#009688',
      border: '2px solid #009688',
      borderRadius: '25px',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      fontSize: isMobile ? '0.9rem' : '1rem',
      position: 'relative',
      overflow: 'hidden',
    },
    modalOverlay: {
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: '1000',
      padding: isMobile ? '1rem' : '2rem',
      backdropFilter: 'blur(5px)',
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: isMobile ? '2rem' : '2.5rem',
      maxWidth: '800px',
      width: '100%',
      maxHeight: '90vh',
      overflowY: 'auto',
      position: 'relative',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
    },
    modalClose: {
      position: 'absolute',
      top: '1rem',
      right: '1.5rem',
      background: 'none',
      border: 'none',
      fontSize: '2rem',
      cursor: 'pointer',
      color: '#4F6F6B',
      fontWeight: '300',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      transition: 'all 0.3s ease',
    },
    modalHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem',
      marginBottom: '2rem',
      paddingBottom: '1.5rem',
      borderBottom: '2px solid #E0F2F1',
    },
    modalIcon: {
      fontSize: isMobile ? '2.5rem' : '3rem',
      background: 'linear-gradient(45deg, #009688, #4DB6AC)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    modalTitle: {
      fontSize: isMobile ? '1.5rem' : '2rem',
      color: '#124441',
      fontWeight: '700',
      marginBottom: '0.5rem',
    },
    modalDescription: {
      fontSize: isMobile ? '0.9rem' : '1.1rem',
      color: '#4F6F6B',
      margin: '0',
    },
    modalBody: {
      marginBottom: '2rem',
    },
    modalSection: {
      marginBottom: '2rem',
    },
    modalSectionTitle: {
      fontSize: isMobile ? '1.1rem' : '1.3rem',
      color: '#009688',
      fontWeight: '600',
      marginBottom: '1rem',
    },
    modalText: {
      color: '#4F6F6B',
      lineHeight: '1.6',
      fontSize: isMobile ? '0.9rem' : '1rem',
    },
    modalList: {
      listStyle: 'none',
      padding: '0',
      margin: '0',
    },
    modalListItem: {
      padding: '0.5rem 0',
      color: '#4F6F6B',
      fontSize: isMobile ? '0.9rem' : '1rem',
      position: 'relative',
      paddingLeft: '1.5rem',
      lineHeight: '1.5',
    },
    modalProcess: {
      listStyle: 'none',
      padding: '0',
      margin: '0',
      counterReset: 'step-counter',
    },
    modalProcessItem: {
      padding: '0.8rem 0',
      color: '#4F6F6B',
      fontSize: isMobile ? '0.9rem' : '1rem',
      position: 'relative',
      paddingLeft: '2.5rem',
      lineHeight: '1.5',
      counterIncrement: 'step-counter',
    },
    processNumber: {
      position: 'absolute',
      left: '0',
      width: '1.8rem',
      height: '1.8rem',
      backgroundColor: '#009688',
      color: 'white',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.9rem',
      fontWeight: '600',
    },
    modalDetailsGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: isMobile ? '1rem' : '2rem',
      marginTop: '2rem',
      padding: '1.5rem',
      backgroundColor: '#E0F2F1',
      borderRadius: '15px',
    },
    detailItem: {
      textAlign: 'left',
    },
    detailTitle: {
      fontSize: isMobile ? '1rem' : '1.1rem',
      color: '#124441',
      fontWeight: '600',
      marginBottom: '0.5rem',
    },
    detailText: {
      color: '#4F6F6B',
      fontSize: isMobile ? '0.9rem' : '1rem',
      lineHeight: '1.5',
      margin: '0',
    },
  };

  const services = [
    {
      title: 'Medicine Delivery',
      description: 'Get prescribed medicines delivered to your home within 2 hours',
      features: ['24/7 Delivery', 'Prescription Upload', 'Generic Alternatives', 'Real-time Tracking'],
      details: {
        overview: "Our fast and reliable medicine delivery service ensures you get your prescribed medications without leaving your home. We partner with licensed pharmacies to provide authentic medicines with proper storage and handling.",
        benefits: [
          "Free delivery on orders above $25",
          "Real-time order tracking",
          "Temperature-sensitive packaging",
          "Prescription verification",
          "Insurance claim support",
          "Emergency delivery within 1 hour"
        ],
        process: [
          "Upload your prescription or select from our medicine database",
          "Select medicines from verified pharmacies",
          "Choose delivery time slot (2-hour, 4-hour, or scheduled)",
          "Track your order in real-time",
          "Safe and contactless delivery at your doorstep",
          "Digital invoice and prescription storage"
        ],
        pricing: "Starting from $2.99 delivery fee. Free for emergency medications and orders above $25.",
        duration: "2-4 hours standard delivery, 1-hour emergency delivery available",
        coverage: "Available in all major cities. Expanding to suburban areas soon."
      },
      
    },
    {
      title: 'Online Consultation',
      description: 'Video calls with certified doctors and specialists',
      features: ['Instant Booking', 'Multiple Specialties', 'E-Prescriptions', 'Follow-up Care'],
      details: {
        overview: "Connect with board-certified doctors through secure video consultations. Get medical advice, prescriptions, and specialist referrals from the comfort of your home. Our platform is HIPAA compliant ensuring complete privacy of your health data.",
        benefits: [
          "100+ certified doctors across 15+ specialties",
          "Secure and private video sessions",
          "Instant e-prescriptions sent directly to your pharmacy",
          "Follow-up consultations included",
          "Mental health counseling available",
          "Second opinion services"
        ],
        process: [
          "Choose your doctor and specialty or use our 'Instant Consult' feature",
          "Book appointment (instant or scheduled for later)",
          "Complete pre-consultation health questionnaire",
          "Join secure video call at appointment time",
          "Receive diagnosis, treatment plan, and e-prescription",
          "Access consultation summary in your health records"
        ],
        pricing: "Starting from $25 per consultation. Insurance accepted from major providers.",
        duration: "15-30 minutes per session. Extended sessions available.",
        coverage: "Available in 50 states. Doctors licensed in multiple states for continuity of care."
      },
      
    },
    {
      title: 'Emergency Care',
      description: 'Immediate medical assistance for urgent health issues',
      features: ['24/7 Availability', 'Ambulance Service', 'Emergency Kit', 'GPS Tracking'],
      details: {
        overview: "24/7 emergency medical support with instant response teams. We provide immediate assistance, ambulance services, and emergency medical guidance. Our emergency response teams are trained in advanced life support and can handle critical situations until hospital arrival.",
        benefits: [
          "Instant response within 2 minutes of call",
          "GPS-enabled ambulance tracking with ETA updates",
          "Emergency medical guidance while help arrives",
          "Hospital coordination and pre-alerts",
          "Family notification system",
          "Emergency medical kit delivery within 15 minutes"
        ],
        process: [
          "Call our 24/7 emergency helpline",
          "Describe emergency situation to trained dispatcher",
          "Receive immediate first-aid guidance over phone",
          "Ambulance dispatched with paramedic team if needed",
          "Continuous monitoring during transit",
          "Hospital admission coordination and handover"
        ],
        pricing: "Emergency consultation: Free. Ambulance: $50-$150 based on distance. Insurance coverage verification available.",
        duration: "Immediate response, 15-minute ambulance ETA in urban areas",
        coverage: "Available in metropolitan areas 24/7. Rural coverage with partner networks."
      },
      
    },
    {
      title: 'Baby Care Products',
      description: 'Premium quality baby care essentials and healthcare products',
      features: ['Organic Products', 'Diapers & Wipes', 'Baby Skincare', 'Feeding Essentials'],
      details: {
        overview: "Complete range of certified baby care products including diapers, skincare, feeding essentials, and healthcare items. All products are dermatologically tested and safe for your baby's delicate skin. We offer organic, hypoallergenic options for sensitive skin.",
        benefits: [
          "100% organic and hypoallergenic certified products",
          "Dermatologist tested and pediatrician approved",
          "Age-specific product ranges (0-3 months, 3-12 months, 1-3 years)",
          "Free delivery on bulk orders",
          "Expert baby care guidance included",
          "Subscription boxes with developmental toys"
        ],
        process: [
          "Browse age-appropriate products with detailed descriptions",
          "Select from trusted brands like Pampers, Johnson's, etc.",
          "Choose delivery schedule (one-time or subscription)",
          "Get expert recommendations based on baby's age and needs",
          "Regular subscription boxes delivered monthly",
          "Easy returns and exchanges for unused products"
        ],
        pricing: "Products starting from $5. Subscription boxes from $35/month. First box 20% off.",
        duration: "Same-day delivery available in metro areas, 1-2 days elsewhere",
        coverage: "Nationwide delivery. International shipping available for select products."
      },
      
    },
    {
      title: 'PregnancyCare for Women',
      description: 'Comprehensive prenatal and postnatal care services',
      features: ['Prenatal Checkups', 'Nutrition Guidance', 'Yoga Sessions', 'Postnatal Care'],
      details: {
        overview: "Specialized healthcare services for expecting and new mothers. Our pregnancy care program includes medical checkups, nutritional guidance, fitness sessions, and emotional support throughout the pregnancy journey and beyond.",
        benefits: [
          "Regular prenatal checkups with obstetricians",
          "Personalized nutrition plans by dietitians",
          "Pregnancy yoga and fitness classes",
          "Mental wellness support and counseling",
          "Postnatal recovery care",
          "Lactation consultation and support"
        ],
        process: [
          "Initial pregnancy assessment and risk evaluation",
          "Customized care plan creation with trimester-wise milestones",
          "Regular monitoring with virtual checkups",
          "Delivery preparation classes and hospital bag checklist",
          "Birth plan creation and partner involvement",
          "Postnatal recovery program for 3 months"
        ],
        pricing: "Packages starting from $99/month. Complete pregnancy package: $799. Insurance coverage available.",
        duration: "Complete program: 9 months + 3 months postnatal support",
        coverage: "Available nationwide with local hospital partnerships for delivery."
      },
      
    },
    {
      title: 'Health Checkups',
      description: 'Comprehensive health packages for all ages',
      features: ['Custom Packages', 'Doctor Consultation', 'Diet Plans', 'Annual Tracking'],
      details: {
        overview: "Preventive health checkups designed for different age groups and health conditions. Comprehensive packages with detailed reports and specialist consultations. Early detection of health issues with advanced diagnostic tests.",
        benefits: [
          "Age-specific packages (20-30, 30-40, 40-50, 50+, Senior Citizen)",
          "Comprehensive health assessment with 50+ parameters",
          "Specialist doctor consultation included",
          "Personalized diet and exercise plans",
          "Annual health tracking with comparison reports",
          "Family health history analysis"
        ],
        process: [
          "Choose health package based on age and health concerns",
          "Complete tests at our partner labs or home collection",
          "Comprehensive report generation with risk analysis",
          "Specialist doctor consultation to review results",
          "Receive personalized health plan and recommendations",
          "6-month follow-up and progress tracking"
        ],
        pricing: "Packages starting from $99. Executive package: $299. Family packages (4+ members): 20% discount.",
        duration: "2-4 hours for complete checkup. Reports within 24-48 hours.",
        coverage: "Lab network across all states. Home sample collection available."
      },
      
    }
  ];

  const openModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
    document.body.style.overflow = 'auto';
  };

  // Generate floating elements
  const floatingElements = Array.from({ length: isMobile ? 8 : 15 }, (_, i) => ({
    id: i,
    size: Math.random() * (isMobile ? 50 : 100) + (isMobile ? 30 : 50),
    left: Math.random() * 100,
    top: Math.random() * 100,
    animationDelay: Math.random() * 5,
  }));

  return (
    <section style={styles.services}>
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
          Our Healthcare Services
        </h2>
        <p style={styles.sectionSubtitle}>
          Comprehensive healthcare solutions designed for your convenience and well-being
        </p>
        
        <div style={styles.servicesGrid}>
          {services.map((service, index) => (
            <div
              key={index}
              style={styles.serviceCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 150, 136, 0.15)';
                e.currentTarget.style.borderColor = '#009688';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 150, 136, 0.1)';
                e.currentTarget.style.borderColor = 'transparent';
              }}
            >
              <div style={styles.serviceIcon}>
                {service.icon}
              </div>
              <h3 style={styles.serviceTitle}>
                {service.title}
              </h3>
              <p style={styles.serviceDescription}>
                {service.description}
              </p>
              
              <ul style={styles.serviceFeatures}>
                {service.features.map((feature, idx) => (
                  <li key={idx} style={styles.serviceFeatureItem}>
                    <span style={styles.featureBullet}>•</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                style={styles.learnMoreButton}
                onClick={() => openModal(service)}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#009688';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#009688';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                View Details →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Service Details Modal */}
      {isModalOpen && selectedService && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button 
              style={styles.modalClose}
              onClick={closeModal}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#E0F2F1';
                e.target.style.color = '#009688';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#4F6F6B';
              }}
            >
              ×
            </button>
           
            <div style={styles.modalHeader}>
              <div style={styles.modalIcon}>
                {selectedService.icon}
              </div>
              <div>
                <h2 style={styles.modalTitle}>
                  {selectedService.title}
                </h2>
                <p style={styles.modalDescription}>
                  {selectedService.description}
                </p>
              </div>
            </div>

            <div style={styles.modalBody}>
              <div style={styles.modalSection}>
                <h3 style={styles.modalSectionTitle}>Service Overview</h3>
                <p style={styles.modalText}>{selectedService.details.overview}</p>
              </div>

              <div style={styles.modalSection}>
                <h3 style={styles.modalSectionTitle}>Key Benefits</h3>
                <ul style={styles.modalList}>
                  {selectedService.details.benefits.map((benefit, index) => (
                    <li key={index} style={styles.modalListItem}>
                      <span style={styles.featureBullet}>•</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={styles.modalSection}>
                <h3 style={styles.modalSectionTitle}>How It Works</h3>
                <ol style={styles.modalProcess}>
                  {selectedService.details.process.map((step, index) => (
                    <li key={index} style={styles.modalProcessItem}>
                      <span style={styles.processNumber}>
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <div style={styles.modalDetailsGrid}>
                <div style={styles.detailItem}>
                  <h4 style={styles.detailTitle}>Pricing</h4>
                  <p style={styles.detailText}>{selectedService.details.pricing}</p>
                </div>
                <div style={styles.detailItem}>
                  <h4 style={styles.detailTitle}>Duration</h4>
                  <p style={styles.detailText}>{selectedService.details.duration}</p>
                </div>
                {selectedService.details.coverage && (
                  <div style={styles.detailItem}>
                    <h4 style={styles.detailTitle}>Coverage</h4>
                    <p style={styles.detailText}>{selectedService.details.coverage}</p>
                  </div>
                )}
              </div>
            </div>

            <div style={{ textAlign: 'center', paddingTop: '1.5rem', borderTop: '2px solid #E0F2F1' }}>
              <button 
                style={{
                  padding: isMobile ? '0.7rem 1.5rem' : '0.8rem 2rem',
                  backgroundColor: 'transparent',
                  color: '#009688',
                  border: '2px solid #009688',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onClick={closeModal}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#009688';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#009688';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;