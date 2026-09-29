import { Link } from "react-router-dom";
import { FaWhatsapp, FaPhoneAlt, FaInstagram, FaMapMarkerAlt } from "react-icons/fa";
import siteConfig from "../../config/siteConfig.js";
import { buildWhatsAppLink, buildTelLink } from "../../utils/whatsapp.js";
import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();
  const { address, businessHours } = siteConfig;

  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div>
          <p className="site-footer__brand">{siteConfig.businessName}</p>
          <p className="site-footer__desc">{siteConfig.shortDescription}</p>
        </div>

        <div>
          <h4>Quick Navigation</h4>
          <ul>
            <li><Link to="/collection">Shop Collection</Link></li>
            <li><Link to="/services">Tailoring Services</Link></li>
            <li><Link to="/booking">Book Appointment</Link></li>
            <li><Link to="/about">About Kalpana's</Link></li>
            <li><Link to="/contact">Contact & Map</Link></li>
          </ul>
        </div>

        <div>
          <h4>Contact & Social</h4>
          <ul className="site-footer__contact">
            <li>
              <a href={buildTelLink()}>
                <FaPhoneAlt aria-hidden="true" /> {siteConfig.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={buildWhatsAppLink(siteConfig.whatsappDefaultMessage)} target="_blank" rel="noopener noreferrer">
                <FaWhatsapp aria-hidden="true" /> WhatsApp Inquiry
              </a>
            </li>
            
            <li>
              <a href={siteConfig.googleMapsUrl} target="_blank" rel="noopener noreferrer">
                <FaMapMarkerAlt aria-hidden="true" /> {address.city}, {address.state}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4>Business Hours</h4>
          <ul className="site-footer__hours">
            {businessHours.map((slot) => (
              <li key={slot.days}>
                {slot.days}: {slot.time}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="container">
          <p>
            © {year} {siteConfig.businessName}. All rights reserved. Premium Boutique & Custom Tailoring.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
