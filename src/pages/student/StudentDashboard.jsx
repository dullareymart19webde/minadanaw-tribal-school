import React from 'react';

const StudentDashboard = () => {
  return (
    <div>
      <h1 className="page-title">Welcome back, Alunsina!</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Current Standing</h3>
          <div className="stat-number">Excellent</div>
          <p className="stat-trend positive">Top 10% of class</p>
        </div>
        <div className="stat-card">
          <h3>Attendance</h3>
          <div className="stat-number">98%</div>
          <p className="stat-trend positive">Perfect this month</p>
        </div>
        <div className="stat-card">
          <h3>Missing Assignments</h3>
          <div className="stat-number">0</div>
          <p className="stat-trend positive">All caught up</p>
        </div>
      </div>

      <div className="recent-activity">
        <h2>Recent Announcements</h2>
        <ul className="activity-list">
          <li><strong>Event:</strong> Lumad Cultural Festival next Friday. <em>(Yesterday)</em></li>
          <li><strong>Reminder:</strong> Submit your indigenous arts project by Monday. <em>(2 days ago)</em></li>
        </ul>
      </div>
    </div>
  );
};

export default StudentDashboard;
