import React from 'react'

const SidebarItem = ({ icon, label}) => (
    <div className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
      {icon}
      {<span className="text-sm">{label}</span>}
    </div>
  );

export default SidebarItem