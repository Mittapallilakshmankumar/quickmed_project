import React, { useState, useEffect, useRef } from 'react';

const NotificationPanel = ({ 
  showNotifications, 
  notifications = [],
  onClose, 
  onViewAll,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAllNotifications,
  loadMoreNotifications,
  isFullPage = false
}) => {
  const [localNotifications, setLocalNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [deletedIds, setDeletedIds] = useState(new Set());
  const [deletedAll, setDeletedAll] = useState(false);
  const [hoverStates, setHoverStates] = useState({});
  const notificationsRef = useRef(null);

  useEffect(() => {
    if (notifications && Array.isArray(notifications)) {
      // Filter out notifications that have been deleted
      const filteredNotifications = notifications.filter(
        notif => !deletedIds.has(notif.id) && !deletedAll
      );
      setLocalNotifications(filteredNotifications);
    }
  }, [notifications, deletedIds, deletedAll]);

  useEffect(() => {
    if (!showNotifications || isFullPage) return;

    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        onClose();
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications, onClose, isFullPage]);

  const handleLoadMore = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      if (loadMoreNotifications) {
        const nextPage = currentPage + 1;
        const newNotifications = await loadMoreNotifications(nextPage);
        
        if (newNotifications && newNotifications.length > 0) {
          // Filter out any notifications that were previously deleted
          const filteredNewNotifications = newNotifications.filter(
            notif => !deletedIds.has(notif.id)
          );
          setLocalNotifications(prev => [...prev, ...filteredNewNotifications]);
          setCurrentPage(nextPage);
        } else {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error('Error loading more notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = (notificationId) => {
    // Add to deleted set immediately for instant UI feedback
    setDeletedIds(prev => new Set(prev).add(notificationId));
    
    if (deleteNotification) {
      deleteNotification(notificationId);
    } else {
      // If no callback provided, just remove from local state
      setLocalNotifications(prev =>
        prev.filter(notif => notif.id !== notificationId)
      );
    }
  };

  const handleMarkAllAsRead = () => {
    if (markAllAsRead) {
      markAllAsRead();
    } else {
      // Mark all as read in local state
      setLocalNotifications(prev =>
        prev.map(notif => ({ ...notif, read: true }))
      );
    }
  };

  const handleDeleteNotification = (notificationId) => {
    // Add to deleted set for persistent tracking
    setDeletedIds(prev => new Set(prev).add(notificationId));
    
    if (deleteNotification) {
      deleteNotification(notificationId);
    } else {
      // Immediate removal from UI
      setLocalNotifications(prev =>
        prev.filter(notif => notif.id !== notificationId)
      );
    }
  };

  const handleDeleteAll = () => {
    // Show confirmation dialog before deleting all
    if (window.confirm('Are you sure you want to delete all notifications? This action cannot be undone.')) {
      setDeletedAll(true);
      
      if (deleteAllNotifications) {
        deleteAllNotifications();
      } else {
        // Clear all notifications from local state
        setLocalNotifications([]);
      }
    }
  };

  const handleUndoDelete = (notificationId) => {
    // Remove from deleted set
    setDeletedIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(notificationId);
      return newSet;
    });
    
    // Restore the notification
    const originalNotification = notifications.find(n => n.id === notificationId);
    if (originalNotification) {
      setLocalNotifications(prev => [originalNotification, ...prev]);
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
      appointment: '👨‍⚕️',
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
      backgroundColor: 'transparent',
      zIndex: 1000,
    },
    popupContainer: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      width: '420px',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(0,150,136,0.15)',
      zIndex: 1001,
      maxHeight: '80vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid #4DB6AC'
    },
    fullPageOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(18, 68, 65, 0.7)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: '20px'
    },
    fullPageContainer: {
      backgroundColor: 'white',
      borderRadius: '12px',
      width: '90%',
      maxWidth: '800px',
      maxHeight: '90vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 20px 60px rgba(0,150,136,0.2)',
      border: '1px solid #4DB6AC'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: isFullPage ? '24px' : '20px',
      borderBottom: '1px solid #4DB6AC',
      backgroundColor: '#E0F2F1'
    },
    headerActions: {
      display: 'flex',
      alignItems: 'center',
      gap: isFullPage ? '16px' : '10px'
    },
    unreadBadge: {
      backgroundColor: '#009688',
      color: 'white',
      borderRadius: '10px',
      padding: isFullPage ? '4px 12px' : '2px 8px',
      fontSize: isFullPage ? '14px' : '12px',
      fontWeight: '600'
    },
    closeButton: {
      backgroundColor: 'transparent',
      border: 'none',
      fontSize: '20px',
      cursor: 'pointer',
      color: '#4F6F6B',
      padding: isFullPage ? '8px' : '4px',
      transition: 'color 0.2s ease'
    },
    backButton: {
      backgroundColor: 'transparent',
      border: 'none',
      fontSize: '20px',
      cursor: 'pointer',
      color: '#4F6F6B',
      padding: '8px',
      transition: 'color 0.2s ease'
    },
    actionButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#009688',
      cursor: 'pointer',
      fontSize: isFullPage ? '14px' : '12px',
      fontWeight: '500',
      padding: isFullPage ? '8px 16px' : '4px 8px',
      borderRadius: isFullPage ? '6px' : '4px',
      transition: 'all 0.2s ease',
      border: '1px solid #4DB6AC'
    },
    deleteAllButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#f44336',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      padding: '8px 16px',
      borderRadius: '6px',
      transition: 'all 0.2s ease',
      border: '1px solid #f44336'
    },
    notificationsList: {
      flex: 1,
      overflowY: 'auto',
      maxHeight: isFullPage ? 'none' : '400px',
      padding: '0'
    },
    notificationItem: {
      display: 'flex',
      padding: isFullPage ? '20px 24px' : '16px 20px',
      borderBottom: '1px solid #E0F2F1',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      position: 'relative'
    },
    unreadNotification: {
      backgroundColor: '#E0F2F1'
    },
    notificationIcon: {
      fontSize: isFullPage ? '24px' : '20px',
      marginRight: isFullPage ? '16px' : '12px',
      marginTop: '2px',
      flexShrink: 0
    },
    notificationContent: {
      flex: 1,
      minWidth: 0
    },
    notificationTitle: {
      fontSize: isFullPage ? '16px' : '14px',
      fontWeight: '600',
      color: '#124441',
      margin: '0 0 4px 0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    },
    notificationMessage: {
      fontSize: isFullPage ? '14px' : '13px',
      color: '#4F6F6B',
      margin: '0 0 4px 0',
      lineHeight: isFullPage ? '1.5' : '1.4',
      wordWrap: 'break-word'
    },
    notificationTime: {
      fontSize: isFullPage ? '12px' : '11px',
      color: '#4DB6AC',
      fontWeight: '500'
    },
    deleteButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#4F6F6B',
      cursor: 'pointer',
      fontSize: isFullPage ? '14px' : '12px',
      padding: isFullPage ? '4px 8px' : '2px 6px',
      borderRadius: isFullPage ? '4px' : '3px',
      marginLeft: '8px',
      transition: 'all 0.2s ease'
    },
    deleteButtonHover: {
      color: '#f44336',
      backgroundColor: '#FFEBEE',
      border: '1px solid #f44336'
    },
    undoButton: {
      backgroundColor: '#009688',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      fontSize: '12px',
      fontWeight: '500',
      padding: '4px 12px',
      borderRadius: '4px',
      marginLeft: '8px',
      transition: 'all 0.2s ease'
    },
    emptyState: {
      padding: isFullPage ? '60px 20px' : '40px 20px',
      textAlign: 'center',
      color: '#4F6F6B',
      fontSize: isFullPage ? '16px' : '14px'
    },
    footer: {
      padding: isFullPage ? '16px 24px' : '16px 20px',
      borderTop: '1px solid #4DB6AC',
      backgroundColor: '#E0F2F1'
    },
    viewAllButton: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#009688',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: '500',
      fontSize: '14px',
      transition: 'all 0.2s ease'
    },
    loadMoreButton: {
      width: '100%',
      padding: '16px',
      backgroundColor: 'transparent',
      color: '#009688',
      border: '1px solid #009688',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '500',
      fontSize: '16px',
      margin: '20px',
      maxWidth: '200px',
      alignSelf: 'center',
      transition: 'all 0.2s ease'
    },
    loadMoreButtonDisabled: {
      opacity: 0.6,
      cursor: 'not-allowed'
    },
    notificationActions: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    readStatus: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: '#009688',
      marginRight: '8px'
    }
  };

  if (!showNotifications && !isFullPage) {
    return null;
  }

  if (!localNotifications || !Array.isArray(localNotifications)) {
    return null;
  }

  if (isFullPage) {
    return (
      <div style={styles.fullPageOverlay} onClick={onClose}>
        <div style={styles.fullPageContainer} onClick={(e) => e.stopPropagation()}>
          <div style={styles.header}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button
                style={styles.backButton}
                onClick={onClose}
                onMouseEnter={(e) => e.target.style.color = '#124441'}
                onMouseLeave={(e) => e.target.style.color = '#4F6F6B'}
                aria-label="Go back"
              >
                ←
              </button>
              <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '600', color: '#124441' }}>All Notifications</h2>
              {unreadCount > 0 && (
                <span style={styles.unreadBadge}>
                  {unreadCount} unread
                </span>
              )}
            </div>
            
            <div style={styles.headerActions}>
              {unreadCount > 0 && localNotifications.length > 0 && (
                <button
                  style={styles.actionButton}
                  onClick={handleMarkAllAsRead}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#FFFFFF';
                    e.target.style.backgroundColor = '#009688';
                    e.target.style.borderColor = '#009688';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#009688';
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.borderColor = '#4DB6AC';
                  }}
                >
                  Mark all as read
                </button>
              )}
              {localNotifications.length > 0 && (
                <button
                  style={styles.deleteAllButton}
                  onClick={handleDeleteAll}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#FFFFFF';
                    e.target.style.backgroundColor = '#f44336';
                    e.target.style.borderColor = '#f44336';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#f44336';
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.borderColor = '#f44336';
                  }}
                >
                  Delete all
                </button>
              )}
            </div>
          </div>
          
          <div style={styles.notificationsList}>
            {localNotifications.length > 0 ? (
              <>
                {localNotifications.map(notification => (
                  <div 
                    key={notification.id} 
                    style={{
                      ...styles.notificationItem,
                      ...(!notification.read ? styles.unreadNotification : {})
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#E0F2F1';
                      e.currentTarget.style.borderBottomColor = '#009688';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = !notification.read ? '#E0F2F1' : 'transparent';
                      e.currentTarget.style.borderBottomColor = '#E0F2F1';
                    }}
                  >
                    <div style={styles.notificationIcon}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div style={styles.notificationContent}>
                      <div style={styles.notificationTitle}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          {!notification.read && <div style={styles.readStatus} />}
                          <span style={{ color: '#124441' }}>{notification.title || 'Notification'}</span>
                        </div>
                        <div style={styles.notificationActions}>
                          <button
                            onClick={() => handleMarkAsRead(notification.id)}
                            style={{
                              ...styles.actionButton,
                              fontSize: '12px',
                              padding: '4px 12px',
                              border: '1px solid #4DB6AC'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.color = '#FFFFFF';
                              e.target.style.backgroundColor = '#009688';
                              e.target.style.borderColor = '#009688';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.color = '#009688';
                              e.target.style.backgroundColor = 'transparent';
                              e.target.style.borderColor = '#4DB6AC';
                            }}
                          >
                            Mark Read
                          </button>
                          <button
                            style={{
                              ...styles.deleteButton,
                              ...(hoverStates[notification.id] ? styles.deleteButtonHover : {})
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteNotification(notification.id);
                            }}
                            onMouseEnter={() => setHoverStates(prev => ({ ...prev, [notification.id]: true }))}
                            onMouseLeave={() => setHoverStates(prev => ({ ...prev, [notification.id]: false }))}
                            aria-label="Delete notification"
                          >
                            Delete
                          </button>
                        </div>
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
                
                {hasMore && (
                  <button
                    style={{
                      ...styles.loadMoreButton,
                      ...(isLoading ? styles.loadMoreButtonDisabled : {})
                    }}
                    onClick={handleLoadMore}
                    disabled={isLoading}
                    onMouseEnter={(e) => !isLoading && (
                      e.target.style.backgroundColor = '#009688',
                      e.target.style.color = 'white',
                      e.target.style.borderColor = '#009688'
                    )}
                    onMouseLeave={(e) => !isLoading && (
                      e.target.style.backgroundColor = 'transparent',
                      e.target.style.color = '#009688',
                      e.target.style.borderColor = '#009688'
                    )}
                  >
                    {isLoading ? 'Loading...' : 'Load More Notifications'}
                  </button>
                )}
              </>
            ) : (
              <div style={styles.emptyState}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600', color: '#124441' }}>
                  No notifications
                </h3>
                <p style={{ margin: 0, color: '#4F6F6B' }}>
                  {deletedAll ? 'All notifications have been deleted.' : 'You\'re all caught up!'}
                </p>
                {deletedAll && (
                  <button
                    onClick={() => {
                      setDeletedAll(false);
                      setDeletedIds(new Set());
                    }}
                    style={{
                      marginTop: '16px',
                      padding: '8px 16px',
                      backgroundColor: '#009688',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#00796B'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#009688'}
                  >
                    Restore All Notifications
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={styles.overlay} />
      
      <div ref={notificationsRef} style={styles.popupContainer}>
        <div style={styles.header}>
          <div>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#124441' }}>Notifications</h3>
            {unreadCount > 0 && (
              <span style={styles.unreadBadge}>
                {unreadCount} unread
              </span>
            )}
          </div>
          <div style={styles.headerActions}>
            {unreadCount > 0 && localNotifications.length > 0 && (
              <button
                style={styles.actionButton}
                onClick={handleMarkAllAsRead}
                onMouseEnter={(e) => {
                  e.target.style.color = '#FFFFFF';
                  e.target.style.backgroundColor = '#009688';
                  e.target.style.borderColor = '#009688';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#009688';
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.borderColor = '#4DB6AC';
                }}
              >
                Mark all read
              </button>
            )}
            <button
              style={styles.closeButton}
              onClick={onClose}
              onMouseEnter={(e) => e.target.style.color = '#124441'}
              onMouseLeave={(e) => e.target.style.color = '#4F6F6B'}
              aria-label="Close notifications"
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
                    e.currentTarget.style.backgroundColor = '#E0F2F1';
                    e.currentTarget.style.borderBottomColor = '#009688';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = !notification.read ? '#E0F2F1' : 'transparent';
                    e.currentTarget.style.borderBottomColor = '#E0F2F1';
                  }}
                >
                  <div style={styles.notificationIcon}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div style={styles.notificationContent}>
                    <div style={styles.notificationTitle}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {!notification.read && <div style={styles.readStatus} />}
                        <span style={{ color: '#124441' }}>{notification.title || 'Notification'}</span>
                      </div>
                      <button
                        style={{
                          ...styles.deleteButton,
                          ...(hoverStates[notification.id] ? styles.deleteButtonHover : {})
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteNotification(notification.id);
                        }}
                        onMouseEnter={() => setHoverStates(prev => ({ ...prev, [notification.id]: true }))}
                        onMouseLeave={() => setHoverStates(prev => ({ ...prev, [notification.id]: false }))}
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
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🔔</div>
              <p style={{ margin: 0, color: '#4F6F6B' }}>
                {deletedAll ? 'All notifications deleted' : 'No notifications available'}
              </p>
            </div>
          )}
        </div>
        
        <div style={styles.footer}>
          <button
            style={styles.viewAllButton}
            onClick={onViewAll}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#00796B';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 12px rgba(0,150,136,0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#009688';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            View All Notifications
          </button>
        </div>
      </div>
    </>
  );
};

export default NotificationPanel;