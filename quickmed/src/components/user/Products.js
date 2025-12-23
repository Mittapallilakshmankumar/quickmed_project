import React, { useState, useEffect } from 'react';

// Move allProducts outside the component to fix ESLint warning
const allProducts = [
    // Medicines Category - Batch 1 (1-10)
    { id: 1, name: 'Dolo 650 Tablet', brand: 'Micro Labs', price: 25, vendor: 'City Pharmacy', category: 'Fever & Cold', mainCategory: 'medicines', description: 'Effective fever reducer and pain reliever', prescriptionRequired: false, stock: 200, rating: 4.7, reviews: 1250, popular: true, image: 'https://tiimg.tistatic.com/fp/1/007/759/dolo-650-mg-tablets-298.jpg' },
    { id: 2, name: 'Saridon Tablet', brand: 'Bayer', price: 30, vendor: 'WellCare Store', category: 'Pain Relief', mainCategory: 'medicines', description: 'Fast relief from headache and migraine', prescriptionRequired: false, stock: 150, rating: 4.5, reviews: 890, popular: true, image: 'https://images.apollo247.in/pub/media/catalog/product/s/a/sar0001_1-sep2023_1_.jpg' },
    { id: 3, name: 'Azithromycin 500mg', brand: 'Cipla', price: 120, vendor: 'MedPlus', category: 'Antibiotics', mainCategory: 'medicines', description: 'Broad spectrum antibiotic for infections', prescriptionRequired: true, stock: 50, rating: 4.4, reviews: 340, popular: false, image: 'https://cdn.shop-apotheke.com/images/D07/116/993/D07116993-p12.jpg' },
    { id: 4, name: 'Cetirizine 10mg', brand: 'Zyrtec', price: 35, vendor: 'Apollo Pharmacy', category: 'Allergy', mainCategory: 'medicines', description: '24-hour allergy relief without drowsiness', prescriptionRequired: false, stock: 180, rating: 4.6, reviews: 920, popular: true, image: 'https://vinmec-prod.s3.amazonaws.com/images/20220608_141143_899382_cetirizin-stada-10m.max-1800x1800.jpg' },
    { id: 5, name: 'Metformin 500mg', brand: 'USV', price: 45, vendor: 'WellCare Store', category: 'Diabetes Care', mainCategory: 'medicines', description: 'Oral anti-diabetic medication', prescriptionRequired: true, stock: 120, rating: 4.3, reviews: 560, popular: false, image: 'https://www.wikidoc.org/images/d/db/Metformin_500mg_Tablets.jpg' },
    { id: 6, name: 'Atorvastatin 10mg', brand: 'Sun Pharma', price: 65, vendor: 'MedPlus', category: 'Cardiac Care', mainCategory: 'medicines', description: 'Cholesterol lowering medication', prescriptionRequired: true, stock: 90, rating: 4.4, reviews: 430, popular: false, image: 'https://c8.alamy.com/comp/2J57Y3G/photograph-of-pack-of-atorvastatin-10mg-film-coated-tablets-for-oral-use-28-film-coated-tablets-wockhardt-2J57Y3G.jpg' },
    { id: 7, name: 'Montelukast 10mg', brand: 'Cipla', price: 55, vendor: 'Apollo Pharmacy', category: 'Asthma & Respiratory', mainCategory: 'medicines', description: 'For asthma and allergic rhinitis', prescriptionRequired: true, stock: 80, rating: 4.5, reviews: 380, popular: false, image: 'https://newassets.apollo247.com/pub/media/catalog/product/s/i/sin0199.jpg' },
    { id: 8, name: 'Omeprazole 20mg', brand: 'Dr. Reddy\'s', price: 40, vendor: 'City Pharmacy', category: 'Digestive Care', mainCategory: 'medicines', description: 'Acid reducer for heartburn relief', prescriptionRequired: false, stock: 160, rating: 4.4, reviews: 670, popular: true, image: 'https://i5.walmartimages.com/seo/Equate-Omeprazole-Delayed-Release-Capsules-20-mg-28-Count_f7c3830d-d0c4-43bf-8c8d-5d302641e2a4.3c9a0eafa6ead6ef79aaba7fb8964925.jpeg' },
    { id: 9, name: 'Amoxicillin 500mg', brand: 'Alkem', price: 85, vendor: 'WellCare Store', category: 'Antibiotics', mainCategory: 'medicines', description: 'For bacterial infections', prescriptionRequired: true, stock: 70, rating: 4.3, reviews: 290, popular: false, image: 'https://spmc.gov.lk/resources/149/icon.jpg' },
    { id: 10, name: 'Ibuprofen 400mg', brand: 'Cipla', price: 28, vendor: 'MedPlus', category: 'Pain Relief', mainCategory: 'medicines', description: 'Anti-inflammatory pain reliever', prescriptionRequired: false, stock: 190, rating: 4.5, reviews: 810, popular: true, image: 'http://images-its.chemistdirect.co.uk/Ibuprofen-400mg-Tablets-11670.jpg%3Fo%3DAABzI62%40e3KRLMMarXN%24NIl2Ujwj%26V%3DoT8m' },

    // Healthcare Devices - Batch 2 (11-20)
    { id: 11, name: 'Digital Blood Pressure Monitor', brand: 'Omron', price: 1499, vendor: 'Health Device Store', category: 'Blood Pressure Monitors', mainCategory: 'healthcare-devices', description: 'Automatic upper arm monitor with memory', prescriptionRequired: false, stock: 45, rating: 4.6, reviews: 320, popular: true, image: 'https://www.medisave.co.uk/cdn/shop/files/UA-651_1171x1177pxB08756SRS5.jpg?v=1704362556&width=1066' },
    { id: 12, name: 'Digital Thermometer', brand: 'Dr. Morepen', price: 299, vendor: 'WellCare Store', category: 'Thermometers', mainCategory: 'healthcare-devices', description: 'Fast and accurate temperature reading', prescriptionRequired: false, stock: 120, rating: 4.5, reviews: 450, popular: true, image: 'https://aspmedical.com/wp-content/uploads/DSCF2274.png' },
    { id: 13, name: 'Glucometer Kit', brand: 'Accu-Chek', price: 899, vendor: 'MedPlus', category: 'Glucometers', mainCategory: 'healthcare-devices', description: 'Complete diabetes monitoring kit', prescriptionRequired: false, stock: 65, rating: 4.7, reviews: 280, popular: false, image: 'https://www.sensacore.com/images/58b7971f48e3e45374c102997fb8fa8f.png' },
    { id: 14, name: 'Pulse Oximeter', brand: 'Dr. Trust', price: 1299, vendor: 'Apollo Pharmacy', category: 'Oximeters', mainCategory: 'healthcare-devices', description: 'Finger-tip oxygen saturation monitor', prescriptionRequired: false, stock: 55, rating: 4.4, reviews: 190, popular: true, image: 'https://images-na.ssl-images-amazon.com/images/I/71U-PuWCFGL._AC_SL1500_.jpg' },
    { id: 15, name: 'Portable Nebulizer', brand: 'Omron', price: 2499, vendor: 'Health Device Store', category: 'Nebulizers', mainCategory: 'healthcare-devices', description: 'Mesh technology for quick relief', prescriptionRequired: false, stock: 30, rating: 4.6, reviews: 120, popular: false, image: 'https://m.media-amazon.com/images/I/61L2Zls10NL.jpg' },

    // Personal Care - Batch 2 (16-20)
    { id: 16, name: 'Dettol Soap', brand: 'Dettol', price: 45, vendor: 'Supermarket', category: 'Bath & Shower', mainCategory: 'personal-care', description: 'Antibacterial protection soap', prescriptionRequired: false, stock: 300, rating: 4.6, reviews: 1250, popular: true, image: 'https://melcom.com/media/catalog/product/cache/d0e1b0d5c74d14bfa9f7dd43ec52d082/9/1/91548a.jpg' },
    { id: 17, name: 'Colgate Toothpaste', brand: 'Colgate', price: 85, vendor: 'Supermarket', category: 'Oral Care', mainCategory: 'personal-care', description: 'Cavity protection toothpaste', prescriptionRequired: false, stock: 250, rating: 4.7, reviews: 1800, popular: true, image: 'https://frauschmitt.co.za/wp-content/uploads/2022/05/COLGATE-REGULAR-TOOTHPASTE-100ML.jpeg' },
    { id: 18, name: 'Head & Shoulders Shampoo', brand: 'Head & Shoulders', price: 199, vendor: 'WellCare Store', category: 'Hair Care', mainCategory: 'personal-care', description: 'Anti-dandruff shampoo for daily use', prescriptionRequired: false, stock: 180, rating: 4.5, reviews: 920, popular: true, image: 'https://bf1af2.akinoncloudcdn.com/products/2024/09/10/88554/a00eadd5-3c06-40e3-bdbf-9b4664aef3aa_size3840_cropCenter.jpg' },
    { id: 19, name: 'Nivea Deodorant', brand: 'Nivea', price: 175, vendor: 'Supermarket', category: 'Deodorants', mainCategory: 'personal-care', description: '48-hour freshness protection', prescriptionRequired: false, stock: 160, rating: 4.4, reviews: 780, popular: true, image: 'https://images-us.nivea.com/-/media/miscellaneous/media-center-items/f/3/b/149966-web_1010x1180_transparent_png.png?mw=777&hash=EB9AD854C6E8697906B1D8F5F49EF1A1' },
    { id: 20, name: 'Whisper Ultra Sanitary Pads', brand: 'Whisper', price: 120, vendor: 'Apollo Pharmacy', category: 'Feminine Hygiene', mainCategory: 'personal-care', description: 'Wings for extra protection', prescriptionRequired: false, stock: 200, rating: 4.7, reviews: 1500, popular: true, image: 'https://tse2.mm.bing.net/th/id/OIP.3NAHHhSzsuRjcWXDWAq-CgHaHa?pid=Api&P=0&h=180' },

    // Skin Care - Batch 3 (21-30)
    { id: 21, name: 'Cetaphil Moisturizing Lotion', brand: 'Cetaphil', price: 399, vendor: 'SkinCare Hub', category: 'Moisturizers', mainCategory: 'skin-care', description: 'Daily advance ultra hydrating lotion', prescriptionRequired: false, stock: 95, rating: 4.8, reviews: 420, popular: true, image: 'https://store.whitecrossdispensary.com/cdn/shop/files/07300-cetaphil__82024.1677854346.1280.1280.png?v=1705732929' },
    { id: 22, name: 'Lotus Herbals Sunscreen', brand: 'Lotus Herbals', price: 299, vendor: 'SkinCare Hub', category: 'Sunscreens', mainCategory: 'skin-care', description: 'SPF 50 matte gel sunscreen', prescriptionRequired: false, stock: 110, rating: 4.5, reviews: 380, popular: true, image: 'https://images-static.nykaa.com/media/catalog/product/tr:h-800,w-800,cm-pad_resize/d/0/d0fe64b806360341001_c1.jpg' },
    { id: 23, name: 'Neutrogena Face Wash', brand: 'Neutrogena', price: 249, vendor: 'WellCare Store', category: 'Face Washes', mainCategory: 'skin-care', description: 'Deep clean oil-free face wash', prescriptionRequired: false, stock: 130, rating: 4.6, reviews: 560, popular: true, image: 'https://images.ctfassets.net/aub2fvcyp2t8/eOZWCj03cAtqHvWMWuGI2/3d76c3da389f5fc47473f44304385418/neutrogena-oil-free-acne-face-wash-pink-grapefruit-en-in' },
    { id: 24, name: 'Benzoyl Peroxide Gel', brand: 'Pernex', price: 189, vendor: 'Apollo Pharmacy', category: 'Acne Treatments', mainCategory: 'skin-care', description: 'Acne treatment gel 2.5%', prescriptionRequired: false, stock: 85, rating: 4.3, reviews: 240, popular: false, image: 'https://cdn11.bigcommerce.com/s-79bvd/images/stencil/1024x1024/products/33192/49493/Q1__27786.1605234337.jpg?c=2' },
    { id: 25, name: 'Olay Regenerist Cream', brand: 'Olay', price: 899, vendor: 'SkinCare Hub', category: 'Anti-Aging', mainCategory: 'skin-care', description: 'Anti-aging night cream', prescriptionRequired: false, stock: 60, rating: 4.7, reviews: 190, popular: false, image: 'https://tse2.mm.bing.net/th/id/OIP.CJ_x1pmtOOZH5WN9dam2cAHaGf?pid=Api&P=0&h=180' },

    // Nutrition & Supplements - Batch 3 (26-30)
    { id: 26, name: 'Vitamin D3 60K IU', brand: 'Supradyn', price: 120, vendor: 'WellCare Store', category: 'Vitamins', mainCategory: 'nutrition-supplements', description: 'Weekly dose for vitamin D deficiency', prescriptionRequired: false, stock: 150, rating: 4.6, reviews: 430, popular: true, image: 'https://m.media-amazon.com/images/I/61FNOsXN-OL._SL1500_.jpg' },
    { id: 27, name: 'Whey Protein 1kg', brand: 'MuscleBlaze', price: 1999, vendor: 'Fitness Depot', category: 'Protein Supplements', mainCategory: 'nutrition-supplements', description: '100% whey protein isolate', prescriptionRequired: false, stock: 75, rating: 4.5, reviews: 320, popular: true, image: 'https://tse4.mm.bing.net/th/id/OIP.2PbSan-_6I1jtTjRw7oybwHaHa?pid=Api&P=0&h=180' },
    { id: 28, name: 'Omega-3 Fish Oil', brand: 'HealthKart', price: 699, vendor: 'WellCare Store', category: 'Omega & Fish Oil', mainCategory: 'nutrition-supplements', description: '1000mg EPA+DHA per serving', prescriptionRequired: false, stock: 90, rating: 4.4, reviews: 210, popular: false, image: 'https://www.healthgenie.in/wp-content/uploads/2017/07/60-hnut8140-01-healthkart-original-imaesxzyz9g6hzzc-788x1383.jpeg' },
    { id: 29, name: 'Multivitamin Capsules', brand: 'Revital', price: 299, vendor: 'Apollo Pharmacy', category: 'Vitamins', mainCategory: 'nutrition-supplements', description: 'Daily multivitamin for adults', prescriptionRequired: false, stock: 120, rating: 4.5, reviews: 380, popular: true, image: 'http://themedihubpharma.in/wp-content/uploads/2024/05/Revital-H-Men-Multivitamin-Capsules-60-Cap-Pack.png' },
    { id: 30, name: 'Calcium + Vitamin D3', brand: 'Caltrate', price: 450, vendor: 'MedPlus', category: 'Minerals', mainCategory: 'nutrition-supplements', description: 'For strong bones and teeth', prescriptionRequired: false, stock: 100, rating: 4.6, reviews: 290, popular: false, image: 'https://i5.walmartimages.com/seo/Caltrate-600-D3-Plus-Minerals-Calcium-Vitamin-D-Supplement-165-Count_d4fa6d8e-f88b-44ae-a5cb-380c3afb73ed.811b683128c284527beec2e0ddfd5097.jpeg' },

    // Baby Care - Batch 4 (31-35)
    { id: 31, name: 'Pampers Premium Care Diapers', brand: 'Pampers', price: 899, vendor: 'BabyCare Store', category: 'Baby Diapers', mainCategory: 'baby-care', description: 'Super absorbent diapers size M', prescriptionRequired: false, stock: 200, rating: 4.7, reviews: 850, popular: true, image: 'https://tse4.mm.bing.net/th/id/OIP.JRLKkloNR1YJzG8zyX15YgHaHa?pid=Api&P=0&h=180' },
    { id: 32, name: 'Johnson\'s Baby Soap', brand: 'Johnson & Johnson', price: 85, vendor: 'Supermarket', category: 'Baby Soaps', mainCategory: 'baby-care', description: 'Mild baby soap with milk protein', prescriptionRequired: false, stock: 180, rating: 4.6, reviews: 720, popular: true, image: 'https://kuludonline.com/cdn/shop/files/62611.jpg?v=1703200877' },
    { id: 33, name: 'Huggies Baby Wipes', brand: 'Huggies', price: 199, vendor: 'BabyCare Store', category: 'Baby Wipes', mainCategory: 'baby-care', description: 'Alcohol-free sensitive wipes', prescriptionRequired: false, stock: 150, rating: 4.5, reviews: 480, popular: true, image: 'https://i5.walmartimages.com/seo/HUGGIES-Baby-Wipes-SOFT-Pack-Natural-Care-Original-56-Count_da7140fe-2d57-4455-b281-c4253b709ef6.3f57749ce7196b841157e4127016ca8c.jpeg' },
    { id: 34, name: 'Nestle Cerelac Stage 1', brand: 'Nestle', price: 250, vendor: 'Supermarket', category: 'Baby Foods', mainCategory: 'baby-care', description: 'Rice based cereal for 6+ months', prescriptionRequired: false, stock: 120, rating: 4.7, reviews: 390, popular: true, image: 'https://cdn-prd-02.pnp.co.za/sys-master/images/ha5/h6b/11738558726174/silo-product-image-v2-17Apr2025-180141-6009188007959-Angle_A-312035-321_400Wx400H' },
    { id: 35, name: 'Sebamed Baby Lotion', brand: 'Sebamed', price: 399, vendor: 'Apollo Pharmacy', category: 'Baby Lotions', mainCategory: 'baby-care', description: 'pH 5.5 protective lotion', prescriptionRequired: false, stock: 85, rating: 4.6, reviews: 210, popular: false, image: 'https://tse3.mm.bing.net/th/id/OIP.oasAZemQzOKJiB6kTOjKmwHaHb?pid=Api&P=0&h=180' },

    // Women Health - Batch 4 (36-40)
    { id: 36, name: 'Prega News Pregnancy Test', brand: 'Prega News', price: 99, vendor: 'WellCare Store', category: 'Pregnancy Tests', mainCategory: 'women-health', description: 'Early detection test kit', prescriptionRequired: false, stock: 130, rating: 4.5, reviews: 560, popular: true, image: 'https://m.media-amazon.com/images/I/81UD8HppRML._SL1500_.jpg' },
    { id: 37, name: 'Folic Acid Tablets', brand: 'Folvite', price: 65, vendor: 'Apollo Pharmacy', category: 'Prenatal Vitamins', mainCategory: 'women-health', description: '5mg folic acid tablets', prescriptionRequired: false, stock: 110, rating: 4.4, reviews: 320, popular: false, image: 'https://cdn01.pharmeasy.in/dam/products/247992/folvite-5mg-strip-of-45-tablets-3-1641534083.jpg' },
    { id: 38, name: 'Stayfree Secure Pads', brand: 'Stayfree', price: 110, vendor: 'Supermarket', category: 'Menstrual Care', mainCategory: 'women-health', description: 'All-night security pads', prescriptionRequired: false, stock: 180, rating: 4.6, reviews: 890, popular: true, image: 'https://i5.walmartimages.com/seo/Stayfree-Secure-Extra-Large-Cottony-Soft-Cover-Sanitary-Pads-for-Women-with-Wings-40-Pads_3bb279c9-8f15-466b-b71b-ae49af1325ac.a878bcc9481199f4b8b6f221de0f8191.jpeg' },
    { id: 39, name: 'Evion 400 Capsules', brand: 'Merck', price: 85, vendor: 'MedPlus', category: 'Women Vitamins', mainCategory: 'women-health', description: 'Vitamin E capsules for skin health', prescriptionRequired: false, stock: 140, rating: 4.5, reviews: 410, popular: true, image: 'https://meds.myupchar.com/86208/Evion-400.jpg' },
    { id: 40, name: 'MenoSure Capsules', brand: 'Dabur', price: 499, vendor: 'Apollo Pharmacy', category: 'Menopause Support', mainCategory: 'women-health', description: 'Ayurvedic support for menopause', prescriptionRequired: false, stock: 65, rating: 4.3, reviews: 120, popular: false, image: 'https://tse4.mm.bing.net/th/id/OIP.CEUjT9Pv30SgzAjEZ1N93wAAAA?pid=Api&P=0&h=180' },

    // Elderly Care - Batch 5 (41-45)
    { id: 41, name: 'Walking Stick Adjustable', brand: 'Dr. Trust', price: 799, vendor: 'Health Device Store', category: 'Walking Aids', mainCategory: 'elderly-care', description: 'Lightweight adjustable walking stick', prescriptionRequired: false, stock: 45, rating: 4.4, reviews: 95, popular: false, image: 'https://m.media-amazon.com/images/I/71vddIy0tXL._AC_SL1500_.jpg' },
    { id: 42, name: 'Adult Diapers Large', brand: 'Friends', price: 699, vendor: 'Apollo Pharmacy', category: 'Adult Diapers', mainCategory: 'elderly-care', description: 'Super absorbent adult diapers', prescriptionRequired: false, stock: 80, rating: 4.5, reviews: 180, popular: false, image: 'https://rukminim1.flixcart.com/image/832/832/ke0a7ww0/diaper/v/n/z/friends-easy-adult-diapers-extra-large-size-pack-of-3-waist-48-original-imafurkujdmbgkhh.jpeg?q=70' },
    { id: 43, name: 'Glucosamine Chondroitin', brand: 'HealthKart', price: 899, vendor: 'WellCare Store', category: 'Bone & Joint Care', mainCategory: 'elderly-care', description: 'Joint support supplement', prescriptionRequired: false, stock: 60, rating: 4.3, reviews: 110, popular: false, image: 'https://img6.hkrtcdn.com/6811/prd_681095-HealthKart-Joint-Gold-with-1500mg-of-Glucosamine-1200mg-of-Chondroitin-OP-90-tablets_o.jpg' },
    { id: 44, name: 'Eye Drops for Dry Eyes', brand: 'Refresh', price: 199, vendor: 'MedPlus', category: 'Eye Care', mainCategory: 'elderly-care', description: 'Lubricant eye drops', prescriptionRequired: false, stock: 120, rating: 4.6, reviews: 240, popular: true, image: 'https://tse3.mm.bing.net/th/id/OIP.F6PWTyNFhG8AsfauJPya0wHaHa?pid=Api&P=0&h=180' },
    { id: 45, name: 'Memory Support Supplement', brand: 'MindCare', price: 599, vendor: 'Apollo Pharmacy', category: 'Memory Support', mainCategory: 'elderly-care', description: 'Natural memory enhancement', prescriptionRequired: false, stock: 55, rating: 4.2, reviews: 85, popular: false, image: 'https://i.pinimg.com/originals/32/3d/2e/323d2e212502910b72532cddf492bc1f.jpg' },

    // Sexual Wellness - Batch 5 (46-50)
    { id: 46, name: 'Durex Condoms Extra Safe', brand: 'Durex', price: 199, vendor: 'WellCare Store', category: 'Condoms', mainCategory: 'sexual-wellness', description: 'Extra safe with lubricant', prescriptionRequired: false, stock: 150, rating: 4.7, reviews: 680, popular: true, image: 'https://media.s-bol.com/l8MY9GGLAojj/j2m4LvR/833x1200.jpg' },
    { id: 47, name: 'KY Jelly Lubricant', brand: 'Johnson & Johnson', price: 299, vendor: 'Apollo Pharmacy', category: 'Lubricants', mainCategory: 'sexual-wellness', description: 'Water-based personal lubricant', prescriptionRequired: false, stock: 95, rating: 4.5, reviews: 320, popular: true, image: 'https://www.beautymind.com.bd/wp-content/uploads/2022/04/Johnson-KY-Jelly-Personal-Lubricant-50g-1024x1024.jpg' },
    { id: 48, name: 'Sildenafil 50mg', brand: 'Cipla', price: 150, vendor: 'MedPlus', category: 'ED Treatment', mainCategory: 'sexual-wellness', description: 'For erectile dysfunction', prescriptionRequired: true, stock: 40, rating: 4.4, reviews: 160, popular: false, image: 'https://5.imimg.com/data5/SELLER/Default/2021/4/HF/DT/LW/82503847/suhagra-50-sildenafil-citrate-50-mg-1-x4-tablets-by-cipla-20-x-4-tab-pack-500x500.jpg' },
    { id: 49, name: 'Moods Condoms', brand: 'Moods', price: 149, vendor: 'WellCare Store', category: 'Condoms', mainCategory: 'sexual-wellness', description: 'Ultra thin for sensitivity', prescriptionRequired: false, stock: 120, rating: 4.6, reviews: 420, popular: true, image: 'https://m.media-amazon.com/images/I/81WKqJLSYzL.jpg' },
    { id: 50, name: 'Intimate Wash', brand: 'VWash', price: 249, vendor: 'Apollo Pharmacy', category: 'Intimate Care', mainCategory: 'sexual-wellness', description: 'pH balanced intimate hygiene', prescriptionRequired: false, stock: 110, rating: 4.5, reviews: 380, popular: true, image: 'https://m.media-amazon.com/images/I/515XXxNTDQL._SL1000_.jpg' },

    // Surgical Supplies - Batch 6 (51-55)
    { id: 51, name: 'Band-Aid Assorted Pack', brand: 'Johnson & Johnson', price: 99, vendor: 'MedPlus', category: 'Bandages', mainCategory: 'surgical-supplies', description: 'Waterproof bandages of various sizes', prescriptionRequired: false, stock: 200, rating: 4.6, reviews: 520, popular: true, image: 'https://ph-test-11.slatic.net/p/efcbb82ef97f63a216c41786a7d7ea47.jpg' },
    { id: 52, name: 'Surgical Mask N95', brand: '3M', price: 199, vendor: 'Apollo Pharmacy', category: 'Face Masks', mainCategory: 'surgical-supplies', description: 'Respiratory protection mask', prescriptionRequired: false, stock: 180, rating: 4.5, reviews: 410, popular: true, image: 'https://ppeo.com/wp-content/uploads/2023/08/3m-1860s-n95.jpg' },
    { id: 53, name: 'Disposable Gloves Latex Free', brand: 'Honeywell', price: 299, vendor: 'WellCare Store', category: 'Disposable Gloves', mainCategory: 'surgical-supplies', description: 'Powder-free examination gloves', prescriptionRequired: false, stock: 150, rating: 4.4, reviews: 290, popular: false, image: 'https://m.media-amazon.com/images/I/71rf2hbSg4L.jpg' },
    { id: 54, name: 'Sterile Gauze Pads', brand: 'Smith & Nephew', price: 149, vendor: 'MedPlus', category: 'Gauze & Dressings', mainCategory: 'surgical-supplies', description: 'Non-stick sterile gauze pads', prescriptionRequired: false, stock: 130, rating: 4.5, reviews: 180, popular: false, image: 'https://down-my.img.susercontent.com/file/my-11134207-7r98p-lszkv4msli5g11' },
    { id: 55, name: 'First Aid Kit Comprehensive', brand: 'Dr. Morepen', price: 599, vendor: 'Apollo Pharmacy', category: 'First Aid Kits', mainCategory: 'surgical-supplies', description: '150 piece first aid kit', prescriptionRequired: false, stock: 75, rating: 4.6, reviews: 210, popular: true, image: 'https://onemg.gumlet.io/l_watermark_346,w_690,h_700/a_ignore,w_690,h_700,c_pad,q_auto,f_auto/e9bb8d1332a14a009a659fcc6312b3f8.jpg' },

    // Homeopathy & Ayurveda - Batch 6 (56-60)
    { id: 56, name: 'Arnica Montana 30C', brand: 'SBL', price: 120, vendor: 'Ayurveda Store', category: 'Homeopathic Medicines', mainCategory: 'homeopathy-ayurveda', description: 'For pain, bruises and inflammation', prescriptionRequired: false, stock: 95, rating: 4.4, reviews: 160, popular: false, image: 'https://rukminim1.flixcart.com/image/416/416/kf2v3ww0/homeopathy/z/c/d/30c-90-arnica-montana-3-sbl-original-imafvm4euhb9z9fc.jpeg?q=70' },
    { id: 57, name: 'Dabur Chyawanprash', brand: 'Dabur', price: 299, vendor: 'WellCare Store', category: 'Chyawanprash', mainCategory: 'homeopathy-ayurveda', description: 'Immunity booster for all ages', prescriptionRequired: false, stock: 120, rating: 4.7, reviews: 580, popular: true, image: 'https://cdn01.pharmeasy.in/dam/products_otc/T14846/dabur-chyawanprash-2-x-immunity-500-gm-with-50-gm-free-3-1654233744.jpg' },
    { id: 58, name: 'Lavender Essential Oil', brand: 'Now Foods', price: 399, vendor: 'Ayurveda Store', category: 'Essential Oils', mainCategory: 'homeopathy-ayurveda', description: 'Pure lavender oil for relaxation', prescriptionRequired: false, stock: 85, rating: 4.5, reviews: 240, popular: true, image: 'https://s3.images-iherb.com/now/now07560/l/2.jpg' },
    { id: 59, name: 'Ashwagandha Capsules', brand: 'Himalaya', price: 249, vendor: 'Apollo Pharmacy', category: 'Ayurvedic Medicines', mainCategory: 'homeopathy-ayurveda', description: 'Stress relief and vitality support', prescriptionRequired: false, stock: 110, rating: 4.6, reviews: 320, popular: true, image: 'https://tse2.mm.bing.net/th/id/OIP.0WI8Ed9qCRfIDyCgFpiGHAHaHa?pid=Api&P=0&h=180' },
    { id: 60, name: 'Homeopathy First Aid Kit', brand: 'SBL', price: 699, vendor: 'MedPlus', category: 'Homeopathy Kits', mainCategory: 'homeopathy-ayurveda', description: '35 essential homeopathic remedies', prescriptionRequired: false, stock: 45, rating: 4.4, reviews: 95, popular: false, image: 'https://i0.wp.com/homeomart.net/wp-content/uploads/2016/06/sbl-homepathic-home_kit_sblhomk25-e1466771962542.jpg?fit=550%2C550&ssl=1' },

    // Health Foods - Batch 7 (61-65)
    { id: 61, name: 'Sugar-Free Natura', brand: 'Sugar-Free', price: 299, vendor: 'Supermarket', category: 'Sugar-Free Products', mainCategory: 'health-foods', description: 'Low calorie sweetener', prescriptionRequired: false, stock: 140, rating: 4.5, reviews: 380, popular: true, image: 'https://tse2.mm.bing.net/th/id/OIP.AKo66mg7sVxfUkfKRct1cgHaIS?pid=Api&P=0&h=180' },
    { id: 62, name: 'Quest Protein Bars', brand: 'Quest', price: 249, vendor: 'Fitness Depot', category: 'Protein Bars', mainCategory: 'health-foods', description: 'High protein low carb bars', prescriptionRequired: false, stock: 90, rating: 4.6, reviews: 210, popular: true, image: 'https://cdn.shopify.com/s/files/1/1886/1551/products/quest-oatmeal-cho-chip-bar_800x.jpg?v=1576594774' },
    { id: 63, name: 'Almonds California', brand: 'Wonderland', price: 599, vendor: 'Supermarket', category: 'Healthy Snacks', mainCategory: 'health-foods', description: 'Premium California almonds 500g', prescriptionRequired: false, stock: 75, rating: 4.7, reviews: 190, popular: false, image: 'https://rukminim1.flixcart.com/image/832/832/jwkzwy80/nut-dry-fruit/y/u/g/1000-california-almonds-1kg-pack-of-2-500g-each-pouch-wonderland-original-imafg3mqnprrb8zr.jpeg?q=70' },
    { id: 64, name: 'Ensure Nutrition Powder', brand: 'Abbott', price: 1299, vendor: 'Apollo Pharmacy', category: 'Nutrition Drinks', mainCategory: 'health-foods', description: 'Complete balanced nutrition', prescriptionRequired: false, stock: 60, rating: 4.6, reviews: 280, popular: true, image: 'https://cdn.shopify.com/s/files/1/0103/4669/2666/products/EnsureRegular850g_1600x.png?v=1641803453' },
    { id: 65, name: 'Gluten-Free Flour', brand: 'Urban Platter', price: 349, vendor: 'Supermarket', category: 'Gluten-Free', mainCategory: 'health-foods', description: 'Multi-grain gluten free flour', prescriptionRequired: false, stock: 85, rating: 4.4, reviews: 120, popular: false, image: 'https://m.media-amazon.com/images/I/71ryAEympUL._SL1200_.jpg' },

    // Additional Products - Batch 7 (66-70)
    { id: 66, name: 'Crocin Pain Relief', brand: 'GSK', price: 28, vendor: 'City Pharmacy', category: 'Pain Relief', mainCategory: 'medicines', description: 'Fast relief from headache and fever', prescriptionRequired: false, stock: 170, rating: 4.6, reviews: 740, popular: true, image: 'https://www.healthcareradius.in/cloud/2021/11/15/Crocin-Pain-Relief-pack-shot.jpg' },
    { id: 67, name: 'Vicks Vaporub', brand: 'P&G', price: 89, vendor: 'WellCare Store', category: 'Fever & Cold', mainCategory: 'medicines', description: 'Cough and cold relief ointment', prescriptionRequired: false, stock: 150, rating: 4.7, reviews: 920, popular: true, image: 'https://images.ctfassets.net/sabbecbbwaz3/6kEpUo4ITQwJRnpYwPujOq/a21b0d62521e7f3a3a5d478d8f240959/VVR_50g_Jar_Closed_header.png?w=1600' },
    { id: 68, name: 'Digene Tablets', brand: 'Abbott', price: 35, vendor: 'MedPlus', category: 'Digestive Care', mainCategory: 'medicines', description: 'Instant relief from acidity', prescriptionRequired: false, stock: 190, rating: 4.5, reviews: 680, popular: true, image: 'https://medicinebhandar.com/wp-content/uploads/2022/07/Screenshot_20220724-211330.jpg' },
    { id: 69, name: 'Liv 52 DS', brand: 'Himalaya', price: 120, vendor: 'Apollo Pharmacy', category: 'Ayurvedic Medicines', mainCategory: 'homeopathy-ayurveda', description: 'Liver support supplement', prescriptionRequired: false, stock: 110, rating: 4.6, reviews: 450, popular: true, image: 'https://himalayawellness.ae/cdn/shop/products/Liv_52_DS_-_2000x2000_3cf40f9a-986f-41d4-babf-18059bdff19d.png?v=1578655610' },
    { id: 70, name: 'Burnol Cream', brand: 'J&J', price: 65, vendor: 'MedPlus', category: 'Wound Care', mainCategory: 'surgical-supplies', description: 'Antiseptic burn cream', prescriptionRequired: false, stock: 130, rating: 4.4, reviews: 320, popular: true, image: 'https://cdn01.pharmeasy.in/dam/products/030235/burnol-cream-20gm-combo-3-1597364990.jpg' }
];

