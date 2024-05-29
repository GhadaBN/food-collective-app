import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

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
  const url = "http://localhost:5005";
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  // Save token to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("token", token);
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
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
