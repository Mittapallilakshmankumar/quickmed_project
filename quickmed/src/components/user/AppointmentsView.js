import React, { useState, useEffect } from 'react';

const AppointmentsView = ({
  appointments,
  appointmentFilter,
  setAppointmentFilter,
  setActiveView
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [validatedAppointments, setValidatedAppointments] = useState(appointments);

  // SVG Icons Component
  const Icons = {
    Back: () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    Search: () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" 
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    Plus: () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    Video: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23 7L16 12L23 17V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="1" y="5" width="15" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    Home: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15" 
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    Clinic: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21Z" 
          stroke="currentColor" strokeWidth="2"/>
        <path d="M16 8H8M12 12V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    CheckCircle: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" 
          stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    Clock: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    Cross: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    Phone: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 16.92V19C22 19.5523 21.5523 20 21 20H19C10.1634 20 3 12.8366 3 4V3C3 2.44772 3.44772 2 4 2H6C6.55228 2 7 2.44772 7 3C7 5.213 7.659 7.24798 8.819 9.012M16.95 13.05L20.37 16.47C20.77 16.87 20.77 17.53 20.37 17.93L18.99 19.31C18.41 19.89 17.47 20.06 16.7 19.79C14.33 19.06 12.14 17.66 10.37 15.89C8.59 14.12 7.2 11.93 6.46 9.56C6.18 8.78 6.36 7.84 6.94 7.26L8.32 5.88C8.72 5.48 9.38 5.48 9.78 5.88L13.2 9.3C13.6 9.7 13.6 10.36 13.2 10.76L12.59 11.37C12.38 12.15 12.6 13.02 13.23 13.65C13.86 14.28 14.73 14.5 15.51 14.29L16.12 13.68C16.52 13.28 17.18 13.28 17.58 13.68L16.95 13.05Z" 
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    Mail: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" 
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    Calendar: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M16 2V6M8 2V6M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    ClockSmall: () => (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    Location: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" 
          stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    Warning: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 9V13M12 17H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" 
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    PriorityHigh: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 22H17M12 2V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    PriorityMedium: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 22H16M12 6V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    PriorityLow: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 22H15M12 10V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    Doctor: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z" 
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    User: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
        <path d="M6 20C6 16.6863 8.68629 14 12 14C15.3137 14 18 16.6863 18 20" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    Info: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  };

  // Normalize appointment status to match filter categories
  const normalizeAppointmentStatus = (appointment) => {
    const status = (appointment.status || 'pending').toLowerCase();
    
    // Map various status names to filter categories
    if (status === 'confirmed' || status === 'scheduled' || status === 'booked' || status === 'active') {
      return 'confirmed';
    } else if (status === 'pending' || status === 'waiting' || status === 'awaiting' || status === 'upcoming') {
      return 'pending';
    } else if (status === 'completed' || status === 'finished' || status === 'done' || status === 'attended') {
      return 'completed';
    } else if (status === 'cancelled' || status === 'canceled' || status === 'rejected' || status === 'declined') {
      return 'cancelled';
    }
    return 'pending';
  };

  // Validate appointments data
  useEffect(() => {
    const validatedAppointments = appointments.map(appt => {
      const normalizedStatus = normalizeAppointmentStatus(appt);
      const originalStatus = (appt.status || 'pending').toLowerCase();
      
      return {
        id: appt.id || `appt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        doctorName: appt.doctorName || appt.doctor?.name || 'Dr. Unknown',
        doctorSpecialty: appt.doctorSpecialty || appt.doctor?.specialty || 'General',
        date: appt.date || appt.appointmentDateTime?.split('T')[0] || new Date().toISOString().split('T')[0],
        time: appt.time || appt.appointmentDateTime?.split('T')[1]?.substring(0, 5) || '10:00',
        status: originalStatus,
        normalizedStatus: normalizedStatus,
        type: appt.type || 'clinic',
        consultationType: appt.consultationType || appt.type || 'clinic',
        fee: appt.fee || appt.payment?.amount || '500',
        category: appt.category || 'General',
        hospital: appt.hospital || appt.clinic?.name || 'QuickMed Clinic',
        priority: appt.priority || 'L2',
        payment: appt.payment || null,
        createdAt: appt.createdAt || appt.bookingDate || new Date().toISOString(),
        doctorId: appt.doctorId,
        ...appt,
        clinic: appt.clinic || {
          name: appt.hospital || 'QuickMed Clinic',
          address: appt.address || '123 Health Street, Medical District'
        }
      };
    });
    
    if (JSON.stringify(validatedAppointments) !== JSON.stringify(appointments)) {
      setValidatedAppointments(validatedAppointments);
    } else {
      setValidatedAppointments(appointments);
    }
  }, [appointments]);

  // Scroll to top when component mounts or filter/search changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [appointmentFilter, searchTerm]);

  const BackButton = ({ onClick, text = 'Back' }) => (
    <button 
      style={styles.backButton}
      onClick={() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        setTimeout(() => onClick(), 100);
      }}
      type="button"
    >
      <span style={styles.backButtonIcon}><Icons.Back /></span>
      {text}
    </button>
  );

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setShowDetails(true);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setShowDetails(false);
    setSelectedAppointment(null);
  };

  // Get the exact consultation type for display
  const getConsultationType = (appointment) => {
    const type = appointment.consultationType || appointment.type || 'clinic';
    
    switch(type.toLowerCase()) {
      case 'video':
      case 'video consultation':
      case 'telemedicine':
        return 'Video Consultation';
      case 'home':
      case 'home visit':
      case 'home consultation':
        return 'Home Consultation';
      case 'clinic':
      case 'in-person':
      case 'clinic appointment':
        return 'Clinic Appointment';
      case 'phone':
      case 'phone consultation':
        return 'Phone Consultation';
      default:
        return type.charAt(0).toUpperCase() + type.slice(1) + ' Appointment';
    }
  };

  const getConsultationIcon = (type) => {
    const consultationType = getConsultationType({ type });
    if (consultationType.includes('Video')) return <Icons.Video />;
    if (consultationType.includes('Home')) return <Icons.Home />;
    if (consultationType.includes('Phone')) return <Icons.Phone />;
    return <Icons.Clinic />;
  };

  const getFilteredAppointments = () => {
    let filtered = validatedAppointments;
    
    if (appointmentFilter !== 'all') {
      filtered = validatedAppointments.filter(appt => {
        const normalizedStatus = appt.normalizedStatus || normalizeAppointmentStatus(appt);
        
        if (appointmentFilter === 'confirmed') {
          return normalizedStatus === 'confirmed';
        } else if (appointmentFilter === 'pending') {
          return normalizedStatus === 'pending';
        } else if (appointmentFilter === 'completed') {
          return normalizedStatus === 'completed';
        } else if (appointmentFilter === 'cancelled') {
          return normalizedStatus === 'cancelled';
        }
        return true;
      });
    }
    
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(appt => {
        const searchLower = searchTerm.toLowerCase();
        return (
          (appt.doctorName && appt.doctorName.toLowerCase().includes(searchLower)) ||
          (appt.doctorSpecialty && appt.doctorSpecialty.toLowerCase().includes(searchLower)) ||
          (appt.id && appt.id.toLowerCase().includes(searchLower)) ||
          (appt.hospital && appt.hospital.toLowerCase().includes(searchLower)) ||
          (appt.clinic?.name && appt.clinic.name.toLowerCase().includes(searchLower)) ||
          getConsultationType(appt).toLowerCase().includes(searchLower) ||
          (appt.status && appt.status.toLowerCase().includes(searchLower))
        );
      });
    }
    
    return filtered.sort((a, b) => {
      const dateA = new Date(a.date || a.appointmentDateTime || a.createdAt || 0);
      const dateB = new Date(b.date || b.appointmentDateTime || b.createdAt || 0);
      return dateB - dateA;
    });
  };

  const displayAppointments = getFilteredAppointments();

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch {
      return dateString;
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'Not set';
    
    if (timeString.includes('T')) {
      try {
        const date = new Date(timeString);
        if (!isNaN(date.getTime())) {
          return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
          });
        }
      } catch {}
    }
    
    if (timeString.includes('AM') || timeString.includes('PM')) {
      return timeString;
    }
    
    if (timeString.includes(':')) {
      const [hours, minutes] = timeString.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const formattedHour = hour % 12 || 12;
      return `${formattedHour}:${minutes} ${ampm}`;
    }
    
    return timeString;
  };

  const getStatusColor = (status) => {
    const statusLower = status.toLowerCase();
    const statusStyles = {
      confirmed: { background: '#E8F5E8', color: '#2E7D32', border: '1px solid #C8E6C9', icon: <Icons.CheckCircle /> },
      scheduled: { background: '#E8F5E8', color: '#2E7D32', border: '1px solid #C8E6C9', icon: <Icons.CheckCircle /> },
      booked: { background: '#E8F5E8', color: '#2E7D32', border: '1px solid #C8E6C9', icon: <Icons.CheckCircle /> },
      active: { background: '#E8F5E8', color: '#2E7D32', border: '1px solid #C8E6C9', icon: <Icons.CheckCircle /> },
      pending: { background: '#FFF3E0', color: '#EF6C00', border: '1px solid #FFE0B2', icon: <Icons.Clock /> },
      waiting: { background: '#FFF3E0', color: '#EF6C00', border: '1px solid #FFE0B2', icon: <Icons.Clock /> },
      upcoming: { background: '#FFF3E0', color: '#EF6C00', border: '1px solid #FFE0B2', icon: <Icons.Clock /> },
      completed: { background: '#F5F5F5', color: '#424242', border: '1px solid #E0E0E0', icon: <Icons.CheckCircle /> },
      finished: { background: '#F5F5F5', color: '#424242', border: '1px solid #E0E0E0', icon: <Icons.CheckCircle /> },
      attended: { background: '#F5F5F5', color: '#424242', border: '1px solid #E0E0E0', icon: <Icons.CheckCircle /> },
      cancelled: { background: '#FFEBEE', color: '#D32F2F', border: '1px solid #FFCDD2', icon: <Icons.Cross /> },
      canceled: { background: '#FFEBEE', color: '#D32F2F', border: '1px solid #FFCDD2', icon: <Icons.Cross /> },
      rejected: { background: '#FFEBEE', color: '#D32F2F', border: '1px solid #FFCDD2', icon: <Icons.Cross /> },
      declined: { background: '#FFEBEE', color: '#D32F2F', border: '1px solid #FFCDD2', icon: <Icons.Cross /> }
    };
    
    return statusStyles[statusLower] || statusStyles.pending;
  };

  const getPaymentStatusColor = (status) => {
    const statusLower = status.toLowerCase();
    const paymentStyles = {
      completed: { background: '#E8F5E8', color: '#2E7D32', icon: <Icons.CheckCircle /> },
      paid: { background: '#E8F5E8', color: '#2E7D32', icon: <Icons.CheckCircle /> },
      success: { background: '#E8F5E8', color: '#2E7D32', icon: <Icons.CheckCircle /> },
      pending: { background: '#FFF3E0', color: '#EF6C00', icon: <Icons.Clock /> },
      waiting: { background: '#FFF3E0', color: '#EF6C00', icon: <Icons.Clock /> },
      processing: { background: '#FFF3E0', color: '#EF6C00', icon: <Icons.Clock /> },
      failed: { background: '#FFEBEE', color: '#D32F2F', icon: <Icons.Cross /> },
      cancelled: { background: '#FFEBEE', color: '#D32F2F', icon: <Icons.Cross /> },
      refunded: { background: '#E3F2FD', color: '#1976D2', icon: <Icons.Info /> }
    };
    return paymentStyles[statusLower] || paymentStyles.pending;
  };

  const getPriorityBadge = (priority) => {
    const priorityStyles = {
      'L1': { 
        background: '#FEE2E2', 
        color: '#DC2626', 
        label: 'High Priority',
        icon: <Icons.PriorityHigh />
      },
      'L2': { 
        background: '#FEF3C7', 
        color: '#D97706', 
        label: 'Medium Priority',
        icon: <Icons.PriorityMedium />
      },
      'L3': { 
        background: '#D1FAE5', 
        color: '#059669', 
        label: 'Low Priority',
        icon: <Icons.PriorityLow />
      },
      'high': { 
        background: '#FEE2E2', 
        color: '#DC2626', 
        label: 'High Priority',
        icon: <Icons.PriorityHigh />
      },
      'medium': { 
        background: '#FEF3C7', 
        color: '#D97706', 
        label: 'Medium Priority',
        icon: <Icons.PriorityMedium />
      },
      'low': { 
        background: '#D1FAE5', 
        color: '#059669', 
        label: 'Low Priority',
        icon: <Icons.PriorityLow />
      }
    };
    
    const priorityUpper = priority ? priority.toUpperCase() : 'L2';
    const style = priorityStyles[priorityUpper] || priorityStyles[priority?.toLowerCase()] || priorityStyles['L2'];
    
    return (
      <span style={{
        backgroundColor: style.background,
        color: style.color,
        padding: '0.2rem 0.5rem',
        borderRadius: '10px',
        fontSize: '0.75rem',
        fontWeight: '600',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.25rem',
        marginLeft: '0.5rem'
      }}>
        <span style={{ display: 'flex', alignItems: 'center' }}>{style.icon}</span>
        {style.label}
      </span>
    );
  };

  // Doctor Information Database
  const doctorDatabase = {
    "Dr. Ananya Sharma": {
      specialty: "Pediatrics", 
      experience: "12+ years", 
      education: "MBBS, MD - Pediatrics",
      languages: "English, Hindi, Telugu", 
      rating: "4.9/5", 
      about: "Specialized in newborn care, vaccinations, and developmental disorders.",
      clinic: "Apollo Children's Hospital", 
      address: "123 Health Street, Medical District, Hyderabad"
    },
    "Dr. Vikram Patel": {
      specialty: "Cardiology", 
      experience: "15+ years", 
      education: "MBBS, MD, DM - Cardiology",
      languages: "English, Hindi, Gujarati", 
      rating: "4.8/5", 
      about: "Expert in interventional cardiology and heart failure management.",
      clinic: "Medanta Heart Institute", 
      address: "456 Cardiac Road, Gurugram"
    },
    "Dr. Priya Nair": {
      specialty: "Dermatology", 
      experience: "10+ years", 
      education: "MBBS, MD - Dermatology",
      languages: "English, Hindi, Malayalam", 
      rating: "4.7/5", 
      about: "Specialized in cosmetic dermatology and skin cancer treatments.",
      clinic: "Skin & Hair Clinic", 
      address: "789 Beauty Lane, Mumbai"
    },
    "Dr. Rohan Desai": {
      specialty: "Orthopedics", 
      experience: "18+ years", 
      education: "MBBS, MS - Orthopedics",
      languages: "English, Hindi, Marathi", 
      rating: "4.9/5", 
      about: "Expert in joint replacements and sports injuries.",
      clinic: "Bone & Joint Center", 
      address: "321 Fitness Street, Pune"
    }
  };

  const getDoctorInfo = (doctorName) => {
    return doctorDatabase[doctorName] || {
      specialty: "Medical Specialist",
      experience: "10+ years", 
      education: "Medical degree",
      languages: "English",
      rating: "4.5/5",
      about: "Qualified medical professional providing excellent care.",
      clinic: "QuickMed Clinic",
      address: "123 Health Street, Medical District"
    };
  };

  // Format status for display
  const formatStatusDisplay = (status) => {
    if (!status) return 'Pending';
    const statusLower = status.toLowerCase();
    
    const statusMap = {
      'confirmed': 'Confirmed',
      'scheduled': 'Scheduled',
      'booked': 'Booked',
      'active': 'Active',
      'pending': 'Pending',
      'waiting': 'Waiting',
      'upcoming': 'Upcoming',
      'completed': 'Completed',
      'finished': 'Completed',
      'attended': 'Attended',
      'cancelled': 'Cancelled',
      'canceled': 'Cancelled',
      'rejected': 'Rejected',
      'declined': 'Declined'
    };
    
    return statusMap[statusLower] || status.charAt(0).toUpperCase() + status.slice(1);
  };

  // Appointment Details Component
  const AppointmentDetails = ({ appointment, onBack }) => {
    const doctorInfo = getDoctorInfo(appointment.doctorName);
    const statusStyle = getStatusColor(appointment.status);
    const paymentStyle = appointment.payment ? getPaymentStatusColor(appointment.payment.status) : null;
    const consultationType = getConsultationType(appointment);
    const consultationIcon = getConsultationIcon(appointment.type);

    return (
      <div style={styles.mainContainer}>
        <div style={styles.contentWrapper}>
          <div style={styles.detailsHeader}>
            <BackButton onClick={onBack} text="Back to Appointments" />
            <div style={styles.headerCenter}>
              <h1 style={styles.mainTitle}>Appointment Details</h1>
              <p style={styles.subtitle}>Complete information about your appointment</p>
            </div>
            <div style={{ width: '140px' }}></div>
          </div>

          <div style={styles.gridContainer}>
            {/* Appointment Card */}
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <div>
                  <div style={styles.statusContainer}>
                    <span style={{ ...styles.statusBadge, ...statusStyle }}>
                      <span style={styles.statusIcon}>{statusStyle.icon}</span>
                      {formatStatusDisplay(appointment.status)}
                    </span>
                    <span style={styles.idBadge}>
                      <Icons.Info /> ID: {appointment.id}
                    </span>
                    {appointment.priority && getPriorityBadge(appointment.priority)}
                    <span style={{
                      backgroundColor: consultationType.includes('Video') ? '#00796B' : 
                                     consultationType.includes('Home') ? '#4DB6AC' : 
                                     consultationType.includes('Phone') ? '#2196F3' : '#009688',
                      color: 'white',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '10px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      marginLeft: '0.5rem'
                    }}>
                      <span style={{ display: 'flex', alignItems: 'center' }}>{consultationIcon}</span>
                      {consultationType}
                    </span>
                  </div>
                  <h2 style={styles.doctorName}>
                    <span style={styles.doctorIcon}><Icons.Doctor /></span>
                    {appointment.doctorName}
                  </h2>
                  <p style={styles.specialtyText}>{doctorInfo.specialty}</p>
                </div>
              </div>

              <div style={styles.detailsGrid}>
                {[
                  { 
                    label: 'Appointment Date', 
                    value: formatDate(appointment.date),
                    icon: <Icons.Calendar />
                  },
                  { 
                    label: 'Appointment Time', 
                    value: formatTime(appointment.time),
                    icon: <Icons.ClockSmall />
                  },
                  { 
                    label: 'Consultation Type', 
                    value: consultationType,
                    icon: consultationIcon
                  },
                  { 
                    label: 'Consultation Fee', 
                    value: `₹${appointment.fee || '500'}`,
                    icon: '₹'
                  },
                  { 
                    label: 'Category', 
                    value: appointment.category || 'General',
                    icon: <Icons.User />
                  },
                  { 
                    label: 'Hospital/Clinic', 
                    value: appointment.hospital || appointment.clinic?.name || doctorInfo.clinic,
                    icon: <Icons.Location />
                  }
                ].map((item, idx) => (
                  <div key={idx} style={styles.detailItem}>
                    <div style={styles.detailHeader}>
                      <span style={styles.detailIcon}>{item.icon}</span>
                      <strong style={styles.detailLabel}>{item.label}</strong>
                    </div>
                    <p style={styles.detailValue}>{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Payment Information */}
              {appointment.payment && (
                <div style={styles.paymentContainer}>
                  <h4 style={styles.sectionTitle}>Payment Information</h4>
                  <div style={styles.paymentDetails}>
                    <div style={styles.paymentDetailRow}>
                      <strong style={styles.paymentLabel}>Status:</strong>
                      <span style={{
                        ...styles.paymentStatus,
                        backgroundColor: paymentStyle.background,
                        color: paymentStyle.color
                      }}>
                        <span style={styles.paymentIcon}>{paymentStyle.icon}</span>
                        {formatStatusDisplay(appointment.payment.status)}
                      </span>
                    </div>
                    <div style={styles.paymentDetailRow}>
                      <strong style={styles.paymentLabel}>Amount:</strong>
                      <span style={styles.paymentValue}>₹{appointment.payment.amount}</span>
                    </div>
                    {appointment.payment.paymentId && (
                      <div style={styles.paymentDetailRow}>
                        <strong style={styles.paymentLabel}>Payment ID:</strong>
                        <span style={styles.paymentId}>{appointment.payment.paymentId}</span>
                      </div>
                    )}
                    {appointment.payment.orderId && (
                      <div style={styles.paymentDetailRow}>
                        <strong style={styles.paymentLabel}>Order ID:</strong>
                        <span style={styles.paymentId}>{appointment.payment.orderId}</span>
                      </div>
                    )}
                    {appointment.payment.timestamp && (
                      <div style={styles.paymentDetailRow}>
                        <strong style={styles.paymentLabel}>Paid on:</strong>
                        <span>{new Date(appointment.payment.timestamp).toLocaleDateString('en-US', { 
                          year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                        })}</span>
                      </div>
                    )}
                    {appointment.payment.method && (
                      <div style={styles.paymentDetailRow}>
                        <strong style={styles.paymentLabel}>Payment Method:</strong>
                        <span>{appointment.payment.method}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div style={styles.notesContainer}>
                <h4 style={styles.sectionTitle}>Additional Information</h4>
                <p style={styles.notesText}>
                  {consultationType === 'Home Consultation' 
                    ? 'Home Consultation: Doctor will contact you for address confirmation. Please be available at the scheduled time.' 
                    : consultationType === 'Video Consultation'
                    ? 'Video Consultation: A video call link will be sent to your email 15 minutes before the appointment. Please ensure stable internet connection.'
                    : consultationType === 'Phone Consultation'
                    ? 'Phone Consultation: Doctor will call you at the scheduled time. Please ensure your phone is available.'
                    : 'Clinic Appointment: Please arrive 15 minutes before your scheduled time. Bring your ID and any previous medical records.'}
                </p>
                {(appointment.hospital || appointment.clinic?.name) && 
                 !consultationType.includes('Home') && 
                 !consultationType.includes('Video') && 
                 !consultationType.includes('Phone') && (
                  <p style={styles.notesText}>
                    <span style={styles.noteIcon}><Icons.Location /></span>
                    <strong>Location:</strong> {appointment.hospital || appointment.clinic?.name}
                  </p>
                )}
                {appointment.createdAt && (
                  <p style={styles.notesText}>
                    <span style={styles.noteIcon}><Icons.Calendar /></span>
                    <strong>Booked on:</strong> {new Date(appointment.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                    })}
                  </p>
                )}
              </div>
            </div>

            {/* Doctor Information */}
            <div style={styles.card}>
              <h3 style={styles.sectionTitle}>About Dr. {appointment.doctorName.replace('Dr. ', '')}</h3>
              <div style={styles.infoGrid}>
                {[
                  { label: 'Experience:', value: doctorInfo.experience, icon: <Icons.Clock /> },
                  { label: 'Education:', value: doctorInfo.education, icon: <Icons.User /> },
                  { label: 'Languages:', value: doctorInfo.languages, icon: '🗣️' },
                  { label: 'Rating:', value: doctorInfo.rating, icon: '⭐' }
                ].map((item, idx) => (
                  <div key={idx} style={styles.infoRow}>
                    <div style={styles.infoHeader}>
                      <span style={styles.infoIcon}>{item.icon}</span>
                      <strong style={styles.infoLabel}>{item.label}</strong>
                    </div>
                    <p style={styles.infoValue}>{item.value}</p>
                  </div>
                ))}
              </div>
              <div>
                <div style={styles.infoHeader}>
                  <span style={styles.infoIcon}><Icons.Info /></span>
                  <strong style={styles.infoLabel}>About the Doctor:</strong>
                </div>
                <p style={styles.aboutText}>{doctorInfo.about}</p>
              </div>
            </div>

            {/* Clinic Information for in-person appointments */}
            {consultationType === 'Clinic Appointment' && (
              <div style={styles.card}>
                <h3 style={styles.sectionTitle}>Clinic Information</h3>
                {[
                  { label: 'Clinic Name', value: appointment.hospital || appointment.clinic?.name || doctorInfo.clinic, icon: <Icons.Clinic /> },
                  { label: 'Address', value: appointment.clinic?.address || appointment.address || doctorInfo.address, multiline: true, icon: <Icons.Location /> },
                  { label: 'Contact', value: '1-800-QUICK-MED\ninfo@quickmed.com', multiline: true, icon: <Icons.Phone /> }
                ].map((item, idx) => (
                  <div key={idx} style={styles.clinicItem}>
                    <div style={styles.clinicHeader}>
                      <span style={styles.clinicIcon}>{item.icon}</span>
                      <strong style={styles.clinicLabel}>{item.label}</strong>
                    </div>
                    <p style={item.multiline ? styles.clinicTextMultiline : styles.clinicText}>{item.value}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Video Consultation Information */}
            {consultationType === 'Video Consultation' && (
              <div style={styles.card}>
                <h3 style={styles.sectionTitle}>Video Consultation Details</h3>
                {[
                  { label: 'Platform', value: 'Secure Video Conferencing Platform', icon: <Icons.Video /> },
                  { label: 'Meeting Link', value: 'Will be sent to your registered email 15 minutes before appointment', icon: <Icons.Mail /> },
                  { label: 'Requirements', value: '• Stable internet connection\n• Webcam and microphone\n• Quiet, well-lit environment', multiline: true, icon: <Icons.Info /> },
                  { label: 'Support', value: '1-800-QUICK-VIDEO\nvideo-support@quickmed.com', multiline: true, icon: <Icons.Phone /> }
                ].map((item, idx) => (
                  <div key={idx} style={styles.clinicItem}>
                    <div style={styles.clinicHeader}>
                      <span style={styles.clinicIcon}>{item.icon}</span>
                      <strong style={styles.clinicLabel}>{item.label}:</strong>
                    </div>
                    <p style={item.multiline ? styles.clinicTextMultiline : styles.clinicText}>{item.value}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Home Consultation Information */}
            {consultationType === 'Home Consultation' && (
              <div style={styles.card}>
                <h3 style={styles.sectionTitle}>Home Consultation Details</h3>
                {[
                  { label: 'Service Area', value: `Within 10km radius of ${appointment.hospital || appointment.clinic?.name || doctorInfo.clinic}`, icon: <Icons.Location /> },
                  { label: 'Doctor Arrival', value: 'Doctor will arrive within the scheduled time window', icon: <Icons.Clock /> },
                  { label: 'Preparation', value: '• Have medical reports ready\n• Ensure well-lit consultation area\n• Keep emergency contacts handy', multiline: true, icon: <Icons.Info /> },
                  { label: 'Support', value: '1-800-QUICK-HOME\nhome-support@quickmed.com', multiline: true, icon: <Icons.Phone /> }
                ].map((item, idx) => (
                  <div key={idx} style={styles.clinicItem}>
                    <div style={styles.clinicHeader}>
                      <span style={styles.clinicIcon}>{item.icon}</span>
                      <strong style={styles.clinicLabel}>{item.label}:</strong>
                    </div>
                    <p style={item.multiline ? styles.clinicTextMultiline : styles.clinicText}>{item.value}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Phone Consultation Information */}
            {consultationType === 'Phone Consultation' && (
              <div style={styles.card}>
                <h3 style={styles.sectionTitle}>Phone Consultation Details</h3>
                {[
                  { label: 'Call From', value: 'Doctor will call from a private number', icon: <Icons.Phone /> },
                  { label: 'Timing', value: 'Doctor will call at the scheduled appointment time', icon: <Icons.Clock /> },
                  { label: 'Preparation', value: '• Keep your phone available\n• Find a quiet place for the call\n• Have your medical history ready', multiline: true, icon: <Icons.Info /> },
                  { label: 'Support', value: '1-800-QUICK-PHONE\nphone-support@quickmed.com', multiline: true, icon: <Icons.Phone /> }
                ].map((item, idx) => (
                  <div key={idx} style={styles.clinicItem}>
                    <div style={styles.clinicHeader}>
                      <span style={styles.clinicIcon}>{item.icon}</span>
                      <strong style={styles.clinicLabel}>{item.label}:</strong>
                    </div>
                    <p style={item.multiline ? styles.clinicTextMultiline : styles.clinicText}>{item.value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Main Appointments List View
  if (showDetails && selectedAppointment) {
    return <AppointmentDetails appointment={selectedAppointment} onBack={handleBackToList} />;
  }

  // Filter buttons configuration
  const filterButtons = [
    { key: 'all', label: 'All Appointments' },
    { key: 'confirmed', label: 'Confirmed' },
    { key: 'pending', label: 'Pending Payment' },
    { key: 'completed', label: 'Completed' },
    { key: 'cancelled', label: 'Cancelled' }
  ];

  return (
    <div style={styles.mainContainer}>
      <div style={styles.contentWrapper}>
        <div style={styles.header}>
          <BackButton onClick={() => setActiveView('dashboard')} text="Dashboard" />
          <div style={styles.headerCenter}>
            <h1 style={styles.mainTitle}>My Appointments</h1>
            <p style={styles.subtitle}>Quick Care, Better Health</p>
          </div>
          <div style={styles.headerActions}>
            <div style={styles.searchContainer}>
              <input
                type="text"
                placeholder="Search appointments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
              />
              <span style={styles.searchIcon}>
                <Icons.Search />
              </span>
            </div>
            <button 
              style={styles.bookButton}
              onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                setTimeout(() => setActiveView('consultation'), 100);
              }}
              type="button"
            >
              <span style={styles.plusIcon}><Icons.Plus /></span>
              Book New Appointment
            </button>
          </div>
        </div>

        <div style={styles.filterContainer}>
          {filterButtons.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setAppointmentFilter(key)}
              style={{
                ...styles.filterButton,
                backgroundColor: appointmentFilter === key ? '#009688' : 'white',
                color: appointmentFilter === key ? 'white' : '#124441',
                border: `1px solid ${appointmentFilter === key ? '#009688' : '#4DB6AC'}`
              }}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>

        <div style={styles.appointmentsList}>
          {displayAppointments.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>
                <Icons.Calendar />
              </div>
              <h3 style={styles.emptyTitle}>No Appointments Found</h3>
              <p style={styles.emptyText}>
                {searchTerm || appointmentFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria.' 
                  : 'You don\'t have any appointments yet.'}
              </p>
              <button 
                style={styles.bookButton}
                onClick={() => {
                  setSearchTerm('');
                  setAppointmentFilter('all');
                  setActiveView('consultation');
                }}
                type="button"
              >
                <span style={styles.plusIcon}><Icons.Plus /></span>
                Book Your First Appointment
              </button>
            </div>
          ) : (
            displayAppointments.map((appointment) => {
              const statusStyle = getStatusColor(appointment.status);
              const paymentStyle = appointment.payment ? getPaymentStatusColor(appointment.payment.status) : null;
              const consultationType = getConsultationType(appointment);
              const consultationIcon = getConsultationIcon(appointment.type);

              return (
                <div key={appointment.id} style={styles.appointmentCard}>
                  <div style={styles.cardContent}>
                    <div style={{ flex: 1 }}>
                      <div style={styles.statusContainer}>
                        <span style={{ ...styles.statusBadge, ...statusStyle }}>
                          <span style={styles.statusIconSmall}>{statusStyle.icon}</span>
                          {formatStatusDisplay(appointment.status)}
                        </span>
                        <span style={styles.idText}>
                          <Icons.Info /> ID: {appointment.id}
                        </span>
                        <span style={{
                          backgroundColor: consultationType.includes('Video') ? '#00796B' : 
                                         consultationType.includes('Home') ? '#4DB6AC' : 
                                         consultationType.includes('Phone') ? '#2196F3' : '#009688',
                          color: 'white',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '10px',
                          fontSize: '0.7rem',
                          fontWeight: '600',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}>
                          <span style={styles.consultationIcon}>{consultationIcon}</span>
                          {consultationType}
                        </span>
                        {appointment.priority && (
                          <span style={{
                            backgroundColor: appointment.priority === 'L1' || appointment.priority === 'high' ? '#FEE2E2' : 
                                         appointment.priority === 'L2' || appointment.priority === 'medium' ? '#FEF3C7' : '#D1FAE5',
                            color: appointment.priority === 'L1' || appointment.priority === 'high' ? '#DC2626' : 
                                 appointment.priority === 'L2' || appointment.priority === 'medium' ? '#D97706' : '#059669',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '10px',
                            fontSize: '0.7rem',
                            fontWeight: '600',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.2rem'
                          }}>
                            {appointment.priority === 'L1' || appointment.priority === 'high' ? <Icons.PriorityHigh /> : 
                             appointment.priority === 'L2' || appointment.priority === 'medium' ? <Icons.PriorityMedium /> : <Icons.PriorityLow />} 
                            {appointment.priority === 'L1' || appointment.priority === 'high' ? ' High' : 
                             appointment.priority === 'L2' || appointment.priority === 'medium' ? ' Medium' : ' Low'}
                          </span>
                        )}
                        {appointment.payment && (
                          <span style={{
                            ...styles.paymentBadge,
                            backgroundColor: paymentStyle.background,
                            color: paymentStyle.color
                          }}>
                            <span style={styles.paymentIconSmall}>{paymentStyle.icon}</span>
                            {formatStatusDisplay(appointment.payment.status)}
                          </span>
                        )}
                      </div>
                      <h3 style={styles.cardDoctorName}>
                        <span style={styles.doctorIconSmall}><Icons.Doctor /></span>
                        {appointment.doctorName}
                      </h3>
                      <p style={styles.cardSpecialty}>
                        {appointment.doctorSpecialty}
                      </p>
                      <div style={styles.cardDetails}>
                        {[
                          { label: 'Date:', value: formatDate(appointment.date), icon: <Icons.Calendar /> },
                          { label: 'Time:', value: formatTime(appointment.time), icon: <Icons.ClockSmall /> },
                          { label: 'Type:', value: consultationType, icon: consultationIcon },
                          { label: 'Fee:', value: `₹${appointment.fee || '500'}`, icon: '₹' }
                        ].map((item, idx) => (
                          <div key={idx}>
                            <div style={styles.cardDetailHeader}>
                              <span style={styles.cardDetailIcon}>{item.icon}</span>
                              <strong style={styles.cardLabel}>{item.label}</strong>
                            </div>
                            <p style={styles.cardValue}>{item.value}</p>
                          </div>
                        ))}
                      </div>
                      <p style={styles.cardAbout}>
                        {consultationType === 'Home Consultation' 
                          ? 'Home consultation at your location'
                          : consultationType === 'Video Consultation'
                          ? 'Video call consultation'
                          : consultationType === 'Phone Consultation'
                          ? 'Phone consultation'
                          : 'Clinic appointment at ' + (appointment.hospital || appointment.clinic?.name || 'QuickMed Clinic')}
                      </p>
                      {appointment.payment && (
                        <div style={styles.paymentSummary}>
                          <span style={styles.paymentAmount}>Paid: ₹{appointment.payment.amount}</span>
                          {appointment.payment.paymentId && (
                            <span style={styles.paymentIdSmall}>
                              <Icons.Info /> Payment ID: {appointment.payment.paymentId.slice(0, 8)}...
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <div style={styles.actionButtons}>
                      <button
                        onClick={() => handleViewDetails(appointment)}
                        style={styles.viewButton}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#009688';
                          e.target.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.color = '#124441';
                        }}
                        type="button"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div style={styles.footer}>
          <h4 style={styles.footerTitle}>Need Help?</h4>
          <p style={styles.footerText}>
            Contact our support team for assistance with appointments, payments, or medical queries.
          </p>
          <div style={styles.contactInfo}>
            <span><Icons.Phone /> Support: 1-800-QUICK-MED</span>
            <span><Icons.Mail /> Email: support@quickmed.com</span>
            <span><Icons.Clock /> Available 24/7</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  mainContainer: {
    marginTop: '140px',
    padding: '0',
    width: '100vw',
    marginLeft: '0',
    marginRight: '0',
    minHeight: 'calc(100vh - 120px)',
    overflowX: 'hidden',
    backgroundColor: '#E0F2F1'
  },
  contentWrapper: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '1.5rem',
    minHeight: 'calc(100vh - 120px)'
  },
  backButton: {
    padding: '0.5rem 1rem',
    backgroundColor: 'transparent',
    color: '#009688',
    border: '1px solid #009688',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    ':hover': {
      backgroundColor: '#009688',
      color: 'white'
    }
  },
  backButtonIcon: {
    display: 'flex',
    alignItems: 'center'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  headerCenter: {
    textAlign: 'center',
    flex: 1
  },
  mainTitle: {
    color: '#124441',
    fontSize: '2rem',
    margin: '0 0 0.5rem 0',
    fontWeight: '700'
  },
  subtitle: {
    color: '#4F6F6B',
    margin: '0',
    fontSize: '1rem'
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap'
  },
  searchContainer: {
    position: 'relative',
    minWidth: '200px'
  },
  searchInput: {
    padding: '0.75rem 1rem 0.75rem 2.5rem',
    border: '2px solid #4DB6AC',
    borderRadius: '8px',
    fontSize: '0.9rem',
    width: '80%',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    backgroundColor: '#FFFFFF'
  },
  searchIcon: {
    position: 'absolute',
    left: '0.75rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#009688',
    display: 'flex',
    alignItems: 'center'
  },
  bookButton: {
    padding: '0.75rem 1rem',
    backgroundColor: '#009688',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '600',
    whiteSpace: 'nowrap',
    minWidth: '130px',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    ':hover': {
      backgroundColor: '#00796B',
      transform: 'translateY(-2px)'
    }
  },
  plusIcon: {
    display: 'flex',
    alignItems: 'center'
  },
  filterContainer: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  filterButton: {
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    ':hover': {
      transform: 'translateY(-2px)'
    }
  },
  appointmentsList: {
    display: 'grid',
    gap: '1.5rem',
    marginBottom: '3rem'
  },
  emptyState: {
    textAlign: 'center',
    padding: '3rem',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 15px rgba(0,0,0,0.08)'
  },
  emptyIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
    color: '#009688',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyTitle: {
    color: '#124441',
    marginBottom: '0.5rem'
  },
  emptyText: {
    color: '#4F6F6B',
    marginBottom: '1.5rem'
  },
  appointmentCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 2px 15px rgba(0,0,0,0.08)',
    border: '1px solid #4DB6AC',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    ':hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.12)'
    }
  },
  cardContent: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'flex-start'
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1rem',
    flexWrap: 'wrap'
  },
  statusBadge: {
    padding: '0.25rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem'
  },
  statusIcon: {
    display: 'flex',
    alignItems: 'center'
  },
  statusIconSmall: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.75rem'
  },
  idBadge: {
    color: '#4F6F6B',
    fontSize: '0.9rem',
    fontWeight: '500',
    backgroundColor: '#E0F2F1',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  idText: {
    color: '#4F6F6B',
    fontSize: '0.85rem',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem'
  },
  paymentBadge: {
    padding: '0.2rem 0.6rem',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: '600',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.25rem'
  },
  paymentIcon: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '0.25rem'
  },
  paymentIconSmall: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.7rem'
  },
  doctorName: {
    color: '#124441',
    fontSize: '1.75rem',
    margin: '0 0 0.5rem 0',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  doctorIcon: {
    display: 'flex',
    alignItems: 'center'
  },
  cardDoctorName: {
    color: '#124441',
    fontSize: '1.25rem',
    margin: '0 0 0.5rem 0',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  doctorIconSmall: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.9rem'
  },
  specialtyText: {
    color: '#4F6F6B',
    margin: '0 0 1.5rem 0',
    fontSize: '1.1rem',
    fontWeight: '500'
  },
  cardSpecialty: {
    color: '#4F6F6B',
    margin: '0 0 1rem 0',
    fontSize: '0.9rem'
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  detailItem: {
    padding: '1rem',
    backgroundColor: '#E0F2F1',
    borderRadius: '8px',
    border: '1px solid #4DB6AC'
  },
  detailHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.5rem'
  },
  detailIcon: {
    display: 'flex',
    alignItems: 'center',
    color: '#009688'
  },
  detailLabel: {
    color: '#124441',
    fontSize: '0.9rem',
    display: 'block'
  },
  detailValue: {
    color: '#124441',
    margin: 0,
    fontSize: '1rem',
    fontWeight: '600'
  },
  cardDetails: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginBottom: '1.5rem'
  },
  cardDetailHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    marginBottom: '0.25rem'
  },
  cardDetailIcon: {
    display: 'flex',
    alignItems: 'center',
    color: '#009688',
    fontSize: '0.8rem'
  },
  cardLabel: {
    color: '#009688',
    fontSize: '0.85rem'
  },
  cardValue: {
    color: '#124441',
    margin: '0.25rem 0 0 0',
    fontSize: '0.9rem',
    fontWeight: '500'
  },
  paymentContainer: {
    padding: '1.5rem',
    backgroundColor: '#E0F2F1',
    borderRadius: '8px',
    border: '1px solid #4DB6AC',
    marginBottom: '1.5rem'
  },
  paymentDetails: {
    display: 'grid',
    gap: '0.75rem'
  },
  paymentDetailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem 0',
    borderBottom: '1px solid #4DB6AC',
    ':last-child': {
      borderBottom: 'none'
    }
  },
  paymentLabel: {
    color: '#4F6F6B',
    fontSize: '0.9rem'
  },
  paymentStatus: {
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    fontSize: '0.85rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem'
  },
  paymentValue: {
    color: '#124441',
    fontSize: '0.9rem',
    fontWeight: '600'
  },
  paymentId: {
    color: '#4F6F6B',
    fontSize: '0.85rem',
    fontFamily: 'monospace'
  },
  paymentSummary: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginTop: '0.5rem',
    paddingTop: '0.5rem',
    borderTop: '1px solid #4DB6AC',
    fontSize: '0.85rem'
  },
  paymentAmount: {
    color: '#059669',
    fontSize: '0.85rem',
    fontWeight: '600'
  },
  paymentIdSmall: {
    color: '#4F6F6B',
    fontSize: '0.8rem',
    fontFamily: 'monospace',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem'
  },
  notesContainer: {
    padding: '1.5rem',
    backgroundColor: '#E0F2F1',
    borderRadius: '8px',
    border: '1px solid #4DB6AC'
  },
  sectionTitle: {
    color: '#124441',
    marginBottom: '1rem',
    fontSize: '1.1rem',
    fontWeight: '600'
  },
  notesText: {
    color: '#4F6F6B',
    margin: '0 0 0.5rem 0',
    fontSize: '0.9rem',
    lineHeight: '1.6',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.5rem'
  },
  noteIcon: {
    display: 'flex',
    alignItems: 'center',
    color: '#009688',
    flexShrink: 0,
    marginTop: '0.15rem'
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '2rem',
    alignItems: 'start'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 2px 15px rgba(0,0,0,0.08)',
    border: '1px solid #4DB6AC',
    marginBottom: '1.5rem'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
    marginBottom: '1.5rem'
  },
  infoRow: {
    marginBottom: '0.5rem'
  },
  infoHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.25rem'
  },
  infoIcon: {
    display: 'flex',
    alignItems: 'center',
    color: '#009688'
  },
  infoLabel: {
    color: '#009688',
    fontSize: '0.9rem',
    display: 'block'
  },
  infoValue: {
    color: '#124441',
    margin: 0,
    fontSize: '0.9rem',
    fontWeight: '500'
  },
  aboutText: {
    color: '#4F6F6B',
    margin: '0.5rem 0 0 0',
    fontSize: '0.9rem',
    lineHeight: '1.6'
  },
  clinicItem: {
    marginBottom: '1.5rem'
  },
  clinicHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.5rem'
  },
  clinicIcon: {
    display: 'flex',
    alignItems: 'center',
    color: '#009688'
  },
  clinicLabel: {
    color: '#009688',
    fontSize: '0.9rem',
    display: 'block'
  },
  clinicText: {
    color: '#124441',
    margin: 0,
    fontSize: '0.9rem',
    fontWeight: '500'
  },
  clinicTextMultiline: {
    color: '#4F6F6B',
    margin: 0,
    fontSize: '0.9rem',
    lineHeight: '1.5',
    whiteSpace: 'pre-line'
  },
  detailsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  cardAbout: {
    color: '#4F6F6B',
    fontSize: '0.85rem',
    lineHeight: '1.5',
    margin: '0.5rem 0'
  },
  consultationIcon: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.7rem'
  },
  actionButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    minWidth: '140px'
  },
  viewButton: {
    padding: '0.6rem 1rem',
    backgroundColor: 'transparent',
    color: '#124441',
    border: '1px solid #009688',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.8rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  },
  footer: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 2px 15px rgba(0,0,0,0.08)',
    border: '1px solid #4DB6AC',
    textAlign: 'center'
  },
  footerTitle: {
    color: '#124441',
    marginBottom: '1rem'
  },
  footerText: {
    color: '#4F6F6B',
    fontSize: '0.9rem',
    marginBottom: '1rem'
  },
  contactInfo: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    flexWrap: 'wrap',
    fontSize: '0.9rem',
    color: '#4F6F6B',
    '& > span': {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    }
  }
};

export default AppointmentsView;