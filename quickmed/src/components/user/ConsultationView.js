import React, { useState, useEffect, useCallback, memo, useMemo } from 'react';

// Doctors Data with priority indicators
const pediatricDoctors = [
  {
    id: 'ped_1', name: 'Dr. Ananya Sharma', specialty: 'Pediatrics', experience: '12 years',
    languages: 'English, Hindi, Telugu', consultationFee: '800', videoConsultFee: '500',
    availableSlots: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'], rating: 4.9, patients: '1.2k+',
    description: 'Specialized in newborn care, vaccinations, and developmental disorders',
    hospital: 'Apollo Children\'s Hospital', isPediatric: true, homeConsultation: true, homeConsultFee: '1200',
    priority: 'L1', // High priority for critical pediatric cases
    keywords: ['newborn', 'vaccination', 'fever', 'cough', 'diarrhea', 'rash']
  },
  {
    id: 'ped_2', name: 'Dr. Rohan Patel', specialty: 'Pediatric Cardiology', experience: '15 years',
    languages: 'English, Hindi, Gujarati', consultationFee: '1500', videoConsultFee: '1000',
    availableSlots: ['10:00 AM', '01:00 PM', '03:30 PM'], rating: 4.8, patients: '2k+',
    description: 'Expert in pediatric heart conditions and congenital heart defects',
    hospital: 'Fortis Hospital', isPediatric: true, homeConsultation: false,
    priority: 'L1',
    keywords: ['heart', 'cardiology', 'congenital', 'ECG', 'echocardiogram']
  },
  {
    id: 'ped_3', name: 'Dr. Priya Nair', specialty: 'Pediatric Neurology', experience: '10 years',
    languages: 'English, Hindi, Malayalam', consultationFee: '1200', videoConsultFee: '800',
    availableSlots: ['09:30 AM', '12:00 PM', '04:00 PM'], rating: 4.7, patients: '1.5k+',
    description: 'Specialized in childhood epilepsy, developmental delays, and neurological disorders',
    hospital: 'Manipal Hospital', isPediatric: true, homeConsultation: true, homeConsultFee: '1800',
    priority: 'L2',
    keywords: ['neurology', 'epilepsy', 'developmental', 'seizure', 'brain']
  }
];

const pregnancyDoctors = [
  {
    id: 'preg_1', name: 'Dr. Sarah Johnson', specialty: 'Obstetrics & Gynecology', experience: '15 years',
    languages: 'English, Hindi', consultationFee: '1200', videoConsultFee: '800',
    availableSlots: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'], rating: 4.9, patients: '2.5k+',
    description: 'Expert in high-risk pregnancies, prenatal care, and delivery',
    hospital: 'Apollo Hospital', isPregnancy: true, homeConsultation: true, homeConsultFee: '1500',
    specializations: ['High-Risk Pregnancy', 'Prenatal Ultrasound', 'Delivery'],
    priority: 'L1', // High priority for high-risk pregnancies
    keywords: ['high-risk', 'bleeding', 'preeclampsia', 'delivery']
  },
  {
    id: 'preg_2', name: 'Dr. Meera Desai', specialty: 'Fetal Medicine', experience: '12 years',
    languages: 'English, Hindi, Marathi', consultationFee: '2000', videoConsultFee: '1500',
    availableSlots: ['10:00 AM', '02:00 PM'], rating: 4.9, patients: '1.8k+',
    description: 'Specialized in fetal abnormalities, genetic counseling, and prenatal diagnostics',
    hospital: 'Kokilaben Hospital', isPregnancy: true, homeConsultation: false,
    priority: 'L1',
    keywords: ['fetal', 'ultrasound', 'genetic', 'diagnostic', 'abnormality']
  },
  {
    id: 'preg_3', name: 'Dr. Anjali Reddy', specialty: 'Obstetrics', experience: '8 years',
    languages: 'English, Hindi, Telugu', consultationFee: '1000', videoConsultFee: '700',
    availableSlots: ['09:00 AM', '11:00 AM', '03:00 PM', '05:00 PM'], rating: 4.6, patients: '1k+',
    description: 'Expert in normal pregnancies, prenatal yoga guidance, and natural birthing',
    hospital: 'Rainbow Hospital', isPregnancy: true, homeConsultation: true, homeConsultFee: '1300',
    priority: 'L3',
    keywords: ['normal', 'prenatal', 'yoga', 'natural', 'birthing']
  }
];

const generalDoctors = [
  {
    id: 'gen_1', name: 'Dr. Arjun Mehta', specialty: 'General Physician & Pregnancy Care', experience: '18 years',
    languages: 'English, Hindi, Bengali', consultationFee: '900', videoConsultFee: '600',
    availableSlots: ['08:30 AM', '11:30 AM', '03:00 PM', '06:00 PM'], rating: 4.8, patients: '3.5k+',
    description: 'Expert in pregnancy care, routine checkups, and general health consultations for expecting mothers',
    hospital: 'Global Health City', isGeneral: true, isPregnancy: true, homeConsultation: true, homeConsultFee: '1400',
    specializations: ['Pregnancy Care', 'General Health', 'Preventive Medicine'],
    priority: 'L2',
    keywords: ['pregnancy', 'general health', 'checkup', 'preventive']
  },
  {
    id: 'gen_2', name: 'Dr. Neha Gupta', specialty: 'Family Medicine', experience: '10 years',
    languages: 'English, Hindi, Punjabi', consultationFee: '700', videoConsultFee: '500',
    availableSlots: ['09:00 AM', '12:00 PM', '04:00 PM'], rating: 4.7, patients: '2k+',
    description: 'Comprehensive family healthcare including pediatric and pregnancy consultations',
    hospital: 'Max Healthcare', isGeneral: true, homeConsultation: true, homeConsultFee: '1100',
    priority: 'L3',
    keywords: ['family', 'primary care', 'general', 'health']
  },
  {
    id: 'gen_3', name: 'Dr. Sanjay Kumar', specialty: 'Internal Medicine', experience: '20 years',
    languages: 'English, Hindi', consultationFee: '1000', videoConsultFee: '700',
    availableSlots: ['10:00 AM', '01:00 PM', '05:00 PM'], rating: 4.9, patients: '4k+',
    description: 'Expert in managing chronic conditions during pregnancy and general health issues',
    hospital: 'Medanta Hospital', isGeneral: true, homeConsultation: false,
    priority: 'L2',
    keywords: ['internal', 'chronic', 'diabetes', 'hypertension', 'pregnancy']
  }
];

// Memoized Priority Badge Component
const PriorityBadge = memo(({ priority }) => {
  const priorityConfig = {
    'L1': { label: 'High Priority', color: '#DC2626', bg: '#FEE2E2', icon: '⚠️' },
    'L2': { label: 'Medium Priority', color: '#D97706', bg: '#FEF3C7', icon: '⏰' },
    'L3': { label: 'Low Priority', color: '#059669', bg: '#D1FAE5', icon: '✅' }
  };

  const config = priorityConfig[priority] || priorityConfig['L2'];

  return (
    <div style={{
      backgroundColor: config.bg,
      color: config.color,
      padding: '0.25rem 0.75rem',
      borderRadius: '12px',
      fontSize: '0.75rem',
      fontWeight: '600',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.25rem',
      border: `1px solid ${config.color}20`,
      marginTop: '0.25rem'
    }}>
      <span>{config.icon}</span>
      {config.label}
    </div>
  );
});

PriorityBadge.displayName = 'PriorityBadge';

