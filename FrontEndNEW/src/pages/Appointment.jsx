import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  createAppointment,
  updateAppointment,
  getAppointmentById,
} from "../services/aptService";
import "./Appointment.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const doctors = [
  { id: 4, name: "Dr. Ujjwalla Keskar" },
  { id: 5, name: "Dr. Vidyadevi Gutte" },
  { id: 6, name: "Dr. Sumit Desai" },
];

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
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve childId from localStorage and set it in the state
    const storedChildId = localStorage.getItem("childId");
    if (storedChildId) {
      setAppointment((prevAppointment) => ({
        ...prevAppointment,
        childId: storedChildId,
      }));
    }

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

    // Validate appointment time
    const [hours, minutes] = appointment.appointmentTime.split(":").map(Number);
    const appointmentTimeInMinutes = hours * 60 + minutes;
    const startOfDayInMinutes = 9 * 60; // 9 AM
    const endOfDayInMinutes = 18 * 60; // 6 PM

    if (
      appointmentTimeInMinutes < startOfDayInMinutes ||
      appointmentTimeInMinutes > endOfDayInMinutes
    ) {
      toast.error("Appointment time must be between 9:00 AM and 6:00 PM.");
      return;
    }

    try {
      if (isUpdating) {
        await updateAppointment(appointment.appointmentId, appointment);
      } else {
        await createAppointment(appointment);
      }
      navigate("/appointments");
    } catch (error) {
      console.error("Error saving appointment:", error);
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="appointment-container">
      <button className="back-to-home" onClick={handleBackToHome}>
        Back to Home
      </button>
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

          <label htmlFor="doctorId">Doctor:</label>
          <select
            id="doctorId"
            name="doctorId"
            value={appointment.doctorId}
            onChange={handleChange}
            required
          >
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            ))}
          </select>

          <label htmlFor="appointmentDate">Date:</label>
          <input
            type="date"
            id="appointmentDate"
            name="appointmentDate"
            value={appointment.appointmentDate}
            onChange={handleChange}
            required
          />

          <label htmlFor="appointmentTime">Time (hh:mm):</label>
          <input
            type="time"
            id="appointmentTime"
            name="appointmentTime"
            value={appointment.appointmentTime}
            onChange={handleChange}
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
      <ToastContainer />
    </div>
  );
};

export default Appointment;
