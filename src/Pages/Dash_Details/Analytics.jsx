import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Analytics = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch analytics data here
    // For now, we'll use mock data
    setStudents([
      { id: 1, name: 'Alice Johnson', seat: 'A1', joinDate: '2023-01-01', endDate: '2023-12-31' },
      { id: 2, name: 'Bob Smith', seat: 'A2', joinDate: '2023-02-01', endDate: '2023-11-30' },
      { id: 3, name: 'Charlie Brown', seat: 'A3', joinDate: '2023-03-01', endDate: '2024-02-29' },
    ]);
  }, []);

  const handleExtendTimeline = (studentId) => {
    // Implement timeline extension logic here
    alert(`Timeline extended for student ${studentId}`);
  };

  const handleEditStudentDetails = (studentId) => {
    // Implement edit student details logic here
    alert(`Editing details for student ${studentId}`);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Analytics Dashboard</h1>
        <Link to="/admin/dashboard" className="btn btn-outline-primary ms-auto">
          Back to Dashboard
        </Link>
      </div>

      <div className="row">
        {students.map((student) => (
          <div className="col-md-4 mb-4" key={student.id}>
            <div className="card shadow-sm">
              <div className="card-body">
                {/* Priority display of Seat */}
                <h5 className="card-title text-primary">{student.seat}</h5>
                <p className="card-text"><strong>Name:</strong> {student.name}</p>
                <p className="card-text"><strong>Join Date:</strong> {student.joinDate}</p>
                <p className="card-text"><strong>End Date:</strong> {student.endDate}</p>
                <div className="d-flex justify-content-between">
                  {new Date(student.endDate) < new Date() ? (
                    <div>
                      <button
                        onClick={() => handleExtendTimeline(student.id)}
                        className="btn btn-warning btn-sm me-2"
                      >
                        Extend Timeline
                      </button>
                      <button
                        onClick={() => handleEditStudentDetails(student.id)}
                        className="btn btn-info btn-sm"
                      >
                        Edit Student Details
                      </button>
                    </div>
                  ) : (
                    <span className="badge bg-success text-light">Active</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;
