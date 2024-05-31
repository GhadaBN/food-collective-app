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
          <div className="counter-wrapper">
            <p className="item-price">€{item.price}</p>
            {!cartItems[itemId] ? (
              <button className="add" onClick={() => addToCart(itemId)}>
                +
              </button>
            ) : (
              <div className="item-counter">
                <button
                  className="remove"
                  onClick={() => removeFromCart(itemId)}
                >
                  -
                </button>
                <p>{cartItems[itemId]}</p>
                <button className="add" onClick={() => addToCart(itemId)}>
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
