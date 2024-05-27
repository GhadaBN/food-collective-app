import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MenuDisplay from "../../components/MenuDisplay/MenuDisplay"; // Corrected import path

function RestaurantDetails() {
  const [restaurant, setRestaurant] = useState({});
  const [menuItems, setMenuItems] = useState([]);
  const { restaurantId } = useParams();
  const url = "http://localhost:5005";

  useEffect(() => {
    // Fetch restaurant details
    axios
      .get(`${url}/api/restaurant/${restaurantId}`)
      .then((resp) => {
        if (resp.data.success) {
          setRestaurant(resp.data.data);
        } else {
          console.error(
            "Failed to fetch restaurant details:",
            resp.data.message
          );
        }
      })
      .catch((err) => console.log("Error fetching restaurant:", err));

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
  }, [restaurantId]);

  return (
    <div>
      {restaurant && (
        <div className="restaurant-header">
          <img
            src={`${url}/images/${restaurant.image}`}
            alt={restaurant.restaurantName}
          />
          <h1>{restaurant.restaurantName}</h1>
          <p>{restaurant.description}</p>
          <p>
            <b>Category:</b> {restaurant.category}
          </p>
        </div>
      )}
      <MenuDisplay items={menuItems} baseUrl={url} />{" "}
    </div>
  );
}

export default RestaurantDetails;
