const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config(); // Ensure this is near the top to load env vars early

// Database connection
const connectDB = require("./db/db"); // Adjust the path as necessary
connectDB();

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
