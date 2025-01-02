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
  Annoyed,
  Activity
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell,
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import SidebarContent from '../components/SidebarContent';
import { format } from 'date-fns';

const DashBoard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [tasks, setTasks] = useState({});
  const [moodHistory, setMoodHistory] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodNote, setMoodNote] = useState('');
  const [isTasksCompleted, setIsTasksCompleted] = useState(false);
  const [bgMoodlog, setBgmoodlog] = useState("bg-white");
  const [moodRatios, setMoodRatios] = useState(null);
  const [totalMoodEntries, setTotalMoodEntries] = useState(0);

  const moodIcons = {
    happy: { value: 1, icon: <Smile className="text-green-500" />, bgcolor: "bg-green-200", color: "bg-green-100" },
    angry: { value: 2, icon: <Angry className="text-red-500" />, bgcolor: 'bg-red-200', color: "bg-red-100" },
    sad: { value: 3, icon: <Frown className="text-blue-500" />, bgcolor: 'bg-blue-200', color: "bg-blue-100" },
    anxious: { value: 4, icon: <Annoyed className="text-orange-500" />, bgcolor: 'bg-orange-200', color: "bg-orange-100"}
  };

  const getTasks = async () => {
    try {
      const response = await axiosAuthInstance.get('/api/get_tasks');
      setTasks(response.data.tasks);
      checkTasksCompletion(response.data.tasks);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const updateTask = async (taskName, completed) => {
    try {
      await axiosAuthInstance.post('/api/update_task', {
        task: taskName,
        completed
      });
      getTasks(); // Refresh tasks after update
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const getMoodRatios = async () => {
    try {
      const response = await axiosAuthInstance.get('/api/get_ratio');
      setMoodRatios({
        happy_ratio: response.data.happy_ratio,
        sad_ratio: response.data.sad_ratio,
        angry_ratio: response.data.angry_ratio,
        anxious_ratio: response.data.anxious_ratio
      });
      setTotalMoodEntries(response.data.count);
    } catch (error) {
      console.error('Failed to fetch mood ratios:', error);
    }
  };

  const checkTasksCompletion = (taskList) => {
    const allCompleted = Object.values(taskList).every(completed => completed);
    setIsTasksCompleted(allCompleted);
  };

  const toggleTaskCompletion = (taskName) => {
    const isCompleted = tasks[taskName];
    updateTask(taskName, !isCompleted);
  };

  const getMoodHistory = async () => {
    try {
      const result = await axiosAuthInstance.get('/api/get_moodhistory/');
      setMoodHistory(result.data);
    } catch (error) {
      console.error("Failed to get mood history:", error);
    }
  };

  const addMoodLog = async (date, mood, note) => {
    try {
      await axiosAuthInstance.post('/api/add_moodlog/', {
        date,
        mood,
        note
      });
      getMoodHistory();
      getMoodRatios();
    } catch (error) {
      console.error("Failed to add mood log:", error);
    }
  };

  useEffect(() => {
    getTasks();
    getMoodHistory();
    getMoodRatios();
  }, []);

  const logMood = () => {
    if (selectedMood) {
      const newMoodEntry = {
        date: format(new Date(), 'MM/dd'),
        mood: selectedMood,
        note: moodNote
      };
      addMoodLog(newMoodEntry.date, newMoodEntry.mood, newMoodEntry.note);
      setSelectedMood(null);
      setMoodNote('');
    }
  };

  // Prepare data for mood trend line chart
  const moodTrendData = moodHistory.map(entry => ({
    date: entry.date,
    mood: entry.mood,
  }));

  // Prepare data for mood distribution pie chart
  const preparePieChartData = () => {
    if (!moodRatios) return [];
    return [
      { name: 'Happy', value: moodRatios.happy_ratio, color: '#22c55e' },
      { name: 'Sad', value: moodRatios.sad_ratio, color: '#3b82f6' },
      { name: 'Angry', value: moodRatios.angry_ratio, color: '#ef4444' },
      { name: 'Anxious', value: moodRatios.anxious_ratio, color: '#f97316' }
    ];
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <div className={`
        ${isSidebarOpen ? 'w-64' : 'w-0'} 
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

      {/* Dashboard Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white p-4 flex items-center border-b">
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
          <h1 className="text-xl font-semibold flex-1">Dashboard</h1>
          {totalMoodEntries > 0 && (
            <div className="flex items-center text-sm text-gray-600">
              <Activity className="w-4 h-4 mr-1" />
              {totalMoodEntries} mood entries
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Mood Log Section */}
            <div className={`${bgMoodlog} p-4 rounded-lg shadow-lg`}>
              <h2 className="text-lg font-semibold mb-4">How's your day?</h2>
              <div className="flex justify-between mb-4">
                {Object.entries(moodIcons).map(([key, mood]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedMood(mood.value);
                      setBgmoodlog(mood.color);
                    }}
                    className={`
                      p-2 rounded-full transition-all 
                      ${selectedMood === mood.value ? mood.bgcolor : 'hover:bg-gray-100'}
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
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                  >
                    Log Mood
                  </button>
                </div>
              )}
              <div className="mt-4 max-h-40 overflow-y-auto">
                {moodHistory.map((day, index) => (
                  <div key={index} className={`flex justify-between ${moodIcons[day.mood]?.bgcolor || 'bg-gray-100'} p-2 rounded-md my-2 text-sm shadow-sm`}>
                    <span>{day.date}</span>
                    <span className="truncate mx-2">{day.note}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tasks Section */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Daily Tasks</h2>
              {isTasksCompleted ? (
                <div className="text-center py-8">
                  <Award className="mx-auto text-green-500 mb-4" size={48} />
                  <h3 className="text-xl font-bold text-green-600">
                    Congratulations!
                  </h3>
                  <p>You've completed all your tasks for today!</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {Object.entries(tasks).map(([taskName, completed]) => (
                    <div 
                      key={taskName} 
                      className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <input 
                        type="checkbox"
                        checked={completed}
                        onChange={() => toggleTaskCompletion(taskName)}
                        className="mr-3 h-4 w-4 text-blue-500"
                      />
                      <span className={completed ? 'line-through text-gray-400' : ''}>
                        {taskName}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Charts Section */}
            <div className="lg:col-span-3 md:col-span-2 bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Mood Analytics</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Mood Distribution Pie Chart */}
                <div className="h-64">
                  <h3 className="text-sm font-medium mb-2">Mood Distribution</h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={preparePieChartData()}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                      >
                        {preparePieChartData().map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Mood Trend Line Chart */}
                <div className="h-64">
                  <h3 className="text-sm font-medium mb-2">Mood Trends</h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={moodTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 5]} />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="mood" 
                        stroke="#8884d8" 
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Mood Count Bar Chart */}
                <div className="h-64 lg:col-span-2">
                  <h3 className="text-sm font-medium mb-2">Mood Frequency</h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={preparePieChartData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;