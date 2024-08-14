import { myAxios } from "./helper";

// Create a new vaccine
export const createVaccine = async (vaccine) => {
  try {
    const response = await myAxios.post("/vaccines/createVaccine", vaccine);
    return response.data;
  } catch (error) {
    console.error("Error creating vaccine:", error);
    throw error; // Ensures error is properly caught in the component
  }
};

// Get a vaccine by ID
export const getVaccineById = async (id) => {
  try {
    const response = await myAxios.get(`/vaccines/getVaccineById/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching vaccine by ID:", error);
    throw error; // Ensures error is properly caught in the component
  }
};

// Get all vaccines
export const getAllVaccines = async () => {
  try {
    const response = await myAxios.get("/vaccines/getAllVaccines");
    return response.data;
  } catch (error) {
    console.error("Error fetching all vaccines:", error);
    throw error; // Ensures error is properly caught in the component
  }
};

// Update a vaccine by ID
export const updateVaccine = async (id, vaccine) => {
  try {
    const response = await myAxios.put(
      `/vaccines/updateVaccine/${id}`,
      vaccine
    );
    return response.data;
  } catch (error) {
    console.error("Error updating vaccine:", error);
    throw error; // Ensures error is properly caught in the component
  }
};

// Delete a vaccine by ID
export const deleteVaccine = async (id) => {
  try {
    const response = await myAxios.delete(`/vaccines/deleteVaccine/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting vaccine:", error);
    throw error; // Ensures error is properly caught in the component
  }
};
