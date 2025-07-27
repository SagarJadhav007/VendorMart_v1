import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

export default function Header({ isLoggedIn, onLogout, role }) {
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogin = () => {
    onLogout();
  };

  return (
    <>
      <header className="w-full bg-white/90 shadow sticky top-0 z-50">
        <div className="w-full px-8 h-24 flex justify-between items-center">
          <Link to="/" className="flex items-center no-underline">
            <div className="ml-5 text-2xl font-bold text-gray-800">VendorMart</div>
          </Link>

          <div className="flex items-center gap-4">
            {role === 'customer' && (
              <Link
                to="/find-raw-materials"
                className="no-underline text-gray-800 font-bold px-6 py-3 rounded-lg bg-yellow-400 text-base border-2 border-yellow-400 transition hover:bg-yellow-500"
              >
                Find Raw Materials
              </Link>
            )}
            {role === 'vendor' && (
              <Link
                to="/"
                className="no-underline text-gray-800 font-bold px-6 py-3 rounded-lg bg-yellow-400 text-base border-2 border-yellow-400 transition hover:bg-yellow-500"
              >
                Dashboard
              </Link>
            )}
            {isLoggedIn ? (
              <button
                onClick={onLogout}
                className="border-2 border-gray-800 rounded-full text-white bg-gray-800 px-6 py-3 text-base font-bold cursor-pointer transition hover:bg-white hover:text-gray-800"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => setLoginOpen(true)}
                  className="border-2 border-gray-800 rounded-full text-white bg-gray-800 px-6 py-3 text-base font-bold cursor-pointer transition hover:bg-white hover:text-gray-800"
                >
                  LOGIN
                </button>
                <button
                  onClick={() => setRegisterOpen(true)}
                  className="border-2 border-gray-800 rounded-full text-white bg-gray-800 px-6 py-3 text-base font-bold cursor-pointer transition hover:bg-white hover:text-gray-800"
                >
                  REGISTER
                </button>
              </>
            )}
          </div>
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
