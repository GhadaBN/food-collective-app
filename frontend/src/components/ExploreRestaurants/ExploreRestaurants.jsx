import React, { useContext } from "react";
import "./ExploreRestaurants.css";
// import { restaurants } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const ExploreRestaurants = () => {
  const { restaurants } = useContext(StoreContext);
  return (
    <div className="explore-restaurants" id="explore-restaurants">
      <p className="explore-restaurants-text">Explore Restaurants</p>
      <div className="restaurants-list">
        {restaurants.map((restaurant) => (
          <div key={restaurant._id} className="restaurant">
            {" "}
            <img src={restaurant.image} />
            <p>{restaurant.restaurantName}</p> // Displaying the restaurant name
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
