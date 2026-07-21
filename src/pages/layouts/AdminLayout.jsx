import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, ClipboardCheck, Users, BookOpen, Presentation, Newspaper, CalendarDays, LineChart, LogOut, Bell, Settings } from 'lucide-react';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const menuItems = [
    { path: '/portal/admin', icon: Home, label: 'System Overview', exact: true },
    { path: '/portal/admin/applications', icon: ClipboardCheck, label: 'Application Review' },
    { path: '/portal/admin/students', icon: Users, label: 'Student Directory' },
    { path: '/portal/admin/master-list', icon: BookOpen, label: 'Master List' },
    { path: '/portal/admin/schedule', icon: CalendarDays, label: 'Class Schedule' },
    { path: '/portal/admin/faculty', icon: Presentation, label: 'Faculty Overview' },
    { path: '/portal/admin/clearance', icon: ClipboardCheck, label: 'Clearance Hub' },
    { path: '/portal/admin/news', icon: Newspaper, label: 'News & Announcements' },
    { path: '/portal/admin/events', icon: CalendarDays, label: 'Campus Events' },
    { path: '/portal/admin/stats', icon: LineChart, label: 'School Statistics' },
  ];

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
          <div style={{ fontSize: '0.7rem', backgroundColor: '#1E3A8A', color: 'white', padding: '0.2rem 1rem', borderRadius: '1rem', fontWeight: 'bold' }}>ADMIN</div>
        </div>
        
        <div style={{ padding: '0 1rem 0.5rem', marginTop: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.05em' }}>ADMIN MENU</span>
        </div>

        <ul className="sidebar-nav">
          {menuItems.map((item, index) => {
            const isActive = item.exact 
              ? location.pathname === item.path 
              : location.pathname.includes(item.path);
              
            return (
              <li key={index}>
                <Link 
                  to={item.path} 
                  className={isActive ? 'active' : ''}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              </li>
            );
          })}
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
          <div className="header-title" style={{ color: '#111827', fontWeight: 600 }}>Global Administration</div>
          <div className="header-actions">
            <button className="icon-btn" style={{ color: '#6B7280' }}><Bell size={20} /></button>
            <button className="icon-btn" style={{ color: '#6B7280' }}><Settings size={20} /></button>
            <div className="header-user">
              <div className="avatar" style={{ backgroundColor: '#0D742B', color: 'white' }}>AD</div>
              <div className="user-info">
                <span className="user-name" style={{ color: '#111827' }}>System Admin</span>
                <span className="user-role" style={{ color: '#6B7280' }}>Full Access</span>
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
