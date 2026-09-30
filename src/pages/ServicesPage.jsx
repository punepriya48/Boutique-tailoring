import { Link } from "react-router-dom";
import { FaCheckCircle, FaRuler, FaClock, FaCut, FaGem, FaTshirt, FaCrown, FaPalette, FaStar, FaRing } from "react-icons/fa";
import services from "../data/services.js";
import siteConfig from "../config/siteConfig.js";
import { buildWhatsAppLink } from "../utils/whatsapp.js";
import "./ServicesPage.css";

const ICON_MAP = {
  tshirt: FaTshirt,
  gem: FaGem,
  crown: FaCrown,
  palette: FaPalette,
  ring: FaRing,
  ruler: FaRuler,
  cut: FaCut,
  star: FaStar,
};

const DETAILED_SERVICES_PRICING = [
  {
    id: "blouse-stitching",
    name: "Custom Blouse Stitching",
    price: "From ₹450",
    time: "2 – 4 Days",
    icon: FaTshirt,
    description: "Flawlessly fitted saree blouses tailored to your exact bust, shoulder, and armhole measurements. Options for padded cups, lining, piping, and back tie ropes.",
    features: ["Exact Bust & Shoulder Fit", "Soft Cotton/Silk Lining Included", "Padded Cup Option", "Custom Neckline Shapes"],
  },
  {
    id: "designer-blouse",
    name: "Designer & Heavy Work Blouse",
    price: "From ₹950",
    time: "4 – 7 Days",
    icon: FaGem,
    description: "Statement blouses featuring custom maggam work, zardosi embellishments, patch embroidery, fabric tassels, and intricate back cut-outs.",
    features: ["Maggam & Thread Embroidery", "Pattern Patchwork & Piping", "Heavy Tassels / Dori", "Bridal Neck Designs"],
  },
  {
    id: "lehenga-stitching",
    name: "Lehenga Choli Stitching",
    price: "From ₹1,800",
    time: "5 – 8 Days",
    icon: FaCrown,
    description: "Complete lehenga set stitching including blouse padding, flared skirt canvas lining, double ghera netting, and dupatta border attachment.",
    features: ["Maximum Flare & Ghera", "Canvas & Net Lining Support", "Heavy Latkan Attachments", "Dupatta Hem & Border Finish"],
  },
  {
    id: "dress-stitching",
    name: "Custom Dress & Anarkali Stitching",
    price: "From ₹850",
    time: "3 – 5 Days",
    icon: FaPalette,
    description: "Bespoke stitching for Anarkalis, Gowns, Indo-Western suits, and Kurtis tailored precisely to your preferred cut, fabric flow, and silhouette.",
    features: ["Floor-length Anarkalis", "Indo-Western Peplum Styles", "Straight & A-line Kurtis", "Pocket & Lining Additions"],
  },
  {
    id: "alterations",
    name: "Resizing & Express Alterations",
    price: "From ₹150",
    time: "24 – 48 Hours",
    icon: FaCut,
    description: "Expert resizing, waist fitting adjustments, sleeve hem changes, and seam reinforcements for pre-owned garments.",
    features: ["Express 24-Hour Service", "Side Seam Expansion/Tightening", "Zip Replacement", "Fall & Pico Attachment"],
  },
];

function ServicesPage() {
  return (
    <div className="services-page page-container">
      {/* Header Banner */}
      <header className="page-header">
        <div className="container">
          <span className="section-kicker">Master Craftsmanship</span>
          <h1 className="page-title">Boutique Tailoring Services</h1>
          <p className="page-subtitle">
            From everyday saree blouses to intricate bridal lehengas, every stitch is executed with precision, passion, and care by Kalpana.
          </p>
        </div>
      </header>

      {/* Main Services List */}
      <section className="section">
        <div className="container">
          <div className="services-list-grid">
            {DETAILED_SERVICES_PRICING.map((svc) => {
              const IconComp = svc.icon;
              return (
                <div key={svc.id} className="service-detail-card card">
                  <div className="service-card__header">
                    <div className="service-icon-badge">
                      <IconComp />
                    </div>
                    <div className="service-card__title-meta">
                      <h2>{svc.name}</h2>
                      <div className="service-meta-pills">
                        <span className="pill-price">{svc.price}</span>
                        <span className="pill-time"><FaClock /> {svc.time}</span>
                      </div>
                    </div>
                  </div>

                  <p className="service-card__description">{svc.description}</p>

                  <ul className="service-features-list">
                    {svc.features.map((feat, i) => (
                      <li key={i}>
                        <FaCheckCircle className="check-icon" /> {feat}
                      </li>
                    ))}
                  </ul>

                  <div className="service-card__footer">
                    <Link
                      to={`/booking?service=${encodeURIComponent(svc.name)}`}
                      className="btn btn-primary btn-block"
                    >
                      <FaRuler /> Book {svc.name}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Special Custom Request Box */}
          <div className="custom-tailoring-banner card margin-top-lg">
            <div className="banner-content">
              <p><b>Have a Special Design in Mind?</b></p>
              <p>
                Have a Pinterest design, Instagram reference, or custom fabric you want stitched? We specialize in recreating runway and celebrity looks!
              </p>
              <div className="banner-buttons">
                <Link to="/booking" className="btn btn-primary">
                  Book Fitting Appointment
                </Link>
                <a
                  href={buildWhatsAppLink("Hello Priya's Boutique! I have a reference design photo I want to discuss for stitching.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  Send Design Photo on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ServicesPage;
