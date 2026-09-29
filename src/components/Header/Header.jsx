import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaPhoneAlt, FaShoppingBag, FaUser, FaUserShield } from "react-icons/fa";
import siteConfig from "../../config/siteConfig.js";
import { buildTelLink } from "../../utils/whatsapp.js";
import { useCart } from "../../context/CartContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import "./Header.css";

const NAV_ITEMS = [
  { path: "/", label: "Home" },
  { path: "/collection", label: "Collection" },
  { path: "/services", label: "Services" },
  { path: "/booking", label: "Book Tailoring" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
];

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { cartCount } = useCart();
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
      <div className="container site-header__bar">
        <Link to="/" className="site-header__brand">
          <span className="site-header__brand-title">{siteConfig.businessName}</span>
        </Link>

        <nav className="site-header__nav" aria-label="Primary">
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                  end={item.path === "/"}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          {/* Cart Icon Badge */}
          <Link to="/cart" className="header-action-btn header-cart-btn" aria-label="Shopping Cart">
            <FaShoppingBag />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          {/* User Account / Profile / Admin link */}
          {user ? (
            <Link
              to={isAdmin ? "/admin" : "/profile"}
              className="header-action-btn header-auth-btn"
              title={user.name}
            >
              {isAdmin ? <FaUserShield className="icon-admin" /> : <FaUser />}
              <span className="user-name-label">{isAdmin ? "Admin" : user.name.split(" ")[0]}</span>
            </Link>
          ) : (
            <Link to="/login" className="header-action-btn header-auth-btn" title="Login">
              <FaUser />
              <span className="user-name-label">Login</span>
            </Link>
          )}

          {/* Quick Call */}
          <a href={buildTelLink()} className="site-header__call" aria-label={`Call ${siteConfig.phoneDisplay}`}>
            <FaPhoneAlt aria-hidden="true" />
            <span>Call</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="mobile-header-right">
          <Link to="/cart" className="mobile-cart-icon" aria-label="Shopping Cart">
            <FaShoppingBag />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          <button
            type="button"
            className="site-header__toggle"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((v) => !v)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-menu ${isOpen ? "mobile-menu--open" : ""}`}>
        <nav aria-label="Mobile">
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => (isActive ? "mobile-nav-link active" : "mobile-nav-link")}
                  onClick={() => setIsOpen(false)}
                  end={item.path === "/"}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink
                to="/cart"
                className={({ isActive }) => (isActive ? "mobile-nav-link active" : "mobile-nav-link")}
                onClick={() => setIsOpen(false)}
              >
                Cart ({cartCount})
              </NavLink>
            </li>
            <li>
              {user ? (
                <NavLink
                  to={isAdmin ? "/admin" : "/profile"}
                  className={({ isActive }) => (isActive ? "mobile-nav-link active" : "mobile-nav-link")}
                  onClick={() => setIsOpen(false)}
                >
                  {isAdmin ? "Admin Dashboard" : `My Profile (${user.name})`}
                </NavLink>
              ) : (
                <NavLink
                  to="/login"
                  className={({ isActive }) => (isActive ? "mobile-nav-link active" : "mobile-nav-link")}
                  onClick={() => setIsOpen(false)}
                >
                  Login / Register
                </NavLink>
              )}
            </li>
          </ul>
        </nav>
        <div className="mobile-menu__footer">
          <a href={buildTelLink()} className="btn btn-primary btn-block mobile-menu__call">
            <FaPhoneAlt aria-hidden="true" /> Call {siteConfig.phoneDisplay}
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
