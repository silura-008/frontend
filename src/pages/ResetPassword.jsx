import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import Notification from '../components/Notification';
import axiosInstance from '../utils/axiosInstance';

export const ResetPassword = () => {

        const { uid, token } = useParams();
        const [notification, setNotification] = useState(null);
        
        const [formData, setFormData] = useState({
          new_password: '',
          re_new_password: ''
        });
        const [status, setStatus] = useState('idle');
      
        const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData(prev => ({
            ...prev,
            [name]: value
          }));
        };
      
        const handleSubmit = async (e) => {
          e.preventDefault();
          setStatus('loading'); 
          try {
            await axiosInstance.post('/api/auth/users/reset_password_confirm/',{
            uid,
            token,
            new_password: formData.new_password,
            re_new_password: formData.re_new_password,
          });
            setStatus('success');
          } catch (error) {
            setStatus('idle');
            setNotification({message : error.response?.data?.detail || error.response?.data?.token || "Failed to reset password. Please try again."})
            console.log(error.response?.data)
            // console.log(`${uid}  ${token}`)
            setTimeout(() => {
              setNotification(null);
            }, 3000);
          }
        };
      
      return (<> 
        { status === 'success' ? 
      ( <div className="min-h-screen bg-gray-50 font-comfortaa flex items-center justify-center p-6">
              <div className="w-full max-w-md">
                <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
                  <h2 className="text-2xl font-bold text-[#00413d] mb-4">Password Reset Complete!</h2>
                  <p className="text-gray-600 mb-8">
                    Your password has been successfully reset. You can now log in with your new password.
                  </p>
                  <Link 
                    to="/login"
                    className="block w-full py-3 px-4 bg-[#00413d] hover:bg-[#047a6d] text-white rounded-lg font-medium transition duration-200 ease-in-out transform hover:scale-[1.02]"
                  >
                    Continue to Login
                  </Link>
                </div>
              </div>
            </div>
      ) : (
          <div className="min-h-screen bg-gray-50 font-comfortaa flex items-center justify-center p-6">
            <div className="w-full max-w-md">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-[#00413d] mb-2">Reset Password</h2>
                  <p className="text-gray-600">
                    Please enter your new password below.
                  </p>
                </div>
      
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label htmlFor="new_password" className="block text-gray-700 mb-2 font-medium">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="new_password"
                      name="new_password"
                      value={formData.new_password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#04a298] focus:border-transparent transition duration-200"
                      placeholder="Enter new password"
                      required
                    />
                  </div>
      
                  <div className="mb-6">
                    <label htmlFor="re_new_password" className="block text-gray-700 mb-2 font-medium">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="re_new_password"
                      name="re_new_password"
                      value={formData.re_new_password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#04a298] focus:border-transparent transition duration-200"
                      placeholder="Confirm new password"
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
                        Resetting...
                      </>
                    ) : 'Reset Password'}
                  </button>
                </form>
              </div>
              {notification && <Notification notification={notification}/>}
            </div>
          </div>
          )}
          </>
    
      )
}


export default ResetPassword
