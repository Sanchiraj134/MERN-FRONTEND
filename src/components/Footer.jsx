import React from 'react';
import { Heart, Github, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
      color: 'white',
      marginTop: '60px'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px',
          padding: '40px 0'
        }}>
          <div>
            <h3 style={{ marginBottom: '16px', color: '#f3f4f6' }}>MERN Store</h3>
            <p style={{ color: '#9ca3af', lineHeight: '1.6', marginBottom: '16px' }}>
              Your one-stop destination for quality products. Built with modern web technologies 
              to provide the best shopping experience.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#9ca3af' }}>
              <Heart size={16} fill="currentColor" />
              <span>Made with love using MERN Stack</span>
            </div>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '16px', color: '#f3f4f6' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {['Home', 'Products', 'About Us', 'Contact', 'FAQ', 'Support'].map(link => (
                <li key={link} style={{ marginBottom: '8px' }}>
                  <a href="#" style={{ 
                    color: '#9ca3af', 
                    textDecoration: 'none',
                    transition: 'color 0.2s ease'
                  }}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '16px', color: '#f3f4f6' }}>Contact Info</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#9ca3af' }}>
                <Mail size={16} />
                <span>support@mernstore.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#9ca3af' }}>
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#9ca3af' }}>
                <MapPin size={16} />
                <span>123 Tech Street, Digital City</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '16px', color: '#f3f4f6' }}>Follow Us</h4>
            <p style={{ color: '#9ca3af', marginBottom: '16px' }}>
              Stay connected for updates and offers
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href="#" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: 'white',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}>
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div style={{
          borderTop: '1px solid #374151',
          padding: '20px 0',
          textAlign: 'center',
          color: '#9ca3af'
        }}>
          <p>&copy; 2025 MERN Store. All rights reserved. Built with React, Node.js, Express & MongoDB.</p>
        </div>
      </div>
    </footer>
  );
}