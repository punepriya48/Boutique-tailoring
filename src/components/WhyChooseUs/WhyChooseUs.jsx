import {
  FaRulerCombined,
  FaHandsHelping,
  FaCut,
  FaTshirt,
  FaPaintBrush,
  FaMedal,
  FaClock,
} from "react-icons/fa";
import "./WhyChooseUs.css";

const REASONS = [
  { icon: FaRulerCombined, title: "Custom Measurements", text: "Every garment is stitched to your own measurements, not a standard size chart." },
  { icon: FaHandsHelping, title: "Personal Attention", text: "Each order is handled directly, with room to discuss fit and design in detail." },
  { icon: FaCut, title: "Neat Finishing", text: "Clean seams, secure linings and a tidy finish on the inside as well as the outside." },
  { icon: FaTshirt, title: "Comfortable Fitting", text: "Garments are fitted to move and sit comfortably, not just to look right on a hanger." },
  { icon: FaPaintBrush, title: "Customised Designs", text: "Necklines, sleeves, length and detailing are adapted to what you have in mind." },
  { icon: FaMedal, title: "Quality Stitching", text: "Careful, considered stitching at every stage, from cutting to the final press." },
  { icon: FaClock, title: "On-Time Delivery", text: "Realistic timelines are shared upfront so you know when your outfit will be ready." },
];

function WhyChooseUs() {
  return (
    <section className="section section--tint why">
      <div className="container">
        <div className="section-head section-head--center">
          <p className="section-kicker">The difference in the details</p>
          <h2 className="section-title">Why Choose Us</h2>
          <hr className="rule" />
        </div>

        <div className="why__grid">
          {REASONS.map((reason) => (
            <div className="why__item" key={reason.title}>
              <reason.icon aria-hidden="true" className="why__icon" />
              <h3>{reason.title}</h3>
              <p>{reason.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
