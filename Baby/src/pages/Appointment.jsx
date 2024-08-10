import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  createAppointment,
  getAppointmentById,
  getAllAppointments,
  updateAppointment,
  deleteAppointment
} from '../services/aptService';
import { getChildById } from '../services/childService';
import { getVaccineById } from '../services/vaccineService';
import './Appointment.css'; // Import the CSS file
import { toast } from 'react-toastify'; // Import toast for notifications

const Appointment = () => {
  const [appointment, setAppointment] = useState({
    appointmentId: 0,
    childId: '',
    doctorId: '',
    vaccineId: '',
    appointmentDate: '',
    reason: '',
    status: ''
  });
  const [appointments, setAppointments] = useState([]);
  const [child, setChild] = useState(null);
  const [vaccine, setVaccine] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchAppointment(id);
    } else {
      fetchAppointments();
    }
  }, [id]);

  const fetchAppointment = async (id) => {
    try {
      const response = await getAppointmentById(id);
      setAppointment(response);
      setIsEditing(true);

      const childResponse = await getChildById(response.childId);
      setChild(childResponse);

      const vaccineResponse = await getVaccineById(response.vaccineId);
      setVaccine(vaccineResponse);
    } catch (error) {
      console.error('Error fetching appointment:', error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await getAllAppointments();
      setAppointments(response);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment((prevAppointment) => ({
      ...prevAppointment,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateAppointment(appointment.appointmentId, appointment);
        toast.success('Appointment updated successfully!');
      } else {
        await createAppointment(appointment);
        toast.success('Appointment created successfully!');
      }
      fetchAppointments();
      navigate('/appointments');
    } catch (error) {
      console.error('Error submitting appointment:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAppointment(id);
      fetchAppointments(); // Refresh the list of appointments
      toast.success('Appointment deleted successfully!');
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  return (
    <div className="appointment-container">
      <h2>{isEditing ? 'Edit Appointment' : 'Create Appointment'}</h2>
      <Link to="/" className="back-button"> {/* Navigate to the home page */}
        Back to Home
      </Link>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Child ID:</label>
          <input
            type="text"
            name="childId"
            value={appointment.childId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Doctor ID:</label>
          <input
            type="text"
            name="doctorId"
            value={appointment.doctorId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Vaccine ID:</label>
          <input
            type="text"
            name="vaccineId"
            value={appointment.vaccineId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Appointment Date:</label>
          <input
            type="date"
            name="appointmentDate"
            value={appointment.appointmentDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Reason:</label>
          <input
            type="text"
            name="reason"
            value={appointment.reason}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <input
            type="text"
            name="status"
            value={appointment.status}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{isEditing ? 'Update Appointment' : 'Create Appointment'}</button>
      </form>

      {isEditing && (
        <div className="details-section">
          <h2>Details</h2>
          <div>
            <h3>Child Details</h3>
            {child ? (
              <div>
                <p>ID: {child.childId}</p>
                <p>First Name: {child.firstName}</p>
                <p>Last Name: {child.lastName}</p>
                <p>Date of Birth: {child.dateOfBirth}</p>
                <p>Gender: {child.gender}</p>
                <p>Blood Type: {child.bloodType}</p>
              </div>
            ) : (
              <p>Loading child details...</p>
            )}
          </div>

          <div>
            <h3>Vaccine Details</h3>
            {vaccine ? (
              <div>
                <p>ID: {vaccine.vaccineId}</p>
                <p>Name: {vaccine.vaccineName}</p>
                <p>Description: {vaccine.description}</p>
                <p>Recommended Age: {vaccine.recommendedAge}</p>
                <p>Side Effects: {vaccine.sideEffects}</p>
              </div>
            ) : (
              <p>Loading vaccine details...</p>
            )}
          </div>
        </div>
      )}

      <div className="appointments-list">
        <h2>All Appointments</h2>
        <ul>
          {appointments.map((appt) => (
            <li key={appt.appointmentId}>
              {`ID: ${appt.appointmentId}, Child ID: ${appt.childId}, Doctor ID: ${appt.doctorId}, Vaccine ID: ${appt.vaccineId}, Date: ${appt.appointmentDate}, Reason: ${appt.reason}, Status: ${appt.status}`}
              <div className="button-group">
                <Link to={`/appointments/${appt.appointmentId}`} className="edit-button">Edit</Link>
                <button className="delete-button" onClick={() => handleDelete(appt.appointmentId)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Appointment;
