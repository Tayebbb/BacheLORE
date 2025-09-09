import React from 'react'
import { BRAND } from '../assets/brand'

export default function Footer() {
  return (
    <footer className="py-4" style={{
      background: 'rgba(18,44,74,0.92)',
      color: 'var(--bachelore-light)',
      borderTop: '1.5px solid rgba(0,184,217,0.10)',
      boxShadow: '0 -2px 16px 0 rgba(10,31,68,0.08)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)'
    }}>
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center text-center text-md-start gap-2">
        <div className="mb-2 mb-md-0">
          <strong className="d-block" style={{fontSize:'1.2rem', color:'var(--bachelore-cyan)'}}>{BRAND.name}</strong>
          <div className="small" style={{color:'var(--bachelore-gray)'}}>For the Lore</div>
        </div>
        <div className="small" style={{color:'var(--bachelore-gray)'}}>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</div>
      </div>
    </footer>
  );
}
