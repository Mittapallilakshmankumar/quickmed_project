import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

export default function Home() {
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showServiceDetails, setShowServiceDetails] = useState(null);
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [showInfoPage, setShowInfoPage] = useState(null); // 'medicine' or 'doctor'
  // const navigate = useNavigate();

  // ---------- SETUP ----------
  useEffect(() => {
    setIsVisible(true);
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Initial welcome message
    setChatMessages([
      {
        id: 1,
        text: "Hello! I'm QuickMed Assistant. How can I help you today? 😊",
        isBot: true,
        timestamp: new Date(),
      },
    ]);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const colors = {
    primary: "#009688",
    mint: "#4DB6AC",
    softbg: "#E0F2F1",
    white: "#FFFFFF",
    darktext: "#124441",
    softtext: "#4F6F6B",
  };

  // ---------- AUTH NAV ----------
  const handleOrderMedicines = () => {
    setShowInfoPage("medicine");
  };

  const handleConsultDoctor = () => {
    setShowInfoPage("doctor");
  };

  const handleCloseInfoPage = () => {
    setShowInfoPage(null);
  };

  // ---------- SERVICE DETAIL HANDLERS ----------
  const handleMedicineDeliveryClick = () => setShowServiceDetails("medicineDelivery");
  const handleDoctorConsultationClick = () => setShowServiceDetails("doctorConsultation");
  const handleLiveTrackingClick = () => setShowServiceDetails("liveTracking");
  const handleHealthPackagesClick = () => setShowServiceDetails("healthPackages");
  const handlePregnancyCareClick = () => setShowServiceDetails("pregnancyCare");
  const handleMedicalRecordsClick = () => setShowServiceDetails("medicalRecords");
  const closeServiceDetails = () => setShowServiceDetails(null);

  // ---------- EMERGENCY ----------
  const handleEmergencyContact = () => setShowEmergencyModal(true);

  const handleEmergencyCall = () => {
    window.open("tel:9392416962");
    setShowEmergencyModal(false);
    setTimeout(() => {
      alert(
        "Emergency call initiated. If the call doesn't connect automatically, please dial 9392416962 manually."
      );
    }, 500);
  };

  const handleEmergencyMessage = () => {
    const message =
      "EMERGENCY: I need immediate medical assistance! Please help.";
    window.open(
      `https://wa.me/9392416962?text=${encodeURIComponent(message)}`,
      "_blank"
    );
    setShowEmergencyModal(false);
  };

  const handleEmergencyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
          const message = `EMERGENCY: I need medical help! My location: ${locationUrl}`;
          window.open(
            `sms:9392416962?body=${encodeURIComponent(message)}`
          );
        },
        () => {
          const message =
            "EMERGENCY: I need immediate medical assistance! Please help.";
          window.open(
            `sms:9392416962?body=${encodeURIComponent(message)}`
          );
        }
      );
    } else {
      const message =
        "EMERGENCY: I need immediate medical assistance! Please help.";
      window.open(
        `sms:9392416962?body=${encodeURIComponent(message)}`
      );
    }
    setShowEmergencyModal(false);
  };

  const closeModal = () => setShowEmergencyModal(false);

  // ---------- CHATBOT ----------
  const toggleChatbot = () => setShowChatbot((prev) => !prev);

  const generateBotResponse = (userInput) => {
    const input = userInput.toLowerCase();

    if (input.includes("hello") || input.includes("hi") || input.includes("hey")) {
      return "Hello! I'm QuickMed Assistant. I can help you with medicine orders, doctor consultations, emergency services, and more! How can I assist you today? 🏥";
    } else if (input.includes("medicine") || input.includes("delivery")) {
      return " We offer fast medicine delivery in 30-40 minutes! You can order prescription or OTC medicines. Click on 'Order Medicines Now' to learn more about our service.";
    } else if (input.includes("doctor") || input.includes("consult")) {
      return " We have 100+ expert doctors available for online video consultations. You can consult with specialists from various fields. Click on 'Consult Doctor Online' to explore our services.";
    } else if (input.includes("emergency") || input.includes("urgent")) {
      return " For emergency medical assistance, please use our emergency contact feature above or call 9392416962 immediately. Our team is available 24/7 to help!";
    } else if (input.includes("price") || input.includes("cost")) {
      return " We offer competitive pricing with regular discounts! Medicine prices are market-competitive, and doctor consultations start from ₹199. Lab tests and health packages are also very affordable.";
    } else if (input.includes("time") || input.includes("delivery time")) {
      return "⏱ We guarantee medicine delivery within 30-40 minutes! Doctor consultations can be scheduled immediately or at your preferred time. Lab test results are delivered within 6-24 hours.";
    } else if (input.includes("login") || input.includes("sign up")) {
      return " You can access our services directly. For medicine delivery or doctor consultation, simply use the respective buttons to get started!";
    } else if (
      input.includes("pregnancy") ||
      input.includes("women") ||
      input.includes("maternity")
    ) {
      return " We offer specialized pregnancy care with expert gynecologists! Get free first consultation, personalized care plans, and 24/7 support throughout your pregnancy journey.";
    } else if (input.includes("thank") || input.includes("thanks")) {
      return "You're welcome!  Is there anything else I can help you with regarding our healthcare services?";
    } else {
      return (
        "I understand you're looking for: '" +
        userInput +
        "'. I can help you with:\n• Medicine delivery \n• Doctor consultations \n• Pregnancy care \n• Health packages \n• Emergency services \n• Pricing information \n\nHow can I assist you specifically?"
      );
    }
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const newUserMessage = {
      id: chatMessages.length + 1,
      text: userInput,
      isBot: false,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, newUserMessage]);
    const input = userInput;
    setUserInput("");

    setTimeout(() => {
      const botResponse = generateBotResponse(input);
      const newBotMessage = {
        id: chatMessages.length + 2,
        text: botResponse,
        isBot: true,
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, newBotMessage]);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  const quickReplies = [
    "How to order medicines?",
    "Book doctor appointment",
    "Pregnancy care services",
    "Emergency help",
    "Price information",
  ];

  const handleQuickReply = (reply) => {
    setUserInput(reply);
    setTimeout(() => handleSendMessage(), 100);
  };

  // ---------- DATA ----------
  const serviceDetails = {
    medicineDelivery: {
      title: " Medicine Delivery Service",
      description:
        "Get your prescribed and over-the-counter medicines delivered to your doorstep within 30–40 minutes. Our network of 500+ partner pharmacies ensures genuine medicines with safety and privacy.",
      features: [
        " 30–40 Minutes Guaranteed Delivery",
        " Prescription & OTC Medicines",
        " 500+ Partner Pharmacies",
        " Genuine & Safe Medicines",
        " Real-time Order Tracking",
        " Free Home Delivery",
      ],
      process: [
        "1. Upload your prescription or select OTC medicines",
        "2. Choose delivery address and time slot",
        "3. Make secure payment online",
        "4. Track your order in real-time",
        "5. Receive medicines at your doorstep",
      ],
    },
    doctorConsultation: {
      title: " Online Doctor Consultation",
      description:
        "Connect with experienced doctors via video call for comprehensive medical consultations. Get expert advice, prescriptions, and follow-up care from the comfort of your home.",
      features: [
        "100+ Expert Doctors",
        " HD Video Consultations",
        " 24/7 Availability",
        " Digital Prescriptions",
        " Medical Record Storage",
        " Complete Privacy",
      ],
      process: [
        "1. Choose your preferred doctor & specialty",
        "2. Book a convenient time slot",
        "3. Connect via secure video call",
        "4. Get diagnosis & prescription",
        "5. Follow-up consultations available",
      ],
    },
    liveTracking: {
      title: " Live Order Tracking",
      description:
        "Track your medical orders in real-time from dispatch to delivery. Get live updates, delivery executive details, and ETA for complete peace of mind.",
      features: [
        " Real-time GPS Tracking",
        " Delivery Executive Details",
        " Live ETA Updates",
        " Push Notifications",
        " Route Optimization",
        " Direct Communication",
      ],
      process: [
        "1. Order confirmed & dispatched",
        "2. Track live location on map",
        "3. Get real-time ETA updates",
        "4. Receive delivery notifications",
        "5. Safe & contactless delivery",
      ],
    },
    healthPackages: {
      title: " Comprehensive Health Packages",
      description:
        "Choose from curated health checkup packages for different age groups and health needs. Early detection & preventive care for a healthier life.",
      features: [
        " Basic Health Checkup",
        " Cardiac Care Package",
        " Diabetes Screening",
        " Pediatric Health Package",
        " Senior Citizen Package",
        " Executive Health Check",
      ],
      process: [
        "1. Select a suitable health package",
        "2. Book appointment at nearest lab",
        "3. Complete tests with expert care",
        "4. Receive detailed reports online",
        "5. Free doctor consultation included",
      ],
    },
    pregnancyCare: {
      title: " Pregnancy Care for Women",
      description:
        "Comprehensive maternity care with expert gynecologists. From conception to delivery, we provide complete support, monitoring, and guidance.",
      features: [
        " Expert Gynecologists",
        " Free First Consultation",
        " Personalized Care Plans",
        " 24/7 Support & Monitoring",
        " Regular Health Checkups",
        " Prenatal Vitamin Guidance",
      ],
      process: [
        "1. Book FREE first consultation",
        "2. Get personalized pregnancy plan",
        "3. Regular monitoring & checkups",
        "4. Nutrition & lifestyle guidance",
        "5. 24/7 emergency support",
      ],
    },
    medicalRecords: {
      title: "📁 Digital Medical Records",
      description:
        "Store and access all your medical records securely in one place. Share with doctors easily and maintain a complete health history.",
      features: [
        " Secure Cloud Storage",
        " Prescription Management",
        " Lab Report Archives",
        " Medicine History",
        " Doctor Access Sharing",
        " Anytime Access",
      ],
      process: [
        "1. Upload medical documents",
        "2. Organize by date & category",
        "3. Share with doctors securely",
        "4. Access from any device",
        "5. Set reminders for follow-ups",
      ],
    },
  };

  // Information pages data
  const infoPages = {
    medicine: {
      title: " Medicine Delivery Service",
      subtitle: "Get medicines delivered to your doorstep in 30-40 minutes!",
      features: [
        {
          icon: "",
          title: "Fast Delivery",
          description: "Guaranteed delivery within 30-40 minutes in your city"
        },
        {
          icon: "",
          title: "Wide Range",
          description: "Prescription medicines, OTC drugs, and health products"
        },
        {
          icon: "",
          title: "100% Genuine",
          description: "All medicines sourced from licensed pharmacies"
        },
        {
          icon: "",
          title: "Best Prices",
          description: "Competitive pricing with regular discounts"
        }
      ],
      howItWorks: [
        "1. Search for your required medicines",
        "2. Upload prescription (if required)",
        "3. Select delivery address and time",
        "4. Make secure payment",
        "5. Track delivery in real-time",
        "6. Receive at your doorstep"
      ],
      benefits: [
        "✅ No need to visit pharmacy physically",
        "✅ Save time and avoid queues",
        "✅ Contactless delivery option",
        "✅ Emergency delivery available",
        "✅ Prescription management",
        "✅ Medicine reminders"
      ]
    },
    doctor: {
      title: " Online Doctor Consultation",
      subtitle: "Connect with expert doctors via video call anytime, anywhere",
      features: [
        {
          icon: "",
          title: "Video Consultations",
          description: "HD quality video calls with doctors"
        },
        {
          icon: "",
          title: "24/7 Availability",
          description: "Doctors available round the clock"
        },
        {
          icon: "",
          title: "Multiple Specialties",
          description: "General physicians and specialists"
        },
        {
          icon: "",
          title: "Digital Records",
          description: "Secure storage of prescriptions and reports"
        }
      ],
      howItWorks: [
        "1. Choose your preferred doctor",
        "2. Select convenient time slot",
        "3. Connect via secure video call",
        "4. Discuss your health concerns",
        "5. Receive digital prescription",
        "6. Get follow-up recommendations"
      ],
      specialties: [
        " Neurology",
        "Cardiology",
        " Pediatrics",
        " Gynecology",
        " Orthopedics",
        " Pulmonology",
        " Dermatology",
        " Nutrition"
      ],
      benefits: [
        "✅ No travel required",
        "✅ Avoid clinic waiting times",
        "✅ Consult from home comfort",
        "✅ Privacy maintained",
        "✅ Second opinions available",
        "✅ Family consultations"
      ]
    }
  };

  const stats = [
    { number: "50,000+", label: "Happy Customers" },
    { number: "30–40 min", label: "Avg Delivery Time" },
    { number: "500+", label: "Partner Pharmacies" },
    { number: "100+", label: "Expert Doctors" },
    { number: "50+", label: "Cities Covered" },
    { number: "24/7", label: "Customer Support" },
  ];

  const services = [
    {
      name: "Medicine Delivery",
      icon: "",
      description:
        "Prescription and OTC medicines delivered to your doorstep within 30–40 minutes.",
      onClick: handleMedicineDeliveryClick,
    },
    {
      name: "Doctor Consultation",
      icon: "",
      description:
        "Video consultations with specialist doctors for comprehensive medical advice.",
      onClick: handleDoctorConsultationClick,
    },
    {
      name: "Live Tracking",
      icon: "",
      description:
        "Track your medical orders in real-time from dispatch to delivery.",
      onClick: handleLiveTrackingClick,
    },
    {
      name: "Health Packages",
      icon: "🩺",
      description:
        "Comprehensive health checkup packages for preventive care.",
      onClick: handleHealthPackagesClick,
    },
    {
      name: "Pregnancy Care",
      icon: "",
      description:
        "Specialized maternity care with expert gynecologists & 24/7 support.",
      onClick: handlePregnancyCareClick,
    },
    {
      name: "Medical Records",
      icon: "📁",
      description:
        "Digital storage and management of all your medical documents.",
      onClick: handleMedicalRecordsClick,
    },
  ];

  const features = [
    {
      title: "Lightning Fast Delivery",
      icon: "",
      description:
        "Get medicines delivered in 30–40 minutes with our optimized delivery network.",
    },
    {
      title: "100% Safe & Genuine",
      icon: "",
      description:
        "All medicines are sourced directly from licensed pharmacies with proper verification.",
    },
    {
      title: "Best Prices",
      icon: "",
      description:
        "Competitive pricing with regular discounts and offers on medicines and consultations.",
    },
    {
      title: "Expert Doctors",
      icon: "",
      description:
        "Consult experienced doctors from top hospitals across multiple specialties.",
    },
  ];

  const testimonials = [
    {
      name: "Rahul Sharma",
      location: "Mumbai",
      text: "QuickMed saved me during an emergency. Medicines were delivered in just 25 minutes! The service is truly life-saving.",
      rating: "⭐️⭐️⭐️⭐️⭐️",
    },
    {
      name: "Priya Patel",
      location: "Delhi",
      text: "The doctor consultation feature is amazing. I could connect with a specialist from home and get proper treatment.",
      rating: "⭐️⭐️⭐️⭐️⭐️",
    },
    {
      name: "Arun Kumar",
      location: "Bangalore",
      text: "Best healthcare app I have used. The live tracking feature kept me informed about my medicine delivery every step.",
      rating: "⭐️⭐️⭐️⭐️⭐️",
    },
  ];

  const emergencyOptions = [
    {
      title: " Emergency Call",
      description: "Direct voice call with emergency medical response team.",
      action: handleEmergencyCall,
    },
    {
      title: " WhatsApp Message",
      description: "Send immediate message with your details.",
      action: handleEmergencyMessage,
    },
    {
      title: " Share Location via SMS",
      description: "Send your current location through SMS for quick help.",
      action: handleEmergencyLocation,
    },
  ];

  // ---------- STYLES ----------
  const styles = {
    hero: {
      minHeight: isMobile ? "auto" : "100vh",
      background: `linear-gradient(135deg, ${colors.softbg} 0%, ${colors.white} 40%, ${colors.softbg} 100%)`,
      position: "relative",
      overflow: "hidden",
      padding: isMobile ? "2rem 1rem 2.5rem" : "3rem 1rem 3.5rem",
      boxSizing: "border-box",
    },
    heroContent: {
      maxWidth: "1200px",
      margin: "0 auto",
      position: "relative",
      zIndex: 2,
    },
    floatingElements: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: 1,
    },
    floatingElement: {
      position: "absolute",
      background: "rgba(0, 150, 136, 0.12)",
      borderRadius: "50%",
      animation: "float 6s ease-in-out infinite",
    },
    mainHero: {
      textAlign: "center",
      padding: isMobile ? "1.5rem 0 1rem" : "2.5rem 0 2rem",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.8s ease-out",
    },
    heroTitle: {
      fontSize: isMobile ? "2.4rem" : "clamp(2.6rem, 4.6vw, 3.8rem)",
      marginBottom: "0.8rem",
      color: colors.darktext,
      fontWeight: 800,
      lineHeight: 1.1,
      letterSpacing: "-0.02em",
    },
    heroSubtitle: {
      fontSize: isMobile ? "1.2rem" : "clamp(1.3rem, 2.4vw, 1.8rem)",
      marginBottom: "1rem",
      color: colors.primary,
      fontWeight: 600,
    },
    heroText: {
      fontSize: isMobile ? "0.98rem" : "1.05rem",
      lineHeight: 1.7,
      marginBottom: isMobile ? "1.8rem" : "2.2rem",
      color: colors.softtext,
      maxWidth: "780px",
      marginLeft: "auto",
      marginRight: "auto",
      fontWeight: 400,
    },
    ctaButtons: {
      display: "flex",
      gap: "1rem",
      justifyContent: "center",
      flexWrap: "wrap",
      marginBottom: isMobile ? "2.4rem" : "3rem",
      flexDirection: isMobile ? "column" : "row",
      alignItems: "center",
    },
    primaryButton: {
      padding: isMobile ? "0.9rem 1.8rem" : "1rem 2.2rem",
      backgroundColor: colors.primary,
      color: colors.white,
      border: "none",
      borderRadius: "999px",
      cursor: "pointer",
      fontSize: "0.98rem",
      fontWeight: "700",
      transition: "all 0.3s ease",
      boxShadow: "0 10px 25px rgba(0, 150, 136, 0.45)",
      width: isMobile ? "100%" : "auto",
      maxWidth: isMobile ? "320px" : "none",
    },
    secondaryButton: {
      padding: isMobile ? "0.9rem 1.8rem" : "1rem 2.2rem",
      backgroundColor: "transparent",
      color: colors.primary,
      border: `2px solid ${colors.primary}`,
      borderRadius: "999px",
      cursor: "pointer",
      fontSize: "0.98rem",
      fontWeight: "700",
      transition: "all 0.3s ease",
      boxShadow: "0 5px 16px rgba(0, 150, 136, 0.18)",
      width: isMobile ? "100%" : "auto",
      maxWidth: isMobile ? "320px" : "none",
    },
    statsSection: {
      display: "grid",
      gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
      gap: isMobile ? "1rem" : "1.5rem",
      marginBottom: isMobile ? "2.4rem" : "3.2rem",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.8s ease-out 0.15s",
    },
    statItem: {
      textAlign: "center",
      padding: isMobile ? "1rem" : "1.4rem 1.2rem",
      background: "rgba(255, 255, 255, 0.9)",
      borderRadius: "18px",
      backdropFilter: "blur(12px)",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.04)",
      border: `1px solid rgba(0, 150, 136, 0.1)`,
      transition: "all 0.25s ease",
    },
    statNumber: {
      fontSize: isMobile ? "1.5rem" : "1.9rem",
      fontWeight: 800,
      color: colors.primary,
      marginBottom: "0.35rem",
    },
    statLabel: {
      color: colors.softtext,
      fontSize: "0.8rem",
      fontWeight: 600,
      textTransform: "uppercase",
    },
    sectionTitle: {
      fontSize: isMobile ? "1.7rem" : "2rem",
      textAlign: "center",
      marginBottom: isMobile ? "1.5rem" : "2rem",
      color: colors.darktext,
      fontWeight: 700,
    },
    servicesSection: {
      marginBottom: isMobile ? "2.5rem" : "3rem",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.8s ease-out 0.3s",
    },
    servicesGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit,minmax(260px,1fr))",
      gap: isMobile ? "1.2rem" : "1.6rem",
    },
    serviceCard: {
      padding: isMobile ? "1.3rem" : "1.5rem",
      background: colors.white,
      borderRadius: "18px",
      boxShadow: "0 8px 22px rgba(0,0,0,0.05)",
      border: `1px solid rgba(0, 150, 136, 0.12)`,
      transition: "all 0.25s ease",
      textAlign: "left",
      cursor: "pointer",
    },
    serviceIcon: {
      fontSize: "2rem",
      marginBottom: "0.5rem",
    },
    serviceName: {
      fontSize: "1.05rem",
      fontWeight: 700,
      color: colors.darktext,
      marginBottom: "0.4rem",
    },
    serviceDescription: {
      fontSize: "0.9rem",
      color: colors.softtext,
      lineHeight: 1.55,
    },
    featuresSection: {
      marginBottom: isMobile ? "2.5rem" : "3rem",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.8s ease-out 0.45s",
    },
    featuresGridMain: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit,minmax(230px,1fr))",
      gap: isMobile ? "1.2rem" : "1.6rem",
    },
    featureCard: {
      padding: isMobile ? "1.2rem" : "1.5rem",
      background: colors.white,
      borderRadius: "18px",
      boxShadow: "0 8px 22px rgba(0,0,0,0.05)",
      border: `1px solid rgba(0, 150, 136, 0.1)`,
      textAlign: "left",
      transition: "all 0.25s ease",
    },
    featureIcon: {
      fontSize: "1.8rem",
      marginBottom: "0.6rem",
    },
    featureTitle: {
      fontSize: "1rem",
      fontWeight: 700,
      color: colors.darktext,
      marginBottom: "0.4rem",
    },
    featureDescription: {
      fontSize: "0.9rem",
      color: colors.softtext,
      lineHeight: 1.6,
    },
    testimonialsSection: {
      marginBottom: isMobile ? "2.5rem" : "3rem",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.8s ease-out 0.6s",
    },
    testimonialsGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit,minmax(260px,1fr))",
      gap: isMobile ? "1.2rem" : "1.6rem",
    },
    testimonialCard: {
      padding: isMobile ? "1.2rem" : "1.5rem",
      background: colors.white,
      borderRadius: "18px",
      boxShadow: "0 8px 22px rgba(0,0,0,0.05)",
      border: `1px solid rgba(77, 182, 172, 0.2)`,
      transition: "all 0.25s ease",
    },
    testimonialText: {
      fontSize: "0.95rem",
      color: colors.softtext,
      lineHeight: 1.6,
      marginBottom: "0.8rem",
      fontStyle: "italic",
    },
    testimonialAuthor: {
      fontSize: "0.9rem",
      fontWeight: 700,
      color: colors.darktext,
    },
    testimonialLocation: {
      fontSize: "0.8rem",
      color: "#8a9a96",
    },
    testimonialRating: {
      fontSize: "0.85rem",
      marginBottom: "0.3rem",
    },
    emergencySection: {
      marginTop: isMobile ? "1.5rem" : "2rem",
      padding: isMobile ? "1.3rem" : "1.7rem",
      background: "linear-gradient(135deg,#FFE5E5,#FFFFFF)",
      borderRadius: "20px",
      border: "1px solid rgba(211,47,47,0.25)",
      textAlign: "center",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.8s ease-out 0.75s",
    },
    emergencyTitle: {
      fontSize: isMobile ? "1.4rem" : "1.6rem",
      fontWeight: 700,
      color: "#D32F2F",
      marginBottom: "0.6rem",
    },
    emergencyText: {
      fontSize: "0.95rem",
      color: colors.softtext,
      maxWidth: "640px",
      margin: "0 auto 1.2rem",
      lineHeight: 1.6,
    },
    emergencyButton: {
      padding: isMobile ? "0.9rem 1.8rem" : "1rem 2.1rem",
      backgroundColor: "#FF6B6B",
      color: colors.white,
      border: "none",
      borderRadius: "999px",
      cursor: "pointer",
      fontSize: "0.98rem",
      fontWeight: 700,
      transition: "all 0.3s ease",
      boxShadow: "0 10px 26px rgba(255,107,107,0.55)",
    },

    // Chatbot
    chatbotContainer: {
      position: "fixed",
      bottom: isMobile ? "1rem" : "1.8rem",
      right: isMobile ? "1rem" : "2rem",
      zIndex: 1000,
    },
    chatbotButton: {
      width: isMobile ? "56px" : "64px",
      height: isMobile ? "56px" : "64px",
      borderRadius: "50%",
      backgroundColor: colors.primary,
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 12px 28px rgba(0,0,0,0.25)",
      transition: "all 0.3s ease",
      fontSize: isMobile ? "1.5rem" : "1.7rem",
      color: colors.white,
    },
    chatbotWindow: {
      position: "absolute",
      bottom: isMobile ? "64px" : "74px",
      right: 0,
      width: isMobile ? "calc(100vw - 2rem)" : "360px",
      height: isMobile ? "440px" : "460px",
      backgroundColor: colors.white,
      borderRadius: "18px",
      boxShadow: "0 18px 40px rgba(0,0,0,0.25)",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      border: `1px solid ${colors.softbg}`,
    },
    chatbotHeader: {
      backgroundColor: colors.primary,
      color: colors.white,
      padding: "0.9rem 1rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    chatbotTitle: {
      fontSize: "0.95rem",
      fontWeight: 700,
      display: "flex",
      alignItems: "center",
      gap: "0.35rem",
    },
    closeButton: {
      background: "none",
      border: "none",
      color: colors.white,
      fontSize: "1.1rem",
      cursor: "pointer",
    },
    chatMessages: {
      flex: 1,
      padding: "0.9rem",
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      gap: "0.7rem",
      backgroundColor: "#F5F7F7",
    },
    message: {
      maxWidth: "78%",
      padding: "0.7rem 0.9rem",
      borderRadius: "14px",
      fontSize: "0.85rem",
      lineHeight: 1.4,
      wordWrap: "break-word",
    },
    botMessage: {
      alignSelf: "flex-start",
      backgroundColor: colors.white,
      border: "1px solid #E0E4E4",
    },
    userMessage: {
      alignSelf: "flex-end",
      backgroundColor: colors.primary,
      color: colors.white,
    },
    quickReplies: {
      display: "flex",
      flexWrap: "wrap",
      gap: "0.4rem",
      padding: "0.5rem 0.8rem",
      backgroundColor: colors.white,
      borderTop: "1px solid #E0E4E4",
    },
    quickReply: {
      padding: "0.35rem 0.7rem",
      borderRadius: "999px",
      border: "none",
      fontSize: "0.75rem",
      backgroundColor: colors.softbg,
      color: colors.darktext,
      cursor: "pointer",
    },
    chatInputContainer: {
      display: "flex",
      padding: "0.6rem 0.7rem",
      backgroundColor: colors.white,
      borderTop: "1px solid #E0E4E4",
      gap: "0.5rem",
    },
    chatInput: {
      flex: 1,
      padding: "0.6rem 0.8rem",
      borderRadius: "999px",
      border: "1px solid #D2D7D7",
      fontSize: "0.85rem",
      outline: "none",
    },
    sendButton: {
      width: "38px",
      height: "38px",
      borderRadius: "50%",
      backgroundColor: colors.primary,
      color: colors.white,
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1rem",
    },

    // Service Details Modal
    serviceDetailsModal: {
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0,0,0,0.7)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: isMobile ? "0.5rem" : "1rem",
      backdropFilter: "blur(4px)",
    },
    serviceDetailsContent: {
      backgroundColor: colors.white,
      padding: isMobile ? "1.3rem" : "1.8rem",
      borderRadius: "18px",
      maxWidth: isMobile ? "95%" : "780px",
      width: "100%",
      maxHeight: isMobile ? "90vh" : "80vh",
      overflowY: "auto",
      boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
    },
    serviceDetailsTitle: {
      fontSize: isMobile ? "1.4rem" : "1.7rem",
      color: colors.primary,
      fontWeight: 800,
      marginBottom: "0.5rem",
      textAlign: "center",
    },
    serviceDetailsDescription: {
      fontSize: "0.95rem",
      color: colors.softtext,
      lineHeight: 1.6,
      textAlign: "center",
      marginBottom: "1.2rem",
    },
    featuresGridModal: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)",
      gap: "0.8rem",
      marginBottom: "1.5rem",
    },
    featureItem: {
      padding: "0.7rem 0.9rem",
      borderRadius: "12px",
      backgroundColor: colors.softbg,
      fontSize: "0.9rem",
      color: colors.darktext,
    },
    processList: {
      backgroundColor: "#F5F7F7",
      padding: "1rem",
      borderRadius: "12px",
      marginBottom: "1.4rem",
    },
    processItem: {
      fontSize: "0.9rem",
      color: colors.softtext,
      marginBottom: "0.4rem",
    },
    modalButtons: {
      display: "flex",
      justifyContent: "center",
    },
    cancelButton: {
      padding: "0.8rem 1.8rem",
      borderRadius: "999px",
      border: "none",
      backgroundColor: colors.softtext,
      color: colors.white,
      cursor: "pointer",
      fontSize: "0.9rem",
      fontWeight: 600,
    },

    // Emergency Modal
    modalOverlay: {
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0,0,0,0.7)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: isMobile ? "0.5rem" : "1rem",
      backdropFilter: "blur(4px)",
    },
    modalContent: {
      backgroundColor: colors.white,
      padding: isMobile ? "1.4rem" : "1.8rem",
      borderRadius: "18px",
      maxWidth: "520px",
      width: "100%",
      boxShadow: "0 22px 45px rgba(0,0,0,0.35)",
    },
    modalTitle: {
      fontSize: isMobile ? "1.4rem" : "1.7rem",
      color: "#D32F2F",
      fontWeight: 800,
      marginBottom: "0.6rem",
      textAlign: "center",
    },
    modalSubtitle: {
      fontSize: "0.95rem",
      color: colors.softtext,
      marginBottom: "1.3rem",
      textAlign: "center",
      lineHeight: 1.5,
    },
    emergencyOptionsBox: {
      display: "flex",
      flexDirection: "column",
      gap: "0.7rem",
      marginBottom: "1.3rem",
    },
    emergencyOption: {
      padding: "0.9rem 1rem",
      borderRadius: "14px",
      border: "1px solid rgba(211,47,47,0.35)",
      background: "#FFF7F7",
      cursor: "pointer",
      transition: "all 0.25s ease",
    },
    emergencyOptionTitle: {
      fontSize: "0.98rem",
      fontWeight: 700,
      color: "#D32F2F",
      marginBottom: "0.25rem",
    },
    emergencyOptionDesc: {
      fontSize: "0.85rem",
      color: colors.softtext,
      lineHeight: 1.4,
    },

    // Info Page Modal
    infoPageModal: {
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0,0,0,0.85)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: isMobile ? "0.5rem" : "1rem",
      backdropFilter: "blur(6px)",
    },
    infoPageContent: {
      backgroundColor: colors.white,
      padding: isMobile ? "1.3rem" : "2rem",
      borderRadius: "20px",
      maxWidth: isMobile ? "95%" : "900px",
      width: "100%",
      maxHeight: isMobile ? "90vh" : "85vh",
      overflowY: "auto",
      boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
    },
    infoPageHeader: {
      textAlign: "center",
      marginBottom: "2rem",
      paddingBottom: "1rem",
      borderBottom: `2px solid ${colors.softbg}`,
    },
    infoPageTitle: {
      fontSize: isMobile ? "1.8rem" : "2.5rem",
      color: colors.primary,
      fontWeight: 800,
      marginBottom: "0.5rem",
    },
    infoPageSubtitle: {
      fontSize: isMobile ? "1rem" : "1.2rem",
      color: colors.softtext,
      fontWeight: 500,
    },
    featuresGridInfo: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
      gap: "1rem",
      marginBottom: "2rem",
    },
    featureCardInfo: {
      padding: "1.2rem",
      backgroundColor: colors.softbg,
      borderRadius: "15px",
      textAlign: "center",
      transition: "all 0.3s ease",
    },
    featureIconInfo: {
      fontSize: "2rem",
      marginBottom: "0.8rem",
    },
    featureTitleInfo: {
      fontSize: "1.1rem",
      fontWeight: 700,
      color: colors.darktext,
      marginBottom: "0.5rem",
    },
    featureDescInfo: {
      fontSize: "0.9rem",
      color: colors.softtext,
      lineHeight: 1.5,
    },
    howItWorksSection: {
      backgroundColor: "#F8FAFA",
      padding: "1.5rem",
      borderRadius: "15px",
      marginBottom: "2rem",
    },
    sectionHeading: {
      fontSize: "1.3rem",
      fontWeight: 700,
      color: colors.darktext,
      marginBottom: "1rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    howItWorksList: {
      paddingLeft: "1.5rem",
    },
    howItWorksItem: {
      fontSize: "0.95rem",
      color: colors.softtext,
      marginBottom: "0.7rem",
      lineHeight: 1.6,
    },
    benefitsSection: {
      marginBottom: "2rem",
    },
    benefitsGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
      gap: "0.8rem",
    },
    benefitItem: {
      padding: "0.8rem",
      backgroundColor: "#E8F5E9",
      borderRadius: "10px",
      fontSize: "0.9rem",
      color: colors.darktext,
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    specialtiesGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
      gap: "0.8rem",
      marginTop: "1rem",
    },
    specialtyItem: {
      padding: "0.8rem",
      backgroundColor: colors.softbg,
      borderRadius: "10px",
      textAlign: "center",
      fontSize: "0.9rem",
      fontWeight: 600,
      color: colors.darktext,
    },
    closeInfoButton: {
      padding: "0.9rem 2rem",
      backgroundColor: colors.primary,
      color: colors.white,
      border: "none",
      borderRadius: "999px",
      cursor: "pointer",
      fontSize: "1rem",
      fontWeight: 700,
      transition: "all 0.3s ease",
      boxShadow: "0 8px 20px rgba(0,150,136,0.4)",
      margin: "0 auto",
      display: "block",
    },
  };

  // Floating bubbles
  const floatingElements = Array.from(
    { length: isMobile ? 6 : 10 },
    (_, i) => ({
      id: i,
      size: Math.random() * (isMobile ? 40 : 80) + (isMobile ? 30 : 40),
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 5,
    })
  );

  // Render info page modal if active
  if (showInfoPage) {
    const pageData = infoPages[showInfoPage];
    return (
      <div style={styles.infoPageModal} onClick={handleCloseInfoPage}>
        <div
          style={styles.infoPageContent}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={styles.infoPageHeader}>
            <h2 style={styles.infoPageTitle}>{pageData.title}</h2>
            <p style={styles.infoPageSubtitle}>{pageData.subtitle}</p>
          </div>

          {/* Features */}
          <h3 style={styles.sectionHeading}>✨ Key Features</h3>
          <div style={styles.featuresGridInfo}>
            {pageData.features.map((feature, index) => (
              <div
                key={index}
                style={styles.featureCardInfo}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={styles.featureIconInfo}>{feature.icon}</div>
                <h4 style={styles.featureTitleInfo}>{feature.title}</h4>
                <p style={styles.featureDescInfo}>{feature.description}</p>
              </div>
            ))}
          </div>

          {/* How It Works */}
          <div style={styles.howItWorksSection}>
            <h3 style={styles.sectionHeading}>📋 How It Works</h3>
            <div style={styles.howItWorksList}>
              {pageData.howItWorks.map((step, index) => (
                <div key={index} style={styles.howItWorksItem}>
                  {step}
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div style={styles.benefitsSection}>
            <h3 style={styles.sectionHeading}>✅ Benefits</h3>
            <div style={styles.benefitsGrid}>
              {pageData.benefits.map((benefit, index) => (
                <div key={index} style={styles.benefitItem}>
                  <span>✓</span> {benefit}
                </div>
              ))}
            </div>
          </div>

          {/* Specialties (for doctor page only) */}
          {showInfoPage === "doctor" && (
            <div style={styles.benefitsSection}>
              <h3 style={styles.sectionHeading}>🎯 Available Specialties</h3>
              <div style={styles.specialtiesGrid}>
                {pageData.specialties.map((specialty, index) => (
                  <div key={index} style={styles.specialtyItem}>
                    {specialty}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Button */}
          <button
            style={styles.closeInfoButton}
            onClick={handleCloseInfoPage}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,150,136,0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,150,136,0.4)";
            }}
          >
            Got it! Take me back
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="home">
      {/* Interactive Hero Section */}
      <div style={styles.hero}>
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

        <div style={styles.heroContent}>
          {/* Main Hero */}
          <div style={styles.mainHero}>
            <h1 style={styles.heroTitle}>Your Health, Our Priority.</h1>
            <h2 style={styles.heroSubtitle}>
              Medicine Delivery in 30–40 Minutes. Consult Doctors Anytime.
            </h2>
            <p style={styles.heroText}>
              QuickMed brings quality healthcare to your doorstep with fast
              medicine delivery, trusted doctors, and digital medical records.
              Reliable care for you and your family — anytime, anywhere.
            </p>

            <div style={styles.ctaButtons}>
              <button
                style={styles.primaryButton}
                onClick={handleOrderMedicines}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow =
                    "0 14px 30px rgba(0,150,136,0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(0,150,136,0.45)";
                }}
              >
                 Order Medicines Now
              </button>

              <button
                style={styles.secondaryButton}
                onClick={handleConsultDoctor}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.primary;
                  e.currentTarget.style.color = colors.white;
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = colors.primary;
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                 Consult Doctor Online
              </button>
            </div>
          </div>

          {/* Stats */}
          <div style={styles.statsSection}>
            {stats.map((stat, i) => (
              <div
                key={i}
                style={styles.statItem}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow =
                    "0 14px 30px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 20px rgba(0,0,0,0.04)";
                }}
              >
                <div style={styles.statNumber}>{stat.number}</div>
                <div style={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Services */}
          <div style={styles.servicesSection}>
            <h2 style={styles.sectionTitle}>Our Healthcare Services</h2>
            <div style={styles.servicesGrid}>
              {services.map((service, i) => (
                <div
                  key={i}
                  style={styles.serviceCard}
                  onClick={service.onClick}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 14px 30px rgba(0,0,0,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 22px rgba(0,0,0,0.05)";
                  }}
                >
                  <div style={styles.serviceIcon}>{service.icon}</div>
                  <h3 style={styles.serviceName}>{service.name}</h3>
                  <p style={styles.serviceDescription}>
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div style={styles.featuresSection}>
            <h2 style={styles.sectionTitle}>Why Choose QuickMed?</h2>
            <div style={styles.featuresGridMain}>
              {features.map((feature, i) => (
                <div
                  key={i}
                  style={styles.featureCard}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 14px 30px rgba(0,0,0,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 22px rgba(0,0,0,0.05)";
                  }}
                >
                  <div style={styles.featureIcon}>{feature.icon}</div>
                  <h3 style={styles.featureTitle}>{feature.title}</h3>
                  <p style={styles.featureDescription}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div style={styles.testimonialsSection}>
            <h2 style={styles.sectionTitle}>What Our Customers Say</h2>
            <div style={styles.testimonialsGrid}>
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  style={styles.testimonialCard}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 14px 30px rgba(0,0,0,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 22px rgba(0,0,0,0.05)";
                  }}
                >
                  <p style={styles.testimonialText}>"{t.text}"</p>
                  <div style={styles.testimonialRating}>{t.rating}</div>
                  <div style={styles.testimonialAuthor}>{t.name}</div>
                  <div style={styles.testimonialLocation}>{t.location}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Section */}
          <div style={styles.emergencySection}>
            <h3 style={styles.emergencyTitle}> Emergency Medical Assistance</h3>
            <p style={styles.emergencyText}>
              Need urgent help? Our emergency response support is available
              around the clock to guide you and connect you to nearby medical
              care quickly.
            </p>
            <button
              style={styles.emergencyButton}
              onClick={handleEmergencyContact}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 14px 30px rgba(255,107,107,0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 26px rgba(255,107,107,0.55)";
              }}
            >
               Emergency Contact
            </button>
          </div>
        </div>
      </div>

      {/* Chatbot */}
      <div style={styles.chatbotContainer}>
        {showChatbot && (
          <div style={styles.chatbotWindow}>
            <div style={styles.chatbotHeader}>
              <div style={styles.chatbotTitle}>💬 QuickMed Assistant</div>
              <button style={styles.closeButton} onClick={toggleChatbot}>
                ✕
              </button>
            </div>

            <div style={styles.chatMessages}>
              {chatMessages.map((m) => (
                <div
                  key={m.id}
                  style={{
                    ...styles.message,
                    ...(m.isBot ? styles.botMessage : styles.userMessage),
                  }}
                >
                  {m.text}
                </div>
              ))}
            </div>

            <div style={styles.quickReplies}>
              {quickReplies.map((reply, i) => (
                <button
                  key={i}
                  style={styles.quickReply}
                  onClick={() => handleQuickReply(reply)}
                >
                  {reply}
                </button>
              ))}
            </div>

            <div style={styles.chatInputContainer}>
              <input
                type="text"
                placeholder="Type your message..."
                style={styles.chatInput}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button style={styles.sendButton} onClick={handleSendMessage}>
                ➤
              </button>
            </div>
          </div>
        )}

        <button
          style={styles.chatbotButton}
          onClick={toggleChatbot}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          {showChatbot ? "✕" : "💬"}
        </button>
      </div>

      {/* Service Details Modal */}
      {showServiceDetails && (
        <div
          style={styles.serviceDetailsModal}
          onClick={closeServiceDetails}
        >
          <div
            style={styles.serviceDetailsContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={styles.serviceDetailsTitle}>
              {serviceDetails[showServiceDetails].title}
            </h2>
            <p style={styles.serviceDetailsDescription}>
              {serviceDetails[showServiceDetails].description}
            </p>

            <h3
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: colors.darktext,
                marginBottom: "0.7rem",
              }}
            >
              Key Features
            </h3>
            <div style={styles.featuresGridModal}>
              {serviceDetails[showServiceDetails].features.map(
                (feature, i) => (
                  <div key={i} style={styles.featureItem}>
                    {feature}
                  </div>
                )
              )}
            </div>

            <h3
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: colors.darktext,
                marginBottom: "0.7rem",
              }}
            >
              How It Works
            </h3>
            <div style={styles.processList}>
              {serviceDetails[showServiceDetails].process.map((step, i) => (
                <div key={i} style={styles.processItem}>
                  {step}
                </div>
              ))}
            </div>

            <div style={styles.modalButtons}>
              <button style={styles.cancelButton} onClick={closeServiceDetails}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Modal */}
      {showEmergencyModal && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div
            style={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={styles.modalTitle}> Emergency Assistance</h2>
            <p style={styles.modalSubtitle}>
              Choose how you want to reach our emergency support team:
            </p>

            <div style={styles.emergencyOptionsBox}>
              {emergencyOptions.map((option, i) => (
                <div
                  key={i}
                  style={styles.emergencyOption}
                  onClick={option.action}
                >
                  <div style={styles.emergencyOptionTitle}>{option.title}</div>
                  <div style={styles.emergencyOptionDesc}>
                    {option.description}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center" }}>
              <button style={styles.cancelButton} onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}