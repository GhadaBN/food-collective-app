import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./ExploreRestaurants.css";
import { StoreContext } from "../../context/StoreContext";

const ExploreRestaurants = () => {
  const { restaurants } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleRestaurantClick = (restaurant) => {
    navigate(`/restaurants/${restaurant._id}`, { state: { restaurant } });
  };

  return (
    <div className="explore-restaurants" id="explore-restaurants">
      <h2 className="explore-restaurants-title">EXPLORE RESTAURANTS</h2>
      <div className="restaurants-grid">
        {restaurants.map((restaurant) => (
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
            <p className="category-button">{restaurant.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreRestaurants;
