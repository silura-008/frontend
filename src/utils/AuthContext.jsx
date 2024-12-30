
import React, { createContext, useState, useContext, useEffect } from 'react';
import { replace, useNavigate } from 'react-router-dom';
import axiosAuthInstance from './axiosAuthInstance';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);


  //geting user data from local storage
  const checkAuth = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        const response = await axiosAuthInstance.get('/api/auth/users/me/');
        setUser(response.data);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      
      const response = await axiosAuthInstance.post('/api/auth/jwt/create/',{
        email,
        password,
      });
      
      const { access, refresh } = response.data;
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      
      const userResponse = await axiosAuthInstance.get('/api/auth/users/me/');
      setUser(userResponse.data);
      
      navigate('/profile');
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Login failed'
      };
    }
  };


  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
    navigate('/login',{replace: true});
  };

  // Forgot password handling
  const resetPassword = async (email) => {
    try {
      await axiosAuthInstance.post('/api/auth/users/reset_password/', {
        email,
      });
      return {
        success: true,
        message: 'Password reset email sent successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || 'Password reset failed'
      };
    }
  };

  const resetPasswordConfirm = async (uid, token, new_password) => {
    try {
      await axiosAuthInstance.post('/api/auth/users/reset_password_confirm/', {
        uid,
        token,
        new_password,
      });
      return {
        success: true,
        message: 'Password reset successful'
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || 'Password reset confirmation failed'
      };
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    resetPassword,
    resetPasswordConfirm,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};