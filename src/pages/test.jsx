import React, { useState, useRef, useEffect } from 'react';
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
  Bell
} from 'lucide-react';

const ChatInterface = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [feedbackModal, setFeedbackModal] = useState(null);
  const [notification, setNotification] = useState(null);
  const inputRef = useRef(null);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        sender: 'user',
        text: newMessage
      };
      setMessages(prevMessages => [...prevMessages, newMsg]);
      setNewMessage('');
      
      // Simulate bot response (you'll replace this with actual backend logic)
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          sender: 'bot',
          text: 'Thank you for sharing. Would you like to talk more about what\'s on your mind?',
          feedback: null
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  const handleFeedback = (messageId, type) => {
    // If feedback is already set to the same type, do nothing
    const currentMessage = messages.find(msg => msg.id === messageId);
    if (currentMessage.feedback === type) return;

    setMessages(prevMessages => 
      prevMessages.map(msg => 
        msg.id === messageId 
          ? { ...msg, feedback: msg.feedback === type ? null : type }
          : msg
      )
    );

    // Open text feedback modal only if it's a new feedback
    if (currentMessage.feedback !== type) {
      setFeedbackModal({
        messageId,
        type,
        text: '',
        submitted: false
      });
    }
  };

  const submitFeedback = () => {
    if (feedbackModal) {
      // Simulate backend feedback submission
      console.log('Feedback Submitted:', {
        messageId: feedbackModal.messageId,
        type: feedbackModal.type,
        feedbackText: feedbackModal.text
      });

      // Show notification
      setNotification({
        icon: <Check className="text-green-500" />,
        message: 'Feedback submitted successfully'
      });

      // Mark as submitted
      setFeedbackModal(prev => ({ ...prev, submitted: true }));

      // Clear notification after 3 seconds
      setTimeout(() => {
        setNotification(null);
        setFeedbackModal(null);
      }, 3000);
    }
  };

  const SidebarContent = () => (
    <nav className="space-y-2 px-4">
      <SidebarItem 
        icon={<User />} 
        label="Profile"
        isOpen={isSidebarOpen}
      />
      <SidebarItem 
        icon={<LayoutDashboard />} 
        label="Dashboard"
        isOpen={isSidebarOpen}
      />
      <SidebarItem 
        icon={<LogOut />} 
        label="Logout"
        isOpen={isSidebarOpen}
      />
    </nav>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <div className={`
        ${isSidebarOpen ? 'w-64' : 'w-16'} 
        bg-white border-r transition-all duration-300 
        hidden md:block relative group
      `}>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute top-4 left-full -translate-x-1/2 z-10 p-2 rounded-full bg-white shadow-md"
        >
          {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
        </button>
        
        <SidebarContent />
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
          <ChevronLeft />
        </button>
        <SidebarContent />
      </div>

      {/* Chat Area */}
      <div className="flex flex-col flex-1 relative">
        {/* Header for larger devices */}
        <div className="hidden md:flex bg-white p-4 items-center border-b">
          <h1 className="text-xl font-semibold flex-1">Mental Health Chat</h1>
          <div className="flex items-center space-x-4">
            <button className="relative">
              <Bell className="w-6 h-6 text-gray-600" />
              {notification && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  1
                </span>
              )}
            </button>
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
              U
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden bg-white p-4 flex items-center border-b">
          <button 
            onClick={() => setIsMobileSidebarOpen(true)}
            className="mr-4"
          >
            <Menu />
          </button>
          <h1 className="text-xl font-semibold flex-1">Mental Health Chat</h1>
          <button className="relative">
            <Bell className="w-6 h-6 text-gray-600" />
            {notification && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                1
              </span>
            )}
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              What's on your mind?
            </div>
          ) : (
            messages.map((msg) => (
              <div 
                key={msg.id}
                className={`
                  flex items-start space-x-3
                  ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}
                `}
              >
                <div 
                  className={`
                    max-w-[70%] p-3 rounded-lg 
                    ${msg.sender === 'bot' 
                      ? 'bg-blue-100 text-blue-900' 
                      : 'bg-blue-500 text-white'}
                  `}
                >
                  {msg.text}
                </div>
                
                {msg.sender === 'bot' && (
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleFeedback(msg.id, 'up')}
                      className={`
                        p-1 rounded-full hover:bg-green-100
                        ${msg.feedback === 'up' ? 'bg-green-200' : ''}
                      `}
                    >
                      <ThumbsUp 
                        className={`
                          w-5 h-5 
                          ${msg.feedback === 'up' 
                            ? 'text-green-600' : 'text-gray-500'}
                        `} 
                      />
                    </button>
                    <button 
                      onClick={() => handleFeedback(msg.id, 'down')}
                      className={`
                        p-1 rounded-full hover:bg-red-100
                        ${msg.feedback === 'down' ? 'bg-red-200' : ''}
                      `}
                    >
                      <ThumbsDown 
                        className={`
                          w-5 h-5 
                          ${msg.feedback === 'down' 
                            ? 'text-red-600' : 'text-gray-500'}
                        `} 
                      />
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Notification */}
        {notification && (
          <div className="fixed top-4 right-4 bg-white shadow-lg rounded-lg p-4 flex items-center space-x-3 z-50">
            {notification.icon}
            <span className="text-gray-800">{notification.message}</span>
          </div>
        )}

        {/* Feedback Modal */}
        {feedbackModal && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => !feedbackModal.submitted && setFeedbackModal(null)}
          >
            <div 
              className="bg-white p-6 rounded-lg w-96"
              onClick={(e) => e.stopPropagation()}
            >
              {!feedbackModal.submitted ? (
                <>
                  <h2 className="text-xl font-semibold mb-4">
                    {feedbackModal.type === 'up' ? 'Positive' : 'Negative'} Feedback
                  </h2>
                  <textarea 
                    className="w-full h-32 p-2 border rounded-lg mb-4"
                    placeholder="Optional: Share more details about your feedback..."
                    value={feedbackModal.text}
                    onChange={(e) => setFeedbackModal(prev => ({
                      ...prev, 
                      text: e.target.value
                    }))}
                  />
                  <div className="flex justify-end space-x-2">
                    <button 
                      className="px-4 py-2 bg-gray-200 rounded-lg"
                      onClick={() => setFeedbackModal(null)}
                    >
                      Cancel
                    </button>
                    <button 
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                      onClick={submitFeedback}
                    >
                      Submit
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-4">
                  <Check className="w-16 h-16 text-green-500" />
                  <p className="text-xl font-semibold">Thank You!</p>
                  <p className="text-gray-600 text-center">
                    Your feedback has been received and will help improve our service.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Message Input */}
        <div className="bg-white p-4 border-t flex items-center space-x-2">
          <input 
            ref={inputRef}
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button 
            onClick={sendMessage}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

// Sidebar Item Component
const SidebarItem = ({ icon, label, isOpen }) => (
  <div className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
    {icon}
    {isOpen && <span className="text-sm">{label}</span>}
  </div>
);

export default ChatInterface;