import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser, userRole, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC' }}>
        <img src="/school-logo.png" alt="Loading" style={{ height: '80px', width: '80px', backgroundColor: 'white', borderRadius: '50%', objectFit: 'contain', padding: '2px', marginBottom: '1.5rem', animation: 'pulse 2s infinite' }} />
        <Loader2 size={32} style={{ color: '#1E3A8A', animation: 'spin 1s linear infinite' }} />
        <p style={{ marginTop: '1rem', color: '#64748B', fontWeight: 500 }}>Loading MTSI Portal...</p>
      </div>
    );
  }

  if (!currentUser) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Redirect to appropriate dashboard or home if role doesn't match
    if (userRole === 'admin') return <Navigate to="/portal/admin" replace />;
    if (userRole === 'faculty') return <Navigate to="/portal/faculty" replace />;
    if (userRole === 'student') return <Navigate to="/portal/student" replace />;
    
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
