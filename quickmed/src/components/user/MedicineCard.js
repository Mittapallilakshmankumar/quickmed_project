import React from 'react';

const MedicineCard = ({ medicine, cart, addToCart, updateQuantity }) => {
  const cartItem = cart.find(item => item.id === medicine.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  // Simplified handlers without scroll
  const handleAddToCart = (med) => {
    addToCart(med);
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    updateQuantity(id, newQuantity);
  };

  return (
    <div style={{
      border: '2px solid #E0F2F1',
      borderRadius: '12px',
      padding: '1.5rem',
      display: 'flex',
      marginTop: '80px',
      flexDirection: 'column',
      transition: 'all 0.3s ease',
      backgroundColor: 'white',
    }}>
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}>
        <h4 style={{
          margin: '0 0 0.5rem 0',
          color: '#124441',
          fontSize: '1.1rem',
          fontWeight: '600',
        }}>{medicine.name}</h4>
        <p style={{
          margin: '0 0 0.5rem 0',
          color: '#4F6F6B',
          fontSize: '0.9rem',
        }}>{medicine.vendor}</p>
        <div style={{
          marginBottom: '1rem',
        }}>
          <span style={{
            padding: '0.25rem 0.75rem',
            backgroundColor: '#E0F2F1',
            color: '#124441',
            borderRadius: '12px',
            fontSize: '0.8rem',
            fontWeight: '500',
          }}>{medicine.category}</span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 'auto',
        }}>
          <p style={{
            color: '#009688',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            margin: 0,
          }}>₹{medicine.price}</p>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            {quantity > 0 ? (
              <>
                <button 
                  style={{
                    width: '32px',
                    height: '32px',
                    border: '1px solid #009688',
                    backgroundColor: 'transparent',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                  }}
                  onClick={() => handleUpdateQuantity(medicine.id, quantity - 1)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#E0F2F1';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                  type="button"
                >
                  −
                </button>
                <span style={{
                  padding: '0 0.5rem',
                  fontWeight: '600',
                  minWidth: '30px',
                  textAlign: 'center',
                  transition: 'all 0.2s ease',
                }}>{quantity}</span>
                <button 
                  style={{
                    width: '32px',
                    height: '32px',
                    border: '1px solid #009688',
                    backgroundColor: 'transparent',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                  }}
                  onClick={() => handleUpdateQuantity(medicine.id, quantity + 1)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#E0F2F1';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                  type="button"
                >
                  +
                </button>
              </>
            ) : (
              <button 
                style={{
                  padding: '0.75rem 1rem',
                  backgroundColor: '#009688',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                }}
                onClick={() => handleAddToCart(medicine)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#00796B';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#009688';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                type="button"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;