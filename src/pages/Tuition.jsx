import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const sampleJobs = new Array(8).fill(0).map((_,i)=>({
  id: 178000 + i,
  title: i%2===0? 'English Medium Tutor Needed' : 'Bangla Medium Tutor Needed',
  days: i%2===0? '4 days/week' : '3 days/week',
  subject: i%2===0? 'Physics, Chemistry, Math' : 'Bangla, English',
  location: i%2===0? 'Adabor, Dhaka' : 'Green Road, Dhaka',
  salary: i%2===0? '7000 BDT' : '4500 BDT',
  guardian: i%2===0? '+88017xxxxxxx' : '+88016xxxxxxx',
  section: i%2===0? 'Class 8' : 'HSC 1st Year'
}))

export default function Tuition(){
  const [locationFilter, setLocationFilter] = useState('')

  const filtered = sampleJobs.filter(j => {
    if(!locationFilter) return true
    return j.location.toLowerCase().includes(locationFilter.trim().toLowerCase())
  })

  return (
    <main className="tuition-page container-fluid py-4">
      <div className="container px-0">
        <div className="d-flex flex-column flex-md-row align-items-start justify-content-between mb-3 px-3">
          <div className="mb-2 mb-md-0">
            <h4 className="mb-0">{filtered.length} offers found</h4>
          </div>

          <div className="d-flex gap-2 align-items-center">
            <input value={locationFilter} onChange={e=>setLocationFilter(e.target.value)} className="form-control form-control-sm" style={{minWidth:200}} placeholder="Filter by location (e.g. Dhaka)" />
            <button className="btn btn-outline-secondary btn-sm" onClick={()=>setLocationFilter('')}>Clear</button>
          </div>
        </div>

        <div className="row g-4">
          {filtered.map(job=> (
            <div key={job.id} className="col-md-6">
              <article className="job-card">
                <div className="job-card-inner">
                  <h5 className="job-title">{job.title}</h5>

                  <ul className="list-unstyled small mb-3">
                    <li><strong>Days:</strong> {job.days}</li>
                    <li><strong>Subject:</strong> {job.subject}</li>
                    <li><strong>Location:</strong> {job.location}</li>
                    <li><strong>Salary:</strong> {job.salary}</li>
                    <li><strong>Guardian number:</strong> {job.guardian}</li>
                    <li><strong>Section:</strong> {job.section}</li>
                  </ul>

                  <div className="d-flex justify-content-between align-items-center">
                    <Link to={`/item/${job.id}`} className="link-primary">Details</Link>
                    <div className="small text-muted">Offer</div>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
