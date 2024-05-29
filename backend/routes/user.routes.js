const express = require("express");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/isAuthenticated");

const userRouter = express.Router();

// Adjusting the path since the router is mounted at '/api/user'
userRouter.get("/:id", isAuthenticated, (req, res, next) => {
  const { id } = req.params;

  User.findById(id)
    .then((response) => {
      const { password, __v, ...rest } = response.toObject();
      res.status(200).json(rest);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

module.exports = userRouter;
