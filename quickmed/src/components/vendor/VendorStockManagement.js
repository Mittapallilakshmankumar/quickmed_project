// import React, { useState, useEffect } from 'react';

// const SearchBar = ({ searchTerm, onSearchChange, onClearSearch, filteredStock }) => {
//   return (
//     <div style={{ marginBottom: '24px' }}>
//       <div style={{
//         position: 'relative',
//         display: 'flex',
//         alignItems: 'center',
//         backgroundColor: '#FFFFFF',
//         border: '1px solid #4DB6AC',
//         borderRadius: '8px',
//         padding: '8px 12px',
//         transition: 'border-color 0.3s ease'
//       }}>
//         <input
//           type="text"
//           style={{
//             flex: 1,
//             border: 'none',
//             outline: 'none',
//             fontSize: '14px',
//             padding: '4px 0',
//             color: '#124441'
//           }}
//           placeholder="Search medicines by name, category, or batch number..."
//           value={searchTerm}
//           onChange={onSearchChange}
//         />
//         {searchTerm && (
//           <button 
//             style={{
//               background: 'none',
//               border: 'none',
//               cursor: 'pointer',
//               color: '#4F6F6B',
//               fontSize: '16px',
//               padding: '4px'
//             }}
//             onClick={onClearSearch}
//             title="Clear search"
//           >
//             ✕
//           </button>
//         )}
//       </div>
//       {searchTerm && (
//         <div style={{ marginTop: '8px', fontSize: '14px', color: '#4F6F6B' }}>
//           Found {filteredStock.length} medicine(s) matching "{searchTerm}"
//         </div>
//       )}
//     </div>
//   );
// };

// const CategoryTopBar = ({ 
//   categories, 
//   activeCategory, 
//   onCategoryClick,
//   categoryStats 
// }) => {
//   const categoryIcons = {
//     all: '📦',
//     pregnancy: '🤰',
//     babycare: '👶',
//     vitamins: '💊',
//     pain: '😷',
//     antibiotics: '🦠',
//     chronic: '❤️',
//     firstaid: '🩹',
//     equipment: '⚙️'
//   };

//   return (
//     <div style={{
//       display: 'flex',
//       gap: '8px',
//       marginBottom: '24px',
//       flexWrap: 'wrap',
//       padding: '16px',
//       backgroundColor: '#FFFFFF',
//       borderRadius: '12px',
//       boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//       border: '1px solid #4DB6AC'
//     }}>
//       {categories.map(category => (
//         <button
//           key={category.id}
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '8px',
//             padding: '12px 20px',
//             backgroundColor: activeCategory === category.id ? '#009688' : '#FFFFFF',
//             color: activeCategory === category.id ? '#FFFFFF' : '#124441',
//             border: '1px solid #4DB6AC',
//             borderRadius: '8px',
//             cursor: 'pointer',
//             fontSize: '14px',
//             fontWeight: '500',
//             transition: 'all 0.3s ease',
//             minWidth: '120px',
//             justifyContent: 'center',
//             ...(activeCategory === category.id ? {
//               borderColor: '#009688',
//               transform: 'translateY(-2px)',
//               boxShadow: '0 4px 12px rgba(0, 150, 136, 0.2)'
//             } : {})
//           }}
//           onClick={() => onCategoryClick(category.id)}
//         >
//           <span style={{ fontSize: '16px' }}>{categoryIcons[category.id] || '💊'}</span>
//           <span>{category.name}</span>
//           <span style={{
//             backgroundColor: activeCategory === category.id ? 'rgba(255, 255, 255, 0.3)' : '#E0F2F1',
//             color: activeCategory === category.id ? '#FFFFFF' : '#124441',
//             borderRadius: '12px',
//             padding: '2px 8px',
//             fontSize: '12px',
//             fontWeight: '600',
//             minWidth: '24px',
//             textAlign: 'center'
//           }}>
//             {categoryStats[category.id] || 0}
//           </span>
//         </button>
//       ))}
//     </div>
//   );
// };

// const VendorStockManagement = ({
//   userProfile,
//   stockFilter,
//   stock,
//   searchTerm,
//   filteredStock,
//   stockFilters,
//   formatIndianCurrency,
//   getCurrentGreeting,
//   isLowStock,
//   isExpiringSoon,
//   isExpired,
//   handleSearchChange,
//   handleClearSearch,
//   handleEditMedicine,
//   setShowAddMedicineModal,
//   setShowNotificationsBellModal,
//   notifications,
//   setStockFilter
// }) => {
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [categoryFilteredStock, setCategoryFilteredStock] = useState([]);

//   // Simplified categories
//   const categories = [
//     { id: 'all', name: 'All Medicines' },
//     { id: 'pregnancy', name: 'Pregnancy Care' },
//     { id: 'babycare', name: 'Baby & Child Care' },
//     { id: 'vitamins', name: 'Vitamins & Supplements' },
//     { id: 'pain', name: 'Pain Relief' },
//     { id: 'antibiotics', name: 'Antibiotics' },
//     { id: 'chronic', name: 'Chronic Care' },
//     { id: 'firstaid', name: 'First Aid' },
//     { id: 'equipment', name: 'Medical Equipment' }
//   ];

//   // Initialize comprehensive sample data
//   const initializeSampleMedicines = () => {
//     const today = new Date();
//     const nextMonth = new Date(today);
//     nextMonth.setMonth(nextMonth.getMonth() + 1);
//     const nextYear = new Date(today);
//     nextYear.setFullYear(nextYear.getFullYear() + 1);
//     const expiredDate = new Date(today);
//     expiredDate.setMonth(expiredDate.getMonth() - 2);
    
//     const formatDate = (date) => date.toISOString().split('T')[0];
    
