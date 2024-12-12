import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Menu,
  X,
  Smile, 
  Frown, 
  Meh, 
  Check,
  Calendar,
  BarChart2,
  Clipboard,
  Award
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format, subDays } from 'date-fns';

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
        { date: format(subDays(today, 6), 'MM/dd'), mood: 3 },
        { date: format(subDays(today, 5), 'MM/dd'), mood: 2 },
        { date: format(subDays(today, 4), 'MM/dd'), mood: 4 },
        { date: format(subDays(today, 3), 'MM/dd'), mood: 3 },
        { date: format(subDays(today, 2), 'MM/dd'), mood: 5 },
        { date: format(subDays(today, 1), 'MM/dd'), mood: 4 },
        { date: format(today, 'MM/dd'), mood: 3 }
      ]);
    });
  }
};

const MentalHealthDashboard = () => {
  // Sidebar states
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Tasks state
  const [tasks, setTasks] = useState([]);
  const [isTasksCompleted, setIsTasksCompleted] = useState(false);

  // Mood logging state
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodNote, setMoodNote] = useState('');
  const [moodHistory, setMoodHistory] = useState([]);

  // Loading and error states
  const [isLoading, setIsLoading] = useState(true);

  // Fetch initial data
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

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

  // Mood selection handler
  const handleMoodSelection = (mood) => {
    setSelectedMood(mood);
  };

  // Reset tasks for next day
  const resetTasks = () => {
    setIsTasksCompleted(false);
    mockBackendService.fetchDailyTasks().then(setTasks);
  };

  // Mood logging handler
  const logMood = () => {
    if (selectedMood) {
      const newMoodEntry = {
        date: format(new Date(), 'MM/dd'),
        mood: selectedMood,
        note: moodNote
      };
      
      setMoodHistory(prev => [...prev, newMoodEntry]);
      setSelectedMood(null);
      setMoodNote('');
    }
  };

  // Mood icons mapping
  const moodIcons = [
    { value: 1, icon: <Frown className="text-red-500" />, color: 'bg-red-100' },
    { value: 2, icon: <Meh className="text-orange-500" />, color: 'bg-orange-100' },
    { value: 3, icon: <Smile className="text-yellow-500" />, color: 'bg-yellow-100' },
    { value: 4, icon: <Smile className="text-green-500" />, color: 'bg-green-100' },
    { value: 5, icon: <Smile className="text-green-700" />, color: 'bg-green-200' }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`
        ${isSidebarOpen ? 'w-64' : 'w-0'} 
        bg-white border-r transition-all duration-300 
        hidden md:block relative overflow-hidden
      `}>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Mental Health</h2>
          <nav className="space-y-2">
            <a href="#" className="flex items-center space-x-2 text-blue-600">
              <Calendar /> <span>Dashboard</span>
            </a>
            <a href="#" className="flex items-center space-x-2">
              <BarChart2 /> <span>Analytics</span>
            </a>
            <a href="#" className="flex items-center space-x-2">
              <Clipboard /> <span>Tasks</span>
            </a>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="bg-white p-4 flex items-center border-b">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="mr-4 hidden md:block"
          >
            {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
          </button>
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          {/* Mood Logging Section */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Log Your Mood</h2>
            <div className="flex justify-between mb-4">
              {moodIcons.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => handleMoodSelection(mood.value)}
                  className={`
                    p-2 rounded-full transition-all 
                    ${selectedMood === mood.value 
                      ? `${mood.color} border-2 border-blue-500` 
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
                  placeholder="Optional mood note..."
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

          {/* Mood Chart Section */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Mood Trends</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={moodHistory}>
                <XAxis dataKey="date" />
                <YAxis domain={[1, 5]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentalHealthDashboard;