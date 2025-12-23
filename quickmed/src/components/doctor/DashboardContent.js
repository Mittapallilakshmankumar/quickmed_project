import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styles from './DashboardContent.module.css';

const DashboardContent = ({ dashboardData, state, actions }) => {
  const { timeRange, appointments } = state;
  const { 
    setTimeRange, 
    setConsultationDetails, 
    handleStartConsultation, 
    handleCancelAppointment,
    setActivePage,
    handlePrescriptionRefill
  } = actions;

  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 1024;

  // State for current consultation with enhanced functionality
  const [currentConsultation, setCurrentConsultation] = useState(null);
  const [activeTool, setActiveTool] = useState('prescription');
  const [consultationNotes, setConsultationNotes] = useState('');
  const [prescriptionData, setPrescriptionData] = useState({
    medications: [],
    dosage: '',
    instructions: ''
  });

  // State for video consultation
  const [videoCallActive, setVideoCallActive] = useState(false);
  const [callStatus, setCallStatus] = useState('connecting');
  
  // State for notes modal
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [notesPatientName, setNotesPatientName] = useState('');
  const [notesText, setNotesText] = useState('');
  const [notesLoading, setNotesLoading] = useState(false);
  
  // State for view details modal
  const [showViewDetailsModal, setShowViewDetailsModal] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  
  // State for patient notes storage
  const [patientNotes, setPatientNotes] = useState({});
  
  // State for React-based notifications
  const [notification, setNotification] = useState(null);

  // State for full history modal
  const [showFullHistoryModal, setShowFullHistoryModal] = useState(false);
  const [fullHistoryPatient, setFullHistoryPatient] = useState(null);
  const [fullHistoryNotes, setFullHistoryNotes] = useState([]);

  // Enhanced dummy data states
  const [todaysSchedule, setTodaysSchedule] = useState([
    { id: 1, time: '09:00 AM', patient: 'John Smith', type: 'Follow-up', duration: '30 mins', status: 'confirmed', age: 45, reason: 'Diabetes check-up' },
    { id: 2, time: '10:30 AM', patient: 'Maria Garcia', type: 'New Patient', duration: '45 mins', status: 'confirmed', age: 32, reason: 'Annual physical examination' },
    { id: 3, time: '02:00 PM', patient: 'Robert Wilson', type: 'Consultation', duration: '30 mins', status: 'pending', age: 58, reason: 'Hypertension follow-up' },
    { id: 4, time: '04:30 PM', patient: 'Lisa Anderson', type: 'Post-op', duration: '20 mins', status: 'confirmed', age: 41, reason: 'Post-surgery check' }
  ]);

  const [quickStats, setQuickStats] = useState({
    pendingPrescriptions: 3,
    labResults: 5,
    todaysEarnings: '₹24,500',
    completedConsultations: 8
  });

  // Enhanced real-time dummy data for all sections
  const [dummyData, setDummyData] = useState({
    pendingPrescriptions: [
      { 
        id: 1, 
        patient: 'John Smith', 
        medications: [
          { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', duration: '30 days' },
          { name: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily', duration: '30 days' }
        ], 
        date: '2024-01-15', 
        status: 'pending', 
        patientAge: 45,
        doctor: 'Dr. Smith',
        diagnosis: 'Type 2 Diabetes with hypertension'
      },
      { 
        id: 2, 
        patient: 'Maria Garcia', 
        medications: [
          { name: 'Amoxicillin', dosage: '250mg', frequency: 'Three times daily', duration: '7 days' },
          { name: 'Ibuprofen', dosage: '400mg', frequency: 'As needed for pain', duration: '5 days' }
        ], 
        date: '2024-01-15', 
        status: 'pending', 
        patientAge: 32,
        doctor: 'Dr. Johnson',
        diagnosis: 'Acute sinusitis with headache'
      },
      { 
        id: 3, 
        patient: 'Robert Wilson', 
        medications: [
          { name: 'Losartan', dosage: '50mg', frequency: 'Once daily', duration: '30 days' },
          { name: 'Hydrochlorothiazide', dosage: '25mg', frequency: 'Once daily', duration: '30 days' }
        ], 
        date: '2024-01-14', 
        status: 'pending', 
        patientAge: 58,
        doctor: 'Dr. Williams',
        diagnosis: 'Stage 2 hypertension'
      }
    ],
    completedToday: [
      { id: 1, patient: 'Alice Brown', time: '09:15 AM', duration: '25 mins', type: 'Consultation', fee: '₹1,200', status: 'completed' },
      { id: 2, patient: 'David Lee', time: '10:45 AM', duration: '30 mins', type: 'Follow-up', fee: '₹800', status: 'completed' },
      { id: 3, patient: 'Sarah Chen', time: '11:30 AM', duration: '40 mins', type: 'New Patient', fee: '₹1,500', status: 'completed' },
      { id: 4, patient: 'Michael Wang', time: '01:15 PM', duration: '35 mins', type: 'Consultation', fee: '₹1,200', status: 'completed' },
      { id: 5, patient: 'Emma Davis', time: '02:45 PM', duration: '20 mins', type: 'Follow-up', fee: '₹800', status: 'completed' },
      { id: 6, patient: 'James Miller', time: '03:30 PM', duration: '45 mins', type: 'Specialist', fee: '₹2,500', status: 'completed' },
      { id: 7, patient: 'Sophia Wilson', time: '04:15 PM', duration: '30 mins', type: 'Consultation', fee: '₹1,200', status: 'completed' },
      { id: 8, patient: 'Daniel Taylor', time: '05:00 PM', duration: '25 mins', type: 'Follow-up', fee: '₹800', status: 'completed' }
    ],
    todaysEarnings: [
      { type: 'Consultation Fees', amount: '₹9,600', count: 8 },
      { type: 'Lab Tests', amount: '₹3,200', count: 4 },
      { type: 'Procedures', amount: '₹11,700', count: 3 },
      { type: 'Total', amount: '₹24,500', count: 15 }
    ],
    labResults: [
      { id: 1, patient: 'John Smith', test: 'CBC', status: 'Completed', date: '2024-01-15', result: 'Normal', lab: 'Pathology Lab', priority: 'Routine' },
      { id: 2, patient: 'Maria Garcia', test: 'Lipid Profile', status: 'Pending', date: '2024-01-15', result: 'Awaiting', lab: 'Bio-Tech Labs', priority: 'Standard' },
      { id: 3, patient: 'Robert Wilson', test: 'Blood Sugar', status: 'Completed', date: '2024-01-14', result: 'High - 180 mg/dL', lab: 'Diagnostic Center', priority: 'High' },
      { id: 4, patient: 'Lisa Anderson', test: 'Liver Function', status: 'Completed', date: '2024-01-14', result: 'Normal', lab: 'Pathology Lab', priority: 'Routine' },
      { id: 5, patient: 'Alice Brown', test: 'Thyroid Panel', status: 'Completed', date: '2024-01-13', result: 'Abnormal - TSH: 5.8', lab: 'Endocrine Lab', priority: 'High' }
    ],
    analytics: {
      consultations: { today: 8, week: 42, month: 165 },
      revenue: { today: '₹24,500', week: '₹1,28,400', month: '₹5,42,800' },
      prescriptions: { today: 12, week: 68, month: 245 },
      patientSatisfaction: { today: '4.8', week: '4.7', month: '4.6' }
    },
    reports: {
      consultationSummary: [
        { date: '2024-01-15', consultations: 8, newPatients: 2, followUps: 6, revenue: '₹24,500' },
        { date: '2024-01-14', consultations: 9, newPatients: 3, followUps: 6, revenue: '₹26,800' },
        { date: '2024-01-13', consultations: 7, newPatients: 1, followUps: 6, revenue: '₹21,200' }
      ],
      revenueReport: [
        { category: 'Consultation', amount: '₹9,600', percentage: 39.2 },
        { category: 'Procedures', amount: '₹11,700', percentage: 47.8 },
        { category: 'Lab Tests', amount: '₹3,200', percentage: 13.0 },
        { category: 'Medications', amount: '₹0', percentage: 0.0 }
      ]
    }
  });

  // State for active quick action
  const [activeQuickAction, setActiveQuickAction] = useState(null);
  const [prescriptionModal, setPrescriptionModal] = useState({
    show: false,
    patientName: '',
    medications: []
  });
  const [labResultsModal, setLabResultsModal] = useState({
    show: false,
    results: []
  });
  const [reportsModal, setReportsModal] = useState({
    show: false,
    type: '',
    dateRange: 'today'
  });

  // New modals for quick stats
  const [pendingPrescriptionsModal, setPendingPrescriptionsModal] = useState({
    show: false,
    prescriptions: []
  });
  const [completedTodayModal, setCompletedTodayModal] = useState({
    show: false,
    consultations: []
  });
  const [todaysEarningsModal, setTodaysEarningsModal] = useState({
    show: false,
    earnings: []
  });

  // State for prescription modal form
  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    frequency: '',
    duration: ''
  });

  // State for reports modal
  const [reportType, setReportType] = useState('consultation_summary');
  const [dateRange, setDateRange] = useState('today');
  const [generating, setGenerating] = useState(false);

  // React-based notification system
  const showNotification = useCallback((type, message) => {
    setNotification({ type, message, id: Date.now() });
    
    const timer = setTimeout(() => {
      setNotification(null);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  // Initialize patient notes from dashboard data
  useEffect(() => {
    const initialNotes = {};
    dashboardData.patients.forEach(patient => {
      initialNotes[patient.name] = patient.notes || [];
    });
    setPatientNotes(initialNotes);
  }, [dashboardData.patients]);

  // Initialize dummy data
  useEffect(() => {
    setPendingPrescriptionsModal(prev => ({ ...prev, prescriptions: dummyData.pendingPrescriptions }));
    setCompletedTodayModal(prev => ({ ...prev, consultations: dummyData.completedToday }));
    setTodaysEarningsModal(prev => ({ ...prev, earnings: dummyData.todaysEarnings }));
  }, [dummyData]);

  // Prescription Modal Handlers
  const handleAddMedication = useCallback(() => {
    if (!newMedication.name.trim() || !newMedication.dosage.trim()) {
      showNotification('error', 'Please enter medication name and dosage');
      return;
    }

    setPrescriptionModal(prev => ({
      ...prev,
      medications: [...prev.medications, {
        id: Date.now(),
        ...newMedication
      }]
    }));

    setNewMedication({
      name: '',
      dosage: '',
      frequency: '',
      duration: ''
    });

    showNotification('success', 'Medication added');
  }, [newMedication, showNotification]);

  const handleRemoveMedication = useCallback((id) => {
    setPrescriptionModal(prev => ({
      ...prev,
      medications: prev.medications.filter(med => med.id !== id)
    }));
    showNotification('info', 'Medication removed');
  }, [showNotification]);

  const handleSavePrescription = useCallback(() => {
    if (prescriptionModal.medications.length === 0) {
      showNotification('error', 'Please add at least one medication');
      return;
    }

    showNotification('success', `Prescription saved for ${prescriptionModal.patientName}`);
    
    // Update quick stats
    setQuickStats(prev => ({
      ...prev,
      pendingPrescriptions: prev.pendingPrescriptions + 1
    }));

    // Add to dummy data
    setDummyData(prev => ({
      ...prev,
      pendingPrescriptions: [...prev.pendingPrescriptions, {
        id: Date.now(),
        patient: prescriptionModal.patientName,
        medications: prescriptionModal.medications.map(m => ({
          name: m.name,
          dosage: m.dosage,
          frequency: m.frequency,
          duration: m.duration
        })),
        date: new Date().toISOString().split('T')[0],
        status: 'pending',
        patientAge: 35,
        doctor: 'Dr. You',
        diagnosis: 'General consultation'
      }]
    }));

    setTimeout(() => {
      setPrescriptionModal({ show: false, patientName: '', medications: [] });
      setActiveQuickAction(null);
    }, 1000);
  }, [prescriptionModal, showNotification]);

  // Lab Results Handlers
  const handleViewResult = useCallback((result) => {
    showNotification('info', `Viewing ${result.test} results for ${result.patient}`);
  }, [showNotification]);

  const handleMarkReviewed = useCallback((resultId) => {
    setLabResultsModal(prev => ({
      ...prev,
      results: prev.results.filter(result => result.id !== resultId)
    }));
    
    // Update dummy data
    setDummyData(prev => ({
      ...prev,
      labResults: prev.labResults.filter(result => result.id !== resultId)
    }));
    
    setQuickStats(prev => ({
      ...prev,
      labResults: prev.labResults - 1
    }));
    
    showNotification('success', 'Lab result marked as reviewed');
  }, [showNotification]);

  // Reports Handler
  const handleGenerateReport = useCallback(() => {
    setGenerating(true);
    
    showNotification('info', `Generating ${reportType} report for ${dateRange}...`);
    
    // Simulate report generation with real data
    setTimeout(() => {
      setGenerating(false);
      const reportData = getReportData(reportType, dateRange);
      showNotification('success', `${reportData.title} report generated successfully!`);
      
      // Simulate download
      setTimeout(() => {
        setReportsModal({ show: false, type: '', dateRange: 'today' });
        setActiveQuickAction(null);
      }, 1000);
    }, 2000);
  }, [reportType, dateRange, showNotification]);

  // Helper function to get report data
  const getReportData = (type, range) => {
    const data = {
      consultation_summary: {
        title: 'Consultation Summary',
        data: dummyData.reports.consultationSummary,
        metrics: {
          totalConsultations: dummyData.completedToday.length,
          newPatients: dummyData.completedToday.filter(c => c.type === 'New Patient').length,
          followUps: dummyData.completedToday.filter(c => c.type === 'Follow-up').length,
          totalRevenue: '₹24,500'
        }
      },
      revenue_report: {
        title: 'Revenue Report',
        data: dummyData.reports.revenueReport,
        metrics: {
          totalRevenue: '₹24,500',
          averagePerConsultation: '₹3,063',
          growth: '+12%'
        }
      },
      patient_statistics: {
        title: 'Patient Statistics',
        data: [
          { category: 'Age 0-18', count: 12, percentage: 15 },
          { category: 'Age 19-40', count: 28, percentage: 35 },
          { category: 'Age 41-60', count: 25, percentage: 31 },
          { category: 'Age 60+', count: 15, percentage: 19 }
        ],
        metrics: {
          totalPatients: 80,
          male: 45,
          female: 35,
          averageAge: 42
        }
      }
    };
    
    return data[type] || data.consultation_summary;
  };

  // Notification Component - memoized to prevent re-renders
  const Notification = useMemo(() => {
    if (!notification) return null;
    
    const bgColor = notification.type === 'success' ? '#10B981' :
                    notification.type === 'error' ? '#EF4444' :
                    notification.type === 'warning' ? '#F59E0B' : '#3B82F6';
    
    const icon = notification.type === 'success' ? '✅' :
                 notification.type === 'error' ? '❌' :
                 notification.type === 'warning' ? '⚠️' : 'ℹ️';
    
    return (
      <div className={styles.notification}>
        <div className={styles.notificationContent} style={{ backgroundColor: bgColor }}>
          {icon} {notification.message}
        </div>
      </div>
    );
  }, [notification]);

  // Quick Stats Modal Handlers
  const handlePendingPrescriptionsClick = useCallback(() => {
    setPendingPrescriptionsModal({
      show: true,
      prescriptions: dummyData.pendingPrescriptions
    });
  }, [dummyData.pendingPrescriptions]);

  const handleCompletedTodayClick = useCallback(() => {
    setCompletedTodayModal({
      show: true,
      consultations: dummyData.completedToday
    });
  }, [dummyData.completedToday]);

  const handleTodaysEarningsClick = useCallback(() => {
    setTodaysEarningsModal({
      show: true,
      earnings: dummyData.todaysEarnings
    });
  }, [dummyData.todaysEarnings]);

  const handleLabResultsClick = useCallback(() => {
    setActiveQuickAction('lab');
    setLabResultsModal({
      show: true,
      results: dummyData.labResults
    });
  }, [dummyData.labResults]);

  // Function to handle Add Notes with modal
  const handleAddNotesClick = useCallback((patientName) => {
    setNotesPatientName(patientName);
    setNotesText('');
    setShowNotesModal(true);
  }, []);

  // Function to save notes to patient's history
  const handleSaveNotes = useCallback(() => {
    if (!notesText.trim()) {
      showNotification('error', 'Please enter notes before saving');
      return;
    }

    setNotesLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newNote = {
        id: Date.now(),
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        time: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        text: notesText,
        doctor: 'Dr. You',
        type: 'clinical_notes'
      };
      
      // Update patient notes in state
      setPatientNotes(prev => ({
        ...prev,
        [notesPatientName]: [...(prev[notesPatientName] || []), newNote]
      }));
      
      showNotification('success', `Notes saved for ${notesPatientName}`);
      setNotesLoading(false);
      setShowNotesModal(false);
      setNotesText('');
      setNotesPatientName('');
    }, 1000);
  }, [notesText, notesPatientName, showNotification]);

  // Function to handle View Details
  const handleViewDetails = useCallback((consultation) => {
    setSelectedConsultation(consultation);
    setShowViewDetailsModal(true);
  }, []);

  // Function to handle View Full History
  const handleViewFullHistory = useCallback((patientName, notes) => {
    setFullHistoryPatient(patientName);
    setFullHistoryNotes(notes);
    setShowFullHistoryModal(true);
  }, []);

  // Get patient notes for a specific patient
  const getPatientNotes = useCallback((patientName) => {
    return patientNotes[patientName] || [];
  }, [patientNotes]);

  // Today's Schedule Component
  const ScheduleItem = useCallback(({ schedule }) => {
    const statusColors = {
      confirmed: '#10B981',
      pending: '#F59E0B',
      cancelled: '#EF4444'
    };
    
    return (
      <div className={styles.scheduleItem}>
        <div className={styles.scheduleTime}>
          <strong>{schedule.time}</strong>
          <span className={styles.scheduleDuration}>{schedule.duration}</span>
        </div>
        <div className={styles.scheduleInfo}>
          <h4 className={styles.schedulePatient}>{schedule.patient}</h4>
          <p className={styles.scheduleType}>{schedule.type}</p>
          <p className={styles.scheduleReason}>{schedule.reason}</p>
        </div>
        <span className={styles.scheduleStatus} style={{
          backgroundColor: statusColors[schedule.status] + '20',
          color: statusColors[schedule.status]
        }}>
          {schedule.status}
        </span>
      </div>
    );
  }, []);

  // Quick Stats Card with enhanced functionality
  const QuickStatCard = useCallback(({ icon, value, label, color, action }) => (
    <div 
      className={styles.quickStatCard}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
      onClick={action}
    >
      <div className={styles.quickStatIcon} style={{backgroundColor: color}}>
        {icon}
      </div>
      <div className={styles.quickStatContent}>
        <h3 className={styles.quickStatValue}>{value}</h3>
        <p className={styles.quickStatLabel}>{label}</p>
      </div>
      <div className={styles.quickStatArrow}>→</div>
    </div>
  ), []);

  // Quick Action Functions
  const handleWritePrescription = useCallback(() => {
    setActiveQuickAction('prescription');
    const patientName = prompt('Enter patient name for prescription:');
    if (patientName) {
      setPrescriptionModal({
        show: true,
        patientName,
        medications: []
      });
    } else {
      showNotification('info', 'Prescription action cancelled');
    }
  }, [showNotification]);

  const handleViewLabResults = useCallback(() => {
    setActiveQuickAction('lab');
    handleLabResultsClick();
  }, [handleLabResultsClick]);

  const handleGenerateReports = useCallback(() => {
    setActiveQuickAction('reports');
    setReportsModal({
      show: true,
      type: 'consultation_summary',
      dateRange: 'today'
    });
    setReportType('consultation_summary');
    setDateRange('today');
  }, []);

  const handleViewAnalytics = useCallback(() => {
    setActiveQuickAction('analytics');
    showNotification('success', 'Loading analytics dashboard...');
    
    // Simulate loading analytics
    setTimeout(() => {
      if (setActivePage) {
        setActivePage('analytics');
      } else {
        showNotification('info', 'Analytics page would open here');
      }
    }, 500);
  }, [setActivePage, showNotification]);

  // Modals Components
  const PendingPrescriptionsModal = useMemo(() => {
    if (!pendingPrescriptionsModal.show) return null;

    const handleApprovePrescription = (id) => {
      setDummyData(prev => ({
        ...prev,
        pendingPrescriptions: prev.pendingPrescriptions.filter(p => p.id !== id)
      }));
      setQuickStats(prev => ({ ...prev, pendingPrescriptions: prev.pendingPrescriptions - 1 }));
      showNotification('success', 'Prescription approved');
    };

    const handleRejectPrescription = (id) => {
      setDummyData(prev => ({
        ...prev,
        pendingPrescriptions: prev.pendingPrescriptions.filter(p => p.id !== id)
      }));
      setQuickStats(prev => ({ ...prev, pendingPrescriptions: prev.pendingPrescriptions - 1 }));
      showNotification('info', 'Prescription rejected');
    };

    const handleViewMedicationDetails = (prescription) => {
      showNotification('info', `Viewing prescription details for ${prescription.patient}`);
    };

    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h3 className={styles.modalTitle}>Pending Prescriptions ({pendingPrescriptionsModal.prescriptions.length})</h3>
            <button 
              className={styles.closeButton}
              onClick={() => setPendingPrescriptionsModal({ show: false, prescriptions: [] })}
            >
              ✕
            </button>
          </div>
          
          <div className={styles.modalContent}>
            <div className={styles.prescriptionsList}>
              {pendingPrescriptionsModal.prescriptions.length > 0 ? (
                pendingPrescriptionsModal.prescriptions.map(prescription => (
                  <div key={prescription.id} className={styles.prescriptionItem}>
                    <div className={styles.prescriptionHeader}>
                      <div className={styles.prescriptionPatient}>
                        <div className={styles.patientAvatar}>👤</div>
                        <div>
                          <h4 className={styles.patientName}>{prescription.patient}</h4>
                          <p className={styles.prescriptionDate}>
                            Age: {prescription.patientAge} | Date: {prescription.date} | Doctor: {prescription.doctor}
                          </p>
                          <p className={styles.prescriptionDiagnosis}>
                            <strong>Diagnosis:</strong> {prescription.diagnosis}
                          </p>
                        </div>
                      </div>
                      <span className={styles.prescriptionStatus}>{prescription.status}</span>
                    </div>
                    <div className={styles.prescriptionMedications}>
                      <strong>Medications:</strong>
                      <div className={styles.medicationsDetailList}>
                        {prescription.medications.map((med, index) => (
                          <div key={index} className={styles.medicationDetailItem}>
                            <div className={styles.medicationDetailRow}>
                              <span className={styles.medicationDetailLabel}>Name:</span>
                              <span className={styles.medicationDetailValue}>{med.name}</span>
                            </div>
                            <div className={styles.medicationDetailRow}>
                              <span className={styles.medicationDetailLabel}>Dosage:</span>
                              <span className={styles.medicationDetailValue}>{med.dosage}</span>
                            </div>
                            <div className={styles.medicationDetailRow}>
                              <span className={styles.medicationDetailLabel}>Frequency:</span>
                              <span className={styles.medicationDetailValue}>{med.frequency}</span>
                            </div>
                            <div className={styles.medicationDetailRow}>
                              <span className={styles.medicationDetailLabel}>Duration:</span>
                              <span className={styles.medicationDetailValue}>{med.duration}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className={styles.prescriptionActions}>
                      <button 
                        className={styles.approveButton}
                        onClick={() => handleApprovePrescription(prescription.id)}
                      >
                        Approve
                      </button>
                      <button 
                        className={styles.rejectButton}
                        onClick={() => handleRejectPrescription(prescription.id)}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.noData}>
                  <p>No pending prescriptions</p>
                </div>
              )}
            </div>
          </div>
          
          <div className={styles.modalFooter}>
            <button
              className={styles.primaryButton}
              onClick={() => setPendingPrescriptionsModal({ show: false, prescriptions: [] })}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }, [pendingPrescriptionsModal, showNotification]);

  const CompletedTodayModal = useMemo(() => {
    if (!completedTodayModal.show) return null;

    const totalRevenue = completedTodayModal.consultations.reduce((sum, c) => {
      const amount = parseInt(c.fee.replace(/[^0-9]/g, ''));
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);

    const avgDuration = Math.round(
      completedTodayModal.consultations.reduce((sum, c) => {
        const duration = parseInt(c.duration);
        return sum + (isNaN(duration) ? 0 : duration);
      }, 0) / completedTodayModal.consultations.length
    );

    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h3 className={styles.modalTitle}>Today's Completed Consultations ({completedTodayModal.consultations.length})</h3>
            <button 
              className={styles.closeButton}
              onClick={() => setCompletedTodayModal({ show: false, consultations: [] })}
            >
              ✕
            </button>
          </div>
          
          <div className={styles.modalContent}>
            <div className={styles.summaryStats}>
              <div className={styles.summaryStat}>
                <span className={styles.statLabel}>Total Consultations:</span>
                <span className={styles.statValue}>{completedTodayModal.consultations.length}</span>
              </div>
              <div className={styles.summaryStat}>
                <span className={styles.statLabel}>Total Revenue:</span>
                <span className={styles.statValue}>₹{totalRevenue.toLocaleString('en-IN')}</span>
              </div>
              <div className={styles.summaryStat}>
                <span className={styles.statLabel}>Avg Duration:</span>
                <span className={styles.statValue}>{avgDuration} mins</span>
              </div>
              <div className={styles.summaryStat}>
                <span className={styles.statLabel}>Success Rate:</span>
                <span className={styles.statValue}>100%</span>
              </div>
            </div>
            
            <div className={styles.consultationsListModal}>
              {completedTodayModal.consultations.map(consultation => (
                <div key={consultation.id} className={styles.consultationItem}>
                  <div className={styles.consultationHeaderModal}>
                    <div className={styles.consultationPatient}>
                      <div className={styles.patientAvatar}>👤</div>
                      <div>
                        <h4 className={styles.patientName}>{consultation.patient}</h4>
                        <p className={styles.consultationTime}>{consultation.time} • {consultation.duration}</p>
                      </div>
                    </div>
                    <span className={styles.consultationFee}>{consultation.fee}</span>
                  </div>
                  <div className={styles.consultationDetailsModal}>
                    <span className={styles.consultationType}>{consultation.type}</span>
                    <span className={styles.consultationStatusCompleted}>Completed</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className={styles.modalFooter}>
            <button
              className={styles.primaryButton}
              onClick={() => setCompletedTodayModal({ show: false, consultations: [] })}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }, [completedTodayModal]);

  const TodaysEarningsModal = useMemo(() => {
    if (!todaysEarningsModal.show) return null;

    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h3 className={styles.modalTitle}>Today's Earnings Breakdown</h3>
            <button 
              className={styles.closeButton}
              onClick={() => setTodaysEarningsModal({ show: false, earnings: [] })}
            >
              ✕
            </button>
          </div>
          
          <div className={styles.modalContent}>
            <div className={styles.earningsSummary}>
              {todaysEarningsModal.earnings.map((item, index) => (
                <div key={index} className={`${styles.earningItem} ${item.type === 'Total' ? styles.totalEarning : ''}`}>
                  <div className={styles.earningInfo}>
                    <span className={styles.earningType}>{item.type}</span>
                    {item.count > 0 && (
                      <span className={styles.earningCount}>{item.count} transactions</span>
                    )}
                  </div>
                  <span className={`${styles.earningAmount} ${item.type === 'Total' ? styles.totalEarningAmount : ''}`}>
                    {item.amount}
                  </span>
                </div>
              ))}
            </div>
            
            <div className={styles.earningsChart}>
              <h4 className={styles.chartTitle}>Revenue Distribution</h4>
              <div className={styles.chartBars}>
                {todaysEarningsModal.earnings.filter(item => item.type !== 'Total').map((item, index) => {
                  const amount = parseInt(item.amount.replace(/[^0-9]/g, ''));
                  const total = 24500;
                  const percentage = Math.round((amount / total) * 100);
                  return (
                    <div key={index} className={styles.chartBarContainer}>
                      <div className={styles.chartBarLabel}>
                        <span>{item.type}</span>
                        <span>{item.amount} ({percentage}%)</span>
                      </div>
                      <div className={styles.chartBarTrack}>
                        <div 
                          className={styles.chartBar}
                          style={{
                            width: `${percentage}%`,
                            backgroundColor: index === 0 ? '#10B981' : 
                                           index === 1 ? '#3B82F6' : 
                                           index === 2 ? '#F59E0B' : '#EF4444'
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={styles.earningsInsights}>
              <h4 className={styles.insightsTitle}>Daily Insights</h4>
              <div className={styles.insightsGrid}>
                <div className={styles.insightCard}>
                  <span className={styles.insightLabel}>Today vs Yesterday</span>
                  <span className={styles.insightValue}>+12%</span>
                </div>
                <div className={styles.insightCard}>
                  <span className={styles.insightLabel}>Avg. per Consultation</span>
                  <span className={styles.insightValue}>₹3,063</span>
                </div>
                <div className={styles.insightCard}>
                  <span className={styles.insightLabel}>Peak Hour</span>
                  <span className={styles.insightValue}>03:30 PM</span>
                </div>
                <div className={styles.insightCard}>
                  <span className={styles.insightLabel}>Most Profitable</span>
                  <span className={styles.insightValue}>Procedures</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.modalFooter}>
            <button
              className={styles.primaryButton}
              onClick={() => setTodaysEarningsModal({ show: false, earnings: [] })}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }, [todaysEarningsModal]);

  // Add Notes Modal Component
  const AddNotesModal = useMemo(() => {
    if (!showNotesModal) return null;

    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h3 className={styles.modalTitle}>Add Notes for {notesPatientName}</h3>
            <button 
              className={styles.closeButton}
              onClick={() => {
                setShowNotesModal(false);
                setNotesText('');
                setNotesPatientName('');
              }}
            >
              ✕
            </button>
          </div>
          
          <div className={styles.modalContent}>
            <div className={styles.notesForm}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Patient Name</label>
                <input
                  type="text"
                  value={notesPatientName}
                  readOnly
                  className={styles.readOnlyInput}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>Notes <span className={styles.required}>*</span></label>
                <textarea
                  value={notesText}
                  onChange={(e) => setNotesText(e.target.value)}
                  placeholder="Enter your notes here... (e.g., Symptoms, Diagnosis, Treatment plan, Follow-up instructions)"
                  className={styles.notesTextarea}
                  rows={8}
                  autoFocus
                />
                <div className={styles.charCount}>
                  {notesText.length}/1000 characters
                </div>
              </div>
              
              <div className={styles.notesTips}>
                <h4 className={styles.tipsTitle}>Tips for effective notes:</h4>
                <ul className={styles.tipsList}>
                  <li>Include symptoms and observations</li>
                  <li>Note diagnosis and prescribed medications</li>
                  <li>Record follow-up requirements</li>
                  <li>Add any special instructions for the patient</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className={styles.modalFooter}>
            <button
              className={styles.cancelButton}
              onClick={() => {
                setShowNotesModal(false);
                setNotesText('');
                setNotesPatientName('');
              }}
              disabled={notesLoading}
            >
              Cancel
            </button>
            <button
              className={styles.saveButton}
              onClick={handleSaveNotes}
              disabled={notesLoading}
            >
              {notesLoading ? 'Saving...' : 'Save Notes'}
            </button>
          </div>
        </div>
      </div>
    );
  }, [showNotesModal, notesPatientName, notesText, notesLoading, handleSaveNotes]);

  // Prescription Modal Component
  const PrescriptionModal = useMemo(() => {
    if (!prescriptionModal.show) return null;

    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h3 className={styles.modalTitle}>Write Prescription for {prescriptionModal.patientName}</h3>
            <button 
              className={styles.closeButton}
              onClick={() => {
                setPrescriptionModal({ show: false, patientName: '', medications: [] });
                setActiveQuickAction(null);
              }}
            >
              ✕
            </button>
          </div>
          
          <div className={styles.modalContent}>
            <div className={styles.prescriptionForm}>
              <div className={styles.medicationForm}>
                <h4 className={styles.formSectionTitle}>Add Medication</h4>
                <div className={styles.medicationInputs}>
                  <input
                    type="text"
                    placeholder="Medication Name"
                    value={newMedication.name}
                    onChange={(e) => setNewMedication(prev => ({ ...prev, name: e.target.value }))}
                    className={styles.medicationInput}
                  />
                  <input
                    type="text"
                    placeholder="Dosage (e.g., 500mg)"
                    value={newMedication.dosage}
                    onChange={(e) => setNewMedication(prev => ({ ...prev, dosage: e.target.value }))}
                    className={styles.medicationInput}
                  />
                  <input
                    type="text"
                    placeholder="Frequency (e.g., Twice daily)"
                    value={newMedication.frequency}
                    onChange={(e) => setNewMedication(prev => ({ ...prev, frequency: e.target.value }))}
                    className={styles.medicationInput}
                  />
                  <input
                    type="text"
                    placeholder="Duration (e.g., 7 days)"
                    value={newMedication.duration}
                    onChange={(e) => setNewMedication(prev => ({ ...prev, duration: e.target.value }))}
                    className={styles.medicationInput}
                  />
                  <button 
                    className={styles.addButton}
                    onClick={handleAddMedication}
                  >
                    + Add
                  </button>
                </div>
              </div>

              <div className={styles.medicationsListSection}>
                <h4 className={styles.formSectionTitle}>Medications ({prescriptionModal.medications.length})</h4>
                {prescriptionModal.medications.length > 0 ? (
                  <div className={styles.medicationsList}>
                    {prescriptionModal.medications.map(med => (
                      <div key={med.id} className={styles.medicationItem}>
                        <div className={styles.medicationInfo}>
                          <strong>{med.name}</strong>
                          <span>Dosage: {med.dosage}</span>
                          <span>Frequency: {med.frequency}</span>
                          <span>Duration: {med.duration}</span>
                        </div>
                        <button 
                          className={styles.deleteButton}
                          onClick={() => handleRemoveMedication(med.id)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className={styles.noData}>No medications added yet</p>
                )}
              </div>

              <div className={styles.notesSection}>
                <h4 className={styles.formSectionTitle}>Additional Instructions</h4>
                <textarea
                  placeholder="Enter any additional instructions for the patient..."
                  className={styles.prescriptionNotes}
                  rows={4}
                />
              </div>
            </div>
          </div>
          
          <div className={styles.modalFooter}>
            <button
              className={styles.cancelButton}
              onClick={() => {
                setPrescriptionModal({ show: false, patientName: '', medications: [] });
                setActiveQuickAction(null);
              }}
            >
              Cancel
            </button>
            <button
              className={styles.saveButton}
              onClick={handleSavePrescription}
            >
              Save & Print Prescription
            </button>
          </div>
        </div>
      </div>
    );
  }, [prescriptionModal, newMedication, handleAddMedication, handleRemoveMedication, handleSavePrescription]);

  // Lab Results Modal Component
  const LabResultsModal = useMemo(() => {
    if (!labResultsModal.show) return null;

    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h3 className={styles.modalTitle}>Lab Results Pending Review ({labResultsModal.results.length})</h3>
            <button 
              className={styles.closeButton}
              onClick={() => {
                setLabResultsModal({ show: false, results: [] });
                setActiveQuickAction(null);
              }}
            >
              ✕
            </button>
          </div>
          
          <div className={styles.modalContent}>
            <div className={styles.labResultsList}>
              {labResultsModal.results.length > 0 ? (
                labResultsModal.results.map(result => (
                  <div key={result.id} className={styles.labResultItem}>
                    <div className={styles.labResultInfo}>
                      <div className={styles.labResultHeader}>
                        <div className={styles.resultPatient}>
                          <div className={styles.patientAvatar}>👤</div>
                          <div>
                            <strong>{result.patient}</strong>
                            <p className={styles.resultLab}>{result.lab} • Priority: {result.priority}</p>
                          </div>
                        </div>
                        <span className={styles.resultStatus} style={{
                          backgroundColor: result.status === 'Completed' ? '#10B98120' : '#F59E0B20',
                          color: result.status === 'Completed' ? '#10B981' : '#F59E0B'
                        }}>
                          {result.status}
                        </span>
                      </div>
                      <div className={styles.labResultDetails}>
                        <span><strong>Test:</strong> {result.test}</span>
                        <span><strong>Date:</strong> {result.date}</span>
                        <span><strong>Result:</strong> {result.result}</span>
                      </div>
                    </div>
                    <div className={styles.labResultActions}>
                      <button 
                        className={styles.reviewedButton}
                        onClick={() => handleMarkReviewed(result.id)}
                      >
                        Mark Reviewed
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.noResults}>
                  <p>No lab results pending review</p>
                </div>
              )}
            </div>
          </div>
          
          <div className={styles.modalFooter}>
            <button
              className={styles.primaryButton}
              onClick={() => {
                setLabResultsModal({ show: false, results: [] });
                setActiveQuickAction(null);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }, [labResultsModal, handleMarkReviewed]);

  // Reports Modal Component
  const ReportsModal = useMemo(() => {
    if (!reportsModal.show) return null;

    const reportData = getReportData(reportType, dateRange);

    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h3 className={styles.modalTitle}>Generate Report - {reportData.title}</h3>
            <button 
              className={styles.closeButton}
              onClick={() => {
                setReportsModal({ show: false, type: '', dateRange: 'today' });
                setActiveQuickAction(null);
              }}
            >
              ✕
            </button>
          </div>
          
          <div className={styles.modalContent}>
            <div className={styles.reportForm}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Report Type</label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className={styles.selectInput}
                >
                  <option value="consultation_summary">Consultation Summary</option>
                  <option value="patient_statistics">Patient Statistics</option>
                  <option value="revenue_report">Revenue Report</option>
                  <option value="prescription_analysis">Prescription Analysis</option>
                  <option value="appointment_analysis">Appointment Analysis</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Date Range</label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className={styles.selectInput}
                >
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="year">This Year</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>

              <div className={styles.reportPreview}>
                <h4>{reportData.title} Preview</h4>
                <div className={styles.reportMetrics}>
                  {Object.entries(reportData.metrics).map(([key, value]) => (
                    <div key={key} className={styles.metricItem}>
                      <span className={styles.metricLabel}>{key.replace(/_/g, ' ')}:</span>
                      <span className={styles.metricValue}>{value}</span>
                    </div>
                  ))}
                </div>
                
                {reportData.data && (
                  <div className={styles.reportData}>
                    <h5>Data Preview:</h5>
                    <div className={styles.dataTable}>
                      {reportData.data.slice(0, 3).map((item, index) => (
                        <div key={index} className={styles.dataRow}>
                          {Object.entries(item).map(([key, val]) => (
                            <div key={key} className={styles.dataCell}>
                              <strong>{key}:</strong> {val}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className={styles.modalFooter}>
            <button
              className={styles.cancelButton}
              onClick={() => {
                setReportsModal({ show: false, type: '', dateRange: 'today' });
                setActiveQuickAction(null);
              }}
              disabled={generating}
            >
              Cancel
            </button>
            <button
              className={styles.saveButton}
              onClick={handleGenerateReport}
              disabled={generating}
            >
              {generating ? 'Generating...' : 'Generate Report'}
            </button>
          </div>
        </div>
      </div>
    );
  }, [reportsModal, reportType, dateRange, generating, handleGenerateReport]);

  // View Details Modal Component
  const ViewDetailsModal = useMemo(() => {
    if (!showViewDetailsModal || !selectedConsultation) return null;

    const patient = dashboardData.patients.find(p => p.name === selectedConsultation.patientName);
    const notes = getPatientNotes(selectedConsultation.patientName);

    return (
      <div className={styles.modalOverlay}>
        <div className={styles.viewDetailsModal}>
          <div className={styles.modalHeader}>
            <h3 className={styles.modalTitle}>Patient Details - {selectedConsultation.patientName}</h3>
            <button 
              className={styles.closeButton}
              onClick={() => {
                setShowViewDetailsModal(false);
                setSelectedConsultation(null);
              }}
            >
              ✕
            </button>
          </div>
          
          <div className={styles.modalContent}>
            <div className={styles.patientOverview}>
              <div className={styles.patientHeader}>
                <div className={styles.profileIconLarge}>👤</div>
                <div className={styles.patientBasicInfo}>
                  <h4 className={styles.patientNameLarge}>{selectedConsultation.patientName}</h4>
                  <p className={styles.patientAge}>Age: {patient?.age || selectedConsultation.age}</p>
                  <p className={styles.patientContact}>Phone: {patient?.phone || 'N/A'}</p>
                  <p className={styles.patientEmail}>Email: {patient?.email || 'N/A'}</p>
                </div>
              </div>
              
              <div className={styles.consultationDetails}>
                <h4 className={styles.sectionTitle}>Consultation Details</h4>
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Date:</span>
                    <span className={styles.detailValue}>{selectedConsultation.date}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Time:</span>
                    <span className={styles.detailValue}>{selectedConsultation.time}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Duration:</span>
                    <span className={styles.detailValue}>{selectedConsultation.duration}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Status:</span>
                    <span className={styles.statusBadge}>{selectedConsultation.status}</span>
                  </div>
                </div>
                
                <div className={styles.reasonSection}>
                  <h5 className={styles.subSectionTitle}>Reason for Consultation</h5>
                  <p className={styles.reasonText}>{selectedConsultation.issue}</p>
                </div>
              </div>
              
              {/* Patient Notes Section */}
              <div className={styles.notesSection}>
                <div className={styles.sectionHeaderRow}>
                  <h4 className={styles.sectionTitle}>Clinical Notes</h4>
                  <button 
                    className={styles.addNotesButton}
                    onClick={() => {
                      handleAddNotesClick(selectedConsultation.patientName);
                      setShowViewDetailsModal(false);
                    }}
                  >
                    + Add New Notes
                  </button>
                </div>
                
                {notes.length > 0 ? (
                  <div className={styles.notesList}>
                    {notes.slice(-3).reverse().map(note => (
                      <div key={note.id} className={styles.noteItem}>
                        <div className={styles.noteHeader}>
                          <span className={styles.noteDate}>{note.date}</span>
                          <span className={styles.noteTime}>{note.time}</span>
                          <span className={styles.noteDoctor}>By: {note.doctor}</span>
                        </div>
                        <p className={styles.noteText}>{note.text}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.noNotes}>
                    <p>No clinical notes recorded yet.</p>
                    <button 
                      className={styles.secondaryButton}
                      onClick={() => {
                        handleAddNotesClick(selectedConsultation.patientName);
                        setShowViewDetailsModal(false);
                      }}
                    >
                      Add First Note
                    </button>
                  </div>
                )}
              </div>
              
              {/* Medical History Section */}
              {patient && (
                <div className={styles.medicalHistorySection}>
                  <h4 className={styles.sectionTitle}>Medical History</h4>
                  {patient.medicalHistory.length > 0 ? (
                    <div className={styles.historyList}>
                      {patient.medicalHistory.slice(0, 3).map((record, index) => (
                        <div key={index} className={styles.historyItem}>
                          <div className={styles.historyHeader}>
                            <span className={styles.historyDate}>{record.date}</span>
                            <span className={styles.historyType}>{record.type}</span>
                          </div>
                          <p className={styles.historyDiagnosis}><strong>Diagnosis:</strong> {record.diagnosis}</p>
                          {record.prescription && (
                            <p className={styles.historyPrescription}><strong>Prescription:</strong> {record.prescription}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className={styles.noHistory}>No medical history available.</p>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className={styles.modalFooter}>
            <button
              className={styles.secondaryButton}
              onClick={() => {
                setShowViewDetailsModal(false);
                setSelectedConsultation(null);
              }}
            >
              Close
            </button>
            <button
              className={styles.primaryButton}
              onClick={() => {
                handleViewFullHistory(selectedConsultation.patientName, notes);
                setShowViewDetailsModal(false);
              }}
            >
              View Full History
            </button>
          </div>
        </div>
      </div>
    );
  }, [showViewDetailsModal, selectedConsultation, dashboardData.patients, getPatientNotes, handleAddNotesClick, handleViewFullHistory]);

  // Full History Modal Component
  const FullHistoryModal = useMemo(() => {
    if (!showFullHistoryModal || !fullHistoryPatient) return null;

    const patient = dashboardData.patients.find(p => p.name === fullHistoryPatient);
    const allNotes = fullHistoryNotes;

    return (
      <div className={styles.modalOverlay}>
        <div className={styles.fullHistoryModal}>
          <div className={styles.modalHeader}>
            <h3 className={styles.modalTitle}>Complete Medical History - {fullHistoryPatient}</h3>
            <button 
              className={styles.closeButton}
              onClick={() => {
                setShowFullHistoryModal(false);
                setFullHistoryPatient(null);
                setFullHistoryNotes([]);
              }}
            >
              ✕
            </button>
          </div>
          
          <div className={styles.modalContent}>
            <div className={styles.patientOverview}>
              <div className={styles.patientHeader}>
                <div className={styles.profileIconLarge}>👤</div>
                <div className={styles.patientBasicInfo}>
                  <h4 className={styles.patientNameLarge}>{fullHistoryPatient}</h4>
                  <p className={styles.patientAge}>Age: {patient?.age || 'N/A'}</p>
                  <p className={styles.patientContact}>Phone: {patient?.phone || 'N/A'}</p>
                  <p className={styles.patientEmail}>Email: {patient?.email || 'N/A'}</p>
                </div>
              </div>
              
              {/* Complete Clinical Notes Section */}
              <div className={styles.notesSection}>
                <div className={styles.sectionHeaderRow}>
                  <h4 className={styles.sectionTitle}>Complete Clinical Notes History</h4>
                  <button 
                    className={styles.addNotesButton}
                    onClick={() => {
                      setShowFullHistoryModal(false);
                      handleAddNotesClick(fullHistoryPatient);
                    }}
                  >
                    + Add New Notes
                  </button>
                </div>
                
                {allNotes.length > 0 ? (
                  <div className={styles.fullNotesList}>
                    {allNotes.slice().reverse().map(note => (
                      <div key={note.id} className={styles.fullNoteItem}>
                        <div className={styles.noteHeader}>
                          <span className={styles.noteDate}>{note.date}</span>
                          <span className={styles.noteTime}>{note.time}</span>
                          <span className={styles.noteDoctor}>By: {note.doctor}</span>
                          <span className={styles.noteType}>{note.type}</span>
                        </div>
                        <p className={styles.noteText}>{note.text}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.noNotes}>
                    <p>No clinical notes recorded yet.</p>
                    <button 
                      className={styles.secondaryButton}
                      onClick={() => {
                        setShowFullHistoryModal(false);
                        handleAddNotesClick(fullHistoryPatient);
                      }}
                    >
                      Add First Note
                    </button>
                  </div>
                )}
              </div>
              
              {/* Complete Medical History Section */}
              {patient && patient.medicalHistory.length > 0 && (
                <div className={styles.medicalHistorySection}>
                  <h4 className={styles.sectionTitle}>Complete Medical History Records</h4>
                  <div className={styles.fullHistoryList}>
                    {patient.medicalHistory.slice().reverse().map((record, index) => (
                      <div key={index} className={styles.fullHistoryItem}>
                        <div className={styles.historyHeader}>
                          <span className={styles.historyDate}>{record.date}</span>
                          <span className={styles.historyType}>{record.type}</span>
                          <span className={styles.historyStatus}>{record.status || 'Completed'}</span>
                        </div>
                        <div className={styles.fullHistoryDetails}>
                          <p className={styles.historyDiagnosis}><strong>Diagnosis:</strong> {record.diagnosis}</p>
                          {record.symptoms && (
                            <p className={styles.historySymptoms}><strong>Symptoms:</strong> {record.symptoms}</p>
                          )}
                          {record.prescription && (
                            <p className={styles.historyPrescription}><strong>Prescription:</strong> {record.prescription}</p>
                          )}
                          {record.notes && (
                            <p className={styles.historyNotes}><strong>Additional Notes:</strong> {record.notes}</p>
                          )}
                          {record.followUp && (
                            <p className={styles.historyFollowUp}><strong>Follow-up:</strong> {record.followUp}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Patient Information Summary */}
              {patient && (
                <div className={styles.patientSummary}>
                  <h4 className={styles.sectionTitle}>Patient Information Summary</h4>
                  <div className={styles.summaryGrid}>
                    <div className={styles.summaryItem}>
                      <span className={styles.summaryLabel}>Blood Group:</span>
                      <span className={styles.summaryValue}>{patient.bloodGroup || 'Not specified'}</span>
                    </div>
                    <div className={styles.summaryItem}>
                      <span className={styles.summaryLabel}>Allergies:</span>
                      <span className={styles.summaryValue}>{patient.allergies?.join(', ') || 'None reported'}</span>
                    </div>
                    <div className={styles.summaryItem}>
                      <span className={styles.summaryLabel}>Chronic Conditions:</span>
                      <span className={styles.summaryValue}>{patient.conditions?.join(', ') || 'None reported'}</span>
                    </div>
                    <div className={styles.summaryItem}>
                      <span className={styles.summaryLabel}>Medications:</span>
                      <span className={styles.summaryValue}>{patient.medications?.join(', ') || 'None'}</span>
                    </div>
                    <div className={styles.summaryItem}>
                      <span className={styles.summaryLabel}>Last Consultation:</span>
                      <span className={styles.summaryValue}>
                        {patient.medicalHistory.length > 0 
                          ? patient.medicalHistory[0].date 
                          : 'No previous consultations'}
                      </span>
                    </div>
                    <div className={styles.summaryItem}>
                      <span className={styles.summaryLabel}>Total Consultations:</span>
                      <span className={styles.summaryValue}>{patient.medicalHistory.length}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className={styles.modalFooter}>
            <button
              className={styles.secondaryButton}
              onClick={() => {
                setShowFullHistoryModal(false);
                setFullHistoryPatient(null);
                setFullHistoryNotes([]);
              }}
            >
              Close
            </button>
            <button
              className={styles.primaryButton}
              onClick={() => {
                setShowFullHistoryModal(false);
                handleAddNotesClick(fullHistoryPatient);
              }}
            >
              Add New Notes
            </button>
          </div>
        </div>
      </div>
    );
  }, [showFullHistoryModal, fullHistoryPatient, fullHistoryNotes, dashboardData.patients, handleAddNotesClick]);

  const AnalyticsCard = ({ icon, number, label, color }) => (
    <div className={styles.analyticsCard}>
      <div className={styles.analyticsIcon} style={{backgroundColor: color}}>{icon}</div>
      <div className={styles.analyticsContent}>
        <h3 className={styles.analyticsNumber}>{number}</h3>
        <p className={styles.analyticsLabel}>{label}</p>
      </div>
    </div>
  );

  const ConsultationCard = useCallback(({ consultation }) => (
    <div className={styles.consultationCard}>
      <div className={styles.consultationHeader}>
        <div className={styles.patientInfo}>
          <div className={styles.profileIcon}>👤</div>
          <div>
            <h4 className={styles.patientName}>{consultation.patientName}</h4>
            <p className={styles.consultationTime}>
              {consultation.time} • {consultation.date}
            </p>
          </div>
        </div>
        <span className={styles.statusBadge}>{consultation.status}</span>
      </div>
      <p className={styles.consultationIssue}>{consultation.issue}</p>
      <div className={styles.consultationActions}>
        <button
          className={styles.viewDetailsButton}
          onClick={() => handleViewDetails(consultation)}
        >
          View Details
        </button>
        <button
          className={styles.secondaryButton}
          onClick={() => handleAddNotesClick(consultation.patientName)}
        >
          Add Notes
        </button>
        {consultation.type === 'follow-up' && (
          <button
            className={styles.prescriptionButton}
            onClick={() => handlePrescriptionRefill && handlePrescriptionRefill(consultation.patientName)}
          >
            Refill Rx
          </button>
        )}
      </div>
    </div>
  ), [handleViewDetails, handleAddNotesClick]);

  const UpcomingAppointmentCard = useCallback(({ appointment }) => (
    <div className={styles.upcomingCard}>
      <div className={styles.upcomingHeader}>
        <div className={styles.profileIconLarge}>👤</div>
        <div className={styles.upcomingPatientInfo}>
          <h3 className={styles.upcomingPatientName}>{appointment.patientName}</h3>
          <p className={styles.upcomingPatientAge}>Age: {appointment.age}</p>
        </div>
      </div>
      <div className={styles.upcomingDetails}>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Time:</span>
          <span className={styles.detailValue}>{appointment.time}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Date:</span>
          <span className={styles.detailValue}>{appointment.date}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Duration:</span>
          <span className={styles.detailValue}>{appointment.duration}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Reason:</span>
          <span className={styles.detailValue}>{appointment.issue}</span>
        </div>
      </div>
      <div className={styles.upcomingActions}>
        <button 
          className={styles.primaryButton}
          onClick={() => {
            const consultation = handleStartConsultation(appointment.id);
            if (consultation) {
              setCurrentConsultation(consultation);
              setVideoCallActive(true);
              setCallStatus('connecting');
              
              // Simulate call connection
              setTimeout(() => {
                setCallStatus('connected');
              }, 2000);
            }
          }}
        >
          Start Consultation
        </button>
        <button 
          className={styles.dangerButton}
          onClick={() => handleCancelAppointment(appointment.id)}
        >
          Cancel
        </button>
        <button 
          className={styles.secondaryButton}
          onClick={() => handleAddNotesClick(appointment.patientName)}
        >
          Quick Notes
        </button>
      </div>
    </div>
  ), [handleStartConsultation, handleCancelAppointment, handleAddNotesClick]);

  // Video Consultation Component - memoized
  const VideoConsultation = useMemo(() => {
    if (!videoCallActive) return null;

    const handleEndCall = () => {
      setVideoCallActive(false);
      setCurrentConsultation(null);
      setCallStatus('disconnected');
    };

    const handleToggleVideo = () => {
      showNotification('info', 'Video toggled');
    };

    const handleToggleAudio = () => {
      showNotification('info', 'Audio toggled');
    };

    return (
      <div className={styles.videoCallOverlay}>
        <div className={styles.videoCallContainer}>
          <div className={styles.videoCallHeader}>
            <div className={styles.callInfo}>
              <h3 className={styles.callTitle}>
                Video Consultation with {currentConsultation?.patientName}
              </h3>
              <p className={styles.callStatus}>
                Status: <span style={{
                  color: callStatus === 'connected' ? '#10B981' : 
                         callStatus === 'connecting' ? '#F59E0B' : '#EF4444'
                }}>{callStatus}</span>
              </p>
            </div>
            <button className={styles.endCallButton} onClick={handleEndCall}>
              📞 End Call
            </button>
          </div>

          <div className={styles.videoGrid}>
            {/* Patient Video */}
            <div className={styles.videoFeed}>
              <div className={styles.videoPlaceholder}>
                <div className={styles.videoIcon}>👤</div>
                <p className={styles.videoLabel}>{currentConsultation?.patientName}</p>
                <p className={styles.videoStatus}>Live Video Feed</p>
              </div>
            </div>

            {/* Doctor Video (Self View) */}
            <div className={styles.selfView}>
              <div className={styles.selfViewPlaceholder}>
                <div className={styles.videoIcon}>👨‍⚕️</div>
                <p className={styles.videoLabel}>You</p>
                <p className={styles.videoStatus}>Self View</p>
              </div>
            </div>
          </div>

          <div className={styles.callControls}>
            <button className={styles.controlButton} onClick={handleToggleVideo}>
              🎥 Video
            </button>
            <button className={styles.controlButton} onClick={handleToggleAudio}>
              🎤 Audio
            </button>
            <button className={styles.controlButton} onClick={() => showNotification('info', 'Screen sharing started')}>
              📺 Share Screen
            </button>
            <button className={styles.recordButton} onClick={() => showNotification('warning', 'Recording started - Patient consent required')}>
              🔴 Record
            </button>
          </div>

          {/* Consultation Tools during call */}
          <div className={styles.callTools}>
            <h4 className={styles.toolsTitle}>Quick Tools</h4>
            <div className={styles.quickTools}>
              <button className={styles.toolButton} onClick={() => {
                showNotification('info', 'Prescription editor opened');
              }}>
                💊 Prescription
              </button>
              <button className={styles.toolButton} onClick={() => {
                handleViewDetails(currentConsultation);
              }}>
                📋 Medical History
              </button>
              <button className={styles.toolButton} onClick={() => {
                handleAddNotesClick(currentConsultation?.patientName);
              }}>
                📝 Notes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }, [videoCallActive, currentConsultation, callStatus, showNotification, handleViewDetails, handleAddNotesClick]);

  // Enhanced Current Consultation with functional tools - memoized
  const CurrentConsultationCard = useMemo(() => {
    if (!currentConsultation || videoCallActive) return null;

    const handleAddMedication = () => {
      const medName = prompt('Enter medication name:');
      if (medName) {
        const dosage = prompt('Enter dosage:');
        const instructions = prompt('Enter instructions:');
        
        setPrescriptionData(prev => ({
          ...prev,
          medications: [...prev.medications, {
            name: medName,
            dosage: dosage,
            instructions: instructions,
            id: Date.now()
          }]
        }));
      }
    };

    const handleRemoveMedication = (medId) => {
      setPrescriptionData(prev => ({
        ...prev,
        medications: prev.medications.filter(med => med.id !== medId)
      }));
    };

    const handleSavePrescription = () => {
      showNotification('success', 'Prescription saved successfully!');
    };

    const handleSaveNotes = () => {
      showNotification('success', 'Consultation notes saved!');
    };

    const handleEndConsultation = () => {
      if (window.confirm('Are you sure you want to end this consultation?')) {
        setCurrentConsultation(null);
        setActiveTool('prescription');
        setConsultationNotes('');
        setPrescriptionData({ medications: [], dosage: '', instructions: '' });
        showNotification('info', 'Consultation ended successfully!');
      }
    };

    const renderToolContent = () => {
      switch (activeTool) {
        case 'prescription':
          return (
            <div className={styles.toolContent}>
              <div className={styles.toolHeader}>
                <h4>Prescription Management</h4>
                <button className={styles.smallButton} onClick={handleAddMedication}>
                  + Add Medication
                </button>
              </div>
              
              {prescriptionData.medications.length > 0 ? (
                <div className={styles.medicationsList}>
                  {prescriptionData.medications.map(med => (
                    <div key={med.id} className={styles.medicationItem}>
                      <div className={styles.medicationInfo}>
                        <strong>{med.name}</strong>
                        <span>Dosage: {med.dosage}</span>
                        <span>Instructions: {med.instructions}</span>
                      </div>
                      <button 
                        className={styles.deleteButton}
                        onClick={() => handleRemoveMedication(med.id)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={styles.noData}>No medications added yet.</p>
              )}
              
              <button className={styles.primaryButton} onClick={handleSavePrescription}>
                Save Prescription
              </button>
            </div>
          );

        case 'medicalHistory':
          const patient = dashboardData.patients.find(p => p.name === currentConsultation.patientName);
          return (
            <div className={styles.toolContent}>
              <h4>Medical History - {currentConsultation.patientName}</h4>
              {patient ? (
                <div className={styles.medicalHistory}>
                  <div className={styles.historySection}>
                    <h5>Basic Information</h5>
                    <p>Age: {patient.age}</p>
                    <p>Blood Group: {patient.bloodGroup}</p>
                    <p>Conditions: {patient.conditions.join(', ')}</p>
                  </div>
                  
                  <div className={styles.historySection}>
                    <h5>Previous Consultations</h5>
                    {patient.medicalHistory.map((record, index) => (
                      <div key={index} className={styles.historyRecord}>
                        <strong>{record.date}</strong>
                        <p>Diagnosis: {record.diagnosis}</p>
                        <p>Prescription: {record.prescription}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p>No medical history available.</p>
              )}
            </div>
          );

        case 'examination':
          return (
            <div className={styles.toolContent}>
              <h4>Examination Notes</h4>
              <textarea
                className={styles.notesTextarea}
                placeholder="Enter examination findings, vital signs, observations..."
                rows="8"
                value={consultationNotes}
                onChange={(e) => setConsultationNotes(e.target.value)}
              />
              <button className={styles.primaryButton} onClick={handleSaveNotes}>
                Save Examination Notes
              </button>
            </div>
          );

        default:
          return null;
      }
    };

    return (
      <div className={styles.currentConsultationCard}>
        <div className={styles.currentConsultationHeader}>
          <div className={styles.currentConsultationIcon}>🩺</div>
          <div className={styles.currentConsultationInfo}>
            <h3 className={styles.currentConsultationTitle}>Ongoing Consultation</h3>
            <p className={styles.currentConsultationPatient}>
              With {currentConsultation.patientName} • Age: {currentConsultation.age}
            </p>
            <p className={styles.consultationReason}>Reason: {currentConsultation.issue}</p>
          </div>
          <button 
            className={styles.endConsultationButton}
            onClick={handleEndConsultation}
          >
            End Consultation
          </button>
        </div>
        
        <div className={styles.consultationTimer}>
          <span className={styles.timerText}>Consultation in progress...</span>
          <div className={styles.timerControls}>
            <button className={styles.timerButton} onClick={() => showNotification('info', 'Consultation paused')}>⏸️ Pause</button>
            <button className={styles.timerButton} onClick={() => showNotification('info', 'Timer stopped')}>⏹️ Stop</button>
            <button className={styles.timerButton} onClick={() => handleAddNotesClick(currentConsultation.patientName)}>📝 Quick Notes</button>
          </div>
        </div>

        <div className={styles.consultationTools}>
          <h4 className={styles.toolsTitle}>Consultation Tools</h4>
          <div className={styles.toolsGrid}>
            <button 
              className={`${styles.toolButton} ${activeTool === 'prescription' ? styles.activeToolButton : ''}`}
              onClick={() => setActiveTool('prescription')}
            >
              <span className={styles.toolIcon}>💊</span>
              <span className={styles.toolLabel}>Prescription</span>
            </button>
            <button 
              className={`${styles.toolButton} ${activeTool === 'medicalHistory' ? styles.activeToolButton : ''}`}
              onClick={() => setActiveTool('medicalHistory')}
            >
              <span className={styles.toolIcon}>📋</span>
              <span className={styles.toolLabel}>Medical History</span>
            </button>
            <button 
              className={`${styles.toolButton} ${activeTool === 'examination' ? styles.activeToolButton : ''}`}
              onClick={() => setActiveTool('examination')}
            >
              <span className={styles.toolIcon}>🩺</span>
              <span className={styles.toolLabel}>Examination</span>
            </button>
          </div>

          {/* Tool Content Area */}
          <div className={styles.toolContentArea}>
            {renderToolContent()}
          </div>
        </div>
      </div>
    );
  }, [currentConsultation, videoCallActive, activeTool, consultationNotes, prescriptionData, dashboardData.patients, showNotification, handleAddNotesClick]);

  // Memoized filtered appointments
  const filteredConsultations = useMemo(() => 
    dashboardData.recentConsultations || []
  , [dashboardData.recentConsultations]);

  const upcomingAppointments = useMemo(() => 
    appointments.upcoming || []
  , [appointments.upcoming]);

  return (
    <div className={styles.mainContent}>
      {/* Notifications */}
      {Notification}
      
      {/* Video Consultation Overlay */}
      {VideoConsultation}
      
      {/* Quick Stats Modals */}
      {PendingPrescriptionsModal}
      {CompletedTodayModal}
      {TodaysEarningsModal}
      
      {/* Add Notes Modal */}
      {AddNotesModal}
      
      {/* Prescription Modal */}
      {PrescriptionModal}
      
      {/* Lab Results Modal */}
      {LabResultsModal}
      
      {/* Reports Modal */}
      {ReportsModal}
      
      {/* View Details Modal */}
      {ViewDetailsModal}
      
      {/* Full History Modal */}
      {FullHistoryModal}

      {/* Quick Stats Section */}
      <div className={styles.quickStatsGrid} style={{
        gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
        gap: isMobile ? '15px' : '20px',
        marginBottom: '30px'
      }}>
        <QuickStatCard
          icon="💊"
          value={quickStats.pendingPrescriptions}
          label="Pending Prescriptions"
          color="#E0F2F1"
          action={handlePendingPrescriptionsClick}
        />
        <QuickStatCard
          icon="🧪"
          value={quickStats.labResults}
          label="Lab Results"
          color="#E0F2F1"
          action={handleLabResultsClick}
        />
        <QuickStatCard
          icon="🩺"
          value={quickStats.completedConsultations}
          label="Completed Today"
          color="#E0F2F1"
          action={handleCompletedTodayClick}
        />
        <QuickStatCard
          icon="💰"
          value={quickStats.todaysEarnings}
          label="Today's Earnings"
          color="#E0F2F1"
          action={handleTodaysEarningsClick}
        />
      </div>

      {/* Analytics Grid */}
      <div className={styles.analyticsGrid} style={{
        gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : '1fr 1fr 1fr 1fr',
        gap: isMobile ? '15px' : '20px',
        marginBottom: '30px'
      }}>
        <AnalyticsCard
          icon="📅"
          number={dashboardData.appointments[timeRange]}
          label="Total Appointments"
          color="#E0F2F1"
        />
        <AnalyticsCard
          icon="🩺"
          number={dashboardData.consultations[timeRange]}
          label="Consultations Completed"
          color="#E0F2F1"
        />
        <AnalyticsCard
          icon="❌"
          number={dashboardData.cancelled[timeRange]}
          label="Cancelled"
          color="#FFE6E6"
        />
        <AnalyticsCard
          icon="⭐"
          number={dashboardData.rating || "4.8"}
          label="Patient Rating"
          color="#E0F2F1"
        />
      </div>

      {/* Mobile Time Range Selector */}
      {isMobile && (
        <div className={styles.mobileTimeRange}>
          <button
            className={`${styles.timeRangeButton} ${timeRange === 'today' ? styles.timeRangeButtonActive : ''}`}
            onClick={() => setTimeRange('today')}
          >
            Today
          </button>
          <button
            className={`${styles.timeRangeButton} ${timeRange === 'week' ? styles.timeRangeButtonActive : ''}`}
            onClick={() => setTimeRange('week')}
          >
            This Week
          </button>
          <button
            className={`${styles.timeRangeButton} ${timeRange === 'month' ? styles.timeRangeButtonActive : ''}`}
            onClick={() => setTimeRange('month')}
          >
            This Month
          </button>
        </div>
      )}

      {/* Current Consultation Section */}
      {CurrentConsultationCard}

      <div className={styles.contentGrid} style={{
        gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr' : '2fr 1fr',
        gap: isMobile ? '20px' : '30px'
      }}>
        <div>
          {/* Today's Schedule */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Today's Schedule</h2>
              <button 
                className={styles.viewAll}
                onClick={() => setActivePage && setActivePage('timeslots')}
              >
                Manage Schedule
              </button>
            </div>
            <div className={styles.scheduleList}>
              {todaysSchedule.map((schedule, index) => (
                <ScheduleItem key={index} schedule={schedule} />
              ))}
            </div>
          </div>

          {/* Recent Consultations */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Recent Patient Consultations</h2>
              <span className={styles.viewAll}>View All</span>
            </div>
            <div className={styles.consultationsList}>
              {filteredConsultations.map(consultation => (
                <ConsultationCard key={consultation.id} consultation={consultation} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className={styles.sidebarSection}>
          {/* Upcoming Appointments Sidebar */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Upcoming Appointment</h2>
            </div>
            {upcomingAppointments.slice(0, 1).map(appointment => (
              <UpcomingAppointmentCard key={appointment.id} appointment={appointment} />
            ))}

            <div className={styles.moreAppointments}>
              <h4 className={styles.moreAppointmentsTitle}>More Appointments Today</h4>
              {upcomingAppointments.slice(1, 3).map(appointment => (
                <div key={appointment.id} className={styles.smallAppointmentCard}>
                  <div className={styles.smallAppointmentInfo}>
                    <span className={styles.smallAppointmentTime}>{appointment.time}</span>
                    <span className={styles.smallAppointmentName}>{appointment.patientName}</span>
                  </div>
                  <span className={styles.smallAppointmentDuration}>
                    {appointment.duration}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;