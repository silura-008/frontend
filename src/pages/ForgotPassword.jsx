import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Loader2, CheckCircle2 } from 'lucide-react';
import Notification from '../components/Notification';
import axiosInstance from '../utils/axiosInstance';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [notification, setNotification] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await axiosInstance.post('/api/auth/users/reset_password/',{
        email
      
      })
      console.log(response)
      setStatus('success');
    } catch (error){
      console.log(error)
      setNotification({message : "User with given email does not exist."})
      setStatus('idle');
      
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
    
  };

  return (
    <div className="min-h-screen bg-gray-50 font-comfortaa flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          {status === 'success' ? (
            <div className="text-center">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-[#00413d] mb-4">Check Your Email</h2>
              <p className="text-gray-600 mb-6">
                We've sent password reset instructions to:
                <span className="block font-semibold text-[#04a298] mt-2">{email}</span>
              </p>
              <p className="text-sm text-gray-500">
                Didn't receive the email?{' '}
                <button 
                  onClick={() => setStatus('idle')}
                  className="text-[#04a298] hover:text-[#00413d] font-medium"
                >
                  Try again
                </button>
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <Mail className="w-12 h-12 text-[#04a298] mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-[#00413d] mb-2">Forgot Password?</h2>
                <p className="text-gray-600">
                  Enter your email address below, and we'll send you instructions to reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#04a298] focus:border-transparent transition duration-200"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3 px-4 bg-[#00413d] hover:bg-[#047a6d] text-white rounded-lg font-medium transition duration-200 ease-in-out transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : 'Reset Password'}
                </button>

                <div className="mt-6 text-center">
                  <Link to="/login" className="text-[#04a298] hover:text-[#00413d] font-medium">
                    Back to Login
                  </Link>
                </div>
              </form>
            </>
          )}
          {notification && <Notification notification={notification}/>}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;