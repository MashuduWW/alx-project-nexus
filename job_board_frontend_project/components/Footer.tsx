export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Branding */}
        <div className="footer-section">
          <h3 className="footer-heading">HireSpot</h3>
          <p>Your trusted platform for jobs and recruitment.</p>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3 className="footer-heading">Contact Us</h3>
          <p>📍 5320 Umtholo Avenue, Kempton Park, South Africa</p>
          <p>📧 <a href="mailto:info@hirespot.com" className="footer-link">info@hirespot.com</a></p>
          <p>📞 <a href="tel:+27113216549" className="footer-link">+27 11 321 6549</a></p>
        </div>

        {/* Copyright */}
        <div className="footer-copyright">
          <p className="footer-copyright-text">
            © {new Date().getFullYear()} Mashudu · HireSpot. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}