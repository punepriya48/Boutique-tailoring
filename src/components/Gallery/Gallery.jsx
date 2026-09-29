import { useEffect, useMemo, useState } from "react";
import fallbackGalleryItems, { categories } from "../../data/gallery.js";
import { fetchLiveGallery } from "../../utils/gallerySheet.js";
import Lightbox from "../Lightbox/Lightbox.jsx";
import "./Gallery.css";

function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeIndex, setActiveIndex] = useState(null);
  const [items, setItems] = useState(fallbackGalleryItems);
  const [isLive, setIsLive] = useState(false);
  const [status, setStatus] = useState("loading"); // loading | live | fallback

  useEffect(() => {
    let cancelled = false;

    fetchLiveGallery()
      .then((liveItems) => {
        if (cancelled) return;
        if (liveItems.length > 0) {
          setItems(liveItems);
          setIsLive(true);
          setStatus("live");
        } else {
          setStatus("fallback");
        }
      })
      .catch((err) => {
        console.error("[gallery] Failed to load live gallery, showing samples instead:", err.message);
        if (!cancelled) setStatus("fallback");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return items;
    return items.filter((item) => item.category === activeCategory);
  }, [items, activeCategory]);

  const openLightbox = (index) => setActiveIndex(index);
  const closeLightbox = () => setActiveIndex(null);
  const showNext = () => setActiveIndex((i) => (i + 1) % filteredItems.length);
  const showPrev = () =>
    setActiveIndex((i) => (i - 1 + filteredItems.length) % filteredItems.length);

  return (
    <section id="gallery" className="section gallery">
      <div className="container">
        <div className="section-head section-head--center">
          <p className="section-kicker">A look at the work</p>
          <h2 className="section-title">Portfolio</h2>
          <hr className="rule" />
          <p className="section-sub" style={{ marginInline: "auto" }}>
            {isLive
              ? "Real photos from recent work, updated directly."
              : "Sample placeholder photos are shown here — real stitching photos can be added without changing any layout."}
          </p>
        </div>

        <div className="gallery__filters" role="tablist" aria-label="Filter gallery by category">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat.id}
              className={`gallery__filter ${activeCategory === cat.id ? "gallery__filter--active" : ""}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="gallery__grid">
          {filteredItems.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className="gallery__item"
              onClick={() => openLightbox(index)}
              aria-label={`Enlarge photo: ${item.title}`}
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                width="600"
                height="750"
                referrerPolicy={isLive ? "no-referrer" : undefined}
              />
              <span className="gallery__item-label">{item.title}</span>
            </button>
          ))}
        </div>

        {status === "loading" && (
          <p className="gallery__status" role="status">
            Loading latest photos…
          </p>
        )}
      </div>

      {activeIndex !== null && filteredItems[activeIndex] && (
        <Lightbox
          item={filteredItems[activeIndex]}
          onClose={closeLightbox}
          onNext={showNext}
          onPrev={showPrev}
        />
      )}
    </section>
  );
}

export default Gallery;
