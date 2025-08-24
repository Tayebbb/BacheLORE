import React from 'react'
import { ROOMMATES_SAMPLE as demo } from '../data/samples'
import ListingCard from '../components/ListingCard'

export default function Roommates(){
  return (
    <main className="container py-5">
      <h3>Roommates</h3>
      <p className="muted">Find compatible roommates.</p>
      <div className="row g-3">
        {demo.map(d=> (
          <div className="col-md-6" key={d.id}>
            <ListingCard item={d} />
          </div>
        ))}
      </div>
    </main>
  )
}
