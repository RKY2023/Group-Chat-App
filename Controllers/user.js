const User = require("../models/user");
const bcrypt = require("bcrypt");

const signup = (req, res, next) => {
  res.render("login", {
    mode: 'signup',
    error: [],
  });
};

const signupAPI = async (req, res, next) => {
  const { name, email, password, phoneno } = req.body;
  console.log(name, email, password, phoneno );
  try{
    const encryptedPassword = await bcrypt.hash(password, 10);
    const userData = await User.create({ name, email, password: encryptedPassword, phoneno });
    res.status(203).json({ userData });
  } catch (err) {
    console.log(err);
    if (err.errors) {
      if ((err.errors.message = "email must be unique")) {
        res.status(201).json({ error: { message: "Email already exists." } });
      }
    } else {
      res.status(404).json(err);
    }
    throw new Error(err);
  }
};

module.exports = {
  signup: signup,
  signupAPI: signupAPI,
};
