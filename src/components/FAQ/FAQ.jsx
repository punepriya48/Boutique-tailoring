import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import faqItems from "../../data/faq.js";
import "./FAQ.css";

function FAQ() {
  const [openId, setOpenId] = useState(faqItems[0]?.id ?? null);

  const toggle = (id) => setOpenId((current) => (current === id ? null : id));

  return (
    <section id="faq" className="section faq">
      <div className="container">
        <div className="section-head section-head--center">
          <p className="section-kicker">Good to know</p>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <hr className="rule" />
        </div>

        <div className="faq__list">
          {faqItems.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div className={`faq__item ${isOpen ? "faq__item--open" : ""}`} key={item.id}>
                <h3>
                  <button
                    type="button"
                    className="faq__question"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${item.id}`}
                    onClick={() => toggle(item.id)}
                  >
                    {item.question}
                    {isOpen ? <FaMinus aria-hidden="true" /> : <FaPlus aria-hidden="true" />}
                  </button>
                </h3>
                <div
                  className="faq__answer"
                  id={`faq-panel-${item.id}`}
                  role="region"
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
