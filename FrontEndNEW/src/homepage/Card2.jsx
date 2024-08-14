// Card2.js
import React from "react";
import "./Cards.css"; // Ensure this file includes the necessary styles

const Card2 = () => {
  return (
    <div className="cards-container">
      <div className="doctor-card">
        <img src="/d2.jpg" alt="Dr. Vidyadevi Gutte" className="doctor-image" />
        <div className="doctor-info">
          <h2>Dr. Vidyadevi Gutte</h2>
          <p>Gynaecologist</p>
          <p>MBBS DGO (Mumbai)</p>
        </div>
      </div>
    </div>
  );
};

export default Card2;
