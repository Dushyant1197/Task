const express = require("express");
const route = express.Router();
const userController = require("../controller/user");

route.post("/signup", userController.userSingup);
route.put("/login", userController.loginUser);
route.put("/updateUser/:id", userController.updateUser);
route.delete("/deleteUser/:id", userController.deleteUser);
route.get("/getUser/:id", userController.getUser);
route.get("/getAllUser", userController.getAllUser);

module.exports = route;
