import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, BookText, FolderOpen, Bell, LogOut } from 'lucide-react';

const FacultyLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <div className="portal-layout" style={{ backgroundColor: '#F8FAFC' }}>
      {/* Sidebar */}
      <aside className="portal-sidebar">
        <div className="sidebar-header" style={{ padding: '2rem 1.5rem', borderBottom: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', height: 'auto' }}>
          <img 
            src="/school-logo.png" 
            alt="School Logo" 
            style={{ 
              width: '70px', 
              height: '70px', 
              backgroundColor: 'white',
              borderRadius: '50%',
              objectFit: 'contain',
              padding: '2px',
              marginBottom: '1rem',
              boxShadow: '0 0 10px rgba(255,255,255,0.2)'
            }} 
          />
          <h2 style={{ fontSize: '1rem', textAlign: 'center', color: 'white', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
            MINADANAW TRIBAL<br/>SCHOOL
          </h2>
          <div style={{ fontSize: '0.65rem', color: '#F5BE22', border: '1px solid #F5BE22', padding: '0.1rem 0.5rem', borderRadius: '1rem', marginBottom: '0.2rem' }}>MTSI PORTAL v2.1</div>
          <div style={{ fontSize: '0.7rem', backgroundColor: '#1E3A8A', color: 'white', padding: '0.2rem 1rem', borderRadius: '1rem', fontWeight: 'bold' }}>FACULTY</div>
        </div>
        
        <div style={{ padding: '0 1rem 0.5rem', marginTop: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.05em' }}>FACULTY MENU</span>
        </div>

        <ul className="sidebar-nav">
          <li>
            <Link to="/portal/faculty" className={location.pathname === '/portal/faculty' ? 'active' : ''}>
              <LayoutDashboard size={18} />
              Manage Dashboards
            </Link>
          </li>
          <li>
            <Link to="/portal/faculty/advisory" className={location.pathname.includes('/advisory') ? 'active' : ''}>
              <Users size={18} />
              Advisory Setup
            </Link>
          </li>
          <li>
            <Link to="/portal/faculty/gradebook" className={location.pathname.includes('/gradebook') ? 'active' : ''}>
              <BookText size={18} />
              Master Gradebook
            </Link>
          </li>
          <li>
            <Link to="/portal/faculty/resources" className={location.pathname.includes('/resources') ? 'active' : ''}>
              <FolderOpen size={18} />
              Resource Hub
            </Link>
          </li>
        </ul>
        <div className="sidebar-footer">
          <a href="/" onClick={handleLogout} className="logout-btn">
            <LogOut size={20} />
            Logout
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="portal-main" style={{ backgroundColor: '#F8FAFC' }}>
        <header className="portal-header" style={{ backgroundColor: 'white', borderBottom: '1px solid #E5E7EB' }}>
          <div className="header-title">Teacher Portal</div>
          <div className="header-actions">
            <button className="icon-btn"><Bell size={20} /></button>
            <div className="header-user">
              <div className="avatar" style={{ backgroundColor: '#10B981', color: 'white' }}>DP</div>
              <div className="user-info">
                <span className="user-name">Datu Pandian</span>
                <span className="user-role">Senior Instructor</span>
              </div>
            </div>
          </div>
        </header>
        <div className="portal-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default FacultyLayout;
