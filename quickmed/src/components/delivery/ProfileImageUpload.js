import React, { useState, useRef } from 'react';

const ProfileImageUpload = ({ currentImage, onImageChange, onCancel }) => {
  const [previewUrl, setPreviewUrl] = useState(currentImage);
  const fileInputRef = useRef(null);

  const styles = {
    profileImageModal: {
      backgroundColor: 'white',
      borderRadius: '12px',
      width: '90%',
      maxWidth: '500px',
      maxHeight: '90vh',
      overflow: 'auto',
      boxShadow: '0 20px 25px -5px rgba(0,150,136,0.2)',
      border: '1px solid #4DB6AC'
    },
    profileImageHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '24px',
      borderBottom: '1px solid #4DB6AC',
      backgroundColor: '#E0F2F1'
    },
    headerText: {
      margin: 0,
      fontSize: '18px',
      fontWeight: '600',
      color: '#124441'
    },
    closeButton: {
      backgroundColor: 'transparent',
      border: 'none',
      fontSize: '20px',
      cursor: 'pointer',
      color: '#4F6F6B',
      transition: 'color 0.2s ease'
    },
    profileImageContent: {
      padding: '24px'
    },
    imagePreviewContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '20px'
    },
    imagePreview: {
      width: '150px',
      height: '150px',
      borderRadius: '50%',
      overflow: 'hidden',
      border: '4px solid #009688',
      position: 'relative',
      boxShadow: '0 4px 12px rgba(0,150,136,0.2)',
      transition: 'transform 0.3s ease'
    },
    previewImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    placeholderImage: {
      width: '100%',
      height: '100%',
      backgroundColor: '#E0F2F1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '48px',
      color: '#4DB6AC'
    },
    imageActions: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'center',
      marginBottom: '20px',
      flexWrap: 'wrap'
    },
    primaryButton: {
      backgroundColor: '#009688',
      color: 'white',
      border: 'none',
      padding: '10px 16px',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      transition: 'all 0.3s ease'
    },
    dangerButton: {
      backgroundColor: 'transparent',
      color: '#f44336',
      border: '1px solid #f44336',
      padding: '10px 16px',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      transition: 'all 0.3s ease'
    },
    imageTips: {
      backgroundColor: '#E0F2F1',
      padding: '16px',
      borderRadius: '8px',
      border: '1px solid #4DB6AC',
      marginTop: '16px'
    },
    tipTitle: {
      margin: '0 0 8px 0',
      fontSize: '14px',
      fontWeight: '600',
      color: '#124441'
    },
    tipText: {
      margin: '4px 0',
      fontSize: '12px',
      color: '#4F6F6B'
    },
    profileImageFooter: {
      padding: '16px 24px',
      borderTop: '1px solid #4DB6AC',
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '12px',
      backgroundColor: '#E0F2F1'
    },
    secondaryButton: {
      backgroundColor: 'transparent',
      color: '#009688',
      border: '1px solid #009688',
      padding: '9px 15px',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    successButton: {
      backgroundColor: '#009688',
      color: 'white',
      border: 'none',
      padding: '10px 16px',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      transition: 'all 0.3s ease'
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (previewUrl && previewUrl !== currentImage) {
      onImageChange(previewUrl);
    }
    onCancel();
  };

  const handleRemove = () => {
    setPreviewUrl(null);
  };

  return (
    <div style={styles.profileImageModal}>
      <div style={styles.profileImageHeader}>
        <h3 style={styles.headerText}>Update Profile Image</h3>
        <button 
          style={styles.closeButton} 
          onClick={onCancel}
          onMouseEnter={(e) => e.target.style.color = '#124441'}
          onMouseLeave={(e) => e.target.style.color = '#4F6F6B'}
        >
          ✕
        </button>
      </div>
      
      <div style={styles.profileImageContent}>
        <div style={styles.imagePreviewContainer}>
          <div 
            style={styles.imagePreview}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            {previewUrl ? (
              <img src={previewUrl} alt="Profile preview" style={styles.previewImage} />
            ) : (
              <div style={styles.placeholderImage}>👤</div>
            )}
          </div>
        </div>

        <div style={styles.imageActions}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            style={{ display: 'none' }}
          />
          <button
            style={styles.primaryButton}
            onClick={() => fileInputRef.current?.click()}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#00796B';
              e.target.style.boxShadow = '0 4px 8px rgba(0,150,136,0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#009688';
              e.target.style.boxShadow = 'none';
            }}
          >
            📁 Choose Image
          </button>
          {previewUrl && (
            <button
              style={styles.dangerButton}
              onClick={handleRemove}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f44336';
                e.target.style.color = 'white';
                e.target.style.boxShadow = '0 4px 8px rgba(244,67,54,0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#f44336';
                e.target.style.boxShadow = 'none';
              }}
            >
              🗑️ Remove
            </button>
          )}
        </div>

        <div style={styles.imageTips}>
          <h4 style={styles.tipTitle}>Image Requirements</h4>
          <p style={styles.tipText}>• Maximum file size: 5MB</p>
          <p style={styles.tipText}>• Supported formats: JPG, PNG, WebP</p>
          <p style={styles.tipText}>• Recommended size: 500x500 pixels</p>
          <p style={styles.tipText}>• Square images work best</p>
        </div>
      </div>

      <div style={styles.profileImageFooter}>
        <button 
          style={styles.secondaryButton} 
          onClick={onCancel}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#009688';
            e.target.style.color = 'white';
            e.target.style.boxShadow = '0 4px 8px rgba(0,150,136,0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#009688';
            e.target.style.boxShadow = 'none';
          }}
        >
          Cancel
        </button>
        <button 
          style={styles.successButton} 
          onClick={handleSave}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#00796B';
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 12px rgba(0,150,136,0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#009688';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfileImageUpload;