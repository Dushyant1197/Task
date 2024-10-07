const express = require("express");
const app = express();
const config = require("./config");
const bodyParser = require("body-parser");
const userRoute = require("./route/user");

app.use(bodyParser.json());

app.use("/", userRoute);
config.dbConn.sync();

app.listen(config.configVar.PORT, {});
