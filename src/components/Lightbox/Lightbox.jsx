import { useEffect, useCallback } from "react";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Lightbox.css";

function Lightbox({ item, onClose, onNext, onPrev }) {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    },
    [onClose, onNext, onPrev]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={item.title}>
      <button type="button" className="lightbox__backdrop" aria-label="Close" onClick={onClose} />

      <button type="button" className="lightbox__close" onClick={onClose} aria-label="Close preview">
        <FaTimes />
      </button>

      <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={onPrev} aria-label="Previous photo">
        <FaChevronLeft />
      </button>

      <figure className="lightbox__figure">
        <img src={item.image} alt={item.title} />
        <figcaption>
          {item.title} <span>— {item.caption}</span>
        </figcaption>
      </figure>

      <button type="button" className="lightbox__nav lightbox__nav--next" onClick={onNext} aria-label="Next photo">
        <FaChevronRight />
      </button>
    </div>
  );
}

export default Lightbox;
