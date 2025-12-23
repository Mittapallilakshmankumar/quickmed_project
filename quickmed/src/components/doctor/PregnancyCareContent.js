import React, { useState, useEffect } from 'react';

const PregnancyCareContent = ({ dashboardData, state, actions }) => {
  const { pregnancyFilter } = state;
  const { setPregnancyFilter, handleViewFullHistory } = actions;

  const [activeTab, setActiveTab] = useState('appointments');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showReportViewer, setShowReportViewer] = useState(false);
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [showVideoConsultation, setShowVideoConsultation] = useState(false);
  const [currentConsultation, setCurrentConsultation] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [callTime, setCallTime] = useState(0);
  const [loadingAppointments, setLoadingAppointments] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [patientReports, setPatientReports] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([]);
  
  // Local state for appointments
  const [appointments, setAppointments] = useState({
    pending: [...dashboardData.pregnancyAppointments.pending],
    upcoming: [...dashboardData.pregnancyAppointments.upcoming],
    cancelled: [...dashboardData.pregnancyAppointments.cancelled]
  });

  // Local state for patients
  const [patients, setPatients] = useState([]);

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
    const pregnancyPatients = [...dashboardData.patients.filter(p => p.patientType === 'pregnancy')];
    setPatients(pregnancyPatients);
    
    const reportsState = {};
    pregnancyPatients.forEach(patient => {
      reportsState[patient.id] = patient.pregnancyDetails?.reports || [];
    });
    setPatientReports(reportsState);
  }, [dashboardData]);

  // Get pregnancy appointments
  const getFilteredPregnancyAppointments = () => {
    switch (pregnancyFilter) {
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
    if (appointment.isFirstConsultation && appointment.consultationType !== 'offline') {
      showNotification('First pregnancy consultation must be at hospital', 'error');
      return;
    }

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
    if (appointment.isFirstConsultation) {
      showNotification(`First consultation must be at hospital for ${appointment.patientName}`, 'info');
      return;
    }

    setCurrentConsultation(appointment);
    setShowVideoConsultation(true);
    setCallTime(0);
    showNotification(`Starting video consultation with ${appointment.patientName}`, 'info');
  };

  // End video consultation
  const handleEndConsultation = () => {
    setShowVideoConsultation(false);
    setIsRecording(false);
    setIsScreenSharing(false);
    showNotification(`Video consultation ended with ${currentConsultation?.patientName}`, 'info');
    
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

  // Toggle screen sharing
  const handleToggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    showNotification(isScreenSharing ? 'Screen sharing stopped' : 'Screen sharing started', 'info');
  };

  // Handle file upload
  const handleFileUpload = (patientId, patientName, file) => {
    if (!file) return;
    
    if (file.type !== 'application/pdf') {
      showNotification('Please upload PDF files only', 'error');
      return;
    }
    
    showNotification(`Uploading ${file.name} to ${patientName}'s locker...`, 'info');
    
    // Create report object immediately
    const newReport = {
      id: Date.now(),
      name: file.name.replace('.pdf', '').replace(/_/g, ' ').toUpperCase(),
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }),
      type: 'pdf',
      file: file, // Store the actual file object
      url: URL.createObjectURL(file)
    };
    
    // Update uploaded files state immediately
    setUploadedFiles(prev => [...prev, newReport]);
    
    // Update patient reports state
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
              pregnancyDetails: {
                ...patient.pregnancyDetails,
                package: packageName
              }
            }
          : patient
      )
    );
    
    showNotification(`Package updated to ${packageName} for ${patientName}`, 'success');
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
          {/* Header */}
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

          {/* Main Video Area */}
          <div style={styles.videoMainArea}>
            <div style={styles.patientVideoContainer}>
              <div style={styles.patientVideoHeader}>
                <div style={styles.patientVideoInfo}>
                  <h3 style={styles.patientVideoName}>{currentConsultation.patientName}</h3>
                  <div style={styles.trimesterIndicator}>
                    🤰 {currentConsultation.trimester} Trimester • {currentConsultation.weeks} weeks
                  </div>
                </div>
              </div>
              
              {/* Mock Video Feed */}
              <div style={styles.videoFeed}>
                <div style={styles.videoMock}>
                  <div style={styles.videoMockContent}>
                    <div style={styles.videoMockAvatar}>
                      <span style={styles.avatarEmoji}>👩</span>
                    </div>
                    <div style={styles.videoMockInfo}>
                      <p style={styles.videoMockText}>Live Video Feed</p>
                      <p style={styles.videoMockSubtext}>{currentConsultation.patientName}</p>
                    </div>
                  </div>
                </div>
                
                {/* Self View */}
                <div style={styles.selfView}>
                  <div style={styles.selfViewHeader}>
                    <span style={styles.selfViewLabel}>You</span>
                    <button 
                      style={styles.selfViewToggle}
                      onClick={() => showNotification('Switched camera view', 'info')}
                    >
                      Set View
                    </button>
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

            {/* Quick Tools Sidebar */}
            <div style={styles.quickTools}>
              <div style={styles.quickToolsHeader}>
                <h4 style={styles.quickToolsTitle}>Quick Tools</h4>
              </div>
              
              <div style={styles.toolButtons}>
                <button 
                  style={isScreenSharing ? styles.activeToolButton : styles.toolButton}
                  onClick={handleToggleScreenShare}
                >
                  <span style={styles.toolIcon}>🖥️</span>
                  <span>Share Screen</span>
                </button>
                
                <button 
                  style={isRecording ? styles.recordingButton : styles.toolButton}
                  onClick={handleToggleRecording}
                >
                  <span style={styles.toolIcon}>⏺️</span>
                  <span>{isRecording ? 'Recording...' : 'Record'}</span>
                  {isRecording && <span style={styles.recordingDot}>●</span>}
                </button>
                
                <button 
                  style={styles.toolButton}
                  onClick={() => showNotification('Opening prescription pad', 'info')}
                >
                  <span style={styles.toolIcon}>💊</span>
                  <span>Prescription</span>
                </button>
                
                <button 
                  style={styles.toolButton}
                  onClick={() => showNotification('Opening medical history', 'info')}
                >
                  <span style={styles.toolIcon}>📋</span>
                  <span>Medical History</span>
                </button>
                
                <button 
                  style={styles.toolButton}
                  onClick={() => showNotification('Opening notes', 'info')}
                >
                  <span style={styles.toolIcon}>📝</span>
                  <span>Notes</span>
                </button>
              </div>
              
              {/* Call Controls */}
              <div style={styles.callControls}>
                <button style={styles.controlButton}>
                  <span style={styles.controlIcon}>🎤</span>
                  <span>Audio</span>
                </button>
                <button style={styles.controlButton}>
                  <span style={styles.controlIcon}>📹</span>
                  <span>Video</span>
                </button>
                <button style={styles.controlButton}>
                  <span style={styles.controlIcon}>🔈</span>
                  <span>Volume</span>
                </button>
              </div>
              
              {/* Consultation Notes */}
              <div style={styles.consultationNotes}>
                <h4 style={styles.notesTitle}>Consultation Notes</h4>
                <textarea 
                  style={styles.notesTextarea}
                  placeholder="Add notes about symptoms, observations, recommendations..."
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

          {/* Footer */}
          <div style={styles.videoFooter}>
            <div style={styles.appointmentInfo}>
              <strong>Appointment:</strong> {currentConsultation.time} • {currentConsultation.date}
            </div>
            <div style={styles.consultationType}>
              <strong>Type:</strong> {currentConsultation.consultationType === 'video' ? 'Video Consultation' : 'Audio Call'}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Pregnancy Appointment Card Component
  const PregnancyAppointmentCard = ({ appointment }) => {
    const isLoading = loadingAppointments[appointment.id];
    const isFirstConsultation = appointment.isFirstConsultation;

    return (
      <div style={styles.appointmentCard}>
        <div style={styles.appointmentHeader}>
          <div style={styles.appointmentPatient}>
            <div style={styles.profileIcon}>
              <span>🤰</span>
            </div>
            <div style={styles.patientInfo}>
              <h3 style={styles.appointmentName}>
                {appointment.patientName}
                <span style={styles.trimesterBadge}>
                  {appointment.trimester} Trimester
                </span>
                {isFirstConsultation && (
                  <span style={styles.firstConsultationBadge}>First Visit</span>
                )}
              </h3>
              <p style={styles.appointmentMeta}>
                Age: {appointment.age} • {appointment.weeks} weeks
                {isFirstConsultation && (
                  <span style={styles.freeBadge}> First Free</span>
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
            {isFirstConsultation && (
              <span style={styles.hospitalRequired}>🏥 Hospital Required</span>
            )}
          </div>
        </div>
        
        <div style={styles.appointmentDetails}>
          <p><strong>Reason:</strong> {appointment.issue}</p>
          <p><strong>Duration:</strong> {appointment.duration}</p>
          {appointment.location && (
            <p><strong>Location:</strong> {appointment.location}</p>
          )}
        </div>

        <div style={styles.appointmentActions}>
          {pregnancyFilter === 'pending' && (
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
          
          {pregnancyFilter === 'upcoming' && (
            <>
              {!isFirstConsultation ? (
                <button 
                  style={styles.primaryButton}
                  onClick={() => handleStartConsultation(appointment)}
                  disabled={isLoading}
                >
                  Start Consultation
                </button>
              ) : (
                <button 
                  style={styles.hospitalButton}
                  onClick={() => showNotification(`First consultation must be at hospital for ${appointment.patientName}`, 'info')}
                  disabled={isLoading}
                >
                  🏥 Hospital Visit Required
                </button>
              )}
              <button 
                style={styles.dangerButton}
                onClick={() => handleCancelAppointment(appointment)}
                disabled={isLoading}
              >
                {isLoading ? 'Cancelling...' : 'Cancel'}
              </button>
            </>
          )}
          
          {pregnancyFilter === 'cancelled' && (
            <div style={styles.cancelledInfo}>
              <p><strong>Cancelled Date:</strong> {appointment.cancelledDate || 'N/A'}</p>
              <p><strong>Reason:</strong> {appointment.reason || 'Not specified'}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Pregnancy Patient Card Component
  const PregnancyPatientCard = ({ patient }) => {
    const patientReportsList = patientReports[patient.id] || [];
    const uploadedPatientFiles = uploadedFiles.filter(file => 
      patientReportsList.some(report => report.id === file.id)
    );
    const allReports = [...patientReportsList, ...uploadedPatientFiles];

    return (
      <div style={styles.patientCard}>
        <div style={styles.patientHeader}>
          <div style={styles.profileIconLarge}>
            <span>🤰</span>
          </div>
          <div style={styles.patientBasicInfo}>
            <h3 style={styles.patientName}>{patient.name}</h3>
            <p style={styles.patientContact}>{patient.phone}</p>
            <p style={styles.patientEmail}>{patient.email}</p>
          </div>
        </div>

        <div style={styles.pregnancyDetails}>
          <div style={styles.detailRow}>
            <span>Trimester:</span>
            <strong>{patient.pregnancyDetails.trimester}</strong>
          </div>
          <div style={styles.detailRow}>
            <span>Weeks:</span>
            <strong>{patient.pregnancyDetails.weeks} weeks</strong>
          </div>
          <div style={styles.detailRow}>
            <span>Package:</span>
            <strong>{patient.pregnancyDetails.package}</strong>
          </div>
          <div style={styles.detailRow}>
            <span>Next Appointment:</span>
            <strong>{patient.pregnancyDetails.nextAppointment}</strong>
          </div>
        </div>

        <div style={styles.reportsSummary}>
          <strong>Reports:</strong>
          <span style={styles.reportCount}>
            {allReports.length} PDF files
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
            style={styles.secondaryButton}
            onClick={() => {
              setSelectedPatient({ ...patient, reports: allReports });
              setShowPackageModal(true);
            }}
          >
            Change Package
          </button>
        </div>
      </div>
    );
  };

  // Report Viewer Modal
  const ReportViewerModal = () => {
    if (!showReportViewer || !selectedPatient) return null;

    const reports = selectedPatient.reports || [];

    return (
      <div style={styles.modalOverlay}>
        <div style={styles.modal}>
          <div style={styles.modalHeader}>
            <h3>File Locker - {selectedPatient.name}</h3>
            <button 
              style={styles.closeButton}
              onClick={() => setShowReportViewer(false)}
            >
              ✕
            </button>
          </div>
          
          <div style={styles.modalContent}>
            <div style={styles.uploadSection}>
              <h4>Upload New Report</h4>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    handleFileUpload(selectedPatient.id, selectedPatient.name, file);
                    // Refresh the reports list
                    setTimeout(() => {
                      setSelectedPatient(prev => ({
                        ...prev,
                        reports: [...(prev.reports || []), {
                          id: Date.now(),
                          name: file.name.replace('.pdf', '').replace(/_/g, ' ').toUpperCase(),
                          date: new Date().toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          }),
                          type: 'pdf',
                          url: URL.createObjectURL(file)
                        }]
                      }));
                    }, 100);
                  }
                }}
                style={styles.fileInput}
              />
              <p style={styles.fileNote}>Only PDF files are accepted</p>
            </div>
            
            {reports.length > 0 ? (
              <div style={styles.reportsList}>
                <h4>Medical Reports ({reports.length})</h4>
                {reports.map((report) => (
                  <div key={report.id} style={styles.reportItem}>
                    <div style={styles.reportInfo}>
                      <div style={styles.reportIcon}>📄</div>
                      <div>
                        <strong>{report.name}</strong>
                        <p style={styles.reportDate}>Uploaded: {report.date}</p>
                      </div>
                    </div>
                    <button 
                      style={styles.viewButton}
                      onClick={() => {
                        if (report.url) {
                          window.open(report.url, '_blank');
                        } else if (report.file) {
                          const url = URL.createObjectURL(report.file);
                          window.open(url, '_blank');
                        } else {
                          showNotification('Opening PDF file...', 'info');
                        }
                      }}
                    >
                      View PDF
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div style={styles.noReports}>
                <div style={styles.noReportsIcon}>📁</div>
                <p>No reports uploaded yet</p>
                <p style={styles.noReportsText}>Upload PDF files to view them here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Package Modal
  const PackageModal = () => {
    if (!showPackageModal || !selectedPatient) return null;

    return (
      <div style={styles.modalOverlay}>
        <div style={styles.modal}>
          <div style={styles.modalHeader}>
            <h3>Select Package for {selectedPatient.name}</h3>
            <button 
              style={styles.closeButton}
              onClick={() => setShowPackageModal(false)}
            >
              ✕
            </button>
          </div>
          
          <div style={styles.modalContent}>
            <p style={styles.currentPackage}>
              Current Package: <strong>{selectedPatient.pregnancyDetails.package}</strong>
            </p>
            
            <div style={styles.packagesList}>
              {dashboardData.pregnancyPackages.map(pkg => (
                <div key={pkg.id} style={styles.packageCard}>
                  <div style={styles.packageInfo}>
                    <div>
                      <h4 style={styles.packageName}>{pkg.name}</h4>
                      <p style={styles.packagePrice}>{pkg.price}</p>
                    </div>
                    <p style={styles.packageDuration}>{pkg.duration}</p>
                  </div>
                  
                  <div style={styles.packageFeatures}>
                    {pkg.features.slice(0, 3).map((feature, index) => (
                      <div key={index} style={styles.feature}>
                        ✓ {feature}
                      </div>
                    ))}
                    {pkg.features.length > 3 && (
                      <div style={styles.moreFeatures}>
                        +{pkg.features.length - 3} more features
                      </div>
                    )}
                  </div>
                  
                  <button 
                    style={{
                      ...styles.selectButton,
                      ...(selectedPatient.pregnancyDetails.package === pkg.name && styles.currentPackageButton)
                    }}
                    onClick={() => handleSelectPackage(selectedPatient.id, selectedPatient.name, pkg.name)}
                  >
                    {selectedPatient.pregnancyDetails.package === pkg.name ? 'Current' : 'Select'}
                  </button>
                </div>
              ))}
            </div>
            
            <div style={styles.packageNotes}>
              <p><strong>Note:</strong> All packages include first free hospital consultation</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Packages Tab Component
  const PackagesTab = () => (
    <div style={styles.packagesContainer}>
      <div style={styles.packagesHeader}>
        <h3>Pregnancy Care Packages</h3>
        <p>Offer comprehensive care packages to expecting mothers</p>
      </div>
      
      <div style={styles.packagesGrid}>
        {dashboardData.pregnancyPackages.map(pkg => (
          <div key={pkg.id} style={styles.packageCardLarge}>
            <div style={styles.packageCardHeader}>
              <h4 style={styles.packageNameLarge}>{pkg.name}</h4>
              <div style={styles.packagePriceLarge}>{pkg.price}</div>
            </div>
            
            <div style={styles.packageDurationLarge}>
              <span>{pkg.duration}</span>
              <span>• {pkg.patients} patients enrolled</span>
            </div>
            
            <div style={styles.packageFeaturesList}>
              {pkg.features.map((feature, index) => (
                <div key={index} style={styles.featureItem}>
                  <span style={styles.featureIcon}>✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            
            {/* <div style={styles.packageActions}>
              <button 
                style={styles.explainButton}
                onClick={() => {
                  showNotification(`Explaining ${pkg.name} package details to patient`, 'info');
                }}
              >
                Explain Package
              </button>
            </div> */}
          </div>
        ))}
      </div>
      
      <div style={styles.packageGuidelines}>
        <h4>Package Guidelines</h4>
        <ul style={styles.guidelinesList}>
          <li>✓ First consultation is always free at hospital</li>
          <li>✓ Explain all packages during first visit</li>
          <li>✓ Help patient choose based on trimester and needs</li>
          <li>✓ Package can be upgraded anytime</li>
        </ul>
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
            backgroundColor: notification.type === 'success' ? '#10B981' :
                           notification.type === 'error' ? '#EF4444' : '#3B82F6'
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
      <ReportViewerModal />
      <PackageModal />
      
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Pregnancy Care</h1>
          <p style={styles.subtitle}>Manage pregnancy appointments and patients</p>
        </div>
        
        <div style={styles.tabs}>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'appointments' && styles.activeTab)
            }}
            onClick={() => setActiveTab('appointments')}
          >
            Appointments
          </button>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'patients' && styles.activeTab)
            }}
            onClick={() => setActiveTab('patients')}
          >
            Patients
          </button>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'packages' && styles.activeTab)
            }}
            onClick={() => setActiveTab('packages')}
          >
            Packages
          </button>
        </div>
      </div>

      {activeTab === 'appointments' && (
        <>
          <div style={styles.filterTabs}>
            <button
              style={{
                ...styles.filterTab,
                ...(pregnancyFilter === 'pending' && styles.activeFilterTab)
              }}
              onClick={() => setPregnancyFilter('pending')}
            >
              Pending ({appointments.pending.length})
            </button>
            <button
              style={{
                ...styles.filterTab,
                ...(pregnancyFilter === 'upcoming' && styles.activeFilterTab)
              }}
              onClick={() => setPregnancyFilter('upcoming')}
            >
              Upcoming ({appointments.upcoming.length})
            </button>
            <button
              style={{
                ...styles.filterTab,
                ...(pregnancyFilter === 'cancelled' && styles.activeFilterTab)
              }}
              onClick={() => setPregnancyFilter('cancelled')}
            >
              Cancelled ({appointments.cancelled.length})
            </button>
          </div>

          <div style={styles.appointmentsContainer}>
            {getFilteredPregnancyAppointments().length > 0 ? (
              getFilteredPregnancyAppointments().map(appointment => (
                <PregnancyAppointmentCard key={appointment.id} appointment={appointment} />
              ))
            ) : (
              <div style={styles.emptyState}>
                <p>No {pregnancyFilter} appointments found</p>
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === 'patients' && (
        <div style={styles.patientsContainer}>
          <div style={styles.patientsGrid}>
            {patients.map(patient => (
              <PregnancyPatientCard key={patient.id} patient={patient} />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'packages' && (
        <PackagesTab />
      )}
    </div>
  );
};

const styles = {
  // Video Consultation Styles
  videoModalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: '#124441',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000
  },
  videoModal: {
    background: '#FFFFFF',
    borderRadius: '12px',
    width: '95%',
    maxWidth: '1400px',
    height: '90vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    boxShadow: '0 20px 60px rgba(18, 68, 65, 0.3)',
    border: '2px solid #4DB6AC'
  },
  videoHeader: {
    background: '#009688',
    color: '#FFFFFF',
    padding: '15px 25px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #4DB6AC'
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
    fontSize: '14px',
    fontWeight: '500'
  },
  connectedDot: {
    color: '#10B981',
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
    background: '#EF4444',
    color: '#FFFFFF',
    border: 'none',
    padding: '8px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'background 0.2s',
    ':hover': {
      background: '#DC2626'
    }
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
    borderBottom: '1px solid #4DB6AC',
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
  trimesterIndicator: {
    background: '#E0F2F1',
    color: '#009688',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '500',
    border: '1px solid #4DB6AC'
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
    background: 'linear-gradient(135deg, #009688 0%, #4DB6AC 100%)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden'
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
    border: '2px solid #4DB6AC',
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  },
  selfViewHeader: {
    background: '#E0F2F1',
    padding: '8px 12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #4DB6AC'
  },
  selfViewLabel: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#4F6F6B'
  },
  selfViewToggle: {
    background: 'transparent',
    border: '1px solid #4DB6AC',
    padding: '3px 8px',
    borderRadius: '4px',
    fontSize: '10px',
    cursor: 'pointer',
    color: '#4F6F6B'
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
    marginBottom: '5px',
    color: '#009688'
  },
  selfViewText: {
    fontSize: '12px',
    color: '#4F6F6B',
    margin: 0
  },
  quickTools: {
    width: '300px',
    background: '#FFFFFF',
    borderLeft: '1px solid #4DB6AC',
    display: 'flex',
    flexDirection: 'column'
  },
  quickToolsHeader: {
    padding: '20px',
    borderBottom: '1px solid #4DB6AC'
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
    border: '1px solid #4DB6AC',
    padding: '12px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px',
    color: '#124441',
    transition: 'all 0.2s',
    ':hover': {
      background: '#E0F2F1',
      borderColor: '#009688'
    }
  },
  activeToolButton: {
    background: '#E0F2F1',
    border: '1px solid #009688',
    padding: '12px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px',
    color: '#009688',
    fontWeight: '500'
  },
  recordingButton: {
    background: '#FEF2F2',
    border: '1px solid #EF4444',
    padding: '12px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px',
    color: '#EF4444',
    fontWeight: '500'
  },
  recordingDot: {
    color: '#EF4444',
    fontSize: '12px',
    animation: 'pulse 1s infinite'
  },
  toolIcon: {
    fontSize: '18px'
  },
  callControls: {
    padding: '20px',
    borderTop: '1px solid #4DB6AC',
    borderBottom: '1px solid #4DB6AC',
    display: 'flex',
    justifyContent: 'space-around'
  },
  controlButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '5px',
    fontSize: '12px',
    color: '#4F6F6B',
    padding: '8px',
    borderRadius: '6px',
    transition: 'background 0.2s',
    ':hover': {
      background: '#E0F2F1'
    }
  },
  controlIcon: {
    fontSize: '24px'
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
    border: '1px solid #4DB6AC',
    borderRadius: '8px',
    padding: '12px',
    fontSize: '14px',
    fontFamily: 'inherit',
    resize: 'none',
    marginBottom: '15px',
    color: '#124441',
    backgroundColor: '#FFFFFF',
    ':focus': {
      outline: 'none',
      borderColor: '#009688',
      boxShadow: '0 0 0 3px rgba(0, 150, 136, 0.1)'
    }
  },
  saveNotesButton: {
    background: '#009688',
    color: '#FFFFFF',
    border: 'none',
    padding: '10px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '14px',
    transition: 'background 0.2s',
    border: '1px solid #4DB6AC',
    ':hover': {
      background: '#00897B'
    }
  },
  videoFooter: {
    background: '#E0F2F1',
    padding: '12px 25px',
    borderTop: '1px solid #4DB6AC',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    color: '#4F6F6B'
  },
  appointmentInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  consultationType: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  // Animation for recording dot
  '@keyframes pulse': {
    '0%, 100%': {
      opacity: 1
    },
    '50%': {
      opacity: 0.5
    }
  },

  // Main Content and Layout Styles
  mainContent: {
    padding: '20px',
    backgroundColor: '#E0F2F1'
  },
  header: {
    marginBottom: '30px'
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#124441'
  },
  subtitle: {
    color: '#4F6F6B',
    marginBottom: '20px'
  },
  tabs: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px'
  },
  tab: {
    padding: '10px 20px',
    background: '#FFFFFF',
    border: '1px solid #4DB6AC',
    borderRadius: '5px',
    cursor: 'pointer',
    color: '#124441'
  },
  activeTab: {
    background: '#009688',
    color: '#FFFFFF',
    borderColor: '#009688'
  },
  filterTabs: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px'
  },
  filterTab: {
    padding: '8px 16px',
    background: '#FFFFFF',
    border: '1px solid #4DB6AC',
    borderRadius: '5px',
    cursor: 'pointer',
    color: '#124441'
  },
  activeFilterTab: {
    background: '#009688',
    color: '#FFFFFF',
    borderColor: '#009688'
  },
  appointmentsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  appointmentCard: {
    background: '#FFFFFF',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    border: '1px solid #4DB6AC'
  },
  appointmentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '15px'
  },
  appointmentPatient: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center'
  },
  profileIcon: {
    width: '40px',
    height: '40px',
    background: '#E0F2F1',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    color: '#009688'
  },
  patientInfo: {
    flex: 1
  },
  appointmentName: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '5px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap',
    color: '#124441'
  },
  trimesterBadge: {
    background: '#E0F2F1',
    color: '#009688',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500',
    border: '1px solid #4DB6AC'
  },
  firstConsultationBadge: {
    background: '#E0F2F1',
    color: '#009688',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500',
    border: '1px solid #4DB6AC'
  },
  appointmentMeta: {
    fontSize: '14px',
    color: '#4F6F6B',
    marginBottom: '5px'
  },
  freeBadge: {
    background: '#10B981',
    color: '#FFFFFF',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '12px',
    marginLeft: '5px'
  },
  consultationType: {
    fontSize: '13px',
    color: '#009688',
    fontWeight: '500'
  },
  appointmentTime: {
    textAlign: 'right',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    color: '#124441'
  },
  hospitalRequired: {
    fontSize: '11px',
    color: '#EF4444',
    backgroundColor: '#FEF2F2',
    padding: '2px 6px',
    borderRadius: '4px',
    border: '1px solid #EF4444'
  },
  appointmentDetails: {
    marginBottom: '15px',
    fontSize: '14px',
    color: '#4F6F6B'
  },
  appointmentActions: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap'
  },
  cancelledInfo: {
    width: '100%',
    padding: '10px',
    background: '#FEF2F2',
    borderRadius: '5px',
    fontSize: '14px',
    color: '#4F6F6B',
    border: '1px solid #EF4444'
  },
  primaryButton: {
    padding: '8px 16px',
    background: '#009688',
    color: '#FFFFFF',
    border: '1px solid #009688',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    minWidth: '140px'
  },
  hospitalButton: {
    padding: '8px 16px',
    background: '#E0F2F1',
    color: '#009688',
    border: '1px solid #009688',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    minWidth: '180px'
  },
  secondaryButton: {
    padding: '8px 16px',
    background: 'transparent',
    color: '#009688',
    border: '1px solid #009688',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  successButton: {
    padding: '8px 16px',
    background: '#10B981',
    color: '#FFFFFF',
    border: '1px solid #10B981',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  dangerButton: {
    padding: '8px 16px',
    background: '#EF4444',
    color: '#FFFFFF',
    border: '1px solid #EF4444',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  patientsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  patientsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px'
  },
  patientCard: {
    background: '#FFFFFF',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    border: '1px solid #4DB6AC'
  },
  patientHeader: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
    marginBottom: '15px'
  },
  profileIconLarge: {
    width: '50px',
    height: '50px',
    background: '#E0F2F1',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    color: '#009688'
  },
  patientBasicInfo: {
    flex: 1
  },
  patientName: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '5px',
    color: '#124441'
  },
  patientContact: {
    fontSize: '14px',
    color: '#4F6F6B',
    marginBottom: '2px'
  },
  patientEmail: {
    fontSize: '13px',
    color: '#4F6F6B'
  },
  pregnancyDetails: {
    background: '#E0F2F1',
    padding: '15px',
    borderRadius: '5px',
    marginBottom: '15px',
    border: '1px solid #4DB6AC'
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '5px',
    fontSize: '14px',
    color: '#124441'
  },
  reportsSummary: {
    marginBottom: '15px',
    padding: '10px',
    background: '#E0F2F1',
    borderRadius: '5px',
    fontSize: '14px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid #4DB6AC',
    color: '#124441'
  },
  reportCount: {
    color: '#009688',
    fontWeight: '500'
  },
  patientActions: {
    display: 'flex',
    gap: '10px'
  },
  packagesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px'
  },
  packagesHeader: {
    marginBottom: '10px'
  },
  packagesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '20px'
  },
  packageCardLarge: {
    background: '#FFFFFF',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    border: '1px solid #4DB6AC'
  },
  packageCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  packageNameLarge: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#124441',
    margin: 0
  },
  packagePriceLarge: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#009688'
  },
  packageDurationLarge: {
    display: 'flex',
    gap: '10px',
    fontSize: '14px',
    color: '#4F6F6B'
  },
  packageFeaturesList: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  featureItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    fontSize: '14px',
    color: '#124441'
  },
  featureIcon: {
    color: '#009688',
    flexShrink: 0
  },
  packageActions: {
    marginTop: '10px'
  },
  explainButton: {
    padding: '8px 16px',
    background: 'transparent',
    color: '#009688',
    border: '1px solid #009688',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    width: '100%'
  },
  packageGuidelines: {
    background: '#E0F2F1',
    padding: '20px',
    borderRadius: '8px',
    marginTop: '20px',
    border: '1px solid #4DB6AC'
  },
  guidelinesList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    color: '#124441'
  },
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
    borderRadius: '8px',
    maxWidth: '500px',
    width: '100%',
    maxHeight: '80vh',
    overflow: 'auto',
    border: '2px solid #4DB6AC'
  },
  modalHeader: {
    padding: '20px',
    borderBottom: '1px solid #4DB6AC',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#4F6F6B',
    backgroundColor: '#E0F2F1',
    padding: '8px',
    borderRadius: '4px'
  },
  modalContent: {
    padding: '20px'
  },
  currentPackage: {
    fontSize: '14px',
    marginBottom: '20px',
    padding: '10px',
    background: '#E0F2F1',
    borderRadius: '5px',
    color: '#124441',
    border: '1px solid #4DB6AC'
  },
  packagesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginBottom: '20px'
  },
  packageCard: {
    border: '1px solid #4DB6AC',
    borderRadius: '8px',
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    backgroundColor: '#FFFFFF'
  },
  packageInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  packageName: {
    fontSize: '16px',
    fontWeight: '600',
    margin: 0,
    color: '#124441'
  },
  packagePrice: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#009688',
    margin: 0
  },
  packageDuration: {
    fontSize: '12px',
    color: '#4F6F6B',
    marginTop: '5px'
  },
  packageFeatures: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    fontSize: '13px',
    color: '#124441'
  },
  feature: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  },
  moreFeatures: {
    fontSize: '12px',
    color: '#4F6F6B',
    fontStyle: 'italic'
  },
  selectButton: {
    padding: '8px 16px',
    background: '#009688',
    color: '#FFFFFF',
    border: '1px solid #009688',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    width: '100%'
  },
  currentPackageButton: {
    background: '#10B981',
    borderColor: '#10B981'
  },
  packageNotes: {
    fontSize: '13px',
    color: '#4F6F6B',
    paddingTop: '15px',
    borderTop: '1px solid #4DB6AC'
  },
  uploadSection: {
    marginBottom: '20px'
  },
  fileInput: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #4DB6AC',
    borderRadius: '5px',
    color: '#124441',
    backgroundColor: '#FFFFFF'
  },
  fileNote: {
    fontSize: '12px',
    color: '#4F6F6B',
    marginTop: '5px'
  },
  reportsList: {
    marginTop: '20px'
  },
  reportItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    border: '1px solid #4DB6AC',
    borderRadius: '5px',
    marginBottom: '10px',
    background: '#E0F2F1'
  },
  reportInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flex: 1
  },
  reportIcon: {
    fontSize: '20px',
    color: '#009688'
  },
  reportDate: {
    fontSize: '12px',
    color: '#4F6F6B',
    marginTop: '2px'
  },
  viewButton: {
    padding: '6px 12px',
    background: '#009688',
    color: '#FFFFFF',
    border: '1px solid #009688',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    whiteSpace: 'nowrap'
  },
  noReports: {
    textAlign: 'center',
    padding: '30px 20px',
    color: '#4F6F6B',
    background: '#E0F2F1',
    borderRadius: '8px',
    border: '1px dashed #4DB6AC'
  },
  noReportsIcon: {
    fontSize: '40px',
    marginBottom: '10px',
    opacity: 0.5,
    color: '#009688'
  },
  noReportsText: {
    fontSize: '13px',
    color: '#4F6F6B',
    marginTop: '5px'
  },
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
    padding: '12px 20px',
    borderRadius: '5px',
    color: '#FFFFFF',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px',
    color: '#4F6F6B',
    background: '#FFFFFF',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    border: '1px solid #4DB6AC'
  }
};

export default PregnancyCareContent;