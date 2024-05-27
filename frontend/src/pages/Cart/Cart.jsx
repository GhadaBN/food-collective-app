import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";

function Cart() {
  const { cartItems, removeFromCart, menuItems } = useContext(StoreContext);

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        {Object.entries(cartItems).map(([itemId, quantity]) => {
          const item = menuItems.find((item) => item._id === itemId);
          return item ? (
            <div key={itemId}>
              <p>{item.itemName}</p>
              <p>${item.price}</p>
              <p>{quantity}</p>
              <p>${item.price * quantity}</p>
              <button onClick={() => removeFromCart(itemId)}>Remove</button>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
}

export default Cart;
