import axios from 'axios';
import React, { useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaBookReader, FaUserTie } from 'react-icons/fa';

const LogIn = ({ handleLogin }) => {
  const [userType, setUserType] = useState('admin');
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();

  const handleUserTypeChange = (val) => {
    setUserType(val);
    setFormData({ username: '', password: '' });
    setLoginError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) {
      newErrors.username = userType === 'admin' ? 'Email is required' : 'Unique ID is required';
    }
    if (!formData.password) {
      newErrors.password = userType === 'student' ? 'Password is required' : 'Mobile number is required';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      try {
        const response = await axios.post('http://localhost:8000/api/login', {
          username: formData.username,
          password: formData.password,
          userType: userType
        });

        if (response.data.message === 'Login successful') {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userType', response.data.userType);
          
          if (userType === 'admin' && response.data.ownerName) {
            localStorage.setItem('ownerName', response.data.ownerName);
          }

          handleLogin(userType);
          if (userType === 'admin') {
            navigate('/admin/dashboard');
          } else {
            navigate('/student/dashboard');
          }
        } else {
          setLoginError(response.data.error || 'Invalid credentials');
        }
      } catch (error) {
        if (error.response) {
          setLoginError(error.response.data.error || 'An error occurred while logging in. Please try again.');
        } else {
          setLoginError('An error occurred while logging in. Please try again.');
        }
        console.error('Login error:', error);
      }
    }
  };

  return (
    <div className="login-page">
      <style>
        {`
          .login-page {
            min-height: 100vh;
            display: flex;
            align-items: center;
            background: #ffffff;
          }
          .login-container {
            background: #ffffff;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
          }
          .login-sidebar {
            background: #f8f9fa;
            color: #495057;
            padding: 3rem 2rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .login-form {
            padding: 3rem 2rem;
          }
          .form-control {
            border: none;
            border-bottom: 2px solid #e9ecef;
            border-radius: 0;
            padding: 0.75rem 0;
            transition: all 0.3s ease;
          }
          .form-control:focus {
            box-shadow: none;
            border-color: #007bff;
          }
          .btn-login {
            background: #007bff;
            border: none;
            border-radius: 30px;
            padding: 0.75rem 2rem;
            font-weight: bold;
            transition: all 0.3s ease;
          }
          .btn-login:hover {
            background: #0056b3;
            transform: translateY(-3px);
            box-shadow: 0 4px 12px rgba(0, 123, 255, 0.4);
          }
          .user-type-toggle {
            display: flex;
            justify-content: center;
            margin-bottom: 2rem;
          }
          .user-type-toggle label {
            cursor: pointer;
            padding: 0.5rem 1.5rem;
            border-radius: 30px;
            transition: all 0.3s ease;
            color: #6c757d;
            margin: 0 0.5rem;
            border: 2px solid #e9ecef;
          }
          .user-type-toggle input[type="radio"]:checked + label {
            background-color: #007bff;
            color: white;
            border-color: #007bff;
          }
          .user-type-toggle input[type="radio"] {
            display: none;
          }
          .input-icon {
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            color: #6c757d;
          }
          .form-floating > label {
            left: 1.5rem;
          }
          .login-title {
            color: #007bff;
            font-weight: bold;
            margin-bottom: 1rem;
          }
          .login-subtitle {
            color: #6c757d;
            margin-bottom: 2rem;
          }
        `}
      </style>
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8} xl={7}>
            <div className="login-container">
              <Row className="g-0">
                <Col md={5} className="login-sidebar d-none d-md-flex">
                  <div>
                    <h2 className="login-title">Welcome Back!</h2>
                    <p className="login-subtitle">Access your library account and explore a world of knowledge at your fingertips.</p>
                  </div>
                </Col>
                <Col md={7}>
                  <div className="login-form">
                    <h3 className="text-center mb-4 login-title">Sign In</h3>
                    <div className="user-type-toggle">
                      <input
                        type="radio"
                        id="admin"
                        name="userType"
                        value="admin"
                        checked={userType === 'admin'}
                        onChange={() => handleUserTypeChange('admin')}
                      />
                      <label htmlFor="admin">
                        <FaUserTie className="me-2" />
                        Admin
                      </label>
                      <input
                        type="radio"
                        id="student"
                        name="userType"
                        value="student"
                        checked={userType === 'student'}
                        onChange={() => handleUserTypeChange('student')}
                      />
                      <label htmlFor="student">
                        <FaBookReader className="me-2" />
                        Student
                      </label>
                    </div>
                    <Form onSubmit={handleSubmit}>
                      {/* Username / Unique ID Field */}
                      <Form.Group className="mb-4 position-relative" controlId="formUsername">
                        <Form.Floating>
                          <Form.Control
                            type="text"
                            placeholder={userType === 'admin' ? 'Enter Email ID' : 'Enter Unique ID'}
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            isInvalid={!!errors.username}
                          />
                          <Form.Label>{userType === 'admin' ? 'Email ID' : 'Unique ID'}</Form.Label>
                        </Form.Floating>
                        <FaUser className="input-icon" />
                        <Form.Control.Feedback type="invalid">
                          {errors.username}
                        </Form.Control.Feedback>
                      </Form.Group>

                      {/* Password / Mobile Number Field */}
                      <Form.Group className="mb-4 position-relative" controlId="formPassword">
                        <Form.Floating>
                          <Form.Control
                            type={userType === 'admin' ? 'password' : 'text'}
                            placeholder={userType === 'admin' ? 'Enter Password' : 'Enter Mobile Number'}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            isInvalid={!!errors.password}
                          />
                          <Form.Label>
                            {userType === 'admin' ? 'Password' : 'Mobile Number'}
                          </Form.Label>
                        </Form.Floating>
                        <FaLock className="input-icon" />
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      </Form.Group>

                      {loginError && (
                        <Alert variant="danger" className="mb-4">
                          {loginError}
                        </Alert>
                      )}

                      <div className="d-grid">
                        <Button className="btn-login" type="submit">
                          Sign In
                        </Button>
                      </div>
                    </Form>
                    <div className="text-center mt-4">
                      <a href="#" className="text-decoration-none text-muted">
                        Forgot password?
                      </a>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LogIn;
