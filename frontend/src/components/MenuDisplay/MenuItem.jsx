import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import "./MenuItem.css";
import { StoreContext } from "../../context/StoreContext";

function MenuItem({ item, baseUrl }) {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const itemId = item._id;
  return (
    <div className="menu-item-container">
      <img src={`${baseUrl}/images/${item.image}`} />
      {!cartItems[itemId] ? (
        <img
          className="add"
          onClick={() => addToCart(itemId)}
          src={assets.add_icon_white}
        />
      ) : (
        <div className="item-counter">
          <img
            onClick={() => removeFromCart(itemId)}
            src={assets.remove_icon_red}
          />
          <p>{cartItems[itemId]}</p>
          <img onClick={() => addToCart(itemId)} src={assets.add_icon_green} />
        </div>
      )}
      <p className="item-name">{item.itemName}</p>
      <p className="item-price">${item.price}</p>
    </div>
  );
}

export default MenuItem;
