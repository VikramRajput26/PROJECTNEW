// Cards.js
import React from "react";
import "./Cards.css"; // Ensure this file includes the necessary styles

function Cards() {
  return (
    <div className="cards-container">
      <div className="doctor-card">
        <img src="/d1.png" alt="Dr. Ujjwalla Keskar" className="doctor-image" />
        <div className="doctor-info">
          <h2>Dr. Ujjwalla Keskar</h2>
          <p>Consultant - Pediatrics & Child Care</p>
          <p>3 Google Reviews</p>
          <p>Qualification: MBBS | MD</p>
        </div>
      </div>
    </div>
  );
}

export default Cards;
