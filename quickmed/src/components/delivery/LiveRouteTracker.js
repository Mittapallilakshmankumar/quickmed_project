import React from 'react';

const LiveRouteTracker = ({ deliveryData }) => {
  const styles = {
    liveRouteContainer: {
      backgroundColor: '#FFFFFF',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: '1px solid #E0F2F1',
      overflow: 'hidden',
      marginBottom: '20px'
    },
    routeHeader: {
      padding: '16px 20px',
      borderBottom: '1px solid #E0F2F1',
      backgroundColor: '#E0F2F1'
    },
    routeTitle: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px'
    },
    mapTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#124441',
      margin: 0
    },
    liveBadge: {
      backgroundColor: '#009688',
      color: '#FFFFFF',
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '10px',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    livePulse: {
      width: '6px',
      height: '6px',
      backgroundColor: '#FFFFFF',
      borderRadius: '50%',
      animation: 'pulse 1.5s infinite'
    },
    routeStats: {
      display: 'flex',
      gap: '16px',
      fontSize: '12px',
      color: '#4F6F6B'
    },
    routeStat: {
      fontWeight: '500'
    },
    routeVisualization: {
      padding: '20px'
    },
    routePath: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    routeStart: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    routeEnd: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    locationPin: {
      fontSize: '20px',
      flexShrink: 0
    },
    locationInfo: {
      flex: 1
    },
    routeLocationLabel: {
      fontSize: '12px',
      color: '#4F6F6B',
      fontWeight: '500',
      marginBottom: '2px'
    },
    routeLocationText: {
      fontSize: '14px',
      color: '#124441',
      fontWeight: '500'
    },
    progressBar: {
      height: '4px',
      backgroundColor: '#E0F2F1',
      borderRadius: '2px',
      position: 'relative',
      margin: '8px 0 8px 32px'
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#4DB6AC',
      borderRadius: '2px',
      transition: 'width 0.5s ease',
      position: 'relative'
    },
    progressMarker: {
      position: 'absolute',
      right: '0',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '12px',
      height: '12px',
      backgroundColor: '#4DB6AC',
      borderRadius: '50%',
      border: '2px solid #FFFFFF',
      boxShadow: '0 0 0 2px #4DB6AC'
    },
    trafficInfo: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '12px 20px',
      backgroundColor: '#E0F2F1',
      borderTop: '1px solid #4DB6AC'
    },
    trafficStatus: {
      display: 'flex',
      gap: '8px',
      fontSize: '12px'
    },
    trafficLabel: {
      color: '#4F6F6B'
    },
    trafficValue: {
      fontWeight: '600',
      color: '#009688'
    },
    activeDeliveries: {
      display: 'flex',
      gap: '8px',
      fontSize: '12px'
    },
    deliveryLabel: {
      color: '#4F6F6B'
    },
    deliveryValue: {
      fontWeight: '600',
      color: '#009688'
    },
    realTimeUpdates: {
      padding: '8px 20px',
      backgroundColor: '#E0F2F1',
      borderTop: '1px solid #4DB6AC'
    },
    updateIndicator: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '11px',
      color: '#009688',
      fontWeight: '500'
    },
    updateDot: {
      width: '6px',
      height: '6px',
      backgroundColor: '#009688',
      borderRadius: '50%'
    }
  };

  // Add CSS animation for pulse effect
  const animationStyle = `
    @keyframes pulse {
      0% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        opacity: 0.7;
        transform: scale(1.1);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }
  `;

  // For demo purposes, using the first in-progress task or a default
  const activeTask = deliveryData.assignedTasks.find(task => task.status === 'in-progress') || 
                    deliveryData.assignedTasks[0] || 
                    deliveryData.pendingTasks[0];

  const progress = activeTask ? activeTask.routeProgress : 0;
  const currentLocation = activeTask ? activeTask.currentLocation : 'Sector 18, Noida';
  const nextLocation = activeTask ? activeTask.deliveryLocation : 'Next pickup location';

  return (
    <>
      <style>{animationStyle}</style>
      <div style={styles.liveRouteContainer}>
        <div style={styles.routeHeader}>
          <div style={styles.routeTitle}>
            <h3 style={styles.mapTitle}>Live Delivery Route</h3>
            <span style={styles.liveBadge}>
              <span style={styles.livePulse}></span>
              LIVE
            </span>
          </div>
          <div style={styles.routeStats}>
            <span style={styles.routeStat}>Progress: {Math.round(progress)}%</span>
            <span style={styles.routeStat}>ETA: {activeTask?.estimatedTime || '15 mins'}</span>
          </div>
        </div>

        <div style={styles.routeVisualization}>
          <div style={styles.routePath}>
            <div style={styles.routeStart}>
              <div style={styles.locationPin}>📍</div>
              <div style={styles.locationInfo}>
                <div style={styles.routeLocationLabel}>Current Location</div>
                <div style={styles.routeLocationText}>{currentLocation}</div>
              </div>
            </div>

            <div style={styles.progressBar}>
              <div
                style={{
                  ...styles.progressFill,
                  width: `${progress}%`
                }}
              ></div>
              <div style={styles.progressMarker}></div>
            </div>

            <div style={styles.routeEnd}>
              <div style={styles.locationPin}>🏁</div>
              <div style={styles.locationInfo}>
                <div style={styles.routeLocationLabel}>Next Destination</div>
                <div style={styles.routeLocationText}>{nextLocation}</div>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.trafficInfo}>
          <div style={styles.trafficStatus}>
            <span style={styles.trafficLabel}>Traffic:</span>
            <span style={styles.trafficValue}>
              Moderate
            </span>
          </div>
          <div style={styles.activeDeliveries}>
            <span style={styles.deliveryLabel}>Active Deliveries:</span>
            <span style={styles.deliveryValue}>
              {deliveryData.assignedTasks.filter(task => task.status === 'in-progress').length}
            </span>
          </div>
        </div>

        <div style={styles.realTimeUpdates}>
          <div style={styles.updateIndicator}>
            <span style={styles.updateDot}></span>
            Updating in real-time
          </div>
        </div>
      </div>
    </>
  );
};

export default LiveRouteTracker;