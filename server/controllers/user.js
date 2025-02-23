const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET);
};

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(userData.userid);
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: { message: "auth failed" } });
  }
};

const signupAPI = async (req, res, next) => {
  const { name, email, password, phoneno } = req.body;
  
  try {
    const encryptedPassword = await bcrypt.hash(password, 10);
    const userData = new User({
      name,
      email,
      password: encryptedPassword,
      phoneno,
      isLoggedIn: true,
    });
    await userData.save();
    const token = generateAccessToken({
      userid: userData._id,
      username: userData.name,
      useremail: userData.email,
    });

    res.status(203).json({ userData, token });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      res.status(201).json({ error: { message: "Email already exists." } });
    } else {
      res.status(404).json(err);
    }
  }
};

const loginAPI = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const isMatched = await bcrypt.compare(password, user.password);
      if (isMatched) {
        const token = generateAccessToken({
          userid: user._id,
          username: user.name,
          useremail: user.email,
        });
        user.isLoggedIn = true;
        await user.save();
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
  }
};

const getOnlineUsers = async (req, res, next) => {
  try {
    const onlineUsers = await User.find({ isLoggedIn: true }).sort({ updatedAt: 'asc' });
    const onlineUsersData = onlineUsers.map((u) => {
      return { uid: u._id, name: u.name };
    });
    res.status(203).json({ message: 'success', onlineUsers: onlineUsersData });
  } catch (err) {
    console.log(err);
    res.status(203).json({ message: 'fail' });
  }
};

const userList = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } }).select('id name');
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