// Memoized Doctor Card Component
const DoctorCard = memo(({ 
  doctor, 
  getAppointmentDetails, 
  handleBookAppointmentClick, 
  handleBookHomeConsultationClick,
  handleBookVideoConsultationClick,
  handleStartVideoCallClick
}) => {
  const clinicAppointment = getAppointmentDetails(doctor.id, 'clinic');
  const homeAppointment = getAppointmentDetails(doctor.id, 'home');
  const videoAppointment = getAppointmentDetails(doctor.id, 'video');
  
  const priorityConfig = {
    'L1': { color: '#DC2626', bg: '#FEE2E2', icon: '⚠️' },
    'L2': { color: '#D97706', bg: '#FEF3C7', icon: '⏰' },
    'L3': { color: '#059669', bg: '#D1FAE5', icon: '✅' }
  };

  const config = priorityConfig[doctor.priority] || priorityConfig['L2'];

  return (
    <div style={doctorCardStyle}>
      <div style={doctorCardHeaderStyle}>
        <div style={doctorAvatarStyle}>
          {doctor.name.charAt(0)}
        </div>
        <div style={doctorBasicInfoStyle}>
          <h4 style={{ color: '#124441', margin: '0 0 0.25rem 0' }}>
            {doctor.name}
          </h4>
          <p style={{ color: '#4F6F6B', margin: 0, fontSize: '0.9rem' }}>
            {doctor.specialty} • {doctor.experience}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
            <span style={{ color: '#f59e0b', fontWeight: '600' }}>★ {doctor.rating}</span>
            <span style={{ color: '#4F6F6B', fontSize: '0.85rem' }}>({doctor.patients})</span>
            <div style={{
              backgroundColor: config.bg,
              color: config.color,
              padding: '0.1rem 0.5rem',
              borderRadius: '10px',
              fontSize: '0.75rem',
              fontWeight: '600',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.2rem',
              marginLeft: '0.5rem'
            }}>
              {config.icon} {doctor.priority}
            </div>
          </div>
        </div>
      </div>

      <div style={doctorDetailsStyle}>
        <p style={{ color: '#4F6F6B', margin: '0 0 0.75rem 0', fontSize: '0.9rem' }}>
          {doctor.description}
        </p>
        <div style={doctorMetaStyle}>
          <div style={metaItemStyle}>
            <span style={metaLabelStyle}>🏥</span>
            <span style={metaValueStyle}>{doctor.hospital}</span>
          </div>
          <div style={metaItemStyle}>
            <span style={metaLabelStyle}>🗣️</span>
            <span style={metaValueStyle}>{doctor.languages}</span>
          </div>
          <div style={metaItemStyle}>
            <span style={metaLabelStyle}>💰</span>
            <span style={metaValueStyle}>Clinic: ₹{doctor.consultationFee}</span>
          </div>
          {doctor.videoConsultFee && (
            <div style={metaItemStyle}>
              <span style={metaLabelStyle}>🎥</span>
              <span style={metaValueStyle}>Video: ₹{doctor.videoConsultFee}</span>
            </div>
          )}
          {doctor.homeConsultation && (
            <div style={metaItemStyle}>
              <span style={metaLabelStyle}>🏠</span>
              <span style={metaValueStyle}>Home: ₹{doctor.homeConsultFee}</span>
            </div>
          )}
        </div>
      </div>

      <div style={doctorActionsStyle}>
        {/* Clinic Appointment Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleBookAppointmentClick(doctor, 'clinic');
          }}
          style={clinicAppointment ? bookedButtonStyle : bookButtonStyle}
          type="button"
        >
          {clinicAppointment ? '✓ Clinic Booked' : `Book Clinic (₹${doctor.consultationFee})`}
        </button>
        
        {/* Home Consultation Button */}
        {doctor.homeConsultation && (
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleBookHomeConsultationClick(doctor);
            }}
            style={homeAppointment ? bookedButtonStyle : homeConsultButtonStyle}
            type="button"
          >
            {homeAppointment ? '✓ Home Visit Booked' : `Book Home (₹${doctor.homeConsultFee})`}
          </button>
        )}
        
        {/* Video Consultation Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleBookVideoConsultationClick(doctor);
          }}
          style={videoAppointment ? bookedButtonStyle : videoButtonStyle}
          type="button"
        >
          {videoAppointment ? '✓ Video Booked' : `Book Video (₹${doctor.videoConsultFee})`}
        </button>
      </div>

      {(clinicAppointment || homeAppointment || videoAppointment) && (
        <div style={appointmentStatusContainerStyle}>
          {clinicAppointment && (
            <div style={appointmentBadgeStyle}>
              <span style={{ color: '#059669', fontWeight: '600', fontSize: '0.9rem' }}>
                ✓ Clinic: {clinicAppointment.date} at {clinicAppointment.time}
              </span>
            </div>
          )}
          
          {homeAppointment && (
            <div style={appointmentBadgeStyle}>
              <span style={{ color: '#059669', fontWeight: '600', fontSize: '0.9rem' }}>
                ✓ Home: {homeAppointment.date} at {homeAppointment.time}
              </span>
            </div>
          )}
          
          {videoAppointment && (
            <div style={appointmentBadgeStyle}>
              <span style={{ color: '#059669', fontWeight: '600', fontSize: '0.9rem' }}>
                ✓ Video: {videoAppointment.date} at {videoAppointment.time}
              </span>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleStartVideoCallClick(doctor);
                }}
                style={startVideoButtonStyle}
                type="button"
              >
                Start Video Call
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

DoctorCard.displayName = 'DoctorCard';

// Memoized helper components for TimeSlotsModal
const DateButton = memo(({ day, isSelected, onSelect }) => (
  <button
    onClick={() => onSelect(day.date)}
    style={dateButtonStyle(isSelected)}
    type="button"
  >
    <div style={dateDayStyle}>{day.day}</div>
    <div style={dateNumStyle}>{day.dateNum}</div>
    <div style={dateMonthStyle}>{day.month}</div>
  </button>
));
DateButton.displayName = 'DateButton';

const TimeSlotButton = memo(({ time, isSelected, onSelect }) => (
  <button
    onClick={() => onSelect(time)}
    style={timeSlotButtonStyle(isSelected)}
    type="button"
  >
    {time}
  </button>
));
TimeSlotButton.displayName = 'TimeSlotButton';

const PriorityButton = memo(({ priority, isSelected, onSelect }) => (
  <button
    onClick={() => onSelect(priority)}
    style={priorityButtonStyle(isSelected)}
    type="button"
  >
    <PriorityBadge priority={priority} />
  </button>
));
PriorityButton.displayName = 'PriorityButton';

// Memoized Time Slots Modal Component
const TimeSlotsModal = memo(({
  showTimeSlotsModal,
  selectedDoctor,
  appointmentType,
  selectedPriority,
  selectedAppointmentDate,
  selectedAppointmentTime,
  bookedAppointments,
  onClose,
  onDateSelect,
  onTimeSelect,
  onPrioritySelect,
  onConfirm,
  onCancel
}) => {
  // Generate next 7 days (stable reference) - moved hooks to top
  const next7Days = useMemo(() => 
    Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i);
      return {
        date: date.toISOString().split('T')[0],
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dateNum: date.getDate(),
        month: date.toLocaleDateString('en-US', { month: 'short' })
      };
    }), []
  );

  const convertTo24Hour = useCallback((time12h) => {
    if (!time12h) return '';
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    
    if (hours === '12') {
      hours = '00';
    }
    
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
    
    return `${hours.toString().padStart(2, '0')}:${minutes}`;
  }, []);

  const isTimeSlotAvailable = useCallback((doctorId, date, time, type) => {
    const appointmentDateTime = new Date(date + 'T' + convertTo24Hour(time));
    
    const existingAppointment = bookedAppointments.find(appt => 
      appt.doctorId === doctorId && 
      appt.type === type &&
      new Date(appt.appointmentDateTime).getTime() === appointmentDateTime.getTime() &&
      appt.status === 'confirmed'
    );
    
    return !existingAppointment;
  }, [bookedAppointments, convertTo24Hour]);

  const getAvailableTimeSlots = useCallback(() => {
    if (!selectedDoctor || !selectedDoctor.availableSlots) return [];
    return selectedDoctor.availableSlots.filter(time => 
      isTimeSlotAvailable(selectedDoctor.id, selectedAppointmentDate, time, appointmentType)
    );
  }, [selectedDoctor, selectedAppointmentDate, appointmentType, isTimeSlotAvailable]);

  // Early return must be after all hooks
  if (!showTimeSlotsModal || !selectedDoctor) return null;

  const availableTimeSlots = selectedAppointmentDate ? getAvailableTimeSlots() : [];

  const fee = appointmentType === 'home' 
    ? selectedDoctor.homeConsultFee 
    : appointmentType === 'video'
    ? selectedDoctor.videoConsultFee
    : selectedDoctor.consultationFee;

  return (
    <div style={modalOverlayStyle} onClick={(e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    }}>
      <div style={timeSlotsModalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={modalHeaderStyle}>
          <h3 style={{ color: '#124441', margin: 0, fontSize: '1.3rem' }}>
            Book {appointmentType === 'home' ? 'Home Consultation' : 
                  appointmentType === 'video' ? 'Video Consultation' : 'Appointment'}
          </h3>
          <button 
            onClick={onClose} 
            style={closeModalButtonStyle} 
            type="button"
          >
            ×
          </button>
        </div>

        <div style={modalContentStyle}>
          {/* Doctor Info */}
          <div style={doctorModalInfoStyle}>
            <div style={doctorModalHeaderStyle}>
              <h4 style={{ color: '#124441', margin: '0 0 0.5rem 0' }}>
                Dr. {selectedDoctor.name}
              </h4>
              <p style={{ color: '#4F6F6B', margin: 0, fontSize: '0.9rem' }}>
                {selectedDoctor.specialty} • {selectedDoctor.experience} experience
              </p>
              <div style={{ marginTop: '0.5rem' }}>
                <span style={consultationFeeStyle}>
                  Fee: ₹{fee}
                  {appointmentType === 'home' && ' (Home Consultation)'}
                  {appointmentType === 'video' && ' (Video Consultation)'}
                </span>
              </div>
            </div>

            {/* Priority Selection */}
            <div style={prioritySelectionStyle}>
              <label style={{ color: '#4F6F6B', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>
                Select Priority Level:
              </label>
              <div style={priorityButtonsStyle}>
                {['L1', 'L2', 'L3'].map((priority) => (
                  <PriorityButton
                    key={priority}
                    priority={priority}
                    isSelected={priority === selectedPriority}
                    onSelect={onPrioritySelect}
                  />
                ))}
              </div>
              <p style={{ color: '#4F6F6B', fontSize: '0.8rem', marginTop: '0.5rem', fontStyle: 'italic' }}>
                {selectedPriority === 'L1' && 'High priority for emergency/urgent cases'}
                {selectedPriority === 'L2' && 'Medium priority for routine consultations'}
                {selectedPriority === 'L3' && 'Low priority for regular checkups'}
              </p>
            </div>

            {/* Date Selection */}
            <div style={dateSelectionStyle}>
              <label style={{ color: '#4F6F6B', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>
                Select Date:
              </label>
              <div style={dateButtonsStyle}>
                {next7Days.map((day) => (
                  <DateButton
                    key={day.date}
                    day={day}
                    isSelected={day.date === selectedAppointmentDate}
                    onSelect={onDateSelect}
                  />
                ))}
              </div>
            </div>

            {/* Time Selection */}
            {selectedAppointmentDate && (
              <div style={timeSelectionStyle}>
                <label style={{ color: '#4F6F6B', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>
                  Select Time Slot:
                </label>
                {availableTimeSlots.length === 0 ? (
                  <div style={noSlotsStyle}>
                    <p style={{ color: '#DC2626', margin: 0 }}>
                      No available slots for {appointmentType} consultation on this date. Please select another date.
                    </p>
                  </div>
                ) : (
                  <div style={timeSlotsGridStyle}>
                    {availableTimeSlots.map((time) => (
                      <TimeSlotButton
                        key={time}
                        time={time}
                        isSelected={time === selectedAppointmentTime}
                        onSelect={onTimeSelect}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Selected Details */}
            {(selectedAppointmentDate || selectedAppointmentTime) && (
              <div style={selectedDetailsStyle}>
                <h4 style={{ color: '#124441', margin: '0 0 0.75rem 0', fontSize: '1.1rem' }}>
                  Appointment Details
                </h4>
                
                {selectedAppointmentDate && (
                  <div style={detailRowStyle}>
                    <span style={detailLabelStyle}>Date:</span>
                    <span style={detailValueStyle}>
                      {new Date(selectedAppointmentDate).toLocaleDateString('en-US', { 
                        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
                      })}
                    </span>
                  </div>
                )}
                
                {selectedAppointmentTime && (
                  <div style={detailRowStyle}>
                    <span style={detailLabelStyle}>Time:</span>
                    <span style={detailValueStyle}>{selectedAppointmentTime}</span>
                  </div>
                )}
                
                {selectedPriority && (
                  <div style={detailRowStyle}>
                    <span style={detailLabelStyle}>Priority:</span>
                    <span style={detailValueStyle}>
                      <PriorityBadge priority={selectedPriority} />
                    </span>
                  </div>
                )}
                
                <div style={detailRowStyle}>
                  <span style={detailLabelStyle}>Type:</span>
                  <span style={detailValueStyle}>
                    {appointmentType === 'home' ? 'Home Consultation' : 
                     appointmentType === 'video' ? 'Video Consultation' : 'Clinic Visit'}
                  </span>
                </div>
                
                <div style={detailRowStyle}>
                  <span style={detailLabelStyle}>Fee:</span>
                  <span style={feeAmountStyle}>₹{fee}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Confirmation Buttons Section */}
        <div style={modalButtonsStyle}>
          <button 
            onClick={onCancel} 
            style={cancelButtonStyle} 
            type="button"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm} 
            disabled={!selectedAppointmentDate || !selectedAppointmentTime || availableTimeSlots.length === 0}
            style={confirmAppointmentButtonStyle} 
            type="button"
          >
            {appointmentType === 'home' ? 'Book Home Consultation' : 
             appointmentType === 'video' ? 'Book Video Consultation' : 'Book Appointment'}
            <div style={{ fontSize: '0.9rem', marginTop: '0.25rem', fontWeight: 'normal' }}>
              Pay ₹{fee} to confirm
            </div>
          </button>
        </div>
      </div>
    </div>
  );
});

TimeSlotsModal.displayName = 'TimeSlotsModal';

// Memoized Payment Modal Component
const PaymentModal = memo(({
  showPaymentModal,
  selectedDoctor,
  appointmentType,
  selectedPriority,
  selectedAppointmentDate,
  selectedAppointmentTime,
  paymentAmount,
  paymentStatus,
  paymentLoading,
  razorpayLoaded,
  pendingAppointment,
  onClose,
  onBack,
  onProcessPayment,
  onRetry,
  onDone
}) => {
  // Early return must be at the beginning
  if (!showPaymentModal || !selectedDoctor || !pendingAppointment) return null;

  // FIXED: Only show failed/cancelled messages when status is actually 'failed' or 'cancelled'
  const showFailedMessage = paymentStatus === 'failed';
  const showCancelledMessage = paymentStatus === 'cancelled';

  return (
    <div style={modalOverlayStyle} onClick={(e) => {
      if (e.target === e.currentTarget && paymentStatus !== 'processing') {
        onClose();
      }
    }}>
      <div style={paymentModalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={paymentModalHeaderStyle}>
          <h3 style={{ color: '#124441', margin: 0, fontSize: '1.3rem' }}>
            Complete Payment
          </h3>
          {paymentStatus !== 'processing' && (
            <button 
              onClick={onClose} 
              style={closeModalButtonStyle} 
              type="button"
            >
              ×
            </button>
          )}
        </div>

        <div style={paymentContentStyle}>
          {/* Payment Header */}
          <div style={paymentHeaderStyle}>
            <div style={paymentDoctorInfoStyle}>
              <h4 style={{ color: '#124441', margin: '0 0 0.5rem 0' }}>
                Dr. {selectedDoctor.name}
              </h4>
              <p style={{ color: '#4F6F6B', margin: 0, fontSize: '0.9rem' }}>
                {selectedDoctor.specialty}
              </p>
              <div style={appointmentDetailsStyle}>
                <span style={{ color: '#124441', fontWeight: '600' }}>
                  {new Date(selectedAppointmentDate).toLocaleDateString('en-US', { 
                    weekday: 'short', month: 'short', day: 'numeric' 
                  })}
                </span>
                <span style={{ color: '#4F6F6B' }}> at </span>
                <span style={{ color: '#124441', fontWeight: '600' }}>
                  {selectedAppointmentTime}
                </span>
              </div>
              <div style={{ marginTop: '0.25rem' }}>
                <span style={{ 
                  backgroundColor: '#E0F2F1', 
                  color: '#124441',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.8rem'
                }}>
                  {appointmentType === 'home' ? 'Home Consultation' : 
                   appointmentType === 'video' ? 'Video Consultation' : 'Clinic Appointment'}
                </span>
              </div>
              {selectedPriority && (
                <div style={{ marginTop: '0.5rem' }}>
                  <PriorityBadge priority={selectedPriority} />
                </div>
              )}
            </div>
            
            <div style={paymentAmountStyle}>
              <div style={amountLabelStyle}>Total Amount</div>
              <div style={amountValueStyle}>₹{paymentAmount}</div>
            </div>
          </div>

          {/* Payment Status */}
          {paymentStatus === 'processing' && (
            <div style={processingContainerStyle}>
              <div style={loadingSpinnerStyle}></div>
              <p style={{ color: '#124441', margin: '1rem 0 0 0', fontWeight: '600' }}>
                Processing payment...
              </p>
            </div>
          )}

          {paymentStatus === 'success' && (
            <div style={successContainerStyle}>
              <div style={successIconStyle}>✓</div>
              <h4 style={{ color: '#059669', margin: '1rem 0 0.5rem 0', fontWeight: '600' }}>
                Payment Successful!
              </h4>
              <p style={{ color: '#4F6F6B', fontSize: '0.9rem' }}>
                Your appointment has been confirmed and is being processed.
              </p>
            </div>
          )}

          {showFailedMessage && (
            <div style={failedContainerStyle}>
              <div style={failedIconStyle}>✕</div>
              <h4 style={{ color: '#DC2626', margin: '1rem 0 0.5rem 0', fontWeight: '600' }}>
                Payment Failed
              </h4>
              <p style={{ color: '#4F6F6B', fontSize: '0.9rem' }}>
                Please try again or use a different payment method.
              </p>
            </div>
          )}

          {showCancelledMessage && (
            <div style={failedContainerStyle}>
              <div style={failedIconStyle}>✕</div>
              <h4 style={{ color: '#DC2626', margin: '1rem 0 0.5rem 0', fontWeight: '600' }}>
                Payment Cancelled
              </h4>
              <p style={{ color: '#4F6F6B', fontSize: '0.9rem' }}>
                You cancelled the payment. Please try again to complete your booking.
              </p>
            </div>
          )}

          {/* Payment Options - Only show when status is 'pending' */}
          {paymentStatus === 'pending' && (
            <>
              <div style={paymentOptionsStyle}>
                <h4 style={{ color: '#124441', margin: '0 0 1rem 0', fontSize: '1.1rem' }}>
                  Choose Payment Method
                </h4>
                
                <button 
                  onClick={onProcessPayment}
                  disabled={paymentLoading}
                  style={razorpayButtonStyle}
                  type="button"
                >
                  <div style={paymentMethodIconStyle}>💳</div>
                  <div>
                    <div style={paymentMethodNameStyle}>Credit/Debit Card</div>
                    <div style={paymentMethodDescStyle}>Pay with Razorpay</div>
                  </div>
                </button>
              </div>

              <div style={securityInfoStyle}>
                <div style={secureBadgeStyle}>🔒</div>
                <span style={{ fontSize: '0.85rem', color: '#4F6F6B' }}>
                  Secure payment powered by Razorpay
                </span>
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div style={paymentButtonsStyle}>
            {paymentStatus === 'pending' && (
              <>
                <button 
                  onClick={onBack}
                  style={paymentCancelButtonStyle}
                  type="button"
                  disabled={paymentLoading}
                >
                  Back
                </button>
                <button 
                  onClick={onProcessPayment}
                  style={paymentConfirmButtonStyle(paymentLoading)}
                  type="button"
                  disabled={paymentLoading}
                >
                  {paymentLoading ? 'Processing...' : `Pay ₹${paymentAmount}`}
                </button>
              </>
            )}

            {paymentStatus === 'success' && (
              <button 
                onClick={onDone}
                style={paymentDoneButtonStyle}
                type="button"
              >
                Done
              </button>
            )}

            {(showFailedMessage || showCancelledMessage) && (
              <>
                <button 
                  onClick={onBack}
                  style={paymentCancelButtonStyle}
                  type="button"
                >
                  Back
                </button>
                <button 
                  onClick={onRetry}
                  style={paymentRetryButtonStyle}
                  type="button"
                >
                  Try Again
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

PaymentModal.displayName = 'PaymentModal';

const ConsultationView = ({
  doctorSearchQuery,
  setDoctorSearchQuery,
  setActiveView,
  handleBookAppointment,
  userAppointments,
  profile,
  addNotification
}) => {
  // State
  const [showTimeSlotsModal, setShowTimeSlotsModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedAppointmentTime, setSelectedAppointmentTime] = useState('');
  const [selectedAppointmentDate, setSelectedAppointmentDate] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [appointmentType, setAppointmentType] = useState('clinic');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState('pending'); // Always start with 'pending'
  const [paymentId, setPaymentId] = useState('');
  const [pendingAppointment, setPendingAppointment] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [showPediatricDoctors, setShowPediatricDoctors] = useState(false);
  const [showPregnancyDoctors, setShowPregnancyDoctors] = useState(false);
  const [showGeneralDoctors, setShowGeneralDoctors] = useState(false);
  const [bookedAppointments, setBookedAppointments] = useState([]);
  
  // Effects
  useEffect(() => {
    if (userAppointments) setBookedAppointments(userAppointments);
  }, [userAppointments]);

  // Initialize Razorpay
  useEffect(() => {
    const initializeRazorpay = async () => {
      const isLoaded = await loadRazorpayScript();
      setRazorpayLoaded(isLoaded);
      if (!isLoaded && addNotification) {
        addNotification('Payment Error', 'Payment service is not available. Please try again.', 'error');
      }
    };
    initializeRazorpay();
  }, [addNotification]);

  // Load Razorpay Script
  const loadRazorpayScript = useCallback(() => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }, []);

  // Search functionality
  const filterDoctorsBySearch = useCallback((doctors) => {
    if (!doctorSearchQuery.trim()) return doctors;
    
    const query = doctorSearchQuery.toLowerCase().trim();
    
    return doctors.filter(doctor => {
      return (
        doctor.name.toLowerCase().includes(query) ||
        doctor.specialty.toLowerCase().includes(query) ||
        doctor.hospital.toLowerCase().includes(query) ||
        (doctor.description && doctor.description.toLowerCase().includes(query)) ||
        (doctor.keywords && doctor.keywords.some(keyword => keyword.toLowerCase().includes(query)))
      );
    });
  }, [doctorSearchQuery]);

  // Filtered doctor lists
  const pediatricDoctorsFiltered = useMemo(() => 
    filterDoctorsBySearch(pediatricDoctors), 
    [filterDoctorsBySearch]
  );

  const pregnancyDoctorsFiltered = useMemo(() => 
    filterDoctorsBySearch(pregnancyDoctors), 
    [filterDoctorsBySearch]
  );

  const generalDoctorsFiltered = useMemo(() => 
    filterDoctorsBySearch(generalDoctors), 
    [filterDoctorsBySearch]
  );

  // Check if any search results exist
  const hasSearchResults = useMemo(() => {
    if (!doctorSearchQuery.trim()) return false;
    
    const allDoctors = [
      ...pediatricDoctorsFiltered,
      ...pregnancyDoctorsFiltered,
      ...generalDoctorsFiltered
    ];
    
    return allDoctors.length > 0;
  }, [doctorSearchQuery, pediatricDoctorsFiltered, pregnancyDoctorsFiltered, generalDoctorsFiltered]);

  // Helper Functions - memoized
  const getAppointmentDetails = useCallback((doctorId, type) => {
    return bookedAppointments.find(appt => 
      appt.doctorId === doctorId && 
      appt.status === 'confirmed' && 
      appt.type === type &&
      new Date(appt.appointmentDateTime) > new Date()
    );
  }, [bookedAppointments]);

  const convertTo24Hour = useCallback((time12h) => {
    if (!time12h) return '';
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    
    if (hours === '12') {
      hours = '00';
    }
    
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
    
    return `${hours.toString().padStart(2, '0')}:${minutes}`;
  }, []);

  // FIXED: Reset payment status when starting new booking
  const handleBookAppointmentClick = useCallback((doctor, type = 'clinic') => {
    // Reset all payment-related states to ensure fresh start
    setPaymentStatus('pending');
    setPaymentAmount(0);
    setPaymentId('');
    setPendingAppointment(null);
    setPaymentLoading(false);
    
    // Set new booking states
    setSelectedDoctor(doctor);
    setAppointmentType(type);
    setSelectedPriority('');
    setSelectedAppointmentDate('');
    setSelectedAppointmentTime('');
    setShowTimeSlotsModal(true);
  }, []);

  const handleBookHomeConsultationClick = useCallback((doctor) => {
    if (!doctor.homeConsultation) {
      alert(`Dr. ${doctor.name} does not offer home consultation services. Please book a clinic appointment.`);
      handleBookAppointmentClick(doctor, 'clinic');
      return;
    }
    handleBookAppointmentClick(doctor, 'home');
  }, [handleBookAppointmentClick]);

  const handleBookVideoConsultationClick = useCallback((doctor) => {
    handleBookAppointmentClick(doctor, 'video');
  }, [handleBookAppointmentClick]);

  const handleStartVideoCallClick = useCallback((doctor) => {
    alert(`Starting video call with Dr. ${doctor.name}...\n\nVideo call functionality would be implemented here.`);
  }, []);

  // FIXED: Reset payment status when confirming appointment
  const handleConfirmAppointment = useCallback(() => {
    if (!selectedDoctor || !selectedAppointmentDate || !selectedAppointmentTime) {
      alert('Please select date and time');
      return;
    }

    const fee = appointmentType === 'home' 
      ? parseInt(selectedDoctor.homeConsultFee || selectedDoctor.consultationFee)
      : appointmentType === 'video'
      ? parseInt(selectedDoctor.videoConsultFee || selectedDoctor.consultationFee)
      : parseInt(selectedDoctor.consultationFee);

    const newAppointment = {
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      doctorSpecialty: selectedDoctor.specialty,
      date: selectedAppointmentDate,
      time: selectedAppointmentTime,
      status: 'pending',
      priority: selectedPriority || selectedDoctor.priority || 'L2',
      type: appointmentType,
      consultationType: appointmentType,
      fee: fee,
      id: `appt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      category: selectedDoctor.isPediatric ? 'Pediatric' : 
                selectedDoctor.isPregnancy ? 'Pregnancy' : 
                selectedDoctor.isGeneral ? 'General' : 'General',
      hospital: selectedDoctor.hospital,
      doctorExperience: selectedDoctor.experience,
      appointmentDateTime: new Date(selectedAppointmentDate + 'T' + convertTo24Hour(selectedAppointmentTime)).toISOString(),
      paymentRequired: true,
      createdAt: new Date().toISOString()
    };

    // Reset payment state before starting new payment flow
    setPaymentStatus('pending');
    setPaymentId('');
    setPaymentLoading(false);
    
    setPaymentAmount(fee);
    setPendingAppointment(newAppointment);
    setShowTimeSlotsModal(false);
    setShowPaymentModal(true);
  }, [selectedDoctor, selectedAppointmentDate, selectedAppointmentTime, appointmentType, selectedPriority, convertTo24Hour]);

  const processPayment = useCallback(async (appointmentDetails) => {
    if (!razorpayLoaded) {
      alert('Payment system is loading, please try again in a moment.');
      return false;
    }

    setPaymentLoading(true);
    setPaymentStatus('processing');

    try {
      const options = {
        key: 'rzp_test_1DP5mmOlF5G5ag',
        amount: paymentAmount * 100,
        currency: 'INR',
        name: 'QuickMed Healthcare',
        description: `${appointmentType === 'video' ? 'Video' : appointmentType === 'home' ? 'Home' : 'Clinic'} Consultation with Dr. ${selectedDoctor.name}`,
        handler: (response) => handlePaymentSuccess(response, appointmentDetails),
        prefill: {
          name: profile?.fullName || 'Patient',
          email: profile?.email || 'patient@example.com',
          contact: profile?.phone || '9999999999'
        },
        theme: { color: '#009688' },
        modal: {
          ondismiss: () => {
            setPaymentLoading(false);
            setPaymentStatus('cancelled');
            // Only show alert if payment was actually cancelled from Razorpay modal
            setTimeout(() => {
              if (paymentStatus === 'processing') {
                alert('Payment was cancelled. Please try again.');
              }
            }, 500);
          }
        }
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
      return true;
    } catch (error) {
      console.error('Error initiating payment:', error);
      setPaymentLoading(false);
      setPaymentStatus('failed');
      alert('Payment failed to initialize. Please try again.');
      return false;
    }
  }, [razorpayLoaded, paymentAmount, appointmentType, selectedDoctor, profile, paymentStatus]);

  const handlePaymentSuccess = useCallback(async (paymentResponse, appointmentDetails) => {
    try {
      setPaymentId(paymentResponse.razorpay_payment_id);
      setPaymentStatus('success');
      
      await verifyPayment(paymentResponse);
      
      setTimeout(() => {
        completeAppointmentBooking(appointmentDetails);
      }, 1500);
    } catch (error) {
      console.error('Payment verification failed:', error);
      setPaymentStatus('failed');
      alert('Payment verification failed. Please contact support.');
    }
  }, []);

  const verifyPayment = useCallback(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 2000);
    });
  }, []);

  const completeAppointmentBooking = useCallback((appointmentDetails) => {
    const appointmentWithPayment = {
      ...appointmentDetails,
      status: 'confirmed',
      consultationType: appointmentType,
      type: appointmentType,
      payment: {
        status: 'completed',
        amount: paymentAmount,
        paymentId: paymentId,
        timestamp: new Date().toISOString(),
        method: 'Razorpay'
      }
    };

    // Handle booking through parent function
    handleBookAppointment(appointmentWithPayment);
    
    // Also update local state
    setBookedAppointments(prev => [...prev, appointmentWithPayment]);
    
    setShowPaymentModal(false);
    setSelectedDoctor(null);
    
    setTimeout(() => {
      const appointmentTypeText = appointmentType === 'video' 
        ? 'Video Consultation' 
        : appointmentType === 'home' 
        ? 'Home Consultation' 
        : 'Clinic Appointment';
      
      alert(`✅ Payment Successful!\n\n${appointmentTypeText} booked successfully with Dr. ${appointmentWithPayment.doctorName}!\n\nPayment Amount: ₹${paymentAmount}\nDate: ${new Date(appointmentWithPayment.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}\nTime: ${appointmentWithPayment.time}\n\nYour appointment has been confirmed!`);
      
      if (addNotification) {
        addNotification(
          'Appointment Confirmed',
          `Your ${appointmentTypeText} with Dr. ${appointmentWithPayment.doctorName} has been confirmed.`,
          'appointment'
        );
      }
    }, 100);
  }, [appointmentType, paymentAmount, paymentId, handleBookAppointment, addNotification]);

  // FIXED: Modal handlers - clear all states when closing modals
  const handleModalClose = useCallback(() => {
    setShowTimeSlotsModal(false);
    // Reset all booking states when closing modal
    setSelectedDoctor(null);
    setSelectedPriority('');
    setSelectedAppointmentDate('');
    setSelectedAppointmentTime('');
    setAppointmentType('clinic');
  }, []);

  const handleModalCancel = useCallback(() => {
    setShowTimeSlotsModal(false);
    // Reset all booking states when cancelling
    setSelectedDoctor(null);
    setSelectedPriority('');
    setSelectedAppointmentDate('');
    setSelectedAppointmentTime('');
    setAppointmentType('clinic');
  }, []);

  const handleDateSelect = useCallback((date) => {
    setSelectedAppointmentDate(date);
    setSelectedAppointmentTime(''); // Reset time when date changes
  }, []);

  const handleTimeSelect = useCallback((time) => {
    setSelectedAppointmentTime(time);
  }, []);

  const handlePrioritySelect = useCallback((priority) => {
    setSelectedPriority(priority);
  }, []);

  // FIXED: Reset payment status when going back from payment modal
  const handlePaymentBack = useCallback(() => {
    setShowPaymentModal(false);
    setPaymentStatus('pending'); // Reset payment status
    setPaymentLoading(false);
    setShowTimeSlotsModal(true);
  }, []);

  // FIXED: Clear all payment states when closing payment modal
  const handlePaymentClose = useCallback(() => {
    setShowPaymentModal(false);
    // Reset all payment-related states
    setPaymentStatus('pending');
    setPaymentAmount(0);
    setPaymentId('');
    setPendingAppointment(null);
    setPaymentLoading(false);
  }, []);

  const handlePaymentDone = useCallback(() => {
    setShowPaymentModal(false);
    // Clear payment states after successful payment
    setPaymentStatus('pending');
    setPaymentAmount(0);
    setPaymentId('');
    setPendingAppointment(null);
    setPaymentLoading(false);
  }, []);

  const handlePaymentRetry = useCallback(() => {
    // Reset to pending and retry payment
    setPaymentStatus('pending');
    setPaymentLoading(false);
    processPayment(pendingAppointment);
  }, [pendingAppointment, processPayment]);

  // Main render
  return (
    <div style={containerStyle}>
      {/* Header Section */}
      <div style={headerStyle}>
        <div>
          <h2 style={{ color: '#124441', margin: '0 0 0.5rem 0' }}>Book Consultation</h2>
          <p style={{ color: '#4F6F6B', margin: 0 }}>
            Find and book appointments with specialized doctors
          </p>
        </div>
        <div style={headerButtonsStyle}>
          <button 
            onClick={() => setActiveView('appointments')}
            style={backButtonStyle}
            type="button"
          >
            ← Back to Appointments
          </button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div style={searchSectionStyle}>
        <div style={searchBoxContainerStyle}>
          <input
            type="text"
            placeholder="Search for doctors or medical conditions..."
            value={doctorSearchQuery}
            onChange={(e) => setDoctorSearchQuery(e.target.value)}
            style={searchInputStyle}
          />
        </div>
        
        <div style={filterButtonsStyle}>
          <button
            onClick={() => {
              setShowPediatricDoctors(!showPediatricDoctors);
              setShowPregnancyDoctors(false);
              setShowGeneralDoctors(false);
            }}
            style={filterButtonStyle(showPediatricDoctors)}
            type="button"
          >
            👶 Pediatric
          </button>
          <button
            onClick={() => {
              setShowPregnancyDoctors(!showPregnancyDoctors);
              setShowPediatricDoctors(false);
              setShowGeneralDoctors(false);
            }}
            style={filterButtonStyle(showPregnancyDoctors)}
            type="button"
          >
            🤰 Pregnancy
          </button>
          <button
            onClick={() => {
              setShowGeneralDoctors(!showGeneralDoctors);
              setShowPediatricDoctors(false);
              setShowPregnancyDoctors(false);
            }}
            style={filterButtonStyle(showGeneralDoctors)}
            type="button"
          >
            🏥 General
          </button>
        </div>
      </div>

      {/* Doctors List */}
      <div style={doctorsListStyle}>
        {/* Show search results header if searching */}
        {doctorSearchQuery.trim() && (
          <div style={searchResultsHeaderStyle}>
            <h3 style={{ color: '#124441', marginBottom: '1rem' }}>
              Search Results for "{doctorSearchQuery}"
            </h3>
            {!hasSearchResults && !showPediatricDoctors && !showPregnancyDoctors && !showGeneralDoctors && (
              <div style={noResultsStyle}>
                <p style={{ color: '#4F6F6B', marginBottom: '1rem' }}>
                  No doctors found matching "{doctorSearchQuery}". Try a different search or browse categories below.
                </p>
              </div>
            )}
          </div>
        )}

        {!showPediatricDoctors && !showPregnancyDoctors && !showGeneralDoctors && !doctorSearchQuery.trim() && (
          <div style={categorySectionStyle}>
            <h3 style={{ color: '#124441', marginBottom: '1rem' }}>All Specialists</h3>
            <p style={{ color: '#4F6F6B', marginBottom: '1rem' }}>
              Please select a category above to view doctors
            </p>
          </div>
        )}

        {/* Show pediatric doctors when category selected OR when searching */}
        {(showPediatricDoctors || (doctorSearchQuery.trim() && pediatricDoctorsFiltered.length > 0)) && (
          <div style={categorySectionStyle}>
            <h3 style={{ color: '#124441', marginBottom: '1rem' }}>
              👶 Pediatric Specialists
              {pediatricDoctorsFiltered.length > 0 && (
                <span style={{ fontSize: '0.9rem', color: '#4F6F6B', marginLeft: '0.5rem', fontWeight: 'normal' }}>
                  ({pediatricDoctorsFiltered.length} found)
                </span>
              )}
            </h3>
            
            {pediatricDoctorsFiltered.length > 0 ? (
              pediatricDoctorsFiltered.map((doctor) => (
                <DoctorCard 
                  key={doctor.id}
                  doctor={doctor}
                  getAppointmentDetails={getAppointmentDetails}
                  handleBookAppointmentClick={handleBookAppointmentClick}
                  handleBookHomeConsultationClick={handleBookHomeConsultationClick}
                  handleBookVideoConsultationClick={handleBookVideoConsultationClick}
                  handleStartVideoCallClick={handleStartVideoCallClick}
                />
              ))
            ) : showPediatricDoctors ? (
              <p style={{ color: '#4F6F6B', fontStyle: 'italic' }}>
                No pediatric doctors found.
              </p>
            ) : null}
          </div>
        )}

        {/* Show pregnancy doctors when category selected OR when searching */}
        {(showPregnancyDoctors || (doctorSearchQuery.trim() && pregnancyDoctorsFiltered.length > 0)) && (
          <div style={categorySectionStyle}>
            <h3 style={{ color: '#124441', marginBottom: '1rem' }}>
              🤰 Pregnancy Specialists
              {pregnancyDoctorsFiltered.length > 0 && (
                <span style={{ fontSize: '0.9rem', color: '#4F6F6B', marginLeft: '0.5rem', fontWeight: 'normal' }}>
                  ({pregnancyDoctorsFiltered.length} found)
                </span>
              )}
            </h3>
            
            {pregnancyDoctorsFiltered.length > 0 ? (
              pregnancyDoctorsFiltered.map((doctor) => (
                <DoctorCard 
                  key={doctor.id}
                  doctor={doctor}
                  getAppointmentDetails={getAppointmentDetails}
                  handleBookAppointmentClick={handleBookAppointmentClick}
                  handleBookHomeConsultationClick={handleBookHomeConsultationClick}
                  handleBookVideoConsultationClick={handleBookVideoConsultationClick}
                  handleStartVideoCallClick={handleStartVideoCallClick}
                />
              ))
            ) : showPregnancyDoctors ? (
              <p style={{ color: '#4F6F6B', fontStyle: 'italic' }}>
                No pregnancy doctors found.
              </p>
            ) : null}
          </div>
        )}

        {/* Show general doctors when category selected OR when searching */}
        {(showGeneralDoctors || (doctorSearchQuery.trim() && generalDoctorsFiltered.length > 0)) && (
          <div style={categorySectionStyle}>
            <h3 style={{ color: '#124441', marginBottom: '1rem' }}>
              🏥 General Doctors
              {generalDoctorsFiltered.length > 0 && (
                <span style={{ fontSize: '0.9rem', color: '#4F6F6B', marginLeft: '0.5rem', fontWeight: 'normal' }}>
                  ({generalDoctorsFiltered.length} found)
                </span>
              )}
            </h3>
            
            {generalDoctorsFiltered.length > 0 ? (
              generalDoctorsFiltered.map((doctor) => (
                <DoctorCard 
                  key={doctor.id}
                  doctor={doctor}
                  getAppointmentDetails={getAppointmentDetails}
                  handleBookAppointmentClick={handleBookAppointmentClick}
                  handleBookHomeConsultationClick={handleBookHomeConsultationClick}
                  handleBookVideoConsultationClick={handleBookVideoConsultationClick}
                  handleStartVideoCallClick={handleStartVideoCallClick}
                />
              ))
            ) : showGeneralDoctors ? (
              <p style={{ color: '#4F6F6B', fontStyle: 'italic' }}>
                No general doctors found.
              </p>
            ) : null}
          </div>
        )}

        {/* Show all categories option when searching */}
        {doctorSearchQuery.trim() && !showPediatricDoctors && !showPregnancyDoctors && !showGeneralDoctors && (
          <div style={categorySectionStyle}>
            <h3 style={{ color: '#124441', marginBottom: '1rem' }}>Browse All Categories</h3>
            <p style={{ color: '#4F6F6B', marginBottom: '1rem' }}>
              Select a category above to view all doctors in that specialty
            </p>
          </div>
        )}
      </div>

      {/* Modals */}
      <TimeSlotsModal
        showTimeSlotsModal={showTimeSlotsModal}
        selectedDoctor={selectedDoctor}
        appointmentType={appointmentType}
        selectedPriority={selectedPriority}
        selectedAppointmentDate={selectedAppointmentDate}
        selectedAppointmentTime={selectedAppointmentTime}
        bookedAppointments={bookedAppointments}
        onClose={handleModalClose}
        onDateSelect={handleDateSelect}
        onTimeSelect={handleTimeSelect}
        onPrioritySelect={handlePrioritySelect}
        onConfirm={handleConfirmAppointment}
        onCancel={handleModalCancel}
      />

      <PaymentModal
        showPaymentModal={showPaymentModal}
        selectedDoctor={selectedDoctor}
        appointmentType={appointmentType}
        selectedPriority={selectedPriority}
        selectedAppointmentDate={selectedAppointmentDate}
        selectedAppointmentTime={selectedAppointmentTime}
        paymentAmount={paymentAmount}
        paymentStatus={paymentStatus}
        paymentLoading={paymentLoading}
        razorpayLoaded={razorpayLoaded}
        pendingAppointment={pendingAppointment}
        onClose={handlePaymentClose}
        onBack={handlePaymentBack}
        onProcessPayment={() => processPayment(pendingAppointment)}
        onRetry={handlePaymentRetry}
        onDone={handlePaymentDone}
      />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

// All styles remain exactly the same as in your original code
const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '1.5rem',
  backgroundColor: '#FFFFFF',
  minHeight: '100vh'
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '2rem',
  marginTop: '140px',
  paddingBottom: '1rem',
  borderBottom: '1px solid #E0F2F1'
};

const headerButtonsStyle = {
  display: 'flex',
  gap: '1rem'
};

const backButtonStyle = {
  backgroundColor: '#009688',
  color: 'white',
  padding: '0.75rem 1.5rem',
  borderRadius: '10px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '0.95rem',
  fontWeight: '600',
  transition: 'all 0.3s ease',
  ':hover': {
    backgroundColor: '#00796B',
    transform: 'translateY(-2px)'
  }
};

const searchSectionStyle = {
  marginBottom: '2rem'
};

const searchBoxContainerStyle = {
  position: 'relative',
  marginBottom: '1rem'
};

const searchInputStyle = {
  width: '100%',
  padding: '1rem 1.5rem',
  fontSize: '1rem',
  border: '2px solid #E0F2F1',
  borderRadius: '12px',
  outline: 'none',
  transition: 'border-color 0.3s ease',
  ':focus': {
    borderColor: '#009688'
  }
};

const filterButtonsStyle = {
  display: 'flex',
  gap: '1rem',
  flexWrap: 'wrap'
};

const filterButtonStyle = (isActive) => ({
  backgroundColor: isActive ? '#009688' : '#E0F2F1',
  color: isActive ? 'white' : '#4F6F6B',
  padding: '0.75rem 1.5rem',
  borderRadius: '10px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '0.95rem',
  fontWeight: '600',
  transition: 'all 0.3s ease',
  ':hover': {
    backgroundColor: isActive ? '#00796B' : '#B2DFDB',
    transform: 'translateY(-2px)'
  }
});

const doctorsListStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem'
};

const categorySectionStyle = {
  backgroundColor: '#FFFFFF',
  padding: '1.5rem',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(18, 68, 65, 0.08)',
  border: '1px solid #E0F2F1'
};

// New styles for search functionality
const searchResultsHeaderStyle = {
  backgroundColor: '#E0F2F1',
  padding: '1.5rem',
  borderRadius: '12px',
  marginBottom: '1rem',
  border: '1px solid #B2DFDB'
};

const noResultsStyle = {
  backgroundColor: '#FEE2E2',
  padding: '1.5rem',
  borderRadius: '12px',
  textAlign: 'center',
  border: '1px solid #FECACA',
  marginBottom: '1rem'
};

// Doctor Card Styles
const doctorCardStyle = {
  backgroundColor: '#FFFFFF',
  borderRadius: '12px',
  padding: '1.5rem',
  marginBottom: '1rem',
  boxShadow: '0 2px 8px rgba(18, 68, 65, 0.08)',
  border: '1px solid #E0F2F1',
  transition: 'all 0.3s ease',
  ':hover': {
    boxShadow: '0 4px 12px rgba(18, 68, 65, 0.12)',
    transform: 'translateY(-2px)'
  }
};

const doctorCardHeaderStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '1rem',
  marginBottom: '1rem'
};

const doctorAvatarStyle = {
  width: '60px',
  height: '60px',
  backgroundColor: '#009688',
  color: 'white',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.5rem',
  fontWeight: '600'
};

const doctorBasicInfoStyle = {
  flex: 1
};

const doctorDetailsStyle = {
  marginBottom: '1rem'
};

const doctorMetaStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '0.75rem',
  marginTop: '1rem'
};

const metaItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem'
};

const metaLabelStyle = {
  color: '#009688',
  fontSize: '1rem'
};

const metaValueStyle = {
  color: '#4F6F6B',
  fontSize: '0.9rem'
};

const doctorActionsStyle = {
  display: 'flex',
  gap: '0.75rem',
  flexWrap: 'wrap'
};

const bookButtonStyle = {
  flex: 1,
  backgroundColor: '#009688',
  color: 'white',
  padding: '0.75rem 1rem',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '0.9rem',
  fontWeight: '600',
  transition: 'all 0.3s ease',
  ':hover': {
    backgroundColor: '#00796B',
    transform: 'translateY(-2px)'
  }
};

const homeConsultButtonStyle = {
  flex: 1,
  backgroundColor: '#4DB6AC',
  color: 'white',
  padding: '0.75rem 1rem',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '0.9rem',
  fontWeight: '600',
  transition: 'all 0.3s ease',
  ':hover': {
    backgroundColor: '#26A69A',
    transform: 'translateY(-2px)'
  }
};

const videoButtonStyle = {
  flex: 1,
  backgroundColor: '#00796B',
  color: 'white',
  padding: '0.75rem 1rem',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '0.9rem',
  fontWeight: '600',
  transition: 'all 0.3s ease',
  ':hover': {
    backgroundColor: '#00695C',
    transform: 'translateY(-2px)'
  }
};

const bookedButtonStyle = {
  flex: 1,
  backgroundColor: '#E0F2F1',
  color: '#4F6F6B',
  padding: '0.75rem 1rem',
  borderRadius: '8px',
  border: 'none',
  cursor: 'not-allowed',
  fontSize: '0.9rem',
  fontWeight: '600'
};

const appointmentStatusContainerStyle = {
  marginTop: '1rem'
};

const appointmentBadgeStyle = {
  backgroundColor: '#E0F2F1',
  padding: '0.75rem',
  borderRadius: '8px',
  marginBottom: '0.5rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const startVideoButtonStyle = {
  backgroundColor: '#00796B',
  color: 'white',
  padding: '0.5rem 1rem',
  borderRadius: '6px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '0.85rem',
  fontWeight: '600',
  transition: 'all 0.3s ease',
  ':hover': {
    backgroundColor: '#00695C'
  }
};

// Modal Styles
const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(18, 68, 65, 0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 10000,
  padding: '1rem',
  animation: 'fadeIn 0.3s ease'
};

const timeSlotsModalStyle = {
  backgroundColor: 'white',
  borderRadius: '20px',
  width: '100%',
  maxWidth: '500px',
  maxHeight: '90vh',
  overflowY: 'auto',
  animation: 'fadeIn 0.3s ease'
};

const modalHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1.5rem',
  borderBottom: '1px solid #E0F2F1',
  backgroundColor: '#E0F2F1',
  borderTopLeftRadius: '20px',
  borderTopRightRadius: '20px'
};

const closeModalButtonStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  fontSize: '2rem',
  color: '#4F6F6B',
  cursor: 'pointer',
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  ':hover': {
    backgroundColor: '#B2DFDB',
    color: '#124441'
  }
};

const modalContentStyle = {
  padding: '1.5rem'
};

const doctorModalInfoStyle = {
  marginBottom: '1.5rem'
};

const doctorModalHeaderStyle = {
  marginBottom: '1.5rem'
};

const consultationFeeStyle = {
  backgroundColor: '#E0F2F1',
  color: '#124441',
  padding: '0.5rem 1rem',
  borderRadius: '8px',
  fontSize: '0.9rem',
  fontWeight: '600',
  display: 'inline-block'
};

const prioritySelectionStyle = {
  marginBottom: '1.5rem'
};

const priorityButtonsStyle = {
  display: 'flex',
  gap: '0.75rem',
  marginBottom: '0.5rem'
};

const priorityButtonStyle = (isSelected) => ({
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  ':hover': {
    transform: 'translateY(-2px)'
  },
  opacity: isSelected ? 1 : 0.7
});

const dateSelectionStyle = {
  marginBottom: '1.5rem'
};

const dateButtonsStyle = {
  display: 'flex',
  gap: '0.5rem',
  overflowX: 'auto',
  padding: '0.5rem 0'
};

const dateButtonStyle = (isSelected) => ({
  backgroundColor: isSelected ? '#009688' : '#E0F2F1',
  color: isSelected ? 'white' : '#4F6F6B',
  border: `1px solid ${isSelected ? '#009688' : '#B2DFDB'}`,
  borderRadius: '10px',
  padding: '0.75rem',
  minWidth: '70px',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  transition: 'all 0.3s ease',
  ':hover': {
    borderColor: '#009688',
    backgroundColor: isSelected ? '#00796B' : '#B2DFDB'
  }
});

const dateDayStyle = {
  fontSize: '0.8rem',
  fontWeight: '600',
  marginBottom: '0.25rem'
};

const dateNumStyle = {
  fontSize: '1.25rem',
  fontWeight: '700',
  marginBottom: '0.25rem'
};

const dateMonthStyle = {
  fontSize: '0.8rem',
  opacity: 0.8
};

const timeSelectionStyle = {
  marginBottom: '1.5rem'
};

const timeSlotsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
  gap: '0.5rem'
};

const timeSlotButtonStyle = (isSelected) => ({
  backgroundColor: isSelected ? '#009688' : '#E0F2F1',
  color: isSelected ? 'white' : '#4F6F6B',
  border: `1px solid ${isSelected ? '#009688' : '#B2DFDB'}`,
  borderRadius: '8px',
  padding: '0.75rem',
  cursor: 'pointer',
  fontSize: '0.9rem',
  textAlign: 'center',
  transition: 'all 0.3s ease',
  ':hover': {
    borderColor: '#009688',
    backgroundColor: isSelected ? '#00796B' : '#B2DFDB'
  }
});

const noSlotsStyle = {
  backgroundColor: '#FEE2E2',
  padding: '1rem',
  borderRadius: '8px',
  textAlign: 'center',
  border: '1px solid #FECACA'
};

const selectedDetailsStyle = {
  backgroundColor: '#E0F2F1',
  padding: '1.25rem',
  borderRadius: '12px',
  marginTop: '1.5rem',
  border: '1px solid #B2DFDB'
};

const detailRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '0.75rem'
};

const detailLabelStyle = {
  color: '#4F6F6B',
  fontSize: '0.9rem'
};

const detailValueStyle = {
  color: '#124441',
  fontWeight: '600',
  fontSize: '0.9rem'
};

const feeAmountStyle = {
  color: '#009688',
  fontSize: '1.1rem',
  fontWeight: '700'
};

const modalButtonsStyle = {
  padding: '1.5rem',
  display: 'flex',
  gap: '1rem',
  borderTop: '1px solid #E0F2F1',
  backgroundColor: '#E0F2F1',
  borderBottomLeftRadius: '20px',
  borderBottomRightRadius: '20px'
};

const cancelButtonStyle = {
  flex: 1,
  backgroundColor: '#B2DFDB',
  color: '#4F6F6B',
  padding: '0.875rem',
  borderRadius: '12px',
  border: 'none',
  fontSize: '1rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  ':hover': {
    backgroundColor: '#80CBC4',
    color: '#124441'
  }
};

const confirmAppointmentButtonStyle = {
  flex: 2,
  backgroundColor: '#009688',
  color: 'white',
  padding: '0.875rem',
  borderRadius: '12px',
  border: 'none',
  fontSize: '1rem',
  fontWeight: '600',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'all 0.3s ease',
  ':hover': {
    backgroundColor: '#00796B',
    transform: 'translateY(-2px)'
  },
  ':disabled': {
    backgroundColor: '#B2DFDB',
    cursor: 'not-allowed',
    transform: 'none'
  }
};

// Payment Modal Styles
const paymentModalStyle = {
  backgroundColor: 'white',
  borderRadius: '20px',
  width: '100%',
  maxWidth: '500px',
  maxHeight: '90vh',
  overflowY: 'auto',
  animation: 'fadeIn 0.3s ease'
};

const paymentModalHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1.5rem',
  borderBottom: '1px solid #E0F2F1',
  backgroundColor: '#E0F2F1',
  borderTopLeftRadius: '20px',
  borderTopRightRadius: '20px'
};

const paymentContentStyle = {
  padding: '1.5rem'
};

const paymentHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '2rem',
  paddingBottom: '1rem',
  borderBottom: '1px solid #E0F2F1'
};

const paymentDoctorInfoStyle = {
  flex: 1
};

const appointmentDetailsStyle = {
  marginTop: '0.5rem',
  fontSize: '0.9rem',
  color: '#4F6F6B'
};

const paymentAmountStyle = {
  textAlign: 'right'
};

const amountLabelStyle = {
  fontSize: '0.9rem',
  color: '#4F6F6B',
  marginBottom: '0.25rem'
};

const amountValueStyle = {
  fontSize: '1.8rem',
  fontWeight: '700',
  color: '#009688'
};

const processingContainerStyle = {
  textAlign: 'center',
  padding: '2rem 0'
};

const loadingSpinnerStyle = {
  width: '50px',
  height: '50px',
  border: '4px solid #f3f3f3',
  borderTop: '4px solid #009688',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  margin: '0 auto'
};

const successContainerStyle = {
  textAlign: 'center',
  padding: '2rem',
  backgroundColor: '#E0F2F1',
  borderRadius: '12px',
  margin: '1rem 0'
};

const successIconStyle = {
  width: '60px',
  height: '60px',
  backgroundColor: '#009688',
  color: 'white',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '2rem',
  margin: '0 auto'
};

const failedContainerStyle = {
  textAlign: 'center',
  padding: '2rem',
  backgroundColor: '#FEE2E2',
  borderRadius: '12px',
  margin: '1rem 0'
};

const failedIconStyle = {
  width: '60px',
  height: '60px',
  backgroundColor: '#DC2626',
  color: 'white',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '2rem',
  margin: '0 auto'
};

const paymentOptionsStyle = {
  marginBottom: '1.5rem'
};

const razorpayButtonStyle = {
  backgroundColor: '#E0F2F1',
  border: '2px solid #B2DFDB',
  borderRadius: '12px',
  padding: '1rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  textAlign: 'left',
  width: '100%',
  ':hover': {
    borderColor: '#009688',
    backgroundColor: '#B2DFDB'
  }
};

const paymentMethodIconStyle = {
  fontSize: '1.5rem',
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const paymentMethodNameStyle = {
  fontSize: '0.95rem',
  fontWeight: '600',
  color: '#124441'
};

const paymentMethodDescStyle = {
  fontSize: '0.8rem',
  color: '#4F6F6B',
  marginTop: '0.25rem'
};

const securityInfoStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
  padding: '1rem',
  backgroundColor: '#E0F2F1',
  borderRadius: '8px',
  marginBottom: '1rem'
};

const secureBadgeStyle = {
  fontSize: '1rem'
};

const paymentButtonsStyle = {
  display: 'flex',
  gap: '1rem'
};

const paymentCancelButtonStyle = {
  flex: 1,
  backgroundColor: '#B2DFDB',
  color: '#4F6F6B',
  padding: '0.875rem',
  borderRadius: '12px',
  border: 'none',
  fontSize: '1rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  ':hover': {
    backgroundColor: '#80CBC4',
    color: '#124441'
  }
};

const paymentConfirmButtonStyle = (isDisabled) => ({
  flex: 1,
  backgroundColor: isDisabled ? '#B2DFDB' : '#009688',
  color: 'white',
  padding: '0.875rem',
  borderRadius: '12px',
  border: 'none',
  fontSize: '1rem',
  fontWeight: '600',
  cursor: isDisabled ? 'not-allowed' : 'pointer',
  transition: 'all 0.3s ease',
  opacity: isDisabled ? 0.7 : 1,
  ':hover': !isDisabled ? {
    backgroundColor: '#00796B',
    transform: 'translateY(-2px)'
  } : {}
});

const paymentDoneButtonStyle = {
  flex: 1,
  backgroundColor: '#009688',
  color: 'white',
  padding: '0.875rem',
  borderRadius: '12px',
  border: 'none',
  fontSize: '1rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  ':hover': {
    backgroundColor: '#00796B',
    transform: 'translateY(-2px)'
  }
};

const paymentRetryButtonStyle = {
  flex: 1,
  backgroundColor: '#DC2626',
  color: 'white',
  padding: '0.875rem',
  borderRadius: '12px',
  border: 'none',
  fontSize: '1rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  ':hover': {
    backgroundColor: '#B91C1C',
    transform: 'translateY(-2px)'
  }
};

export default ConsultationView;