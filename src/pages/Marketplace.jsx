import React from 'react'
import { Link } from 'react-router-dom'
import { MARKETPLACE_SAMPLE as sample } from '../data/samples'
import ListingCard from '../components/ListingCard'

export default function Marketplace(){
  return (
    <main className="container py-5">
      <h3>Marketplace</h3>
      <p className="muted">Buy and sell items locally.</p>

      <div className="row g-3">
        {sample.map(s=> (
          <div className="col-md-4" key={s.id}>
            <ListingCard item={s} type="marketplace" />
          </div>
        ))}
      </div>
    </main>
  )
}
