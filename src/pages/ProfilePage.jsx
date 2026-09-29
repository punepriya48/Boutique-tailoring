import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaShoppingBag, FaCalendarCheck, FaSignOutAlt, FaShieldAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext.jsx";
import "./ProfilePage.css";

function ProfilePage() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [myOrders, setMyOrders] = useState([]);
  const [myBookings, setMyBookings] = useState([]);

  useEffect(() => {
    try {
      const orders = JSON.parse(localStorage.getItem("priyas_customer_orders") || "[]");
      setMyOrders(orders);
      const bookings = JSON.parse(localStorage.getItem("priyas_tailoring_bookings") || "[]");
      setMyBookings(bookings);
    } catch (e) {
      console.error(e);
    }
  }, []);

  if (!user) {
    return (
      <div className="profile-page page-container">
        <div className="container">
          <div className="card text-center padding-lg">
            <h2>Please Log In</h2>
            <p>You need to log in to view your profile and orders.</p>
            <Link to="/login" className="btn btn-primary margin-top">
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="profile-page page-container">
      <header className="page-header">
        <div className="container">
          <div className="profile-user-header">
            <div>
              <span className="section-kicker">My Customer Profile</span>
              <h1 className="page-title">{user.name}</h1>
              <p className="page-subtitle">{user.email}</p>
            </div>
            <div className="profile-actions">
              {isAdmin && (
                <Link to="/admin" className="btn btn-outline">
                  <FaShieldAlt /> Open Admin Dashboard
                </Link>
              )}
              <button type="button" className="btn btn-outline" onClick={handleLogout}>
                <FaSignOutAlt /> Log Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="profile-grid">
            {/* Orders Section */}
            <div className="profile-section">
              <div className="section-header-icon">
                <FaShoppingBag className="icon" />
                <h2>My Orders ({myOrders.length})</h2>
              </div>

              {myOrders.length === 0 ? (
                <div className="empty-box card">
                  <p>You haven't placed any catalog orders yet.</p>
                  <Link to="/collection" className="btn btn-sm btn-primary margin-top-sm">
                    Browse Collection
                  </Link>
                </div>
              ) : (
                <div className="history-cards-list">
                  {myOrders.map((ord) => (
                    <div key={ord.id} className="history-card card">
                      <div className="history-card-head">
                        <div>
                          <strong>Order #{ord.id}</strong>
                          <div className="subtext">Placed on {ord.createdAt}</div>
                        </div>
                        <span className="badge badge-rose">{ord.status}</span>
                      </div>

                      <div className="history-items-summary">
                        {ord.items && ord.items.map((item, idx) => (
                          <div key={idx} className="item-row">
                            <span>{item.product.name} ({item.selectedSize}) × {item.quantity}</span>
                            <strong>₹{item.product.price * item.quantity}</strong>
                          </div>
                        ))}
                      </div>

                      <div className="history-card-foot">
                        <span>Total Paid ({ord.paymentMethod?.toUpperCase()}):</span>
                        <strong>₹{ord.grandTotal}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tailoring Bookings Section */}
            <div className="profile-section">
              <div className="section-header-icon">
                <FaCalendarCheck className="icon" />
                <h2>My Fitting Appointments ({myBookings.length})</h2>
              </div>

              {myBookings.length === 0 ? (
                <div className="empty-box card">
                  <p>You have no scheduled tailoring appointments.</p>
                  <Link to="/booking" className="btn btn-sm btn-primary margin-top-sm">
                    Book Tailoring Service
                  </Link>
                </div>
              ) : (
                <div className="history-cards-list">
                  {myBookings.map((bk) => (
                    <div key={bk.id} className="history-card card">
                      <div className="history-card-head">
                        <div>
                          <strong>Ref #{bk.id}</strong>
                          <div className="subtext">{bk.service}</div>
                        </div>
                        <span className="badge badge-green">{bk.status}</span>
                      </div>

                      <div className="booking-info-body">
                        <div>📅 Date: <strong>{bk.preferredDate}</strong> ({bk.preferredTime})</div>
                        {bk.bust && <div>📐 Bust Measurement: {bk.bust}</div>}
                        {bk.fabricType && <div>🧵 Fabric: {bk.fabricType}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProfilePage;
