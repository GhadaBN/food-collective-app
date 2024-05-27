import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Retrieve cart items from localStorage on initial load
    const localData = localStorage.getItem("cartItems");
    return localData ? JSON.parse(localData) : {};
  });
  const [menuItems, setMenuItems] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const url = "http://localhost:5005";
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(`${url}/api/menu/list`);
        setMenuItems(response.data.data);
      } catch (error) {
        console.error("Failed to fetch menu items:", error);
      }
    };
    fetchMenuItems();
  }, [url]);

  useEffect(() => {
    const fetchRestaurantList = async () => {
      const response = await axios.get(`${url}/api/restaurant/list`);
      setRestaurants(response.data.data);
    };
    fetchRestaurantList();
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      if (prev[itemId] > 1) {
        return { ...prev, [itemId]: prev[itemId] - 1 };
      } else {
        const updatedItems = { ...prev };
        delete updatedItems[itemId];
        return updatedItems;
      }
    });
  };

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    menuItems,
    restaurants,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
