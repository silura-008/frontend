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
  
  const [tasks, setTasks] = useState({});
  const [isTasksCompleted, setIsTasksCompleted] = useState(false);

  const [moodHistory, setMoodHistory] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodNote, setMoodNote] = useState('');

  const [bgMoodlog,setBgmoodlog] = useState("bg-white");
  const moodIcons = {
    happy : { icon: <Smile className="text-green-500" />, bgcolor: "bg-green-200", color: "bg-green-100" },
    angry : { icon: <Angry className="text-red-500" />, bgcolor: 'bg-red-200', color: "bg-red-100" },
    sad : { icon: <Frown className="text-blue-500" />, bgcolor: 'bg-blue-200', color: "bg-blue-100" },
    anxious : { icon: <Annoyed className="text-orange-500" />, bgcolor: 'bg-orange-200', color: "bg-orange-100"}
  };



  // Task completion handler
  const checkTasksCompletion = (taskList) => {
    const allCompleted = Object.values(taskList).every(completed => completed);
    setIsTasksCompleted(allCompleted);
  };

  const toggleTaskCompletion = (taskName) => {

    const toggle = !tasks[taskName] 
    tasks[taskName] = !tasks[taskName]
    updateTasks(tasks);
    
    
    setTasks(prevTasks =>({
      ...prevTasks,
      [taskName] : toggle
    }))

    // tasks[taskName] = !tasks[taskName]
    // setTasks(tasks)
    // updateTasks(tasks);
    checkTasksCompletion(tasks)
  };

  const getTasks = async () => {
    try {
      let response = await axiosAuthInstance.get('/api/get_tasks/');
      setTasks(response.data.tasks);
      checkTasksCompletion(response.data.tasks);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const updateTasks = async (tasks) => {
    try {
      await axiosAuthInstance.put('/api/update_tasks/', {
        tasks,
      });
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const getMoodHistory = async () =>{
    try{
      let result = await axiosAuthInstance.get('/api/get_moodhistory/')
      setMoodHistory(result.data)
      console.log("fetched moodhistory")
    }catch(error){
      console.log("failed to get moodhistory")
      console.log(error)
    }
  };

  const addMoodLog = async (date,mood,note) =>{
    try{
      await axiosAuthInstance.post('/api/add_moodlog/',{
        date,
        mood,
        note
      })
      console.log("added moodlog")
    }catch(error){
      console.log(error.response?.data)
    }
  };
  
  const logMood = () => {
    if (selectedMood) {
      const newMoodEntry = {
        date: format(new Date(), 'yyyy-MM-dd'),
        mood: selectedMood,
        note: moodNote
      };
  
      const existingEntryIndex = moodHistory.findIndex(entry => entry.date === newMoodEntry.date);
  
      if (existingEntryIndex !== -1) {
        const updatedMoodHistory = [...moodHistory];
        updatedMoodHistory[existingEntryIndex] = newMoodEntry;
        setMoodHistory(updatedMoodHistory);
      } else {
        setMoodHistory(prev => [newMoodEntry,...prev, ]);
      }

      addMoodLog(newMoodEntry.date,newMoodEntry.mood,newMoodEntry.note);
  
      setSelectedMood(null);
      setMoodNote('');
    }
  };




  // Fetching initial data
  useEffect(() => {
    getTasks();
    getMoodHistory()
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
          <div className={` p-4 rounded-lg shadow ${bgMoodlog}`}>

            <h2 className="text-lg font-semibold mb-4">How's your day ?</h2>
            <div className="flex justify-between mb-4">
              {Object.entries(moodIcons).map( ([key,mood]) => (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedMood(key);
                    setBgmoodlog(mood.color);
                    console.log(bgMoodlog);
                  }}
                  className={`
                    p-2 rounded-full transition-all 
                    ${selectedMood === key 
                      ? `${mood.bgcolor} ` 
                      : 'hover:bg-gray-100'}
                  `}
                >
                  {mood.icon}
                </button>
              ))}
            </div>
            {selectedMood !== null && (
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
                    
                    <div className={`flex justify-between ${moodIcons[day.mood].bgcolor} p-2 border rounded-md my-2 text-sm shadow-sm `}>
                      <p>{day.date}</p>
                      <p>{day.mood}</p>
                      <p >{day.note}</p>
                      <p >{day.task_rate}</p>
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
                {Object.entries(tasks).map( ([taskName, completed]) => (
                  <div 
                    key={`${taskName}`} 
                    className="flex items-center mb-2"
                  >
                    <input 
                      type="checkbox"
                      checked={completed}
                      onChange={() => toggleTaskCompletion(taskName)}
                      className="mr-2"
                    />
                    <span 
                      className={`
                        flex-1 
                        ${completed ? 'line-through text-gray-400' : ''}
                      `}
                    >
                      {taskName}
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
