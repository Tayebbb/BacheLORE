import React from 'react'
import { Routes, Route } from 'react-router-dom'
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

export default function Router(){
  return (
    <>
  <Navbar />
      <Routes>
  <Route path="/" element={<PublicHome/>} />
  <Route path="/home" element={<Home/>} />
  <Route path="/login" element={<Login/>} />
  <Route path="/signup" element={<Signup/>} />
        <Route path="/dashboard" element={<div>Dashboard</div>} />
  <Route path="/roommates" element={<Roommates/>} />
  <Route path="/maids" element={<Maids/>} />
  <Route path="/tuition" element={<Tuition/>} />
  <Route path="/bills" element={<Bills/>} />
  <Route path="/marketplace" element={<Marketplace/>} />
        <Route path="/item/:id" element={<div>ItemDetail</div>} />
  <Route path="/post" element={<div>PostItem</div>} />
  <Route path="/profile" element={<div>Profile</div>} />
  <Route path="/houserent" element={<HouseRent/>} />
  <Route path="/subscription" element={<Subscribe/>} />
        <Route path="*" element={<div>NotFound</div>} />
      </Routes>
      <Footer />
    </>
  )
}