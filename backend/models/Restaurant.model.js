const { model, Schema } = require("mongoose");
const mongoose = require("mongoose");

const restaurantSchema = new Schema({
  restaurantName: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
});

//Create Model

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

// Export Model
module.exports = Restaurant;
