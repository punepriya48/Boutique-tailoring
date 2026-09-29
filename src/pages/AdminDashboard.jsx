import { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { FaBoxes, FaClipboardList, FaCalendarCheck, FaChartLine, FaPlus, FaTrash, FaEdit, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import defaultProducts from "../data/products.js";
import "./AdminDashboard.css";

function AdminDashboard() {
  const { user, isAdmin } = useAuth();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'products' | 'orders' | 'bookings'

  // Local Admin State initialized from storage / defaults
  const [productList, setProductList] = useState(() => {
    try {
      const saved = localStorage.getItem("priyas_admin_products");
      return saved ? JSON.parse(saved) : defaultProducts;
    } catch {
      return defaultProducts;
    }
  });

  const [ordersList, setOrdersList] = useState(() => {
    try {
      const saved = localStorage.getItem("priyas_customer_orders");
      return saved ? JSON.parse(saved) : [
        {
          id: "ORD-928174",
          items: [{ product: defaultProducts[0], selectedSize: "34 (M)", quantity: 1 }],
          grandTotal: 2499,
          deliveryType: "delivery",
          shippingInfo: { name: "Ananya Sharma", phone: "+91 9876543210", city: "Pune" },
          paymentMethod: "cod",
          status: "In Stitching",
          createdAt: "2026-09-28",
        },
      ];
    } catch {
      return [];
    }
  });

  const [bookingsList, setBookingsList] = useState(() => {
    try {
      const saved = localStorage.getItem("priyas_tailoring_bookings");
      return saved ? JSON.parse(saved) : [
        {
          id: "BOOK-482019",
          name: "Ritu Verma",
          phone: "+91 9812345678",
          service: "Blouse Stitching",
          preferredDate: "2026-10-02",
          preferredTime: "02:00 PM - 04:00 PM",
          bust: "36 in",
          waist: "30 in",
          fabricType: "Pure Silk Saree Material",
          status: "Confirmed",
          createdAt: "2026-09-29",
        },
      ];
    } catch {
      return [];
    }
  });

  // Modal for Adding / Editing Product
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProductForm, setNewProductForm] = useState({
    name: "",
    category: "Blouses",
    price: "",
    originalPrice: "",
    description: "",
    availableSizes: "32 (S), 34 (M), 36 (L), Custom Measurement",
    inStock: true,
    featured: false,
  });

  // Sync products to local storage
  useEffect(() => {
    try {
      localStorage.setItem("priyas_admin_products", JSON.stringify(productList));
    } catch (e) {
      console.error(e);
    }
  }, [productList]);

  // Sync orders to local storage
  useEffect(() => {
    try {
      localStorage.setItem("priyas_customer_orders", JSON.stringify(ordersList));
    } catch (e) {
      console.error(e);
    }
  }, [ordersList]);

  // Sync bookings to local storage
  useEffect(() => {
    try {
      localStorage.setItem("priyas_tailoring_bookings", JSON.stringify(bookingsList));
    } catch (e) {
      console.error(e);
    }
  }, [bookingsList]);

  // Route Guard: Require Admin Role
  if (!user || !isAdmin) {
    return (
      <div className="admin-page page-container">
        <div className="container">
          <div className="admin-access-denied card">
            <FaExclamationCircle className="warning-icon" />
            <h2>Admin Access Required</h2>
            <p>You must be logged in as an administrator to view this page.</p>
            <p className="login-hint">Demo Admin Email: <code>admin@priyasboutique.com</code> | Password: <code>admin123</code></p>
            <Link to="/login" className="btn btn-primary margin-top">
              Log In as Admin
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Handle Add / Edit Product Submit
  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!newProductForm.name || !newProductForm.price) {
      addToast("Product name and price are required", "error");
      return;
    }

    const sizesArr = newProductForm.availableSizes
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingProduct) {
      setProductList((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                ...newProductForm,
                price: Number(newProductForm.price),
                originalPrice: newProductForm.originalPrice ? Number(newProductForm.originalPrice) : undefined,
                availableSizes: sizesArr,
              }
            : p
        )
      );
      addToast("Product updated successfully!", "success");
    } else {
      const created = {
        id: `prod-${Date.now()}`,
        ...newProductForm,
        price: Number(newProductForm.price),
        originalPrice: newProductForm.originalPrice ? Number(newProductForm.originalPrice) : undefined,
        image: defaultProducts[0].image, // default SVG placeholder
        availableSizes: sizesArr,
        rating: 5.0,
        reviewCount: 1,
      };
      setProductList((prev) => [created, ...prev]);
      addToast("New product added to catalog!", "success");
    }

    setShowProductModal(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProductList((prev) => prev.filter((p) => p.id !== id));
      addToast("Product deleted", "info");
    }
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrdersList((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    addToast(`Order #${orderId} status updated to "${newStatus}"`, "success");
  };

  const handleUpdateBookingStatus = (bookingId, newStatus) => {
    setBookingsList((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );
    addToast(`Booking #${bookingId} status updated to "${newStatus}"`, "success");
  };

  const totalRevenue = ordersList.reduce((sum, o) => sum + (o.grandTotal || 0), 0);
  const pendingBookingsCount = bookingsList.filter((b) => b.status === "Pending" || b.status === "Confirmed").length;

  return (
    <div className="admin-dashboard page-container">
      <header className="admin-header">
        <div className="container admin-header-content">
          <div>
            <span className="badge badge-gold">Store Administrator Panel</span>
            <h1 className="page-title">Kalpana's Boutique Admin Dashboard</h1>
          </div>
          <div className="admin-user-tag">
            <span>Welcome, <strong>{user.name}</strong></span>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container">
          {/* Dashboard Navigation Tabs */}
          <div className="admin-nav-tabs">
            <button
              type="button"
              className={`admin-tab ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              <FaChartLine /> Overview
            </button>

            <button
              type="button"
              className={`admin-tab ${activeTab === "products" ? "active" : ""}`}
              onClick={() => setActiveTab("products")}
            >
              <FaBoxes /> Products ({productList.length})
            </button>

            <button
              type="button"
              className={`admin-tab ${activeTab === "orders" ? "active" : ""}`}
              onClick={() => setActiveTab("orders")}
            >
              <FaClipboardList /> Customer Orders ({ordersList.length})
            </button>

            <button
              type="button"
              className={`admin-tab ${activeTab === "bookings" ? "active" : ""}`}
              onClick={() => setActiveTab("bookings")}
            >
              <FaCalendarCheck /> Tailoring Appointments ({bookingsList.length})
            </button>
          </div>

          {/* TAB 1: OVERVIEW METRICS */}
          {activeTab === "overview" && (
            <div className="admin-overview-grid">
              <div className="metric-card card">
                <span className="metric-label">Total Revenue</span>
                <strong className="metric-value">₹{totalRevenue}</strong>
                <span className="metric-sub">From completed & online orders</span>
              </div>

              <div className="metric-card card">
                <span className="metric-label">Total Orders</span>
                <strong className="metric-value">{ordersList.length}</strong>
                <span className="metric-sub">Customer e-commerce purchases</span>
              </div>

              <div className="metric-card card">
                <span className="metric-label">Active Appointments</span>
                <strong className="metric-value">{pendingBookingsCount}</strong>
                <span className="metric-sub">Tailoring & fitting sessions</span>
              </div>

              <div className="metric-card card">
                <span className="metric-label">Catalog Products</span>
                <strong className="metric-value">{productList.length}</strong>
                <span className="metric-sub">Designs in shop catalog</span>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS MANAGEMENT */}
          {activeTab === "products" && (
            <div className="admin-products-view">
              <div className="admin-section-header">
                <h2>Product Catalog Management</h2>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setEditingProduct(null);
                    setNewProductForm({
                      name: "",
                      category: "Blouses",
                      price: "",
                      originalPrice: "",
                      description: "",
                      availableSizes: "32 (S), 34 (M), 36 (L), Custom Measurement",
                      inStock: true,
                      featured: false,
                    });
                    setShowProductModal(true);
                  }}
                >
                  <FaPlus /> Add New Design
                </button>
              </div>

              <div className="admin-table-container card">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Product Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Featured</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productList.map((prod) => (
                      <tr key={prod.id}>
                        <td>
                          <img src={prod.image} alt={prod.name} className="table-thumb" />
                        </td>
                        <td>
                          <strong>{prod.name}</strong>
                        </td>
                        <td><span className="badge badge-gold">{prod.category}</span></td>
                        <td><strong>₹{prod.price}</strong></td>
                        <td>
                          <span className={`badge ${prod.inStock ? "badge-green" : "badge-rose"}`}>
                            {prod.inStock ? "In Stock" : "Out of Stock"}
                          </span>
                        </td>
                        <td>{prod.featured ? "Yes ⭐" : "No"}</td>
                        <td>
                          <div className="action-buttons-cell">
                            <button
                              type="button"
                              className="table-btn btn-edit"
                              onClick={() => {
                                setEditingProduct(prod);
                                setNewProductForm({
                                  name: prod.name,
                                  category: prod.category,
                                  price: prod.price,
                                  originalPrice: prod.originalPrice || "",
                                  description: prod.description,
                                  availableSizes: prod.availableSizes ? prod.availableSizes.join(", ") : "",
                                  inStock: prod.inStock,
                                  featured: prod.featured || false,
                                });
                                setShowProductModal(true);
                              }}
                            >
                              <FaEdit />
                            </button>
                            <button
                              type="button"
                              className="table-btn btn-delete"
                              onClick={() => handleDeleteProduct(prod.id)}
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: ORDERS MANAGEMENT */}
          {activeTab === "orders" && (
            <div className="admin-orders-view">
              <h2 className="margin-bottom">Customer Orders</h2>

              <div className="admin-table-container card">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer Details</th>
                      <th>Items Count</th>
                      <th>Total Amount</th>
                      <th>Payment</th>
                      <th>Status</th>
                      <th>Update Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordersList.map((ord) => (
                      <tr key={ord.id}>
                        <td><strong>#{ord.id}</strong></td>
                        <td>
                          <div><strong>{ord.shippingInfo?.name || "Customer"}</strong></div>
                          <div className="subtext">{ord.shippingInfo?.phone}</div>
                        </td>
                        <td>{ord.items?.length || 1} item(s)</td>
                        <td><strong>₹{ord.grandTotal}</strong></td>
                        <td><span className="badge badge-gold">{ord.paymentMethod?.toUpperCase()}</span></td>
                        <td>
                          <span className="badge badge-rose">{ord.status}</span>
                        </td>
                        <td>
                          <select
                            value={ord.status}
                            onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                            className="form-select status-select"
                          >
                            <option value="Placed">Placed</option>
                            <option value="In Stitching">In Stitching</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: TAILORING BOOKINGS MANAGEMENT */}
          {activeTab === "bookings" && (
            <div className="admin-bookings-view">
              <h2 className="margin-bottom">Tailoring Appointments & Fitting Sessions</h2>

              <div className="admin-table-container card">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Ref ID</th>
                      <th>Customer</th>
                      <th>Service</th>
                      <th>Preferred Slot</th>
                      <th>Measurements / Notes</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookingsList.map((bk) => (
                      <tr key={bk.id}>
                        <td><strong>#{bk.id}</strong></td>
                        <td>
                          <div><strong>{bk.name}</strong></div>
                          <div className="subtext">{bk.phone}</div>
                        </td>
                        <td>{bk.service}</td>
                        <td>
                          <div>{bk.preferredDate}</div>
                          <div className="subtext">{bk.preferredTime}</div>
                        </td>
                        <td>
                          {bk.bust && <div>Bust: {bk.bust}</div>}
                          {bk.fabricType && <div className="subtext">Fabric: {bk.fabricType}</div>}
                        </td>
                        <td>
                          <span className="badge badge-green">{bk.status}</span>
                        </td>
                        <td>
                          <select
                            value={bk.status}
                            onChange={(e) => handleUpdateBookingStatus(bk.id, e.target.value)}
                            className="form-select status-select"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Product Add / Edit Modal */}
      {showProductModal && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-card card">
            <h2>{editingProduct ? "Edit Product" : "Add New Design"}</h2>
            <form onSubmit={handleSaveProduct}>
              <div className="form-group">
                <label className="form-label">Product Name *</label>
                <input
                  type="text"
                  className="form-input"
                  value={newProductForm.name}
                  onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Category *</label>
                  <select
                    className="form-select"
                    value={newProductForm.category}
                    onChange={(e) => setNewProductForm({ ...newProductForm, category: e.target.value })}
                  >
                    <option value="Blouses">Blouses</option>
                    <option value="Lehengas">Lehengas</option>
                    <option value="Dresses">Dresses</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Price (₹) *</label>
                  <input
                    type="number"
                    className="form-input"
                    value={newProductForm.price}
                    onChange={(e) => setNewProductForm({ ...newProductForm, price: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-textarea"
                  value={newProductForm.description}
                  onChange={(e) => setNewProductForm({ ...newProductForm, description: e.target.value })}
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowProductModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
