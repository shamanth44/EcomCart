import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';


function OpenRoute({children}) {
  const { isAuthenticated, isLoading } =  useSelector((state) => state.auth)
    if(isLoading){
        // return <div>Loading...</div>
        return null
    }
    return isAuthenticated === false ? children : (<Navigate to="/"/>)
}

export default OpenRoute;