import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
// import Login_img from '../assets/Login_img.jpg';
import Notification from '../components/Notification';
import { CircleAlert, Loader2 } from 'lucide-react';


function Login() {
  const [notification, setNotification] = useState(null);
  const [status, setStatus] = useState('idle');
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
    setStatus('loading')
    const result = await login(formData.email, formData.password);
    setStatus('idle')
    if (!result.success) {
      console.log(result.error)
      setNotification({
        icon: <CircleAlert className="text-red-600" />,
        message: `${result.error}`
      });
  
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex font-comfortaa">
      {/* Left Section with Background Color/Pattern */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#00413d] to-[#047a6d] items-center justify-center">
        <div className="text-white text-center px-8">
          <h1 className="text-4xl font-bold mb-6">Welcome Back!</h1>
          <p className="text-lg mb-8">We're excited to see you again.</p>
          <div className="w-3/4 mx-auto opacity-80">
            {/*illustration or decorative elements /image*/}
            <div className="aspect-square rounded-full bg-white/10 backdrop-blur-sm" />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#00413d] mb-2">Welcome Back</h2>
            <p className="text-gray-600 mb-8">
              Don't have an account?{' '}
              <Link to="/Register" className="text-[#04a298] hover:text-[#00413d] font-semibold">
                Sign Up
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
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="flex justify-end">
                <Link 
                  to="/forgot" 
                  className="text-[#04a298] hover:text-[#00413d] font-medium text-sm"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3 px-4 bg-[#00413d] hover:bg-[#047a6d] text-white rounded-lg font-medium transition duration-200 ease-in-out transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Logining...
                    </>
                  ) : 'Login'}
                </button>
            </form>
          </div>
        </div>

        {/* Notification */}
        {notification && <Notification notification={notification}/>}
      </div>
    </div>
  );
}

export default Login;