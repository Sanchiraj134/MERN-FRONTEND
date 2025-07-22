import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, Mail, Lock, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

export default function Login() {
  const { user, setUser } = useContext(AppContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const Navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const url = `${API_URL}/api/users/login`;
      const result = await axios.post(url, user);
      setUser(result.data);
      Navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper fade-in">
      <div className="container">
        <div style={{ 
          maxWidth: '400px', 
          margin: '0 auto',
          paddingTop: '40px'
        }}>
          <div className="card">
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ 
                width: '64px',
                height: '64px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <LogIn size={32} color="white" />
              </div>
              <h2>Welcome Back</h2>
              <p style={{ color: '#6b7280' }}>
                Sign in to your account to continue shopping
              </p>
            </div>

            {error && (
              <div className="error">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">
                  <Mail size={16} style={{ marginRight: '8px' }} />
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="Enter your email"
                  value={user.email || ''}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Lock size={16} style={{ marginRight: '8px' }} />
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-input"
                    placeholder="Enter your password"
                    value={user.password || ''}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    required
                    style={{ paddingRight: '48px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#6b7280'
                    }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{ width: '100%', marginBottom: '16px' }}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#6b7280', marginBottom: '16px' }}>
                Don't have an account?{' '}
                <Link 
                  to="/register" 
                  style={{ 
                    color: '#667eea', 
                    textDecoration: 'none',
                    fontWeight: '500'
                  }}
                >
                  Create one here
                </Link>
              </p>
              
              <div style={{ 
                fontSize: '12px', 
                color: '#9ca3af',
                borderTop: '1px solid #e5e7eb',
                paddingTop: '16px'
              }}>
                <p>Demo Credentials:</p>
                <p>Email: demo@example.com</p>
                <p>Password: demo123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}