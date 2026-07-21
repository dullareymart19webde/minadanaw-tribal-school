import React, { useState, useEffect } from 'react';
import { CalendarDays, Plus, Trash2, Loader2 } from 'lucide-react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import '../layouts/DashboardPremium.css';

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDate, setNewEventDate] = useState('');

  const fetchEvents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "events"));
      const eventsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEvents(eventsData);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (!newEventTitle.trim() || !newEventDate.trim()) return;
    try {
      await addDoc(collection(db, "events"), {
        title: newEventTitle,
        date: newEventDate
      });
      setNewEventTitle('');
      setNewEventDate('');
      fetchEvents();
    } catch (err) {
      console.error("Error adding event:", err);
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm("Delete this event?")) {
      await deleteDoc(doc(db, "events", id));
      fetchEvents();
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
                <CalendarDays size={24} /> Campus Events
              </h1>
              <p>Manage upcoming school events and activities</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem' }}>
          {/* Add Event Form */}
          <div className="glass-card animate-fade-in delay-2">
            <h3 style={{ marginBottom: '1rem', color: 'var(--dash-text)' }}>Schedule Event</h3>
            <form onSubmit={handleAddEvent} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input 
                type="text" 
                placeholder="Event Title" 
                value={newEventTitle}
                onChange={e => setNewEventTitle(e.target.value)}
                style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--dash-border)', background: 'var(--dash-bg-card)', color: 'var(--dash-text)' }}
              />
              <input 
                type="date" 
                value={newEventDate}
                onChange={e => setNewEventDate(e.target.value)}
                style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--dash-border)', background: 'var(--dash-bg-card)', color: 'var(--dash-text)' }}
              />
              <button type="submit" style={{ padding: '0.75rem', borderRadius: '0.5rem', background: 'var(--dash-blue)', color: 'white', border: 'none', fontWeight: 600, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                <Plus size={18} /> Schedule
              </button>
            </form>
          </div>

          {/* Events List */}
          <div className="glass-card animate-fade-in delay-3">
            <h3 style={{ marginBottom: '1rem', color: 'var(--dash-text)' }}>Upcoming Events</h3>
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}><Loader2 className="spinner" /></div>
            ) : events.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {events.map(item => (
                  <div key={item.id} style={{ padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--dash-border)', background: 'rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ margin: '0 0 0.25rem 0', color: 'var(--dash-text)' }}>{item.title}</h4>
                      <div style={{ fontSize: '0.85rem', color: 'var(--dash-text-muted)' }}>{item.date}</div>
                    </div>
                    <button onClick={() => handleDelete(item.id)} style={{ background: 'transparent', border: 'none', color: 'var(--dash-red)', cursor: 'pointer' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ color: 'var(--dash-text-muted)', textAlign: 'center', padding: '2rem' }}>No events scheduled.</div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminEvents;
