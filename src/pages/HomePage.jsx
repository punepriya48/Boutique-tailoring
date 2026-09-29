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

      {/* About Section */}
      <About />

      {/* Featured Collection Section */}
      <section className="section section--tint">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="section-kicker">Curated Fashion</span>
            <h2 className="section-title">Featured Designs</h2>
            <p className="section-sub">
              Explore our most loved handcrafted blouses, lehengas, and dresses. Each piece is made to your exact measurements.
            </p>
            <hr className="rule" />
          </div>

          <div className="products-grid">
            {featuredProducts.map((product) => (
              <div key={product.id} className="product-card card">
                <div className="product-card__image-wrap">
                  <img src={product.image} alt={product.name} className="product-card__image" />
                  <span className="product-badge">Featured</span>
                </div>
                <div className="product-card__body">
                  <span className="product-card__category">{product.category}</span>
                  <h3 className="product-card__title">
                    <Link to={`/product/${product.id}`}>{product.name}</Link>
                  </h3>
                  <div className="product-card__rating">
                    <FaStar className="star-icon" />
                    <span>{product.rating}</span>
                    <span className="reviews">({product.reviewCount})</span>
                  </div>
                  <div className="product-card__footer">
                    <span className="price-current">₹{product.price}</span>
                    <button
                      type="button"
                      className="btn btn-sm btn-primary"
                      onClick={() => addToCart(product, 1)}
                    >
                      <FaShoppingBag /> Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center margin-top-lg">
            <Link to="/collection" className="btn btn-outline btn-lg">
              Explore Full Collection <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

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

      {/* How It Works */}
      <HowItWorks />

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <FAQ />

      {/* Location */}
      <Location />
    </div>
  );
}

export default HomePage;
