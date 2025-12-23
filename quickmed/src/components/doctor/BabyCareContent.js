import React, { useState, useEffect } from 'react';

const BabyCareContent = ({ dashboardData, state, actions }) => {
  const { babyCareFilter } = state;
  const { setBabyCareFilter } = actions;

  const [activeTab, setActiveTab] = useState('appointments');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showReportViewer, setShowReportViewer] = useState(false);
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [showVideoConsultation, setShowVideoConsultation] = useState(false);
  const [currentConsultation, setCurrentConsultation] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [callTime, setCallTime] = useState(0);
  const [loadingAppointments, setLoadingAppointments] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [patientReports, setPatientReports] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState('basic');
  const [showPlanDetails, setShowPlanDetails] = useState(false);
  
  // Local state for appointments
  const [appointments, setAppointments] = useState({
    pending: [...(dashboardData.babyCareAppointments?.pending || [])],
    upcoming: [...(dashboardData.babyCareAppointments?.upcoming || [])],
    cancelled: [...(dashboardData.babyCareAppointments?.cancelled || [])]
  });

  // Local state for patients
  const [patients, setPatients] = useState([]);

  // Baby Care Plans Data
  const babyCarePlans = [
    {
      id: 'basic',
      name: 'Basic Plan',
      price: '₹8,999/month',
      duration: 'Monthly subscription',
      patients: '45 babies enrolled',
      icon: '👶',
      color: '#009688',
      features: [
        'Supplies & hygiene essentials delivery',
        'Diapers, wipes, skincare monthly',
        'Basic feeding & diaper assistance',
        'Light caregiving (up to 8 hours/day)',
        'Basic hygiene & nursery maintenance',
        'Monthly check-in advice line',
        'Parent support chat'
      ],
      idealFor: 'Newborns & early months',
      coverage: '8 hours/day caregiver support'
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: '₹14,999/month',
      duration: 'Monthly subscription',
      patients: '28 babies enrolled',
      icon: '🌟',
      color: '#4DB6AC',
      features: [
        'Everything in Basic Plan',
        'Extended caregiver (12 hours/day)',
        'Enhanced hygiene & regular bathing',
        'Nursery cleaning & management',
        'Play & developmental support',
        'Sleep & routine establishment',
        'Daily/weekly progress reports',
        'Age-appropriate toys & activities',
        'Feeding schedule management'
      ],
      idealFor: 'Working parents, busy households',
      coverage: '12 hours/day day+night support'
    },
    {
      id: 'comprehensive',
      name: 'Comprehensive Plan',
      price: '₹24,999/month',
      duration: 'Monthly subscription',
      patients: '15 babies enrolled',
      icon: '👑',
      color: '#00796B',
      features: [
        'Everything in Premium Plan',
        '24×7 live-in caregiver/nanny',
        'Health monitoring & vaccination reminders',
        'Pediatrician consultation access',
        'Lactation & nutrition guidance',
        'Sleep-training & parenting coaching',
        'Postnatal & mother support',
        'Premium organic supplies',
        'Monthly baby-kit box',
        'Replacement guarantee',
        'Long-term contract options'
      ],
      idealFor: 'Both parents working, full support needed',
      coverage: '24×7 round-the-clock care'
    }
  ];

  // Timer for video call
  useEffect(() => {
    let timer;
    if (showVideoConsultation && callTime >= 0) {
      timer = setInterval(() => {
        setCallTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showVideoConsultation, callTime]);

  // Initialize states
  useEffect(() => {
    const babyCarePatients = [...(dashboardData.patients?.filter(p => p.patientType === 'baby') || [])];
    setPatients(babyCarePatients);
    
    const reportsState = {};
    babyCarePatients.forEach(patient => {
      reportsState[patient.id] = patient.babyCareDetails?.reports || [];
    });
    setPatientReports(reportsState);
  }, [dashboardData]);

  // Get baby care appointments
  const getFilteredBabyCareAppointments = () => {
    switch (babyCareFilter) {
      case 'pending': return appointments.pending;
      case 'upcoming': return appointments.upcoming;
      case 'cancelled': return appointments.cancelled;
      default: return appointments.upcoming;
    }
  };

  // Show simple notification
  const showNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  // Handle appointment approval
  const handleApproveAppointment = (appointment) => {
    setLoadingAppointments(prev => ({ ...prev, [appointment.id]: true }));

    setTimeout(() => {
      setAppointments(prev => {
        const pendingIndex = prev.pending.findIndex(a => a.id === appointment.id);
        if (pendingIndex === -1) return prev;

        const approvedAppointment = prev.pending[pendingIndex];
        const newPending = [...prev.pending];
        newPending.splice(pendingIndex, 1);
        
        return {
          ...prev,
          pending: newPending,
          upcoming: [...prev.upcoming, { ...approvedAppointment, status: 'upcoming' }]
        };
      });
      
      showNotification(`Appointment approved for ${appointment.patientName}`, 'success');
      setLoadingAppointments(prev => ({ ...prev, [appointment.id]: false }));
    }, 1000);
  };

  // Handle appointment rejection
  const handleRejectAppointment = (appointment) => {
    setLoadingAppointments(prev => ({ ...prev, [appointment.id]: true }));

    setTimeout(() => {
      setAppointments(prev => {
        const pendingIndex = prev.pending.findIndex(a => a.id === appointment.id);
        if (pendingIndex === -1) return prev;

        const rejectedAppointment = prev.pending[pendingIndex];
        const newPending = [...prev.pending];
        newPending.splice(pendingIndex, 1);
        
        return {
          ...prev,
          pending: newPending,
          cancelled: [...prev.cancelled, { 
            ...rejectedAppointment, 
            status: 'cancelled',
            cancelledDate: new Date().toLocaleDateString(),
            reason: 'Rejected by doctor'
          }]
        };
      });
      
      showNotification(`Appointment rejected for ${appointment.patientName}`, 'info');
      setLoadingAppointments(prev => ({ ...prev, [appointment.id]: false }));
    }, 1000);
  };

  // Handle appointment cancellation
  const handleCancelAppointment = (appointment) => {
    setLoadingAppointments(prev => ({ ...prev, [appointment.id]: true }));

    setTimeout(() => {
      setAppointments(prev => {
        const upcomingIndex = prev.upcoming.findIndex(a => a.id === appointment.id);
        if (upcomingIndex === -1) return prev;

        const cancelledAppointment = prev.upcoming[upcomingIndex];
        const newUpcoming = [...prev.upcoming];
        newUpcoming.splice(upcomingIndex, 1);
        
        return {
          ...prev,
          upcoming: newUpcoming,
          cancelled: [...prev.cancelled, { 
            ...cancelledAppointment, 
            status: 'cancelled',
            cancelledDate: new Date().toLocaleDateString(),
            reason: 'Cancelled by doctor'
          }]
        };
      });
      
      showNotification(`Appointment cancelled for ${appointment.patientName}`, 'info');
      setLoadingAppointments(prev => ({ ...prev, [appointment.id]: false }));
    }, 1000);
  };

  // Start video consultation
  const handleStartConsultation = (appointment) => {
    setCurrentConsultation(appointment);
    setShowVideoConsultation(true);
    setCallTime(0);
    showNotification(`Starting video consultation with ${appointment.parentName}`, 'info');
  };

  // End video consultation
  const handleEndConsultation = () => {
    setShowVideoConsultation(false);
    setIsRecording(false);
    showNotification(`Video consultation ended with ${currentConsultation?.parentName}`, 'info');
    
    // Move appointment from upcoming to completed
    if (currentConsultation) {
      setAppointments(prev => {
        const upcomingIndex = prev.upcoming.findIndex(a => a.id === currentConsultation.id);
        if (upcomingIndex === -1) return prev;

        const newUpcoming = [...prev.upcoming];
        newUpcoming.splice(upcomingIndex, 1);
        
        return {
          ...prev,
          upcoming: newUpcoming
        };
      });
    }
    
    setCurrentConsultation(null);
  };

  // Toggle recording
  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    showNotification(isRecording ? 'Recording stopped' : 'Recording started', 'info');
  };

  // Handle file upload
  const handleFileUpload = (patientId, patientName, file) => {
    if (!file) return;
    
    if (file.type !== 'application/pdf') {
      showNotification('Please upload PDF files only', 'error');
      return;
    }
    
    showNotification(`Uploading ${file.name} to ${patientName}'s locker...`, 'info');
    
    const newReport = {
      id: Date.now(),
      name: file.name.replace('.pdf', '').replace(/_/g, ' ').toUpperCase(),
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }),
      type: 'pdf',
      file: file,
      url: URL.createObjectURL(file)
    };
    
    setUploadedFiles(prev => [...prev, newReport]);
    
    setPatientReports(prev => ({
      ...prev,
      [patientId]: [...(prev[patientId] || []), newReport]
    }));
    
    showNotification(`${file.name} uploaded successfully`, 'success');
  };

  // Handle package selection
  const handleSelectPackage = (patientId, patientName, packageName) => {
    setPatients(prev => 
      prev.map(patient => 
        patient.id === patientId 
          ? {
              ...patient,
              babyCareDetails: {
                ...patient.babyCareDetails,
                package: packageName
              }
            }
          : patient
      )
    );
    
    showNotification(`Plan updated to ${packageName} for ${patientName}`, 'success');
    setShowPackageModal(false);
  };

  // Format call time
  const formatCallTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Video Consultation Modal
  const VideoConsultationModal = () => {
    if (!showVideoConsultation || !currentConsultation) return null;

    return (
      <div style={styles.videoModalOverlay}>
        <div style={styles.videoModal}>
          <div style={styles.videoHeader}>
            <div style={styles.videoHeaderInfo}>
              <div style={styles.videoStatus}>
                <span style={styles.connectedDot}>●</span>
                <span>Status: connected</span>
              </div>
              <div style={styles.callTimer}>
                <span>{formatCallTime(callTime)}</span>
              </div>
            </div>
            <button 
              style={styles.endCallButton}
              onClick={handleEndConsultation}
            >
              End Call
            </button>
          </div>

          <div style={styles.videoMainArea}>
            <div style={styles.patientVideoContainer}>
              <div style={styles.patientVideoHeader}>
                <div style={styles.patientVideoInfo}>
                  <h3 style={styles.patientVideoName}>{currentConsultation.parentName}</h3>
                  <div style={styles.babyInfoIndicator}>
                    👶 Baby: {currentConsultation.babyName} • {currentConsultation.babyAge}
                  </div>
                </div>
              </div>
              
              <div style={styles.videoFeed}>
                <div style={styles.videoMock}>
                  <div style={styles.videoMockContent}>
                    <div style={styles.videoMockAvatar}>
                      <span style={styles.avatarEmoji}>👶</span>
                    </div>
                    <div style={styles.videoMockInfo}>
                      <p style={styles.videoMockText}>Baby Care Consultation</p>
                      <p style={styles.videoMockSubtext}>{currentConsultation.parentName}</p>
                    </div>
                  </div>
                </div>
                
                <div style={styles.selfView}>
                  <div style={styles.selfViewHeader}>
                    <span style={styles.selfViewLabel}>You</span>
                  </div>
                  <div style={styles.selfViewVideo}>
                    <div style={styles.selfViewMock}>
                      <span style={styles.selfViewEmoji}>👨‍⚕️</span>
                      <p style={styles.selfViewText}>Dr. View</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.quickTools}>
              <div style={styles.quickToolsHeader}>
                <h4 style={styles.quickToolsTitle}>Baby Care Tools</h4>
              </div>
              
              <div style={styles.toolButtons}>
                <button 
                  style={isRecording ? styles.recordingButton : styles.toolButton}
                  onClick={handleToggleRecording}
                >
                  <span style={styles.toolIcon}>⏺️</span>
                  <span>{isRecording ? 'Recording...' : 'Record'}</span>
                </button>
                
                <button 
                  style={styles.toolButton}
                  onClick={() => showNotification('Opening feeding guide', 'info')}
                >
                  <span style={styles.toolIcon}>🍼</span>
                  <span>Feeding Guide</span>
                </button>
                
                <button 
                  style={styles.toolButton}
                  onClick={() => showNotification('Opening growth chart', 'info')}
                >
                  <span style={styles.toolIcon}>📈</span>
                  <span>Growth Chart</span>
                </button>
                
                <button 
                  style={styles.toolButton}
                  onClick={() => showNotification('Opening vaccination schedule', 'info')}
                >
                  <span style={styles.toolIcon}>💉</span>
                  <span>Vaccination</span>
                </button>
                
                <button 
                  style={styles.toolButton}
                  onClick={() => showNotification('Opening sleep schedule', 'info')}
                >
                  <span style={styles.toolIcon}>😴</span>
                  <span>Sleep Guide</span>
                </button>
              </div>
              
              <div style={styles.consultationNotes}>
                <h4 style={styles.notesTitle}>Consultation Notes</h4>
                <textarea 
                  style={styles.notesTextarea}
                  placeholder="Add notes about baby's health, feeding, sleep, recommendations..."
                  rows="4"
                />
                <button 
                  style={styles.saveNotesButton}
                  onClick={() => showNotification('Notes saved', 'success')}
                >
                  Save Notes
                </button>
              </div>
            </div>
          </div>

          <div style={styles.videoFooter}>
            <div style={styles.appointmentInfo}>
              <strong>Baby:</strong> {currentConsultation.babyName} ({currentConsultation.babyAge})
            </div>
            <div style={styles.consultationType}>
              <strong>Plan:</strong> {currentConsultation.plan || 'Basic Plan'}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Baby Care Appointment Card Component
  const BabyCareAppointmentCard = ({ appointment }) => {
    const isLoading = loadingAppointments[appointment.id];

    return (
      <div style={styles.appointmentCard}>
        <div style={styles.appointmentHeader}>
          <div style={styles.appointmentPatient}>
            <div style={styles.profileIcon}>
              <span>👶</span>
            </div>
            <div style={styles.patientInfo}>
              <h3 style={styles.appointmentName}>
                {appointment.parentName}
                <span style={{
                  ...styles.planBadge,
                  backgroundColor: babyCarePlans.find(p => p.id === appointment.plan)?.color || '#009688'
                }}>
                  {appointment.plan?.toUpperCase() || 'BASIC'} PLAN
                </span>
              </h3>
              <p style={styles.appointmentMeta}>
                Baby: {appointment.babyName} • Age: {appointment.babyAge}
                {appointment.vaccinationDue && (
                  <span style={styles.vaccineBadge}> 💉 Vaccine Due</span>
                )}
              </p>
              <div style={styles.consultationType}>
                {appointment.consultationType === 'offline' ? '🏥 Hospital' : 
                 appointment.consultationType === 'home_visit' ? '🏠 Home Visit' : '💻 Online'}
              </div>
            </div>
          </div>
          <div style={styles.appointmentTime}>
            <strong>{appointment.time}</strong>
            <span>{appointment.date}</span>
            <div style={styles.caregiverInfo}>
              👩‍🍼 {appointment.caregiverHours || '8 hours'} caregiver support
            </div>
          </div>
        </div>
        
        <div style={styles.appointmentDetails}>
          <p><strong>Concern:</strong> {appointment.issue}</p>
          <p><strong>Feeding:</strong> {appointment.feedingType}</p>
          <p><strong>Caregiver Notes:</strong> {appointment.caregiverNotes || 'No notes'}</p>
        </div>

        <div style={styles.appointmentActions}>
          {babyCareFilter === 'pending' && (
            <>
              <button 
                style={styles.successButton}
                onClick={() => handleApproveAppointment(appointment)}
                disabled={isLoading}
              >
                {isLoading ? 'Approving...' : 'Approve'}
              </button>
              <button 
                style={styles.dangerButton}
                onClick={() => handleRejectAppointment(appointment)}
                disabled={isLoading}
              >
                {isLoading ? 'Rejecting...' : 'Reject'}
              </button>
            </>
          )}
          
          {babyCareFilter === 'upcoming' && (
            <>
              <button 
                style={styles.primaryButton}
                onClick={() => handleStartConsultation(appointment)}
                disabled={isLoading}
              >
                Start Consultation
              </button>
              <button 
                style={styles.secondaryButton}
                onClick={() => showNotification(`Sending reminders to ${appointment.parentName}`, 'info')}
              >
                Send Reminder
              </button>
              <button 
                style={styles.dangerButton}
                onClick={() => handleCancelAppointment(appointment)}
                disabled={isLoading}
              >
                {isLoading ? 'Cancelling...' : 'Cancel'}
              </button>
            </>
          )}
          
          {babyCareFilter === 'cancelled' && (
            <div style={styles.cancelledInfo}>
              <p><strong>Cancelled Date:</strong> {appointment.cancelledDate || 'N/A'}</p>
              <p><strong>Reason:</strong> {appointment.reason || 'Not specified'}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Baby Care Patient Card Component
  const BabyCarePatientCard = ({ patient }) => {
    const patientReportsList = patientReports[patient.id] || [];
    const uploadedPatientFiles = uploadedFiles.filter(file => 
      patientReportsList.some(report => report.id === file.id)
    );
    const allReports = [...patientReportsList, ...uploadedPatientFiles];
    const plan = patient.babyCareDetails?.package || 'basic';
    const currentPlan = babyCarePlans.find(p => p.id === plan);

    return (
      <div style={styles.patientCard}>
        <div style={styles.patientHeader}>
          <div style={styles.profileIconLarge}>
            <span>👶</span>
          </div>
          <div style={styles.patientBasicInfo}>
            <h3 style={styles.patientName}>{patient.babyCareDetails?.parentName || patient.name}</h3>
            <p style={styles.patientContact}>Baby: {patient.name}</p>
            <p style={styles.patientContact}>Phone: {patient.babyCareDetails?.parentPhone || patient.phone}</p>
          </div>
        </div>

        <div style={{
          ...styles.planIndicator,
          borderLeft: `4px solid ${currentPlan.color}`
        }}>
          <div style={styles.planHeader}>
            <span style={styles.planIcon}>{currentPlan.icon}</span>
            <span style={styles.planName}>{currentPlan.name}</span>
          </div>
          <div style={styles.planCoverage}>
            <span style={styles.coverageText}>{currentPlan.coverage}</span>
          </div>
        </div>

        <div style={styles.babyDetails}>
          <div style={styles.detailRow}>
            <span>Baby Age:</span>
            <strong>{patient.babyCareDetails?.age || 'N/A'}</strong>
          </div>
          <div style={styles.detailRow}>
            <span>Weight:</span>
            <strong>{patient.babyCareDetails?.weight || 'N/A'} kg</strong>
          </div>
          <div style={styles.detailRow}>
            <span>Feeding:</span>
            <strong>{patient.babyCareDetails?.feedingType || 'N/A'}</strong>
          </div>
          <div style={styles.detailRow}>
            <span>Next Vaccination:</span>
            <strong style={patient.babyCareDetails?.vaccinationDue ? styles.dueText : {}}>
              {patient.babyCareDetails?.nextVaccination || 'Not scheduled'}
            </strong>
          </div>
        </div>

        <div style={styles.reportsSummary}>
          <strong>Reports:</strong>
          <span style={styles.reportCount}>
            {allReports.length} files
          </span>
        </div>

        <div style={styles.patientActions}>
          <button 
            style={styles.primaryButton}
            onClick={() => {
              setSelectedPatient({ ...patient, reports: allReports });
              setShowReportViewer(true);
            }}
          >
            View Reports
          </button>
          <button 
            style={{
              ...styles.secondaryButton,
              borderColor: currentPlan.color,
              color: currentPlan.color
            }}
            onClick={() => {
              setSelectedPatient({ ...patient, reports: allReports });
              setShowPackageModal(true);
            }}
          >
            Change Plan
          </button>
        </div>
      </div>
    );
  };

  // Plan Details Modal
  const PlanDetailsModal = () => {
    if (!showPlanDetails) return null;
    
    const plan = babyCarePlans.find(p => p.id === selectedPlan);

    return (
      <div style={styles.modalOverlay}>
        <div style={styles.modal}>
          <div style={styles.modalHeader}>
            <h3>{plan.name} - Complete Details</h3>
            <button 
              style={styles.closeButton}
              onClick={() => setShowPlanDetails(false)}
            >
              ✕
            </button>
          </div>
          
          <div style={styles.modalContent}>
            <div style={{
              ...styles.planHeaderCard,
              backgroundColor: `${plan.color}20`,
              borderColor: plan.color
            }}>
              <div style={styles.planHeaderContent}>
                <div style={styles.planIconLarge}>{plan.icon}</div>
                <div>
                  <h4 style={styles.planTitle}>{plan.name}</h4>
                  <p style={styles.planPrice}>{plan.price}</p>
                  <p style={styles.planDuration}>{plan.duration} • {plan.patients}</p>
                </div>
              </div>
            </div>
            
            <div style={styles.section}>
              <h4 style={styles.sectionTitle}>Perfect For</h4>
              <div style={styles.idealFor}>
                <span style={styles.idealForIcon}>🎯</span>
                <span>{plan.idealFor}</span>
              </div>
            </div>
            
            <div style={styles.section}>
              <h4 style={styles.sectionTitle}>Care Coverage</h4>
              <div style={styles.coverageCard}>
                <span style={styles.coverageIcon}>⏰</span>
                <span>{plan.coverage}</span>
              </div>
            </div>
            
            <div style={styles.section}>
              <h4 style={styles.sectionTitle}>All Features</h4>
              <div style={styles.featuresList}>
                {plan.features.map((feature, index) => (
                  <div key={index} style={styles.featureItem}>
                    <span style={styles.checkIcon}>✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div style={styles.section}>
              <h4 style={styles.sectionTitle}>Doctor's Recommendation</h4>
              <div style={styles.recommendation}>
                <p>This plan is ideal for babies who need {plan.id === 'basic' ? 'basic care and support' : 
                  plan.id === 'premium' ? 'comprehensive daily care with developmental support' : 
                  'full-time professional care with medical guidance'}.</p>
              </div>
            </div>
            
            
          </div>
        </div>
      </div>
    );
  };

  // Plans Tab Component
  const PlansTab = () => (
    <div style={styles.plansContainer}>
      <div style={styles.plansHeader}>
        <h3>Baby Care Subscription Plans</h3>
        <p>Three comprehensive plans for different baby care needs</p>
      </div>
      
      <div style={styles.plansGrid}>
        {babyCarePlans.map(plan => (
          <div key={plan.id} style={styles.planCard}>
            <div style={{
              ...styles.planCardHeader,
              backgroundColor: `${plan.color}20`,
              borderBottom: `2px solid ${plan.color}`
            }}>
              <div style={styles.planCardIcon}>{plan.icon}</div>
              <div>
                <h4 style={styles.planCardName}>{plan.name}</h4>
                <div style={styles.planCardPrice}>{plan.price}</div>
              </div>
            </div>
            
            <div style={styles.planCardBody}>
              <div style={styles.planCardCoverage}>
                <span style={styles.coverageIcon}>⏰</span>
                <span>{plan.coverage}</span>
              </div>
              
              <div style={styles.planCardFeatures}>
                <h5 style={styles.featuresTitle}>Key Features:</h5>
                <ul style={styles.featuresList}>
                  {plan.features.slice(0, 4).map((feature, index) => (
                    <li key={index} style={styles.featureListItem}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div style={styles.planCardStats}>
                <span style={styles.statItem}>
                  <strong>{plan.patients.split(' ')[0]}</strong> babies enrolled
                </span>
              </div>
            </div>
            
            <div style={styles.planCardActions}>
              <button 
                style={{
                  ...styles.detailsButton,
                  borderColor: plan.color,
                  color: plan.color
                }}
                onClick={() => {
                  setSelectedPlan(plan.id);
                  setShowPlanDetails(true);
                }}
              >
                View Details
              </button>
              
            </div>
          </div>
        ))}
      </div>
      
      <div style={styles.plansComparison}>
        <h4 style={styles.comparisonTitle}>Plan Comparison</h4>
        <table style={styles.comparisonTable}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Features</th>
              {babyCarePlans.map(plan => (
                <th key={plan.id} style={{...styles.tableHeader, color: plan.color}}>
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.tableCell}>Caregiver Hours</td>
              <td style={styles.tableCell}>8 hrs/day</td>
              <td style={styles.tableCell}>12 hrs/day</td>
              <td style={styles.tableCell}>24×7</td>
            </tr>
            <tr>
              <td style={styles.tableCell}>Supplies</td>
              <td style={styles.tableCell}>Basic</td>
              <td style={styles.tableCell}>Enhanced</td>
              <td style={styles.tableCell}>Premium Organic</td>
            </tr>
            <tr>
              <td style={styles.tableCell}>Medical Guidance</td>
              <td style={styles.tableCell}>Basic</td>
              <td style={styles.tableCell}>Health Monitoring</td>
              <td style={styles.tableCell}>Pediatrician Access</td>
            </tr>
            <tr>
              <td style={styles.tableCell}>Parent Reports</td>
              <td style={styles.tableCell}>Monthly</td>
              <td style={styles.tableCell}>Daily/Weekly</td>
              <td style={styles.tableCell}>Real-time</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  // Notifications Component
  const Notifications = () => (
    <div style={styles.notificationsContainer}>
      {notifications.map(notification => (
        <div
          key={notification.id}
          style={{
            ...styles.notification,
            backgroundColor: notification.type === 'success' ? '#4CAF50' :
                           notification.type === 'error' ? '#F44336' : '#009688'
          }}
        >
          {notification.message}
        </div>
      ))}
    </div>
  );

  return (
    <div style={styles.mainContent}>
      <Notifications />
      <VideoConsultationModal />
      <PlanDetailsModal />
      
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Baby Care</h1>
          <p style={styles.subtitle}>Manage baby care appointments and subscription plans</p>
        </div>
      </div>

      <div style={styles.tabs}>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === 'appointments' && styles.activeTab)
          }}
          onClick={() => setActiveTab('appointments')}
        >
          Appointments ({appointments.upcoming.length + appointments.pending.length})
        </button>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === 'patients' && styles.activeTab)
          }}
          onClick={() => setActiveTab('patients')}
        >
          Patients ({patients.length})
        </button>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === 'plans' && styles.activeTab)
          }}
          onClick={() => setActiveTab('plans')}
        >
          Care Plans
        </button>
      </div>

      {activeTab === 'appointments' && (
        <>
          <div style={styles.filterTabs}>
            <button
              style={{
                ...styles.filterTab,
                ...(babyCareFilter === 'pending' && styles.activeFilterTab)
              }}
              onClick={() => setBabyCareFilter('pending')}
            >
              Pending ({appointments.pending.length})
            </button>
            <button
              style={{
                ...styles.filterTab,
                ...(babyCareFilter === 'upcoming' && styles.activeFilterTab)
              }}
              onClick={() => setBabyCareFilter('upcoming')}
            >
              Upcoming ({appointments.upcoming.length})
            </button>
            <button
              style={{
                ...styles.filterTab,
                ...(babyCareFilter === 'cancelled' && styles.activeFilterTab)
              }}
              onClick={() => setBabyCareFilter('cancelled')}
            >
              Cancelled ({appointments.cancelled.length})
            </button>
          </div>

          <div style={styles.appointmentsContainer}>
            {getFilteredBabyCareAppointments().length > 0 ? (
              getFilteredBabyCareAppointments().map(appointment => (
                <BabyCareAppointmentCard key={appointment.id} appointment={appointment} />
              ))
            ) : (
              <div style={styles.emptyState}>
                <p>No {babyCareFilter} appointments found</p>
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === 'patients' && (
        <div style={styles.patientsContainer}>
          <div style={styles.patientsHeader}>
            <h3>Baby Care Patients ({patients.length})</h3>
          </div>
          
          {patients.length > 0 ? (
            <div style={styles.patientsGrid}>
              {patients.map(patient => (
                <BabyCarePatientCard key={patient.id} patient={patient} />
              ))}
            </div>
          ) : (
            <div style={styles.emptyState}>
              <div style={styles.emptyStateIcon}>👶</div>
              <h4>No babies in care yet</h4>
              <p>No baby patients are currently enrolled in care plans</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'plans' && (
        <PlansTab />
      )}
    </div>
  );
};

const styles = {
  mainContent: {
    padding: '20px',
    backgroundColor: '#E0F2F1',
    minHeight: '100vh'
  },
  header: {
    marginBottom: '25px'
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#124441'
  },
  subtitle: {
    color: '#4F6F6B',
    marginBottom: '0',
    fontSize: '16px'
  },
  tabs: {
    display: 'flex',
    gap: '10px',
    marginBottom: '25px',
    padding: '5px',
    background: '#FFFFFF',
    borderRadius: '10px',
    border: '1px solid #B2DFDB',
    maxWidth: '600px'
  },
  tab: {
    flex: 1,
    padding: '12px 20px',
    background: 'transparent',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    color: '#124441',
    fontWeight: '500',
    fontSize: '14px',
    transition: 'all 0.3s ease'
  },
  activeTab: {
    background: '#009688',
    color: '#FFFFFF',
    boxShadow: '0 2px 8px rgba(0, 150, 136, 0.3)'
  },
  filterTabs: {
    display: 'flex',
    gap: '12px',
    marginBottom: '25px',
    flexWrap: 'wrap'
  },
  filterTab: {
    padding: '10px 20px',
    background: '#FFFFFF',
    border: '1px solid #B2DFDB',
    borderRadius: '8px',
    cursor: 'pointer',
    color: '#124441',
    fontWeight: '500',
    fontSize: '14px',
    transition: 'all 0.2s'
  },
  activeFilterTab: {
    background: '#009688',
    color: '#FFFFFF',
    borderColor: '#009688'
  },
  appointmentsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  appointmentCard: {
    background: '#FFFFFF',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 150, 136, 0.1)',
    border: '1px solid #B2DFDB',
    transition: 'transform 0.2s, box-shadow 0.2s'
  },
  appointmentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '20px'
  },
  appointmentPatient: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center'
  },
  profileIcon: {
    width: '50px',
    height: '50px',
    background: 'linear-gradient(135deg, #E0F2F1 0%, #B2DFDB 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '22px',
    color: '#124441'
  },
  patientInfo: {
    flex: 1
  },
  appointmentName: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap',
    color: '#124441'
  },
  planBadge: {
    background: '#009688',
    color: '#FFFFFF',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600'
  },
  appointmentMeta: {
    fontSize: '14px',
    color: '#4F6F6B',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap'
  },
  vaccineBadge: {
    background: '#FFF3E0',
    color: '#E65100',
    padding: '3px 8px',
    borderRadius: '6px',
    fontSize: '12px',
    border: '1px solid #FFE0B2'
  },
  consultationType: {
    fontSize: '14px',
    color: '#009688',
    fontWeight: '500'
  },
  appointmentTime: {
    textAlign: 'right',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    color: '#124441',
    minWidth: '180px'
  },
  caregiverInfo: {
    fontSize: '13px',
    color: '#4F6F6B',
    background: '#E0F2F1',
    padding: '6px 10px',
    borderRadius: '6px',
    border: '1px solid #B2DFDB'
  },
  appointmentDetails: {
    marginBottom: '20px',
    fontSize: '14px',
    color: '#4F6F6B'
  },
  appointmentActions: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  },
  primaryButton: {
    padding: '10px 20px',
    background: 'linear-gradient(135deg, #009688 0%, #00796B 100%)',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    minWidth: '160px',
    transition: 'all 0.3s ease'
  },
  secondaryButton: {
    padding: '10px 20px',
    background: 'transparent',
    color: '#009688',
    border: '2px solid #009688',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s ease'
  },
  successButton: {
    padding: '10px 20px',
    background: 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.3s ease'
  },
  dangerButton: {
    padding: '10px 20px',
    background: 'linear-gradient(135deg, #F44336 0%, #D32F2F 100%)',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.3s ease'
  },
  cancelledInfo: {
    width: '100%',
    padding: '15px',
    background: '#FFEBEE',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#C62828',
    border: '1px solid #FFCDD2'
  },
  patientsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px'
  },
  patientsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20px'
  },
  patientsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '25px'
  },
  patientCard: {
    background: '#FFFFFF',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 150, 136, 0.1)',
    border: '1px solid #B2DFDB',
    transition: 'transform 0.2s'
  },
  patientHeader: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    marginBottom: '20px'
  },
  profileIconLarge: {
    width: '60px',
    height: '60px',
    background: 'linear-gradient(135deg, #E0F2F1 0%, #B2DFDB 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    color: '#124441'
  },
  patientBasicInfo: {
    flex: 1
  },
  patientName: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '6px',
    color: '#124441'
  },
  patientContact: {
    fontSize: '14px',
    color: '#4F6F6B',
    marginBottom: '3px'
  },
  planIndicator: {
    background: '#F8FAFC',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px',
    border: '1px solid #E0E0E0'
  },
  planHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '8px'
  },
  planIcon: {
    fontSize: '20px'
  },
  planName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#124441'
  },
  planCoverage: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  coverageText: {
    fontSize: '13px',
    color: '#4F6F6B',
    background: '#F1F5F9',
    padding: '4px 10px',
    borderRadius: '12px'
  },
  babyDetails: {
    background: '#E0F2F1',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    border: '1px solid #B2DFDB'
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
    fontSize: '14px',
    color: '#4F6F6B'
  },
  dueText: {
    color: '#D32F2F',
    fontWeight: '600'
  },
  reportsSummary: {
    marginBottom: '20px',
    padding: '15px',
    background: '#FFFFFF',
    borderRadius: '8px',
    fontSize: '14px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid #E0E0E0',
    color: '#124441'
  },
  reportCount: {
    color: '#009688',
    fontWeight: '600',
    fontSize: '15px'
  },
  patientActions: {
    display: 'flex',
    gap: '12px',
    marginTop: '15px'
  },
  // Plans Tab Styles
  plansContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px'
  },
  plansHeader: {
    marginBottom: '10px',
    textAlign: 'center'
  },
  plansGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '25px',
    marginTop: '20px'
  },
  planCard: {
    background: '#FFFFFF',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid #E0E0E0',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.3s ease'
  },
  planCardHeader: {
    padding: '25px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  planCardIcon: {
    fontSize: '32px',
    background: 'rgba(255, 255, 255, 0.9)',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  planCardName: {
    fontSize: '20px',
    fontWeight: '600',
    margin: '0 0 5px 0',
    color: '#124441'
  },
  planCardPrice: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#124441'
  },
  planCardBody: {
    padding: '25px'
  },
  planCardCoverage: {
    background: '#F5F5F5',
    padding: '12px 15px',
    borderRadius: '8px',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px',
    color: '#4F6F6B'
  },
  coverageIcon: {
    fontSize: '18px'
  },
  planCardFeatures: {
    marginBottom: '25px'
  },
  featuresTitle: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '15px',
    color: '#124441'
  },
  featuresList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  featureListItem: {
    fontSize: '14px',
    color: '#4F6F6B',
    paddingLeft: '20px',
    position: 'relative'
  },
  planCardStats: {
    paddingTop: '15px',
    borderTop: '1px solid #E0E0E0'
  },
  statItem: {
    fontSize: '14px',
    color: '#4F6F6B'
  },
  planCardActions: {
    padding: '0 25px 25px 25px',
    display: 'flex',
    gap: '12px'
  },
  detailsButton: {
    flex: 1,
    padding: '12px',
    background: 'transparent',
    color: '#124441',
    border: '2px solid #009688',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s ease'
  },
  recommendButton: {
    flex: 1,
    padding: '12px',
    background: '#009688',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.3s ease'
  },
  plansComparison: {
    background: '#FFFFFF',
    borderRadius: '12px',
    padding: '30px',
    border: '1px solid #B2DFDB'
  },
  comparisonTitle: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#124441',
    textAlign: 'center'
  },
  comparisonTable: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  tableHeader: {
    padding: '15px',
    textAlign: 'left',
    borderBottom: '2px solid #E0E0E0',
    fontWeight: '600',
    fontSize: '14px',
    color: '#124441'
  },
  tableCell: {
    padding: '15px',
    borderBottom: '1px solid #E0E0E0',
    fontSize: '14px',
    color: '#4F6F6B'
  },
  // Video Consultation Styles
  videoModalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(18, 68, 65, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000
  },
  videoModal: {
    background: '#FFFFFF',
    borderRadius: '12px',
    width: '95%',
    maxWidth: '1200px',
    height: '80vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  videoHeader: {
    background: '#009688',
    color: '#FFFFFF',
    padding: '15px 25px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  videoHeaderInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  videoStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px'
  },
  connectedDot: {
    color: '#4CAF50',
    fontSize: '12px'
  },
  callTimer: {
    background: 'rgba(255,255,255,0.1)',
    padding: '5px 12px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600'
  },
  endCallButton: {
    background: '#F44336',
    color: '#FFFFFF',
    border: 'none',
    padding: '8px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600'
  },
  videoMainArea: {
    flex: 1,
    display: 'flex',
    overflow: 'hidden'
  },
  patientVideoContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    background: '#E0F2F1'
  },
  patientVideoHeader: {
    padding: '15px 25px',
    borderBottom: '1px solid #B2DFDB',
    background: '#FFFFFF'
  },
  patientVideoInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  patientVideoName: {
    margin: 0,
    fontSize: '18px',
    fontWeight: '600',
    color: '#124441'
  },
  babyInfoIndicator: {
    background: '#E0F2F1',
    color: '#124441',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '14px',
    border: '1px solid #B2DFDB'
  },
  videoFeed: {
    flex: 1,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    position: 'relative'
  },
  videoMock: {
    flex: 1,
    background: 'linear-gradient(135deg, #009688 0%, #00796B 100%)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  videoMockContent: {
    textAlign: 'center',
    color: '#FFFFFF'
  },
  videoMockAvatar: {
    fontSize: '80px',
    marginBottom: '20px'
  },
  videoMockText: {
    fontSize: '24px',
    fontWeight: '600',
    margin: 0,
    marginBottom: '5px'
  },
  videoMockSubtext: {
    fontSize: '16px',
    opacity: 0.9,
    margin: 0
  },
  selfView: {
    width: '200px',
    background: '#FFFFFF',
    borderRadius: '12px',
    border: '2px solid #B2DFDB',
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    overflow: 'hidden'
  },
  selfViewHeader: {
    background: '#E0F2F1',
    padding: '8px 12px',
    borderBottom: '1px solid #B2DFDB'
  },
  selfViewLabel: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#124441'
  },
  selfViewVideo: {
    padding: '15px',
    textAlign: 'center'
  },
  selfViewMock: {
    background: '#E0F2F1',
    borderRadius: '8px',
    padding: '15px'
  },
  selfViewEmoji: {
    fontSize: '40px',
    marginBottom: '5px'
  },
  selfViewText: {
    fontSize: '12px',
    color: '#124441',
    margin: 0
  },
  quickTools: {
    width: '300px',
    background: '#FFFFFF',
    borderLeft: '1px solid #B2DFDB',
    display: 'flex',
    flexDirection: 'column'
  },
  quickToolsHeader: {
    padding: '20px',
    borderBottom: '1px solid #B2DFDB'
  },
  quickToolsTitle: {
    margin: 0,
    fontSize: '16px',
    fontWeight: '600',
    color: '#124441'
  },
  toolButtons: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  toolButton: {
    background: '#FFFFFF',
    border: '1px solid #B2DFDB',
    padding: '12px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px',
    color: '#124441',
    transition: 'all 0.2s'
  },
  recordingButton: {
    background: '#FFEBEE',
    border: '1px solid #F44336',
    padding: '12px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px',
    color: '#F44336',
    fontWeight: '500'
  },
  toolIcon: {
    fontSize: '18px'
  },
  consultationNotes: {
    flex: 1,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column'
  },
  notesTitle: {
    margin: '0 0 15px 0',
    fontSize: '14px',
    fontWeight: '600',
    color: '#124441'
  },
  notesTextarea: {
    flex: 1,
    border: '1px solid #B2DFDB',
    borderRadius: '8px',
    padding: '12px',
    fontSize: '14px',
    fontFamily: 'inherit',
    resize: 'none',
    marginBottom: '15px'
  },
  saveNotesButton: {
    background: '#009688',
    color: '#FFFFFF',
    border: 'none',
    padding: '10px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '14px'
  },
  videoFooter: {
    background: '#E0F2F1',
    padding: '12px 25px',
    borderTop: '1px solid #B2DFDB',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    color: '#124441'
  },
  appointmentInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  // Modal Styles
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(18, 68, 65, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px'
  },
  modal: {
    background: '#FFFFFF',
    borderRadius: '16px',
    maxWidth: '500px',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'auto',
    boxShadow: '0 20px 60px rgba(0, 150, 136, 0.3)'
  },
  modalHeader: {
    padding: '25px',
    borderBottom: '1px solid #E0E0E0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#F8FAFC',
    borderTopLeftRadius: '16px',
    borderTopRightRadius: '16px'
  },
  modalTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#124441',
    margin: 0
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#4F6F6B'
  },
  modalContent: {
    padding: '25px'
  },
  planHeaderCard: {
    padding: '25px',
    borderRadius: '12px',
    marginBottom: '25px'
  },
  planHeaderContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  planIconLarge: {
    fontSize: '48px',
    background: 'rgba(255, 255, 255, 0.9)',
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  planTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '0 0 8px 0',
    color: '#124441'
  },
  planPrice: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#124441',
    margin: '0 0 5px 0'
  },
  planDuration: {
    fontSize: '14px',
    color: '#4F6F6B',
    margin: 0
  },
  section: {
    marginBottom: '25px'
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '15px',
    color: '#124441',
    paddingBottom: '10px',
    borderBottom: '2px solid #E0E0E0'
  },
  idealFor: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '15px',
    background: '#E0F2F1',
    borderRadius: '8px',
    fontSize: '15px',
    color: '#124441',
    border: '1px solid #B2DFDB'
  },
  idealForIcon: {
    fontSize: '20px'
  },
  coverageCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '15px',
    background: '#F5F5F5',
    borderRadius: '8px',
    fontSize: '15px',
    color: '#4F6F6B',
    border: '1px solid #E0E0E0'
  },
  featuresList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  featureItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    fontSize: '14px',
    color: '#4F6F6B',
    padding: '10px',
    borderRadius: '6px',
    background: '#F5F5F5'
  },
  checkIcon: {
    color: '#4CAF50',
    fontSize: '16px',
    flexShrink: 0
  },
  recommendation: {
    background: '#E0F2F1',
    padding: '20px',
    borderRadius: '8px',
    fontSize: '15px',
    color: '#124441',
    border: '1px solid #B2DFDB',
    lineHeight: '1.6'
  },
  selectPlanButton: {
    width: '100%',
    padding: '16px',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    marginTop: '20px'
  },
  // Notifications
  notificationsContainer: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 1001,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  notification: {
    padding: '15px 25px',
    borderRadius: '8px',
    color: '#FFFFFF',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    fontSize: '14px',
    fontWeight: '500'
  },
  // Empty State
  emptyState: {
    textAlign: 'center',
    padding: '60px 40px',
    color: '#4F6F6B',
    background: '#FFFFFF',
    borderRadius: '12px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    border: '2px dashed #BDBDBD'
  },
  emptyStateIcon: {
    fontSize: '48px',
    marginBottom: '16px',
    opacity: 0.5
  }
};

export default BabyCareContent;