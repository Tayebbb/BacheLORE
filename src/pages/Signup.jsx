import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from "../api"; 

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setError('');
    setSuccessMsg('');

    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      setStatus('idle');
      return;
    }

    try {
      const res = await api.post("/signup", {
        fullName: name,
        email,
        password,
      });

      setSuccessMsg(res.data.msg || 'Account created successfully!');
      setStatus('success');
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.response?.data?.msg || 'Signup failed. Please try again.');
      setStatus('error');
    }
  };

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
                <input className="form-control" value={name} onChange={e => setName(e.target.value)} />
              </div>
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
                  {status === 'loading' ? 'Creating...' : 'Create account'}
                </button>
                <Link to="/login" className="muted small d-flex align-items-center ms-2">Already have an account?</Link>
              </div>
              {successMsg && (
                <div className="alert alert-success mt-3">{successMsg}</div>
              )}
              {error && (
                <div className="alert alert-danger mt-3">{error}</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
