import "./HowItWorks.css";

const STEPS = [
  {
    title: "Contact Us",
    text: "Reach out on WhatsApp or by phone to start the conversation.",
  },
  {
    title: "Share Your Requirement",
    text: "Tell us what you'd like stitched — blouse, lehenga, dress or anything else.",
  },
  {
    title: "Measurement & Design Discussion",
    text: "Measurements are taken and the design, fabric and fit are discussed.",
  },
  {
    title: "Stitching & Delivery",
    text: "Your outfit is stitched with care and handed over on the agreed date.",
  },
];

function HowItWorks() {
  return (
    <section id="process" className="section how">
      <div className="container">
        <div className="section-head section-head--center">
          <p className="section-kicker">From enquiry to delivery</p>
          <h2 className="section-title">How It Works</h2>
          <hr className="rule" />
        </div>

        <ol className="how__steps">
          {STEPS.map((step, index) => (
            <li className="how__step" key={step.title}>
              <span className="how__number">{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default HowItWorks;
