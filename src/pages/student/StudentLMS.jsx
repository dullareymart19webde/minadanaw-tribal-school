import React, { useState, useEffect } from 'react';
import { BookOpen, FileText, Download, Loader2, PlayCircle, Folder } from 'lucide-react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';

const StudentLMS = () => {
  const { currentUser } = useAuth();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMaterials = async () => {
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
          
          let fetchedMaterials = [];
          for (const classId of enrolledClasses) {
            const classSnap = await getDoc(doc(db, "classes", classId));
            if (classSnap.exists()) {
              const className = classSnap.data().name || classId;
              // Mock materials for each class since we don't have a real materials collection yet
              fetchedMaterials.push(
                { id: `${classId}-1`, class: className, title: 'Course Syllabus', type: 'pdf', size: '2.4 MB', date: 'Aug 15' },
                { id: `${classId}-2`, class: className, title: 'Week 1 Lecture Slides', type: 'presentation', size: '5.1 MB', date: 'Aug 20' },
                { id: `${classId}-3`, class: className, title: 'Module 1 Reading Assignment', type: 'doc', size: '1.2 MB', date: 'Aug 22' }
              );
            }
          }
          
          if (fetchedMaterials.length === 0) {
            // Some default mocks if not enrolled in anything
            fetchedMaterials = [
              { id: '1', class: 'CS101', title: 'Introduction to Programming Logic', type: 'pdf', size: '3.2 MB', date: 'Yesterday' },
              { id: '2', class: 'MTH201', title: 'Calculus Chapter 4 Exercises', type: 'doc', size: '1.1 MB', date: 'Monday' },
              { id: '3', class: 'ENG102', title: 'Poetry Analysis Guidelines', type: 'pdf', size: '0.8 MB', date: 'Last Week' },
              { id: '4', class: 'CS101', title: 'Setup Guide for IDE', type: 'video', size: '45 MB', date: 'Last Week' },
            ];
          }

          setMaterials(fetchedMaterials);
        }
      }
    } catch (error) {
      console.error("Error fetching materials:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, [currentUser]);

  const getIcon = (type) => {
    switch (type) {
      case 'pdf': return <FileText size={20} style={{ color: '#EF4444' }} />;
      case 'doc': return <FileText size={20} style={{ color: '#3B82F6' }} />;
      case 'presentation': return <BookOpen size={20} style={{ color: '#F59E0B' }} />;
      case 'video': return <PlayCircle size={20} style={{ color: '#8B5CF6' }} />;
      default: return <Folder size={20} style={{ color: '#6B7280' }} />;
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#111827', margin: '0 0 0.5rem 0' }}>Class Materials</h1>
          <p style={{ color: '#6B7280', margin: 0 }}>Access your learning resources and modules</p>
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: '1rem', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
        
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
            <Loader2 size={32} className="spinner" style={{ color: '#0D742B' }} />
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                <th style={{ padding: '1rem 1.5rem', color: '#6B7280', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase' }}>File Name</th>
                <th style={{ padding: '1rem 1.5rem', color: '#6B7280', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase' }}>Subject</th>
                <th style={{ padding: '1rem 1.5rem', color: '#6B7280', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase' }}>Date Uploaded</th>
                <th style={{ padding: '1rem 1.5rem', color: '#6B7280', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((item, index) => (
                <tr key={item.id} style={{ borderBottom: index === materials.length - 1 ? 'none' : '1px solid #E5E7EB', transition: 'background 0.2s', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.background = '#F9FAFB'} onMouseOut={e => e.currentTarget.style.background = 'white'}>
                  <td style={{ padding: '1.25rem 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ padding: '0.5rem', background: '#F3F4F6', borderRadius: '0.5rem' }}>
                        {getIcon(item.type)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 500, color: '#111827' }}>{item.title}</div>
                        <div style={{ fontSize: '0.85rem', color: '#6B7280' }}>{item.size} • {item.type.toUpperCase()}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem 1.5rem', color: '#4B5563', fontSize: '0.9rem' }}>
                    {item.class}
                  </td>
                  <td style={{ padding: '1.25rem 1.5rem', color: '#4B5563', fontSize: '0.9rem' }}>
                    {item.date}
                  </td>
                  <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                    <button style={{ background: 'transparent', border: '1px solid #E5E7EB', borderRadius: '0.5rem', padding: '0.5rem', cursor: 'pointer', color: '#4B5563', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }} onMouseOver={e => { e.currentTarget.style.background = '#F3F4F6'; e.currentTarget.style.color = '#111827' }} onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#4B5563' }}>
                      <Download size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {materials.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ padding: '3rem', textAlign: 'center', color: '#6B7280' }}>
                    No materials have been uploaded by your instructors yet.
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

export default StudentLMS;
