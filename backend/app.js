const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const restaurantRouter = require("./routes/restaurant.route");

require("dotenv").config();

// Initialize Express App
const app = express();

// Middleware
require("./config")(app); // Assuming this configures additional middleware
app.use(cors({ origin: [process.env.ORIGIN] }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(cookieParser());

// Database connection
const connectDB = require("./db/db");
connectDB();

//API Endpoints
app.use("/api/restaurant", restaurantRouter);
app.use("/images", express.static("uploads"));

// Routes
app.use("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

// Fallback route for undefined routes
require("./error-handling/error-handling")(app);

module.exports = app;
