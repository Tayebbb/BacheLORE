import React from 'react'

const sample = [
  {id:1, title:'1BHK near AUST', price:5000, location:'Sher-e-Bangla'},
  {id:2, title:'Room with balcony', price:6500, location:'Mirpur 10'}
]

export default function HouseRent(){
  return (
    <main className="container py-5">
      <h3>House Rent</h3>
      <p className="muted">Search rooms and houses for rent.</p>
      <div className="row g-3">
        {sample.map(s=> (
          <div className="col-md-6" key={s.id}>
            <div className="feature-card p-3">
              <h6>{s.title}</h6>
              <div className="muted small">{s.location}</div>
              <div className="mt-2 fw-bold">{s.price} Tk / month</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
