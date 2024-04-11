"use client";
const { createContext, useContext, useState } = require("react");
import useLocalStorage from "../../hooks/useLocalStorage";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useLocalStorage("cart", []);
  const [loading, setLoading] = useState(false);
  const [shippingAmount, setShippingAmount] = useState(150);

  const addToCart = (product) => {
    setCart((prev) => [product, ...prev]);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotals = () => {
    return cart.reduce((acc, item) => {
      return acc + item.price;
    }, 0);

  }
  const getBill = (shippingFee,selectedProducts) => {
    return selectedProducts.reduce((acc, item) => {
      return acc + item.price;
    }, 0) + shippingFee;
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        loading,
        setLoading,
        getTotals,
        getBill,
        shippingAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
