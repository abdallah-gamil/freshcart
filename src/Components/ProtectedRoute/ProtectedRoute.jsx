import React from 'react'
import { Navigate } from 'react-router-dom'


export default function ProtectedRoute(probs) {
  if (localStorage.getItem('userToken')!== null){
    return probs.children
  }
  else 
  {
    return <Navigate to = {'/login'}/>
  }
 
 
}
