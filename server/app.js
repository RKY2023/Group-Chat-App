const path = require("path");
var cors = require("cors");
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./util/database");
// const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const userRoutes = require("./routes/user");

app.use(cors({
    origin: "http://localhost:3000",
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(userRoutes);

sequelize
  // .sync({ force: true})
  .sync()
  .then((k) => {
    app.listen( process.env.PORT || 5000);
  })
  .catch((err) => console.log(err));
