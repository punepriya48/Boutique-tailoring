import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaFilter, FaStar, FaShoppingBag, FaEye } from "react-icons/fa";
import products, { PRODUCT_CATEGORIES } from "../data/products.js";
import { useCart } from "../context/CartContext.jsx";
import "./CollectionPage.css";

function CollectionPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(16000);
  const [sortBy, setSortBy] = useState("featured");
  const { addToCart } = useCart();

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesCategory =
          selectedCategory === "all" || product.category === selectedCategory;
        const matchesSearch =
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPrice = product.price <= maxPrice;
        return matchesCategory && matchesSearch && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return b.featured ? 1 : -1;
      });
  }, [selectedCategory, searchQuery, maxPrice, sortBy]);

  return (
    <div className="collection-page page-container">
      {/* Banner */}
      <header className="page-header">
        <div className="container">
          <span className="section-kicker">Our Exclusive Catalog</span>
          <h1 className="page-title">Boutique Collection</h1>
          <p className="page-subtitle">
            Explore our curated catalog of custom-crafted blouses, lehengas, and designer outfits. Every design can be stitched to your exact measurements.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          {/* Controls & Filter Bar */}
          <div className="catalog-toolbar">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search blouses, lehengas, dresses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="filter-controls">
              {/* Price Filter */}
              <div className="price-filter">
                <label htmlFor="priceRange">Max Price: ₹{maxPrice}</label>
                <input
                  id="priceRange"
                  type="range"
                  min="1000"
                  max="16000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
              </div>

              {/* Sort By */}
              <div className="sort-box">
                <label htmlFor="sortBy"><FaFilter /> Sort:</label>
                <select
                  id="sortBy"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="form-select"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="category-tabs">
            {PRODUCT_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`category-tab ${selectedCategory === cat.id ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="empty-catalog">
              <h3>No products found</h3>
              <p>Try adjusting your search query or price filter.</p>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setMaxPrice(16000);
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-card card">
                  <div className="product-card__image-wrap">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-card__image"
                      loading="lazy"
                    />
                    {product.featured && <span className="product-badge">Featured</span>}
                    <div className="product-card__overlay">
                      <Link
                        to={`/product/${product.id}`}
                        className="btn btn-sm btn-ghost-light"
                      >
                        <FaEye /> Quick View
                      </Link>
                    </div>
                  </div>

                  <div className="product-card__body">
                    <span className="product-card__category">{product.category}</span>
                    <h2 className="product-card__title">
                      <Link to={`/product/${product.id}`}>{product.name}</Link>
                    </h2>

                    <div className="product-card__rating">
                      <FaStar className="star-icon" />
                      <span>{product.rating}</span>
                      <span className="reviews">({product.reviewCount})</span>
                    </div>

                    <p className="product-card__desc">{product.description}</p>

                    <div className="product-card__footer">
                      <div className="product-card__price">
                        <span className="price-current">₹{product.price}</span>
                        {product.originalPrice && (
                          <span className="price-original">₹{product.originalPrice}</span>
                        )}
                      </div>

                      <button
                        type="button"
                        className="btn btn-sm btn-primary"
                        onClick={() => addToCart(product, 1)}
                      >
                        <FaShoppingBag /> Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default CollectionPage;
