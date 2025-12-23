import React from 'react';

const LogoutConfirmation = ({ onConfirm, onCancel }) => {
  const styles = {
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(18, 68, 65, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    logoutModal: {
      backgroundColor: '#FFFFFF',
      borderRadius: '12px',
      padding: '0',
      width: '400px',
      maxWidth: '90vw',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      border: '1px solid #E0F2F1'
    },
    logoutModalHeader: {
      padding: '24px 24px 0 24px',
      borderBottom: '1px solid #E0F2F1'
    },
    logoutModalTitle: {
      margin: '0',
      fontSize: '18px',
      fontWeight: '600',
      color: '#124441',
      textAlign: 'center'
    },
    logoutModalContent: {
      padding: '24px'
    },
    logoutModalText: {
      margin: '0',
      fontSize: '14px',
      color: '#4F6F6B',
      textAlign: 'center',
      lineHeight: '1.5'
    },
    logoutModalActions: {
      padding: '16px 24px 24px 24px',
      display: 'flex',
      gap: '12px',
      justifyContent: 'flex-end',
      borderTop: '1px solid #E0F2F1'
    },
    logoutCancelButton: {
      padding: '8px 16px',
      backgroundColor: '#FFFFFF',
      color: '#4F6F6B',
      border: '1px solid #4DB6AC',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s',
      minWidth: '80px',
      '&:hover': {
        backgroundColor: '#E0F2F1',
        borderColor: '#009688'
      }
    },
    logoutConfirmButton: {
      padding: '8px 16px',
      backgroundColor: '#009688',
      color: '#FFFFFF',
      border: 'none',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s',
      minWidth: '100px',
      '&:hover': {
        backgroundColor: '#00796B'
      }
    }
  };

  // Inline hover styles since React inline styles don't support pseudo-classes
  const hoverStyles = {
    cancelButtonHover: {
      backgroundColor: '#E0F2F1',
      borderColor: '#009688'
    },
    confirmButtonHover: {
      backgroundColor: '#00796B'
    }
  };

  const [hoverState, setHoverState] = React.useState({
    cancel: false,
    confirm: false
  });

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.logoutModal}>
        <div style={styles.logoutModalHeader}>
          <h3 style={styles.logoutModalTitle}>Confirm Logout</h3>
        </div>
        <div style={styles.logoutModalContent}>
          <p style={styles.logoutModalText}>
            Are you sure you want to logout from your QuickMed account?
          </p>
        </div>
        <div style={styles.logoutModalActions}>
          <button
            style={{
              ...styles.logoutCancelButton,
              ...(hoverState.cancel ? hoverStyles.cancelButtonHover : {})
            }}
            onClick={onCancel}
            onMouseEnter={() => setHoverState(s => ({ ...s, cancel: true }))}
            onMouseLeave={() => setHoverState(s => ({ ...s, cancel: false }))}
          >
            Cancel
          </button>
          <button
            style={{
              ...styles.logoutConfirmButton,
              ...(hoverState.confirm ? hoverStyles.confirmButtonHover : {})
            }}
            onClick={onConfirm}
            onMouseEnter={() => setHoverState(s => ({ ...s, confirm: true }))}
            onMouseLeave={() => setHoverState(s => ({ ...s, confirm: false }))}
          >
            Yes, Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmation;