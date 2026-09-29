import { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "./ToastContext.jsx";

const CartContext = createContext();
const CART_STORAGE_KEY = "priyas_boutique_cart";

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const { addToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cart]);

  const addToCart = (product, quantity = 1, selectedSize = "Standard", customMeasurements = {}) => {
    setCart((prevCart) => {
      const itemKey = `${product.id}-${selectedSize}`;
      const existingIndex = prevCart.findIndex((item) => item.key === itemKey);

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        updated[existingIndex].customMeasurements = {
          ...updated[existingIndex].customMeasurements,
          ...customMeasurements,
        };
        return updated;
      }

      return [
        ...prevCart,
        {
          key: itemKey,
          product,
          quantity,
          selectedSize,
          customMeasurements,
          addedAt: new Date().toISOString(),
        },
      ];
    });

    addToast(`Added "${product.name}" to your cart!`, "success");
  };

  const removeFromCart = (itemKey) => {
    setCart((prev) => {
      const item = prev.find((i) => i.key === itemKey);
      if (item && addToast) {
        addToast(`Removed "${item.product.name}" from cart`, "info");
      }
      return prev.filter((i) => i.key !== itemKey);
    });
  };

  const updateQuantity = (itemKey, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.key === itemKey) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + (item.product.price || 0) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
