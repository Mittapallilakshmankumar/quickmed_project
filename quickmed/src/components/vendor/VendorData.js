export const user = {
  fullName: 'Rajesh Kumar',
  email: 'rajesh.pharmacy@gmail.com',
  phone: '9876543210',
  pharmacyName: 'City Medical Store',
  licenseNumber: 'PHARM-UP-2024-789',
  gstNumber: '07AABCU9603R1ZM',
  address: 'Shop No. 15, Medical Complex, Sector 15',
  city: 'Noida',
  state: 'Uttar Pradesh',
  pincode: '201301',
  openingTime: '08:00 AM',
  closingTime: '10:00 PM'
};

export const initialData = {
  stock: [
    // Existing medicines
    {
      id: 1,
      name: 'Paracetamol 500mg',
      category: 'Pain Relief',
      quantity: 45,
      minStock: 20,
      price: 15,
      expiryDate: '2024-12-15',
      prescriptionRequired: false,
      supplier: 'MedPlus Suppliers',
      batchNo: 'BATCH-001'
    },
    {
      id: 2,
      name: 'Amoxicillin 250mg',
      category: 'Antibiotics',
      quantity: 12,
      minStock: 15,
      price: 85,
      expiryDate: '2024-08-20',
      prescriptionRequired: true,
      supplier: 'PharmaCorp',
      batchNo: 'BATCH-002'
    },
    {
      id: 3,
      name: 'Vitamin C 1000mg',
      category: 'Vitamins & Supplements',
      quantity: 78,
      minStock: 25,
      price: 120,
      expiryDate: '2025-03-10',
      prescriptionRequired: false,
      supplier: 'HealthPlus',
      batchNo: 'BATCH-003'
    },
    {
      id: 4,
      name: 'Insulin Syringes',
      category: 'Chronic Care',
      quantity: 8,
      minStock: 10,
      price: 45,
      expiryDate: '2025-01-30',
      prescriptionRequired: true,
      supplier: 'Diabetic Care Ltd',
      batchNo: 'BATCH-004'
    },
    {
      id: 5,
      name: 'Aspirin 75mg',
      category: 'Cardiac',
      quantity: 32,
      minStock: 20,
      price: 25,
      expiryDate: '2024-11-15',
      prescriptionRequired: false,
      supplier: 'Cardio Pharma',
      batchNo: 'BATCH-005'
    },
    
    // New Medicines - Pregnancy Care
    {
      id: 6,
      name: 'Folic Acid 5mg',
      category: 'Pregnancy Care',
      quantity: 35,
      minStock: 15,
      price: 45,
      expiryDate: '2025-06-30',
      prescriptionRequired: true,
      supplier: 'Maternity Pharma',
      batchNo: 'BATCH-006'
    },
    {
      id: 7,
      name: 'Iron Sucrose Injection',
      category: 'Pregnancy Care',
      quantity: 18,
      minStock: 10,
      price: 280,
      expiryDate: '2024-09-25',
      prescriptionRequired: true,
      supplier: 'Maternity Pharma',
      batchNo: 'BATCH-007'
    },
    {
      id: 8,
      name: 'Calcium + Vitamin D3',
      category: 'Pregnancy Care',
      quantity: 42,
      minStock: 20,
      price: 125,
      expiryDate: '2025-02-15',
      prescriptionRequired: false,
      supplier: 'HealthPlus',
      batchNo: 'BATCH-008'
    },
    {
      id: 9,
      name: 'Doxylamine + Pyridoxine',
      category: 'Pregnancy Care',
      quantity: 22,
      minStock: 15,
      price: 95,
      expiryDate: '2024-11-30',
      prescriptionRequired: true,
      supplier: 'Maternity Pharma',
      batchNo: 'BATCH-009'
    },
    {
      id: 10,
      name: 'Progesterone Gel',
      category: 'Pregnancy Care',
      quantity: 14,
      minStock: 10,
      price: 420,
      expiryDate: '2024-10-20',
      prescriptionRequired: true,
      supplier: 'FertiCare',
      batchNo: 'BATCH-010'
    },
    {
      id: 11,
      name: 'Prenatal Multivitamin',
      category: 'Pregnancy Care',
      quantity: 27,
      minStock: 20,
      price: 180,
      expiryDate: '2025-04-15',
      prescriptionRequired: false,
      supplier: 'Maternity Pharma',
      batchNo: 'BATCH-016'
    },
    
    // New Medicines - Baby Care
    {
      id: 12,
      name: 'Paracetamol Drops 80mg',
      category: 'Baby Care',
      quantity: 28,
      minStock: 20,
      price: 65,
      expiryDate: '2025-04-15',
      prescriptionRequired: false,
      supplier: 'Pediatric Pharma',
      batchNo: 'BATCH-011'
    },
    {
      id: 13,
      name: 'ORS Powder (Baby)',
      category: 'Baby Care',
      quantity: 56,
      minStock: 30,
      price: 25,
      expiryDate: '2025-07-20',
      prescriptionRequired: false,
      supplier: 'Pediatric Pharma',
      batchNo: 'BATCH-012'
    },
    {
      id: 14,
      name: 'Ibuprofen Suspension',
      category: 'Baby Care',
      quantity: 5,
      minStock: 15,
      price: 88,
      expiryDate: '2024-08-15',
      prescriptionRequired: true,
      supplier: 'Pediatric Pharma',
      batchNo: 'BATCH-013'
    },
    {
      id: 15,
      name: 'Cetirizine Drops',
      category: 'Baby Care',
      quantity: 32,
      minStock: 20,
      price: 72,
      expiryDate: '2025-01-30',
      prescriptionRequired: true,
      supplier: 'Pediatric Pharma',
      batchNo: 'BATCH-014'
    },
    {
      id: 16,
      name: 'Multivitamin Drops',
      category: 'Baby Care',
      quantity: 41,
      minStock: 25,
      price: 145,
      expiryDate: '2025-03-25',
      prescriptionRequired: false,
      supplier: 'HealthPlus',
      batchNo: 'BATCH-015'
    },
    {
      id: 17,
      name: 'Baby Cough Syrup',
      category: 'Baby Care',
      quantity: 18,
      minStock: 15,
      price: 95,
      expiryDate: '2024-10-10',
      prescriptionRequired: true,
      supplier: 'Pediatric Pharma',
      batchNo: 'BATCH-017'
    },
    
    // New Medicines - First Aid
    {
      id: 18,
      name: 'Betadine Solution 100ml',
      category: 'First Aid',
      quantity: 24,
      minStock: 15,
      price: 85,
      expiryDate: '2025-05-30',
      prescriptionRequired: false,
      supplier: 'FirstAid Corp',
      batchNo: 'BATCH-018'
    },
    {
      id: 19,
      name: 'Hydrogen Peroxide 3%',
      category: 'First Aid',
      quantity: 18,
      minStock: 10,
      price: 55,
      expiryDate: '2024-12-20',
      prescriptionRequired: false,
      supplier: 'FirstAid Corp',
      batchNo: 'BATCH-019'
    },
    {
      id: 20,
      name: 'Burnol Cream 30g',
      category: 'First Aid',
      quantity: 37,
      minStock: 20,
      price: 45,
      expiryDate: '2025-08-15',
      prescriptionRequired: false,
      supplier: 'FirstAid Corp',
      batchNo: 'BATCH-020'
    },
    {
      id: 21,
      name: 'Antiseptic Liquid 200ml',
      category: 'First Aid',
      quantity: 29,
      minStock: 15,
      price: 75,
      expiryDate: '2025-02-28',
      prescriptionRequired: false,
      supplier: 'FirstAid Corp',
      batchNo: 'BATCH-021'
    },
    {
      id: 22,
      name: 'Calamine Lotion 100ml',
      category: 'First Aid',
      quantity: 33,
      minStock: 20,
      price: 65,
      expiryDate: '2025-06-15',
      prescriptionRequired: false,
      supplier: 'FirstAid Corp',
      batchNo: 'BATCH-022'
    },
    
    // Equipment - Baby Care
    {
      id: 23,
      name: 'Digital Baby Thermometer',
      category: 'Medical Equipment',
      subCategory: 'Baby Care',
      quantity: 15,
      minStock: 10,
      price: 350,
      expiryDate: '2030-12-31',
      prescriptionRequired: false,
      supplier: 'BabyCare Equipments',
      batchNo: 'EQP-001'
    },
    {
      id: 24,
      name: 'Breast Pump Electric',
      category: 'Medical Equipment',
      subCategory: 'Pregnancy Care',
      quantity: 8,
      minStock: 5,
      price: 2800,
      expiryDate: '2030-12-31',
      prescriptionRequired: false,
      supplier: 'Maternity Equip',
      batchNo: 'EQP-002'
    },
    {
      id: 25,
      name: 'Baby Weighing Scale',
      category: 'Medical Equipment',
      subCategory: 'Baby Care',
      quantity: 12,
      minStock: 8,
      price: 850,
      expiryDate: '2030-12-31',
      prescriptionRequired: false,
      supplier: 'BabyCare Equipments',
      batchNo: 'EQP-003'
    },
    {
      id: 26,
      name: 'Nebulizer Machine',
      category: 'Medical Equipment',
      subCategory: 'Baby Care',
      quantity: 3,
      minStock: 4,
      price: 2200,
      expiryDate: '2030-12-31',
      prescriptionRequired: true,
      supplier: 'MedEquip Solutions',
      batchNo: 'EQP-004'
    },
    {
      id: 27,
      name: 'Blood Pressure Monitor',
      category: 'Medical Equipment',
      subCategory: 'Pregnancy Care',
      quantity: 14,
      minStock: 10,
      price: 1250,
      expiryDate: '2030-12-31',
      prescriptionRequired: false,
      supplier: 'MedEquip Solutions',
      batchNo: 'EQP-005'
    },
    {
      id: 28,
      name: 'Pregnancy Test Kit',
      category: 'Medical Equipment',
      subCategory: 'Pregnancy Care',
      quantity: 45,
      minStock: 25,
      price: 120,
      expiryDate: '2024-12-30',
      prescriptionRequired: false,
      supplier: 'Maternity Equip',
      batchNo: 'EQP-006'
    },
    {
      id: 29,
      name: 'Baby Nasal Aspirator',
      category: 'Medical Equipment',
      subCategory: 'Baby Care',
      quantity: 32,
      minStock: 20,
      price: 180,
      expiryDate: '2030-12-31',
      prescriptionRequired: false,
      supplier: 'BabyCare Equipments',
      batchNo: 'EQP-007'
    },
    {
      id: 30,
      name: 'Digital Glucometer',
      category: 'Medical Equipment',
      subCategory: 'Chronic Care',
      quantity: 18,
      minStock: 12,
      price: 950,
      expiryDate: '2030-12-31',
      prescriptionRequired: false,
      supplier: 'MedEquip Solutions',
      batchNo: 'EQP-008'
    },
    {
      id: 31,
      name: 'First Aid Kit (Family)',
      category: 'Medical Equipment',
      subCategory: 'First Aid',
      quantity: 22,
      minStock: 15,
      price: 450,
      expiryDate: '2024-11-30',
      prescriptionRequired: false,
      supplier: 'FirstAid Corp',
      batchNo: 'EQP-009'
    },
    {
      id: 32,
      name: 'Oxygen Cylinder 5L',
      category: 'Medical Equipment',
      subCategory: 'Chronic Care',
      quantity: 4,
      minStock: 3,
      price: 8500,
      expiryDate: '2030-12-31',
      prescriptionRequired: true,
      supplier: 'MedEquip Solutions',
      batchNo: 'EQP-010'
    },
    {
      id: 33,
      name: 'Baby Food Warmer',
      category: 'Medical Equipment',
      subCategory: 'Baby Care',
      quantity: 10,
      minStock: 6,
      price: 650,
      expiryDate: '2030-12-31',
      prescriptionRequired: false,
      supplier: 'BabyCare Equipments',
      batchNo: 'EQP-011'
    },
    {
      id: 34,
      name: 'Foetal Doppler',
      category: 'Medical Equipment',
      subCategory: 'Pregnancy Care',
      quantity: 5,
      minStock: 3,
      price: 3200,
      expiryDate: '2030-12-31',
      prescriptionRequired: true,
      supplier: 'Maternity Equip',
      batchNo: 'EQP-012'
    },
    {
      id: 35,
      name: 'Digital Pulse Oximeter',
      category: 'Medical Equipment',
      subCategory: 'Chronic Care',
      quantity: 25,
      minStock: 15,
      price: 550,
      expiryDate: '2030-12-31',
      prescriptionRequired: false,
      supplier: 'MedEquip Solutions',
      batchNo: 'EQP-013'
    },
    {
      id: 36,
      name: 'Steam Vaporizer',
      category: 'Medical Equipment',
      subCategory: 'Baby Care',
      quantity: 16,
      minStock: 10,
      price: 750,
      expiryDate: '2030-12-31',
      prescriptionRequired: false,
      supplier: 'BabyCare Equipments',
      batchNo: 'EQP-014'
    },
    {
      id: 37,
      name: 'Hearing Aid (Basic)',
      category: 'Medical Equipment',
      subCategory: 'Chronic Care',
      quantity: 9,
      minStock: 5,
      price: 2800,
      expiryDate: '2030-12-31',
      prescriptionRequired: true,
      supplier: 'MedEquip Solutions',
      batchNo: 'EQP-015'
    },
    {
      id: 38,
      name: 'Hot Water Bottle',
      category: 'Medical Equipment',
      subCategory: 'First Aid',
      quantity: 28,
      minStock: 20,
      price: 220,
      expiryDate: '2030-12-31',
      prescriptionRequired: false,
      supplier: 'FirstAid Corp',
      batchNo: 'EQP-016'
    },
    {
      id: 39,
      name: 'Walking Stick (Adjustable)',
      category: 'Medical Equipment',
      subCategory: 'Chronic Care',
      quantity: 20,
      minStock: 12,
      price: 380,
      expiryDate: '2030-12-31',
      prescriptionRequired: false,
      supplier: 'MedEquip Solutions',
      batchNo: 'EQP-017'
    },
    {
      id: 40,
      name: 'Digital Thermometer (Adult)',
      category: 'Medical Equipment',
      subCategory: 'General',
      quantity: 35,
      minStock: 25,
      price: 280,
      expiryDate: '2030-12-31',
      prescriptionRequired: false,
      supplier: 'MedEquip Solutions',
      batchNo: 'EQP-018'
    },
    {
      id: 41,
      name: 'Ice Pack Gel',
      category: 'Medical Equipment',
      subCategory: 'First Aid',
      quantity: 42,
      minStock: 30,
      price: 150,
      expiryDate: '2024-10-30',
      prescriptionRequired: false,
      supplier: 'FirstAid Corp',
      batchNo: 'EQP-019'
    },
    {
      id: 42,
      name: 'Stethoscope (Dual Head)',
      category: 'Medical Equipment',
      subCategory: 'General',
      quantity: 18,
      minStock: 10,
      price: 450,
      expiryDate: '2030-12-31',
      prescriptionRequired: false,
      supplier: 'MedEquip Solutions',
      batchNo: 'EQP-020'
    }
  ],
  orders: {
    pending: [
      {
        id: 'ORD-001',
        customerName: 'Rajesh Kumar',
        customerPhone: '+91 98765 43210',
        items: [
          { name: 'Paracetamol 500mg', quantity: 2, price: 15 },
          { name: 'Vitamin C 1000mg', quantity: 1, price: 120 }
        ],
        total: 150,
        orderTime: '2024-01-15 10:30',
        deliveryType: 'home',
        address: 'H-12, Sector 15, Noida',
        prescriptionRequired: false
      },
      {
        id: 'ORD-002',
        customerName: 'Priya Sharma',
        customerPhone: '+91 98765 43211',
        items: [
          { name: 'Amoxicillin 250mg', quantity: 1, price: 85 }
        ],
        total: 85,
        orderTime: '2024-01-15 11:15',
        deliveryType: 'pickup',
        address: 'Store Pickup',
        prescriptionRequired: true
      }
    ],
    ready: [
      {
        id: 'ORD-003',
        customerName: 'Amit Patel',
        customerPhone: '+91 98765 43212',
        items: [
          { name: 'Insulin Syringes', quantity: 1, price: 45 },
          { name: 'Diabetes Strips', quantity: 1, price: 320 }
        ],
        total: 365,
        orderTime: '2024-01-15 09:45',
        deliveryType: 'home',
        address: 'B-5, Preet Vihar, Delhi',
        prescriptionRequired: true
      }
    ],
    picked: [
      {
        id: 'ORD-004',
        customerName: 'Sunita Reddy',
        customerPhone: '+91 98765 43213',
        items: [
          { name: 'Aspirin 75mg', quantity: 1, price: 25 }
        ],
        total: 25,
        orderTime: '2024-01-15 08:30',
        deliveryType: 'pickup',
        address: 'Store Pickup',
        prescriptionRequired: false
      }
    ],
    cancelled: []
  },
  prescriptions: [
    {
      id: 1,
      orderId: 'ORD-002',
      customerName: 'Priya Sharma',
      doctorName: 'Sharma',
      uploadedTime: '2024-01-15 11:15',
      status: 'pending',
      medicines: ['Amoxicillin 250mg', 'Azithromycin 500mg'],
      imageUrl: 'https://via.placeholder.com/400x500?text=Prescription+Image'
    },
    {
      id: 2,
      orderId: 'ORD-003',
      customerName: 'Amit Patel',
      doctorName: 'Gupta',
      uploadedTime: '2024-01-15 09:45',
      status: 'pending',
      medicines: ['Insulin Syringes', 'Diabetes Strips', 'Metformin 500mg'],
      imageUrl: 'https://via.placeholder.com/400x500?text=Prescription+Image'
    }
  ]
};

