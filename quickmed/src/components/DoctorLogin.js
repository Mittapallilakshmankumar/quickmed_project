// DoctorLogin.js
import React from 'react';
import BaseLogin from './BaseLogin';

const DoctorLogin = ({ onLoginSuccess }) => {
  const userDetails = {
    type: 'doctor',
    label: 'Doctor',
    title: 'Healthcare Professional Portal',
    quote: 'Expand your practice and provide exceptional care through our telemedicine platform',
    emailLabel: 'Professional Email',
    emailPlaceholder: 'Enter your professional email',
    features: [
      'Manage patient appointments',
      'Access patient medical history',
      'Provide online consultations',
      'Write digital prescriptions',
      'Track consultation history'
    ]
  };

  return (
    <BaseLogin 
      userType="doctor"
      userDetails={userDetails}
      onLoginSuccess={onLoginSuccess}
    />
  );
};

export default DoctorLogin;