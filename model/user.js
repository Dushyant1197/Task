const { DataTypes } = require("sequelize");
const db = require("../db");

const userSchema = db.dbConn.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isVerify: {
      type: DataTypes.TINYINT,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    auth: {
      type: DataTypes.STRING,
    },
  },
  { tableName: "user" }
);

module.exports = userSchema;
