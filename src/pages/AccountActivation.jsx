import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle2, XCircle, Loader2} from 'lucide-react';

const AccountActivation = () => {
  const { uid, token } = useParams();
  const [activationStatus, setActivationStatus] = useState('loading');

  useEffect(() => {
    const verifyAccount = async () => {
      try {
        // Mock API call - replace with actual API integration
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Mock success/failure (random for demo) - replace with actual API response
        const success = Math.random() > 0.5;
        console.log(`${uid} ${token}`)
        setActivationStatus(success ? 'success' : 'failed');
        
        // Actual API call would look something like this:
        // const response = await fetch('/auth/users/activation/', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ uid, token })
        // });
        // setActivationStatus(response.ok ? 'success' : 'failed');
      } catch (error) {
        setActivationStatus('failed');
      }
    };

    verifyAccount();
  }, [uid, token]);

  const getContent = () => {
    switch (activationStatus) {
      case 'loading':
        return {
          icon: <Loader2 className="w-16 h-16 text-[#04a298] animate-spin" />,
          title: 'Verifying Your Account',
          message: 'Please wait while we activate your account...',
          background: "bg-gray-50",
          buttonText: null
        };

      case 'success':
        return {
          icon: <CheckCircle2 className="w-16 h-16 text-green-500" />,
          title: 'Account Activated!',
          message: 'Your account has been successfully verified. You can now log in to access your account.',
          background: "bg-green-50",
          buttonText: 'Continue to Login'
        };

      case 'failed':
        return {
          icon: <XCircle className="w-16 h-16 text-red-500" />,
          title: 'Verification Failed',
          message: 'We couldn\'t verify your account. The link may have expired or is invalid.',
          background: "bg-red-50",
          buttonText: null
        };

      default:
        return null;
    }
  };

  const content = getContent();

  return (
    <div className={`min-h-screen  ${content.background}  font-comfortaa flex items-center justify-center p-6`}>
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <div className="flex justify-center mb-8">
            {content.icon}
          </div>
          
          <h2 className="text-2xl font-bold text-[#00413d] mb-4">
            {content.title}
          </h2>
          
          <p className="text-gray-600 mb-8">
            {content.message}
          </p>

          {content.buttonText && (
            <Link 
              to="/login"
              className="block w-full py-3 px-4 bg-[#00413d] hover:bg-[#047a6d] text-white rounded-lg font-medium transition duration-200 ease-in-out transform hover:scale-[1.02]"
            >
              {content.buttonText}
              
            </Link>
          )}

          {activationStatus === 'failed' && (
            <p className="mt-6 text-sm text-gray-500">
              Need help? {' '}
              <Link to="/contact" className="text-[#04a298] hover:text-[#00413d] font-medium">
                Contact Support
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountActivation;
