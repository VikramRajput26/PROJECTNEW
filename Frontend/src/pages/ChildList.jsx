import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getAllChildren } from "../services/childService";
import "./ChildList.css";

const ChildList = () => {
  const [children, setChildren] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const data = await getAllChildren();
        setChildren(data);
      } catch (error) {
        setError("Error fetching children.");
        console.error("Error fetching children:", error);
      }
    };

    fetchChildren();
  }, []);

  const handleViewClick = (childId) => {
    navigate(`/view-child/${childId}`);
  };

  const handleUpdateClick = (parentId) => {
    navigate(`/update-child/${parentId}`);
  };

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="child-list-container">
      <h2>Child List</h2>
      {error && <p className="error">{error}</p>}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Blood Type</th>
            <th>Parent ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {children.map((child, index) => (
            <tr key={child.childId}>
              <td>{index + 1}</td>
              <td>{child.firstName}</td>
              <td>{child.lastName}</td>
              <td>{child.dateOfBirth}</td>
              <td>{child.gender}</td>
              <td>{child.bloodType}</td>
              <td>{child.parentId ?? "N/A"}</td>
              <td>
                <Button
                  variant="info"
                  onClick={() => handleViewClick(child.childId)}
                >
                  View
                </Button>
                <Button
                  variant="warning"
                  onClick={() => handleUpdateClick(child.parentId)}
                >
                  Update
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button
        variant="success"
        className="back-button"
        onClick={handleBackClick}
      >
        Back to Home
      </Button>
    </div>
  );
};

export default ChildList;
