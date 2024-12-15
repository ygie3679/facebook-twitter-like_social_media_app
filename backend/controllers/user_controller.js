const HttpError = require("../models/HttpError");

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
  res.json({users: users.map((user) => user.toObject({getters: true}))});
};

const getUsersById = async (req, res, next) => {
  const userId = req.params.userId;
  let users;
  try {
    // users = await User.findById(userId);
    users = await User.findById(userId, "-password");

    // console.log(users);
    res.json(users);
  } catch (error) {
    return res.status(500).json({error: "Fetching users failed"});
  }
};

const updateUserDescription = async (req, res, next) => {
  const userId = req.params.userId;
  const {description} = req.body;
  let user;
  try {
    user = await User.findById(userId, "-password");
    user.description = description;
    await user.save();
    res.json(user);
  } catch (error) {
    return res.status(500).json({error: "Fetching users failed"});
  }
};

const account = async (req, res) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({message: 'Not authenticated'});
  }
  try {
    const decoded = jwt.verify(token,
        process.env.JWT_PRIVATE_KEY
        // 'super_secret'
    );
    const user  = await User.findOne({email: decoded.email});
    res.status(200).json({
      userId: user.id,
      email: user.email,
      username: user.username
    });
  } catch (err) {
    res.status(401).json({message: 'Invalid token'});
  }
}

const signup = async (req, res, next) => {
  const {email, username, password} = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({email: email});
  } catch (err) {
    const error = new HttpError("Signing up failed. Please try again. ", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
        "User exists already. Please login instead. ",
        422
    );
    alert("User exists already. Please login instead. ");
    return next(error);
  }
  ;

  let hashedPassword;
  let newUser;
  try {
    hashedPassword = await bcrypt.hash(password, 10);
    // newUser = new User({email, username, password});
    newUser = new User({email, username, password: hashedPassword});

    await newUser.save();
    // res.status(201).json({message: 'Registered successfully!'});
  } catch (err) {
    const error = new HttpError("Cannot create user, please try again. ", 500);
    return next(error);
  }


  let token;
  try {
    token = jwt.sign(
        {userId: newUser.id, email: newUser.email},
        // "super_secret",
        process.env.WT_PRIVATE_KEY,
        {expiresIn: "7d"}
    );
  } catch (err) {
    const error = new HttpError("Signing up failed. Please try again. ", 500);
    // return next(error);
  }
  res.cookie('jwt', token, { httpOnly: true, path: '/', secure: false });
  res.status(201).json(
      {userId: newUser.id, email: newUser.email, token: token, username: newUser.username});
};

const login = async (req, res, next) => {
  const {email, password} = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({email: email});
  } catch (err) {
    const error = "Not a registered user."
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
        "Not a registered user or correct email address. Please signup or try again.",
        403
    );
    alert("Not a registered user! Please signup or enter again.")
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
        "Could not log in. Please check your credentials and try again.",
        500
    );
    alert("Could not log in. Please check your credentials and try again.")

    return next(error);
  }
  if (!isValidPassword) {
    const error = new HttpError("Invalid credentials, cannot login.", 401);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
        {userId: existingUser.id, email: existingUser.email},
        // "super_secret",
        process.env.JWT_PRIVATE_KEY,
        {expiresIn: "7d"}
    );
  } catch (err) {
    const error = new HttpError("Logging in failed. Please try again. ", 500);
    return next(error);
  }

  res.cookie('jwt', token, { httpOnly: true, path: '/', secure: false });
  res.status(200).json({
    userId: existingUser.id,
    email: existingUser.email,
    username: existingUser.username
  });
};

const logout = async (req, res) => {
  res.clearCookie('jwt', { httpOnly: true, path: '/' });
  res.status(200).json({ message: 'Logout successful' });
}

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.account = account;
exports.logout = logout;
exports.getUsersById = getUsersById;
exports.updateUserDescription = updateUserDescription;
