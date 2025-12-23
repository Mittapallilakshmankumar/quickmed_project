// utils/userManagement.js
export const getAllUsers = () => {
  const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
  const mockUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
  return [...registeredUsers, ...mockUsers];
};

export const findUserByPhone = (phone) => {
  const allUsers = getAllUsers();
  const cleanPhone = phone.replace(/\D/g, '');
  
  return allUsers.filter(user => {
    const userPhone = user.phone?.replace(/\D/g, '');
    return userPhone === cleanPhone;
  });
};

export const getPrimaryUser = (phone) => {
  const users = findUserByPhone(phone);
  return users.find(user => user.userType === 'user');
};

export const canUserAccessAsRole = (phone, role) => {
  const users = findUserByPhone(phone);
  
  // Check if direct role exists
  const directAccess = users.some(user => user.userType === role);
  if (directAccess) return true;
  
  // Check if primary user has linked accounts
  const primaryUser = users.find(user => user.userType === 'user');
  if (primaryUser?.linkedAccounts?.includes(role)) {
    return true;
  }
  
  return false;
};

export const createLinkedSession = (primaryUser, role) => {
  const permissions = {
    guardian: ['view_dependent_records', 'book_appointments', 'track_deliveries', 'emergency_access'],
    wife: ['view_family_records', 'book_appointments', 'order_medicines', 'manage_prescriptions', 'emergency_access']
  };
  
  return {
    ...primaryUser,
    userType: role,
    isLinkedAccount: true,
    linkedFrom: primaryUser.id,
    permissions: permissions[role] || [],
    originalUserType: primaryUser.userType
  };
};