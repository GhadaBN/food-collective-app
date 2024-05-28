const express = require("express");
const cartRouter = express.Router();
const { isAuthenticated } = require("../middleware/isAuthenticated");
const {
  addToCart,
  removeFromCart,
  getCart,
} = require("../controllers/cartController");

cartRouter.post("/add", isAuthenticated, addToCart);
cartRouter.post("/remove", isAuthenticated, removeFromCart);
cartRouter.post("/get", isAuthenticated, getCart);

module.exports = cartRouter;
