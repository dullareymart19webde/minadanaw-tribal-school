import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Users, MessageCircle, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div style={{ maxWidth: '300px' }}>
            <h3 style={{ color: 'var(--color-surface)', fontSize: '1.5rem', marginBottom: '1.5rem', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <img src="/school-logo.png" alt="MTSI Logo" style={{ height: '40px', width: '40px', backgroundColor: 'white', borderRadius: '50%', objectFit: 'contain', padding: '1px' }} />
              MTSI
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '2rem' }}>
              Mindanao Tribal School Inc. empowers indigenous youth through education that honors ancestral heritage and prepares them for the future.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#" style={{ color: 'var(--color-accent)', backgroundColor: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease' }}>
                <Globe size={20} />
              </a>
              <a href="#" style={{ color: 'var(--color-accent)', backgroundColor: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease' }}>
                <MessageCircle size={20} />
              </a>
              <a href="#" style={{ color: 'var(--color-accent)', backgroundColor: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease' }}>
                <Users size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/programs">Academic Programs</Link></li>

              <li><Link to="/events">News & Events</Link></li>
              <li><Link to="/login">Student Portal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-title">Contact Info</h4>
            <ul className="footer-links" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <MapPin size={20} style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '2px' }} />
                <span>MTSI Grounds,<br />Bukidnon, Philippines</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Phone size={20} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                <span>+63 912 345 6789</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Mail size={20} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                <span>info@mtsi.edu.ph</span>
              </li>
            </ul>
          </div>


        </div>

        <div className="footer-bottom">
          <div>&copy; {new Date().getFullYear()} Mindanao Tribal School Inc. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
