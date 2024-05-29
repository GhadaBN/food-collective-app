import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import MenuDisplay from "../../components/MenuDisplay/MenuDisplay";
import axios from "axios";

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
      // Fetch restaurant details if not found in context
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
    <div>
      {restaurant && (
        <div className="restaurant-header">
          <img src={restaurant.image} alt={restaurant.restaurantName} />
          <h1>{restaurant.restaurantName}</h1>
          <p>{restaurant.description}</p>
          <p>
            <b>Category:</b> {restaurant.category}
          </p>
        </div>
      )}
      <MenuDisplay items={menuItems} baseUrl={url} />
    </div>
  );
}

export default RestaurantDetails;
