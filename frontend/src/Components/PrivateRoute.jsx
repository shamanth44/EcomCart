import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

function PrivateRoute({children}) {
  const { isAuthenticated, isLoading } =  useSelector((state) => state.auth)


    if(isLoading) {
        // return <div className='px-16 text-3xl text-black font-bold'>Loading...</div>
        return children
    }

    return isAuthenticated === true ? children : (<Navigate to="/signin"/>)
}

export default PrivateRoute;