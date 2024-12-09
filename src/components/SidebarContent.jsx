import React from 'react'
import SidebarItem from './SidebarItem';
import { 
    MessageSquare,
    User, 
    LayoutDashboard, 
    LogOut, 
    ThumbsUp, 
    ThumbsDown, 
    ChevronLeft, 
    ChevronRight, 
    Menu,
    Check,
    X,
    ChartArea
  } from 'lucide-react';

const SidebarContent = () => (
    <nav className="h-full  p-4 py-5 flex flex-col justify-between">
      <div className='flex flex-col gap-2'>
        <SidebarItem 
          icon={<LayoutDashboard />} 
          label="Dashboard"
        />
        <SidebarItem 
          icon={<User />} 
          label="Profile"
        />
        <SidebarItem 
          icon={<MessageSquare/>} 
          label="Chat"
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