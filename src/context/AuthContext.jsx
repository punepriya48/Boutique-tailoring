import { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "./ToastContext.jsx";

const AuthContext = createContext();
const AUTH_STORAGE_KEY = "priyas_boutique_auth";

// Default admin account for demonstration & fallback login
const DEMO_ADMIN = {
  id: "admin-1",
  name: "Priya (Admin)",
  email: "admin@priyasboutique.com",
  role: "admin",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const { addToast } = useToast();

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch (e) {
      console.error("Failed to sync auth state", e);
    }
  }, [user]);

  const login = async (email, password) => {
    // Admin master check
    if (email.toLowerCase() === "admin@priyasboutique.com" && (password === "admin123" || password === "admin")) {
      setUser(DEMO_ADMIN);
      addToast("Logged in successfully as Admin!", "success");
      return { success: true, user: DEMO_ADMIN };
    }

    // Customer check from local database/storage
    try {
      const storedUsers = JSON.parse(localStorage.getItem("priyas_registered_users") || "[]");
      const found = storedUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());

      if (found && found.password === password) {
        const customerUser = { id: found.id, name: found.name, email: found.email, role: "customer" };
        setUser(customerUser);
        addToast(`Welcome back, ${found.name}!`, "success");
        return { success: true, user: customerUser };
      }
    } catch (e) {
      console.error("Error reading stored users", e);
    }

    // Default customer login fallback for easy demo testing
    if (email && password) {
      const nameFromEmail = email.split("@")[0];
      const fallbackUser = {
        id: `cust-${Date.now()}`,
        name: nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1),
        email,
        role: "customer",
      };
      setUser(fallbackUser);
      addToast(`Logged in as ${fallbackUser.name}!`, "success");
      return { success: true, user: fallbackUser };
    }

    addToast("Invalid email or password", "error");
    return { success: false, error: "Invalid credentials" };
  };

  const register = async (name, email, password) => {
    if (!name || !email || !password) {
      addToast("Please fill in all required fields", "error");
      return { success: false, error: "Missing fields" };
    }

    try {
      const storedUsers = JSON.parse(localStorage.getItem("priyas_registered_users") || "[]");
      const exists = storedUsers.some((u) => u.email.toLowerCase() === email.toLowerCase());
      if (exists) {
        addToast("An account with this email already exists", "error");
        return { success: false, error: "Email exists" };
      }

      const newUser = { id: `user-${Date.now()}`, name, email, password, role: "customer" };
      storedUsers.push(newUser);
      localStorage.setItem("priyas_registered_users", JSON.stringify(storedUsers));

      const sessionUser = { id: newUser.id, name: newUser.name, email: newUser.email, role: "customer" };
      setUser(sessionUser);
      addToast("Account created successfully!", "success");
      return { success: true, user: sessionUser };
    } catch (e) {
      console.error(e);
      addToast("Registration failed. Please try again.", "error");
      return { success: false, error: "Registration failed" };
    }
  };

  const logout = () => {
    setUser(null);
    addToast("Logged out successfully", "info");
  };

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