export const navigationItems = [
  { id: 'stock', label: 'Stock Management', icon: '📦' },
  { id: 'orders', label: 'Orders', icon: '📋' },
  { id: 'prescriptions', label: 'Prescription Verification', icon: '🩺' },
  { id: 'analytics', label: 'Analytics', icon: '📊' }
];

// NEW: Category filters based on your image
export const categoryFilters = [
  { id: 'all', label: 'All Medicines', count: 40 },
  { id: 'pregnancy', label: 'Pregnancy Care', count: 5 },
  { id: 'baby', label: 'Baby Care', count: 6 },
  { id: 'vitamins', label: 'Vitamins & Supplements', count: 1 },
  { id: 'pain', label: 'Pain Relief', count: 1 },
  { id: 'antibiotics', label: 'Antibiotics', count: 1 },
  { id: 'chronic', label: 'Chronic Care', count: 3 },
  { id: 'firstaid', label: 'First Aid', count: 5 },
  { id: 'equipment', label: 'Medical Equipment', count: 18 }
];

// Existing stock filters
export const stockFilters = [
  { id: 'all', label: 'All Medicines' },
  { id: 'low', label: 'Low Stock' },
  { id: 'expiring', label: 'Expiring Soon' },
  { id: 'prescription', label: 'Prescription Only' }
];

