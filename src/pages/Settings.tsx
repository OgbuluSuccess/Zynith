import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import api from '../services/api';
import type { User } from '../services/api';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  profileImage?: string;
}

// Extend the User type with additional fields
interface ExtendedUser extends User {
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  profileImage?: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  marketUpdates: boolean;
  investmentAlerts: boolean;
  promotionalEmails: boolean;
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  loginNotifications: boolean;
}

const Settings: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('profile');
  const [loading, setLoading] = useState<boolean>(false);
  
  // Profile settings
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    profileImage: ''
  });
  
  // Notification settings
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: false,
    marketUpdates: true,
    investmentAlerts: true,
    promotionalEmails: false
  });
  
  // Security settings
  const [security, setSecurity] = useState<SecuritySettings>({
    twoFactorAuth: false,
    loginNotifications: true
  });
  
  // Password change
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (user) {
      const fetchUserProfile = async () => {
        try {
          setLoading(true);
          // Get the current user profile
          const response = await api.auth.getCurrentUser();
          const extendedUser = response.data as ExtendedUser;
          
          setProfile({
            name: extendedUser.name || '',
            email: extendedUser.email || '',
            phone: extendedUser.phone || '',
            address: extendedUser.address || '',
            city: extendedUser.city || '',
            state: extendedUser.state || '',
            zipCode: extendedUser.zipCode || '',
            country: extendedUser.country || '',
            profileImage: extendedUser.profileImage || ''
          });
        } catch (error) {
          console.error('Error fetching user profile:', error);
          // Fallback to basic user info if extended profile fails
          setProfile({
            name: user.name || '',
            email: user.email || '',
            phone: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
            profileImage: ''
          });
        } finally {
          setLoading(false);
        }
      };
      
      fetchUserProfile();
      
      // Fetch notification settings
      // For now, we'll use default values
    }
  }, [user]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotifications(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setSecurity(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Update the profile via API
      await api.users.updateProfile({
        name: profile.name,
        email: profile.email,
      });
      
      // Update the user context with basic info
      if (updateUser) {
        updateUser({
          ...user,
          name: profile.name,
          email: profile.email
        });
      }
      
      showToast('Profile updated successfully!', 'success');
    } catch (error) {
      showToast('Failed to update profile. Please try again.', 'error');
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Update notification settings via API
      await api.users.updateNotificationSettings(notifications);
      
      showToast('Notification settings updated successfully!', 'success');
    } catch (error) {
      showToast('Failed to update notification settings. Please try again.', 'error');
      console.error('Error updating notification settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSecuritySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Update security settings via API
      await api.users.updateSecuritySettings(security);
      
      showToast('Security settings updated successfully!', 'success');
    } catch (error) {
      showToast('Failed to update security settings. Please try again.', 'error');
      console.error('Error updating security settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showToast('New passwords do not match!', 'error');
      setLoading(false);
      return;
    }
    
    try {
      // Update password via API
      await api.users.updatePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      
      // Reset password fields
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      showToast('Password updated successfully!', 'success');
    } catch (error) {
      showToast('Failed to update password. Please check your current password and try again.', 'error');
      console.error('Error updating password:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={`px-6 py-3 font-medium ${activeTab === 'profile' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button
            className={`px-6 py-3 font-medium ${activeTab === 'notifications' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('notifications')}
          >
            Notifications
          </button>
          <button
            className={`px-6 py-3 font-medium ${activeTab === 'security' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('security')}
          >
            Security
          </button>
          <button
            className={`px-6 py-3 font-medium ${activeTab === 'password' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('password')}
          >
            Password
          </button>
        </div>
        
        {/* Tab Content */}
        <div className="p-6">
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <form onSubmit={handleProfileSubmit}>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={profile.name}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={profile.email}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      disabled
                    />
                    <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={profile.phone}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Address Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-gray-700 mb-2">Street Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={profile.address}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="city" className="block text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={profile.city}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="state" className="block text-gray-700 mb-2">State/Province</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={profile.state}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="zipCode" className="block text-gray-700 mb-2">ZIP/Postal Code</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={profile.zipCode}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="country" className="block text-gray-700 mb-2">Country</label>
                    <select
                      id="country"
                      name="country"
                      value={profile.country}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select a country</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Japan">Japan</option>
                      <option value="China">China</option>
                      <option value="India">India</option>
                      <option value="Brazil">Brazil</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="South Africa">South Africa</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors flex items-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="mr-2">Saving...</span>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </form>
          )}
          
          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <form onSubmit={handleNotificationSubmit}>
              <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-gray-500">Receive notifications via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="emailNotifications"
                      checked={notifications.emailNotifications}
                      onChange={handleNotificationChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">SMS Notifications</h3>
                    <p className="text-sm text-gray-500">Receive notifications via text message</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="smsNotifications"
                      checked={notifications.smsNotifications}
                      onChange={handleNotificationChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Market Updates</h3>
                    <p className="text-sm text-gray-500">Receive updates about market trends and opportunities</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="marketUpdates"
                      checked={notifications.marketUpdates}
                      onChange={handleNotificationChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Investment Alerts</h3>
                    <p className="text-sm text-gray-500">Get notified about your investment performance</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="investmentAlerts"
                      checked={notifications.investmentAlerts}
                      onChange={handleNotificationChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Promotional Emails</h3>
                    <p className="text-sm text-gray-500">Receive promotional offers and newsletters</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="promotionalEmails"
                      checked={notifications.promotionalEmails}
                      onChange={handleNotificationChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors flex items-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="mr-2">Saving...</span>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    </>
                  ) : (
                    'Save Preferences'
                  )}
                </button>
              </div>
            </form>
          )}
          
          {/* Security Settings */}
          {activeTab === 'security' && (
            <form onSubmit={handleSecuritySubmit}>
              <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="twoFactorAuth"
                      checked={security.twoFactorAuth}
                      onChange={handleSecurityChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Login Notifications</h3>
                    <p className="text-sm text-gray-500">Get notified when someone logs into your account</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="loginNotifications"
                      checked={security.loginNotifications}
                      onChange={handleSecurityChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg mb-6">
                <h3 className="font-medium mb-2">Session Management</h3>
                <p className="text-sm text-gray-500 mb-4">You are currently logged in on 1 device</p>
                <button
                  type="button"
                  className="text-red-600 hover:text-red-800 font-medium"
                  onClick={() => showToast('This feature is not implemented in the demo.', 'info')}
                >
                  Log out from all devices
                </button>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors flex items-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="mr-2">Saving...</span>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    </>
                  ) : (
                    'Save Settings'
                  )}
                </button>
              </div>
            </form>
          )}
          
          {/* Password Change */}
          {activeTab === 'password' && (
            <form onSubmit={handlePasswordSubmit}>
              <h2 className="text-xl font-semibold mb-4">Change Password</h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label htmlFor="currentPassword" className="block text-gray-700 mb-2">Current Password</label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="newPassword" className="block text-gray-700 mb-2">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    minLength={8}
                  />
                  <p className="text-sm text-gray-500 mt-1">Password must be at least 8 characters long</p>
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors flex items-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="mr-2">Updating...</span>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    </>
                  ) : (
                    'Update Password'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
