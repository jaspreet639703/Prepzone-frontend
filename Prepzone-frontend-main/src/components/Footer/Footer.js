import React from 'react';
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Footer.css'; // Ensure this is the correct path to your CSS file

const Footer = () => {
  return (
    <Navbar className="footer">
      <Container>
        <Row className="text-center text-md-left">
          <Col md={3} className="mb-4">
            <h5 className="footer-title">About PrepZone</h5>
            <p className="footer-text">
              Empowering students to excel in competitive exams with seamless attendance management.
            </p>
          </Col>
          <Col md={3} className="mb-4">
            <h5 className="footer-title">Quick Links</h5>
            <ul className="list-unstyled footer-links">
              <li>
                <Nav.Link as={Link} to="/" className="footer-link">Home</Nav.Link>
              </li>
              <li>
                <Nav.Link as={Link} to="/about" className="footer-link">About Us</Nav.Link>
              </li>
              <li>
                <Nav.Link as={Link} to="/services" className="footer-link">Services</Nav.Link>
              </li>
              <li>
                <Nav.Link as={Link} to="/contact" className="footer-link">Contact</Nav.Link>
              </li>
            </ul>
          </Col>
          <Col md={3} className="mb-4">
            <h5 className="footer-title">Contact Us</h5>
            <p className="footer-text">
              <strong>Email:</strong> <a href="mailto:saneeipk@gmail.com" className="footer-link">saneeipk@gmail.com</a>
            </p>
            <p className="footer-text">
              <strong>Mobile:</strong> <a href="tel:+919982385483" className="footer-link">9982385483</a>
            </p>
            <p className="footer-text">
              <strong>Location:</strong> Lucknow
            </p>
          </Col>
          <Col md={3} className="mb-4">
            <h5 className="footer-title">Follow Us</h5>
            <div className="footer-icons">
              <a href="https://www.facebook.com" className="footer-icon"><FaFacebookF /></a>
              <a href="https://www.twitter.com" className="footer-icon"><FaTwitter /></a>
              <a href="https://www.instagram.com" className="footer-icon"><FaInstagram /></a>
              <a href="https://www.linkedin.com" className="footer-icon"><FaLinkedin /></a>
            </div>
          </Col>
        </Row>
      </Container>
      <Row className="footer-bottom">
          <Col>
            <p className="footer-copy">&copy; {new Date().getFullYear()} PrepZone. All Rights Reserved.</p>
          </Col>
      </Row>
    </Navbar>
  );
};

export default Footer;
