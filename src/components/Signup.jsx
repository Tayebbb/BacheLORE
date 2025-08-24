
import React, { useState } from "react";
import Navbar from "./Navbar";
import bg1image from "../assets/bg1image.jpg";
import "../App.css";
import AuthCard from './AuthCard'
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
        <AuthCard title="Sign Up">
            <form className="auth-form" onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 340, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input signup-gradient-input auth-input-styled"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input signup-gradient-input auth-input-styled"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="auth-input signup-gradient-input auth-input-styled"
              />
              {error && <div className="auth-error">{error}</div>}
              {success && <div className="auth-success">{success}</div>}
              <button type="submit" className="auth-btn signup-gradient-btn auth-submit-btn">Sign Up</button>
            </form>
        </AuthCard>
      </div>
    </>
  );
};

export default Signup;
