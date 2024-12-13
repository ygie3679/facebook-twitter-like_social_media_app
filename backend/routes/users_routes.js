const express = require("express");

const { check } = require("express-validator");

const userController = require("../controllers/user_controller");

const router = express.Router();

//Use placesControllers to get the pointer of getPlaceById
router.get("/", userController.getUsers);
router.post("/account", userController.findUserByCredentials);

router.post(
    "/signup",
    [
      check("email").normalizeEmail().isEmail(),
      check("password").isLength({ min: 6 }),
    ],
    userController.signup
);

router.post("/login", userController.login);

module.exports = router;