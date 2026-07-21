import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Loader2, BookOpen } from 'lucide-react';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';

const StudentSchedule = () => {
  const { currentUser } = useAuth();
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSchedule = async () => {
    try {
      if (!currentUser?.email) return;

      // 1. Get the student document to find their ID
      const userSnap = await getDocs(collection(db, "users"));
      const userDoc = userSnap.docs.find(d => d.data().email === currentUser.email);
      
      if (userDoc) {
        const studentId = userDoc.data().username;
        const studentRef = doc(db, "students", studentId);
        const studentSnap = await getDoc(studentRef);

          if (studentSnap.exists()) {
          const docData = studentSnap.data();
          
          if (docData.subjects && Array.isArray(docData.subjects)) {
            // Map real data to display format
            setSchedule(docData.subjects.map((c, i) => ({
              id: i.toString(),
              course: c.code || 'UNK',
              title: c.subjectName || 'Subject',
              time: c.time || 'TBA',
              days: c.days || 'Mon-Fri', // Placeholder until real day assignment
              room: c.room || 'TBA'
            })));
          } else {
            setSchedule([]);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching schedule:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, [currentUser]);

  return (
    <div style={{ padding: '2rem' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#111827', margin: '0 0 0.5rem 0' }}>Enrolled Subjects</h1>
          <p style={{ color: '#6B7280', margin: 0 }}>View your current class schedule and subjects</p>
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: '1rem', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
        
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
            <Loader2 size={32} className="spinner" style={{ color: '#0D742B' }} />
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                <th style={{ padding: '1rem 1.5rem', color: '#6B7280', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase' }}>Subject</th>
                <th style={{ padding: '1rem 1.5rem', color: '#6B7280', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase' }}>Schedule</th>
                <th style={{ padding: '1rem 1.5rem', color: '#6B7280', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase' }}>Room</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((item, index) => (
                <tr key={item.id} style={{ borderBottom: index === schedule.length - 1 ? 'none' : '1px solid #E5E7EB' }}>
                  <td style={{ padding: '1.25rem 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ padding: '0.75rem', background: 'rgba(13, 116, 43, 0.1)', borderRadius: '0.5rem', color: '#0D742B' }}>
                        <BookOpen size={20} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: '#111827' }}>{item.course}</div>
                        <div style={{ fontSize: '0.85rem', color: '#6B7280' }}>{item.title}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem 1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#374151', fontSize: '0.9rem' }}>
                        <Clock size={14} style={{ color: '#6B7280' }} /> {item.time}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#374151', fontSize: '0.9rem' }}>
                        <Calendar size={14} style={{ color: '#6B7280' }} /> {item.days}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#374151', fontSize: '0.9rem' }}>
                      <MapPin size={14} style={{ color: '#6B7280' }} /> {item.room}
                    </div>
                  </td>
                </tr>
              ))}
              {schedule.length === 0 && (
                <tr>
                  <td colSpan="3" style={{ padding: '3rem', textAlign: 'center', color: '#6B7280' }}>
                    You are not enrolled in any subjects yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
};

export default StudentSchedule;
