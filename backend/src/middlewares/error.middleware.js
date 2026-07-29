/**
 * Global Error Handling Middleware
 *
 * Provides one consistent error response format
 * across the entire API.
 */
const errorHandler = (error, req, res, next) => {
  console.error(error);

  let statusCode = error.statusCode || 500;
  let message = error.message || "Internal server error";

  /**
   * Handle invalid MongoDB ObjectId errors
   * that might still reach the database layer.
   */
  if (error.name === "CastError") {
    statusCode = 400;
    message = "Invalid resource ID";
  }

  /**
   * Handle MongoDB duplicate key errors.
   */
  if (error.code === 11000) {
    statusCode = 409;
    message = "Resource already exists";
  }

  /**
   * Handle Mongoose validation errors.
   */
  if (error.name === "ValidationError") {
    statusCode = 400;

    message = Object.values(error.errors)
      .map((err) => err.message)
      .join(", ");
  }

  return res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;