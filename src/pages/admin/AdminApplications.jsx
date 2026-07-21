import React, { useState } from 'react';
import { Search, CheckCircle, Trash2, Loader2, ClipboardCheck, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import '../layouts/DashboardPremium.css';

const AdminApplications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState('Grade 1');
  const [selectedSection, setSelectedSection] = useState('Section A');
  const [processing, setProcessing] = useState(false);

  const fetchApplications = async () => {
    const querySnapshot = await getDocs(collection(db, "students"));
    const allStudents = querySnapshot.docs.map(doc => ({
      docId: doc.id,
      ...doc.data()
    }));
    return allStudents.filter(s => s.status === 'Pending Activation' || s.status === 'Pending');
  };

  const { data: applications = [], isLoading: loading, refetch } = useQuery({
    queryKey: ['applications'],
    queryFn: fetchApplications
  });

  const filteredApps = applications.filter(s => 
    s.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openApproveModal = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const closeApproveModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  const handleAssignAndApprove = async (e) => {
    e.preventDefault();
    if (!selectedStudent) return;
    
    setProcessing(true);
    try {
      // Define a standard subject load based on grade
      const subjectLoad = [
        { subjectName: 'Filipino', time: '8:00 - 9:00', code: 'FIL1' },
        { subjectName: 'English', time: '9:00 - 10:00', code: 'ENG1' },
        { subjectName: 'Mathematics', time: '10:00 - 11:00', code: 'MATH1' },
        { subjectName: 'Araling Panlipunan', time: '11:00 - 12:00', code: 'AP1' },
        { subjectName: 'MAPEH', time: '1:00 - 2:00', code: 'MAPEH1' },
      ];

      const courseAndYear = `${selectedGrade} - ${selectedSection}`;

      // Update the student status
      await updateDoc(doc(db, "students", selectedStudent.docId), {
        status: "Active",
        grade: selectedGrade,
        section: selectedSection,
        courseAndYear: courseAndYear,
        subjects: subjectLoad, // Enroll in predefined subjects
        subjectsCount: subjectLoad.length
      });

      // Also find the associated user account and activate it
      const usersSnap = await getDocs(collection(db, "users"));
      const userDoc = usersSnap.docs.find(d => d.data().username === selectedStudent.id);
      if (userDoc) {
        await updateDoc(doc(db, "users", userDoc.id), {
          status: "active"
        });
      }

      closeApproveModal();
      refetch();
    } catch (err) {
      console.error("Error activating account", err);
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async (docId, studentId) => {
    if(window.confirm("Are you sure you want to reject and delete this application?")) {
      try {
        await deleteDoc(doc(db, "students", docId));
        
        // Also delete from users collection if exists
        const usersSnap = await getDocs(collection(db, "users"));
        const userDoc = usersSnap.docs.find(d => d.data().username === studentId);
        if (userDoc) {
          await deleteDoc(doc(db, "users", userDoc.id));
        }

        refetch();
      } catch (err) {
        console.error("Error rejecting application", err);
      }
    }
  };

  return (
    <div style={{ padding: '1.5rem', backgroundColor: '#F8FAFC', minHeight: '100%', position: 'relative' }}>
      <div className="bento-container">
        
        {/* Header Banner */}
        <div className="glass-card premium-banner animate-fade-in delay-1" style={{ padding: '1.5rem 2rem' }}>
          <div className="premium-banner-info" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ClipboardCheck size={24} /> Application Review
              </h1>
              <p>Review and approve new student registrations</p>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div className="search-wrapper" style={{ background: 'var(--dash-bg-card)', borderRadius: 'var(--radius-full)', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', border: '1px solid var(--dash-border)' }}>
                <Search size={18} style={{ color: 'var(--dash-text-muted)', marginRight: '0.5rem' }} />
                <input 
                  type="text" 
                  placeholder="Search applicants..." 
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
                    <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--dash-text-muted)' }}>Course & Year</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--dash-text-muted)' }}>Status</th>
                    <th style={{ padding: '1rem', textAlign: 'right', color: 'var(--dash-text-muted)' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApps.map((student) => (
                    <tr key={student.docId} style={{ borderBottom: '1px solid var(--dash-border)' }}>
                      <td style={{ padding: '1rem', color: 'var(--dash-text)' }}>{student.id}</td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: 500, color: 'var(--dash-text)' }}>{student.name || 'Unnamed'}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--dash-text-muted)' }}>{student.email || 'No email provided'}</div>
                      </td>
                      <td style={{ padding: '1rem', color: 'var(--dash-text)' }}>{student.courseAndYear || 'N/A'}</td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.85rem', background: 'rgba(245, 190, 34, 0.1)', color: 'var(--dash-accent)' }}>
                          Pending
                        </span>
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                          <button 
                            onClick={() => openApproveModal(student)}
                            style={{ background: 'transparent', border: 'none', color: 'var(--dash-primary)', cursor: 'pointer' }} 
                            title="Assign & Approve"
                          >
                            <CheckCircle size={18} />
                          </button>
                          <button 
                            onClick={() => handleReject(student.docId, student.id)}
                            style={{ background: 'transparent', border: 'none', color: 'var(--dash-red)', cursor: 'pointer' }} 
                            title="Reject"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredApps.length === 0 && (
                    <tr>
                      <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: 'var(--dash-text-muted)' }}>No pending applications found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>

      {/* Modal overlay */}
      {isModalOpen && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 999, 
          display: 'flex', justifyContent: 'center', alignItems: 'center' 
        }}>
          <div style={{ 
            background: 'var(--dash-bg)', padding: '2rem', borderRadius: '1rem', 
            width: '400px', maxWidth: '90%', border: '1px solid var(--dash-border)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', margin: 0, color: 'var(--dash-text)' }}>Assign & Approve</h2>
              <button onClick={closeApproveModal} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--dash-text-muted)' }}>
                <X size={20} />
              </button>
            </div>
            
            <p style={{ fontSize: '0.9rem', color: 'var(--dash-text-muted)', marginBottom: '1.5rem' }}>
              Assign <strong>{selectedStudent?.name}</strong> to a Grade and Section. This will automatically enroll them in the dedicated subject load.
            </p>

            <form onSubmit={handleAssignAndApprove}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--dash-text)', marginBottom: '0.5rem' }}>Grade Level</label>
                <select 
                  value={selectedGrade} 
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--dash-border)', background: 'var(--dash-bg-card)', color: 'var(--dash-text)' }}
                >
                  <option value="Grade 1">Grade 1</option>
                  <option value="Grade 2">Grade 2</option>
                  <option value="Grade 3">Grade 3</option>
                  <option value="Grade 4">Grade 4</option>
                  <option value="Grade 5">Grade 5</option>
                  <option value="Grade 6">Grade 6</option>
                </select>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--dash-text)', marginBottom: '0.5rem' }}>Section</label>
                <select 
                  value={selectedSection} 
                  onChange={(e) => setSelectedSection(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--dash-border)', background: 'var(--dash-bg-card)', color: 'var(--dash-text)' }}
                >
                  <option value="Section A">Section A</option>
                  <option value="Section B">Section B</option>
                  <option value="Section C">Section C</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button type="button" onClick={closeApproveModal} style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', background: 'transparent', border: '1px solid var(--dash-border)', color: 'var(--dash-text)', cursor: 'pointer', fontWeight: 500 }}>
                  Cancel
                </button>
                <button type="submit" disabled={processing} style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', background: 'var(--dash-primary)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {processing ? <Loader2 size={16} className="spinner" /> : <CheckCircle size={16} />}
                  Approve Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminApplications;
