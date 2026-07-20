import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Events = () => {
  const eventsList = [
    {
      id: 1,
      title: "Annual Lumad Cultural Festival",
      date: "August 15, 2026",
      time: "08:00 AM - 05:00 PM",
      location: "MTSI Main Grounds",
      desc: "A full day celebrating indigenous music, dance, and traditional crafts. Open to the public to foster cultural exchange.",
      color: "var(--color-primary)"
    },
    {
      id: 2,
      title: "Tree Planting Initiative",
      date: "September 02, 2026",
      time: "06:00 AM - 11:00 AM",
      location: "Mt. Kitanglad Buffer Zone",
      desc: "Students and faculty will lead a reforestation drive to plant 500 endemic saplings as part of our Living Traditions curriculum.",
      color: "var(--color-accent)"
    },
    {
      id: 3,
      title: "1st Quarter Parent-Teacher Conference",
      date: "September 25, 2026",
      time: "01:00 PM - 04:00 PM",
      location: "MTSI Classrooms",
      desc: "Consultation and distribution of first-quarter grades. Attendance by parents or tribal guardians is mandatory.",
      color: "var(--color-secondary)"
    }
  ];

  return (
    <>
      <div className="inner-hero">
        <div className="container">
          <h1>News & Events</h1>
          <p>Stay updated with the latest happenings, cultural milestones, and community announcements at MTSI.</p>
        </div>
      </div>

      <div>
        <div className="section">
          <div className="container">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
              {eventsList.map((event) => (
                <div 
                  key={event.id} 
                  style={{ display: 'flex', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}
                >
                  <div style={{ width: '8px', backgroundColor: event.color, flexShrink: 0 }}></div>
                  <div style={{ padding: '2rem', flex: 1 }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', color: 'var(--color-text-dark)' }}>{event.title}</h3>
                    <p style={{ color: 'var(--color-text-body)', marginBottom: '1.5rem', lineHeight: 1.6 }}>{event.desc}</p>
                    
                    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: '600', color: 'var(--color-text-dark)' }}>
                        <Calendar size={16} style={{ color: 'var(--color-primary)' }} />
                        {event.date}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: '600', color: 'var(--color-text-dark)' }}>
                        <Clock size={16} style={{ color: 'var(--color-primary)' }} />
                        {event.time}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: '600', color: 'var(--color-text-dark)' }}>
                        <MapPin size={16} style={{ color: 'var(--color-secondary)' }} />
                        {event.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Events;
