const bcrypt = require("bcrypt");

const bcryptPass = async (pass) => {
  const password = bcrypt.hash(pass, 10);
  return password;
};
module.exports = { bcryptPass };
