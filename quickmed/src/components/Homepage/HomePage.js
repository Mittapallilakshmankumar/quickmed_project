import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Hero from './Hero';
import AboutUs from './AboutUs';
import Services from './Services';
import Reviews from './Reviews';
import Contact from './Contact';
import Doctors from './Doctors';

const HomePage = ({ onNavigateToAuth, onNavigateToHome, onNavigateToLogin, reviews, onWriteReview }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Sync activeSection with URL path
  useEffect(() => {
    const path = location.pathname;
    if (path === '/' || path === '/home') {
      setActiveSection('home');
    } else if (path === '/about') {
      setActiveSection('about');
    } else if (path === '/services') {
      setActiveSection('services');
    } else if (path === '/doctors') {
      setActiveSection('doctors');
    } else if (path === '/reviews') {
      setActiveSection('reviews');
    } else if (path === '/contact') {
      setActiveSection('contact');
    }
  }, [location.pathname]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
    
    // Navigate to corresponding route
    switch(section) {
      case 'home':
        navigate('/');
        break;
      case 'about':
        navigate('/about');
        break;
      case 'services':
        navigate('/services');
        break;
      case 'doctors':
        navigate('/doctors');
        break;
      case 'reviews':
        navigate('/reviews');
        break;
      case 'contact':
        navigate('/contact');
        break;
      default:
        navigate('/');
    }
    
    // Scroll to top when changing sections
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleServiceLearnMore = (service) => {
    setSelectedService(service);
    setShowServiceModal(true);
  };

  // Use the provided onWriteReview prop or fall back to showing the modal
  const handleWriteReview = () => {
    if (onWriteReview) {
      onWriteReview();
    } else {
      setShowReviewModal(true);
    }
  };

  // Handle navigation to login
  const handleNavigateToLogin = () => {
    if (onNavigateToLogin) {
      onNavigateToLogin();
    } else {
      navigate('/login');
    }
  };

  // Handle navigation to home
  const handleNavigateToHome = () => {
    if (onNavigateToHome) {
      onNavigateToHome();
    } else {
      navigate('/');
    }
  };

  const styles = {
    homepage: {
      minHeight: '100vh',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    section: {
      padding: '2rem',
    }
  };

  return (
    <div style={styles.homepage}>
      <Navbar 
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        onNavigateToAuth={handleNavigateToLogin}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={handleMobileMenuToggle}
      />

      <main>
        {activeSection === 'home' && (
          <Hero 
            onSectionChange={handleSectionChange}
            onNavigateToAuth={handleNavigateToLogin}
          />
        )}
        {activeSection === 'about' && (
          <AboutUs 
            onNavigateToAuth={handleNavigateToLogin}
          />
        )}
        {activeSection === 'services' && (
          <Services 
            onLearnMore={handleServiceLearnMore}
            onNavigateToLogin={handleNavigateToLogin}
          />
        )}
        {activeSection === 'doctors' && (
          <Doctors 
            onNavigateToLogin={handleNavigateToLogin}
          />
        )}
        {activeSection === 'reviews' && (
          <Reviews 
            onWriteReview={handleWriteReview}
            reviews={reviews}
          />
        )}
        {activeSection === 'contact' && <Contact />}
      </main>
    </div>
  );
};

export default HomePage;