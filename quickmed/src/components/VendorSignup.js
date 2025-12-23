// VendorSignup.js
import React from 'react';
import BaseSignup from './BaseSignup';

const VendorSignup = ({ onSignupSuccess }) => {
  const userDetails = {
    type: 'vendor',
    label: 'Vendor',
    title: 'a Vendor',
    quote: 'Expand your medical business and reach more customers through our platform',
    benefits: [
      'Free listing for first 100 products',
      'Real-time order management',
      'Secure payment processing',
      'Customer analytics dashboard',
      'Dedicated vendor support'
    ],
    customFields: [
      {
        name: 'storeName',
        label: 'Store/Business Name',
        type: 'text',
        placeholder: 'Enter your store or business name',
        required: true
      },
      {
        name: 'businessType',
        label: 'Business Type',
        type: 'select',
        placeholder: 'Select business type',
        required: true,
        options: [
          { value: 'pharmacy', label: 'Pharmacy' },
          { value: 'medical-store', label: 'Medical Store' },
          { value: 'surgical-supplies', label: 'Surgical Supplies' },
          { value: 'ayurvedic', label: 'Ayurvedic Store' },
          { value: 'homeopathy', label: 'Homeopathy Store' },
          { value: 'other', label: 'Other' }
        ]
      },
      {
        name: 'gstNumber',
        label: 'GST Number',
        type: 'text',
        placeholder: 'Enter your GST number',
        required: false
      },
      {
        name: 'storeAddress',
        label: 'Store Address',
        type: 'textarea',
        placeholder: 'Enter your complete store address',
        required: true
      },
      {
        name: 'businessLicense',
        label: 'Business License Number',
        type: 'text',
        placeholder: 'Enter business license number',
        required: true
      }
    ],
    fieldValidations: {
      storeName: {
        required: true,
        message: 'Store name is required'
      },
      businessType: {
        required: true,
        message: 'Please select business type'
      },
      storeAddress: {
        required: true,
        message: 'Store address is required'
      },
      businessLicense: {
        required: true,
        message: 'Business license number is required'
      }
    }
  };

  return (
    <BaseSignup 
      userType="vendor"
      userDetails={userDetails}
      onSignupSuccess={onSignupSuccess}
    />
  );
};

export default VendorSignup;