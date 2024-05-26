const { model, Schema } = require("mongoose");
const mongoose = require("mongoose");
const menuItemSchema = new Schema({
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  itemName: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

const MenuItem = model("MenuItem", menuItemSchema);

//Export Model
module.exports = MenuItem;
