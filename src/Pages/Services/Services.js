import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import './Services.css'; // Import custom CSS for additional styling
import StudPresentImage from '../../assets/images/Stud_present.png';
import Course from '../../assets/images/course.png';
import LogIn from '../../assets/images/Login.png';
import Report from '../../assets/images/report.png';
import seat from '../../assets/images/seat.png';
import DashboardImage from '../../assets/images/dashboard.png';
import St_Dash from '../../assets/images/St_Dash.png'
import French from '../../assets/images/french.png'
import City from '../../assets/images/city.png'
import Advert from '../../assets/images/advert.png'
import Manual from '../../assets/images/manual.png'



const services = [
  {
    title: "Admin/Manager Portal Services",
    details: [
      {
        name: "Student Presence Tracking",
        description: "Empower admins and managers to monitor the real-time presence of students within the library premises.",
        image: StudPresentImage
      },
      {
        name: "Seat Availability Management",
        description: "Facilitate efficient seat allocation by allowing admins and managers to check and manage the availability of seats easily.",
        image: seat
      },
      {
        name: "Dashboard and Data Analysis",
        description: "Access a robust dashboard offering comprehensive analytical data on library usage, student attendance, and more, enabling informed decision-making.",
        image: DashboardImage
      },
      {
        name: "Daily Attendance Portal",
        description: "Leverage automatic attendance tracking through location access and sensors, ensuring accurate and real-time monitoring.",
        image: StudPresentImage
      },
      {
        name: "Analysis Report Generation",
        description: "Generate detailed analytical reports for admins and managers, providing insights into student availability, attendance trends, and other key metrics.",
        image: Report
      }
    ]
  },
  {
    title: "Student Portal Services",
    details: [
      {
        name: "Login and Authentication",
        description: "Secure student access through unique library IDs and passwords, ensuring privacy and security.",
        image: LogIn
      },
      {
        name: "Exam Preparation Tracking",
        description: "Allow students to specify the exams they are preparing for, helping tailor their study plans.",
        image: St_Dash
      },
      {
        name: "Competitive Course Details",
        description: "Provide students with information on competitive courses, assisting in the creation of effective daily study schedules.",
        image: Course
      },
      {
        name: "Daily Attendance Portal",
        description: "Automate attendance management with location access and sensor technology, ensuring precision and ease.",
        image: StudPresentImage
      },
      {
        name: "Progress Report Generation",
        description: "Enable students to generate progress reports based on their attendance and study schedules, fostering self-improvement and accountability.",
        image: Report
      }
    ]
  },
  {
    title: "Additional Services and Features",
    details: [
      {
        name: "Centralized Franchise System",
        description: "Connect libraries across various cities into a single, cohesive system, making it easier for students to find and join libraries based on their preferences.",
        image: French
      },
      {
        name: "Advertising and Promotion",
        description: "Increase library admissions through targeted advertising and promotional activities, attracting more students to the facilities.",
        image: Advert
      },
      {
        name: "Elimination of Manual Record Keeping",
        description: "Reduce manpower requirements by automating record-keeping processes, streamlining operations and cutting costs.",
        image: Manual
      }
    ]
  },
  {
    title: "Main Objectives",
    details: [
      {
        name: "Enhance Library Management",
        description: "Provide tools and insights for better resource management and efficient oversight of student activities.",
        image: DashboardImage
      },
      {
        name: "Improve Student Learning Experience",
        description: "Offer features that support students in exam preparation and study planning, enhancing their overall learning experience.",
        image: St_Dash
      },
      {
        name: "Connect Libraries Across Cities",
        description: "Create a franchise system that interconnects multiple libraries, providing a unified and consistent experience for students nationwide.",
        image: City
      }
    ]
  }
];

const Services = () => (
  <Container className="mt-5">
    {services.map((service, index) => (
      <div key={index}>
        <h2 className="service-title mb-4">{service.title}</h2>
        <Row>
          {service.details.map((detail, idx) => (
            <Col md={6} lg={4} key={idx} className="mb-4">
              <Card className="h-100 shadow-sm border-0">
                <Card.Img variant="top" src={detail.image} />
                <Card.Body>
                  <Card.Title className="text-primary">{detail.name}</Card.Title>
                  <Card.Text>{detail.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    ))}
  </Container>
);

export const AdminManagerServices = () => (
  <Container className="mt-5">
    <h2 className="text-center mb-4">Our Services</h2>
    <div>
      <h2 className="service-title mb-4">{services[0].title}</h2>
      <Row>
        {services[0].details.map((detail, idx) => (
          <Col md={6} lg={4} key={idx} className="mb-4">
            <Card className="h-100 shadow-sm border-0">
              <Card.Img variant="top" src={detail.image} />
              <Card.Body>
                <Card.Title className="text-primary">{detail.name}</Card.Title>
                <Card.Text>{detail.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  </Container>
);

export default Services;
