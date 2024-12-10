import React from 'react';
import { Link } from 'react-router-dom';

const SidebarItem = ({ icon, label, current = "" }) => {
  const isActive = current === label;

  const content = (
    <div className={`flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer 
      ${isActive ? 'bg-gray-100' : ''}`}>
      {icon}
      <span className="text-sm">{label}</span>
    </div>
  );

  return !isActive ? (
    <Link to={`/${label}`}>
      {content}
    </Link>
  ) : (
    content
  );
};

export default SidebarItem;
