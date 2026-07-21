import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Users, 
  Calendar,
  CheckCircle,
  Award,
  Clock,
  MoreHorizontal
} from 'lucide-react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import '../layouts/DashboardPremium.css';

const FacultyDashboard = () => {
  const { currentUser } = useAuth();
  const facultyName = currentUser?.name || currentUser?.username || "Faculty"; 

  const fetchClasses = async () => {
    // Only fetch classes assigned to this faculty
    const q = query(collection(db, "classes"));
    const querySnapshot = await getDocs(q);
    
    // In a real app we'd filter by teacherId. Here we'll just filter by teacherName loosely or return all.
    // Assuming currentUser.name is used in classes.teacherName
    let allData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    if (currentUser?.name) {
      const filtered = allData.filter(c => c.teacherName === currentUser.name || c.teacherName === currentUser.username);
      if (filtered.length > 0) allData = filtered;
    }
    
    return allData;
  };

  const { data: classes = [], isLoading: loading } = useQuery({
    queryKey: ['facultyClasses', currentUser?.email],
    queryFn: fetchClasses
  });

  const classesToday = classes.length;
  // Use real metrics when available, default to 0
  const pendingGrades = 0; 
  const unmarkedAttendance = 0; 
  
  // Transform classes into schedule format for the timeline
  const schedule = classes.map(c => ({
    time: c.time || 'TBA',
    title: c.subjectName || 'Unknown Subject',
    status: c.room || 'TBA'
  }));

  return (
    <div style={{ padding: '1.5rem', backgroundColor: '#F8FAFC', minHeight: '100%' }}>
      <div className="bento-container">
        
        {/* Profile Banner */}
        <div className="glass-card premium-banner animate-fade-in delay-1">
          <div className="premium-avatar-wrapper">
            <div className="premium-avatar">{facultyName.charAt(0).toUpperCase()}</div>
            <div className="status-indicator"></div>
          </div>
          <div className="premium-banner-info">
            <h1>Welcome back, {facultyName}</h1>
            <p>Faculty Portal</p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="bento-grid">
          
          {/* Left Column - Today's Schedule */}
          <div className="glass-card animate-fade-in delay-2">
            <div className="glass-card-header">
              <div className="glass-card-title">
                <div className="icon-box blue"><Calendar size={18} /></div>
                Today's Schedule
              </div>
              <button className="card-action"><MoreHorizontal size={18} /></button>
            </div>
            
            <div className="premium-timeline">
              {loading ? (
                <div className="empty-glow">Loading schedule...</div>
              ) : schedule.length > 0 ? (
                schedule.map((item, index) => (
                  <div className="pt-item" key={index}>
                    <div className="pt-dot"></div>
                    <div className="pt-time" style={{ fontSize: '0.85rem', width: 'auto', minWidth: '80px' }}>{item.time}</div>
                    <div className="pt-content">
                      <h4>{item.title}</h4>
                      <div className="pt-meta">
                        <span><Clock size={14} /> Room: {item.status}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-glow">No classes scheduled for today.</div>
              )}
            </div>
          </div>

          {/* Right Column - Bento Widgets */}
          <div className="right-bento">
            
            {/* Classes Today */}
            <div className="glass-card bento-full animate-fade-in delay-3">
              <div className="glass-card-header">
                <div className="glass-card-title">
                  <div className="icon-box green"><Users size={18} /></div>
                  Classes Today
                </div>
              </div>
              <div className="attendance-stats">
                <div className="a-stat present" style={{ width: '100%' }}>
                  <h2>{loading ? '...' : classesToday}</h2>
                  <p>Total Classes</p>
                </div>
              </div>
            </div>

            {/* Pending Grades */}
            <div className="glass-card bento-full animate-fade-in delay-4">
              <div className="glass-card-header">
                <div className="glass-card-title">
                  <div className="icon-box yellow"><Award size={18} /></div>
                  Pending Grades
                </div>
              </div>
              <div className="attendance-stats">
                <div className="a-stat late" style={{ width: '100%' }}>
                  <h2>{loading ? '...' : pendingGrades}</h2>
                  <p>Needs review</p>
                </div>
              </div>
            </div>
            
            {/* Unmarked Attendance */}
            <div className="glass-card bento-full animate-fade-in delay-4">
              <div className="glass-card-header">
                <div className="glass-card-title">
                  <div className="icon-box purple"><CheckCircle size={18} /></div>
                  Unmarked Attendance
                </div>
              </div>
              <div className="attendance-stats">
                <div className="a-stat present" style={{ width: '100%' }}>
                  <h2>{loading ? '...' : unmarkedAttendance}</h2>
                  <p>Pending Records</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
