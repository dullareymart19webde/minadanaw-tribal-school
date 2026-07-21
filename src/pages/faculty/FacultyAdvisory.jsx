import React, { useState, useEffect } from 'react';
import { Users, FileText, Search, Plus } from 'lucide-react';

const FacultyAdvisory = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div style={{ padding: '1.5rem', backgroundColor: '#F8FAFC', minHeight: '100%' }}>
      <div className="bento-container">
        
        {/* Header Banner */}
        <div className="glass-card premium-banner animate-fade-in delay-1">
          <div className="premium-banner-info" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{ color: '#111827', margin: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Users size={32} color="#0D742B" /> Advisory Setup
              </h1>
              <p style={{ color: '#64748B', margin: '0.5rem 0 0 0' }}>Manage your advisory classes and student assignments</p>
            </div>
            
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="premium-badge" style={{ cursor: 'pointer', background: '#0D742B', color: '#fff', border: 'none' }}>
                <Plus size={16} /> New Advisory
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="glass-card animate-fade-in delay-2" style={{ background: '#ffffff', minHeight: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', border: '3px solid #f3f3f3', borderTop: '3px solid #0D742B', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
              <p style={{ color: '#64748B' }}>Loading advisory data...</p>
            </div>
          ) : (
            <div className="empty-glow" style={{ border: 'none', background: 'transparent' }}>
              <Users size={48} color="#CBD5E1" style={{ marginBottom: '1rem' }} />
              <h3 style={{ color: '#334155', fontSize: '1.25rem', marginBottom: '0.5rem' }}>No Advisory Classes Found</h3>
              <p style={{ color: '#64748B', maxWidth: '400px', margin: '0 auto' }}>
                You have not been assigned to any advisory classes yet. Contact the administration to set up your advisory schedule.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default FacultyAdvisory;
