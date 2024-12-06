import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Register_img from '../assets/Register_img.jpg';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login validation logic here
    console.log(formData);
    
    // Directly navigate to Chat page
    navigate('/Chat');
  };

  return (
    <div className="h-screen flex font-comfortaa">
      {/* Left Section with Image */}
      <div className="hidden lg:block lg:w-[50%]">
        <img src={Register_img} alt="Login" className="w-full h-full" />
      </div>
      
      {/* Right Section */}
      <div className='w-full lg:w-[50%] bg-[#00413d] flex items-center justify-center'>
        <div className='border rounded-lg p-10 lg:p-6 lg:px-11 md:px-14 shadow-[0_0_10px_#00413d] bg-white'>
          <h3 className="font-black text-2xl mb-3 text-[#00413d] md:pr-14">Login to Your Account</h3>
          <p className='text-sm text-gray-400'>
            Don't have an account? <Link to="/Register" className='text-[#04a298]'>Sign Up</Link>
          </p>

          <form onSubmit={handleSubmit} className="mt-4">
            {/* Username */}
            <div className="mb-4">
              <label htmlFor="username" className="block">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
                placeholder="Enter your username"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label htmlFor="password" className="block">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
                placeholder="Enter your password"
              />
            </div>

            {/* Forgot Password */}
            <div className="mb-4 text-right">
              <Link to="/forgot-password" className='text-sm text-[#04a298] hover:text-[#00413d]'>
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-2 bg-[#00413d] hover:bg-[#047a6d] text-white rounded mt-1 duration-200 ease-in-out"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;