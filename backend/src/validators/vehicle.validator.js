const { body } = require("express-validator");

/**
 * Validation rules for creating a vehicle.
 */
const createVehicleValidator = [
  body("make")
    .trim()
    .notEmpty()
    .withMessage("Vehicle make is required"),

  body("model")
    .trim()
    .notEmpty()
    .withMessage("Vehicle model is required"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Vehicle category is required"),

  body("price")
    .notEmpty()
    .withMessage("Vehicle price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a non-negative number"),

  body("quantity")
    .notEmpty()
    .withMessage("Vehicle quantity is required")
    .isInt({ min: 0 })
    .withMessage("Quantity must be a non-negative integer"),
];

module.exports = {
  createVehicleValidator,
};