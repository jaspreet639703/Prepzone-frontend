import React, { useState, useEffect } from 'react';
import { Card, Progress, Button, Input, message } from 'antd';
import axios from 'axios';
import io from 'socket.io-client';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom'; 
import './SeatManagement.css';

const SeatManagement = () => {
  const [totalSeats, setTotalSeats] = useState(0);
  const [occupiedSeats, setOccupiedSeats] = useState(0);
  const [newSeatCount, setNewSeatCount] = useState('');
  const [loading, setLoading] = useState(true);
  const [sectionA, setSectionA] = useState(
    Array(30).fill(null).map((_, index) => ({
      id: `A${String(index + 1).padStart(2, '0')}`,
      isOccupied: Math.random() > 0.7
    }))
  );

  const [sectionB, setSectionB] = useState(
    Array(70).fill(null).map((_, index) => ({
      id: `B${String(index + 1).padStart(2, '0')}`,
      isOccupied: Math.random() > 0.7
    }))
  );

  useEffect(() => {
    const socket = io('http://localhost:8000');
    fetchSeatData();

    socket.on('seatsUpdated', (data) => {
      setTotalSeats(data.totalSeats);
      setOccupiedSeats(data.totalSeats - data.availableSeats);
    });

    socket.on('attendanceUpdated', (data) => {
      fetchSeatData(); // Refresh data when attendance changes
    });

    socket.on('studentsUpdated', (data) => {
      fetchSeatData(); // Refresh data when students are added/removed
    });

    return () => socket.disconnect();
  }, []);

  const fetchSeatData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/admin/seats', {
        headers: { Authorization: token }
      });
      
      setTotalSeats(response.data.totalSeats);
      setOccupiedSeats(response.data.totalSeats - response.data.availableSeats);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching seat data:', error);
      message.error('Failed to fetch seat data');
      setLoading(false);
    }
  };

  const updateSeats = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8000/api/admin/seats', 
        { totalSeats: parseInt(newSeatCount) },
        { headers: { Authorization: token } }
      );
      
      message.success('Seats updated successfully');
      setNewSeatCount('');
    } catch (error) {
      console.error('Error updating seats:', error);
      message.error('Failed to update seats');
    }
  };

  const availableSeats = totalSeats - occupiedSeats;
  const occupancyRate = totalSeats > 0 ? (occupiedSeats / totalSeats) * 100 : 0;

  const toggleSeat = (section, index) => {
    if (section === 'A') {
      const newSeats = [...sectionA];
      newSeats[index] = {
        ...newSeats[index],
        isOccupied: !newSeats[index].isOccupied
      };
      setSectionA(newSeats);
    } else {
      const newSeats = [...sectionB];
      newSeats[index] = {
        ...newSeats[index],
        isOccupied: !newSeats[index].isOccupied
      };
      setSectionB(newSeats);
    }
  };

  return (
    <div className="container py-4">
      <div className="card shadow">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="card-title mb-0">Seat Management</h2>
          <div className="mt-6">
            <Link 
              to="/admin/dashboard"
              className="btn btn-outline-primary btn-sm"
            >
              <ArrowLeft className="me-2" size={16} />
              Back to Dashboard
            </Link>
          </div>
        </div>

        <div className="card-body">
          {/* Stats */}
          <div className="row g-4 mb-4">
            <div className="col-md-4">
              <div className="stats-card stats-total p-3 text-center">
                <div className="stats-number">{totalSeats}</div>
                <div className="stats-label">Total Seats</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="stats-card stats-available p-3 text-center">
                <div className="stats-number">{availableSeats}</div>
                <div className="stats-label">Available Seats</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="stats-card stats-occupied p-3 text-center">
                <div className="stats-number">{occupiedSeats}</div>
                <div className="stats-label">Occupied Seats</div>
              </div>
            </div>
          </div>

          {/* Section Title */}
          <h3 className="mb-4">Booked / Available Seat's</h3>

          {/* Section A Seats */}
          <div className="seats-container mb-4">
            <div className="row g-2">
              {sectionA.map((seat, index) => (
                <div key={seat.id} className="col">
                  <button
                    onClick={() => toggleSeat('A', index)}
                    className={`seat-btn ${seat.isOccupied ? 'occupied' : 'available'}`}
                  >
                    <svg viewBox="0 0 24 24" className="seat-icon">
                      <path d="M19 13V5c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v8c-1.1 0-2 .9-2 2v4h4v-3h10v3h4v-4c0-1.1-.9-2-2-2M7 5h10v8H7V5Z"/>
                    </svg>
                    <span className="seat-label">{seat.id}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section B Seats */}
          <div className="seats-container mb-4">
            <div className="row g-2">
              {sectionB.map((seat, index) => (
                <div key={seat.id} className="col">
                  <button
                    onClick={() => toggleSeat('B', index)}
                    className={`seat-btn ${seat.isOccupied ? 'occupied' : 'available'}`}
                  >
                    <svg viewBox="0 0 24 24" className="seat-icon">
                      <path d="M19 13V5c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v8c-1.1 0-2 .9-2 2v4h4v-3h10v3h4v-4c0-1.1-.9-2-2-2M7 5h10v8H7V5Z"/>
                    </svg>
                    <span className="seat-label">{seat.id}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="d-flex justify-content-center gap-3">
            <span className="badge bg-success p-2">Available</span>
            <span className="badge bg-danger p-2">Occupied</span>
          </div>

          <div className="seat-management">
            <Card title="Seat Management" className="seat-card">
              <div className="seat-stats">
                <div className="stat-item">
                  <h3>Total Seats</h3>
                  <p>{totalSeats}</p>
                </div>
                <div className="stat-item">
                  <h3>Occupied Seats</h3>
                  <p>{occupiedSeats}</p>
                </div>
                <div className="stat-item">
                  <h3>Available Seats</h3>
                  <p>{availableSeats}</p>
                </div>
              </div>

              <div className="occupancy-progress">
                <h3>Occupancy Rate</h3>
                <Progress
                  type="circle"
                  percent={Math.round(occupancyRate)}
                  format={percent => `${percent}%`}
                  status={occupancyRate >= 90 ? 'exception' : 'normal'}
                />
              </div>

              <div className="seat-update">
                <Input
                  type="number"
                  value={newSeatCount}
                  onChange={e => setNewSeatCount(e.target.value)}
                  placeholder="Enter new seat count"
                  style={{ width: 200, marginRight: 16 }}
                  min={1}
                />
                <Button 
                  type="primary"
                  onClick={updateSeats}
                  disabled={!newSeatCount || newSeatCount < 1}
                >
                  Update Seats
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatManagement;
