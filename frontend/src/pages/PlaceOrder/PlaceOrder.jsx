import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

function PlaceOrder() {
  const { getTotalCartAmount, token, menuItems, cartItems, url } =
    useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    const orderItems = menuItems
      .filter((item) => cartItems[item._id] > 0)
      .map((item) => ({
        itemId: item._id,
        name: item.name,
        price: item.price,
        quantity: cartItems[item._id],
      }));

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 3,
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error placing order");
      }
    } catch (error) {
      alert("Error placing order");
      console.error(error);
    }
  };

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title-delivery">Delivery informations</p>
        <div className="multi-fields">
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First name"
          />
          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          required
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Email address"
        />
        <input
          required
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
        />
        <div className="multi-fields">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
          />
          <input
            required
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
          />
        </div>
        <input
          required
          name="zipcode"
          onChange={onChangeHandler}
          value={data.zipcode}
          type="text"
          placeholder="Zipcode"
        />
        <input
          required
          name="country"
          onChange={onChangeHandler}
          value={data.country}
          type="text"
          placeholder="Country"
        />
        <input
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <p className="title-delivery">Your cart total</p>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>€{getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery fees</p>
            <p>€{getTotalCartAmount() === 0 ? "" : "3"}</p>
          </div>
          <div className="cart-total-details">
            <b>Total</b>
            <b>€{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 3}</b>
          </div>
          <button type="submit" className="pay-button">
            Proceed to pay
          </button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
