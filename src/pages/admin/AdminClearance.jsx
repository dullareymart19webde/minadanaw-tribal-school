import React, { useState } from 'react';
import { Search, Loader2, CheckSquare, ShieldCheck, Check } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import '../layouts/DashboardPremium.css';

const AdminClearance = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const fetchStudents = async () => {
    const querySnapshot = await getDocs(collection(db, "students"));
    const allStudents = querySnapshot.docs.map(doc => ({
      docId: doc.id,
      ...doc.data(),
      clearance: doc.data().clearance || {
        library: false,
        finance: false,
        academic: false,
        guidance: false
      }
    }));
    return allStudents.filter(s => s.status === 'Active');
  };

  const { data: students = [], isLoading: loading, refetch } = useQuery({
    queryKey: ['adminClearance'],
    queryFn: fetchStudents
  });

  const filteredStudents = students.filter(s => 
    s.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.grade?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleClearance = async (studentId, field, currentValue) => {
    try {
      const studentToUpdate = students.find(s => s.docId === studentId);
      const updatedClearance = {
        ...studentToUpdate.clearance,
        [field]: !currentValue
      };

      await updateDoc(doc(db, "students", studentId), {
        clearance: updatedClearance
      });
      refetch();
    } catch (err) {
      console.error("Error updating clearance:", err);
    }
  };

  const getClearanceStatus = (clearance) => {
    const isCleared = Object.values(clearance).every(v => v === true);
    return isCleared;
  };

  return (
    <div style={{ padding: '1.5rem', backgroundColor: '#F8FAFC', minHeight: '100%' }}>
      <div className="bento-container">
        
        {/* Header Banner */}
        <div className="glass-card premium-banner animate-fade-in delay-1" style={{ padding: '1.5rem 2rem' }}>
          <div className="premium-banner-info" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckSquare size={24} /> Clearance Processing
              </h1>
              <p>Manage end-of-semester student clearance requirements</p>
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
                    <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--dash-text-muted)' }}>Student</th>
                    <th style={{ padding: '1rem', textAlign: 'center', color: 'var(--dash-text-muted)' }}>Library</th>
                    <th style={{ padding: '1rem', textAlign: 'center', color: 'var(--dash-text-muted)' }}>Finance</th>
                    <th style={{ padding: '1rem', textAlign: 'center', color: 'var(--dash-text-muted)' }}>Academic</th>
                    <th style={{ padding: '1rem', textAlign: 'center', color: 'var(--dash-text-muted)' }}>Guidance</th>
                    <th style={{ padding: '1rem', textAlign: 'center', color: 'var(--dash-text-muted)' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => {
                    const isCleared = getClearanceStatus(student.clearance);
                    return (
                      <tr key={student.docId} style={{ borderBottom: '1px solid var(--dash-border)' }}>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ fontWeight: 600, color: 'var(--dash-text)' }}>{student.name || 'Unnamed'}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--dash-text-muted)' }}>{student.courseAndYear || student.grade}</div>
                        </td>
                        
                        <td style={{ padding: '1rem', textAlign: 'center' }}>
                          <button 
                            onClick={() => toggleClearance(student.docId, 'library', student.clearance.library)}
                            style={{ 
                              background: student.clearance.library ? '#10B981' : 'transparent', 
                              border: student.clearance.library ? 'none' : '1px solid var(--dash-border)', 
                              color: student.clearance.library ? 'white' : 'var(--dash-text-muted)', 
                              cursor: 'pointer',
                              width: '32px', height: '32px', borderRadius: '0.5rem',
                              display: 'inline-flex', justifyContent: 'center', alignItems: 'center'
                            }} 
                          >
                            <Check size={18} />
                          </button>
                        </td>

                        <td style={{ padding: '1rem', textAlign: 'center' }}>
                          <button 
                            onClick={() => toggleClearance(student.docId, 'finance', student.clearance.finance)}
                            style={{ 
                              background: student.clearance.finance ? '#10B981' : 'transparent', 
                              border: student.clearance.finance ? 'none' : '1px solid var(--dash-border)', 
                              color: student.clearance.finance ? 'white' : 'var(--dash-text-muted)', 
                              cursor: 'pointer',
                              width: '32px', height: '32px', borderRadius: '0.5rem',
                              display: 'inline-flex', justifyContent: 'center', alignItems: 'center'
                            }} 
                          >
                            <Check size={18} />
                          </button>
                        </td>

                        <td style={{ padding: '1rem', textAlign: 'center' }}>
                          <button 
                            onClick={() => toggleClearance(student.docId, 'academic', student.clearance.academic)}
                            style={{ 
                              background: student.clearance.academic ? '#10B981' : 'transparent', 
                              border: student.clearance.academic ? 'none' : '1px solid var(--dash-border)', 
                              color: student.clearance.academic ? 'white' : 'var(--dash-text-muted)', 
                              cursor: 'pointer',
                              width: '32px', height: '32px', borderRadius: '0.5rem',
                              display: 'inline-flex', justifyContent: 'center', alignItems: 'center'
                            }} 
                          >
                            <Check size={18} />
                          </button>
                        </td>

                        <td style={{ padding: '1rem', textAlign: 'center' }}>
                          <button 
                            onClick={() => toggleClearance(student.docId, 'guidance', student.clearance.guidance)}
                            style={{ 
                              background: student.clearance.guidance ? '#10B981' : 'transparent', 
                              border: student.clearance.guidance ? 'none' : '1px solid var(--dash-border)', 
                              color: student.clearance.guidance ? 'white' : 'var(--dash-text-muted)', 
                              cursor: 'pointer',
                              width: '32px', height: '32px', borderRadius: '0.5rem',
                              display: 'inline-flex', justifyContent: 'center', alignItems: 'center'
                            }} 
                          >
                            <Check size={18} />
                          </button>
                        </td>

                        <td style={{ padding: '1rem', textAlign: 'center' }}>
                          {isCleared ? (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.85rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', fontWeight: 600 }}>
                              <ShieldCheck size={16} /> Cleared
                            </span>
                          ) : (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.85rem', background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444' }}>
                              Pending
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {filteredStudents.length === 0 && (
                    <tr>
                      <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: 'var(--dash-text-muted)' }}>No active students found.</td>
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

export default AdminClearance;
