import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Award, Calendar, LogOut } from 'lucide-react';

const StudentLayout = () => {
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
      <aside className="portal-sidebar" style={{ backgroundColor: '#0F766E' }}>
        <div className="sidebar-header">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0, fontSize: '1.2rem' }}>
            MTSI Student
          </h2>
        </div>
        <ul className="sidebar-nav">
          <li>
            <Link to="/portal/student" className={location.pathname === '/portal/student' ? 'active' : ''}>
              <LayoutDashboard size={20} />
              My Overview
            </Link>
          </li>
          <li>
            <Link to="/portal/student/grades" className={location.pathname.includes('/grades') ? 'active' : ''}>
              <Award size={20} />
              My Grades
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
          <div className="header-title">Student Portal</div>
          <div className="header-actions">
            <div className="header-user">
              <div className="avatar" style={{ backgroundColor: '#F59E0B', color: 'white' }}>AM</div>
              <div className="user-info">
                <span className="user-name">Alunsina Matalin</span>
                <span className="user-role">Grade 10 Student</span>
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

export default StudentLayout;
