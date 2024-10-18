// const User = require("../model/user");
const { User, Product } = require("../model");
const comparePass = require("bcrypt");
const jwtToken = require("jsonwebtoken");
const bcryp = require("../middleware/bcrypt");
const jwt = require("../middleware/jsonWebToken");
const sendMailer = require("../middleware/nodeMailer");

const verifyByEmail = async (req, res) => {
  try {
    const updateInfo = await User.update(
      { isVerify: 1 },
      { where: { id: req.params.id } }
    );
    res.render("verified");
    // console.log("INFO : ", updateInfo);
  } catch (error) {
    console.log("error : ", error);
  }
};
const userSignUp = async (req, res) => {
  try {
    let { name, email, password, role, productName, productPrice } = req.body;
    let token = "";

    const getEmail = await User.findOne({ where: { email: email } });
    if (getEmail) {
      return res.json({ Error: "User Already Exist" });
    }

    const hashPassword = bcryp.bcryptPass(password);
    password = await hashPassword;

    const getToken = await jwt.jsonWebToken(email, "", role);
    token = getToken;
    // console.log("----- Body:", req.body);
    // console.log("----- Files:", req.files);

    console.log("data : --==> ");
    const data = await User.create({ name, email, password, role, token });
    console.log("data : --==> ", name, email, data.dataValues.id);
    if (data) {
      console.log("Sending confirmation email...");
      await sendMailer.sendConfirmationMail(name, email, data.dataValues.id);
      console.log("Confirmation email sent.");
    }

    // const imagePaths = req.files.images.map((file) => file.path);
    // const OriginalName = req.files.images.map((file) => file.originalname);

    // const productData = await Product.create({
    //   productName,
    //   productPrice,
    //   userId: data.id,
    //   fileName: JSON.stringify(OriginalName),
    //   path: JSON.stringify(imagePaths),
    // });

    res.status(200).json({ data: data });
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
};

const loginUser = async (req, res) => {
  try {
    let userData = req.body;
    const getUser = await User.findOne({ where: { email: userData.email } });
    console.log("----- ID ----- ", getUser.role);

    let password = "";

    if (getUser) {
      password = await comparePass.compare(userData.password, getUser.password);
      if (password) {
        const getToken = await jwt.jsonWebToken(
          getUser.email,
          getUser.dataValues.id,
          getUser.role
        );
        const updatedData = { token: getToken, role: getUser.role };

        const data = await User.update(updatedData, {
          where: {
            email: getUser.email,
          },
        });
        console.log("Login SuccesFully TOKEN:", data);
        res.status(200).send(getToken);
      }
    } else {
      res.status(404).json({ error: "user not found" });
    }
  } catch (error) {
    res.status(501).json({ Error: "Internal Server Error" });
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const updatedData = User.update(userData, {
        where: { id: id },
      });
      res.status(200).json({ Success: "Update Successfully!" });
    } else {
      res.json({ error: "You are not authorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(501).json({ Error: "Internal Server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      await User.destroy({ where: { id: id } });
      res.status(200).json({ Success: "Deleted Successfully!" });
    } else {
      res.status(400).json({ error: "You are not Authorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(501).json({ Error: "Internal Server error" });
  }
};

const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const userData = await User.findOne({ where: { id: id } });
      res.status(200).json({ data: userData });
    } else {
      res.json({ Error: "User Not Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(501).json({ Error: "Internal Server error" });
  }
};

const getAllUser = async (req, res) => {
  try {
    const data = await User.findAll({});
    // console.log("-----TokeN-----=>", token);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(501).json({ Error: "Internal Server error" });
  }
};

const getUsersWithProducts = async (req, res) => {
  try {
    const users = await User.findAll({
      include: {
        model: Product,
        required: true, // Ensures only users with Product are returned
      },
    });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ Error: "Internal Server error" });
  }
};

const getUserWithProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({
      include: {
        model: Product,
        required: true, // Ensures only users with Product are returned
      },
      where: {
        id: id,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ Error: "Internal Server error" });
  }
};

module.exports = {
  userSignUp,
  loginUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUser,
  getUsersWithProducts,
  getUserWithProduct,
  verifyByEmail,
};
