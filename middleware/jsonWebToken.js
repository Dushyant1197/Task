const jwt = require("jsonwebtoken");
const conf = require("../db");

const jsonWebToken = async (email, id = "", role = "") => {
  console.log("ROLE : => ", email);

  return jwt.sign({ email: email, id: id, role: role }, process.env.secretKey, {
    expiresIn: "1d",
  });
};

const tokenVerify = async (req, res, next) => {
  try {
    const token = jwt.decode(await req.headers["authorization"].split(" ")[1]);
    const data = User.findIOne({ where: { id: token.id, auth: "authorize" } });
    if (!token) {
      return "Invalid User";
    }
    console.log("___ ID ___", data);
    if (data) {
      next();
    } else {
      res.json({ Error: "You are not Authorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(501).json({ Error: "Internal Server error" });
  }
};

const verifyRole = async (req, res, next) => {
  try {
    const token = jwt.decode(await req.headers["authorization"].split(" ")[1]);

    // console.log("___ ID ___", token.role);
    if (!token.id) {
      return "Invalid User";
    }
    // const id = req.params.id;
    if (token.role == "admin") {
      next();
    } else {
      res.json({ Error: "You are not authorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(501).json({ Error: "Internal Server error" });
  }
};

module.exports = { jsonWebToken, tokenVerify, verifyRole };