const Products = ({ 
  searchQuery, 
  setSearchQuery, 
  cart, 
  addToCart, 
  updateQuantity, 
  setActiveView 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [selectedPrescriptionProduct, setSelectedPrescriptionProduct] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [products, setProducts] = useState([]);

  // Updated Color constants with new scheme
  const colors = {
    primary: '#009688',
    mint: '#4DB6AC',
    softbg: '#E0F2F1',
    white: '#FFFFFF',
    darktext: '#124441',
    softtext: '#4F6F6B',
    success: '#4CAF50',
    warning: '#FF9800',
    danger: '#ef4444',
    info: '#2196F3'
  };

  // Enhanced category system with subcategories
  const categoryStructure = {
    'all': { name: 'All Products', icon: '' },
    'medicines': { 
      name: 'Medicines', 
      icon: '',
      subcategories: [
        'All Medicines',
        'Pain Relief',
        'Fever & Cold',
        'Antibiotics',
        'Allergy',
        'Digestive Care',
        'Cardiac Care',
        'Diabetes Care',
        'Asthma & Respiratory',
        'Prescription Drugs'
      ]
    },
    'healthcare-devices': { 
      name: 'Healthcare Devices', 
      icon: '',
      subcategories: [
        'All Devices',
        'Blood Pressure Monitors',
        'Thermometers',
        'Glucometers',
        'Nebulizers',
        'Oximeters',
        'Weighing Scales',
        'ECG Machines',
        'Stethoscopes',
        'First Aid Kits'
      ]
    },
    'personal-care': { 
      name: 'Personal Care', 
      icon: '',
      subcategories: [
        'All Personal Care',
        'Bath & Shower',
        'Oral Care',
        'Hair Care',
        'Deodorants',
        'Feminine Hygiene',
        'Shaving Needs',
        'Hand Sanitizers',
        'Face Care',
        'Body Lotions'
      ]
    },
    'skin-care': { 
      name: 'Skin Care', 
      icon: '',
      subcategories: [
        'All Skin Care',
        'Moisturizers',
        'Sunscreens',
        'Acne Treatments',
        'Anti-Aging',
        'Face Washes',
        'Serums',
        'Face Creams',
        'Night Creams',
        'Skin Toners'
      ]
    },
    'nutrition-supplements': { 
      name: 'Nutrition & Supplements', 
      icon: '',
      subcategories: [
        'All Supplements',
        'Vitamins',
        'Minerals',
        'Protein Supplements',
        'Weight Gainers',
        'Herbal Supplements',
        'Ayurvedic',
        'Omega & Fish Oil',
        'Probiotics',
        'Sports Nutrition'
      ]
    },
    'baby-care': { 
      name: 'Baby Care', 
      icon: '',
      subcategories: [
        'All Baby Care',
        'Baby Diapers',
        'Baby Wipes',
        'Baby Lotions',
        'Baby Foods',
        'Baby Soaps',
        'Baby Shampoos',
        'Baby Oil',
        'Baby Powder',
        'Feeding Essentials'
      ]
    },
    'women-health': { 
      name: 'Women Health', 
      icon: '',
      subcategories: [
        'All Women Health',
        'Pregnancy Tests',
        'Prenatal Vitamins',
        'Menstrual Care',
        'Menopause Support',
        'Breastfeeding Essentials',
        'Fertility Support',
        'Women Vitamins',
        'Intimate Hygiene',
        'Maternity Care'
      ]
    },
    'elderly-care': { 
      name: 'Elderly Care', 
      icon: '',
      subcategories: [
        'All Elderly Care',
        'Walking Aids',
        'Adult Diapers',
        'Pain Relief',
        'Bone & Joint Care',
        'Memory Support',
        'Eye Care',
        'Hearing Aids',
        'Mobility Support',
        'Comfort Care'
      ]
    },
    'sexual-wellness': { 
      name: 'Sexual Wellness', 
      icon: '',
      subcategories: [
        'All Sexual Wellness',
        'Condoms',
        'Lubricants',
        'Pregnancy Tests',
        'Fertility Tests',
        'Sexual Health Supplements',
        'Intimate Care',
        'Personal Massagers',
        'ED Treatment',
        'Contraceptives'
      ]
    },
    'surgical-supplies': { 
      name: 'Surgical Supplies', 
      icon: '',
      subcategories: [
        'All Surgical',
        'Bandages',
        'Gauze & Dressings',
        'Surgical Tapes',
        'Cotton & Swabs',
        'Disposable Gloves',
        'Face Masks',
        'Syringes',
        'Needles',
        'Wound Care'
      ]
    },
    'homeopathy-ayurveda': { 
      name: 'Homeopathy & Ayurveda', 
      icon: '',
      subcategories: [
        'All Alternative Medicine',
        'Homeopathic Medicines',
        'Ayurvedic Medicines',
        'Herbal Teas',
        'Essential Oils',
        'Ayurvedic Oils',
        'Chyawanprash',
        'Herbal Supplements',
        'Homeopathy Kits',
        'Natural Remedies'
      ]
    },
    'health-foods': { 
      name: 'Health Foods', 
      icon: '',
      subcategories: [
        'All Health Foods',
        'Sugar-Free Products',
        'Protein Bars',
        'Healthy Snacks',
        'Diet Foods',
        'Organic Products',
        'Gluten-Free',
        'Lactose-Free',
        'Energy Drinks',
        'Nutrition Drinks'
      ]
    }
  };

  useEffect(() => {
    setProducts(allProducts);
  }, []);

  // Get all subcategories from the selected main category
  const getSubcategories = () => {
    if (selectedCategory === 'all') {
      return ['all'];
    }
    const category = categoryStructure[selectedCategory];
    return category?.subcategories || ['all'];
  };

  // Filter products based on main category and subcategory
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesMainCategory = selectedCategory === 'all' || product.mainCategory === selectedCategory;
    
    const matchesSubcategory = selectedSubcategory === 'all' || 
                              selectedSubcategory === 'All ' + categoryStructure[selectedCategory]?.name.replace(' & ', ' ') || 
                              product.category === selectedSubcategory;
    
    return matchesSearch && matchesMainCategory && matchesSubcategory;
  });

  // Handle category selection
  const handleCategorySelect = (categoryKey) => {
    setSelectedCategory(categoryKey);
    setSelectedSubcategory('all');
    setIsDropdownOpen(false);
  };

  // Get quantity of product in cart
  const getProductQuantity = (productId) => {
    const cartItem = cart.find(item => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  // Handle prescription required products
  const handlePrescriptionProduct = (product) => {
    setSelectedPrescriptionProduct(product);
    setShowPrescriptionModal(true);
  };

  // Handle proceed to medicine delivery
  const handleProceedToMedicineDelivery = () => {
    setShowPrescriptionModal(false);
    setActiveView('medicine');
  };

  // Handle back to dashboard
  const handleBackToDashboard = () => {
    if (setActiveView) {
      setActiveView('dashboard');
    }
  };

  // Format price with commas
  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  // Get stock status
  const getStockStatus = (stock) => {
    if (stock > 20) return { text: 'In Stock', color: colors.success };
    if (stock > 0) return { text: 'Low Stock', color: colors.warning };
    return { text: 'Out of Stock', color: colors.danger };
  };

  // Styles
  const styles = {
    container: {
      padding: '20px',
      maxWidth: '1400px',
      margin: '0 auto',
      marginTop: '140px',
      minHeight: 'calc(100vh - 120px)',
      width: '100%',
      boxSizing: 'border-box',
      backgroundColor: colors.white
    },
    headerRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
      flexWrap: 'wrap',
      gap: '1rem'
    },
    titleSection: {
      textAlign: 'center',
      flex: 1
    },
    title: {
      color: colors.primary,
      fontSize: '2.2rem',
      margin: '0 0 0.5rem 0',
      fontWeight: '700'
    },
    subtitle: {
      color: colors.softtext,
      margin: 0,
      fontSize: '1rem'
    },
    searchSection: {
      marginBottom: '30px',
      backgroundColor: colors.white,
      padding: '25px',
      borderRadius: '12px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
      border: `1px solid ${colors.softbg}`
    },
    searchContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '25px',
      gap: '20px',
      flexWrap: 'wrap'
    },
    searchInput: {
      flex: '0 0 350px',
      padding: '15px 20px',
      border: `2px solid ${colors.softbg}`,
      borderRadius: '8px',
      fontSize: '16px',
      outline: 'none',
      transition: 'border-color 0.3s ease',
      backgroundColor: colors.white,
      color: colors.darktext
    },
    healthMessage: {
      flex: 1,
      padding: '15px 20px',
      backgroundColor: colors.softbg,
      color: colors.primary,
      borderRadius: '8px',
      fontSize: '14px',
      lineHeight: '1.5',
      fontWeight: '500',
      textAlign: 'center',
      border: `1px solid ${colors.primary}20`,
      minWidth: '300px'
    },
    // Category dropdown
    categoryDropdown: {
      position: 'relative',
      marginBottom: '20px',
      width: '40%',
      minWidth: '300px'
    },
    dropdownHeader: {
      padding: '15px 20px',
      backgroundColor: colors.white,
      border: `2px solid ${colors.primary}`,
      borderRadius: '8px',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '16px',
      fontWeight: '600',
      color: colors.primary,
      transition: 'all 0.3s ease'
    },
    dropdownIcon: {
      transition: 'transform 0.3s ease',
      transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)'
    },
    dropdownList: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      backgroundColor: colors.white,
      border: `1px solid ${colors.softbg}`,
      borderRadius: '8px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      zIndex: 100,
      maxHeight: '400px',
      overflowY: 'auto',
      display: isDropdownOpen ? 'block' : 'none'
    },
    dropdownItem: {
      padding: '12px 20px',
      borderBottom: `1px solid ${colors.softbg}`,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      transition: 'all 0.2s ease',
      color: colors.darktext,
      backgroundColor: colors.white
    },
    activeDropdownItem: {
      backgroundColor: colors.primary,
      color: colors.white
    },
    // Subcategory filter
    subcategoryFilter: {
      display: selectedCategory !== 'all' ? 'flex' : 'none',
      flexWrap: 'wrap',
      gap: '10px',
      marginTop: '15px',
      padding: '15px',
      backgroundColor: colors.softbg,
      borderRadius: '8px'
    },
    subcategoryButton: {
      padding: '8px 16px',
      border: `1px solid ${colors.primary}`,
      backgroundColor: colors.white,
      color: colors.primary,
      borderRadius: '20px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.3s ease'
    },
    activeSubcategoryButton: {
      backgroundColor: colors.primary,
      color: colors.white,
      borderColor: colors.primary
    },
    // Products Grid
    productsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '20px',
      marginTop: '20px'
    },
    productCard: {
      backgroundColor: colors.white,
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
      transition: 'all 0.3s ease',
      border: `1px solid ${colors.softbg}`,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden'
    },
    popularBadge: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      backgroundColor: colors.warning,
      color: colors.darktext,
      padding: '4px 10px',
      borderRadius: '4px',
      fontSize: '0.7rem',
      fontWeight: 'bold',
      zIndex: 1
    },
    productImageContainer: {
      height: '180px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '15px',
      overflow: 'hidden',
      borderRadius: '8px',
      backgroundColor: colors.softbg
    },
    productImage: {
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'contain',
      borderRadius: '8px'
    },
    productInfo: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    },
    productName: {
      color: colors.primary,
      fontSize: '1.1rem',
      fontWeight: '600',
      marginBottom: '8px',
      lineHeight: '1.4'
    },
    productBrand: {
      color: colors.softtext,
      fontSize: '0.9rem',
      marginBottom: '8px',
      fontWeight: '500'
    },
    productDescription: {
      color: colors.darktext,
      fontSize: '0.85rem',
      marginBottom: '15px',
      lineHeight: '1.5',
      flex: 1
    },
    productMeta: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '15px',
      flexWrap: 'wrap',
      gap: '8px'
    },
    productCategory: {
      backgroundColor: colors.softbg,
      color: colors.primary,
      padding: '4px 10px',
      borderRadius: '12px',
      fontSize: '0.75rem',
      fontWeight: '500'
    },
    prescriptionBadge: {
      backgroundColor: colors.warning,
      color: colors.darktext,
      padding: '4px 8px',
      borderRadius: '8px',
      fontSize: '0.7rem',
      fontWeight: 'bold'
    },
    stockStatus: {
      fontSize: '0.8rem',
      fontWeight: '500',
      padding: '3px 8px',
      borderRadius: '4px'
    },
    bottomSection: {
      marginTop: 'auto',
      paddingTop: '15px',
      borderTop: `1px solid ${colors.softbg}`
    },
    productPriceSection: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '0'
    },
    productPrice: {
      color: colors.primary,
      fontSize: '1.4rem',
      fontWeight: 'bold'
    },
    addToCartButton: {
      padding: '10px 20px',
      backgroundColor: colors.primary,
      color: colors.white,
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.85rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      whiteSpace: 'nowrap',
      minWidth: '100px'
    },
    prescriptionButton: {
      padding: '10px 20px',
      backgroundColor: colors.warning,
      color: colors.darktext,
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.85rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      whiteSpace: 'nowrap',
      minWidth: '100px'
    },
    disabledButton: {
      padding: '10px 20px',
      backgroundColor: colors.softtext,
      color: colors.white,
      border: 'none',
      borderRadius: '6px',
      cursor: 'not-allowed',
      fontSize: '0.85rem',
      fontWeight: '600',
      opacity: 0.6,
      whiteSpace: 'nowrap',
      minWidth: '100px'
    },
    quantityControls: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '10px',
      padding: '10px',
      backgroundColor: colors.softbg,
      borderRadius: '6px'
    },
    quantityButton: {
      width: '30px',
      height: '30px',
      border: `1px solid ${colors.primary}`,
      backgroundColor: colors.white,
      color: colors.primary,
      borderRadius: '50%',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
      flexShrink: 0
    },
    quantityDisplay: {
      fontSize: '1rem',
      fontWeight: 'bold',
      color: colors.primary,
      minWidth: '30px',
      textAlign: 'center',
      flex: 1
    },
    productCount: {
      color: colors.softtext,
      fontSize: '0.9rem',
      marginBottom: '15px',
      textAlign: 'center',
      backgroundColor: colors.white,
      padding: '10px',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      border: `1px solid ${colors.softbg}`
    },
    emptyState: {
      textAlign: 'center',
      padding: '60px 20px',
      backgroundColor: colors.white,
      borderRadius: '12px',
      color: colors.softtext,
      border: `1px solid ${colors.softbg}`
    },
    vendorInfo: {
      fontSize: '0.8rem',
      color: colors.softtext,
      marginTop: '5px'
    }
  };

  // Prescription Modal Styles
  const modalStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    },
    modal: {
      backgroundColor: colors.white,
      borderRadius: '15px',
      padding: '30px',
      maxWidth: '500px',
      width: '100%',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
      textAlign: 'center'
    },
    modalTitle: {
      color: colors.primary,
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '15px'
    },
    modalText: {
      color: colors.darktext,
      fontSize: '1rem',
      lineHeight: '1.5',
      marginBottom: '20px'
    },
    productInfo: {
      backgroundColor: colors.softbg,
      padding: '15px',
      borderRadius: '10px',
      marginBottom: '20px',
      textAlign: 'left'
    },
    productName: {
      color: colors.primary,
      fontSize: '1.1rem',
      fontWeight: 'bold',
      marginBottom: '5px'
    },
    productDetails: {
      color: colors.softtext,
      fontSize: '0.9rem',
      margin: '2px 0'
    },
    buttonGroup: {
      display: 'flex',
      gap: '15px',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    primaryButton: {
      padding: '12px 24px',
      backgroundColor: colors.primary,
      color: colors.white,
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      minWidth: '140px'
    },
    secondaryButton: {
      padding: '12px 24px',
      backgroundColor: 'transparent',
      color: colors.primary,
      border: `2px solid ${colors.primary}`,
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      minWidth: '140px'
    },
    prescriptionNote: {
      backgroundColor: colors.warning,
      color: colors.darktext,
      padding: '10px 15px',
      borderRadius: '8px',
      fontSize: '0.85rem',
      fontWeight: '500',
      marginBottom: '20px'
    }
  };

  return (
    <div style={styles.container}>
      {/* Header Row */}
      <div style={styles.headerRow}>
        <button 
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: 'transparent',
            color: colors.primary,
            border: `1px solid ${colors.primary}`,
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            transition: 'all 0.3s ease'
          }}
          onClick={handleBackToDashboard}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = colors.primary;
            e.target.style.color = colors.white;
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = colors.primary;
          }}
        >
          ← Dashboard
        </button>
        
        <div style={styles.titleSection}>
          <h1 style={styles.title}>Pharmacy & Healthcare Store </h1>
          <p style={styles.subtitle}>70+ products across 12 categories - Authentic medicines & healthcare products</p>
        </div>

        <div style={{ width: '80px' }}></div>
      </div>

      {/* Search and Filter Section */}
      <section style={styles.searchSection}>
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder=" Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
          <div style={styles.healthMessage}>
             100% Authentic Products |  Free Delivery Above ₹499 |  Certified Pharmacy
          </div>
        </div>

        {/* Category Dropdown */}
        <div style={styles.categoryDropdown}>
          <div 
            style={styles.dropdownHeader}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = colors.softbg;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = colors.white;
            }}
          >
            <span>
              {categoryStructure[selectedCategory]?.icon} 
              {categoryStructure[selectedCategory]?.name || 'Select Category'}
            </span>
            <span style={styles.dropdownIcon}>▼</span>
          </div>
          
          <div style={styles.dropdownList}>
            {Object.entries(categoryStructure).map(([key, category]) => (
              <div
                key={key}
                style={{
                  ...styles.dropdownItem,
                  ...(selectedCategory === key ? styles.activeDropdownItem : {})
                }}
                onClick={() => handleCategorySelect(key)}
                onMouseEnter={(e) => {
                  if (selectedCategory !== key) {
                    e.target.style.backgroundColor = colors.softbg;
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== key) {
                    e.target.style.backgroundColor = colors.white;
                  }
                }}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Subcategory Filter */}
        {selectedCategory !== 'all' && (
          <div style={styles.subcategoryFilter}>
            {getSubcategories().map((subcat, index) => (
              <button
                key={index}
                style={
                  selectedSubcategory === subcat 
                    ? {...styles.subcategoryButton, ...styles.activeSubcategoryButton}
                    : styles.subcategoryButton
                }
                onClick={() => setSelectedSubcategory(subcat)}
                onMouseEnter={(e) => {
                  if (selectedSubcategory !== subcat) {
                    e.target.style.backgroundColor = colors.primary;
                    e.target.style.color = colors.white;
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedSubcategory !== subcat) {
                    e.target.style.backgroundColor = colors.white;
                    e.target.style.color = colors.primary;
                  }
                }}
              >
                {subcat}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Product Count */}
      <div style={styles.productCount}>
         Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
        {selectedCategory !== 'all' && ` in ${categoryStructure[selectedCategory]?.name}`}
        {selectedSubcategory !== 'all' && ` > ${selectedSubcategory}`}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div style={styles.productsGrid}>
          {filteredProducts.map(product => {
            const quantityInCart = getProductQuantity(product.id);
            const stockStatus = getStockStatus(product.stock);
            
            return (
              <div key={product.id} style={styles.productCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
                  e.currentTarget.style.borderColor = colors.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)';
                  e.currentTarget.style.borderColor = colors.softbg;
                }}
              >
                {product.popular && <div style={styles.popularBadge}>🔥 Popular</div>}
                
                <div style={styles.productImageContainer}>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    style={styles.productImage}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23E0F2F1"/><text x="50" y="50" font-family="Arial" font-size="14" fill="%23009688" text-anchor="middle" dy=".3em">Image</text></svg>';
                    }}
                  />
                </div>
                
                <div style={styles.productInfo}>
                  <h3 style={styles.productName}>{product.name}</h3>
                  <p style={styles.productBrand}>{product.brand}</p>
                  <p style={styles.productDescription}>{product.description}</p>
                  
                  <div style={styles.productMeta}>
                    <div style={styles.productCategory}>{product.category}</div>
                    {product.prescriptionRequired && (
                      <div style={styles.prescriptionBadge}>📋 Prescription</div>
                    )}
                    <div style={{...styles.stockStatus, color: stockStatus.color}}>
                      {stockStatus.text}
                    </div>
                  </div>
                  
                  <div style={styles.vendorInfo}>Sold by: {product.vendor}</div>

                  <div style={styles.bottomSection}>
                    {product.prescriptionRequired ? (
                      <div style={styles.productPriceSection}>
                        <span style={styles.productPrice}>{formatPrice(product.price)}</span>
                        <button
                          style={product.stock > 0 ? styles.prescriptionButton : styles.disabledButton}
                          onClick={() => product.stock > 0 && handlePrescriptionProduct(product)}
                          disabled={product.stock === 0}
                          onMouseEnter={(e) => {
                            if (product.stock > 0) {
                              e.target.style.backgroundColor = colors.softbg;
                              e.target.style.color = colors.darktext;
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (product.stock > 0) {
                              e.target.style.backgroundColor = colors.warning;
                              e.target.style.color = colors.darktext;
                            }
                          }}
                        >
                          {product.stock > 0 ? '📋 Upload Rx' : 'Out of Stock'}
                        </button>
                      </div>
                    ) : quantityInCart === 0 ? (
                      <div style={styles.productPriceSection}>
                        <span style={styles.productPrice}>{formatPrice(product.price)}</span>
                        <button
                          style={product.stock > 0 ? styles.addToCartButton : styles.disabledButton}
                          onClick={() => product.stock > 0 && addToCart(product)}
                          disabled={product.stock === 0}
                          onMouseEnter={(e) => {
                            if (product.stock > 0) {
                              e.target.style.backgroundColor = colors.softbg;
                              e.target.style.color = colors.primary;
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (product.stock > 0) {
                              e.target.style.backgroundColor = colors.primary;
                              e.target.style.color = colors.white;
                            }
                          }}
                        >
                          {product.stock > 0 ? '🛒 Add to Cart' : 'Out of Stock'}
                        </button>
                      </div>
                    ) : (
                      <div style={styles.quantityControls}>
                        <button
                          style={styles.quantityButton}
                          onClick={() => updateQuantity(product.id, quantityInCart - 1)}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = colors.primary;
                            e.target.style.color = colors.white;
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = colors.white;
                            e.target.style.color = colors.primary;
                          }}
                        >
                          −
                        </button>
                        <span style={styles.quantityDisplay}>{quantityInCart}</span>
                        <button
                          style={styles.quantityButton}
                          onClick={() => updateQuantity(product.id, quantityInCart + 1)}
                          disabled={quantityInCart >= product.stock}
                          onMouseEnter={(e) => {
                            if (quantityInCart < product.stock) {
                              e.target.style.backgroundColor = colors.primary;
                              e.target.style.color = colors.white;
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (quantityInCart < product.stock) {
                              e.target.style.backgroundColor = colors.white;
                              e.target.style.color = colors.primary;
                            }
                          }}
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={styles.emptyState}>
          <h3 style={{ color: colors.primary }}>No products found</h3>
          <p>Try a different search term or category</p>
        </div>
      )}

      {/* Prescription Required Modal */}
      {showPrescriptionModal && selectedPrescriptionProduct && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <h3 style={modalStyles.modalTitle}>📋 Prescription Required</h3>
            
            <div style={modalStyles.prescriptionNote}>
              ⚠️ This medicine requires a valid doctor's prescription for purchase
            </div>

            <div style={modalStyles.productInfo}>
              <div style={modalStyles.productName}>
                {selectedPrescriptionProduct.name}
              </div>
              <div style={modalStyles.productDetails}>
                <strong>Brand:</strong> {selectedPrescriptionProduct.brand}
              </div>
              <div style={modalStyles.productDetails}>
                <strong>Price:</strong> {formatPrice(selectedPrescriptionProduct.price)}
              </div>
              <div style={modalStyles.productDetails}>
                <strong>Category:</strong> {selectedPrescriptionProduct.category}
              </div>
            </div>

            <p style={modalStyles.modalText}>
              To purchase <strong>{selectedPrescriptionProduct.name}</strong>, you need to upload a valid prescription from a registered medical practitioner. 
              This ensures your safety and compliance with medical regulations.
            </p>

            <p style={{...modalStyles.modalText, fontSize: '0.9rem', fontStyle: 'italic'}}>
              You'll be redirected to the Medicine Delivery page where you can upload your prescription and order the medicine.
            </p>

            <div style={modalStyles.buttonGroup}>
              <button
                style={modalStyles.primaryButton}
                onClick={handleProceedToMedicineDelivery}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = colors.mint;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = colors.primary;
                }}
              >
                📤 Go to Medicine Delivery
              </button>
              <button
                style={modalStyles.secondaryButton}
                onClick={() => setShowPrescriptionModal(false)}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = colors.primary;
                  e.target.style.color = colors.white;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = colors.primary;
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 

export default Products;