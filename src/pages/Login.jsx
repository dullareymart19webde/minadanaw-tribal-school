import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, ArrowRight, ShieldAlert, UserPlus, Home } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '../firebase';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);

    try {
      // Authenticate with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user role from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const actualRole = userData.role;

        if (userData.status === 'pending' || userData.status === 'Pending') {
          setError('Your account is pending admin approval.');
          await auth.signOut();
          setLoading(false);
          return;
        }

        if (actualRole !== role) {
          setError(`You do not have ${role} privileges.`);
          await auth.signOut();
          setLoading(false);
          return;
        }

        // Navigate based on actual role
        if (actualRole === 'admin') navigate('/portal/admin');
        if (actualRole === 'faculty') navigate('/portal/faculty');
        if (actualRole === 'student') navigate('/portal/student');
      } else {
        setError('User record not found in database.');
        await auth.signOut();
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Left Banner */}
      <div className="auth-banner">
        <div className="auth-banner-content">
          <img src="/school-logo.png" alt="MTSI Logo" style={{ height: '120px', width: '120px', backgroundColor: 'white', borderRadius: '50%', objectFit: 'contain', padding: '4px', marginBottom: '2rem', boxShadow: '0 0 20px rgba(255,255,255,0.2)' }} />
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.2 }}>Welcome to the MTSI Portal</h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.6 }}>Access your dashboard, manage your classes, and stay updated with the latest campus announcements.</p>
        </div>
      </div>

      {/* Right Form */}
      <div className="auth-form-wrapper">
        <div className="auth-form-card">
          <div className="auth-form-header">
            <h2>Sign In</h2>
            <p>Enter your credentials to continue</p>
          </div>
          
          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#FEE2E2', color: '#DC2626', padding: '1rem', borderRadius: '0.75rem', marginBottom: '1.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
              <ShieldAlert size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="auth-input-group">
              <label>Login As</label>
              <div className="auth-input-wrapper">
                <select 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)}
                  disabled={loading}
                  className="auth-input"
                  style={{ paddingLeft: '1rem', appearance: 'none' }}
                >
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="admin">Administrator</option>
                </select>
                <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#9CA3AF' }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            </div>

            <Input 
              label="Email Address"
              icon={User}
              type="email"
              placeholder="student@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />

            <Input 
              label="Password"
              icon={Lock}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', fontSize: '0.85rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#64748B' }}>
                <input type="checkbox" style={{ accentColor: '#0D742B', width: '16px', height: '16px' }} disabled={loading} />
                Remember me
              </label>
              <a href="#" style={{ color: '#0D742B', fontWeight: 600, textDecoration: 'none' }}>Forgot password?</a>
            </div>

            <Button type="submit" isLoading={loading}>
              Sign In <ArrowRight size={18} />
            </Button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <p style={{ color: '#64748B', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Don't have an account?{' '}
              <Link to="/register" style={{ color: '#0D742B', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                <UserPlus size={16} /> Register Now
              </Link>
            </p>

            <Link to="/" style={{ color: '#9CA3AF', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}>
              <Home size={16} /> Back to main website
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Login;
