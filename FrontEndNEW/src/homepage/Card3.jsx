// Card3.js
import React from "react";
import "./Cards.css"; // Ensure this file includes the necessary styles

const Card3 = () => {
  return (
    <div className="cards-container">
      <div className="doctor-card">
        <img src="/d4.jpeg" alt="Dr. Sumit Desai" className="doctor-image" />
        <div className="doctor-info">
          <h2>Dr. Sumit Desai</h2>
          <p>Gynaecologist</p>
          <p>MBBS DGO (Pune)</p>
        </div>
      </div>
    </div>
  );
};

export default Card3;
