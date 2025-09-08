import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUser } from '../lib/auth'

export default function HouseRent(){
  const [listings, setListings] = useState([]);
  const [filters, setFilters] = useState({ minPrice: '', maxPrice: '', location: '', rooms: '' });
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{ setUser(getUser()); load(); },[]);

  const load = async () => {
    try{
      const q = new URLSearchParams();
      if(filters.minPrice) q.set('minPrice', filters.minPrice);
      if(filters.maxPrice) q.set('maxPrice', filters.maxPrice);
      if(filters.location) q.set('location', filters.location);
      if(filters.rooms) q.set('rooms', filters.rooms);
      const res = await fetch('/api/house-rent?' + q.toString());
      if(res.ok) setListings(await res.json());
    }catch(err){ console.error(err); }
  }

  const createListing = async (ev) => {
    ev.preventDefault();
    if(!user) return alert('Login to post a listing');
    // only admin may create listings from client; attach adminCode if present
    if(localStorage.getItem('isAdmin') !== 'true') return alert('Only admin can create listings');
    const form = ev.target;
    const body = {
      ownerId: user.id,
      title: form.title.value,
      description: form.description.value,
      location: form.location.value,
      price: Number(form.price.value) || 0,
      rooms: Number(form.rooms.value) || 1,
      images: [],
      contact: form.contact.value,
      adminCode: 'choton2025'
    };
    try{
      const token = localStorage.getItem('adminToken');
      const headers = { 'Content-Type': 'application/json' };
      if(token) headers['Authorization'] = `Bearer ${token}`;
      const res = await fetch('/api/house-rent/create', { method: 'POST', headers, body: JSON.stringify(body) });
      const data = await res.json();
      if(res.ok){ alert('Listing created'); form.reset(); load(); }
      else alert(data.msg || data.error || 'Error creating listing');
    }catch(err){ alert('Network error'); }
  }

  const applyToListing = async (listing) => {
    if(!user) return alert('Login to apply/contact owner');
    const message = window.prompt('Message to owner (optional)');
    try{
      const body = { senderId: user.id, receiverId: listing.ownerRef || listing.owner || '', message: message || `Interested in ${listing.title || 'your listing'}` };
      const res = await fetch('/api/house-rent/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const data = await res.json();
      if(res.ok) alert('Message sent'); else alert(data.msg || 'Error sending message');
    }catch(err){ alert('Network error'); }
  }

  return (
    <main className="container py-5">
      <h3>House Rent</h3>
      <p className="muted">Search verified rental listings.</p>
      <div className="row">
        <div className="col-md-4">
          <div className="card p-3 mb-3">
            <h5>Filters</h5>
            <input className="form-control mb-2" placeholder="Min price" value={filters.minPrice} onChange={e=>setFilters(f=>({...f, minPrice: e.target.value}))} />
            <input className="form-control mb-2" placeholder="Max price" value={filters.maxPrice} onChange={e=>setFilters(f=>({...f, maxPrice: e.target.value}))} />
            <input className="form-control mb-2" placeholder="Location" value={filters.location} onChange={e=>setFilters(f=>({...f, location: e.target.value}))} />
            <input className="form-control mb-2" placeholder="Rooms" value={filters.rooms} onChange={e=>setFilters(f=>({...f, rooms: e.target.value}))} />
            <button className="btn btn-primary w-100" onClick={load}>Apply</button>
          </div>

          <div className="card p-3">
            <h5>Post Listing</h5>
            <div className="muted">Only administrators can post house listings. If you are an admin, please use the <a href="/admin-dashboard" onClick={(e)=>{ e.preventDefault(); if(localStorage.getItem('isAdmin') === 'true') navigate('/admin-dashboard'); else navigate('/admin-login'); }}>Admin Dashboard</a> to create listings.</div>
          </div>
        </div>
        <div className="col-md-8">
          {listings.length === 0 ? <div className="muted">No listings found</div> : (
            <div className="row g-3">
              {listings.map(l => (
                <div className="col-md-12" key={l._id}>
                  <div className="card p-3">
                    <h5>{l.title}</h5>
                    <div className="small muted">{l.location} • {l.rooms} rooms • {l.price} TK</div>
                    <p className="mt-2">{l.description}</p>
                    <div className="d-flex gap-2">
                      {localStorage.getItem('isAdmin') === 'true' ? (
                        <a className="btn btn-primary" href={`mailto:${l.contact || l.email || ''}`}>Contact</a>
                      ) : (
                        <button className="btn btn-primary" onClick={()=>applyToListing(l)}>Apply</button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
