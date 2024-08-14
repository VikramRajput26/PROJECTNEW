import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../services/userService";
import "./UserList.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getAllUsers();
        setUsers(userData);
      } catch (error) {
        setError("Error fetching users.");
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleViewClick = (userId) => {
    navigate(`/view-user/${userId}`);
  };

  const handleUpdateClick = (userId) => {
    navigate(`/update-user/${userId}`);
  };

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="user-list-container">
      <h2>User List</h2>
      {error && <p className="error">{error}</p>}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>User ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Contact Number</th>
            <th>Email</th>
            <th>Roles</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.userId}>
              <td>{index + 1}</td>
              <td>{user.userId}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.contactNumber}</td>
              <td>{user.email}</td>
              <td>
                {user.roles.map((role, idx) => (
                  <span key={idx}>
                    {role.name}
                    {idx < user.roles.length - 1 ? ", " : ""}
                  </span>
                ))}
              </td>
              <td>
                <Button
                  variant="info"
                  className="action-button"
                  onClick={() => handleViewClick(user.userId)}
                >
                  View
                </Button>
                <Button
                  variant="warning"
                  className="action-button"
                  onClick={() => handleUpdateClick(user.userId)}
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
        className="back-to-home-button"
        onClick={handleBackClick}
      >
        Back to Home
      </Button>
    </div>
  );
};

export default UserList;
