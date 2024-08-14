import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAppointmentById, updateAppointment } from "../services/aptService";
import { Button, Form } from "react-bootstrap";
import "./EditApt.css"; // Optional: Add your styles

const EditApt = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState({
    appointmentId: "",
    childId: "",
    doctorId: "",
    appointmentDate: "",
    appointmentTime: "",
    status: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const data = await getAppointmentById(id);
        setAppointment(data);
      } catch (error) {
        setError("Error fetching appointment.");
        console.error("Error fetching appointment:", error);
      }
    };

    fetchAppointment();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateAppointment(id, appointment);
      navigate("/appointments");
    } catch (error) {
      setError("Error updating appointment.");
      console.error("Error updating appointment:", error);
    }
  };

  return (
    <div className="edit-apt-container">
      <h2>Edit Appointment</h2>
      {error && <p className="error">{error}</p>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="appointmentId">
          <Form.Label>ID</Form.Label>
          <Form.Control
            type="text"
            value={appointment.appointmentId}
            readOnly
          />
        </Form.Group>
        <Form.Group controlId="childId">
          <Form.Label>Child ID</Form.Label>
          <Form.Control
            type="number"
            name="childId"
            value={appointment.childId}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="doctorId">
          <Form.Label>Doctor ID</Form.Label>
          <Form.Control
            type="number"
            name="doctorId"
            value={appointment.doctorId}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="appointmentDate">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="appointmentDate"
            value={appointment.appointmentDate}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="appointmentTime">
          <Form.Label>Time</Form.Label>
          <Form.Control
            type="time"
            name="appointmentTime"
            value={appointment.appointmentTime}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="status">
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            name="status"
            value={appointment.status}
            onChange={handleChange}
            required
          >
            <option value="">Select status</option>
            <option value="PENDING">Pending</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELED">Canceled</option>
          </Form.Control>
        </Form.Group>
        <Button variant="success" type="submit">
          Save Changes
        </Button>
        <Button variant="secondary" onClick={() => navigate("/appointments")}>
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default EditApt;
