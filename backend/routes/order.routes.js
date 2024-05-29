const express = require("express");
const {
  placeOrder,
  verifyOrder,
  userOrders,
} = require("../controllers/orderController");
const { isAuthenticated } = require("../middleware/isAuthenticated");

const orderRouter = express.Router();

orderRouter.post("/place", isAuthenticated, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", isAuthenticated, userOrders);
module.exports = orderRouter;
