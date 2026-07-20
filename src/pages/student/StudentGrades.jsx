import React from 'react';

const StudentGrades = () => {
  const grades = [
    { subject: 'Living Traditions', grade: 'A', remarks: 'Excellent participation' },
    { subject: 'History of Bukidnon', grade: 'A-', remarks: 'Great project submission' },
    { subject: 'Indigenous Arts & Crafts', grade: 'B+', remarks: 'Good work, needs more detail' },
    { subject: 'Mathematics & Sciences', grade: 'A', remarks: 'Outstanding' },
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">My Grades</h1>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Grade</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((item, index) => (
              <tr key={index}>
                <td><strong>{item.subject}</strong></td>
                <td><span className="status-badge enrolled" style={{ fontSize: '1rem', padding: '0.4rem 1rem' }}>{item.grade}</span></td>
                <td className="text-muted">{item.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentGrades;
