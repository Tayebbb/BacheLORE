import React from 'react'
import { Link } from 'react-router-dom'

const sample = [
  {id:1, title:'Sofa - good condition', price:1200, location:'Dhanmondi'},
  {id:2, title:'Study table', price:800, location:'Mirpur'},
  {id:3, title:'Microwave', price:2200, location:'Banani'}
]

export default function Marketplace(){
  return (
    <main className="container py-5">
      <h3>Marketplace</h3>
      <p className="muted">Buy and sell items locally.</p>

      <div className="row g-3">
        {sample.map(s=> (
          <div className="col-md-4" key={s.id}>
            <div className="feature-card p-3">
              <h6>{s.title}</h6>
              <div className="muted small">{s.location}</div>
              <div className="mt-2 d-flex justify-content-between align-items-center">
                <div className="fw-bold">{s.price} Tk</div>
                <Link to={`/item/${s.id}`} className="btn btn-sm btn-outline-primary">View</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
