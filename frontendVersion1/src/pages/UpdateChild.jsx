import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getChildById, updateChild } from "../services/childService";
import "./UpdateChild.css";

const UpdateChild = () => {
  const { childId } = useParams();
  const navigate = useNavigate();
  const [child, setChild] = useState(null);

  useEffect(() => {
    if (childId) {
      fetchChildById();
    }
  }, [childId]);

  const fetchChildById = async () => {
    try {
      const data = await getChildById(childId);
      setChild(data);
    } catch (error) {
      console.error("Error fetching child details: ", error);
      toast.error("Error fetching child details");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateChild(child.childId, child);
      toast.success("Child updated successfully");
      navigate("/child-list");
    } catch (error) {
      console.error("Error updating child: ", error);
      toast.error("Error updating child");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChild((prevChild) => ({
      ...prevChild,
      [name]: value,
    }));
  };

  return (
    <div className="update-child-container">
      <ToastContainer />
      <h2>Update Child</h2>
      {!child ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleUpdate}>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={child.firstName}
              onChange={handleChange}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={child.lastName}
              onChange={handleChange}
            />
          </label>
          <label>
            Date of Birth:
            <input
              type="date"
              name="dateOfBirth"
              value={child.dateOfBirth}
              onChange={handleChange}
            />
          </label>
          <label>
            Gender:
            <input
              type="text"
              name="gender"
              value={child.gender}
              onChange={handleChange}
            />
          </label>
          <label>
            Blood Type:
            <input
              type="text"
              name="bloodType"
              value={child.bloodType}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Update Child</button>
        </form>
      )}
    </div>
  );
};

export default UpdateChild;
