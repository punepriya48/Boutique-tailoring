import {
  FaTshirt,
  FaGem,
  FaCrown,
  FaPalette,
  FaLeaf,
  FaRing,
  FaRulerCombined,
  FaCut,
  FaStar,
} from "react-icons/fa";
import services from "../../data/services.js";
import { buildWhatsAppLink, buildServiceEnquiryMessage } from "../../utils/whatsapp.js";
import "./Services.css";

const ICONS = {
  tshirt: FaTshirt,
  gem: FaGem,
  crown: FaCrown,
  palette: FaPalette,
  leaf: FaLeaf,
  ring: FaRing,
  ruler: FaRulerCombined,
  cut: FaCut,
  star: FaStar,
};

function Services() {
  return (
    <section id="services" className="section services">
      <div className="container">
        <div className="section-head section-head--center">
          <p className="section-kicker">What's stitched here</p>
          <h2 className="section-title">Services</h2>
          <hr className="rule" />
          <p className="section-sub" style={{ marginInline: "auto" }}>
            From everyday wear to bridal outfits, every piece is stitched to
            fit — enquire about any service below.
          </p>
        </div>

        <div className="services__grid">
          {services.map((service) => {
            const Icon = ICONS[service.icon] || FaCut;
            return (
              <article className="service-card" key={service.id}>
                <div className="service-card__icon">
                  <Icon aria-hidden="true" />
                </div>
                <h3 className="service-card__name">{service.name}</h3>
                <p className="service-card__desc">{service.description}</p>
                <a
                  href={buildWhatsAppLink(buildServiceEnquiryMessage(service.name))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="service-card__link"
                >
                  Enquire Now
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Services;
