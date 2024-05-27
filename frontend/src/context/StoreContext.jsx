import { createContext, useState, useEffect } from "react";
import axios from "axios";
export const StoreContext = createContext();

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:5005";
  const [token, setToken] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  const fetchRestaurantList = async () => {
    const response = await axios.get(url + "/api/restaurant/list");
    setRestaurants(response.data.data);
  };

  useEffect(() => {
    async function loadData() {
      await fetchRestaurantList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    cartItems,
    setCartItems,
    addToCart,
    restaurants,
    removeFromCart,
    url,
    token,
    setToken,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
