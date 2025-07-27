import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import './Header.css';

export default function Header({ isLoggedIn, onLogout, role }) {
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const location = useLocation();

  const handleLogin = () => {
    onLogout();
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <header className="navbar">
        <div className="nav-logo">
          <div className="logo-icon">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M10 20C10 14.4772 14.4772 10 20 10C25.5228 10 30 14.4772 30 20C30 25.5228 25.5228 30 20 30C14.4772 30 10 25.5228 10 20Z" fill="#8B5CF6"/>
              <path d="M15 15C15 12.2386 17.2386 10 20 10C22.7614 10 25 12.2386 25 15C25 17.7614 22.7614 20 20 20C17.2386 20 15 17.7614 15 15Z" fill="#EC4899"/>
            </svg>
          </div>
          <div className="logo-text">VendorMart</div>
        </div>
        
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/suppliers" 
            className={`nav-link ${isActive('/suppliers') ? 'active' : ''}`}
          >
            Suppliers
          </Link>
          <Link 
            to="/order-management" 
            className={`nav-link ${isActive('/order-management') ? 'active' : ''}`}
          >
            Orders
          </Link>
          <Link 
            to="/contact" 
            className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
          >
            Contact
          </Link>
        </div>

        <div className="nav-auth">
          {isLoggedIn ? (
            <button
              onClick={onLogout}
              className="auth-btn logout-btn"
            >
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={() => setLoginOpen(true)}
                className="auth-btn login-btn"
              >
                LOGIN
              </button>
              <button
                onClick={() => setRegisterOpen(true)}
                className="auth-btn register-btn"
              >
                REGISTER
              </button>
            </>
          )}
        </div>
      </header>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setLoginOpen(false)}
        onSwitchToRegister={() => {
          setLoginOpen(false);
          setRegisterOpen(true);
        }}
        onLogin={handleLogin}
      />
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setRegisterOpen(false)}
        onSwitchToLogin={() => {
          setLoginOpen(true);
          setRegisterOpen(false);
        }}
      />
    </>
  );
}
