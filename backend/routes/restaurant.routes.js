const express = require("express");
const {
  addRestaurant,
  listRestaurants,
  removeRestaurant,
  getRestaurantById,
} = require("../controllers/restaurantController");
// const { getFoodById } = require("../controllers/foodController");
const multer = require("multer");
const restaurantRouter = express.Router();

//Image Storage Engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

//API methods
restaurantRouter.post("/add", upload.single("image"), addRestaurant);
restaurantRouter.get("/list", listRestaurants);
restaurantRouter.post("/remove", removeRestaurant);
//Get restaurant by Id
restaurantRouter.get("/:id", getRestaurantById);

module.exports = restaurantRouter;
