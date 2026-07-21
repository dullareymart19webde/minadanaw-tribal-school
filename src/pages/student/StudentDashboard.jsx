import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Calendar,
  CheckCircle,
  Clock,
  MapPin,
  TrendingUp,
  Bell,
  AlertTriangle,
  CalendarDays,
  FileText
} from 'lucide-react';
import { collection, getDocs, doc, getDoc, query } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import '../layouts/DashboardPremium.css';

const StudentDashboard = () => {
  const { currentUser } = useAuth();
  
  const fetchDashboardData = async () => {
    let studentData = {
      name: currentUser?.name || currentUser?.username || 'Student',
      grade: 'Grade',
      attendance: { present: 0, absent: 0, late: 0 },
      gpa: null
    };
    
    let classes = [];
    
    if (currentUser?.username) {
      const studentSnap = await getDoc(doc(db, "students", currentUser.username));
      if (studentSnap.exists()) {
        const docData = studentSnap.data();
        studentData = {
          ...studentData,
          name: docData.name || studentData.name,
          grade: docData.grade || studentData.grade,
          attendance: docData.attendance || { present: 0, absent: 0, late: 0 }
        };
        
        // Fetch predefined subjects
        if (docData.subjects && Array.isArray(docData.subjects)) {
          classes = docData.subjects.map(s => {
            const timeParts = (s.time || '08:00 AM').split(' ');
            return {
              time: timeParts[0],
              ampm: timeParts[1] || 'AM',
              subjectCode: s.code || 'UNK',
              subjectName: s.subjectName || 'Subject',
            };
          });
        }
      }
    }
    
    let latestNews = null;
    const newsSnap = await getDocs(collection(db, "news"));
    if (!newsSnap.empty) {
      const allNews = newsSnap.docs.map(d => ({id: d.id, ...d.data()}));
      allNews.sort((a,b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0));
      latestNews = allNews[0];
    }
    
    return { student: studentData, todaysLoad: classes, latestNews };
  };

  const { data, isLoading: loading } = useQuery({
    queryKey: ['studentDashboard', currentUser?.email],
    queryFn: fetchDashboardData
  });

  const student = data?.student || { name: 'Loading...', grade: 'Grade', attendance: { present: 0, absent: 0, late: 0 }, gpa: null };
  const todaysLoad = data?.todaysLoad || [];

  return (
    <div style={{ padding: '1.5rem', backgroundColor: '#F8FAFC', minHeight: '100%' }}>
      
      {/* Title */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827', margin: 0 }}>Dashboard</h1>
        <span style={{ color: '#64748B', fontSize: '0.9rem' }}>Welcome back, {student.name.split(' ')[0]}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
        
        {/* Column 1: Curriculum Load */}
        <div style={{ background: 'white', borderRadius: '0.5rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #E2E8F0' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 700, color: '#1E3A8A', marginBottom: '1rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            <Clock size={16} /> {student.grade} CURRICULUM LOAD
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {loading ? (
              <div style={{ fontSize: '0.85rem', color: '#64748B' }}>Loading schedule...</div>
            ) : todaysLoad.length > 0 ? (
              todaysLoad.map((item, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: index < todaysLoad.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>{item.subjectName}</span>
                  <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#60A5FA' }}></div>
                    {item.time} {item.ampm && item.ampm}
                  </span>
                </div>
              ))
            ) : (
              <div style={{ fontSize: '0.85rem', color: '#64748B' }}>No classes scheduled.</div>
            )}
          </div>
        </div>

        {/* Column 2: Attendance & GPA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Attendance */}
          <div style={{ background: 'white', borderRadius: '0.5rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #E2E8F0' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 700, color: '#1E3A8A', marginBottom: '1rem', letterSpacing: '0.05em' }}>
              <CheckCircle size={16} /> ATTENDANCE
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <div style={{ border: '1px solid #E2E8F0', borderRadius: '0.5rem', padding: '0.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10B981' }}>{loading ? '-' : student.attendance.present}</div>
                <div style={{ fontSize: '0.65rem', fontWeight: 600, color: '#64748B' }}>PRESENT</div>
              </div>
              <div style={{ border: '1px solid #E2E8F0', borderRadius: '0.5rem', padding: '0.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#EF4444' }}>{loading ? '-' : student.attendance.absent}</div>
                <div style={{ fontSize: '0.65rem', fontWeight: 600, color: '#64748B' }}>ABSENT</div>
              </div>
              <div style={{ border: '1px solid #E2E8F0', borderRadius: '0.5rem', padding: '0.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#F59E0B' }}>{loading ? '-' : student.attendance.late}</div>
                <div style={{ fontSize: '0.65rem', fontWeight: 600, color: '#64748B' }}>LATE</div>
              </div>
            </div>
          </div>

          {/* GPA Progress */}
          <div style={{ background: 'white', borderRadius: '0.5rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #E2E8F0', flex: 1 }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 700, color: '#1E3A8A', marginBottom: '1rem', letterSpacing: '0.05em' }}>
              <TrendingUp size={16} /> GPA PROGRESS
            </h3>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <div style={{ fontSize: '3.5rem', fontWeight: 900, color: student.gpa ? '#2563EB' : '#94A3B8', lineHeight: 1 }}>
                {student.gpa ? student.gpa : 'N/A'}
              </div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#3B82F6', letterSpacing: '0.05em' }}>CURRENT AVERAGE GPA</div>
            </div>
          </div>
        </div>

        {/* Column 3: Announcements & Records */}
        <div style={{ background: 'white', borderRadius: '0.5rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #E2E8F0' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 700, color: '#1E3A8A', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>
            <Bell size={16} /> ANNOUNCEMENTS & RECORDS
          </h3>

          {/* Adviser Reminders */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 700, color: '#1E3A8A', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
              <FileText size={14} /> ADVISER REMINDERS
            </h4>
            <div style={{ border: '1px solid #E2E8F0', borderRadius: '0.5rem', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1E3A8A' }}>No new assignments</span>
            </div>
          </div>

          {/* Disciplinary Records */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 700, color: '#EF4444', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
              <AlertTriangle size={14} /> DISCIPLINARY RECORDS
            </h4>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#10B981' }}>
              Clean Record.
            </div>
          </div>

          {/* Latest News */}
          <div>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 700, color: '#1E3A8A', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
              <Bell size={14} /> LATEST ANNOUNCEMENT
            </h4>
            <div style={{ border: '1px solid #E2E8F0', borderRadius: '0.5rem', padding: '1rem', background: '#F8FAFC' }}>
              {data?.latestNews ? (
                <>
                  <div style={{ fontWeight: 600, color: '#1E3A8A', fontSize: '0.9rem', marginBottom: '0.25rem' }}>{data.latestNews.title}</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748B', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{data.latestNews.content}</div>
                </>
              ) : (
                <span style={{ fontSize: '0.8rem', color: '#111827' }}>No upcoming events or announcements scheduled.</span>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;
