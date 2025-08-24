
import React, { useState } from "react";
import Navbar from "./Navbar";
import bg1image from "../assets/bg1image.jpg";
import "../App.css";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email || !password || !confirmPassword) {
    setError("Please fill in all fields.");
    setSuccess("");
    return;
  }
  if (password !== confirmPassword) {
    setError("Passwords do not match.");
    setSuccess("");
    return;
  }
  setError("");
  try {
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, confirmPassword })
    });

    const data = await res.json();

    if (res.ok) {
      setSuccess(data.msg); 
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } else {
      setError(data.msg || "Signup failed");
    }
  } catch (err) {
    console.error(err);
    setError("Server error, try again later.");
  }
};

  return (
    <>
      <img src={bg1image} alt="Background" className="background-image" />
      <div className="app-container">
        <Navbar />
        <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw', padding: 0, margin: 0 }}>
          <div className="card signup-gradient-card" style={{
            width: '100%',
            maxWidth: 420,
            minWidth: 0,
            padding: '2.2rem 2rem 2rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: '1.25rem',
            boxShadow: '0 16px 48px 0 rgba(0,184,217,0.25), 0 2px 8px 0 rgba(0,184,217,0.10)',
            border: 'none',
            background: 'linear-gradient(120deg, #122C4A 0%, #0A1F44 60%, #00B8D9 100%)',
            margin: '0 auto',
            transition: 'transform 0.18s',
          }}
          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.035)'}
          onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <h2 className="section-title" style={{ color: '#00B8D9', marginBottom: 8, letterSpacing: '0.04em', fontWeight: 700, fontSize: '2rem' }}>Sign Up</h2>
            <form className="auth-form" onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 340, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input signup-gradient-input"
                style={{ background: 'rgba(240,242,245,0.97)', border: '1.5px solid #00B8D9', borderRadius: '0.7rem', fontWeight: 500, fontSize: '1.13rem', color: '#122C4A', boxShadow: '0 2px 8px rgba(0,184,217,0.08)', height: '2.7rem', padding: '1rem 1.2rem' }}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input signup-gradient-input"
                style={{ background: 'rgba(240,242,245,0.97)', border: '1.5px solid #00B8D9', borderRadius: '0.7rem', fontWeight: 500, fontSize: '1.13rem', color: '#122C4A', boxShadow: '0 2px 8px rgba(0,184,217,0.08)', height: '2.7rem', padding: '1rem 1.2rem' }}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="auth-input signup-gradient-input"
                style={{ background: 'rgba(240,242,245,0.97)', border: '1.5px solid #00B8D9', borderRadius: '0.7rem', fontWeight: 500, fontSize: '1.13rem', color: '#122C4A', boxShadow: '0 2px 8px rgba(0,184,217,0.08)', height: '2.7rem', padding: '1rem 1.2rem' }}
              />
              {error && <div className="auth-error">{error}</div>}
              {success && <div className="auth-success">{success}</div>}
              <button type="submit" className="auth-btn signup-gradient-btn" style={{ width: '100%', background: 'linear-gradient(90deg, #00B8D9 0%, #00E6F6 50%, #0099F7 100%)', color: '#122C4A', fontWeight: 700, fontSize: '1.08rem', borderRadius: '0.7rem', boxShadow: '0 4px 24px rgba(0,184,217,0.15)', border: 'none', marginTop: 8, padding: '0.85rem 0' }}>Sign Up</button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};
export default Signup;
