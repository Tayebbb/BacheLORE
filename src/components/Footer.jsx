import React from 'react'
import { BRAND } from '../assets/brand'

export default function Footer(){
  return (
  <footer className="py-3" style={{background:BRAND.colors.primary, color:'#fff'}}>
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center text-center text-md-start gap-2">
        <div className="mb-2 mb-md-0">
          <strong className="d-block">{BRAND.name}</strong>
          <div className="small text-white">For the Lore</div>
        </div>
        <div className="small">© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</div>
      </div>
    </footer>
  )
}
