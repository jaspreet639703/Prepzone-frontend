import React from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import './Contact.css';

const Contact = () => {
  return (
    <Container className="container">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="contact-card">
            <Card.Body>
              <Row>
                <Col md={6} className="contact-details">
                  <h1>Contact Us</h1>
                  <p><strong>PrepZone.ai</strong></p>
                  <p>21-B, Rahul Nagar, Agra 202801</p>
                  <p>Email: <a href="mailto:saneeipk@gmail.com">saneeipk@gmail.com</a></p>
                  <p>Phone: <a href="tel:9982385483">9982385483</a></p>
                  <div className="map-embed">
                    <span className="ant-descriptions-item-content">
                      <iframe 
                        src="https://maps.google.com/maps?q=27.150215622281355,77.97939898042797&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=&amp;output=embed" 
                        width="100%" 
                        height="250" 
                        frameBorder="0" 
                        style={{ border: 0 }} 
                        allowFullScreen
                        title="Location Map"
                      ></iframe>
                    </span>
                  </div>
                </Col>
                <Col md={6} className="form-section">
                  <h2>Get in Touch</h2>
                  <Form>
                    <Form.Group controlId="formName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter your name" className="form-control" />
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" placeholder="Enter your email" className="form-control" />
                    </Form.Group>

                    <Form.Group controlId="formMessage">
                      <Form.Label>Message</Form.Label>
                      <Form.Control as="textarea" rows={3} placeholder="Enter your message" className="form-control" />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="submit-button">
                      Submit
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;
