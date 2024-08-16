import { myAxios } from "./helper";

// Create an appointment
export const createAppointment = async (appointment) => {
  try {
    const response = await myAxios.post("/api/appointments/create", appointment);
    return response.data;
  } catch (error) {
    console.error("Error creating appointment:", error);
    throw error; // Ensure error is properly caught in the component
  }
};

// Update an existing appointment
export const updateAppointment = async (id, appointment) => {
  try {
    const response = await myAxios.put(`/api/appointments/update/${id}`, appointment);
    return response.data;
  } catch (error) {
    console.error("Error updating appointment:", error);
    throw error; // Ensure error is properly caught in the component
  }
};

// Delete an appointment by ID
export const deleteAppointment = async (id) => {
  try {
    await myAxios.delete(`/api/appointments/delete/${id}`);
  } catch (error) {
    console.error("Error deleting appointment:", error);
    throw error; // Ensure error is properly caught in the component
  }
};

// Get an appointment by ID
export const getAppointmentById = async (id) => {
  try {
    const response = await myAxios.get(`/api/appointments/getbyid/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error in getAppointmentById:", error.response ? error.response.data : error.message);
    throw error; // Ensure error is properly caught in the component
  }
};

// Get all appointments
export const getAllAppointments = async () => {
  try {
    const response = await myAxios.get("/api/appointments/getall");
    return response.data;
  } catch (error) {
    console.error("Error fetching all appointments:", error);
    throw error; // Ensure error is properly caught in the component
  }
};



export const getUsersByRole = async (role) => {
  try {
    const response = await axios.get(`/api/users/role/${role}`);
    return response.data; // Ensure this returns an array of AdminDTO objects
  } catch (error) {
    console.error("Error fetching users by role:", error);
    throw error;
  }
};

