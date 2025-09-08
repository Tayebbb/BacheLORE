import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [announcement, setAnnouncement] = useState({ title: '', message: '' });
  const [tuition, setTuition] = useState({ subject: '', description: '', contact: '' });
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  // Check admin
  React.useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      navigate('/admin-login');
    }
  }, [navigate]);

  const adminCode = 'choton2025'; // Should match backend

  const handleAnnouncement = async (e) => {
    e.preventDefault();
    setMsg(''); setError('');
    try {
      const token = localStorage.getItem('adminToken');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const res = await fetch('/api/announcements', {
        method: 'POST',
        headers,
        body: JSON.stringify({ ...announcement, adminCode })
      });
      const data = await res.json();
      if (res.ok) {
        setMsg('Announcement posted!');
        setAnnouncement({ title: '', message: '' });
      } else {
        setError(data.msg || 'Error posting announcement');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  const handleTuition = async (e) => {
    e.preventDefault();
    setMsg(''); setError('');
    try {
      const token = localStorage.getItem('adminToken');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const res = await fetch('/api/tuitions', {
        method: 'POST',
        headers,
        body: JSON.stringify({ ...tuition, adminCode })
      });
      const data = await res.json();
      if (res.ok) {
        setMsg('Tuition posted!');
        setTuition({ subject: '', description: '', contact: '' });
      } else {
        setError(data.msg || 'Error posting tuition');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Admin Dashboard</h2>
      <button className="btn btn-secondary mb-4" onClick={() => { localStorage.removeItem('isAdmin'); navigate('/admin-login'); }}>Logout</button>
      <div className="row">
        <div className="col-md-6">
          <div className="card p-3 mb-4">
            <h4>Post Announcement</h4>
            <form onSubmit={handleAnnouncement}>
              <input className="form-control mb-2" placeholder="Title" value={announcement.title} onChange={e => setAnnouncement(a => ({ ...a, title: e.target.value }))} required />
              <textarea className="form-control mb-2" placeholder="Message" value={announcement.message} onChange={e => setAnnouncement(a => ({ ...a, message: e.target.value }))} required />
              <button className="btn btn-primary w-100" type="submit">Post</button>
            </form>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card p-3 mb-4">
            <h4>Post Tuition</h4>
            <form onSubmit={handleTuition}>
              <input className="form-control mb-2" placeholder="Subject" value={tuition.subject} onChange={e => setTuition(t => ({ ...t, subject: e.target.value }))} required />
              <textarea className="form-control mb-2" placeholder="Description" value={tuition.description} onChange={e => setTuition(t => ({ ...t, description: e.target.value }))} required />
              <input className="form-control mb-2" placeholder="Contact" value={tuition.contact} onChange={e => setTuition(t => ({ ...t, contact: e.target.value }))} required />
              <button className="btn btn-primary w-100" type="submit">Post</button>
            </form>
          </div>
        </div>
      </div>
      {(msg || error) && <div className={`alert ${msg ? 'alert-success' : 'alert-danger'} mt-3`}>{msg || error}</div>}
    </div>
  );
}
