// DeliveryLogin.js
import React from 'react';
import BaseLogin from './BaseLogin';

const DeliveryLogin = ({ onLoginSuccess }) => {
  const userDetails = {
    type: 'delivery',
    label: 'Delivery Partner',
    title: 'Medical Delivery Portal',
    quote: 'Join our network of healthcare heroes delivering medicines and supplies to those in need',
    emailLabel: 'Partner Email',
    emailPlaceholder: 'Enter your partner email',
    features: [
      'View delivery assignments',
      'Track delivery routes',
      'Update delivery status',
      'Earn delivery commissions',
      'Access customer feedback'
    ]
  };

  return (
    <BaseLogin 
      userType="delivery"
      userDetails={userDetails}
      onLoginSuccess={onLoginSuccess}
    />
  );
};

export default DeliveryLogin;