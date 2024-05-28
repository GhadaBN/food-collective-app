import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./ExploreRestaurants.css";
import { StoreContext } from "../../context/StoreContext";

const ExploreRestaurants = () => {
  const { restaurants } = useContext(StoreContext);
  const navigate = useNavigate();
  const url = "http://localhost:5005";
  const handleRestaurantClick = (restaurant) => {
    navigate(`/restaurants/${restaurant._id}`, { state: { restaurant } });
  };

  return (
    <div className="explore-restaurants" id="explore-restaurants">
      <p className="explore-restaurants-text">Explore Restaurants</p>
      <div className="restaurants-list">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant._id}
            className="restaurant"
            onClick={() => handleRestaurantClick(restaurant)}
          >
            <img
              src={`${url}/images/${restaurant.image}`}
              alt={restaurant.restaurantName}
            />
            <p>{restaurant.restaurantName}</p>
            <p>{restaurant.description}</p> // Displaying the description
            <p>
              <b>Category:</b> {restaurant.category}
            </p>{" "}
            // Displaying the category
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreRestaurants;
