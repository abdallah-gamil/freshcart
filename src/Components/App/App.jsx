import React from 'react'
import Home from '../Home/Home'
import Cart from '../Cart/Cart'
import Register from '../Register/Register'
import Login from '../Login/Login'
import ProductDetails from '../ProductDetails/ProductDetails'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import Notfound from '../Notfound/Notfound'
import Layout from '../Layout/Layout'
import Address from '../Address/Address'
import Orders from '../Orders/Orders'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Loggedusercart from '../Loggedusercart/Loggedusercart'
import UserContextProvider, { UserContext } from '../../Context/UserContext'
import CartContextProvider from '../../Context/Cartcontext'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import { Toaster } from 'react-hot-toast'





let routers = createBrowserRouter([

  {
    path: '', element: <Layout />, children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'productDetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: 'Cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: 'Address', element: <ProtectedRoute><Address /></ProtectedRoute> },
      { path: 'allorders', element: <ProtectedRoute><Orders /></ProtectedRoute> },
      { path: 'Register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: 'freshcart/', element: <Login /> },
      { path: 'Products', element: <ProtectedRoute><FeaturedProducts /></ProtectedRoute> },
      { path: 'Loggedusercart', element: <ProtectedRoute><Loggedusercart /></ProtectedRoute> },
      { path: '*', element: <Notfound /> }
    ]

  }]);

export default function App() {

  return <UserContextProvider>
    <CartContextProvider>

      <Toaster />
      <RouterProvider router={routers}></RouterProvider>


    </CartContextProvider>

  </UserContextProvider>

}

