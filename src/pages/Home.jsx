import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

const features = [
  { key: 'roommates', title: 'Roommates', text: 'Find compatible roommates effortlessly.', icon: 'people-fill' },
  { key: 'maids', title: 'Maids', text: 'Book trusted home help instantly.', icon: 'broom' },
  { key: 'tuition', title: 'Tuition', text: 'Hire tutors for any subject on-demand.', icon: 'book' },
  { key: 'bills', title: 'Bills', text: 'Split bills with friends and track expenses.', icon: 'calculator' },
  { key: 'marketplace', title: 'Marketplace', text: 'Buy, sell, or trade items with local bachelors.', icon: 'cart' },
  { key: 'profile', title: 'Profile', text: 'Manage your preferences and personal info.', icon: 'person-circle' }
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
    let visible = Math.max(1, Math.floor((track.clientWidth + gap) / (cardWidth + gap)))
    let maxIndex = Math.max(0, cards.length - visible)

    const recompute = ()=>{
      cards = track.querySelectorAll('.testimonial-card')
      gap = parseFloat(getComputedStyle(track).gap) || 16
      cardWidth = cards[0]?.getBoundingClientRect().width || track.clientWidth
      visible = Math.max(1, Math.floor((track.clientWidth + gap) / (cardWidth + gap)))
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
              <a className="btn hero-cta" href="#pricing">Get Access – $1.99/month</a>
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
                    <i className={`bi-${f.icon} fs-3 text-primary`}></i>
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
        <h3>What users say</h3>
        <div className="testimonials-static mt-3 d-flex gap-3" ref={trackRef}>
          {/* testimonials will be controlled by autoplay effect below */}
          <div className="testimonial-card testimonial p-3">"BacheLORE helped me find a roommate in 3 days." — Ali</div>
          <div className="testimonial-card testimonial p-3">"The marketplace is so easy to use." — Samira</div>
          <div className="testimonial-card testimonial p-3">"I love the bills splitter — lifesaver." — Omar</div>
          <div className="testimonial-card testimonial p-3">"Tutors responded fast and were affordable." — Fahad</div>
          <div className="testimonial-card testimonial p-3">"Found great deals on furniture here." — Nadia</div>
          <div className="testimonial-card testimonial p-3">"Customer support helped me quickly." — Bilal</div>
        </div>
      </section>

    </main>
  )
}