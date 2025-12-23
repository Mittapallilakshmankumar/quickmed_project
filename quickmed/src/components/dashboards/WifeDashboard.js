// components/dashboards/WifeDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const WifeDashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const primaryUser = user;
  
  const handleViewFamilyRecords = () => {
    navigate('/wife/family-records');
  };
  
  const handleManagePrescriptions = () => {
    navigate('/wife/prescriptions');
  };
  
  const handleOrderMedicines = () => {
    navigate('/wife/order-medicines');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>Spouse Dashboard</h1>
          <p className="subtitle">Family Healthcare Management for {primaryUser.fullName}'s Account</p>
        </div>
        <div className="header-right">
          <button onClick={onLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>
      
      <div className="dashboard-content">
        <div className="info-card">
          <h3>👨‍👩‍👧‍👦 Family Account Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="label">Role:</span>
              <span className="value">Spouse</span>
            </div>
            <div className="info-item">
              <span className="label">Primary User:</span>
              <span className="value">{primaryUser.fullName}</span>
            </div>
            <div className="info-item">
              <span className="label">Phone:</span>
              <span className="value">{primaryUser.phone}</span>
            </div>
            <div className="info-item">
              <span className="label">Access Level:</span>
              <span className="value">Family Management</span>
            </div>
          </div>
        </div>
        
        <div className="permissions-section">
          <h3>Your Family Management Permissions</h3>
          <div className="permissions-grid">
            <div className="permission-item allowed">
              <span className="icon">✓</span>
              <span>View family medical records</span>
            </div>
            <div className="permission-item allowed">
              <span className="icon">✓</span>
              <span>Book appointments for family members</span>
            </div>
            <div className="permission-item allowed">
              <span className="icon">✓</span>
              <span>Order medicines for household</span>
            </div>
            <div className="permission-item allowed">
              <span className="icon">✓</span>
              <span>Manage prescriptions and refills</span>
            </div>
            <div className="permission-item allowed">
              <span className="icon">✓</span>
              <span>Emergency contact capabilities</span>
            </div>
            <div className="permission-item not-allowed">
              <span className="icon">✗</span>
              <span>Modify account security settings</span>
            </div>
          </div>
        </div>
        
        <div className="quick-actions">
          <h3>Family Healthcare Actions</h3>
          <div className="action-grid">
            <button onClick={handleViewFamilyRecords} className="action-btn">
              <span className="action-icon">🏥</span>
              <span>Family Health Records</span>
            </button>
            <button onClick={handleManagePrescriptions} className="action-btn">
              <span className="action-icon">💊</span>
              <span>Manage Prescriptions</span>
            </button>
            <button onClick={handleOrderMedicines} className="action-btn">
              <span className="action-icon">🛒</span>
              <span>Order Medicines</span>
            </button>
          </div>
        </div>
        
        <div className="family-section">
          <h3>Family Members</h3>
          <div className="family-members">
            <div className="family-member">
              <span className="member-icon">👤</span>
              <div className="member-info">
                <strong>{primaryUser.fullName}</strong>
                <small>Primary Account Holder</small>
              </div>
            </div>
            {/* You can dynamically add other family members here */}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .dashboard-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #E0F2F1 0%, #FFFFFF 100%);
          padding: 20px;
        }
        
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          margin-bottom: 30px;
        }
        
        .header-left h1 {
          color: #124441;
          margin: 0;
          font-size: 28px;
        }
        
        .subtitle {
          color: #4F6F6B;
          margin: 5px 0 0 0;
          font-size: 14px;
        }
        
        .logout-btn {
          padding: 10px 20px;
          background-color: #F44336;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .logout-btn:hover {
          background-color: #D32F2F;
          transform: translateY(-2px);
        }
        
        .dashboard-content {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .info-card {
          background: white;
          border-radius: 12px;
          padding: 25px;
          margin-bottom: 30px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        
        .info-card h3 {
          color: #124441;
          margin-bottom: 20px;
          font-size: 20px;
        }
        
        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }
        
        .info-item {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #E0F2F1;
        }
        
        .label {
          color: #4F6F6B;
          font-weight: 500;
        }
        
        .value {
          color: #124441;
          font-weight: 600;
        }
        
        .permissions-section {
          background: white;
          border-radius: 12px;
          padding: 25px;
          margin-bottom: 30px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        
        .permissions-section h3 {
          color: #124441;
          margin-bottom: 20px;
          font-size: 20px;
        }
        
        .permissions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 15px;
        }
        
        .permission-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px;
          border-radius: 8px;
          font-size: 14px;
        }
        
        .permission-item.allowed {
          background-color: #E8F5E9;
          color: #2E7D32;
        }
        
        .permission-item.not-allowed {
          background-color: #FFEBEE;
          color: #C62828;
        }
        
        .permission-item .icon {
          font-weight: bold;
          font-size: 16px;
        }
        
        .quick-actions {
          background: white;
          border-radius: 12px;
          padding: 25px;
          margin-bottom: 30px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        
        .quick-actions h3 {
          color: #124441;
          margin-bottom: 20px;
          font-size: 20px;
        }
        
        .action-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }
        
        .action-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 25px 15px;
          background: linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .action-btn:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(156, 39, 176, 0.3);
        }
        
        .action-icon {
          font-size: 32px;
        }
        
        .family-section {
          background: white;
          border-radius: 12px;
          padding: 25px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        
        .family-section h3 {
          color: #124441;
          margin-bottom: 20px;
          font-size: 20px;
        }
        
        .family-members {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        
        .family-member {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px;
          background-color: #F9F9F9;
          border-radius: 8px;
          border: 1px solid #E0F2F1;
        }
        
        .member-icon {
          font-size: 32px;
        }
        
        .member-info {
          display: flex;
          flex-direction: column;
        }
        
        .member-info strong {
          color: #124441;
          font-size: 16px;
        }
        
        .member-info small {
          color: #4F6F6B;
          font-size: 12px;
        }
        
        @media (max-width: 768px) {
          .dashboard-header {
            flex-direction: column;
            gap: 15px;
            text-align: center;
          }
          
          .info-grid {
            grid-template-columns: 1fr;
          }
          
          .permissions-grid {
            grid-template-columns: 1fr;
          }
          
          .action-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default WifeDashboard;