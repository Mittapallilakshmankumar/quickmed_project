// UserSignup.js
import React, { useState } from 'react';
import BaseSignup from './BaseSignup';

const UserSignup = ({ onSignupSuccess }) => {
  const [linkedAccounts, setLinkedAccounts] = useState({
    guardian: false,
    wife: false
  });

  const userDetails = {
    type: 'user',
    label: 'Patient/User',
    title: 'a Patient',
    quote: 'Join thousands of patients accessing quality healthcare services online',
    benefits: [
      'Free doctor consultations for first month',
      'Medicine delivery within 2 hours',
      'Access to medical records 24/7',
      'Discounts on health products',
      'Priority customer support',
      'Add family members for shared access'
    ],
    customFields: [
      {
        name: 'dateOfBirth',
        label: 'Date of Birth',
        type: 'date',
        placeholder: 'Select your date of birth',
        required: true
      },
      {
        name: 'gender',
        label: 'Gender',
        type: 'select',
        placeholder: 'Select gender',
        required: true,
        options: [
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
          { value: 'other', label: 'Other' },
          { value: 'prefer-not-to-say', label: 'Prefer not to say' }
        ]
      },
      {
        name: 'address',
        label: 'Delivery Address',
        type: 'textarea',
        placeholder: 'Enter your complete address for medicine delivery',
        required: true
      },
      {
        name: 'emergencyContact',
        label: 'Emergency Contact Number',
        type: 'tel',
        placeholder: 'Enter emergency contact number',
        required: false
      },
      {
        name: 'allowLinkedAccounts',
        label: 'Enable Linked Accounts',
        type: 'checkbox',
        placeholder: '',
        required: false
      }
    ],
    fieldValidations: {
      dateOfBirth: {
        required: true,
        message: 'Date of birth is required'
      },
      gender: {
        required: true,
        message: 'Please select your gender'
      },
      address: {
        required: true,
        message: 'Address is required for delivery'
      }
    },
    extraStep: {
      title: 'Set Up Linked Accounts',
      content: (
        <div className="linked-accounts-step">
          <h4>Add family members who can access your account</h4>
          <p className="step-description">
            These members can log in with your phone number and OTP, 
            but will have limited permissions as per their role.
          </p>
          
          <div className="linked-account-option">
            <label className="account-option-label">
              <input
                type="checkbox"
                checked={linkedAccounts.guardian}
                onChange={(e) => setLinkedAccounts(prev => ({
                  ...prev,
                  guardian: e.target.checked
                }))}
              />
              <div className="account-option-content">
                <strong>Guardian Access</strong>
                <small>For parents or legal guardians to manage your healthcare</small>
                <ul className="permissions-list">
                  <li>View medical records</li>
                  <li>Book appointments</li>
                  <li>Track deliveries</li>
                  <li>Emergency access</li>
                </ul>
              </div>
            </label>
          </div>
          
          <div className="linked-account-option">
            <label className="account-option-label">
              <input
                type="checkbox"
                checked={linkedAccounts.wife}
                onChange={(e) => setLinkedAccounts(prev => ({
                  ...prev,
                  wife: e.target.checked
                }))}
              />
              <div className="account-option-content">
                <strong>Spouse Access</strong>
                <small>For your spouse to manage family healthcare</small>
                <ul className="permissions-list">
                  <li>View family records</li>
                  <li>Book appointments</li>
                  <li>Order medicines</li>
                  <li>Manage prescriptions</li>
                </ul>
              </div>
            </label>
          </div>
          
          <div className="security-note">
            <p>⚠️ <strong>Security Note:</strong></p>
            <p>Linked accounts use the same OTP authentication. 
            Ensure you only grant access to trusted family members.</p>
          </div>
        </div>
      )
    }
  };

  return (
    <BaseSignup 
      userType="user"
      userDetails={{
        ...userDetails,
        onExtraStepSubmit: (formData) => {
          // Add linked accounts to user data
          const linkedAccountTypes = [];
          if (linkedAccounts.guardian) linkedAccountTypes.push('guardian');
          if (linkedAccounts.wife) linkedAccountTypes.push('wife');
          
          return {
            ...formData,
            linkedAccounts: linkedAccountTypes
          };
        }
      }}
      onSignupSuccess={onSignupSuccess}
    />
  );
};

export default UserSignup;