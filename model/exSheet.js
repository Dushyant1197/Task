const { DataTypes } = require("sequelize");
const db = require("../db");

const excSchema = db.dbConn.define("excData", {
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
});

module.exports = excSchema;
