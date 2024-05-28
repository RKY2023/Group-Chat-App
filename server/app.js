const path = require("path");
var cors = require("cors");
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./util/database");
const User = require("./models/user");
const Thread = require("./models/thread");
const Group = require("./models/group");
const Usergroup = require("./models/usergroup");

const app = express();

const userRoutes = require("./routes/user");
const threadRoutes = require("./routes/thread");
const { addAbortListener } = require("stream");


app.use(cors({
    origin: ["http://13.53.45.119:80", "http://13.53.45.119:3000", "http://localhost:3000", "http://127.0.0.1:5000"]
}));
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(userRoutes);
app.use(threadRoutes);

User.hasMany(Thread);
Thread.belongsTo(User);
Thread.belongsTo(Group);

// User.hasMany(Membership);
// User.hasMany(Group);

Group.hasMany(Usergroup);
Usergroup.belongsTo(Group);
User.hasMany(Usergroup);
Usergroup.belongsTo(User);

sequelize
  // .sync({ force: true})
  .sync()
  .then((k) => {
    app.listen( process.env.PORT || 5000);
  })
  .catch((err) => console.log(err));
