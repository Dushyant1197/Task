const jwt = require("jsonwebtoken");
const conf = require("../config");

const jsonWebToken = async (email, id = "") => {
  return jwt.sign({ email: email, id: id }, conf.configVar.secretKey, {
    expiresIn: "1d",
  });
};

module.exports = { jsonWebToken };
