import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";

const RestaurantMenu = () => {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { url } = useContext(StoreContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const resRestaurant = await axios.get(
          `${url}/api/restaurant/restaurant/${restaurantId}`
        );
        const resMenuItems = await axios.get(`${url}/api/menu/list`, {
          params: { restaurantId },
        });

        if (resRestaurant.data.success) {
          setRestaurant(resRestaurant.data.data);
        }
        if (resMenuItems.data.success) {
          setMenuItems(resMenuItems.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data.");
      }
      setLoading(false);
    };
    fetchData();
  }, [restaurantId, url]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="menu-items">
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
      {menuItems.map((item) => (
        <div key={item._id}>
          <img src={`${url}/images/${item.image}`} alt={item.itemName} />
          <p>{item.itemName}</p>
          <p>${item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default RestaurantMenu;
