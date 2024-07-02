import React, { useContext } from "react";
import "./MenuItem.css";
import { StoreContext } from "../../context/StoreContext";

function MenuItem({ item }) {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const itemId = item._id;

  return (
    <>
      <div className="menu-item-container">
        <div className="menu-text">
          <p className="item-name">{item.itemName}</p>
          <p className="item-description">{item.description}</p>
          <div className="counter-price-wrapper">
            <p className="item-price">€{item.price}</p>
            {!cartItems[itemId] ? (
              <button
                className="add-to-cart-button"
                onClick={() => addToCart(itemId)}
              >
                Add to cart
              </button>
            ) : (
              <div className="counter-container">
                <button
                  className="remove-button"
                  onClick={() => removeFromCart(itemId)}
                >
                  -
                </button>
                <p className="item-counter">{cartItems[itemId]}</p>
                <button
                  className="add-button"
                  onClick={() => addToCart(itemId)}
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
        <hr />
      </div>
    </>
  );
}

export default MenuItem;
