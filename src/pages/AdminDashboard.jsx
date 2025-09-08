import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [announcement, setAnnouncement] = useState({ title: '', message: '' });
  const [tuition, setTuition] = useState({ title: '', subject: '', days: '', salary: '', location: '', description: '', contact: '' });
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [applied, setApplied] = useState([])
  const [booked, setBooked] = useState([])

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
    // client-side phone validation: must be 11 digits starting with 01
    const PHONE_RE = /^01\d{9}$/;
    if (!PHONE_RE.test(tuition.contact)) {
      setError('Contact must be an 11-digit phone number starting with 01');
      return;
    }
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

  // load applied and booked tuitions for admin
  React.useEffect(() => {
    const load = async () => {
      try{
        const token = localStorage.getItem('adminToken');
        const headers = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;
        const [aRes, bRes] = await Promise.all([fetch('/api/applied-tuitions', { headers }), fetch('/api/booked-tuitions', { headers })]);
        const aJson = await aRes.json();
        const bJson = await bRes.json();
        if(aRes.ok) setApplied(aJson);
        if(bRes.ok) setBooked(bJson);
      }catch(e){ console.error(e); }
    }
    load();
  },[])

  const verifyApplication = async (id) => {
    setMsg(''); setError('');
    try{
      const token = localStorage.getItem('adminToken');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const res = await fetch(`/api/applied-tuitions/${id}/verify`, { method: 'POST', headers, body: JSON.stringify({ adminCode }) });
  const data = await res.json();
  if(res.ok){ setMsg('Application verified.'); setApplied(a => a.filter(x=> x._id !== id)); setBooked(b => [data.booked, ...b]); }
  else setError(data.msg || data.error || 'Error verifying');
    }catch(err){ setError('Network error'); }
  }

  const unbook = async (id) => {
    setMsg(''); setError('');
    try{
      const token = localStorage.getItem('adminToken');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const res = await fetch(`/api/booked-tuitions/${id}/unbook`, { method: 'POST', headers, body: JSON.stringify({ adminCode }) });
      const data = await res.json();
      if(res.ok){ setMsg('Unbooked tuition.'); setBooked(b => b.filter(x=> x._id !== id)); }
      else setError(data.msg || 'Error unbooking');
    }catch(err){ setError('Network error'); }
  }

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
              <input className="form-control mb-2" placeholder="Title" value={tuition.title} onChange={e => setTuition(t => ({ ...t, title: e.target.value }))} required />
              <input className="form-control mb-2" placeholder="Subject" value={tuition.subject} onChange={e => setTuition(t => ({ ...t, subject: e.target.value }))} required />
              <input className="form-control mb-2" placeholder="Days (e.g., Mon-Wed-Fri)" value={tuition.days} onChange={e => setTuition(t => ({ ...t, days: e.target.value }))} required />
              <input className="form-control mb-2" placeholder="Salary (e.g., 1500 TK)" value={tuition.salary} onChange={e => setTuition(t => ({ ...t, salary: e.target.value }))} required />
              <input className="form-control mb-2" placeholder="Location" value={tuition.location} onChange={e => setTuition(t => ({ ...t, location: e.target.value }))} required />
              <textarea className="form-control mb-2" placeholder="Description" value={tuition.description} onChange={e => setTuition(t => ({ ...t, description: e.target.value }))} required />
              <input type="tel" pattern="01[0-9]{9}" title="11 digits, starting with 01" className="form-control mb-2" placeholder="Contact (11-digit, starts with 01)" value={tuition.contact} onChange={e => setTuition(t => ({ ...t, contact: e.target.value }))} required />
              <div className="form-text mb-2">Enter 11-digit phone number starting with 01 (e.g., 017XXXXXXXX)</div>
              <button className="btn btn-primary w-100" type="submit">Post</button>
            </form>
          </div>
        </div>
      </div>
      {(msg || error) && <div className={`alert ${msg ? 'alert-success' : 'alert-danger'} mt-3`}>{msg || error}</div>}
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card p-3">
            <h4>Applied Tuitions</h4>
            {applied.length === 0 ? <div className="muted">No applications</div> : (
              <div className="list-group">
                {applied.map(a => (
                  <div key={a._id} className="list-group-item d-flex justify-content-between align-items-start">
                    <div>
                      <div className="fw-bold">{a.name} — {a.email}</div>
                      <div className="small muted">Applied for ID: {a.tuitionId}</div>
                    </div>
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-success" onClick={() => verifyApplication(a._id)}>Verify & Book</button>
                      <button className="btn btn-sm btn-outline-secondary" onClick={async ()=>{
                        // allow deleting application if admin wants
                        const token = localStorage.getItem('adminToken');
                        const headers = { 'Content-Type': 'application/json' };
                        if (token) headers['Authorization'] = `Bearer ${token}`;
                        const res = await fetch(`/api/applied-tuitions/${a._id}`, { method: 'DELETE', headers });
                        if(res.ok) setApplied(prev => prev.filter(x=> x._id !== a._id));
                      }}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div className="card p-3">
            <h4>Booked Tuitions</h4>
            {booked.length === 0 ? <div className="muted">No booked tuitions</div> : (
              <div className="list-group">
                {booked.map(b => (
                  <div key={b._id} className="list-group-item d-flex justify-content-between align-items-start">
                    <div>
                      <div className="fw-bold">{b.title} — {b.location}</div>
                      <div className="small muted">Booked by: {b.applicantName} ({b.applicantEmail})</div>
                    </div>
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-warning" onClick={() => unbook(b._id)}>Unbook</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
