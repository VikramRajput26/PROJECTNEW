import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createChild } from "../services/childService"; // Assume you have this service set up
import "./ChildRegister.css";
import { Button } from "react-bootstrap";

const ChildRegister = () => {
  const [child, setChild] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    bloodType: "",
    parentId: "", // This will be set directly from localStorage
  });

  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setChild((prevChild) => ({
        ...prevChild,
        parentId: userId,
      }));
    }
  }, []);

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

      // Store childId in localStorage
      localStorage.setItem("childId", response.childId);

      navigate("/appointmentregister"); // Navigate to Appointment component after successful registration
    } catch (error) {
      console.error("Error registering child:", error);
    }
  };

  const goToHomePage = () => {
    navigate("/");
  };

  const goToAppointmentRegister = () => {
    navigate("/appointmentregister");
  };

  return (
    <div className="child-register-container">
      <Button
        variant="primary"
        className="child-register-home-button"
        onClick={goToHomePage}
      >
        Back to Home
      </Button>
      <h2 className="child-register-title">Register Child</h2>
      <form onSubmit={handleSubmit} method="POST">
        <div className="child-register-form-group">
          <label className="child-register-label">First Name:</label>
          <input
            type="text"
            name="firstName"
            value={child.firstName}
            onChange={handleChange}
            className="child-register-input"
            required
          />
        </div>
        <div className="child-register-form-group">
          <label className="child-register-label">Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={child.lastName}
            onChange={handleChange}
            className="child-register-input"
            required
          />
        </div>
        <div className="child-register-form-group">
          <label className="child-register-label">Date of Birth:</label>
          <input
            type="date"
            name="dateOfBirth"
            value={child.dateOfBirth}
            onChange={handleChange}
            className="child-register-input"
            required
          />
        </div>
        <div className="child-register-form-group">
          <label className="child-register-label">Gender:</label>
          <input
            type="text"
            name="gender"
            value={child.gender}
            onChange={handleChange}
            className="child-register-input"
            required
          />
        </div>
        <div className="child-register-form-group">
          <label className="child-register-label">Blood Type:</label>
          <input
            type="text"
            name="bloodType"
            value={child.bloodType}
            onChange={handleChange}
            className="child-register-input"
            required
          />
        </div>
        <div className="child-register-form-group">
          <label className="child-register-label">Parent ID:</label>
          <input
            type="text"
            name="parentId"
            value={child.parentId}
            className="child-register-input"
            readOnly // Making it read-only as it's set from localStorage
          />
        </div>
        <button type="submit" className="child-register-button">
          Register Child
        </button>
      </form>
      <button
        onClick={goToAppointmentRegister}
        className="child-register-button"
      >
        Go to Appointment Registration
      </button>
    </div>
  );
};

export default ChildRegister;
