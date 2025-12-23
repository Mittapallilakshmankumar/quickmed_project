import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import debounce from 'lodash/debounce';

// Enhanced Vehicle Types with Rates
const VEHICLE_TYPES = [
  { 
    id: "ambulance", 
    label: "Ambulance", 
    emoji: "🚑", 
    rate: 45,
    baseFare: 200,
    minDistance: 0,
    capacity: "Patient + Attendants",
    features: ["Medical Staff", "Emergency Equipment", "24/7 Service"]
  },
  { 
    id: "cab",       
    label: "Cab",       
    emoji: "🚕", 
    rate: 30,
    baseFare: 80,
    minDistance: 2,
    capacity: "4 Passengers",
    features: ["AC", "Comfort", "Luggage Space"]
  },
  { 
    id: "auto",      
    label: "Auto",      
    emoji: "🛺", 
    rate: 20,
    baseFare: 40,
    minDistance: 1,
    capacity: "3 Passengers",
    features: ["Quick Ride", "Affordable", "Short Trips"]
  },
  { 
    id: "bike",      
    label: "Bike",      
    emoji: "🏍️", 
    rate: 15,
    baseFare: 30,
    minDistance: 1,
    capacity: "1 Passenger",
    features: ["Fast Delivery", "Avoid Traffic", "Economical"]
  },
];

// Enhanced Users with Live Locations & Ratings
const VEHICLE_USERS = {
  ambulance: [
    { 
      id: 1, 
      name: "Apollo Emergency",    
      vehicleNo: "TS09 EM 1122", 
      distance: "1.2 km",  
      eta: "4 min",  
      status: "Available",
      rating: 4.9,
      totalTrips: 1247,
      phone: "+91 9876543210",
      currentLocation: { lat: 12.9716, lng: 77.5946, address: "MG Road, Bangalore" },
      driverPhoto: "👨‍⚕️"
    },
    { 
      id: 2, 
      name: "City Care Ambulance", 
      vehicleNo: "TS07 AB 3344", 
      distance: "2.8 km",  
      eta: "9 min",  
      status: "Available",
      rating: 4.7,
      totalTrips: 892,
      phone: "+91 9876543211",
      currentLocation: { lat: 12.9786, lng: 77.6026, address: "Indiranagar" },
      driverPhoto: "👨‍⚕️"
    },
  ],
  cab: [
    { 
      id: 4, 
      name: "Suresh Kumar",  
      vehicleNo: "TS08 CB 4455", 
      distance: "0.9 km", 
      eta: "3 min", 
      status: "Available",
      rating: 4.8,
      totalTrips: 567,
      phone: "+91 9876543212",
      carModel: "Maruti Suzuki Swift Dzire",
      currentLocation: { lat: 12.9756, lng: 77.5966, address: "Koramangala" },
      driverPhoto: "👨‍💼"
    },
    { 
      id: 5, 
      name: "Anjali Reddy", 
      vehicleNo: "TS10 CB 6677", 
      distance: "2.1 km", 
      eta: "8 min", 
      status: "Available",
      rating: 4.9,
      totalTrips: 423,
      phone: "+91 9876543213",
      carModel: "Hyundai i20",
      currentLocation: { lat: 12.9686, lng: 77.5906, address: "Jayanagar" },
      driverPhoto: "👩‍💼"
    },
  ],
  auto: [
    { 
      id: 7, 
      name: "Mahesh Auto",    
      vehicleNo: "TS03 AU 2211", 
      distance: "0.6 km", 
      eta: "2 min", 
      status: "Available",
      rating: 4.6,
      totalTrips: 1256,
      phone: "+91 9876543214",
      currentLocation: { lat: 12.9736, lng: 77.5936, address: "BTM Layout" },
      driverPhoto: "👨"
    },
    { 
      id: 8, 
      name: "Ganesh R",       
      vehicleNo: "TS09 AU 5544", 
      distance: "1.8 km", 
      eta: "6 min", 
      status: "Available",
      rating: 4.5,
      totalTrips: 987,
      phone: "+91 9876543215",
      currentLocation: { lat: 12.9706, lng: 77.5996, address: "HSR Layout" },
      driverPhoto: "👨"
    },
  ],
  bike: [
    { 
      id: 10, 
      name: "QuickMed Rider 1", 
      vehicleNo: "TS01 BK 1234", 
      distance: "0.4 km", 
      eta: "2 min", 
      status: "Available",
      rating: 4.7,
      totalTrips: 754,
      phone: "+91 9876543216",
      currentLocation: { lat: 12.9726, lng: 77.5926, address: "Basavanagudi" },
      driverPhoto: "👨‍✈️"
    },
    { 
      id: 11, 
      name: "Rider Partner",    
      vehicleNo: "TS08 BK 9101", 
      distance: "3.7 km", 
      eta: "13 min", 
      status: "Available",
      rating: 4.4,
      totalTrips: 456,
      phone: "+91 9876543217",
      currentLocation: { lat: 12.9806, lng: 77.6046, address: "Whitefield" },
      driverPhoto: "👨‍✈️"
    },
  ],
};

