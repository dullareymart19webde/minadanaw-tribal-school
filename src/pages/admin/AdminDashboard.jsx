import React, { useState, useEffect } from 'react';
import { 
  Users, 
  GraduationCap,
  BookOpen,
  AlertTriangle,
  Clock,
  MoreHorizontal
} from 'lucide-react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebase';
import '../layouts/DashboardPremium.css';

const PortalDashboard = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [activeFaculty, setActiveFaculty] = useState(0);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const ipedPrograms = 4; // Static for prototype
  const recentIncidents = 0; // Starts at 0 for real data

  const fetchStats = async () => {
    try {
      const studentsSnap = await getDocs(collection(db, "students"));
      // Count only active students
      const activeStudents = studentsSnap.docs.filter(d => d.data().status === 'Active').length;
      setTotalStudents(activeStudents);
      
      const facultySnap = await getDocs(collection(db, "faculty"));
      setActiveFaculty(facultySnap.size);

      // Fetch recent announcements for timeline
      const newsSnap = await getDocs(collection(db, "news"));
      const newsData = newsSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Sort manually since no index might exist for createdAt
      newsData.sort((a,b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0));
      
      const topNews = newsData.slice(0, 3).map(n => ({
        time: n.createdAt ? new Date(n.createdAt.toMillis()).toLocaleDateString() : 'Recent',
        user: n.author || 'System Admin',
        action: `Posted announcement: ${n.title}`
      }));
      setRecentActivity(topNews);

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
        
        {/* Profile Banner */}
        <div className="glass-card premium-banner animate-fade-in delay-1">
          <div className="premium-avatar-wrapper">
            <div className="premium-avatar">A</div>
            <div className="status-indicator"></div>
          </div>
          <div className="premium-banner-info" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1>Dashboard Overview</h1>
              <p>Administrator Portal</p>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="bento-grid">
          
          {/* Left Column - Recent Activity */}
          <div className="glass-card animate-fade-in delay-2">
            <div className="glass-card-header">
              <div className="glass-card-title">
                <div className="icon-box purple"><Clock size={18} /></div>
                Recent Activity
              </div>
              <button className="card-action"><MoreHorizontal size={18} /></button>
            </div>
            
            <div className="premium-timeline">
              {loading ? (
                 <div className="empty-glow">Loading activity...</div>
              ) : recentActivity.length > 0 ? (
                recentActivity.map((activity, idx) => (
                  <div className="pt-item" key={idx}>
                    <div className="pt-dot"></div>
                    <div className="pt-time" style={{ fontSize: '0.85rem', width: 'auto', minWidth: '80px' }}>{activity.time}</div>
                    <div className="pt-content">
                      <h4>{activity.user}</h4>
                      <p>{activity.action}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-glow">No recent activity.</div>
              )}
            </div>
          </div>

          {/* Right Column - Bento Widgets */}
          <div className="right-bento">
            
            {/* Total Students */}
            <div className="glass-card bento-full animate-fade-in delay-3">
              <div className="glass-card-header">
                <div className="glass-card-title">
                  <div className="icon-box blue"><Users size={18} /></div>
                  Active Students
                </div>
              </div>
              <div className="attendance-stats">
                <div className="a-stat present" style={{ width: '100%' }}>
                  <h2>{loading ? '...' : totalStudents}</h2>
                  <p>Enrolled</p>
                </div>
              </div>
            </div>

            {/* Active Faculty */}
            <div className="glass-card bento-full animate-fade-in delay-4">
              <div className="glass-card-header">
                <div className="glass-card-title">
                  <div className="icon-box green"><GraduationCap size={18} /></div>
                  Active Faculty
                </div>
              </div>
              <div className="attendance-stats">
                <div className="a-stat present" style={{ width: '100%' }}>
                  <h2>{loading ? '...' : activeFaculty}</h2>
                  <p>Staff</p>
                </div>
              </div>
            </div>
            
            {/* IPED Programs */}
            <div className="glass-card mini-bento animate-fade-in delay-4">
              <div className="glass-card-header">
                <div className="glass-card-title">
                  <div className="icon-box yellow"><BookOpen size={18} /></div>
                  Programs
                </div>
              </div>
              <div className="attendance-stats" style={{ padding: 0, justifyContent: 'center' }}>
                <div className="a-stat late">
                  <h2>{ipedPrograms}</h2>
                </div>
              </div>
              <p className="mini-desc text-center">IPED Programs</p>
            </div>

            {/* Recent Incidents */}
            <div className="glass-card mini-bento animate-fade-in delay-4">
              <div className="glass-card-header">
                <div className="glass-card-title">
                  <div className="icon-box red"><AlertTriangle size={18} /></div>
                  Incidents
                </div>
              </div>
              <div className="attendance-stats" style={{ padding: 0, justifyContent: 'center' }}>
                <div className="a-stat absent">
                  <h2>{recentIncidents}</h2>
                </div>
              </div>
              <p className="mini-desc text-center">Recent Incidents</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PortalDashboard;
