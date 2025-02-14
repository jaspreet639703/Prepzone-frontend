import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const StudentsPresent = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch students data here
    // For now, we'll use mock data
    setStudents([
      { id: 1, name: 'Alice Johnson', mobileNo: '1234567890', address: '123 Main St', present: true },
      { id: 2, name: 'Bob Smith', mobileNo: '2345678901', address: '456 Elm St', present: false },
      { id: 3, name: 'Charlie Brown', mobileNo: '3456789012', address: '789 Oak St', present: true },
    ]);
  }, []);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Students Present Today</h2>
        <Link to="/admin/dashboard" className="btn btn-primary">Back to Dashboard</Link>
      </div>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Mobile No.</th>
            <th>Address</th>
            <th>Present</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.mobileNo}</td>
              <td>{student.address}</td>
              <td>
                {student.present ? (
                  <span className="badge rounded-circle bg-success p-2">
                    <i className="bi bi-check-circle"></i> {/* Check icon */}
                  </span>
                ) : (
                  <span className="badge rounded-circle bg-danger p-2">
                    <i className="bi bi-x-circle"></i> {/* Cross icon */}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsPresent;
