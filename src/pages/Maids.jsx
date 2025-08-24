import React from 'react'
import { MAIDS_SAMPLE as maids } from '../data/samples'

export default function Maids(){
  return (
    <main className="container py-5">
      <h3>Maids</h3>
      <p className="muted">Book trusted home help.</p>
      <div className="row g-3">
        {maids.map(m=> (
          <div className="col-md-6" key={m.id}>
            <div className="feature-card p-3 d-flex align-items-start gap-3">
              <div style={{width:56, height:56, display:'flex', alignItems:'center', justifyContent:'center'}}>
                <i className="bi-bucket fs-3 text-primary" aria-hidden="true" />
              </div>
              <div>
                <h6 className="mb-0">{m.name}</h6>
                <div className="muted small">{m.location} • {m.skills}</div>
                <div className="mt-2 d-flex align-items-center gap-3">
                  <div className="fw-bold">{m.price} Tk / day</div>
                  <div>
                    <button className="btn hero-cta btn-sm" style={{padding:'.45rem .9rem'}}>Book</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
