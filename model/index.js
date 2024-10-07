const User = require("./user");
const Product = require("./product");

User.hasOne(Product, { foreignKey: "userId" });
Product.belongsTo(User, { foreignKey: "userId" });

module.exports = { User, Product };
