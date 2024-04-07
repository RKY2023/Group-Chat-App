const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  // console.log('tokenize', user);
  return jwt.sign(user, process.env.TOKEN_SECRET);
}

const signupAPI = async (req, res, next) => {
  const { name, email, password, phoneno } = req.body;
  console.log(name, email, password, phoneno );
  try{
    const encryptedPassword = await bcrypt.hash(password, 10);
    const userData = await User.create({ name, email, password: encryptedPassword, phoneno });
    const token = generateAccessToken(userData);

    res.status(203).json({ userData, token });
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

const loginAPI = async (req, res, next) => {
  
  const { email, password } = req.body;
  console.log( email, password, req.body);
  try{
    const users = await User.findAll({ where: { email: email } });

    if( users.length == 1) {
      const user = users[0];
      const isMatched = await bcrypt.compare(password, user.password);
      console.log(user.password, password, isMatched);
      if(isMatched)
      {
        const token = generateAccessToken({ name: user.name, email: user.email});
        res.status(203).json({ userData: user, token });
      } else {
        res.status(201).json({ error: { message: "Invalid Password" } });
      }
    } else {
      res.status(201).json({ error: { message: "User not found" } });
    }   
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
    // throw new Error(err);
  }
};

const apiTest = async (req, res, next) => {
  console.log('api called');
  res.status(203).json({ 'apitest': "hi" });
}

module.exports = {
  apiTest,
  signupAPI,
  loginAPI,
};
