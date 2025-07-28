
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center">
          <Link to="/" className="flex items-center text-gray-700 hover:text-gray-900 transition-colors">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
            <span className="font-medium">Home</span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-sm text-gray-600">Welcome, {user.email}</span>
              {user.role === 'admin' && (
                <Link 
                  to="/dashboard" 
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                >
                  Dashboard
                </Link>
              )}
              <button 
                onClick={handleLogout}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-3">
              <Link 
                to="/login" 
                className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/register"
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
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
