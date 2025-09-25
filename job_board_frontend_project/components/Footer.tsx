export default function Footer() {
  return (
    <footer className="mt-12 bg-gray-800 text-gray-300 text-sm">
      <div className="container mx-auto px-6 py-10 grid md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Branding */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">HireSpot</h3>
          <p>Your trusted platform for jobs and recruitment.</p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Contact Us</h3>
          <p>📍 5320 Umtholo Avenue, Kempton Park, South Africa</p>
          <p>📧 <a href="mailto:info@hirespot.com" className="hover:text-white">info@hirespot.com</a></p>
          <p>📞 <a href="tel:+27113216549" className="hover:text-white">+27 11 321 6549</a></p>
        </div>

        {/* Copyright */}
        <div className="flex items-center justify-center md:justify-end">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Mashudu · HireSpot. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
