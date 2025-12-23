// MainLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MainLogin = () => {
  const navigate = useNavigate();
  const [showToast] = useState(false);
  const [toastMessage] = useState('');

  const userTypes = [
    { 
      type: 'user', 
      label: 'Patient/User',
      description: 'Access healthcare services, medicine delivery, and doctor consultations',
      route: '/login/user'
    },
    { 
      type: 'vendor', 
      label: 'Vendor',
      description: 'Manage your medical inventory and reach more customers',
      route: '/login/vendor'
    },
    { 
      type: 'delivery', 
      label: 'Delivery Partner',
      description: 'Join our network delivering medicines and supplies',
      route: '/login/delivery'
    },
    { 
      type: 'doctor', 
      label: 'Doctor',
      description: 'Expand your practice through our telemedicine platform',
      route: '/login/doctor'
    }
  ];

  const handleUserTypeSelect = (route) => {
    navigate(route);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="main-login-container">
      {/* Toast Message */}
      {showToast && (
        <div className="toast-message">
          {toastMessage}
        </div>
      )}

      {/* Back to Home Button */}
      <button 
        onClick={handleBackToHome}
        className="back-home-btn"
      >
        ← Back to Home
      </button>

      <div className="main-login-card">
        <div className="header-section">
          <h1 className="app-title">QUICKMED</h1>
          <h2 className="welcome-title">Welcome to QuickMed</h2>
          <p className="welcome-subtitle">Select your role to continue</p>
        </div>

        <div className="user-types-grid">
          {userTypes.map((user) => (
            <div 
              key={user.type}
              className="user-type-card"
              onClick={() => handleUserTypeSelect(user.route)}
            >
              <div className="user-icon">{user.icon}</div>
              <h3 className="user-label">{user.label}</h3>
              <p className="user-description">{user.description}</p>
              <button className="select-btn">
                Continue as {user.label}
              </button>
            </div>
          ))}
        </div>

        <div className="footer-section">
          <p className="help-text">Need help? Contact support@quickmed.com</p>
        </div>
      </div>

      <style jsx>{`
        .main-login-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: linear-gradient(135deg, #E0F2F1 0%, #FFFFFF 50%, #E0F2F1 100%);
          padding: 65px;
          position: relative;
        }

        .back-home-btn {
          position: absolute;
          top: 20px;
          left: 20px;
          padding: 10px 20px;
          background-color: #FFFFFF;
          color: #009688;
          border: 2px solid #009688;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          z-index: 10;
        }

        .back-home-btn:hover {
          background-color: #009688;
          color: #FFFFFF;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 150, 136, 0.3);
        }

        .main-login-card {
          background-color: #FFFFFF;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          padding: 40px;
          max-width: 1200px;
          width: 100%;
          text-align: center;
        }

        .header-section {
          margin-bottom: 40px;
        }

        .app-title {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 10px;
          color: #009688;
        }

        .welcome-title {
          color: #124441;
          font-size: 28px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .welcome-subtitle {
          color: #4F6F6B;
          font-size: 16px;
          margin-bottom: 0;
        }

        .user-types-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }

        .user-type-card {
          background: linear-gradient(135deg, #FFFFFF 0%, #E0F2F1 100%);
          border-radius: 12px;
          padding: 30px 20px;
          border: 2px solid transparent;
          transition: all 0.3s ease;
          cursor: pointer;
          text-align: center;
        }

        .user-type-card:hover {
          border-color: #4DB6AC;
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(77, 182, 172, 0.2);
        }

        .user-icon {
          font-size: 48px;
          margin-bottom: 20px;
        }

        .user-label {
          color: #124441;
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .user-description {
          color: #4F6F6B;
          font-size: 14px;
          line-height: 1.5;
          margin-bottom: 20px;
          min-height: 60px;
        }

        .select-btn {
          background-color: #009688;
          color: #FFFFFF;
          border: none;
          border-radius: 8px;
          padding: 12px 24px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
        }

        .select-btn:hover {
          background-color: #00796B;
          transform: translateY(-2px);
        }

        .footer-section {
          border-top: 1px solid #E0F2F1;
          padding-top: 20px;
        }

        .login-link {
          color: #009688;
          font-weight: 600;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .login-link:hover {
          color: #00796B;
          text-decoration: underline;
        }

        .help-text {
          color: #4F6F6B;
          font-size: 12px;
          margin-top: 10px;
        }

        .toast-message {
          position: fixed;
          top: 20px;
          right: 20px;
          background-color: #009688;
          color: white;
          padding: 12px 20px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          z-index: 1000;
          animation: slideInRight 0.3s ease-out;
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .main-login-card {
            padding: 20px;
          }

          .app-title {
            font-size: 28px;
          }

          .welcome-title {
            font-size: 22px;
          }

          .user-types-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 16px;
          }

          .user-type-card {
            padding: 20px 15px;
          }

          .user-icon {
            font-size: 36px;
          }

          .user-label {
            font-size: 18px;
          }
        }
      `}</style>
    </div>
  );
};

export default MainLogin;