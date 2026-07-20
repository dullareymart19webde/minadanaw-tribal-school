import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CheckCircle, Download, ArrowRight } from 'lucide-react';

const Admissions = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      
      <div className="inner-hero">
        <div className="container">
          <h1>Admissions & Enrollment</h1>
          <p>We welcome students who are eager to learn, honor their heritage, and become leaders of tomorrow.</p>
        </div>
      </div>

      <main style={{ flex: 1 }}>
        <div className="section">
          <div className="container">
            <div className="content-grid" style={{ alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: 'var(--color-text-dark)' }}>
                  Requirements for New Students
                </h3>
                <p style={{ color: 'var(--color-text-body)', marginBottom: '2rem' }}>
                  Please prepare the following documents before beginning the registration process. All physical copies must be submitted to the registrar's office.
                </p>
                <ul style={{ listStyle: 'none' }}>
                  {[
                    "Original PSA Birth Certificate",
                    "Certificate of Indigenous Ancestry (if applicable)",
                    "Form 138 (Report Card) from previous school",
                    "Certificate of Good Moral Character",
                    "2x2 ID Pictures (4 copies)"
                  ].map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', fontSize: '1.05rem', color: 'var(--color-text-dark)', fontWeight: 500 }}>
                      <CheckCircle size={22} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>

                <div style={{ marginTop: '3rem', padding: '2rem', backgroundColor: 'var(--color-background)', borderLeft: '4px solid var(--color-accent)', borderRadius: '0 8px 8px 0' }}>
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: 'var(--color-text-dark)' }}>
                    Scholarships & Grants
                  </h3>
                  <p style={{ color: 'var(--color-text-body)', marginBottom: '1.5rem' }}>
                    MTSI is committed to ensuring that financial barriers do not prevent indigenous youth from receiving quality education. We offer full and partial scholarships sponsored by partner NGOs.
                  </p>
                  <button className="btn btn-outline">
                    <Download size={18} /> Download Scholarship Form
                  </button>
                </div>
              </div>

              <div className="contact-form">
                <h3 style={{ marginBottom: '0.5rem', color: 'var(--color-primary)', fontSize: '1.5rem' }}>Pre-Registration</h3>
                <p style={{ color: 'var(--color-muted)', marginBottom: '2rem' }}>Fill out this form to reserve a slot for the upcoming academic year.</p>
                
                <form>
                  <div className="form-group">
                    <label>Student's Full Name</label>
                    <input type="text" placeholder="Enter full name" />
                  </div>
                  <div className="form-group">
                    <label>Grade Level Applying For</label>
                    <select>
                      <option>Grade 7</option>
                      <option>Grade 8</option>
                      <option>Grade 9</option>
                      <option>Grade 10</option>
                      <option>Grade 11</option>
                      <option>Grade 12</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Parent/Guardian Contact Number</label>
                    <input type="text" placeholder="09XX-XXX-XXXX" />
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', marginTop: '1rem', marginBottom: '1rem' }}>
                    <input type="checkbox" style={{ width: 'auto', marginTop: '0.3rem' }} />
                    <span style={{ fontSize: '0.9rem', color: 'var(--color-muted)' }}>I certify that all information provided is true and correct.</span>
                  </div>
                  <button type="button" className="btn btn-primary" style={{ width: '100%' }}>
                    Submit Registration <ArrowRight size={18} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admissions;
