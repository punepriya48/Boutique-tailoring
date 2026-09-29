import { Link } from "react-router-dom";
import { FaWhatsapp, FaPhoneAlt, FaCheck, FaRulerCombined, FaShoppingBag } from "react-icons/fa";
import siteConfig from "../../config/siteConfig.js";
import heroImage from "../../assets/hero.svg";
import { buildWhatsAppLink, buildTelLink } from "../../utils/whatsapp.js";
import "./Hero.css";

const TRUST_POINTS = [
  "Custom Stitching",
  "Perfect Fitting Guaranteed",
  "Neat Maggam & Zardosi",
  "Punctual Turnaround",
];

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero__grid">
        <div className="hero__content">
          <p className="hero__eyebrow">{siteConfig.shortName}</p>
          <h1 className="hero__title">{siteConfig.tagline}</h1>
          <p className="hero__desc">{siteConfig.shortDescription}</p>

          <div className="hero__actions">
            <Link to="/collection" className="btn btn-primary">
              <FaShoppingBag /> Explore Collection
            </Link>
            <Link to="/booking" className="btn btn-outline">
              <FaRulerCombined /> Book Tailoring
            </Link>
            <a
              href={buildWhatsAppLink(siteConfig.whatsappDefaultMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <FaWhatsapp aria-hidden="true" /> WhatsApp
            </a>
          </div>

          <ul className="hero__trust">
            {TRUST_POINTS.map((point) => (
              <li key={point}>
                <FaCheck aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero__media">
          <img
            src="https://www.cuttingmaster.in/images/blog/size-fit.jpg"
            alt="Illustration representing custom tailoring and stitching craft"
            width="900"
            height="1100"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
