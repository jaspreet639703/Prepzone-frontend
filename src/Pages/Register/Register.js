import React, { useState } from 'react';
import { Button, Col, Container, Form, Row, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaUser, FaEnvelope, FaLock, FaPhone, FaChair, FaBuilding } from 'react-icons/fa';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    libraryName: '',
    ownerName: '',
    seatsAvailable: '',
    mobileNumber: '',
    email: '',
    password: '',
    address: '',
    latitude: '',
    longitude: ''
  });
  const [locationStatus, setLocationStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(''); // Clear error when user makes changes
  };

  const getLocation = () => {
    setLocationStatus('Fetching location...');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }));
          setLocationStatus('Location fetched successfully!');
        },
        (error) => {
          switch(error.code) {
            case error.PERMISSION_DENIED:
              setLocationStatus('Location permission denied');
              break;
            case error.POSITION_UNAVAILABLE:
              setLocationStatus('Location information unavailable');
              break;
            case error.TIMEOUT:
              setLocationStatus('Location request timed out');
              break;
            default:
              setLocationStatus('Error getting location');
          }
          console.error('Geolocation error:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      setLocationStatus('Geolocation is not supported by your browser');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate all required fields
      if (!formData.libraryName || !formData.ownerName || !formData.seatsAvailable || 
          !formData.mobileNumber || !formData.email || !formData.password || !formData.address) {
        throw new Error('All fields are required');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Invalid email format');
      }

      // Validate mobile number (10 digits)
      const mobileRegex = /^[0-9]{10}$/;
      if (!mobileRegex.test(formData.mobileNumber)) {
        throw new Error('Mobile number must be 10 digits');
      }

      // Validate seats (positive number)
      if (isNaN(formData.seatsAvailable) || formData.seatsAvailable <= 0) {
        throw new Error('Number of seats must be a positive number');
      }

      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('userType', 'admin');
      navigate('/admin/dashboard');

    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="register-card">
              <Card.Body>
                <h2 className="text-center mb-4">Register Your Library</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaBuilding />
                      </span>
                      <Form.Control
                        type="text"
                        placeholder="Enter Library Name"
                        name="libraryName"
                        value={formData.libraryName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaUser />
                      </span>
                      <Form.Control
                        type="text"
                        placeholder="Enter Owner Name"
                        name="ownerName"
                        value={formData.ownerName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaChair />
                      </span>
                      <Form.Control
                        type="number"
                        placeholder="Enter No. of Seats"
                        name="seatsAvailable"
                        value={formData.seatsAvailable}
                        onChange={handleChange}
                        required
                        min="1"
                      />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaPhone />
                      </span>
                      <Form.Control
                        type="tel"
                        placeholder="Enter Mobile Number"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        required
                        pattern="[0-9]{10}"
                      />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaEnvelope />
                      </span>
                      <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaLock />
                      </span>
                      <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength="6"
                      />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter Address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="address-textarea"
                    />
                  </Form.Group>

                  <div className="location-section mb-4">
                    <Button 
                      variant="outline-primary" 
                      type="button" 
                      onClick={getLocation}
                      className="location-button"
                      disabled={loading}
                    >
                      <FaMapMarkerAlt /> Fetch Library Location
                    </Button>
                    
                    {locationStatus && (
                      <div className={`location-status mt-2 ${locationStatus.includes('successfully') ? 'text-success' : 'text-danger'}`}>
                        <FaMapMarkerAlt /> {locationStatus}
                      </div>
                    )}
                    
                    {formData.latitude && formData.longitude && (
                      <div className="coordinates-display mt-2">
                        <small className="text-muted">
                          Location coordinates: {formData.latitude.toFixed(6)}, {formData.longitude.toFixed(6)}
                        </small>
                      </div>
                    )}
                  </div>

                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="w-100 register-button"
                    disabled={loading}
                  >
                    {loading ? 'Registering...' : 'Register Library'}
                  </Button>

                  <div className="text-center mt-3">
                    <small className="text-muted">
                      Already have an account? <a href="/LogIn">Log In</a>
                    </small>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
