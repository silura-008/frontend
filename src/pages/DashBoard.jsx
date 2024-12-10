import React, { useState, useRef, useEffect } from 'react';
import {  
  ChevronLeft, 
  ChevronRight, 
  Menu,
  X
} from 'lucide-react';
import SidebarContent from '../components/SidebarContent';

const DashBoard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
 
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

      {/* DashBoard Page */}
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

          <h1 className="text-xl font-semibold flex-1">DashBoard</h1>
          
        </div>

        {/* Dashboard Section */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          hii
        </div>
      </div>
    </div>
  );
};


export default DashBoard;