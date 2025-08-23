import React from 'react'

export default function FeatureCard({icon, title, text}){
  return (
    <div className="feature-card p-3 bg-white">
      <div className="d-flex align-items-center gap-3">
        <i className={`bi-${icon} fs-3 text-primary`}></i>
        <div>
          <h6 className="mb-0">{title}</h6>
          <p className="muted small mb-0">{text}</p>
        </div>
      </div>
    </div>
  )
}
