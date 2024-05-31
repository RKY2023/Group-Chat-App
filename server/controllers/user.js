const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const generateAccessToken = (user) => {
  // console.log('tokenize', user);
  return jwt.sign(user, process.env.TOKEN_KEY);
};

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const userData = jwt.verify(token, process.env.TOKEN_KEY);
    // console.log(userData);
    const user = await User.findByPk(userData.userid);
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: { message: "auth failed" } });
  }
};

const signupAPI = async (req, res, next) => {
  const { name, email, password, phoneno } = req.body;
  console.log(name, email, password, phoneno);
  try {
    const encryptedPassword = await bcrypt.hash(password, 10);
    const userData = await User.create({
      name,
      email,
      password: encryptedPassword,
      phoneno,
      isLoggedIn: true,
    });
    const token = generateAccessToken({
      userid: userData.id,
      username: userData.name,
      useremail: userData.email,
    });
    const newUserData = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      isLoggedIn: userData.isLoggedIn
    };

    res.status(203).json({ newUserData, token });
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
  console.log(email, password, req.body);
  try {
    const users = await User.findAll({ where: { email: email } });

    if (users.length == 1) {
      const user = users[0];
      const isMatched = await bcrypt.compare(password, user.password);
      console.log(user.password, password, isMatched);
      if (isMatched) {
        const token = generateAccessToken({
          userid: user.id,
          username: user.name,
          useremail: user.email,
        });
        user.set({
          isLoggedIn: true,
        });
        const loggedIn = await user.save();
        const userData = {
          id: user.id,
          name: user.name,
          email: user.email,
          isLoggedIn: user.isLoggedIn
        };
        res.status(203).json({ userData, token });
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

const getOnlineUsers = async (req, res, next) => {
  try {
    const onlineUsers = await User.findAll({
      where: { isLoggedIn: true },
      order: [["updatedAt", "ASC"]],
    });
    const onlineUsersData = onlineUsers.map((u) => {
      return { uid: u.id, name: u.name };
    });
    res.status(203).json({ message: 'success', onlineUsers: onlineUsersData });
  } catch (err) {
    console.log(err);
    res.status(203).json({ message: 'fail' });
  }
};

const userList = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name"],
      where: {
        id: {
          [Op.ne]: req.user.id,
        },
      },
    });
    res.status(201).json({ message: "success", users });
  } catch (err) {
    console.log(err);
    res.status(203).json({ message: "fail" });
  }
};

const apiTest = async (req, res, next) => {
  console.log("api called");
  res.status(203).json({ apitest: "hi" });
};

module.exports = {
  apiTest,
  authenticate,
  signupAPI,
  loginAPI,
  getOnlineUsers,
  userList,
};
