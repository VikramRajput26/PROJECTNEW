// Home.jsx
import React from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Home.css";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import UserList from "../pages/UserList";
import UserById from "../pages/UserById";
import UpdateUser from "../pages/UpdateUser";
import ChildList from "../pages/ChildList";
import UpdateChild from "../pages/UpdateChild";
import { logout } from "../services/authService";
import Footer from "../homepage/Footer"; // Import the Footer component
import Immune from "../homepage/Immune";
import Cards from "../homepage/Cards";

// Import the Footer component

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <Navbar expand="lg" className="navbar-custom">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Little Hands
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/about-us">
                About Us
              </Nav.Link>
              <Nav.Link as={Link} to="/contact-us">
                Contact Us
              </Nav.Link>
              <Nav.Link as={Link} to="/sign-in">
                Sign In
              </Nav.Link>
              <Nav.Link as={Link} to="/sign-up">
                Sign Up
              </Nav.Link>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/user-list">
                  UserList
                </NavDropdown.Item>

                <NavDropdown.Item as={Link} to="/child-list">
                  ChildList
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/update-child/:id">
                  UpdateChild
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="full-page-image-container">
        <img src="/baby1.jpg" alt="Happy Baby" className="full-page-image" />
        <div className="form-overlay">
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/user-list" element={<UserList />} />
            <Route path="/user-by-id" element={<UserById />} />
            <Route path="/child-list" element={<ChildList />} />
            <Route path="/update-child/:id" element={<UpdateChild />} />
          </Routes>
        </div>
      </div>
      <Immune />
      <Cards />
      <Footer /> {/* Add the Footer component here */}
    </>
  );
}

export default Home;
