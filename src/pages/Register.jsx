import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, Mail, ArrowRight, ShieldAlert, Loader2, CheckCircle2, Home, LogIn } from 'lucide-react';
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '../firebase';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('student');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.fullName || !formData.email || !formData.password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (role === 'student' && !formData.username) {
      setError('Student ID / Username is required for students.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setError('Password must be at least 8 characters long and include an uppercase letter, lowercase letter, number, and special character.');
      return;
    }

    setLoading(true);

    try {
      let finalUsername = formData.username.toLowerCase();
      if (role === 'faculty') {
        finalUsername = formData.email.split('@')[0].toLowerCase();
      }
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: formData.email,
        username: finalUsername,
        role: role,
        status: "pending", 
        createdAt: new Date().toISOString()
      });

      if (role === 'student') {
        await addDoc(collection(db, "students"), {
          id: finalUsername, 
          name: formData.fullName,
          email: formData.email,
          grade: "TBD",
          courseAndYear: "TBD",
          section: "TBD",
          status: "Pending Activation",
          balance: 0,
          attendance: { present: 0, absent: 0, late: 0 },
          subjectsCount: 0
        });
      }

      setSuccess(true);
      
      await auth.signOut();

      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      console.error("Registration Error:", err);
      if (err.code === 'auth/email-already-in-use') {
        setError('This email address is already registered.');
      } else {
        setError(`Error: ${err.message || 'Failed to process registration.'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Left Banner */}
      <div className="auth-banner" style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #0F172A 100%)' }}>
        <div className="auth-banner-content">
          <img src="/school-logo.png" alt="MTSI Logo" style={{ height: '120px', width: '120px', backgroundColor: 'white', borderRadius: '50%', objectFit: 'contain', padding: '4px', marginBottom: '2rem', boxShadow: '0 0 20px rgba(255,255,255,0.2)' }} />
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.2 }}>Join the Community</h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.6 }}>Register for a student account to access your grades, schedule, billing, and all campus resources.</p>
        </div>
      </div>

      {/* Right Form */}
      <div className="auth-form-wrapper">
        <div className="auth-form-card" style={{ maxWidth: '480px' }}>
          <div className="auth-form-header" style={{ marginBottom: '1.5rem' }}>
            <h2>Create Account</h2>
            <p>Fill in your details to get started</p>
          </div>
          
          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#FEE2E2', color: '#DC2626', padding: '1rem', borderRadius: '0.75rem', marginBottom: '1.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
              <ShieldAlert size={18} />
              <span>{error}</span>
            </div>
          )}

          {success ? (
            <div style={{ textAlign: 'center', padding: '2.5rem', backgroundColor: '#F0FDF4', borderRadius: '1rem', border: '1px solid #BBF7D0' }}>
              <CheckCircle2 size={56} style={{ color: '#16A34A', margin: '0 auto 1rem' }} />
              <h3 style={{ color: '#16A34A', marginBottom: '0.5rem', fontSize: '1.5rem', fontWeight: 700 }}>Registration Successful!</h3>
              <p style={{ color: '#065F46', fontSize: '1rem', marginBottom: '1.5rem' }}>
                Your account has been created successfully. Redirecting you to the login page...
              </p>
              <Loader2 size={24} style={{ color: '#16A34A', margin: '0 auto', animation: 'spin 1s linear infinite' }} />
            </div>
          ) : (
            <form onSubmit={handleRegister}>
              <div className="auth-input-group">
                <label>Register As</label>
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
                  </select>
                  <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#9CA3AF' }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
              </div>

              <Input 
                label="Full Name"
                icon={User}
                name="fullName"
                placeholder="e.g. Rey Mart Dulla"
                value={formData.fullName}
                onChange={handleChange}
                disabled={loading}
              />

              <Input 
                label="Email Address"
                icon={Mail}
                type="email"
                name="email"
                placeholder="student@example.com"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
              />

              {role === 'student' && (
                <Input 
                  label="Student ID / Username"
                  icon={User}
                  name="username"
                  placeholder="e.g. 00005060"
                  value={formData.username}
                  onChange={handleChange}
                  disabled={loading}
                />
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <Input 
                  label="Password"
                  icon={Lock}
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                />

                <Input 
                  label="Confirm"
                  icon={Lock}
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <Button type="submit" isLoading={loading} style={{ marginTop: '1.5rem', backgroundColor: '#1E3A8A' }}>
                Create Account <ArrowRight size={18} />
              </Button>
            </form>
          )}

          {!success && (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <p style={{ color: '#64748B', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                Already have an account?{' '}
                <Link to="/login" style={{ color: '#1E3A8A', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  <LogIn size={16} /> Sign In
                </Link>
              </p>
              
              <Link to="/" style={{ color: '#9CA3AF', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}>
                <Home size={16} /> Back to main website
              </Link>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default Register;
