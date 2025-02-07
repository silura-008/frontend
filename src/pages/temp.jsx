import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Menu,
  X,
  Edit,
  Save,
  Loader2,
  AlertTriangle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import SidebarContent from '../components/SidebarContent';

// Backend service functions
const apiService = {
  fetchProfile: async () => {
    // TODO: Implement actual API call
    // return await fetch('/api/profile').then(res => res.json());
    
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          profile: {
            userName: 'John Doe',
            email: 'john.doe@example.com',
            country: 'United States'
          },
          on_happy: {
            story: true,
            video: false,
            articles: true,
            books: false,
          },
          on_sad: {
            story: false,
            video: true,
            articles: true,
            books: true,
          },
          on_angry: {
            story: true,
            video: true,
            articles: false,
            books: false,
          },
          on_anxious: {
            story: false,
            video: false,
            articles: true,
            books: true,
          },
          on_fear: {
            story: true,
            video: true,
            articles: true,
            books: false,
          }
        });
      }, 500);
    });
  },

  updateProfile: async (profileData) => {
    // TODO: Implement actual API call
    // return await fetch('/api/profile/update', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(profileData)
    // }).then(res => res.json());
    
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Profile updated successfully'
        });
      }, 1000);
    });
  }
};

// List of countries for autocomplete
const countries = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 
  'Japan', 'India', 'Brazil', 'South Africa'
]; // Add more countries as needed
const DEFAULT_COUNTRY = 'United States';

const MAX_LENGTH = 20;

const ProfilePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // Separate state for profile and preferences
  const [profile, setProfile] = useState({
    userName: '',
    email: '',
    country: ''
  });

  const [preferences, setPreferences] = useState({
    on_happy: {},
    on_sad: {},
    on_angry: {},
    on_anxious: {},
    on_fear: {}
  });

  const [expandedMood, setExpandedMood] = useState(null);
  const [editedProfile, setEditedProfile] = useState(null);
  const [editedPreferences, setEditedPreferences] = useState(null);
  const [error, setError] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await apiService.fetchProfile();
        setProfile(data.profile);
        setEditedProfile({...data.profile});
        
        const { on_happy, on_sad, on_angry, on_anxious, on_fear } = data;
        const prefs = { on_happy, on_sad, on_angry, on_anxious, on_fear };
        setPreferences(prefs);
        setEditedPreferences({...prefs});
      } catch (err) {
        setError('Failed to load profile');
      }
    };

    fetchUserProfile();
  }, []);

  const handleCountryChange = (e) => {
    const value = e.target.value;
    setEditedProfile(prev => ({
      ...prev,
      country: value
    }));
    
    if (value) {
      const filtered = countries.filter(country => 
        country.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries([]);
    }
  };

  const selectCountry = (country) => {
    setEditedProfile(prev => ({
      ...prev,
      country: country
    }));
    setFilteredCountries([]);
  };

  const togglePreference = (mood, key) => {
    if (isEditMode) {
      setEditedPreferences(prev => ({
        ...prev,
        [mood]: {
          ...prev[mood],
          [key]: !prev[mood][key]
        }
      }));
    }
  };

  const toggleMood = (mood) => {
    setExpandedMood(expandedMood === mood ? null : mood);
  };

  const enterEditMode = () => {
    setIsEditMode(true);
  };

  const saveProfile = async () => {
    try {
      // Validate country before saving
      if (!countries.includes(editedProfile.country)) {
        setEditedProfile(prev => ({
          ...prev,
          country: DEFAULT_COUNTRY
        }));
      }
  
      setIsSaving(true);
      const result = await apiService.updateProfile({
        profile: {
          ...editedProfile,
          userName: editedProfile.userName.slice(0, MAX_LENGTH),
          country: countries.includes(editedProfile.country) ? 
            editedProfile.country : DEFAULT_COUNTRY
        },
        preferences: editedPreferences
      });
      
      if (result.success) {
        setProfile({
          ...editedProfile,
          country: countries.includes(editedProfile.country) ? 
            editedProfile.country : DEFAULT_COUNTRY
        });
        setPreferences(editedPreferences);
        setIsEditMode(false);
        alert(result.message);
      }
    } catch (err) {
      alert('Failed to save profile');
    } finally {
      setIsSaving(false);
    }
  };

  const cancelEdit = () => {
    setEditedProfile({...profile});
    setEditedPreferences({...preferences});
    setIsEditMode(false);
    setFilteredCountries([]);
  };

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
        ${isSidebarOpen ? 'w-64' : 'w-0'} 
        bg-white border-r transition-all duration-300 
        hidden md:block relative
      `}> 
        {isSidebarOpen && <SidebarContent current='Profile' />}
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
        <SidebarContent current='Profile'/>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white p-4 flex items-center border-b">
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

        {/* Profile Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="bg-white shadow rounded-lg p-6 space-y-6">
            {/* Basic Info Section */}
            <div className="text-center space-y-4">
            {isEditMode ? (
  <input 
    type="text" 
    value={editedProfile.userName}
    onChange={(e) => setEditedProfile(prev => ({
      ...prev, 
      userName: e.target.value.slice(0, MAX_LENGTH)
    }))}
    maxLength={MAX_LENGTH}
    className="text-xl font-semibold text-center border-b border-gray-300 focus:outline-none focus:border-blue-500"
  />
) : (
  <h2 className="text-xl font-semibold">{profile.userName}</h2>
)}
              <p className="text-gray-500">{profile.email}</p>

              {/* Country Selection */}
              <div className="relative max-w-xs mx-auto">
              {isEditMode ? (
  <>
    <input 
      type="text" 
      value={editedProfile.country}
      onChange={(e) => {
        const value = e.target.value.slice(0, MAX_LENGTH);
        setEditedProfile(prev => ({
          ...prev,
          country: value
        }));
        if (value) {
          const filtered = countries.filter(country => 
            country.toLowerCase().includes(value.toLowerCase())
          );
          setFilteredCountries(filtered);
        } else {
          setFilteredCountries([]);
        }
      }}
      placeholder="Select country"
      maxLength={MAX_LENGTH}
      className="w-full text-center border-b border-gray-300 focus:outline-none focus:border-blue-500"
    />
    {filteredCountries.length > 0 && (
      <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
        {filteredCountries.map((country) => (
          <div
            key={country}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-left"
            onClick={() => {
              setEditedProfile(prev => ({
                ...prev,
                country: country
              }));
              setFilteredCountries([]);
            }}
          >
            {country}
          </div>
        ))}
      </div>
    )}
  </>
) : (
  <p className="text-gray-600">{profile.country}</p>
)}
              </div>
            </div>

            {/* Preferences Section */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Preferences</h3>
              
              {/* Mood-based Preferences */}
              <div className="space-y-2">
                {['happy', 'sad', 'angry', 'anxious', 'fear'].map((mood) => (
                  <div key={mood} className="border rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleMood(`on_${mood}`)}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100"
                    >
                      <span className="text-sm font-medium capitalize">On {mood}</span>
                      {expandedMood === `on_${mood}` ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    
                    {expandedMood === `on_${mood}` && (
                      <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.entries(isEditMode ? 
                          editedPreferences[`on_${mood}`] : 
                          preferences[`on_${mood}`]
                        ).map(([key, value]) => (
                          <div 
                            key={key} 
                            className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                          >
                            <span className="capitalize text-sm">{key}</span>
                            <label className="flex items-center cursor-pointer">
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  className="sr-only"
                                  checked={value}
                                  onChange={() => togglePreference(`on_${mood}`, key)}
                                  disabled={!isEditMode}
                                />
                                <div className={`
                                  w-10 h-4 rounded-full transition-colors duration-300
                                  ${value ? 'bg-blue-500' : 'bg-gray-300'}
                                `}></div>
                                <div className={`
                                  dot absolute left-0 top-1/2 transform -translate-y-1/2 
                                  w-6 h-6 bg-white rounded-full shadow transition-transform duration-300
                                  ${value ? 'translate-x-full border-blue-500' : 'border-gray-300'}
                                `}></div>
                              </div>
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 mt-6">
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
                      ${isSaving ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}
                    `}
                  >
                    {isSaving ? <Loader2 className="animate-spin" /> : <Save />}
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