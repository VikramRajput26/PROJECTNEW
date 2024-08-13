import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  createAppointment,
  updateAppointment,
  getAppointmentById,
} from "../services/aptService";
import "./Appointment.css";

const Appointment = () => {
  const [appointment, setAppointment] = useState({
    appointmentId: 0,
    childId: "",
    doctorId: "",
    appointmentDate: "",
    appointmentTime: "",
    status: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const { id } = useParams(); // Use useParams to get route parameters
  const navigate = useNavigate(); // Use useNavigate for programmatic navigation

  useEffect(() => {
    if (id) {
      setIsUpdating(true);
      fetchAppointment(id);
    }
  }, [id]);

  const fetchAppointment = async (id) => {
    try {
      const data = await getAppointmentById(id);
      setAppointment({
        appointmentId: data.appointmentId,
        childId: data.childId,
        doctorId: data.doctorId,
        appointmentDate: data.appointmentDate,
        appointmentTime: data.appointmentTime,
        status: data.status,
      });
    } catch (error) {
      console.error("Error fetching appointment:", error);
    }
  };

  const handleChange = (e) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isUpdating) {
        await updateAppointment(appointment.appointmentId, appointment);
      } else {
        await createAppointment(appointment);
      }
      navigate("/appointments"); // Use navigate instead of history.push
    } catch (error) {
      console.error("Error saving appointment:", error);
    }
  };

  return (
    <div className="appointment-form">
      <h2>{isUpdating ? "Update Appointment" : "Create Appointment"}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="childId">Child ID:</label>
        <input
          type="number"
          id="childId"
          name="childId"
          value={appointment.childId}
          onChange={handleChange}
          required
        />

        <label htmlFor="doctorId">Doctor ID:</label>
        <input
          type="number"
          id="doctorId"
          name="doctorId"
          value={appointment.doctorId}
          onChange={handleChange}
          required
        />

        <label htmlFor="appointmentDate">Date:</label>
        <input
          type="date"
          id="appointmentDate"
          name="appointmentDate"
          value={appointment.appointmentDate}
          onChange={handleChange}
          required
        />

        <label htmlFor="appointmentTime">Time (hh:mm AM/PM):</label>
        <input
          type="time"
          id="appointmentTime"
          name="appointmentTime"
          value={appointment.appointmentTime}
          onChange={handleChange}
          placeholder="e.g., 10:30 AM"
          required
        />

        <label htmlFor="status">Status:</label>
        <select
          id="status"
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
        </select>

        <button type="submit">
          {isUpdating ? "Update" : "Create"} Appointment
        </button>
      </form>
    </div>
  );
};

export default Appointment;
