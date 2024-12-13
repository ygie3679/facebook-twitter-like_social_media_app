const User = require("../models/user_model");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({});
  } catch (error) {
    return res.status(500).json({error: "Fetching users failed"});
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const findUserByCredentials = async (req, res) => {
  const {email, password} = req.body;
  const user = User.findOne({email, password});
  if (!email || !password) {
    return res.status(400).json({error: 'Please enter username and password'});
  }
  res.json(user);
}

const signup = async (req, res) => {
  const {email, password} = req.body;
  if (!email || !password) {
    return res.status(400).json({error: 'Please enter username and password'});
  }

  let existingUser;
  try {
    await User.findOne({email: email});
  } catch (error) {
    res.status(500).json({error: "Signing up failed. Please try again."});
    return next(error);
  }
  ;

  if (existingUser) {
    res.status(500).json(
        {error: "User exists already. Please login instead. "});
  }
  ;

  let hashedPassword;
  let newUser;
  try {
    hashedPassword = await bcrypt.hash(password, 10);
    newUser = new User({email, password: hashedPassword});
    await newUser.save();
    res.status(201).json({message: 'Registered successfully!'});
  } catch (err) {
    res.status(500).json({error: 'User already exists! Please login instead.'});
  }
  ;

  let token;
  try {
    token = jwt.sign(
        {email: newUser.email},
        process.env.WT_PRIVATE_KEY,
        {expiresIn: "1h"}
    );
  } catch (error) {
    res.status(500).json({error: ("Signing up failed. Please try again. ")});
    return next(error);
  }

  res.status(201).json(
      {userId: newUser.id, email: newUser.email, token: token});
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    res.status(500).json({error: ("Not a registered user.")});
    return next(error);
  };

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (error) {
    res.status(500).json({error: ("Invalid password. Please try again. ")});
    return next(error);
  }
  let token;
  try {
    token = jwt.sign(
        { userId: existingUser.id, email: existingUser.email },
        // process.env.JWT_PRIVATE_KEY,
        "super_secret",
        { expiresIn: "1h" }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({error: ("Login Failed. Please try again. ")});
    return next(error);
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    password: token
  });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.findUserByCredentials = findUserByCredentials;
