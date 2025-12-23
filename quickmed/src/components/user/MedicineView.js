import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import MedicineCard from './MedicineCard';
import PharmacyCard from './PharmacyCard';

// Inline Notification Component
const Notification = ({ message, type = 'info', onClose }) => {
  const getTypeStyles = () => {
    switch(type) {
      case 'success':
        return {
          backgroundColor: '#4CAF50',
          color: 'white',
          borderColor: '#388E3C'
        };
      case 'error':
        return {
          backgroundColor: '#F44336',
          color: 'white',
          borderColor: '#D32F2F'
        };
      case 'warning':
        return {
          backgroundColor: '#FF9800',
          color: 'white',
          borderColor: '#F57C00'
        };
      case 'info':
      default:
        return {
          backgroundColor: '#2196F3',
          color: 'white',
          borderColor: '#1976D2'
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '1rem 1.5rem',
      backgroundColor: styles.backgroundColor,
      color: styles.color,
      border: `1px solid ${styles.borderColor}`,
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: 9999,
      minWidth: '300px',
      maxWidth: 'min(400px, 90vw)',
      animation: 'slideIn 0.3s ease-out',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem'
    }}>
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontSize: '0.95rem' }}>{message}</p>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClose();
        }}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          fontSize: '1.2rem',
          padding: 0,
          width: '24px',
          height: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          transition: 'background-color 0.2s ease',
          ':hover': {
            backgroundColor: 'rgba(255,255,255,0.2)'
          }
        }}
        type="button"
      >
        ×
      </button>
      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

// Create inline components to avoid circular dependencies
const PrescriptionUploadModal = ({
  prescription,
  onClose,
  onUploadToVendor,
  showNotification
}) => {
  const [selectedVendor, setSelectedVendor] = useState('');
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    // Load available vendors
    const availableVendors = [
      { id: 'vendor-1', name: 'City Pharmacy', approvalTime: '1-2 hours' },
      { id: 'vendor-2', name: 'MedPlus', approvalTime: '2-3 hours' },
      { id: 'vendor-3', name: 'Apollo Pharmacy', approvalTime: '30 minutes - 1 hour' },
      { id: 'vendor-4', name: 'Local Medical Store', approvalTime: 'Immediate' }
    ];
    setVendors(availableVendors);
  }, []);

  const handleUploadToVendor = () => {
    if (!selectedVendor) {
      showNotification('Please select a vendor', 'error');
      return;
    }

    const vendor = vendors.find(v => v.id === selectedVendor);
    onUploadToVendor(prescription, vendor);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem',
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: 'clamp(1rem, 2vw, 2rem)',
        borderRadius: '15px',
        maxWidth: '500px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
        }}>
          <h3 style={{ margin: 0, color: '#009688', fontSize: 'clamp(1.1rem, 1.5vw, 1.25rem)' }}>
            Upload Prescription to Vendor
          </h3>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#666'
            }}
            type="button"
          >
            ×
          </button>
        </div>

        {prescription && (
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{
              padding: '1rem',
              backgroundColor: '#E3F2FD',
              borderRadius: '8px',
              marginBottom: '1rem'
            }}>
              <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>Prescription Details:</p>
              <p style={{ margin: '0 0 0.25rem 0' }}><strong>File:</strong> {prescription.name}</p>
              <p style={{ margin: '0 0 0.25rem 0' }}><strong>Size:</strong> {(prescription.size / 1024).toFixed(2)} KB</p>
              <p style={{ margin: '0 0 0.25rem 0' }}><strong>Type:</strong> {prescription.type}</p>
              <p style={{ margin: 0 }}><strong>Uploaded:</strong> {new Date(prescription.uploadDate).toLocaleString()}</p>
            </div>
          </div>
        )}

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Select Vendor for Approval
          </label>
          <select
            value={selectedVendor}
            onChange={(e) => setSelectedVendor(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #E0F2F1',
              borderRadius: '8px',
              fontSize: '1rem',
              backgroundColor: 'white'
            }}
          >
            <option value="">-- Select a vendor --</option>
            {vendors.map(vendor => (
              <option key={vendor.id} value={vendor.id}>
                {vendor.name} (Approval: {vendor.approvalTime})
              </option>
            ))}
          </select>
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
            The vendor will review your prescription and approve/reject it.
          </p>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '1rem',
          marginTop: '1.5rem',
          flexWrap: 'wrap',
        }}>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: 'transparent',
              color: '#666',
              border: '1px solid #ddd',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              flex: '1',
              minWidth: '120px',
            }}
            type="button"
          >
            Cancel
          </button>
          <button
            onClick={handleUploadToVendor}
            disabled={!selectedVendor}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: selectedVendor ? '#4CAF50' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: selectedVendor ? 'pointer' : 'not-allowed',
              fontSize: '1rem',
              flex: '1',
              minWidth: '120px',
            }}
            type="button"
          >
            Upload to Vendor
          </button>
        </div>
      </div>
    </div>
  );
};

