// VendorLogin.js
import React from 'react';
import BaseLogin from './BaseLogin';

const VendorLogin = ({ onLoginSuccess }) => {
  const userDetails = {
    type: 'vendor',
    label: 'Vendor',
    title: 'Vendor Management Portal',
    quote: 'Manage your medical inventory efficiently and reach more customers through our platform',
    emailLabel: 'Business Email',
    emailPlaceholder: 'Enter your business email address',
    features: [
      'Manage product inventory',
      'Process customer orders',
      'Track sales and revenue',
      'Update product listings',
      'Manage store information'
    ]
  };

  return (
    <BaseLogin 
      userType="vendor"
      userDetails={userDetails}
      onLoginSuccess={onLoginSuccess}
    />
  );
};

export default VendorLogin;