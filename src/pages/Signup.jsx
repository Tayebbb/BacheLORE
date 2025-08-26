import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../components/axios'

export default function Signup(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setError('')
    try {
      const payload = { fullName: name, email, password }
      console.log('Page signup payload:', payload)
      const { data } = await axios.post('/api/signup', payload)
      console.log('Page signup response:', data)
      setStatus('success')
    } catch (err) {
      console.error('Signup error (page):', err)
      const msg = err?.response?.data?.msg || err?.response?.data?.error || err.message || 'Signup failed'
      setError(msg)
      setStatus('error')
    }
  }

  return (
    <main className="container py-5 auth-page">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 auth-card">
            <h3 className="mb-3">Create an account</h3>
            <p className="muted">Join BacheLORE to start using services and posting items.</p>
            <form onSubmit={submit} className="mt-3">
              <div className="mb-2">
                <label className="form-label small">Full name</label>
                <input className="form-control" value={name} onChange={e=>setName(e.target.value)} />
              </div>
              <div className="mb-2">
                <label className="form-label small">Email</label>
                <input className="form-control" value={email} onChange={e=>setEmail(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label small">Password</label>
                <input type="password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)} />
              </div>
              <div className="d-flex gap-2 align-items-center">
                <button className="btn hero-cta" type="submit">{status==='loading' ? 'Creating...' : 'Create account'}</button>
                <Link to="/login" className="muted small d-flex align-items-center ms-2">Already have an account?</Link>
              </div>
              {status === 'success' && (
                <div className="alert alert-success mt-3">Account created — check your email or login.</div>
              )}
              {status === 'error' && (
                <div className="alert alert-danger mt-3">{error || 'Signup failed'}</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
