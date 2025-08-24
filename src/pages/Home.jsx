import React, { useState, useRef, useEffect } from 'react'
import announcements from '../data/announcements'
import { Link } from 'react-router-dom'

const features = [
  { key: 'roommates', title: 'Roommates', text: 'Find compatible roommates effortlessly.', icon: 'people-fill' },
  { key: 'maids', title: 'Maids', text: 'Book trusted home help instantly.', icon: 'broom' },
  { key: 'tuition', title: 'Tuition', text: 'Hire tutors for any subject on-demand.', icon: 'book' },
  { key: 'bills', title: 'Bills', text: 'Split bills with friends and track expenses.', icon: 'calculator' },
  { key: 'marketplace', title: 'Marketplace', text: 'Buy, sell, or trade items with local bachelors.', icon: 'cart' },
  { key: 'houserent', title: 'House Rent', text: 'Search available houses and rooms for rent near you.', icon: 'house' }
]

export default function Home(){
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  
  const trackRef = useRef(null)

  useEffect(()=>{
    const track = trackRef.current || document.querySelector('.testimonials-static')
    if(!track) return

    let paused = false
    const pause = ()=> paused = true
    const resume = ()=> paused = false

    track.addEventListener('mouseenter', pause)
    track.addEventListener('mouseleave', resume)
    track.addEventListener('focusin', pause)
    track.addEventListener('focusout', resume)

  let cards = track.querySelectorAll('.testimonial-card')
  let gap = parseFloat(getComputedStyle(track).gap) || 16
  let cardWidth = cards[0]?.getBoundingClientRect().width || track.clientWidth
  // on narrow/mobile screens we want to always show/move 1 card at a time
  let isMobileView = track.clientWidth < 768
  let visible = isMobileView ? 1 : Math.max(1, Math.floor((track.clientWidth + gap) / (cardWidth + gap)))
  let maxIndex = Math.max(0, cards.length - visible)

    const recompute = ()=>{
      cards = track.querySelectorAll('.testimonial-card')
      gap = parseFloat(getComputedStyle(track).gap) || 16
      cardWidth = cards[0]?.getBoundingClientRect().width || track.clientWidth
      isMobileView = track.clientWidth < 768
      visible = isMobileView ? 1 : Math.max(1, Math.floor((track.clientWidth + gap) / (cardWidth + gap)))
      maxIndex = Math.max(0, cards.length - visible)
    }

    let idx = 0
    const scrollToIndex = (i, smooth = true)=>{
      const left = Math.round(i * (cardWidth + gap))
      try{ track.scrollTo({left, behavior: smooth ? 'smooth' : 'auto'}) }catch(e){ track.scrollLeft = left }
    }

    // initial snap to 0 to avoid half-cut cards on mount
    scrollToIndex(0, false)

    const step = ()=>{
      if(paused) return
      recompute()
      idx++
      if(idx > maxIndex) idx = 0
      scrollToIndex(idx, true)
    }

    const interval = setInterval(step, 3000)

    let resizeTimer = null
    const onResize = ()=>{
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(()=>{
        recompute()
        // ensure current index is within bounds
        if(idx > maxIndex) idx = 0
        scrollToIndex(idx, true)
      }, 120)
    }
    window.addEventListener('resize', onResize)

    return ()=>{
      clearInterval(interval)
      window.removeEventListener('resize', onResize)
      track.removeEventListener('mouseenter', pause)
      track.removeEventListener('mouseleave', resume)
      track.removeEventListener('focusin', pause)
      track.removeEventListener('focusout', resume)
    }
  }, [])

  return (
    <main>
      <header className="container container-hero">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <img src="/logo.png" alt="logo" style={{height:36}} />
            <h1 className="mt-4">BacheLORE – Your Ultimate Bachelor Life Companion</h1>
            <p className="muted">All the tools, services, and guidance you need to live smarter, easier, and better.</p>
            <div className="mt-4 d-flex gap-2">
              <Link className="btn hero-cta" to="/subscription">Get Access – 99 Tk/month</Link>
              <a className="btn hero-cta" href="#features">Explore Features</a>
            </div>
          </div>
          <div className="col-lg-6 mt-4 mt-lg-0">
            <div className="newsletter">
              <h5>Subscribe to our Newsletter</h5>
              <form className="d-flex gap-2 mt-3 align-items-center" onSubmit={async (e)=>{
                e.preventDefault()
                // simple email validation
                const re = /^\S+@\S+\.\S+$/
                if(!re.test(email)){
                  setStatus('error'); setMessage('Please enter a valid email');
                  setTimeout(()=> setStatus('idle'), 2500)
                  return
                }
                setStatus('loading')
                // mock submit
                await new Promise(r=>setTimeout(r,800))
                setStatus('success')
                setMessage('Subscribed — check your inbox for confirmation')
                setEmail('')
                setTimeout(()=> setStatus('idle'), 3000)
              }}>
                <input className="form-control form-control-sm" placeholder="example@aust.edu" value={email} onChange={e=>setEmail(e.target.value)} />
                <button type="submit" className="btn hero-cta small">{status==='loading' ? 'Saving...' : 'Subscribe'}</button>
              </form>
              {status === 'success' && (
                <div className="alert alert-success mt-2" role="alert">{message}</div>
              )}
              {status === 'error' && (
                <div className="alert alert-danger mt-2" role="alert">{message}</div>
              )}
            </div>
          </div>
        </div>
      </header>

      <section id="features" className="container py-5">
        <div className="row g-4">
          {features.map(f=> (
            <div className="col-6 col-md-4" key={f.key}>
              <Link to={`/${f.key}`} className="text-decoration-none">
                <div className="feature-card p-3 gradient-card text-dark">
                  <div className="d-flex align-items-center gap-3">
                    <div className="d-flex align-items-center">
                      <i className={`bi-${f.icon} fs-3 text-primary`}></i>
                      {f.key === 'maids' && (
                        <span className="badge bg-white text-primary ms-2" title="cleaning"><i className="bi-bucket"/></span>
                      )}
                    </div>
                    <div>
                      <h6 className="mb-0">{f.title}</h6>
                      <p className="muted small mb-0">{f.text}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="container py-5">
        <div className="row">
          <div className="col-lg-8">
            <h3 className="panel-title">Recent activity</h3>
            <p className="muted panel-sub">Your latest trips through the app — quick access to recent searches, bookings, and listings.</p>
            <div className="mt-3 activity-panel">
              <ul className="list-group">
                <li className="list-group-item">
                  <div>
                    <div className="fw-bold">Booked maid: Cleaning for 2 hours</div>
                    <div className="muted small">Today • 10:30 AM</div>
                  </div>
                  <Link to="/maids" className="btn btn-sm btn-ghost">View</Link>
                </li>
                <li className="list-group-item">
                  <div>
                    <div className="fw-bold">Posted item for sale: Used desk</div>
                    <div className="muted small">Yesterday • Marketplace</div>
                  </div>
                  <Link to="/marketplace" className="btn btn-sm btn-ghost">Open</Link>
                </li>
                <li className="list-group-item">
                  <div>
                    <div className="fw-bold">Found roommate: Khalid</div>
                    <div className="muted small">3 days ago • Roommates</div>
                  </div>
                  <Link to="/roommates" className="btn btn-sm btn-ghost">Open</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4 mt-4 mt-lg-0">
            <h5 className="panel-title">Announcements</h5>
            <div className="announcements-panel">
              {announcements.map(a=> (
                <div key={a.id} className="announcement-item">
                  <div className="announcement-title">{a.title}</div>
                  <div className="announcement-meta muted small">{a.body}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}