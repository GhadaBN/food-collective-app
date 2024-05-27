import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { Link } from "react-router-dom";

function Cart() {
  const { cartItems, removeFromCart, menuItems, url, getTotalCartAmount } =
    useContext(StoreContext);

  return (
    <>
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
          <br />
          <hr />
          {Object.entries(cartItems).map(([itemId, quantity]) => {
            const item = menuItems.find((item) => item._id === itemId);
            return item ? (
              <div key={itemId}>
                <div className="cart-item">
                  <img
                    src={`${url}/images/${item.image}`}
                    className="cart-item-image"
                    alt={item.itemName}
                  />
                  <p className="cart-item-name">{item.itemName}</p>
                  <p className="cart-item-price">€{item.price}</p>
                  <p className="cart-item-quantity">{quantity}</p>
                  <p className="cart-item-total">€{item.price * quantity}</p>
                  <button
                    className="cart-item-remove"
                    onClick={() => removeFromCart(itemId)}
                  >
                    Remove
                  </button>
                </div>
                <hr />
              </div>
            ) : null;
          })}
        </div>
      </div>
      <div className="cart-bottom">
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
          <Link to="/order">
            <button>PROCEED TO CHECKOUT</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Cart;
