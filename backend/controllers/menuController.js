const MenuItem = require("../models/Menu.model");
const Restaurant = require("../models/Restaurant.model");
const mongoose = require("mongoose");
const fs = require("fs").promises;

//add Menu Item
const addMenuItem = async (req, res) => {
  let image_filename = req.file ? req.file.filename : "default.jpg";
  // Find restaurant by name
  const restaurant = await Restaurant.findOne({
    restaurantName: req.body.restaurantName,
  });
  if (!restaurant) {
    return res
      .status(404)
      .json({ success: false, message: "Restaurant not found" });
  }

  const menuItem = new MenuItem({
    restaurant: restaurant._id,
    itemName: req.body.itemName,
    price: req.body.price,
    description: req.body.description,
    image: image_filename,
    category: req.body.category,
  });
  try {
    const savedMenuItem = await menuItem.save();
    res.status(201).json({
      success: true,
      message: "Menu item added successfully",
      data: savedMenuItem,
    });
  } catch (error) {
    console.error("Failed to add menu item:", error);
    res.status(500).json({
      success: false,
      message: "Error adding menu Item",
      error: error.message,
    });
  }
};

//Get list of all items

const listMenuItems = async (req, res) => {
  const { restaurantId } = req.query; // Get restaurantId from query parameters
  try {
    const query = restaurantId ? { restaurant: restaurantId } : {}; // Filter by restaurantId if provided
    const menuItems = await MenuItem.find(query).populate("restaurant");
    res.status(200).json({
      success: true,
      message: "Menu items retrieved successfully",
      data: menuItems,
    });
  } catch (error) {
    console.error("Error retrieving menu items:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving menu items",
      error: error.message,
    });
  }
};

//Remove Item

const removeMenuItem = async (req, res) => {
  const { id } = req.body;

  try {
    const item = await MenuItem.findById(id);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    if (item.image) {
      await fs.unlink(`uploads/${item.image}`);
    }

    await MenuItem.findByIdAndDelete(id);
    res.json({ success: true, message: "Item removed successfully" });
  } catch (error) {
    console.error("Failed to remove item:", error);
    res.status(500).json({
      success: false,
      message: "Error removing item",
      error: error.message,
    });
  }
};

module.exports = { addMenuItem, listMenuItems, removeMenuItem };
