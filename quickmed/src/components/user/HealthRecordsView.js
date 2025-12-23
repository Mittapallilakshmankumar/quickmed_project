import React, { useState, useEffect, useRef } from 'react';

const AddRecordForm = ({ activeTab, showAddForm, setShowAddForm, addHealthRecord, uploadedFiles, setUploadedFiles }) => {
  const [formData, setFormData] = useState({});
  const [dateErrors, setDateErrors] = useState({});
  const fileInputRef = useRef(null);
  
  // Get today's date in YYYY-MM-DD format for date inputs
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Get max date (today) for date inputs
  const getMaxDate = () => {
    return getTodayDate();
  };

  // Function to validate date (not in future)
  const validateDate = (dateString) => {
    if (!dateString) return true;
    const selectedDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate <= today;
  };

  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFormFields = () => {
    const baseFields = [
      { 
        name: 'date', 
        label: 'Date', 
        type: 'date', 
        required: true,
        max: getMaxDate()
      }
    ];

    switch (activeTab) {
      case 'conditions':
        return [
          { name: 'condition', label: 'Condition Name', type: 'text', required: true },
          { 
            name: 'diagnosedDate', 
            label: 'Diagnosed Date', 
            type: 'date', 
            required: true,
            max: getMaxDate()
          },
          { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Resolved', 'Chronic'], required: true },
          { name: 'severity', label: 'Severity', type: 'select', options: ['Mild', 'Moderate', 'Severe'], required: true },
          { name: 'treatment', label: 'Treatment/Medication', type: 'textarea', required: false },
          ...baseFields
        ];
      
      case 'labResults':
        return [
          { name: 'test', label: 'Test Name', type: 'text', required: true },
          { name: 'result', label: 'Result', type: 'text', required: true },
          { name: 'status', label: 'Status', type: 'select', options: ['Normal', 'Abnormal', 'Critical'], required: true },
          { name: 'lab', label: 'Laboratory', type: 'text', required: false },
          { name: 'notes', label: 'Notes', type: 'textarea', required: false },
          ...baseFields
        ];
      
      case 'vitals':
        return [
          { name: 'type', label: 'Vital Type', type: 'select', options: ['Blood Pressure', 'Heart Rate', 'Temperature', 'Blood Sugar', 'Weight', 'Height', 'BMI'], required: true },
          { name: 'value', label: 'Value', type: 'text', placeholder: 'e.g., 120/80 mmHg', required: true },
          { name: 'status', label: 'Status', type: 'select', options: ['Normal', 'High', 'Low'], required: true },
          { name: 'notes', label: 'Notes', type: 'textarea', required: false },
          ...baseFields
        ];
      
      case 'allergies':
        return [
          { name: 'allergen', label: 'Allergen', type: 'text', required: true },
          { name: 'severity', label: 'Severity', type: 'select', options: ['Mild', 'Moderate', 'Severe'], required: true },
          { name: 'reaction', label: 'Reaction', type: 'text', required: true },
          { 
            name: 'diagnosed', 
            label: 'Diagnosed Date', 
            type: 'date', 
            required: true,
            max: getMaxDate()
          },
          { name: 'treatment', label: 'Emergency Treatment', type: 'textarea', required: false },
          ...baseFields
        ];
      
      case 'surgical':
        return [
          { name: 'procedure', label: 'Procedure', type: 'text', required: true },
          { name: 'hospital', label: 'Hospital/Clinic', type: 'text', required: false },
          { name: 'surgeon', label: 'Surgeon/Doctor', type: 'text', required: false },
          { name: 'notes', label: 'Notes', type: 'textarea', required: false },
          ...baseFields
        ];
      
      default:
        return baseFields;
    }
  };

  const validateFormDate = (fieldName, value) => {
    if (!value) return;
    
    if (!validateDate(value)) {
      setDateErrors(prev => ({
        ...prev,
        [fieldName]: 'Date cannot be in the future'
      }));
      return false;
    } else {
      setDateErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
      return true;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Validate date fields
    if (name.includes('Date') || name === 'date' || name === 'diagnosed') {
      validateFormDate(name, value);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      type: file.type,
      size: file.size,
      uploadedDate: new Date().toISOString(),
      url: URL.createObjectURL(file)
    }));
    
    setUploadedFiles(prev => ({
      ...prev,
      [activeTab]: [...(prev[activeTab] || []), ...newFiles]
    }));
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].filter(file => file.id !== fileId)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all date fields before submission
    const dateFields = ['date', 'diagnosedDate', 'diagnosed'];
    for (const field of dateFields) {
      if (formData[field] && !validateDate(formData[field])) {
        alert(`Invalid ${field}: Date cannot be in the future.`);
        return;
      }
    }
    
    const record = {
      id: Date.now(),
      ...formData,
      files: uploadedFiles[activeTab] || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    addHealthRecord(activeTab, record);

    // Reset form
    setShowAddForm(false);
    setFormData({});
    setUploadedFiles(prev => ({ ...prev, [activeTab]: [] }));
  };

  const styles = {
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    },
    modalContent: {
      backgroundColor: '#FFFFFF',
      borderRadius: '12px',
      padding: '2rem',
      maxWidth: '800px',
      width: '100%',
      maxHeight: '90vh',
      overflowY: 'auto',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem',
      paddingBottom: '1rem',
      borderBottom: '1px solid #E0F2F1'
    },
    modalTitle: {
      color: '#124441',
      fontSize: '1.5rem',
      margin: 0
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '1.5rem',
      cursor: 'pointer',
      color: '#4F6F6B',
      padding: '0.5rem',
      transition: 'all 0.3s ease'
    },
    formGroup: {
      marginBottom: '1.5rem'
    },
    formLabel: {
      display: 'block',
      marginBottom: '0.5rem',
      color: '#124441',
      fontWeight: '600',
      fontSize: '0.9rem'
    },
    formInput: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #E0F2F1',
      borderRadius: '6px',
      fontSize: '0.9rem',
      color: '#124441',
      boxSizing: 'border-box',
      transition: 'all 0.3s ease',
      fontFamily: 'inherit'
    },
    formSelect: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #E0F2F1',
      borderRadius: '6px',
      fontSize: '0.9rem',
      color: '#124441',
      backgroundColor: '#FFFFFF',
      cursor: 'pointer',
      fontFamily: 'inherit'
    },
    formTextarea: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #E0F2F1',
      borderRadius: '6px',
      fontSize: '0.9rem',
      color: '#124441',
      minHeight: '80px',
      resize: 'vertical',
      fontFamily: 'inherit'
    },
    fileUploadContainer: {
      border: '2px dashed #E0F2F1',
      borderRadius: '8px',
      padding: '2rem',
      textAlign: 'center',
      marginBottom: '1rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    fileInput: {
      display: 'none'
    },
    fileList: {
      marginTop: '1rem'
    },
    fileItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.75rem',
      backgroundColor: '#F8FCFC',
      border: '1px solid #E0F2F1',
      borderRadius: '6px',
      marginBottom: '0.5rem'
    },
    fileName: {
      color: '#124441',
      fontSize: '0.9rem'
    },
    removeFile: {
      color: '#EF4444',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: '0.8rem',
      padding: '0.25rem 0.5rem',
      borderRadius: '4px',
      transition: 'all 0.3s ease'
    },
    formButtons: {
      display: 'flex',
      gap: '1rem',
      marginTop: '2rem'
    },
    submitButton: {
      backgroundColor: '#009688',
      color: '#FFFFFF',
      border: 'none',
      padding: '0.75rem 2rem',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '600',
      flex: 1,
      transition: 'all 0.3s ease'
    },
    cancelButton: {
      backgroundColor: '#F8FCFC',
      color: '#4F6F6B',
      border: '1px solid #E0F2F1',
      padding: '0.75rem 2rem',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '600',
      flex: 1,
      transition: 'all 0.3s ease'
    },
    dateError: {
      color: '#EF4444',
      fontSize: '0.8rem',
      marginTop: '0.25rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem'
    },
    modalBackButton: {
      backgroundColor: '#F8FCFC',
      color: '#4F6F6B',
      border: '1px solid #E0F2F1',
      padding: '0.5rem 1rem',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      marginRight: '0.5rem'
    }
  };

  if (!showAddForm) return null;

  return (
    <div style={styles.modalOverlay} onClick={() => setShowAddForm(false)}>
      <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button 
              style={styles.modalBackButton}
              onClick={() => setShowAddForm(false)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#E0F2F1';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#F8FCFC';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              ← Back
            </button>
            <h3 style={styles.modalTitle}>
              Add New Record
              <span style={{ fontSize: '0.9rem', color: '#4F6F6B', marginLeft: '0.5rem' }}>
                ({activeTab})
              </span>
            </h3>
          </div>
          <button 
            style={styles.closeButton}
            onClick={() => {
              setShowAddForm(false);
              setFormData({});
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#124441';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#4F6F6B';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {getFormFields().map(field => (
            <div key={field.name} style={styles.formGroup}>
              <label style={styles.formLabel}>
                {field.label}
                {field.required && <span style={{ color: '#EF4444' }}> *</span>}
              </label>
              {field.type === 'select' ? (
                <select
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleInputChange}
                  style={styles.formSelect}
                  required={field.required}
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              ) : field.type === 'textarea' ? (
                <textarea
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleInputChange}
                  style={styles.formTextarea}
                  placeholder={field.placeholder}
                  required={field.required}
                />
              ) : field.type === 'date' ? (
                <>
                  <input
                    type="date"
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleInputChange}
                    style={{
                      ...styles.formInput,
                      ...(dateErrors[field.name] && { borderColor: '#EF4444' })
                    }}
                    placeholder={field.placeholder}
                    required={field.required}
                    max={field.max || getMaxDate()}
                  />
                  {dateErrors[field.name] && (
                    <div style={styles.dateError}>
                      ⚠️ {dateErrors[field.name]}
                    </div>
                  )}
                </>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleInputChange}
                  style={styles.formInput}
                  placeholder={field.placeholder}
                  required={field.required}
                  autoComplete="off"
                />
              )}
            </div>
          ))}

          {/* File Upload Section */}
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Attach Files</label>
            <div 
              style={styles.fileUploadContainer}
              onClick={() => fileInputRef.current?.click()}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#009688';
                e.currentTarget.style.backgroundColor = '#F8FCFC';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E0F2F1';
                e.currentTarget.style.backgroundColor = '#FFFFFF';
              }}
            >
              <div style={{ fontSize: '3rem', color: '#009688', marginBottom: '0.5rem' }}>📎</div>
              <p style={{ color: '#124441', marginBottom: '0.25rem' }}>Click to upload files</p>
              <p style={{ color: '#4F6F6B', fontSize: '0.8rem' }}>Supports PDF, JPG, PNG up to 10MB</p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileUpload}
                style={styles.fileInput}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              />
            </div>

            {/* Uploaded Files List */}
            {uploadedFiles[activeTab]?.length > 0 && (
              <div style={styles.fileList}>
                <p style={{ color: '#124441', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                  📎 Attached files ({uploadedFiles[activeTab].length}):
                </p>
                {uploadedFiles[activeTab].map(file => (
                  <div key={file.id} style={styles.fileItem}>
                    <span style={styles.fileName}>
                      📄 {file.name} ({formatFileSize(file.size)})
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFile(file.id)}
                      style={styles.removeFile}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#FEE2E2';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={styles.formButtons}>
            <button
              type="button"
              style={styles.cancelButton}
              onClick={() => {
                setShowAddForm(false);
                setFormData({});
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#E0F2F1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#F8FCFC';
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={styles.submitButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#00796B';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#009688';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Save Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const FileManager = ({ allFiles, setShowFileManager, healthRecords, addSampleData }) => {
  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType) => {
    if (!fileType) return '📎';
    if (fileType.includes('pdf')) return '📕';
    if (fileType.includes('image')) return '🖼️';
    if (fileType.includes('word') || fileType.includes('document')) return '📄';
    if (fileType.includes('excel') || fileType.includes('spreadsheet')) return '📊';
    if (fileType.includes('zip') || fileType.includes('compressed')) return '🗜️';
    return '📎';
  };

  const getTabBadgeStyle = (tab) => {
    const tabColors = {
      conditions: { backgroundColor: '#E0F2F1', color: '#065f46' },
      labResults: { backgroundColor: '#DBEAFE', color: '#1E40AF' },
      vitals: { backgroundColor: '#FEF3C7', color: '#92400E' },
      allergies: { backgroundColor: '#FEE2E2', color: '#991B1B' },
      surgical: { backgroundColor: '#E0E7FF', color: '#3730A3' }
    };
    return tabColors[tab] || { backgroundColor: '#F3F4F6', color: '#374151' };
  };

  const getFileStats = () => {
    const totalSize = allFiles.reduce((sum, file) => sum + (file.size || 0), 0);
    const fileTypes = {};
    allFiles.forEach(file => {
      const type = file.type ? file.type.split('/')[0] : 'other';
      fileTypes[type] = (fileTypes[type] || 0) + 1;
    });
    
    return {
      totalFiles: allFiles.length,
      totalSize,
      byType: fileTypes
    };
  };

  const stats = getFileStats();

  const styles = {
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    },
    fileManagerModal: {
      backgroundColor: '#FFFFFF',
      borderRadius: '12px',
      padding: '2rem',
      maxWidth: '900px',
      width: '100%',
      maxHeight: '90vh',
      overflowY: 'auto',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem',
      paddingBottom: '1rem',
      borderBottom: '1px solid #E0F2F1'
    },
    modalTitle: {
      color: '#124441',
      fontSize: '1.5rem',
      margin: 0
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '1.5rem',
      cursor: 'pointer',
      color: '#4F6F6B',
      padding: '0.5rem',
      transition: 'all 0.3s ease'
    },
    fileManagerStats: {
      backgroundColor: '#F8FCFC',
      padding: '1rem',
      borderRadius: '8px',
      marginBottom: '1.5rem',
      border: '1px solid #E0F2F1'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '1rem',
      marginTop: '0.5rem'
    },
    statItem: {
      textAlign: 'center',
      padding: '0.5rem'
    },
    statValue: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#009688',
      marginBottom: '0.25rem'
    },
    statLabel: {
      fontSize: '0.8rem',
      color: '#4F6F6B'
    },
    filesTable: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    tableHeader: {
      backgroundColor: '#F8FCFC',
      borderBottom: '2px solid #E0F2F1',
      padding: '0.75rem',
      textAlign: 'left',
      color: '#124441',
      fontWeight: '600',
      fontSize: '0.9rem'
    },
    tableRow: {
      borderBottom: '1px solid #E0F2F1',
      transition: 'all 0.3s ease'
    },
    tableCell: {
      padding: '0.75rem',
      color: '#4F6F6B',
      fontSize: '0.9rem',
      verticalAlign: 'middle'
    },
    fileIconCell: {
      width: '40px',
      paddingRight: '0'
    },
    tabBadge: {
      display: 'inline-block',
      padding: '0.25rem 0.5rem',
      borderRadius: '4px',
      fontSize: '0.75rem',
      fontWeight: '500'
    },
    emptyState: {
      textAlign: 'center',
      padding: '3rem 1rem',
      color: '#4F6F6B'
    },
    emptyIcon: {
      fontSize: '3rem',
      marginBottom: '1rem',
      opacity: 0.5,
      color: '#009688'
    },
    addSampleButton: {
      backgroundColor: '#4DB6AC',
      color: '#FFFFFF',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '500',
      marginTop: '1rem',
      transition: 'all 0.3s ease'
    },
    modalBackButton: {
      backgroundColor: '#F8FCFC',
      color: '#4F6F6B',
      border: '1px solid #E0F2F1',
      padding: '0.5rem 1rem',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      marginRight: '0.5rem'
    }
  };

  return (
    <div style={styles.modalOverlay} onClick={() => setShowFileManager(false)}>
      <div style={styles.fileManagerModal} onClick={e => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button 
              style={styles.modalBackButton}
              onClick={() => setShowFileManager(false)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#E0F2F1';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#F8FCFC';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              ← Back
            </button>
            <h3 style={styles.modalTitle}>📁 File Manager</h3>
          </div>
          <button 
            style={styles.closeButton}
            onClick={() => setShowFileManager(false)}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#124441';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#4F6F6B';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            ×
          </button>
        </div>

        <div style={styles.fileManagerStats}>
          <h4 style={{ color: '#124441', marginBottom: '0.5rem' }}>File Statistics</h4>
          <div style={styles.statsGrid}>
            <div style={styles.statItem}>
              <div style={styles.statValue}>{stats.totalFiles}</div>
              <div style={styles.statLabel}>Total Files</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statValue}>{formatFileSize(stats.totalSize)}</div>
              <div style={styles.statLabel}>Total Size</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statValue}>{Object.keys(stats.byType).length}</div>
              <div style={styles.statLabel}>File Types</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statValue}>
                {healthRecords ? Object.keys(healthRecords).reduce((count, tab) => 
                  count + (healthRecords[tab]?.length || 0), 0) : 0}
              </div>
              <div style={styles.statLabel}>Records</div>
            </div>
          </div>
        </div>

        {Object.keys(stats.byType).length > 0 && (
          <div style={{ marginBottom: '1rem' }}>
            <h4 style={{ color: '#124441', marginBottom: '0.5rem' }}>File Type Distribution</h4>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {Object.entries(stats.byType).map(([type, count]) => (
                <div key={type} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  padding: '0.25rem 0.5rem',
                  backgroundColor: '#F8FCFC',
                  border: '1px solid #E0F2F1',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  color: '#4F6F6B'
                }}>
                  <span>{getFileIcon(type)}</span>
                  <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                  <span style={{ fontWeight: '600' }}>({count})</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {allFiles.length > 0 ? (
          <div style={{ overflowX: 'auto', maxHeight: '400px' }}>
            <table style={styles.filesTable}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}></th>
                  <th style={styles.tableHeader}>File Name</th>
                  <th style={styles.tableHeader}>Type</th>
                  <th style={styles.tableHeader}>Size</th>
                  <th style={styles.tableHeader}>Category</th>
                  <th style={styles.tableHeader}>Record</th>
                  <th style={styles.tableHeader}>Uploaded</th>
                </tr>
              </thead>
              <tbody>
                {allFiles.map((file, index) => {
                  const badgeStyle = getTabBadgeStyle(file.tab);
                  return (
                    <tr 
                      key={file.id || index} 
                      style={{
                        ...styles.tableRow,
                        backgroundColor: '#FFFFFF'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#F8FCFC';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#FFFFFF';
                      }}
                    >
                      <td style={{ ...styles.tableCell, ...styles.fileIconCell }}>
                        <span style={{ fontSize: '1.2rem' }}>
                          {getFileIcon(file.type)}
                        </span>
                      </td>
                      <td style={styles.tableCell}>
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: '#009688',
                            textDecoration: 'none',
                            fontWeight: '500'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.textDecoration = 'underline';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.textDecoration = 'none';
                          }}
                          onClick={(e) => {
                            if (!file.url || file.url === '#') {
                              e.preventDefault();
                              alert(`Sample file: ${file.name}\nSize: ${formatFileSize(file.size)}\nType: ${file.type}`);
                            }
                          }}
                        >
                          {file.name || 'Unnamed File'}
                        </a>
                      </td>
                      <td style={styles.tableCell}>
                        <span style={{
                          padding: '0.2rem 0.5rem',
                          backgroundColor: '#F8FCFC',
                          borderRadius: '4px',
                          fontSize: '0.8rem',
                          color: '#4F6F6B'
                        }}>
                          {file.type ? file.type.split('/')[1]?.toUpperCase() || 'FILE' : 'UNKNOWN'}
                        </span>
                      </td>
                      <td style={styles.tableCell}>{formatFileSize(file.size)}</td>
                      <td style={styles.tableCell}>
                        <span style={{
                          ...styles.tabBadge,
                          ...badgeStyle
                        }}>
                          {file.tab === 'conditions' ? '🏥 Conditions' :
                           file.tab === 'labResults' ? '🧪 Lab Results' :
                           file.tab === 'vitals' ? '📊 Vitals' :
                           file.tab === 'allergies' ? '⚠️ Allergies' : 
                           file.tab === 'surgical' ? '🔪 Surgical' : 'Other'}
                        </span>
                      </td>
                      <td style={styles.tableCell}>
                        <span style={{ color: '#124441', fontWeight: '500' }}>
                          {file.recordName || 'Unknown Record'}
                        </span>
                      </td>
                      <td style={styles.tableCell}>
                        {file.uploadedDate ? new Date(file.uploadedDate).toLocaleDateString() : 'Unknown date'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📁</div>
            <h3 style={{ color: '#124441', marginBottom: '0.5rem' }}>
              No Files Found
            </h3>
            <p style={{ color: '#4F6F6B' }}>
              Upload files to your health records to see them here
            </p>
            <button 
              style={styles.addSampleButton}
              onClick={addSampleData}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#26A69A';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#4DB6AC';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Load Sample Files
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const HealthRecordsView = ({ healthRecords, addHealthRecord, setActiveView }) => {
  const [activeTab, setActiveTab] = useState('conditions');
  const [showAddForm, setShowAddForm] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [showFileManager, setShowFileManager] = useState(false);
  const [allFiles, setAllFiles] = useState([]);

  // Extract all files from records and organize them
  useEffect(() => {
    const extractAllFiles = () => {
      if (!healthRecords) return [];
      
      const filesArray = [];
      
      // Loop through all tabs and records
      Object.entries(healthRecords).forEach(([tab, records]) => {
        if (Array.isArray(records)) {
          records.forEach(record => {
            if (record && record.files && Array.isArray(record.files)) {
              record.files.forEach(file => {
                if (file) {
                  filesArray.push({
                    ...file,
                    tab: tab,
                    recordId: record.id,
                    recordName: getRecordName(record, tab),
                    uploadedDate: file.uploadedDate || record.createdAt || new Date().toISOString()
                  });
                }
              });
            }
          });
        }
      });
      
      // Sort files by uploaded date (newest first)
      filesArray.sort((a, b) => new Date(b.uploadedDate) - new Date(a.uploadedDate));
      return filesArray;
    };

    const extractedFiles = extractAllFiles();
    setAllFiles(extractedFiles);
  }, [healthRecords]);

  const getRecordName = (record, tab) => {
    if (!record) return 'Unknown Record';
    
    switch(tab) {
      case 'conditions': return record.condition || 'Condition';
      case 'labResults': return record.test || 'Test';
      case 'vitals': return `${record.type || 'Vital'} - ${record.value || 'Value'}`;
      case 'allergies': return record.allergen || 'Allergen';
      case 'surgical': return record.procedure || 'Procedure';
      default: return 'Unknown Record';
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType) => {
    if (!fileType) return '📎';
    if (fileType.includes('pdf')) return '📕';
    if (fileType.includes('image')) return '🖼️';
    if (fileType.includes('word') || fileType.includes('document')) return '📄';
    if (fileType.includes('excel') || fileType.includes('spreadsheet')) return '📊';
    if (fileType.includes('zip') || fileType.includes('compressed')) return '🗜️';
    return '📎';
  };

  // Add sample data with uploaded files for demonstration
  useEffect(() => {
    // Check if we already have records
    const hasRecords = healthRecords && Object.values(healthRecords).some(arr => arr && arr.length > 0);
    
    if (!hasRecords) {
      const timer = setTimeout(() => {
        addSampleData();
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const addSampleData = () => {
    const sampleConditions = [
      {
        id: Date.now() + 1,
        condition: 'Hypertension',
        diagnosedDate: '2023-05-15',
        status: 'Chronic',
        severity: 'Moderate',
        treatment: 'Lisinopril 10mg daily, regular monitoring',
        date: '2023-05-15',
        createdAt: '2023-05-15T10:30:00Z',
        updatedAt: '2024-01-10T14:20:00Z',
        files: [
          {
            id: 'file1_' + Date.now(),
            name: 'Hypertension_Diagnosis.pdf',
            type: 'application/pdf',
            size: 2457600,
            uploadedDate: '2023-05-20T09:15:00Z',
            url: '#'
          },
          {
            id: 'file4_' + Date.now(),
            name: 'Blood_Pressure_Chart.xlsx',
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            size: 3145728,
            uploadedDate: '2023-06-10T14:20:00Z',
            url: '#'
          }
        ]
      }
    ];

    const sampleLabResults = [
      {
        id: Date.now() + 2,
        test: 'Complete Blood Count',
        result: 'Normal Range',
        status: 'Normal',
        lab: 'City Medical Labs',
        notes: 'All parameters within normal limits',
        date: '2024-01-05',
        createdAt: '2024-01-05T08:45:00Z',
        updatedAt: '2024-01-05T08:45:00Z',
        files: [
          {
            id: 'file2_' + Date.now(),
            name: 'CBC_Report_Jan2024.pdf',
            type: 'application/pdf',
            size: 3145728,
            uploadedDate: '2024-01-06T11:30:00Z',
            url: '#'
          },
          {
            id: 'file3_' + Date.now(),
            name: 'Lab_Results_Scan.jpg',
            type: 'image/jpeg',
            size: 1572864,
            uploadedDate: '2024-01-06T11:32:00Z',
            url: '#'
          }
        ]
      }
    ];

    const sampleVitals = [
      {
        id: Date.now() + 3,
        type: 'Blood Pressure',
        value: '120/80 mmHg',
        status: 'Normal',
        notes: 'Measured at rest',
        date: '2024-01-10',
        createdAt: '2024-01-10T09:00:00Z',
        updatedAt: '2024-01-10T09:00:00Z',
        files: []
      }
    ];

    // Add sample records
    sampleConditions.forEach(record => {
      addHealthRecord('conditions', record);
    });
    
    sampleLabResults.forEach(record => {
      addHealthRecord('labResults', record);
    });
    
    sampleVitals.forEach(record => {
      addHealthRecord('vitals', record);
    });
  };

  const BackButton = ({ onClick, text = 'Back' }) => (
    <button 
      style={{
        padding: '0.5rem 1rem',
        backgroundColor: 'transparent',
        color: '#009688',
        border: '1px solid #009688',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.9rem',
        transition: 'all 0.3s ease'
      }}
      onClick={onClick}
      type="button"
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#E0F2F1';
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      ← {text}
    </button>
  );

  const styles = {
    container: {
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
      marginTop: '140px',
      minHeight: 'calc(100vh - 120px)',
      width: '100%',
      boxSizing: 'border-box',
      backgroundColor: '#FFFFFF'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
      flexWrap: 'wrap',
      gap: '1rem',
      paddingBottom: '1.5rem',
      borderBottom: '1px solid #E0F2F1'
    },
    title: {
      color: '#124441',
      fontSize: '2rem',
      margin: '0 0 0.5rem 0',
      fontWeight: '700',
      textAlign: 'center',
      flex: 1
    },
    subtitle: {
      color: '#4F6F6B',
      margin: 0,
      fontSize: '1rem',
      textAlign: 'center'
    },
    tabs: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '2rem',
      flexWrap: 'wrap'
    },
    tab: {
      padding: '0.75rem 1.5rem',
      backgroundColor: '#FFFFFF',
      color: '#4F6F6B',
      border: '1px solid #E0F2F1',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      textTransform: 'capitalize'
    },
    activeTab: {
      backgroundColor: '#009688',
      color: '#FFFFFF',
      borderColor: '#009688',
      boxShadow: '0 2px 4px rgba(0, 150, 136, 0.2)'
    },
    contentSection: {
      backgroundColor: '#FFFFFF',
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: '0 2px 15px rgba(18, 68, 65, 0.08)',
      border: '1px solid #E0F2F1',
      minHeight: '400px',
      transition: 'all 0.3s ease'
    },
    sectionTitle: {
      color: '#124441',
      marginBottom: '1.5rem',
      fontSize: '1.3rem',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    recordCard: {
      padding: '1.25rem',
      border: '1px solid #E0F2F1',
      borderRadius: '10px',
      marginBottom: '1rem',
      backgroundColor: '#FFFFFF',
      transition: 'all 0.3s ease',
      boxShadow: '0 1px 3px rgba(18, 68, 65, 0.04)'
    },
    recordTitle: {
      margin: '0 0 0.5rem 0',
      color: '#124441',
      fontSize: '1.1rem',
      fontWeight: '600'
    },
    recordText: {
      margin: '0 0 0.5rem 0',
      color: '#4F6F6B',
      fontSize: '0.9rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    statusBadge: {
      display: 'inline-block',
      padding: '0.25rem 0.75rem',
      borderRadius: '15px',
      fontSize: '0.8rem',
      fontWeight: '500',
      marginLeft: '0.5rem',
      transition: 'all 0.3s ease'
    },
    normalStatus: {
      backgroundColor: '#E0F2F1',
      color: '#065f46',
      border: '1px solid #4DB6AC'
    },
    severeStatus: {
      backgroundColor: '#fee2e2',
      color: '#991b1b',
      border: '1px solid #fca5a5'
    },
    mildStatus: {
      backgroundColor: '#fef3c7',
      color: '#92400e',
      border: '1px solid #fde68a'
    },
    emptyState: {
      textAlign: 'center',
      padding: '3rem 1rem',
      color: '#4F6F6B'
    },
    emptyIcon: {
      fontSize: '3rem',
      marginBottom: '1rem',
      opacity: 0.5,
      color: '#009688'
    },
    addButton: {
      backgroundColor: '#009688',
      color: '#FFFFFF',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '500',
      marginTop: '1rem',
      transition: 'all 0.3s ease'
    },
    addSampleButton: {
      backgroundColor: '#4DB6AC',
      color: '#FFFFFF',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '500',
      marginTop: '1rem',
      transition: 'all 0.3s ease'
    },
    fileManagerButton: {
      backgroundColor: '#607D8B',
      color: '#FFFFFF',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '500',
      marginTop: '1rem',
      transition: 'all 0.3s ease',
      marginLeft: '0.5rem'
    },
    sampleButtonContainer: {
      display: 'flex',
      gap: '1rem',
      marginTop: '1rem',
      justifyContent: 'center'
    }
  };

  // Render Record Content Function
  const renderRecordContent = (record) => {
    switch (activeTab) {
      case 'conditions':
        return (
          <>
            <h4 style={styles.recordTitle}>{record.condition}</h4>
            <p style={styles.recordText}>
              <span style={{ fontWeight: '600', color: '#124441', minWidth: '120px' }}>Diagnosed:</span>
              {record.diagnosedDate ? new Date(record.diagnosedDate).toLocaleDateString() : 'N/A'}
            </p>
            <p style={styles.recordText}>
              <span style={{ fontWeight: '600', color: '#124441', minWidth: '120px' }}>Status:</span>
              {record.status || 'N/A'}
              {record.severity && (
                <span style={{
                  ...styles.statusBadge,
                  ...(record.severity === 'Severe' ? styles.severeStatus : 
                      record.severity === 'Moderate' ? styles.mildStatus : styles.normalStatus)
                }}>
                  {record.severity}
                </span>
              )}
            </p>
            {record.treatment && (
              <p style={styles.recordText}>
                <span style={{ fontWeight: '600', color: '#124441', minWidth: '120px' }}>Treatment:</span>
                {record.treatment}
              </p>
            )}
          </>
        );
      
      case 'labResults':
        return (
          <>
            <h4 style={styles.recordTitle}>{record.test}</h4>
            <p style={styles.recordText}>
              <span style={{ fontWeight: '600', color: '#124441', minWidth: '100px' }}>Result:</span>
              {record.result || 'N/A'}
            </p>
            <p style={styles.recordText}>
              <span style={{ fontWeight: '600', color: '#124441', minWidth: '100px' }}>Status:</span>
              {record.status && (
                <span style={{
                  ...styles.statusBadge,
                  ...(record.status === 'Normal' ? styles.normalStatus : 
                      record.status === 'Critical' ? styles.severeStatus : styles.mildStatus)
                }}>
                  {record.status}
                </span>
              )}
            </p>
            {record.lab && (
              <p style={styles.recordText}>
                <span style={{ fontWeight: '600', color: '#124441', minWidth: '100px' }}>Lab:</span>
                {record.lab}
              </p>
            )}
            <p style={styles.recordText}>
              <span style={{ fontWeight: '600', color: '#124441', minWidth: '100px' }}>Date:</span>
              {record.date ? new Date(record.date).toLocaleDateString() : 'N/A'}
            </p>
          </>
        );
      
      case 'vitals':
        return (
          <>
            <h4 style={styles.recordTitle}>{record.type}</h4>
            <p style={styles.recordText}>
              <span style={{ fontWeight: '600', color: '#124441', minWidth: '100px' }}>Value:</span>
              {record.value || 'N/A'}
            </p>
            <p style={styles.recordText}>
              <span style={{ fontWeight: '600', color: '#124441', minWidth: '100px' }}>Status:</span>
              {record.status && (
                <span style={{
                  ...styles.statusBadge,
                  ...(record.status === 'Normal' ? styles.normalStatus : 
                      record.status === 'High' ? styles.severeStatus : styles.mildStatus)
                }}>
                  {record.status}
                </span>
              )}
            </p>
            <p style={styles.recordText}>
              <span style={{ fontWeight: '600', color: '#124441', minWidth: '100px' }}>Date:</span>
              {record.date ? new Date(record.date).toLocaleDateString() : 'N/A'}
            </p>
          </>
        );
      
      case 'allergies':
        return (
          <>
            <h4 style={styles.recordTitle}>{record.allergen}</h4>
            <p style={styles.recordText}>
              <span style={{ fontWeight: '600', color: '#124441', minWidth: '100px' }}>Severity:</span>
              {record.severity && (
                <span style={{
                  ...styles.statusBadge,
                  ...(record.severity === 'Severe' ? styles.severeStatus : styles.mildStatus)
                }}>
                  {record.severity}
                </span>
              )}
            </p>
            <p style={styles.recordText}>
              <span style={{ fontWeight: '600', color: '#124441', minWidth: '100px' }}>Reaction:</span>
              {record.reaction || 'N/A'}
            </p>
            <p style={styles.recordText}>
              <span style={{ fontWeight: '600', color: '#124441', minWidth: '100px' }}>Diagnosed:</span>
              {record.diagnosed ? new Date(record.diagnosed).toLocaleDateString() : 'N/A'}
            </p>
          </>
        );
      
      case 'surgical':
        return (
          <>
            <h4 style={styles.recordTitle}>{record.procedure}</h4>
            <p style={styles.recordText}>
              <span style={{ fontWeight: '600', color: '#124441', minWidth: '100px' }}>Date:</span>
              {record.date ? new Date(record.date).toLocaleDateString() : 'N/A'}
            </p>
            {record.hospital && (
              <p style={styles.recordText}>
                <span style={{ fontWeight: '600', color: '#124441', minWidth: '100px' }}>Hospital:</span>
                {record.hospital}
              </p>
            )}
            {record.surgeon && (
              <p style={styles.recordText}>
                <span style={{ fontWeight: '600', color: '#124441', minWidth: '100px' }}>Surgeon:</span>
                {record.surgeon}
              </p>
            )}
          </>
        );
      
      default:
        return null;
    }
  };

  const renderContent = () => {
    const records = healthRecords && healthRecords[activeTab] ? healthRecords[activeTab] : [];
    
    if (records.length === 0) {
      return (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>
            {activeTab === 'conditions' && '🏥'}
            {activeTab === 'labResults' && '🧪'}
            {activeTab === 'vitals' && '📊'}
            {activeTab === 'allergies' && '⚠️'}
            {activeTab === 'surgical' && '🔪'}
          </div>
          <h3 style={{ color: '#124441', marginBottom: '0.5rem' }}>
            No {activeTab === 'conditions' ? 'medical conditions' : 
                     activeTab === 'labResults' ? 'lab results' :
                     activeTab === 'vitals' ? 'vital signs' :
                     activeTab === 'allergies' ? 'allergies' : 'surgical history'} found
          </h3>
          <p style={{ color: '#4F6F6B', marginBottom: '1rem' }}>
            Add your first record to start tracking your health history
          </p>
          <div style={styles.sampleButtonContainer}>
            <button 
              style={styles.addButton}
              onClick={() => setShowAddForm(true)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#00796B';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#009688';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              + Add New Record
            </button>
            <button 
              style={styles.addSampleButton}
              onClick={addSampleData}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#26A69A';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#4DB6AC';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Load Sample Data
            </button>
          </div>
        </div>
      );
    }

    return (
      <div>
        <h3 style={styles.sectionTitle}>
          {activeTab === 'conditions' ? '🏥 Medical Conditions' :
           activeTab === 'labResults' ? '🧪 Lab Results' :
           activeTab === 'vitals' ? '📊 Vital Signs' :
           activeTab === 'allergies' ? '⚠️ Allergies' : '🔪 Surgical History'}
          <span style={{ 
            fontSize: '0.9rem', 
            color: '#4F6F6B', 
            marginLeft: '0.5rem',
            fontWeight: 'normal' 
          }}>
            ({records.length} records)
          </span>
        </h3>
        
        {records.map(record => (
          <div 
            key={record.id} 
            style={styles.recordCard}
          >
            {renderRecordContent(record)}
            
            {/* Display attached files */}
            {record.files && record.files.length > 0 && (
              <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #E0F2F1' }}>
                <p style={{ ...styles.recordText, marginBottom: '0.5rem', fontWeight: '600' }}>
                  📎 Attachments ({record.files.length}):
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {record.files.map(file => (
                    <a
                      key={file.id || file.name}
                      href={file.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        padding: '0.4rem 0.75rem',
                        backgroundColor: '#F8FCFC',
                        border: '1px solid #E0F2F1',
                        borderRadius: '6px',
                        color: '#009688',
                        textDecoration: 'none',
                        fontSize: '0.85rem',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#E0F2F1';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#F8FCFC';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                      onClick={(e) => {
                        if (!file.url || file.url === '#') {
                          e.preventDefault();
                          alert(`File: ${file.name}\nSize: ${formatFileSize(file.size)}`);
                        }
                      }}
                    >
                      <span style={{ fontSize: '0.9rem' }}>
                        {getFileIcon(file.type)}
                      </span>
                      {file.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={styles.container}>
      {/* Add Record Modal */}
      <AddRecordForm
        activeTab={activeTab}
        showAddForm={showAddForm}
        setShowAddForm={setShowAddForm}
        addHealthRecord={addHealthRecord}
        uploadedFiles={uploadedFiles}
        setUploadedFiles={setUploadedFiles}
      />
      
      {/* File Manager Modal */}
      {showFileManager && (
        <FileManager
          allFiles={allFiles}
          setShowFileManager={setShowFileManager}
          healthRecords={healthRecords}
          addSampleData={addSampleData}
        />
      )}
      
      {/* Header */}
      <div style={styles.header}>
        <BackButton onClick={() => setActiveView('dashboard')} text="Dashboard" />
        
        <div style={{ textAlign: 'center', flex: 1 }}>
          <h1 style={styles.title}>Health Records</h1>
          <p style={styles.subtitle}>Complete medical history and health documents</p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', width: 'auto' }}>
          <button 
            style={{
              ...styles.fileManagerButton,
              padding: '0.5rem 1rem',
              fontSize: '0.8rem'
            }}
            onClick={() => setShowFileManager(true)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#546E7A';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#607D8B';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            📁 File Manager
            {allFiles.length > 0 && (
              <span style={{ 
                marginLeft: '0.25rem',
                backgroundColor: '#009688',
                color: 'white',
                borderRadius: '10px',
                padding: '0.1rem 0.4rem',
                fontSize: '0.7rem'
              }}>
                {allFiles.length}
              </span>
            )}
          </button>
          
          <button 
            style={{
              ...styles.addButton,
              padding: '0.5rem 1rem',
              fontSize: '0.8rem'
            }}
            onClick={() => setShowAddForm(true)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#00796B';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#009688';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            + Add Record
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        {['conditions', 'labResults', 'vitals', 'allergies', 'surgical'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              ...styles.tab,
              ...(activeTab === tab ? styles.activeTab : {})
            }}
            type="button"
            onMouseEnter={(e) => {
              if (activeTab !== tab) {
                e.currentTarget.style.borderColor = '#009688';
                e.currentTarget.style.backgroundColor = '#E0F2F1';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab) {
                e.currentTarget.style.borderColor = '#E0F2F1';
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
          >
            {tab === 'conditions' ? '🏥 Medical Conditions' :
             tab === 'labResults' ? '🧪 Lab Results' :
             tab === 'vitals' ? '📊 Vital Signs' :
             tab === 'allergies' ? '⚠️ Allergies' : '🔪 Surgical History'}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={styles.contentSection}>
        {renderContent()}
      </div>
    </div>
  );
};

export default HealthRecordsView;