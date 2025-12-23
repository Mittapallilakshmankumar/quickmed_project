// import React, { useState, useEffect } from 'react';
// import './Reviews.css';

// const Reviews = ({ onReviewSubmit }) => {
//   const [reviews, setReviews] = useState([]);
//   const [showAllReviews, setShowAllReviews] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isTablet, setIsTablet] = useState(false);
//   const [isVisible, setIsVisible] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [currentReview, setCurrentReview] = useState({
//     name: '',
//     email: '',
//     rating: 0,
//     comment: ''
//   });
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitSuccess, setSubmitSuccess] = useState(false);
//   const [submitError, setSubmitError] = useState('');

//   // Load reviews from localStorage on component mount
//   useEffect(() => {
//     const savedReviews = localStorage.getItem('quickmed-reviews');
//     if (savedReviews) {
//       setReviews(JSON.parse(savedReviews));
//     } else {
//       // Initialize with default reviews if none exist
//       const defaultReviews = [
//         {
//           id: 1,
//           name: 'Rahul Sharma',
//           rating: 5,
//           date: '2024-01-15',
//           comment: 'QuickMed saved me during my emergency! The medicine delivery was super fast - received within 25 minutes. Highly recommended!',
//           avatar: 'RS'
//         },
//         {
//           id: 2,
//           name: 'Priya Patel',
//           rating: 4,
//           date: '2024-01-12',
//           comment: 'Excellent service! The doctor consultation was smooth and the medicine reached within 30 minutes as promised.',
//           avatar: 'PP'
//         },
//         {
//           id: 3,
//           name: 'Ankit Verma',
//           rating: 5,
//           date: '2024-01-10',
//           comment: 'Best healthcare app I have used. The live tracking feature is amazing and the doctors are very professional.',
//           avatar: 'AV'
//         },
//         {
//           id: 4,
//           name: 'Sneha Reddy',
//           rating: 5,
//           date: '2024-01-08',
//           comment: '24/7 doctor consultation is a lifesaver! Got immediate help for my child fever at midnight.',
//           avatar: 'SR'
//         },
//         {
//           id: 5,
//           name: 'Vikram Singh',
//           rating: 4,
//           date: '2024-01-05',
//           comment: 'Great platform for medicine delivery. The delivery executive was very professional and polite.',
//           avatar: 'VS'
//         },
//         {
//           id: 6,
//           name: 'Meera Joshi',
//           rating: 5,
//           date: '2024-01-03',
//           comment: 'The OTC products section is very comprehensive. Found all my regular health supplements easily.',
//           avatar: 'MJ'
//         }
//       ];
//       setReviews(defaultReviews);
//       localStorage.setItem('quickmed-reviews', JSON.stringify(defaultReviews));
//     }
//   }, []);

//   // Handle screen size changes
//   useEffect(() => {
//     const checkScreenSize = () => {
//       const width = window.innerWidth;
//       setIsMobile(width <= 768);
//       setIsTablet(width <= 1024 && width > 768);
//     };

//     checkScreenSize();
//     window.addEventListener('resize', checkScreenSize);
    
//     // Add fade-in animation
//     setIsVisible(true);
    
//     return () => window.removeEventListener('resize', checkScreenSize);
//   }, []);

//   // Save reviews to localStorage whenever reviews change
//   useEffect(() => {
//     if (reviews.length > 0) {
//       localStorage.setItem('quickmed-reviews', JSON.stringify(reviews));
//     }
//   }, [reviews]);

//   // Calculate rating statistics
//   const calculateRatingStats = () => {
//     const totalReviews = reviews.length;
//     const averageRating = totalReviews > 0 
//       ? (reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1)
//       : '0.0';
    
//     const ratingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
//     reviews.forEach(review => {
//       ratingDistribution[review.rating]++;
//     });

//     const ratingBars = [5, 4, 3, 2, 1].map(stars => ({
//       stars,
//       percentage: totalReviews > 0 ? Math.round((ratingDistribution[stars] / totalReviews) * 100) : 0,
//       count: ratingDistribution[stars]
//     }));

//     return { averageRating, ratingBars, totalReviews };
//   };

//   const { averageRating, ratingBars, totalReviews } = calculateRatingStats();

//   // Get reviews to display (show first 6 by default, or all if showAllReviews is true)
//   const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 6);

//   // Input validation functions
//   const validateName = (name) => {
//     // Allow only alphabets, spaces, and common name characters (apostrophes, hyphens)
//     return /^[A-Za-z\s.'-]+$/.test(name);
//   };

