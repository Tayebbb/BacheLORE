import React from "react";

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <span style={{ display: 'block', width: '100%', textAlign: 'center' }}>© {new Date().getFullYear()} BacheLORE </span>
      <div className="footer-social" style={{ display: 'block', width: '100%', textAlign: 'center' }}>
        <a href="#" aria-label="Twitter" style={{ margin: '0 0.5rem' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.37c-.83.5-1.75.87-2.72 1.07A4.28 4.28 0 0 0 12 8.5c0 .34.04.67.1.99C8.09 9.36 4.84 7.6 2.67 4.9c-.37.64-.58 1.38-.58 2.17 0 1.5.77 2.83 1.94 3.61-.72-.02-1.4-.22-1.99-.55v.06c0 2.1 1.49 3.85 3.47 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.1 2.94 3.95 2.97A8.6 8.6 0 0 1 2 19.54c-.34 0-.67-.02-1-.06A12.13 12.13 0 0 0 7.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 24 4.59c-.77.34-1.6.58-2.47.7z" fill="#00B8D9"/>
          </svg>
        </a>
        <a href="#" aria-label="Facebook" style={{ margin: '0 0.5rem' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.326v21.348C0 23.4.6 24 1.326 24H12.82v-9.294H9.692V11.01h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.92.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.696h-3.12V24h6.116C23.4 24 24 23.4 24 22.674V1.326C24 .6 23.4 0 22.675 0" fill="#00B8D9"/>
          </svg>
        </a>
        <a href="#" aria-label="Instagram" style={{ margin: '0 0.5rem' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.974 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.974-1.246-2.242-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.516 2.567 5.784 2.296 7.15 2.234 8.416 2.176 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.396 3.678 1.377c-.98.98-1.246 2.092-1.305 3.373C2.013 5.668 2 6.077 2 12c0 5.923.013 6.332.072 7.613.059 1.281.325 2.393 1.305 3.373.98.98 2.092 1.246 3.373 1.305C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.281-.059 2.393-.325 3.373-1.305.98-.98 1.246-2.092 1.305-3.373.059-1.281.072-1.69.072-7.613 0-5.923-.013-6.332-.072-7.613-.059-1.281-.325-2.393-1.305-3.373-.98-.98-2.092-1.246-3.373-1.305C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" fill="#00B8D9"/>
          </svg>
        </a>
      </div>
      <div style={{ width: '100%', textAlign: 'center', marginTop: '1rem' }}>
        <a href="#signup" className="footer-auth-btn" style={{
          background: '#00B8D9',
          color: '#122C4A',
          padding: '0.5rem 1.2rem',
          borderRadius: '0.5rem',
          textDecoration: 'none',
          fontWeight: 600,
          margin: '0 0.5rem',
          boxShadow: '0 2px 8px rgba(0,184,217,0.08)',
          transition: 'background 0.2s, color 0.2s'
        }}>Sign Up</a>
        <a href="#login" className="footer-auth-btn" style={{
          background: '#00B8D9',
          color: '#122C4A',
          padding: '0.5rem 1.2rem',
          borderRadius: '0.5rem',
          textDecoration: 'none',
          fontWeight: 600,
          margin: '0 0.5rem',
          boxShadow: '0 2px 8px rgba(0,184,217,0.08)',
          transition: 'background 0.2s, color 0.2s'
        }}>Login</a>
      </div>
    </div>
  </footer>
);

export default Footer;
