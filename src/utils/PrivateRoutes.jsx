import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import React from 'react'

export const PrivateRoutes = () => {
    const navigate = useNavigate();
    const {user} = useAuth();
    return user ? <Outlet/> : navigate('/login',{replace : true}) 
}

export default PrivateRoutes