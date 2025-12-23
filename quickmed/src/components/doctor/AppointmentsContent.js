import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

const AppointmentsContent = ({ dashboardData, state, actions }) => {
  const { appointmentFilter, appointments } = state;
  const { 
    setAppointmentFilter, 
    setActivePage,
    handleStartConsultation,   
    handleCancelAppointment,
    handleApproveAppointment,
    handleRejectAppointment,
    handleViewFullHistory,
    handleAddNotes
  } = actions;

  const isMobile = window.innerWidth <= 768;

  // State for time slots management
  const [videoCallActive, setVideoCallActive] = useState(false);
  const [currentConsultation, setCurrentConsultation] = useState(null);
  const [callStatus, setCallStatus] = useState('connecting');
  const [loadingStates, setLoadingStates] = useState({});
  
  // Local appointments state to avoid dependency on setAppointments
  const [localAppointments, setLocalAppointments] = useState(appointments);
  
  // State for notes modal
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [notesPatientName, setNotesPatientName] = useState('');
  const [notesText, setNotesText] = useState('');
  const [notesLoading, setNotesLoading] = useState(false);
  
  // State for React-based notifications
  const [notification, setNotification] = useState(null);
  
  // Sync localAppointments with props when appointments change
  useEffect(() => {
    setLocalAppointments(appointments);
  }, [appointments]);

  // Memoized notification function to prevent re-renders
  const showNotification = useCallback((type, message) => {
    setNotification({ type, message, id: Date.now() });
    
    const timer = setTimeout(() => {
      setNotification(null);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  // Notification Component - memoized to prevent re-renders
  const Notification = useMemo(() => {
    if (!notification) return null;
    
    const bgColor = notification.type === 'success' ? '#10B981' :
                    notification.type === 'error' ? '#EF4444' :
                    notification.type === 'warning' ? '#F59E0B' : '#009688';
    
    const icon = notification.type === 'success' ? '✅' :
                 notification.type === 'error' ? '❌' :
                 notification.type === 'warning' ? '⚠️' : 'ℹ️';
    
    return (
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 10001,
        animation: 'slideIn 0.3s ease'
      }}>
        <div style={{
          padding: '15px 20px',
          borderRadius: '8px',
          backgroundColor: bgColor,
          color: 'white',
          fontWeight: '600',
          minWidth: '300px',
          maxWidth: '400px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif'
        }}>
          {icon} {notification.message}
        </div>
      </div>
    );
  }, [notification]);

  // Direct function to handle view history
  const handleViewHistory = useCallback((patientName) => {
    if (handleViewFullHistory && typeof handleViewFullHistory === 'function') {
      handleViewFullHistory(patientName);
    } else {
      showNotification('info', `Opening medical history for ${patientName}`);
      if (setActivePage && typeof setActivePage === 'function') {
        setActivePage('history');
      }
    }
  }, [handleViewFullHistory, showNotification, setActivePage]);

  // Function to handle Add Notes with modal
  const handleAddNotesClick = useCallback((patientName) => {
    setNotesPatientName(patientName);
    setNotesText('');
    setShowNotesModal(true);
  }, []);

  // Function to save notes
  const handleSaveNotes = useCallback(() => {
    if (!notesText.trim()) {
      showNotification('error', 'Please enter notes before saving');
      return;
    }

    setNotesLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (handleAddNotes && typeof handleAddNotes === 'function') {
        handleAddNotes(notesPatientName, notesText);
      } else {
        // Fallback: Just show success message
        console.log(`Notes saved for ${notesPatientName}: ${notesText}`);
      }
      
      showNotification('success', `Notes saved for ${notesPatientName}`);
      setNotesLoading(false);
      setShowNotesModal(false);
      setNotesText('');
      setNotesPatientName('');
    }, 1000);
  }, [notesText, notesPatientName, showNotification, handleAddNotes]);

  const handleStartVideoConsultation = useCallback((appointment) => {
    setCurrentConsultation(appointment);
    setVideoCallActive(true);
    setCallStatus('connecting');
    
    // Simulate call connection
    setTimeout(() => {
      setCallStatus('connected');
      showNotification('success', `Video consultation started with ${appointment.patientName}`);
    }, 2000);
  }, [showNotification]);

  const handleCancelAppointmentClick = useCallback((appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      setLoadingStates(prev => ({ ...prev, [appointmentId]: true }));
      
      // Simulate API call
      setTimeout(() => {
        // Handle regular appointment cancellation using local state
        const updatedAppointments = { ...localAppointments };
        const appointment = updatedAppointments.upcoming.find(app => app.id === appointmentId);
        
        if (appointment) {
          updatedAppointments.upcoming = updatedAppointments.upcoming.filter(app => app.id !== appointmentId);
          updatedAppointments.cancelled.push({
            ...appointment,
            cancelledDate: new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            }),
            cancelledTime: new Date().toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            }),
            reason: 'Cancelled by doctor'
          });
          
          // Update local state
          setLocalAppointments(updatedAppointments);
        }
        
        showNotification('success', 'Appointment cancelled successfully');
        setLoadingStates(prev => ({ ...prev, [appointmentId]: false }));
      }, 1000);
    }
  }, [localAppointments, showNotification]);

  const handleApproveAppointmentClick = useCallback((appointmentId) => {
    setLoadingStates(prev => ({ ...prev, [appointmentId]: true }));
    
    setTimeout(() => {
      if (handleApproveAppointment) {
        handleApproveAppointment(appointmentId);
      } else {
        // Fallback: Move from pending to upcoming using local state
        const updatedAppointments = { ...localAppointments };
        const appointment = updatedAppointments.pending.find(app => app.id === appointmentId);
        
        if (appointment) {
          updatedAppointments.pending = updatedAppointments.pending.filter(app => app.id !== appointmentId);
          updatedAppointments.upcoming.push(appointment);
          setLocalAppointments(updatedAppointments);
        }
      }
      showNotification('success', 'Appointment approved');
      setLoadingStates(prev => ({ ...prev, [appointmentId]: false }));
    }, 1000);
  }, [localAppointments, showNotification, handleApproveAppointment]);

  const handleRejectAppointmentClick = useCallback((appointmentId) => {
    const reason = window.prompt('Please enter reason for rejection:');
    if (reason) {
      setLoadingStates(prev => ({ ...prev, [appointmentId]: true }));
      
      setTimeout(() => {
        if (handleRejectAppointment) {
          handleRejectAppointment(appointmentId, reason);
        } else {
          // Fallback: Move from pending to cancelled with reason
          const updatedAppointments = { ...localAppointments };
          const appointment = updatedAppointments.pending.find(app => app.id === appointmentId);
          
          if (appointment) {
            updatedAppointments.pending = updatedAppointments.pending.filter(app => app.id !== appointmentId);
            updatedAppointments.cancelled.push({
              ...appointment,
              cancelledDate: new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              }),
              cancelledTime: new Date().toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              }),
              reason: `Rejected: ${reason}`
            });
            setLocalAppointments(updatedAppointments);
          }
        }
        showNotification('info', 'Appointment rejected');
        setLoadingStates(prev => ({ ...prev, [appointmentId]: false }));
      }, 1000);
    }
  }, [localAppointments, showNotification, handleRejectAppointment]);

  const getFilteredAppointments = useCallback(() => {
    switch (appointmentFilter) {
      case 'pending': return localAppointments.pending || [];
      case 'upcoming': return localAppointments.upcoming || [];
      case 'cancelled': return localAppointments.cancelled || [];
      default: return localAppointments.upcoming || [];
    }
  }, [appointmentFilter, localAppointments]);

  // Add Notes Modal Component - memoized to prevent re-renders
  const AddNotesModal = useMemo(() => {
    if (!showNotesModal) return null;

    return (
      <div style={styles.modalOverlay}>
        <div style={styles.modal}>
          <div style={styles.modalHeader}>
            <h3 style={styles.modalTitle}>Add Notes for {notesPatientName}</h3>
            <button 
              style={styles.closeButton}
              onClick={() => {
                setShowNotesModal(false);
                setNotesText('');
                setNotesPatientName('');
              }}
            >
              ✕
            </button>
          </div>
          
          <div style={styles.modalContent}>
            <div style={styles.notesForm}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Patient Name</label>
                <input
                  type="text"
                  value={notesPatientName}
                  readOnly
                  style={styles.readOnlyInput}
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Notes <span style={styles.required}>*</span></label>
                <textarea
                  value={notesText}
                  onChange={(e) => setNotesText(e.target.value)}
                  placeholder="Enter your notes here... (e.g., Symptoms, Diagnosis, Treatment plan, Follow-up instructions)"
                  style={styles.notesTextarea}
                  rows={8}
                  autoFocus
                />
                <div style={styles.charCount}>
                  {notesText.length}/1000 characters
                </div>
              </div>
              
              <div style={styles.notesTips}>
                <h4 style={styles.tipsTitle}>Tips for effective notes:</h4>
                <ul style={styles.tipsList}>
                  <li>Include symptoms and observations</li>
                  <li>Note diagnosis and prescribed medications</li>
                  <li>Record follow-up requirements</li>
                  <li>Add any special instructions for the patient</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div style={styles.modalFooter}>
            <button
              style={styles.cancelButton}
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
              style={styles.saveButton}
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

  // AppointmentCard Component - memoized to prevent re-renders
  const AppointmentCard = useCallback(({ appointment }) => {
    const isLoading = loadingStates[appointment.id];

    return (
      <div style={{
        ...styles.appointmentCard,
        borderLeft: '4px solid #e5e7eb',
        opacity: isLoading ? 0.7 : 1
      }}>
        <div style={styles.appointmentHeader}>
          <div style={styles.appointmentPatient}>
            <div style={{
              ...styles.profileIcon,
              backgroundColor: '#E0F2F1'
            }}>
              <span>👤</span>
            </div>
            <div style={styles.patientInfo}>
              <h3 style={styles.appointmentName}>
                {appointment.patientName}
              </h3>
              <p style={styles.appointmentMeta}>
                Age: {appointment.age} • {appointment.type || 'Consultation'}
              </p>
            </div>
          </div>
          <div style={styles.appointmentTime}>
            <strong>{appointment.time}</strong>
            <span>{appointment.date}</span>
            {appointment.fee && (
              <span style={styles.feeBadge}>
                {appointment.fee === 'Free' ? '🆓 Free' : `💰 ${appointment.fee}`}
              </span>
            )}
            {appointmentFilter === 'pending' && appointment.requestedDate && (
              <span style={styles.requestedDate}>Requested: {appointment.requestedDate}</span>
            )}
          </div>
        </div>
        
        <div style={styles.appointmentDetails}>
          <p style={styles.appointmentIssue}><strong>Reason:</strong> {appointment.issue}</p>
          <p style={styles.appointmentDuration}><strong>Duration:</strong> {appointment.duration}</p>
          {appointment.priority && (
            <span style={{
              ...styles.priorityBadge,
              ...(appointment.priority === 'high' && styles.highPriorityBadge)
            }}>
              {appointment.priority} priority
            </span>
          )}
        </div>

        <div style={styles.appointmentActions}>
          {appointmentFilter === 'pending' ? (
            <>
              <button 
                style={styles.successButton}
                onClick={() => handleApproveAppointmentClick(appointment.id)}
                disabled={isLoading}
              >
                {isLoading ? 'Approving...' : 'Approve'}
              </button>
              <button 
                style={styles.dangerButton}
                onClick={() => handleRejectAppointmentClick(appointment.id)}
                disabled={isLoading}
              >
                {isLoading ? 'Rejecting...' : 'Reject'}
              </button>
              <button 
                style={styles.secondaryButton}
                onClick={() => handleAddNotesClick(appointment.patientName)}
                disabled={isLoading}
              >
                Add Notes
              </button>
            </>
          ) : appointmentFilter === 'upcoming' ? (
            <>
              <button 
                style={styles.primaryButton}
                onClick={() => handleStartVideoConsultation(appointment)}
                disabled={isLoading}
              >
                {isLoading ? 'Starting...' : 'Start Consultation'}
              </button>
              
              <button 
                style={styles.dangerButton}
                onClick={() => handleCancelAppointmentClick(appointment.id)}
                disabled={isLoading}
              >
                {isLoading ? 'Cancelling...' : 'Cancel'}
              </button>
              
              <button 
                style={styles.secondaryButton}
                onClick={() => handleAddNotesClick(appointment.patientName)}
                disabled={isLoading}
              >
                Add Notes
              </button>
            </>
          ) : (
            <>
              {/* Cancelled Appointments Section */}
              <div style={styles.cancelledDetails}>
                <div style={styles.cancelledDetailRow}>
                  <strong style={styles.cancelledLabel}>Cancelled Date:</strong>
                  <span style={styles.cancelledValue}>{appointment.cancelledDate || 'N/A'}</span>
                </div>
                <div style={styles.cancelledDetailRow}>
                  <strong style={styles.cancelledLabel}>Cancelled Time:</strong>
                  <span style={styles.cancelledValue}>{appointment.cancelledTime || 'N/A'}</span>
                </div>
                <div style={styles.cancelledDetailRow}>
                  <strong style={styles.cancelledLabel}>Reason:</strong>
                  <span style={styles.cancelledReasonText}>{appointment.reason || 'Not specified'}</span>
                </div>
              </div>
              <button 
                style={styles.secondaryButton}
                onClick={() => handleAddNotesClick(appointment.patientName)}
                disabled={isLoading}
              >
                Add Notes
              </button>
            </>
          )}
        </div>
      </div>
    );
  }, [
    appointmentFilter, 
    loadingStates, 
    handleApproveAppointmentClick, 
    handleRejectAppointmentClick, 
    handleAddNotesClick, 
    handleStartVideoConsultation, 
    handleCancelAppointmentClick,
    showNotification,
    setActivePage
  ]);

  // Memoized filtered appointments
  const filteredAppointments = useMemo(() => getFilteredAppointments(), [getFilteredAppointments]);

  return (
    <div style={styles.mainContent}>
      {Notification}
      {videoCallActive && <VideoConsultation />}
      {AddNotesModal}
      
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.greeting}>Appointments</h1>
          <p style={styles.subtitle}>Manage your upcoming and cancelled consultations</p>
        </div>
        {!isMobile && (
          <div style={styles.filterTabs}>
            <button
              style={{
                ...styles.filterTab,
                ...(appointmentFilter === 'pending' && styles.filterTabActive)
              }}
              onClick={() => setAppointmentFilter('pending')}
            >
              Pending ({localAppointments.pending?.length || 0})
            </button>
            <button
              style={{
                ...styles.filterTab,
                ...(appointmentFilter === 'upcoming' && styles.filterTabActive)
              }}
              onClick={() => setAppointmentFilter('upcoming')}
            >
              Upcoming ({localAppointments.upcoming?.length || 0})
            </button>
            <button
              style={{
                ...styles.filterTab,
                ...(appointmentFilter === 'cancelled' && styles.filterTabActive)
              }}
              onClick={() => setAppointmentFilter('cancelled')}
            >
              Cancelled ({localAppointments.cancelled?.length || 0})
            </button>
          </div>
        )}
      </div>

      {/* Mobile Filter Tabs */}
      {isMobile && (
        <div style={styles.mobileFilterTabs}>
          <select 
            value={appointmentFilter}
            onChange={(e) => setAppointmentFilter(e.target.value)}
            style={styles.mobileFilterSelect}
          >
            <option value="pending">Pending ({localAppointments.pending?.length || 0})</option>
            <option value="upcoming">Upcoming ({localAppointments.upcoming?.length || 0})</option>
            <option value="cancelled">Cancelled ({localAppointments.cancelled?.length || 0})</option>
          </select>
        </div>
      )}

      <div style={styles.appointmentsContainer}>
        {/* Show regular appointments */}
        {filteredAppointments.map(appointment => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}

        {/* Empty State for General Appointments */}
        {filteredAppointments.length === 0 && (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📅</div>
            <h4 style={styles.emptyTitle}>No Appointments</h4>
            <p style={styles.emptyMessage}>
              {appointmentFilter === 'pending' ? 'No pending appointments.' :
               appointmentFilter === 'upcoming' ? 'No upcoming appointments.' :
               'No cancelled appointments.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Video Consultation Component
const VideoConsultation = React.memo(({ 
  videoCallActive, 
  currentConsultation, 
  callStatus, 
  setVideoCallActive, 
  setCurrentConsultation, 
  setCallStatus,
  showNotification,
  handleViewHistory,
  handleAddNotesClick,
  setActivePage
}) => {
  if (!videoCallActive) return null;

  const handleEndCall = () => {
    setVideoCallActive(false);
    setCurrentConsultation(null);
    setCallStatus('disconnected');
    showNotification('success', `Consultation completed with ${currentConsultation?.patientName}`);
  };

  const handleToggleVideo = () => {
    showNotification('info', 'Video camera ' + (Math.random() > 0.5 ? 'enabled' : 'disabled'));
  };

  const handleToggleAudio = () => {
    showNotification('info', 'Audio ' + (Math.random() > 0.5 ? 'enabled' : 'disabled'));
  };

  return (
    <div style={styles.videoCallOverlay}>
      <div style={styles.videoCallContainer}>
        <div style={styles.videoCallHeader}>
          <div style={styles.callInfo}>
            <h3 style={styles.callTitle}>
              Video Consultation with {currentConsultation?.patientName}
            </h3>
            <p style={styles.callStatus}>
              Status: <span style={{
                color: callStatus === 'connected' ? '#10B981' : 
                       callStatus === 'connecting' ? '#F59E0B' : '#EF4444'
              }}>{callStatus}</span>
            </p>
          </div>
          <button style={styles.endCallButton} onClick={handleEndCall}>
            📞 End Call
          </button>
        </div>

        <div style={styles.videoGrid}>
          {/* Patient Video */}
          <div style={styles.videoFeed}>
            <div style={styles.videoPlaceholder}>
              <div style={styles.videoIcon}>
                👤
              </div>
              <p style={styles.videoLabel}>{currentConsultation?.patientName}</p>
              <p style={styles.videoStatus}>Live Video Feed</p>
            </div>
          </div>

          {/* Doctor Video (Self View) */}
          <div style={styles.selfView}>
            <div style={styles.selfViewPlaceholder}>
              <div style={styles.videoIcon}>👨‍⚕️</div>
              <p style={styles.videoLabel}>You</p>
              <p style={styles.videoStatus}>Self View</p>
            </div>
          </div>
        </div>

        <div style={styles.callControls}>
          <button style={styles.controlButton} onClick={handleToggleVideo}>
            🎥 Video
          </button>
          <button style={styles.controlButton} onClick={handleToggleAudio}>
            🎤 Audio
          </button>
          <button style={styles.controlButton} onClick={() => showNotification('info', 'Screen sharing started')}>
            📺 Share Screen
          </button>
          <button style={styles.controlButton} onClick={() => {
            if (setActivePage) {
              setActivePage('messages');
            }
            showNotification('info', 'Opening chat with patient');
          }}>
            💬 Chat
          </button>
          <button style={styles.recordButton} onClick={() => showNotification('warning', 'Recording started - Patient consent required')}>
            🔴 Record
          </button>
        </div>

        {/* Consultation Tools during call */}
        <div style={styles.callTools}>
          <h4 style={styles.toolsTitle}>Quick Tools</h4>
          <div style={styles.quickTools}>
            <button style={styles.toolButton} onClick={() => {
              showNotification('info', 'Prescription editor opened');
            }}>
              💊 Prescription
            </button>
            <button style={styles.toolButton} onClick={() => {
              handleViewHistory(currentConsultation?.patientName);
            }}>
              📋 Medical History
            </button>
            <button style={styles.toolButton} onClick={() => {
              handleAddNotesClick(currentConsultation?.patientName);
            }}>
              📝 Notes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

// Styles with updated color codes
const styles = {
  mainContent: {
    padding: 'clamp(15px, 3vw, 30px)',
    textAlign: 'left'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '30px',
    textAlign: 'left',
    flexWrap: 'wrap',
    gap: '20px'
  },
  headerLeft: {
    textAlign: 'left',
    flex: 1
  },
  greeting: {
    fontSize: 'clamp(20px, 4vw, 28px)',
    fontWeight: '700',
    color: '#124441',
    margin: '0 0 8px 0',
    textAlign: 'left'
  },
  subtitle: {
    fontSize: 'clamp(14px, 2vw, 16px)',
    color: '#4F6F6B',
    margin: 0,
    textAlign: 'left'
  },
  filterTabs: {
    display: 'flex',
    gap: '8px',
    backgroundColor: '#FFFFFF',
    padding: '4px',
    borderRadius: '8px',
    border: '1px solid #E0F2F1',
    flexWrap: 'wrap'
  },
  mobileFilterTabs: {
    marginBottom: '20px'
  },
  mobileFilterSelect: {
    width: '100%',
    padding: '12px',
    border: '1px solid #E0F2F1',
    borderRadius: '8px',
    fontSize: '16px',
    backgroundColor: '#FFFFFF'
  },
  filterTab: {
    padding: '8px 16px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    whiteSpace: 'nowrap',
    transition: 'all 0.3s ease'
  },
  filterTabActive: {
    backgroundColor: '#009688',
    color: '#FFFFFF'
  },
  appointmentsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    textAlign: 'left'
  },
  emptyState: {
    backgroundColor: '#FFFFFF',
    padding: '40px 20px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #E0F2F1',
    textAlign: 'center'
  },
  emptyIcon: {
    fontSize: '48px',
    marginBottom: '16px',
    opacity: 0.5
  },
  emptyTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#124441',
    margin: '0 0 8px 0'
  },
  emptyMessage: {
    fontSize: '14px',
    color: '#4F6F6B',
    margin: '0 0 20px 0'
  },
  appointmentCard: {
    backgroundColor: '#FFFFFF',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #E0F2F1',
    textAlign: 'left',
    transition: 'all 0.3s ease'
  },
  appointmentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px',
    textAlign: 'left',
    flexWrap: 'wrap',
    gap: '15px'
  },
  appointmentPatient: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    textAlign: 'left',
    flex: 1
  },
  patientInfo: {
    textAlign: 'left',
    flex: 1
  },
  profileIcon: {
    position: 'relative',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    flexShrink: 0
  },
  appointmentName: {
    fontSize: 'clamp(16px, 2.5vw, 18px)',
    fontWeight: '600',
    color: '#124441',
    margin: '0 0 8px 0',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap'
  },
  appointmentMeta: {
    fontSize: '14px',
    color: '#4F6F6B',
    margin: '0 0 8px 0',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap'
  },
  appointmentTime: {
    textAlign: 'right',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flexShrink: 0
  },
  feeBadge: {
    backgroundColor: '#E0F2F1',
    color: '#009688',
    padding: '4px 8px',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: '600'
  },
  requestedDate: {
    fontSize: '12px',
    color: '#4F6F6B',
    fontStyle: 'italic'
  },
  appointmentDetails: {
    marginBottom: '16px',
    textAlign: 'left'
  },
  appointmentIssue: {
    fontSize: '14px',
    color: '#4F6F6B',
    margin: '0 0 8px 0',
    textAlign: 'left'
  },
  appointmentDuration: {
    fontSize: '14px',
    color: '#4F6F6B',
    margin: '0 0 8px 0',
    textAlign: 'left'
  },
  priorityBadge: {
    backgroundColor: '#F59E0B',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500',
    display: 'inline-block'
  },
  highPriorityBadge: {
    backgroundColor: '#EF4444'
  },
  appointmentActions: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    textAlign: 'left'
  },
  cancelledDetails: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#FEF2F2',
    borderRadius: '8px',
    marginBottom: '12px',
    border: '1px solid #FECACA'
  },
  cancelledDetailRow: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '8px',
    fontSize: '14px'
  },
  cancelledLabel: {
    color: '#009688',
    minWidth: '120px',
    fontWeight: '600'
  },
  cancelledValue: {
    color: '#124441',
    flex: 1
  },
  cancelledReasonText: {
    color: '#EF4444',
    flex: 1,
    fontStyle: 'italic'
  },
  primaryButton: {
    backgroundColor: '#009688',
    color: '#FFFFFF',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    minWidth: '120px',
    transition: 'all 0.3s ease',
    opacity: 1
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    color: '#009688',
    border: '2px solid #009688',
    padding: '6px 10px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    minWidth: '90px',
    transition: 'all 0.3s ease'
  },
  successButton: {
    backgroundColor: '#10B981',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    minWidth: '80px',
    transition: 'all 0.3s ease'
  },
  dangerButton: {
    backgroundColor: '#EF4444',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    minWidth: '80px',
    transition: 'all 0.3s ease'
  },
  // Video Consultation Styles
  videoCallOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.95)',
    zIndex: 10000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    animation: 'fadeIn 0.3s ease'
  },
  videoCallContainer: {
    backgroundColor: '#1f2937',
    color: 'white',
    borderRadius: '12px',
    padding: '20px',
    width: '95%',
    maxWidth: '1400px',
    height: '95%',
    maxHeight: '900px',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)',
    animation: 'slideUp 0.3s ease'
  },
  videoCallHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    paddingBottom: '15px',
    borderBottom: '1px solid #374151'
  },
  callInfo: {
    flex: 1
  },
  callTitle: {
    fontSize: '20px',
    fontWeight: '600',
    margin: '0 0 8px 0',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  callStatus: {
    fontSize: '14px',
    color: '#9CA3AF',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap'
  },
  endCallButton: {
    backgroundColor: '#EF4444',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  videoGrid: {
    flex: 1,
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '20px',
    marginBottom: '20px'
  },
  videoFeed: {
    backgroundColor: '#374151',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden'
  },
  selfView: {
    backgroundColor: '#374151',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  videoPlaceholder: {
    textAlign: 'center',
    padding: '40px'
  },
  selfViewPlaceholder: {
    textAlign: 'center',
    padding: '20px'
  },
  videoIcon: {
    fontSize: '64px',
    marginBottom: '16px'
  },
  videoLabel: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '8px'
  },
  videoStatus: {
    fontSize: '14px',
    color: '#9CA3AF'
  },
  callControls: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    padding: '20px 0',
    borderTop: '1px solid #374151',
    flexWrap: 'wrap'
  },
  controlButton: {
    backgroundColor: '#374151',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
    minWidth: '100px',
    transition: 'all 0.3s ease'
  },
  recordButton: {
    backgroundColor: '#EF4444',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
    minWidth: '100px',
    transition: 'all 0.3s ease'
  },
  callTools: {
    padding: '20px',
    backgroundColor: '#374151',
    borderRadius: '8px',
    marginTop: '10px'
  },
  toolsTitle: {
    fontSize: '16px',
    fontWeight: '600',
    margin: '0 0 12px 0'
  },
  quickTools: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap'
  },
  toolButton: {
    backgroundColor: '#4B5563',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer',
    minWidth: '120px',
    transition: 'all 0.3s ease'
  },
  // Modal Styles
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 10002,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  },
  modal: {
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '500px',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
  },
  modalHeader: {
    padding: '20px',
    borderBottom: '1px solid #E0F2F1',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#124441',
    margin: 0
  },
  closeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#4F6F6B',
    padding: '0',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px'
  },
  modalContent: {
    padding: '20px',
    flex: 1,
    overflow: 'auto'
  },
  notesForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#124441'
  },
  required: {
    color: '#EF4444'
  },
  readOnlyInput: {
    padding: '10px',
    border: '1px solid #E0F2F1',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: '#E0F2F1',
    color: '#4F6F6B'
  },
  notesTextarea: {
    padding: '12px',
    border: '1px solid #E0F2F1',
    borderRadius: '8px',
    fontSize: '14px',
    fontFamily: 'inherit',
    resize: 'vertical',
    minHeight: '120px',
    outline: 'none',
    boxSizing: 'border-box'
  },
  charCount: {
    fontSize: '12px',
    color: '#4F6F6B',
    textAlign: 'right',
    marginTop: '4px'
  },
  notesTips: {
    padding: '12px',
    backgroundColor: '#E0F2F1',
    borderRadius: '8px'
  },
  tipsTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#009688',
    margin: '0 0 8px 0'
  },
  tipsList: {
    margin: 0,
    paddingLeft: '20px',
    fontSize: '13px',
    color: '#009688'
  },
  modalFooter: {
    padding: '20px',
    borderTop: '1px solid #E0F2F1',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px'
  },
  cancelButton: {
    backgroundColor: 'transparent',
    color: '#4F6F6B',
    border: '2px solid #E0F2F1',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    minWidth: '100px',
    transition: 'all 0.3s ease'
  },
  saveButton: {
    backgroundColor: '#009688',
    color: '#FFFFFF',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    minWidth: '120px',
    transition: 'all 0.3s ease'
  }
};

export default AppointmentsContent;