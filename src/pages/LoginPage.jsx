import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLock, FaEnvelope, FaUserShield, FaSignInAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext.jsx";
import "./AuthPages.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      if (result.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/profile");
      }
    }
  };

  const handleDemoAdmin = () => {
    setEmail("admin@priyasboutique.com");
    setPassword("admin123");
  };

  return (
    <div className="auth-page page-container">
      <div className="container">
        <div className="auth-card card">
          <span className="section-kicker">Welcome Back</span>
          <h1 className="auth-title">Customer & Admin Login</h1>
          <p className="auth-subtitle">Access your order history, custom tailoring bookings, or store admin panel.</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-with-icon">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  className="form-input"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-with-icon">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  className="form-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block btn-lg margin-top">
              <FaSignInAlt /> Log In
            </button>
          </form>

          {/* Quick Demo Fill Buttons */}
          <div className="demo-credentials-box">
            <p className="demo-title">Quick Demo Login:</p>
            <button type="button" className="demo-btn" onClick={handleDemoAdmin}>
              <FaUserShield /> Fill Admin Credentials (admin@priyasboutique.com)
            </button>
          </div>

          <div className="auth-footer">
            <span>Don't have an account yet?</span>
            <Link to="/register" className="auth-link">Create Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
