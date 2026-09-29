import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaStar, FaShoppingBag, FaWhatsapp, FaArrowLeft, FaCheckCircle, FaRulerCombined } from "react-icons/fa";
import products from "../data/products.js";
import { useCart } from "../context/CartContext.jsx";
import { buildWhatsAppLink } from "../utils/whatsapp.js";
import "./ProductDetailPage.css";

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === id) || products[0];
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState(product.availableSizes[0] || "Standard");
  const [quantity, setQuantity] = useState(1);
  const [showCustomFields, setShowCustomFields] = useState(false);
  const [customBust, setCustomBust] = useState("");
  const [customWaist, setCustomWaist] = useState("");
  const [customNotes, setCustomNotes] = useState("");

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    setShowCustomFields(size.includes("Custom"));
  };

  const handleAddToCart = () => {
    const customMeasurements = showCustomFields
      ? { bust: customBust, waist: customWaist, notes: customNotes }
      : {};
    addToCart(product, quantity, selectedSize, customMeasurements);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  const whatsappInquiryMsg = `Hello Priya's Boutique! I am interested in ordering "${product.name}" (Price: ₹${product.price}, Size: ${selectedSize}). Could you please confirm fabric availability?`;
  const whatsappUrl = buildWhatsAppLink(whatsappInquiryMsg);

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="product-detail-page page-container">
      <div className="container">
        {/* Breadcrumb Back Link */}
        <div className="detail-breadcrumb">
          <Link to="/collection" className="back-link">
            <FaArrowLeft /> Back to Collection
          </Link>
        </div>

        <div className="product-detail-grid">
          {/* Left Column: Image Gallery */}
          <div className="detail-gallery">
            <div className="main-image-wrap card">
              <img
                src={selectedImage || product.image}
                alt={product.name}
                className="main-image"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="thumbnails-row">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`thumb-btn ${selectedImage === img ? "active" : ""}`}
                    onClick={() => setSelectedImage(img)}
                  >
                    <img src={img} alt={`${product.name} thumb ${idx}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Information & Purchase Controls */}
          <div className="detail-info">
            <span className="detail-category">{product.category}</span>
            <h1 className="detail-title">{product.name}</h1>

            <div className="detail-rating-row">
              <div className="stars">
                <FaStar className="star-icon" />
                <span className="rating-num">{product.rating}</span>
              </div>
              <span className="dot">•</span>
              <span className="reviews">{product.reviewCount} customer reviews</span>
              <span className="dot">•</span>
              <span className="stock-status">
                <FaCheckCircle className="check-icon" /> In Stock & Made-to-Order
              </span>
            </div>

            <div className="detail-price-box">
              <span className="price-main">₹{product.price}</span>
              {product.originalPrice && (
                <span className="price-slash">₹{product.originalPrice}</span>
              )}
              <span className="badge badge-gold">Custom Stitching Included</span>
            </div>

            <p className="detail-description">{product.description}</p>

            {/* Size Selector */}
            <div className="size-selector-section">
              <div className="size-header">
                <label className="form-label">Select Size / Fit Option:</label>
                <button
                  type="button"
                  className="size-guide-link"
                  onClick={() => setShowCustomFields((v) => !v)}
                >
                  <FaRulerCombined /> Need Custom Fitting?
                </button>
              </div>

              <div className="size-buttons-grid">
                {product.availableSizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`size-btn ${selectedSize === size ? "selected" : ""}`}
                    onClick={() => handleSizeChange(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Measurements Input Box */}
            {showCustomFields && (
              <div className="custom-measurements-card card">
                <h3><FaRulerCombined /> Provide Your Custom Measurements</h3>
                <p className="subtext">
                  Our master tailors will stitch this outfit according to your exact body measurements!
                </p>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Bust / Chest (Inches):</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. 36 inches"
                      value={customBust}
                      onChange={(e) => setCustomBust(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Waist (Inches):</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. 30 inches"
                      value={customWaist}
                      onChange={(e) => setCustomWaist(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Additional Instructions / Length:</label>
                  <textarea
                    className="form-textarea"
                    placeholder="Specify sleeve length, neck depth, or blouse pattern preferences..."
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="quantity-section">
              <label className="form-label">Quantity:</label>
              <div className="quantity-controls">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="qty-btn"
                >
                  -
                </button>
                <span className="qty-value">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="qty-btn"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="detail-actions">
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={handleAddToCart}
              >
                <FaShoppingBag /> Add to Cart
              </button>

              <button
                type="button"
                className="btn btn-outline btn-lg"
                onClick={handleBuyNow}
              >
                Buy Now
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
              >
                <FaWhatsapp /> Ask on WhatsApp
              </a>
            </div>

            {/* Technical Specifications */}
            {product.details && (
              <div className="product-specs-box">
                <h3>Product Specifications</h3>
                <ul>
                  {Object.entries(product.details).map(([key, val]) => (
                    <li key={key}>
                      <span className="spec-name">
                        {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}:
                      </span>
                      <span className="spec-val">{val}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="related-section section">
            <h2 className="section-title">You May Also Like</h2>
            <div className="products-grid margin-top">
              {relatedProducts.map((rel) => (
                <div key={rel.id} className="product-card card">
                  <div className="product-card__image-wrap">
                    <img src={rel.image} alt={rel.name} className="product-card__image" />
                  </div>
                  <div className="product-card__body">
                    <span className="product-card__category">{rel.category}</span>
                    <h3 className="product-card__title">
                      <Link to={`/product/${rel.id}`}>{rel.name}</Link>
                    </h3>
                    <div className="product-card__footer">
                      <span className="price-current">₹{rel.price}</span>
                      <Link to={`/product/${rel.id}`} className="btn btn-sm btn-outline">
                        View Item
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default ProductDetailPage;
