import React, { useState } from 'react';
import { Search, Edit, Trash2, Plus } from 'lucide-react';

const mockStudents = [
  { id: '2023-001', name: 'Alunsina B. Matalin', grade: 'Grade 10', status: 'Enrolled', attendance: '98%' },
  { id: '2023-002', name: 'Bagobo C. Makisig', grade: 'Grade 9', status: 'Enrolled', attendance: '95%' },
  { id: '2023-003', name: 'Diwata D. Luningning', grade: 'Grade 11', status: 'Enrolled', attendance: '100%' },
  { id: '2023-004', name: 'Habagat E. Lakas', grade: 'Grade 8', status: 'Enrolled', attendance: '92%' },
  { id: '2023-005', name: 'Tala F. Bituin', grade: 'Grade 12', status: 'Graduating', attendance: '99%' },
];

const PortalStudents = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = mockStudents.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.id.includes(searchTerm)
  );

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Student Records</h1>
        <button className="btn btn-primary btn-sm btn-icon">
          <Plus size={16} /> Add Student
        </button>
      </div>

      <div className="table-controls">
        <div className="search-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search students..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input-with-icon"
          />
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Grade Level</th>
              <th>Status</th>
              <th>Attendance</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td className="text-muted">{student.id}</td>
                <td><strong>{student.name}</strong></td>
                <td>{student.grade}</td>
                <td><span className={`status-badge ${student.status.toLowerCase()}`}>{student.status}</span></td>
                <td>{student.attendance}</td>
                <td className="text-right">
                  <button className="action-btn" title="Edit"><Edit size={16} /></button>
                  <button className="action-btn text-danger" title="Delete"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center empty-state">No students found matching your search.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PortalStudents;
