// DoctorSignup.js
import React from 'react';
import BaseSignup from './BaseSignup';

const DoctorSignup = ({ onSignupSuccess }) => {
  const userDetails = {
    type: 'doctor',
    label: 'Doctor',
    title: 'a Doctor',
    quote: 'Expand your practice and provide exceptional care through our telemedicine platform',
    benefits: [
      'Reach patients nationwide',
      'Flexible consultation hours',
      'Secure patient management',
      'Electronic prescriptions',
      'Regular income opportunities'
    ],
    customFields: [
      {
        name: 'specialization',
        label: 'Medical Specialization',
        type: 'select',
        placeholder: 'Select your specialization',
        required: true,
        options: [
          { value: 'general-physician', label: 'General Physician' },
          { value: 'cardiologist', label: 'Cardiologist' },
          { value: 'dermatologist', label: 'Dermatologist' },
          { value: 'pediatrician', label: 'Pediatrician' },
          { value: 'psychiatrist', label: 'Psychiatrist' },
          { value: 'dentist', label: 'Dentist' },
          { value: 'orthopedic', label: 'Orthopedic' },
          { value: 'gynecologist', label: 'Gynecologist' },
          { value: 'other', label: 'Other' }
        ]
      },
      {
        name: 'medicalLicense',
        label: 'Medical License Number',
        type: 'text',
        placeholder: 'Enter your medical license number',
        required: true
      },
      {
        name: 'qualifications',
        label: 'Qualifications',
        type: 'textarea',
        placeholder: 'Enter your medical qualifications (e.g., MBBS, MD, MS)',
        required: true
      },
      {
        name: 'experience',
        label: 'Years of Experience',
        type: 'number',
        placeholder: 'Enter years of experience',
        required: true,
        min: 0,
        max: 60
      },
      {
        name: 'consultationFee',
        label: 'Consultation Fee (₹)',
        type: 'number',
        placeholder: 'Enter your consultation fee',
        required: true
      },
      {
        name: 'availableHours',
        label: 'Available Consultation Hours',
        type: 'textarea',
        placeholder: 'Enter your available hours (e.g., Mon-Fri: 9 AM - 5 PM)',
        required: false
      }
    ],
    fieldValidations: {
      specialization: {
        required: true,
        message: 'Please select your specialization'
      },
      medicalLicense: {
        required: true,
        message: 'Medical license number is required'
      },
      qualifications: {
        required: true,
        message: 'Qualifications are required'
      },
      experience: {
        required: true,
        message: 'Please enter years of experience'
      },
      consultationFee: {
        required: true,
        message: 'Consultation fee is required'
      }
    }
  };

  return (
    <BaseSignup 
      userType="doctor"
      userDetails={userDetails}
      onSignupSuccess={onSignupSuccess}
    />
  );
};

export default DoctorSignup;