// Helper function to filter stock based on selected filter
export const getFilteredStock = (stock, filterType) => {
  const today = new Date();
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(today.getDate() + 30);
  
  switch(filterType) {
    case 'low':
      return stock.filter(item => item.quantity <= item.minStock);
    
    case 'expiring':
      return stock.filter(item => {
        const expiryDate = new Date(item.expiryDate);
        return expiryDate <= thirtyDaysFromNow && expiryDate >= today;
      });
    
    case 'prescription':
      return stock.filter(item => item.prescriptionRequired);
    
    case 'all':
    default:
      return stock;
  }
};

// NEW: Helper function to filter by category
export const getStockByCategory = (stock, categoryId) => {
  switch(categoryId) {
    case 'all':
      return stock;
    case 'pregnancy':
      return stock.filter(item => item.category === 'Pregnancy Care');
    case 'baby':
      return stock.filter(item => item.category === 'Baby Care');
    case 'vitamins':
      return stock.filter(item => item.category === 'Vitamins & Supplements');
    case 'pain':
      return stock.filter(item => item.category === 'Pain Relief');
    case 'antibiotics':
      return stock.filter(item => item.category === 'Antibiotics');
    case 'chronic':
      return stock.filter(item => item.category === 'Chronic Care');
    case 'firstaid':
      return stock.filter(item => item.category === 'First Aid');
    case 'equipment':
      return stock.filter(item => item.category === 'Medical Equipment');
    default:
      return stock;
  }
};

