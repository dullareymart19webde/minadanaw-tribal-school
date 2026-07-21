import React, { useState, useEffect } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '../../firebase';
import '../layouts/DashboardPremium.css';

const StudentAttendance = () => {
  const [attendance, setAttendance] = useState({ present: 0, absent: 0, late: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const studentSnap = await getDocs(query(collection(db, "students"), limit(1)));
        if (!studentSnap.empty) {
          const docData = studentSnap.docs[0].data();
          if (docData.attendance) {
            setAttendance(docData.attendance);
          }
        }
      } catch (error) {
        console.error("Error fetching attendance:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAttendance();
  }, []);

  return (
    <div style={{ padding: '1.5rem', backgroundColor: '#F8FAFC', minHeight: '100%' }}>
      <div className="bento-container">
        
        {/* Header Banner */}
        <div className="glass-card premium-banner animate-fade-in delay-1" style={{ padding: '1.5rem 2rem' }}>
          <div className="premium-banner-info" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={24} color="var(--dash-primary)" /> My Attendance
              </h1>
              <p>Keep track of your class attendance records.</p>
            </div>
          </div>
        </div>

        <div className="bento-grid">
          <div className="glass-card bento-full animate-fade-in delay-2" style={{ padding: '3rem' }}>
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Loader2 size={32} className="spinner" style={{ color: 'var(--dash-primary)' }} />
              </div>
            ) : (
              <div className="attendance-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                <div className="a-stat present" style={{ padding: '2rem' }}>
                  <h2 style={{ fontSize: '3rem' }}>{attendance.present}</h2>
                  <p style={{ fontSize: '1.1rem' }}>Present</p>
                </div>
                <div className="a-stat absent" style={{ padding: '2rem' }}>
                  <h2 style={{ fontSize: '3rem' }}>{attendance.absent}</h2>
                  <p style={{ fontSize: '1.1rem' }}>Absent</p>
                </div>
                <div className="a-stat late" style={{ padding: '2rem' }}>
                  <h2 style={{ fontSize: '3rem' }}>{attendance.late}</h2>
                  <p style={{ fontSize: '1.1rem' }}>Late</p>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentAttendance;
