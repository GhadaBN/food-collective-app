// src/components/MenuItem.js
import React, { useState } from "react";
import { assets } from "../../assets/assets";
import "./MenuItem.css";

function MenuItem({ item, baseUrl }) {
  const [itemCount, setItemCount] = useState(0);

  return (
    <div className="menu-item-container">
      <img src={`${baseUrl}/images/${item.image}`} alt={item.itemName} />
      {itemCount === 0 ? (
        <img
          src={assets.add_icon_white}
          onClick={() => setItemCount(itemCount + 1)}
          className="add"
        />
      ) : (
        <div className="item-counter">
          <img src={assets.add_icon_green} alt="Added" />
          <span>{itemCount}</span>
        </div>
      )}
      <p className="item-name">{item.itemName}</p>
      <p className="item-price">${item.price}</p>
    </div>
  );
}

export default MenuItem;