//     const mockData = [
//       // ================= PREGNANCY CARE =================
//       {
//         id: 'PC-001',
//         name: 'Folic Acid 5mg Tablets',
//         category: 'Pregnancy Care',
//         batchNo: 'FA-2024-001',
//         quantity: 8,
//         price: 65,
//         expiryDate: formatDate(nextYear),
//         prescriptionRequired: false,
//         description: 'Essential for preventing neural tube defects'
//       },
//       {
//         id: 'PC-002',
//         name: 'Iron Supplement',
//         category: 'Pregnancy Care',
//         batchNo: 'IRN-2024-002',
//         quantity: 12,
//         price: 1250,
//         expiryDate: formatDate(nextYear),
//         prescriptionRequired: true,
//         description: 'For anemia during pregnancy'
//       },
//       {
//         id: 'PC-003',
//         name: 'Prenatal Multivitamin',
//         category: 'Pregnancy Care',
//         batchNo: 'PMV-2024-003',
//         quantity: 28,
//         price: 380,
//         expiryDate: formatDate(nextMonth),
//         prescriptionRequired: false,
//         description: 'Complete prenatal nutrition'
//       },
//       {
//         id: 'PC-004',
//         name: 'Calcium + Vitamin D3',
//         category: 'Pregnancy Care',
//         batchNo: 'CAL-2024-004',
//         quantity: 45,
//         price: 220,
//         expiryDate: formatDate(nextYear),
//         prescriptionRequired: false,
//         description: 'Bone health supplement'
//       },
//       {
//         id: 'PC-005',
//         name: 'Progesterone Gel',
//         category: 'Pregnancy Care',
//         batchNo: 'PRO-2024-005',
//         quantity: 15,
//         price: 1850,
//         expiryDate: formatDate(nextMonth),
//         prescriptionRequired: true,
//         description: 'Hormone support for pregnancy'
//       },

//       // ================= BABY & CHILD CARE =================
//       {
//         id: 'BC-001',
//         name: 'Infant Paracetamol Drops',
//         category: 'Baby & Child Care',
//         batchNo: 'IPD-2024-001',
//         quantity: 5,
//         price: 95,
//         expiryDate: formatDate(nextYear),
//         prescriptionRequired: true,
//         description: 'Fever reducer for infants'
//       },
//       {
//         id: 'BC-002',
//         name: 'Diaper Rash Cream',
//         category: 'Baby & Child Care',
//         batchNo: 'DRC-2024-002',
//         quantity: 25,
//         price: 150,
//         expiryDate: formatDate(nextYear),
//         prescriptionRequired: false,
//         description: 'For diaper rash prevention'
//       },
//       {
//         id: 'BC-003',
//         name: 'Baby Nasal Drops',
//         category: 'Baby & Child Care',
//         batchNo: 'BND-2024-003',
//         quantity: 38,
//         price: 85,
//         expiryDate: formatDate(nextYear),
//         prescriptionRequired: false,
//         description: 'Nasal congestion relief'
//       },
//       {
//         id: 'BC-004',
//         name: 'Teething Gel',
//         category: 'Baby & Child Care',
//         batchNo: 'TG-2024-004',
//         quantity: 8,
//         price: 110,
//         expiryDate: formatDate(nextYear),
//         prescriptionRequired: false,
//         description: 'Pain relief for teething'
//       },
//       {
//         id: 'BC-005',
//         name: 'Baby Sunscreen SPF 50+',
//         category: 'Baby & Child Care',
//         batchNo: 'BSS-2024-005',
//         quantity: 22,
//         price: 220,
//         expiryDate: formatDate(nextYear),
//         prescriptionRequired: false,
//         description: 'Mineral-based sunscreen'
//       },

//       // ================= MEDICAL EQUIPMENT =================
//       {
//         id: 'ME-001',
//         name: 'Blood Pressure Monitor',
//         category: 'Medical Equipment',
//         batchNo: 'BPM-2024-001',
//         quantity: 8,
//         price: 2250,
//         expiryDate: 'N/A',
//         prescriptionRequired: false,
//         description: 'Digital BP monitor'
//       },
//       {
//         id: 'ME-002',
//         name: 'Glucometer Kit',
//         category: 'Medical Equipment',
//         batchNo: 'GLU-2024-002',
//         quantity: 6,
//         price: 1250,
//         expiryDate: formatDate(nextYear),
//         prescriptionRequired: false,
//         description: 'Blood glucose monitor'
//       },
//       {
//         id: 'ME-003',
//         name: 'Digital Thermometer',
//         category: 'Medical Equipment',
//         batchNo: 'DT-2024-003',
//         quantity: 15,
//         price: 550,
//         expiryDate: 'N/A',
//         prescriptionRequired: false,
//         description: 'Infrared thermometer'
//       },
//       {
//         id: 'ME-004',
//         name: 'Nebulizer Machine',
//         category: 'Medical Equipment',
//         batchNo: 'NEB-2024-004',
//         quantity: 5,
//         price: 3800,
//         expiryDate: 'N/A',
//         prescriptionRequired: true,
//         description: 'For asthma treatment'
//       },
//       {
//         id: 'ME-005',
//         name: 'Oxygen Concentrator',
//         category: 'Medical Equipment',
//         batchNo: 'OXC-2024-005',
//         quantity: 2,
//         price: 52000,
//         expiryDate: 'N/A',
//         prescriptionRequired: true,
//         description: '5L oxygen therapy device'
//       },

//       // ================= OTHER CATEGORIES =================
//       {
//         id: 'VIT-001',
//         name: 'Vitamin C Tablets',
//         category: 'Vitamins & Supplements',
//         batchNo: 'VC-2024-001',
//         quantity: 65,
//         price: 150,
//         expiryDate: formatDate(nextYear),
//         prescriptionRequired: false,
//         description: 'Immune support'
//       },
//       {
//         id: 'PAIN-001',
//         name: 'Ibuprofen Tablets',
//         category: 'Pain Relief',
//         batchNo: 'IBU-2024-001',
//         quantity: 120,
//         price: 45,
//         expiryDate: formatDate(nextYear),
//         prescriptionRequired: false,
//         description: 'Pain relief'
//       },
//       {
//         id: 'ANT-001',
//         name: 'Amoxicillin Capsules',
//         category: 'Antibiotics',
//         batchNo: 'AMX-2024-001',
//         quantity: 85,
//         price: 95,
//         expiryDate: formatDate(nextYear),
//         prescriptionRequired: true,
//         description: 'Antibiotic'
//       },
//       {
//         id: 'CHR-001',
//         name: 'Metformin Tablets',
//         category: 'Chronic Care',
//         batchNo: 'MET-2024-001',
//         quantity: 150,
//         price: 55,
//         expiryDate: formatDate(nextYear),
//         prescriptionRequired: true,
//         description: 'Diabetes medication'
//       },
//       {
//         id: 'FA-001',
//         name: 'First Aid Kit',
//         category: 'First Aid',
//         batchNo: 'FAK-2024-001',
//         quantity: 18,
//         price: 550,
//         expiryDate: formatDate(nextYear),
//         prescriptionRequired: false,
//         description: 'Emergency kit'
//       }
//     ];

