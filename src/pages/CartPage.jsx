import { Link } from "react-router-dom";
import { FaTrash, FaShoppingBag, FaArrowRight, FaArrowLeft, FaRulerCombined } from "react-icons/fa";
import { useCart } from "../context/CartContext.jsx";
import "./CartPage.css";

function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();

  const shippingFee = cartTotal > 3000 ? 0 : 150;
  const grandTotal = cartTotal + shippingFee;

  if (cart.length === 0) {
    return (
      <div className="cart-page page-container">
        <div className="container">
          <div className="empty-cart-card card">
            <FaShoppingBag className="empty-cart-icon" />
            <h2>Your Shopping Cart is Empty</h2>
            <p>You haven't added any custom blouses, lehengas, or outfits to your cart yet.</p>
            <Link to="/collection" className="btn btn-primary btn-lg">
              Explore Collection
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page page-container">
      <header className="page-header">
        <div className="container">
          <h1 className="page-title">Shopping Cart</h1>
          <p className="page-subtitle">Review your selected boutique items and custom tailoring choices.</p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="cart-layout-grid">
            {/* Items List */}
            <div className="cart-items-list">
              <div className="cart-header-actions">
                <span>{cart.length} Item(s) in Cart</span>
                <button type="button" className="clear-cart-btn" onClick={clearCart}>
                  Clear Cart
                </button>
              </div>

              {cart.map((item) => (
                <div key={item.key} className="cart-item-card card">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="cart-item__image"
                  />

                  <div className="cart-item__details">
                    <span className="cart-item__category">{item.product.category}</span>
                    <h2 className="cart-item__title">
                      <Link to={`/product/${item.product.id}`}>{item.product.name}</Link>
                    </h2>
                    <span className="cart-item__size">Size: <strong>{item.selectedSize}</strong></span>

                    {/* Custom Measurements if present */}
                    {item.customMeasurements && (item.customMeasurements.bust || item.customMeasurements.notes) && (
                      <div className="cart-custom-note">
                        <FaRulerCombined />
                        <span>
                          {item.customMeasurements.bust && `Bust: ${item.customMeasurements.bust} "`}{" "}
                          {item.customMeasurements.waist && `Waist: ${item.customMeasurements.waist} "`}{" "}
                          {item.customMeasurements.notes && `(${item.customMeasurements.notes})`}
                        </span>
                      </div>
                    )}

                    <div className="cart-item__price-mobile">
                      ₹{item.product.price} × {item.quantity} = ₹{item.product.price * item.quantity}
                    </div>
                  </div>

                  {/* Quantity controls */}
                  <div className="cart-item__controls">
                    <div className="quantity-controls">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.key, -1)}
                        className="qty-btn"
                      >
                        -
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.key, 1)}
                        className="qty-btn"
                      >
                        +
                      </button>
                    </div>

                    <span className="cart-item__subtotal">
                      ₹{item.product.price * item.quantity}
                    </span>

                    <button
                      type="button"
                      className="remove-item-btn"
                      onClick={() => removeFromCart(item.key)}
                      title="Remove Item"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}

              <div className="cart-footer-links">
                <Link to="/collection" className="back-link">
                  <FaArrowLeft /> Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="cart-summary-sidebar">
              <div className="summary-card card">
                <h2>Order Summary</h2>

                <div className="summary-line">
                  <span>Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>

                <div className="summary-line">
                  <span>Estimated Delivery</span>
                  <span>{shippingFee === 0 ? <strong className="text-green">FREE</strong> : `₹${shippingFee}`}</span>
                </div>

                {cartTotal < 3000 && (
                  <p className="free-shipping-hint">
                    Add ₹{3000 - cartTotal} more for FREE shipping across India!
                  </p>
                )}

                <div className="summary-divider"></div>

                <div className="summary-line summary-total">
                  <span>Total Amount</span>
                  <span>₹{grandTotal}</span>
                </div>

                <Link to="/checkout" className="btn btn-primary btn-block btn-lg margin-top">
                  Proceed to Checkout <FaArrowRight />
                </Link>

                <div className="cart-trust-notes">
                  <p>✔ Handcrafted with Care</p>
                  <p>✔ Fits Guaranteed or Altered Free</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CartPage;
