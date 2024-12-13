const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const postsController = require("../controllers/posts_controller");

router.get("/user/:uid", postsController.getPostsByUserId);
router.get("/", postsController.getPosts);

// router.use(checkAuth);

router.patch(
    "/:pid",
    [
      check("textContent").not().isEmpty(),],
    postsController.updatePost
);

router.delete("/:pid", postsController.deletePost);

module.exports = router;
