import React from 'react';
import tribalPhoto from '../assets/tribal-picture.JPG';

const AboutSection = () => {
  return (
    <section className="section green-divider" id="about">
      <div className="container">
        <div className="text-center">
          <h2 className="section-title">About MTSI</h2>
        </div>
        
        <div className="content-grid">
          <div className="image-wrapper">
            <img 
              src={tribalPhoto} 
              alt="Students in traditional attire learning" 
            />
          </div>
          
          <div className="text-content">
            <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>
              Rooted in Tradition. Ready for the World.
            </h3>
            <p>
              Mindanao Tribal School Inc. (MTSI) was founded with a singular vision: to provide high-quality education to indigenous youth without forcing them to abandon their cultural identity. 
            </p>
            <p>
              We believe that true education does not erase a child's roots; it waters them. By integrating the DepEd curriculum with our Living Traditions program, we ensure that our students master science and mathematics while remaining deeply connected to their ancestral lands, dialects, and arts.
            </p>
            
            <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'var(--color-surface)', borderLeft: '4px solid var(--color-accent)', borderRadius: '0 8px 8px 0' }}>
              <h4 style={{ marginBottom: '0.5rem', color: 'var(--color-secondary)' }}>Message from the Founder</h4>
              <p style={{ fontStyle: 'italic', fontSize: '0.95rem', margin: 0 }}>
                "Our ancestors built communities that thrived in harmony with nature. Our goal is to equip the next generation with the tools to defend that heritage while thriving in the modern economy."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
