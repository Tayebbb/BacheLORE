import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const features = [
  {k:'roommates', title:'Roommates', icon:'people-fill', text:'Find compatible roommates quickly with verified profiles.'},
  {k:'maids', title:'Maids', icon:'broom', text:'Book trusted home help on-demand.'},
  {k:'tuition', title:'Tuition', icon:'book', text:'Hire tutors for any subject near you.'},
  {k:'bills', title:'Bills', icon:'calculator', text:'Split bills and track shared expenses easily.'},
  {k:'marketplace', title:'Marketplace', icon:'cart', text:'Buy, sell, and trade items locally.'},
  {k:'houserent', title:'House Rent', icon:'house', text:'Search available houses and rooms for rent near you.'}
]

export default function PublicHome(){
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
            <h1 className="mt-4">BacheLORE — Simplify Bachelor Life</h1>
            <p className="muted">A single app for roommates, tuition, chores, bills and more — try the demo to see how it works.</p>

            <div className="mt-4 d-flex gap-2">
              <Link className="btn hero-cta" to="/login">Try demo</Link>
              <Link className="btn btn-ghost" to="/subscription">Get subscription</Link>
            </div>

            <div className="mt-4">
              <small className="muted">No credit card required to explore the demo. Sign in to access personalized features.</small>
            </div>
          </div>

          <div className="col-lg-6 mt-4 mt-lg-0">
            <div className="row g-3">
              {features.map(f=> (
                <div className="col-6" key={f.k}>
                  <div className="feature-card p-3 gradient-card text-dark">
                    <div className="d-flex align-items-start gap-3">
                      <div style={{width:72, height:56, display:'flex', alignItems:'center', justifyContent:'center'}}>
                        <i className={`bi-${f.icon} fs-2 text-primary`} aria-hidden="true" />
                        {f.k === 'maids' && (
                          <span className="badge bg-white text-primary ms-2" title="cleaning"><i className="bi-bucket"/></span>
                        )}
                      </div>
                      <div>
                        <h6 className="mb-1">{f.title}</h6>
                        <p className="muted small mb-0">{f.text}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <section className="container py-5">
        <div className="row">
          <div className="col-lg-8">
            <h3>How it works</h3>
            <ol className="muted">
              <li>Browse the demo features on this page.</li>
              <li>Sign in to save preferences and access full tools.</li>
              <li>Subscribe to remove limits and get premium services.</li>
            </ol>
          </div>
          <div className="col-lg-4">
            <div className="gradient-card p-3 text-dark">
              <h6 className="mb-2">Quick facts</h6>
              <p className="muted small mb-1">Trusted by students and young professionals for organizing daily life.</p>
              <div className="d-flex gap-2 mt-2">
                <div className="small"><strong>6</strong><div className="muted">tools</div></div>
                <div className="small"><strong>99 Tk</strong><div className="muted">/month</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <h3>What users say</h3>
        <div className="testimonials-static mt-3 d-flex gap-3">
          <div className="testimonial-card testimonial p-3">"Quick roommate matches — enjoyed the experience." — Ali</div>
          <div className="testimonial-card testimonial p-3">"Tutors were responsive and helpful." — Fahad</div>
          <div className="testimonial-card testimonial p-3">"Marketplace saved me money on furniture." — Nadia</div>
        </div>
      </section>
    </main>
  )
}
