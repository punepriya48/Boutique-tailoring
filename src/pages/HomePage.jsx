import { Link } from "react-router-dom";
import { FaArrowRight, FaRulerCombined, FaShoppingBag, FaStar, FaWhatsapp, FaShieldAlt, FaCut } from "react-icons/fa";
import Hero from "../components/Hero/Hero.jsx";
import About from "../components/About/About.jsx";
import Services from "../components/Services/Services.jsx";
import WhyChooseUs from "../components/WhyChooseUs/WhyChooseUs.jsx";
import HowItWorks from "../components/HowItWorks/HowItWorks.jsx";
import Testimonials from "../components/Testimonials/Testimonials.jsx";
import FAQ from "../components/FAQ/FAQ.jsx";
import Location from "../components/Location/Location.jsx";
import products from "../data/products.js";
import { useCart } from "../context/CartContext.jsx";
import { buildWhatsAppLink } from "../utils/whatsapp.js";
import siteConfig from "../config/siteConfig.js";

function HomePage() {
  const { addToCart } = useCart();
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <Hero />

      

      

      {/* Services Overview */}
      <Services />

      {/* Tailoring Appointment Callout Banner */}
      <section className="section section--rose">
        <div className="container text-center">
          <span className="section-kicker">Custom Fitting</span>
          <h2 className="section-title">Need a Custom Blouse or Outfit Stitched?</h2>
          <p className="section-sub" style={{ marginInline: "auto" }}>
            Book a dedicated measurement and design session with Kalpana. Bring your own fabric or choose from our curated boutique collection.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap", marginTop: "2rem" }}>
            <Link to="/booking" className="btn btn-ghost-light btn-lg">
              <FaRulerCombined /> Book Fitting Appointment
            </Link>
            <a
              href={buildWhatsAppLink("Hello Priya! I want to enquire about custom blouse stitching and fitting.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg"
            >
              <FaWhatsapp /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUs />

      

      

      {/* FAQ */}
      <FAQ />

      
    </div>
  );
}

export default HomePage;
