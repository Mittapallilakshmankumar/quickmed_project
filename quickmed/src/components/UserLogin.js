// UserLogin.js
import React from 'react';
import BaseLogin from './BaseLogin';

const UserLogin = ({ onLoginSuccess }) => {
  const userDetails = {
    type: 'user',
    label: 'Patient/User',
    title: 'Patient & Customer Portal',
    quote: 'Access healthcare services, medicine delivery, and doctor consultations with ease',
    emailLabel: 'Email or Phone',
    emailPlaceholder: 'Enter your email or phone number',
    features: [
      'Book doctor appointments online',
      'Order medicines for delivery',
      'Access medical records securely',
      'Consult with doctors virtually',
      'Track your prescriptions and orders'
    ]
  };

  return (
    <BaseLogin 
      userType="user"
      userDetails={userDetails}
      onLoginSuccess={onLoginSuccess}
    />
  );
};

export default UserLogin;