//   const validateEmail = (email) => {
//     // Comprehensive email validation
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     return emailRegex.test(email);
//   };

//   // Handle name input with validation
//   const handleNameChange = (value) => {
//     // Remove any non-alphabetic characters except spaces, apostrophes, and hyphens
//     const cleanedValue = value.replace(/[^A-Za-z\s.'-]/g, '');
    
//     // Limit to 50 characters
//     const limitedValue = cleanedValue.slice(0, 50);
    
//     setCurrentReview(prev => ({
//       ...prev,
//       name: limitedValue
//     }));
    
//     // Clear name error if any
//     if (errors.name) {
//       setErrors(prev => ({
//         ...prev,
//         name: ''
//       }));
//     }
//   };

//   // Handle email input with validation
//   const handleEmailChange = (value) => {
//     setCurrentReview(prev => ({
//       ...prev,
//       email: value
//     }));
    
//     // Real-time email validation
//     if (value.trim() === '') {
//       setErrors(prev => ({
//         ...prev,
//         email: ''
//       }));
//     } else if (!validateEmail(value)) {
//       setErrors(prev => ({
//         ...prev,
//         email: 'Please enter a valid email address (e.g., user@example.com)'
//       }));
//     } else {
//       setErrors(prev => ({
//         ...prev,
//         email: ''
//       }));
//     }
//   };

//   const handleCommentChange = (value) => {
//     // Limit comment to 500 characters
//     const limitedValue = value.slice(0, 500);
//     setCurrentReview(prev => ({
//       ...prev,
//       comment: limitedValue
//     }));
    
//     if (errors.comment) {
//       setErrors(prev => ({
//         ...prev,
//         comment: ''
//       }));
//     }
//   };

//   const handleStarClick = (rating) => {
//     setCurrentReview(prev => ({
//       ...prev,
//       rating
//     }));
//     if (errors.rating) {
//       setErrors(prev => ({
//         ...prev,
//         rating: ''
//       }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     // Name validation
//     if (!currentReview.name.trim()) {
//       newErrors.name = 'Name is required';
//     } else if (!validateName(currentReview.name.trim())) {
//       newErrors.name = 'Name can only contain letters, spaces, apostrophes, and hyphens';
//     } else if (currentReview.name.trim().length < 2) {
//       newErrors.name = 'Name should be at least 2 characters';
//     }
    
//     // Email validation
//     if (!currentReview.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!validateEmail(currentReview.email.trim())) {
//       newErrors.email = 'Please enter a valid email address (e.g., user@example.com)';
//     }
    
//     // Rating validation
//     if (currentReview.rating === 0) {
//       newErrors.rating = 'Please select a rating';
//     }
    
//     // Comment validation
//     if (!currentReview.comment.trim()) {
//       newErrors.comment = 'Review comment is required';
//     } else if (currentReview.comment.trim().length < 10) {
//       newErrors.comment = 'Review should be at least 10 characters';
//     }
    
//     return newErrors;
//   };

//   const handleSubmitReview = async (e) => {
//     e.preventDefault();
//     const newErrors = validateForm();
    
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     setIsSubmitting(true);
//     setSubmitSuccess(false);
//     setSubmitError('');

//     try {
//       // Simulate API call delay
//       await new Promise(resolve => setTimeout(resolve, 1000));

//       const newReview = {
//         id: Date.now(),
//         name: currentReview.name.trim(),
//         email: currentReview.email.trim(),
//         rating: currentReview.rating,
//         comment: currentReview.comment.trim(),
//         date: new Date().toISOString().split('T')[0],
//         status: 'approved',
//         avatar: currentReview.name.trim().split(' ').map(n => n[0]).join('').toUpperCase()
//       };

//       // Update reviews list
//       const updatedReviews = [newReview, ...reviews];
//       setReviews(updatedReviews);
      
//       if (onReviewSubmit) {
//         onReviewSubmit(newReview);
//       }

//       // Show success message in modal
//       setSubmitSuccess(true);
      
//       // Reset form after successful submission
//       setCurrentReview({
//         name: '',
//         email: '',
//         rating: 0,
//         comment: ''
//       });
//       setErrors({});

//       // Auto-close modal after 3 seconds
//       setTimeout(() => {
//         handleCloseModal();
//       }, 3000);

