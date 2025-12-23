import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// ===============================================
//               CONSTANT DATA
// ===============================================
const QUICK_LINKS = [
  { label: "Home", section: "home", path: "/" },
  { label: "About Us", section: "about", path: "/about" },
  { label: "Services", section: "services", path: "/services" },
  { label: "Doctors", section: "doctors", path: "/doctors" },
  { label: "Reviews", section: "reviews", path: "/reviews" },
  { label: "Contact", section: "contact", path: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Terms & Conditions", key: "terms" },
  { label: "Privacy Policy", key: "privacy" },
  { label: "Editorial Policy", key: "editorial" },
  { label: "Returns & Cancellations", key: "returns" },
];

// ===============================================
//               SVG ICONS
// ===============================================

// ----- Social Media Icons -----
const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

// ----- Contact Icons -----
const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
  </svg>
);

const EmergencyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm1.65-2.65L11.5 12.2V9h1v2.79l1.85 1.85-.7.71z"/>
  </svg>
);

// ----- App Store Icons -----
const AppleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
  </svg>
);

const PlayStoreIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 20.5v-17c0-.77.47-1.45 1.18-1.74.71-.29 1.52-.15 2.09.36l11.5 8.5c.57.42.91 1.08.91 1.78s-.34 1.36-.91 1.78l-11.5 8.5c-.57.42-1.38.56-2.09.27C3.47 21.95 3 21.27 3 20.5zM6.5 19.5l8.85-6.5L6.5 6.5v13z"/>
  </svg>
);

// ----- Legal Section Icons -----
const TermsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
  </svg>
);

const PrivacyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
  </svg>
);

const EditorialIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
  </svg>
);

const ReturnsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
  </svg>
);

// ----- Quick Links Icons -----
const HomeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>
);

const AboutIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
  </svg>
);

const ServicesIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 8.08V2h-2v6.08c-3.39.49-6 3.39-6 6.92 0 3.87 3.13 7 7 7s7-3.13 7-7c0-3.53-2.61-6.43-6-6.92zM12 20c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
  </svg>
);

const DoctorsIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
  </svg>
);

const ReviewsIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
  </svg>
);

const ContactIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-4 4l4 4h-3v4h-2v-4h-3l4-4zm-6 8H4v-4h3l-4-4 4-4h3v4h2V8h3l-4 4 4 4h-3v4z"/>
  </svg>
);

// ===============================================
//               CONSTANTS WITH ICONS
// ===============================================
const SOCIAL_LINKS = [
  {
    label: "Facebook",
    url: "https://facebook.com/quickmed",
    icon: <FacebookIcon />,
  },
  {
    label: "Instagram",
    url: "https://instagram.com/quickmed",
    icon: <InstagramIcon />,
  },
  {
    label: "Twitter",
    url: "https://twitter.com/quickmed",
    icon: <TwitterIcon />,
  },
  {
    label: "LinkedIn",
    url: "https://linkedin.com/company/quickmed",
    icon: <LinkedInIcon />,
  },
];

const APP_LINKS = [
  {
    label: "App Store",
    small: "Download on the",
    large: "App Store",
    icon: <AppleIcon />,
    url: "https://apps.apple.com/in/app/quickmed-telemedicine/id6471234567",
    color: "#000000",
  },
  {
    label: "Google Play",
    small: "Get it on",
    large: "Google Play",
    icon: <PlayStoreIcon />,
    url: "https://play.google.com/store/apps/details?id=com.quickmed.healthcare",
    color: "#4285F4",
  },
];

const CONTACT_INFO = [
  { 
    label: "support@quickmed.com", 
    icon: <EmailIcon />, 
    url: "mailto:support@quickmed.com" 
  },
  { 
    label: "+91 9392416962", 
    icon: <PhoneIcon />, 
    url: "tel:+919392416962" 
  },
];

