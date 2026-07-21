import React, { useState, useEffect } from 'react';
import { Award, Loader2, Download } from 'lucide-react';
import { collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';

const StudentGrades = () => {
  const { currentUser } = useAuth();
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gpa, setGpa] = useState(0);

  const fetchGrades = async () => {
    try {
      if (!currentUser?.email) return;

      const userSnap = await getDocs(collection(db, "users"));
      const userDoc = userSnap.docs.find(d => d.data().email === currentUser.email);
      
      if (userDoc) {
        const studentId = userDoc.data().username;
        const studentRef = doc(db, "students", studentId);
        const studentSnap = await getDoc(studentRef);

        if (studentSnap.exists()) {
          const enrolledClasses = studentSnap.data().enrolledClasses || [];
          
          let fetchedGrades = [];
          for (const classId of enrolledClasses) {
            // Find grade for this student in this class
            const gradesRef = collection(db, "grades");
            const q = query(gradesRef, where("classId", "==", classId), where("studentId", "==", studentId));
            const gradesSnap = await getDocs(q);
            
            // Also need class name
            const classSnap = await getDoc(doc(db, "classes", classId));
            const className = classSnap.exists() ? classSnap.data().name : classId;
            
            if (!gradesSnap.empty) {
              const gradeData = gradesSnap.docs[0].data();
              fetchedGrades.push({
                id: classId,
                subject: className,
                prelim: gradeData.prelim || '-',
                midterm: gradeData.midterm || '-',
                final: gradeData.final || '-',
                average: gradeData.average || '-'
              });
            } else {
              // Enrolled but no grades yet
              fetchedGrades.push({
                id: classId,
                subject: className,
                prelim: '-',
                midterm: '-',
                final: '-',
                average: '-'
              });
            }
          }
          
          if (fetchedGrades.length === 0) {
            // No grades yet. Keep it empty.
          }

          setGrades(fetchedGrades);

          // Calculate simple GPA for display
          let total = 0;
          let count = 0;
          fetchedGrades.forEach(g => {
            if (g.average && g.average !== '-') {
              total += parseFloat(g.average);
              count++;
            }
          });
          if (count > 0) {
            setGpa((total / count).toFixed(2));
          } else {
            setGpa('N/A'); // No real data
          }
        }
      }
    } catch (error) {
      console.error("Error fetching grades:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrades();
  }, [currentUser]);

  return (
    <div style={{ padding: '2rem' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#111827', margin: '0 0 0.5rem 0' }}>My Grades</h1>
          <p style={{ color: '#6B7280', margin: 0 }}>View your academic performance and grades</p>
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', background: '#0D742B', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer' }}>
          <Download size={18} /> Download Copy
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '2rem' }}>
        
        {/* GPA Summary Card */}
        <div>
          <div style={{ background: '#0D742B', borderRadius: '1rem', padding: '2rem', color: 'white', textAlign: 'center' }}>
            <Award size={48} style={{ opacity: 0.8, marginBottom: '1rem' }} />
            <div style={{ fontSize: '1rem', opacity: 0.9, marginBottom: '0.5rem' }}>Current GWA</div>
            <div style={{ fontSize: '3.5rem', fontWeight: 700, lineHeight: 1 }}>{gpa}</div>
            <div style={{ marginTop: '1.5rem', fontSize: '0.85rem', background: 'rgba(255,255,255,0.2)', padding: '0.5rem', borderRadius: '2rem' }}>
              First Semester, AY 2026-2027
            </div>
          </div>
        </div>

        {/* Grades Table */}
        <div style={{ background: 'white', borderRadius: '1rem', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
              <Loader2 size={32} className="spinner" style={{ color: '#0D742B' }} />
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                  <th style={{ padding: '1rem 1.5rem', color: '#6B7280', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase' }}>Subject</th>
                  <th style={{ padding: '1rem 1.5rem', color: '#6B7280', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', textAlign: 'center' }}>Prelim</th>
                  <th style={{ padding: '1rem 1.5rem', color: '#6B7280', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', textAlign: 'center' }}>Midterm</th>
                  <th style={{ padding: '1rem 1.5rem', color: '#6B7280', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', textAlign: 'center' }}>Final</th>
                  <th style={{ padding: '1rem 1.5rem', color: '#6B7280', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', textAlign: 'center' }}>Average</th>
                </tr>
              </thead>
              <tbody>
                {grades.map((item, index) => (
                  <tr key={item.id} style={{ borderBottom: index === grades.length - 1 ? 'none' : '1px solid #E5E7EB' }}>
                    <td style={{ padding: '1.25rem 1.5rem', fontWeight: 500, color: '#111827' }}>
                      {item.subject}
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem', textAlign: 'center', color: '#374151' }}>{item.prelim}</td>
                    <td style={{ padding: '1.25rem 1.5rem', textAlign: 'center', color: '#374151' }}>{item.midterm}</td>
                    <td style={{ padding: '1.25rem 1.5rem', textAlign: 'center', color: '#374151' }}>{item.final}</td>
                    <td style={{ padding: '1.25rem 1.5rem', textAlign: 'center', fontWeight: 600, color: '#0D742B' }}>{item.average}</td>
                  </tr>
                ))}
                {grades.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ padding: '3rem', textAlign: 'center', color: '#6B7280' }}>
                      No grades posted yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
};

export default StudentGrades;
