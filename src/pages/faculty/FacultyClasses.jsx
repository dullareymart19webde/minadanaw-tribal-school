import React, { useState, useEffect } from 'react';
import { CheckSquare, Search, BookOpen, Loader2 } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import '../layouts/DashboardPremium.css';

const FacultyClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classSnap = await getDocs(collection(db, "classes"));
        setClasses(classSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        const studentSnap = await getDocs(collection(db, "students"));
        setStudents(studentSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: '1.5rem', backgroundColor: '#F8FAFC', minHeight: '100%' }}>
      <div className="bento-container">
        
        {/* Header Banner */}
        <div className="glass-card premium-banner animate-fade-in delay-1" style={{ padding: '1.5rem 2rem' }}>
          <div className="premium-banner-info" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '1.5rem' }}>My Classes</h1>
              <p>Manage grades and attendance for your assigned classes</p>
            </div>
          </div>
        </div>

        {/* Classes List or Class Detail */}
        {!selectedClass ? (
          <div className="glass-card animate-fade-in delay-2" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--dash-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BookOpen size={20} /> Select a Class to Manage
            </h3>
            
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
                <Loader2 size={32} className="spinner" style={{ color: 'var(--dash-primary)' }} />
              </div>
            ) : classes.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
                {classes.map(c => (
                  <div 
                    key={c.id} 
                    className="glass-card" 
                    style={{ cursor: 'pointer', border: '1px solid var(--dash-border)', transition: 'all 0.3s ease' }}
                    onClick={() => setSelectedClass(c)}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--dash-primary)'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--dash-border)'}
                  >
                    <h4 style={{ color: 'var(--dash-text)', marginBottom: '0.5rem' }}>{c.subjectName || 'Unknown Class'}</h4>
                    <p style={{ color: 'var(--dash-text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>{c.subjectCode || 'No Code'}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--dash-text-muted)' }}>
                      <span>{c.room || 'TBA'}</span>
                      <span>{c.time || 'TBA'}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-glow">You have no assigned classes.</div>
            )}
          </div>
        ) : (
          <div className="glass-card animate-fade-in delay-2" style={{ padding: '0' }}>
            <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--dash-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ color: 'var(--dash-text)', margin: 0 }}>{selectedClass.subjectName}</h3>
                <p style={{ color: 'var(--dash-text-muted)', fontSize: '0.85rem', margin: 0 }}>{selectedClass.subjectCode} • {selectedClass.room} • {selectedClass.time}</p>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button 
                  onClick={() => setSelectedClass(null)}
                  style={{ background: 'transparent', border: '1px solid var(--dash-border)', color: 'var(--dash-text)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}
                >
                  Back to Classes
                </button>
                <button 
                  style={{ background: 'var(--dash-primary)', border: 'none', color: 'white', padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
                >
                  <CheckSquare size={16} /> Submit Records
                </button>
              </div>
            </div>

            <div className="table-container" style={{ overflowX: 'auto', border: 'none' }}>
              <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--dash-border)', background: 'rgba(255,255,255,0.02)' }}>
                    <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--dash-text-muted)' }}>Student Name</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--dash-text-muted)' }}>Current Grade</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--dash-text-muted)' }}>Update Grade</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--dash-text-muted)' }}>Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} style={{ borderBottom: '1px solid var(--dash-border)' }}>
                      <td style={{ padding: '1rem', color: 'var(--dash-text)', fontWeight: 500 }}>{student.name}</td>
                      <td style={{ padding: '1rem', color: 'var(--dash-text-muted)' }}>{student.grade}</td>
                      <td style={{ padding: '1rem' }}>
                        <input 
                          type="text" 
                          defaultValue={student.grade} 
                          style={{ width: '80px', padding: '0.5rem', background: 'var(--dash-bg-card)', border: '1px solid var(--dash-border)', color: 'var(--dash-text)', borderRadius: 'var(--radius-sm)', outline: 'none' }}
                        />
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <select 
                          defaultValue="Present" 
                          style={{ padding: '0.5rem', background: 'var(--dash-bg-card)', border: '1px solid var(--dash-border)', color: 'var(--dash-text)', borderRadius: 'var(--radius-sm)', outline: 'none' }}
                        >
                          <option value="Present">Present</option>
                          <option value="Absent">Absent</option>
                          <option value="Late">Late</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                  {students.length === 0 && (
                    <tr>
                      <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: 'var(--dash-text-muted)' }}>No students enrolled.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default FacultyClasses;
