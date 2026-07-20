import React from 'react';
import { CheckSquare } from 'lucide-react';

const FacultyClasses = () => {
  const students = [
    { id: '2023-001', name: 'Alunsina B. Matalin', grade: 'A', status: 'Present' },
    { id: '2023-002', name: 'Bagobo C. Makisig', grade: 'B+', status: 'Present' },
    { id: '2023-004', name: 'Habagat E. Lakas', grade: 'B', status: 'Absent' },
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Manage Class: Living Traditions (G10)</h1>
        <button className="btn btn-primary btn-sm btn-icon">
          <CheckSquare size={16} /> Submit Attendance
        </button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Current Grade</th>
              <th>Input New Grade</th>
              <th>Today's Attendance</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td><strong>{student.name}</strong></td>
                <td>{student.grade}</td>
                <td>
                  <input type="text" className="search-input-with-icon" style={{ width: '80px', padding: '0.4rem' }} defaultValue={student.grade} />
                </td>
                <td>
                  <select defaultValue={student.status} style={{ padding: '0.4rem', borderRadius: '4px', border: '1px solid #CBD5E0' }}>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Late">Late</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FacultyClasses;
