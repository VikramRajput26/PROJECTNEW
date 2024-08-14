import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById } from "../services/userService";
import Button from "react-bootstrap/Button";
import "./ViewUser.css"; // Import the CSS file

const ViewUser = () => {
  const { id } = useParams(); // Get the user ID from URL parameters
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null); // State to hold error message
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (!id) {
      setError("User ID is missing");
      return;
    }

    const fetchUser = async () => {
      try {
        console.log("Fetching user with ID:", id); // Log ID to ensure it's correct
        const userData = await getUserById(id);
        setUser(userData);
      } catch (error) {
        console.log(
          "Error fetching user:",
          error.response ? error.response.data : error.message
        );
        setError("Failed to fetch user details.");
      }
    };

    fetchUser();
  }, [id]);

  const handleBackClick = () => {
    navigate("/user-list"); // Navigate back to UserList page
  };

  return (
    <div className="view-user-container">
      <div className="view-user-details">
        {error && <p>{error}</p>}
        {user ? (
          <div>
            <h2>User Details</h2>
            <p>
              <strong>First Name:</strong> {user.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {user.lastName}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Roles:</strong>{" "}
              {user.roles.map((role) => role.name).join(", ")}
            </p>
            <div className="button-group">
              <Button variant="success" onClick={handleBackClick}>
                Back to User List
              </Button>
            </div>
          </div>
        ) : (
          <p>Loading user details...</p>
        )}
      </div>
    </div>
  );
};

export default ViewUser;
