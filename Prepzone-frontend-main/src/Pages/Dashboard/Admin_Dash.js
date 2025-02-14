
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Admin_Dash.css';
import SeatManagement from '../Dash_Details/SeatManagement';
import StudentList from '../Dash_Details/StudentList';
import Analytics from '../Dash_Details/Analytics';
import { Modal, Button, Form, Upload, message, Input, DatePicker } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import moment from 'moment';

const customStyles = `
  .dashboard-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 15px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 25px;
    height: 100%;
    transition: all 0.3s ease;
    color: white;
  }
  .dashboard-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
  .dashboard-icon {
    font-size: 2.5rem;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 15px;
  }
  .dashboard-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 10px;
  }
  .dashboard-value {
    font-size: 2.5rem;
    font-weight: bold;
    color: white;
    margin-bottom: 15px;
  }
  .dashboard-description {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 15px;
  }
  .dashboard-action {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 0.3s ease;
  }
  .dashboard-action:hover {
    background: rgba(255, 255, 255, 0.3);
    color: white;
  }
`;

const Admin_Dash = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dashboardData, setDashboardData] = useState({});
  const [adminData, setAdminData] = useState({}); 
  const [students, setStudents] = useState([]);
  const [seats, setSeats] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(true);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const joiningDate = Form.useWatch('joiningDate', form);

  useEffect(() => {
    fetchAdminData();
    fetchStudents();
    fetchAnalytics();
    fetchSeats();
    fetchDashboardData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.get('http://localhost:8000/api/admin/profile', {
        headers: { Authorization: token }
      });

      setAdminData(response.data); 
      setLoading(false);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      message.error('Failed to fetch admin data');
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/admin/students', {
        headers: { Authorization: token }
      });

      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
      message.error('Failed to fetch students');
    }
  };

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/admin/analytics', {
        headers: { Authorization: token }
      });

      setAnalytics(response.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      message.error('Failed to fetch analytics');
    }
  };

  const fetchSeats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/admin/seats', {
        headers: { Authorization: token }
      });

      setSeats(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching seats:', error);
      setLoading(false);
    }
  };

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/admin/dashboard', {
        headers: { Authorization: token }
      });

      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      message.error('Failed to fetch dashboard data');
    }
  };

  const handleAddStudent = async (formData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        message.error('Please login again');
        navigate('/login');
        return;
      }

      const response = await axios.post('http://localhost:8000/api/admin/add-student', {
        name: formData.name,
        mobileNo: formData.mobile,
        address: formData.address,
        joiningDate: formData.joiningDate.format('YYYY-MM-DD'),
        endingDate: formData.endingDate.format('YYYY-MM-DD')
      }, {
        headers: { Authorization: token }
      });

      const { studentId, password } = response.data;
      
      message.success('Student added successfully');
      Modal.success({
        title: 'Student Added Successfully',
        content: (
          <div>
            <p>Please save these credentials:</p>
            <p><strong>Student ID:</strong> {studentId}</p>
            <p><strong>Login Credentials:</strong></p>
            <p><strong>Username:</strong> {studentId}</p>
            <p><strong>Password:</strong> {formData.mobile} (Mobile Number)</p>
          </div>
        ),
      });
      
      setShowAddStudent(false);
      form.resetFields();
      fetchStudents();
    } catch (error) {
      console.error('Error adding student:', error);
      const errorMessage = error.response?.data?.error || 'Failed to add student';
      message.error(errorMessage);
      
      if (error.response?.data?.details) {
        const { details } = error.response.data;
        Object.keys(details).forEach(field => {
          if (details[field]) {
            form.setFields([{
              name: field,
              errors: [details[field]]
            }]);
          }
        });
      }
    }
  };

  const handleEditStudent = async (student) => {
    setSelectedStudent(student);
    setShowEditModal(true);
  };

  const handleBulkUpload = async (file) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        message.error('Please login again');
        navigate('/login');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://localhost:8000/api/admin/bulk-upload-students', 
        formData,
        {
          headers: { 
            Authorization: token,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      const { results } = response.data;
      
      message.success('Students uploaded successfully');
      Modal.success({
        title: 'Students Added Successfully',
        content: (
          <div>
            <p>The following students were added:</p>
            <ul>
              {results.map((student, index) => (
                <li key={index}>
                  <strong>{student.name}</strong><br/>
                  ID: {student.studentId}<br/>
                  Password: {student.password}
                </li>
              ))}
            </ul>
            <p style={{ color: 'red' }}>Please save these credentials!</p>
          </div>
        ),
        width: 600
      });
      
      setShowUploadModal(false);
      fetchStudents();
    } catch (error) {
      console.error('Error uploading students:', error);
      const errorMessage = error.response?.data?.error || 'Failed to upload students';
      message.error(errorMessage);
      
      if (error.response?.data?.details) {
        message.error(error.response.data.details);
      }
    }
  };

  const disabledEndingDate = (current) => {
    return current && (current < moment().startOf('day') || (joiningDate && current < joiningDate));
  };

  return (
    <div className="dashboard-container">
      <style>{customStyles}</style>
      <div className="sidebar">
        <div className="sidebar-header">
          <h3>{dashboardData.libraryName || 'Admin Dashboard'}</h3>
        </div>
        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={`nav-item ${activeTab === 'students' ? 'active' : ''}`}
            onClick={() => setActiveTab('students')}
          >
            Students
          </button>
          <button
            className={`nav-item ${activeTab === 'seats' ? 'active' : ''}`}
            onClick={() => setActiveTab('seats')}
          >
            Seat Management
          </button>
          <button
            className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </button>
        </nav>
      </div>

      <div className="main-content">
        <div className="top-bar">
          <div className="user-info">
            <span>Welcome, {adminData.ownerName || 'Admin'}</span>
          </div>
          <div className="actions">
            <Button 
              type="primary"
              onClick={() => setShowAddStudent(true)}
              className="action-button"
            >
              Add Student
            </Button>
            <Button
              onClick={() => setShowUploadModal(true)}
              className="action-button"
            >
              Bulk Upload
            </Button>
          </div>
        </div>

        <div className="content-area">
          {loading ? (
            <div className="loading-spinner">Loading...</div>
          ) : (
            <>
              {activeTab === 'dashboard' && (
                <div className="dashboard-overview">
                  <div className="stats-grid">
                    <div className="dashboard-card">
                      <h4>Total Students</h4>
                      <p className="value">{dashboardData.totalStudents || 0}</p>
                    </div>
                    <div className="dashboard-card">
                      <h4>Available Seats</h4>
                      <p className="value">{dashboardData.seatsAvailable || 0}</p>
                    </div>
                    <div className="dashboard-card">
                      <h4>Total Seats</h4>
                      <p className="value">{dashboardData.totalSeats || 0}</p>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'students' && (
                <StudentList 
                  students={students} 
                  onEdit={handleEditStudent}
                  loading={loading}
                />
              )}
              {activeTab === 'seats' && <SeatManagement seats={seats} />}
              {activeTab === 'analytics' && <Analytics data={analytics} />}
            </>
          )}
        </div>
      </div>

      <Modal
        title="Add New Student"
        open={showAddStudent}
        onCancel={() => {
          setShowAddStudent(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form form={form} onFinish={handleAddStudent} layout="vertical">
          <Form.Item
            name="name"
            label="Student Name"
            rules={[{ required: true, message: 'Please enter student name' }]}
          >
            <Input placeholder="Enter student name" />
          </Form.Item>
          <Form.Item
            name="mobile"
            label="Mobile Number"
            rules={[
              { required: true, message: 'Please enter mobile number' },
              { pattern: /^[0-9]{10}$/, message: 'Please enter valid 10-digit mobile number' }
            ]}
          >
            <Input placeholder="Enter 10-digit mobile number" />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Please enter address' }]}
          >
            <Input.TextArea placeholder="Enter full address" rows={3} />
          </Form.Item>
          <Form.Item
            name="joiningDate"
            label="Joining Date"
            rules={[{ required: true, message: 'Please select joining date' }]}
          >
            <DatePicker
              style={{ width: '100%' }}
              placeholder="Select joining date"
              disabledDate={(current) => current && current < moment().startOf('day')}
            />
          </Form.Item>
          <Form.Item
            name="endingDate"
            label="Ending Date"
            rules={[{ required: true, message: 'Please select ending date' }]}
          >
            <DatePicker
              style={{ width: '100%' }}
              placeholder="Select ending date"
              disabledDate={disabledEndingDate}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Add Student
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Bulk Upload Students"
        open={showUploadModal}
        onCancel={() => setShowUploadModal(false)}
        footer={null}
      >
        <div style={{ marginBottom: 16 }}>
          <h4>Instructions:</h4>
          <p>Please prepare your Excel file with the following columns:</p>
          <ul>
            <li>Name (required)</li>
            <li>MobileNo (required, 10 digits)</li>
            <li>Address (required)</li>
            <li>JoiningDate (required, format: YYYY-MM-DD)</li>
            <li>EndingDate (required, format: YYYY-MM-DD)</li>
          </ul>
        </div>
        <Upload.Dragger
          accept=".xlsx,.xls"
          beforeUpload={(file) => {
            handleBulkUpload(file);
            return false;
          }}
        >
          <p className="ant-upload-drag-icon">
            <UploadOutlined />
          </p>
          <p className="ant-upload-text">Click or drag Excel file to upload</p>
          <p className="ant-upload-hint">
            Support for Excel files only. Please ensure your file has the correct format.
          </p>
        </Upload.Dragger>
      </Modal>
    </div>
  );
};

export default Admin_Dash;