//     return mockData;
//   };

//   // Handle category selection
//   const handleCategoryClick = (categoryId) => {
//     setSelectedCategory(categoryId);
//   };

//   // Filter products based on category first, then apply stock filters
//   const filterByCategory = (products) => {
//     if (selectedCategory === 'all') {
//       return products;
//     }
    
//     // Map categories to keywords for filtering
//     const categoryMappings = {
//       'pregnancy': ['Pregnancy Care'],
//       'babycare': ['Baby & Child Care'],
//       'equipment': ['Medical Equipment'],
//       'vitamins': ['Vitamins & Supplements'],
//       'pain': ['Pain Relief'],
//       'antibiotics': ['Antibiotics'],
//       'chronic': ['Chronic Care'],
//       'firstaid': ['First Aid']
//     };
    
//     const targetCategory = categoryMappings[selectedCategory];
//     if (!targetCategory) return products;
    
//     return products.filter(item => targetCategory.includes(item.category));
//   };

//   // Apply stock filters
//   const applyStockFilter = (products) => {
//     switch (stockFilter) {
//       case 'lowstock':
//         return products.filter(isLowStock);
//       case 'expiring':
//         return products.filter(isExpiringSoon);
//       case 'prescription':
//         return products.filter(m => m.prescriptionRequired);
//       default:
//         return products;
//     }
//   };

//   // Get initial stock
//   const initialStock = stock.length > 0 ? stock : initializeSampleMedicines();
  
//   // Calculate what to display
//   useEffect(() => {
//     // First filter by category
//     const categoryFiltered = filterByCategory(initialStock);
    
//     // Then apply stock filter
//     const stockFiltered = applyStockFilter(categoryFiltered);
    
//     // Set the filtered stock
//     setCategoryFilteredStock(stockFiltered);
//   }, [selectedCategory, stockFilter, initialStock]);

//   // Calculate category statistics - this should work on ALL data, not filtered
//   const calculateCategoryStats = () => {
//     const stats = {};
//     const allData = stock.length > 0 ? stock : initializeSampleMedicines();
    
//     categories.forEach(category => {
//       if (category.id === 'all') {
//         stats['all'] = allData.length;
//       } else {
//         // Map categories to keywords for counting
//         const categoryMappings = {
//           'pregnancy': ['Pregnancy Care'],
//           'babycare': ['Baby & Child Care'],
//           'equipment': ['Medical Equipment'],
//           'vitamins': ['Vitamins & Supplements'],
//           'pain': ['Pain Relief'],
//           'antibiotics': ['Antibiotics'],
//           'chronic': ['Chronic Care'],
//           'firstaid': ['First Aid']
//         };
        
//         const targetCategory = categoryMappings[category.id];
//         if (!targetCategory) {
//           stats[category.id] = 0;
//           return;
//         }
        
//         const count = allData.filter(item => targetCategory.includes(item.category)).length;
//         stats[category.id] = count;
//       }
//     });
    
//     return stats;
//   };

//   const categoryStats = calculateCategoryStats();
//   const displayStock = selectedCategory === 'all' 
//     ? applyStockFilter(initialStock)
//     : categoryFilteredStock;
//   const currentCategory = categories.find(c => c.id === selectedCategory);

//   return (
//     <div style={{ padding: '24px', minHeight: '100vh', backgroundColor: '#E0F2F1' }}>
//       {/* Header */}
//       <div style={{
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'flex-start',
//         marginBottom: '30px'
//       }}>
//         <div>
//           <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#124441', margin: '0 0 8px 0' }}>
//             {getCurrentGreeting()}, {userProfile.fullName?.split(' ')[0] || 'User'}
//           </h1>
//           <p style={{ fontSize: '16px', color: '#4F6F6B', margin: 0 }}>
//             Manage your medicine inventory and stock levels
//           </p>
//         </div>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
//           <button 
//             style={{
//               position: 'relative',
//               backgroundColor: '#FFFFFF',
//               border: '1px solid #4DB6AC',
//               borderRadius: '8px',
//               padding: '10px 12px',
//               fontSize: '18px',
//               cursor: 'pointer',
//               boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//               color: '#124441'
//             }}
//             onClick={() => setShowNotificationsBellModal(true)}
//           >
//             🔔
//             {notifications.length > 0 && (
//               <span style={{
//                 position: 'absolute',
//                 top: '-5px',
//                 right: '-5px',
//                 backgroundColor: '#EF4444',
//                 color: '#FFFFFF',
//                 borderRadius: '50%',
//                 width: '18px',
//                 height: '18px',
//                 fontSize: '10px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 fontWeight: '600'
//               }}>
//                 {notifications.length}
//               </span>
//             )}
//           </button>
//           <button 
//             style={{
//               backgroundColor: '#009688',
//               color: '#FFFFFF',
//               border: 'none',
//               padding: '12px 20px',
//               borderRadius: '8px',
//               fontSize: '14px',
//               fontWeight: '600',
//               cursor: 'pointer'
//             }}
//             onClick={() => setShowAddMedicineModal(true)}
//           >
//             + Add Medicine
//           </button>
//         </div>
//       </div>

//       {/* Filter Tabs */}
//       <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
//         {stockFilters.map(filter => (
//           <button
//             key={filter.id}
//             style={{
//               padding: '10px 20px',
//               backgroundColor: stockFilter === filter.id ? '#009688' : '#FFFFFF',
//               color: stockFilter === filter.id ? '#FFFFFF' : '#124441',
//               border: '1px solid #4DB6AC',
//               borderRadius: '8px',
//               cursor: 'pointer',
//               fontSize: '14px',
//               fontWeight: '500'
//             }}
//             onClick={() => setStockFilter(filter.id)}
//           >
//             {filter.label}
//           </button>
//         ))}
//       </div>

//       {/* Stats Cards */}
//       <div style={{
//         display: 'grid',
//         gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
//         gap: '20px',
//         marginBottom: '30px'
//       }}>
//         <div style={{
//           backgroundColor: '#FFFFFF',
//           padding: '20px',
//           borderRadius: '12px',
//           boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//           display: 'flex',
//           alignItems: 'center',
//           border: '1px solid #4DB6AC'
//         }}>
//           <div style={{ fontSize: '24px', marginRight: '16px', color: '#009688' }}>📦</div>
//           <div>
//             <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#124441', margin: '0 0 4px 0' }}>
//               {initialStock.length}
//             </h3>
//             <p style={{ fontSize: '14px', color: '#4F6F6B', margin: 0 }}>Total Items</p>
//           </div>
//         </div>

