import React, { useState, useEffect } from 'react';
import { Search, Edit, Trash2, Plus, Loader2 } from 'lucide-react';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import '../layouts/DashboardPremium.css';

const PortalFaculty = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFaculty = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "faculty"));
      const facultyData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFaculty(facultyData);
    } catch (error) {
      console.error("Error fetching faculty:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  const filteredFaculty = faculty.filter(f => 
    f.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (docId) => {
    if(window.confirm("Are you sure you want to delete this faculty member?")) {
      try {
        await deleteDoc(doc(db, "faculty", docId));
        fetchFaculty();
      } catch (err) {
        console.error("Error deleting", err);
      }
    }
  };

  return (
    <div style={{ padding: '1.5rem', backgroundColor: '#F8FAFC', minHeight: '100%' }}>
      <div className="bento-container">
        
        {/* Header Banner */}
        <div className="glass-card premium-banner animate-fade-in delay-1" style={{ padding: '1.5rem 2rem' }}>
          <div className="premium-banner-info" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '1.5rem' }}>Faculty Directory</h1>
              <p>Manage faculty members and teaching assignments</p>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div className="search-wrapper" style={{ background: 'var(--dash-bg-card)', borderRadius: 'var(--radius-full)', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', border: '1px solid var(--dash-border)' }}>
                <Search size={18} style={{ color: 'var(--dash-text-muted)', marginRight: '0.5rem' }} />
                <input 
                  type="text" 
                  placeholder="Search faculty..." 
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
                    <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--dash-text-muted)' }}>Faculty ID</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--dash-text-muted)' }}>Name</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--dash-text-muted)' }}>Department / Subject</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--dash-text-muted)' }}>Status</th>
                    <th style={{ padding: '1rem', textAlign: 'right', color: 'var(--dash-text-muted)' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFaculty.map((fac) => (
                    <tr key={fac.id} style={{ borderBottom: '1px solid var(--dash-border)' }}>
                      <td style={{ padding: '1rem', color: 'var(--dash-text)' }}>{fac.id}</td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: 500, color: 'var(--dash-text)' }}>{fac.name || 'Unnamed'}</div>
                      </td>
                      <td style={{ padding: '1rem', color: 'var(--dash-text)' }}>{fac.department || 'N/A'}</td>
                      <td style={{ padding: '1rem' }}>
                        {fac.status === 'Active' ? (
                          <span style={{ padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.85rem', background: 'rgba(13, 116, 43, 0.1)', color: 'var(--dash-primary)' }}>
                            Active
                          </span>
                        ) : (
                          <span style={{ padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.85rem', background: 'rgba(255, 255, 255, 0.1)', color: 'var(--dash-text-muted)' }}>
                            {fac.status || 'Inactive'}
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                          <button 
                            onClick={() => handleDelete(fac.id)}
                            style={{ background: 'transparent', border: 'none', color: 'var(--dash-red)', cursor: 'pointer' }} 
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredFaculty.length === 0 && (
                    <tr>
                      <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: 'var(--dash-text-muted)' }}>No faculty found in the database.</td>
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

export default PortalFaculty;
