import React, { useState, useEffect } from 'react';
import {  
  ChevronLeft, 
  ChevronRight, 
  Menu,
  X,
  Award
} from 'lucide-react';
import SidebarContent from '../components/SidebarContent';

const DashBoard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  const [tasks, setTasks] = useState([]);
  const [moodHistory, setMoodHistory] = useState([]);

  const [isTasksCompleted, setIsTasksCompleted] = useState(false);

  // Mock Backend Service
  const mockBackendService = {
    // Fetch Daily Tasks
    fetchDailyTasks: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { id: 1, task: 'Take a 30-minute walk', completed: false },
            { id: 2, task: 'Meditate for 10 minutes', completed: false },
            { id: 3, task: 'Call a friend', completed: false },
            { id: 4, task: 'Water a plant', completed: false }
          ]);
        }, 500);
      });
    },

    // Save Completed Tasks
    saveCompletedTasks: async (completedTasks) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('Completed Tasks:', completedTasks);
          resolve({ success: true, message: 'Tasks saved successfully' });
        }, 500);
      });
    },

    // Fetch Mood History 
    fetchMoodHistory: async () => {
      return new Promise((resolve) => {
        const today = new Date();
        
        //format the date as MM/dd
        const formatDate = (date) => {
          const month = date.getMonth() + 1; // getMonth() returns 0-indexed months
          const day = date.getDate();
          return `${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day}`;
        };

        //mood history for the last 7 days mocking
        const moodHistory = [];
        for (let i = 6; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(today.getDate() - i);
          moodHistory.push({
            date: formatDate(date),
            mood: Math.floor(Math.random() * 5) + 1 // Random mood value between 1 and 5
          });
        }

        resolve(moodHistory);
      });
    }
  };

  // Task completion handler
  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    
    setTasks(updatedTasks);
    
    // Check if all tasks are completed
    const allCompleted = updatedTasks.every(task => task.completed);
    if (allCompleted) {
      setIsTasksCompleted(true);
      mockBackendService.saveCompletedTasks(updatedTasks);
    }
  };

  // Fetching initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [tasksData, moodHistoryData] = await Promise.all([
          mockBackendService.fetchDailyTasks(),
          mockBackendService.fetchMoodHistory()
        ]);
        
        setTasks(tasksData);
        setMoodHistory(moodHistoryData);
      } catch (error) {
        console.error('Failed to fetch initial data', error);
      }
    };

    fetchInitialData();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <div className={`
        ${isSidebarOpen ? 'w-64 ' : 'w-0 '} 

        bg-white border-r transition-all duration-300 
        hidden md:block relative group 
      `}> 
        {isSidebarOpen && <SidebarContent current='Dashboard' />}
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
        <SidebarContent current='Dashboard' />
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
        <div className="grid grid-cols-1 gap-4 p-4">
          {/* mood log */}
          <div className="bg-white p-4 rounded-lg shadow">
              
          </div>
          {/* Tasks Section */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Daily Tasks</h2>
            {isTasksCompleted ? (
              <div className="text-center">
                <Award className="mx-auto text-green-500 mb-4" size={48} />
                <h3 className="text-xl font-bold text-green-600">
                  Congratulations!
                </h3>
                <p>You've completed all your tasks for today!</p>
              </div>
            ) : (
              <div>
                {tasks.map((task) => (
                  <div 
                    key={task.id} 
                    className="flex items-center mb-2"
                  >
                    <input 
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTaskCompletion(task.id)}
                      className="mr-2"
                    />
                    <span 
                      className={`
                        flex-1 
                        ${task.completed ? 'line-through text-gray-400' : ''}
                      `}
                    >
                      {task.task}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
