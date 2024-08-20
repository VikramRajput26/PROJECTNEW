import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { getAllChildren } from "../services/childService";
import "./ChildList.css"; // Assuming you have a CSS file for ChildList styles

const ChildList = () => {
  const [children, setChildren] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const data = await getAllChildren();
        setChildren(data);
      } catch (error) {
        console.error("Error fetching children:", error);
      }
    };

    fetchChildren();
  }, []);

  const handleViewClick = (childId) => {
    navigate(`/view-child/${childId}`);
  };

  const handleBackClick = () => {
    navigate("/");
  };

  const handleUpdateClick = (parentId) => {
    navigate(`/update-child/${parentId}`);
  };

  return (
    <div className="table-container">
      <Button
        variant="secondary"
        className="back-button"
        onClick={handleBackClick}
      >
        Back
      </Button>
      <Table striped bordered hover variant="dark" className="child-table">
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
              <td>{child.parentId}</td>
              <td>
                <Button
                  variant="primary"
                  className="action-button"
                  onClick={() => handleViewClick(child.childId)}
                >
                  View
                </Button>
                <Button
                  variant="secondary"
                  className="action-button"
                  onClick={() => handleUpdateClick(child.parentId)}
                >
                  Update
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ChildList;
