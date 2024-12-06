import React, { useState, useRef } from 'react';
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
  const [verified, setVerified] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]);


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


  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., send data to API)
    if (formData.password === formData.confirmPassword) {
      setSubmitted(true);
    }else{
      alert("password do not match")
    }
  };

  const handleVerify = (e) =>{
    e.preventDefault();
    // Handle Email verification
    
    const otpString = otp.join('');
    // OTP verification logic
    if (otpString.length === 4) {
      setVerified(true);
    }

  }


  return (
    <div className="h-screen flex font-comfortaa  ">
      {/* Left Section with Image */}
      <div className="hidden lg:block lg:w-[50%] ">
        <img src={Register_img} alt="Register" className="w-full h-full " />
      </div>
      {/* Right Section*/}
      <div className='w-full lg:w-[50%] bg-[#00413d] flex items-center justify-center'>
        {(submitted ?
         ( verified ? <div className=' bg-white w-full h-full content-center text-center '>
                        <h2 className="font-black text-2xl mb-3 text-[#00413d] ">Account Created <br /> Successfully !!</h2>
                        <p className="text-sm text-gray-500 ">Login to your account to continue ...</p>
                        
                        <Link to="/Login"><button
                                className="p-3 px-6 bg-[#00413d] hover:bg-[#047a6d] text-white rounded mt-6 duration-200 ease-in-out"
                                
                              >
                                Login
                        </button></Link>
                      </div>
          :
         (<div className=' border rounded-lg p-8 lg:p-8  md:p-10 shadow-[0_0_10px_#00413d] bg-white '>
          <h2 className="font-black text-2xl mb-3 text-[#00413d]">Check Your Inbox</h2>
          <p className="text-sm text-gray-500 ">Please check <span className='block text-[#04a298] font-bold text-base hover:text-[#00413d]'>{formData['email']}</span> to confirm your account </p>
          <div className="flex space-x-2 mb-6 mt-4 justify-start">
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
                  className="w-full p-2 bg-[#00413d] hover:bg-[#047a6d] text-white rounded mt-1 duration-200 ease-in-out"
                  onClick={handleVerify}
                >
                  Verify
          </button>
          
         </div> ))
      : 
      <div className=' border rounded-lg p-8 lg:p-6 lg:pt-7 lg:px-8 md:p-10 shadow-[0_0_10px_#00413d] bg-white '>
              <h3 className="font-black text-2xl mb-3 text-[#00413d] md:pr-14 ">Create an Account</h3>
              <p className='text-sm text-gray-400'>
                Already have an account? <Link to="/Login" className='text-[#04a298]'>Login</Link>
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
                 /> I agree to the <Link href="/terms" className="text-[#04a298]">Terms and Conditions</Link>
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
