import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import services from "../../data/services.js";
import { buildWhatsAppLink, buildEnquiryMessage } from "../../utils/whatsapp.js";
import "./EnquiryForm.css";

const initialState = {
  name: "",
  phone: "",
  service: "",
  date: "",
  message: "",
};

function EnquiryForm() {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.phone.trim()) {
      setError("Please share your name and phone number so we can reach you.");
      return;
    }
    setError("");

    const message = buildEnquiryMessage(form);
    const link = buildWhatsAppLink(message);
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="enquiry" className="section section--tint enquiry">
      <div className="container enquiry__grid">
        <div className="enquiry__intro">
          <p className="section-kicker">Ready when you are</p>
          <h2 className="section-title">Book Your Stitching</h2>
          <hr className="rule" />
          <p className="section-sub">
            Fill in a few details and this opens WhatsApp with your enquiry
            already written out — nothing is stored anywhere, it simply
            hands off to WhatsApp.
          </p>
        </div>

        <form className="enquiry__form card" onSubmit={handleSubmit} noValidate>
          <div className="enquiry__field">
            <label htmlFor="name">Your Name</label>
            <input id="name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="e.g. Anjali Sharma" required />
          </div>

          <div className="enquiry__field">
            <label htmlFor="phone">Phone Number</label>
            <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="e.g. 9876543210" required />
          </div>

          <div className="enquiry__field">
            <label htmlFor="service">Service Required</label>
            <select id="service" name="service" value={form.service} onChange={handleChange}>
              <option value="">Select a service (optional)</option>
              {services.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="enquiry__field">
            <label htmlFor="date">Preferred Date</label>
            <input id="date" name="date" type="date" value={form.date} onChange={handleChange} />
          </div>

          <div className="enquiry__field enquiry__field--full">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us a little about what you need stitched..."
            />
          </div>

          {error && <p className="enquiry__error" role="alert">{error}</p>}

          <button type="submit" className="btn btn-whatsapp btn-block enquiry__submit">
            <FaWhatsapp aria-hidden="true" /> Send Enquiry on WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
}

export default EnquiryForm;
