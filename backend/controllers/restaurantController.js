const Restaurant = require("../models/Restaurant.model");
const mongoose = require("mongoose");
const fs = require("fs").promises;

//add Restaurant
const addRestaurant = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  const restaurant = new Restaurant({
    restaurantName: req.body.name,
    description: req.body.description,
    image: image_filename,
    category: req.body.category,
  });
  try {
    const savedRestaurant = await restaurant.save();
    res.status(201).json({
      success: true,
      message: "Restaurant added successfully",
      data: savedRestaurant,
    });
  } catch (error) {
    console.error("Failed to add restaurant:", error);
    res.status(500).json({
      success: false,
      message: "Error adding food",
      error: error.message,
    });
  }
};

//Get list of all Restaurants

const listRestaurants = async (req, res) => {
  try {
    const allRestaurants = await Restaurant.find({});
    res.status(201).json({
      success: true,
      message: "List restaurants retrieved succefully",
      data: allRestaurants,
    });
  } catch (error) {
    console.error("Error retrieving restaurants list:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving restaurants list",
      error: error.message,
    });
  }
};

const removeRestaurant = async (req, res) => {
  const { id } = req.body;

  try {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }

    if (restaurant.image) {
      await fs.unlink(`uploads/${restaurant.image}`);
    }

    await Restaurant.findByIdAndDelete(restaurant._id);
    res.json({ success: true, message: "Restaurant removed successfully" });
  } catch (error) {
    console.error("Failed to remove restaurant:", error);
    res.status(500).json({
      success: false,
      message: "Error removing restaurant",
      error: error.message,
    });
  }
};

module.exports = { addRestaurant, listRestaurants, removeRestaurant };
