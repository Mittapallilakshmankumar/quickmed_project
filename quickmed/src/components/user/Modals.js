import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

const Modals = ({
  showCheckoutConfirm,
  showPrescriptionModal,
  showPharmacyStore,
  showAppointmentDetails,
  showDoctorChat,
  showLogoutConfirm,
  showProfilePhotoModal,
  selectedPharmacy,
  selectedAppointment,
  activeDoctorChat,
  doctorChats,
  prescriptionFile,
  prescriptionPreview,
  profilePhotoFile,
  profilePhotoPreview,
  profile,
  cart,
  getTotalPrice,
  paymentLoading,
  getFilteredPharmacyMedicines,
  pharmacySearchQueries,
  handlePharmacySearch,
  addToCartFromPharmacy,
  updateQuantity,
  setShowPharmacyStore,
  setShowAppointmentDetails,
  setShowDoctorChat,
  setShowCheckoutConfirm,
  setShowPrescriptionModal,
  setShowLogoutConfirm,
  setShowProfilePhotoModal,
  handlePrescriptionUpload,
  handlePrescriptionSubmit,
  handleConfirmCheckout,
  handleCancelCheckout,
  confirmLogout,
  cancelLogout,
  handleProfilePhotoSubmit,
  removeProfilePhoto,
  sendDoctorMessage,
  setPrescriptionFile,
  setPrescriptionPreview,
  setProfilePhotoFile,
  setProfilePhotoPreview,
  handleProfilePhotoUpload,
  setActiveView
}) => {
  // Refs for all modals
  const checkoutModalRef = useRef(null);
  const prescriptionModalRef = useRef(null);
  const pharmacyStoreModalRef = useRef(null);
  const appointmentModalRef = useRef(null);
  const doctorChatModalRef = useRef(null);
  const logoutModalRef = useRef(null);
  const profilePhotoModalRef = useRef(null);

  // Modal visibility array for scroll effect
  const modalStates = useMemo(() => [
    showCheckoutConfirm,
    showPrescriptionModal,
    showPharmacyStore,
    showAppointmentDetails,
    showDoctorChat,
    showLogoutConfirm,
    showProfilePhotoModal
  ], [
    showCheckoutConfirm,
    showPrescriptionModal,
    showPharmacyStore,
    showAppointmentDetails,
    showDoctorChat,
    showLogoutConfirm,
    showProfilePhotoModal
  ]);

  // Scroll to top when any modal opens
  useEffect(() => {
    if (modalStates.some(state => state)) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [modalStates]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      // REMOVED: Unused checkClickOutside helper function

      // Checkout Confirmation Modal
      if (showCheckoutConfirm && checkoutModalRef.current && !checkoutModalRef.current.contains(event.target)) {
        setShowCheckoutConfirm(false);
      }

      // Prescription Upload Modal
      if (showPrescriptionModal && prescriptionModalRef.current && !prescriptionModalRef.current.contains(event.target)) {
        setShowPrescriptionModal(false);
        setPrescriptionFile(null);
        setPrescriptionPreview(null);
      }

      // Pharmacy Store Modal
      if (showPharmacyStore && pharmacyStoreModalRef.current && !pharmacyStoreModalRef.current.contains(event.target)) {
        setShowPharmacyStore(false);
      }

      // Appointment Details Modal
      if (showAppointmentDetails && appointmentModalRef.current && !appointmentModalRef.current.contains(event.target)) {
        setShowAppointmentDetails(false);
      }

      // Doctor Chat Modal
      if (showDoctorChat && doctorChatModalRef.current && !doctorChatModalRef.current.contains(event.target)) {
        setShowDoctorChat(false);
      }

      // Logout Confirmation Modal
      if (showLogoutConfirm && logoutModalRef.current && !logoutModalRef.current.contains(event.target)) {
        setShowLogoutConfirm(false);
      }

      // Profile Photo Modal
      if (showProfilePhotoModal && profilePhotoModalRef.current && !profilePhotoModalRef.current.contains(event.target)) {
        setShowProfilePhotoModal(false);
        setProfilePhotoFile(null);
        setProfilePhotoPreview(profile.profilePhoto);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [
    showCheckoutConfirm,
    showPrescriptionModal,
    showPharmacyStore,
    showAppointmentDetails,
    showDoctorChat,
    showLogoutConfirm,
    showProfilePhotoModal,
    profile.profilePhoto,
    setShowCheckoutConfirm,
    setShowPrescriptionModal,
    setShowPharmacyStore,
    setShowAppointmentDetails,
    setShowDoctorChat,
    setShowLogoutConfirm,
    setShowProfilePhotoModal,
    setPrescriptionFile,
    setPrescriptionPreview,
    setProfilePhotoFile,
    setProfilePhotoPreview
  ]);

  // Common styles
  const styles = useMemo(() => ({
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2000,
    },
    modalContainer: (width = '500px') => ({
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '15px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
      maxWidth: width,
      width: '90%',
    }),
    modalTitle: {
      color: '#124441',
      marginBottom: '1rem',
      fontSize: '1.5rem',
      textAlign: 'center',
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '1.8rem',
      cursor: 'pointer',
      color: 'white',
      padding: 0,
      width: '35px',
      height: '35px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
    },
    cancelButton: {
      padding: '0.75rem 1.5rem',
      backgroundColor: 'transparent',
      color: '#124441',
      border: '2px solid #124441',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '0.9rem',
    },
    confirmButton: {
      padding: '0.75rem 1.5rem',
      backgroundColor: '#009688',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '0.9rem',
    },
    fileUploadArea: {
      border: '2px dashed #E0F2F1',
      borderRadius: '10px',
      padding: '2rem',
      textAlign: 'center',
      marginBottom: '1.5rem',
      minHeight: '200px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    requirementsBox: {
      backgroundColor: '#E0F2F1',
      padding: '1rem',
      borderRadius: '8px',
      marginBottom: '1.5rem',
      border: '1px solid #E0F2F1',
    }
  }), []);

  // Modal close handlers
  const closeHandlers = useMemo(() => ({
    checkout: () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      handleCancelCheckout();
    },
    prescription: () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      setShowPrescriptionModal(false);
      setPrescriptionFile(null);
      setPrescriptionPreview(null);
    },
    pharmacy: () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      setShowPharmacyStore(false);
    },
    appointment: () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      setShowAppointmentDetails(false);
    },
    doctorChat: () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      setShowDoctorChat(false);
    },
    profilePhoto: () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      setShowProfilePhotoModal(false);
      setProfilePhotoFile(null);
      setProfilePhotoPreview(profile.profilePhoto);
    }
  }), [
    handleCancelCheckout,
    setShowPrescriptionModal,
    setPrescriptionFile,
    setPrescriptionPreview,
    setShowPharmacyStore,
    setShowAppointmentDetails,
    setShowDoctorChat,
    setShowProfilePhotoModal,
    setProfilePhotoFile,
    setProfilePhotoPreview,
    profile.profilePhoto
  ]);

  const handleViewCart = useCallback(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setTimeout(() => {
      setShowPharmacyStore(false);
      setActiveView('cart');
    }, 100);
  }, [setShowPharmacyStore, setActiveView]);

  // File Preview Component
  const FilePreview = ({ file, preview, type = 'prescription' }) => {
    if (preview) {
      return (
        <div style={{ position: 'relative', width: '100%', maxHeight: '300px', overflow: 'hidden', borderRadius: '8px' }}>
          <img 
            src={preview} 
            alt={`${type} preview`} 
            style={{ width: '100%', height: 'auto', maxHeight: '300px', objectFit: 'contain' }}
          />
          {type === 'prescription' && file && (
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'rgba(0,0,0,0.7)',
              color: 'white',
              padding: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}>
              <span style={{ fontSize: '2rem' }}>📄</span>
              <div>
                <p style={{ margin: '0 0 0.25rem 0', fontWeight: '600' }}>{file.name}</p>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
          )}
        </div>
      );
    }
    
    if (file) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
          <span style={{ fontSize: '2rem' }}>📄</span>
          <div>
            <p style={{ margin: '0 0 0.25rem 0', fontWeight: '600', color: '#333' }}>{file.name}</p>
            <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        </div>
      );
    }
    
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem', color: '#124441' }}>
          {type === 'prescription' ? '📎' : '👤'}
        </div>
        <p style={{ margin: '0 0 0.5rem 0', color: '#4F6F6B', fontSize: '1.1rem' }}>
          No {type === 'prescription' ? 'file' : 'photo'} selected
        </p>
        <p style={{ margin: 0, color: '#999', fontSize: '0.9rem' }}>
          {type === 'prescription' ? 'Supported formats: JPG, PNG, PDF (Max 5MB)' : 'Supported formats: JPG, PNG (Max 5MB)'}
        </p>
      </div>
    );
  };

  // Upload Modal Component (Reusable for prescription and profile photo)
  const UploadModal = ({ 
    type, 
    file, 
    preview, 
    onUpload, 
    onSubmit, 
    onClose, 
    onRemove,
    requirements 
  }) => {
    return (
      <div style={styles.modalOverlay}>
        <div style={{...styles.modalContainer('600px'), maxHeight: '80vh', overflowY: 'auto'}} 
             ref={type === 'prescription' ? prescriptionModalRef : profilePhotoModalRef}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                       marginBottom: '1.5rem', borderBottom: '2px solid #E0F2F1', paddingBottom: '1rem' }}>
            <h3 style={styles.modalTitle}>
              {type === 'prescription' ? 'Upload Prescription' : 'Update Profile Photo'}
            </h3>
            <button style={styles.closeButton} onClick={onClose}>×</button>
          </div>
          
          <div style={styles.fileUploadArea}>
            <FilePreview file={file} preview={preview} type={type} />
          </div>

          <div style={styles.requirementsBox}>
            <h4 style={{ color: '#124441', margin: '0 0 0.5rem 0', fontSize: '1rem' }}>
              {type === 'prescription' ? 'Prescription' : 'Photo'} Requirements:
            </h4>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#4F6F6B', fontSize: '0.9rem', lineHeight: '1.5' }}>
              {requirements.map((req, index) => <li key={index}>{req}</li>)}
            </ul>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: 'transparent',
              color: '#124441',
              border: '2px solid #124441',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}>
              <span style={{ fontSize: '1rem' }}>{type === 'prescription' ? '📎' : '📷'}</span>
              {file ? 'Change' : `Choose ${type === 'prescription' ? 'File' : 'Photo'}`}
              <input
                type="file"
                accept={type === 'prescription' ? '.jpg,.jpeg,.png,.pdf' : 'image/*'}
                onChange={onUpload}
                style={{ display: 'none' }}
              />
            </label>
            
            {type === 'profilePhoto' && profile.profilePhoto && (
              <button 
                style={{...styles.confirmButton, backgroundColor: '#FF6B6B'}}
                onClick={onRemove}
              >
                Remove Current Photo
              </button>
            )}
            
            <button style={styles.confirmButton} onClick={onSubmit} disabled={!file}>
              {type === 'prescription' ? 'Upload Prescription' : 'Update Profile Photo'}
            </button>
            <button style={styles.cancelButton} onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Doctor Chat Modal Component
  const DoctorChatModal = () => {
    const [message, setMessage] = useState('');
    const chatEndRef = useRef(null);

    const activeDoctorId = activeDoctorChat?.id;
    
    // Get current chat based on active doctor - wrapped in useMemo to fix the dependency issue
    const currentChat = useMemo(() => {
      return activeDoctorId ? doctorChats[activeDoctorId] || [] : [];
    }, [activeDoctorId]);

    useEffect(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [currentChat]); // Now currentChat is stable across renders

    const handleSendMessage = () => {
      if (!message.trim() || !activeDoctorChat) return;
      sendDoctorMessage(activeDoctorChat.id, message);
      setMessage('');
    };

    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    };

    return (
      <div style={styles.modalOverlay}>
        <div style={{
          backgroundColor: 'white',
          padding: 0,
          borderRadius: '15px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          width: '450px',
          height: '650px',
          display: 'flex',
          flexDirection: 'column',
        }} ref={doctorChatModalRef}>
          <div style={{
            padding: '1rem 1.5rem',
            backgroundColor: '#009688',
            color: 'white',
            borderTopLeftRadius: '15px',
            borderTopRightRadius: '15px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
              <div style={{
                fontSize: '2rem',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
              }}>
                {activeDoctorChat?.image}
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600' }}>{activeDoctorChat?.name}</h3>
                <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9 }}>{activeDoctorChat?.specialty}</p>
              </div>
            </div>
            <button style={styles.closeButton} onClick={closeHandlers.doctorChat}>×</button>
          </div>

          <div style={{
            flex: 1,
            padding: '1rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            backgroundColor: '#fafafa',
          }}>
            {currentChat.map(chatMessage => (
              <div key={chatMessage.id} style={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '85%',
                alignSelf: chatMessage.sender === 'user' ? 'flex-end' : 'flex-start',
                alignItems: chatMessage.sender === 'user' ? 'flex-end' : 'flex-start',
              }}>
                <div style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '15px',
                  fontSize: '0.9rem',
                  lineHeight: '1.4',
                  wordWrap: 'break-word',
                  maxWidth: '100%',
                  backgroundColor: chatMessage.sender === 'user' ? '#009688' : '#e0e0e0',
                  color: chatMessage.sender === 'user' ? 'white' : '#333',
                  borderBottomRightRadius: chatMessage.sender === 'user' ? '5px' : '15px',
                  borderBottomLeftRadius: chatMessage.sender === 'user' ? '15px' : '5px',
                }}>
                  {chatMessage.text}
                </div>
                <span style={{
                  fontSize: '0.7rem',
                  color: '#666',
                  marginTop: '0.25rem',
                  padding: '0 0.5rem',
                }}>
                  {chatMessage.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div style={{
            padding: '1rem',
            borderTop: '1px solid #e0e0e0',
            display: 'flex',
            gap: '0.5rem',
            backgroundColor: 'white',
            borderBottomLeftRadius: '15px',
            borderBottomRightRadius: '15px',
          }}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message to the doctor..."
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                border: '1px solid #ddd',
                borderRadius: '25px',
                fontSize: '0.9rem',
                outline: 'none',
              }}
              autoFocus
            />
            <button 
              style={styles.confirmButton}
              onClick={handleSendMessage}
              disabled={!message.trim()}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Checkout Confirmation Modal
  const CheckoutConfirmation = () => {
    return (
      <div style={styles.modalOverlay}>
        <div style={styles.modalContainer()} ref={checkoutModalRef}>
          <h3 style={styles.modalTitle}>Confirm Checkout</h3>
          <p style={{ color: '#4F6F6B', marginBottom: '1.5rem', textAlign: 'center', lineHeight: '1.5' }}>
            You are about to proceed with your order. Total amount: <strong>₹{getTotalPrice()}</strong>
          </p>
          
          <div style={{ marginBottom: '1.5rem', maxHeight: '200px', overflowY: 'auto' }}>
            {cart.map(item => (
              <div key={item.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.5rem 0',
                borderBottom: '1px solid #f0f0f0',
              }}>
                <span>{item.name}</span>
                <span>₹{item.price} × {item.quantity}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button style={styles.cancelButton} onClick={closeHandlers.checkout} disabled={paymentLoading}>
              Cancel
            </button>
            <button style={styles.confirmButton} onClick={handleConfirmCheckout} disabled={paymentLoading}>
              {paymentLoading ? 'Processing...' : 'Proceed to Payment'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Logout Confirmation Modal
  const LogoutConfirmation = () => {
    return (
      <div style={styles.modalOverlay}>
        <div style={{...styles.modalContainer('400px'), textAlign: 'center'}} ref={logoutModalRef}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>👋</div>
          <h3 style={styles.modalTitle}>Confirm Logout</h3>
          <p style={{ color: '#4F6F6B', marginBottom: '2rem', lineHeight: '1.5' }}>
            Are you sure you want to logout from your QuickMed account?
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button style={styles.cancelButton} onClick={cancelLogout}>Cancel</button>
            <button style={styles.confirmButton} onClick={confirmLogout}>Yes, Logout</button>
          </div>
        </div>
      </div>
    );
  };

  // Pharmacy Store Modal
  const PharmacyStoreModal = () => {
    const filteredMedicines = getFilteredPharmacyMedicines(selectedPharmacy);
    const searchQuery = pharmacySearchQueries[selectedPharmacy?.id] || '';

    const PharmacyMedicineCard = ({ medicine }) => {
      const cartItem = cart.find(item => item.id === medicine.id);
      const quantity = cartItem ? cartItem.quantity : 0;

      const quantityButtonStyle = {
        width: '32px',
        height: '32px',
        border: '1px solid #124441',
        backgroundColor: 'transparent',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      };

      return (
        <div style={{
          border: '1px solid #E0F2F1',
          borderRadius: '8px',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <div style={{ marginBottom: '1rem' }}>
            <h5 style={{ margin: '0 0 0.5rem 0', color: '#124441', fontSize: '1rem' }}>{medicine.name}</h5>
            <p style={{ margin: '0 0 0.5rem 0', color: '#4F6F6B', fontSize: '0.8rem' }}>{medicine.category}</p>
            <p style={{ margin: 0, color: '#009688', fontWeight: 'bold', fontSize: '1.1rem' }}>₹{medicine.price}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {quantity > 0 ? (
              <>
                <button 
                  style={quantityButtonStyle}
                  onClick={() => updateQuantity(medicine.id, quantity - 1)}
                >
                  −
                </button>
                <span style={{ padding: '0 0.5rem', fontWeight: '600', minWidth: '30px', textAlign: 'center' }}>
                  {quantity}
                </span>
                <button 
                  style={quantityButtonStyle}
                  onClick={() => updateQuantity(medicine.id, quantity + 1)}
                >
                  +
                </button>
              </>
            ) : (
              <button 
                style={styles.confirmButton}
                onClick={() => addToCartFromPharmacy(medicine)}
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      );
    };

    return (
      <div style={styles.modalOverlay}>
        <div style={{...styles.modalContainer('800px'), maxHeight: '80vh', overflowY: 'auto'}} ref={pharmacyStoreModalRef}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
            borderBottom: '2px solid #E0F2F1',
            paddingBottom: '1rem',
          }}>
            <h3 style={styles.modalTitle}>{selectedPharmacy?.name}</h3>
            <button style={styles.closeButton} onClick={closeHandlers.pharmacy}>×</button>
          </div>
          
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <p style={{ color: '#4F6F6B', fontSize: '0.9rem', margin: '0.5rem 0' }}>📍 {selectedPharmacy?.distance} away</p>
              <p style={{ color: '#4CAF50', fontSize: '0.9rem', margin: '0.5rem 0' }}>🚚 Delivery: {selectedPharmacy?.deliveryTime}</p>
              <p style={{ color: '#FFD700', fontSize: '0.9rem', margin: '0.5rem 0' }}>⭐ {selectedPharmacy?.rating} Rating</p>
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '1rem',
            borderRadius: '10px',
            marginBottom: '1.5rem',
            border: '1px solid #E0F2F1',
          }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="Search for medicines in this pharmacy..."
                value={searchQuery}
                onChange={(e) => handlePharmacySearch(selectedPharmacy.id, e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.5rem 0.75rem',
                  border: '2px solid #E0F2F1',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  height: '38px'
                }}
                autoFocus
              />
              <button style={{...styles.confirmButton, height: '38px'}}>Search</button>
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ color: '#124441', marginBottom: '1rem', fontSize: '1.2rem' }}>Available Medicines</h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '1rem',
            }}>
              {filteredMedicines.length === 0 ? (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem', color: '#4F6F6B' }}>
                  <p>No medicines found matching your search.</p>
                </div>
              ) : (
                filteredMedicines.map(medicine => (
                  <PharmacyMedicineCard key={medicine.id} medicine={medicine} />
                ))
              )}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
            <button style={styles.confirmButton} onClick={handleViewCart}>
              View Cart ({cart.length})
            </button>
            <button style={styles.cancelButton} onClick={closeHandlers.pharmacy}>
              Back to Pharmacies
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Appointment Details Modal
  const AppointmentDetailsModal = () => {
    const getStatusColor = (status) => {
      const colors = {
        'Scheduled': '#4CAF50',
        'Completed': '#2196F3',
        'Cancelled': '#FF6B6B',
        'Rescheduled': '#FF9800',
        'Pending': '#FFC107'
      };
      return colors[status] || '#9E9E9E';
    };

    const DetailItem = ({ label, value, isStatus = false }) => {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <span style={{ color: '#4F6F6B', fontSize: '0.9rem', fontWeight: '500' }}>{label}:</span>
          {isStatus ? (
            <span style={{
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              color: 'white',
              fontSize: '0.8rem',
              fontWeight: '600',
              backgroundColor: getStatusColor(value),
              display: 'inline-block',
              width: 'fit-content'
            }}>
              {value}
            </span>
          ) : (
            <span style={{ color: '#333', fontSize: '1rem' }}>{value}</span>
          )}
        </div>
      );
    };

    const basicDetails = [
      { label: 'Appointment ID', value: selectedAppointment?.id },
      { label: 'Doctor', value: selectedAppointment?.doctorName },
      { label: 'Specialty', value: selectedAppointment?.specialty },
      { label: 'Date & Time', value: `${selectedAppointment?.date} at ${selectedAppointment?.time}` },
      { label: 'Type', value: selectedAppointment?.type },
      { label: 'Fee', value: `₹${selectedAppointment?.fee}` },
      { label: 'Status', value: selectedAppointment?.status, isStatus: true }
    ];

    const patientDetails = [
      { label: 'Patient Name', value: selectedAppointment?.details?.patientName },
      { label: 'Symptoms', value: selectedAppointment?.details?.symptoms },
      { label: 'Notes', value: selectedAppointment?.details?.notes },
      { label: 'Prescription', value: selectedAppointment?.details?.prescription }
    ];

    return (
      <div style={styles.modalOverlay}>
        <div style={{...styles.modalContainer('700px'), maxHeight: '80vh', overflowY: 'auto'}} ref={appointmentModalRef}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
            borderBottom: '2px solid #E0F2F1',
            paddingBottom: '1rem',
          }}>
            <h3 style={styles.modalTitle}>Appointment Details</h3>
            <button style={styles.closeButton} onClick={closeHandlers.appointment}>×</button>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ color: '#124441', marginBottom: '1rem', fontSize: '1.1rem' }}>Basic Information</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              {basicDetails.map((detail, index) => (
                <DetailItem key={index} {...detail} />
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ color: '#124441', marginBottom: '1rem', fontSize: '1.1rem' }}>Patient Details</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              {patientDetails.map((detail, index) => (
                <DetailItem key={index} {...detail} />
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button style={styles.confirmButton} onClick={closeHandlers.appointment}>Close</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {showCheckoutConfirm && <CheckoutConfirmation />}
      {showPrescriptionModal && (
        <UploadModal
          type="prescription"
          file={prescriptionFile}
          preview={prescriptionPreview}
          onUpload={handlePrescriptionUpload}
          onSubmit={handlePrescriptionSubmit}
          onClose={closeHandlers.prescription}
          requirements={[
            'Clear image of your doctor\'s prescription',
            'All text should be readable',
            'Doctor\'s signature and stamp should be visible',
            'Supported formats: JPG, PNG, PDF',
            'Maximum file size: 5MB'
          ]}
        />
      )}
      {showPharmacyStore && <PharmacyStoreModal />}
      {showAppointmentDetails && <AppointmentDetailsModal />}
      {showDoctorChat && <DoctorChatModal />}
      {showLogoutConfirm && <LogoutConfirmation />}
      {showProfilePhotoModal && (
        <UploadModal
          type="profilePhoto"
          file={profilePhotoFile}
          preview={profilePhotoPreview}
          onUpload={handleProfilePhotoUpload}
          onSubmit={handleProfilePhotoSubmit}
          onClose={closeHandlers.profilePhoto}
          onRemove={removeProfilePhoto}
          requirements={[
            'Clear, recent photo of yourself',
            'Face should be clearly visible',
            'Supported formats: JPG, PNG',
            'Maximum file size: 5MB'
          ]}
        />
      )}
    </>
  );
};

export default Modals;