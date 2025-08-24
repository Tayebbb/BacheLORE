import React from 'react'
import { HOUSE_RENT_SAMPLE as sample } from '../data/samples'
import ListingCard from '../components/ListingCard'

export default function HouseRent(){
  return (
    <main className="container py-5">
      <h3>House Rent</h3>
      <p className="muted">Search rooms and houses for rent.</p>
      <div className="row g-3">
        {sample.map(s=> (
          <div className="col-md-6" key={s.id}>
            <ListingCard item={s} />
          </div>
        ))}
      </div>
    </main>
  )
}
