import { FaQuoteLeft } from "react-icons/fa";
import testimonials from "../../data/testimonials.js";
import "./Testimonials.css";

function Testimonials() {
  return (
    <section id="reviews" className="section section--tint testimonials">
      <div className="container">
        <div className="section-head section-head--center">
          <p className="section-kicker">In their words</p>
          <h2 className="section-title">Customer Reviews</h2>
          <hr className="rule" />
          <p className="section-sub" style={{ marginInline: "auto" }}>
            The cards below are placeholder demo reviews, shown only to
            illustrate the layout — real customer feedback will replace
            them here.
          </p>
        </div>

        <div className="testimonials__grid">
          {testimonials.map((t) => (
            <figure className="testimonial-card" key={t.id}>
              <FaQuoteLeft className="testimonial-card__quote" aria-hidden="true" />
              <blockquote>{t.text}</blockquote>
              <figcaption>
                {t.name}
                {t.isDemo && <span className="testimonial-card__badge">Demo review</span>}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
