import React, { useState, useEffect } from 'react';
import { Search, Loader2, BookOpen } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import '../layouts/DashboardPremium.css';

const AdminMasterList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [masterList, setMasterList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMasterList = async () => {
    try {
      const [studentsSnap, facultySnap] = await Promise.all([
        getDocs(collection(db, "students")),
        getDocs(collection(db, "faculty"))
      ]);
      
      const studentsData = studentsSnap.docs.map(doc => ({
        id: doc.id,
        type: 'Student',
        ...doc.data()
      }));

      const facultyData = facultySnap.docs.map(doc => ({
        id: doc.id,
        type: 'Faculty',
        ...doc.data()
      }));

      // Combine and filter out pending
      const combined = [...studentsData, ...facultyData].filter(u => u.status !== 'Pending Activation' && u.status !== 'Pending');
      setMasterList(combined);
    } catch (error) {
      console.error("Error fetching master list:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMasterList();
  }, []);

  const filteredList = masterList.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '1.5rem', backgroundColor: '#F8FAFC', minHeight: '100%' }}>
      <div className="bento-container">
        
        {/* Header Banner */}
        <div className="glass-card premium-banner animate-fade-in delay-1" style={{ padding: '1.5rem 2rem' }}>
          <div className="premium-banner-info" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <BookOpen size={24} /> Master Directory
              </h1>
              <p>Combined view of all active students and faculty</p>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div className="search-wrapper" style={{ background: 'var(--dash-bg-card)', borderRadius: 'var(--radius-full)', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', border: '1px solid var(--dash-border)' }}>
                <Search size={18} style={{ color: 'var(--dash-text-muted)', marginRight: '0.5rem' }} />
                <input 
                  type="text" 
                  placeholder="Search directory..." 
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
                    <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--dash-text-muted)' }}>ID</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--dash-text-muted)' }}>Type</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--dash-text-muted)' }}>Name / Email</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--dash-text-muted)' }}>Department/Course</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.map((user) => (
                    <tr key={user.id} style={{ borderBottom: '1px solid var(--dash-border)' }}>
                      <td style={{ padding: '1rem', color: 'var(--dash-text)' }}>{user.id}</td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ 
                          padding: '0.25rem 0.75rem', 
                          borderRadius: '1rem', 
                          fontSize: '0.85rem', 
                          background: user.type === 'Student' ? 'rgba(13, 116, 43, 0.1)' : 'rgba(38, 35, 227, 0.1)', 
                          color: user.type === 'Student' ? 'var(--dash-primary)' : 'var(--dash-blue)' 
                        }}>
                          {user.type}
                        </span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: 500, color: 'var(--dash-text)' }}>{user.name || 'Unnamed'}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--dash-text-muted)' }}>{user.email || 'No email'}</div>
                      </td>
                      <td style={{ padding: '1rem', color: 'var(--dash-text-muted)' }}>
                        {user.type === 'Student' ? user.courseAndYear || 'N/A' : user.department || 'N/A'}
                      </td>
                    </tr>
                  ))}
                  {filteredList.length === 0 && (
                    <tr>
                      <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: 'var(--dash-text-muted)' }}>No records found.</td>
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

export default AdminMasterList;
