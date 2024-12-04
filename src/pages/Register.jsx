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
      music: false,
    }
  });

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
    console.log(formData);
  };

  return (
    <div className="h-[100vh] flex font-comfortaa ">
      {/* Left Section */}
      <div className='w-full lg:w-[50%] p-14 pt-24 md:p-48 md:pt-40 lg:p-36 lg:pl-40 lg:pt-36 '>
      <div className=' border rounded-lg p-4 lg:p-2'>
              <h3 className="font-black text-2xl mb-4">Create an Account</h3>
              <p>
                Already have an account? <Link to="/Login"><a href="#">Login</a></Link>
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
                  <div className="flex flex-col">
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
                    <label>
                      <input
                        type="checkbox"
                        name="music"
                        checked={formData.preferences.music}
                        onChange={handleChange}
                      /> Music
                    </label>
                  </div>
                </div>
                {/* terms */}
                <div className="mb-4">
                <label label>
                 <input
                    type="checkbox"
                    name="agreeToTerms"
                    required 
                 /> I agree to the <a href="/terms" className="text-blue-500">Terms and Conditions</a>
               </label>
                </div>
                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full p-2 bg-blue-500 text-white rounded mt-4"
                >
                  Sign Up
                </button>
              </form>
            
      </div>
      </div>
      {/* Right Section with Image */}
      <div className="hidden lg:block lg:w-[50%] ">
        <img src={Register_img} alt="Register" className="w-full h-full " />
      </div>
    </div>
  );
}

export default Register;
