import React from "react";
import "../App.css";

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-logo">BacheLORE</div>
    <ul className="navbar-links">
      <li><a href="#hero">Home</a></li>
      <li><a href="#services">Services</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>
);

export default Navbar;
