import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home.jsx'
import PublicHome from '../pages/PublicHome.jsx'
import Login from '../pages/Login.jsx'
import Signup from '../pages/Signup.jsx'
import Tuition from '../pages/Tuition.jsx'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import Subscribe from '../pages/Subscribe.jsx'
import Bills from '../pages/Bills.jsx'
import Marketplace from '../pages/Marketplace.jsx'
import Roommates from '../pages/Roommates.jsx'
import Maids from '../pages/Maids.jsx'
import HouseRent from '../pages/HouseRent.jsx'

import { isAuthed, onAuthChange, offAuthChange } from '../lib/auth'

export default function Router(){
  const PrivateRoute = ({ children }) => {
    const [authed, setAuthed] = useState(() => isAuthed())
    useEffect(() => {
      const cb = () => setAuthed(isAuthed())
      onAuthChange(cb)
      return () => offAuthChange(cb)
    }, [])
    return authed ? children : <Navigate to="/login" replace />
  }
  return (
    <>
  <Navbar />
      <Routes>
  <Route path="/" element={<PublicHome/>} />
  <Route path="/home" element={<PrivateRoute><Home/></PrivateRoute>} />
  <Route path="/login" element={<Login/>} />
  <Route path="/signup" element={<Signup/>} />
        <Route path="/dashboard" element={<div>Dashboard</div>} />
  <Route path="/roommates" element={<PrivateRoute><Roommates/></PrivateRoute>} />
  <Route path="/maids" element={<PrivateRoute><Maids/></PrivateRoute>} />
  <Route path="/tuition" element={<PrivateRoute><Tuition/></PrivateRoute>} />
  <Route path="/bills" element={<PrivateRoute><Bills/></PrivateRoute>} />
  <Route path="/marketplace" element={<PrivateRoute><Marketplace/></PrivateRoute>} />
        <Route path="/item/:id" element={<div>ItemDetail</div>} />
  <Route path="/post" element={<div>PostItem</div>} />
  <Route path="/profile" element={<div>Profile</div>} />
  <Route path="/houserent" element={<PrivateRoute><HouseRent/></PrivateRoute>} />
  <Route path="/subscription" element={<PrivateRoute><Subscribe/></PrivateRoute>} />
        <Route path="*" element={<div>NotFound</div>} />
      </Routes>
      <Footer />
    </>
  )
}