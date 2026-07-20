import React from 'react';

const FacultyDashboard = () => {
  return (
    <div>
      <h1 className="page-title">Welcome back, Datu Pandian</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Classes Today</h3>
          <div className="stat-number">3</div>
          <p className="stat-trend">Next class in 30 mins</p>
        </div>
        <div className="stat-card">
          <h3>Pending Grades</h3>
          <div className="stat-number">12</div>
          <p className="stat-trend" style={{ color: '#F59E0B' }}>Needs review</p>
        </div>
        <div className="stat-card">
          <h3>Unmarked Attendance</h3>
          <div className="stat-number">1</div>
          <p className="stat-trend positive">Almost done</p>
        </div>
      </div>

      <div className="recent-activity">
        <h2>Today's Schedule</h2>
        <ul className="activity-list">
          <li><strong>08:00 AM - 10:00 AM:</strong> Living Traditions (Grade 10) - <em>Completed</em></li>
          <li><strong>10:30 AM - 12:00 PM:</strong> History of Bukidnon (Grade 11) - <em>Upcoming</em></li>
          <li><strong>01:00 PM - 03:00 PM:</strong> Indigenous Arts (Grade 9) - <em>Upcoming</em></li>
        </ul>
      </div>
    </div>
  );
};

export default FacultyDashboard;
