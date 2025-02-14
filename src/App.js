import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import AboutPage from './Pages/About/AboutPage';
import Contact from './Pages/Contact/Contact';
import Admin_Dash from './Pages/Dashboard/Admin_Dash';
import Student_Dash from './Pages/Dashboard/Student_Dash';
import HomePage from './Pages/Home/Home';
import LogIn from './Pages/LogIn/LogIn';
import RegisterPage from './Pages/Register/Register';
import Services from './Pages/Services/Services';
import StudentsPresent from './Pages/Dash_Details/StudentsPresent';
import SeatManagement from './Pages/Dash_Details/SeatManagement';
import DailyAttendance from './Pages/Dash_Details/DailyAttendance';
import Analytics from './Pages/Dash_Details/Analytics';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', role);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
  };

  // Protected Route component for admin-only routes
  const AdminRoute = ({ children }) => {
    if (!isLoggedIn || userRole !== 'admin') {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Router>
      <div className="App">
        <Header isLoggedIn={isLoggedIn} userRole={userRole} onLogout={handleLogout} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LogIn handleLogin={handleLogin} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<Services />} />
            
            {/* Admin Dashboard and its protected routes */}
            <Route 
              path="/admin/dashboard" 
              element={
                isLoggedIn && userRole === 'admin' ? (
                  <Admin_Dash />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/students-present"
              element={
                <AdminRoute>
                  <StudentsPresent />
                </AdminRoute>
              }
            />
            <Route
              path="/seat-management"
              element={
                <AdminRoute>
                  <SeatManagement />
                </AdminRoute>
              }
            />
            <Route
              path="/daily-attendance"
              element={
                <AdminRoute>
                  <DailyAttendance />
                </AdminRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <AdminRoute>
                  <Analytics />
                </AdminRoute>
              }
            />

            {/* Student Dashboard */}
            <Route 
              path="/student/dashboard" 
              element={
                isLoggedIn && userRole === 'student' ? (
                  <Student_Dash />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;