import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../components/axios'

export default function Signup(){
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if(!fullName || !email || !password || !confirmPassword){
      setError('Please fill all fields')
      setStatus('error')
      return
    }
    if(password !== confirmPassword){
      setError('Passwords do not match')
      setStatus('error')
      return
    }

    setStatus('loading')
    try{
      const { data } = await axios.post('/api/signup', { fullName, email, password })
      // backend returns { msg, user }
      if(data && data.user){
        setStatus('success')
        setError('')
      } else if(data && data.msg){
        setStatus('success')
        setError('')
      } else {
        setStatus('error')
        setError('Unexpected server response')
      }
    }catch(err){
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
            <p className="muted">Sign up to access roommate tools, marketplace, and more.</p>
            <form onSubmit={submit} className="mt-3">
              <div className="mb-2">
                <label className="form-label small">Full name</label>
                <input className="form-control" value={fullName} onChange={e => setFullName(e.target.value)} />
              </div>
              <div className="mb-2">
                <label className="form-label small">Email</label>
                <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="mb-2">
                <label className="form-label small">Password</label>
                <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label small">Confirm password</label>
                <input type="password" className="form-control" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
              </div>

              <div className="d-flex gap-2 align-items-center">
                <button className="btn hero-cta" type="submit" disabled={status==='loading'}>
                  {status === 'loading' ? 'Creating...' : 'Create account'}
                </button>
                <Link to="/login" className="muted small d-flex align-items-center ms-2">Already have an account?</Link>
              </div>

              {status === 'success' && (
                <div className="alert alert-success mt-3">Account created — you can now login.</div>
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
