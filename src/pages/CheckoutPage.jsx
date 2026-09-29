import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLock, FaCheckCircle, FaTruck, FaStore, FaCreditCard, FaMoneyBillWave, FaMobileAlt, FaWhatsapp } from "react-icons/fa";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { buildWhatsAppLink } from "../utils/whatsapp.js";
import "./CheckoutPage.css";

function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [deliveryType, setDeliveryType] = useState("delivery"); // 'delivery' | 'pickup'
  const [paymentMethod, setPaymentMethod] = useState("cod"); // 'cod' | 'upi' | 'razorpay'

  const [shippingInfo, setShippingInfo] = useState({
    name: user?.name || "",
    phone: "",
    email: user?.email || "",
    address: "",
    city: "Pune",
    pincode: "411001",
    state: "Maharashtra",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  const shippingFee = deliveryType === "pickup" ? 0 : cartTotal > 3000 ? 0 : 150;
  const grandTotal = cartTotal + shippingFee;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const errs = {};
    if (!shippingInfo.name.trim()) errs.name = "Full name is required";
    if (!shippingInfo.phone.trim() || shippingInfo.phone.length < 8) {
      errs.phone = "Valid contact phone is required";
    }
    if (deliveryType === "delivery") {
      if (!shippingInfo.address.trim()) errs.address = "Delivery address is required";
      if (!shippingInfo.pincode.trim()) errs.pincode = "Pincode is required";
    }
    return errs;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const valErrs = validate();
    if (Object.keys(valErrs).length > 0) {
      setErrors(valErrs);
      addToast("Please fill in all required shipping details", "error");
      return;
    }

    if (cart.length === 0) {
      addToast("Your cart is empty", "error");
      navigate("/collection");
      return;
    }

    const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      id: orderId,
      items: cart,
      subtotal: cartTotal,
      shippingFee,
      grandTotal,
      deliveryType,
      shippingInfo,
      paymentMethod,
      status: "Placed",
      createdAt: new Date().toLocaleDateString(),
    };

    // Store in localStorage for user order history
    try {
      const existingOrders = JSON.parse(localStorage.getItem("priyas_customer_orders") || "[]");
      localStorage.setItem("priyas_customer_orders", JSON.stringify([newOrder, ...existingOrders]));
    } catch (err) {
      console.error(err);
    }

    setCompletedOrder(newOrder);
    setOrderPlaced(true);
    clearCart();
    addToast("Order placed successfully!", "success");
  };

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="checkout-page page-container">
        <div className="container">
          <div className="empty-cart-card card">
            <h2>No Items to Checkout</h2>
            <p>Please add items to your cart before proceeding.</p>
            <Link to="/collection" className="btn btn-primary">
              Browse Collection
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const generateOrderWhatsAppMsg = () => {
    if (!completedOrder) return "";
    const lines = [
      `🛍️ *New Order Placed - Priya's Boutique*`,
      `*Order ID:* #${completedOrder.id}`,
      ``,
      `👤 *Customer:* ${completedOrder.shippingInfo.name}`,
      `📞 *Phone:* ${completedOrder.shippingInfo.phone}`,
      `📍 *Option:* ${completedOrder.deliveryType === "pickup" ? "Store Pickup at Boutique" : "Home Delivery"}`,
      completedOrder.deliveryType === "delivery" ? `🏠 *Address:* ${completedOrder.shippingInfo.address}, ${completedOrder.shippingInfo.city} - ${completedOrder.shippingInfo.pincode}` : "",
      `💳 *Payment Method:* ${completedOrder.paymentMethod.toUpperCase()}`,
      `💰 *Total Amount:* ₹${completedOrder.grandTotal}`,
      ``,
      `📦 *Items:*`,
      ...completedOrder.items.map((i) => `- ${i.product.name} (${i.selectedSize}) × ${i.quantity} = ₹${i.product.price * i.quantity}`),
    ];
    return lines.filter(Boolean).join("\n");
  };

  return (
    <div className="checkout-page page-container">
      <header className="page-header">
        <div className="container">
          <h1 className="page-title">Checkout</h1>
          <p className="page-subtitle">Complete your details to place your custom tailoring order.</p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          {orderPlaced && completedOrder ? (
            <div className="order-success-card card">
              <FaCheckCircle className="success-icon" />
              <h2>Thank You! Your Order is Placed</h2>
              <p className="order-id">Order Reference ID: <strong>#{completedOrder.id}</strong></p>

              <div className="order-summary-box">
                <h3>Order Summary</h3>
                <div className="order-items-preview">
                  {completedOrder.items.map((item) => (
                    <div key={item.key} className="preview-item">
                      <span>{item.product.name} ({item.selectedSize}) × {item.quantity}</span>
                      <strong>₹{item.product.price * item.quantity}</strong>
                    </div>
                  ))}
                  <div className="preview-total-line">
                    <span>Grand Total ({completedOrder.paymentMethod.toUpperCase()})</span>
                    <strong>₹{completedOrder.grandTotal}</strong>
                  </div>
                </div>
              </div>

              <div className="whatsapp-prompt">
                <h3>Confirm & Track Order on WhatsApp</h3>
                <p>Send your order receipt directly to Priya on WhatsApp for priority processing and delivery updates!</p>
                <a
                  href={buildWhatsAppLink(generateOrderWhatsAppMsg())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-block btn-lg"
                >
                  <FaWhatsapp /> Send Order to WhatsApp
                </a>
              </div>

              <div className="confirmation-actions">
                <Link to="/collection" className="btn btn-primary">
                  Continue Shopping
                </Link>
                {user && (
                  <Link to="/profile" className="btn btn-outline">
                    View My Orders
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <form onSubmit={handlePlaceOrder} noValidate className="checkout-form-grid">
              {/* Left Column: Delivery & Customer Info */}
              <div className="checkout-main-form">
                {/* Delivery Method Choice */}
                <div className="card checkout-card">
                  <h2>1. Fulfillment Method</h2>
                  <div className="delivery-toggle-grid">
                    <button
                      type="button"
                      className={`delivery-option-btn ${deliveryType === "delivery" ? "active" : ""}`}
                      onClick={() => setDeliveryType("delivery")}
                    >
                      <FaTruck className="option-icon" />
                      <div>
                        <strong>Home Delivery</strong>
                        <span>Delivered to your doorstep across India</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      className={`delivery-option-btn ${deliveryType === "pickup" ? "active" : ""}`}
                      onClick={() => setDeliveryType("pickup")}
                    >
                      <FaStore className="option-icon" />
                      <div>
                        <strong>Boutique Store Pickup</strong>
                        <span>Pick up at Shanti Nagar, Pune (Free)</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Customer Information & Address */}
                <div className="card checkout-card margin-top">
                  <h2>2. Contact & Delivery Details</h2>
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        className="form-input"
                        placeholder="Enter full name"
                        value={shippingInfo.name}
                        onChange={handleChange}
                      />
                      {errors.name && <span className="form-error">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Contact Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        className="form-input"
                        placeholder="Phone number"
                        value={shippingInfo.phone}
                        onChange={handleChange}
                      />
                      {errors.phone && <span className="form-error">{errors.phone}</span>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address (Optional)</label>
                    <input
                      type="email"
                      name="email"
                      className="form-input"
                      placeholder="For digital invoice"
                      value={shippingInfo.email}
                      onChange={handleChange}
                    />
                  </div>

                  {deliveryType === "delivery" && (
                    <>
                      <div className="form-group">
                        <label className="form-label">Street Address / House No. *</label>
                        <input
                          type="text"
                          name="address"
                          className="form-input"
                          placeholder="House/Flat No., Street, Area"
                          value={shippingInfo.address}
                          onChange={handleChange}
                        />
                        {errors.address && <span className="form-error">{errors.address}</span>}
                      </div>

                      <div className="form-grid-3">
                        <div className="form-group">
                          <label className="form-label">City *</label>
                          <input
                            type="text"
                            name="city"
                            className="form-input"
                            value={shippingInfo.city}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">Pincode *</label>
                          <input
                            type="text"
                            name="pincode"
                            className="form-input"
                            value={shippingInfo.pincode}
                            onChange={handleChange}
                          />
                          {errors.pincode && <span className="form-error">{errors.pincode}</span>}
                        </div>

                        <div className="form-group">
                          <label className="form-label">State *</label>
                          <input
                            type="text"
                            name="state"
                            className="form-input"
                            value={shippingInfo.state}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Payment Options */}
                <div className="card checkout-card margin-top">
                  <h2>3. Select Payment Method</h2>
                  <div className="payment-methods-grid">
                    <label className={`payment-radio-card ${paymentMethod === "cod" ? "selected" : ""}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                      />
                      <FaMoneyBillWave className="payment-icon" />
                      <div>
                        <strong>Cash on Delivery / Pay at Store</strong>
                        <span>Pay in cash upon delivery or boutique pickup</span>
                      </div>
                    </label>

                    <label className={`payment-radio-card ${paymentMethod === "upi" ? "selected" : ""}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={paymentMethod === "upi"}
                        onChange={() => setPaymentMethod("upi")}
                      />
                      <FaMobileAlt className="payment-icon" />
                      <div>
                        <strong>UPI / Google Pay / PhonePe</strong>
                        <span>Direct instant UPI transfer to store account</span>
                      </div>
                    </label>

                    <label className={`payment-radio-card ${paymentMethod === "razorpay" ? "selected" : ""}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="razorpay"
                        checked={paymentMethod === "razorpay"}
                        onChange={() => setPaymentMethod("razorpay")}
                      />
                      <FaCreditCard className="payment-icon" />
                      <div>
                        <strong>Credit / Debit Card / Netbanking (Razorpay)</strong>
                        <span>Secure online payment gateway checkout</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column: Order Summary Sidebar */}
              <div className="checkout-summary-sidebar">
                <div className="summary-card card">
                  <h2>Order Items ({cart.length})</h2>

                  <div className="checkout-items-mini">
                    {cart.map((item) => (
                      <div key={item.key} className="mini-item">
                        <img src={item.product.image} alt={item.product.name} />
                        <div className="mini-item-info">
                          <h4>{item.product.name}</h4>
                          <span className="mini-size">Size: {item.selectedSize} × {item.quantity}</span>
                        </div>
                        <span className="mini-price">₹{item.product.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="summary-divider"></div>

                  <div className="summary-line">
                    <span>Subtotal</span>
                    <span>₹{cartTotal}</span>
                  </div>

                  <div className="summary-line">
                    <span>Shipping Fee</span>
                    <span>{shippingFee === 0 ? <strong className="text-green">FREE</strong> : `₹${shippingFee}`}</span>
                  </div>

                  <div className="summary-line summary-total">
                    <span>Total Amount</span>
                    <span>₹{grandTotal}</span>
                  </div>

                  <button type="submit" className="btn btn-primary btn-block btn-lg margin-top">
                    <FaLock /> Place Order (₹{grandTotal})
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

export default CheckoutPage;
