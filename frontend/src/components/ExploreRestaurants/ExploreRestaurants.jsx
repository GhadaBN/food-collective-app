import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ExploreRestaurants.css";
import { StoreContext } from "../../context/StoreContext";

const ExploreRestaurants = () => {
  const { restaurants } = useContext(StoreContext);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleRestaurantClick = (restaurant) => {
    navigate(`/restaurants/${restaurant._id}`, { state: { restaurant } });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredRestaurants = selectedCategory
    ? restaurants.filter(
        (restaurant) => restaurant.category === selectedCategory
      )
    : restaurants;

  return (
    <div className="explore-restaurants" id="explore-restaurants">
      <h2 className="explore-restaurants-title">EXPLORE RESTAURANTS</h2>
      <div className="category-buttons-wrapper">
        <button onClick={() => handleCategoryChange("")}>All</button>
        <button onClick={() => handleCategoryChange("Italian")}>Italian</button>
        <button onClick={() => handleCategoryChange("Indian")}>Indian</button>
        <button onClick={() => handleCategoryChange("Bakery")}>Bakery</button>
        <button onClick={() => handleCategoryChange("Asian")}>Asian</button>
        <button onClick={() => handleCategoryChange("Fastfood")}>
          Fastfood
        </button>
        <button onClick={() => handleCategoryChange("Vegeterian")}>
          Vegeterian
        </button>
        <button onClick={() => handleCategoryChange("Mediterranean")}>
          Mediterranean
        </button>
      </div>
      <div className="restaurants-grid">
        {filteredRestaurants.map((restaurant) => (
          <div
            key={restaurant._id}
            className="restaurant-cell"
            onClick={() => handleRestaurantClick(restaurant)}
          >
            <img
              src={restaurant.image}
              alt={restaurant.restaurantName}
              className="restaurant-cell-img"
            />
            <button className="button-restaurant-name">
              {restaurant.restaurantName}
            </button>
            <p className="category-tag">{restaurant.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreRestaurants;
