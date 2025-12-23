import React, { useState, useEffect } from 'react';

const TimeSlotsContent = ({ state, actions }) => {
  const { timeslots } = state;
  const { 
    setTimeslots, 
    addTimeslot, 
    updateTimeslot, 
    deleteTimeslot,
    toggleTimeslotAvailability 
  } = actions;

  // Simple responsive check
  const isMobile = window.innerWidth <= 768;

  // Simplified state
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('09:00');
  const [slotDuration, setSlotDuration] = useState(30);
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' or 'list'
  const [quickActions, setQuickActions] = useState({
    markDay: false,
    selectedDay: ''
  });

  // Initialize with default slots for next 7 days
  useEffect(() => {
    if (timeslots.length === 0) {
      const defaultSlots = generateDefaultSlots();
      setTimeslots(defaultSlots);
    }
  }, []);

  // Generate default slots for next 7 days
  const generateDefaultSlots = () => {
    const slots = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateString = date.toISOString().split('T')[0];
      
      // Create working hours: 9 AM to 5 PM
      for (let hour = 9; hour < 17; hour++) {
        const startTime = `${hour.toString().padStart(2, '0')}:00`;
        const endTime = `${(hour + 1).toString().padStart(2, '0')}:00`;
        
        slots.push({
          id: `${dateString}-${startTime}`,
          date: dateString,
          startTime,
          endTime,
          duration: 60,
          isAvailable: true,
          isBooked: false
        });
      }
    }
    
    return slots;
  };

  // Get unique dates from timeslots
  const getAvailableDates = () => {
    const dates = [...new Set(timeslots.map(slot => slot.date))];
    return dates.sort((a, b) => new Date(a) - new Date(b));
  };

  // Get slots for a specific date
  const getSlotsForDate = (date) => {
    return timeslots
      .filter(slot => slot.date === date)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  // Add a new time slot
  const handleAddSlot = () => {
    if (!selectedDate) {
      alert('Please select a date');
      return;
    }

    // Calculate end time based on duration
    const startTime = selectedTime;
    const [hours, minutes] = startTime.split(':').map(Number);
    const endTime = new Date(0, 0, 0, hours, minutes + slotDuration);
    const endTimeString = `${endTime.getHours().toString().padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')}`;

    const newSlot = {
      id: `${selectedDate}-${startTime}`,
      date: selectedDate,
      startTime: startTime,
      endTime: endTimeString,
      duration: slotDuration,
      isAvailable: true,
      isBooked: false
    };

    addTimeslot(newSlot);
    
    // Reset form
    setSelectedTime('09:00');
    setSlotDuration(30);
  };

  // Quick action: Mark entire day as available/unavailable
  const handleMarkDay = (date, makeAvailable) => {
    const updatedSlots = timeslots.map(slot => {
      if (slot.date === date) {
        return { ...slot, isAvailable: makeAvailable };
      }
      return slot;
    });
    setTimeslots(updatedSlots);
  };

  // Quick action: Clear all slots for a day
  const handleClearDay = (date) => {
    const filteredSlots = timeslots.filter(slot => slot.date !== date);
    setTimeslots(filteredSlots);
  };

  // Format date for display
  const formatDateDisplay = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const dateObj = new Date(date);
    dateObj.setHours(0, 0, 0, 0);
    
    if (dateObj.getTime() === today.getTime()) {
      return 'Today';
    }
    
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    if (dateObj.getTime() === tomorrow.getTime()) {
      return 'Tomorrow';
    }
    
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Time Slot Component
  const TimeSlotItem = ({ slot }) => {
    const isDisabled = slot.isBooked;
    
    return (
      <div style={{
        ...styles.timeSlotItem,
        backgroundColor: isDisabled ? '#E0F2F1' : 
                        slot.isAvailable ? '#f0fdf4' : '#fef2f2',
        borderColor: isDisabled ? '#E0F2F1' : 
                     slot.isAvailable ? '#bbf7d0' : '#fecaca'
      }}>
        <div style={styles.slotInfo}>
          <div style={styles.slotTime}>
            <strong>{slot.startTime} - {slot.endTime}</strong>
            <span style={styles.duration}>({slot.duration} min)</span>
          </div>
          <div style={styles.slotStatus}>
            <span style={{
              ...styles.statusBadge,
              backgroundColor: slot.isBooked ? '#dc2626' : 
                              slot.isAvailable ? '#16a34a' : '#d97706'
            }}>
              {slot.isBooked ? 'Booked' : slot.isAvailable ? 'Available' : 'Busy'}
            </span>
          </div>
        </div>
        
        <div style={styles.slotActions}>
          {!isDisabled && (
            <>
              <button
                style={slot.isAvailable ? styles.busyButton : styles.availableButton}
                onClick={() => toggleTimeslotAvailability(slot.id)}
              >
                {slot.isAvailable ? 'Mark Busy' : 'Mark Free'}
              </button>
              <button
                style={styles.deleteButton}
                onClick={() => deleteTimeslot(slot.id)}
              >
                Remove
              </button>
            </>
          )}
          {isDisabled && (
            <span style={styles.bookedText}>Cannot modify booked slot</span>
          )}
        </div>
      </div>
    );
  };

  // Day Card Component
  const DayCard = ({ date }) => {
    const slots = getSlotsForDate(date);
    const availableSlots = slots.filter(s => s.isAvailable && !s.isBooked).length;
    const bookedSlots = slots.filter(s => s.isBooked).length;
    
    return (
      <div style={styles.dayCard}>
        <div style={styles.dayHeader}>
          <div style={styles.dayInfo}>
            <h3 style={styles.dayTitle}>{formatDateDisplay(date)}</h3>
            <p style={styles.dayDate}>{date}</p>
          </div>
          
          <div style={styles.dayStats}>
            <div style={styles.statItem}>
              <span style={styles.statNumber}>{availableSlots}</span>
              <span style={styles.statLabel}>Free</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statNumber}>{bookedSlots}</span>
              <span style={styles.statLabel}>Booked</span>
            </div>
          </div>
        </div>
        
        <div style={styles.quickActions}>
          <button
            style={styles.smallButton}
            onClick={() => handleMarkDay(date, true)}
          >
            Mark All Free
          </button>
          <button
            style={styles.smallButton}
            onClick={() => handleMarkDay(date, false)}
          >
            Mark All Busy
          </button>
          <button
            style={styles.clearButton}
            onClick={() => handleClearDay(date)}
          >
            Clear Day
          </button>
        </div>
        
        <div style={styles.slotsList}>
          {slots.map(slot => (
            <TimeSlotItem key={slot.id} slot={slot} />
          ))}
        </div>
      </div>
    );
  };

  // Main render
  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Schedule Management</h1>
          <p style={styles.subtitle}>Manage your availability and appointments</p>
        </div>
        
        <div style={styles.viewToggle}>
          <button
            style={{
              ...styles.viewButton,
              ...(viewMode === 'calendar' ? styles.activeViewButton : {})
            }}
            onClick={() => setViewMode('calendar')}
          >
            📅 Calendar View
          </button>
          <button
            style={{
              ...styles.viewButton,
              ...(viewMode === 'list' ? styles.activeViewButton : {})
            }}
            onClick={() => setViewMode('list')}
          >
            📋 List View
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div style={styles.statsBar}>
        <div style={styles.statCard}>
          <span style={styles.statValue}>
            {timeslots.filter(s => s.isAvailable && !s.isBooked).length}
          </span>
          <span style={styles.statText}>Available Slots</span>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statValue}>
            {timeslots.filter(s => s.isBooked).length}
          </span>
          <span style={styles.statText}>Booked Appointments</span>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statValue}>
            {getAvailableDates().length}
          </span>
          <span style={styles.statText}>Days Scheduled</span>
        </div>
      </div>

      {/* Add Slot Form */}
      <div style={styles.addSlotCard}>
        <h3 style={styles.sectionTitle}>Add Time Slot</h3>
        <div style={{
          ...styles.addForm,
          flexDirection: isMobile ? 'column' : 'row'
        }}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={styles.input}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Start Time</label>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              style={styles.input}
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Duration</label>
            <select
              value={slotDuration}
              onChange={(e) => setSlotDuration(parseInt(e.target.value))}
              style={styles.select}
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={45}>45 minutes</option>
              <option value={60}>60 minutes</option>
            </select>
          </div>
          
          <button
            style={styles.addButton}
            onClick={handleAddSlot}
            disabled={!selectedDate}
          >
            + Add Slot
          </button>
        </div>
      </div>

      {/* Calendar View */}
      {viewMode === 'calendar' ? (
        <div style={styles.calendarView}>
          <h3 style={styles.sectionTitle}>Your Schedule</h3>
          <div style={styles.daysGrid}>
            {getAvailableDates().map(date => (
              <DayCard key={date} date={date} />
            ))}
          </div>
        </div>
      ) : (
        /* List View */
        <div style={styles.listView}>
          <h3 style={styles.sectionTitle}>All Time Slots</h3>
          <div style={styles.slotsContainer}>
            {getAvailableDates().map(date => (
              <div key={date} style={styles.dateSection}>
                <h4 style={styles.dateHeader}>{formatDateDisplay(date)} - {date}</h4>
                <div style={styles.dateSlots}>
                  {getSlotsForDate(date).map(slot => (
                    <TimeSlotItem key={slot.id} slot={slot} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Tips */}
      <div style={styles.tipsCard}>
        <h4 style={styles.tipsTitle}>💡 Quick Tips</h4>
        <ul style={styles.tipsList}>
          <li>Use "Mark All Free/Busy" to quickly set your availability for an entire day</li>
          <li>Click on individual slots to toggle between Available and Busy</li>
          <li>Booked slots cannot be modified or deleted</li>
          <li>Use Calendar View for day-by-day management, List View to see all slots</li>
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '30px',
    flexWrap: 'wrap',
    gap: '20px'
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#124441',
    margin: '0 0 8px 0'
  },
  subtitle: {
    fontSize: '16px',
    color: '#4F6F6B',
    margin: 0
  },
  viewToggle: {
    display: 'flex',
    gap: '10px',
    backgroundColor: '#E0F2F1',
    padding: '4px',
    borderRadius: '8px'
  },
  viewButton: {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: 'transparent',
    color: '#4F6F6B',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '14px'
  },
  activeViewButton: {
    backgroundColor: '#009688',
    color: '#FFFFFF'
  },
  statsBar: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px',
    marginBottom: '30px'
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    padding: '20px',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  statValue: {
    display: 'block',
    fontSize: '32px',
    fontWeight: '700',
    color: '#009688',
    marginBottom: '5px'
  },
  statText: {
    fontSize: '14px',
    color: '#4F6F6B'
  },
  addSlotCard: {
    backgroundColor: '#FFFFFF',
    padding: '24px',
    borderRadius: '12px',
    marginBottom: '30px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#124441',
    margin: '0 0 20px 0'
  },
  addForm: {
    display: 'flex',
    gap: '15px',
    alignItems: 'flex-end',
    flexWrap: 'wrap'
  },
  formGroup: {
    flex: 1,
    minWidth: '150px'
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#124441',
    marginBottom: '8px'
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #E0F2F1',
    borderRadius: '6px',
    fontSize: '14px'
  },
  select: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #E0F2F1',
    borderRadius: '6px',
    fontSize: '14px',
    backgroundColor: '#FFFFFF'
  },
  addButton: {
    backgroundColor: '#009688',
    color: '#FFFFFF',
    border: 'none',
    padding: '10px 24px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    height: '42px',
    minWidth: '120px'
  },
  calendarView: {
    marginBottom: '30px'
  },
  daysGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '20px'
  },
  dayCard: {
    backgroundColor: '#FFFFFF',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  dayHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '15px',
    flexWrap: 'wrap',
    gap: '10px'
  },
  dayInfo: {
    flex: 1
  },
  dayTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#124441',
    margin: '0 0 4px 0'
  },
  dayDate: {
    fontSize: '14px',
    color: '#4F6F6B',
    margin: 0
  },
  dayStats: {
    display: 'flex',
    gap: '15px'
  },
  statItem: {
    textAlign: 'center'
  },
  statNumber: {
    display: 'block',
    fontSize: '20px',
    fontWeight: '600',
    color: '#009688'
  },
  statLabel: {
    fontSize: '12px',
    color: '#4F6F6B'
  },
  quickActions: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    flexWrap: 'wrap'
  },
  smallButton: {
    backgroundColor: '#E0F2F1',
    color: '#124441',
    border: '1px solid #E0F2F1',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    cursor: 'pointer'
  },
  clearButton: {
    backgroundColor: '#fef2f2',
    color: '#dc2626',
    border: '1px solid #fecaca',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    cursor: 'pointer'
  },
  slotsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  timeSlotItem: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid',
    transition: 'all 0.2s ease'
  },
  slotInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
    flexWrap: 'wrap',
    gap: '10px'
  },
  slotTime: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#124441'
  },
  duration: {
    fontSize: '12px',
    color: '#4F6F6B',
    marginLeft: '8px'
  },
  slotStatus: {
    fontSize: '12px'
  },
  statusBadge: {
    color: 'white',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: '500'
  },
  slotActions: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  busyButton: {
    backgroundColor: '#fef3c7',
    color: '#92400e',
    border: '1px solid #fbbf24',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    cursor: 'pointer'
  },
  availableButton: {
    backgroundColor: '#d1fae5',
    color: '#065f46',
    border: '1px solid #10b981',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    cursor: 'pointer'
  },
  deleteButton: {
    backgroundColor: 'transparent',
    color: '#dc2626',
    border: '1px solid #fca5a5',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    cursor: 'pointer'
  },
  bookedText: {
    fontSize: '12px',
    color: '#4F6F6B',
    fontStyle: 'italic'
  },
  listView: {
    marginBottom: '30px'
  },
  slotsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  dateSection: {
    backgroundColor: '#FFFFFF',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  dateHeader: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#124441',
    margin: '0 0 15px 0',
    paddingBottom: '10px',
    borderBottom: '2px solid #E0F2F1'
  },
  dateSlots: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '10px'
  },
  tipsCard: {
    backgroundColor: '#E0F2F1',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #E0F2F1'
  },
  tipsTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#009688',
    margin: '0 0 10px 0'
  },
  tipsList: {
    margin: 0,
    paddingLeft: '20px',
    fontSize: '14px',
    color: '#124441',
    lineHeight: '1.6'
  }
};

export default TimeSlotsContent;