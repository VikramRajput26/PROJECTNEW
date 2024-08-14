// Home.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Home.css";
import Footer from "../homepage/Footer";
import Immune from "../homepage/Immune";
import Cards from "../homepage/Cards";
import Card2 from "../homepage/Card2";
import Card3 from "../homepage/Card3";

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/sign-in");
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
                  User List
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/child-list">
                  Child List
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/appointment-list">
                  Appointment List
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="full-page-image-container">
        <img src="/baby1.jpg" alt="Happy Baby" className="full-page-image" />
        <div className="form-overlay">
          {/* Content will be rendered here based on routing */}
        </div>
      </div>
      <Immune />
      <div className="cards-wrapper">
        <Cards />
        <Card2 />
        <Card3 />
      </div>
      <Footer />
    </>
  );
}

export default Home;
