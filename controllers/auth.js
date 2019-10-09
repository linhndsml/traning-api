const { User } = require("../models");
const { response_success, response_fail } = require("../utils/response");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuidv4 = require("uuid/v4");

const SECRET_KEY = "ahihidoconcho";

const hashPassword = password =>
  new Promise((resolve, reject) => {
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if (err) reject(err);
      bcrypt.hash(password, salt, function(err, hash) {
        // Store hash in your password DB.
        if (err) reject(err);
        if (hash) resolve(hash);
      });
    });
  });

const generatorToken = data => {
  return jwt.sign({ email: data.email, baseToken: data.baseToken }, SECRET_KEY);
};

const getAllUser = async (req, res) => {
  const list_users = await User.find({});
  res.json(response_success(list_users, "Get list users success!"));
};

const createUser = async (req, res) => {
  const { email, password } = req.body;
  const checkUser = await User.findOne({ email });
  if (checkUser) {
    res.status(400);
    return res.json(response_fail("User existed!"));
  }
  const baseToken = uuidv4();
  const user = new User({
    email,
    password: await hashPassword(password),
    baseToken
  });

  const token = generatorToken(user);

  user.save();
  res.json(response_success({ ...user._doc, token }, "Create user success!"));
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json(response_fail("Email or password invalid!"));
  }
  bcrypt.compare(password, user.password, (err, same) => {
    if (err) {
      return res.status(400).json(response_fail("Server bugs, ahihi !!!!"));
    }
    if (same) {
      return res.json(
        response_success({ ...user._doc, token: generatorToken(user._doc) })
      );
    }
    return res.status(400).json(response_fail("Email or password invalid!"));
  });
};

const checkToken = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, SECRET_KEY);
    if (!decoded) {
      return res.status(400).json(response_fail("Invalid token!"));
    }

    const user = await User.findOne({
      email: decoded.email,
      baseToken: decoded.baseToken
    });
    if (!user) {
      return res.status(400).json(response_fail("User not exist!"));
    }

    return res.json(response_success({ ...user._doc, token }));
  } catch (error) {
    return res.status(400).json(response_fail(error.message));
  }
};

module.exports = {
  createUser,
  getAllUser,
  signIn,
  checkToken
};