// Get counts for filter badges
export const getFilterCounts = (stock) => {
  const today = new Date();
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(today.getDate() + 30);
  
  return {
    all: stock.length,
    low: stock.filter(item => item.quantity <= item.minStock).length,
    expiring: stock.filter(item => {
      const expiryDate = new Date(item.expiryDate);
      return expiryDate <= thirtyDaysFromNow && expiryDate >= today;
    }).length,
    prescription: stock.filter(item => item.prescriptionRequired).length
  };
};

// NEW: Get category counts dynamically
export const getCategoryCounts = (stock) => {
  const counts = {
    all: stock.length,
    pregnancy: stock.filter(item => item.category === 'Pregnancy Care').length,
    baby: stock.filter(item => item.category === 'Baby Care').length,
    vitamins: stock.filter(item => item.category === 'Vitamins & Supplements').length,
    pain: stock.filter(item => item.category === 'Pain Relief').length,
    antibiotics: stock.filter(item => item.category === 'Antibiotics').length,
    chronic: stock.filter(item => item.category === 'Chronic Care').length,
    firstaid: stock.filter(item => item.category === 'First Aid').length,
    equipment: stock.filter(item => item.category === 'Medical Equipment').length
  };
  
  // Update categoryFilters with dynamic counts
  categoryFilters.forEach(filter => {
    filter.count = counts[filter.id];
  });
  
  return counts;
};

