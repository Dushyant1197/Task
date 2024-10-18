require("dotenv").config();
const PORT = process.env.PORT || 5000;
const express = require("express");
const app = express();
const config = require("./db");
const path = require("path");
const bodyParser = require("body-parser");
app.set("view engine", "ejs");
const userRoute = require("./route/user");
const photoRoutes = require("./route/product");

app.use(express.static(path.join(__dirname, "views")));
app.use(bodyParser.json());

app.get("/upload", (req, res) => {
  res.render("excel");
});
app.use("/", userRoute);
app.use("/", photoRoutes);
config.dbConn.sync({ force: false });

app.listen(PORT);
