const express = require("express");
const cors = require("cors");
require("dotenv").config();

const bodyParser = require("body-parser");

// utils
const connectDB = require("./util/database");

// routes
const userRoutes = require("./routes/user");
const threadRoutes = require("./routes/thread");

const app = express();

app.use(cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:5000"]
}));

app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Express on Vercel"));

app.use(userRoutes);
app.use(threadRoutes);

connectDB().then(() => {
    app.listen(3001, () => console.log("Server ready on port 3001."));
}).catch(err => console.log(err));

module.exports = app;