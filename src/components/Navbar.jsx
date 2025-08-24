import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { BRAND } from '../assets/brand'

export default function Navbar(){
  const navRef = useRef(null)
  const [authed, setAuthed] = useState(()=>{
    try{ return !!localStorage.getItem('bachelore_auth') }catch(e){ return false }
  })
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    try{ localStorage.removeItem('bachelore_auth') }catch(e){}
    // notify other listeners/windows
    try{ window.dispatchEvent(new Event('bachelore_auth_change')) }catch(e){}
    setAuthed(false)
    navigate('/')
  }

  useEffect(()=>{
    const el = navRef.current
    if(el){
      const onScroll = () => {
        if(window.scrollY > 8) el.classList.add('scrolled')
        else el.classList.remove('scrolled')
      }
      window.addEventListener('scroll', onScroll, {passive:true})
      return ()=> window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(()=>{
    const onAuthChange = ()=>{
      try{ setAuthed(!!localStorage.getItem('bachelore_auth')) }catch(e){ setAuthed(false) }
    }
    // listen to cross-window storage events and our custom event
    window.addEventListener('storage', onAuthChange)
    window.addEventListener('bachelore_auth_change', onAuthChange)
    return ()=>{
      window.removeEventListener('storage', onAuthChange)
      window.removeEventListener('bachelore_auth_change', onAuthChange)
    }
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
            {(!authed || location.pathname === '/') ? (
              <>
                <li className="nav-item mt-2 mt-lg-0">
                  <Link className="btn btn-sm btn-cta-white w-100 w-lg-auto text-center" to="/login">Login</Link>
                </li>
                <li className="nav-item mt-2 mt-lg-0 ms-lg-2">
                  <Link className="btn btn-sm btn-cta-white w-100 w-lg-auto text-center" to="/signup">Sign up</Link>
                </li>
              </>
            ) : (
              <li className="nav-item mt-2 mt-lg-0 ms-lg-2">
                <button className="btn btn-sm btn-cta-white w-100 w-lg-auto text-center" onClick={handleLogout}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
