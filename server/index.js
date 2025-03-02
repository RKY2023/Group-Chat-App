const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 3001;

console.log('PORT', PORT);

const bodyParser = require("body-parser");

// utils
const connectDB = require("./util/database");

// routes
const userRoutes = require("./routes/user");
const threadRoutes = require("./routes/thread");

const app = express();

app.use(cors({
    origin: [process.env.CLIENT_URL_DEV, process.env.CLIENT_URL],
}));

console.log('process.env.CLIENT_URL_DEV', process.env.CLIENT_URL_DEV);
console.log('process.env.CLIENT_URL', process.env.CLIENT_URL);

app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Express on Vercel"));

console.log('root working', process.env.MONGO_URI);
app.use(userRoutes);
app.use(threadRoutes);
git 
connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server ready on port ${PORT}.`));
}).catch(err => console.log(err));

module.exports = app;