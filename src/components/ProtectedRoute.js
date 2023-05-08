import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom'

//Below we are making a component that redirects the unauthenticated user to the Login screen. We pass in
//children in the params, which refers to any component that is nested inside of ProtectedRoute tags. 
export default function ProtectedRoute({children}) {
    const {currentUser} = useAuth()
    //Below we check to see if currentUser is truthy. If so we return the children, otherwise redirect to '/login'.
  return currentUser ? children : <Navigate to='/login'/>
}