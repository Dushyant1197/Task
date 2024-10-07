const { Sequelize } = require("sequelize");

const configVar = {
  PORT: 4000,
  logging: false,
  HOST: "localhost",
  secretKey: "first Secret Key",
};

const dbConn = new Sequelize("userdb", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

// try {
//   dbConn.authenticate();
//   console.log("DB Connected Successfully");
// } catch (error) {
//   console.log("DB Not Connected : ", error);
// }

module.exports = { dbConn, configVar };
