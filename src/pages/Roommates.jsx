import React, { useEffect, useState } from 'react'
import { ROOMMATES_SAMPLE as demo } from '../data/samples'
import ListingCard from '../components/ListingCard'
import { getUser } from '../lib/auth'
export default function Roommates(){
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState(null);
  const [listings, setListings] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', contact: '', location: '', roomsAvailable: '', details: '' });
  useEffect(()=>{
    const u = getUser();
    setUser(u);
    const load = async ()=>{
      if(u){
        try{ const r = await fetch(`/api/roommates/${u.id}/listing`); if(r.ok){ const j = await r.json(); setListing(j); setForm({ name: j.name||'', email: j.email||'', contact: j.contact||'', location: j.location||'', roomsAvailable: j.roomsAvailable||'', details: j.details||'' }); } }
        catch(e){}
      }
      try{
        const uid = u ? u.id : '';
        const r = await fetch(`/api/roommates/listings?userId=${uid}`);
        if(r.ok){ const j = await r.json(); setListings(j); }
        else { setListings(demo); }
      }catch(e){ setListings(demo); }
      setLoading(false);
    }
    load();
  },[]);
  const applyAsHost = async (e) => {
    e.preventDefault();
    if(!user) return alert('Please login to apply as host');
    try{
      const res = await fetch(`/api/roommates/${user.id}/apply`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if(res.ok){ setListing(data.listing); alert('You are now listed as a host'); }
      else alert(data.msg || data.error || 'Error');
    }catch(err){ alert('Network error'); }
  }

  const updateListing = async (e) => {
    e.preventDefault();
    if(!user) return alert('Please login');
    try{
      const res = await fetch(`/api/roommates/${user.id}/listing`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if(res.ok){ setListing(data.listing); alert('Listing updated'); }
      else alert(data.msg || data.error || 'Error');
    }catch(err){ alert('Network error'); }
  }

  const removeListing = async () => {
    if(!user) return alert('Please login');
    if(!window.confirm('Remove your listing?')) return;
    try{
      const res = await fetch(`/api/roommates/${user.id}/listing`, { method: 'DELETE' });
      if(res.ok){ setListing(null); alert('Listing removed'); }
      else alert('Error removing');
    }catch(err){ alert('Network error'); }
  }

  const applyTo = async (listingId) => {
    if(!user) return alert('Please login to apply');
    const message = window.prompt('Write a short message to the host (optional)');
    try{
      const res = await fetch(`/api/roommates/${listingId}/apply`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ applicantId: user.id, name: user.fullName || '', email: user.email || '', message }) });
      const data = await res.json();
      if(res.ok) alert('Application sent'); else alert(data.msg || 'Error');
    }catch(err){ alert('Network error'); }
  }

  if(loading) return <main className="container py-5">Loading...</main>

  return (
    <main className="container py-5">
      <h3>Roommates</h3>
      <p className="muted">Find compatible roommates.</p>

      {user ? (
        <div className="card p-3 mb-3">
          <h5>{listing ? 'Edit your Host Listing' : 'Apply as Host'}</h5>
          <form onSubmit={listing ? updateListing : applyAsHost}>
            <input className="form-control mb-2" placeholder="Name" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} required />
            <input className="form-control mb-2" placeholder="Contact" value={form.contact} onChange={e=>setForm(f=>({...f,contact:e.target.value}))} />
            <input className="form-control mb-2" placeholder="Location" value={form.location} onChange={e=>setForm(f=>({...f,location:e.target.value}))} />
            <input className="form-control mb-2" placeholder="Rooms available (e.g., 1 room)" value={form.roomsAvailable} onChange={e=>setForm(f=>({...f,roomsAvailable:e.target.value}))} />
            <textarea className="form-control mb-2" placeholder="Details" value={form.details} onChange={e=>setForm(f=>({...f,details:e.target.value}))} />
            <div className="d-flex gap-2">
              <button className="btn btn-primary" type="submit">{listing ? 'Update Listing' : 'Apply as Host'}</button>
              {listing && <button type="button" className="btn btn-outline-danger" onClick={removeListing}>Remove Listing</button>}
            </div>
          </form>
        </div>
      ) : (
        <div className="alert alert-secondary">Login to apply as host.</div>
      )}

      <div className="row g-3">
        {(listings.length === 0 ? demo : listings).map(d=> (
          <div className="col-md-6" key={d._id || d.id}>
            <div className="feature-card p-3">
              <h6>{d.name || d.title}</h6>
              {d.location && <div className="muted small">{d.location}</div>}
              <div className="mt-2 d-flex justify-content-between align-items-center">
                <div className="fw-bold">{d.roomsAvailable ? d.roomsAvailable : ''}</div>
                <div>
                  <button className="btn btn-sm btn-outline-primary me-2" onClick={()=>applyTo(d._id)}>Apply</button>
                  <button className="btn btn-sm btn-ghost" onClick={()=>{}}>View</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
