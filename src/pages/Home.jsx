import React, { useState } from 'react'
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
        <div className="testimonials-static mt-3 d-flex gap-3">
          <div className="testimonial-card testimonial p-3">"BacheLORE helped me find a roommate in 3 days." — Ali</div>
          <div className="testimonial-card testimonial p-3">"The marketplace is so easy to use." — Samira</div>
          <div className="testimonial-card testimonial p-3">"I love the bills splitter — lifesaver." — Omar</div>
        </div>
      </section>

    </main>
  )
}