// Get unique categories for filter options
export const getStockCategories = (stock) => {
  const categories = [...new Set(stock.map(item => item.category))];
  return categories.map(category => ({ id: category, label: category }));
};

// This will be dynamically calculated based on actual orders data
export const getOrderTabs = (orders) => [
  { id: 'pending', label: 'Pending', count: orders.pending?.length || 0 },
  { id: 'ready', label: 'Ready', count: orders.ready?.length || 0 },
  { id: 'picked', label: 'Picked', count: orders.picked?.length || 0 },
  { id: 'cancelled', label: 'Cancelled', count: orders.cancelled?.length || 0 }
];

// Get equipment categories
export const getEquipmentCategories = (stock) => {
  const equipmentItems = stock.filter(item => item.category === 'Medical Equipment');
  const subCategories = [...new Set(equipmentItems.map(item => item.subCategory))];
  return subCategories.map(cat => ({ id: cat, label: cat }));
};

// Get medicines by category
export const getMedicinesByCategory = (stock, category) => {
  return stock.filter(item => item.category === category && item.category !== 'Medical Equipment');
};

// Get all categories including sub-categories for equipment
export const getAllCategories = (stock) => {
  const categories = [];
  const mainCategories = new Set(stock.map(item => item.category));
  
  mainCategories.forEach(category => {
    if (category === 'Medical Equipment') {
      const equipmentCategories = getEquipmentCategories(stock);
      categories.push(...equipmentCategories);
    } else {
      categories.push({ id: category, label: category });
    }
  });
  
  return categories;
};

