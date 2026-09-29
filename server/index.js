import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import { protect, adminOnly } from "./middleware/auth.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "priyas_boutique_secret_key_2026";

app.use(cors());
app.use(express.json());

// In-Memory / Local Storage Fallback Data Store
let memoryProducts = [
  {
    id: "prod-1",
    name: "Royal Zardosi Silk Blouse",
    category: "Blouses",
    price: 2499,
    originalPrice: 3200,
    rating: 4.9,
    reviewCount: 28,
    image: "/src/assets/gallery/blouse-1.svg",
    description: "Handcrafted pure silk blouse featuring intricate Zardosi embroidery around the neckline and sleeves.",
    availableSizes: ["32 (S)", "34 (M)", "36 (L)", "38 (XL)", "Custom Measurement"],
    inStock: true,
    featured: true,
  },
  {
    id: "prod-2",
    name: "Velvet Bridal Heavy Blouse",
    category: "Blouses",
    price: 3499,
    originalPrice: 4200,
    rating: 5.0,
    reviewCount: 35,
    image: "/src/assets/gallery/blouse-2.svg",
    description: "Luxury micro-velvet bridal blouse decorated with gold thread embroidery and stone accents.",
    availableSizes: ["32 (S)", "34 (M)", "36 (L)", "38 (XL)", "Custom Measurement"],
    inStock: true,
    featured: true,
  },
  {
    id: "prod-4",
    name: "Pastel Florals Designer Lehenga Choli",
    category: "Lehengas",
    price: 8999,
    originalPrice: 11500,
    rating: 4.9,
    reviewCount: 42,
    image: "/src/assets/gallery/lehenga-1.svg",
    description: "Breathtaking pastel pink organza lehenga choli with delicate floral thread embroidery.",
    availableSizes: ["S", "M", "L", "XL", "Custom Measurement"],
    inStock: true,
    featured: true,
  },
  {
    id: "prod-7",
    name: "Embroidered Silk Anarkali Dress",
    category: "Dresses",
    price: 3999,
    originalPrice: 4999,
    rating: 4.8,
    reviewCount: 31,
    image: "/src/assets/gallery/dress-1.svg",
    description: "Floor-length silk Anarkali gown adorned with delicate zari embroidery along the yoke.",
    availableSizes: ["S", "M", "L", "XL", "Custom Measurement"],
    inStock: true,
    featured: true,
  },
];

let memoryBookings = [];
let memoryOrders = [];
let memoryMessages = [];

// Base API status endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", store: "Priya's Boutique & Tailoring API Server v1.0", timestamp: new Date() });
});

// AUTH ENDPOINTS
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@priyasboutique.com" && (password === "admin123" || password === "admin")) {
    const token = jwt.sign({ id: "admin-1", email, role: "admin", name: "Priya (Admin)" }, JWT_SECRET, { expiresIn: "7d" });
    return res.json({ token, user: { id: "admin-1", name: "Priya (Admin)", email, role: "admin" } });
  }

  const token = jwt.sign({ id: `cust-${Date.now()}`, email, role: "customer", name: email.split("@")[0] }, JWT_SECRET, { expiresIn: "7d" });
  res.json({ token, user: { id: `cust-${Date.now()}`, name: email.split("@")[0], email, role: "customer" } });
});

// PRODUCTS ENDPOINTS
app.get("/api/products", (req, res) => {
  res.json(memoryProducts);
});

app.post("/api/products", (req, res) => {
  const newProd = { id: `prod-${Date.now()}`, ...req.body };
  memoryProducts.unshift(newProd);
  res.status(201).json(newProd);
});

app.put("/api/products/:id", (req, res) => {
  const index = memoryProducts.findIndex((p) => p.id === req.params.id);
  if (index !== -1) {
    memoryProducts[index] = { ...memoryProducts[index], ...req.body };
    return res.json(memoryProducts[index]);
  }
  res.status(404).json({ message: "Product not found" });
});

app.delete("/api/products/:id", (req, res) => {
  memoryProducts = memoryProducts.filter((p) => p.id !== req.params.id);
  res.json({ message: "Product deleted" });
});

// BOOKINGS ENDPOINTS
app.get("/api/bookings", (req, res) => {
  res.json(memoryBookings);
});

app.post("/api/bookings", (req, res) => {
  const booking = { id: `BOOK-${Math.floor(100000 + Math.random() * 900000)}`, status: "Pending", createdAt: new Date(), ...req.body };
  memoryBookings.unshift(booking);
  res.status(201).json(booking);
});

app.put("/api/bookings/:id/status", (req, res) => {
  const booking = memoryBookings.find((b) => b.id === req.params.id);
  if (booking) {
    booking.status = req.body.status;
    return res.json(booking);
  }
  res.status(404).json({ message: "Booking not found" });
});

// ORDERS ENDPOINTS
app.get("/api/orders", (req, res) => {
  res.json(memoryOrders);
});

app.post("/api/orders", (req, res) => {
  const order = { id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`, status: "Placed", createdAt: new Date(), ...req.body };
  memoryOrders.unshift(order);
  res.status(201).json(order);
});

app.put("/api/orders/:id/status", (req, res) => {
  const order = memoryOrders.find((o) => o.id === req.params.id);
  if (order) {
    order.status = req.body.status;
    return res.json(order);
  }
  res.status(404).json({ message: "Order not found" });
});

// CONTACT ENDPOINT
app.post("/api/contact", (req, res) => {
  const msg = { id: `MSG-${Date.now()}`, createdAt: new Date(), ...req.body };
  memoryMessages.unshift(msg);
  res.status(201).json({ success: true, message: "Thank you! Your message has been received." });
});

// Serve production static build
const distPath = path.join(__dirname, "../dist");
app.use(express.static(distPath));
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"), (err) => {
    if (err) {
      res.status(500).send("Application index.html not found. Please run build.");
    }
  });
});

connectDB();

app.listen(PORT, () => {
  console.log(`Priya's Boutique Backend running on http://localhost:${PORT}`);
});