const PrescriptionHistoryModal = ({
  prescriptions,
  onClose,
  showNotification,
  onReorder,
  onViewDocument
}) => {
  const [viewingDocument, setViewingDocument] = useState(null);
  const [documentUrl, setDocumentUrl] = useState(null);

  const handleViewDocument = (prescription) => {
    if (prescription.file) {
      const url = URL.createObjectURL(prescription.file);
      setDocumentUrl(url);
      setViewingDocument(prescription);
    } else if (prescription.documentUrl) {
      setDocumentUrl(prescription.documentUrl);
      setViewingDocument(prescription);
    } else {
      showNotification('Document not available for viewing', 'error');
    }
  };

  const handleCloseDocumentViewer = () => {
    if (documentUrl && documentUrl.startsWith('blob:')) {
      URL.revokeObjectURL(documentUrl);
    }
    setDocumentUrl(null);
    setViewingDocument(null);
  };

  useEffect(() => {
    return () => {
      if (documentUrl && documentUrl.startsWith('blob:')) {
        URL.revokeObjectURL(documentUrl);
      }
    };
  }, [documentUrl]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem',
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: 'clamp(1rem, 2vw, 2rem)',
        borderRadius: '15px',
        maxWidth: viewingDocument ? '90%' : 'min(800px, 95vw)',
        width: '100%',
        maxHeight: '80vh',
        overflowY: 'auto',
        position: 'relative',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
        }}>
          <h3 style={{ margin: 0, color: '#009688', fontSize: 'clamp(1.1rem, 1.5vw, 1.25rem)' }}>
            {viewingDocument ? `Viewing: ${viewingDocument.name}` : 'Prescription History'}
          </h3>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (viewingDocument) {
                handleCloseDocumentViewer();
              } else {
                onClose();
              }
            }}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#666'
            }}
            type="button"
          >
            ×
          </button>
        </div>

        {viewingDocument && documentUrl ? (
          <div style={{
            width: '100%',
            height: '60vh',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {viewingDocument.type.includes('image') ? (
              <div style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
                overflow: 'hidden'
              }}>
                <img
                  src={documentUrl}
                  alt={viewingDocument.name}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain'
                  }}
                  onError={() => showNotification('Failed to load document', 'error')}
                />
              </div>
            ) : viewingDocument.type === 'application/pdf' ? (
              <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                <iframe
                  src={documentUrl}
                  title={viewingDocument.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    borderRadius: '8px'
                  }}
                />
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '1rem'
                }}>
                  <a
                    href={documentUrl}
                    download={viewingDocument.name}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#2196F3',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '6px',
                      fontSize: '0.9rem'
                    }}
                  >
                    Download PDF
                  </a>
                </div>
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '2rem',
                color: '#666'
              }}>
                <p>Document format not supported for preview.</p>
                <a
                  href={documentUrl}
                  download={viewingDocument.name}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#2196F3',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    marginTop: '1rem',
                    display: 'inline-block'
                  }}
                >
                  Download Document
                </a>
              </div>
            )}
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              flexWrap: 'wrap',
              gap: '0.5rem',
            }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <p style={{ margin: 0, fontWeight: 'bold' }}>{viewingDocument.name}</p>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem', color: '#666' }}>
                  Uploaded: {new Date(viewingDocument.uploadDate).toLocaleString()}
                </p>
              </div>
              <button
                onClick={handleCloseDocumentViewer}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'transparent',
                  color: '#666',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  whiteSpace: 'nowrap',
                }}
                type="button"
              >
                Back to History
              </button>
            </div>
          </div>
        ) : prescriptions.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>No prescription history found.</p>
          </div>
        ) : (
          <div>
            {prescriptions.map((prescription, index) => (
              <div
                key={prescription.id || index}
                style={{
                  border: '1px solid #E0E0E0',
                  borderRadius: '10px',
                  padding: '1rem',
                  marginBottom: '1rem',
                  backgroundColor: prescription.status === 'approved' ? '#E8F5E9' :
                                  prescription.status === 'rejected' ? '#FFEBEE' : '#FFF3E0'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '1rem',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                }}>
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>{prescription.name}</h4>
                      <button
                        onClick={() => handleViewDocument(prescription)}
                        style={{
                          padding: '0.25rem 0.5rem',
                          backgroundColor: '#2196F3',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.8rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          whiteSpace: 'nowrap',
                        }}
                        type="button"
                      >
                        📄 View
                      </button>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
                      Uploaded: {new Date(prescription.uploadDate).toLocaleString()}
                    </p>
                  </div>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    backgroundColor: prescription.status === 'approved' ? '#4CAF50' :
                                    prescription.status === 'rejected' ? '#F44336' : '#FF9800',
                    color: 'white',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    whiteSpace: 'nowrap',
                  }}>
                    {prescription.status?.toUpperCase() || 'PENDING'}
                  </span>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>Details:</p>
                  <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem' }}>
                    <strong>Vendor:</strong> {prescription.vendor?.name || 'Not assigned'}
                  </p>
                  <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem' }}>
                    <strong>Type:</strong> {prescription.type}
                  </p>
                  <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem' }}>
                    <strong>Size:</strong> {(prescription.size / 1024).toFixed(2)} KB
                  </p>
                </div>

                {prescription.status === 'approved' && prescription.medicines && (
                  <div style={{ marginBottom: '1rem' }}>
                    <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>Approved Medicines:</p>
                    <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                      {prescription.medicines.map((medicine, idx) => (
                        <li key={idx} style={{ fontSize: '0.9rem' }}>
                          {medicine.name} - ${medicine.price}
                          {medicine.deliveryStatus && (
                            <span style={{
                              marginLeft: '0.5rem',
                              padding: '0.1rem 0.4rem',
                              backgroundColor: '#2196F3',
                              color: 'white',
                              borderRadius: '10px',
                              fontSize: '0.7rem'
                            }}>
                              {medicine.deliveryStatus}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                    <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#2E7D32' }}>
                      ✅ Prescription accepted! Medicines assigned to delivery agent.
                    </p>
                  </div>
                )}

                {prescription.status === 'rejected' && (
                  <div style={{
                    padding: '0.75rem',
                    backgroundColor: '#FFF3E0',
                    borderRadius: '6px',
                    marginBottom: '1rem'
                  }}>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#D32F2F' }}>
                      ❌ Prescription rejected: {prescription.rejectionReason || 'Medicine is highly risked, not accepted'}
                    </p>
                    {prescription.vendorNotes && (
                      <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#666' }}>
                        <strong>Vendor Notes:</strong> {prescription.vendorNotes}
                      </p>
                    )}
                  </div>
                )}

                {prescription.status === 'approved' && (
                  <div style={{ textAlign: 'right' }}>
                    <button
                      onClick={() => onReorder(prescription)}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#2196F3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                      }}
                      type="button"
                    >
                      Reorder
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const OrderHistory = ({ userId, onClose, showNotification }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderHistory();
  }, [userId]);

  const fetchOrderHistory = async () => {
    try {
      const mockOrders = [
        {
          id: 'order-001',
          date: '2024-01-15T10:30:00Z',
          items: ['Amoxicillin 500mg', 'Paracetamol 500mg'],
          total: 28.97,
          status: 'delivered',
          prescriptionId: 'rx-001',
          vendor: 'City Pharmacy',
          deliveryPartner: 'John Doe'
        },
        {
          id: 'order-002',
          date: '2024-01-10T14:20:00Z',
          items: ['Cetirizine 10mg'],
          total: 5.99,
          status: 'cancelled',
          prescriptionId: 'rx-002',
          vendor: null,
          cancellationReason: 'Prescription not approved by vendor'
        }
      ];
      
      setOrders(mockOrders);
    } catch (error) {
      console.error('Error fetching order history:', error);
      showNotification('Error loading order history', 'error');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'delivered': return '#4CAF50';
      case 'pending': return '#FF9800';
      case 'cancelled': return '#F44336';
      default: return '#666';
    }
  };

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      padding: 'clamp(1rem, 2vw, 2rem)',
      borderRadius: '15px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <h3 style={{ color: '#009688', margin: 0, fontSize: 'clamp(1.1rem, 1.5vw, 1.25rem)' }}>Order History</h3>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          }}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: 'transparent',
            color: '#009688',
            border: '1px solid #009688',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#E0F2F1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
          type="button"
        >
          ← Back to Medicines
        </button>
      </div>

      {loading ? (
        <p>Loading order history...</p>
      ) : orders.length === 0 ? (
        <p>No order history found.</p>
      ) : (
        <div>
          {orders.map(order => (
            <div
              key={order.id}
              style={{
                border: '1px solid #E0E0E0',
                borderRadius: '10px',
                padding: '1rem',
                marginBottom: '1rem',
                backgroundColor: order.status === 'cancelled' ? '#FFF3E0' : '#FAFAFA'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1rem',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}>
                <div>
                  <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>Order #{order.id}</h4>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
                    {new Date(order.date).toLocaleDateString()} - {new Date(order.date).toLocaleTimeString()}
                  </p>
                </div>
                <span style={{
                  padding: '0.25rem 0.5rem',
                  backgroundColor: getStatusColor(order.status),
                  color: 'white',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  whiteSpace: 'nowrap',
                }}>
                  {order.status.toUpperCase()}
                </span>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>Items:</p>
                <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                  {order.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                fontSize: '0.9rem',
                flexWrap: 'wrap',
                gap: '1rem',
              }}>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <p style={{ margin: '0 0 0.25rem 0' }}>
                    <strong>Total:</strong> ${order.total.toFixed(2)}
                  </p>
                  {order.prescriptionId && (
                    <p style={{ margin: 0, color: '#666' }}>
                      Prescription: {order.prescriptionId}
                    </p>
                  )}
                </div>

                <div style={{ flex: 1, minWidth: '200px', textAlign: 'left' }}>
                  {order.vendor && (
                    <p style={{ margin: '0 0 0.25rem 0' }}>
                      <strong>Vendor:</strong> {order.vendor}
                    </p>
                  )}
                  {order.deliveryPartner && (
                    <p style={{ margin: 0, color: '#666' }}>
                      Delivery: {order.deliveryPartner}
                    </p>
                  )}
                  {order.cancellationReason && (
                    <p style={{ margin: 0, color: '#F44336' }}>
                      <strong>Reason:</strong> {order.cancellationReason}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const MedicineView = ({ 
  searchQuery, 
  setSearchQuery, 
  filteredMedicines, 
  medicines,
  pharmacies, 
  setActiveView, 
  addToCart, 
  updateQuantity, 
  cart, 
  handlePrescriptionUpload,
  viewPharmacyStore,
  handlePharmacySearch,
  pharmacySearchQueries,
  startDoctorChat,
  user,
  setCart,
  updateCartFromPrescription
}) => {
  
  const [prescriptionModalOpen, setPrescriptionModalOpen] = useState(false);
  const [prescriptionHistoryModalOpen, setPrescriptionHistoryModalOpen] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const [userPrescriptions, setUserPrescriptions] = useState([]);
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'info'
  });

  const shouldPreserveScrollRef = useRef(false);
  const preservedScrollPositionRef = useRef(0);
  const scrollRestoreTimeoutRef = useRef(null);

  // Load user's prescription history on component mount
  useEffect(() => {
    fetchPrescriptionHistory();
  }, []);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (scrollRestoreTimeoutRef.current) {
        clearTimeout(scrollRestoreTimeoutRef.current);
      }
    };
  }, []);

  const saveScrollPosition = useCallback(() => {
    preservedScrollPositionRef.current = window.scrollY || document.documentElement.scrollTop;
    shouldPreserveScrollRef.current = true;
  }, []);

  const restoreScrollPosition = useCallback(() => {
    if (shouldPreserveScrollRef.current && preservedScrollPositionRef.current > 0) {
      if (scrollRestoreTimeoutRef.current) {
        clearTimeout(scrollRestoreTimeoutRef.current);
      }
      
      requestAnimationFrame(() => {
        window.scrollTo({
          top: preservedScrollPositionRef.current,
          behavior: 'instant'
        });
        shouldPreserveScrollRef.current = false;
      });
    }
  }, []);

  // Handle scroll position for all state changes including cart updates
  useEffect(() => {
    if (shouldPreserveScrollRef.current) {
      scrollRestoreTimeoutRef.current = setTimeout(() => {
        restoreScrollPosition();
      }, 100);
    }
    
    return () => {
      if (scrollRestoreTimeoutRef.current) {
        clearTimeout(scrollRestoreTimeoutRef.current);
      }
    };
  }, [showOrderHistory, prescriptionModalOpen, prescriptionHistoryModalOpen, cart, restoreScrollPosition]);

  const fetchPrescriptionHistory = () => {
    const mockPrescriptions = [
      {
        id: 'rx-001',
        name: 'doctor_prescription.pdf',
        size: 102400,
        type: 'application/pdf',
        uploadDate: '2024-01-15T10:30:00Z',
        vendor: { id: 'vendor-1', name: 'City Pharmacy' },
        status: 'approved',
        medicines: [
          { id: 'med-1', name: 'Amoxicillin 500mg', price: 12.99, deliveryStatus: 'In Transit' },
          { id: 'med-2', name: 'Paracetamol 500mg', price: 5.99, deliveryStatus: 'Delivered' }
        ],
        approvalDate: '2024-01-15T12:45:00Z',
        documentUrl: 'https://example.com/sample-prescription.pdf'
      },
      {
        id: 'rx-002',
        name: 'prescription.jpg',
        size: 51200,
        type: 'image/jpeg',
        uploadDate: '2024-01-10T14:20:00Z',
        vendor: { id: 'vendor-2', name: 'MedPlus' },
        status: 'rejected',
        rejectionReason: 'Medicine is highly risked, not accepted',
        vendorNotes: 'Requires specialist consultation',
        documentUrl: 'https://example.com/sample-prescription.jpg'
      },
      {
        id: 'rx-003',
        name: 'medical_report.pdf',
        size: 204800,
        type: 'application/pdf',
        uploadDate: '2024-01-05T09:15:00Z',
        vendor: null,
        status: 'pending',
        documentUrl: 'https://example.com/sample-prescription.pdf'
      }
    ];
    setUserPrescriptions(mockPrescriptions);
  };

  // Show notification function
  const showNotification = useCallback((message, type = 'info', duration = 3000) => {
    setNotification({
      show: true,
      message,
      type
    });
    
    setTimeout(() => {
      setNotification({
        show: false,
        message: '',
        type: 'info'
      });
    }, duration);
  }, []);

  // Hide notification
  const hideNotification = useCallback(() => {
    setNotification({
      show: false,
      message: '',
      type: 'info'
    });
  }, []);

  // Enhanced navigation handler
  const handleBackToDashboard = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setActiveView('dashboard');
    }, 100);
  }, [setActiveView]);

  // Handle prescription upload
  const handlePrescriptionUploadWithValidation = useCallback(async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showNotification('File size exceeds 5MB limit', 'error');
      return;
    }

    // Check file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      showNotification('Invalid file type. Please upload JPG, PNG, or PDF', 'error');
      return;
    }

    saveScrollPosition();
    
    const prescription = {
      id: `rx-${Date.now()}`,
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date().toISOString(),
      status: 'pending'
    };
    
    setSelectedPrescription(prescription);
    setPrescriptionModalOpen(true);
    
    e.target.value = '';
  }, [showNotification, saveScrollPosition]);

  // Upload prescription to vendor for approval
  const handleUploadToVendor = useCallback((prescription, vendor) => {
    saveScrollPosition();
    
    const newPrescription = {
      ...prescription,
      vendor,
      status: 'pending',
      uploadDate: new Date().toISOString()
    };
    
    setUserPrescriptions(prev => [newPrescription, ...prev]);
    
    showNotification(
      `Prescription uploaded to ${vendor.name}. Waiting for approval.`,
      'info'
    );
    
    simulateVendorApproval(newPrescription, vendor);
  }, [showNotification, saveScrollPosition]);

  // Simulate vendor approval process
  const simulateVendorApproval = useCallback((prescription, vendor) => {
    const delay = Math.random() * 10000 + 5000;
    
    setTimeout(() => {
      const isApproved = Math.random() > 0.3;
      
      setUserPrescriptions(prev =>
        prev.map(p =>
          p.id === prescription.id
            ? {
                ...p,
                status: isApproved ? 'approved' : 'rejected',
                ...(isApproved
                  ? {
                      approvalDate: new Date().toISOString(),
                      medicines: [
                        {
                          id: 'med-1',
                          name: 'Amoxicillin 500mg',
                          price: 12.99,
                          deliveryStatus: 'Pending Dispatch'
                        },
                        {
                          id: 'med-2',
                          name: 'Paracetamol 500mg',
                          price: 5.99,
                          deliveryStatus: 'Pending Dispatch'
                        }
                      ]
                    }
                  : {
                      rejectionReason: 'Medicine is highly risked, not accepted',
                      vendorNotes: 'Requires specialist consultation'
                    })
              }
            : p
        )
      );

      if (isApproved) {
        showNotification(
          `✅ Prescription accepted by ${vendor.name}! Medicines assigned to delivery agent.`,
          'success',
          5000
        );
        
        addApprovedMedicinesToCart(prescription.id, vendor);
      } else {
        showNotification(
          `❌ Prescription rejected by ${vendor.name}: Medicine is highly risked, not accepted`,
          'error',
          5000
        );
      }
    }, delay);
  }, [showNotification]);

  // Add approved medicines to cart
  const addApprovedMedicinesToCart = useCallback((prescriptionId, vendor) => {
    saveScrollPosition();
    
    const prescription = userPrescriptions.find(p => p.id === prescriptionId);
    if (!prescription || !prescription.medicines) return;
    
    prescription.medicines.forEach(medicine => {
      const cartItem = {
        ...medicine,
        prescriptionId: prescriptionId,
        prescriptionRequired: true,
        vendorId: vendor.id,
        vendorName: vendor.name,
        vendorStatus: 'approved',
        quantity: 1
      };
      
      addToCart(cartItem);
    });
  }, [userPrescriptions, addToCart, saveScrollPosition]);

  // Handle reorder from prescription history
  const handleReorder = useCallback((prescription) => {
    if (prescription.status !== 'approved' || !prescription.medicines) {
      showNotification('Cannot reorder from this prescription', 'error');
      return;
    }
    
    saveScrollPosition();
    
    prescription.medicines.forEach(medicine => {
      const cartItem = {
        ...medicine,
        prescriptionId: prescription.id,
        prescriptionRequired: true,
        vendorId: prescription.vendor.id,
        vendorName: prescription.vendor.name,
        vendorStatus: 'approved',
        quantity: 1
      };
      
      addToCart(cartItem);
    });
    
    showNotification('Medicines added to cart from prescription history', 'success');
    setPrescriptionHistoryModalOpen(false);
  }, [addToCart, showNotification, saveScrollPosition]);

  // Custom addToCart handler - optimized to prevent multiple renders
  const handleAddToCart = useCallback((item) => {
    saveScrollPosition();
    
    setTimeout(() => {
      addToCart(item);
      showNotification(`${item.name} added to cart`, 'success');
    }, 0);
  }, [addToCart, saveScrollPosition, showNotification]);

  // Custom updateQuantity handler
  const handleUpdateQuantity = useCallback((medicineId, newQuantity) => {
    saveScrollPosition();
    
    setTimeout(() => {
      updateQuantity(medicineId, newQuantity);
    }, 0);
  }, [updateQuantity, saveScrollPosition]);

  // Memoize categorized medicines to prevent unnecessary re-renders
  const categorizedMedicines = useMemo(() => ({
    prescription: filteredMedicines.filter(med => med.prescriptionRequired),
    otc: filteredMedicines.filter(med => !med.prescriptionRequired),
    featured: filteredMedicines.filter(med => med.featured)
  }), [filteredMedicines]);

  const safePharmacies = Array.isArray(pharmacies) ? pharmacies : [];

  // Get pending prescription count
  const pendingPrescriptionsCount = userPrescriptions.filter(p => p.status === 'pending').length;

  // Handle modal close with scroll preservation
  const handleCloseModal = useCallback((setter) => {
    saveScrollPosition();
    setter(false);
  }, [saveScrollPosition]);

  // BackButton component with hover effects
  const BackButton = useMemo(() => ({ onClick, text = 'Back' }) => (
    <button 
      style={{
        padding: '0.5rem 1rem',
        backgroundColor: 'transparent',
        color: '#009688',
        border: '1px solid #009688',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.9rem',
        transition: 'all 0.3s ease',
        whiteSpace: 'nowrap',
      }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick(e);
      }}
      type="button"
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#E0F2F1';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      ← {text}
    </button>
  ), []);

  return (
    <div 
      style={{
        padding: 'clamp(1rem, 2vw, 2rem)',
        maxWidth: '1200px',
        margin: 'clamp(80px, 10vw, 130px) auto 0',
        minHeight: 'calc(100vh - 140px)',
        position: 'relative'
      }}
      key="medicine-view"
    >
      
      {/* Inline Notification */}
      {notification.show && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={hideNotification}
        />
      )}

      {/* Header with Back Button and Order History */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <BackButton onClick={handleBackToDashboard} text="" />
          <h2 style={{
            color: '#009688',
            fontSize: 'clamp(1.2rem, 1.5vw, 1.5rem)',
            margin: 0,
          }}>Medicine Delivery</h2>
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              saveScrollPosition();
              setPrescriptionHistoryModalOpen(true);
            }}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap',
            }}
            type="button"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1976D2';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#2196F3';
            }}
          >
            <span style={{ fontSize: '0.9rem' }}>📋</span>
            <span>Prescription History</span>
            {pendingPrescriptionsCount > 0 && (
              <span style={{
                backgroundColor: '#FF9800',
                color: 'white',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                fontSize: '0.7rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {pendingPrescriptionsCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {showOrderHistory ? (
        <OrderHistory
          userId={user?.id}
          onClose={(e) => {
            if (e) {
              e.preventDefault();
              e.stopPropagation();
            }
            saveScrollPosition();
            setShowOrderHistory(false);
          }}
          showNotification={showNotification}
        />
      ) : (
        <div style={{ width: '100%' }}>
          {/* Search and Prescription Section - UPDATED FOR RESPONSIVENESS */}
          <section style={{
            backgroundColor: '#FFFFFF',
            padding: 'clamp(1rem, 1.5vw, 1.5rem)',
            borderRadius: '15px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            marginBottom: '1.5rem',
          }}>
            <div style={{
              display: 'flex',
              gap: '0.75rem',
              marginBottom: '0',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}>
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                alignItems: 'center',
                flex: '1',
                minWidth: '250px',
              }}>
                <input
                  type="text"
                  placeholder="Search for medicines, vendors, or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    border: '2px solid #E0F2F1',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    transition: 'border-color 0.3s ease',
                    height: '38px',
                    minWidth: '200px',
                  }}
                />
              </div>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '0.25rem',
                flex: '0 0 auto',
              }}>
                <label style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#4DB6AC',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  height: '38px',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.3s ease',
                  width: '100%',
                  justifyContent: 'center',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#009688';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#4DB6AC';
                }}
                >
                  <span style={{ fontSize: '0.9rem' }}>📄</span>
                  <span>Upload Prescription</span>
                  <input
                    type="file"
                    id="prescription-upload"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handlePrescriptionUploadWithValidation}
                    style={{ display: 'none' }}
                  />
                </label>
                <p style={{
                  color: '#4F6F6B',
                  fontSize: '0.75rem',
                  margin: 0,
                  fontStyle: 'italic',
                  textAlign: 'right',
                  whiteSpace: 'nowrap',
                  display: 'none', // Hide on mobile
                }}
                className="upload-hint"
                >
                  Supported formats: JPG, PNG, PDF (Max 5MB)
                </p>
              </div>
            </div>
            
            {/* Quick Categories */}
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              marginTop: '1rem',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSearchQuery('Antibiotics');
                }}
                style={{
                  padding: '0.25rem 0.5rem',
                  backgroundColor: '#E0F2F1',
                  color: '#00695C',
                  border: 'none',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap',
                }}
                type="button"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#B2DFDB';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#E0F2F1';
                }}
              >
                Antibiotics
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSearchQuery('Pain Relief');
                }}
                style={{
                  padding: '0.25rem 0.5rem',
                  backgroundColor: '#E0F2F1',
                  color: '#00695C',
                  border: 'none',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap',
                }}
                type="button"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#B2DFDB';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#E0F2F1';
                }}
              >
                Pain Relief
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSearchQuery('Diabetes');
                }}
                style={{
                  padding: '0.25rem 0.5rem',
                  backgroundColor: '#E0F2F1',
                  color: '#00695C',
                  border: 'none',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap',
                }}
                type="button"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#B2DFDB';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#E0F2F1';
                }}
              >
                Diabetes
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSearchQuery('Cardiac');
                }}
                style={{
                  padding: '0.25rem 0.5rem',
                  backgroundColor: '#E0F2F1',
                  color: '#00695C',
                  border: 'none',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap',
                }}
                type="button"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#B2DFDB';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#E0F2F1';
                }}
              >
                Cardiac
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSearchQuery('OTC');
                }}
                style={{
                  padding: '0.25rem 0.5rem',
                  backgroundColor: '#E0F2F1',
                  color: '#00695C',
                  border: 'none',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap',
                }}
                type="button"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#B2DFDB';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#E0F2F1';
                }}
              >
                OTC Medicines
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSearchQuery('');
                }}
                style={{
                  padding: '0.25rem 0.5rem',
                  backgroundColor: '#E0F2F1',
                  color: '#00695C',
                  border: 'none',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap',
                }}
                type="button"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#B2DFDB';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#E0F2F1';
                }}
              >
                Show All
              </button>
            </div>
          </section>

          {/* Prescription Medicines Section */}
          {categorizedMedicines.prescription.length > 0 && (
            <section style={{
              backgroundColor: '#FFFFFF',
              padding: 'clamp(1rem, 1.5vw, 2rem)',
              borderRadius: '15px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              marginBottom: '1.5rem',
              borderLeft: '4px solid #FF9800'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1.5rem',
                flexWrap: 'wrap',
                gap: '1rem',
              }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    color: '#FF9800',
                    fontSize: 'clamp(1.1rem, 1.5vw, 1.5rem)',
                    margin: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <span style={{ fontSize: '1.2rem' }}>ℹ️</span> Prescription Medicines
                  </h3>
                  <p style={{
                    color: '#4F6F6B',
                    fontSize: '0.85rem',
                    margin: '0.25rem 0 0 0',
                  }}>
                    These medicines require vendor prescription approval
                  </p>
                </div>
                <p style={{
                  color: '#4F6F6B',
                  fontSize: '0.85rem',
                  whiteSpace: 'nowrap',
                }}>{categorizedMedicines.prescription.length} prescription products</p>
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '1rem',
              }}>
                {categorizedMedicines.prescription.map(medicine => (
                  <MedicineCard 
                    key={medicine.id} 
                    medicine={medicine}
                    cart={cart}
                    addToCart={handleAddToCart}
                    updateQuantity={handleUpdateQuantity}
                    prescriptionRequired={true}
                    showNotification={showNotification}
                  />
                ))}
              </div>
            </section>
          )}

          {/* OTC Medicines Section */}
          <section style={{
            backgroundColor: '#FFFFFF',
            padding: 'clamp(1rem, 1.5vw, 2rem)',
            borderRadius: '15px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            marginBottom: '1.5rem',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '1.5rem',
              flexWrap: 'wrap',
              gap: '1rem',
            }}>
              <h3 style={{
                color: '#009688',
                fontSize: 'clamp(1.1rem, 1.5vw, 1.5rem)',
                margin: 0,
              }}>Available Medicines</h3>
              <p style={{
                color: '#4F6F6B',
                fontSize: '0.85rem',
                whiteSpace: 'nowrap',
              }}>{filteredMedicines.length} products found</p>
            </div>
            
            {filteredMedicines.length > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '1rem',
              }}>
                {categorizedMedicines.otc.map(medicine => (
                  <MedicineCard 
                    key={medicine.id} 
                    medicine={medicine}
                    cart={cart}
                    addToCart={handleAddToCart}
                    updateQuantity={handleUpdateQuantity}
                    showNotification={showNotification}
                  />
                ))}
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '2rem 1rem',
                color: '#4F6F6B',
              }}>
                <p>No medicines found matching your search.</p>
                <p style={{
                  color: '#4F6F6B',
                  fontSize: '0.85rem',
                  marginTop: '0.5rem',
                }}>Try different keywords or check the pharmacies section.</p>
              </div>
            )}
          </section>

          {/* Pharmacies Section */}
          <section style={{
            backgroundColor: '#FFFFFF',
            padding: 'clamp(1rem, 1.5vw, 2rem)',
            borderRadius: '15px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '1.5rem',
              flexWrap: 'wrap',
              gap: '1rem',
            }}>
              <h3 style={{
                color: '#009688',
                fontSize: 'clamp(1.1rem, 1.5vw, 1.5rem)',
                margin: 0,
              }}>Nearby Medical Shops</h3>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <p style={{
                  color: '#4F6F6B',
                  fontSize: '0.85rem',
                  margin: 0,
                }}>Fast delivery from trusted pharmacies</p>
                <p style={{
                  color: '#4F6F6B',
                  fontSize: '0.75rem',
                  margin: '0.25rem 0 0 0',
                  fontStyle: 'italic'
                }}>Prescription approvals may vary by pharmacy</p>
              </div>
            </div>
            
            {safePharmacies.length > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1rem'
              }}>
                {safePharmacies.map((pharmacy, index) => (
                  <PharmacyCard
                    key={pharmacy?.id || index}
                    pharmacy={pharmacy}
                    viewPharmacyStore={viewPharmacyStore}
                    handlePharmacySearch={handlePharmacySearch}
                    pharmacySearchQueries={pharmacySearchQueries}
                    startDoctorChat={startDoctorChat}
                    showNotification={showNotification}
                  />
                ))}
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '2rem 1rem',
                color: '#4F6F6B',
              }}>
                <p>No pharmacies found nearby.</p>
              </div>
            )}
          </section>
        </div>
      )}

      {/* Prescription Upload Modal */}
      {prescriptionModalOpen && (
        <PrescriptionUploadModal
          prescription={selectedPrescription}
          onClose={() => handleCloseModal(setPrescriptionModalOpen)}
          onUploadToVendor={handleUploadToVendor}
          showNotification={showNotification}
        />
      )}

      {/* Prescription History Modal */}
      {prescriptionHistoryModalOpen && (
        <PrescriptionHistoryModal
          prescriptions={userPrescriptions}
          onClose={() => handleCloseModal(setPrescriptionHistoryModalOpen)}
          showNotification={showNotification}
          onReorder={handleReorder}
          onViewDocument={() => {}}
        />
      )}

      {/* Add optimized global CSS */}
      <style>
        {`
          /* Disable all smooth scrolling */
          html, body, * {
            scroll-behavior: auto !important;
          }
          
          /* Prevent focus scroll jumps */
          *:focus {
            outline: 2px solid #4DB6AC !important;
            outline-offset: 2px !important;
          }
          
          /* Smooth transitions for interactive elements only */
          button, input, select, textarea {
            transition: all 0.2s ease;
          }
          
          /* Remove default button focus outline */
          button:focus {
            outline: none !important;
            box-shadow: 0 0 0 3px rgba(77, 182, 172, 0.3) !important;
          }
          
          /* Better tap highlight */
          a, button {
            -webkit-tap-highlight-color: transparent;
          }
          
          button:active {
            transform: scale(0.98);
          }
          
          /* Prevent text selection flash */
          * {
            -webkit-tap-highlight-color: transparent;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }
          
          /* Allow text selection in inputs and content areas */
          input, textarea, [contenteditable] {
            -webkit-user-select: text;
            -moz-user-select: text;
            -ms-user-select: text;
            user-select: text;
          }
          
          /* Responsive improvements */
          @media (max-width: 768px) {
            .upload-hint {
              display: block !important;
              white-space: normal !important;
              text-align: center !important;
              margin-top: 0.5rem;
            }
            
            input[type="text"] {
              min-width: 100% !important;
            }
            
            .prescription-history-btn span:not(:first-child) {
              display: none;
            }
          }
          
          @media (max-width: 480px) {
            .prescription-history-btn {
              padding: 0.4rem 0.8rem !important;
              font-size: 0.8rem !important;
            }
            
            h2, h3 {
              font-size: 1.1rem !important;
            }
            
            .grid-cards {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default MedicineView;