import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import React from 'react'

export const PrivateRoutes = () => {
    const {user} = useAuth();
    return user ? <Outlet/> : <Navigate to="/login "/>
}

export default PrivateRoutes