//         <div style={{
//           backgroundColor: '#FFFFFF',
//           padding: '20px',
//           borderRadius: '12px',
//           boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//           display: 'flex',
//           alignItems: 'center',
//           border: '1px solid #4DB6AC'
//         }}>
//           <div style={{ fontSize: '24px', marginRight: '16px', color: '#009688' }}>⚠️</div>
//           <div>
//             <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#124441', margin: '0 0 4px 0' }}>
//               {initialStock.filter(isLowStock).length}
//             </h3>
//             <p style={{ fontSize: '14px', color: '#4F6F6B', margin: 0 }}>Low Stock</p>
//           </div>
//         </div>

//         <div style={{
//           backgroundColor: '#FFFFFF',
//           padding: '20px',
//           borderRadius: '12px',
//           boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//           display: 'flex',
//           alignItems: 'center',
//           border: '1px solid #4DB6AC'
//         }}>
//           <div style={{ fontSize: '24px', marginRight: '16px', color: '#009688' }}>📅</div>
//           <div>
//             <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#124441', margin: '0 0 4px 0' }}>
//               {initialStock.filter(isExpiringSoon).length}
//             </h3>
//             <p style={{ fontSize: '14px', color: '#4F6F6B', margin: 0 }}>Expiring Soon</p>
//           </div>
//         </div>

//         <div style={{
//           backgroundColor: '#FFFFFF',
//           padding: '20px',
//           borderRadius: '12px',
//           boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//           display: 'flex',
//           alignItems: 'center',
//           border: '1px solid #4DB6AC'
//         }}>
//           <div style={{ fontSize: '24px', marginRight: '16px', color: '#009688' }}>🩺</div>
//           <div>
//             <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#124441', margin: '0 0 4px 0' }}>
//               {initialStock.filter(m => m.prescriptionRequired).length}
//             </h3>
//             <p style={{ fontSize: '14px', color: '#4F6F6B', margin: 0 }}>Prescription Only</p>
//           </div>
//         </div>
//       </div>

//       {/* Category Top Bar */}
//       <CategoryTopBar 
//         categories={categories}
//         activeCategory={selectedCategory}
//         onCategoryClick={handleCategoryClick}
//         categoryStats={categoryStats}
//       />

//       {/* Category Status */}
//       <div style={{
//         display: 'flex',
//         alignItems: 'center',
//         gap: '16px',
//         backgroundColor: '#FFFFFF',
//         padding: '12px 16px',
//         borderRadius: '8px',
//         marginBottom: '20px',
//         border: '1px solid #4DB6AC'
//       }}>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#124441' }}>
//           <span>Showing:</span>
//           <span style={{ fontWeight: '600' }}>
//             {selectedCategory === 'all' ? 'All Items' : currentCategory?.name}
//             {stockFilter !== 'all' && ` (${stockFilters.find(f => f.id === stockFilter)?.label})`}
//           </span>
//         </div>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#124441' }}>
//           <span>Items:</span>
//           <span style={{ fontWeight: '600' }}>{displayStock.length}</span>
//         </div>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#124441' }}>
//           <span>Category Count:</span>
//           <span style={{ fontWeight: '600' }}>{categoryStats[selectedCategory] || 0}</span>
//         </div>
//         {(selectedCategory !== 'all' || stockFilter !== 'all') && (
//           <button 
//             style={{
//               marginLeft: 'auto',
//               fontSize: '12px',
//               padding: '6px 12px',
//               backgroundColor: 'transparent',
//               border: '1px solid #009688',
//               color: '#009688',
//               borderRadius: '4px',
//               cursor: 'pointer'
//             }}
//             onClick={() => {
//               setSelectedCategory('all');
//               setStockFilter('all');
//             }}
//           >
//             Reset Filters
//           </button>
//         )}
//       </div>

//       {/* Main Content */}
//       <div style={{
//         backgroundColor: '#FFFFFF',
//         borderRadius: '12px',
//         padding: '24px',
//         boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//         border: '1px solid #4DB6AC'
//       }}>
//         <div style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           marginBottom: '20px'
//         }}>
//           <div>
//             <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#124441', margin: 0 }}>
//               {selectedCategory === 'all' ? 'Medicine & Equipment Inventory' : currentCategory?.name}
//               {stockFilter !== 'all' && ` (${stockFilters.find(f => f.id === stockFilter)?.label})`}
//             </h2>
//             <p style={{ fontSize: '14px', color: '#4F6F6B', margin: '4px 0 0 0' }}>
//               {displayStock.length} of {categoryStats[selectedCategory] || 0} items shown
//               {stockFilter !== 'all' ? ` after applying ${stockFilters.find(f => f.id === stockFilter)?.label.toLowerCase()} filter` : ''}
//             </p>
//           </div>
//           <div style={{ fontSize: '14px', color: '#009688', fontWeight: '500' }}>
//             <span>{displayStock.length} items</span>
//           </div>
//         </div>

//         <SearchBar 
//           searchTerm={searchTerm}
//           onSearchChange={(e) => {
//             handleSearchChange(e);
//             if (searchTerm && selectedCategory !== 'all') {
//               setSelectedCategory('all');
//             }
//           }}
//           onClearSearch={() => {
//             handleClearSearch();
//             setSelectedCategory('all');
//           }}
//           filteredStock={filteredStock}
//         />

