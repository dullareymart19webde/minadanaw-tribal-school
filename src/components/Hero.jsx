import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="hero green-divider">
      <img src="/hero-bg.jpg" alt="Tribal School Background" className="hero-bg" />
      <div className="hero-overlay"></div>
      
      <div className="container" style={{ zIndex: 1 }}>
        <div className="hero-content">
          <h1 className="hero-title">Preserving Heritage, Empowering the Future</h1>
          <p className="hero-subtitle">
            Welcome to Mindanao Tribal School Inc. We blend rigorous modern academics with deep-rooted indigenous wisdom, cultivating leaders who honor their ancestral past.
          </p>
          <div className="hero-buttons">
            <Link to="/contact" className="btn btn-primary">Contact Us</Link>
            <Link to="/about" className="btn btn-outline" style={{ color: '#fff', borderColor: '#fff' }}>Our Story</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
