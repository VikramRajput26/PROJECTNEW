// src/services/authService.js
export const logout = () => {
  // Remove the token from local storage
  localStorage.removeItem("token");
};
