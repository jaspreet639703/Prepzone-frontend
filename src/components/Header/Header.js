import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png'; // Correct import statement for the image
import './Header.css';

const Header = () => {
  return (
    <Navbar bg="light" variant="light" expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand href="#home" className="brand-logo">
          <img
            src={logo}
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt="Brand logo"
          />
          {' '}
          Prep Zone
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/services">Services</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          </Nav>
          <Button variant="outline-primary" as={Link} to="/LogIn" className="ml-3">Login</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
