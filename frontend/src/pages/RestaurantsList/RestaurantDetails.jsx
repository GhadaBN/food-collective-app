import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import MenuDisplay from "../../components/MenuDisplay/MenuDisplay";
import axios from "axios";
import "./Restaurants.css";

function RestaurantDetails() {
  const { restaurants, url } = useContext(StoreContext);
  const [restaurant, setRestaurant] = useState({});
  const [menuItems, setMenuItems] = useState([]);
  const { restaurantId } = useParams();

  useEffect(() => {
    const restaurantData = restaurants.find((r) => r._id === restaurantId);
    if (restaurantData) {
      setRestaurant(restaurantData);
    } else {
      axios
        .get(`${url}/api/restaurant/${restaurantId}`)
        .then((resp) => {
          if (resp.data.success) {
            const fetchedRestaurant = resp.data.data;
            fetchedRestaurant.image = `${url}/images/${fetchedRestaurant.image}`;
            setRestaurant(fetchedRestaurant);
          } else {
            console.error(
              "Failed to fetch restaurant details:",
              resp.data.message
            );
          }
        })
        .catch((err) => console.log("Error fetching restaurant:", err));
    }

    // Fetch menu items for this restaurant
    axios
      .get(`${url}/api/menu/list/${restaurantId}`)
      .then((resp) => {
        if (resp.data.success) {
          setMenuItems(resp.data.data);
        } else {
          console.error("Failed to fetch menu items:", resp.data.message);
        }
      })
      .catch((err) => console.log("Error fetching menu items:", err));
  }, [restaurantId, restaurants, url]);

  return (
    <div className="sections-wrapper">
      {restaurant && (
        <div className="restaurant-header">
          <h1 className="restaurant-name">{restaurant.restaurantName}</h1>
          <div className="image-container">
            <img src={restaurant.image} />
          </div>
        </div>
      )}
      <div className="right-container">
        <div className="menu-wrapper"></div>
        <MenuDisplay items={menuItems} baseUrl={url} />
      </div>
    </div>
  );
}

export default RestaurantDetails;
