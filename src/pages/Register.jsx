import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // Mock API call - would be replaced with actual API integration
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex font-comfortaa">
      {/* Left Section with Background */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#00413d] to-[#047a6d] items-center justify-center">
        <div className="text-white text-center px-8 w-3/4">
          <h1 className="text-4xl font-bold mb-6 ">Join Us !</h1>
          <p className="text-lg mb-8">You are just a few steps away from starting..</p>
          <div className="w-3/4 mx-auto opacity-80">
            {/* add an illustration or decorative elements /image*/}
            <div className="aspect-square rounded-full bg-white/10 backdrop-blur-sm" />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {!isSubmitted ? (
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-3xl font-bold text-[#00413d] mb-2">Create Account</h2>
              <p className="text-gray-600 mb-6">
                Already have an account?{' '}
                <Link to="/login" className="text-[#04a298] hover:text-[#00413d] font-semibold">
                  Sign in
                </Link>
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#04a298] focus:border-transparent transition duration-200"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#04a298] focus:border-transparent transition duration-200"
                    placeholder="Create a password"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gre-300 focus:ring-2 focus:ring-[#04a298] focus:border-transparent transition duration-200"
                    placeholder="Confirm your password"
                    required
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    className="w-4 h-4 text-[#04a298] border-gray-300 rounded focus:ring-[#04a298]"
                    required
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                    I agree to the{' '}
                    <Link to="/terms" className="text-[#04a298] hover:text-[#00413d]">
                      Terms and Conditions
                    </Link>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-[#00413d] hover:bg-[#047a6d] text-white rounded-lg font-medium transition duration-200 ease-in-out transform hover:scale-[1.02]"
                >
                  Create Account
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="mb-6">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
                
                <h2 className="text-2xl font-bold text-[#00413d] mb-2">Check Your Inbox</h2>
                <p className="text-gray-600">
                  We've sent a verification link to
                  <span className="block font-semibold text-[#04a298] mt-1">{formData.email}</span>
                </p>
              </div>
              <p className="text-sm text-gray-500">
                Didn't receive the email?{' '}
                <button className="text-[#04a298] hover:text-[#00413d] font-medium">
                  Resend verification
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;