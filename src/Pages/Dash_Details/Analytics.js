import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import './Analytics.css';

const Analytics = ({ data }) => {
  if (!data) return null;

  const { dailyAttendance, monthlyProgress, students } = data;

  return (
    <div className="analytics">
      <h2>Analytics Dashboard</h2>
      
      <div className="chart-grid">
        <div className="chart-card">
          <h3>Daily Attendance</h3>
          <Line data={dailyAttendance} options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom',
              },
              title: {
                display: true,
                text: 'Student Attendance Trends'
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Number of Students'
                }
              },
              x: {
                title: {
                  display: true,
                  text: 'Date'
                }
              }
            }
          }} />
        </div>

        <div className="chart-card">
          <h3>Monthly Progress</h3>
          <Bar data={monthlyProgress} options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom',
              },
              title: {
                display: true,
                text: 'Monthly Student Progress'
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Percentage'
                }
              }
            }
          }} />
        </div>
      </div>

      <div className="student-progress">
        <h3>Student Performance</h3>
        <div className="progress-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Progress</th>
                <th>Attendance</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${student.progress}%` }}
                      />
                      <span>{student.progress}%</span>
                    </div>
                  </td>
                  <td>{student.attendance_days} days</td>
                  <td>
                    <span className={`status ${student.progress >= 75 ? 'good' : student.progress >= 50 ? 'average' : 'poor'}`}>
                      {student.progress >= 75 ? 'Good' : student.progress >= 50 ? 'Average' : 'Needs Attention'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="insights">
        <h3>Key Insights</h3>
        <div className="insight-grid">
          <div className="insight-card">
            <h4>Average Attendance Rate</h4>
            <p className="value">{Math.round(students.reduce((acc, s) => acc + (s.attendance_days / 30), 0) / students.length * 100)}%</p>
            <p className="description">Based on last 30 days</p>
          </div>
          <div className="insight-card">
            <h4>Average Progress</h4>
            <p className="value">{Math.round(students.reduce((acc, s) => acc + s.progress, 0) / students.length)}%</p>
            <p className="description">Overall student performance</p>
          </div>
          <div className="insight-card">
            <h4>Active Students</h4>
            <p className="value">{students.length}</p>
            <p className="description">Currently enrolled</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
