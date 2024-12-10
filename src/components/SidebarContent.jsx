import React from 'react'
import SidebarItem from './SidebarItem';
import { Link } from 'lucide-react'; 
import { 
    MessageSquare,
    User, 
    LayoutDashboard, 
    LogOut
  } from 'lucide-react';

const SidebarContent = ({current = " " }) => (
    <nav className="h-full  p-4 py-5 flex flex-col justify-between">
      <div className='flex flex-col gap-2'>

        
        <SidebarItem 
          icon={<LayoutDashboard />} 
          label="Dashboard"
          current={current}
        />
        <SidebarItem 
          icon={<User />} 
          label="Profile"
          current={current}
        />
        <SidebarItem 
          icon={<MessageSquare/>} 
          label="Chat"
          current={current}
        />
      </div>
      <div>
        <SidebarItem 
          icon={<LogOut />} 
         label="Logout"
        />
      </div>
      
    </nav>
  );

export default SidebarContent