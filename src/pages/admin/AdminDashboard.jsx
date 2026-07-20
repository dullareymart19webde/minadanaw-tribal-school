import React from 'react';

const PortalDashboard = () => {
  return (
    <div>
      <h1 className="page-title">Dashboard Overview</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Students</h3>
          <div className="stat-number">342</div>
          <p className="stat-trend positive">↑ 12% from last year</p>
        </div>
        <div className="stat-card">
          <h3>Active Faculty</h3>
          <div className="stat-number">28</div>
          <p className="stat-trend">All present today</p>
        </div>
        <div className="stat-card">
          <h3>IPED Programs</h3>
          <div className="stat-number">4</div>
          <p className="stat-trend positive">Fully operational</p>
        </div>
        <div className="stat-card">
          <h3>Recent Incidents</h3>
          <div className="stat-number">0</div>
          <p className="stat-trend positive">No issues reported</p>
        </div>
      </div>

      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <ul className="activity-list">
          <li><strong>System:</strong> Daily attendance synchronized. <em>(1 hour ago)</em></li>
          <li><strong>Admin:</strong> Updated IPED curriculum modules. <em>(3 hours ago)</em></li>
          <li><strong>Teacher:</strong> Datu Makisig added new cultural craft grades. <em>(5 hours ago)</em></li>
        </ul>
      </div>
    </div>
  );
};

export default PortalDashboard;
