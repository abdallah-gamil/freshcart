import React, { useContext, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'

export default function Layout() {
  let {setuserToken} = useContext(UserContext);
  useEffect(()=>
  {
   
    if (localStorage.getItem('userToken') !== null)
    {
      setuserToken(localStorage.getItem('userToken'))
    }

  },[])
  
  return <>
    <Navbar></Navbar>
    <div className="container mt-4">
      <Outlet></Outlet>
    </div>
    <Footer></Footer>
  </>
}