// Generate sample data for demonstration
export const generateSampleStockData = () => {
  const categories = [
    'Pain Relief',
    'Antibiotics', 
    'Vitamins & Supplements',
    'Chronic Care',
    'Cardiac',
    'Pregnancy Care',
    'Baby Care',
    'First Aid',
    'Medical Equipment'
  ];
  
  const equipmentSubCategories = [
    'Baby Care',
    'Pregnancy Care',
    'First Aid',
    'Chronic Care',
    'General'
  ];
  
  const sampleData = [];
  let id = 1;
  
  // Generate 50 sample items
  for (let i = 0; i < 50; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const isEquipment = category === 'Medical Equipment';
    const prescriptionRequired = Math.random() > 0.5;
    const quantity = Math.floor(Math.random() * 100) + 1;
    const minStock = Math.floor(quantity * 0.3);
    
    const item = {
      id: id++,
      name: `Sample Medicine ${id}`,
      category: category,
      quantity: quantity,
      minStock: minStock,
      price: Math.floor(Math.random() * 500) + 10,
      expiryDate: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      prescriptionRequired: prescriptionRequired,
      supplier: 'Sample Supplier',
      batchNo: `BATCH-${String(id).padStart(3, '0')}`
    };
    
    if (isEquipment) {
      item.subCategory = equipmentSubCategories[Math.floor(Math.random() * equipmentSubCategories.length)];
      item.name = `Sample Equipment ${id}`;
      item.batchNo = `EQP-${String(id).padStart(3, '0')}`;
    }
    
    sampleData.push(item);
  }
  
  return sampleData;
};

