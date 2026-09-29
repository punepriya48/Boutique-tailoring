import { FaMapMarkerAlt, FaDirections, FaClock } from "react-icons/fa";
import siteConfig from "../../config/siteConfig.js";
import "./Location.css";

function Location() {
  const { address, businessHours } = siteConfig;

  return (
    <section id="location" className="section location">
      <div className="container location__grid">
        <div className="location__card card">
          <FaMapMarkerAlt className="location__icon" aria-hidden="true" />
          <h3>Visit or Get Directions</h3>
          <address>
            A wing 902 9th floor The Pavilion optima reality Raghav nagar ambegaon Pune 411046
          </address>
          <a
            href={siteConfig.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <FaDirections aria-hidden="true" /> Get Directions
          </a>
        </div>

        <div className="location__card card">
          <FaClock className="location__icon" aria-hidden="true" />
          <h3>Business Hours</h3>
          <ul className="location__hours">
            {businessHours.map((slot) => (
              <li key={slot.days}>
                <span>{slot.days}</span>
                <span>{slot.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Location;
