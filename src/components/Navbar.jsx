import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const closeMenu = () => setMobileOpen(false);

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <img src="/school-logo.png" alt="MTSI Logo" style={{ height: '40px', width: 'auto' }} />
          <span className="nav-logo-text">Mindanao Tribal School Inc.</span>
        </Link>

        {/* Hamburger Button — visible only on mobile */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navigation Links */}
        <ul className={`nav-links ${mobileOpen ? 'nav-open' : ''}`}>
          <li><Link to="/" onClick={closeMenu} style={{ color: isActive('/') ? 'var(--color-primary)' : '' }}>Home</Link></li>
          <li><Link to="/about" onClick={closeMenu} style={{ color: isActive('/about') ? 'var(--color-primary)' : '' }}>About</Link></li>
          <li><Link to="/programs" onClick={closeMenu} style={{ color: isActive('/programs') ? 'var(--color-primary)' : '' }}>Programs</Link></li>

          <li><Link to="/events" onClick={closeMenu} style={{ color: isActive('/events') ? 'var(--color-primary)' : '' }}>Events</Link></li>
          <li><Link to="/contact" onClick={closeMenu} style={{ color: isActive('/contact') ? 'var(--color-primary)' : '' }}>Contact</Link></li>
          <li>
            <Link to="/login" onClick={closeMenu} className="btn btn-primary" style={{ padding: '0.4rem 1.2rem' }}>
              Portal Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
