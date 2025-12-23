import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';

// Configuration constants
const STATUS_CONFIG = {
  'Order Placed': { color: '#FF9800', icon: '🛒', description: 'Order placed successfully' },
  'Pending': { color: '#FF9800', icon: '🛒', description: 'Waiting for pharmacy confirmation' },
  'Confirmed': { color: '#2196F3', icon: '✅', description: 'Pharmacy confirmed your order' },
  'Packed': { color: '#9C27B0', icon: '📦', description: 'Medicines packed and ready' },
  'Picked Up': { color: '#FF5722', icon: '🚚', description: 'Picked by delivery partner' },
  'Picked': { color: '#FF5722', icon: '🚚', description: 'Picked by delivery partner' },
  'Out for Pickup': { color: '#3F51B5', icon: '🏃‍♂️', description: 'On way to pharmacy' },
  'Out for Delivery': { color: '#3F51B5', icon: '🚛', description: 'Out for delivery' },
  'In Transit': { color: '#3F51B5', icon: '🚛', description: 'In transit to location' },
  'Delivered': { color: '#4CAF50', icon: '🏠', description: 'Delivered successfully' },
  'Cancelled': { color: '#F44336', icon: '❌', description: 'Order cancelled' },
  'Returned': { color: '#FF9800', icon: '↩️', description: 'Order returned' },
  'Failed Delivery': { color: '#9E9E9E', icon: '⚠️', description: 'Delivery attempt failed' }
};

const VENDORS = {
  'MEDSTORE_001': { name: 'MedPlus Mart', address: '123 Healthcare St, Mumbai', rating: '4.5', deliveryTime: '20-30 mins', contact: '+91-9876543210' },
  'APOLLO_002': { name: 'Apollo Pharmacy', address: '456 Wellness Rd, Delhi', rating: '4.7', deliveryTime: '20-30 mins', contact: '+91-9876543211' },
  'PHARMACY_003': { name: 'Wellness Forever', address: '789 Cure Lane, Bangalore', rating: '4.3', deliveryTime: '25-35 mins', contact: '+91-9876543212' },
  'QUICKMED_004': { name: 'QuickMed Express', address: '321 Fast Track, Hyderabad', rating: '4.8', deliveryTime: '15-25 mins', contact: '+91-9876543213' }
};

const DELIVERY_PARTNERS = {
  'DP_001': { name: 'Rahul Sharma', phone: '+91-9876543201', vehicle: 'Bike', vehicleNo: 'MH-01-AB-1234', rating: 4.8, totalDeliveries: 1245, photo: '👨‍🦱' },
  'DP_002': { name: 'Priya Patel', phone: '+91-9876543202', vehicle: 'Scooter', vehicleNo: 'DL-02-CD-5678', rating: 4.9, totalDeliveries: 892, photo: '👩‍🦰' },
  'DP_003': { name: 'Amit Kumar', phone: '+91-9876543203', vehicle: 'Bike', vehicleNo: 'KA-03-EF-9012', rating: 4.7, totalDeliveries: 1567, photo: '👨' },
  'DP_004': { name: 'Sneha Reddy', phone: '+91-9876543204', vehicle: 'Bike', vehicleNo: 'TS-04-GH-3456', rating: 4.6, totalDeliveries: 743, photo: '👩' }
};

const STATUS_FILTERS = [
  { key: 'all', label: 'All Status' },
  { key: 'confirmed', label: 'Confirmed' },
  { key: 'delivered', label: 'Delivered' },
  { key: 'cancelled', label: 'Cancelled' },
  { key: 'returned', label: 'Returned' }
];

const DATE_FILTERS = [
  { key: 'recent', label: 'Recent (7 days)' },
  { key: 'last30days', label: 'Last 30 days' },
  { key: 'last6months', label: 'Last 6 months' },
  { key: 'last1year', label: 'Last 1 year' }
];

