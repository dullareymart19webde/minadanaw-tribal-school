import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Loader2 } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setStatus('loading');
    
    // Simulate sending email
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <>
      <div className="inner-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We would love to hear from you. Reach out for enrollment inquiries, partnerships, or community programs.</p>
        </div>
      </div>

      <div>
        <div className="section">
          <div className="container">
            <div className="contact-grid">
              <div className="contact-info-card">
                <h3 style={{ fontSize: '1.75rem', marginBottom: '2.5rem' }}>Reach Out Directly</h3>
                
                <div className="contact-item">
                  <MapPin size={24} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                  <div>
                    <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Our Campus</strong>
                    <span style={{ opacity: 0.85 }}>Mindanao Tribal School Inc. Grounds,<br/>Bukidnon, Philippines</span>
                  </div>
                </div>

                <div className="contact-item">
                  <Phone size={24} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                  <div>
                    <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Phone Number</strong>
                    <span style={{ opacity: 0.85 }}>+63 912 345 6789</span>
                  </div>
                </div>

                <div className="contact-item">
                  <Mail size={24} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                  <div>
                    <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Email Address</strong>
                    <span style={{ opacity: 0.85 }}>info@mtsi.edu.ph</span>
                  </div>
                </div>

                <div className="contact-item">
                  <Clock size={24} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                  <div>
                    <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Office Hours</strong>
                    <span style={{ opacity: 0.85 }}>Monday to Friday: 8:00 AM - 4:00 PM</span>
                  </div>
                </div>
              </div>

              <div className="contact-form">
                <h3 style={{ marginBottom: '2rem', color: 'var(--color-primary)', fontSize: '1.75rem' }}>Send us a Message</h3>
                
                {status === 'success' && (
                  <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#059669', padding: '1.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(16, 185, 129, 0.3)', marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <CheckCircle size={24} style={{ flexShrink: 0 }} />
                    <div>
                      <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Message Sent Successfully!</strong>
                      <span style={{ fontSize: '0.9rem' }}>Thank you for reaching out. Our administration team will get back to you shortly.</span>
                    </div>
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Your Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Juan Dela Cruz" required disabled={status === 'loading'} />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="juan@example.com" required disabled={status === 'loading'} />
                  </div>
                  <div className="form-group">
                    <label>Subject</label>
                    <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="How can we help?" disabled={status === 'loading'} />
                  </div>
                  <div className="form-group">
                    <label>Message *</label>
                    <textarea rows="4" name="message" value={formData.message} onChange={handleChange} placeholder="Write your message here..." required disabled={status === 'loading'}></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center' }} disabled={status === 'loading'}>
                    {status === 'loading' ? (
                      <Loader2 size={20} className="spinner" />
                    ) : (
                      <>Send Message <Send size={18} style={{ marginLeft: '0.5rem' }} /></>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
