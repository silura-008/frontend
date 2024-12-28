import { Outlet, Navigate } from "react-router-dom";

import React from 'react'

export const PrivateRoutes = () => {
    const user = true
    return user ? <Outlet/> : <Navigate to='/login'/> 
}

export default PrivateRoutes