import { myAxios } from "./helper";

export const signUp = async (user) => {
  try {
    const response = await myAxios.post("/api/users/sign-up", user);
    return response.data;
  } catch (error) {
    throw error; // This ensures the error is properly caught in the component
  }
};

export const signIn = async (email, password) => {
  try {
    const response = await myAxios.post("/api/v1/auth/sign-in", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error; // This ensures the error is properly caught in the component
  }
};

export const updateUser = async (id, user) => {
  try {
    const response = await myAxios.put(`/api/users/update/${id}`, user);
    return response.data;
  } catch (error) {
    throw error; // This ensures the error is properly caught in the component
  }
};

export const getUserById = async (id) => {
  try {
    const response = await myAxios.get(`/api/users/getbyid/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error in getUserById:",
      error.response ? error.response.data : error.message
    );
    throw error; // Ensure error is properly propagated
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await myAxios.delete(`/api/users/${id}`);
    return response.data;
  } catch (error) {
    throw error; // This ensures the error is properly caught in the component
  }
};

export const getAllUsers = async () => {
  try {
    const response = await myAxios.get("/api/users/getalluser");
    return response.data;
  } catch (error) {
    throw error; // This ensures the error is properly caught in the component
  }
};
