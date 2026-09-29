import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { FaCalendarAlt, FaCheckCircle, FaWhatsapp, FaClock, FaRuler, FaUser, FaPhone, FaEnvelope } from "react-icons/fa";
import siteConfig from "../config/siteConfig.js";
import { buildWhatsAppLink } from "../utils/whatsapp.js";
import { useToast } from "../context/ToastContext.jsx";
import "./BookingPage.css";

const SERVICES_OPTIONS = [
  "Blouse Stitching",
  "Designer / Heavy Work Blouse",
  "Lehenga Choli Stitching",
  "Custom Dress / Anarkali Stitching",
  "Kurti / Suit Stitching",
  "Bridal Outfit Stitching",
  "Garment Resizing & Alterations",
  "Consultation & Custom Fitting Session",
];

const TIME_SLOTS = [
  "10:30 AM - 12:00 PM",
  "12:00 PM - 02:00 PM",
  "02:00 PM - 04:00 PM",
  "04:00 PM - 06:00 PM",
  "06:00 PM - 07:30 PM",
];

function BookingPage() {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get("service") || SERVICES_OPTIONS[0];

  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: preselectedService,
    preferredDate: "",
    preferredTime: TIME_SLOTS[0],
    bust: "",
    waist: "",
    hip: "",
    blouseLength: "",
    shoulder: "",
    fabricType: "",
    designNotes: "",
    specialInstructions: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [bookingSummary, setBookingSummary] = useState(null);

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Full name is required";
    if (!formData.phone.trim() || formData.phone.length < 8) {
      errs.phone = "Valid phone number is required";
    }
    if (!formData.preferredDate) errs.preferredDate = "Please select appointment date";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      addToast("Please correct the errors in the booking form", "error");
      return;
    }

    const bookingId = `BOOK-${Math.floor(100000 + Math.random() * 900000)}`;
    const summary = { ...formData, id: bookingId, createdAt: new Date().toLocaleDateString() };

    // Save to local bookings history for demonstration & persistence
    try {
      const existing = JSON.parse(localStorage.getItem("priyas_tailoring_bookings") || "[]");
      localStorage.setItem("priyas_tailoring_bookings", JSON.stringify([summary, ...existing]));
    } catch (err) {
      console.error(err);
    }

    setBookingSummary(summary);
    setSubmitted(true);
    addToast("Tailoring booking appointment submitted successfully!", "success");
  };

  const generateWhatsAppMessage = () => {
    if (!bookingSummary) return "";
    const lines = [
      `🌸 *New Tailoring Appointment - Priya's Boutique*`,
      `*Booking Ref:* #${bookingSummary.id}`,
      ``,
      `👤 *Customer:* ${bookingSummary.name}`,
      `📞 *Phone:* ${bookingSummary.phone}`,
      `✉️ *Email:* ${bookingSummary.email || "N/A"}`,
      `✂️ *Service:* ${bookingSummary.service}`,
      `📅 *Date:* ${bookingSummary.preferredDate}`,
      `⏰ *Time Slot:* ${bookingSummary.preferredTime}`,
      ``,
      `📐 *Measurements:*`,
      `- Bust: ${bookingSummary.bust || "Will provide at boutique"}`,
      `- Waist: ${bookingSummary.waist || "N/A"}`,
      `- Hip: ${bookingSummary.hip || "N/A"}`,
      `- Length: ${bookingSummary.blouseLength || "N/A"}`,
      `- Shoulder: ${bookingSummary.shoulder || "N/A"}`,
      ``,
      `🧵 *Fabric Details:* ${bookingSummary.fabricType || "Bringing my own fabric"}`,
      `📝 *Design Notes:* ${bookingSummary.designNotes || "Standard fit"}`,
    ];
    return lines.join("\n");
  };

  const whatsappUrl = bookingSummary
    ? buildWhatsAppLink(generateWhatsAppMessage())
    : "#";

  return (
    <div className="booking-page page-container">
      {/* Header Banner */}
      <header className="page-header">
        <div className="container">
          <span className="section-kicker">Custom Fitting & Appointment</span>
          <h1 className="page-title">Book Tailoring Service</h1>
          <p className="page-subtitle">
            Fill out your measurements and preferred date. Our expert tailor Kalpana will review your request and confirm your appointment.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          {submitted && bookingSummary ? (
            /* Confirmation Screen */
            <div className="booking-confirmation card">
              <div className="confirmation-header">
                <FaCheckCircle className="success-icon" />
                <h2>Booking Request Submitted!</h2>
                <p className="ref-number">Booking Reference ID: <strong>#{bookingSummary.id}</strong></p>
              </div>

              <div className="summary-details-box">
                <h3>Appointment Summary</h3>
                <div className="summary-grid">
                  <div><span>Name:</span> <strong>{bookingSummary.name}</strong></div>
                  <div><span>Phone:</span> <strong>{bookingSummary.phone}</strong></div>
                  <div><span>Service:</span> <strong>{bookingSummary.service}</strong></div>
                  <div><span>Date & Time:</span> <strong>{bookingSummary.preferredDate} ({bookingSummary.preferredTime})</strong></div>
                  {bookingSummary.fabricType && (
                    <div><span>Fabric:</span> <strong>{bookingSummary.fabricType}</strong></div>
                  )}
                </div>
              </div>

              <div className="whatsapp-prompt">
                <h3>Fast Confirmation via WhatsApp</h3>
                <p>Send your booking summary directly to Priya on WhatsApp for instant slot confirmation and fabric consultation!</p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-block btn-lg"
                >
                  <FaWhatsapp /> Send Booking to WhatsApp
                </a>
              </div>

              <div className="confirmation-actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => {
                    setSubmitted(false);
                    setBookingSummary(null);
                  }}
                >
                  Book Another Appointment
                </button>
                <Link to="/collection" className="btn btn-primary">
                  Browse Shop Catalog
                </Link>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form className="booking-form card" onSubmit={handleSubmit} noValidate>
              <div className="form-section-head">
                <FaUser className="section-icon" />
                <h2>1. Customer Details</h2>
              </div>

              <div className="form-grid-3">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    className="form-input"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <span className="form-error">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-input"
                    placeholder="e.g. +91 9876543210"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && <span className="form-error">{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address (Optional)</label>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-section-head margin-top">
                <FaCalendarAlt className="section-icon" />
                <h2>2. Service & Preferred Schedule</h2>
              </div>

              <div className="form-grid-3">
                <div className="form-group">
                  <label className="form-label">Select Tailoring Service *</label>
                  <select
                    name="service"
                    className="form-select"
                    value={formData.service}
                    onChange={handleChange}
                  >
                    {SERVICES_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Preferred Date *</label>
                  <input
                    type="date"
                    name="preferredDate"
                    className="form-input"
                    min={new Date().toISOString().split("T")[0]}
                    value={formData.preferredDate}
                    onChange={handleChange}
                  />
                  {errors.preferredDate && (
                    <span className="form-error">{errors.preferredDate}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Time Slot *</label>
                  <select
                    name="preferredTime"
                    className="form-select"
                    value={formData.preferredTime}
                    onChange={handleChange}
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-section-head margin-top">
                <FaRuler className="section-icon" />
                <h2>3. Measurements & Fabric Specs (Inches)</h2>
                <span className="sub-tag">Optional - You can also measure in-person at our boutique</span>
              </div>

              <div className="form-grid-3">
                <div className="form-group">
                  <label className="form-label">Bust / Chest:</label>
                  <input
                    type="text"
                    name="bust"
                    className="form-input"
                    placeholder="e.g. 36 in"
                    value={formData.bust}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Waist:</label>
                  <input
                    type="text"
                    name="waist"
                    className="form-input"
                    placeholder="e.g. 30 in"
                    value={formData.waist}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Hip / Shoulder:</label>
                  <input
                    type="text"
                    name="hip"
                    className="form-input"
                    placeholder="e.g. 38 in"
                    value={formData.hip}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Fabric & Material Details:</label>
                <input
                  type="text"
                  name="fabricType"
                  className="form-input"
                  placeholder="e.g. Silk Saree Blouse Material / Silk Organza Lehenga Fabric"
                  value={formData.fabricType}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Design & Neckline Instructions:</label>
                <textarea
                  name="designNotes"
                  className="form-textarea"
                  placeholder="Describe neck shape (Deep V, Boatneck, Sweetheart), sleeve style, piping, or back pattern details..."
                  value={formData.designNotes}
                  onChange={handleChange}
                />
              </div>

              <div className="form-submit-row">
                <button type="submit" className="btn btn-primary btn-block btn-lg">
                  Confirm & Submit Tailoring Appointment
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

export default BookingPage;
