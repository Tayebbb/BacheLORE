import React from "react";
import logo from "../assets/bachelore-logo.png";
import "../App.css";

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-logo-group" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <img src={logo} alt="BacheLORE Logo" style={{ height: '80px', width: '80px', maxHeight: '100px', maxWidth: '100px', objectFit: 'contain', borderRadius: '16px', marginTop: '-16px', marginBottom: '-16px' }} />
      <span className="navbar-logo">BacheLORE</span>
    </div>
    <ul className="navbar-links">
      <li><a href="#hero">Home</a></li>
      <li><a href="#services">Services</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>
);

export default Navbar;
