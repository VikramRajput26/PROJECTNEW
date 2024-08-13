import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getChildById } from "../services/childService";
import Button from "react-bootstrap/Button";
import "./ViewChild.css"; // Assuming you have a CSS file for ViewChild styles

const ViewChild = () => {
  const { childId } = useParams(); // Get the child ID from URL parameters
  const [child, setChild] = useState(null);
  const [error, setError] = useState(null); // State to hold error message
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (!childId) {
      setError("Child ID is missing");
      return;
    }

    const fetchChild = async () => {
      try {
        console.log("Fetching child with ID:", childId); // Log ID to ensure it's correct
        const childData = await getChildById(childId);
        setChild(childData);
      } catch (error) {
        console.log(
          "Error fetching child:",
          error.response ? error.response.data : error.message
        );
        setError("Failed to fetch child details.");
      }
    };

    fetchChild();
  }, [childId]);

  const handleBackClick = () => {
    navigate("/child-list"); // Navigate back to ChildList page
  };

  return (
    <div className="view-child-container">
      <div className="view-child-details">
        {error && <p>{error}</p>}
        {child ? (
          <div>
            <h2>Child Details</h2>
            <p>
              <strong>First Name:</strong> {child.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {child.lastName}
            </p>
            <p>
              <strong>Date of Birth:</strong> {child.dateOfBirth}
            </p>
            <p>
              <strong>Gender:</strong> {child.gender}
            </p>
            <p>
              <strong>Blood Type:</strong> {child.bloodType}
            </p>
            <p>
              <strong>Parent ID:</strong> {child.parentId}
            </p>
            <Button variant="success" onClick={handleBackClick}>
              Back to Child List
            </Button>
          </div>
        ) : (
          <p>Loading child details...</p>
        )}
      </div>
    </div>
  );
};

export default ViewChild;
