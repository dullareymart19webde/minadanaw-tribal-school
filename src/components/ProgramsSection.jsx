import React from 'react';
import { BookOpen, Leaf, Users, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const ProgramsSection = () => {
  const programs = [
    {
      id: 1,
      icon: <BookOpen size={40} strokeWidth={1.5} />,
      title: "IPED Core Curriculum",
      description: "A comprehensive DepEd-recognized program that blends standard academic subjects with indigenous knowledge systems and practices."
    },
    {
      id: 2,
      icon: <Leaf size={40} strokeWidth={1.5} />,
      title: "Living Traditions",
      description: "Hands-on immersion in ancestral farming, traditional weaving, oral histories, and sustainable land stewardship."
    },
    {
      id: 3,
      icon: <Users size={40} strokeWidth={1.5} />,
      title: "Cultural Exchange",
      description: "Fostering mutual respect through partnerships with universities and mainstream communities to promote peace and sensitivity."
    },
    {
      id: 4,
      icon: <Shield size={40} strokeWidth={1.5} />,
      title: "Youth Leadership",
      description: "Training the next generation of tribal leaders in indigenous rights advocacy, environmental protection, and community governance."
    }
  ];

  return (
    <section className="section programs-section" id="programs">
      <div className="container">
        <div className="text-center">
          <h2 className="section-title">Our Programs</h2>
          <p style={{ maxWidth: '600px', margin: '1rem auto 0', color: 'var(--color-muted)' }}>
            We provide comprehensive educational programs that honor our roots while preparing students for the modern world.
          </p>
        </div>
        
        <div className="cards-grid">
          {programs.map((prog, index) => (
            <div className={`feature-card fade-up-element delay-${(index % 3 + 1) * 100}`} key={prog.id}>
              <div className="feature-icon">{prog.icon}</div>
              <h3 className="feature-title" style={{ fontFamily: 'var(--font-display)' }}>{prog.title}</h3>
              <p className="feature-desc">{prog.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
