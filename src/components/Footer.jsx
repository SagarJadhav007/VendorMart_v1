import React, { useState } from 'react';
import './Footer.css';

const Footer = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Language Selection */}
        <div className="language-section">
          <button 
            className="language-btn"
            onClick={() => handleLanguageChange('English')}
          >
            {selectedLanguage}
          </button>
        </div>

        {/* Copyright Information */}
        <div className="copyright-section">
          <p className="copyright-text">© 2023 VendorMart.</p>
        </div>

        {/* Social Media Icons */}
        <div className="social-section">
          <a href="#" className="social-icon facebook-icon" aria-label="Facebook">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </a>
          <a href="#" className="social-icon instagram-icon" aria-label="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
          </a>
        </div>
      </div>
      
      {/* Bottom Separator Line */}
      <div className="footer-separator"></div>
    </footer>
  );
};

export default Footer;