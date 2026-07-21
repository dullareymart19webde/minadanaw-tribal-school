import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, GraduationCap, Monitor, Menu, Settings, Bell, LogOut, X } from 'lucide-react';

const StudentLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="portal-layout">
      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div 
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 999 }}
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`portal-sidebar ${sidebarOpen ? 'open' : ''}`}>
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
          <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.8)', textAlign: 'center', marginBottom: '0.5rem' }}>Integrated Smart School<br/>Management System</div>
          <div style={{ fontSize: '0.7rem', backgroundColor: '#1E3A8A', color: 'white', padding: '0.2rem 1rem', borderRadius: '1rem', fontWeight: 'bold' }}>STUDENT</div>
          
          {/* Close button for mobile */}
          <button className="menu-toggle" onClick={toggleSidebar} style={{ color: 'white', position: 'absolute', right: '1rem', top: '1rem' }}>
            <X size={24} />
          </button>
        </div>

        <div style={{ padding: '0 1.5rem 0.5rem', marginTop: '1rem' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>MAIN MENU</span>
        </div>

        <ul className="sidebar-nav">
          <li>
            <Link to="/portal/student" 
              className={location.pathname === '/portal/student' ? 'active' : ''}
              onClick={() => setSidebarOpen(false)}>
              <LayoutDashboard size={18} />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/portal/student/schedule" 
              className={location.pathname.includes('/schedule') ? 'active' : ''}
              onClick={() => setSidebarOpen(false)}>
              <BookOpen size={18} />
              Enrolled Subjects
            </Link>
          </li>
          <li>
            <Link to="/portal/student/grades" 
              className={location.pathname.includes('/grades') ? 'active' : ''}
              onClick={() => setSidebarOpen(false)}>
              <GraduationCap size={18} />
              My Grades
            </Link>
          </li>
          <li>
            <Link to="/portal/student/lms" 
              className={location.pathname.includes('/lms') ? 'active' : ''}
              onClick={() => setSidebarOpen(false)}>
              <Monitor size={18} />
              Class Materials
            </Link>
          </li>
        </ul>

        <div className="sidebar-footer" style={{ marginTop: 'auto', padding: '1rem', borderTop: 'none' }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem', padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#1E3A8A', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>
              R
            </div>
            <div>
              <div style={{ color: 'white', fontSize: '0.85rem', fontWeight: 500 }}>Good evening, ...</div>
              <div style={{ color: '#60A5FA', fontSize: '0.75rem' }}>ID: 12062004</div>
            </div>
          </div>
          
          <a href="/" onClick={handleLogout} style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', borderRadius: '0.5rem', color: '#F87171', border: '1px solid rgba(248, 113, 113, 0.2)', textDecoration: 'none', justifyContent: 'center', fontWeight: 500
          }}>
            <LogOut size={16} />
            Sign Out
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="portal-main" style={{ backgroundColor: '#F8FAFC' }}>
        <header className="portal-header" style={{ padding: '0 1.5rem', borderBottom: '1px solid #E2E8F0', backgroundColor: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%' }}>
            <button className="menu-toggle" onClick={toggleSidebar}>
              <Menu size={24} />
            </button>
            
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <div style={{ background: '#F1F5F9', borderRadius: '2rem', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', width: '50%', minWidth: '300px' }}>
                <input type="text" placeholder="Search subjects, grades, announcements..." style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.85rem' }} />
              </div>
            </div>

            <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.85rem', color: '#64748B', display: 'none' }}>Mon, Jul 20, 10:22 PM</span>
              <button className="icon-btn" style={{ border: 'none', backgroundColor: '#F1F5F9', color: '#64748B', position: 'relative' }}>
                <Bell size={18} />
                <span style={{ position: 'absolute', top: '-2px', right: '-2px', background: '#EF4444', color: 'white', fontSize: '0.5rem', width: '12px', height: '12px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</span>
              </button>
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
