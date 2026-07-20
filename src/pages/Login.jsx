import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, ArrowRight, ShieldAlert, Loader2 } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    setLoading(true);

    // Simulate network request
    setTimeout(() => {
      // Mock authentication: as long as credentials match the selected role's prototype credentials
      const valid = 
        (role === 'admin' && username.toLowerCase() === 'admin' && password === 'admin123') ||
        (role === 'faculty' && username.toLowerCase() === 'faculty' && password === 'faculty123') ||
        (role === 'student' && username.toLowerCase() === 'student' && password === 'student123');

      if (valid) {
        localStorage.setItem('userRole', role);
        if (role === 'admin') navigate('/portal/admin');
        if (role === 'faculty') navigate('/portal/faculty');
        if (role === 'student') navigate('/portal/student');
      } else {
        setError('Invalid credentials for the selected role.');
        setLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img src="/school-logo.png" alt="MTSI Logo" style={{ height: '70px', width: 'auto', marginBottom: '1rem' }} />
          <h2 className="login-title">MTSI Portal</h2>
          <p className="login-subtitle">Sign in to access your account</p>
        </div>
        
        {error && (
          <div className="login-error">
            <ShieldAlert size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group" style={{ position: 'relative', marginBottom: '1rem' }}>
            <label>Login As</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
                backgroundColor: 'white',
                fontSize: '0.95rem',
                color: 'var(--color-text-dark)',
                fontFamily: 'inherit',
                outline: 'none'
              }}
            >
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
              <option value="admin">Administrator</option>
            </select>
          </div>

          <div className="form-group" style={{ position: 'relative' }}>
            <label>Username</label>
            <div className="input-with-icon">
              <User size={18} className="input-icon" />
              <input 
                type="text" 
                placeholder="Enter your username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group" style={{ position: 'relative' }}>
            <label>Password</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--color-text-body)' }}>
              <input type="checkbox" style={{ width: 'auto', margin: 0 }} disabled={loading} />
              Remember me
            </label>
            <a href="#" style={{ color: 'var(--color-primary)', fontWeight: 500 }}>Forgot password?</a>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', display: 'flex', justifyContent: 'center' }} disabled={loading}>
            {loading ? (
              <Loader2 size={20} className="spinner" />
            ) : (
              <>Sign In <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} /></>
            )}
          </button>
        </form>
        
        <div className="login-footer" style={{ marginTop: '2.5rem', padding: '1.5rem', backgroundColor: 'var(--color-background)', borderRadius: 'var(--radius-sm)', textAlign: 'left' }}>
          <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-dark)' }}>Prototype Credentials:</strong>
          <ul style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><strong>Admin:</strong> admin / admin123</li>
            <li><strong>Faculty:</strong> faculty / faculty123</li>
            <li><strong>Student:</strong> student / student123</li>
          </ul>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <Link to="/" style={{ color: 'var(--color-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            &larr; Back to main website
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