//         {/* Table */}
//         <div style={{ overflowX: 'auto', marginTop: '20px' }}>
//           <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
//             <thead>
//               <tr style={{ backgroundColor: '#E0F2F1', borderBottom: '2px solid #4DB6AC' }}>
//                 <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '14px', color: '#124441' }}>Name</th>
//                 <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '14px', color: '#124441' }}>Category</th>
//                 <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '14px', color: '#124441' }}>Quantity</th>
//                 <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '14px', color: '#124441' }}>Price</th>
//                 <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '14px', color: '#124441' }}>Expiry Date</th>
//                 <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '14px', color: '#124441' }}>Prescription</th>
//                 <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '14px', color: '#124441' }}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {displayStock.map(item => (
//                 <tr key={item.id} style={{ borderBottom: '1px solid #E0F2F1' }}>
//                   <td style={{ padding: '12px 16px', fontSize: '14px', color: '#124441' }}>
//                     <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
//                       <strong>{item.name}</strong>
//                       <span style={{ fontSize: '12px', color: '#4F6F6B' }}>{item.batchNo}</span>
//                     </div>
//                   </td>
//                   <td style={{ padding: '12px 16px', fontSize: '14px' }}>
//                     <span style={{
//                       fontWeight: '500',
//                       backgroundColor: 
//                         item.category === 'Pregnancy Care' ? '#E0F2F1' :
//                         item.category === 'Baby & Child Care' ? '#E0F2F1' : 
//                         item.category === 'Medical Equipment' ? '#E0F2F1' :
//                         item.category === 'Vitamins & Supplements' ? '#E0F2F1' :
//                         item.category === 'Pain Relief' ? '#E0F2F1' :
//                         item.category === 'Antibiotics' ? '#E0F2F1' :
//                         item.category === 'Chronic Care' ? '#E0F2F1' :
//                         item.category === 'First Aid' ? '#E0F2F1' : '#E0F2F1',
//                       color: '#124441',
//                       padding: '4px 8px',
//                       borderRadius: '4px',
//                       fontSize: '12px',
//                       display: 'inline-block'
//                     }}>
//                       {item.category}
//                     </span>
//                   </td>
//                   <td style={{ padding: '12px 16px', fontSize: '14px', color: '#124441' }}>
//                     <span style={{ fontWeight: '600', ...(isLowStock(item) ? { color: '#EF4444' } : {}) }}>
//                       {item.quantity}
//                       {isLowStock(item) && ' ⚠️'}
//                     </span>
//                   </td>
//                   <td style={{ padding: '12px 16px', fontSize: '14px', color: '#124441' }}>
//                     {formatIndianCurrency(item.price)}
//                   </td>
//                   <td style={{ padding: '12px 16px', fontSize: '14px' }}>
//                     <span style={{
//                       color: '#124441',
//                       ...(isExpired(item) ? { color: '#EF4444', fontWeight: '600' } : {}),
//                       ...(isExpiringSoon(item) && !isExpired(item) ? { color: '#F59E0B' } : {})
//                     }}>
//                       {item.expiryDate}
//                       {isExpired(item) && ' 🔴'}
//                       {isExpiringSoon(item) && !isExpired(item) && ' 🟡'}
//                     </span>
//                   </td>
//                   <td style={{ padding: '12px 16px', fontSize: '14px' }}>
//                     {item.prescriptionRequired ? (
//                       <span style={{ color: '#EF4444', fontWeight: '500' }}>Yes</span>
//                     ) : (
//                       <span style={{ color: '#009688', fontWeight: '500' }}>No</span>
//                     )}
//                   </td>
//                   <td style={{ padding: '12px 16px', fontSize: '14px' }}>
//                     <button 
//                       style={{
//                         backgroundColor: '#009688',
//                         color: '#FFFFFF',
//                         border: 'none',
//                         padding: '6px 12px',
//                         borderRadius: '4px',
//                         fontSize: '12px',
//                         fontWeight: '500',
//                         cursor: 'pointer'
//                       }}
//                       onClick={() => handleEditMedicine(item)}
//                     >
//                       Update Stock
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {displayStock.length === 0 && (
//           <div style={{ textAlign: 'center', padding: '40px', color: '#4F6F6B' }}>
//             <p style={{ fontSize: '16px', marginBottom: '8px' }}>
//               No items found 
//               {selectedCategory !== 'all' ? ` in ${currentCategory?.name}` : ''}
//               {stockFilter !== 'all' ? ` with ${stockFilters.find(f => f.id === stockFilter)?.label.toLowerCase()} filter` : ''}
//               {searchTerm ? ` matching "${searchTerm}"` : ''}.
//             </p>
//             <p style={{ fontSize: '14px', color: '#4F6F6B', marginBottom: '16px' }}>
//               {selectedCategory !== 'all' 
//                 ? `There are ${categoryStats[selectedCategory] || 0} items in this category. Try changing the stock filter or search term.`
//                 : 'Try changing filters or adding new items to your inventory.'}
//             </p>
//             <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
//               {(searchTerm || stockFilter !== 'all' || selectedCategory !== 'all') && (
//                 <button 
//                   style={{
//                     backgroundColor: 'transparent',
//                     color: '#009688',
//                     border: '2px solid #009688',
//                     padding: '10px 18px',
//                     borderRadius: '8px',
//                     fontSize: '14px',
//                     fontWeight: '600',
//                     cursor: 'pointer',
//                     marginTop: '16px'
//                   }}
//                   onClick={() => {
//                     handleClearSearch();
//                     setSelectedCategory('all');
//                     setStockFilter('all');
//                   }}
//                 >
//                   Clear All Filters
//                 </button>
//               )}
//               {selectedCategory !== 'all' && (
//                 <button 
//                   style={{
//                     backgroundColor: '#009688',
//                     color: '#FFFFFF',
//                     border: 'none',
//                     padding: '10px 18px',
//                     borderRadius: '8px',
//                     fontSize: '14px',
//                     fontWeight: '600',
//                     cursor: 'pointer',
//                     marginTop: '16px'
//                   }}
//                   onClick={() => setShowAddMedicineModal(true)}
//                 >
//                   Add {currentCategory?.name} Item
//                 </button>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VendorStockManagement;


import React, { useState, useEffect } from 'react';

const SearchBar = ({ searchTerm, onSearchChange, onClearSearch, filteredStock }) => {
  return (
    <div style={{ marginBottom: '24px' }}>
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        border: '1px solid #4DB6AC',
        borderRadius: '8px',
        padding: '8px 12px',
        transition: 'border-color 0.3s ease'
      }}>
        <input
          type="text"
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontSize: '14px',
            padding: '4px 0',
            color: '#124441'
          }}
          placeholder="Search medicines by name, category, or batch number..."
          value={searchTerm}
          onChange={onSearchChange}
        />
        {searchTerm && (
          <button 
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#4F6F6B',
              fontSize: '16px',
              padding: '4px'
            }}
            onClick={onClearSearch}
            title="Clear search"
          >
            ✕
          </button>
        )}
      </div>
      {searchTerm && (
        <div style={{ marginTop: '8px', fontSize: '14px', color: '#4F6F6B' }}>
          Found {filteredStock.length} medicine(s) matching "{searchTerm}"
        </div>
      )}
    </div>
  );
};

