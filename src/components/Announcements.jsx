import React from 'react'

function timeAgo(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff/60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff/3600)} hr ago`;
  if (diff < 2592000) return `${Math.floor(diff/86400)} days ago`;
  return date.toLocaleDateString();
}

import { Link } from 'react-router-dom';

export default function Announcements({ items = [] }){
  const top2 = items.slice(0, 2);
  return (
    <div className="announcements-panel">
      {top2.map(a=> (
        <div key={a._id || a.id} className="announcement-item mb-3">
          <div className="announcement-title fw-bold">{a.title}</div>
          <div className="announcement-message mb-1">{a.message || a.body}</div>
          <div className="announcement-meta muted small">{timeAgo(a.createdAt)}</div>
          <hr />
        </div>
      ))}
      <div className="d-flex justify-content-end">
        <Link to="/announcements-all" className="btn btn-link p-0">See all</Link>
      </div>
    </div>
  )
}
