import React from 'react'
import { BRAND } from '../assets/brand'

export default function Footer(){
  return (
  <footer className="py-3" style={{background:BRAND.colors.primary, color:'#fff'}}>
      <div className="container d-flex justify-content-between align-items-center">
        <div>
          <strong>{BRAND.name}</strong>
          <div className="small text-white">Helping bachelors live smarter</div>
        </div>
        <div className="small">© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</div>
      </div>
    </footer>
  )
}
