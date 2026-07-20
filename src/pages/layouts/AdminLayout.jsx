import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, GraduationCap, Users, LogOut, Bell, Settings } from 'lucide-react';

const AdminLayout = () => {
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
      <aside className="portal-sidebar">
        <div className="sidebar-header">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0, fontSize: '1.2rem' }}>
            MTSI Admin
          </h2>
        </div>
        <ul className="sidebar-nav">
          <li>
            <Link to="/portal/admin" className={location.pathname === '/portal/admin' ? 'active' : ''}>
              <LayoutDashboard size={20} />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/portal/admin/students" className={location.pathname.includes('/students') ? 'active' : ''}>
              <GraduationCap size={20} />
              Master Students
            </Link>
          </li>
          <li>
            <Link to="/portal/admin/faculty" className={location.pathname.includes('/faculty') ? 'active' : ''}>
              <Users size={20} />
              Master Faculty
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
          <div className="header-title">Global Administration</div>
          <div className="header-actions">
            <button className="icon-btn"><Bell size={20} /></button>
            <button className="icon-btn"><Settings size={20} /></button>
            <div className="header-user">
              <div className="avatar">AD</div>
              <div className="user-info">
                <span className="user-name">System Admin</span>
                <span className="user-role">Full Access</span>
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

export default AdminLayout;
