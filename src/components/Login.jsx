import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import api from "../api"; // Make sure this path is correct

<<<<<<< Updated upstream
import React, { useState } from "react";
import Navbar from "./Navbar";
import bg1image from "../assets/bg1image.jpg";
import "../App.css";
<<<<<<< Updated upstream
import axios from "axios";
=======
import AuthCard from './AuthCard'
import axios from './axios'
>>>>>>> Stashed changes
=======
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
>>>>>>> Stashed changes

  const navigate = useNavigate();
  const location = useLocation();

  const submit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setError('');

<<<<<<< Updated upstream
  if (!email || !password) {
    setError("Please enter both email and password.");
    return;
  }

  setError("");
  try {
    try {
  const { data } = await axios.post('/api/login', { email, password })
      if (data && data.user) {
        alert('Login successful!')
        console.log('Logged in user:', data.user)
        setEmail('')
        setPassword('')
      } else {
        setError((data && data.msg) || 'Invalid credentials')
      }
    } catch (err) {
      console.error(err)
      setError('Server error, try again later.')
=======
    if (!email || !password) {
      setError('Please enter both email and password.');
      setStatus('idle');
      return;
>>>>>>> Stashed changes
    }

    try {
      const res = await api.post("/login", { email, password });

      if (res.data.user) {
        setStatus('success');
        console.log("Logged in user:", res.data.user);

        const params = new URLSearchParams(location.search);
        const next = params.get('next');
        navigate(next || '/home');
      } else {
        setStatus('error');
        setError('Invalid credentials');
      }
    } catch (err) {
      console.error("Login error:", err);
      setStatus('error');
      setError(err.response?.data?.msg || 'Login failed. Please try again.');
    }
  };

  return (
<<<<<<< Updated upstream
    <>
      <img src={bg1image} alt="Background" className="background-image" />
      <div className="app-container">
        <Navbar />
        <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw', padding: 0, margin: 0 }}>
          <div className="card signup-gradient-card" style={{
            width: '100%',
            maxWidth: 420,
            minWidth: 0,
            padding: '2.2rem 2rem 2rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: '1.25rem',
            boxShadow: '0 16px 48px 0 rgba(0,184,217,0.25), 0 2px 8px 0 rgba(0,184,217,0.10)',
            border: 'none',
            background: 'linear-gradient(120deg, #122C4A 0%, #0A1F44 60%, #00B8D9 100%)',
            margin: '0 auto',
            transition: 'transform 0.18s',
          }}
          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.035)'}
          onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <h2 className="section-title" style={{ color: '#00B8D9', marginBottom: 8, letterSpacing: '0.04em', fontWeight: 700, fontSize: '2rem' }}>Login</h2>
            <form className="auth-form" onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 340, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input signup-gradient-input"
                style={{ background: 'rgba(240,242,245,0.97)', border: '1.5px solid #00B8D9', borderRadius: '0.7rem', fontWeight: 500, fontSize: '1.13rem', color: '#122C4A', boxShadow: '0 2px 8px rgba(0,184,217,0.08)', height: '2.7rem', padding: '1rem 1.2rem' }}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input signup-gradient-input"
                style={{ background: 'rgba(240,242,245,0.97)', border: '1.5px solid #00B8D9', borderRadius: '0.7rem', fontWeight: 500, fontSize: '1.13rem', color: '#122C4A', boxShadow: '0 2px 8px rgba(0,184,217,0.08)', height: '2.7rem', padding: '1rem 1.2rem' }}
              />
              {error && <div className="auth-error">{error}</div>}
              <button type="submit" className="auth-btn signup-gradient-btn" style={{ width: '100%', background: 'linear-gradient(90deg, #00B8D9 0%, #00E6F6 50%, #0099F7 100%)', color: '#122C4A', fontWeight: 700, fontSize: '1.08rem', borderRadius: '0.7rem', boxShadow: '0 4px 24px rgba(0,184,217,0.15)', border: 'none', marginTop: 8, padding: '0.85rem 0' }}>Login</button>
            </form>
          </div>
        </main>
=======
    <main className="container py-5 auth-page">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 auth-card">
            <h3 className="mb-3">Welcome back</h3>
            <p className="muted">Sign in to access your dashboard and services.</p>
            <form onSubmit={submit} className="mt-3">
              <div className="mb-2">
                <label className="form-label small">Email</label>
                <input className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label small">Password</label>
                <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <div className="d-flex gap-2 align-items-center">
                <button className="btn hero-cta" type="submit">
                  {status === 'loading' ? 'Signing in...' : 'Sign in'}
                </button>
                <Link to="/signup" className="muted small d-flex align-items-center ms-2">Don't have an account?</Link>
              </div>
              {status === 'success' && (
                <div className="alert alert-success mt-3">Login successful!</div>
              )}
              {error && (
                <div className="alert alert-danger mt-3">{error}</div>
              )}
            </form>
          </div>
        </div>
>>>>>>> Stashed changes
      </div>
    </main>
  );
}