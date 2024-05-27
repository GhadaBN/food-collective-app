import React, { useContext } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";

function PlaceOrder() {
  const { getTotalCartAmount } = useContext(StoreContext);
  return (
    <form action="" className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" PlaceOrder="First Name" />
          <input type="text" PlaceOrder="Last Name" />
        </div>
        <input type="email" PlaceOrder="Email address" />
        <input type="text" PlaceOrder="Street" />
        <div className="multi-fields">
          <input type="text" PlaceOrder="City" />
          <input type="text" PlaceOrder="State" />
        </div>
        <input type="text" PlaceOrder="Phone" />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>

          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>€{getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fees</p>
            <p>€{getTotalCartAmount() === 0 ? "" : "3"}</p>
          </div>
          <div className="cart-total-details">
            <b>Total</b>
            <b>€{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 3}</b>
          </div>

          <button>PROCEED TO PAP</button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
