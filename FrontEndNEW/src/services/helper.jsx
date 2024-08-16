import axios from "axios";

export const BASE_URL = "http://localhost:8080";

// Create an instance of Axios
export const myAxios = axios.create({
  baseURL: BASE_URL,
});

// Add a request interceptor to dynamically set the Authorization header
myAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Set token in the header
    }
    return config;
  },
  (error) => {
    // Handle any errors in setting up the request
    return Promise.reject(error);
  }
);
