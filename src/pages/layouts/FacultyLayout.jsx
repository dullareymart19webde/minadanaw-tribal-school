import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, ClipboardList, LogOut, Bell } from 'lucide-react';

const FacultyLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('userRole');
    navigate('/');
  };

  return (
    <div className="portal-layout">
      {/* Sidebar */}
      <aside className="portal-sidebar" style={{ backgroundColor: '#1E293B' }}>
        <div className="sidebar-header">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0, fontSize: '1.2rem' }}>
            MTSI Faculty
          </h2>
        </div>
        <ul className="sidebar-nav">
          <li>
            <Link to="/portal/faculty" className={location.pathname === '/portal/faculty' ? 'active' : ''}>
              <LayoutDashboard size={20} />
              Overview
            </Link>
          </li>
          <li>
            <Link to="/portal/faculty/classes" className={location.pathname.includes('/classes') ? 'active' : ''}>
              <BookOpen size={20} />
              My Classes
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
      <div className="portal-main">
        <header className="portal-header">
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
