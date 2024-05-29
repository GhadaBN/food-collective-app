const express = require("express");
const { placeOrder } = require("../controllers/orderController");
const { isAuthenticated } = require("../middleware/isAuthenticated");

const orderRouter = express.Router();

orderRouter.post("/place", isAuthenticated, placeOrder);

module.exports = orderRouter;
