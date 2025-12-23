import React, { useState, useEffect, useRef, useCallback } from 'react';
import './CartView.css';

const CartView = ({
  cart,
  setActiveView,
  updateQuantity,
  removeFromCart,
  getTotalPrice,
  handleCheckoutConfirmation,
  paymentLoading
}) => {
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    landmark: ''
  });
  
  // Saved addresses state
  const [savedAddresses, setSavedAddresses] = useState(() => {
    try {
      const saved = localStorage.getItem('med_app_saved_addresses');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading saved addresses:', error);
      return [];
    }
  });
  
  // Address selection state
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [addressMode, setAddressMode] = useState('select');
  
  // Validation errors state
  const [validationErrors, setValidationErrors] = useState({});
  
  // Tip states
  const [selectedTip, setSelectedTip] = useState(0);
  const [customTip, setCustomTip] = useState('');
  const [tipAmount, setTipAmount] = useState(0);
  
  // Selection state
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  
  const tipOptions = [
    { amount: 10, label: '₹10' },
    { amount: 20, label: '₹20' },
    { amount: 30, label: '₹30' },
    { amount: 50, label: '₹50' },
    { amount: 100, label: '₹100' },
    { amount: 0, label: 'Custom' }
  ];

  const modalRef = useRef(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Initialize with empty selection when component mounts
  useEffect(() => {
    if (cart.length > 0) {
      setSelectedItems([]);
      setSelectAll(false);
    }
  }, []); // Only run once on mount

  // Handle cart changes - FIXED: No infinite loop
  useEffect(() => {
    if (cart.length === 0) {
      setSelectedItems([]);
      setSelectAll(false);
      return;
    }

    // Filter out items that no longer exist in cart
    const validSelectedItems = selectedItems.filter(itemId => 
      cart.some(item => item.id === itemId)
    );

    // Only update if there's actually a difference
    if (validSelectedItems.length !== selectedItems.length) {
      setSelectedItems(validSelectedItems);
    }

    // Update selectAll based on valid selected items
    const shouldBeSelectAll = validSelectedItems.length === cart.length && cart.length > 0;
    if (shouldBeSelectAll !== selectAll) {
      setSelectAll(shouldBeSelectAll);
    }
  }, [cart]); // Only depend on cart

  // Calculate tip amount
  useEffect(() => {
    let calculatedTip = 0;
    
    if (selectedTip > 0) {
      calculatedTip = selectedTip;
    } else if (customTip) {
      calculatedTip = parseInt(customTip) || 0;
    }
    
    setTipAmount(calculatedTip);
  }, [selectedTip, customTip]);

  // Save addresses to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('med_app_saved_addresses', JSON.stringify(savedAddresses));
    } catch (error) {
      console.error('Error saving addresses:', error);
    }
  }, [savedAddresses]);

  // Back button handler - SIMPLIFIED AND WORKING
  const handleBackToMedicines = useCallback(() => {
    console.log('Back to Medicines button clicked');
    
    // Direct approach - works in most cases
    if (setActiveView && typeof setActiveView === 'function') {
      console.log('Calling setActiveView("medicine")');
      setActiveView('medicine');
    } else {
      console.log('setActiveView not available, using fallback');
      // Simple fallback
      if (window.history.length > 1) {
        window.history.back();
      } else {
        // If no history, try to redirect
        window.location.href = window.location.origin;
      }
    }
  }, [setActiveView]);

  // Modal handlers
  const openAddressModal = useCallback(() => {
    if (selectedItems.length === 0) {
      alert('Please select at least one item to checkout');
      return;
    }
    
    let currentTip = 0;
    if (selectedTip > 0) {
      currentTip = selectedTip;
    } else if (customTip) {
      currentTip = parseInt(customTip) || 0;
    }
    setTipAmount(currentTip);
    
    setAddressMode('select');
    setSelectedAddressId(null);
    
    if (savedAddresses.length > 0) {
      setSelectedAddressId(savedAddresses[0].id);
      setAddress(savedAddresses[0]);
    } else {
      setAddressMode('new');
      resetAddressForm();
    }
    
    setShowAddressModal(true);
    document.body.style.overflow = 'hidden';
  }, [selectedItems.length, selectedTip, customTip, savedAddresses]);

  const closeAddressModal = useCallback(() => {
    setShowAddressModal(false);
    setValidationErrors({});
    setAddressMode('select');
    setSelectedAddressId(null);
    document.body.style.overflow = 'auto';
  }, []);

  // Handle click outside modal
  const handleOverlayClick = useCallback((e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeAddressModal();
    }
  }, [closeAddressModal]);

  // Simple BackButton component
  const BackButton = React.memo(({ onClick, text = 'Back' }) => (
    <button 
      className="back-button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(`BackButton "${text}" clicked`);
        if (onClick && typeof onClick === 'function') {
          onClick();
        }
      }}
      type="button"
      style={{ cursor: 'pointer' }}
    >
      ← {text}
    </button>
  ));

  // Format numbers with commas
  const formatIndianNumber = useCallback((number) => {
    return new Intl.NumberFormat('en-IN').format(number);
  }, []);

  // Address management functions
  const resetAddressForm = useCallback(() => {
    setAddress({
      fullName: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      pincode: '',
      landmark: ''
    });
    setValidationErrors({});
  }, []);

  const saveCurrentAddress = useCallback(() => {
    if (!validateAddress()) {
      return;
    }

    const newAddress = {
      ...address,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    const isDuplicate = savedAddresses.some(saved => 
      saved.fullName === newAddress.fullName &&
      saved.phone === newAddress.phone &&
      saved.street === newAddress.street &&
      saved.pincode === newAddress.pincode
    );

    if (isDuplicate) {
      alert('This address is already saved!');
      return;
    }

    setSavedAddresses(prev => [newAddress, ...prev]);
    setSelectedAddressId(newAddress.id);
    setAddressMode('select');
    
    alert('Address saved successfully!');
  }, [address, savedAddresses]);

  const deleteAddress = useCallback((id, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this address?')) {
      setSavedAddresses(prev => prev.filter(addr => addr.id !== id));
      if (selectedAddressId === id) {
        setSelectedAddressId(null);
        resetAddressForm();
      }
    }
  }, [selectedAddressId, resetAddressForm]);

  const handleAddressSelect = useCallback((selectedAddress) => {
    setSelectedAddressId(selectedAddress.id);
    setAddress(selectedAddress);
  }, []);

  const switchToNewAddressMode = useCallback(() => {
    setAddressMode('new');
    resetAddressForm();
    setSelectedAddressId(null);
  }, [resetAddressForm]);

  // Input validation functions
  const validateFullName = useCallback((value) => {
    return value.replace(/[^a-zA-Z\s]/g, '');
  }, []);

  const validatePhone = useCallback((value) => {
    const numbersOnly = value.replace(/[^0-9]/g, '');
    const validNumbers = numbersOnly.split('').filter((char, index) => {
      if (index === 0) {
        return ['6','7','8','9'].includes(char);
      }
      return true;
    }).join('');
    
    return validNumbers.slice(0, 10);
  }, []);

  const validateCity = useCallback((value) => {
    return value.replace(/[^a-zA-Z\s]/g, '');
  }, []);

  const validateState = useCallback((value) => {
    return value.replace(/[^a-zA-Z\s]/g, '');
  }, []);

  const validatePincode = useCallback((value) => {
    return value.replace(/[^0-9]/g, '').slice(0, 6);
  }, []);

  const validateCustomTip = useCallback((value) => {
    return value.replace(/[^0-9]/g, '');
  }, []);

  // Item selection functions
  const toggleItemSelection = useCallback((itemId) => {
    setSelectedItems(prev => {
      let newSelected;
      
      if (prev.includes(itemId)) {
        newSelected = prev.filter(id => id !== itemId);
      } else {
        newSelected = [...prev, itemId];
      }
      
      setSelectAll(newSelected.length === cart.length && cart.length > 0);
      
      return newSelected;
    });
  }, [cart.length]);

  const toggleSelectAll = useCallback(() => {
    if (selectAll) {
      setSelectedItems([]);
      setSelectAll(false);
    } else {
      const allItemIds = cart.map(item => item.id);
      setSelectedItems(allItemIds);
      setSelectAll(true);
    }
  }, [selectAll, cart]);

  const handleRemoveItem = useCallback((itemId) => {
    removeFromCart(itemId);
    
    setSelectedItems(prev => {
      const newSelected = prev.filter(id => id !== itemId);
      
      if (cart.length > 1) {
        setSelectAll(newSelected.length === (cart.length - 1));
      } else {
        setSelectAll(false);
      }
      
      return newSelected;
    });
  }, [removeFromCart, cart.length]);

  const getSelectedCartItems = useCallback(() => {
    return cart.filter(item => selectedItems.includes(item.id));
  }, [cart, selectedItems]);

  const getSelectedTotalPrice = useCallback(() => {
    const selected = getSelectedCartItems();
    return selected.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [getSelectedCartItems]);

  const getTotalWithTip = useCallback(() => {
    const subtotal = getSelectedTotalPrice();
    
    return {
      subtotal,
      tip: tipAmount,
      total: subtotal + tipAmount
    };
  }, [getSelectedTotalPrice, tipAmount]);

  const handleTipSelect = useCallback((amount) => {
    setSelectedTip(amount);
    if (amount !== 0) {
      setCustomTip('');
      setTipAmount(amount);
    } else {
      setTipAmount(0);
    }
  }, []);

  const handleCustomTipChange = useCallback((value) => {
    const validatedValue = validateCustomTip(value);
    setCustomTip(validatedValue);
    
    if (validatedValue) {
      setSelectedTip(0);
      setTipAmount(parseInt(validatedValue) || 0);
    } else {
      setTipAmount(0);
    }
  }, [validateCustomTip]);

  const handleAddressChange = useCallback((field, value) => {
    let validatedValue = value;

    switch (field) {
      case 'fullName':
        validatedValue = validateFullName(value);
        break;
      case 'phone':
        validatedValue = validatePhone(value);
        break;
      case 'city':
        validatedValue = validateCity(value);
        break;
      case 'state':
        validatedValue = validateState(value);
        break;
      case 'pincode':
        validatedValue = validatePincode(value);
        break;
      default:
        validatedValue = value;
    }

    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    setAddress(prev => ({
      ...prev,
      [field]: validatedValue
    }));
  }, [validateFullName, validatePhone, validateCity, validateState, validatePincode, validationErrors]);

  const validateField = useCallback((field, value) => {
    switch (field) {
      case 'fullName':
        if (!value.trim()) return 'Full name is required';
        if (value.trim().length < 3) return 'Full name must be at least 3 characters';
        return '';
        
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        if (value.length !== 10) return 'Phone number must be 10 digits';
        if (!['6','7','8','9'].includes(value[0])) return 'Phone number must start with 6,7,8 or 9';
        return '';
        
      case 'street':
        if (!value.trim()) return 'Street address is required';
        if (value.trim().length < 5) return 'Please enter a valid street address';
        return '';
        
      case 'city':
        if (!value.trim()) return 'City is required';
        if (value.trim().length < 2) return 'Please enter a valid city name';
        return '';
        
      case 'state':
        if (!value.trim()) return 'State is required';
        if (value.trim().length < 2) return 'Please enter a valid state name';
        return '';
        
      case 'pincode':
        if (!value.trim()) return 'Pincode is required';
        if (value.length !== 6) return 'Pincode must be 6 digits';
        return '';
        
      default:
        return '';
    }
  }, []);

  const validateAddress = useCallback(() => {
    const errors = {};
    let isValid = true;

    const fieldsToValidate = ['fullName', 'phone', 'street', 'city', 'state', 'pincode'];
    
    fieldsToValidate.forEach(field => {
      const error = validateField(field, address[field]);
      if (error) {
        errors[field] = error;
        isValid = false;
      }
    });

    setValidationErrors(errors);
    return isValid;
  }, [address, validateField]);

  const handleCheckout = useCallback(async () => {
    if (selectedItems.length === 0) {
      alert('Please select at least one item to checkout');
      return;
    }
    
    let currentTip = tipAmount;
    if (selectedTip === 0 && customTip) {
      currentTip = parseInt(customTip) || 0;
    }
    setTipAmount(currentTip);
    
    openAddressModal();
  }, [selectedItems.length, tipAmount, selectedTip, customTip, openAddressModal]);

  const handlePaymentSubmit = useCallback(async () => {
    // Validate if an address is selected or new address is valid
    if (addressMode === 'select' && !selectedAddressId) {
      alert('Please select a delivery address');
      return;
    }
    
    if (addressMode === 'new' && !validateAddress()) {
      const firstErrorField = Object.keys(validationErrors)[0];
      if (firstErrorField) {
        const element = document.getElementById(`address-${firstErrorField}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.focus();
        }
      }
      return;
    }

    const totals = getTotalWithTip();
    const selectedCartItems = getSelectedCartItems();
    
    const checkoutData = {
      address: addressMode === 'new' ? address : savedAddresses.find(addr => addr.id === selectedAddressId),
      tip: totals.tip,
      subtotal: totals.subtotal,
      totalAmount: totals.total,
      selectedItems: selectedItems,
      cartItems: selectedCartItems,
      tipDetails: {
        selectedTip,
        customTip,
        tipAmount: totals.tip
      }
    };

    console.log('Checkout data:', checkoutData);

    closeAddressModal();

    try {
      // Call handleCheckoutConfirmation and wait for it to complete
      const success = await handleCheckoutConfirmation(checkoutData);
      
      // If payment was successful, CartView doesn't need to clear cart anymore
      // The UserDashboard will handle it via handlePaymentSuccess
      if (success) {
        // Just reset local states for tip and selection
        setSelectedItems([]);
        setSelectAll(false);
        setSelectedTip(0);
        setCustomTip('');
        setTipAmount(0);
        
        // The navigation will happen in UserDashboard
      }
    } catch (error) {
      console.log('Payment was cancelled or failed:', error);
      alert('Payment failed. Please try again.');
    }
  }, [addressMode, selectedAddressId, validateAddress, validationErrors, getTotalWithTip, getSelectedCartItems, address, savedAddresses, selectedItems, selectedTip, customTip, closeAddressModal, handleCheckoutConfirmation]);

  const renderErrorMessage = useCallback((field) => {
    if (validationErrors[field]) {
      return (
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          {validationErrors[field]}
        </div>
      );
    }
    return null;
  }, [validationErrors]);

  const getSelectionStats = useCallback(() => {
    const selectedCount = selectedItems.length;
    const totalCount = cart.length;
    const selectedTotal = getSelectedTotalPrice();
    
    return {
      selectedCount,
      totalCount,
      selectedTotal
    };
  }, [selectedItems.length, cart.length, getSelectedTotalPrice]);

  const stats = getSelectionStats();
  const totals = getTotalWithTip();

  return (
    <div className="cart-container">
      {/* Header Section */}
      <div className="cart-header">
        <div className="back-button-container">
          <BackButton 
            onClick={handleBackToMedicines} 
            text="Back to Medicines" 
          />
          
          {/* Add button to view orders */}
          {cart.length > 0 && (
            <button 
              className="view-orders-btn"
              onClick={() => {
                console.log('View Orders clicked');
                if (typeof setActiveView === 'function') {
                  setActiveView('orders');
                }
              }}
              type="button"
            >
              📋 View Orders
            </button>
          )}
        </div>
        
        <div className="header-title-container">
          <h2 className="cart-title">Your Shopping Cart</h2>
        </div>
        
        {cart.length > 0 && (
          <div className="cart-stats">
            <div className="stat-box">
              <div className="stat-value">{stats.selectedCount}/{cart.length}</div>
              <div className="stat-label">✅ Selected</div>
            </div>
            
            <div className="stat-box">
              <div className="stat-value">₹{formatIndianNumber(stats.selectedTotal)}</div>
              <div className="stat-label">💰 Selected Total</div>
            </div>
          </div>
        )}
      </div>
      
      <div className="cart-content">
        {cart.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h3 className="empty-cart-title">Your cart is empty</h3>
            <p className="empty-cart-message">
              Looks like you haven't added any medicines to your cart yet.
            </p>
            <button 
              className="shop-now-btn"
              onClick={handleBackToMedicines}
              type="button"
            >
              Shop Medicines Now
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items-container">
              <div className="cart-items-header">
                <div className="selection-header">
                  <h3 className="cart-items-title">🛒 Cart Items ({cart.length})</h3>
                  <div className="select-all-container">
                    <label className="select-all-label">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={toggleSelectAll}
                        className="select-all-checkbox"
                      />
                      <span className="select-all-text">
                        {selectAll ? 'Deselect All' : 'Select All'}
                      </span>
                    </label>
                    <span className="selection-count">
                      ({stats.selectedCount} selected)
                    </span>
                  </div>
                </div>
                <p className="cart-items-subtitle">Select items you want to checkout</p>
              </div>
              
              <div className="cart-items-list">
                {cart.map(item => {
                  const isSelected = selectedItems.includes(item.id);
                  return (
                    <div key={item.id} className={`cart-item ${isSelected ? 'selected' : ''}`}>
                      <div className="item-selection">
                        <label className="selection-label">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleItemSelection(item.id)}
                            className="item-checkbox"
                          />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                      
                      <div className="item-info">
                        <h4 className="item-name">
                          {item.name}
                          {isSelected && <span className="selected-badge">✓ Selected</span>}
                        </h4>
                        <p className="item-vendor"> {item.vendor}</p>
                        <p className="item-price">₹{formatIndianNumber(item.price)} each</p>
                      </div>
                      
                      <div className="quantity-controls">
                        <button 
                          className={`quantity-btn ${item.quantity <= 1 ? 'disabled' : ''}`}
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          type="button"
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span className="quantity-display">{item.quantity}</span>
                        <button 
                          className="quantity-btn increase"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          type="button"
                        >
                          +
                        </button>
                      </div>
                      
                      <div className="item-total">
                        ₹{formatIndianNumber(item.price * item.quantity)}
                      </div>
                      
                      <button 
                        className="remove-btn"
                        onClick={() => handleRemoveItem(item.id)}
                        title="Remove item"
                        type="button"
                      >
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="order-summary">
              <div className="summary-content">
                <h3 className="summary-title">💰 Order Summary</h3>
                
                <div className="selection-summary">
                  <div className="selection-summary-header">
                    <span className="selection-summary-icon">📋</span>
                    <span className="selection-summary-title">Selected Items Summary</span>
                  </div>
                  <div className="selection-summary-content">
                    {getSelectedCartItems().map(item => (
                      <div key={item.id} className="selected-item-summary">
                        <span className="selected-item-name">{item.name}</span>
                        <span className="selected-item-qty">×{item.quantity}</span>
                        <span className="selected-item-price">
                          ₹{formatIndianNumber(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                    {stats.selectedCount === 0 && (
                      <div className="no-selection-message">
                        ⚠️ No items selected. Please select items to checkout.
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="tip-section">
                  <h4 className="tip-title">💝 Tip Your Delivery Agent (Optional)</h4>
                  
                  <p className="tip-subtitle">
                    Support your delivery agent with a small tip for their service
                  </p>
                  
                  <div className="tip-options">
                    {tipOptions.map((tip) => (
                      <button
                        key={tip.amount}
                        className={`tip-option ${selectedTip === tip.amount ? 'selected' : ''}`}
                        onClick={() => handleTipSelect(tip.amount)}
                        type="button"
                        disabled={stats.selectedCount === 0}
                      >
                        <span className="tip-label">
                          {tip.label}
                        </span>
                        {tip.amount > 0 && (
                          <span className="tip-emoji">
                            👍
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                  
                  {selectedTip === 0 && (
                    <div className="custom-tip">
                      <label className="custom-tip-label">
                        Enter Custom Tip Amount (₹)
                      </label>
                      <input
                        type="text"
                        placeholder="Enter amount"
                        value={customTip}
                        onChange={(e) => handleCustomTipChange(e.target.value)}
                        className="custom-tip-input"
                        maxLength="5"
                        disabled={stats.selectedCount === 0}
                      />
                    </div>
                  )}
                </div>
                
                <div className="price-breakdown">
                  <div className="price-row">
                    <span className="price-label">Selected Items Total:</span>
                    <span className="price-value">₹{formatIndianNumber(totals.subtotal)}</span>
                  </div>
                  
                  <div className="price-row">
                    <span className="price-label">Delivery Fee:</span>
                    <span className="price-free">🆓 Free</span>
                  </div>
                  
                  <div className="price-row">
                    <span className="price-label">Tax (GST):</span>
                    <span className="price-tax">₹0</span>
                  </div>
                  
                  <div className="price-row">
                    <div className="tip-label-container">
                      <span className="price-label">Delivery Tip:</span>
                      <span className="tip-optional">
                        Optional
                      </span>
                    </div>
                    <span className={`tip-amount ${totals.tip > 0 ? 'has-tip' : ''}`}>
                      {totals.tip > 0 ? `₹${formatIndianNumber(totals.tip)}` : '₹0'}
                    </span>
                  </div>
                  
                  <div className="grand-total">
                    <span className="total-label">Grand Total:</span>
                    <span className="total-value">
                      ₹{formatIndianNumber(totals.total)}
                    </span>
                  </div>
                  
                  {totals.tip > 0 && (
                    <div className="tip-note">
                      💝 Thank you for supporting your delivery agent!
                    </div>
                  )}
                  
                  {stats.selectedCount > 0 && stats.selectedCount < cart.length && (
                    <div className="selection-note">
                      📝 Note: {cart.length - stats.selectedCount} item(s) will remain in your cart
                    </div>
                  )}
                </div>
                
                <button 
                  className={`checkout-btn ${paymentLoading ? 'loading' : ''} ${stats.selectedCount === 0 ? 'disabled' : ''}`}
                  onClick={handleCheckout}
                  disabled={paymentLoading || stats.selectedCount === 0}
                  type="button"
                >
                  {paymentLoading 
                    ? '⏳ Processing Payment...' 
                    : stats.selectedCount === 0
                    ? '⚠️ Select Items to Checkout'
                    : `🚀 Checkout ${stats.selectedCount} Item(s)`}
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Enhanced Address Modal with Saved Addresses */}
      {showAddressModal && (
        <div 
          className="modal-overlay"
          onClick={handleOverlayClick}
        >
          <div 
            ref={modalRef}
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 className="modal-title">
                <span className="modal-icon">📍</span>
                Delivery Address
              </h2>
              <button
                onClick={closeAddressModal}
                className="modal-close-btn"
                type="button"
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              {/* Address Mode Tabs */}
              <div className="address-mode-tabs">
                <button
                  className={`address-tab ${addressMode === 'select' ? 'active' : ''}`}
                  onClick={() => setAddressMode('select')}
                  type="button"
                >
                  📋 Saved Addresses
                </button>
                <button
                  className={`address-tab ${addressMode === 'new' ? 'active' : ''}`}
                  onClick={switchToNewAddressMode}
                  type="button"
                >
                  ✏️ Add New Address
                </button>
              </div>

              {/* Saved Addresses Section */}
              {addressMode === 'select' && (
                <div className="saved-addresses-section">
                  {savedAddresses.length > 0 ? (
                    <>
                      <h4 className="section-title">🏠 Your Saved Addresses</h4>
                      <p className="section-subtitle">
                        Select a saved address or add a new one
                      </p>
                      
                      <div className="saved-addresses-list">
                        {savedAddresses.map((addr) => (
                          <div
                            key={addr.id}
                            className={`saved-address-card ${selectedAddressId === addr.id ? 'selected' : ''}`}
                            onClick={() => handleAddressSelect(addr)}
                          >
                            <div className="address-card-header">
                              <div className="address-type">
                                {addr.isDefault && <span className="default-badge">🏠 Default</span>}
                              </div>
                              <button
                                className="delete-address-btn"
                                onClick={(e) => deleteAddress(addr.id, e)}
                                type="button"
                                title="Delete address"
                              >
                                🗑️
                              </button>
                            </div>
                            
                            <div className="address-card-content">
                              <div className="address-name-phone">
                                <strong>{addr.fullName}</strong>
                                <span className="address-phone">📱 {addr.phone}</span>
                              </div>
                              <p className="address-street">{addr.street}</p>
                              {addr.landmark && (
                                <p className="address-landmark">
                                  <em>Near: {addr.landmark}</em>
                                </p>
                              )}
                              <p className="address-city-state">
                                {addr.city}, {addr.state} - {addr.pincode}
                              </p>
                            </div>
                            
                            <div className="address-card-footer">
                              {selectedAddressId === addr.id && (
                                <div className="selected-indicator">
                                  ✅ Selected for delivery
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Add New Address Button */}
                      <button
                        className="add-new-address-btn"
                        onClick={switchToNewAddressMode}
                        type="button"
                      >
                        ➕ Add New Address
                      </button>
                    </>
                  ) : (
                    <div className="no-addresses-message">
                      <div className="no-addresses-icon">🏠</div>
                      <h4>No Saved Addresses</h4>
                      <p>You haven't saved any addresses yet.</p>
                      <button
                        className="add-first-address-btn"
                        onClick={switchToNewAddressMode}
                        type="button"
                      >
                        ➕ Add Your First Address
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* New Address Form Section */}
              {addressMode === 'new' && (
                <div className="new-address-section">
                  <h4 className="section-title">✏️ Enter New Address</h4>
                  <p className="section-subtitle">
                    Fill in your delivery details below
                  </p>
                  
                  <div className="address-form">
                    <div className="form-row">
                      <div id="address-fullName" className="form-group">
                        <label className="form-label">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          placeholder="Enter full name"
                          value={address.fullName}
                          onChange={(e) => handleAddressChange('fullName', e.target.value)}
                          className={`form-input ${validationErrors.fullName ? 'error' : ''}`}
                        />
                        {renderErrorMessage('fullName')}
                      </div>
                      <div id="address-phone" className="form-group">
                        <label className="form-label">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          placeholder="6,7,8,9 numbers only"
                          value={address.phone}
                          onChange={(e) => handleAddressChange('phone', e.target.value)}
                          className={`form-input ${validationErrors.phone ? 'error' : ''}`}
                          maxLength="10"
                        />
                        {renderErrorMessage('phone')}
                      </div>
                    </div>

                    <div id="address-street" className="form-group">
                      <label className="form-label">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        placeholder="Enter street address"
                        value={address.street}
                        onChange={(e) => handleAddressChange('street', e.target.value)}
                        className={`form-input ${validationErrors.street ? 'error' : ''}`}
                      />
                      {renderErrorMessage('street')}
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        Landmark (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="Enter nearby landmark"
                        value={address.landmark}
                        onChange={(e) => handleAddressChange('landmark', e.target.value)}
                        className="form-input"
                      />
                    </div>

                    <div className="form-row">
                      <div id="address-city" className="form-group">
                        <label className="form-label">
                          City *
                        </label>
                        <input
                          type="text"
                          placeholder="Enter city"
                          value={address.city}
                          onChange={(e) => handleAddressChange('city', e.target.value)}
                          className={`form-input ${validationErrors.city ? 'error' : ''}`}
                        />
                        {renderErrorMessage('city')}
                      </div>
                      <div id="address-state" className="form-group">
                        <label className="form-label">
                          State *
                        </label>
                        <input
                          type="text"
                          placeholder="Enter state"
                          value={address.state}
                          onChange={(e) => handleAddressChange('state', e.target.value)}
                          className={`form-input ${validationErrors.state ? 'error' : ''}`}
                        />
                        {renderErrorMessage('state')}
                      </div>
                    </div>

                    <div id="address-pincode" className="form-group">
                      <label className="form-label">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        placeholder="6-digit numbers only"
                        value={address.pincode}
                        onChange={(e) => handleAddressChange('pincode', e.target.value)}
                        className={`form-input ${validationErrors.pincode ? 'error' : ''}`}
                        maxLength="6"
                      />
                      {renderErrorMessage('pincode')}
                    </div>
                    
                    {/* Save Address Checkbox */}
                    <div className="save-address-option">
                      <label className="save-address-label">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="save-address-checkbox"
                        />
                        <span>💾 Save this address for future orders</span>
                      </label>
                    </div>
                    
                    {/* Form Action Buttons */}
                    <div className="address-form-actions">
                      <button
                        className="save-address-btn"
                        onClick={saveCurrentAddress}
                        type="button"
                      >
                        💾 Save Address
                      </button>
                      
                      <button
                        className="use-without-saving-btn"
                        onClick={() => {
                          setAddressMode('select');
                        }}
                        type="button"
                      >
                        📦 Use Address (Don't Save)
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Order Summary (Only shown when address is selected) */}
              {(addressMode === 'select' && selectedAddressId) && (
                <div className="checkout-summary-modal">
                  <h4 className="checkout-summary-title">📋 Order Summary ({stats.selectedCount} items)</h4>
                  <div className="checkout-items-list">
                    {getSelectedCartItems().map(item => (
                      <div key={item.id} className="checkout-item">
                        <span className="checkout-item-name">{item.name}</span>
                        <span className="checkout-item-details">
                          {item.quantity} × ₹{formatIndianNumber(item.price)} = 
                          ₹{formatIndianNumber(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="checkout-total">
                    <span>Subtotal:</span>
                    <span>₹{formatIndianNumber(totals.subtotal)}</span>
                  </div>
                  <div className="checkout-total">
                    <span>Delivery Tip:</span>
                    <span>₹{formatIndianNumber(totals.tip)}</span>
                  </div>
                  <div className="checkout-total" style={{ borderTop: '2px solid #009688', fontWeight: '700' }}>
                    <span>Total to Pay:</span>
                    <span>₹{formatIndianNumber(totals.total)}</span>
                  </div>
                  
                  {/* Selected Address Preview */}
                  <div className="selected-address-preview">
                    <h5 className="address-preview-title">📍 Delivery To:</h5>
                    <div className="address-preview-content">
                      {(() => {
                        const selectedAddress = savedAddresses.find(addr => addr.id === selectedAddressId);
                        if (!selectedAddress) return null;
                        
                        return (
                          <>
                            <div className="address-preview-name-phone">
                              <strong>{selectedAddress.fullName}</strong>
                              <span>📱 {selectedAddress.phone}</span>
                            </div>
                            <p>{selectedAddress.street}</p>
                            {selectedAddress.landmark && (
                              <p><em>Near: {selectedAddress.landmark}</em></p>
                            )}
                            <p>{selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}</p>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="modal-footer">
              <button
                onClick={closeAddressModal}
                className="modal-cancel-btn"
                type="button"
              >
                Cancel
              </button>
              
              {/* Conditional Submit Button */}
              {addressMode === 'select' ? (
                <button
                  onClick={handlePaymentSubmit}
                  disabled={paymentLoading || !selectedAddressId}
                  className={`modal-submit-btn ${paymentLoading ? 'loading' : ''} ${!selectedAddressId ? 'disabled' : ''}`}
                  type="button"
                >
                  {paymentLoading 
                    ? '⏳ Processing...' 
                    : !selectedAddressId
                    ? '📋 Select an Address'
                    : `💳 Pay ₹${formatIndianNumber(totals.total)}`}
                </button>
              ) : (
                <button
                  onClick={handlePaymentSubmit}
                  disabled={paymentLoading}
                  className={`modal-submit-btn ${paymentLoading ? 'loading' : ''}`}
                  type="button"
                >
                  {paymentLoading 
                    ? '⏳ Processing...' 
                    : `💳 Pay ₹${formatIndianNumber(totals.total)}`}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartView;