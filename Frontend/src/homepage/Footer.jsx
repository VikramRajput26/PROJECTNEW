import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Footer.css"; // Assuming you have some CSS for the footer

function Footer() {
  return (
    <footer className="footer-custom">
      <Container>
        <Row className="justify-content-center">
          <Col md={4}>
            <div className="footer-content">
              <h5>Location</h5>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3874.1624505120415!2d73.75253937498429!3d18.6572759698896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9070c0d2d95%3A0x24fb0b7f8a21b0d0!2sLittle%20Hands%20Hospital%2C%20Akurdi%2C%20Pune%2C%20Maharashtra%20411035!5e0!3m2!1sen!2sin!4v1691585029171!5m2!1sen!2sin"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Little Hands Location"
              ></iframe>
            </div>
          </Col>
          <Col md={4}>
            <div className="footer-content">
              <h5>Contact Us</h5>
              <p>
                <strong>Little Hands Hospital</strong>
                <br />
                Akurdi, Pune
                <br />
                Maharashtra, 411035
                <br />
                <strong>Phone:</strong> +91 12345 67890
                <br />
                <strong>Telephone:</strong> +91 020 1234 5678
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="footer-content text-center">
              <p>&copy; 2024 Little Hands. All rights reserved.</p>
              <p>
                <a href="/privacy-policy">Privacy Policy</a> |{" "}
                <a href="/terms-of-service">Terms of Service</a>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
