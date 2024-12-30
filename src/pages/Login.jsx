import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import Login_img from '../assets/Login_img.jpg';



function Login() {
  const {login} = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const result = await login(formData.email, formData.password);
    if (!result.success) {
      console.log(result.error)
    }
    console.log(formData);
    
  };

  return (
    <div className="h-screen flex font-comfortaa">
      {/* Left Section with Image */}
      <div className="hidden lg:block lg:w-[50%]">
        <img src={Login_img} alt="Login" className="w-full h-full" />
      </div>
      
      {/* Right Section */}
      <div className='w-full lg:w-[50%] bg-[#00413d] flex items-center justify-center'>
      <div className=' border rounded-lg p-8 lg:p-8  md:p-10 shadow-[0_0_10px_#00413d] bg-white '>
          <h3 className="font-black text-2xl mb-3  text-[#00413d] md:pr-14">Login to Your Account</h3>
          <p className='text-sm text-gray-400'>
            Don't have an account? <Link to="/Register" className='text-[#04a298]'>Sign Up</Link>
          </p>

          <form onSubmit={handleSubmit} className="mt-4">
            {/* email */}
            <div className="mb-4">
              <label htmlFor="email" className="block">email:</label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
                placeholder="Enter your email"
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
              <Link to="/forgot" className='text-sm text-[#04a298] hover:text-[#00413d]'>
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