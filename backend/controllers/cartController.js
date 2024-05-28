const User = require("../models/User.model");

// Add or update an item in the cart
const addToCart = async (req, res) => {
  const userId = req.payload._id;
  console.log(req.payload);
  console.log(userId, "user");

  const { itemId, quantity } = req.body;

  // console.log("Add to cart request:", { userId, itemId, quantity });

  if (typeof quantity !== "number" || quantity <= 0) {
    return res.status(400).json({ message: "Invalid quantity" });
  }

  try {
    let user = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          cartData: {
            itemId: itemId,
            quantity: quantity,
          },
        },
      },
      { new: true }
    );

    console.log("Updated user cartData/add:", user.cartData);
    res.status(200).json(user.cartData);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Error adding to cart", error });
  }
};

// Remove an item from the cart
const removeFromCart = async (req, res) => {
  const userId = req.payload._id;
  const { itemId } = req.body;

  console.log("Remove from cart request:", { userId, itemId });

  try {
    let user = await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          cartData: { itemId: itemId },
        },
      },
      { new: true }
    );

    if (!user) {
      console.error("User not found:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Updated user cartData:", user.cartData);
    res.status(200).json(user.cartData);
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ message: "Error removing from cart", error });
  }
};

// Get the cart
const getCart = async (req, res) => {
  const userId = req.payload._id;

  console.log("Get cart request:", { userId });

  try {
    let user = await User.findById(userId);
    if (!user) {
      console.error("User not found:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User cartData:", user.cartData);
    res.status(200).json(user.cartData);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Error fetching cart", error });
  }
};

module.exports = { addToCart, removeFromCart, getCart };
