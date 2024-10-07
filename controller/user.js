// const User = require("../model/user");
const { User, Product } = require("../model");
const comparePass = require("bcrypt");
const jwtToken = require("jsonwebtoken");
const express = require("express");
const multer = require("multer");
const path = require("path");
const bcryp = require("../middleware/bcrypt");
const jwt = require("../middleware/jsonWebToken");

const userSingup = async (req, res) => {
  try {
    let bodyData = req.body;
    let { Name, email, password, role, productName, productPrice, id } =
      req.body;
    let token = "";

    // File Upload
    // const storage = multer.diskStorage({
    //   destination: (req, file, cb) => {
    //     cb(null, "uploads/"); // Specify the uploads directory
    //   },
    //   filename: (req, file, cb) => {
    //     cb(null, file.originalname); // Use original file name
    //   },
    // });

    // const upload = multer({ storage });
    // console.log(upload.getFilename.filename);
    // file upload end

    // const getEmail = await User.findOne({ where: { email: email } });
    // if (getEmail) {
    //   return res.json({ Error: "User Already Exist" });
    // }
    // const hashPassword = bcryp.bcryptPass(password);
    // password = await hashPassword;

    // const getToken = await jwt.jsonWebToken(email);
    // token = getToken;
    // console.log(getToken);

    // const data = await User.create({ Name, email, password, role, token });
    // const productData = await Product.create({
    //   productName,
    //   productPrice,
    //   userId: data.id,
    // });
    // res.status(200).json({ data, productData });
  } catch (error) {
    console.log(error);
    res.json({ Error: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    let userData = req.body;
    const getUser = await User.findOne({ where: { email: userData.email } });
    let password = "";

    if (getUser) {
      password = await comparePass.compare(userData.password, getUser.password);
      if (password) {
        const getToken = await jwt.jsonWebToken(getUser.email, getUser.id);
        const updatedToken = { token: getToken };

        const data = await User.update(updatedToken, {
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
    const userData = req.body; //get data from body
    const id = req.params.id;
    if (id) {
      const updatedData = User.update(userData, {
        where: { id: id },
      });
      res.status(200).send(userData);
    }
    res.json({ Error: "User Not Found" });
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
    }
    res.status(200).json({ Success: "Deleted Successfully!" });
  } catch (error) {
    res.status(501).json({ Error: "Internal Server error" });
  }
};

const getUser = async (req, res) => {
  try {
    // let getToken = req.headers["authorization"].split(" ")[1];
    // getToken = jwtToken.decode(getToken);
    // console.log(getToken.id);
    const id = req.params.id;
    if (id) {
      const userData = await User.findOne({ where: { id: id } });
      res.status(200).send(userData);
    }
    res.json({ Error: "User Not Found" });
  } catch (error) {
    res.status(501).json({ Error: "Internal Server error" });
  }
};

const getAllUser = async (req, res) => {
  try {
    const data = await User.findAll({});
    res.status(200).send(data);
  } catch (error) {
    res.status(501).json({ Error: "Internal Server error" });
  }
};

module.exports = {
  userSingup,
  loginUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUser,
};
