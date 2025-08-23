import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home.jsx'
import Login from '../pages/Login.jsx'
import Signup from '../pages/Signup.jsx'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

export default function Router(){
  return (
    <>
  <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
  <Route path="/login" element={<Login/>} />
  <Route path="/signup" element={<Signup/>} />
        <Route path="/dashboard" element={<div>Dashboard</div>} />
        <Route path="/roommates" element={<div>Roommates</div>} />
        <Route path="/maids" element={<div>Maids</div>} />
        <Route path="/tuition" element={<div>Tuition</div>} />
        <Route path="/bills" element={<div>Bills</div>} />
        <Route path="/marketplace" element={<div>Marketplace</div>} />
        <Route path="/item/:id" element={<div>ItemDetail</div>} />
        <Route path="/post" element={<div>PostItem</div>} />
        <Route path="/profile" element={<div>Profile</div>} />
        <Route path="/subscription" element={<div>Subscription</div>} />
        <Route path="*" element={<div>NotFound</div>} />
      </Routes>
      <Footer />
    </>
  )
}