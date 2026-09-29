import { useState } from "react";
import { FaPhoneAlt, FaWhatsapp, FaMapMarkerAlt, FaClock, FaEnvelope, FaPaperPlane } from "react-icons/fa";
import siteConfig from "../config/siteConfig.js";
import { buildTelLink, buildWhatsAppLink } from "../utils/whatsapp.js";
import { useToast } from "../context/ToastContext.jsx";
import "./ContactPage.css";

function ContactPage() {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.message) {
      addToast("Please fill in your name and message", "error");
      return;
    }

    setSubmitted(true);
    addToast("Thank you! Your message has been sent.", "success");
  };

  return (
    <div className="contact-page page-container">
      <header className="page-header">
        <div className="container">
          <span className="section-kicker">Get in Touch</span>
          <h1 className="page-title">Contact Kalpana's Boutique</h1>
          <p className="page-subtitle">
            Visit our boutique studio in Pune or reach out for inquiries about custom blouse stitching, fabric recommendations, and order status.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* Left Info Column */}
            <div className="contact-info-col">
              <div className="info-card card">
                <h2>Boutique Information</h2>

                <div className="info-item">
                  <FaPhoneAlt className="info-icon" />
                  <div>
                    <strong>Phone Support</strong>
                    <a href={buildTelLink()}>{siteConfig.phoneDisplay}</a>
                  </div>
                </div>

                <div className="info-item">
                  <FaWhatsapp className="info-icon icon-wa" />
                  <div>
                    <strong>WhatsApp Direct</strong>
                    <a
                      href={buildWhatsAppLink(siteConfig.whatsappDefaultMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Chat on WhatsApp (+91 7767030645)
                    </a>
                  </div>
                </div>

                <div className="info-item">
                  <FaMapMarkerAlt className="info-icon" />
                  <div>
                    <strong>Boutique Address</strong>
                    <p>
                      A wing 902 9th floor The Pavilion optima reality Raghav nagar ambegaon Pune 411046
                    </p>
                  </div>
                </div>

                <div className="info-item">
                  <FaClock className="info-icon" />
                  <div>
                    <strong>Working Hours</strong>
                    {siteConfig.businessHours.map((h, i) => (
                      <p key={i}>
                        {h.days}: {h.time}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Google Maps Container */}
              <div className="map-card card margin-top">
                <h3>Our Location</h3>
                <div className="map-placeholder">
                  <p>📍 A wing 902 9th floor The Pavilion optima reality Raghav nagar ambegaon Pune 411046</p>
                  <a
                    href={siteConfig.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm margin-top-sm"
                  >
                    Get Directions on Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Right Contact Form Column */}
            <div className="contact-form-col">
              <div className="form-card card">
                <h2>Send Us a Message</h2>
                <p className="subtext">
                  Have a question about a product, custom measurements, or bulk stitching? Send us a direct message.
                </p>

                {submitted ? (
                  <div className="form-success-box">
                    <h3>Message Delivered!</h3>
                    <p>Thank you for reaching out. We will respond to your query shortly.</p>
                    <button
                      type="button"
                      className="btn btn-outline margin-top"
                      onClick={() => setSubmitted(false)}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Enter full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-grid-2">
                      <div className="form-group">
                        <label className="form-label">Phone Number</label>
                        <input
                          type="tel"
                          className="form-input"
                          placeholder="Contact number"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                          type="email"
                          className="form-input"
                          placeholder="Email address"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Subject</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. Inquiry about Bridal Lehenga Stitching"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Your Message *</label>
                      <textarea
                        className="form-textarea"
                        placeholder="Type your message or custom design requirements here..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                      />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block btn-lg">
                      <FaPaperPlane /> Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
