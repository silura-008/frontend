import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Menu,
  X,
  Edit,
  Save,
  Loader2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import SidebarContent from '../components/SidebarContent';
import Error from '../components/Error';
import axiosAuthInstance from '../utils/axiosAuthInstance';

const countries = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 
  'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 
  'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 
  'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 
  'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 
  'Cambodia', 'Cameroon', 'Canada', 'Central African Republic', 'Chad', 
  'Chile', 'China', 'Colombia', 'Comoros', 'Congo, Democratic Republic of the', 
  'Congo, Republic of the', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 
  'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 
  'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 
  'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France', 
  'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 
  'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 
  'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 
  'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 
  'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, North', 
  'Korea, South', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 
  'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 
  'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 
  'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 
  'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 
  'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 
  'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 
  'Nicaragua', 'Niger', 'Nigeria', 'North Macedonia', 'Norway', 
  'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 
  'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 
  'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 
  'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 
  'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 
  'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 
  'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 
  'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 
  'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 
  'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 
  'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 
  'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 
  'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 
  'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 
  'Yemen', 'Zambia', 'Zimbabwe'
];

const DEFAULT_COUNTRY = 'Country';
const MAX_LENGTH = 20;

const ProfilePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [status, setStatus] = useState('loading');
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    country: ''
  });
  const [preferences, setPreferences] = useState({
    on_sad: {},
    on_angry: {},
    on_anxious: {},
    on_fear: {}
  });
  const [expandedMood, setExpandedMood] = useState(null);
  const [editedProfile, setEditedProfile] = useState(null);
  const [editedPreferences, setEditedPreferences] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    setStatus('loading');
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      const [profileRes, prefRes] = await Promise.all([
        axiosAuthInstance.get('/api/get_profile/'),
        axiosAuthInstance.get('/api/get_preference/')
      ]);
      
      setProfile(profileRes.data);
      setEditedProfile({...profileRes.data});
      setPreferences(prefRes.data);
      setEditedPreferences({...prefRes.data});
      setStatus('success');
    } catch (error) {
      console.error('Failed to fetch User Info:', error);
      setStatus('error');
    }
  };

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
      if (!countries.includes(editedProfile.country)) {
        setEditedProfile(prev => ({
          ...prev,
          country: DEFAULT_COUNTRY
        }));
      }
      setIsSaving(true);
      const response = await axiosAuthInstance.put('/api/update_profile/', {
        name: editedProfile.name.slice(0, MAX_LENGTH),
        country: countries.includes(editedProfile.country) ? 
          editedProfile.country : DEFAULT_COUNTRY,
        on_sad: editedPreferences.on_sad,
        on_angry: editedPreferences.on_angry,
        on_anxious: editedPreferences.on_anxious,
        on_fear: editedPreferences.on_fear
      });
      
      if (response.data.success) {
        setIsEditMode(false);
        setProfile(editedProfile);
        setPreferences(editedPreferences);
      }
    } catch (error) {
      alert('Failed to save profile');
      setEditedProfile(profile);
      setEditedPreferences(preferences);
    } finally {
      setIsSaving(false);
      setIsEditMode(false);
    }
  };

  const cancelEdit = () => {
    setEditedProfile({...profile});
    setEditedPreferences({...preferences});
    setIsEditMode(false);
    setFilteredCountries([]);
  };

  const renderContent = () => {
    if (status === 'loading') {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin mx-auto text-[#04a298]" />
          </div>
        </div>
      );
    }

    if (status === 'error') {
      return <Error /> ;
    }

    return (
      <div className="flex-1 overflow-y-auto p-6">
        <div className="bg-white shadow rounded-lg p-6 space-y-6">
          {/* Basic Info Section */}
          <div className="text-center space-y-4">
            {isEditMode ? (
              <input 
                type="text" 
                value={editedProfile.name}
                onChange={(e) => setEditedProfile(prev => ({
                  ...prev, 
                  name: e.target.value.slice(0, MAX_LENGTH)
                }))}
                maxLength={MAX_LENGTH}
                className="text-xl font-semibold text-center border-b border-gray-300 focus:outline-none focus:border-[#04a298]"
              />
            ) : (
              <h2 className="text-xl font-semibold text-[#00413d]">{profile.name}</h2>
            )}
            <p className="text-gray-500">{profile.email}</p>

            {/* Country Selection */}
            <div className="relative max-w-xs mx-auto">
              {isEditMode ? (
                <>
                  <input 
                    type="text" 
                    value={editedProfile.country}
                    onChange={handleCountryChange}
                    placeholder="Select country"
                    maxLength={MAX_LENGTH}
                    className="w-full text-center border-b border-gray-300 focus:outline-none focus:border-[#04a298]"
                  />
                  {filteredCountries.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                      {filteredCountries.map((country) => (
                        <div
                          key={country}
                          className="px-4 py-2 hover:bg-[#f8fafa] cursor-pointer text-left"
                          onClick={() => selectCountry(country)}
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
            <h3 className="text-lg font-semibold mb-4 text-[#00413d]">Coping Preferences</h3>
            
            {/* Mood-based Preferences */}
            <div className="space-y-2">
              {[ 'sad', 'angry', 'anxious', 'fear'].map((mood) => (
                <div key={mood} className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleMood(`on_${mood}`)}
                    className={`w-full flex items-center justify-between p-4 hover:bg-[#f0f7f7] ${expandedMood === `on_${mood}` ? 'bg-[#f0f7f7]' : 'bg-[#f8f8fa]'}`}
                  >
                    <span className="text-sm font-medium capitalize">When {mood}</span>
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
                          className="flex items-center justify-between bg-[#f8fafa] p-3 rounded-lg"
                        >
                          <span className="capitalize text-sm text-[#00413d]">{key}</span>
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
                                ${value ? 'bg-[#04a290]' : 'bg-gray-300'}
                              `}></div>
                              <div className={`
                                dot absolute left-0 top-1/2 transform -translate-y-1/2 
                                w-6 h-6 bg-white rounded-full shadow transition-transform duration-300
                                ${value ? 'translate-x-full border-[#04a298]' : 'border-gray-300'}
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
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-[#047a6d] hover:text-white"
                >
                  Cancel
                </button>
                <button 
                  onClick={saveProfile}
                  disabled={isSaving}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded text-white
                    ${isSaving ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#047a6d] hover:bg-[#00413d]'}
                  `}
                >
                  {isSaving ? <Loader2 className="animate-spin" /> : <Save />}
                  <span>Save</span>
                </button>
              </>
            ) : (
              <button 
                onClick={enterEditMode}
                className="flex items-center space-x-2 px-4 py-2 bg-[#00413d] hover:bg-[#047a6d] text-white rounded"
              >
                <Edit />
                <span>Edit</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-[#f8fafa]">
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
          className="absolute top-5 right-1 p-2 z-10 w-10 h-10 shadow-sm  bg-white rounded-full"
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
          <h1 className="text-xl font-semibold flex-1 text-[#00413d]">Profile</h1>
        </div>

        {/* Render content based on status */}
        {renderContent()}
      </div>
    </div>
  );
};

export default ProfilePage;