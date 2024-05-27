import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom"; // Ensure correct import from 'react-router-dom'
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import OurStory from "./pages/OurStory/OurStory";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import RestaurantsList from "./pages/RestaurantsList";
import RestaurantDetails from "./pages/RestaurantsList/RestaurantDetails";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/restaurants" element={<RestaurantsList />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route
            path="/restaurants/:restaurantId"
            element={<RestaurantDetails />}
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
