const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");

const {
  registerValidator,
} = require("../validators/auth.validator");

const validate = require("../middlewares/validate.middleware");

router.post(
  "/register",
  registerValidator,
  validate,
  authController.register
);

module.exports = router;