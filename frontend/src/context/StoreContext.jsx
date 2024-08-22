import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import LoginPopup from "../components/LoginPopup/LoginPopup"; // Assuming you have this component

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem("cartItems");
      return localData ? JSON.parse(localData) : {};
    } catch (error) {
      console.error("Failed to parse local storage data", error);
      return {};
    }
  });

  const [menuItems, setMenuItems] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const url = "https://tomato-social-backend.onrender.com";
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  // Manual JWT decoding and expiration check
  const decodeToken = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Failed to decode token:", error);
      return null;
    }
  };

  const isTokenExpired = (token) => {
    const decodedToken = decodeToken(token);
    if (!decodedToken || !decodedToken.exp) return true;

    const currentTime = Date.now() / 1000; // Current time in seconds
    return decodedToken.exp < currentTime;
  };

  useEffect(() => {
    if (token && isTokenExpired(token)) {
      console.log("Token has expired");
      logout(); // Log out if the token has expired
    } else if (token) {
      localStorage.setItem("token", token);
      setIsLoggedIn(true);
    }
  }, [token]);

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
      try {
        const response = await axios.get(`${url}/api/restaurant/list`);
        const restaurantsWithFullImageUrl = response.data.data.map(
          (restaurant) => ({
            ...restaurant,
            image: `${url}/images/${restaurant.image}`,
          })
        );
        setRestaurants(restaurantsWithFullImageUrl);
      } catch (error) {
        console.error("Failed to fetch restaurant list:", error);
      }
    };
    fetchRestaurantList();
  }, [url]);

  useEffect(() => {
    const loadCartData = async () => {
      if (token) {
        try {
          const response = await axios.post(
            `${url}/api/cart/get`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (Array.isArray(response.data)) {
            const cartData = response.data.reduce((acc, item) => {
              acc[item.itemId] = item.quantity;
              return acc;
            }, {});
            setCartItems(cartData);
          } else {
            setCartItems({});
          }
        } catch (error) {
          console.error("Failed to load cart data from server", error);
          setCartItems({});
        }
      } else {
        const localData = localStorage.getItem("cartItems");
        setCartItems(localData ? JSON.parse(localData) : {});
      }
    };
    loadCartData();
  }, [token, url]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = async (itemId) => {
    setCartItems((prev) => {
      const newCartItems = { ...prev };
      if (!newCartItems[itemId]) {
        newCartItems[itemId] = 1;
      } else {
        newCartItems[itemId] += 1;
      }
      return newCartItems;
    });

    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/add`,
          { itemId, quantity: 1 },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error("Failed to update the cart on the server", error);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updatedItems = { ...prev };
      if (updatedItems[itemId] > 1) {
        updatedItems[itemId] -= 1;
      } else {
        delete updatedItems[itemId];
      }
      return updatedItems;
    });

    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/remove`,
          { itemId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error("Failed to update the cart on the server", error);
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const itemInfo = menuItems.find((item) => item._id === itemId);
      if (itemInfo) {
        totalAmount += itemInfo.price * cartItems[itemId];
      }
    }
    return totalAmount;
  };

  const logout = () => {
    setToken("");
    setCartItems({});
    localStorage.removeItem("token");
    localStorage.removeItem("cartItems");
    setIsLoggedIn(false);
    setShowLoginPopup(true); // Show the login popup
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    menuItems,
    restaurants,
    url,
    token,
    setToken,
    getTotalCartAmount,
    isLoggedIn,
    setIsLoggedIn,
    logout,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
      {showLoginPopup && <LoginPopup setShowLogin={setShowLoginPopup} />}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
