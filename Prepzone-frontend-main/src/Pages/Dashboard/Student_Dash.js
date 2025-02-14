
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Student_Dash.css';
import { Calendar, Badge } from 'antd';
import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

const Student_Dash = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [studentData, setStudentData] = useState(null);
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [exams, setExams] = useState([]);
  const [courses, setCourses] = useState([]);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentData();
    fetchAttendanceHistory();
    fetchExams();
    fetchCourses();
    fetchProgress();
  }, []);

  const fetchStudentData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/student/profile', {
        headers: { Authorization: token }
      });
      setStudentData(response.data);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  const fetchAttendanceHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/student/attendance-history', {
        headers: { Authorization: token }
      });
      setAttendanceHistory(response.data);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  const markAttendance = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Get current location
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        
        const response = await axios.post('http://localhost:8000/api/student/mark-attendance', 
          { latitude, longitude },
          { headers: { Authorization: token } }
        );

        if (response.data.status === 'Present') {
          alert('Attendance marked successfully! You are within library range.');
        } else {
          alert('You are not within the library range. Attendance marked as absent.');
        }
        
        fetchAttendanceHistory();
      }, (error) => {
        alert('Please enable location services to mark attendance.');
      });
    } catch (error) {
      console.error('Error marking attendance:', error);
    }
  };

  const addExam = async (examData) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8000/api/student/add-exam', examData, {
        headers: { Authorization: token }
      });
      fetchExams();
    } catch (error) {
      console.error('Error adding exam:', error);
    }
  };

  const fetchExams = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/student/exams', {
        headers: { Authorization: token }
      });
      setExams(response.data);
    } catch (error) {
      console.error('Error fetching exams:', error);
    }
  };

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/student/courses', {
        headers: { Authorization: token }
      });
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchProgress = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/student/progress', {
        headers: { Authorization: token }
      });
      setProgress(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching progress:', error);
      setLoading(false);
    }
  };

  const renderDashboard = () => (
    <div className="dashboard-content">
      <div className="welcome-section">
        <h2>Welcome, {studentData?.name}</h2>
        <button className="attendance-btn" onClick={markAttendance}>
          Mark Today's Attendance
        </button>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Attendance Rate</h3>
          <p>{progress?.attendanceRate}%</p>
        </div>
        <div className="stat-card">
          <h3>Upcoming Exams</h3>
          <p>{exams.filter(exam => new Date(exam.date) > new Date()).length}</p>
        </div>
        <div className="stat-card">
          <h3>Active Courses</h3>
          <p>{courses.length}</p>
        </div>
        <div className="stat-card">
          <h3>Overall Progress</h3>
          <p>{progress?.overallProgress}%</p>
        </div>
      </div>

      {progress?.progressChart && (
        <div className="progress-chart">
          <h3>Progress Over Time</h3>
          <Line data={progress.progressChart} />
        </div>
      )}
    </div>
  );

  const renderAttendance = () => (
    <div className="attendance-content">
      <h2>Attendance History</h2>
      <Calendar
        dateCellRender={(date) => {
          const attendance = attendanceHistory.find(
            a => new Date(a.date).toDateString() === date.toDate().toDateString()
          );
          if (attendance) {
            return (
              <Badge
                status={attendance.status === 'Present' ? 'success' : 'error'}
                text={`${attendance.status} (${attendance.entryTime})`}
              />
            );
          }
        }}
      />
    </div>
  );

  const renderExams = () => (
    <div className="exams-content">
      <h2>Exam Preparation</h2>
      <div className="add-exam-form">
        <input type="text" placeholder="Exam Name" id="examName" />
        <input type="date" id="examDate" />
        <textarea placeholder="Preparation Notes" id="examNotes" />
        <button onClick={() => {
          const examData = {
            name: document.getElementById('examName').value,
            date: document.getElementById('examDate').value,
            notes: document.getElementById('examNotes').value
          };
          addExam(examData);
        }}>Add Exam</button>
      </div>

      <div className="exam-list">
        {exams.map(exam => (
          <div key={exam.id} className="exam-card">
            <h3>{exam.name}</h3>
            <p>Date: {new Date(exam.date).toLocaleDateString()}</p>
            <p>Days Left: {Math.ceil((new Date(exam.date) - new Date()) / (1000 * 60 * 60 * 24))}</p>
            <p>Notes: {exam.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCourses = () => (
    <div className="courses-content">
      <h2>My Courses</h2>
      <div className="course-list">
        {courses.map(course => (
          <div key={course.id} className="course-card">
            <h3>{course.name}</h3>
            <p>Progress: {course.progress}%</p>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${course.progress}%` }}
              />
            </div>
            <p>Last Studied: {new Date(course.lastStudied).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProgress = () => (
    <div className="progress-content">
      <h2>Progress Report</h2>
      {loading ? (
        <p>Loading progress data...</p>
      ) : (
        <>
          <div className="progress-summary">
            <h3>Overall Performance</h3>
            <div className="progress-metrics">
              <div className="metric">
                <label>Attendance Score</label>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${progress.attendanceScore}%` }}
                  />
                </div>
                <span>{progress.attendanceScore}%</span>
              </div>
              <div className="metric">
                <label>Exam Preparation</label>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${progress.examScore}%` }}
                  />
                </div>
                <span>{progress.examScore}%</span>
              </div>
              <div className="metric">
                <label>Course Completion</label>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${progress.courseScore}%` }}
                  />
                </div>
                <span>{progress.courseScore}%</span>
              </div>
            </div>
          </div>

          <div className="recommendations">
            <h3>Recommendations</h3>
            <ul>
              {progress.recommendations.map((rec, index) => (
                <li key={index} className={`recommendation ${rec.type}`}>
                  {rec.message}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="student-dashboard">
      <div className="sidebar">
        <div className="profile-section">
          <img src={studentData?.profileImage || 'default-avatar.png'} alt="Profile" />
          <h3>{studentData?.name}</h3>
          <p>{studentData?.email}</p>
        </div>
        <nav>
          <button 
            className={activeTab === 'dashboard' ? 'active' : ''} 
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={activeTab === 'attendance' ? 'active' : ''} 
            onClick={() => setActiveTab('attendance')}
          >
            Attendance
          </button>
          <button 
            className={activeTab === 'exams' ? 'active' : ''} 
            onClick={() => setActiveTab('exams')}
          >
            Exams
          </button>
          <button 
            className={activeTab === 'courses' ? 'active' : ''} 
            onClick={() => setActiveTab('courses')}
          >
            Courses
          </button>
          <button 
            className={activeTab === 'progress' ? 'active' : ''} 
            onClick={() => setActiveTab('progress')}
          >
            Progress
          </button>
        </nav>
      </div>

      <div className="main-content">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'attendance' && renderAttendance()}
        {activeTab === 'exams' && renderExams()}
        {activeTab === 'courses' && renderCourses()}
        {activeTab === 'progress' && renderProgress()}
      </div>
    </div>
  );
};

export default Student_Dash;
