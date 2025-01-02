import React, { useState, useEffect } from 'react';
import axiosAuthInstance from '../utils/axiosAuthInstance';
import {  
  ChevronLeft, 
  ChevronRight, 
  Menu,
  X,
  Award,
  Smile,
  Angry,
  Frown,
  Annoyed



} from 'lucide-react';
import SidebarContent from '../components/SidebarContent';
import { format, subDays } from 'date-fns';

const DashBoard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  const [tasks, setTasks] = useState([]);
  const [moodHistory, setMoodHistory] = useState([]);

  const [selectedMood, setSelectedMood] = useState(null);
  const [moodNote, setMoodNote] = useState('');

  const [isTasksCompleted, setIsTasksCompleted] = useState(false);
  const [bgMoodlog,setBgmoodlog] = useState("bg-white");
  const moodIcons = [
    { value: 1, name: "happy" , icon: <Smile className="text-green-500" />, bgcolor: "bg-green-200", color: "bg-green-100" },
    { value: 2, name: "angry" , icon: <Angry className="text-red-500" />, bgcolor: 'bg-red-200', color: "bg-red-100" },
    { value: 3, name: "sad" , icon: <Frown className="text-blue-500" />, bgcolor: 'bg-blue-200', color: "bg-blue-100" },
    { value: 4, name: "anxious" , icon: <Annoyed className="text-orange-500" />, bgcolor: 'bg-orange-200', color: "bg-orange-100"}
  ];

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
        resolve([
          { date: format(subDays(today, 6), 'MM/dd'), mood: 3 , note : "notes" },
          { date: format(subDays(today, 5), 'MM/dd'), mood: 2 , note : "notes" },
          { date: format(subDays(today, 4), 'MM/dd'), mood: 4 , note : "notes" },
          { date: format(subDays(today, 3), 'MM/dd'), mood: 3 , note : "notes" },
          { date: format(subDays(today, 2), 'MM/dd'), mood: 1 , note : "notes" },
          { date: format(subDays(today, 1), 'MM/dd'), mood: 4 , note : "notes" }
        ]);
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

  const getMoodHistory = async () =>{
    try{
      result = await axiosAuthInstance.get('/api/get_moodhistory/')
      setMoodHistory(result.data)
    }catch(error){
      console.log(error.response?.data)
    }
  }

  // Fetching initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [tasksData, moodHistoryData] = await Promise.all([
          mockBackendService.fetchDailyTasks(),
          // mockBackendService.fetchMoodHistory()
          getMoodHistory()
        ]);
        
        setTasks(tasksData);
        setMoodHistory(moodHistoryData);
      } catch (error) {
        console.error('Failed to fetch initial data', error);
      }
    };

    fetchInitialData();
  }, []);

  // Mood logging handler
  const logMood = () => {
    if (selectedMood) {
      const newMoodEntry = {
        date: format(new Date(), 'MM/dd'),
        mood: selectedMood,
        note: moodNote
      };
  
      const existingEntryIndex = moodHistory.findIndex(entry => entry.date === newMoodEntry.date);
  
      if (existingEntryIndex !== -1) {
        const updatedMoodHistory = [...moodHistory];
        updatedMoodHistory[existingEntryIndex] = newMoodEntry;
        setMoodHistory(updatedMoodHistory);
      } else {
        setMoodHistory(prev => [...prev, newMoodEntry]);
      }
  
      setSelectedMood(null);
      setMoodNote('');
    }
  };
  

  


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
          <div className={` p-4 rounded-lg shadow ${bgMoodlog}`}>

            <h2 className="text-lg font-semibold mb-4">How's your day ?</h2>
            <div className="flex justify-between mb-4">
              {moodIcons.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => {
                    setSelectedMood(mood.value);
                    setBgmoodlog(mood.color);
                    console.log(bgMoodlog);
                  }}
                  className={`
                    p-2 rounded-full transition-all 
                    ${selectedMood === mood.value 
                      ? `${mood.bgcolor} ` 
                      : 'hover:bg-gray-100'}
                  `}
                >
                  {mood.icon}
                </button>
              ))}
            </div>
            {selectedMood && (
              <div>
                <textarea 
                  placeholder="Optional note..."
                  className="w-full border rounded p-2 mb-4"
                  value={moodNote}
                  onChange={(e) => setMoodNote(e.target.value)}
                />
                <button 
                  onClick={logMood}
                  className="w-full bg-blue-500 text-white py-2 rounded"
                >
                  Log Mood
                </button>
              </div>
            )}
          <div className='pt-3'>
              {
                moodHistory.map((day, index)=>{
                  return(
                    
                    <div className={`flex justify-between ${moodIcons[day.mood - 1].bgcolor} p-2 border rounded-md my-2 text-sm shadow-sm `}>
                      <p>{day.date}</p>
                      <p>{moodIcons[day.mood - 1].name}</p>
                      <p >{day.note}</p>
                    </div>
                    
                  )
                })
              }
          </div>  
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
