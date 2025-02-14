import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Contact from '../Contact/Contact';
import { AdminManagerServices } from '../Services/Services'; // Correct the import path
import './Home.css'; // Import custom CSS for additional styling

const HomePage = () => {
  return (
    <div>
      <div className="hero">
        <Container className="text-center text-dark">
          <Row className="justify-content-center align-items-center min-vh-100">
            <Col md={8}>
              <h1 className="title">Welcome to PrepZone</h1>
              <h2 className="subtitle">
                Streamlining student attendance and creating personal workspaces for effective study library.
              </h2>
              <p className="quote">
                "Success is the sum of small efforts, repeated day in and day out." - Robert Collier
              </p>
              <Button variant="primary" size="lg" as={Link} to="/register">
                Register Now
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Add Admin/Manager Services section */}
      <div className="services-section">
        <Container>
          <Row>
            <Col>
              <AdminManagerServices />
              <Contact />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default HomePage;
