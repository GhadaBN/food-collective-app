// app.js
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const restaurantRouter = require("./routes/restaurant.routes");
const menuRouter = require("./routes/menu.routes");
const userRouter = require("./routes/user.routes");
const indexRoutes = require("./routes/index.routes");
const authRoutes = require("./routes/auth.routes");
const orderRouter = require("./routes/order.routes.js");

// Initialize Express App
const app = express();

// Middleware configuration
require("./config")(app);
app.use(
  cors({
    origin: [
      "https://tomato-social-frontend.onrender.com",
      "http://localhost:5173",
    ],
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(cookieParser());

// Database connection
const connectDB = require("./db/db");
const cartRouter = require("./routes/cart.routes");
connectDB();

// API Endpoints
app.use("/images", express.static("uploads"));
app.use("/api/restaurant", restaurantRouter);
app.use("/api/menu", menuRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Additional Routes
app.use("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});
app.use("/api", indexRoutes);
app.use("/auth", authRoutes);

// Fallback route for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: "This route does not exist" });
});

module.exports = app;
