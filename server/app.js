const path = require("path");
var cors = require("cors");
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./util/database");
// const User = require("./models/user");

const app = express();

const userRoutes = require("./routes/user");

app.use(cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:5000"]
}));
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(userRoutes);

sequelize
  // .sync({ force: true})
  .sync()
  .then((k) => {
    app.listen( process.env.PORT || 5000);
  })
  .catch((err) => console.log(err));
