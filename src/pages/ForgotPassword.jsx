import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Register_img from '../assets/Register_img.jpg';

function ForgotPassword() {
  const navigate = useNavigate();
  const [stage, setStage] = useState('email');
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Add email validation logic here
    setStage('verify');
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    // Add OTP verification logic here
    if (otpString.length === 4) {
      setStage('reset');
    }
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    // Add password validation logic
    if (formData.newPassword === formData.confirmPassword) {
      navigate('/Login');
    } else {
      // Handle password mismatch
      alert("Passwords do not match");
    }
  };

  return (
    <div className="h-screen flex font-comfortaa">
      {/* Left Section with Image */}
      <div className="hidden lg:block lg:w-[50%]">
        <img src={Register_img} alt="Forgot Password" className="w-full h-full" />
      </div>
      
      {/* Right Section */}
      <div className='w-full lg:w-[50%] bg-[#00413d] flex items-center justify-center'>
        <div className='border rounded-lg p-10 lg:p-6 lg:px-11 md:px-14 shadow-[0_0_10px_#00413d] bg-white'>
          {stage === 'email' && (
            <>
              <h3 className="font-black text-2xl mb-3 text-[#00413d] md:pr-14">Forgot Password?</h3>
              <p className='text-sm text-gray-400 mb-4'>
                Enter your email to reset your password
              </p>

              <form onSubmit={handleEmailSubmit} className="mt-4">
                {/* Email */}
                <div className="mb-4">
                  <label htmlFor="email" className="block">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    required
                    placeholder="Enter your email"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full p-2 bg-[#00413d] hover:bg-[#047a6d] text-white rounded mt-1 duration-200 ease-in-out"
                >
                  Send OTP
                </button>
              </form>
            </>
          )}

          {stage === 'verify' && (
            <>
              <h2 className="font-black text-2xl mb-3 text-[#00413d]">Verify OTP</h2>
              <p className="text-sm text-gray-500">
                Please check <span className='block text-[#04a298] font-bold text-base hover:text-[#00413d]'>
                  {formData.email}
                </span> to confirm your OTP
              </p>
              
              <div className="flex space-x-2 mb-6 mt-4 justify-center">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => inputRefs.current[index] = el}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  />
                ))}
              </div>
              
              <button
                className="w-full p-2 bg-[#00413d] hover:bg-[#047a6d] text-white rounded mt-2 duration-200 ease-in-out"
                onClick={handleVerifyOtp}
              >
                Verify
              </button>
            </>
          )}

          {stage === 'reset' && (
            <>
              <h3 className="font-black text-2xl mb-3 text-[#00413d] md:pr-14">Reset Password</h3>
              <p className='text-sm text-gray-400 mb-4'>
                Create a new password
              </p>

              <form onSubmit={handlePasswordReset} className="mt-4">
                {/* New Password */}
                <div className="mb-4">
                  <label htmlFor="newPassword" className="block">New Password:</label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    required
                    placeholder="Enter new password"
                  />
                </div>

                {/* Confirm Password */}
                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="block">Confirm Password:</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    required
                    placeholder="Confirm new password"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full p-2 bg-[#00413d] hover:bg-[#047a6d] text-white rounded mt-1 duration-200 ease-in-out"
                >
                  Reset Password
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;