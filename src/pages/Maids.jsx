import React, { useEffect, useState } from 'react'
import { MAIDS_SAMPLE as sampleMaids } from '../data/samples'
import { getUser } from '../lib/auth'

export default function Maids(){
  const [maids, setMaids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try{
        const res = await fetch('/api/maids');
        if(res.ok){
          const data = await res.json();
          setMaids(data);
        } else {
          setMaids(sampleMaids);
        }
      }catch(e){
        setMaids(sampleMaids);
      }finally{ setLoading(false); }
    }
    load();
  }, []);

  const bookMaid = async (maidId, maid) => {
    try{
      // if this is sample data (no real _id) don't allow booking
      if(!maid || !maid._id){ alert('This maid is a sample/mock entry and cannot be booked. Create a real maid from Admin first.'); return; }
      const user = getUser();
      let name = user?.name || window.prompt('Your name') || '';
      let email = user?.email || window.prompt('Your email') || '';
      let contact = user?.contact || window.prompt('Your contact (11-digit)') || '';
      const message = window.prompt('Message / notes (optional)', '') || '';
      if(!maidId || !name || !email || !contact){ alert('Name, email and contact are required'); return; }
      const res = await fetch('/api/applied-maids', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ maidId, name, email, contact, message }) });
      const data = await res.json();
      if(res.ok){ alert('Booking request submitted. Admin will review it.'); }
      else alert(data.msg || data.error || 'Error submitting booking');
    }catch(err){ alert('Network error'); }
  }

  return (
    <main className="container py-5">
      <h3>Maids</h3>
      <p className="muted">Book trusted home help.</p>
      {loading ? <div className="muted">Loading...</div> : null}
      <div className="row g-3">
        {(maids || []).map((m, idx) => (
          <div className="col-md-6" key={m._id || m.id || idx}>
            <div className="feature-card p-3 d-flex align-items-start gap-3">
              <div style={{width:56, height:56, display:'flex', alignItems:'center', justifyContent:'center'}}>
                <i className="bi-bucket fs-3 text-primary" aria-hidden="true" />
              </div>
              <div>
                <h6 className="mb-0">{m.name}</h6>
                <div className="muted small">{m.location} {m.description ? '• ' + m.description : ''}</div>
                <div className="mt-2 d-flex align-items-center gap-3">
                  <div className="fw-bold">{m.hourlyRate || m.price || ''} Tk / hr</div>
                  <div>
                    <button className="btn hero-cta btn-sm" style={{padding:'.45rem .9rem'}} onClick={() => bookMaid(m._id || m.id, m)}>Book</button>
                  </div>
                </div>
                {m.contact ? <div className="small muted mt-1">Contact: {m.contact}</div> : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
