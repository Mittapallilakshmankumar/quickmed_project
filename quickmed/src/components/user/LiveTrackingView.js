import React, { useEffect } from 'react';

const LiveTrackingView = ({
  trackingOrder,
  deliveryPartner,
  setActiveView,
  callDeliveryPartner,
  getDeliveryStatusText,
  getDeliveryProgress
}) => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);

  const BackButton = ({ onClick, text = 'Back' }) => (
    <button 
      style={{
        padding: '0.5rem 1rem',
        backgroundColor: 'transparent',
        color: '#009688',
        border: '1px solid #009688',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.9rem',
        transition: 'all 0.3s ease',
        ':hover': {
          backgroundColor: '#E0F2F1',
          transform: 'translateY(-1px)'
        }
      }}
      onClick={() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
        setTimeout(() => {
          onClick();
        }, 100);
      }}
      type="button"
    >
      ← {text}
    </button>
  );

  const handleCallDeliveryPartner = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    
    setTimeout(() => {
      callDeliveryPartner();
    }, 100);
  };

  return (
    <div style={{
      marginTop: '140px',
      padding: '2rem',
      minHeight: 'calc(100vh - 140px)',
      backgroundColor: '#FFFFFF',
      maxWidth: '1400px',
      margin: '140px auto 0',
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#FFFFFF',
        padding: '1.5rem 2rem',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(18, 68, 65, 0.08)',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        border: '1px solid #E0F2F1',
        transition: 'all 0.3s ease',
        ':hover': {
          boxShadow: '0 4px 12px rgba(18, 68, 65, 0.12)'
        }
      }}>
        <BackButton onClick={() => setActiveView('orders')} text="Back to Orders" />
        <div style={{ flex: 1 }}>
          <h2 style={{
            margin: '0 0 0.25rem 0',
            color: '#124441',
            fontSize: '1.8rem',
            fontWeight: '700',
          }}>Live Order Tracking</h2>
          <p style={{
            margin: 0,
            color: '#4F6F6B',
            fontSize: '1rem',
          }}>Order #{trackingOrder?.id}</p>
        </div>
        <div style={{
          backgroundColor: '#E0F2F1',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          border: '1px solid #4DB6AC'
        }}>
          <span style={{
            color: '#124441',
            fontWeight: '600',
            fontSize: '0.9rem'
          }}>
            🚚 Live Tracking Active
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '2rem',
        height: '600px',
      }}>
        {/* Map Section */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(18, 68, 65, 0.08)',
          overflow: 'hidden',
          height: '100%',
          border: '1px solid #E0F2F1',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            backgroundColor: '#FFFFFF',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            border: '1px solid #E0F2F1',
            zIndex: 10,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <span style={{
              color: '#124441',
              fontWeight: '600',
              fontSize: '0.9rem'
            }}>
              📍 Live Location Tracking
            </span>
          </div>
          <iframe
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248756.11675378976!2d77.4651372271771!3d12.953945987030732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v${Date.now()}!5m2!1sen!2sin`}
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: '12px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Live Order Tracking Map"
          ></iframe>
        </div>

        {/* Information Panel */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(18, 68, 65, 0.08)',
          padding: '1.5rem',
          overflowY: 'auto',
          border: '1px solid #E0F2F1',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}>
          <h3 style={{
            color: '#124441',
            margin: 0,
            fontSize: '1.3rem',
            fontWeight: '600',
          }}>Delivery Information</h3>
          
          {/* Progress Bar */}
          <div style={{
            marginBottom: '1rem',
          }}>
            <div style={{
              height: '8px',
              backgroundColor: '#E0F2F1',
              borderRadius: '4px',
              overflow: 'hidden',
              marginBottom: '0.5rem',
            }}>
              <div 
                style={{
                  height: '100%',
                  backgroundColor: '#009688',
                  transition: 'width 0.5s ease',
                  width: `${getDeliveryProgress(deliveryPartner.status)}%`,
                  borderRadius: '4px',
                }}
              ></div>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.8rem',
              color: '#4F6F6B',
              fontWeight: '500',
            }}>
              <span>Order Placed</span>
              <span>Prepared</span>
              <span>On the Way</span>
              <span>Delivered</span>
            </div>
          </div>

          {/* Status Card */}
          <div style={{
            backgroundColor: '#E0F2F1',
            padding: '1.25rem',
            borderRadius: '10px',
            border: '1px solid #4DB6AC',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem',
            }}>
              <span style={{
                color: '#4F6F6B',
                fontSize: '0.9rem',
                fontWeight: '500',
              }}>Current Status:</span>
              <span style={{
                color: '#009688',
                fontWeight: '600',
                fontSize: '1rem',
                backgroundColor: '#FFFFFF',
                padding: '0.25rem 0.75rem',
                borderRadius: '20px',
                border: '1px solid #009688'
              }}>
                {getDeliveryStatusText(deliveryPartner.status)}
              </span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <span style={{
                color: '#4F6F6B',
                fontSize: '0.9rem',
                fontWeight: '500',
              }}>Estimated Time:</span>
              <span style={{
                color: '#009688',
                fontWeight: '600',
                fontSize: '1rem',
              }}>{deliveryPartner.estimatedTime}</span>
            </div>
          </div>

          {/* Delivery Partner Card */}
          <div style={{
            border: '1px solid #E0F2F1',
            borderRadius: '10px',
            padding: '1.25rem',
            backgroundColor: '#FFFFFF',
            transition: 'all 0.3s ease',
            ':hover': {
              borderColor: '#4DB6AC',
              boxShadow: '0 2px 8px rgba(77, 182, 172, 0.1)'
            }
          }}>
            <h4 style={{
              color: '#124441',
              margin: '0 0 1rem 0',
              fontSize: '1.1rem',
              fontWeight: '600',
            }}>Delivery Partner</h4>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.5rem',
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: '#009688',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                boxShadow: '0 2px 4px rgba(0, 150, 136, 0.2)'
              }}>
                {deliveryPartner.name.charAt(0)}
              </div>
              <div style={{
                flex: 1,
              }}>
                <p style={{
                  margin: '0 0 0.25rem 0',
                  fontWeight: '600',
                  color: '#124441',
                }}>{deliveryPartner.name}</p>
                <p style={{
                  margin: '0 0 0.25rem 0',
                  color: '#4F6F6B',
                  fontSize: '0.9rem',
                }}>
                  {deliveryPartner.vehicle} • {deliveryPartner.vehicleNumber}
                </p>
                <div style={{
                  color: '#f59e0b',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>
                  ⭐ {deliveryPartner.rating}
                  <span style={{
                    color: '#4F6F6B',
                    fontSize: '0.8rem',
                    fontWeight: 'normal'
                  }}>
                    ({deliveryPartner.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>
            <button 
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#009688',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                ':hover': {
                  backgroundColor: '#00796B',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 2px 8px rgba(0, 150, 136, 0.3)'
                }
              }}
              onClick={handleCallDeliveryPartner}
              type="button"
            >
              📞 Call Delivery Partner
            </button>
          </div>

          {/* Order Summary */}
          <div style={{
            border: '1px solid #E0F2F1',
            borderRadius: '10px',
            padding: '1.25rem',
            backgroundColor: '#FFFFFF',
          }}>
            <h4 style={{
              color: '#124441',
              margin: '0 0 1rem 0',
              fontSize: '1.1rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              Order Summary
              <span style={{
                fontSize: '0.9rem',
                color: '#4F6F6B',
                fontWeight: 'normal'
              }}>
                #{trackingOrder.id}
              </span>
            </h4>
            <div style={{
              maxHeight: '200px',
              overflowY: 'auto',
            }}>
              {trackingOrder.items.map((item, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem 0',
                  borderBottom: '1px solid #E0F2F1',
                  transition: 'all 0.3s ease',
                  ':hover': {
                    backgroundColor: '#F8F9FA',
                    paddingLeft: '0.5rem',
                    paddingRight: '0.5rem',
                    borderRadius: '4px'
                  }
                }}>
                  <div>
                    <span style={{ color: '#124441', fontWeight: '500' }}>{item.name}</span>
                    {item.description && (
                      <p style={{
                        margin: '0.25rem 0 0 0',
                        color: '#4F6F6B',
                        fontSize: '0.8rem'
                      }}>
                        {item.description}
                      </p>
                    )}
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <span style={{
                      color: '#4F6F6B',
                      fontSize: '0.9rem'
                    }}>
                      Qty: {item.quantity}
                    </span>
                    <span style={{
                      color: '#124441',
                      fontWeight: '600',
                      fontSize: '0.9rem'
                    }}>
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: '1rem',
              paddingTop: '1rem',
              borderTop: '2px solid #E0F2F1'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem'
              }}>
                <span style={{ color: '#4F6F6B' }}>Subtotal:</span>
                <span style={{ color: '#124441', fontWeight: '500' }}>
                  ₹{trackingOrder.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
                </span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem'
              }}>
                <span style={{ color: '#4F6F6B' }}>Delivery Charge:</span>
                <span style={{ color: '#009688', fontWeight: '500' }}>Free</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '1rem',
                paddingTop: '0.5rem',
                borderTop: '1px solid #E0F2F1'
              }}>
                <span style={{ color: '#124441', fontWeight: '600' }}>Total:</span>
                <span style={{ color: '#009688', fontWeight: '700', fontSize: '1.1rem' }}>
                  ₹{trackingOrder.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Note */}
      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        backgroundColor: '#E0F2F1',
        borderRadius: '8px',
        border: '1px solid #4DB6AC',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #4DB6AC'
        }}>
          <span style={{ color: '#009688', fontSize: '1.2rem' }}>⚠️</span>
        </div>
        <div>
          <p style={{
            margin: 0,
            color: '#124441',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}>
            <strong>Safety Note:</strong> Our delivery partners follow all safety protocols. 
            Please maintain social distance and wear a mask during delivery.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LiveTrackingView;