import React, { useState, useRef, useEffect } from 'react';
import axiosAuthInstance from '../utils/axiosAuthInstance';
import { 
  ThumbsUp, 
  ThumbsDown, 
  ChevronLeft, 
  ChevronRight, 
  Menu,
  Check,
  X,
  Send,
  Loader2
} from 'lucide-react';

import SidebarContent from '../components/SidebarContent';

const ChatInterface = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [notification, setNotification] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [feedbackStore, setFeedbackStore] = useState(new Map());
  const [sessionExpired, setSessionExpired] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if(!sessionExpired){
      scrollToBottom();
    }
    checkSessionExpiry(messages);
  }, [messages]);

  const checkSessionExpiry = (messageList) => {
    if (messageList && messageList.length > 0) {
      const lastMessageTime = new Date(messageList[messageList.length - 1].timestamp);
      const currentTime = new Date();
      const timeDifference = (currentTime - lastMessageTime) / (1000 * 60); // Convert to minutes
      
      if (timeDifference > 10) {
        setSessionExpired(true);
      }
    }
  };

  const getConversation = async () => {
    try {
      let result = await axiosAuthInstance.get('/api/get_conversation/');
      setMessages(result.data.conversation);
      checkSessionExpiry(result.data.conversation);
    } catch (error) {
      console.error('Failed to fetch conversation:', error);
    }
  };

  const startNewConversation = async () => {
    await clearChat();
    setSessionExpired(false);
  };

  const clearChat = async () => {
    try {
      await axiosAuthInstance.post('/api/clear_conversation/');
      setMessages([]);
      setNotification({
        icon: <Check className="text-green-500" />,
        message: 'Chat cleared successfully'
      });
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error('Failed to clear conversation:', error);
    }
  };
  
  const sendMessage = async () => {
    if (newMessage.trim() && !sessionExpired) {
      const timestamp = new Date().toISOString();
      const newMsg = {
        id: messages.length + 1,
        sender: 'user',
        text: newMessage,
        timestamp,
        time: new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prevMessages => [...prevMessages, newMsg,{id:newMsg.id+1,sender:'bot'}]);
      setNewMessage('');
      setIsTyping(true);
    
      try {
        await axiosAuthInstance.post('/api/chat/', { newMsg });
        await getConversation();
      } catch (error) {
        console.error(error);
      } finally {
        setIsTyping(false);
      }
    }
  };

  const handleFeedback = (messageId, type) => {
    const currentFeedback = feedbackStore.get(messageId);
    if (currentFeedback === type) return;

    const newFeedbackStore = new Map(feedbackStore);
    newFeedbackStore.set(messageId, type);
    setFeedbackStore(newFeedbackStore);

    setFeedback({
      messageId,
      type,
      text: '',
      submitted: false
    });
  };

  const submitFeedback = () => {
    if (feedback) {
      // Mock storing feedback in a database
      console.log('Storing feedback:', {
        messageId: feedback.messageId,
        type: feedback.type,
        feedbackText: feedback.text,
        timestamp: new Date().toISOString()
      });

      setNotification({
        icon: <Check className="text-green-500" />,
        message: 'Feedback submitted successfully'
      });

      setFeedback(prev => ({ ...prev, submitted: true }));
      
      setTimeout(() => {
        setNotification(null);
        setFeedback(null);
      }, 3000);
    }
  };

  useEffect(() => {
    getConversation();
    const interval = setInterval(() => checkSessionExpiry(messages), 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    checkSessionExpiry(messages);
  }, [messages]);

  

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-0'} bg-white border-r transition-all duration-300 hidden md:block relative group`}>
        {isSidebarOpen && <SidebarContent current='Chat' />}
      </div>

      {/* Mobile Sidebar */}
      <div className={`md:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <button onClick={() => setIsMobileSidebarOpen(false)} className="absolute top-4 right-4 p-2">
          <X />
        </button>
        <SidebarContent current='Chat'/>
      </div>

      {/* Chat Area */}
      <div className="flex flex-col flex-1 relative">
        {/* Header */}
        <div className={`bg-white p-4 flex items-center border-b shadow-sm ${sessionExpired && 'z-[1]'}`}>
          <button onClick={() => setIsMobileSidebarOpen(true)} className="mr-4 md:hidden">
            <Menu />
          </button>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="mx-3 hidden md:block">
            {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
          </button>
          <div className='flex justify-between w-full md:mx-6'>
            <h1 className="text-xl font-bold text-[#00413d]">Chat Window</h1>
            <button 
              onClick={clearChat}
              className="text-white bg-[#00413d] hover:bg-[#047a6d] px-4 py-2 rounded-lg text-sm transition duration-200 ease-in-out transform hover:scale-[1.02]"
            >
              Clear Chat
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className={`flex-1  p-4 space-y-4 relative ${sessionExpired ? 'overflow-y-hidden' : 'overflow-y-auto'} `}>
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              <h1 className='text-2xl font-comfortaa'>What's on your mind?</h1> 
            </div>
          ) : (
            <>
              <div className={`space-y-4 ${sessionExpired ? 'opacity-50 blur-[2px]' : ''}`}>
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex flex-col ${msg.sender === 'bot' ? 'items-start' : 'items-end'} space-y-1 md:mx-6`}>
                    <div className={`max-w-[70%] p-4 rounded-lg shadow-sm relative ${
                      msg.sender === 'bot' 
                        ? 'bg-[#f0f7f7] text-[#00413d] border border-[#04a298]/20' 
                        : 'bg-[#00413d] text-white'
                    }`}>
                      {msg.text}
                      {isTyping && msg.sender === 'bot' && msg.id === messages.length && (
                        <div className="flex space-x-1 mt-2">
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      )}
                      <span className="text-xs block mt-1 opacity-60 text-right">
                        {msg.time}
                      </span>
                    </div>
                    
                    {msg.sender === 'bot' && (
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleFeedback(msg.id, 'up')}
                          className={`p-1.5 rounded-full transition-all duration-200 hover:bg-[#047a6d]/5`}
                        >
                          <ThumbsUp className={`w-5 h-5 ${
                            feedbackStore.get(msg.id) === 'up' 
                              ? 'text-[#047a6d] fill-[#047a6d]' 
                              : 'text-gray-400 hover:text-[#047a6d]'
                          }`} />
                        </button>
                        <button 
                          onClick={() => handleFeedback(msg.id, 'down')}
                          className={`p-1.5 rounded-full transition-all duration-200 hover:bg-red-50`}
                        >
                          <ThumbsDown className={`w-5 h-5 ${
                            feedbackStore.get(msg.id) === 'down'
                              ? 'text-red-500 fill-red-500'
                              : 'text-gray-400 hover:text-red-500'
                          }`} />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              
              
              {/* {isTyping && !sessionExpired && (
                <div className="flex items-center space-x-2 text-[#00413d] md:mx-6">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Assistant is typing...</span>
                </div>
              )} */}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Notification */}
        {notification && (
          <div className="fixed top-4 right-4 bg-white shadow-lg rounded-lg p-4 flex items-center space-x-3 z-50 animate-fade-in">
            {notification.icon}
            <span className="text-gray-800">{notification.message}</span>
          </div>
        )}

        {/* Feedback Modal */}
        {feedback && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-96 shadow-xl" onClick={(e) => e.stopPropagation()}>
              {!feedback.submitted ? (
                <>
                  <h2 className="text-xl font-bold text-[#00413d] mb-4">
                    {feedback.type === 'up' ? 'Positive' : 'Negative'} Feedback
                  </h2>
                  <textarea 
                    className="w-full h-32 p-4 border rounded-lg mb-4 focus:ring-2 focus:ring-[#04a298] focus:border-transparent"
                    placeholder="Optional: Share more details about your feedback..."
                    value={feedback.text}
                    onChange={(e) => setFeedback(prev => ({...prev, text: e.target.value}))}
                  />
                  <div className="flex justify-end space-x-2">
                    <button 
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition duration-200"
                      onClick={() => setFeedback(null)}
                    >
                      Cancel
                    </button>
                    <button 
                      className="px-4 py-2 bg-[#00413d] hover:bg-[#047a6d] text-white rounded-lg transition duration-200"
                      onClick={submitFeedback}
                    >
                      Submit
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-4 py-4">
                  <Check className="w-16 h-16 text-[#047a6d]" />
                  <p className="text-xl font-bold text-[#00413d]">Thank You!</p>
                  <p className="text-gray-600 text-center">
                    Your feedback has been received and will help improve our service.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Message Input */}
        <div className="p-4 flex items-center justify-center space-x-2 md:mb-8">
          <input 
            ref={inputRef}
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="w-full md:w-[60%] p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04a298] focus:border-transparent transition duration-200"
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            disabled={sessionExpired}
          />
          <button 
            onClick={sendMessage}
            disabled={sessionExpired}
            className={`p-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-[1.02]
               bg-[#00413d] hover:bg-[#047a6d] text-white
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        {sessionExpired && (
                <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-white/30">
                  <div className="bg-white p-5 md:p-6 rounded-lg shadow-lg text-center">
                    <h2 className="text-xl mb-2 text-[#00413d]">Session Expired</h2>
                    <p className="mb-4 text-gray-600">Your chat session has expired due to inactivity.</p>
                    <button 
                      onClick={startNewConversation}
                      className="bg-[#00413d] text-white px-6 py-3 rounded-lg hover:bg-[#047a6d] transition duration-200"
                    >
                      Start New Conversation
                    </button>
                  </div>
                </div>
              )}
        
      </div>
      
    </div>
  );
};

export default ChatInterface;

