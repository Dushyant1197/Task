const express = require("express");
const route = express.Router();
const userController = require("../controller/user");
const upload = require("../middleware/imageMulter");
const validate = require("../middleware/validation");
const jwtVerify = require("../middleware/jsonWebToken");

route.post(
  "/'signup'",
  upload,
  validate.validateUser,
  userController.userSignUp
);
route.get("/verify/:id", userController.verifyByEmail);
route.put("/login", userController.loginUser);
route.put("/updateUser/:id", jwtVerify.tokenVerify, userController.updateUser);
route.delete(
  "/deleteUser/:id",
  jwtVerify.tokenVerify,
  userController.deleteUser
);
route.get("/getUser/:id", jwtVerify.tokenVerify, userController.getUser);
route.get("/getAllUser", jwtVerify.verifyRole, userController.getAllUser);
route.get("/getUProducts", userController.getUsersWithProducts);
route.get("/getUProduct/:id", userController.getUserWithProduct);

module.exports = route;
