import React, { useState } from 'react';
import { Calendar as CalendarIcon, Plus, Trash2, Loader2, Search, Clock, MapPin, AlertTriangle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import '../layouts/DashboardPremium.css';

const AdminSchedule = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newClass, setNewClass] = useState({
    subjectName: '',
    teacherName: '',
    room: '',
    time: '8:00 AM',
    day: 'Monday',
    grade: 'Grade 1',
    section: 'Section A'
  });
  const [conflictError, setConflictError] = useState('');

  const fetchClasses = async () => {
    const querySnapshot = await getDocs(collection(db, "classes"));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  };

  const { data: classes = [], isLoading: loading, refetch } = useQuery({
    queryKey: ['adminClasses'],
    queryFn: fetchClasses
  });

  const filteredClasses = classes.filter(c => 
    c.subjectName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.teacherName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.room?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClass = async (e) => {
    e.preventDefault();
    setConflictError('');

    if (!newClass.subjectName || !newClass.teacherName || !newClass.room || !newClass.time) {
      setConflictError('Please fill in all required fields.');
      return;
    }

    // Basic Conflict Checking
    const isConflict = classes.some(c => 
      c.day === newClass.day && 
      c.time === newClass.time && 
      (c.teacherName === newClass.teacherName || c.room === newClass.room)
    );

    if (isConflict) {
      setConflictError('Conflict detected! The teacher or room is already booked for this day and time.');
      return;
    }

    setIsAdding(true);
    try {
      await addDoc(collection(db, "classes"), {
        ...newClass,
        createdAt: serverTimestamp()
      });
      setNewClass({
        subjectName: '',
        teacherName: '',
        room: '',
        time: '8:00 AM',
        day: 'Monday',
        grade: 'Grade 1',
        section: 'Section A'
      });
      refetch();
    } catch (err) {
      console.error("Error adding class:", err);
      setConflictError('Failed to add class.');
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm("Are you sure you want to delete this scheduled class?")) {
      await deleteDoc(doc(db, "classes", id));
      refetch();
    }
  };

  return (
    <div style={{ padding: '1.5rem', backgroundColor: '#F8FAFC', minHeight: '100%' }}>
      <div className="bento-container">
        
        {/* Header Banner */}
        <div className="glass-card premium-banner animate-fade-in delay-1" style={{ padding: '1.5rem 2rem' }}>
          <div className="premium-banner-info" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CalendarIcon size={24} /> Schedule Manager
              </h1>
              <p>Manage curriculum loads and class schedules</p>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div className="search-wrapper" style={{ background: 'var(--dash-bg-card)', borderRadius: 'var(--radius-full)', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', border: '1px solid var(--dash-border)' }}>
                <Search size={18} style={{ color: 'var(--dash-text-muted)', marginRight: '0.5rem' }} />
                <input 
                  type="text" 
                  placeholder="Search classes..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--dash-text)', outline: 'none' }}
                />
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem' }}>
          
          {/* Add Class Form */}
          <div className="glass-card animate-fade-in delay-2">
            <h3 style={{ marginBottom: '1rem', color: 'var(--dash-text)', fontSize: '1.1rem' }}>Create Schedule</h3>
            
            {conflictError && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#FEE2E2', color: '#DC2626', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', fontSize: '0.85rem' }}>
                <AlertTriangle size={16} />
                <span>{conflictError}</span>
              </div>
            )}

            <form onSubmit={handleAddClass} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <select 
                  value={newClass.grade} 
                  onChange={(e) => setNewClass({...newClass, grade: e.target.value})}
                  style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--dash-border)', background: 'var(--dash-bg-card)', color: 'var(--dash-text)' }}
                >
                  <option value="Grade 1">Grade 1</option>
                  <option value="Grade 2">Grade 2</option>
                  <option value="Grade 3">Grade 3</option>
                  <option value="Grade 4">Grade 4</option>
                  <option value="Grade 5">Grade 5</option>
                  <option value="Grade 6">Grade 6</option>
                </select>
                <select 
                  value={newClass.section} 
                  onChange={(e) => setNewClass({...newClass, section: e.target.value})}
                  style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--dash-border)', background: 'var(--dash-bg-card)', color: 'var(--dash-text)' }}
                >
                  <option value="Section A">Section A</option>
                  <option value="Section B">Section B</option>
                  <option value="Section C">Section C</option>
                </select>
              </div>

              <input 
                type="text" 
                placeholder="Subject Name (e.g. Mathematics)" 
                value={newClass.subjectName}
                onChange={e => setNewClass({...newClass, subjectName: e.target.value})}
                style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--dash-border)', background: 'var(--dash-bg-card)', color: 'var(--dash-text)' }}
              />

              <input 
                type="text" 
                placeholder="Teacher Name" 
                value={newClass.teacherName}
                onChange={e => setNewClass({...newClass, teacherName: e.target.value})}
                style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--dash-border)', background: 'var(--dash-bg-card)', color: 'var(--dash-text)' }}
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <select 
                  value={newClass.day} 
                  onChange={(e) => setNewClass({...newClass, day: e.target.value})}
                  style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--dash-border)', background: 'var(--dash-bg-card)', color: 'var(--dash-text)' }}
                >
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                </select>
                <input 
                  type="text" 
                  placeholder="Time (e.g. 8:00 AM)" 
                  value={newClass.time}
                  onChange={e => setNewClass({...newClass, time: e.target.value})}
                  style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--dash-border)', background: 'var(--dash-bg-card)', color: 'var(--dash-text)' }}
                />
              </div>

              <input 
                type="text" 
                placeholder="Room (e.g. Room 101)" 
                value={newClass.room}
                onChange={e => setNewClass({...newClass, room: e.target.value})}
                style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--dash-border)', background: 'var(--dash-bg-card)', color: 'var(--dash-text)' }}
              />

              <button type="submit" disabled={isAdding} style={{ padding: '0.75rem', borderRadius: '0.5rem', background: 'var(--dash-primary)', color: 'white', border: 'none', fontWeight: 600, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                {isAdding ? <Loader2 size={18} className="spinner" /> : <><Plus size={18} /> Add to Schedule</>}
              </button>
            </form>
          </div>

          {/* Classes List */}
          <div className="glass-card animate-fade-in delay-3">
            <h3 style={{ marginBottom: '1rem', color: 'var(--dash-text)', fontSize: '1.1rem' }}>Scheduled Classes</h3>
            
            <div className="table-container" style={{ overflowX: 'auto', border: 'none', maxHeight: '500px' }}>
              {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
                  <Loader2 size={32} className="spinner" style={{ color: 'var(--dash-primary)' }} />
                </div>
              ) : (
                <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--dash-border)', background: 'rgba(255,255,255,0.02)' }}>
                      <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--dash-text-muted)' }}>Class info</th>
                      <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--dash-text-muted)' }}>Schedule</th>
                      <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--dash-text-muted)' }}>Instructor</th>
                      <th style={{ padding: '1rem', textAlign: 'right', color: 'var(--dash-text-muted)' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClasses.map((cls) => (
                      <tr key={cls.id} style={{ borderBottom: '1px solid var(--dash-border)' }}>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ fontWeight: 600, color: 'var(--dash-text)' }}>{cls.subjectName}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--dash-text-muted)' }}>{cls.grade} - {cls.section}</div>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--dash-text)', fontSize: '0.9rem' }}>
                            <Clock size={14} color="var(--dash-accent)" /> {cls.day}, {cls.time}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--dash-text-muted)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                            <MapPin size={12} /> {cls.room}
                          </div>
                        </td>
                        <td style={{ padding: '1rem', color: 'var(--dash-text)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--dash-primary)', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.7rem' }}>
                              {cls.teacherName?.charAt(0)}
                            </div>
                            <span style={{ fontSize: '0.9rem' }}>{cls.teacherName}</span>
                          </div>
                        </td>
                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                          <button 
                            onClick={() => handleDelete(cls.id)}
                            style={{ background: 'transparent', border: 'none', color: 'var(--dash-red)', cursor: 'pointer' }} 
                            title="Remove"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredClasses.length === 0 && (
                      <tr>
                        <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: 'var(--dash-text-muted)' }}>No classes scheduled.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminSchedule;
