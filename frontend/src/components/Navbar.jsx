
import axios from 'axios';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post('/api/auth/logout', {}, { withCredentials: true });
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-b border-gray-300">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center text-gray-800 hover:text-blue-700 transition-colors">
            <svg className="w-7 h-7 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            <span className="font-bold text-lg text-blue-800">EV Station Finder</span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-sm text-gray-600 font-medium">Welcome, {user.email}</span>
              {user.role === 'admin' && (
                <Link 
                  to="/dashboard" 
                  className="px-4 py-2 text-sm bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors font-medium"
                >
                  Dashboard
                </Link>
              )}
              <button 
                onClick={handleLogout}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-3">
              <Link 
                to="/login" 
                className="px-4 py-2 text-sm text-gray-700 hover:text-blue-800 transition-colors font-medium"
              >
                Login
              </Link>
              <Link 
                to="/register"
                className="px-5 py-2 text-sm bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium shadow-sm"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
