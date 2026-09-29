import { Link } from "react-router-dom";
import { FaHeart, FaCut, FaCheckCircle, FaRulerCombined } from "react-icons/fa";
import siteConfig from "../config/siteConfig.js";
import aboutPhoto from "../assets/about-photo.svg";

function AboutPage() {
  return (
    <div className="about-page page-container">
      <header className="page-header">
        <div className="container">
          <span className="section-kicker">Our Heritage & Craftsmanship</span>
          <h1 className="page-title">About Kalpana's Boutique & Tailoring</h1>
          <p className="page-subtitle">
            Celebrating personalized Indian ethnic wear with flawless fit, painstaking attention to detail, and a passion for modern design.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="product-detail-grid">
            <div className="detail-gallery">
              <div className="main-image-wrap card">
                <img src="https://media.istockphoto.com/id/1401228001/photo/seamstress-working-on-sewing-machine.jpg?s=612x612&w=0&k=20&c=BimK9oCw4852cOYar8Ex8Uh-mH3yTwRArrqr4A0RxLE=" alt="Priya's Boutique Studio" className="main-image" />
              </div>
            </div>

            <div className="detail-info">
              <span className="section-kicker">The Story Behind The Stitches</span>
              <h2 className="section-title">Tailored With Love, Designed For You</h2>
              <p className="detail-description">
                Founded with a passion for precise craftsmanship, <strong>Kalpana's Boutique & Tailoring</strong> started as a dedicated tailoring studio in Pune. We believe that every woman deserves clothing that fits comfortably, flatters her unique shape, and reflects her personal style.
              </p>
              <p className="detail-description">
                Whether it's a traditional Zardosi saree blouse, a lightweight festive lehenga, or an everyday cotton kurti, we treat every garment with extreme care—from pattern cut to final hand finishing.
              </p>

              <div className="product-specs-box">
                <h3>Our Core Pillars</h3>
                <ul>
                  <li>
                    <span className="spec-name">Perfect Fit:</span>
                    <span className="spec-val">Dedicated body measurement & fitting precision</span>
                  </li>
                  <li>
                    <span className="spec-name">Craftsmanship:</span>
                    <span className="spec-val">Padded cups, double seams & soft inner lining</span>
                  </li>
                  <li>
                    <span className="spec-name">Timely Delivery:</span>
                    <span className="spec-val">Punctual turnaround tailored to your occasion date</span>
                  </li>
                </ul>
              </div>

              <div className="detail-actions margin-top">
                <Link to="/booking" className="btn btn-primary btn-lg">
                  <FaRulerCombined /> Book Custom Fitting
                </Link>
                <Link to="/collection" className="btn btn-outline btn-lg">
                  Explore Shop
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
