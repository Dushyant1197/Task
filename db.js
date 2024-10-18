const { Sequelize } = require("sequelize");

const dbConn = new Sequelize("userdb", "root", "", {
  host: process.env.HOST,
  dialect: "mysql",
});

try {
  dbConn.authenticate();
  console.log("DB Connected Successfully");
} catch (error) {
  console.log("DB Not Connected : ", error);
}

module.exports = { dbConn };
