import { useState } from 'react'
import { BrowserRouter as Router,Route ,Routes } from 'react-router-dom'
import PrivateRoutes from './utils/PrivateRoutes'
import { AuthProvider } from './utils/AuthContext'


import LandingPage from  './pages/LandingPage.jsx'
import Login from  './pages/Login.jsx'
import Register from './pages/Register.jsx'
import DashBoard from  './pages/DashBoard.jsx'
import ChatInterface from './pages/ChatInterface.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import AccountActivation from './pages/AccountActivation'
import ResetPassword from './pages/ResetPassword'
import Demo from './pages/Demo'

import './index.css'

function App() {
  return (
    <>
    
      <Router>
          <Routes>  
              <Route path="/" element={<LandingPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot" element={<ForgotPassword />} />
              <Route path="/demo" element={<Demo />} />

              <Route path="/activate/:uid/:token" element={<AccountActivation />} />
              <Route path="/password/reset/confirm/:uid/:token" element={<ResetPassword />} />
          </Routes>
          <AuthProvider>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route element={<PrivateRoutes/>} >
                  <Route path="/dashboard" element={<DashBoard />} />
                  <Route path="/chat" element={<ChatInterface />} />
                  <Route path="/profile" element={<ProfilePage />} />
                </Route>
              </Routes>
          </AuthProvider>
      </Router>
      
    </>
  )
}

export default App
