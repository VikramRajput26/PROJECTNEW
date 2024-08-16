import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createAppointment, updateAppointment, getAppointmentById } from "../services/aptService";
import {  getAllAdminUsers } from "../services/userService";
import "./Appointment.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors(); // Fetch doctors when the component mounts

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
      setSelectedDoctor(data.doctorId); // Set the selected doctor if updating
    } catch (error) {
      console.error("Error fetching appointment:", error);
      toast.error("Failed to fetch appointment details. Please try again.");
    }
  };

  const fetchDoctors = async () => {
    try {
      const adminList = await getAllAdminUsers(); // Fetch doctors (admins)
      if (Array.isArray(adminList) && adminList.length > 0) {
        const doctorList = adminList.map(admin => ({
          id: admin.id,
          name: `${admin.firstName} ${admin.lastName}`
        }));
        setDoctors(doctorList);
      } else {
        console.warn("No doctors available.");
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast.error("Failed to fetch doctors. Please try again.");
    }
  };

  const handleChange = (e) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const appointmentTimeInMinutes = parseInt(appointment.appointmentTime.split(":")[0]) * 60 + parseInt(appointment.appointmentTime.split(":")[1]);
    const startOfDayInMinutes = 9 * 60;
    const endOfDayInMinutes = 18 * 60;

    if (appointmentTimeInMinutes < startOfDayInMinutes || appointmentTimeInMinutes > endOfDayInMinutes) {
      toast.error("Appointment time must be between 9:00 AM and 6:00 PM.");
      return;
    }

    try {
      if (isUpdating) {
        await updateAppointment(appointment.appointmentId, appointment);
        toast.success("Appointment updated successfully!");
      } else {
        await createAppointment(appointment);
        toast.success("Appointment created successfully!");
      }
      navigate("/appointments");
    } catch (error) {
      console.error("Error saving appointment:", error);
      toast.error("Failed to save appointment. Please try again.");
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  const generateTimeSlots = () => {
    const slots = [];
    let startHour = 9;
    let endHour = 18;
    for (let hour = startHour; hour < endHour; hour++) {
      slots.push(`${hour}:00`);
      slots.push(`${hour}:30`);
    }
    slots.push("18:00");
    return [...new Set(slots)];
  };

  const timeSlots = generateTimeSlots();

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
            value={selectedDoctor}
            onChange={(e) => {
              setSelectedDoctor(e.target.value);
              setAppointment({ ...appointment, doctorId: e.target.value });
            }}
            required
          >
            <option value="">Select Doctor</option>
            {doctors.length > 0 ? (
              doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </option>
              ))
            ) : (
              <option value="">No doctors available</option>
            )}
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

          <label htmlFor="appointmentTime">Time Slot:</label>
          <select
            id="appointmentTime"
            name="appointmentTime"
            value={appointment.appointmentTime}
            onChange={handleChange}
            required
          >
            <option value="">Select Time Slot</option>
            {timeSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>

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
            {isUpdating ? "Update Appointment" : "Create Appointment"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Appointment;
