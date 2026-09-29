import aboutPhoto from "../../assets/about-photo.svg";
import "./About.css";

function About() {
  return (
    <section id="about" className="section about">
      <div className="container about__grid">
        <div className="about__media">
          <img
            src="https://internal.karsaaz.app/uploads/seo_pages/c5fe695fd415d73448d27469f6b79a3b32fbcb71.png"
            alt="Placeholder photo space — add a photo of the tailor here"
            width="700"
            height="800"
          />
        </div>

        <div className="about__content">
          <p className="section-kicker">About the atelier</p>
          <h2 className="section-title">Stitched with care, fitted with attention</h2>
          <hr className="rule" />

          <p className="about__text">
            Every outfit is stitched with care, attention to detail and a
            focus on comfortable fitting. From everyday dresses to
            special-occasion blouses and lehengas, every design is
            customised according to the customer's requirements.
          </p>
          <p className="about__text">
            This is placeholder content — replace it with a short note in
            your mother's own words about how she approaches her work,
            what she enjoys stitching most, or anything else she'd like
            customers to know.
          </p>

          <a href="#services" className="btn btn-outline about__cta">
            See what's stitched here
          </a>
        </div>
      </div>
    </section>
  );
}

export default About;
