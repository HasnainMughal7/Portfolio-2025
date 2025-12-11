import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        
        <div className="footer-top">
          
        
          <div className="footer-brand">
            <div className="footer-logo">
              <h2>Hasnain <span style={{color: '#FFD700'}}>Mughal</span></h2>
            </div>
            <p className="footer-tagline">
              Revealing your vision through thoughtful design and scalable code.
            </p>
            <div style={{ marginTop: '10px' }}>
                <NavLink to="/contact" className="btn-primary" style={{ marginTop: 0, padding: '10px 25px' }}>
                    Get a quote
                </NavLink>
            </div>
          </div>
          <div className="footer-nav">
            <NavLink to="/" className="footer-link">Services</NavLink>
            <NavLink to="/projects" className="footer-link">Projects</NavLink>
            <NavLink to="/about" className="footer-link">About</NavLink>
            <NavLink to="/contact" className="footer-link">Contact</NavLink>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          
          <div className="social-icons">
            {/* LinkedIn */}
            <svg className="social-icon" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
            </svg>
            
            {/* Instagram */}
            <svg className="social-icon" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>

            {/* Twitter / X */}
            <svg className="social-icon" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
                <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
            </svg>
          </div>

          {/* Legal Links */}
          <div className="footer-legal">
            <a className="footer-email">hasnainhero1@gmail.com</a>
            <a >Privacy Policy</a>
            <a >Cookie Policy</a>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;