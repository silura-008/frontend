import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Menu,
  X,
  Camera,
  Edit,
  Save,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import SidebarContent from '../components/SidebarContent';

// Mock API Service
const mockApiService = {
  // Simulate fetching user profile
  fetchProfile: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          userName: 'John Doe',
          avatar: '/api/placeholder/200/200',
          email: 'john.doe@example.com',
          preferences: {
            story: true,
            video: false,
            articles: true,
            books: false,
          }
        });
      }, 500);
    });
  },

  // Simulate saving profile
  saveProfile: async (profileData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Saving profile:', profileData);
        resolve({
          success: true,
          message: 'Profile updated successfully'
        });
      }, 1000);
    });
  }
};

const ProfilePage = () => {
  // Sidebar states
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // Profile states
  const [profile, setProfile] = useState(null);
  const [editedProfile, setEditedProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Edit mode state
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch profile on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        const profileData = await mockApiService.fetchProfile();
        setProfile(profileData);
        setEditedProfile({...profileData});
      } catch (err) {
        setError('Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Avatar Change Handler
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProfile(prev => ({
          ...prev,
          avatar: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Preference Toggle Handler
  const togglePreference = (key) => {
    if (isEditMode) {
      setEditedProfile(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [key]: !prev.preferences[key]
        }
      }));
    }
  };

  // Enter Edit Mode
  const enterEditMode = () => {
    setIsEditMode(true);
  };

  // Save Profile Handler
  const saveProfile = async () => {
    try {
      setIsSaving(true);
      const result = await mockApiService.saveProfile(editedProfile);
      
      if (result.success) {
        // Update the original profile with edited data
        setProfile(editedProfile);
        setIsEditMode(false);
        alert(result.message);
      }
    } catch (err) {
      alert('Failed to save profile');
    } finally {
      setIsSaving(false);
    }
  };

  // Cancel Edit Mode
  const cancelEdit = () => {
    // Reset edited profile to original profile
    setEditedProfile({...profile});
    setIsEditMode(false);
  };

  // Loading and Error States
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <RefreshCw className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-50 text-red-600">
        <div className="text-center">
          <AlertTriangle size={48} className="mx-auto mb-4" />
          <p className="text-xl">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <div className={`
        ${isSidebarOpen ? 'w-64 ' : 'w-0 '} 

        bg-white border-r transition-all duration-300 
        hidden md:block relative group 
      `}> 
        {isSidebarOpen && <SidebarContent />}
      </div>

      {/* Mobile Sidebar */}
      <div className={`
        md:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg 
        transform transition-transform duration-300
        ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <button 
          onClick={() => setIsMobileSidebarOpen(false)}
          className="absolute top-4 right-4 p-2"
        >
          <X />
        </button>
        <SidebarContent />
      </div>

      {/* Profile Page */}
      <div className="flex flex-col flex-1 relative">
        {/* Header */}
        <div className=" bg-white p-4 flex items-center border-b">
          <button 
            onClick={() => setIsMobileSidebarOpen(true)}
            className="mr-4 md:hidden"
          >
            <Menu />
          </button>
          <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="mx-3 hidden md:block"
        >
          {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
        </button>

          <h1 className="text-xl font-semibold flex-1">Profile</h1>
          
        </div>

        {/* Profile Section */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 ">
          {/* Avatar and Name Section */}
          <div className="bg-white shadow rounded-lg p-6 space-y-4">
            {/* Avatar */}
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <img 
                  src={isEditMode ? editedProfile.avatar : profile.avatar} 
                  alt="Avatar" 
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
                />
                {isEditMode && (
                  <label 
                    htmlFor="avatarUpload" 
                    className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer"
                  >
                    <Camera size={20} />
                    <input 
                      type="file" 
                      id="avatarUpload" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleAvatarChange}
                    />
                  </label>
                )}
              </div>

              {/* Name and Email */}
              <div className="text-center">
                {isEditMode ? (
                  <input 
                    type="text" 
                    value={editedProfile.userName}
                    onChange={(e) => setEditedProfile(prev => ({
                      ...prev, 
                      userName: e.target.value
                    }))}
                    className="text-xl font-semibold text-center border-b border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                ) : (
                  <h2 className="text-xl font-semibold">{profile.userName}</h2>
                )}
                <p className="text-gray-500 text-sm mt-2">{profile.email}</p>
              </div>
            </div>

            {/* Preferences Section */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Preferences</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.keys(isEditMode ? editedProfile.preferences : profile.preferences).map((key) => (
                  <div 
                    key={key} 
                    className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                  >
                    <span className="capitalize text-sm md:text-base">{key}</span>
                    <label className="flex items-center cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={isEditMode 
                            ? editedProfile.preferences[key] 
                            : profile.preferences[key]
                          }
                          onChange={() => togglePreference(key)}
                          disabled={!isEditMode}
                        />
                        <div className={`
                          w-10 h-4 rounded-full transition-colors duration-300
                          ${(isEditMode 
                            ? editedProfile.preferences[key] 
                            : profile.preferences[key]) 
                            ? 'bg-blue-500' 
                            : 'bg-gray-300'}
                        `}></div>
                        <div className={`
                          dot absolute left-0 top-1/2 transform -translate-y-1/2 
                          w-6 h-6 bg-white rounded-full shadow transition-transform duration-300
                          ${(isEditMode 
                            ? editedProfile.preferences[key] 
                            : profile.preferences[key]) 
                            ? 'translate-x-full border-blue-500' 
                            : 'border-gray-300'}
                        `}></div>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Edit/Save Button Section */}
            <div className="mt-6 flex justify-end space-x-4">
              {isEditMode ? (
                <>
                  <button 
                    onClick={cancelEdit}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={saveProfile}
                    disabled={isSaving}
                    className={`
                      flex items-center space-x-2 px-4 py-2 rounded 
                      ${isSaving 
                        ? 'bg-gray-300 cursor-not-allowed' 
                        : 'bg-blue-500 text-white hover:bg-blue-600'}
                    `}
                  >
                    {isSaving ? <RefreshCw className="animate-spin" /> : <Save />}
                    <span>Save</span>
                  </button>
                </>
              ) : (
                <button 
                  onClick={enterEditMode}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  <Edit />
                  <span>Edit</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;