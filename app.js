// import express from 'express';
const path = require("path");
var cors = require("cors");
require("dotenv").config();


const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const userRoutes = require("./routes/user");

app.use(cors());
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, "public")));

app.use(userRoutes);

app.listen( process.env.PORT || 3000);
