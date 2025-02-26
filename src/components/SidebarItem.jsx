import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';


const SidebarItem = ({ icon, label, current = "" }) => {
  const {logout} = useAuth()
  const isActive = current === label;
  const isLogout = label == "Logout"

  const content = (
    <div className={`flex items-center space-x-3 p-2 transition duration-100 ease-in-out transform hover:scale-[1.02] ${isLogout ? 'hover:bg-red-200' : 'hover:bg-[#15706a] hover:text-white '} rounded-lg cursor-pointer 
      ${isActive ? 'bg-[#15706a] text-white' : ''}`}
      onClick={() => isLogout && logout()} >
      {icon}
      <span className="text-sm">{label}</span>
    </div>
  );

  return (!isActive && !isLogout) ? (
    <Link to={`/${label}`}>
      {content}
    </Link>
  ) : (
    content
  );
};

export default SidebarItem;
