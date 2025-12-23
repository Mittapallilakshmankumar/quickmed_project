import React, { useEffect } from 'react';

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getToastStyle = () => {
    const baseStyle = {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '14px 20px',
      borderRadius: '8px',
      color: 'white',
      fontWeight: '500',
      zIndex: 1002,
      minWidth: '280px',
      maxWidth: '400px',
      boxShadow: '0 4px 12px rgba(0,150,136,0.25)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      animation: 'slideIn 0.3s ease-out',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.1)'
    };

    switch (type) {
      case 'success':
        return { 
          ...baseStyle, 
          backgroundColor: '#009688',
          boxShadow: '0 4px 12px rgba(0,150,136,0.3)'
        };
      case 'error':
        return { 
          ...baseStyle, 
          backgroundColor: '#f44336',
          boxShadow: '0 4px 12px rgba(244,67,54,0.3)'
        };
      case 'warning':
        return { 
          ...baseStyle, 
          backgroundColor: '#FF9800',
          boxShadow: '0 4px 12px rgba(255,152,0,0.3)'
        };
      case 'info':
        return { 
          ...baseStyle, 
          backgroundColor: '#2196F3',
          boxShadow: '0 4px 12px rgba(33,150,243,0.3)'
        };
      default:
        return { 
          ...baseStyle, 
          backgroundColor: '#4DB6AC',
          boxShadow: '0 4px 12px rgba(77,182,172,0.3)'
        };
    }
  };

  const getToastIcon = () => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '💬';
    }
  };

  const slideInAnimation = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
    
    @keyframes progressBar {
      from {
        width: 100%;
      }
      to {
        width: 0%;
      }
    }
  `;

  return (
    <>
      <style>{slideInAnimation}</style>
      <div 
        style={getToastStyle()}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '0.95';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '1';
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
          <span style={{ fontSize: '18px' }}>{getToastIcon()}</span>
          <span style={{ fontSize: '14px', lineHeight: '1.4' }}>{message}</span>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '18px',
            cursor: 'pointer',
            marginLeft: '10px',
            padding: '4px 8px',
            borderRadius: '4px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(255,255,255,0.2)';
            e.target.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.transform = 'scale(1)';
          }}
        >
          ✕
        </button>
        
        {/* Progress bar */}
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          right: '0',
          height: '3px',
          backgroundColor: 'rgba(255,255,255,0.3)',
          borderRadius: '0 0 8px 8px'
        }}>
          <div style={{
            height: '100%',
            backgroundColor: 'rgba(255,255,255,0.8)',
            animation: 'progressBar 3s linear forwards',
            borderRadius: '0 0 8px 8px'
          }} />
        </div>
      </div>
    </>
  );
};

export default Toast;