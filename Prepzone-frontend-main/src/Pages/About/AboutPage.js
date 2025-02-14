import React from 'react';
import { Accordion, Button, Card, Col, Container, Row } from 'react-bootstrap';
import './AboutPage.css'; // Import custom CSS file

const AboutPage = () => {
  return (
    <Container className="my-5">
      <div className="custom-jumbotron text-center">
        <h1>Welcome to PrepZone.ai</h1>
        <p>Streamlining library management and enhancing student experiences</p>
        <Button variant="primary" href="#learn-more">Learn More</Button>
      </div>

      <Row className="my-4">
        <Col>
          <h2 className="text-center">Our Features</h2>
          <Accordion defaultActiveKey="0">
            <Card>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Manager Portal</Accordion.Header>
                <Accordion.Body>
                  Our Manager Portal provides comprehensive tools for library administration:
                  <ul>
                    <li>Automated attendance management through location access and sensors.</li>
                    <li>Efficiently manage seat availability.</li>
                    <li>Access a comprehensive dashboard with insightful analytical reports.</li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            </Card>

            <Card>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Student Portal</Accordion.Header>
                <Accordion.Body>
                  The Student Portal offers a user-friendly interface for managing library interactions:
                  <ul>
                    <li>Secure login with unique library ID and password.</li>
                    <li>Track exam preparation and receive tailored resources.</li>
                    <li>Generate personalized study schedules.</li>
                    <li>Automated attendance management through location access and sensors.</li>
                    <li>Generate detailed progress reports.</li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            </Card>
          </Accordion>
        </Col>
      </Row>

      <Row className="my-4">
        <Col>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Benefits</Card.Title>
              <Card.Text>
                Our system offers numerous benefits:
                <ul>
                  <li>Automates attendance management, eliminating manual entries.</li>
                  <li>Reduces manpower needs, enhancing efficiency.</li>
                  <li>Ensures accurate and streamlined record-keeping.</li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Our Mission</Card.Title>
              <Card.Text>
                We aim to connect city libraries through our franchise system, providing:
                <ul>
                  <li>Effective advertising to increase library admissions.</li>
                  <li>Simplified admission process for students.</li>
                  <li>Easy access to preferred libraries, fostering a community of learners.</li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="my-4">
        <Col>
          <h2 className="text-center">Frequently Asked Questions (FAQ)</h2>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>How do I log in to the Student Portal?</Accordion.Header>
              <Accordion.Body>
                To log in to the Student Portal, use the unique library ID and password provided during registration. If you encounter any issues, please contact your library administrator for assistance.
              </Accordion.Body>
            </Accordion.Item>
            
            <Accordion.Item eventKey="1">
              <Accordion.Header>How is attendance managed?</Accordion.Header>
              <Accordion.Body>
                Attendance is managed automatically through location access and sensors. This ensures accurate tracking of student presence without the need for manual entries.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>What features are available in the Manager Portal?</Accordion.Header>
              <Accordion.Body>
                The Manager Portal offers tools for monitoring student presence, managing seat availability, and accessing analytical reports through a comprehensive dashboard.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
              <Accordion.Header>Can I generate a progress report for students?</Accordion.Header>
              <Accordion.Body>
                Yes, the Student Portal allows students to generate detailed progress reports based on their attendance and exam preparation activities.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="4">
              <Accordion.Header>How does the system help in library management?</Accordion.Header>
              <Accordion.Body>
                The system automates attendance management, reduces manpower needs, and ensures accurate record-keeping. It also connects city libraries through a franchise system, simplifying admissions and fostering a community of learners.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutPage;
