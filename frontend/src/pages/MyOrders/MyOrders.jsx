import React, { useEffect } from "react";
import "./MyOrders.css";
import { useState, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";

function MyOrders() {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.post(
      url + "/api/order/userorders",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setData(response.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="sections-wrapper">
      <div className="left-container">
        <div className="photo-container">
          <img className="responsive-image" src={assets.our_story} />
        </div>
      </div>
      <div className="right-container">
        <div className="my-orders">
          <h1 className="title">MY ORDERS</h1>
          <div className="container">
            {data.map((order, index) => (
              <div key={index} className="my-orders-order">
                <div className="order-details">
                  <p className="order-items">
                    {order.items.map((item, index) => (
                      <span key={index}>
                        {item.name} x {item.quantity}
                        {index < order.items.length - 1 && ", "}
                      </span>
                    ))}
                  </p>
                  <p className="order-total">Total: €{order.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyOrders;
