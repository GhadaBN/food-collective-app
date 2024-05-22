import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import OurStory from "./pages/OurStory/OurStory";
import Restaurants from "./pages/Restaurants/Restaurants";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/restaurants" element={<Restaurants />} />
      </Routes>
    </div>
  );
};

export default App;
