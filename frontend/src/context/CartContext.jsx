import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // ===============================
  // Add To Cart
  // ===============================
  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item._id === product._id);

      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity,
        },
      ];
    });
  };

  // ===============================
  // Remove Item
  // ===============================
  const removeFromCart = (id) => {
    setCartItems((prev) =>
      prev.filter((item) => item._id !== id)
    );
  };

  // ===============================
  // Update Quantity
  // ===============================
  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity,
            }
          : item
      )
    );
  };

  // ===============================
  // Increase Quantity
  // ===============================
  const increaseQuantity = (id) => {
    const item = cartItems.find((item) => item._id === id);

    if (!item) return;

    updateQuantity(id, item.quantity + 1);
  };

  // ===============================
  // Decrease Quantity
  // ===============================
  const decreaseQuantity = (id) => {
    const item = cartItems.find((item) => item._id === id);

    if (!item) return;

    updateQuantity(id, item.quantity - 1);
  };

  // ===============================
  // Clear Cart
  // ===============================
  const clearCart = () => {
    setCartItems([]);
  };

  // ===============================
  // Totals
  // ===============================
  const totalItems = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCartContext = () => useContext(CartContext); 