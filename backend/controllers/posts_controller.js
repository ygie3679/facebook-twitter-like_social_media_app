const mongoose = require("mongoose");
const Post = require("../models/post_model");
const jwt = require("jsonwebtoken");
const {validationResult} = require("express-validator");
const HttpError = require("../models/HttpError");
// let userId;

const getPostsByUserId = async (req, res) => {
  const userId = req.params.uid;
  try {
    const posts = await Post.find({userId: userId});
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).populate('userId').sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token.' });
    req.user = user;
    next();
  });
};

const createPost = async (req, res) => {
  // const { content } = req.body;
  // if (!content) return res.status(400).json({ error: 'Please enter contents.'});
  const {content, userId} = req.body;
  try {
    const post = new Post({ content, userId });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePost = async (req, res, next) => {
  const postId = req.params['pid'];
  console.log(req.params);
  let post;
  try {
    post = await Post.findById(postId).populate("userId");
  } catch (err) {
    const error = new HttpError("Something went wrong!", 500);
    return next(error);
  }

  if (!post) {
    const error = new HttpError("Failed to find this post", 404);
    return next(error);
  }
  //
  // if (post.userId !== req.userData.userId) {
  //   res.status(400).json({error: "Not allowed to delete this post!"});
  // }

  try {
    await Post.findByIdAndDelete(postId);
    // const ses = await mongoose.startSession();
    // ses.startTransaction();
    // await post.deleteOne({ session: ses });
    // userId =
    // //Pull will automatically remove the place's id only
    // post.userId.status_updates.pull(post);
    // await post.userId.save({ session: ses });
    // await ses.commitTransaction();
  } catch (err) {
    const error = new HttpError("Could not delete the post.", 500);
    return next(error);
  }

  res.status(200).json({ message: "Deleted post." });
};

const updatePost = async (req, res, next) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   res.status(422).json({ error: "Something went wrong. Failed to update the post." });
  // }

  const { content } = req.body;
  const postId = req.params.pid;

  let post;
  try {
    post = await Post.findById(postId);
  } catch (err) {
    const error = new HttpError("Something went wrong!", 500);
    return next(error);
  }

  //If current user isn't the creator of this post
  // if (post.userId.toString() !== req.userData.userId) {
  //   const error = new HttpError("No authorization to edit this post.", 401);
  //   return next(error);
  // }

  post.content = content;

  try {
    await post.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Failed to update. Please try again.", 500);
    return next(error);
  }

  res.status(200).json({ post: post.toObject({ getters: true }) });
};

exports.getPostsByUserId = getPostsByUserId;
exports.getPosts = getPosts;
exports.createPost = createPost;
exports.deletePost = deletePost;
exports.updatePost = updatePost;
exports.authenticate = authenticate;


