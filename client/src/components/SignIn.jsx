import React, { useState } from 'react';
import axios from 'axios';
import './SignIn.css';

const SignIn = ({ onLogin }) => {
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '' 
  });
  const [loading, setLoading] = useState(false);
  // REMOVE THIS LINE: const [activeTab, setActiveTab] = useState('login');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
        onLogin(response.data.user);
      }
    } catch (error) {
      alert('Login failed: ' + (error.response?.data?.message || 'Please try again'));
    }
    setLoading(false);
  };

  return (
    <div className="signin-container">
      {/* Left Panel - Branding */}
      <div className="brand-panel">
        <div className="brand-content">
          <div className="logo">
            <span className="logo-icon">🚀</span>
            <h1>Board.</h1>
          </div>
          <div className="brand-message">
            <h2>Moonride the Future with Us</h2>
            <p>Join India's EV revolution</p>
          </div>
          <div className="feature-list">
            <div className="feature-item">
              <span className="feature-icon">⭐</span>
              <span>Cutting-edge Technology</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">⚡</span>
              <span>Sustainable Transportation</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🌍</span>
              <span>Global Impact</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="form-panel">
        <div className="form-content">
          <div className="form-header">
            <h2>Welcome Back!</h2>
            <p>Sign in to your account</p>
          </div>

          {/* Social Login Buttons */}
          <div className="social-buttons">
            <button type="button" className="google-btn">
              <span className="social-icon">🔍</span>
              Sign in with Google
            </button>
            <button type="button" className="apple-btn">
              <span className="social-icon">🍎</span>
              Sign in with Apple
            </button>
          </div>

          <div className="divider">
            <span>or continue with email</span>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="signin-form">
            <div className="input-group">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="johndoe@gmail.com"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>

            <div className="form-options">
              <label className="checkbox-container">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Remember me
              </label>
              <a href="#forgot" className="forgot-link">Forgot password?</a>
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="signin-btn"
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="signup-section">
            <p>Don't have an account? <a href="#register" className="signup-link">Register here</a></p>
          </div>
        </div>

        {/* Footer */}
        <div className="form-footer">
          <p>© 2024 Board. All rights reserved</p>
          <div className="footer-links">
            <a href="#terms">Terms</a>
            <a href="#privacy">Privacy</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;