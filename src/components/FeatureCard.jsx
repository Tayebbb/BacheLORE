
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FeatureCard({icon, title, text, route}) {
  const navigate = useNavigate();
  const handleClick = () => {
    if (route) {
      navigate(`/${route}`);
    }
  };
  return (
    <div className="feature-card p-3 bg-white" style={{cursor:'pointer'}} onClick={handleClick}>
      <div className="d-flex align-items-center gap-3">
        <i className={`bi-${icon} fs-3 text-primary`}></i>
        <div>
          <h6 className="mb-0">{title}</h6>
          <p className="muted small mb-0">{text}</p>
        </div>
      </div>
    </div>
  );
}
