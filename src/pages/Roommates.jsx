import React from 'react'

const demo = [
  {id:1, name:'Ali', age:24, location:'Dhanmondi', about:'Non-smoker, likes clean spaces.'},
  {id:2, name:'Nadia', age:22, location:'Banani', about:'Student, respectful and quiet.'}
]

export default function Roommates(){
  return (
    <main className="container py-5">
      <h3>Roommates</h3>
      <p className="muted">Find compatible roommates.</p>
      <div className="row g-3">
        {demo.map(d=> (
          <div className="col-md-6" key={d.id}>
            <div className="feature-card p-3">
              <h6>{d.name}, {d.age}</h6>
              <div className="muted small">{d.location}</div>
              <p className="mt-2 mb-0 small">{d.about}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
