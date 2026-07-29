/**
 * Global Error Handling Middleware
 *
 * All errors passed using next(error)
 * eventually reach this middleware.
 */
const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message: error.message || "Internal server error",
  });
};

module.exports = errorHandler;