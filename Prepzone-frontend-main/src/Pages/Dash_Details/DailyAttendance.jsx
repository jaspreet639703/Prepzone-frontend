import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DailyAttendance = () => {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    // Fetch attendance data here
    // For now, we'll use mock data
    setAttendance([
      { id: 1, seatNo: 'A1', studentName: 'Alice Johnson', present: true },
      { id: 2, seatNo: 'A2', studentName: 'Bob Smith', present: false },
      { id: 3, seatNo: 'A3', studentName: 'Charlie Brown', present: true },
    ]);
  }, []);

  const handleTrackAttendance = () => {
    // Implement attendance tracking logic here
    alert('Attendance tracked successfully!');
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Daily Attendance Portal</h1>
      <button onClick={handleTrackAttendance} className="btn btn-primary mb-3">Track Attendance</button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Seat No.</th>
            <th>Student Name</th>
            <th>Present</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((record) => (
            <tr key={record.id}>
              <td>{record.seatNo}</td>
              <td>{record.studentName}</td>
              <td>{record.present ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/admin/dashboard" className="btn btn-primary mt-3">Back to Dashboard</Link>
    </div>
  );
};

export default DailyAttendance;

