import React from 'react';

const DoctorCard = ({ doctor, handleBookAppointment, startDoctorChat }) => {
  const handleBookClick = () => {
    // Scroll to top first
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    
    // Then show the time slot selection
    setTimeout(() => {
      const selectedTimeSlot = doctor.availableSlots && doctor.availableSlots.length > 0 
        ? prompt('Select time slot:\n' + doctor.availableSlots.join('\n'), doctor.availableSlots[0])
        : prompt('Enter preferred time slot (e.g., "Tomorrow 10:00 AM"):');
      if (selectedTimeSlot) {
        handleBookAppointment(doctor, selectedTimeSlot);
      }
    }, 100);
  };

  const handleMessageClick = () => {
    // Scroll to top first
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    
    // Then start chat
    setTimeout(() => {
      startDoctorChat(doctor);
    }, 100);
  };

  return (
    <div style={{
      border: '2px solid #E0F2F1',
      borderRadius: '12px',
      padding: '1.5rem',
      transition: 'all 0.3s ease',
      backgroundColor: 'white'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '1rem'
      }}>
        <div style={{
          fontSize: '3rem',
          width: '60px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#E0F2F1',
          borderRadius: '50%',
          color: '#009688'
        }}>
          {doctor.image || ''}
        </div>
        <div style={{
          flex: 1
        }}>
          <h4 style={{
            margin: '0 0 0.5rem 0',
            color: '#009688',
            fontSize: '1.2rem',
            fontWeight: '600'
          }}>{doctor.name}</h4>
          <p style={{
            margin: '0 0 0.5rem 0',
            color: '#4F6F6B',
            fontSize: '0.9rem'
          }}>{doctor.specialty}</p>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{
              color: '#FFD700',
              fontSize: '1.1rem'
            }}>
              {'★'.repeat(Math.floor(doctor.rating))}
              {'☆'.repeat(5 - Math.floor(doctor.rating))}
            </span>
            <span style={{
              color: '#4F6F6B',
              fontSize: '0.9rem'
            }}>({doctor.rating})</span>
          </div>
        </div>
      </div>

      <div style={{
        marginBottom: '1rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.5rem 0',
          borderBottom: '1px solid #E0F2F1'
        }}>
          <span style={{
            color: '#4F6F6B',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}>Experience:</span>
          <span style={{
            color: '#124441',
            fontSize: '0.9rem',
            fontWeight: '600'
          }}>{doctor.experience}</span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.5rem 0',
          borderBottom: '1px solid #E0F2F1'
        }}>
          <span style={{
            color: '#4F6F6B',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}>Languages:</span>
          <span style={{
            color: '#124441',
            fontSize: '0.9rem',
            fontWeight: '600'
          }}>{doctor.languages?.join(', ') || 'English'}</span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.5rem 0',
          borderBottom: '1px solid #E0F2F1'
        }}>
          <span style={{
            color: '#4F6F6B',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}>Consultation Fee:</span>
          <span style={{
            color: '#009688',
            fontWeight: 'bold',
            fontSize: '1rem'
          }}>₹{doctor.consultationFee}</span>
        </div>
        {doctor.availableSlots && (
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.5rem 0'
          }}>
            <span style={{
              color: '#4F6F6B',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}>Available Slots:</span>
            <span style={{
              color: '#124441',
              fontSize: '0.9rem',
              fontWeight: '600'
            }}>{doctor.availableSlots?.length || 0} slots</span>
          </div>
        )}
      </div>

      <div style={{
        display: 'flex',
        gap: '1rem'
      }}>
        <button 
          style={{
            flex: 2,
            padding: '0.75rem 1.5rem',
            backgroundColor: '#009688',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.9rem',
            transition: 'all 0.3s ease'
          }}
          onClick={handleBookClick}
          type="button"
        >
          Book Appointment
        </button>
        <button 
          style={{
            flex: 1,
            padding: '0.75rem 1rem',
            backgroundColor: 'transparent',
            color: '#009688',
            border: '2px solid #009688',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.9rem',
            transition: 'all 0.3s ease'
          }}
          onClick={handleMessageClick}
          type="button"
        >
          Send Message
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;