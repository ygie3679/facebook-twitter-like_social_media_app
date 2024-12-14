const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const postsController = require("../controllers/posts_controller");

router.get("/user/:uid", postsController.getPostsByUserId);
router.get("/", postsController.getPosts);
router.post("/", postsController.createPost);
router.delete("/:pid", postsController.deletePost);
router.put("/:pid", postsController.updatePost);

module.exports = router;
