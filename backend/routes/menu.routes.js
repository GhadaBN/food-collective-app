const express = require("express");
const {
  addMenuItem,
  listMenuItems,
  removeMenuItem,
  listMenuItemsByRestaurant,
} = require("../controllers/menuController");

const multer = require("multer");
const menuRouter = express.Router();

//Image Storage Engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

//API methods
menuRouter.post("/add", upload.single("image"), addMenuItem);
menuRouter.get("/list", listMenuItems);
menuRouter.post("/remove", removeMenuItem);
menuRouter.get("/list/:restaurantId", listMenuItemsByRestaurant);

module.exports = menuRouter;
