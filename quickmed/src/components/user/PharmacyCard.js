import React from 'react';

const PharmacyCard = ({ 
  pharmacy, 
  onViewStore,
  viewPharmacyStore,
  handlePharmacySearch, 
  pharmacySearchQueries,
  startDoctorChat 
}) => {
  // Safe access to pharmacy properties with fallbacks
  const {
    id = Math.random(),
    name = 'Unknown Pharmacy',
    distance = 'N/A',
    deliveryTime = 'N/A',
    rating = 0,
    medicines = []
  } = pharmacy || {};

  // Enhanced handleViewStore that scrolls to top when navigating to store view
  const handleViewStore = () => {
    if (onViewStore) {
      onViewStore(pharmacy);
    } else if (viewPharmacyStore) {
      viewPharmacyStore(pharmacy);
    }
  };

  return (
    <div key={id} style={{
      border: '2px solid #E0F2F1',
      borderRadius: '12px',
      padding: 'clamp(1rem, 2vw, 1.5rem)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'clamp(0.75rem, 1.5vw, 1rem)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      backgroundColor: '#FFFFFF',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
      e.currentTarget.style.borderColor = '#4DB6AC';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
      e.currentTarget.style.borderColor = '#E0F2F1';
    }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'clamp(0.75rem, 1.5vw, 1rem)'
      }}>
        <div style={{
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          width: 'clamp(45px, 6vw, 50px)',
          height: 'clamp(45px, 6vw, 50px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#E0F2F1',
          borderRadius: '8px',
          color: '#009688'
        }}>🏪</div>
        <div style={{
          flex: 1
        }}>
          <h3 style={{
            margin: '0 0 0.25rem 0',
            color: '#124441',
            fontSize: 'clamp(1rem, 1.5vw, 1.1rem)',
            fontWeight: '600',
            lineHeight: '1.3'
          }}>{name}</h3>
          <div style={{
            color: '#FFB300',
            fontWeight: 'bold',
            fontSize: 'clamp(0.85rem, 1.5vw, 0.9rem)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem'
          }}>
            <span>⭐</span>
            <span>{rating || 'N/A'}</span>
          </div>
        </div>
      </div>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(0.4rem, 1vw, 0.5rem)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          <span style={{
            color: '#4F6F6B',
            fontSize: 'clamp(0.85rem, 1.5vw, 0.9rem)',
            fontWeight: '500'
          }}>Distance:</span>
          <span style={{
            color: '#124441',
            fontSize: 'clamp(0.85rem, 1.5vw, 0.9rem)',
            fontWeight: '600'
          }}>{distance}</span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          <span style={{
            color: '#4F6F6B',
            fontSize: 'clamp(0.85rem, 1.5vw, 0.9rem)',
            fontWeight: '500'
          }}>Delivery Time:</span>
          <span style={{
            color: '#124441',
            fontSize: 'clamp(0.85rem, 1.5vw, 0.9rem)',
            fontWeight: '600'
          }}>{deliveryTime}</span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          <span style={{
            color: '#4F6F6B',
            fontSize: 'clamp(0.85rem, 1.5vw, 0.9rem)',
            fontWeight: '500'
          }}>Medicines Available:</span>
          <span style={{
            color: '#009688',
            fontWeight: '700',
            fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
          }}>{medicines.length}</span>
        </div>
      </div>
      
      {/* Search Bar for Individual Pharmacy */}
      {handlePharmacySearch && (
        <div style={{
          margin: '0.5rem 0',
        }}>
          <input
            type="text"
            placeholder={`Search medicines in ${name}...`}
            value={pharmacySearchQueries?.[id] || ''}
            onChange={(e) => handlePharmacySearch(id, e.target.value)}
            style={{
              width: '100%',
              padding: 'clamp(0.6rem, 1.5vw, 0.75rem)',
              border: '1px solid #E0F2F1',
              borderRadius: '8px',
              fontSize: 'clamp(0.85rem, 1.5vw, 0.9rem)',
              color: '#124441',
              transition: 'all 0.3s ease',
              backgroundColor: '#FFFFFF'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#4DB6AC';
              e.target.style.boxShadow = '0 0 0 2px rgba(77, 182, 172, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#E0F2F1';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
      )}
      
      <button 
        style={{
          padding: 'clamp(0.6rem, 1.5vw, 0.75rem) clamp(1rem, 2vw, 1.5rem)',
          backgroundColor: 'transparent',
          color: '#009688',
          border: '2px solid #009688',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: '600',
          fontSize: 'clamp(0.9rem, 1.5vw, 0.95rem)',
          transition: 'all 0.3s ease',
          marginTop: 'clamp(0.75rem, 1.5vw, 1rem)',
          width: '100%',
          textTransform: 'none',
          letterSpacing: '0.5px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0, 150, 136, 0.1)'
        }}
        onClick={handleViewStore}
        type="button"
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#009688';
          e.target.style.color = '#FFFFFF';
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 4px 15px rgba(0, 150, 136, 0.3)';
          e.target.style.borderColor = '#009688';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'transparent';
          e.target.style.color = '#009688';
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 2px 8px rgba(0, 150, 136, 0.1)';
          e.target.style.borderColor = '#009688';
        }}
      >
        View Store
      </button>
    </div>
  );
};

export default PharmacyCard;