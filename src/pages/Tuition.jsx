import React, { useState, useEffect } from 'react'
import axios from '../components/axios'


export default function Tuition(){
  const [locationFilter, setLocationFilter] = useState('')
  const [tuitions, setTuitions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    axios.get('/api/tuitions')
      .then(res => {
        setTuitions(res.data)
        setLoading(false)
      })
      .catch(err => {
        setError('Failed to load tuitions')
        setLoading(false)
      })
  }, [])

  const filtered = tuitions.filter(j => {
    if(!locationFilter) return true
    return j.location?.toLowerCase().includes(locationFilter.trim().toLowerCase())
      || j.subject?.toLowerCase().includes(locationFilter.trim().toLowerCase())
      || j.description?.toLowerCase().includes(locationFilter.trim().toLowerCase())
  })

  return (
    <main className="tuition-page container-fluid py-4">
      <div className="container px-0">
        <div className="d-flex flex-column flex-md-row align-items-start justify-content-between mb-3 px-3">
          <div className="mb-2 mb-md-0">
            <h4 className="mb-0">{filtered.length} offers found</h4>
          </div>

          <div className="d-flex gap-2 align-items-center">
            <input value={locationFilter} onChange={e=>setLocationFilter(e.target.value)} className="form-control form-control-sm" style={{minWidth:200}} placeholder="Filter by location/subject" />
            <button className="btn btn-outline-secondary btn-sm" onClick={()=>setLocationFilter('')}>Clear</button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">Loading tuitions...</div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="row g-4">
            {filtered.map(job=> (
              <div key={job._id} className="col-md-6">
                <article className="job-card">
                  <div className="job-card-inner">
                    <h5 className="job-title">{job.subject}</h5>
                    <ul className="list-unstyled small mb-3">
                      <li><strong>Description:</strong> {job.description}</li>
                      <li><strong>Contact:</strong> {job.contact}</li>
                      <li><strong>Posted:</strong> {new Date(job.createdAt).toLocaleString()}</li>
                    </ul>
                  </div>
                </article>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
