import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createChild } from "../services/childService";

const ChildRegister = () => {
  const [child, setChild] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    bloodType: "",
    parentId: "",
  });
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChild((prevChild) => ({
      ...prevChild,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createChild(child);
      console.log("Child registered successfully:", response);
      // Redirect to the Appointment component
      navigate('/appointments');
    } catch (error) {
      console.error("Error registering child:", error);
    }
  };

  return (
    <div>
      <h2>Register Child</h2>
      <form onSubmit={handleSubmit} method="POST">
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={child.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={child.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dateOfBirth"
            value={child.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Gender:</label>
          <input
            type="text"
            name="gender"
            value={child.gender}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Blood Type:</label>
          <input
            type="text"
            name="bloodType"
            value={child.bloodType}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Parent ID:</label>
          <input
            type="text"
            name="parentId"
            value={child.parentId}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register Child</button>
      </form>
    </div>
  );
};

export default ChildRegister;
