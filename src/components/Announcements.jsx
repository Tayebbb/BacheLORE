import React from 'react'

export default function Announcements({ items = [] }){
  return (
    <div className="announcements-panel">
      {items.map(a=> (
        <div key={a.id} className="announcement-item">
          <div className="announcement-title">{a.title}</div>
          <div className="announcement-meta muted small">{a.body}</div>
        </div>
      ))}
    </div>
  )
}
