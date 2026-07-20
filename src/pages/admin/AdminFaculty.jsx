import React, { useState } from 'react';
import { Search, Edit, Trash2, Plus } from 'lucide-react';

const mockFaculty = [
  { id: 'F-101', name: 'Datu Magdaleno Pandian', subject: 'Living Traditions / History', type: 'Full-time' },
  { id: 'F-102', name: 'Bae Lita Mansikad', subject: 'Indigenous Arts & Crafts', type: 'Full-time' },
  { id: 'F-103', name: 'Mr. Juanito Perez', subject: 'Mathematics & Sciences', type: 'Part-time' },
  { id: 'F-104', name: 'Ms. Maria Clara', subject: 'Languages (English & Filipino)', type: 'Full-time' },
];

const PortalFaculty = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaculty = mockFaculty.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Faculty Directory</h1>
        <button className="btn btn-primary btn-sm btn-icon">
          <Plus size={16} /> Add Faculty
        </button>
      </div>

      <div className="table-controls">
        <div className="search-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search faculty..." 
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
              <th>Subject Taught</th>
              <th>Employment Type</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFaculty.map((faculty) => (
              <tr key={faculty.id}>
                <td className="text-muted">{faculty.id}</td>
                <td><strong>{faculty.name}</strong></td>
                <td>{faculty.subject}</td>
                <td><span className={`status-badge`}>{faculty.type}</span></td>
                <td className="text-right">
                  <button className="action-btn" title="Edit"><Edit size={16} /></button>
                </td>
              </tr>
            ))}
            {filteredFaculty.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center empty-state">No faculty found matching your search.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PortalFaculty;
