import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';


export const ResetPassword = () => {
    
        const [formData, setFormData] = useState({
          new_password: '',
          re_new_password: ''
        });
        const [status, setStatus] = useState('idle'); // idle, loading, success, error
      
        const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData(prev => ({
            ...prev,
            [name]: value
          }));
        };
      
        const handleSubmit = async (e) => {
          e.preventDefault();
          if (formData.new_password !== formData.re_new_password) {
            setStatus('error');
            return;
          }
      
          setStatus('loading');
      
          try {
            // Replace with actual API call
            // await fetch('/auth/users/reset_password_confirm/', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({
            //     uid,
            //     token,
            //     new_password: formData.new_password,
            //     re_new_password: formData.re_new_password
            //   })
            // });
            
            // Mock API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            setStatus('success');
          } catch (error) {
            setStatus('error');
          }
        };
      
        if (status === 'success') {
          return (
            <div className="min-h-screen bg-gray-50 font-comfortaa flex items-center justify-center p-6">
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
          );
        }
      
        return (
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
      
                  {status === 'error' && (
                    <div className="mt-4 text-red-500 text-center flex items-center justify-center gap-2">
                      <XCircle className="w-5 h-5" />
                      Failed to reset password. Please try again.
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        );
}


export default ResetPassword
