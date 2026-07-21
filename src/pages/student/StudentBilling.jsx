import React, { useState, useEffect } from 'react';
import { Wallet, Loader2, ArrowRight } from 'lucide-react';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '../../firebase';
import '../layouts/DashboardPremium.css';

const StudentBilling = () => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBilling = async () => {
      try {
        const studentSnap = await getDocs(query(collection(db, "students"), limit(1)));
        if (!studentSnap.empty) {
          const docData = studentSnap.docs[0].data();
          setBalance(docData.balance || 0);
        }
      } catch (error) {
        console.error("Error fetching billing:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBilling();
  }, []);

  return (
    <div style={{ padding: '1.5rem', backgroundColor: '#F8FAFC', minHeight: '100%' }}>
      <div className="bento-container">
        
        {/* Header Banner */}
        <div className="glass-card premium-banner animate-fade-in delay-1" style={{ padding: '1.5rem 2rem' }}>
          <div className="premium-banner-info" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Wallet size={24} color="var(--dash-primary)" /> Billing & Payments
              </h1>
              <p>Manage your tuition and school fees.</p>
            </div>
          </div>
        </div>

        <div className="bento-grid">
          <div className="glass-card bento-full animate-fade-in delay-2" style={{ background: 'linear-gradient(to bottom right, rgba(239, 68, 68, 0.05), rgba(20, 24, 33, 0.6))', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '3rem' }}>
            {loading ? (
              <Loader2 size={32} className="spinner" style={{ color: 'var(--dash-primary)' }} />
            ) : (
              <>
                <div style={{ color: 'var(--dash-text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>Total Balance Due</div>
                <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--dash-text)', marginBottom: '2rem' }}>₱{balance.toFixed(2)}</div>
                
                <button style={{ 
                  background: 'var(--dash-primary)', 
                  color: 'white', 
                  border: 'none', 
                  padding: '1rem 2rem', 
                  borderRadius: 'var(--radius-full)', 
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(13, 116, 43, 0.3)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(13, 116, 43, 0.4)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(13, 116, 43, 0.3)'; }}
                >
                  Pay Now <ArrowRight size={18} />
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentBilling;