// NEW: Get sample data for each category when clicked
export const getCategorySampleData = (categoryId) => {
  const sampleData = {
    all: {
      title: 'All Medicines',
      description: 'Showing all medicines and equipment in stock',
      items: initialData.stock.slice(0, 5) // Show first 5 items
    },
    pregnancy: {
      title: 'Pregnancy Care',
      description: 'Medicines and equipment for pregnancy care',
      items: initialData.stock.filter(item => item.category === 'Pregnancy Care')
    },
    baby: {
      title: 'Baby Care',
      description: 'Medicines and equipment for baby care',
      items: initialData.stock.filter(item => item.category === 'Baby Care')
    },
    vitamins: {
      title: 'Vitamins & Supplements',
      description: 'Vitamins and dietary supplements',
      items: initialData.stock.filter(item => item.category === 'Vitamins & Supplements')
    },
    pain: {
      title: 'Pain Relief',
      description: 'Pain relief medicines',
      items: initialData.stock.filter(item => item.category === 'Pain Relief')
    },
    antibiotics: {
      title: 'Antibiotics',
      description: 'Antibiotic medicines',
      items: initialData.stock.filter(item => item.category === 'Antibiotics')
    },
    chronic: {
      title: 'Chronic Care',
      description: 'Medicines for chronic conditions',
      items: initialData.stock.filter(item => item.category === 'Chronic Care')
    },
    firstaid: {
      title: 'First Aid',
      description: 'First aid supplies and medicines',
      items: initialData.stock.filter(item => item.category === 'First Aid')
    },
    equipment: {
      title: 'Medical Equipment',
      description: 'Medical equipment and devices',
      items: initialData.stock.filter(item => item.category === 'Medical Equipment')
    }
  };
  
  return sampleData[categoryId] || sampleData.all;
};

// Color constants based on your specifications
export const colors = {
  primary: '#009688',
  mint: '#4DB6AC',
  softbg: '#E0F2F1',
  white: '#FFFFFF',
  darktext: '#124441',
  softtext: '#4F6F6B'
};

// Theme configuration for the entire application
export const theme = {
  primary: colors.primary,
  secondary: colors.mint,
  background: colors.softbg,
  surface: colors.white,
  text: {
    primary: colors.darktext,
    secondary: colors.softtext,
    white: colors.white
  },
  status: {
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3'
  },
  borders: {
    light: '#B2DFDB',
    medium: '#80CBC4'
  },
  shadows: {
    small: '0 2px 4px rgba(0, 150, 136, 0.1)',
    medium: '0 4px 8px rgba(0, 150, 136, 0.15)',
    large: '0 8px 16px rgba(0, 150, 136, 0.2)'
  }
};