//     } catch (error) {
//       console.error('Error submitting review:', error);
//       setSubmitError('There was an error submitting your review. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleOpenModal = () => {
//     setShowModal(true);
//     setSubmitSuccess(false);
//     setSubmitError('');
//     // Prevent body scroll when modal is open
//     document.body.style.overflow = 'hidden';
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setCurrentReview({
//       name: '',
//       email: '',
//       rating: 0,
//       comment: ''
//     });
//     setErrors({});
//     setSubmitSuccess(false);
//     setSubmitError('');
//     // Restore body scroll
//     document.body.style.overflow = 'auto';
//   };

//   const renderStars = (rating) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       if (i <= rating) {
//         stars.push(
//           <span key={i} className="star filled-star">
//             ⭐
//           </span>
//         );
//       } else {
//         stars.push(
//           <span key={i} className="star empty-star">
//             ☆
//           </span>
//         );
//       }
//     }
//     return <div className="stars-container">{stars}</div>;
//   };

//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'long', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   const isNewReview = (reviewDate) => {
//     const reviewDateObj = new Date(reviewDate);
//     const currentDate = new Date();
//     const diffTime = Math.abs(currentDate - reviewDateObj);
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     return diffDays <= 7;
//   };

//   // Close modal when clicking outside or pressing Escape
//   useEffect(() => {
//     const handleEscape = (e) => {
//       if (e.key === 'Escape' && showModal) {
//         handleCloseModal();
//       }
//     };

//     const handleClickOutside = (e) => {
//       if (showModal && e.target.classList.contains('review-modal-overlay')) {
//         handleCloseModal();
//       }
//     };

//     if (showModal) {
//       document.addEventListener('keydown', handleEscape);
//       document.addEventListener('click', handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener('keydown', handleEscape);
//       document.removeEventListener('click', handleClickOutside);
//     };
//   }, [showModal]);

//   // Generate floating elements
//   const floatingElements = Array.from({ length: isMobile ? 8 : 15 }, (_, i) => ({
//     id: i,
//     size: Math.random() * (isMobile ? 50 : 100) + (isMobile ? 30 : 50),
//     left: Math.random() * 100,
//     top: Math.random() * 100,
//     animationDelay: Math.random() * 5,
//   }));

//   return (
//     <section className="reviews-section">
//       {/* Floating Background Elements */}
//       <div className="floating-elements">
//         {floatingElements.map((element) => (
//           <div
//             key={element.id}
//             className="floating-element"
//             style={{
//               width: element.size,
//               height: element.size,
//               left: `${element.left}%`,
//               top: `${element.top}%`,
//               animationDelay: `${element.animationDelay}s`,
//             }}
//           />
//         ))}
//       </div>

//       <div className="reviews-container">
//         <h2 className={`section-title ${isVisible ? 'visible' : ''}`}>
//           Patient Reviews
//         </h2>
//         <p className={`section-subtitle ${isVisible ? 'visible' : ''}`}>
//           See what our patients say about their experience with QuickMed
//         </p>

//         {/* Rating Summary Section */}
//         <div className={`rating-summary ${isVisible ? 'visible' : ''}`}>
//           <div className="overall-rating">
//             <div className="overall-score">{averageRating}</div>
//             <div className="stars-large">
//               {renderStars(Math.round(parseFloat(averageRating)))}
//             </div>
//             <div className="rating-count">Based on {totalReviews} reviews</div>
//           </div>
//           <div className="rating-breakdown">
//             {ratingBars.map((bar, index) => (
//               <div key={index} className="rating-bar">
//                 <span className="bar-stars">{bar.stars} stars</span>
//                 <div className="bar-container">
//                   <div className="bar-fill" style={{ width: `${bar.percentage}%` }}></div>
//                 </div>
//                 <span className="bar-count">{bar.count} ({bar.percentage}%)</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Reviews Grid */}
//         {showAllReviews && reviews.length > 6 && (
//           <div className="scroll-indicator">
//             Scroll to view all {reviews.length} reviews ↓
//           </div>
//         )}
        
//         <div className={`reviews-grid ${showAllReviews ? 'scrollable' : ''} ${isVisible ? 'visible' : ''}`}>
//           {displayedReviews.map((review) => (
//             <div
//               key={review.id}
//               className="review-card"
//             >
//               {isNewReview(review.date) && (
//                 <div className="new-review-badge">NEW</div>
//               )}
              
//               <div className="review-header">
//                 <div className="reviewer-info">
//                   <div className="reviewer-avatar">{review.avatar}</div>
//                   <div>
//                     <h4 className="reviewer-name">{review.name}</h4>
//                     <div className="review-stars">{renderStars(review.rating)}</div>
//                   </div>
//                 </div>
//                 <span className="review-date">{formatDate(review.date)}</span>
//               </div>
//               <p className="review-comment">{review.comment}</p>
//             </div>
//           ))}
//         </div>

//         {/* View More/Less Button */}
//         {reviews.length > 6 && (
//           <button
//             className="view-more-btn"
//             onClick={() => setShowAllReviews(!showAllReviews)}
//           >
//             {showAllReviews ? `Show Less (Viewing ${reviews.length} reviews)` : `View All Reviews (${reviews.length} total)`}
//           </button>
//         )}

//         {/* Add Review Section */}
//         <div className={`add-review-section ${isVisible ? 'visible' : ''}`}>
//           <h3 className="add-review-title">Share Your Experience</h3>
//           <p className="add-review-text">
//             Help others make informed decisions about their healthcare
//           </p>
//           <button
//             className="add-review-btn"
//             onClick={handleOpenModal}
//           >
//             Write a Review
//           </button>
//         </div>
//       </div>

//       {/* Review Modal */}
//       {showModal && (
//         <div className="review-modal-overlay">
//           <div className="review-modal-content">
//             <div className="modal-header">
//               <h2 className="modal-title">
//                 {submitSuccess ? 'Review Submitted!' : 'Write a Review'}
//               </h2>
//               <button 
//                 className="modal-close-btn"
//                 onClick={handleCloseModal}
//                 disabled={isSubmitting}
//               >
//                 ×
//               </button>
//             </div>
            
//             {submitSuccess ? (
//               <div className="success-message">
//                 <div className="success-icon">
//                   <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="#4CAF50"/>
//                   </svg>
//                 </div>
//                 <h3 className="success-title">Thank You!</h3>
//                 <p className="success-text">
//                   Your review has been submitted successfully and is now visible to other users.
//                 </p>
//                 <p className="success-note">
//                   This modal will close automatically in a few seconds...
//                 </p>
//               </div>
//             ) : (
//               <form onSubmit={handleSubmitReview} className="review-form">
//                 {submitError && (
//                   <div className="error-message">
//                     <p>{submitError}</p>
//                   </div>
//                 )}
                
//                 <div className="form-group">
//                   <label className="form-label">Your Name *</label>
//                   <input
//                     type="text"
//                     value={currentReview.name}
//                     onChange={(e) => handleNameChange(e.target.value)}
//                     placeholder="Enter your full name (e.g., John Doe)"
//                     className={`form-input ${errors.name ? 'error' : ''}`}
//                     disabled={isSubmitting}
//                     autoFocus
//                     maxLength={50}
//                     title="Only letters, spaces, apostrophes, and hyphens allowed"
//                   />
//                   {errors.name && <span className="error-text">{errors.name}</span>}
//                   <div className="input-hint">
//                     {currentReview.name.length >= 45 && (
//                       <span className="warning-text">
//                         {50 - currentReview.name.length} characters remaining
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 <div className="form-group">
//                   <label className="form-label">Your Email *</label>
//                   <input
//                     type="email"
//                     value={currentReview.email}
//                     onChange={(e) => handleEmailChange(e.target.value)}
//                     placeholder="Enter your email (e.g., user@example.com)"
//                     className={`form-input ${errors.email ? 'error' : ''}`}
//                     disabled={isSubmitting}
//                     pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
//                     title="Please enter a valid email address (e.g., user@example.com)"
//                   />
//                   {errors.email && <span className="error-text">{errors.email}</span>}
//                   <div className="input-hint">
//                     {!errors.email && currentReview.email && validateEmail(currentReview.email) && (
//                       <span className="success-text">✓ Valid email format</span>
//                     )}
//                   </div>
//                 </div>

//                 <div className="form-group">
//                   <label className="form-label">Rating *</label>
//                   <div className="rating-selection">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <button
//                         key={star}
//                         type="button"
//                         className={`star-btn ${star <= currentReview.rating ? 'selected' : ''}`}
//                         onClick={() => handleStarClick(star)}
//                         disabled={isSubmitting}
//                       >
//                         ★
//                       </button>
//                     ))}
//                   </div>
//                   <div className="rating-text">
//                     {currentReview.rating > 0 ? (
//                       <span>
//                         <span className="rating-value">{currentReview.rating}</span>
//                         <span className="rating-label">
//                           {currentReview.rating === 1 ? ' star' : ' stars'} selected
//                           {currentReview.rating === 5 && ' - Excellent!'}
//                           {currentReview.rating === 4 && ' - Good!'}
//                           {currentReview.rating === 3 && ' - Average'}
//                           {currentReview.rating === 2 && ' - Below Average'}
//                           {currentReview.rating === 1 && ' - Poor'}
//                         </span>
//                       </span>
//                     ) : (
//                       <span>No rating selected</span>
//                     )}
//                   </div>
//                   {errors.rating && <span className="error-text">{errors.rating}</span>}
//                 </div>

//                 <div className="form-group">
//                   <label className="form-label">Your Review *</label>
//                   <textarea
//                     value={currentReview.comment}
//                     onChange={(e) => handleCommentChange(e.target.value)}
//                     placeholder="Share your experience with QuickMed (minimum 10 characters)..."
//                     className={`form-textarea ${errors.comment ? 'error' : ''}`}
//                     maxLength={500}
//                     disabled={isSubmitting}
//                     rows={5}
//                   />
//                   {errors.comment && <span className="error-text">{errors.comment}</span>}
//                   <div className={`char-count ${currentReview.comment.length >= 490 ? 'warning' : ''}`}>
//                     {currentReview.comment.length}/500 characters
//                     {currentReview.comment.length >= 10 && currentReview.comment.length < 490 && (
//                       <span className="valid-text"> ✓ Minimum requirement met</span>
//                     )}
//                   </div>
//                 </div>

//                 <div className="review-note">
//                   <p className="note-text">
//                     <strong>Note:</strong> Your review will be published immediately and visible to other users.
//                   </p>
//                 </div>

//                 <div className="form-actions">
//                   <button 
//                     type="button"
//                     className="cancel-btn"
//                     onClick={handleCloseModal}
//                     disabled={isSubmitting}
//                   >
//                     Cancel
//                   </button>
//                   <button 
//                     type="submit" 
//                     className={`submit-btn ${isSubmitting ? 'disabled' : ''}`}
//                     disabled={isSubmitting}
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <span className="spinner"></span>
//                         Submitting...
//                       </>
//                     ) : 'Submit Review'}
//                   </button>
//                 </div>
//               </form>
//             )}
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default Reviews;










import React, { useState, useEffect } from 'react';
import './Reviews.css';

const Reviews = ({ onReviewSubmit }) => {
  const [reviews, setReviews] = useState([]);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentReview, setCurrentReview] = useState({
    name: '',
    email: '',
    rating: 0,
    comment: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Load reviews from localStorage on component mount
  useEffect(() => {
  const fetchReviews = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/home/reviews/");
      const data = await response.json();

      const formattedReviews = data.map(review => ({
        id: review.id,
        name: review.name,
        rating: review.rating,
        comment: review.comment,
        date: review.created_at.split("T")[0],
        avatar: review.name
          .split(" ")
          .map(n => n[0])
          .join("")
          .toUpperCase(),
      }));

      setReviews(formattedReviews);
    } catch (error) {
      console.error("Failed to load reviews");
    }
  };

  fetchReviews();
}, []);


  // Handle screen size changes
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width <= 1024 && width > 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    // Add fade-in animation
    setIsVisible(true);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Save reviews to localStorage whenever reviews change
  // useEffect(() => {
  //   if (reviews.length > 0) {
  //     localStorage.setItem('quickmed-reviews', JSON.stringify(reviews));
  //   }
  // }, [reviews]);

  // Calculate rating statistics
  const calculateRatingStats = () => {
    const totalReviews = reviews.length;
    const averageRating = totalReviews > 0 
      ? (reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1)
      : '0.0';
    
    const ratingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      ratingDistribution[review.rating]++;
    });

    const ratingBars = [5, 4, 3, 2, 1].map(stars => ({
      stars,
      percentage: totalReviews > 0 ? Math.round((ratingDistribution[stars] / totalReviews) * 100) : 0,
      count: ratingDistribution[stars]
    }));

    return { averageRating, ratingBars, totalReviews };
  };

  const { averageRating, ratingBars, totalReviews } = calculateRatingStats();

  // Get reviews to display (show first 6 by default, or all if showAllReviews is true)
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 6);

  // Input validation functions
  const validateName = (name) => {
    // Allow only alphabets, spaces, and common name characters (apostrophes, hyphens)
    return /^[A-Za-z\s.'-]+$/.test(name);
  };

  const validateEmail = (email) => {
    // Comprehensive email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Handle name input with validation
  const handleNameChange = (value) => {
    // Remove any non-alphabetic characters except spaces, apostrophes, and hyphens
    const cleanedValue = value.replace(/[^A-Za-z\s.'-]/g, '');
    
    // Limit to 50 characters
    const limitedValue = cleanedValue.slice(0, 50);
    
    setCurrentReview(prev => ({
      ...prev,
      name: limitedValue
    }));
    
    // Clear name error if any
    if (errors.name) {
      setErrors(prev => ({
        ...prev,
        name: ''
      }));
    }
  };

  // Handle email input with validation
  const handleEmailChange = (value) => {
    setCurrentReview(prev => ({
      ...prev,
      email: value
    }));
    
    // Real-time email validation
    if (value.trim() === '') {
      setErrors(prev => ({
        ...prev,
        email: ''
      }));
    } else if (!validateEmail(value)) {
      setErrors(prev => ({
        ...prev,
        email: 'Please enter a valid email address (e.g., user@example.com)'
      }));
    } else {
      setErrors(prev => ({
        ...prev,
        email: ''
      }));
    }
  };

  const handleCommentChange = (value) => {
    // Limit comment to 500 characters
    const limitedValue = value.slice(0, 500);
    setCurrentReview(prev => ({
      ...prev,
      comment: limitedValue
    }));
    
    if (errors.comment) {
      setErrors(prev => ({
        ...prev,
        comment: ''
      }));
    }
  };

  const handleStarClick = (rating) => {
    setCurrentReview(prev => ({
      ...prev,
      rating
    }));
    if (errors.rating) {
      setErrors(prev => ({
        ...prev,
        rating: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!currentReview.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!validateName(currentReview.name.trim())) {
      newErrors.name = 'Name can only contain letters, spaces, apostrophes, and hyphens';
    } else if (currentReview.name.trim().length < 2) {
      newErrors.name = 'Name should be at least 2 characters';
    }
    
    // Email validation
    if (!currentReview.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(currentReview.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g., user@example.com)';
    }
    
    // Rating validation
    if (currentReview.rating === 0) {
      newErrors.rating = 'Please select a rating';
    }
    
    // Comment validation
    if (!currentReview.comment.trim()) {
      newErrors.comment = 'Review comment is required';
    } else if (currentReview.comment.trim().length < 10) {
      newErrors.comment = 'Review should be at least 10 characters';
    }
    
    return newErrors;
  };

  // const handleSubmitReview = async (e) => {
  //   e.preventDefault();
  //   const newErrors = validateForm();
    
  //   if (Object.keys(newErrors).length > 0) {
  //     setErrors(newErrors);
  //     return;
  //   }

  //   setIsSubmitting(true);
  //   setSubmitSuccess(false);
  //   setSubmitError('');

  //   try {
  //     // Simulate API call delay
  //     await new Promise(resolve => setTimeout(resolve, 1000));

  //     const newReview = {
  //       id: Date.now(),
  //       name: currentReview.name.trim(),
  //       email: currentReview.email.trim(),
  //       rating: currentReview.rating,
  //       comment: currentReview.comment.trim(),
  //       date: new Date().toISOString().split('T')[0],
  //       status: 'approved',
  //       avatar: currentReview.name.trim().split(' ').map(n => n[0]).join('').toUpperCase()
  //     };

  //     // Update reviews list
  //     const updatedReviews = [newReview, ...reviews];
  //     setReviews(updatedReviews);
      
  //     if (onReviewSubmit) {
  //       onReviewSubmit(newReview);
  //     }

  //     // Show success message in modal
  //     setSubmitSuccess(true);
      
  //     // Reset form after successful submission
  //     setCurrentReview({
  //       name: '',
  //       email: '',
  //       rating: 0,
  //       comment: ''
  //     });
  //     setErrors({});

  //     // Auto-close modal after 3 seconds
  //     setTimeout(() => {
  //       handleCloseModal();
  //     }, 3000);

  //   } catch (error) {
  //     console.error('Error submitting review:', error);
  //     setSubmitError('There was an error submitting your review. Please try again.');
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };
  const handleSubmitReview = async (e) => {
  e.preventDefault();

  const newErrors = validateForm();
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  setIsSubmitting(true);
  setSubmitError("");

  try {
    const response = await fetch("http://127.0.0.1:8000/home/reviews/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: currentReview.name,
        email: currentReview.email,
        rating: currentReview.rating,
        comment: currentReview.comment,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to save review");
    }

    const savedReview = await response.json();

    // show review immediately
    setReviews((prev) => [
      {
        id: savedReview.id,
        name: savedReview.name,
        rating: savedReview.rating,
        comment: savedReview.comment,
        date: savedReview.created_at.split("T")[0],
        avatar: savedReview.name
          .split(" ")
          .map(n => n[0])
          .join("")
          .toUpperCase(),
      },
      ...prev,
    ]);

    setSubmitSuccess(true);

    setCurrentReview({
      name: "",
      email: "",
      rating: 0,
      comment: "",
    });

  } catch (error) {
    console.error(error);
    setSubmitError("Review not saved. Server error.");
  } finally {
    setIsSubmitting(false);
  }
};


  const handleOpenModal = () => {
    setShowModal(true);
    setSubmitSuccess(false);
    setSubmitError('');
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentReview({
      name: '',
      email: '',
      rating: 0,
      comment: ''
    });
    setErrors({});
    setSubmitSuccess(false);
    setSubmitError('');
    // Restore body scroll
    document.body.style.overflow = 'auto';
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <span key={i} className="star filled-star">
            ⭐
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="star empty-star">
            ☆
          </span>
        );
      }
    }
    return <div className="stars-container">{stars}</div>;
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const isNewReview = (reviewDate) => {
    const reviewDateObj = new Date(reviewDate);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - reviewDateObj);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  // Close modal when clicking outside or pressing Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && showModal) {
        handleCloseModal();
      }
    };

    const handleClickOutside = (e) => {
      if (showModal && e.target.classList.contains('review-modal-overlay')) {
        handleCloseModal();
      }
    };

    if (showModal) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showModal]);

  // Generate floating elements
  const floatingElements = Array.from({ length: isMobile ? 8 : 15 }, (_, i) => ({
    id: i,
    size: Math.random() * (isMobile ? 50 : 100) + (isMobile ? 30 : 50),
    left: Math.random() * 100,
    top: Math.random() * 100,
    animationDelay: Math.random() * 5,
  }));

  return (
    <section className="reviews-section">
      {/* Floating Background Elements */}
      <div className="floating-elements">
        {floatingElements.map((element) => (
          <div
            key={element.id}
            className="floating-element"
            style={{
              width: element.size,
              height: element.size,
              left: `${element.left}%`,
              top: `${element.top}%`,
              animationDelay: `${element.animationDelay}s`,
            }}
          />
        ))}
      </div>

      <div className="reviews-container">
        <h2 className={`section-title ${isVisible ? 'visible' : ''}`}>
          Patient Reviews
        </h2>
        <p className={`section-subtitle ${isVisible ? 'visible' : ''}`}>
          See what our patients say about their experience with QuickMed
        </p>

        {/* Rating Summary Section */}
        <div className={`rating-summary ${isVisible ? 'visible' : ''}`}>
          <div className="overall-rating">
            <div className="overall-score">{averageRating}</div>
            <div className="stars-large">
              {renderStars(Math.round(parseFloat(averageRating)))}
            </div>
            <div className="rating-count">Based on {totalReviews} reviews</div>
          </div>
          <div className="rating-breakdown">
            {ratingBars.map((bar, index) => (
              <div key={index} className="rating-bar">
                <span className="bar-stars">{bar.stars} stars</span>
                <div className="bar-container">
                  <div className="bar-fill" style={{ width: `${bar.percentage}%` }}></div>
                </div>
                <span className="bar-count">{bar.count} ({bar.percentage}%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Grid */}
        {showAllReviews && reviews.length > 6 && (
          <div className="scroll-indicator">
            Scroll to view all {reviews.length} reviews ↓
          </div>
        )}
        
        <div className={`reviews-grid ${showAllReviews ? 'scrollable' : ''} ${isVisible ? 'visible' : ''}`}>
          {displayedReviews.map((review) => (
            <div
              key={review.id}
              className="review-card"
            >
              {isNewReview(review.date) && (
                <div className="new-review-badge">NEW</div>
              )}
              
              <div className="review-header">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">{review.avatar}</div>
                  <div>
                    <h4 className="reviewer-name">{review.name}</h4>
                    <div className="review-stars">{renderStars(review.rating)}</div>
                  </div>
                </div>
                <span className="review-date">{formatDate(review.date)}</span>
              </div>
              <p className="review-comment">{review.comment}</p>
            </div>
          ))}
        </div>

        {/* View More/Less Button */}
        {reviews.length > 6 && (
          <button
            className="view-more-btn"
            onClick={() => setShowAllReviews(!showAllReviews)}
          >
            {showAllReviews ? `Show Less (Viewing ${reviews.length} reviews)` : `View All Reviews (${reviews.length} total)`}
          </button>
        )}

        {/* Add Review Section */}
        <div className={`add-review-section ${isVisible ? 'visible' : ''}`}>
          <h3 className="add-review-title">Share Your Experience</h3>
          <p className="add-review-text">
            Help others make informed decisions about their healthcare
          </p>
          <button
            className="add-review-btn"
            onClick={handleOpenModal}
          >
            Write a Review
          </button>
        </div>
      </div>

      {/* Review Modal */}
      {showModal && (
        <div className="review-modal-overlay">
          <div className="review-modal-content">
            <div className="modal-header">
              <h2 className="modal-title">
                {submitSuccess ? 'Review Submitted!' : 'Write a Review'}
              </h2>
              <button 
                className="modal-close-btn"
                onClick={handleCloseModal}
                disabled={isSubmitting}
              >
                ×
              </button>
            </div>
            
            {submitSuccess ? (
              <div className="success-message">
                <div className="success-icon">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="#4CAF50"/>
                  </svg>
                </div>
                <h3 className="success-title">Thank You!</h3>
                <p className="success-text">
                  Your review has been submitted successfully and is now visible to other users.
                </p>
                <p className="success-note">
                  This modal will close automatically in a few seconds...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="review-form">
                {submitError && (
                  <div className="error-message">
                    <p>{submitError}</p>
                  </div>
                )}
                
                <div className="form-group">
                  <label className="form-label">Your Name *</label>
                  <input
                    type="text"
                    value={currentReview.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="Enter your full name (e.g., John Doe)"
                    className={`form-input ${errors.name ? 'error' : ''}`}
                    disabled={isSubmitting}
                    autoFocus
                    maxLength={50}
                    title="Only letters, spaces, apostrophes, and hyphens allowed"
                  />
                  {errors.name && <span className="error-text">{errors.name}</span>}
                  <div className="input-hint">
                    {currentReview.name.length >= 45 && (
                      <span className="warning-text">
                        {50 - currentReview.name.length} characters remaining
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Your Email *</label>
                  <input
                    type="email"
                    value={currentReview.email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    placeholder="Enter your email (e.g., user@example.com)"
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    disabled={isSubmitting}
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    title="Please enter a valid email address (e.g., user@example.com)"
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                  <div className="input-hint">
                    {!errors.email && currentReview.email && validateEmail(currentReview.email) && (
                      <span className="success-text">✓ Valid email format</span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Rating *</label>
                  <div className="rating-selection">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={`star-btn ${star <= currentReview.rating ? 'selected' : ''}`}
                        onClick={() => handleStarClick(star)}
                        disabled={isSubmitting}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  <div className="rating-text">
                    {currentReview.rating > 0 ? (
                      <span>
                        <span className="rating-value">{currentReview.rating}</span>
                        <span className="rating-label">
                          {currentReview.rating === 1 ? ' star' : ' stars'} selected
                          {currentReview.rating === 5 && ' - Excellent!'}
                          {currentReview.rating === 4 && ' - Good!'}
                          {currentReview.rating === 3 && ' - Average'}
                          {currentReview.rating === 2 && ' - Below Average'}
                          {currentReview.rating === 1 && ' - Poor'}
                        </span>
                      </span>
                    ) : (
                      <span>No rating selected</span>
                    )}
                  </div>
                  {errors.rating && <span className="error-text">{errors.rating}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Your Review *</label>
                  <textarea
                    value={currentReview.comment}
                    onChange={(e) => handleCommentChange(e.target.value)}
                    placeholder="Share your experience with QuickMed (minimum 10 characters)..."
                    className={`form-textarea ${errors.comment ? 'error' : ''}`}
                    maxLength={500}
                    disabled={isSubmitting}
                    rows={5}
                  />
                  {errors.comment && <span className="error-text">{errors.comment}</span>}
                  <div className={`char-count ${currentReview.comment.length >= 490 ? 'warning' : ''}`}>
                    {currentReview.comment.length}/500 characters
                    {currentReview.comment.length >= 10 && currentReview.comment.length < 490 && (
                      <span className="valid-text"> ✓ Minimum requirement met</span>
                    )}
                  </div>
                </div>

                <div className="review-note">
                  <p className="note-text">
                    <strong>Note:</strong> Your review will be published immediately and visible to other users.
                  </p>
                </div>

                <div className="form-actions">
                  <button 
                    type="button"
                    className="cancel-btn"
                    onClick={handleCloseModal}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className={`submit-btn ${isSubmitting ? 'disabled' : ''}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner"></span>
                        Submitting...
                      </>
                    ) : 'Submit Review'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Reviews;