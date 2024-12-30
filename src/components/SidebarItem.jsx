import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';


const SidebarItem = ({ icon, label, current = "" }) => {
  const {logout} = useAuth()
  const isActive = current === label;
  const isLogout = label == "Logout"

  const content = (
    <div className={`flex items-center space-x-3 p-2 ${isLogout ? 'hover:bg-red-200' : 'hover:bg-gray-100'} rounded-lg cursor-pointer 
      ${isActive ? 'bg-gray-100' : ''}`}
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
