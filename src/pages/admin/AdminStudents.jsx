import React, { useState, useEffect } from 'react';
import { Search, Edit, Trash2, Plus, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { collection, getDocs, doc, deleteDoc, updateDoc, setDoc, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import '../layouts/DashboardPremium.css';

const PortalStudents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "students"));
      const studentsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Only keep non-pending students
      const activeStudents = studentsData.filter(s => s.status !== 'Pending Activation' && s.status !== 'Pending');
      setStudents(activeStudents);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(s => 
    s.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (docId) => {
    if(window.confirm("Are you sure you want to delete this student?")) {
      try {
        await deleteDoc(doc(db, "students", docId));
        fetchStudents();
      } catch (err) {
        console.error("Error deleting", err);
      }
    }
  };

  const handleActivate = async (docId, studentId) => {
    try {
      // Update the student status
      await updateDoc(doc(db, "students", docId), {
        status: "Active"
      });

      // Also find the associated user account and activate it
      const usersSnap = await getDocs(collection(db, "users"));
      const userDoc = usersSnap.docs.find(d => d.data().username === studentId);
      if (userDoc) {
        await updateDoc(doc(db, "users", userDoc.id), {
          status: "active"
        });
      }

      fetchStudents();
    } catch (err) {
      console.error("Error activating account", err);
    }
  };

  return (
    <div style={{ padding: '1.5rem', backgroundColor: '#F8FAFC', minHeight: '100%' }}>
      <div className="bento-container">
        
        {/* Header Banner */}
        <div className="glass-card premium-banner animate-fade-in delay-1" style={{ padding: '1.5rem 2rem' }}>
          <div className="premium-banner-info" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '1.5rem' }}>Student Master List</h1>
              <p>Manage all student accounts and records</p>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div className="search-wrapper" style={{ background: 'var(--dash-bg-card)', borderRadius: 'var(--radius-full)', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', border: '1px solid var(--dash-border)' }}>
                <Search size={18} style={{ color: 'var(--dash-text-muted)', marginRight: '0.5rem' }} />
                <input 
                  type="text" 
                  placeholder="Search students..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--dash-text)', outline: 'none' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="glass-card animate-fade-in delay-2" style={{ padding: '0' }}>
          <div className="table-container" style={{ overflowX: 'auto', border: 'none' }}>
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
                <Loader2 size={32} className="spinner" style={{ color: 'var(--dash-primary)' }} />
              </div>
            ) : (
              <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--dash-border)', background: 'rgba(255,255,255,0.02)' }}>
                    <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--dash-text-muted)' }}>Student ID</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--dash-text-muted)' }}>Name / Email</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--dash-text-muted)' }}>Grade</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--dash-text-muted)' }}>Status</th>
                    <th style={{ padding: '1rem', textAlign: 'right', color: 'var(--dash-text-muted)' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id} style={{ borderBottom: '1px solid var(--dash-border)' }}>
                      <td style={{ padding: '1rem', color: 'var(--dash-text)' }}>{student.id}</td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: 500, color: 'var(--dash-text)' }}>{student.name || 'Unnamed'}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--dash-text-muted)' }}>{student.email || 'No email provided'}</div>
                      </td>
                      <td style={{ padding: '1rem', color: 'var(--dash-text)' }}>{student.grade || 'N/A'}</td>
                      <td style={{ padding: '1rem' }}>
                        {student.status === 'Pending Activation' ? (
                          <span style={{ padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.85rem', background: 'rgba(245, 190, 34, 0.1)', color: 'var(--dash-accent)' }}>
                            Pending
                          </span>
                        ) : student.status === 'Active' ? (
                          <span style={{ padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.85rem', background: 'rgba(13, 116, 43, 0.1)', color: 'var(--dash-primary)' }}>
                            Active
                          </span>
                        ) : (
                          <span style={{ padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.85rem', background: 'rgba(219, 26, 33, 0.1)', color: 'var(--dash-red)' }}>
                            {student.status || 'Unknown'}
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                          {student.status === 'Pending Activation' && (
                            <button 
                              onClick={() => handleActivate(student.id, student.id)}
                              style={{ background: 'transparent', border: 'none', color: 'var(--dash-primary)', cursor: 'pointer' }} 
                              title="Approve Account"
                            >
                              <CheckCircle size={18} />
                            </button>
                          )}
                          <button 
                            onClick={() => handleDelete(student.id)}
                            style={{ background: 'transparent', border: 'none', color: 'var(--dash-red)', cursor: 'pointer' }} 
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredStudents.length === 0 && (
                    <tr>
                      <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: 'var(--dash-text-muted)' }}>No students found in the database.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PortalStudents;
