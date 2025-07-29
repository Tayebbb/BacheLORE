import React from "react";

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <span>© {new Date().getFullYear()} BacheLORE</span>
      <div className="footer-social">
        <a href="#" aria-label="Twitter">🐦</a>
        <a href="#" aria-label="Facebook">📘</a>
        <a href="#" aria-label="Instagram">📸</a>
      </div>
    </div>
  </footer>
);

export default Footer;
