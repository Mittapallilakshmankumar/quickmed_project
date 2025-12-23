import React, { useState, useEffect, useRef } from 'react';

const NotificationsPage = ({ 
  showNotifications, 
  notifications, 
  onClose, 
  onViewAll,
  markAsRead,
  markAllAsRead,
  deleteNotification
}) => {
  const [localNotifications, setLocalNotifications] = useState([]);
  const notificationsRef = useRef(null);

  // Initialize local notifications when props change
  useEffect(() => {
    if (notifications && Array.isArray(notifications)) {
      setLocalNotifications(notifications);
    }
  }, [notifications]);

  // Handle click outside to close - STABLE VERSION
  useEffect(() => {
    if (!showNotifications) return;

    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        onClose();
      }
    };

    // Add event listener with slight delay to avoid immediate trigger
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications, onClose]);

  if (!showNotifications) {
    return null;
  }

  if (!localNotifications || !Array.isArray(localNotifications)) {
    return null;
  }

  const handleViewAll = () => {
    if (onViewAll) {
      onViewAll();
    }
  };

  const handleMarkAsRead = (notificationId) => {
    if (markAsRead) {
      markAsRead(notificationId);
    } else {
      setLocalNotifications(prev =>
        prev.map(notif =>
          notif.id === notificationId ? { ...notif, read: true } : notif
        )
      );
    }
  };

  const handleMarkAllAsRead = () => {
    if (markAllAsRead) {
      markAllAsRead();
    } else {
      setLocalNotifications(prev =>
        prev.map(notif => ({ ...notif, read: true }))
      );
    }
  };

  const handleDeleteNotification = (notificationId) => {
    if (deleteNotification) {
      deleteNotification(notificationId);
    } else {
      setLocalNotifications(prev =>
        prev.filter(notif => notif.id !== notificationId)
      );
    }
  };

  const getNotificationIcon = (type) => {
    const icons = {
      order: '📦',
      system: '⚙️',
      customer: '👤',
      payment: '💳',
      security: '🔒',
      promotion: '🎁',
      appointment: '📅',
      lab: '🧪',
      health: '🏥',
      default: '🔔'
    };
    return icons[type] || icons.default;
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return 'Just now';
    
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return notificationTime.toLocaleDateString();
  };

  const unreadCount = localNotifications.filter(notif => !notif.read).length;

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
      backdropFilter: 'blur(2px)'
    },
    notificationsPage: {
      position: 'fixed',
      top: 'clamp(15px, 3vw, 20px)',
      right: 'clamp(15px, 3vw, 20px)',
      width: 'clamp(300px, 90vw, 420px)',
      backgroundColor: '#FFFFFF',
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
      zIndex: 1001,
      maxHeight: '80vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid #E0F2F1'
    },
    notificationsHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 'clamp(15px, 2vw, 20px)',
      borderBottom: '1px solid #E0F2F1',
      backgroundColor: '#E0F2F1'
    },
    headerActions: {
      display: 'flex',
      alignItems: 'center',
      gap: 'clamp(8px, 1vw, 10px)',
      flexWrap: 'wrap'
    },
    unreadBadge: {
      backgroundColor: '#FF5252',
      color: '#FFFFFF',
      borderRadius: '10px',
      padding: '2px 8px',
      fontSize: 'clamp(11px, 1.5vw, 12px)',
      fontWeight: '600',
      boxShadow: '0 2px 5px rgba(255, 82, 82, 0.3)'
    },
    closeButton: {
      backgroundColor: 'transparent',
      border: 'none',
      fontSize: 'clamp(18px, 2vw, 20px)',
      cursor: 'pointer',
      color: '#4F6F6B',
      padding: '4px',
      borderRadius: '4px',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '30px',
      height: '30px'
    },
    markAllReadButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#009688',
      cursor: 'pointer',
      fontSize: 'clamp(11px, 1.5vw, 12px)',
      fontWeight: '600',
      padding: '6px 12px',
      borderRadius: '4px',
      transition: 'all 0.2s ease'
    },
    notificationsList: {
      flex: 1,
      overflowY: 'auto',
      maxHeight: 'clamp(300px, 50vh, 400px)'
    },
    notificationItem: {
      display: 'flex',
      padding: 'clamp(12px, 2vw, 16px) clamp(15px, 2vw, 20px)',
      borderBottom: '1px solid #E0F2F1',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    unreadNotification: {
      backgroundColor: '#E8F5F3'
    },
    notificationIcon: {
      fontSize: 'clamp(18px, 2vw, 20px)',
      marginRight: 'clamp(10px, 1.5vw, 12px)',
      marginTop: '2px',
      flexShrink: 0,
      width: '24px'
    },
    notificationContent: {
      flex: 1,
      minWidth: 0,
      overflow: 'hidden'
    },
    notificationTitle: {
      fontSize: 'clamp(13px, 1.5vw, 14px)',
      fontWeight: '600',
      color: '#124441',
      margin: '0 0 4px 0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: '8px'
    },
    notificationMessage: {
      fontSize: 'clamp(12px, 1.5vw, 13px)',
      color: '#4F6F6B',
      margin: '0 0 6px 0',
      lineHeight: '1.4',
      wordWrap: 'break-word',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: '100%'
    },
    notificationTime: {
      fontSize: 'clamp(10px, 1.5vw, 11px)',
      color: '#7B9692',
      fontWeight: '500'
    },
    deleteButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#FF5252',
      cursor: 'pointer',
      fontSize: 'clamp(14px, 2vw, 16px)',
      padding: '2px 6px',
      borderRadius: '3px',
      marginLeft: '8px',
      transition: 'all 0.2s ease',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '24px',
      height: '24px'
    },
    emptyState: {
      padding: 'clamp(30px, 4vw, 40px) 20px',
      textAlign: 'center',
      color: '#4F6F6B',
      fontSize: 'clamp(14px, 2vw, 16px)'
    },
    notificationsFooter: {
      padding: 'clamp(12px, 2vw, 16px) clamp(15px, 2vw, 20px)',
      borderTop: '1px solid #E0F2F1',
      backgroundColor: '#E0F2F1'
    },
    viewAllButton: {
      width: '100%',
      padding: 'clamp(10px, 1.5vw, 12px)',
      backgroundColor: '#009688',
      color: '#FFFFFF',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: 'clamp(13px, 1.5vw, 14px)',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 8px rgba(0, 150, 136, 0.2)'
    }
  };

  return (
    <>
      <div style={styles.overlay} />
      
      <div ref={notificationsRef} style={styles.notificationsPage}>
        <div style={styles.notificationsHeader}>
          <div>
            <h3 style={{ 
              margin: '0 0 4px 0', 
              color: '#124441',
              fontSize: 'clamp(16px, 2vw, 18px)',
              fontWeight: '700'
            }}>Notifications</h3>
            {unreadCount > 0 && (
              <span style={styles.unreadBadge}>
                {unreadCount} unread
              </span>
            )}
          </div>
          <div style={styles.headerActions}>
            {unreadCount > 0 && (
              <button
                style={styles.markAllReadButton}
                onClick={handleMarkAllAsRead}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#4DB6AC';
                  e.target.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#009688';
                }}
              >
                Mark all read
              </button>
            )}
            <button
              style={styles.closeButton}
              onClick={onClose}
              aria-label="Close notifications"
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#4DB6AC';
                e.target.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#4F6F6B';
              }}
            >
              ✕
            </button>
          </div>
        </div>
        
        <div style={styles.notificationsList}>
          {localNotifications.length > 0 ? (
            <>
              {localNotifications.slice(0, 5).map(notification => (
                <div 
                  key={notification.id} 
                  style={{
                    ...styles.notificationItem,
                    ...(!notification.read ? styles.unreadNotification : {})
                  }}
                  onClick={() => handleMarkAsRead(notification.id)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = !notification.read ? '#F0F9F7' : '#F8FCFB';
                    e.currentTarget.style.boxShadow = 'inset 0 0 0 1px #4DB6AC';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = !notification.read ? '#E8F5F3' : 'transparent';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={styles.notificationIcon}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div style={styles.notificationContent}>
                    <div style={styles.notificationTitle}>
                      <span style={{ 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {notification.title || 'Notification'}
                      </span>
                      <button
                        style={styles.deleteButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteNotification(notification.id);
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#FF5252';
                          e.target.style.color = '#FFFFFF';
                          e.target.style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.color = '#FF5252';
                          e.target.style.transform = 'scale(1)';
                        }}
                        aria-label="Delete notification"
                      >
                        ×
                      </button>
                    </div>
                    <p style={styles.notificationMessage}>
                      {notification.message || 'No message'}
                    </p>
                    <span style={styles.notificationTime}>
                      {formatTime(notification.timestamp || notification.time)}
                    </span>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div style={styles.emptyState}>
              <div style={{ 
                fontSize: 'clamp(24px, 4vw, 32px)',
                marginBottom: '12px',
                color: '#4DB6AC',
                opacity: '0.7'
              }}>
                🔔
              </div>
              No notifications available
            </div>
          )}
        </div>
        
        <div style={styles.notificationsFooter}>
          <button
            style={styles.viewAllButton}
            onClick={handleViewAll}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#4DB6AC';
              e.target.style.boxShadow = '0 4px 12px rgba(0, 150, 136, 0.3)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#009688';
              e.target.style.boxShadow = '0 2px 8px rgba(0, 150, 136, 0.2)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            View All Notifications
          </button>
        </div>
      </div>
    </>
  );
};

export default NotificationsPage;