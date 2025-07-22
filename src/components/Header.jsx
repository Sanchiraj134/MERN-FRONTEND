import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { 
  ShoppingCart, 
  User, 
  Home, 
  Package, 
  LogIn, 
  Shield, 
  Sun, 
  Moon,
  Bell,
  Search
} from "lucide-react";
import { AppContext } from "../App";
import { useTheme } from "../contexts/ThemeContext";

export default function Header() {
  const { user, cart } = useContext(AppContext);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const location = useLocation();
  
  const cartItemCount = cart.reduce((total, item) => total + (item.qty || 0), 0);
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <header style={{ 
      background: 'var(--gradient-primary)',
      boxShadow: 'var(--shadow-lg)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backdropFilter: 'blur(10px)'
    }}>
      <div className="container">
        <nav style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          padding: '16px 0',
          color: 'white'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(10px)'
              }}>
                <Package size={24} />
              </div>
              <h1 style={{ 
                fontSize: '24px', 
                fontWeight: '700',
                margin: 0,
                background: 'linear-gradient(45deg, #fff, #e0e7ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                MERN Store
              </h1>
            </div>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '8px',
            borderRadius: '16px',
            backdropFilter: 'blur(10px)'
          }}>
            <Link 
              to="/" 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                color: 'white',
                textDecoration: 'none',
                padding: '10px 16px',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                background: isActive('/') ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                fontWeight: '500'
              }}
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            
            <Link 
              to="/cart" 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                color: 'white',
                textDecoration: 'none',
                padding: '10px 16px',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                background: isActive('/cart') ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                position: 'relative',
                fontWeight: '500'
              }}
            >
              <ShoppingCart size={18} />
              <span>Cart</span>
              {cartItemCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '2px',
                  right: '8px',
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: '600',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  animation: cartItemCount > 0 ? 'pulse 2s infinite' : 'none'
                }}>
                  {cartItemCount}
                </span>
              )}
            </Link>
            
            <Link 
              to="/order" 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                color: 'white',
                textDecoration: 'none',
                padding: '10px 16px',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                background: isActive('/order') ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                fontWeight: '500'
              }}
            >
              <Package size={18} />
              <span>Orders</span>
            </Link>
            
            {user?.role === "admin" && (
              <Link 
                to="/admin" 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  color: 'white',
                  textDecoration: 'none',
                  padding: '10px 16px',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  background: location.pathname.startsWith('/admin') ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                  fontWeight: '500'
                }}
              >
                <Shield size={18} />
                <span>Admin</span>
              </Link>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={toggleDarkMode}
              className={`theme-toggle ${isDarkMode ? 'active' : ''}`}
              style={{
                background: isDarkMode ? 'var(--gradient-primary)' : 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                borderRadius: '20px',
                width: '50px',
                height: '26px',
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '3px',
                left: isDarkMode ? '26px' : '3px',
                width: '20px',
                height: '20px',
                background: 'white',
                borderRadius: '50%',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}>
                {isDarkMode ? <Moon size={12} color="#667eea" /> : <Sun size={12} color="#667eea" />}
              </div>
            </button>

            {user?.token ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  borderRadius: '12px',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  color: 'white'
                }}>
                  <Bell size={18} />
                </button>
                
                <Link 
                  to="/profile" 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    color: 'white',
                    textDecoration: 'none',
                    padding: '10px 16px',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    background: isActive('/profile') ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                    fontWeight: '500',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <User size={18} />
                  <span>Profile</span>
                </Link>
              </div>
            ) : (
              <Link 
                to="/login" 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  color: 'white',
                  textDecoration: 'none',
                  padding: '12px 20px',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  background: 'rgba(255, 255, 255, 0.2)',
                  fontWeight: '500',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}
              >
                <LogIn size={18} />
                <span>Login</span>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}