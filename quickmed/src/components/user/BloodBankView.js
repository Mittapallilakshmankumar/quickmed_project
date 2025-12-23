import React, { useState, useEffect } from 'react';
import './BloodBankView.css';

const BloodBankView = ({ setActiveView, addNotification }) => {
  const [activeTab, setActiveTab] = useState('find');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [location, setLocation] = useState('Bangalore');
  const [donationType, setDonationType] = useState('donate');
  const [pricePerUnit, setPricePerUnit] = useState(1500);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [newRequest, setNewRequest] = useState({
    patientName: '',
    bloodGroup: 'O+',
    units: 1,
    hospital: '',
    urgency: 'High'
  });

  // Real-time states
  const [availableDonors, setAvailableDonors] = useState([]);
  const [showDonorsList, setShowDonorsList] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [userResponses, setUserResponses] = useState({});
  const [sharedRequests, setSharedRequests] = useState([]);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedBloodBank, setSelectedBloodBank] = useState(null);
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('10:00');

  // Initialize with dummy data
  const initialDonationHistory = [
    {
      id: 'DON001',
      date: '2023-12-15',
      venue: 'City Blood Bank',
      units: 1,
      type: 'Whole Blood',
      status: 'Completed',
      donorName: 'You',
      contact: '+91 9876543210'
    },
    {
      id: 'DON002',
      date: '2023-06-20',
      venue: 'Red Cross Camp',
      units: 1,
      type: 'Platelets',
      status: 'Completed',
      donorName: 'You',
      contact: '+91 9876543210'
    }
  ];

  const initialRequests = [
    {
      id: 'REQ001',
      patientName: 'Rahul Kumar',
      bloodGroup: 'B+',
      units: 2,
      hospital: 'City General Hospital',
      location: 'Bangalore',
      urgency: 'Critical',
      date: '2024-01-20',
      status: 'Active',
      timeAgo: '2 hours ago',
      contact: '+91 9876543211',
      distance: '3.2 km',
      patientContact: '+91 9876543211',
      hospitalAddress: '123 Hospital Road, Bangalore',
      requiredBy: '2024-01-21',
      notes: 'Emergency surgery required'
    },
    {
      id: 'REQ002',
      patientName: 'Priya Singh',
      bloodGroup: 'O-',
      units: 1,
      hospital: 'Medicare Center',
      location: 'Bangalore',
      urgency: 'High',
      date: '2024-01-19',
      status: 'Active',
      timeAgo: '5 hours ago',
      contact: '+91 9876543212',
      distance: '1.8 km',
      patientContact: '+91 9876543212',
      hospitalAddress: '456 Medical Street, Bangalore',
      requiredBy: '2024-01-20',
      notes: 'Accident victim'
    },
    {
      id: 'REQ003',
      patientName: 'Dr. Anand',
      bloodGroup: 'AB+',
      units: 3,
      hospital: 'Apollo Hospital',
      location: 'Bangalore',
      urgency: 'Medium',
      date: '2024-01-19',
      status: 'Active',
      timeAgo: '1 day ago',
      contact: '+91 9876543213',
      distance: '4.5 km',
      patientContact: '+91 9876543213',
      hospitalAddress: '789 Health Avenue, Bangalore',
      requiredBy: '2024-01-22',
      notes: 'Regular transfusion'
    }
  ];

  const [donationHistory, setDonationHistory] = useState(initialDonationHistory);
  const [requests, setRequests] = useState(initialRequests);

  // Real-time blood banks
  const [bloodBanks] = useState([
    {
      id: 1,
      name: 'City Blood Bank',
      address: '123 MG Road, Bangalore',
      distance: '1.5 km',
      rating: 4.5,
      availableGroups: {
        'A+': { units: 12, lastUpdated: '10 mins ago' },
        'B+': { units: 8, lastUpdated: '15 mins ago' },
        'O+': { units: 15, lastUpdated: '5 mins ago' },
        'AB+': { units: 5, lastUpdated: '30 mins ago' },
        'O-': { units: 3, lastUpdated: '1 hour ago' }
      },
      contact: '+91 80 23456789',
      timing: '24/7',
      image: 'https://imabbua.org.in/UserFiles/images/imabloodbank/ima-blood-bank.jpg',
      status: 'Open',
      waitTime: '15 mins'
    },
    {
      id: 2,
      name: 'Red Cross Blood Center',
      address: '456 Brigade Road, Bangalore',
      distance: '2.3 km',
      rating: 4.7,
      availableGroups: {
        'A+': { units: 20, lastUpdated: '2 mins ago' },
        'B+': { units: 12, lastUpdated: '5 mins ago' },
        'O+': { units: 25, lastUpdated: 'Just now' },
        'AB+': { units: 8, lastUpdated: '10 mins ago' },
        'A-': { units: 6, lastUpdated: '20 mins ago' },
        'B-': { units: 4, lastUpdated: '25 mins ago' },
        'O-': { units: 7, lastUpdated: '15 mins ago' },
        'AB-': { units: 2, lastUpdated: '1 hour ago' }
      },
      contact: '+91 80 23456790',
      timing: '8:00 AM - 8:00 PM',
      image: 'https://content.jdmagicbox.com/v2/comp/hyderabad/85/040p7315985/catalogue/red-cross-blood-bank-vidya-nagar-hyderabad-blood-banks-z9vkxpbue8.jpg',
      status: 'Open',
      waitTime: '30 mins'
    }
  ]);

  const bloodCompatibility = {
    'O-': ['O-', 'O+', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
    'O+': ['O+', 'A+', 'B+', 'AB+'],
    'A-': ['A-', 'A+', 'AB-', 'AB+'],
    'A+': ['A+', 'AB+'],
    'B-': ['B-', 'B+', 'AB-', 'AB+'],
    'B+': ['B+', 'AB+'],
    'AB-': ['AB-', 'AB+'],
    'AB+': ['AB+']
  };

  const userProfile = {
    bloodGroup: 'O+',
    lastDonation: '2023-12-15',
    eligible: true,
    nextEligibleDate: '2024-03-15',
    totalDonations: 2,
    availableForDonation: true,
    phone: '+91 9876543210',
    name: 'Your Name'
  };

  // Initialize schedule date
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setScheduleDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const updateTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return `${Math.max(1, diffMins)} minute${diffMins !== 1 ? 's' : ''} ago`;
  };

  // BackButton Component
  const BackButton = ({ onClick, text = 'Back' }) => (
    <button 
      className="back-button"
      onClick={onClick}
      type="button"
    >
      ← {text}
    </button>
  );

  const findDonors = () => {
    if (!bloodGroup || !location) {
      addNotification('Error', 'Please select blood group and location', 'error');
      return;
    }

    // Generate real-time dummy donors based on search
    const donors = [
      { 
        id: 1,
        name: 'Amit Sharma', 
        bloodGroup: bloodGroup, 
        age: 28,
        distance: '2.1 km', 
        lastActive: '5 mins ago', 
        available: true,
        rating: 4.8,
        totalDonations: 12,
        responseTime: '5-10 mins',
        lastDonation: '2024-01-10',
        phone: '+91 98765XXXXX',
        location: location,
        verified: true
      },
      { 
        id: 2,
        name: 'Sneha Patel', 
        bloodGroup: bloodGroup, 
        age: 32,
        distance: '3.4 km', 
        lastActive: '10 mins ago', 
        available: true,
        rating: 4.5,
        totalDonations: 8,
        responseTime: '10-15 mins',
        lastDonation: '2024-01-05',
        phone: '+91 98766XXXXX',
        location: location,
        verified: true
      },
      { 
        id: 3,
        name: 'Raj Mehta', 
        bloodGroup: bloodGroup === 'O+' ? 'O-' : bloodGroup, 
        age: 35,
        distance: '1.2 km', 
        lastActive: '15 mins ago', 
        available: false,
        rating: 4.7,
        totalDonations: 15,
        responseTime: 'Unavailable',
        lastDonation: '2024-01-15',
        phone: '+91 98767XXXXX',
        location: location,
        verified: true
      },
      { 
        id: 4,
        name: 'Anjali Gupta', 
        bloodGroup: bloodGroup, 
        age: 26,
        distance: '4.2 km', 
        lastActive: 'Just now', 
        available: true,
        rating: 4.9,
        totalDonations: 5,
        responseTime: '2-5 mins',
        lastDonation: '2023-12-20',
        phone: '+91 98768XXXXX',
        location: location,
        verified: true
      }
    ];
    
    setAvailableDonors(donors);
    setShowDonorsList(true);
    addNotification('Donors Found', `Found ${donors.filter(d => d.available).length} ${bloodGroup} donors near ${location}`, 'success');
  };

  const requestBlood = () => {
    if (!newRequest.patientName || !newRequest.hospital) {
      addNotification('Error', 'Please fill all required fields', 'error');
      return;
    }

    if (newRequest.units < 1 || newRequest.units > 10) {
      addNotification('Error', 'Units must be between 1 and 10', 'error');
      return;
    }

    const newRequestObj = {
      id: `REQ${Date.now()}`,
      ...newRequest,
      location: location,
      date: new Date().toISOString().split('T')[0],
      status: 'Active',
      timeAgo: 'Just now',
      contact: userProfile.phone,
      distance: 'Your location',
      patientContact: userProfile.phone,
      hospitalAddress: newRequest.hospital + ', ' + location,
      requiredBy: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      notes: 'Urgent requirement'
    };
    
    setRequests(prev => [newRequestObj, ...prev]);
    setShowRequestForm(false);
    setNewRequest({
      patientName: '',
      bloodGroup: 'O+',
      units: 1,
      hospital: '',
      urgency: 'High'
    });
    
    addNotification('Success', `Blood request submitted for ${newRequest.bloodGroup}`, 'success');
  };

  // Handle "I Can Donate" button click
  const handleDonateClick = (request) => {
    setSelectedRequest(request);
    setShowDonationModal(true);
  };

  // Handle "Share Request" button click
  const handleShareClick = (request) => {
    setSelectedRequest(request);
    setShowShareModal(true);
  };

  // Handle "Schedule Donation" button click
  const handleScheduleDonation = (bloodBank) => {
    setSelectedBloodBank(bloodBank);
    setShowScheduleModal(true);
  };

  // Confirm Donation Process
  const confirmDonation = () => {
    if (!selectedRequest) return;

    // Add user to responders list
    setUserResponses(prev => ({
      ...prev,
      [selectedRequest.id]: {
        status: 'pending',
        timestamp: new Date().toISOString(),
        donorName: userProfile.name,
        donorBloodGroup: userProfile.bloodGroup,
        donorContact: userProfile.phone
      }
    }));

    // Update request status
    setRequests(prev => prev.map(req => 
      req.id === selectedRequest.id 
        ? { 
            ...req, 
            pendingDonors: (req.pendingDonors || 0) + 1,
            lastUpdated: new Date().toISOString()
          }
        : req
    ));

    addNotification('Donation Offer Sent', 'Your offer has been sent to the patient', 'success');
    setShowDonationModal(false);
  };

  // Confirm Schedule Donation
  const confirmScheduleDonation = () => {
    if (!selectedBloodBank || !scheduleDate || !scheduleTime) {
      addNotification('Error', 'Please select date and time', 'error');
      return;
    }

    const newDonation = {
      id: `DON${Date.now()}`,
      date: scheduleDate,
      time: scheduleTime,
      venue: selectedBloodBank.name,
      units: 1,
      type: donationType === 'sell' ? 'Sold' : 'Donated',
      status: 'Scheduled',
      donorName: 'You',
      contact: userProfile.phone,
      price: donationType === 'sell' ? pricePerUnit : null,
      address: selectedBloodBank.address,
      confirmationCode: 'BDB' + Math.floor(1000 + Math.random() * 9000)
    };
    
    setDonationHistory(prev => [newDonation, ...prev]);
    
    addNotification(
      'Appointment Scheduled',
      `${donationType === 'sell' ? 'Blood selling' : 'Blood donation'} scheduled at ${selectedBloodBank.name} on ${scheduleDate} at ${scheduleTime}`,
      'success'
    );
    
    setShowScheduleModal(false);
  };

  // Share Request Functionality
  const shareRequest = (platform) => {
    if (!selectedRequest) return;

    const shareMessage = `URGENT: ${selectedRequest.patientName} needs ${selectedRequest.units} unit(s) of ${selectedRequest.bloodGroup} blood at ${selectedRequest.hospital}. Please help!`;
    const shareUrl = `https://bloodbankapp.com/request/${selectedRequest.id}`;

    switch(platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareMessage + ' ' + shareUrl)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareMessage)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'sms':
        window.open(`sms:?body=${encodeURIComponent(shareMessage + ' ' + shareUrl)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(shareMessage + ' ' + shareUrl);
        addNotification('Copied!', 'Request link copied to clipboard', 'success');
        break;
    }

    // Track sharing
    setSharedRequests(prev => [...prev, {
      requestId: selectedRequest.id,
      platform,
      timestamp: new Date().toISOString()
    }]);

    addNotification('Shared', `Request shared via ${platform}`, 'success');
    setShowShareModal(false);
  };

  // Update blood request
  const updateBloodRequest = (requestId, updates) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, ...updates } : req
    ));
    addNotification('Request Updated', 'Blood request has been updated', 'success');
  };

  const deleteBloodRequest = (requestId) => {
    setRequests(prev => prev.filter(req => req.id !== requestId));
    addNotification('Request Removed', 'Blood request has been removed', 'success');
  };

  const contactDonor = (donor) => {
    addNotification('Contacting', `Connecting you with ${donor.name}...`, 'info');
    // In real app, this would initiate call/SMS
    setTimeout(() => {
      addNotification('Connected', `You can now contact ${donor.name} at ${donor.phone}`, 'success');
    }, 2000);
  };

  // Donation Modal Component
  const DonationModal = () => (
    <div className="modal-overlay" onClick={() => setShowDonationModal(false)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">Offer to Donate Blood</div>
        <div className="modal-content">
          <div className="request-detail">
            <div className="request-detail-title">Patient Details:</div>
            <div><strong>Name:</strong> {selectedRequest?.patientName}</div>
            <div><strong>Blood Group:</strong> {selectedRequest?.bloodGroup}</div>
            <div><strong>Hospital:</strong> {selectedRequest?.hospital}</div>
            <div><strong>Units Required:</strong> {selectedRequest?.units}</div>
            <div><strong>Contact:</strong> {selectedRequest?.patientContact}</div>
            <div><strong>Urgency:</strong> {selectedRequest?.urgency}</div>
          </div>
          
          <div className="donor-response">
            <div className="donor-response-title">Your Information:</div>
            <div><strong>Name:</strong> {userProfile.name}</div>
            <div><strong>Blood Group:</strong> {userProfile.bloodGroup}</div>
            <div><strong>Contact:</strong> {userProfile.phone}</div>
            <div className="compatibility-info">
              ✓ <strong>Compatible:</strong> You can donate to {selectedRequest?.bloodGroup} patients
            </div>
          </div>

          <div className="donation-note">
            <div className="note-title">Note:</div>
            <div className="note-content">
              Your contact information will be shared with the patient. They will contact you directly to arrange the donation.
            </div>
          </div>
        </div>
        <div className="action-buttons">
          <button className="btn btn-primary" onClick={confirmDonation}>
            Confirm Donation Offer
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={() => setShowDonationModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  // Schedule Modal Component
  const ScheduleModal = () => (
    <div className="modal-overlay" onClick={() => setShowScheduleModal(false)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">Schedule {donationType === 'sell' ? 'Blood Selling' : 'Blood Donation'}</div>
        <div className="modal-content">
          <div className="request-detail">
            <div className="request-detail-title">Blood Bank Details:</div>
            <div><strong>Name:</strong> {selectedBloodBank?.name}</div>
            <div><strong>Address:</strong> {selectedBloodBank?.address}</div>
            <div><strong>Contact:</strong> {selectedBloodBank?.contact}</div>
            <div><strong>Timing:</strong> {selectedBloodBank?.timing}</div>
            {donationType === 'sell' && (
              <div><strong>Price per unit:</strong> ₹{pricePerUnit}</div>
            )}
          </div>

          <div className="schedule-form">
            <div className="form-group">
              <label className="form-label">Select Date *</label>
              <input
                type="date"
                className="form-input"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Select Time *</label>
              <select 
                className="form-select"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
              >
                <option value="09:00">09:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="14:00">02:00 PM</option>
                <option value="15:00">03:00 PM</option>
                <option value="16:00">04:00 PM</option>
              </select>
            </div>
            
            <div className="reminder-note">
              <div className="note-title">Reminder:</div>
              <div className="note-content">
                • Get proper sleep before donation<br/>
                • Eat a healthy meal 2-3 hours before<br/>
                • Drink plenty of water<br/>
                • Carry your ID proof
              </div>
            </div>
          </div>
        </div>
        <div className="action-buttons">
          <button className="btn btn-primary" onClick={confirmScheduleDonation}>
            Confirm Appointment
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={() => setShowScheduleModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  // Share Modal Component
  const ShareModal = () => (
    <div className="modal-overlay" onClick={() => setShowShareModal(false)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">Share Blood Request</div>
        <div className="modal-content">
          <div className="request-detail">
            <div className="request-detail-title">Request Details:</div>
            <div><strong>{selectedRequest?.patientName}</strong> needs {selectedRequest?.units} unit(s) of {selectedRequest?.bloodGroup}</div>
            <div>Hospital: {selectedRequest?.hospital}</div>
            <div>Urgency: {selectedRequest?.urgency}</div>
          </div>
          
          <div className="share-buttons">
            <button 
              className="share-btn whatsapp"
              onClick={() => shareRequest('whatsapp')}
            >
              <span className="share-icon">📱</span>
              WhatsApp
            </button>
            
            <button 
              className="share-btn facebook"
              onClick={() => shareRequest('facebook')}
            >
              <span className="share-icon">👥</span>
              Facebook
            </button>
            
            <button 
              className="share-btn twitter"
              onClick={() => shareRequest('twitter')}
            >
              <span className="share-icon">🐦</span>
              Twitter
            </button>
            
            <button 
              className="share-btn sms"
              onClick={() => shareRequest('sms')}
            >
              <span className="share-icon">💬</span>
              SMS
            </button>
            
            <button 
              className="share-btn copy"
              onClick={() => shareRequest('copy')}
            >
              <span className="share-icon">📋</span>
              Copy Link
            </button>
          </div>
        </div>
        <div className="modal-footer">
          <button 
            className="btn btn-secondary close-btn" 
            onClick={() => setShowShareModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  // Donors List Component
  const DonorsList = () => (
    <div className="content-section">
      <div className="donors-list-header">
        <h3>👥 Available Donors for {bloodGroup} in {location}</h3>
        <button 
          className="btn btn-secondary"
          onClick={() => setShowDonorsList(false)}
        >
          Back to Search
        </button>
      </div>
      
      <div className="search-results-info">
        <div className="results-title">Search Results:</div>
        <div>Found {availableDonors.length} donors • {availableDonors.filter(d => d.available).length} currently available</div>
      </div>
      
      <div className="donors-grid">
        {availableDonors.map(donor => (
          <div key={donor.id} className="donor-card">
            <div className="donor-header">
              <div className={`donor-avatar ${donor.available ? 'available' : 'unavailable'}`}>
                {donor.name.charAt(0)}
              </div>
              <div className="donor-info">
                <div className="donor-name-row">
                  <div className="donor-name">{donor.name}</div>
                  <div className={`availability-badge ${donor.available ? 'available' : 'unavailable'}`}>
                    {donor.available ? 'Available' : 'Not Available'}
                  </div>
                </div>
                <div className="donor-details">{donor.age} years • {donor.distance} away</div>
              </div>
            </div>
            
            <div className="donor-stats">
              <div className="stat-row">
                <span className="stat-label">Blood Group:</span>
                <span className="stat-value blood-group">{donor.bloodGroup}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Total Donations:</span>
                <span className="stat-value">{donor.totalDonations}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Rating:</span>
                <span className="stat-value">⭐ {donor.rating}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Response Time:</span>
                <span className="stat-value">{donor.responseTime}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Last Active:</span>
                <span className="stat-value time-ago">{donor.lastActive}</span>
              </div>
            </div>
            
            <div className="action-buttons">
              <button 
                className="btn btn-primary full-width"
                onClick={() => contactDonor(donor)}
                disabled={!donor.available}
              >
                {donor.available ? 'Contact Donor' : 'Currently Unavailable'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const FindBloodTab = () => (
    <div className="content-section">
      <div className="last-updated">
        {/* <span className="live-indicator">
          <span className="live-dot"></span>
          Live Updated: {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span> */}
      </div>

      {!showDonorsList ? (
        <>
          <h3>🔍 Find Blood</h3>
          
          <div className="search-section">
            <div className="form-group">
              <label className="form-label">Blood Group Needed</label>
              <select 
                className="form-select"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Location</label>
              <input
                type="text"
                placeholder="Enter location"
                className="form-input"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            
            <div className="search-buttons">
              <button className="btn btn-primary" onClick={findDonors}>
                Find Donors
              </button>
              
              <button 
                className="btn btn-danger" 
                onClick={() => setShowRequestForm(!showRequestForm)}
              >
                {showRequestForm ? 'Cancel Request' : '+ Request Blood'}
              </button>
            </div>
          </div>

          {/* Request Blood Form */}
          {showRequestForm && (
            <div className="request-form-container">
              <h4>➕ New Blood Request</h4>
              <div className="search-section">
                <div className="form-group">
                  <label className="form-label">Patient Name *</label>
                  <input
                    type="text"
                    placeholder="Enter patient name"
                    className="form-input"
                    value={newRequest.patientName}
                    onChange={(e) => setNewRequest({...newRequest, patientName: e.target.value})}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Blood Group *</label>
                  <select 
                    className="form-select"
                    value={newRequest.bloodGroup}
                    onChange={(e) => setNewRequest({...newRequest, bloodGroup: e.target.value})}
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Units Required * (1-10)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    className="form-input"
                    value={newRequest.units}
                    onChange={(e) => setNewRequest({...newRequest, units: parseInt(e.target.value) || 1})}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Hospital *</label>
                  <input
                    type="text"
                    placeholder="Hospital name"
                    className="form-input"
                    value={newRequest.hospital}
                    onChange={(e) => setNewRequest({...newRequest, hospital: e.target.value})}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Urgency *</label>
                  <select 
                    className="form-select"
                    value={newRequest.urgency}
                    onChange={(e) => setNewRequest({...newRequest, urgency: e.target.value})}
                  >
                    <option value="Critical">Critical (Immediate)</option>
                    <option value="High">High (Within 24 hours)</option>
                    <option value="Medium">Medium (1-3 days)</option>
                  </select>
                </div>
                
                <div className="action-buttons">
                  <button className="btn btn-primary" onClick={requestBlood}>
                    Submit Request
                  </button>
                  <button 
                    className="btn btn-secondary" 
                    onClick={() => setShowRequestForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Active Blood Requests */}
          <div className="active-requests">
            <h4>🚨 Active Blood Requests ({requests.filter(req => req.status === 'Active').length})</h4>
            {requests.filter(req => req.status === 'Active').map(request => {
              const userResponse = userResponses[request.id];
              
              return (
                <div 
                  key={request.id} 
                  className={`request-card urgency-${request.urgency.toLowerCase()}`}
                >
                  <div className="request-header">
                    <div className="request-info">
                      <div className="patient-name">
                        {request.patientName}
                      </div>
                      <div className="blood-requirement">
                        🩸 Needs {request.units} unit(s) of <strong>{request.bloodGroup}</strong>
                      </div>
                      <div className="hospital-info">
                        🏥 {request.hospital}, {request.location}
                      </div>
                      <div className="request-meta">
                        📞 {request.contact} • 📍 {request.distance} • {request.timeAgo}
                      </div>
                    </div>
                    <div className={`urgency-badge ${request.urgency.toLowerCase()}`}>
                      {request.urgency}
                    </div>
                  </div>

                  {/* Show user's response status if they responded */}
                  {userResponse && (
                    <div className={`response-status ${userResponse.status}`}>
                      {userResponse.status === 'pending' ? (
                        <>⏳ Your donation offer is pending approval...</>
                      ) : userResponse.status === 'accepted' ? (
                        <>
                          ✅ <strong>Offer Accepted!</strong> Contact {request.patientName} at {userResponse.patientContact}
                        </>
                      ) : (
                        <>❌ Your offer was declined. Thank you for your willingness to help!</>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  {request.contact === userProfile.phone ? (
                    <div className="action-buttons">
                      <button 
                        className="btn btn-secondary"
                        onClick={() => updateBloodRequest(request.id, { units: request.units + 1 })}
                      >
                        + Add Unit
                      </button>
                      <button 
                        className="btn btn-secondary"
                        onClick={() => updateBloodRequest(request.id, { status: 'Fulfilled' })}
                      >
                        Mark as Fulfilled
                      </button>
                      <button 
                        className="btn btn-danger"
                        onClick={() => deleteBloodRequest(request.id)}
                      >
                        Delete Request
                      </button>
                    </div>
                  ) : (
                    <div className="action-buttons">
                      <button 
                        className="btn btn-primary"
                        onClick={() => handleDonateClick(request)}
                        disabled={userResponse}
                      >
                        {userResponse ? 'Offer Sent ✓' : 'I Can Donate'}
                      </button>
                      <button 
                        className="btn btn-info"
                        onClick={() => handleShareClick(request)}
                      >
                        Share Request
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <DonorsList />
      )}
    </div>
  );

  const DonateTab = () => (
    <div className="content-section">
      <div className="last-updated">
        <span className="live-indicator">
          <span className="live-dot"></span>
          Live Inventory Updated
        </span>
      </div>

      <h3>🏥 Nearby Blood Banks</h3>
      
      <div className="donation-type-selector">
        <div className="donation-tabs">
          <button
            className={`donation-tab ${donationType === 'donate' ? 'active' : ''}`}
            onClick={() => setDonationType('donate')}
          >
            🩸 Donate Blood
          </button>
          <button
            className={`donation-tab ${donationType === 'sell' ? 'active' : ''}`}
            onClick={() => setDonationType('sell')}
          >
            💰 Sell Blood
          </button>
        </div>
        
        {donationType === 'sell' && (
          <div className="price-selector">
            <div className="price-title">
              💰 Sell Your Blood Plasma/Platelets
            </div>
            <div className="price-controls">
              <span className="price-label">Price per unit:</span>
              <select 
                className="price-select"
                value={pricePerUnit}
                onChange={(e) => setPricePerUnit(parseInt(e.target.value))}
              >
                <option value="1000">₹1,000</option>
                <option value="1500">₹1,500</option>
                <option value="2000">₹2,000</option>
                <option value="2500">₹2,500</option>
              </select>
              <span className="price-note">
                (Price varies by blood type and component)
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="blood-banks-grid">
        {bloodBanks.map(bank => (
          <div key={bank.id} className="blood-bank-card">
            <div className="bank-header">
              <img src={bank.image} alt={bank.name} className="bank-image" />
              <div className="bank-info">
                <div className="bank-name">{bank.name}</div>
                <div className="bank-address">{bank.address}</div>
                <div className={`status-badge ${bank.status.toLowerCase()}`}>
                  {bank.status} {bank.waitTime && bank.status === 'Open' && `• ${bank.waitTime} wait`}
                </div>
              </div>
            </div>
            
            <div className="inventory-section">
              <div className="inventory-title">
                Live Inventory:
              </div>
              <div className="inventory-tags">
                {Object.entries(bank.availableGroups).map(([group, data]) => (
                  <div 
                    key={group}
                    className={`inventory-tag ${group === userProfile.bloodGroup ? 'user-group' : ''}`}
                    title={`${data.units} units available, updated ${data.lastUpdated}`}
                  >
                    {group}: {data.units}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="action-buttons">
              <button 
                className="btn btn-primary full-width"
                onClick={() => handleScheduleDonation(bank)}
                disabled={!userProfile.eligible || bank.status === 'Closed'}
              >
                {donationType === 'sell' ? `Sell Blood for ₹${pricePerUnit}` : 'Schedule Donation'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const HistoryTab = () => (
    <div className="content-section">
      <h3>📋 Your Activities</h3>
      
      <div className="history-grid">
        {/* Your Requests */}
        <div className="history-column">
          <h4>Your Blood Requests</h4>
          {requests.filter(r => r.contact === userProfile.phone).length > 0 ? (
            requests.filter(r => r.contact === userProfile.phone).map(request => (
              <div key={request.id} className="history-item request-item">
                <div className="item-title">{request.patientName}</div>
                <div className="item-details">{request.bloodGroup} • {request.units} unit(s)</div>
                <div className="item-time">{request.timeAgo}</div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              No active requests
            </div>
          )}
        </div>

        {/* Your Donation History */}
        <div className="history-column">
          <h4>Donation History</h4>
          {donationHistory.length > 0 ? (
            donationHistory.slice(0, 3).map(donation => (
              <div key={donation.id} className={`history-item ${donation.type === 'Sold' ? 'sold' : 'donated'}`}>
                <div className="item-title">{donation.type} #{donation.id}</div>
                <div className="item-details">{donation.venue}</div>
                <div className="item-time">{donation.date}</div>
                {donation.price && (
                  <div className="item-price">
                    Amount: ₹{donation.price}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="empty-state">
              No donation history
            </div>
          )}
        </div>

        {/* Shared Requests */}
        <div className="history-column">
          <h4>Shared Requests</h4>
          {sharedRequests.length > 0 ? (
            sharedRequests.slice(0, 3).map((share, index) => {
              const request = requests.find(r => r.id === share.requestId);
              if (!request) return null;
              
              return (
                <div key={index} className="history-item shared-item">
                  <div className="item-title">{request.patientName}</div>
                  <div className="item-details">Shared via {share.platform}</div>
                  <div className="item-time">
                    {new Date(share.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="empty-state">
              No shared requests
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const CompatibilityTab = () => (
    <div className="content-section">
      <h3>🩸 Blood Group Compatibility</h3>
      
      <div className="user-blood-group">
        <div className="user-blood-title">
          Your Blood Group: <span className="user-blood-value">{userProfile.bloodGroup}</span>
        </div>
        <div className="compatibility-info">
          You can donate to: {bloodCompatibility[userProfile.bloodGroup].join(', ')}
        </div>
      </div>

      <div className="compatibility-grid">
        {Object.entries(bloodCompatibility).map(([group, compatible]) => (
          <div 
            key={group} 
            className={`compatibility-card ${group === userProfile.bloodGroup ? 'user-blood' : ''}`}
          >
            <div className="blood-group-title">
              {group}
            </div>
            <div className="compatibility-label">
              Can donate to:
            </div>
            <div className="compatibility-tags">
              {compatible.map(bg => (
                <span 
                  key={bg}
                  className={`compatibility-tag ${
                    bg === userProfile.bloodGroup ? 'same-group' : 
                    compatible.includes(userProfile.bloodGroup) ? 'compatible' : ''
                  }`}
                >
                  {bg}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bloodbank-container">
      {/* Header Row */}
      <div className="header-row">
        <BackButton onClick={() => setActiveView('dashboard')} text="Dashboard" />
        
        <div className="title-section">
          <h1 className="page-title">Blood Bank 🩸</h1>
          <p className="page-subtitle">Find blood donors, donate blood, save lives • Live Updates</p>
        </div>

        <div className="live-indicator-container">
          <span className="live-indicator">
            <span className="live-dot pulse"></span>
            LIVE
          </span>
        </div>
      </div>

      {/* User Profile Header */}
      <div className="profile-header">
        <div className="profile-card">
          <div className="profile-icon">
            {userProfile.bloodGroup}
          </div>
          <div className="profile-info">
            <div className="profile-title">
              Blood Donor Profile
            </div>
            <div className="profile-status">
              {userProfile.eligible ? '✓ Ready to donate/sell' : `Next eligible: ${userProfile.nextEligibleDate}`}
            </div>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-value">{userProfile.totalDonations}</div>
            <div className="stat-label">Total Donations</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{requests.filter(r => r.contact === userProfile.phone).length}</div>
            <div className="stat-label">Active Requests</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{Object.keys(userResponses).length}</div>
            <div className="stat-label">Donation Offers</div>
          </div>
          <div className="stat-item">
            <div className={`stat-value ${userProfile.eligible ? 'eligible' : 'not-eligible'}`}>
              {userProfile.eligible ? 'YES' : 'NO'}
            </div>
            <div className="stat-label">Can Donate Now</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-container">
        {[
          { id: 'find', label: 'Find Blood', icon: '🔍' },
          { id: 'donate', label: 'Donate/Sell', icon: '🏥' },
          { id: 'history', label: 'History', icon: '📋' },
          { id: 'compatibility', label: 'Compatibility', icon: '🩸' }
        ].map(tab => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label responsive-hide">{tab.label}</span>
          </button>
        ))}
      </div>

      {activeTab === 'find' && <FindBloodTab />}
      {activeTab === 'donate' && <DonateTab />}
      {activeTab === 'history' && <HistoryTab />}
      {activeTab === 'compatibility' && <CompatibilityTab />}

      {/* Modals */}
      {showDonationModal && <DonationModal />}
      {showShareModal && <ShareModal />}
      {showScheduleModal && <ScheduleModal />}
    </div>
  );
};

export default BloodBankView;