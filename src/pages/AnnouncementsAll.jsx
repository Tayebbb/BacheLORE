import React, { useEffect, useState } from 'react';

export default function AnnouncementsAll() {
  const [announcements, setAnnouncements] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 5;

  useEffect(() => {
    fetch(`/api/announcements?page=${page}&limit=${pageSize}`)
      .then(res => res.json())
      .then(data => {
        setAnnouncements(Array.isArray(data.announcements) ? data.announcements : data);
        setTotal(data.total || 0);
      });
  }, [page]);

  const totalPages = Math.ceil(total / pageSize);

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

  return (
    <div className="container py-5">
      <h2>All Announcements</h2>
      <div className="announcements-panel mb-4">
        {announcements.map(a => (
          <div key={a._id || a.id} className="announcement-item mb-3">
            <div className="announcement-title fw-bold">{a.title}</div>
            <div className="announcement-message mb-1">{a.message || a.body}</div>
            <div className="announcement-meta muted small">{timeAgo(a.createdAt)}</div>
            <hr />
          </div>
        ))}
      </div>
      <div className="d-flex gap-2 justify-content-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
          <button
            key={num}
            className={`btn px-3 py-2 fw-bold ${num === page ? 'bg-primary text-white border-0' : ''}`}
            style={{
              borderRadius: 8,
              outline: 'none',
              boxShadow: num === page ? '0 0 0 2px #228be6' : undefined,
              background: num === page ? undefined : 'linear-gradient(135deg, #e3f0fc 0%, #b6d6f6 100%)',
              color: num === page ? '#fff' : '#1971c2',
              border: num === page ? 'none' : '2px solid #228be6',
              fontWeight: 700
            }}
            onClick={() => setPage(num)}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}
