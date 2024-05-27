// src/components/MenuDisplay.js
import React from "react";
import MenuItem from "./MenuItem";

function MenuDisplay({ items, baseUrl }) {
  return (
    <div className="menu-display">
      {items.map((item) => (
        <MenuItem key={item._id} item={item} baseUrl={baseUrl} />
      ))}
    </div>
  );
}

export default MenuDisplay;