const CategoryTopBar = ({ 
  categories, 
  activeCategory, 
  onCategoryClick,
  categoryStats 
}) => {
  const categoryIcons = {
    all: '📦',
    pregnancy: '🤰',
    babycare: '👶',
    vitamins: '💊',
    pain: '😷',
    antibiotics: '🦠',
    chronic: '❤️',
    firstaid: '🩹',
    equipment: '⚙️'
  };

  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      marginBottom: '24px',
      flexWrap: 'wrap',
      padding: '16px',
      backgroundColor: '#FFFFFF',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: '1px solid #4DB6AC'
    }}>
      {categories.map(category => (
        <button
          key={category.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            backgroundColor: activeCategory === category.id ? '#009688' : '#FFFFFF',
            color: activeCategory === category.id ? '#FFFFFF' : '#124441',
            border: '1px solid #4DB6AC',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.3s ease',
            minWidth: '120px',
            justifyContent: 'center',
            ...(activeCategory === category.id ? {
              borderColor: '#009688',
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(0, 150, 136, 0.2)'
            } : {})
          }}
          onClick={() => onCategoryClick(category.id)}
        >
          <span style={{ fontSize: '16px' }}>{categoryIcons[category.id] || '💊'}</span>
          <span>{category.name}</span>
          <span style={{
            backgroundColor: activeCategory === category.id ? 'rgba(255, 255, 255, 0.3)' : '#E0F2F1',
            color: activeCategory === category.id ? '#FFFFFF' : '#124441',
            borderRadius: '12px',
            padding: '2px 8px',
            fontSize: '12px',
            fontWeight: '600',
            minWidth: '24px',
            textAlign: 'center'
          }}>
            {categoryStats[category.id] || 0}
          </span>
        </button>
      ))}
    </div>
  );
};

const VendorStockManagement = ({
  userProfile,
  stockFilter,
  stock,
  searchTerm,
  filteredStock,
  stockFilters,
  formatIndianCurrency,
  getCurrentGreeting,
  isLowStock,
  isExpiringSoon,
  isExpired,
  handleSearchChange,
  handleClearSearch,
  handleEditMedicine,
  setShowAddMedicineModal,
  setShowNotificationsBellModal,
  notifications,
  setStockFilter
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categoryFilteredStock, setCategoryFilteredStock] = useState([]);
  const [backendStock, setBackendStock] = useState([]);
  const [loading, setLoading] = useState(true);
  // ✅ ADD THIS STATE (VERY IMPORTANT)
const [newMedicine, setNewMedicine] = useState({
  name: "",
  category: "",
  batchNo: "",
  quantity: "",
  minStock: "",
  price: "",
  expiryDate: "",
  supplier: "",
  prescriptionRequired: false,
});

  // ===============================
// ADD MEDICINE (POST)
// ===============================
const handleAddMedicine = async (newMedicine) => {
  try {
    const token = localStorage.getItem("access_token");

    const response = await fetch(
      "http://127.0.0.1:8000/api/vendor/medicines/add/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
  medicine_name: newMedicine.name,
  category: newMedicine.category,
  batch_no: newMedicine.batchNo,
  quantity: Number(newMedicine.quantity),
  min_stock: Number(newMedicine.minStock),   // ✅ ADD
  price: Number(newMedicine.price),
  expiry_date: newMedicine.expiryDate,
  supplier: newMedicine.supplier,            // ✅ ADD
  prescription_required: newMedicine.prescriptionRequired,
}),

      }
    );

    if (!response.ok) {
      alert("Add medicine failed ❌");
      return;
    }

    alert("Medicine added successfully ✅");

    // reload table data
    fetchVendorMedicines();

  } catch (error) {
    console.error(error);
    alert("Server error ❌");
  }
};

 
  
