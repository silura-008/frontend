import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Register_img from '../assets/Register_img.jpg';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    preferences: {
      story: false,
      video: false,
      articles: false,
      books: false,
    }
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.preferences) {
      setFormData((prevData) => ({
        ...prevData,
        preferences: {
          ...prevData.preferences,
          [name]: e.target.checked
        }
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., send data to API)

    setSubmitted(true);
    
    console.log(formData);
  };

  return (
    <div className="h-screen flex font-comfortaa  ">
      {/* Left Section with Image */}
      <div className="hidden lg:block lg:w-[50%] ">
        <img src={Register_img} alt="Register" className="w-full h-full " />
      </div>
      {/* Right Section*/}
      <div className='w-full lg:w-[50%] bg-[#00413d] flex items-center justify-center'>
        {(submitted ?
         <div className=' border rounded-lg p-10 lg:p-6 lg:px-11 md:px-14 shadow-[0_0_10px_#00413d] bg-white '>
          <h2 className="font-black text-2xl mb-3 text-[#00413d] md:pr-14 ">Check Your Inbox</h2>
          <p className="text-sm text-gray-500">Please check <span className='text-[#04a298] font-bold'>{formData['email']}</span> to confirm your account </p>
          
         </div> 
      : 
      <div className=' border rounded-lg p-10 lg:p-6 lg:px-11 md:px-14 shadow-[0_0_10px_#00413d] bg-white '>
              <h3 className="font-black text-2xl mb-3 text-[#00413d] md:pr-14 ">Create an Account</h3>
              <p className='text-sm text-gray-400'>
                Already have an account? <Link to="/Login"><a href="#" className='text-[#04a298]'>Login</a></Link>
              </p>

              <form onSubmit={handleSubmit} className="mt-4">
                {/* Name */}
                <div className="mb-4">
                  <label htmlFor="name" className="block">Full Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    required
                    placeholder="Enter your full name"
                  />
                </div>

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
                    placeholder="Create a password"
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
                    placeholder="Confirm your password"
                  />
                </div>

                {/* Preferences */}
                <div className="mb-4">
                  <label className="block mb-2">Select Your Preferences:</label>
                  <div className="flex justify-around">
                    <label>
                      <input
                        type="checkbox"
                        name="story"
                        checked={formData.preferences.story}
                        onChange={handleChange}
                      /> Story
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="video"
                        checked={formData.preferences.video}
                        onChange={handleChange}
                      /> Video
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="articles"
                        checked={formData.preferences.articles}
                        onChange={handleChange}
                      /> Articles
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="books"
                        checked={formData.preferences.books}
                        onChange={handleChange}
                      /> Books
                    </label>
                  </div>
                </div>
                {/* terms */}
                <div className="mb-2 text-sm">
                <label label>
                 <input
                    type="checkbox"
                    name="agreeToTerms"
                    required 
                 /> I agree to the <a href="/terms" className="text-[#04a298]">Terms and Conditions</a>
               </label>
                </div>
                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full p-2 bg-[#00413d] hover:bg-[#047a6d] text-white rounded mt-1 duration-200 ease-in-out"
                >
                  Sign Up
                </button>
              </form>
            
      </div>)}
      </div>
      
    </div>
  );
}

export default Register;
