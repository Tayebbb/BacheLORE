import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { login as authLogin } from '../lib/auth'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('idle')

  const navigate = useNavigate()
  const location = useLocation()

  const submit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    await new Promise(r=>setTimeout(r,700))
    setStatus('success')
    // set simple client-side auth flag
  authLogin()
  // redirect to next if provided, otherwise /home
  try{
    const params = new URLSearchParams(location.search)
    const next = params.get('next')
    if(next) navigate(next)
    else navigate('/home')
  }catch(err){
    navigate('/home')
  }
  }

  return (
    <main className="container py-5 auth-page">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 auth-card">
            <h3 className="mb-3">Welcome back</h3>
            <p className="muted">Sign in to access your dashboard and services.</p>
            <form onSubmit={submit} className="mt-3">
              <div className="mb-2">
                <label className="form-label small">Email</label>
                <input className="form-control" value={email} onChange={e=>setEmail(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label small">Password</label>
                <input type="password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)} />
              </div>
              <div className="d-flex gap-2 align-items-center">
                <button className="btn hero-cta" type="submit">{status==='loading' ? 'Signing in...' : 'Sign in'}</button>
                <Link to="/signup" className="muted small d-flex align-items-center ms-2">Don't have an account?</Link>
              </div>
              {status === 'success' && (
                <div className="alert alert-success mt-3">Signed in (mock)</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