// ===============================
// STEP 3: FETCH FUNCTION (ADD AFTER STATE)
// ===============================
const fetchVendorMedicines = async () => {
  try {
    const token = localStorage.getItem("access_token");

    const response = await fetch(
      "http://127.0.0.1:8000/api/vendor/medicines/",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch medicines");
    }

    const data = await response.json();

    const formattedData = data.map(item => ({
      id: item.id,
      name: item.medicine_name,
      category: item.category,
      batchNo: item.batch_no,
      quantity: item.quantity,
      minStock: item.min_stock, 
      price: item.price,
      expiryDate: item.expiry_date,
        supplier: item.supplier,    
      prescriptionRequired: item.prescription_required
    }));

    setBackendStock(formattedData);
    setLoading(false);

  } catch (error) {
    console.error("Error fetching medicines:", error);
    setLoading(false);
  }
};
useEffect(() => {
  fetchVendorMedicines();
}, []);

  // Simplified categories
  const categories = [
    { id: 'all', name: 'All Medicines' },
    { id: 'pregnancy', name: 'Pregnancy Care' },
    { id: 'babycare', name: 'Baby & Child Care' },
    { id: 'vitamins', name: 'Vitamins & Supplements' },
    { id: 'pain', name: 'Pain Relief' },
    { id: 'antibiotics', name: 'Antibiotics' },
    { id: 'chronic', name: 'Chronic Care' },
    { id: 'firstaid', name: 'First Aid' },
    { id: 'equipment', name: 'Medical Equipment' }
  ];

  // Initialize comprehensive sample data
  

  // Handle category selection
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  // Filter products based on category first, then apply stock filters
  const filterByCategory = (products) => {
    if (selectedCategory === 'all') {
      return products;
    }
    
    // Map categories to keywords for filtering
    const categoryMappings = {
      'pregnancy': ['Pregnancy Care'],
      'babycare': ['Baby & Child Care'],
      'equipment': ['Medical Equipment'],
      'vitamins': ['Vitamins & Supplements'],
      'pain': ['Pain Relief'],
      'antibiotics': ['Antibiotics'],
      'chronic': ['Chronic Care'],
      'firstaid': ['First Aid']
    };
    
    const targetCategory = categoryMappings[selectedCategory];
    if (!targetCategory) return products;
    
    return products.filter(item => targetCategory.includes(item.category));
  };

  // Apply stock filters
  const applyStockFilter = (products) => {
    switch (stockFilter) {
      case 'lowstock':
        return products.filter(isLowStock);
      case 'expiring':
        return products.filter(isExpiringSoon);
      case 'prescription':
        return products.filter(m => m.prescriptionRequired);
      default:
        return products;
    }
  };

  // Get initial stock
  // const initialStock = stock.length > 0 ? stock : initializeSampleMedicines();
  const initialStock = backendStock;
  
  // Calculate what to display
  useEffect(() => {
    // First filter by category
    const categoryFiltered = filterByCategory(initialStock);
    
    // Then apply stock filter
    const stockFiltered = applyStockFilter(categoryFiltered);
    
    // Set the filtered stock
    setCategoryFilteredStock(stockFiltered);
  }, [selectedCategory, stockFilter, initialStock]);

  // Calculate category statistics - this should work on ALL data, not filtered
  const calculateCategoryStats = () => {
    const stats = {};
    // const allData = stock.length > 0 ? stock : initializeSampleMedicines();
    const allData = backendStock;
    
    categories.forEach(category => {
      if (category.id === 'all') {
        stats['all'] = allData.length;
      } else {
        // Map categories to keywords for counting
        const categoryMappings = {
          'pregnancy': ['Pregnancy Care'],
          'babycare': ['Baby & Child Care'],
          'equipment': ['Medical Equipment'],
          'vitamins': ['Vitamins & Supplements'],
          'pain': ['Pain Relief'],
          'antibiotics': ['Antibiotics'],
          'chronic': ['Chronic Care'],
          'firstaid': ['First Aid']
        };
        
        const targetCategory = categoryMappings[category.id];
        if (!targetCategory) {
          stats[category.id] = 0;
          return;
        }
        
        const count = allData.filter(item => targetCategory.includes(item.category)).length;
        stats[category.id] = count;
      }
    });
    
    return stats;
  };

  const categoryStats = calculateCategoryStats();
  const displayStock = selectedCategory === 'all' 
    ? applyStockFilter(initialStock)
    : categoryFilteredStock;
  const currentCategory = categories.find(c => c.id === selectedCategory);

  return (
    <div style={{ padding: '24px', minHeight: '100vh', backgroundColor: '#E0F2F1' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '30px'
      }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#124441', margin: '0 0 8px 0' }}>
            {getCurrentGreeting()}, {userProfile.fullName?.split(' ')[0] || 'User'}
          </h1>
          <p style={{ fontSize: '16px', color: '#4F6F6B', margin: 0 }}>
            Manage your medicine inventory and stock levels
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            style={{
              position: 'relative',
              backgroundColor: '#FFFFFF',
              border: '1px solid #4DB6AC',
              borderRadius: '8px',
              padding: '10px 12px',
              fontSize: '18px',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              color: '#124441'
            }}
            onClick={() => setShowNotificationsBellModal(true)}
          >
            🔔
            {notifications.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                backgroundColor: '#EF4444',
                color: '#FFFFFF',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                fontSize: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '600'
              }}>
                {notifications.length}
              </span>
            )}
          </button>
          <button 
            style={{
              backgroundColor: '#009688',
              color: '#FFFFFF',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
            // onClick={() => setShowAddMedicineModal(true)}
            onClick={() => {
  setNewMedicine({
    name: "",
    category: "",
    batchNo: "",
    quantity: "",
    minStock: "",
    price: "",
    expiryDate: "",
    supplier: "",
    prescriptionRequired: false,
  });
  setShowAddMedicineModal(true);
}}

          >
            + Add Medicine
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {stockFilters.map(filter => (
          <button
            key={filter.id}
            style={{
              padding: '10px 20px',
              backgroundColor: stockFilter === filter.id ? '#009688' : '#FFFFFF',
              color: stockFilter === filter.id ? '#FFFFFF' : '#124441',
              border: '1px solid #4DB6AC',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
            onClick={() => setStockFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          border: '1px solid #4DB6AC'
        }}>
          <div style={{ fontSize: '24px', marginRight: '16px', color: '#009688' }}>📦</div>
          <div>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#124441', margin: '0 0 4px 0' }}>
              {initialStock.length}
            </h3>
            <p style={{ fontSize: '14px', color: '#4F6F6B', margin: 0 }}>Total Items</p>
          </div>
        </div>

        <div style={{
          backgroundColor: '#FFFFFF',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          border: '1px solid #4DB6AC'
        }}>
          <div style={{ fontSize: '24px', marginRight: '16px', color: '#009688' }}>⚠️</div>
          <div>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#124441', margin: '0 0 4px 0' }}>
              {initialStock.filter(isLowStock).length}
            </h3>
            <p style={{ fontSize: '14px', color: '#4F6F6B', margin: 0 }}>Low Stock</p>
          </div>
        </div>

        <div style={{
          backgroundColor: '#FFFFFF',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          border: '1px solid #4DB6AC'
        }}>
          <div style={{ fontSize: '24px', marginRight: '16px', color: '#009688' }}>📅</div>
          <div>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#124441', margin: '0 0 4px 0' }}>
              {initialStock.filter(isExpiringSoon).length}
            </h3>
            <p style={{ fontSize: '14px', color: '#4F6F6B', margin: 0 }}>Expiring Soon</p>
          </div>
        </div>

        <div style={{
          backgroundColor: '#FFFFFF',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          border: '1px solid #4DB6AC'
        }}>
          <div style={{ fontSize: '24px', marginRight: '16px', color: '#009688' }}>🩺</div>
          <div>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#124441', margin: '0 0 4px 0' }}>
              {initialStock.filter(m => m.prescriptionRequired).length}
            </h3>
            <p style={{ fontSize: '14px', color: '#4F6F6B', margin: 0 }}>Prescription Only</p>
          </div>
        </div>
      </div>

      {/* Category Top Bar */}
      <CategoryTopBar 
        categories={categories}
        activeCategory={selectedCategory}
        onCategoryClick={handleCategoryClick}
        categoryStats={categoryStats}
      />

      {/* Category Status */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        backgroundColor: '#FFFFFF',
        padding: '12px 16px',
        borderRadius: '8px',
        marginBottom: '20px',
        border: '1px solid #4DB6AC'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#124441' }}>
          <span>Showing:</span>
          <span style={{ fontWeight: '600' }}>
            {selectedCategory === 'all' ? 'All Items' : currentCategory?.name}
            {stockFilter !== 'all' && ` (${stockFilters.find(f => f.id === stockFilter)?.label})`}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#124441' }}>
          <span>Items:</span>
          <span style={{ fontWeight: '600' }}>{displayStock.length}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#124441' }}>
          <span>Category Count:</span>
          <span style={{ fontWeight: '600' }}>{categoryStats[selectedCategory] || 0}</span>
        </div>
        {(selectedCategory !== 'all' || stockFilter !== 'all') && (
          <button 
            style={{
              marginLeft: 'auto',
              fontSize: '12px',
              padding: '6px 12px',
              backgroundColor: 'transparent',
              border: '1px solid #009688',
              color: '#009688',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            onClick={() => {
              setSelectedCategory('all');
              setStockFilter('all');
            }}
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Main Content */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #4DB6AC'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#124441', margin: 0 }}>
              {selectedCategory === 'all' ? 'Medicine & Equipment Inventory' : currentCategory?.name}
              {stockFilter !== 'all' && ` (${stockFilters.find(f => f.id === stockFilter)?.label})`}
            </h2>
            <p style={{ fontSize: '14px', color: '#4F6F6B', margin: '4px 0 0 0' }}>
              {displayStock.length} of {categoryStats[selectedCategory] || 0} items shown
              {stockFilter !== 'all' ? ` after applying ${stockFilters.find(f => f.id === stockFilter)?.label.toLowerCase()} filter` : ''}
            </p>
          </div>
          <div style={{ fontSize: '14px', color: '#009688', fontWeight: '500' }}>
            <span>{displayStock.length} items</span>
          </div>
        </div>

        <SearchBar 
          searchTerm={searchTerm}
          onSearchChange={(e) => {
            handleSearchChange(e);
            if (searchTerm && selectedCategory !== 'all') {
              setSelectedCategory('all');
            }
          }}
          onClearSearch={() => {
            handleClearSearch();
            setSelectedCategory('all');
          }}
          filteredStock={filteredStock}
        />

        {/* Table */}
        <div style={{ overflowX: 'auto', marginTop: '20px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
            <thead>
              <tr style={{ backgroundColor: '#E0F2F1', borderBottom: '2px solid #4DB6AC' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '14px', color: '#124441' }}>Name</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '14px', color: '#124441' }}>Category</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '14px', color: '#124441' }}>Quantity</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '14px', color: '#124441' }}>Price</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '14px', color: '#124441' }}>Expiry Date</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '14px', color: '#124441' }}>Prescription</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '14px', color: '#124441' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayStock.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid #E0F2F1' }}>
                  <td style={{ padding: '12px 16px', fontSize: '14px', color: '#124441' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <strong>{item.name}</strong>
                      <span style={{ fontSize: '12px', color: '#4F6F6B' }}>{item.batchNo}</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '14px' }}>
                    <span style={{
                      fontWeight: '500',
                      backgroundColor: 
                        item.category === 'Pregnancy Care' ? '#E0F2F1' :
                        item.category === 'Baby & Child Care' ? '#E0F2F1' : 
                        item.category === 'Medical Equipment' ? '#E0F2F1' :
                        item.category === 'Vitamins & Supplements' ? '#E0F2F1' :
                        item.category === 'Pain Relief' ? '#E0F2F1' :
                        item.category === 'Antibiotics' ? '#E0F2F1' :
                        item.category === 'Chronic Care' ? '#E0F2F1' :
                        item.category === 'First Aid' ? '#E0F2F1' : '#E0F2F1',
                      color: '#124441',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      display: 'inline-block'
                    }}>
                      {item.category}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '14px', color: '#124441' }}>
                    <span style={{ fontWeight: '600', ...(isLowStock(item) ? { color: '#EF4444' } : {}) }}>
                      {item.quantity}
                      {isLowStock(item) && ' ⚠️'}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '14px', color: '#124441' }}>
                    {formatIndianCurrency(item.price)}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '14px' }}>
                    <span style={{
                      color: '#124441',
                      ...(isExpired(item) ? { color: '#EF4444', fontWeight: '600' } : {}),
                      ...(isExpiringSoon(item) && !isExpired(item) ? { color: '#F59E0B' } : {})
                    }}>
                      {item.expiryDate}
                      {isExpired(item) && ' 🔴'}
                      {isExpiringSoon(item) && !isExpired(item) && ' 🟡'}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '14px' }}>
                    {item.prescriptionRequired ? (
                      <span style={{ color: '#EF4444', fontWeight: '500' }}>Yes</span>
                    ) : (
                      <span style={{ color: '#009688', fontWeight: '500' }}>No</span>
                    )}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '14px' }}>
                    <button 
                      style={{
                        backgroundColor: '#009688',
                        color: '#FFFFFF',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                      onClick={() => handleEditMedicine(item)}
                    >
                      Update Stock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {displayStock.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#4F6F6B' }}>
            <p style={{ fontSize: '16px', marginBottom: '8px' }}>
              No items found 
              {selectedCategory !== 'all' ? ` in ${currentCategory?.name}` : ''}
              {stockFilter !== 'all' ? ` with ${stockFilters.find(f => f.id === stockFilter)?.label.toLowerCase()} filter` : ''}
              {searchTerm ? ` matching "${searchTerm}"` : ''}.
            </p>
            <p style={{ fontSize: '14px', color: '#4F6F6B', marginBottom: '16px' }}>
              {selectedCategory !== 'all' 
                ? `There are ${categoryStats[selectedCategory] || 0} items in this category. Try changing the stock filter or search term.`
                : 'Try changing filters or adding new items to your inventory.'}
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              {(searchTerm || stockFilter !== 'all' || selectedCategory !== 'all') && (
                <button 
                  style={{
                    backgroundColor: 'transparent',
                    color: '#009688',
                    border: '2px solid #009688',
                    padding: '10px 18px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    marginTop: '16px'
                  }}
                  onClick={() => {
                    handleClearSearch();
                    setSelectedCategory('all');
                    setStockFilter('all');
                  }}
                >
                  Clear All Filters
                </button>
              )}
              {selectedCategory !== 'all' && (
                <button 
                  style={{
                    backgroundColor: '#009688',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '10px 18px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    marginTop: '16px'
                  }}
                  // onClick={() => setShowAddMedicineModal(true)}
                  onClick={() => {
  setNewMedicine({
    name: "",
    category: "",
    batchNo: "",
    quantity: "",
    minStock: "",
    price: "",
    expiryDate: "",
    supplier: "",
    prescriptionRequired: false,
  });
  setShowAddMedicineModal(true);
}}

                >
                  Add {currentCategory?.name} Item
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorStockManagement;

