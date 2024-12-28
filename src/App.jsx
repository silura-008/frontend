import { useState } from 'react'
import { BrowserRouter as Router,Route ,Routes } from 'react-router-dom'
import PrivateRoutes from './utilities/PrivateRoutes'

import LandingPage from  './pages/LandingPage.jsx'
import Login from  './pages/Login.jsx'
import Register from './pages/Register.jsx'
import DashBoard from  './pages/DashBoard.jsx'
import ChatInterface from './pages/ChatInterface.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import './index.css'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<PrivateRoutes/>} >
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/chat" element={<ChatInterface />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
