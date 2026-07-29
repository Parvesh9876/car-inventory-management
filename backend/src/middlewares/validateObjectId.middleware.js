const mongoose = require("mongoose");

/**
 * Validates MongoDB ObjectId route parameters.
 *
 * Prevents invalid IDs from reaching the database layer
 * and causing Mongoose CastErrors.
 */
const validateObjectId = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid vehicle ID",
    });
  }

  next();
};

module.exports = validateObjectId;