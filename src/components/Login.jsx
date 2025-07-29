import React, { useState } from "react";
import "../App.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy login logic
    if (!email || !password) {
      setError("Please enter both email and password.");
    } else {
      setError("");
      alert("Login successful! (Demo only)");
    }
  };

  return (
    <div className="auth-page-container">
      <h2 className="auth-title">Login</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
        />
        {error && <div className="auth-error">{error}</div>}
        <button type="submit" className="auth-btn" style={{width: '100%'}}>Login</button>
      </form>
    </div>
  );
};

export default Login;
