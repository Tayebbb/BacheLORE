
import React, { useState } from "react";
import Navbar from "./Navbar";
import bg1image from "../assets/bg1image.jpg";
import "../App.css";
import AuthCard from './AuthCard'
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    setError("Please enter both email and password.");
    return;
  }

  setError("");
  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok && data.user) {
      alert("Login successful!");
      console.log("Logged in user:", data.user);
      setEmail("");
      setPassword("");
    } else {
      setError(data.msg || "Invalid credentials");
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
        <AuthCard title="Login">
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
              {error && <div className="auth-error">{error}</div>}
              <button type="submit" className="auth-btn signup-gradient-btn auth-submit-btn">Login</button>
            </form>
        </AuthCard>
      </div>
    </>
  );
};

export default Login;
