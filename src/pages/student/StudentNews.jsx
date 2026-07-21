import React from 'react';
import { Newspaper, ChevronRight, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';
import '../layouts/DashboardPremium.css';

const StudentNews = () => {
  const fetchNews = async () => {
    // Note: since we might not have indexes for orderBy 'createdAt', we'll sort manually for now
    const querySnapshot = await getDocs(collection(db, "news"));
    const newsData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return newsData.sort((a,b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0));
  };

  const { data: news = [], isLoading } = useQuery({
    queryKey: ['studentNews'],
    queryFn: fetchNews
  });

  return (
    <div style={{ padding: '1.5rem', backgroundColor: '#F8FAFC', minHeight: '100%' }}>
      <div className="bento-container">
        
        {/* Header Banner */}
        <div className="glass-card premium-banner animate-fade-in delay-1" style={{ padding: '1.5rem 2rem' }}>
          <div className="premium-banner-info" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Newspaper size={24} color="var(--dash-primary)" /> Campus News
              </h1>
              <p>Stay updated with the latest announcements.</p>
            </div>
          </div>
        </div>

        <div className="bento-grid">
          <div className="glass-card bento-full animate-fade-in delay-2" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {isLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
                  <Loader2 size={32} className="spinner" style={{ color: 'var(--dash-primary)' }} />
                </div>
              ) : news.length > 0 ? (
                news.map((item) => {
                  const dateStr = item.createdAt ? new Date(item.createdAt.toMillis()).toLocaleDateString() : 'Recent';
                  return (
                    <div key={item.id} style={{ 
                      padding: '1.5rem', 
                      background: 'var(--dash-bg-card)', 
                      border: '1px solid var(--dash-border)', 
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer',
                      transition: 'border-color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--dash-primary)'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--dash-border)'}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                          <span style={{ 
                            padding: '0.2rem 0.6rem', 
                            fontSize: '0.75rem', 
                            borderRadius: '1rem', 
                            background: 'rgba(13, 116, 43, 0.1)', 
                            color: 'var(--dash-primary)',
                            fontWeight: 'bold'
                          }}>Announcement</span>
                          <span style={{ color: 'var(--dash-text-muted)', fontSize: '0.85rem' }}>{dateStr}</span>
                        </div>
                        <h3 style={{ color: 'var(--dash-text)', margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>{item.title}</h3>
                        <p style={{ margin: 0, color: 'var(--dash-text-muted)', fontSize: '0.9rem' }}>{item.content}</p>
                      </div>
                      <ChevronRight size={20} color="var(--dash-text-muted)" style={{ flexShrink: 0 }} />
                    </div>
                  )
                })
              ) : (
                <div style={{ textAlign: 'center', color: 'var(--dash-text-muted)', padding: '2rem' }}>
                  No recent announcements.
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentNews;
