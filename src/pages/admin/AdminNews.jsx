import React, { useState, useEffect } from 'react';
import { Newspaper, Plus, Trash2, Loader2 } from 'lucide-react';
import { collection, getDocs, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import '../layouts/DashboardPremium.css';

const AdminNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const fetchNews = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "news"));
      const newsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Sort by date manually if needed, assuming they have createdAt
      setNews(newsData.sort((a,b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0)));
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleAddNews = async (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;
    try {
      await addDoc(collection(db, "news"), {
        title: newTitle,
        content: newContent,
        createdAt: serverTimestamp(),
        author: "System Admin"
      });
      setNewTitle('');
      setNewContent('');
      fetchNews();
    } catch (err) {
      console.error("Error adding news:", err);
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm("Delete this announcement?")) {
      await deleteDoc(doc(db, "news", id));
      fetchNews();
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
                <Newspaper size={24} /> News & Announcements
              </h1>
              <p>Publish campus updates and announcements</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem' }}>
          {/* Add News Form */}
          <div className="glass-card animate-fade-in delay-2">
            <h3 style={{ marginBottom: '1rem', color: 'var(--dash-text)' }}>Post Announcement</h3>
            <form onSubmit={handleAddNews} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input 
                type="text" 
                placeholder="Announcement Title" 
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--dash-border)', background: 'var(--dash-bg-card)', color: 'var(--dash-text)' }}
              />
              <textarea 
                placeholder="Announcement details..." 
                value={newContent}
                onChange={e => setNewContent(e.target.value)}
                rows={5}
                style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--dash-border)', background: 'var(--dash-bg-card)', color: 'var(--dash-text)', resize: 'vertical' }}
              />
              <button type="submit" style={{ padding: '0.75rem', borderRadius: '0.5rem', background: 'var(--dash-primary)', color: 'white', border: 'none', fontWeight: 600, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                <Plus size={18} /> Publish
              </button>
            </form>
          </div>

          {/* News List */}
          <div className="glass-card animate-fade-in delay-3">
            <h3 style={{ marginBottom: '1rem', color: 'var(--dash-text)' }}>Recent Posts</h3>
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}><Loader2 className="spinner" /></div>
            ) : news.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {news.map(item => (
                  <div key={item.id} style={{ padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--dash-border)', background: 'rgba(255,255,255,0.02)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--dash-text)' }}>{item.title}</h4>
                      <button onClick={() => handleDelete(item.id)} style={{ background: 'transparent', border: 'none', color: 'var(--dash-red)', cursor: 'pointer' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: 'var(--dash-text-muted)' }}>{item.content}</p>
                    <div style={{ fontSize: '0.75rem', color: 'var(--dash-accent)' }}>Posted by {item.author}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ color: 'var(--dash-text-muted)', textAlign: 'center', padding: '2rem' }}>No announcements published yet.</div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminNews;
