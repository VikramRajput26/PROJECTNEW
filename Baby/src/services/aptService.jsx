import { myAxios } from './helper';

// Create an appointment
export const createAppointment = async (appointment) => {
  try {
    const response = await myAxios.post('/appointments/createapt', appointment);
    return response.data;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
};

// Get an appointment by ID
export const getAppointmentById = async (id) => {
  try {
    const response = await myAxios.get(`/appointments/getById/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching appointment:', error);
    throw error;
  }
};

// Get all appointments
export const getAllAppointments = async () => {
  try {
    const response = await myAxios.get('/appointments/getallapt');
    return response.data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

// Update an appointment
export const updateAppointment = async (id, appointment) => {
  try {
    const response = await myAxios.put(`/appointments/updatapt/${id}`, appointment);
    return response.data;
  } catch (error) {
    console.error('Error updating appointment:', error);
    throw error;
  }
};

// Delete an appointment
export const deleteAppointment = async (id) => {
  try {
    await myAxios.delete(`/appointments/deleteapt/${id}`);
  } catch (error) {
    console.error('Error deleting appointment:', error);
    throw error;
  }
};
