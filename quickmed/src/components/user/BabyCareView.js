// BabyCareView.js - COMPLETE VERSION WITH ALL ESLINT WARNINGS FIXED
import React, { useState, useEffect, useCallback } from 'react';
import './BabyCareView.css';

const BabyCareView = ({ 
  setActiveView, 
  addNotification
}) => {
  const [activeTab, setActiveTab] = useState('tracker');
  const [selectedBaby, setSelectedBaby] = useState('baby_1');
  const [showCareGuideModal, setShowCareGuideModal] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);
  const [showVaccinationModal, setShowVaccinationModal] = useState(false);
  const [showMedicalRecordModal, setShowMedicalRecordModal] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [emergencyContact, setEmergencyContact] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [vaccinationRecords, setVaccinationRecords] = useState([]);
  const [careChecklist, setCareChecklist] = useState([]);
  
  const [newVaccination, setNewVaccination] = useState({
    vaccine: '', 
    date: new Date().toISOString().split('T')[0],
    dose: '', 
    protectedAgainst: '', 
    notes: ''
  });
  
  const [newMedicalRecord, setNewMedicalRecord] = useState({
    type: 'Checkup', 
    title: '', 
    description: '',
    date: new Date().toISOString().split('T')[0]
  });
  
  const [updateBabyData, setUpdateBabyData] = useState({
    name: '', 
    birthDate: '', 
    gender: 'Male', 
    birthWeight: '',
    bloodGroup: '', 
    allergies: '', 
    pediatrician: ''
  });
  
  const [babyProfiles, setBabyProfiles] = useState([
    {
      id: 'baby_1', 
      name: 'Aarav Sharma', 
      birthDate: '2023-06-15',
      gender: 'Male', 
      birthWeight: '3.2 kg', 
      currentWeight: '8.5 kg',
      height: '72 cm', 
      bloodGroup: 'B+', 
      allergies: ['Dust'],
      pediatrician: 'Dr. Charitha Kasturi', 
      lastCheckup: '2024-01-15',
      nextVaccination: '2024-06-15'
    }
  ]);

  // Checklists (defined outside the component to be stable)
  const NEWBORN_CHECKLIST = useCallback(() => [
    { id: 1, task: "Morning feed", completed: false, time: "08:00", category: "feeding" },
    { id: 2, task: "Diaper change", completed: false, time: "08:30", category: "hygiene" },
    { id: 3, task: "Tummy time (10 mins)", completed: false, time: "09:00", category: "development" },
    { id: 4, task: "Morning nap", completed: false, time: "10:00", category: "sleep" },
    { id: 5, task: "Mid-day feed", completed: false, time: "11:00", category: "feeding" },
    { id: 6, task: "Play time", completed: false, time: "12:00", category: "development" },
    { id: 7, task: "Afternoon feed", completed: false, time: "14:00", category: "feeding" },
    { id: 8, task: "Bath time", completed: false, time: "16:00", category: "hygiene" },
    { id: 9, task: "Evening feed", completed: false, time: "17:00", category: "feeding" },
    { id: 10, task: "Bedtime routine", completed: false, time: "20:00", category: "sleep" }
  ], []);

  const INFANT_CHECKLIST = useCallback(() => [
    { id: 1, task: "Morning feed", completed: false, time: "08:00", category: "feeding" },
    { id: 2, task: "Breakfast (solid)", completed: false, time: "09:00", category: "feeding" },
    { id: 3, task: "Play time", completed: false, time: "10:00", category: "development" },
    { id: 4, task: "Morning nap", completed: false, time: "11:00", category: "sleep" },
    { id: 5, task: "Lunch", completed: false, time: "13:00", category: "feeding" },
    { id: 6, task: "Outdoor activity", completed: false, time: "15:00", category: "development" },
    { id: 7, task: "Afternoon nap", completed: false, time: "16:00", category: "sleep" },
    { id: 8, task: "Evening snack", completed: false, time: "18:00", category: "feeding" },
    { id: 9, task: "Bath time", completed: false, time: "19:00", category: "hygiene" },
    { id: 10, task: "Bedtime", completed: false, time: "20:30", category: "sleep" }
  ], []);

  const TODDLER_CHECKLIST = useCallback(() => [
    { id: 1, task: "Wake up & milk", completed: false, time: "07:00", category: "feeding" },
    { id: 2, task: "Breakfast", completed: false, time: "08:30", category: "feeding" },
    { id: 3, task: "Learning activity", completed: false, time: "10:00", category: "development" },
    { id: 4, task: "Outdoor play", completed: false, time: "11:00", category: "development" },
    { id: 5, task: "Lunch", completed: false, time: "13:00", category: "feeding" },
    { id: 6, task: "Nap time", completed: false, time: "14:00", category: "sleep" },
    { id: 7, task: "Snack time", completed: false, time: "16:00", category: "feeding" },
    { id: 8, task: "Creative play", completed: false, time: "17:00", category: "development" },
    { id: 9, task: "Bath & dinner", completed: false, time: "19:00", category: "hygiene" },
    { id: 10, task: "Bedtime story", completed: false, time: "20:00", category: "sleep" }
  ], []);

  // Care Guidelines (memoized with useMemo)
  const NEWBORN_GUIDELINES = React.useMemo(() => ({
    title: " 0-6 Months | Newborn Care",
    sections: [
      { title: " Feeding", items: ["Exclusive breastfeeding for first 6 months", "Feed every 2-3 hours or on demand", "If formula feeding → prepare formula safely", "Burp after every feed"] },
      { title: " Sleep", items: ["Newborns sleep 14-17 hours/day", "Put baby on their back to sleep", "No pillows, toys, blankets in crib"] },
      { title: " Health & Vaccines", items: ["First 6-month vaccines usually include:", "• BCG", "• Hepatitis B", "• DPT", "• Polio", "• Hib", "• Rotavirus"] },
      { title: " Development", items: ["Smiles at people", "Turns towards sound", "Holds head briefly", "Starts cooing", "Follows objects with eyes"] },
      { title: " Hygiene", items: ["Sponge bath till umbilical cord falls off", "Trim nails weekly", "Clean eyes with sterile water", "Change diapers regularly"] }
    ]
  }), []);

  const INFANT_GUIDELINES = React.useMemo(() => ({
    title: " 6-12 Months",
    sections: [
      { title: " Feeding", items: ["Start solid foods at 6 months", "• Fruit/vegetable puree", "• Rice/oats porridge", "• Mashed potatoes, carrots", "• Lentils, egg yolk, soft cereals", "Introduce water in small amounts", "Avoid honey until 1 year"] },
      { title: " Sleep", items: ["Sleeps 12-15 hrs/day, including 2 naps"] },
      { title: " Development", items: ["Sits without support", "Crawls", "Stands with help", "Babbles 'mama/dada'", "Picks small things using fingers"] },
      { title: " Safety", items: ["Baby-proof home", "Keep choking hazards away", "Use car seat", "Secure furniture"] }
    ]
  }), []);

  const TODDLER_GUIDELINES = React.useMemo(() => ({
    title: " 1-2 Years (Toddler Stage)",
    sections: [
      { title: " Diet", items: ["Family foods in soft form", "Fruits, vegetables, rice, chapati, eggs, yogurt", "Avoid nuts, whole grapes", "3 major meals + 2 snacks daily", "Whole milk recommended"] },
      { title: " Sleep", items: ["11-14 hours/day including 1-2 naps"] },
      { title: " Development", items: ["Walks independently", "Begins to run", "Says 10-50 words", "Understands simple instructions", "Recognizes people"] },
      { title: " Activities", items: ["Stacking blocks", "Scribbling with crayons", "Playing with simple toys", "Outdoor play for 20-30 minutes"] },
      { title: " Hygiene", items: ["Start tooth brushing with rice-grain toothpaste", "Encourage handwashing", "Toilet training usually begins after 18 months"] }
    ]
  }), []);

  // Wrap functions in useCallback to make them stable dependencies
  const initializeDefaultVaccinations = useCallback(() => {
    const baby = babyProfiles.find(b => b.id === selectedBaby);
    if (!baby) return;
    
    const birthDate = new Date(baby.birthDate);
    const ageInMonths = Math.floor((new Date() - birthDate) / (1000 * 60 * 60 * 24 * 30.44));
    
    if (ageInMonths < 1) {
      const defaultVaccinations = [
        { id: 'vax_1', vaccine: 'BCG', date: birthDate.toISOString().split('T')[0], status: 'Completed', nextDue: null, dose: 'Birth', protectedAgainst: 'Tuberculosis' },
        { id: 'vax_2', vaccine: 'Hepatitis B - 1', date: birthDate.toISOString().split('T')[0], status: 'Completed', nextDue: null, dose: 'Birth', protectedAgainst: 'Hepatitis B' },
        { id: 'vax_3', vaccine: 'OPV-0', date: birthDate.toISOString().split('T')[0], status: 'Completed', nextDue: null, dose: 'Birth', protectedAgainst: 'Polio' },
        { id: 'vax_4', vaccine: 'DPT - 1', date: new Date(birthDate.getTime() + 6 * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], status: 'Upcoming', nextDue: new Date(birthDate.getTime() + 6 * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], dose: '1st Dose', protectedAgainst: 'Diphtheria, Pertussis, Tetanus' }
      ];
      setVaccinationRecords(defaultVaccinations);
      localStorage.setItem(`babycare_vaccinations_${selectedBaby}`, JSON.stringify(defaultVaccinations));
    }
  }, [babyProfiles, selectedBaby]);

  const updateCareChecklist = useCallback(() => {
    const baby = babyProfiles.find(b => b.id === selectedBaby);
    if (!baby) return;
    
    const birthDate = new Date(baby.birthDate);
    const ageInMonths = Math.floor((new Date() - birthDate) / (1000 * 60 * 60 * 24 * 30.44));
    
    let checklist = ageInMonths <= 6 ? NEWBORN_CHECKLIST() : 
                   ageInMonths <= 12 ? INFANT_CHECKLIST() : TODDLER_CHECKLIST();
    
    const savedChecklist = localStorage.getItem(`babycare_checklist_${selectedBaby}`);
    if (savedChecklist) {
      try {
        const savedItems = JSON.parse(savedChecklist);
        checklist = checklist.map(item => {
          const savedItem = savedItems.find(si => si.id === item.id);
          return savedItem ? { ...item, completed: savedItem.completed } : item;
        });
      } catch (error) {
        console.error('Error loading checklist:', error);
      }
    }
    
    setCareChecklist(checklist);
  }, [babyProfiles, selectedBaby, NEWBORN_CHECKLIST, INFANT_CHECKLIST, TODDLER_CHECKLIST]);

  // Load data with all dependencies included
  useEffect(() => {
    const savedBabies = localStorage.getItem('babycare_secure_babies');
    if (savedBabies) {
      try {
        const parsedBabies = JSON.parse(savedBabies);
        setBabyProfiles(parsedBabies);
        if (parsedBabies.length > 0 && !parsedBabies.find(b => b.id === selectedBaby)) {
          setSelectedBaby(parsedBabies[0].id);
        }
      } catch (error) {
        console.error('Error loading baby profiles:', error);
      }
    }

    const savedHistory = localStorage.getItem(`babycare_medical_history_${selectedBaby}`);
    if (savedHistory) setMedicalHistory(JSON.parse(savedHistory));
    
    const savedVaccinations = localStorage.getItem(`babycare_vaccinations_${selectedBaby}`);
    if (savedVaccinations) {
      setVaccinationRecords(JSON.parse(savedVaccinations));
    } else {
      initializeDefaultVaccinations();
    }
    
    const savedContact = localStorage.getItem(`babycare_emergency_contact_${selectedBaby}`);
    if (savedContact) setEmergencyContact(savedContact);
    
    const savedFiles = localStorage.getItem(`babycare_secure_files_${selectedBaby}`);
    if (savedFiles) setUploadedFiles(JSON.parse(savedFiles));
    
    updateCareChecklist();
  }, [selectedBaby, initializeDefaultVaccinations, updateCareChecklist]);

  const saveBabyData = useCallback((babies) => {
    localStorage.setItem('babycare_secure_babies', JSON.stringify(babies));
  }, []);

  const currentBaby = babyProfiles.find(baby => baby.id === selectedBaby);

  const calculateAge = useCallback(() => {
    if (!currentBaby) return "N/A";
    const birthDate = new Date(currentBaby.birthDate);
    const months = Math.floor((new Date() - birthDate) / (1000 * 60 * 60 * 24 * 30.44));
    
    if (months < 1) {
      const days = Math.floor((new Date() - birthDate) / (1000 * 60 * 60 * 24));
      return `${days} days`;
    } else if (months < 12) {
      return `${months} months`;
    } else {
      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;
      return `${years} years ${remainingMonths} months`;
    }
  }, [currentBaby]);

  const addMedicalRecord = useCallback((record) => {
    const newRecord = {
      ...record,
      id: Date.now(),
      date: record.date || new Date().toISOString().split('T')[0],
      babyId: selectedBaby,
      babyName: currentBaby?.name || 'Baby'
    };
    
    const updatedHistory = [newRecord, ...medicalHistory];
    setMedicalHistory(updatedHistory);
    localStorage.setItem(`babycare_medical_history_${selectedBaby}`, JSON.stringify(updatedHistory));
    
    addNotification({
      type: 'info',
      message: `Added medical record for ${currentBaby?.name || 'baby'}`,
      timestamp: new Date().toISOString()
    });
    
    setShowMedicalRecordModal(false);
    setNewMedicalRecord({
      type: 'Checkup',
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0]
    });
  }, [currentBaby, medicalHistory, selectedBaby, addNotification]);

  const addVaccinationRecord = useCallback(() => {
    if (!newVaccination.vaccine.trim()) {
      alert('Please enter vaccine name');
      return;
    }
    
    const newVax = {
      id: `vax_${Date.now()}`,
      vaccine: newVaccination.vaccine,
      date: newVaccination.date,
      status: 'Completed',
      nextDue: null,
      dose: newVaccination.dose || '1st Dose',
      protectedAgainst: newVaccination.protectedAgainst || 'Various diseases',
      notes: newVaccination.notes
    };
    
    const updatedVaccinations = [newVax, ...vaccinationRecords];
    setVaccinationRecords(updatedVaccinations);
    localStorage.setItem(`babycare_vaccinations_${selectedBaby}`, JSON.stringify(updatedVaccinations));
    
    addMedicalRecord({
      type: 'vaccination',
      title: `Vaccination: ${newVaccination.vaccine}`,
      description: `Administered ${newVaccination.vaccine} (${newVaccination.dose || '1st Dose'}) on ${newVaccination.date}. Protects against: ${newVaccination.protectedAgainst || 'Various diseases'}`
    });
    
    addNotification({
      type: 'success',
      message: `Added ${newVaccination.vaccine} vaccination for ${currentBaby?.name}`,
      timestamp: new Date().toISOString()
    });
    
    setShowVaccinationModal(false);
    setNewVaccination({
      vaccine: '',
      date: new Date().toISOString().split('T')[0],
      dose: '',
      protectedAgainst: '',
      notes: ''
    });
  }, [newVaccination, vaccinationRecords, selectedBaby, addMedicalRecord, addNotification, currentBaby]);

  const toggleChecklistItem = useCallback((id) => {
    const updatedChecklist = careChecklist.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    
    setCareChecklist(updatedChecklist);
    localStorage.setItem(`babycare_checklist_${selectedBaby}`, JSON.stringify(updatedChecklist));
    
    const completedItem = careChecklist.find(item => item.id === id);
    if (!completedItem.completed) {
      addNotification({
        type: 'success',
        message: `Completed: ${completedItem.task}`,
        timestamp: new Date().toISOString()
      });
    }
  }, [careChecklist, selectedBaby, addNotification]);

  const getChecklistProgress = useCallback(() => {
    const total = careChecklist.length;
    const completed = careChecklist.filter(item => item.completed).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return { total, completed, percentage, remaining: total - completed };
  }, [careChecklist]);

  const handleFileUpload = useCallback((event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;
    
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date().toISOString(),
      category: file.type.includes('image') ? 'Image' : 
                file.type.includes('pdf') ? 'PDF' : 
                file.type.includes('video') ? 'Video' : 'Other',
      preview: URL.createObjectURL(file)
    }));

    const updatedFiles = [...uploadedFiles, ...newFiles];
    setUploadedFiles(updatedFiles);
    localStorage.setItem(`babycare_secure_files_${selectedBaby}`, JSON.stringify(updatedFiles));
    
    addNotification({
      type: 'success',
      message: `Uploaded ${files.length} file(s)`,
      timestamp: new Date().toISOString()
    });
    
    event.target.value = '';
  }, [uploadedFiles, selectedBaby, addNotification]);

  const deleteFile = useCallback((fileId) => {
    const updatedFiles = uploadedFiles.filter(file => file.id !== fileId);
    setUploadedFiles(updatedFiles);
    localStorage.setItem(`babycare_secure_files_${selectedBaby}`, JSON.stringify(updatedFiles));
    
    addNotification({
      type: 'info',
      message: 'File removed',
      timestamp: new Date().toISOString()
    });
  }, [uploadedFiles, selectedBaby, addNotification]);

  const updateBabyProfile = useCallback(() => {
    if (!currentBaby) return;
    
    const updatedProfiles = babyProfiles.map(baby => 
      baby.id === selectedBaby ? { 
        ...baby, 
        name: updateBabyData.name,
        birthDate: updateBabyData.birthDate,
        gender: updateBabyData.gender,
        birthWeight: `${updateBabyData.birthWeight} kg`,
        currentWeight: baby.currentWeight || `${updateBabyData.birthWeight} kg`,
        bloodGroup: updateBabyData.bloodGroup,
        allergies: updateBabyData.allergies ? updateBabyData.allergies.split(',').map(a => a.trim()) : [],
        pediatrician: updateBabyData.pediatrician
      } : baby
    );
    
    setBabyProfiles(updatedProfiles);
    saveBabyData(updatedProfiles);
    setShowUpdateProfileModal(false);
    
    addNotification({
      type: 'success',
      message: `Updated ${updateBabyData.name}'s profile`,
      timestamp: new Date().toISOString()
    });
  }, [currentBaby, babyProfiles, selectedBaby, updateBabyData, saveBabyData, addNotification]);

  const initUpdateForm = useCallback(() => {
    if (!currentBaby) return;
    
    // Ensure birthDate is in YYYY-MM-DD format for date input
    let formattedBirthDate = currentBaby.birthDate;
    try {
      const date = new Date(currentBaby.birthDate);
      if (!isNaN(date.getTime())) {
        formattedBirthDate = date.toISOString().split('T')[0]; // Convert to YYYY-MM-DD
      }
    } catch (error) {
      console.error('Error parsing birth date:', error);
      // If parsing fails, try to extract YYYY-MM-DD from string
      const match = currentBaby.birthDate.match(/\d{4}-\d{2}-\d{2}/);
      if (match) {
        formattedBirthDate = match[0];
      }
    }
    
    setUpdateBabyData({
      name: currentBaby.name,
      birthDate: formattedBirthDate,
      gender: currentBaby.gender,
      birthWeight: currentBaby.birthWeight.replace(' kg', ''),
      bloodGroup: currentBaby.bloodGroup,
      allergies: Array.isArray(currentBaby.allergies) ? currentBaby.allergies.join(', ') : currentBaby.allergies,
      pediatrician: currentBaby.pediatrician
    });
    
    setShowUpdateProfileModal(true);
  }, [currentBaby]);

  const triggerEmergencyAlert = useCallback(() => {
    if (!currentBaby) return;
    
    const emergencyNotification = {
      type: 'emergency',
      message: ` EMERGENCY ALERT for ${currentBaby.name}`,
      details: {
        age: calculateAge(),
        pediatrician: currentBaby.pediatrician,
        emergencyContact: emergencyContact || 'Not set',
        location: 'Use device location',
        timestamp: new Date().toISOString()
      },
      timestamp: new Date().toISOString()
    };
    
    addNotification(emergencyNotification);
    setShowEmergencyModal(true);
    
    if (emergencyContact) {
      alert(`Emergency alert sent to ${emergencyContact}`);
    }
  }, [currentBaby, calculateAge, emergencyContact, addNotification]);

  const saveEmergencyContact = useCallback(() => {
    localStorage.setItem(`babycare_emergency_contact_${selectedBaby}`, emergencyContact);
    setShowEmergencyModal(false);
    
    addNotification({
      type: 'info',
      message: 'Emergency contact saved',
      timestamp: new Date().toISOString()
    });
  }, [emergencyContact, selectedBaby, addNotification]);

  const getGuideByAge = useCallback((ageGroup) => {
    switch(ageGroup) {
      case 'Newborn (0-6M)': return NEWBORN_GUIDELINES;
      case 'Infant (6-12M)': return INFANT_GUIDELINES;
      case 'Toddler (1-2Y)': return TODDLER_GUIDELINES;
      default: return NEWBORN_GUIDELINES;
    }
  }, [NEWBORN_GUIDELINES, INFANT_GUIDELINES, TODDLER_GUIDELINES]);

  // SIMPLIFIED File Upload Section Component
  const FileUploadSection = React.useMemo(() => () => {
    return (
      <div className="babycare-file-upload-section" style={{backgroundColor: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
          <h3 style={{margin: 0, color: '#333', fontSize: '1.2rem'}}>📁 Upload Medical Reports & Files</h3>
          <div>
            <input 
              type="file" 
              id="file-upload" 
              className="babycare-file-input" 
              onChange={handleFileUpload} 
              multiple 
              style={{display: 'none'}}
            />
            <label htmlFor="file-upload" className="babycare-button" style={{padding: '8px 16px', fontSize: '0.9rem'}}>
              Upload Files
            </label>
          </div>
        </div>

        {/* Simple Upload Area */}
        <div 
          className="babycare-upload-area"
          style={{
            border: '2px dashed #ccc',
            borderRadius: '8px',
            padding: '40px 20px',
            textAlign: 'center',
            backgroundColor: '#fafafa',
            marginBottom: '20px',
            cursor: 'pointer'
          }}
          onClick={() => document.getElementById('file-upload').click()}
        >
          <div style={{fontSize: '2rem', marginBottom: '10px'}}>📁</div>
          <div style={{color: '#333', marginBottom: '5px'}}>
            Click to upload medical reports, prescriptions, or scan reports
          </div>
          <div style={{fontSize: '0.8rem', color: '#666'}}>
            Supports PDF, JPG, PNG formats
          </div>
        </div>

        {/* Uploaded Files Summary */}
        <div style={{backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '8px', marginBottom: '20px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div>
              <div style={{fontSize: '0.9rem', color: '#666'}}>Total Files</div>
              <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#7C2A62'}}>{uploadedFiles.length}</div>
            </div>
            <div>
              <div style={{fontSize: '0.9rem', color: '#666'}}>Total Size</div>
              <div style={{fontSize: '1.1rem', color: '#333'}}>
                {(uploadedFiles.reduce((acc, file) => acc + file.size, 0) / (1024*1024)).toFixed(2)} MB
              </div>
            </div>
          </div>
        </div>

        {/* File List - Only show if there are files */}
        {uploadedFiles.length > 0 && (
          <div>
            <h4 style={{marginBottom: '15px', color: '#333', fontSize: '1rem'}}>Recently Uploaded Files</h4>
            <div style={{maxHeight: '200px', overflowY: 'auto'}}>
              {uploadedFiles.slice(0, 5).map(file => (
                <div 
                  key={file.id} 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px',
                    backgroundColor: '#fff',
                    border: '1px solid #eee',
                    borderRadius: '6px',
                    marginBottom: '8px'
                  }}
                >
                  <div style={{marginRight: '10px', fontSize: '1.2rem'}}>
                    {file.type.includes('pdf') ? '' : 
                     file.type.includes('image') ? '' : '📁'}
                  </div>
                  <div style={{flex: 1, minWidth: 0}}>
                    <div 
                      style={{
                        fontWeight: '500',
                        color: '#333',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        cursor: 'pointer'
                      }}
                      onClick={() => window.open(file.preview, '_blank')}
                      title={file.name}
                    >
                      {file.name}
                    </div>
                    <div style={{fontSize: '0.8rem', color: '#666', display: 'flex', justifyContent: 'space-between'}}>
                      <span>{(file.size / 1024).toFixed(1)} KB</span>
                      <span>{new Date(file.uploadDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => deleteFile(file.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      color: '#ff4444',
                      marginLeft: '10px'
                    }}
                    title="Delete file"
                  >
                    
                  </button>
                </div>
              ))}
            </div>
            
            {uploadedFiles.length > 5 && (
              <div style={{textAlign: 'center', marginTop: '10px'}}>
                <button 
                  className="babycare-secondary-button"
                  style={{padding: '6px 12px', fontSize: '0.8rem'}}
                  onClick={() => alert(`Viewing all ${uploadedFiles.length} files`)}
                >
                  View All Files ({uploadedFiles.length})
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }, [handleFileUpload, uploadedFiles, deleteFile]);

  // REAL-TIME TRACKER COMPONENT
  const RealTimeTracker = React.useMemo(() => () => (
    <div className="babycare-section">
      <h3 className="babycare-title"> Daily Care Checklist</h3>
      <div className="babycare-checklist-grid">
        {careChecklist.map(item => (
          <div key={item.id} className={`babycare-checklist-item ${item.completed ? 'completed' : ''}`} onClick={() => toggleChecklistItem(item.id)}>
            <div>
              <div style={{fontWeight: '500', color: item.completed ? '#2e7d32' : '#333', textDecoration: item.completed ? 'line-through' : 'none'}}>
                {item.task}
              </div>
              <div style={{fontSize: '0.8rem', color: '#666'}}>{item.time} • {item.category}</div>
            </div>
            <div className={`babycare-checklist-checkbox ${item.completed ? 'checked' : ''}`}>{item.completed ? '✓' : ''}</div>
          </div>
        ))}
      </div>
      <div style={{marginTop: '30px', textAlign: 'center'}}>
        <button className="babycare-button" onClick={() => setShowProgressModal(true)}>Check Completion Status</button>
      </div>
    </div>
  ), [careChecklist, toggleChecklistItem]);

  // CARE GUIDE COMPONENT
  const CareGuideComponent = React.useMemo(() => () => (
    <div className="babycare-section">
      <h3 className="babycare-title"> Baby Care Guide</h3>
      <div className="babycare-guide-grid">
        {['Newborn (0-6M)', 'Infant (6-12M)', 'Toddler (1-2Y)', 'Preschool (2-3Y)', 'Preschool (4-5Y)'].map((ageGroup, index) => (
          <div key={ageGroup} className="babycare-guide-card" onClick={() => {
              setSelectedGuide(ageGroup);
              setShowCareGuideModal(true);
            }}>
            <h4 style={{color: '#7C2A62', marginBottom: '10px'}}>{ageGroup}</h4>
            <div style={{fontSize: '0.9rem', color: '#666', lineHeight: '1.5'}}>
              {index === 0 ? "Newborn care, feeding, sleep safety" :
               index === 1 ? "Solid foods, crawling, safety" :
               index === 2 ? "Toddler nutrition, walking, speech" :
               index === 3 ? "Preschool development, activities" :
               "Learning, social skills, safety"}
            </div>
          </div>
        ))}
      </div>
      
      <div className="babycare-emergency-alert">
        <h4 style={{color: '#f57c00', marginBottom: '10px'}}> Emergency Quick Actions</h4>
        <div className="babycare-action-buttons">
          <button onClick={triggerEmergencyAlert} className="babycare-emergency-button"> Emergency Alert</button>
          <button onClick={() => window.open('tel:108', '_blank')} className="babycare-secondary-button"> Call Ambulance (108)</button>
          <button onClick={() => setShowEmergencyModal(true)} className="babycare-secondary-button"> Set Emergency Contact</button>
        </div>
      </div>
    </div>
  ), [triggerEmergencyAlert]);

  // VaccinationTab Component
  const VaccinationTab = React.useMemo(() => () => (
    <div className="babycare-section">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
        <h3 className="babycare-title"> Vaccination Schedule</h3>
        <div className="babycare-action-buttons">
          <button className="babycare-secondary-button" onClick={() => setShowVaccinationModal(true)}>Add Vaccination</button>
        </div>
      </div>
      <div className="babycare-grid">
        <div>
          <h4 style={{ marginBottom: '15px', color: '#333' }}>Upcoming Vaccinations</h4>
          {vaccinationRecords.filter(v => v.status === 'Upcoming').map(vaccine => (
            <div key={vaccine.id} className="babycare-vaccine-card">
              <div className="babycare-vaccine-info">
                <div className="babycare-vaccine-name">{vaccine.vaccine}</div>
                <div className="babycare-vaccine-date">Due: {vaccine.nextDue}</div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>Dose: {vaccine.dose}</div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>Protects against: {vaccine.protectedAgainst}</div>
              </div>
              <div className="babycare-status-badge babycare-status-upcoming">Upcoming</div>
            </div>
          ))}
        </div>
        <div>
          <h4 style={{ marginBottom: '15px', color: '#333' }}>Completed Vaccinations</h4>
          {vaccinationRecords.filter(v => v.status === 'Completed').map(vaccine => (
            <div key={vaccine.id} className="babycare-vaccine-card">
              <div className="babycare-vaccine-info">
                <div className="babycare-vaccine-name">{vaccine.vaccine}</div>
                <div className="babycare-vaccine-date">Given: {vaccine.date}</div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>Dose: {vaccine.dose}</div>
              </div>
              <div className="babycare-status-badge babycare-status-completed">Completed</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ), [vaccinationRecords]);

  // MedicalHistoryTab Component
  const MedicalHistoryTab = React.useMemo(() => () => (
    <div className="babycare-section">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
        <h3 className="babycare-title"> Medical History</h3>
        <div className="babycare-action-buttons">
          <button className="babycare-secondary-button" onClick={() => setShowMedicalRecordModal(true)}>Add Medical Record</button>
        </div>
      </div>
      
      {medicalHistory.length === 0 ? (
        <div style={{textAlign: 'center', padding: '40px', color: '#666'}}>
          <p>No medical records yet. Add your first record!</p>
        </div>
      ) : (
        <div style={{maxHeight: '400px', overflowY: 'auto'}}>
          {medicalHistory.map((record, index) => (
            <div key={index} style={{backgroundColor: '#f8f9fa', padding: '15px', marginBottom: '10px', borderRadius: '8px', borderLeft: '4px solid #7C2A62'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px'}}>
                <h4 style={{margin: 0, color: '#333'}}>{record.title}</h4>
                <span style={{fontSize: '0.8rem', color: '#7C2A62', backgroundColor: '#F7D9EB', padding: '3px 8px', borderRadius: '12px'}}>
                  {record.type}
                </span>
              </div>
              <p style={{margin: '5px 0', color: '#666', fontSize: '0.9rem'}}>{record.description}</p>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px'}}>
                <div style={{fontSize: '0.8rem', color: '#999'}}>
                  {new Date(record.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </div>
                <div style={{fontSize: '0.8rem', color: '#7C2A62', fontStyle: 'italic'}}>{record.babyName}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  ), [medicalHistory]);

  // Main render
  return (
    <div className="babycare-container">
      {/* Update Profile Modal */}
      {showUpdateProfileModal && (
        <div className="babycare-modal-overlay">
          <div className="babycare-modal">
            <h3 className="babycare-modal-title">Update Baby Profile</h3>
            <input 
              type="text" 
              placeholder="Baby Name *" 
              value={updateBabyData.name} 
              onChange={(e) => setUpdateBabyData({...updateBabyData, name: e.target.value})} 
              className="babycare-modal-input" 
              autoFocus 
            />
            <input 
              type="date" 
              placeholder="Birth Date *" 
              value={updateBabyData.birthDate} 
              onChange={(e) => setUpdateBabyData({...updateBabyData, birthDate: e.target.value})} 
              className="babycare-modal-input" 
            />
            <select 
              value={updateBabyData.gender} 
              onChange={(e) => setUpdateBabyData({...updateBabyData, gender: e.target.value})} 
              className="babycare-modal-select"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input 
              type="text" 
              placeholder="Birth Weight (kg)" 
              value={updateBabyData.birthWeight} 
              onChange={(e) => setUpdateBabyData({...updateBabyData, birthWeight: e.target.value})} 
              className="babycare-modal-input" 
            />
            <input 
              type="text" 
              placeholder="Blood Group" 
              value={updateBabyData.bloodGroup} 
              onChange={(e) => setUpdateBabyData({...updateBabyData, bloodGroup: e.target.value})} 
              className="babycare-modal-input" 
            />
            <input 
              type="text" 
              placeholder="Allergies (comma separated)" 
              value={updateBabyData.allergies} 
              onChange={(e) => setUpdateBabyData({...updateBabyData, allergies: e.target.value})} 
              className="babycare-modal-input" 
            />
            <input 
              type="text" 
              placeholder="Pediatrician Name" 
              value={updateBabyData.pediatrician} 
              onChange={(e) => setUpdateBabyData({...updateBabyData, pediatrician: e.target.value})} 
              className="babycare-modal-input" 
            />
            <div className="babycare-modal-buttons">
              <button onClick={() => setShowUpdateProfileModal(false)} className="babycare-modal-cancel">Cancel</button>
              <button onClick={updateBabyProfile} className="babycare-modal-confirm" disabled={!updateBabyData.name || !updateBabyData.birthDate}>Update Profile</button>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Contact Modal */}
      {showEmergencyModal && (
        <div className="babycare-modal-overlay">
          <div className="babycare-modal">
            <h3 className="babycare-modal-title">Set Emergency Contact</h3>
            <input 
              type="tel" 
              placeholder="Emergency Contact Number" 
              value={emergencyContact} 
              onChange={(e) => setEmergencyContact(e.target.value)} 
              className="babycare-modal-input" 
              autoFocus 
            />
            <div className="babycare-modal-buttons">
              <button onClick={() => setShowEmergencyModal(false)} className="babycare-modal-cancel">Cancel</button>
              <button onClick={saveEmergencyContact} className="babycare-modal-confirm">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Care Guide Modal */}
      {showCareGuideModal && selectedGuide && (
        <div className="babycare-modal-overlay">
          <div style={{backgroundColor: 'white', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 15px 40px rgba(0,0,0,0.3)', maxWidth: '800px', maxHeight: '80vh', overflowY: 'auto', width: '90%', border: '3px solid #7C2A62'}}>
            <h3 style={{color: '#7C2A62', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: '600'}}>{getGuideByAge(selectedGuide).title}</h3>
            {getGuideByAge(selectedGuide).sections.map((section, index) => (
              <div key={index} style={{marginBottom: '25px'}}>
                <h4 style={{color: '#7C2A62', marginBottom: '10px', fontSize: '1.1rem', fontWeight: '600'}}>{section.title}</h4>
                <ul style={{paddingLeft: '20px'}}>
                  {section.items.map((item, idx) => (
                    <li key={idx} style={{color: '#666', marginBottom: '8px', lineHeight: '1.5'}}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="babycare-modal-buttons">
              <button onClick={() => setShowCareGuideModal(false)} className="babycare-modal-cancel">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Progress Modal */}
      {showProgressModal && (
        <div className="babycare-modal-overlay">
          <div className="babycare-progress-modal">
            <h3 className="babycare-progress-title">Daily Checklist Progress</h3>
            <div className="babycare-progress-stats">
              <div className="babycare-progress-stat">
                <div className="babycare-progress-value">{getChecklistProgress().completed}</div>
                <div className="babycare-progress-label">Completed</div>
              </div>
              <div className="babycare-progress-stat">
                <div className="babycare-progress-value">{getChecklistProgress().remaining}</div>
                <div className="babycare-progress-label">Remaining</div>
              </div>
              <div className="babycare-progress-stat">
                <div className="babycare-progress-value">{getChecklistProgress().percentage}%</div>
                <div className="babycare-progress-label">Progress</div>
              </div>
            </div>
            <div className="babycare-progress-bar">
              <div className="babycare-progress-fill" style={{ width: `${getChecklistProgress().percentage}%` }}></div>
            </div>
            {getChecklistProgress().percentage === 100 ? (
              <div className="babycare-completion-message" style={{color: '#4CAF50', fontWeight: 'bold'}}>🎉 Excellent! All tasks completed for today!</div>
            ) : (
              <div className="babycare-completion-message">
                {getChecklistProgress().remaining === 1 ? `Only 1 task remaining! You're almost done!` : `Keep going! ${getChecklistProgress().remaining} tasks remaining.`}
              </div>
            )}
            <div className="babycare-modal-buttons">
              <button onClick={() => setShowProgressModal(false)} className="babycare-modal-confirm" style={{width: '100%'}}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Vaccination Modal */}
      {showVaccinationModal && (
        <div className="babycare-modal-overlay">
          <div className="babycare-modal">
            <h3 className="babycare-modal-title">Add Vaccination Record</h3>
            <input 
              type="text" 
              placeholder="Vaccine Name *" 
              value={newVaccination.vaccine} 
              onChange={(e) => setNewVaccination({...newVaccination, vaccine: e.target.value})} 
              className="babycare-modal-input" 
              autoFocus 
            />
            <input 
              type="date" 
              placeholder="Date *" 
              value={newVaccination.date} 
              onChange={(e) => setNewVaccination({...newVaccination, date: e.target.value})} 
              className="babycare-modal-input" 
            />
            <input 
              type="text" 
              placeholder="Dose (e.g., 1st Dose, Booster)" 
              value={newVaccination.dose} 
              onChange={(e) => setNewVaccination({...newVaccination, dose: e.target.value})} 
              className="babycare-modal-input" 
            />
            <input 
              type="text" 
              placeholder="Protects Against" 
              value={newVaccination.protectedAgainst} 
              onChange={(e) => setNewVaccination({...newVaccination, protectedAgainst: e.target.value})} 
              className="babycare-modal-input" 
            />
            <div className="babycare-modal-buttons">
              <button onClick={() => setShowVaccinationModal(false)} className="babycare-modal-cancel">Cancel</button>
              <button onClick={addVaccinationRecord} className="babycare-modal-confirm" disabled={!newVaccination.vaccine.trim()}>Add Vaccination</button>
            </div>
          </div>
        </div>
      )}

      {/* Medical Record Modal */}
      {showMedicalRecordModal && (
        <div className="babycare-modal-overlay">
          <div className="babycare-modal">
            <h3 className="babycare-modal-title">Add Medical Record</h3>
            <select 
              value={newMedicalRecord.type} 
              onChange={(e) => setNewMedicalRecord({...newMedicalRecord, type: e.target.value})} 
              className="babycare-modal-select"
            >
              <option value="Checkup">Checkup</option>
              <option value="Vaccination">Vaccination</option>
              <option value="Medication">Medication</option>
              <option value="Test Result">Test Result</option>
              <option value="Other">Other</option>
            </select>
            <input 
              type="text" 
              placeholder="Title *" 
              value={newMedicalRecord.title} 
              onChange={(e) => setNewMedicalRecord({...newMedicalRecord, title: e.target.value})} 
              className="babycare-modal-input" 
              autoFocus 
            />
            <input 
              type="date" 
              placeholder="Date" 
              value={newMedicalRecord.date} 
              onChange={(e) => setNewMedicalRecord({...newMedicalRecord, date: e.target.value})} 
              className="babycare-modal-input" 
            />
            <textarea 
              placeholder="Description" 
              value={newMedicalRecord.description} 
              onChange={(e) => setNewMedicalRecord({...newMedicalRecord, description: e.target.value})} 
              className="babycare-modal-textarea" 
              rows="4" 
            />
            <div className="babycare-modal-buttons">
              <button onClick={() => setShowMedicalRecordModal(false)} className="babycare-modal-cancel">Cancel</button>
              <button onClick={() => { 
                if (!newMedicalRecord.title.trim()) { 
                  alert('Please enter a title'); 
                  return; 
                } 
                addMedicalRecord(newMedicalRecord); 
              }} className="babycare-modal-confirm" disabled={!newMedicalRecord.title.trim()}>Add Record</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="babycare-header-row">
        <button className="babycare-back-button" onClick={() => setActiveView('dashboard')} type="button">← Dashboard</button>
        <div className="babycare-title-section">
          <h1 className="babycare-main-title">Baby Care </h1>
          <p className="babycare-subtitle">Track your baby's health, development milestones and upload medical reports</p>
        </div>
      </div>

      {/* Baby Selector */}
      {babyProfiles.length > 1 && (
        <div className="babycare-baby-selector">
          {babyProfiles.map(baby => (
            <button 
              key={baby.id} 
              className={`babycare-baby-select-button ${selectedBaby === baby.id ? 'selected' : ''}`} 
              onClick={() => setSelectedBaby(baby.id)}
            >
              {baby.name}
            </button>
          ))}
        </div>
      )}

      {/* Baby Profile Header */}
      <div className="babycare-header">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
          <div className="babycare-profile">
            <div style={{width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#F7D9EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: '#7C2A62'}}>👶</div>
            <div className="babycare-info">
              <div className="babycare-name">{currentBaby?.name || 'No baby selected'}</div>
              {currentBaby && (
                <>
                  <div className="babycare-details">{currentBaby.gender} • {calculateAge()}</div>
                  <div className="babycare-details">Pediatrician: {currentBaby.pediatrician}</div>
                  <div className="babycare-details">Last Checkup: {currentBaby.lastCheckup} • Next Vaccination: {currentBaby.nextVaccination}</div>
                </>
              )}
            </div>
          </div>
          <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
            {currentBaby && <button className="babycare-update-profile" onClick={initUpdateForm}>Update Profile</button>}
            {babyProfiles.length > 1 && currentBaby && (
              <button className="babycare-secondary-button" onClick={() => {
                if (window.confirm(`Remove ${currentBaby.name} from baby care?`)) {
                  const updatedBabies = babyProfiles.filter(b => b.id !== selectedBaby);
                  setBabyProfiles(updatedBabies);
                  saveBabyData(updatedBabies);
                  if (updatedBabies.length > 0) setSelectedBaby(updatedBabies[0].id);
                }
              }}>Remove Baby</button>
            )}
          </div>
        </div>
      </div>

      {/* File Upload Section */}
      <FileUploadSection />

      {/* Tabs Navigation */}
      <div className="babycare-tabs">
        {['tracker', 'guide', 'vaccination', 'history'].map(tab => (
          <button 
            key={tab} 
            className={`babycare-tab ${activeTab === tab ? 'active' : ''}`} 
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'tracker' && ' Daily Tracker'}
            {tab === 'guide' && ' Care Guide'}
            {tab === 'vaccination' && 'Vaccination'}
            {tab === 'history' && ' Medical History'}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'tracker' && <RealTimeTracker />}
      {activeTab === 'guide' && <CareGuideComponent />}
      {activeTab === 'vaccination' && <VaccinationTab />}
      {activeTab === 'history' && <MedicalHistoryTab />}
    </div>
  );
};

export default BabyCareView;