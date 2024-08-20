import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./AboutUs.css";

const AboutUs = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="about-us-container">
      <h1>About Us</h1>
      <p>
        Welcome to <span className="highlight">Little Hands</span>, a premier
        healthcare provider dedicated to ensuring the well-being of infants and
        children through comprehensive vaccination services. At Little Hands, we
        specialize in offering essential baby vaccinations to safeguard your
        child's health from birth onwards. Our hospital is renowned for its
        commitment to excellence in pediatric care, delivering high-quality
        services in a compassionate and supportive environment. Our team of
        experienced healthcare professionals is devoted to providing the highest
        standard of care, with a focus on the latest immunization practices and
        personalized attention.
      </p>
      <p>
        We understand the importance of a healthy start in life, and we are
        proud to be a trusted partner in your child’s health journey. Our
        reputation for exceptional care extends to our renowned home vaccination
        services, offering convenience and peace of mind to families. At Little
        Hands, we prioritize your child's health and comfort, ensuring they
        receive the best possible care every step of the way.
      </p>
      <Button
        variant="success"
        className="back-button"
        onClick={handleBackClick}
      >
        &larr; Home
      </Button>
    </div>
  );
};

export default AboutUs;
