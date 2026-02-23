import React from 'react'

export default function AuthCard({ children, title }) {
  return (
    <div className="centered" style={{ minHeight: '80vh', width: '100vw' }}>
      <div className="business-card centered">
        {title && <h2 className="heading">{title}</h2>}
        {children}
      </div>
    </div>
  );
}
