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
  X
} from 'lucide-react';

import SidebarContent from '../components/SidebarContent';

const ChatInterface = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [feedback, setfeedback] = useState(null);
  const [notification, setNotification] = useState(null);
  const inputRef = useRef(null);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        sender: 'user',
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prevMessages => [...prevMessages, newMsg]);
      setNewMessage('');
      
      // Simulate bot response (replace this with actual backend logic)
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          sender: 'bot',
          text: 'Thank you for sharing. Would you like to talk more about what\'s on your mind?',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          feedback: null
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  // Clear chat functionality
  const clearChat = () => {
    setMessages([]);
    setNotification({
      icon: <Check className="text-green-500" />,
      message: 'Chat cleared successfully'
    });

    // Clear notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
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
      setfeedback({
        messageId,
        type,
        text: '',
        submitted: false
      });
    }
  };

  const submitFeedback = () => {
    if (feedback) {
      // Simulate backend feedback submission
      console.log('Feedback Submitted:', {
        messageId: feedback.messageId,
        type: feedback.type,
        feedbackText: feedback.text
      });

      // Show notification
      setNotification({
        icon: <Check className="text-green-500" />,
        message: 'Feedback submitted successfully'
      });

      // Mark as submitted
      setfeedback(prev => ({ ...prev, submitted: true }));

      // Clear notification after 3 seconds
      setTimeout(() => {
        setNotification(null);
        setfeedback(null);
      }, 3000);
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

      {/* Chat Area */}
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

          <h1 className="text-xl font-semibold flex-1">Chat Window</h1>
          <button 
            onClick={clearChat}
            className="text-gray-600 hover:text-gray-800"
          >
            <X className="w-6 h-6 border rounded-lg bg-green-600 "  color="white"/>
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
                  flex flex-col items-start space-y-1
                  ${msg.sender === 'bot' ? 'items-start' : 'items-end'}
                `}
              >
                <div 
                  className={`
                    max-w-[70%] p-3 rounded-lg relative
                    ${msg.sender === 'bot' 
                      ? 'bg-blue-100 text-blue-900' 
                      : 'bg-blue-500 text-white'}
                  `}
                >
                  {msg.text}
                  <span className="text-xs block mt-1 opacity-60 text-right">
                    {msg.time}
                  </span>
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
                        // color="green" 
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
                        // color="red"
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
        {feedback && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => !feedback.submitted && setfeedback(null)}
          >
            <div 
              className="bg-white p-6 rounded-lg w-96"
              onClick={(e) => e.stopPropagation()}
            >
              {!feedback.submitted ? (
                <>
                  <h2 className="text-xl font-semibold mb-4">
                    {feedback.type === 'up' ? 'Positive' : 'Negative'} Feedback
                  </h2>
                  <textarea 
                    className="w-full h-32 p-2 border rounded-lg mb-4"
                    placeholder="Optional: Share more details about your feedback..."
                    value={feedback.text}
                    onChange={(e) => setfeedback(prev => ({
                      ...prev, 
                      text: e.target.value
                    }))}
                  />
                  <div className="flex justify-end space-x-2">
                    <button 
                      className="px-4 py-2 bg-gray-200 rounded-lg"
                      onClick={() => setfeedback(null)}
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


export default ChatInterface;