const QUICK_LINKS_WITH_ICONS = [
  { label: "Home", section: "home", path: "/", icon: <HomeIcon /> },
  { label: "About Us", section: "about", path: "/about", icon: <AboutIcon /> },
  { label: "Services", section: "services", path: "/services", icon: <ServicesIcon /> },
  { label: "Doctors", section: "doctors", path: "/doctors", icon: <DoctorsIcon /> },
  { label: "Reviews", section: "reviews", path: "/reviews", icon: <ReviewsIcon /> },
  { label: "Contact", section: "contact", path: "/contact", icon: <ContactIcon /> },
];

const LEGAL_LINKS_WITH_ICONS = [
  { label: "Terms & Conditions", key: "terms", icon: <TermsIcon /> },
  { label: "Privacy Policy", key: "privacy", icon: <PrivacyIcon /> },
  { label: "Editorial Policy", key: "editorial", icon: <EditorialIcon /> },
  { label: "Returns & Cancellations", key: "returns", icon: <ReturnsIcon /> },
];

// ----- Expanded Legal Content -----
const LEGAL_CONTENT = {
  terms: {
    title: "Terms & Conditions",
    content: [
      { 
        h: "1. Acceptance of Terms", 
        t: "By accessing and using QuickMed's digital healthcare platform, you agree to be bound by these Terms & Conditions, our Privacy Policy, and all applicable laws and regulations. If you do not agree with any part of these terms, you must discontinue use immediately." 
      },
      { 
        h: "2. Use of Services", 
        t: "QuickMed provides telemedicine consultations, e-pharmacy services, lab test bookings, and health monitoring tools. Services must be used only for legitimate medical purposes. Users must be at least 18 years old or have parental consent. Emergency medical situations require immediate physical hospital visits." 
      },
      { 
        h: "3. Medical Disclaimer", 
        t: "QuickMed connects patients with licensed healthcare providers but does not provide medical services directly. All medical advice, diagnoses, and treatment plans are provided by qualified professionals. QuickMed is not liable for medical decisions made based on consultations." 
      },
      { 
        h: "4. Account Responsibilities", 
        t: "Users are responsible for maintaining account confidentiality and accuracy of health information. QuickMed may terminate accounts for violations, fraudulent activities, or misuse of services." 
      },
      { 
        h: "5. Prescription Policy", 
        t: "Prescriptions are issued at the discretion of consulting doctors based on medical necessity. QuickMed follows strict protocols against prescription drug abuse and monitors for suspicious patterns." 
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    content: [
      { 
        h: "1. Data Collection & Use", 
        t: "We collect personal information (name, contact details), medical history, consultation records, prescription data, and device information. This data is used to provide personalized healthcare services, improve platform functionality, and comply with legal requirements under the Digital Personal Data Protection Act, 2023." 
      },
      { 
        h: "2. Health Data Protection", 
        t: "Medical information is encrypted using AES-256 encryption during transmission and storage. Access is restricted to authorized medical professionals involved in your care. We implement role-based access controls and audit trails." 
      },
      { 
        h: "3. Data Sharing", 
        t: "We share data only with: (a) Your treating doctors and pharmacists, (b) Diagnostic labs for test processing, (c) Payment processors for transactions, (d) Government authorities as legally required. We never sell medical data to third parties." 
      },
      { 
        h: "4. Data Retention", 
        t: "Medical records are retained for 5 years post-last activity as per Indian medical regulations. You can request data deletion, subject to legal retention requirements. Backup data is encrypted and securely stored." 
      },
      { 
        h: "5. Security Measures", 
        t: "We employ SSL/TLS encryption, regular security audits, intrusion detection systems, and compliance with ISO 27001 standards. All employees undergo privacy training and sign confidentiality agreements." 
      },
    ],
  },
  editorial: {
    title: "Editorial Policy",
    content: [
      { 
        h: "1. Medical Accuracy Standards", 
        t: "All health content (articles, blogs, drug information) is created/reviewed by MBBS/MD qualified doctors with relevant specialization. Content is evidence-based using sources like ICMR guidelines, WHO publications, and peer-reviewed journals (PubMed, Lancet, NEJM)." 
      },
      { 
        h: "2. Content Review Process", 
        t: "Three-tier review system: (1) Medical writer creates draft, (2) Specialist doctor reviews for clinical accuracy, (3) Editorial board approves for publication. Content is updated quarterly or when new guidelines emerge." 
      },
      { 
        h: "3. Conflict of Interest", 
        t: "Authors must disclose any pharmaceutical affiliations, research funding, or commercial interests. QuickMed maintains independence from pharmaceutical advertising influence in educational content." 
      },
      { 
        h: "4. Patient Education Focus", 
        t: "Content is tailored for Indian healthcare context, available in 8 regional languages. We prioritize preventive care, chronic disease management, maternal health, and mental wellness topics relevant to Indian demographics." 
      },
      { 
        h: "5. Corrections & Updates", 
        t: "Users can report inaccuracies via 'Report Content' feature. Corrections are made within 72 hours with transparency notes. Major updates trigger notification to users who saved/bookmarked the content." 
      },
    ],
  },
  returns: {
    title: "Returns & Cancellations",
    content: [
      { 
        h: "1. Medicine Returns Policy", 
        t: "Prescription medicines cannot be returned after delivery due to safety regulations. Exceptions: Damaged packaging, wrong medication, or expired drugs (report within 24 hours). Over-the-counter products can be returned within 7 days if unopened. Refunds processed within 5-7 business days." 
      },
      { 
        h: "2. Appointment Cancellations", 
        t: "Doctor appointments can be cancelled up to 2 hours before scheduled time with full refund. Cancellations within 2 hours incur 50% charge. Missed appointments (no-show) are non-refundable. For emergency doctor unavailability, full refunds are automatic." 
      },
      { 
        h: "3. Lab Test Cancellations", 
        t: "Home sample collection can be cancelled up to 2 hours before scheduled time. Lab visits can be rescheduled anytime before appointment. If sample collection fails, full refund is provided. Test reports are delivered within 24-48 hours; delays beyond 72 hours qualify for partial refund." 
      },
      { 
        h: "4. Subscription Plans", 
        t: "Monthly health plans can be cancelled within 7 days for full refund. Annual plans have 30-day cancellation window. Used consultations/services are charged pro-rata. Auto-renewal can be disabled anytime from account settings." 
      },
      { 
        h: "5. Refund Processing", 
        t: "Refunds are issued to original payment method within 5-10 business days. For UPI payments: 1-3 business days. Contact support@quickmed.com for refund status. Dispute resolution through internal committee within 15 days." 
      },
    ],
  },
};

// ===============================================
//               FOOTER COMPONENT
// ===============================================
export default function Footer() {
  const [width, setWidth] = useState(window.innerWidth);
  const [activeModal, setActiveModal] = useState(null);
  const [hoverStates, setHoverStates] = useState({
    links: {},
    social: {},
    apps: {},
    closeBtn: false,
  });
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const resizeHandler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  const isMobile = width <= 768;
  const isTablet = width > 768 && width <= 1024;

  // Handle navigation
  const handleNavigation = (path, section) => {
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate(path);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  };

  // Handle App Store link clicks
  const handleAppStoreClick = (url, label) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Handle contact info clicks
  const handleContactClick = (url, label, type) => {
    if (type === 'email' && url.startsWith('mailto:')) {
      window.location.href = url;
    } else if (type === 'phone' && url.startsWith('tel:')) {
      window.location.href = url;
    }
  };

  // Hover state management
  const handleMouseEnter = (type, key) => {
    setHoverStates(prev => ({
      ...prev,
      [type]: { ...prev[type], [key]: true }
    }));
  };

  const handleMouseLeave = (type, key) => {
    setHoverStates(prev => ({
      ...prev,
      [type]: { ...prev[type], [key]: false }
    }));
  };

  // MAIN COLOR PALETTE
  const palette = {
    primary: "#009688",
    mint: "#4DB6AC",
    softbg: "#E0F2F1",
    white: "#FFFFFF",
    darktext: "#124441",
    softtext: "#4F6F6B",
  };

  // ===============================================
  //               STYLES
  // ===============================================
  const styles = {
    footer: {
      background: palette.softbg,
      padding: isMobile ? "2rem 1rem" : "3rem 2rem",
      color: palette.darktext,
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      borderTop: `4px solid ${palette.primary}`,
      marginTop: "3rem",
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "1fr 1fr 1fr 1fr",
      gap: "2rem",
      marginBottom: "2rem",
    },
    sectionTitle: {
      fontSize: "1.1rem",
      fontWeight: "700",
      marginBottom: "1rem",
      color: palette.primary,
      letterSpacing: "0.5px",
    },
    linkContainer: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      cursor: "pointer",
      marginBottom: "0.5rem",
      padding: "0.25rem 0",
      transition: "all 0.2s ease",
    },
    link: {
      fontSize: "0.95rem",
      color: palette.softtext,
      transition: "all 0.2s ease",
    },
    linkHover: {
      color: palette.primary,
      transform: "translateX(5px)",
    },
    activeLink: {
      color: palette.primary,
      fontWeight: "600",
    },
    socialContainer: {
      display: "flex",
      gap: "0.8rem",
      marginBottom: "1.5rem",
    },
    socialIcon: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      background: palette.white,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      color: palette.primary,
    },
    socialIconHover: {
      transform: "translateY(-3px)",
      boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
      background: palette.primary,
      color: palette.white,
    },
    appBadge: {
      display: "flex",
      alignItems: "center",
      padding: "0.8rem 1rem",
      background: palette.white,
      borderRadius: "12px",
      marginBottom: "0.8rem",
      boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
      cursor: "pointer",
      transition: "all 0.3s ease",
      border: "1px solid rgba(0,0,0,0.05)",
    },
    appBadgeHover: {
      transform: "translateY(-3px)",
      boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
      background: palette.primary,
      color: palette.white,
    },
    modalOverlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "1rem",
      zIndex: 1000,
      backdropFilter: "blur(3px)",
    },
    modal: {
      background: palette.white,
      borderRadius: "16px",
      padding: "2.5rem",
      width: "95%",
      maxWidth: "800px",
      boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
      maxHeight: "85vh",
      overflowY: "auto",
      position: "relative",
    },
    modalTitle: {
      fontSize: "1.8rem",
      color: palette.primary,
      marginBottom: "1.5rem",
      fontWeight: "700",
      paddingBottom: "0.5rem",
      borderBottom: `2px solid ${palette.mint}`,
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    modalClose: {
      position: "absolute",
      top: "1.5rem",
      right: "1.5rem",
      fontSize: "1.8rem",
      cursor: "pointer",
      color: palette.primary,
      transition: "transform 0.3s ease",
      width: "36px",
      height: "36px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      background: palette.softbg,
    },
    modalCloseHover: {
      transform: "rotate(90deg)",
      background: palette.primary,
      color: palette.white,
    },
    modalHeading: {
      fontSize: "1.2rem",
      marginBottom: "0.5rem",
      color: palette.darktext,
      fontWeight: "600",
      marginTop: "1rem",
    },
    modalText: {
      color: palette.softtext,
      fontSize: "0.95rem",
      marginBottom: "1.2rem",
      lineHeight: "1.7",
      paddingLeft: "1rem",
      borderLeft: `3px solid ${palette.mint}`,
    },
    bottom: {
      textAlign: "center",
      borderTop: `1px solid ${palette.mint}`,
      paddingTop: "1.5rem",
      color: palette.softtext,
      fontSize: "0.9rem",
      lineHeight: "1.6",
    },
    contactLink: {
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      transition: "all 0.2s ease",
      marginBottom: "0.5rem",
    },
    contactLinkHover: {
      color: palette.primary,
      transform: "translateX(5px)",
    },
    timingInfo: {
      display: "flex",
      alignItems: "flex-start",
      gap: "0.5rem",
      marginTop: "1rem",
      color: palette.softtext,
      fontSize: "0.85rem",
    },
    timingItem: {
      display: "flex",
      alignItems: "center",
      gap: "0.3rem",
      marginBottom: "0.3rem",
    },
  };

  return (
    <>
      {/* ------------------------------------
                FOOTER MAIN
      ------------------------------------ */}
      <footer style={styles.footer}>
        <div style={styles.container}>
          <div style={styles.grid}>

            {/* QUICK LINKS */}
            <div>
              <h3 style={styles.sectionTitle}>Quick Links</h3>
              {QUICK_LINKS_WITH_ICONS.map((l, i) => {
                const isActive = location.pathname === l.path;
                return (
                  <div
                    key={i}
                    style={{
                      ...styles.linkContainer,
                      ...(hoverStates.links[l.section] ? styles.linkHover : {})
                    }}
                    onClick={() => handleNavigation(l.path, l.section)}
                    onMouseEnter={() => handleMouseEnter('links', l.section)}
                    onMouseLeave={() => handleMouseLeave('links', l.section)}
                  >
                    <div style={{ 
                      color: hoverStates.links[l.section] || isActive ? palette.primary : palette.softtext,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "16px"
                    }}>
                      {l.icon}
                    </div>
                    <span style={{
                      ...styles.link,
                      ...(hoverStates.links[l.section] ? styles.linkHover : {}),
                      ...(isActive ? styles.activeLink : {})
                    }}>
                      {l.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* LEGAL SECTION */}
            <div>
              <h3 style={styles.sectionTitle}>Legal</h3>
              {LEGAL_LINKS_WITH_ICONS.map((l, i) => (
                <div
                  key={i}
                  style={{
                    ...styles.linkContainer,
                    ...(hoverStates.links[l.key] ? styles.linkHover : {})
                  }}
                  onClick={() => setActiveModal(l.key)}
                  onMouseEnter={() => handleMouseEnter('links', l.key)}
                  onMouseLeave={() => handleMouseLeave('links', l.key)}
                >
                  <div style={{ 
                    color: hoverStates.links[l.key] ? palette.primary : palette.softtext,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "16px"
                  }}>
                    {l.icon}
                  </div>
                  <span style={{
                    ...styles.link,
                    ...(hoverStates.links[l.key] ? styles.linkHover : {})
                  }}>
                    {l.label}
                  </span>
                </div>
              ))}
            </div>

            {/* APP DOWNLOAD */}
            <div>
              <h3 style={styles.sectionTitle}>Download App</h3>
              {APP_LINKS.map((app, i) => (
                <div
                  key={i}
                  style={{
                    ...styles.appBadge,
                    ...(hoverStates.apps[app.label] ? {
                      ...styles.appBadgeHover,
                      background: app.color || palette.primary
                    } : {})
                  }}
                  onClick={() => handleAppStoreClick(app.url, app.label)}
                  onMouseEnter={() => handleMouseEnter('apps', app.label)}
                  onMouseLeave={() => handleMouseLeave('apps', app.label)}
                >
                  <div style={{ 
                    marginRight: "0.8rem",
                    color: hoverStates.apps[app.label] ? palette.white : palette.darktext,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "24px",
                    height: "24px"
                  }}>
                    {app.icon}
                  </div>
                  <div>
                    <small style={{ 
                      fontSize: "0.75rem", 
                      display: "block",
                      color: hoverStates.apps[app.label] ? "rgba(255,255,255,0.9)" : palette.softtext 
                    }}>
                      {app.small}
                    </small>
                    <div style={{ 
                      fontSize: "1rem", 
                      fontWeight: "bold",
                      color: hoverStates.apps[app.label] ? palette.white : palette.darktext
                    }}>
                      {app.large}
                    </div>
                  </div>
                </div>
              ))}
              <p style={{ 
                fontSize: "0.85rem", 
                color: palette.softtext,
                marginTop: "1rem",
                fontStyle: "italic"
              }}>
                Available in 8 Indian languages
              </p>
            </div>

            {/* SOCIAL & CONTACT */}
            <div>
              <h3 style={styles.sectionTitle}>Follow Us</h3>
              <div style={styles.socialContainer}>
                {SOCIAL_LINKS.map((s, i) => (
                  <a 
                    key={i} 
                    href={s.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none' }}
                    aria-label={s.label}
                  >
                    <div 
                      style={{
                        ...styles.socialIcon,
                        ...(hoverStates.social[s.label] ? styles.socialIconHover : {})
                      }}
                      onMouseEnter={() => handleMouseEnter('social', s.label)}
                      onMouseLeave={() => handleMouseLeave('social', s.label)}
                    >
                      {s.icon}
                    </div>
                  </a>
                ))}
              </div>

              <h3 style={styles.sectionTitle}>Contact</h3>
              {CONTACT_INFO.map((c, i) => {
                const type = c.url.startsWith('mailto:') ? 'email' : 'phone';
                return (
                  <div 
                    key={i}
                    style={{
                      ...styles.contactLink,
                      ...(hoverStates.links[c.label] ? styles.contactLinkHover : {})
                    }}
                    onClick={() => handleContactClick(c.url, c.label, type)}
                    onMouseEnter={() => handleMouseEnter('links', c.label)}
                    onMouseLeave={() => handleMouseLeave('links', c.label)}
                  >
                    <div style={{ 
                      color: hoverStates.links[c.label] ? palette.primary : palette.softtext,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "18px"
                    }}>
                      {c.icon}
                    </div>
                    <span style={{
                      color: hoverStates.links[c.label] ? palette.primary : palette.softtext,
                      fontSize: "0.95rem"
                    }}>
                      {c.label}
                    </span>
                  </div>
                );
              })}
              
              <div style={styles.timingInfo}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                  <div style={styles.timingItem}>
                    <ClockIcon />
                    <span>Mon-Sun: 7 AM - 11 PM IST</span>
                  </div>
                  <div style={styles.timingItem}>
                    <EmergencyIcon />
                    <span>24/7 Emergency Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM */}
          <div style={styles.bottom}>
            <p>© 2025 QuickMed — All rights reserved.</p>
            <p>Your trusted partner for modern, connected healthcare.</p>
            <p style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>
              Registered under Indian Medical Council Act | License No: MED/TELE/2023/456
            </p>
          </div>
        </div>
      </footer>

      {/* ------------------------------------
                LEGAL MODAL
      ------------------------------------ */}
      {activeModal && (
        <div style={styles.modalOverlay} onClick={() => setActiveModal(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div
              style={{
                ...styles.modalClose,
                ...(hoverStates.closeBtn ? styles.modalCloseHover : {})
              }}
              onClick={() => setActiveModal(null)}
              onMouseEnter={() => handleMouseEnter('closeBtn', 'true')}
              onMouseLeave={() => handleMouseLeave('closeBtn', 'true')}
              aria-label="Close modal"
            >
              ✕
            </div>

            <h2 style={styles.modalTitle}>
              {LEGAL_CONTENT[activeModal].key === 'terms' && <TermsIcon />}
              {LEGAL_CONTENT[activeModal].key === 'privacy' && <PrivacyIcon />}
              {LEGAL_CONTENT[activeModal].key === 'editorial' && <EditorialIcon />}
              {LEGAL_CONTENT[activeModal].key === 'returns' && <ReturnsIcon />}
              {LEGAL_CONTENT[activeModal].title}
            </h2>

            {LEGAL_CONTENT[activeModal].content.map((item, idx) => (
              <div key={idx}>
                <h3 style={styles.modalHeading}>{item.h}</h3>
                <p style={styles.modalText}>{item.t}</p>
              </div>
            ))}
            
            <div style={{ 
              marginTop: "2rem", 
              paddingTop: "1rem", 
              borderTop: `1px solid ${palette.softbg}`,
              fontSize: "0.9rem",
              color: palette.softtext
            }}>
              <p>Last updated: December 5, 2023</p>
              <p>For queries: legal@quickmed.com | +91-9392416962</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}