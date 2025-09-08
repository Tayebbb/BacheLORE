import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ADMIN_CODE = 'choton2025'; // Should match backend, or use env

export default function AdminLogin() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code === ADMIN_CODE) {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin-dashboard');
    } else {
      setError('Invalid admin code.');
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card p-4" style={{ maxWidth: 400, width: '100%' }}>
        <h2 className="mb-3 text-center">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="adminCode" className="form-label">Admin Code</label>
            <input
              type="password"
              className="form-control"
              id="adminCode"
              value={code}
              onChange={e => setCode(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
}