// Default color palette
const DEFAULT_COLORS = {
  primary:  "#009688",
  mint:     "#4DB6AC",
  softbg:   "#E0F2F1",
  white:    "#FFFFFF",
  darktext: "#124441",
  softtext: "#4F6F6B",
};

// IMPORTANT: Replace with your actual Google Maps API Key
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "AIzaSyCa50npaPEYPlil7gCMvYIwptmvWUWgZK8";

// Create separate components for inputs to prevent re-renders
const PickupLocationInput = React.memo(({ 
  theme, 
  pickupLocation, 
  onPickupChange, 
  onUseCurrentLocation,
  pickupCoords,
  pickupSuggestions,
  showPickupSuggestions,
  onSuggestionClick,
  onFocus,
  onBlur
}) => {
  const pickupInputRef = useRef(null);
  
  return (
    <div style={{ position: 'relative' }}>
      <label style={labelStyle(theme)}>Pickup Location</label>
      <div style={{ display: 'flex', gap: '8px' }}>
        <div style={{ flex: 1 }}>
          <input
            ref={pickupInputRef}
            type="text"
            placeholder="Type your pickup location or use current"
            value={pickupLocation}
            onChange={(e) => onPickupChange(e.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
            style={inputStyle(theme)}
          />
          {pickupCoords && (
            <div style={{ fontSize: '11px', color: theme.softtext, marginTop: '5px' }}>
              📍 Lat: {pickupCoords.lat.toFixed(6)}, Lng: {pickupCoords.lng.toFixed(6)}
            </div>
          )}
        </div>
        <button
          onClick={onUseCurrentLocation}
          style={currentLocationButtonStyle(theme)}
          title="Use current location"
          type="button"
        >
          📍
        </button>
      </div>
      
      {showPickupSuggestions && pickupSuggestions.length > 0 && (
        <div style={suggestionsDropdownStyle}>
          {pickupSuggestions.map(suggestion => (
            <div
              key={suggestion.id}
              onMouseDown={(e) => {
                e.preventDefault(); // Prevent input blur
                onSuggestionClick(suggestion, 'pickup');
              }}
              style={suggestionItemStyle}
            >
              <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
                {suggestion.mainText}
              </div>
              <div style={{ fontSize: '12px', color: theme.softtext }}>
                {suggestion.secondaryText}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

const DropLocationInput = React.memo(({ 
  theme, 
  dropLocation, 
  onDropChange, 
  dropCoords,
  dropSuggestions,
  showDropSuggestions,
  onSuggestionClick,
  onFocus,
  onBlur
}) => {
  const dropInputRef = useRef(null);
  
  return (
    <div style={{ position: 'relative' }}>
      <label style={labelStyle(theme)}>Drop Location</label>
      <input
        ref={dropInputRef}
        type="text"
        placeholder="Type your destination"
        value={dropLocation}
        onChange={(e) => onDropChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        style={inputStyle(theme)}
      />
      {dropCoords && (
        <div style={{ fontSize: '11px', color: theme.softtext, marginTop: '5px' }}>
          📍 Lat: {dropCoords.lat.toFixed(6)}, Lng: {dropCoords.lng.toFixed(6)}
        </div>
      )}
      
      {showDropSuggestions && dropSuggestions.length > 0 && (
        <div style={suggestionsDropdownStyle}>
          {dropSuggestions.map(suggestion => (
            <div
              key={suggestion.id}
              onMouseDown={(e) => {
                e.preventDefault(); // Prevent input blur
                onSuggestionClick(suggestion, 'drop');
              }}
              style={suggestionItemStyle}
            >
              <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
                {suggestion.mainText}
              </div>
              <div style={{ fontSize: '12px', color: theme.softtext }}>
                {suggestion.secondaryText}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

const VehicleDashboard = ({ setActiveView, addNotification, colors }) => {
  const navigate = useNavigate();
  const theme = colors || DEFAULT_COLORS;
  
  // State management
  const [selectedType, setSelectedType] = useState("ambulance");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(true);
  const [search, setSearch] = useState("");
  
  // Location States
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropCoords, setDropCoords] = useState(null);
  const [calculatedDistance, setCalculatedDistance] = useState(0);
  const [estimatedFare, setEstimatedFare] = useState(0);
  
  // Map & Autocomplete States
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [tripStatus, setTripStatus] = useState("not_started");
  const [tripProgress, setTripProgress] = useState(0);
  
  // New states for location suggestions
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropSuggestions, setDropSuggestions] = useState([]);
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDropSuggestions, setShowDropSuggestions] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);
  
  // Refs
  const mapRef = useRef(null);
  
  const notify = addNotification || ((title, message, type = "info") =>
    console.log(`[${type}] ${title}: ${message}`));

  // Memoized values to prevent unnecessary re-renders
  const selectedUsers = useMemo(() => VEHICLE_USERS[selectedType] || [], [selectedType]);
  const selectedVehicle = useMemo(() => VEHICLE_TYPES.find(v => v.id === selectedType), [selectedType]);

  // Filter users based on search and availability - memoized
  const filteredUsers = useMemo(() => {
    return selectedUsers.filter((user) => {
      // Check availability filter
      if (showOnlyAvailable && user.status !== "Available") {
        return false;
      }
      
      // Check search filter
      if (search.trim() === "") {
        return true;
      }
      
      const query = search.toLowerCase();
      return (
        user.name.toLowerCase().includes(query) ||
        user.vehicleNo.toLowerCase().includes(query)
      );
    });
  }, [selectedUsers, showOnlyAvailable, search]);

  // ==================== GOOGLE MAPS FUNCTIONS ====================

  // 1. Load Google Maps Script - SIMPLEST APPROACH
  useEffect(() => {
    // Check if already loaded
    if (window.google && window.google.maps) {
      setMapLoaded(true);
      setTimeout(() => initializeMap(), 100);
      return;
    }

    // Check if script already exists
    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existingScript) {
      // Script already loading, wait for it
      const checkInterval = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(checkInterval);
          setMapLoaded(true);
          setTimeout(() => initializeMap(), 100);
        }
      }, 500);
      
      return () => clearInterval(checkInterval);
    }

    // Load Google Maps script using a safer approach
    const scriptId = 'google-maps-script-' + Date.now();
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      console.log("✅ Google Maps API loaded successfully!");
      setMapLoaded(true);
      setTimeout(() => initializeMap(), 100);
    };
    
    script.onerror = () => {
      console.error("❌ Failed to load Google Maps API");
      notify("Map Error", "Could not load Google Maps. Please check your API key.", "error");
    };

    document.head.appendChild(script);
    
    return () => {
      // Don't remove the script - it's a shared resource
    };
  }, []);

  // 2. Initialize Map
  const initializeMap = useCallback(() => {
    if (!mapRef.current || !window.google) {
      return;
    }

    try {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 12.9716, lng: 77.5946 },
        zoom: 12,
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
      });

      setMapInstance(map);
      console.log("✅ Google Map initialized");

      // Get user's current location
      getUserCurrentLocation(map);

    } catch (error) {
      console.error("Error initializing Google Maps:", error);
    }
  }, []);

  // 3. Get User's Current Location
  const getUserCurrentLocation = useCallback((map) => {
    if (!navigator.geolocation) {
      console.log("Geolocation not supported");
      setPickupLocation("Bangalore, Karnataka, India");
      setPickupCoords({ lat: 12.9716, lng: 77.5946 });
      return;
    }

    console.log("Getting user location...");
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        
        console.log("📍 User location:", userLocation);
        setPickupCoords(userLocation);
        
        // Reverse geocode to get address
        reverseGeocode(userLocation, 'pickup');
        
        // Center map on user
        if (map) {
          map.setCenter(userLocation);
          map.setZoom(14);
        }
        
      },
      (error) => {
        console.warn("Geolocation error:", error);
        setPickupLocation("Your Current Location");
        setPickupCoords({ lat: 12.9716, lng: 77.5946 });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }, []);

  // 4. Reverse Geocode Coordinates to Address
  const reverseGeocode = useCallback((location, type) => {
    if (!window.google?.maps?.Geocoder) return;

    const geocoder = new window.google.maps.Geocoder();
    
    geocoder.geocode({ location }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const address = results[0].formatted_address;
        console.log(`✅ Reverse geocoded ${type}:`, address);
        
        if (type === 'pickup') {
          setPickupLocation(address);
        } else if (type === 'drop') {
          setDropLocation(address);
        }
      } else {
        console.warn(`Reverse geocoding failed: ${status}`);
      }
    });
  }, []);

  // 5. Get Location Suggestions (Autocomplete) - memoized callback
  const getLocationSuggestions = useCallback(debounce((query, type) => {
    if (!query || query.length < 3) {
      if (type === 'pickup') setPickupSuggestions([]);
      if (type === 'drop') setDropSuggestions([]);
      return;
    }

    if (!window.google?.maps?.places?.AutocompleteService) {
      console.log("Places API not available");
      return;
    }

    try {
      const service = new window.google.maps.places.AutocompleteService();
      
      service.getPlacePredictions(
        {
          input: query,
          componentRestrictions: { country: 'in' },
          types: ['geocode', 'establishment']
        },
        (predictions, status) => {
          if (status !== window.google.maps.places.PlacesServiceStatus.OK || !predictions) {
            console.log("No predictions found");
            if (type === 'pickup') setPickupSuggestions([]);
            if (type === 'drop') setDropSuggestions([]);
            return;
          }

          const suggestions = predictions.slice(0, 5).map(pred => ({
            id: pred.place_id,
            description: pred.description,
            mainText: pred.structured_formatting?.main_text || '',
            secondaryText: pred.structured_formatting?.secondary_text || ''
          }));

          if (type === 'pickup') {
            setPickupSuggestions(suggestions);
          } else if (type === 'drop') {
            setDropSuggestions(suggestions);
          }
        }
      );
    } catch (error) {
      console.error("Error getting suggestions:", error);
    }
  }, 500), []);

  // 6. Geocode Selected Location
  const geocodeLocation = useCallback(async (placeId, type) => {
    if (!window.google?.maps?.places?.PlacesService) {
      console.log("Places Service not available");
      return;
    }

    setIsGeocoding(true);

    const service = new window.google.maps.places.PlacesService(document.createElement('div'));
    
    service.getDetails(
      {
        placeId: placeId,
        fields: ['formatted_address', 'geometry', 'name']
      },
      (place, status) => {
        setIsGeocoding(false);
        
        if (status === window.google.maps.places.PlacesServiceStatus.OK && place.geometry) {
          const coords = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          };
          
          console.log(`✅ Geocoded ${type}:`, place.formatted_address);
          
          if (type === 'pickup') {
            setPickupLocation(place.formatted_address);
            setPickupCoords(coords);
            setPickupSuggestions([]);
            setShowPickupSuggestions(false);
          } else if (type === 'drop') {
            setDropLocation(place.formatted_address);
            setDropCoords(coords);
            setDropSuggestions([]);
            setShowDropSuggestions(false);
          }
          
          // Center map on selected location
          if (mapInstance) {
            mapInstance.panTo(coords);
            mapInstance.setZoom(14);
          }
          
          // Recalculate distance if both locations are set
          if ((type === 'pickup' && dropCoords) || (type === 'drop' && pickupCoords)) {
            calculateDistance();
          }
        } else {
          console.error(`Geocoding failed: ${status}`);
          notify("Location Error", "Could not find this location. Please try again.", "error");
        }
      }
    );
  }, [mapInstance, dropCoords, pickupCoords, notify]);

  // 7. Calculate Distance Between Points
  const calculateDistance = useCallback(() => {
    if (!pickupCoords || !dropCoords) {
      console.log("Missing coordinates");
      return;
    }

    // Calculate using Haversine formula (accurate for short-medium distances)
    const distance = calculateHaversineDistance(
      pickupCoords.lat, pickupCoords.lng,
      dropCoords.lat, dropCoords.lng
    );
    
    const roundedDistance = parseFloat(distance.toFixed(1));
    console.log(`📏 Calculated distance: ${roundedDistance} km`);
    setCalculatedDistance(roundedDistance);
    
    // Calculate fare
    calculateFare(roundedDistance);
  }, [pickupCoords, dropCoords]);

  // 8. Haversine Distance Formula
  const calculateHaversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // 9. Calculate Fare Based on Distance
  const calculateFare = useCallback((distance) => {
    if (!selectedVehicle) return;
    
    const baseFare = selectedVehicle.baseFare;
    const distanceFare = Math.max(distance - selectedVehicle.minDistance, 0) * selectedVehicle.rate;
    const serviceCharge = 10;
    const gst = (baseFare + distanceFare) * 0.05;
    const total = Math.round(baseFare + distanceFare + serviceCharge + gst);
    
    console.log(`💰 Fare calculated: ₹${total} for ${distance} km`);
    setEstimatedFare(total);
  }, [selectedVehicle]);

  // ==================== EFFECTS ====================

  // Calculate distance when coordinates change
  useEffect(() => {
    if (pickupCoords && dropCoords) {
      calculateDistance();
    }
  }, [pickupCoords, dropCoords, calculateDistance]);

  // ==================== HANDLER FUNCTIONS ====================

  const handlePickupChange = useCallback((value) => {
    setPickupLocation(value);
    
    if (value.length >= 3) {
      getLocationSuggestions(value, 'pickup');
      setShowPickupSuggestions(true);
    } else {
      setPickupSuggestions([]);
      setShowPickupSuggestions(false);
    }
  }, [getLocationSuggestions]);

  const handleDropChange = useCallback((value) => {
    setDropLocation(value);
    
    if (value.length >= 3) {
      getLocationSuggestions(value, 'drop');
      setShowDropSuggestions(true);
    } else {
      setDropSuggestions([]);
      setShowDropSuggestions(false);
    }
  }, [getLocationSuggestions]);

  const handleSuggestionClick = useCallback((suggestion, type) => {
    geocodeLocation(suggestion.id, type);
  }, [geocodeLocation]);

  const handleUseCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          
          setPickupCoords(userLocation);
          
          // Reverse geocode to get address
          reverseGeocode(userLocation, 'pickup');
          
          // Center map
          if (mapInstance) {
            mapInstance.setCenter(userLocation);
            mapInstance.setZoom(14);
          }
          
          notify("Location Updated", "Your current location has been set as pickup", "success");
        },
        (error) => {
          console.warn("Geolocation error:", error);
          notify("Location Error", "Could not get your current location", "error");
        }
      );
    }
  }, [mapInstance, reverseGeocode, notify]);

  const handleTypeClick = useCallback((type) => {
    setSelectedType(type.id);
    setSelectedUser(null);
    notify("Vehicle Selected", `${type.label} vehicles shown`, "info");
  }, [notify]);

  const handleUserSelect = useCallback((user) => {
    setSelectedUser(user);
    setShowPaymentModal(true);
    notify("Driver Selected", `${user.name} selected`, "info");
  }, [notify]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const initiatePayment = async () => {
    if (!selectedUser || !pickupLocation || !dropLocation) {
      alert("Please fill all details before payment");
      return;
    }

    setIsPaymentLoading(true);
    
    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert("Payment service loading. Please try again.");
        setIsPaymentLoading(false);
        return;
      }

      const options = {
        key: "rzp_test_1DP5mmOlF5G5ag",
        amount: estimatedFare * 100,
        currency: "INR",
        name: "QuickMed Healthcare",
        description: `${selectedVehicle?.label} Booking`,
        handler: function (response) {
          handlePaymentSuccess(response);
        },
        prefill: {
          name: "Customer",
          email: "customer@quickmed.com",
          contact: "9876543210"
        },
        theme: {
          color: theme.primary
        }
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
      
    } catch (error) {
      console.error("Payment error:", error);
      notify("Payment Error", "Failed to process payment", "error");
      setIsPaymentLoading(false);
    }
  };

  const handlePaymentSuccess = (response) => {
    console.log("Payment Success:", response);
    
    setIsPaymentLoading(false);
    setShowPaymentModal(false);
    setBookingConfirmed(true);
    setTripStatus("on_the_way");
    
    notify("Booking Confirmed", `Your ${selectedVehicle?.label} is confirmed!`, "success");
  };

  const handleBack = () => {
    if (setActiveView) {
      setActiveView("dashboard");
    } else {
      navigate(-1);
    }
  };

  // ==================== UI COMPONENTS ====================

  const renderStars = (rating) => {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
        {[...Array(5)].map((_, i) => (
          <span key={i} style={{ color: i < Math.floor(rating) ? "#FFD700" : "#CCCCCC", fontSize: "14px" }}>
            ★
          </span>
        ))}
        <span style={{ fontSize: "12px", color: theme.softtext, marginLeft: 4 }}>
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  // Input handlers with memoized callbacks
  const handlePickupFocus = useCallback(() => {
    if (pickupLocation.length >= 3) {
      setShowPickupSuggestions(true);
    }
  }, [pickupLocation.length]);

  const handlePickupBlur = useCallback(() => {
    setTimeout(() => setShowPickupSuggestions(false), 200);
  }, []);

  const handleDropFocus = useCallback(() => {
    if (dropLocation.length >= 3) {
      setShowDropSuggestions(true);
    }
  }, [dropLocation.length]);

  const handleDropBlur = useCallback(() => {
    setTimeout(() => setShowDropSuggestions(false), 200);
  }, []);

  // ==================== MAIN RENDER ====================

  return (
    <div style={{ padding: "24px 16px 40px", maxWidth: "1200px", margin: "80px auto 0" }}>
      
      {/* Header */}
      <div style={{ marginBottom: 20, marginTop: 60, display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "24px", color: theme.primary, fontWeight: "bold" }}>
            Vehicle Dashboard
          </h2>
          <p style={{ margin: "6px 0 0", color: theme.softtext, fontSize: "14px" }}>
            Book ambulances, cabs, autos, and bikes with live tracking & secure payments
          </p>
        </div>

        <button onClick={handleBack} style={backButtonStyle(theme)}>
          ← Back to Dashboard
        </button>
      </div>

      {/* Trip Details Form */}
      <div style={formContainerStyle}>
        <h3 style={{ color: theme.primary, marginBottom: 15 }}>Trip Details</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 15, marginBottom: 15 }}>
          <PickupLocationInput 
            theme={theme}
            pickupLocation={pickupLocation}
            onPickupChange={handlePickupChange}
            onUseCurrentLocation={handleUseCurrentLocation}
            pickupCoords={pickupCoords}
            pickupSuggestions={pickupSuggestions}
            showPickupSuggestions={showPickupSuggestions}
            onSuggestionClick={handleSuggestionClick}
            onFocus={handlePickupFocus}
            onBlur={handlePickupBlur}
          />
          <DropLocationInput 
            theme={theme}
            dropLocation={dropLocation}
            onDropChange={handleDropChange}
            dropCoords={dropCoords}
            dropSuggestions={dropSuggestions}
            showDropSuggestions={showDropSuggestions}
            onSuggestionClick={handleSuggestionClick}
            onFocus={handleDropFocus}
            onBlur={handleDropBlur}
          />
        </div>
        
        {/* Distance and Fare Display */}
        {isGeocoding ? (
          <div style={distanceInfoStyle(theme, true)}>
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: "16px", height: "16px", border: `2px solid ${theme.mint}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }}></span>
              <span>Finding location...</span>
            </span>
          </div>
        ) : calculatedDistance > 0 ? (
          <div style={distanceInfoStyle(theme, false)}>
            <span>Calculated Distance: <strong>{calculatedDistance} km</strong></span>
            {selectedVehicle && (
              <span>Estimated Fare: <strong style={{ color: theme.primary }}>₹{estimatedFare}</strong></span>
            )}
          </div>
        ) : pickupCoords && dropCoords ? (
          <div style={{ padding: "12px 15px", backgroundColor: theme.softbg, borderRadius: "8px", fontSize: "14px", color: theme.softtext }}>
            Click on a suggestion or press Enter to calculate distance
          </div>
        ) : null}

        {/* Map Preview */}
        <div style={{ marginTop: '20px' }}>
          <h4 style={{ color: theme.darktext, marginBottom: '10px', fontSize: '14px' }}>Map Preview</h4>
          <div 
            ref={mapRef} 
            style={{ 
              height: "200px", 
              width: "100%", 
              borderRadius: "10px",
              backgroundColor: "#f5f5f5",
              border: `1px solid ${theme.mint}`
            }}
          >
            {!mapLoaded && (
              <div style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.softtext
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', marginBottom: '10px' }}>🗺️</div>
                  <div>Loading map...</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Vehicle Type Selector */}
      <div style={{ margin: "25px 0" }}>
        <h3 style={{ color: theme.primary, marginBottom: 15 }}>Select Vehicle Type</h3>
        <div style={vehicleGridStyle}>
          {VEHICLE_TYPES.map((type) => {
            const isActive = selectedType === type.id;
            return (
              <button key={type.id} onClick={() => handleTypeClick(type)} style={vehicleButtonStyle(isActive, theme)}>
                <div style={{ fontSize: 28 }}>{type.emoji}</div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{type.label}</div>
                <div style={{ fontSize: 12, fontWeight: "bold", marginTop: 4 }}>₹{type.rate}/km</div>
                <div style={{ fontSize: 11, opacity: 0.8, marginTop: 4 }}>Base: ₹{type.baseFare}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter + Search */}
      <div style={filterContainerStyle}>
        <div style={{ fontSize: 13, color: theme.softtext }}>
          Available {selectedType}s near you
          {calculatedDistance > 0 && ` • Trip: ${calculatedDistance} km`}
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <label style={checkboxLabelStyle(theme)}>
            <input type="checkbox" checked={showOnlyAvailable} onChange={(e) => setShowOnlyAvailable(e.target.checked)} /> 
            Only available
          </label>
          <input
            type="text"
            placeholder="Search driver or vehicle"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={searchInputStyle(theme)}
          />
        </div>
      </div>

      {/* Drivers List */}
      <div style={driversContainerStyle}>
        {filteredUsers.length === 0 ? (
          <div style={noResultsStyle(theme)}>
            No {selectedType} partners available. Try changing filters.
          </div>
        ) : (
          <div style={driversGridStyle}>
            {filteredUsers.map((user) => (
              <div key={user.id} style={driverItemStyle(selectedUser?.id === user.id, theme)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ fontSize: 24 }}>{user.driverPhoto}</div>
                    <div>
                      <div style={{ fontWeight: "600", fontSize: 14, color: theme.darktext }}>{user.name}</div>
                      <div style={{ fontSize: 12, color: theme.softtext }}>{user.vehicleNo}</div>
                      {user.carModel && <div style={{ fontSize: 11, color: theme.softtext }}>{user.carModel}</div>}
                    </div>
                  </div>
                  <span style={statusBadgeStyle(user.status, theme)}>{user.status}</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: theme.softtext, marginBottom: 8 }}>
                  <span>📍 {user.distance}</span>
                  <span>⏱️ ETA: {user.eta}</span>
                  <span>{renderStars(user.rating)}</span>
                </div>
                
                <div style={{ fontSize: 12, color: theme.primary, fontWeight: "bold", marginBottom: 8 }}>
                  Approx. Fare: ₹{estimatedFare}
                </div>

                <button
                  disabled={user.status !== "Available" || !pickupLocation || !dropLocation || calculatedDistance === 0}
                  onClick={() => handleUserSelect(user)}
                  style={bookButtonStyle(user.status, theme, !pickupLocation || !dropLocation || calculatedDistance === 0)}
                >
                  {selectedType === "ambulance" ? "Book Now" : "Book Ride"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add CSS animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

// ==================== STYLES ====================

const backButtonStyle = (theme) => ({
  padding: "8px 16px",
  borderRadius: 20,
  border: "1px solid " + theme.mint,
  background: "#fff",
  color: theme.primary,
  fontSize: 13,
  cursor: "pointer",
});

const formContainerStyle = {
  backgroundColor: "#ffffff",
  borderRadius: "14px",
  padding: "20px",
  boxShadow: "0 3px 12px rgba(0,0,0,0.08)",
  marginBottom: "20px"
};

const labelStyle = (theme) => ({
  display: "block",
  marginBottom: "8px",
  fontWeight: "bold",
  color: theme.darktext,
  fontSize: "13px"
});

const inputStyle = (theme) => ({
  width: "100%",
  padding: "10px 12px",
  border: `1px solid ${theme.mint}70`,
  borderRadius: "8px",
  fontSize: "14px",
  outline: "none",
  transition: "border 0.3s",
  '&:focus': {
    borderColor: theme.primary,
    boxShadow: `0 0 0 2px ${theme.primary}20`
  }
});

const currentLocationButtonStyle = (theme) => ({
  padding: "10px 15px",
  borderRadius: "8px",
  border: `1px solid ${theme.mint}`,
  background: theme.softbg,
  color: theme.primary,
  fontSize: "16px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "fit-content",
  alignSelf: "flex-end",
  minWidth: "45px"
});

const suggestionsDropdownStyle = {
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  backgroundColor: 'white',
  border: '1px solid #ddd',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  zIndex: 1000,
  maxHeight: '250px',
  overflowY: 'auto',
  marginTop: '2px'
};

const suggestionItemStyle = {
  padding: '10px 12px',
  cursor: 'pointer',
  borderBottom: '1px solid #eee',
  '&:hover': {
    backgroundColor: '#f5f5f5'
  },
  '&:last-child': {
    borderBottom: 'none'
  }
};

const distanceInfoStyle = (theme, isLoading) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 15px",
  backgroundColor: isLoading ? `${theme.mint}20` : theme.softbg,
  borderRadius: "8px",
  fontSize: "14px",
  color: isLoading ? theme.softtext : theme.darktext
});

const vehicleGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
  gap: "16px"
};

const vehicleButtonStyle = (isActive, theme) => ({
  borderRadius: "14px",
  padding: "16px 12px",
  border: isActive ? `2px solid ${theme.primary}` : `1px solid ${theme.mint}55`,
  backgroundColor: isActive ? theme.primary : "#ffffff",
  color: isActive ? "#ffffff" : theme.darktext,
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  transition: "all 0.2s ease",
  boxShadow: isActive ? "0 6px 18px rgba(0,0,0,0.15)" : "0 2px 6px rgba(0,0,0,0.06)",
});

const filterContainerStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "16px"
};

const checkboxLabelStyle = (theme) => ({
  display: "flex",
  alignItems: "center",
  gap: "6px",
  fontSize: "13px",
  color: theme.softtext,
  cursor: "pointer"
});

const searchInputStyle = (theme) => ({
  padding: "7px 12px",
  borderRadius: "20px",
  border: `1px solid ${theme.mint}77`,
  fontSize: "13px",
  minWidth: "220px",
  outline: "none"
});

const driversContainerStyle = {
  backgroundColor: "#ffffff",
  borderRadius: "14px",
  padding: "16px",
  boxShadow: "0 3px 12px rgba(0,0,0,0.08)",
  marginBottom: "20px"
};

const noResultsStyle = (theme) => ({
  padding: "30px 10px",
  textAlign: "center",
  fontSize: "14px",
  color: theme.softtext
});

const driversGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "16px"
};

const driverItemStyle = (isSelected, theme) => ({
  borderRadius: "12px",
  border: `1px solid ${isSelected ? theme.primary : theme.mint}40`,
  padding: "14px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  backgroundColor: isSelected ? `${theme.primary}10` : "white",
  transition: "all 0.3s ease"
});

const statusBadgeStyle = (status, theme) => ({
  fontSize: "11px",
  padding: "3px 10px",
  borderRadius: "12px",
  backgroundColor: status === "Available" ? "#4CAF50" : "#9E9E9E",
  color: "#fff",
  fontWeight: 600
});

const bookButtonStyle = (status, theme, isDisabled) => ({
  marginTop: "6px",
  padding: "10px",
  borderRadius: "999px",
  border: "none",
  fontSize: "13px",
  fontWeight: 600,
  cursor: (status === "Available" && !isDisabled) ? "pointer" : "not-allowed",
  backgroundColor: (status === "Available" && !isDisabled) ? theme.primary : "#CCCCCC",
  color: "#fff",
  transition: "all 0.3s ease"
});

export default VehicleDashboard;