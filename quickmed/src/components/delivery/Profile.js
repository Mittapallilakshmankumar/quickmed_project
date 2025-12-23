import React, { useState } from 'react';

const Profile = ({ profileData, setShowProfileImageUpload }) => {
  const [fieldErrors, setFieldErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: profileData.fullName,
    email: profileData.email,
    phone: profileData.phone,
    currentLocation: profileData.currentLocation,
    vehicleType: profileData.vehicleType,
    vehicleNumber: profileData.vehicleNumber,
    
    // Emergency Contacts
    emergencyContact1Name: profileData.emergencyContact1Name || '',
    emergencyContact1Relation: profileData.emergencyContact1Relation || '',
    emergencyContact1Phone: profileData.emergencyContact1Phone || '',
    emergencyContact2Name: profileData.emergencyContact2Name || '',
    emergencyContact2Relation: profileData.emergencyContact2Relation || '',
    emergencyContact2Phone: profileData.emergencyContact2Phone || '',
    
    // Bank Details
    bankAccountNumber: profileData.bankAccountNumber || '',
    bankAccountHolder: profileData.bankAccountHolder || '',
    bankName: profileData.bankName || '',
    ifscCode: profileData.ifscCode || '',
    upiId: profileData.upiId || ''
  });

  const styles = {
    mainContent: {
      padding: '20px',
      minHeight: '100vh',
      backgroundColor: '#E0F2F1'
    },
    header: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      marginBottom: '30px'
    },
    greeting: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#124441',
      margin: '0 0 8px 0',
      textAlign: 'center'
    },
    subtitle: {
      fontSize: '14px',
      color: '#4F6F6B',
      margin: 0,
      textAlign: 'center'
    },
    profileContainer: {
      maxWidth: '800px',
      margin: '0 auto',
      backgroundColor: '#FFFFFF',
      borderRadius: '12px',
      padding: '30px',
      boxShadow: '0 4px 6px rgba(0, 150, 136, 0.1)',
      border: '1px solid #4DB6AC'
    },
    profileHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '30px',
      paddingBottom: '20px',
      borderBottom: '1px solid #E0F2F1'
    },
    profileAvatar: {
      marginRight: '20px',
      position: 'relative'
    },
    profileImage: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      objectFit: 'cover',
      border: '3px solid #009688'
    },
    profileImagePlaceholder: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      backgroundColor: '#E0F2F1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '3px solid #009688'
    },
    avatarIcon: {
      fontSize: '32px',
      color: '#009688'
    },
    changePhotoButton: {
      position: 'absolute',
      bottom: '0',
      right: '0',
      backgroundColor: '#009688',
      color: '#FFFFFF',
      border: 'none',
      borderRadius: '50%',
      width: '28px',
      height: '28px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      boxShadow: '0 2px 4px rgba(0, 150, 136, 0.3)'
    },
    profileUserInfo: {
      flex: 1
    },
    agentId: {
      fontSize: '16px',
      color: '#4F6F6B',
      margin: '0 0 10px 0',
      fontWeight: '500'
    },
    formSection: {
      marginBottom: '40px'
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#124441',
      margin: '0 0 20px 0',
      paddingBottom: '10px',
      borderBottom: '2px solid #009688'
    },
    sectionSubtitle: {
      fontSize: '14px',
      color: '#4F6F6B',
      margin: '0 0 15px 0',
      fontStyle: 'italic'
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '20px',
      marginBottom: '10px'
    },
    formGridVertical: {
      display: 'grid',
      gridTemplateColumns: 'repeat(1, 1fr)',
      gap: '20px',
      marginBottom: '10px'
    },
    emergencyFormGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(1, 1fr)',
      gap: '20px',
      marginBottom: '30px'
    },
    formRow: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '15px'
    },
    formRowFull: {
      gridColumn: '1 / -1',
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '15px'
    },
    label: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#124441',
      marginBottom: '6px',
      display: 'flex',
      alignItems: 'center',
      gap: '5px'
    },
    labelDisabled: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#4F6F6B',
      marginBottom: '6px',
      display: 'flex',
      alignItems: 'center',
      gap: '5px'
    },
    required: {
      color: '#FF6B6B'
    },
    inputContainer: {
      position: 'relative',
      width: '100%'
    },
    input: {
      width: '100%',
      padding: '10px 12px',
      border: '1px solid #4DB6AC',
      borderRadius: '6px',
      fontSize: '14px',
      backgroundColor: '#FFFFFF',
      transition: 'all 0.2s ease',
      outline: 'none',
      boxSizing: 'border-box'
    },
    inputEditing: {
      borderColor: '#009688',
      backgroundColor: '#E0F2F1'
    },
    inputDisabled: {
      backgroundColor: '#F0F7F6',
      color: '#4F6F6B',
      cursor: 'not-allowed',
      border: '1px solid #4DB6AC'
    },
    inputError: {
      borderColor: '#FF6B6B',
      backgroundColor: '#FFF5F5'
    },
    inputReadOnly: {
      backgroundColor: '#F0F7F6',
      color: '#124441',
      border: '1px solid #4DB6AC'
    },
    select: {
      width: '100%',
      padding: '10px 12px',
      border: '1px solid #4DB6AC',
      borderRadius: '6px',
      fontSize: '14px',
      backgroundColor: '#FFFFFF',
      outline: 'none',
      boxSizing: 'border-box'
    },
    selectDisabled: {
      backgroundColor: '#F0F7F6',
      color: '#4F6F6B',
      cursor: 'not-allowed'
    },
    phonePrefix: {
      position: 'absolute',
      left: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#4F6F6B',
      fontWeight: '500',
      fontSize: '14px'
    },
    phoneInput: {
      paddingLeft: '40px'
    },
    errorText: {
      color: '#FF6B6B',
      fontSize: '12px',
      marginTop: '4px',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    fieldValue: {
      padding: '10px 12px',
      fontSize: '14px',
      color: '#124441',
      fontWeight: '500',
      backgroundColor: '#E0F2F1',
      borderRadius: '6px',
      border: '1px solid #4DB6AC',
      minHeight: '40px',
      display: 'flex',
      alignItems: 'center'
    },
    sensitiveData: {
      color: '#009688',
      fontWeight: '600',
      backgroundColor: '#E0F2F1',
      padding: '2px 6px',
      borderRadius: '4px'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '15px',
      marginTop: '10px'
    },
    statItem: {
      padding: '15px',
      backgroundColor: '#E0F2F1',
      borderRadius: '8px',
      border: '1px solid #4DB6AC',
      textAlign: 'center'
    },
    statLabel: {
      fontSize: '12px',
      color: '#4F6F6B',
      fontWeight: '600',
      textTransform: 'uppercase',
      marginBottom: '5px'
    },
    statValue: {
      fontSize: '16px',
      color: '#124441',
      fontWeight: '600'
    },
    emergencyContactSection: {
      backgroundColor: '#E0F2F1',
      padding: '20px',
      borderRadius: '8px',
      border: '1px solid #4DB6AC',
      marginBottom: '20px'
    },
    emergencyContactHeader: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#124441',
      marginBottom: '15px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    emergencyContactGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '15px'
    },
    emergencyContactField: {
      marginBottom: '0'
    },
    saveButtonContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: '30px',
      paddingTop: '20px',
      borderTop: '1px solid #E0F2F1'
    },
    saveButton: {
      backgroundColor: '#009688',
      color: '#FFFFFF',
      border: 'none',
      borderRadius: '6px',
      padding: '12px 24px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      minWidth: '140px',
      boxShadow: '0 2px 4px rgba(0, 150, 136, 0.2)'
    },
    saveButtonDisabled: {
      backgroundColor: '#4DB6AC',
      opacity: 0.6,
      cursor: 'not-allowed'
    },
    saveButtonHover: {
      backgroundColor: '#00796B',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0, 150, 136, 0.3)'
    },
    editButton: {
      backgroundColor: '#124441',
      color: '#FFFFFF',
      border: 'none',
      borderRadius: '6px',
      padding: '12px 24px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      minWidth: '140px',
      marginTop: '10px',
      boxShadow: '0 2px 4px rgba(18, 68, 65, 0.2)'
    },
    editButtonHover: {
      backgroundColor: '#0A2D2A',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(18, 68, 65, 0.3)'
    }
  };

  const handleInputChange = (field, value) => {
    // Prevent editing of name, email, and phone fields
    if (['fullName', 'email', 'phone'].includes(field) && !isEditing) {
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Real-time validation
    validateField(field, value);
  };

  const handlePhoneChange = (value) => {
    const cleanValue = value.replace(/\D/g, '');
    const limitedValue = cleanValue.slice(0, 10);
    
    setFormData(prev => ({
      ...prev,
      phone: limitedValue
    }));
    
    validateField('phone', limitedValue);
  };

  const handleEmergencyPhoneChange = (contactNumber, value) => {
    const cleanValue = value.replace(/\D/g, '');
    const limitedValue = cleanValue.slice(0, 10);
    
    setFormData(prev => ({
      ...prev,
      [contactNumber]: limitedValue
    }));
    
    validateField(contactNumber, limitedValue);
  };

  const validateField = (field, value) => {
    const errors = { ...fieldErrors };

    switch (field) {
      case 'fullName':
        if (!value.trim()) {
          errors.fullName = 'Full name is required';
        } else if (!/^[a-zA-Z\s]{2,50}$/.test(value)) {
          errors.fullName = 'Name should contain only alphabets (2-50 characters)';
        } else {
          delete errors.fullName;
        }
        break;

      case 'email':
        if (!value.trim()) {
          errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors.email = 'Please enter a valid email address';
        } else {
          delete errors.email;
        }
        break;

      case 'phone':
        if (!value.trim()) {
          errors.phone = 'Phone number is required';
        } else {
          const cleanPhone = value.replace(/\D/g, '');
          if (cleanPhone.length !== 10) {
            errors.phone = 'Phone number must be 10 digits';
          } else if (!/^[6-9]/.test(cleanPhone)) {
            errors.phone = 'Phone number must start with 6, 7, 8, or 9';
          } else {
            delete errors.phone;
          }
        }
        break;

      case 'currentLocation':
        if (!value.trim()) {
          errors.currentLocation = 'Current location is required';
        } else if (value.length < 3) {
          errors.currentLocation = 'Location must be at least 3 characters';
        } else {
          delete errors.currentLocation;
        }
        break;

      case 'vehicleNumber':
        if (!value.trim()) {
          errors.vehicleNumber = 'Vehicle number is required';
        } else if (value.length < 3) {
          errors.vehicleNumber = 'Vehicle number must be at least 3 characters';
        } else {
          delete errors.vehicleNumber;
        }
        break;

      case 'emergencyContact1Phone':
        if (value && value.trim()) {
          const cleanPhone = value.replace(/\D/g, '');
          if (cleanPhone.length !== 10) {
            errors.emergencyContact1Phone = 'Phone number must be 10 digits';
          } else if (!/^[6-9]/.test(cleanPhone)) {
            errors.emergencyContact1Phone = 'Phone number must start with 6, 7, 8, or 9';
          } else {
            delete errors.emergencyContact1Phone;
          }
        }
        break;

      case 'emergencyContact2Phone':
        if (value && value.trim()) {
          const cleanPhone = value.replace(/\D/g, '');
          if (cleanPhone.length !== 10) {
            errors.emergencyContact2Phone = 'Phone number must be 10 digits';
          } else if (!/^[6-9]/.test(cleanPhone)) {
            errors.emergencyContact2Phone = 'Phone number must start with 6, 7, 8, or 9';
          } else {
            delete errors.emergencyContact2Phone;
          }
        }
        break;

      case 'bankAccountNumber':
        if (value && value.trim()) {
          if (!/^\d{9,18}$/.test(value.replace(/\s/g, ''))) {
            errors.bankAccountNumber = 'Account number must be 9-18 digits';
          } else {
            delete errors.bankAccountNumber;
          }
        }
        break;

      case 'ifscCode':
        if (value && value.trim()) {
          if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value)) {
            errors.ifscCode = 'Please enter a valid IFSC code';
          } else {
            delete errors.ifscCode;
          }
        }
        break;

      case 'upiId':
        if (value && value.trim()) {
          if (!/^[\w.-]+@[\w]+$/.test(value)) {
            errors.upiId = 'Please enter a valid UPI ID';
          } else {
            delete errors.upiId;
          }
        }
        break;

      default:
        break;
    }

    setFieldErrors(errors);
    return !errors[field];
  };

  const handleSaveChanges = () => {
    // Validate all required fields
    const requiredFields = ['fullName', 'email', 'phone', 'currentLocation', 'vehicleType', 'vehicleNumber'];
    let hasErrors = false;
    
    requiredFields.forEach(field => {
      if (!validateField(field, formData[field])) {
        hasErrors = true;
      }
    });

    if (hasErrors) {
      alert('Please fix all validation errors before saving.');
      return;
    }

    // Save all changes
    Object.keys(formData).forEach(field => {
      profileData[field] = formData[field];
    });

    console.log('All changes saved:', formData);
    setIsEditing(false);
    
    // Here you would typically send the entire formData to your backend
    alert('Profile updated successfully!');
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      // Reset form data if canceling edit
      setFormData({
        fullName: profileData.fullName,
        email: profileData.email,
        phone: profileData.phone,
        currentLocation: profileData.currentLocation,
        vehicleType: profileData.vehicleType,
        vehicleNumber: profileData.vehicleNumber,
        emergencyContact2Name: profileData.emergencyContact2Name || '',
        emergencyContact2Phone: profileData.emergencyContact2Phone || '',
        emergencyContact2Relation: profileData.emergencyContact2Relation || '',
        emergencyContact1Name: profileData.emergencyContact1Name || '',
        emergencyContact1Phone: profileData.emergencyContact1Phone || '',
        emergencyContact1Relation: profileData.emergencyContact1Relation || '',
        bankAccountNumber: profileData.bankAccountNumber || '',
        bankAccountHolder: profileData.bankAccountHolder || '',
        bankName: profileData.bankName || '',
        ifscCode: profileData.ifscCode || '',
        upiId: profileData.upiId || ''
      });
      setFieldErrors({});
    }
  };

  const maskSensitiveData = (data) => {
    if (!data) return 'Not provided';
    return '•'.repeat(Math.min(data.length, 8));
  };

  const maskAccountNumber = (accountNumber) => {
    if (!accountNumber) return 'Not provided';
    const visibleDigits = 4;
    if (accountNumber.length <= visibleDigits) return '•'.repeat(accountNumber.length);
    return '•'.repeat(accountNumber.length - visibleDigits) + accountNumber.slice(-visibleDigits);
  };

  const isFieldValid = (field) => {
    return !fieldErrors[field] && formData[field] && formData[field].toString().trim();
  };

  const renderFormField = (field, label, isRequired = false, isFullWidth = false, isSelect = false, options = [], isReadOnly = false) => {
    const hasError = fieldErrors[field];
    const isValid = isFieldValid(field);

    return (
      <div style={isFullWidth ? styles.formRowFull : styles.formRow}>
        <label style={isReadOnly ? styles.labelDisabled : styles.label}>
          {label}
          {isRequired && <span style={styles.required}>*</span>}
          {isReadOnly && <span style={{fontSize: '12px', color: '#4F6F6B', marginLeft: '8px'}}>(Cannot be changed)</span>}
        </label>
        
        {isEditing ? (
          <div style={styles.inputContainer}>
            {isSelect ? (
              <select
                value={formData[field]}
                onChange={(e) => handleInputChange(field, e.target.value)}
                disabled={isReadOnly}
                style={{
                  ...styles.select,
                  ...(hasError ? styles.inputError : {}),
                  ...(isReadOnly ? styles.inputDisabled : {})
                }}
              >
                {options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={formData[field]}
                onChange={(e) => handleInputChange(field, e.target.value)}
                disabled={isReadOnly}
                style={{
                  ...styles.input,
                  ...(hasError ? styles.inputError : {}),
                  ...(isReadOnly ? styles.inputReadOnly : {})
                }}
                placeholder={`Enter ${label.toLowerCase()}`}
                readOnly={isReadOnly}
              />
            )}
            {hasError && (
              <div style={styles.errorText}>⚠️ {hasError}</div>
            )}
          </div>
        ) : (
          <div style={styles.fieldValue}>
            {formData[field] || 'Not provided'}
          </div>
        )}
      </div>
    );
  };

  const renderPhoneField = (field, label, isRequired = false, isEmergency = false, isReadOnly = false) => {
    const hasError = fieldErrors[field];
    const isValid = isFieldValid(field);

    return (
      <div style={styles.formRow}>
        <label style={isReadOnly ? styles.labelDisabled : styles.label}>
          {label}
          {isRequired && <span style={styles.required}>*</span>}
          {isReadOnly && <span style={{fontSize: '12px', color: '#4F6F6B', marginLeft: '8px'}}>(Cannot be changed)</span>}
        </label>
        
        {isEditing ? (
          <div style={styles.inputContainer}>
            <span style={styles.phonePrefix}>+91</span>
            <input
              type="tel"
              value={formData[field]}
              onChange={(e) => isEmergency ? 
                handleEmergencyPhoneChange(field, e.target.value) : 
                handlePhoneChange(e.target.value)
              }
              disabled={isReadOnly}
              style={{
                ...styles.input,
                ...styles.phoneInput,
                ...(hasError ? styles.inputError : {}),
                ...(isReadOnly ? styles.inputReadOnly : {})
              }}
              placeholder="Enter 10-digit number"
              maxLength="10"
              readOnly={isReadOnly}
            />
            {hasError && (
              <div style={styles.errorText}>⚠️ {hasError}</div>
            )}
          </div>
        ) : (
          <div style={styles.fieldValue}>
            {formData[field] ? `+91 ${formData[field]}` : 'Not provided'}
          </div>
        )}
      </div>
    );
  };

  const renderSensitiveField = (field, label, maskFunction, isRequired = false) => {
    const hasError = fieldErrors[field];
    const isValid = isFieldValid(field);

    return (
      <div style={styles.formRow}>
        <label style={styles.label}>
          {label}
          {isRequired && <span style={styles.required}>*</span>}
        </label>
        
        {isEditing ? (
          <div style={styles.inputContainer}>
            <input
              type="text"
              value={formData[field]}
              onChange={(e) => handleInputChange(field, e.target.value)}
              style={{
                ...styles.input,
                ...(hasError ? styles.inputError : {})
              }}
              placeholder={`Enter ${label.toLowerCase()}`}
            />
            {hasError && (
              <div style={styles.errorText}>⚠️ {hasError}</div>
            )}
          </div>
        ) : (
          <div style={styles.fieldValue}>
            {formData[field] ? (
              <span style={styles.sensitiveData}>
                {maskFunction(formData[field])}
              </span>
            ) : 'Not provided'}
          </div>
        )}
      </div>
    );
  };

  const hasValidationErrors = () => {
    return Object.keys(fieldErrors).length > 0;
  };

  const [hoverState, setHoverState] = useState({
    editButton: false,
    saveButton: false
  });

  return (
    <div style={styles.mainContent}>
      <div style={styles.header}>
        <h1 style={styles.greeting}>My Profile</h1>
        <p style={styles.subtitle}>Manage your account information and preferences</p>
      </div>

      <div style={styles.profileContainer}>
        {/* Profile Header */}
        <div style={styles.profileHeader}>
          <div style={styles.profileAvatar}>
            {profileData.profileImage ? (
              <img 
                src={profileData.profileImage} 
                alt="Profile" 
                style={styles.profileImage}
              />
            ) : (
              <div style={styles.profileImagePlaceholder}>
                <span style={styles.avatarIcon}>👤</span>
              </div>
            )}
            <button 
              style={styles.changePhotoButton}
              onClick={() => setShowProfileImageUpload(true)}
              title="Change profile photo"
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#00796B';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#009688';
                e.target.style.transform = 'scale(1)';
              }}
            >
              📷
            </button>
          </div>
          <div style={styles.profileUserInfo}>
            <div style={styles.agentId}>
              <strong>AGENT ID:</strong> {profileData.agentId}
            </div>
            <button
              style={{
                ...styles.editButton,
                ...(hoverState.editButton ? styles.editButtonHover : {})
              }}
              onClick={handleEditToggle}
              onMouseEnter={() => setHoverState(s => ({ ...s, editButton: true }))}
              onMouseLeave={() => setHoverState(s => ({ ...s, editButton: false }))}
            >
              {isEditing ? 'Cancel Editing' : 'Edit Profile'}
            </button>
          </div>
        </div>

        {/* Personal Information */}
        <div style={styles.formSection}>
          <h3 style={styles.sectionTitle}>Personal Information</h3>
          
          <div style={styles.formGrid}>
            {renderFormField('fullName', 'Full Name', true, false, false, [], true)}
            {renderFormField('email', 'Email Address', true, false, false, [], true)}
            {renderPhoneField('phone', 'Phone Number', true, false, true)}
            {renderFormField('currentLocation', 'Current Location', true)}
            {renderFormField(
              'vehicleType', 
              'Vehicle Type', 
              true,
              false,
              true,
              [
                { value: 'Motorcycle', label: 'Motorcycle' },
                { value: 'Scooter', label: 'Scooter' },
                { value: 'Bicycle', label: 'Bicycle' },
              ]
            )}
            {renderFormField('vehicleNumber', 'Vehicle Number', true)}
          </div>
        </div>

        {/* Emergency Contacts */}
        <div style={styles.formSection}>
          <h3 style={styles.sectionTitle}>Emergency Contacts</h3>
          <p style={styles.sectionSubtitle}>In case of emergencies, we'll contact these people</p>
          
          <div style={styles.emergencyFormGrid}>
            {/* Emergency Contact 1 */}
            <div style={styles.emergencyContactSection}>
              <div style={styles.emergencyContactHeader}>
                <span>🚨 Emergency Contact 1</span>
              </div>
              <div style={styles.formGridVertical}>
                {renderFormField('emergencyContact1Name', 'Name')}
                {renderPhoneField('emergencyContact1Phone', 'Phone Number', false, true)}
                {renderFormField(
                  'emergencyContact1Relation', 
                  'Relation', 
                  false,
                  false,
                  true,
                  [
                    { value: '', label: 'Select relation' },
                    { value: 'Father', label: 'Father' },
                    { value: 'Mother', label: 'Mother' },
                    { value: 'Spouse', label: 'Spouse' },
                    { value: 'Sibling', label: 'Sibling' },
                    { value: 'Friend', label: 'Friend' },
                    { value: 'Other', label: 'Other' }
                  ]
                )}
              </div>
            </div>

            {/* Emergency Contact 2 */}
            <div style={styles.emergencyContactSection}>
              <div style={styles.emergencyContactHeader}>
                <span>🚨 Emergency Contact 2</span>
              </div>
              <div style={styles.formGridVertical}>
                {renderFormField('emergencyContact2Name', 'Name')}
                {renderPhoneField('emergencyContact2Phone', 'Phone Number', false, true)}
                {renderFormField(
                  'emergencyContact2Relation', 
                  'Relation', 
                  false,
                  false,
                  true,
                  [
                    { value: '', label: 'Select relation' },
                    { value: 'Father', label: 'Father' },
                    { value: 'Mother', label: 'Mother' },
                    { value: 'Spouse', label: 'Spouse' },
                    { value: 'Sibling', label: 'Sibling' },
                    { value: 'Friend', label: 'Friend' },
                    { value: 'Other', label: 'Other' }
                  ]
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bank Details */}
        <div style={styles.formSection}>
          <h3 style={styles.sectionTitle}>Bank Details</h3>
          <p style={styles.sectionSubtitle}>For salary transfers and payments</p>
          <div style={styles.formGrid}>
            {renderFormField('bankAccountHolder', 'Account Holder Name')}
            {renderFormField('bankName', 'Bank Name')}
            {renderSensitiveField('bankAccountNumber', 'Account Number', maskAccountNumber)}
            {renderFormField('ifscCode', 'IFSC Code')}
            {renderSensitiveField('upiId', 'UPI ID', maskSensitiveData)}
          </div>
        </div>

        {/* Performance Statistics */}
        <div style={styles.formSection}>
          <h3 style={styles.sectionTitle}>Performance Statistics</h3>
          <div style={styles.statsGrid}>
            <div style={styles.statItem}>
              <div style={styles.statLabel}>Joined Date</div>
              <div style={styles.statValue}>{profileData.joinedDate}</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statLabel}>Total Deliveries</div>
              <div style={styles.statValue}>{profileData.totalDeliveries}</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statLabel}>Current Rating</div>
              <div style={styles.statValue}>{profileData.rating}/5 ⭐</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statLabel}>Completion Rate</div>
              <div style={styles.statValue}>{profileData.completionRate}</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statLabel}>Avg Response Time</div>
              <div style={styles.statValue}>{profileData.responseTime}</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statLabel}>Average Rating</div>
              <div style={styles.statValue}>{profileData.averageRating}/5 ⭐</div>
            </div>
          </div>
        </div>

        {/* Save Changes Button */}
        {isEditing && (
          <div style={styles.saveButtonContainer}>
            <button
              style={{
                ...styles.saveButton,
                ...(hasValidationErrors() ? styles.saveButtonDisabled : {}),
                ...(hoverState.saveButton && !hasValidationErrors() ? styles.saveButtonHover : {})
              }}
              onClick={handleSaveChanges}
              disabled={hasValidationErrors()}
              onMouseEnter={() => !hasValidationErrors() && setHoverState(s => ({ ...s, saveButton: true }))}
              onMouseLeave={() => setHoverState(s => ({ ...s, saveButton: false }))}
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;