// Helper functions
const formatTime = (date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const formatDate = (date) => {
  return date.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
};

// Calculate estimated delivery based on 20-30 minute window from order time
const calculateEstimatedDelivery = (orderDate) => {
  const orderTime = new Date(orderDate);
  // Add 20-30 minutes (use average of 25 minutes)
  const estimatedTime = new Date(orderTime.getTime() + (25 * 60 * 1000));
  return estimatedTime;
};

// Generate status timeline based on order date and current status
const generateStatusTimeline = (orderDate, currentStatus) => {
  const timeline = [];
  const orderTime = new Date(orderDate);
  
  // Always start with Order Placed
  timeline.push({
    status: 'Order Placed',
    timestamp: orderTime.toISOString(),
    icon: STATUS_CONFIG['Order Placed'].icon
  });
  
  // Add Pending status 1 minute after order
  const pendingTime = new Date(orderTime.getTime() + 60000);
  timeline.push({
    status: 'Pending',
    timestamp: pendingTime.toISOString(),
    icon: STATUS_CONFIG['Pending'].icon
  });
  
  // Add Confirmed status 2 minutes after order
  const confirmedTime = new Date(orderTime.getTime() + 120000);
  timeline.push({
    status: 'Confirmed',
    timestamp: confirmedTime.toISOString(),
    icon: STATUS_CONFIG['Confirmed'].icon
  });
  
  // Based on current status, add appropriate timeline entries
  const statusSequence = ['Order Placed', 'Pending', 'Confirmed', 'Packed', 'Picked', 'Out for Delivery', 'In Transit', 'Delivered'];
  const currentStatusIndex = statusSequence.indexOf(currentStatus);
  
  if (currentStatusIndex > 2) {
    // Add Packed status 3 minutes after order
    const packedTime = new Date(orderTime.getTime() + 180000);
    timeline.push({
      status: 'Packed',
      timestamp: packedTime.toISOString(),
      icon: STATUS_CONFIG['Packed'].icon
    });
  }
  
  if (currentStatusIndex > 3) {
    // Add Picked status 4 minutes after order
    const pickedTime = new Date(orderTime.getTime() + 240000);
    timeline.push({
      status: 'Picked',
      timestamp: pickedTime.toISOString(),
      icon: STATUS_CONFIG['Picked'].icon
    });
  }
  
  if (currentStatusIndex > 4) {
    // Add Out for Delivery status 5 minutes after order
    const outForDeliveryTime = new Date(orderTime.getTime() + 300000);
    timeline.push({
      status: 'Out for Delivery',
      timestamp: outForDeliveryTime.toISOString(),
      icon: STATUS_CONFIG['Out for Delivery'].icon
    });
  }
  
  if (currentStatusIndex > 5) {
    // Add In Transit status 6 minutes after order
    const inTransitTime = new Date(orderTime.getTime() + 360000);
    timeline.push({
      status: 'In Transit',
      timestamp: inTransitTime.toISOString(),
      icon: STATUS_CONFIG['In Transit'].icon
    });
  }
  
  if (currentStatusIndex > 6) {
    // Add Delivered status within 20-30 minutes (25 minutes average)
    const deliveredTime = new Date(orderTime.getTime() + (25 * 60 * 1000));
    timeline.push({
      status: 'Delivered',
      timestamp: deliveredTime.toISOString(),
      icon: STATUS_CONFIG['Delivered'].icon
    });
  }
  
  return timeline;
};

// Styles
const styles = {
  container: { padding: '1.5rem', maxWidth: '1400px', margin: '0 auto', minHeight: '100vh', marginTop: '140px' },
  header: { display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.5rem', paddingTop: '1rem' },
  title: { color: '#009688', fontSize: '2.2rem', margin: '0 0 0.5rem 0', fontWeight: '800', background: 'linear-gradient(135deg, #009688, #4DB6AC)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  subtitle: { color: '#4F6F6B', fontSize: '1rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.5' },
  subtitleSmall: { fontSize: '0.9rem', marginLeft: '1rem', color: '#4F6F6B', fontWeight: 'normal' },
  timeDisplay: { width: '100px', textAlign: 'right', fontSize: '0.9rem', color: '#009688', fontWeight: '600' },
  mainSection: { backgroundColor: '#E0F2F1', borderRadius: '15px', padding: '1.5rem', border: '2px solid #4DB6AC', marginBottom: '2rem', boxShadow: '0 4px 15px rgba(0, 150, 136, 0.1)' },
  sectionTitle: { color: '#009688', margin: '0 0 1.5rem 0', fontSize: '1.5rem', fontWeight: '700', textAlign: 'center' },
  filterCard: { backgroundColor: '#FFFFFF', padding: '1.2rem', borderRadius: '10px', border: '1px solid #4DB6AC', marginBottom: '1rem' },
  clearButton: { padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid #009688', backgroundColor: 'transparent', color: '#009688', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600', transition: 'all 0.3s ease', width: '100%', marginTop: '1rem' },
  infoBox: { marginTop: '1.5rem', padding: '0.8rem', backgroundColor: '#FFF3E0', borderRadius: '6px', border: '1px solid #FFCC80' },
  summaryCard: { backgroundColor: '#FFFFFF', padding: '1.2rem', borderRadius: '10px', border: '1px solid #4DB6AC', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  deliveryTag: { fontSize: '0.8rem', color: '#4F6F6B', backgroundColor: '#E0F2F1', padding: '0.3rem 0.7rem', borderRadius: '6px', border: '1px solid #4DB6AC' },
  ratingTag: { fontSize: '0.8rem', color: '#EF6C00', backgroundColor: '#FFF3E0', padding: '0.3rem 0.7rem', borderRadius: '6px', border: '1px solid #FFCC80', display: 'flex', alignItems: 'center', gap: '0.3rem' },
  emptyState: { backgroundColor: '#FFFFFF', padding: '3rem', borderRadius: '10px', border: '1px solid #4DB6AC', textAlign: 'center' },
  shopButton: { padding: '0.8rem 1.5rem', borderRadius: '6px', border: 'none', backgroundColor: '#009688', color: '#FFFFFF', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600' },
  backButton: { padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid #009688', backgroundColor: 'transparent', color: '#009688', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600', transition: 'all 0.3s ease' }
};

const cardStyles = {
  container: { backgroundColor: '#FFFFFF', padding: '1.2rem', borderRadius: '10px', border: '1px solid #4DB6AC', marginBottom: '1rem', transition: 'transform 0.2s, box-shadow 0.2s' },
  statusBadge: (color) => ({ padding: '0.3rem 0.8rem', borderRadius: '15px', color: 'white', fontSize: '0.7rem', fontWeight: '700', backgroundColor: color }),
  ratingBadge: { padding: '0.3rem 0.6rem', borderRadius: '15px', color: 'white', fontSize: '0.7rem', fontWeight: '700', backgroundColor: '#FF9800' },
  vendorInfo: { backgroundColor: '#E0F2F1', padding: '0.8rem', borderRadius: '6px', marginTop: '0.8rem' },
  dpInfo: { fontSize: '0.75rem', color: '#0277BD', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' },
  ratingPrompt: { backgroundColor: '#FFF3E0', padding: '0.6rem', borderRadius: '6px', border: '1px solid #FFCC80', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  rateButton: { padding: '0.3rem 0.8rem', backgroundColor: '#009688', color: '#FFFFFF', border: 'none', borderRadius: '4px', fontSize: '0.7rem', cursor: 'pointer', fontWeight: '600' },
  timeInfo: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F0FFF0', padding: '0.6rem', borderRadius: '6px', marginBottom: '1rem', border: '1px solid #C8E6C9' },
  itemPreview: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem', borderBottom: '1px solid #4DB6AC' },
  prescriptionBadge: { fontSize: '0.65rem', color: '#009688', backgroundColor: '#E0F2F1', padding: '0.15rem 0.4rem', borderRadius: '3px', marginTop: '0.2rem', display: 'inline-block' },
  quantityBadge: { color: '#4F6F6B', fontSize: '0.75rem', backgroundColor: '#E0F2F1', padding: '0.25rem 0.6rem', borderRadius: '5px' },
  footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.8rem', borderTop: '2px solid #4DB6AC', flexWrap: 'wrap', gap: '1rem' },
  actionButtons: { display: 'flex', gap: '0.6rem', flexWrap: 'wrap' },
  viewButton: { padding: '0.4rem 0.8rem', backgroundColor: '#2196F3', color: '#FFFFFF', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '600' },
  trackButton: { padding: '0.4rem 0.8rem', backgroundColor: '#009688', color: '#FFFFFF', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '600' },
  rateActionButton: { padding: '0.4rem 0.8rem', backgroundColor: '#4CAF50', color: '#FFFFFF', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '600' }
};

const modalStyles = {
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px', backdropFilter: 'blur(5px)', overflowY: 'auto' },
  content: { backgroundColor: '#FFFFFF', borderRadius: '15px', width: '90%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 10px 30px rgba(0, 150, 136, 0.2)' },
  header: { padding: '1.5rem', borderBottom: '2px solid #4DB6AC', backgroundColor: '#E0F2F1', position: 'sticky', top: 0, zIndex: 1 },
  modalHeader: { padding: '1.5rem', borderBottom: '2px solid #4DB6AC', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#E0F2F1', position: 'sticky', top: 0, zIndex: 1 },
  closeButton: { background: 'none', border: 'none', fontSize: '1.5rem', color: '#009688', cursor: 'pointer', padding: '0.5rem', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', transition: 'background-color 0.3s' },
  deliveryInfo: { backgroundColor: '#E0F2F1', padding: '1rem', borderRadius: '10px', border: '2px solid #4DB6AC', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' },
  dpAvatar: { fontSize: '2.5rem', backgroundColor: '#009688', color: '#FFFFFF', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  dpAvatarSmall: { fontSize: '2rem', backgroundColor: '#009688', color: '#FFFFFF', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  dpDetails: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '0.5rem', marginTop: '0.5rem' },
  dpDetailsCompact: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'center' },
  label: { display: 'block', color: '#009688', marginBottom: '0.5rem', fontWeight: '600' },
  actionButtons: { display: 'flex', justifyContent: 'space-between', gap: '1rem', marginTop: '1.5rem' },
  skipButton: { flex: 1, padding: '0.8rem', backgroundColor: '#E0F2F1', color: '#009688', border: '2px solid #4DB6AC', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600' },
  submitButton: { flex: 2, padding: '0.8rem', backgroundColor: '#009688', color: '#FFFFFF', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600' },
  starContainer: { display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' },
  textarea: { width: '100%', padding: '0.8rem', border: '2px solid #4DB6AC', borderRadius: '6px', fontSize: '0.9rem', minHeight: '80px', resize: 'vertical', outline: 'none', fontFamily: 'inherit' },
  deliveredInfo: { backgroundColor: '#f0f9ff', padding: '1rem', borderRadius: '10px', border: '2px solid #B3E5FC', marginBottom: '1.5rem' },
  rateButton: { padding: '0.5rem 1rem', backgroundColor: '#009688', color: '#FFFFFF', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem' },
  statusCard: (color) => ({ backgroundColor: color + '15', padding: '1rem', borderRadius: '10px', borderLeft: '4px solid ' + color, marginBottom: '1.5rem' }),
  timeGrid: { marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' },
  infoCard: { backgroundColor: '#FFFFFF', padding: '1.2rem', borderRadius: '10px', border: '1px solid #4DB6AC', marginBottom: '1.5rem' },
  infoGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' },
  itemRow: (index) => ({ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem', borderBottom: '1px solid #4DB6AC', backgroundColor: index % 2 === 0 ? '#E0F2F1' : 'transparent' }),
  summary: { marginTop: '1rem', paddingTop: '1rem', borderTop: '2px solid #4DB6AC' },
  grandTotal: { display: 'flex', justifyContent: 'space-between', marginTop: '0.8rem', paddingTop: '0.8rem', borderTop: '1px solid #4DB6AC', color: '#009688', fontWeight: 'bold', fontSize: '1.1rem' },
  modalFooter: { padding: '1rem 1.5rem', borderTop: '2px solid #4DB6AC', display: 'flex', justifyContent: 'flex-end', gap: '1rem' },
  closeModalButton: { padding: '0.6rem 1.2rem', borderRadius: '6px', border: '1px solid #009688', backgroundColor: 'transparent', color: '#009688', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600', transition: 'all 0.3s ease' },
  trackButton: { padding: '0.6rem 1.2rem', borderRadius: '6px', backgroundColor: '#009688', color: '#FFFFFF', border: 'none', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600' },
  rateButtonLarge: { padding: '0.6rem 1.2rem', borderRadius: '6px', backgroundColor: '#4CAF50', color: '#FFFFFF', border: 'none', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600' },
  timeline: { marginTop: '1.5rem', paddingTop: '1rem', borderTop: '2px solid #4DB6AC' },
  timelineItem: { display: 'flex', alignItems: 'flex-start', marginBottom: '1rem', position: 'relative', paddingLeft: '2rem' },
  timelineDot: (color, isActive) => ({ 
    width: '16px', 
    height: '16px', 
    borderRadius: '50%', 
    backgroundColor: isActive ? color : '#E0E0E0', 
    position: 'absolute', 
    left: 0,
    top: '4px',
    border: `2px solid ${isActive ? color : '#E0E0E0'}` 
  }),
  timelineContent: { flex: 1 },
  timelineTime: { fontSize: '0.75rem', color: '#4F6F6B', marginTop: '0.2rem' }
};

// Rating Modal Only (No Tips)
const RatingModal = React.memo(({ order, deliveryPartner, onClose, onRatingSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');

  const handleRatingSubmit = () => {
    if (rating > 0) {
      onRatingSubmit(order.id, rating, review);
      setTimeout(onClose, 2000);
    }
  };

  const getStarButtonStyle = (isActive) => ({
    fontSize: '2.5rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: isActive ? '#FFD700' : '#E0E0E0',
    transition: 'transform 0.2s',
    padding: '0',
    lineHeight: '1'
  });

  const getRatingSubmitButtonStyle = (hasRating) => ({
    flex: 2,
    padding: '0.8rem',
    backgroundColor: hasRating ? '#009688' : '#cccccc',
    color: hasRating ? '#FFFFFF' : '#4F6F6B',
    border: 'none',
    borderRadius: '6px',
    cursor: hasRating ? 'pointer' : 'not-allowed',
    fontSize: '0.9rem',
    fontWeight: '600'
  });

  return (
    <div style={modalStyles.overlay} onClick={onClose}>
      <div style={modalStyles.content} onClick={e => e.stopPropagation()}>
        <div style={modalStyles.header}>
          <h3 style={{ margin: 0, color: '#009688' }}>
            ⭐ Rate Your Delivery
          </h3>
          <p style={{ margin: '0.3rem 0 0 0', color: '#4F6F6B', fontSize: '0.9rem' }}>
            Order #{order.id} • {deliveryPartner.name}
          </p>
        </div>

        <div style={{ padding: '1.5rem' }}>
          <div style={modalStyles.deliveryInfo}>
            <div style={modalStyles.dpAvatar}>{deliveryPartner.photo}</div>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: 0, color: '#009688' }}>{deliveryPartner.name}</h4>
              <div style={modalStyles.dpDetails}>
                <div>⭐ {deliveryPartner.rating}/5</div>
                <div>🚗 {deliveryPartner.vehicle} • {deliveryPartner.vehicleNo}</div>
                <div>📞 {deliveryPartner.phone}</div>
                <div>📦 {deliveryPartner.totalDeliveries} deliveries</div>
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ color: '#009688', marginBottom: '1rem' }}>⭐ Rate Your Delivery Experience</h4>
            
            <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
              <div style={modalStyles.starContainer}>
                {[1, 2, 3, 4, 5].map(star => (
                  <button key={star} style={getStarButtonStyle(star <= (hoverRating || rating))}
                    onClick={() => setRating(star)} onMouseEnter={() => setHoverRating(star)} 
                    onMouseLeave={() => setHoverRating(0)}>
                    ★
                  </button>
                ))}
              </div>
              <div style={{ fontSize: '1rem', color: '#009688', fontWeight: '600' }}>
                {rating === 0 ? 'Select rating' : rating === 1 ? 'Poor' : rating === 2 ? 'Fair' : 
                 rating === 3 ? 'Good' : rating === 4 ? 'Very Good' : 'Excellent'}
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={modalStyles.label}>📝 Optional Review</label>
              <textarea value={review} onChange={e => setReview(e.target.value)} 
                placeholder="Share your experience (optional)" style={modalStyles.textarea} maxLength={500} />
            </div>

            <div style={modalStyles.actionButtons}>
              <button style={modalStyles.skipButton} onClick={onClose}>
                Skip Rating
              </button>
              <button style={getRatingSubmitButtonStyle(rating > 0)} onClick={handleRatingSubmit} disabled={rating === 0}>
                Submit Rating & Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

// Order Details Modal
const OrderDetailsModal = React.memo(({ order, onClose, startLiveTracking, showRatingModal }) => {
  const vendor = VENDORS[order.vendorId] || VENDORS[Object.keys(VENDORS)[0]];
  const statusInfo = STATUS_CONFIG[order.status] || STATUS_CONFIG['Pending'];
  
  // Generate or use existing status timeline
  const statusTimeline = order.statusTimeline || generateStatusTimeline(order.date, order.status);
  
  // Calculate estimated delivery
  const estimatedDelivery = calculateEstimatedDelivery(order.date);
  
  // Get delivery partner for delivered orders
  const deliveryPartner = order.status === 'Delivered' ? 
    Object.values(DELIVERY_PARTNERS).find(dp => dp.name === order.deliveryPartner) || 
    Object.values(DELIVERY_PARTNERS)[0] : null;

  const totalAmount = order.items?.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0) || 0;
  const tax = totalAmount * 0.05;
  const grandTotal = totalAmount + tax;

  const getTimeCardStyle = () => ({
    backgroundColor: '#FFFFFF',
    padding: '0.8rem',
    borderRadius: '8px',
    border: '1px solid #4DB6AC'
  });

  return (
    <div style={modalStyles.overlay} onClick={onClose}>
      <div style={modalStyles.content} onClick={e => e.stopPropagation()}>
        <div style={modalStyles.modalHeader}>
          <div>
            <h3 style={{ margin: 0, color: '#009688' }}>Order #{order.id} Details</h3>
            <p style={{ margin: '0.3rem 0 0 0', color: '#4F6F6B', fontSize: '0.9rem' }}>
              Placed on {formatDate(new Date(order.date))}
            </p>
          </div>
          <button style={modalStyles.closeButton} onClick={onClose}>✕</button>
        </div>

        <div style={{ padding: '1.5rem' }}>
          {order.status === 'Delivered' && deliveryPartner && (
            <div style={modalStyles.deliveredInfo}>
              <h4 style={{ margin: '0 0 0.8rem 0', color: '#0277BD' }}>🚚 Delivery Partner</h4>
              <div style={modalStyles.dpDetailsCompact}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={modalStyles.dpAvatarSmall}>{deliveryPartner.photo}</div>
                  <div>
                    <div style={{ fontWeight: '600', color: '#124441' }}>{deliveryPartner.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#4F6F6B' }}>⭐ {deliveryPartner.rating}/5 • {deliveryPartner.vehicle}</div>
                  </div>
                </div>
                {!order.rated && (
                  <button style={modalStyles.rateButton} onClick={() => { showRatingModal(order, deliveryPartner); onClose(); }}>
                    Rate Now
                  </button>
                )}
              </div>
            </div>
          )}

          <div style={modalStyles.statusCard(statusInfo.color)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '1.2rem' }}>{statusInfo.icon}</span>
              <h4 style={{ margin: 0, color: statusInfo.color }}>{order.status}</h4>
            </div>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#4F6F6B' }}>{statusInfo.description}</p>
            
            <div style={modalStyles.timeGrid}>
              {!['Delivered', 'Cancelled', 'Returned'].includes(order.status) && (
                <div style={getTimeCardStyle()}>
                  <div style={{ fontSize: '0.8rem', color: '#4F6F6B', marginBottom: '0.3rem' }}>
                    📅 Estimated Delivery:
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#4CAF50' }}>
                    {formatTime(estimatedDelivery)}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#4F6F6B', marginTop: '0.2rem' }}>
                    {vendor.deliveryTime} delivery
                  </div>
                </div>
              )}
              {['Delivered', 'Cancelled', 'Returned'].includes(order.status) && (
                <div style={getTimeCardStyle()}>
                  <div style={{ fontSize: '0.8rem', color: '#4F6F6B', marginBottom: '0.3rem' }}>⏰ Completed at:</div>
                  <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#4CAF50' }}>
                    {formatTime(estimatedDelivery)}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Status Timeline */}
          <div style={modalStyles.timeline}>
            <h4 style={{ color: '#009688', marginBottom: '1rem' }}>📊 Order Timeline</h4>
            {statusTimeline.map((entry, index) => {
              const isCurrent = entry.status === order.status;
              const isCompleted = index < statusTimeline.findIndex(e => e.status === order.status) || 
                                 (isCurrent && ['Delivered', 'Cancelled', 'Returned'].includes(order.status));
              const entryTime = new Date(entry.timestamp);
              const statusConfig = STATUS_CONFIG[entry.status] || { color: '#4F6F6B' };
              
              return (
                <div key={index} style={modalStyles.timelineItem}>
                  <div style={modalStyles.timelineDot(statusConfig.color, isCompleted || isCurrent)}></div>
                  <div style={modalStyles.timelineContent}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1rem' }}>{entry.icon}</span>
                      <span style={{ fontWeight: isCurrent ? 'bold' : 'normal', color: isCurrent ? statusConfig.color : '#124441' }}>
                        {entry.status}
                      </span>
                      {isCurrent && !['Delivered', 'Cancelled', 'Returned'].includes(entry.status) && (
                        <span style={{ fontSize: '0.7rem', color: '#009688', backgroundColor: '#E0F2F1', padding: '0.1rem 0.4rem', borderRadius: '3px' }}>
                          Current
                        </span>
                      )}
                    </div>
                    <div style={modalStyles.timelineTime}>
                      {entryTime.toLocaleString('en-IN', { 
                        hour: '2-digit', 
                        minute: '2-digit',
                        day: 'numeric',
                        month: 'short'
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={modalStyles.infoCard}>
            <h4 style={{ margin: '0 0 1rem 0', color: '#009688' }}>🏪 Pharmacy Information</h4>
            <div style={modalStyles.infoGrid}>
              <div>
                <p style={{ margin: '0.3rem 0', fontSize: '0.9rem' }}><strong>Name:</strong> {vendor.name}</p>
                <p style={{ margin: '0.3rem 0', fontSize: '0.9rem' }}><strong>Address:</strong> {vendor.address}</p>
              </div>
              <div>
                <p style={{ margin: '0.3rem 0', fontSize: '0.9rem' }}><strong>Rating:</strong> ⭐ {vendor.rating}/5</p>
                <p style={{ margin: '0.3rem 0', fontSize: '0.9rem' }}><strong>Delivery Time:</strong> {vendor.deliveryTime}</p>
              </div>
            </div>
          </div>

          {order.items?.length > 0 && (
            <div style={modalStyles.infoCard}>
              <h4 style={{ margin: '0 0 1rem 0', color: '#009688' }}>💊 Ordered Medicines ({order.items.length})</h4>
              {order.items.map((item, index) => (
                <div key={index} style={modalStyles.itemRow(index)}>
                  <div>
                    <div style={{ fontWeight: '600', color: '#124441', marginBottom: '0.3rem' }}>💊 {item.name || 'Medicine'}</div>
                    {item.prescriptionRequired && <span style={cardStyles.prescriptionBadge}>📄 Prescription Required</span>}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 'bold', color: '#009688' }}>₹{(item.price || 0) * (item.quantity || 1)}</div>
                    <div style={{ fontSize: '0.8rem', color: '#4F6F6B', marginTop: '0.2rem' }}>₹{item.price || 0} × {item.quantity || 1}</div>
                  </div>
                </div>
              ))}
              
              <div style={modalStyles.summary}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#4F6F6B' }}>Subtotal:</span>
                  <span style={{ fontWeight: '600' }}>₹{totalAmount.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#4F6F6B' }}>Delivery Charge:</span>
                  <span style={{ fontWeight: '600', color: '#4CAF50' }}>FREE</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#4F6F6B' }}>Tax (5%):</span>
                  <span style={{ fontWeight: '600' }}>₹{tax.toFixed(2)}</span>
                </div>
                <div style={modalStyles.grandTotal}>
                  <span>Total Amount:</span>
                  <span>₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          <div style={modalStyles.infoCard}>
            <h4 style={{ margin: '0 0 1rem 0', color: '#009688' }}>📍 Delivery Information</h4>
            <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}><strong>Address:</strong> {order.deliveryAddress || 'Not specified'}</p>
            <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}><strong>Payment:</strong> {order.paymentMethod || 'Online'}</p>
            <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}><strong>Delivery Speed:</strong> {vendor.deliveryTime}</p>
          </div>
        </div>

        <div style={modalStyles.modalFooter}>
          <button style={modalStyles.closeModalButton} onClick={onClose}>Close</button>
          {!['Delivered', 'Cancelled', 'Returned'].includes(order.status) && (
            <button style={modalStyles.trackButton} onClick={() => { 
              if (startLiveTracking && typeof startLiveTracking === 'function') {
                startLiveTracking(order); 
                onClose(); 
              }
            }}>🗺️ Live Tracking</button>
          )}
          {order.status === 'Delivered' && !order.rated && deliveryPartner && (
            <button style={modalStyles.rateButtonLarge} onClick={() => { showRatingModal(order, deliveryPartner); onClose(); }}>
              ⭐ Rate Delivery
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

// Order Card Component
const OrderCard = React.memo(({ order, onViewDetails, startLiveTracking, showRatingModal }) => {
  const vendor = VENDORS[order.vendorId] || VENDORS[Object.keys(VENDORS)[0]];
  const statusInfo = STATUS_CONFIG[order.status] || STATUS_CONFIG['Pending'];
  
  // Calculate estimated delivery
  const estimatedDelivery = calculateEstimatedDelivery(order.date);
  
  // Get delivery partner for delivered orders
  const deliveryPartner = order.status === 'Delivered' ? 
    Object.values(DELIVERY_PARTNERS).find(dp => dp.name === order.deliveryPartner) || 
    Object.values(DELIVERY_PARTNERS)[0] : null;

  return (
    <div style={cardStyles.container} 
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 150, 136, 0.15)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
      
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
          <h4 style={{ margin: 0, color: '#009688' }}>Order #{order.id}</h4>
          <span style={cardStyles.statusBadge(statusInfo.color)}>{statusInfo.icon} {order.status}</span>
          {order.rated && <span style={cardStyles.ratingBadge}>⭐ Rated {order.rating}/5</span>}
        </div>
        
        <div style={cardStyles.vendorInfo}>
          <h5 style={{ margin: '0 0 0.4rem 0', color: '#009688' }}>🏪 {vendor.name}</h5>
          <div style={{ fontSize: '0.75rem', color: '#4F6F6B' }}>
            📍 {vendor.address} • ⭐ {vendor.rating} • 🕒 {vendor.deliveryTime}
          </div>
          {deliveryPartner && (
            <div style={cardStyles.dpInfo}>🚚 {deliveryPartner.name} • ⭐ {deliveryPartner.rating}</div>
          )}
        </div>
      </div>

      {order.status === 'Delivered' && !order.rated && deliveryPartner && (
        <div style={cardStyles.ratingPrompt}>
          <div>
            <div style={{ fontSize: '0.8rem', color: '#EF6C00', fontWeight: '600', marginBottom: '0.2rem' }}>
              ⭐ Rate your delivery experience
            </div>
            <div style={{ fontSize: '0.7rem', color: '#4F6F6B' }}>Share feedback about {deliveryPartner.name}'s service</div>
          </div>
          <button style={cardStyles.rateButton} onClick={() => showRatingModal(order, deliveryPartner)}>Rate Now</button>
        </div>
      )}

      {!['Delivered', 'Cancelled', 'Returned'].includes(order.status) && (
        <div style={cardStyles.timeInfo}>
          <div>
            <div style={{ fontSize: '0.8rem', color: '#4F6F6B', marginBottom: '0.2rem' }}>📅 Estimated Delivery:</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#4CAF50' }}>
              {formatTime(estimatedDelivery)}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.8rem', color: '#4F6F6B', marginBottom: '0.2rem' }}>🚚 Delivery Time:</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#009688' }}>
              {vendor.deliveryTime}
            </div>
          </div>
        </div>
      )}

      {order.items?.slice(0, 2).map((item, index) => (
        <div key={index} style={cardStyles.itemPreview}>
          <div>
            <div style={{ color: '#124441', fontSize: '0.8rem', fontWeight: '600' }}>💊 {item.name || 'Medicine'}</div>
            {item.prescriptionRequired && <span style={cardStyles.prescriptionBadge}>📄 Prescription Required</span>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={cardStyles.quantityBadge}>Qty: {item.quantity || 1}</span>
            <span style={{ color: '#009688', fontWeight: '700', fontSize: '0.8rem' }}>₹{(item.price || 0) * (item.quantity || 1)}</span>
          </div>
        </div>
      ))}

      <div style={cardStyles.footer}>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <div style={{ color: '#4F6F6B', fontSize: '0.75rem', marginBottom: '0.3rem' }}>
            <strong>📍 Delivery:</strong> {order.deliveryAddress || 'Address not specified'}
          </div>
          <div style={{ color: '#4F6F6B', fontSize: '0.75rem' }}>
            <strong>📅 Ordered:</strong> {new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
        <div style={cardStyles.actionButtons}>
          <button style={cardStyles.viewButton} onClick={() => onViewDetails(order)}>📋 View Details</button>
          {!['Delivered', 'Cancelled', 'Returned'].includes(order.status) && (
            <button style={cardStyles.trackButton} onClick={() => startLiveTracking(order)}>
              🗺️ Live Track
            </button>
          )}
          {order.status === 'Delivered' && !order.rated && deliveryPartner && (
            <button style={cardStyles.rateActionButton} onClick={() => showRatingModal(order, deliveryPartner)}>⭐ Rate</button>
          )}
        </div>
      </div>
    </div>
  );
});

// Main Component
const OrdersView = ({ orders: initialOrders, setActiveView, startLiveTracking }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dateFilter, setDateFilter] = useState('recent');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showRating, setShowRating] = useState(false);
  const [ratingOrder, setRatingOrder] = useState(null);
  const [ratingDeliveryPartner, setRatingDeliveryPartner] = useState(null);
  const [orders, setOrders] = useState(initialOrders || []);

  useEffect(() => { 
    const timer = setInterval(() => setCurrentTime(new Date()), 1000); 
    return () => clearInterval(timer); 
  }, []);
  
  useEffect(() => { 
    setOrders(initialOrders || []); 
  }, [initialOrders]);
  
  useEffect(() => { 
    document.body.style.overflow = selectedOrder || showRating ? 'hidden' : 'auto'; 
    return () => { document.body.style.overflow = 'auto'; }; 
  }, [selectedOrder, showRating]);

  // Default live tracking function if not provided
  const defaultStartLiveTracking = useCallback((order) => {
    const estimatedTime = calculateEstimatedDelivery(order.date);
    const vendor = VENDORS[order.vendorId] || VENDORS[Object.keys(VENDORS)[0]];
    
    alert(`🚚 Live Tracking Started for Order #${order.id}\n\n📊 Order Details:\n• Status: ${order.status}\n• Pharmacy: ${vendor.name}\n• Estimated Delivery: ${formatTime(estimatedTime)}\n• Delivery Time: ${vendor.deliveryTime}\n\n📍 Tracking Features:\n• Real-time GPS location of delivery partner\n• Live route visualization on map\n• Estimated arrival time updates\n• Delivery progress tracking\n• Traffic and route optimization\n\nThis would normally show an interactive map with live tracking.`);
  }, []);

  // Safe function that checks if startLiveTracking exists and is callable
  const handleStartLiveTracking = useCallback((order) => {
    try {
      if (startLiveTracking && typeof startLiveTracking === 'function') {
        startLiveTracking(order);
      } else {
        defaultStartLiveTracking(order);
      }
    } catch (error) {
      console.error('Error starting live tracking:', error);
      defaultStartLiveTracking(order);
    }
  }, [startLiveTracking, defaultStartLiveTracking]);

  const filteredOrders = useMemo(() => {
    if (!orders?.length) return [];
    let filtered = orders;
    const now = new Date();

    // Status filter
    if (statusFilter !== 'all') {
      const statusMap = { 
        delivered: ['Delivered'], 
        cancelled: ['Cancelled'], 
        returned: ['Returned'], 
        confirmed: ['Confirmed'], 
        pending: ['Pending'] 
      };
      if (statusMap[statusFilter]) filtered = filtered.filter(order => statusMap[statusFilter].includes(order.status));
    }

    // Date filter
    const dateRanges = {
      recent: () => { const d = new Date(); d.setDate(d.getDate() - 7); return d; },
      last30days: () => { const d = new Date(); d.setDate(d.getDate() - 30); return d; },
      last6months: () => { const d = new Date(); d.setMonth(d.getMonth() - 6); return d; },
      last1year: () => { const d = new Date(); d.setFullYear(d.getYear() - 1); return d; }
    };
    if (dateRanges[dateFilter]) {
      const startDate = dateRanges[dateFilter]();
      filtered = filtered.filter(order => new Date(order.date) >= startDate && new Date(order.date) <= now);
    }

    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [orders, statusFilter, dateFilter]);

  const openOrderDetails = useCallback((order) => setSelectedOrder(order), []);
  const closeModal = useCallback(() => setSelectedOrder(null), []);
  
  const showRatingModal = useCallback((order, deliveryPartner) => { 
    setRatingOrder(order); 
    setRatingDeliveryPartner(deliveryPartner); 
    setShowRating(true); 
  }, []);
  
  const closeRatingModal = useCallback(() => { 
    setShowRating(false); 
    setRatingOrder(null); 
    setRatingDeliveryPartner(null); 
  }, []);

  const handleRatingSubmit = useCallback((orderId, rating, review) => {
    setOrders(prev => prev.map(order => order.id === orderId ? { ...order, rated: true, rating, review: review || '' } : order));
    console.log(`Rating ${rating}/5 submitted for order ${orderId}`, review ? `with review: ${review}` : '');
  }, []);

  const getFilterButtonStyle = (isActive) => ({
    padding: '0.6rem 0.8rem',
    backgroundColor: isActive ? '#009688' : '#FFFFFF',
    color: isActive ? '#FFFFFF' : '#009688',
    border: '2px solid ' + (isActive ? '#009688' : '#4DB6AC'),
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.8rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    width: '100%',
    textAlign: 'left',
    marginBottom: '0.4rem'
  });

  return (
    <>
      <div style={styles.container}>
        <div style={styles.header}>
          <button style={styles.backButton} onClick={() => setActiveView('medicine')}>← Back to Medicines</button>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <h2 style={styles.title}>Order History & Tracking</h2>
            <p style={styles.subtitle}>Track your medicine orders with real-time updates and 20-30 mins delivery</p>
          </div>
          <div style={styles.timeDisplay}>🕒 {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        </div>

        <div style={styles.mainSection}>
          <h3 style={styles.sectionTitle}>📋 Your Orders <span style={styles.subtitleSmall}>Fast delivery in 20-30 mins • Updates every second</span></h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2rem' }}>
            <div style={styles.filterCard}>
              <h4 style={{ color: '#009688', marginBottom: '1rem' }}> Filters</h4>
              <div style={{ marginBottom: '1.5rem' }}>
                <h5 style={{ color: '#009688', marginBottom: '0.8rem', fontSize: '0.9rem' }}>Order Status</h5>
                {STATUS_FILTERS.map(filter => (
                  <button key={filter.key} style={getFilterButtonStyle(statusFilter === filter.key)} onClick={() => setStatusFilter(filter.key)}>
                    {filter.label}
                  </button>
                ))}
              </div>
              <div>
                <h5 style={{ color: '#009688', marginBottom: '0.8rem', fontSize: '0.9rem' }}>Order Date</h5>
                {DATE_FILTERS.map(filter => (
                  <button key={filter.key} style={getFilterButtonStyle(dateFilter === filter.key)} onClick={() => setDateFilter(filter.key)}>
                    {filter.label}
                  </button>
                ))}
              </div>
              {(statusFilter !== 'all' || dateFilter !== 'recent') && (
                <button style={styles.clearButton} onClick={() => { setStatusFilter('all'); setDateFilter('recent'); }}>Clear All Filters</button>
              )}
              <div style={styles.infoBox}>
                <h5 style={{ color: '#EF6C00', marginBottom: '0.5rem', fontSize: '0.9rem' }}>⭐ Rate Your Delivery</h5>
                <p style={{ fontSize: '0.75rem', color: '#4F6F6B', margin: 0 }}>• Rate your delivery partner after order is delivered<br />• Share your experience<br />• Help improve service quality</p>
              </div>
            </div>

            <div>
              <div style={styles.summaryCard}>
                <div>
                  <h4 style={{ color: '#009688', margin: 0, fontSize: '1.1rem' }}>{filteredOrders.length} Order{filteredOrders.length !== 1 ? 's' : ''} Found</h4>
                  <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.8rem', color: '#4F6F6B' }}>
                    {statusFilter === 'all' ? 'All orders' : statusFilter} • 
                    {dateFilter === 'recent' ? ' Last 7 days' : dateFilter === 'last30days' ? ' Last 30 days' : dateFilter === 'last6months' ? ' Last 6 months' : ' Last 1 year'} • 
                    Updated: {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={styles.deliveryTag}>🚚 Fast 20-30 min delivery</div>
                  {filteredOrders.some(order => order.status === 'Delivered' && !order.rated) && (
                    <div style={styles.ratingTag}>⭐ Rating pending</div>
                  )}
                </div>
              </div>

              {filteredOrders.length === 0 ? (
                <div style={styles.emptyState}>
                  <div style={{ fontSize: '4rem', marginBottom: '1.5rem', opacity: 0.7 }}>📋</div>
                  <h4 style={{ color: '#009688', marginBottom: '1rem' }}>No Orders Found</h4>
                  <p style={{ color: '#4F6F6B', marginBottom: '1.5rem' }}>
                    You haven't placed any orders yet. Start shopping to see your order history here!
                  </p>
                  <button style={styles.shopButton} onClick={() => setActiveView('medicine')}>🛒 Shop Medicines</button>
                </div>
              ) : (
                <div>
                  {filteredOrders.map(order => (
                    <OrderCard 
                      key={order.id} 
                      order={order} 
                      onViewDetails={openOrderDetails} 
                      startLiveTracking={handleStartLiveTracking}
                      showRatingModal={showRatingModal} 
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedOrder && (
        <OrderDetailsModal 
          order={selectedOrder} 
          onClose={closeModal} 
          startLiveTracking={handleStartLiveTracking}
          showRatingModal={showRatingModal} 
        />
      )}
      
      {showRating && ratingOrder && ratingDeliveryPartner && (
        <RatingModal 
          order={ratingOrder} 
          deliveryPartner={ratingDeliveryPartner} 
          onClose={closeRatingModal} 
          onRatingSubmit={handleRatingSubmit} 
        />
      )}
    </>
  );
};

export default OrdersView;