const { body, query } = require("express-validator");


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

const searchVehicleValidator = [
  query("minPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Minimum price must be a non-negative number"),

  query("maxPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Maximum price must be a non-negative number"),
];

/**
 * Validation rules for updating a vehicle.
 *
 * All fields are optional because the admin
 * may update only one or two fields.
 */
const updateVehicleValidator = [
  body("make")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Vehicle make cannot be empty"),

  body("model")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Vehicle model cannot be empty"),

  body("category")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Vehicle category cannot be empty"),

  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a non-negative number"),

  body("quantity")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Quantity must be a non-negative integer"),
];

module.exports = {
  createVehicleValidator,
    searchVehicleValidator,
    updateVehicleValidator,
};