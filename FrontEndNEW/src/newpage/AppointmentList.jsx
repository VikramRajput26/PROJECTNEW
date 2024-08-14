// AppointmentList.jsx
import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { getAllAppointments } from "../services/aptService";
import { useNavigate } from "react-router-dom";
import "./AppointmentList.css";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAllAppointments();
        setAppointments(data);
      } catch (error) {
        setError("Error fetching appointments.");
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);
  const handleBackToHome = () => {
    navigate("/");
  };

  const handleViewDetails = (id) => {
    navigate(`/appointments/${id}`);
  };

  const handleEditAppointment = (id) => {
    navigate(`/appointments/edit/${id}`);
  };

  return (
    <div className="appointment-list-container">
      <h2>Appointment List</h2>
      {error && <p className="error">{error}</p>}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Child ID</th>
            <th>Doctor ID</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.appointmentId}>
              <td>{appointment.appointmentId}</td>
              <td>{appointment.childId ?? "N/A"}</td>{" "}
              {/* Display N/A if childId is null */}
              <td>{appointment.doctorId ?? "N/A"}</td>{" "}
              {/* Display N/A if doctorId is null */}
              <td>{appointment.appointmentDate}</td>
              <td>{appointment.appointmentTime}</td>
              <td>{appointment.status}</td>
              <td>
                <Button
                  variant="info"
                  onClick={() => handleViewDetails(appointment.appointmentId)}
                >
                  View
                </Button>
                <Button
                  variant="warning"
                  onClick={() =>
                    handleEditAppointment(appointment.appointmentId)
                  }
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button
        variant="success"
        className="back-to-home-button"
        onClick={handleBackToHome}
      >
        Back to Home
      </Button>
    </div>
  );
};

export default AppointmentList;
