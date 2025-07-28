
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MapComponent from './components/MapComponent';
import AddLocationForm from './components/AddLocationForm';
import LocationPage from './pages/LocationPage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Unauthorized from './pages/Unauthorized'

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user && user.role === 'admin' ? children : <Navigate to="/unauthorized" />;
}

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />

            <Route
              path="/dashboard"
              element={
                <AdminRoute>
                  <Dashboard />
                </AdminRoute>
              }
            />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            <Route
              path="/"
              element={
                <div className="flex h-screen pt-16">
                  {/* Sidebar */}
                  <div className="w-80 bg-white shadow-lg border-r border-gray-200 overflow-y-auto">
                    <div className="p-6">
                      <div className="flex items-center mb-6">
                        <div className="w-6 h-6 mr-3">
                          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                            <path d="M9 17H7v-7h2m8 7h-2V7h2m-8-4h8v2H9V3z" fill="currentColor"/>
                          </svg>
                        </div>
                        <h1 className="text-xl font-semibold text-gray-800">Plan Your Trip</h1>
                      </div>
                      
                      <AddLocationForm />
                    </div>
                  </div>
                  
                  {/* Map Container */}
                  <div className="flex-1 relative">
                    <MapComponent />
                  </div>
                </div>
              }
            />

            <Route path="/location/:id" element={<LocationPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
