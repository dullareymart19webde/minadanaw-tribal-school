import React, { useState, useEffect } from 'react';
import { LineChart, Users, BookOpen, Clock, Loader2 } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import '../layouts/DashboardPremium.css';

const AdminStats = () => {
  const [stats, setStats] = useState({
    activeStudents: 0,
    activeFaculty: 0,
    pendingApps: 0,
    totalClasses: 12 // mockup for now
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const [studentsSnap, facultySnap] = await Promise.all([
        getDocs(collection(db, "students")),
        getDocs(collection(db, "faculty"))
      ]);
      
      let activeS = 0;
      let pending = 0;
      studentsSnap.docs.forEach(doc => {
        const data = doc.data();
        if (data.status === 'Active') activeS++;
        else if (data.status === 'Pending Activation' || data.status === 'Pending') pending++;
      });

      let activeF = 0;
      facultySnap.docs.forEach(doc => {
        if (doc.data().status === 'Active') activeF++;
      });

      setStats({
        activeStudents: activeS,
        activeFaculty: activeF,
        pendingApps: pending,
        totalClasses: 12
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div style={{ padding: '1.5rem', backgroundColor: '#F8FAFC', minHeight: '100%' }}>
      <div className="bento-container">
        
        {/* Header Banner */}
        <div className="glass-card premium-banner animate-fade-in delay-1" style={{ padding: '1.5rem 2rem' }}>
          <div className="premium-banner-info" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <LineChart size={24} /> School Statistics
              </h1>
              <p>Overview of institutional metrics and data</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="glass-card" style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
            <Loader2 size={32} className="spinner" style={{ color: 'var(--dash-primary)' }} />
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
            
            <div className="glass-card animate-fade-in delay-2">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ padding: '1rem', borderRadius: '1rem', background: 'rgba(13, 116, 43, 0.1)', color: 'var(--dash-primary)' }}>
                  <Users size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--dash-text-muted)' }}>Active Students</div>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--dash-text)' }}>{stats.activeStudents}</div>
                </div>
              </div>
            </div>

            <div className="glass-card animate-fade-in delay-3">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ padding: '1rem', borderRadius: '1rem', background: 'rgba(38, 35, 227, 0.1)', color: 'var(--dash-blue)' }}>
                  <Users size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--dash-text-muted)' }}>Active Faculty</div>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--dash-text)' }}>{stats.activeFaculty}</div>
                </div>
              </div>
            </div>

            <div className="glass-card animate-fade-in delay-4">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ padding: '1rem', borderRadius: '1rem', background: 'rgba(245, 190, 34, 0.1)', color: 'var(--dash-accent)' }}>
                  <Clock size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--dash-text-muted)' }}>Pending Apps</div>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--dash-text)' }}>{stats.pendingApps}</div>
                </div>
              </div>
            </div>

            <div className="glass-card animate-fade-in delay-5">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ padding: '1rem', borderRadius: '1rem', background: 'rgba(219, 26, 33, 0.1)', color: 'var(--dash-red)' }}>
                  <BookOpen size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--dash-text-muted)' }}>Total Classes</div>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--dash-text)' }}>{stats.totalClasses}</div>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default AdminStats;
