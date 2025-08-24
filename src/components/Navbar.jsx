import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { BRAND } from '../assets/brand'

export default function Navbar(){
  const navRef = useRef(null)

  useEffect(()=>{
    const el = navRef.current
    if(!el) return
    const onScroll = () => {
      if(window.scrollY > 8) el.classList.add('scrolled')
      else el.classList.remove('scrolled')
    }
    window.addEventListener('scroll', onScroll, {passive:true})
    return ()=> window.removeEventListener('scroll', onScroll)
  }, [])

  return (
  <nav ref={navRef} className="navbar navbar-expand-lg sticky-top navbar-custom navbar-dark" style={{backdropFilter: 'blur(6px)', background: BRAND.colors.primary, borderBottom: '1px solid rgba(0,0,0,0.06)'}}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2 text-white" to="/">
          <img src="/logo.png" alt="BacheLORE" width={36} height={36} style={{objectFit:'contain', borderRadius:6}} />
          <span style={{fontWeight:700, color:'#fff'}}>BacheLORE</span>
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-lg-center">
            <li className="nav-item"><Link className="nav-link text-white" to="/roommates">Roommates</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/maids">Maids</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/tuition">Tuition</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/bills">Bills</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/marketplace">Marketplace</Link></li>
            <li className="nav-item mt-2 mt-lg-0">
              <Link className="btn btn-sm btn-cta-white w-100 w-lg-auto text-center" to="/login">Login</Link>
            </li>
            <li className="nav-item mt-2 mt-lg-0 ms-lg-2">
              <Link className="btn btn-sm btn-cta-white w-100 w-lg-auto text-center" to="/signup">Sign up</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
