/**
 * Admin Authorization Middleware
 *
 * This middleware runs AFTER authentication.
 * It checks whether the authenticated user has the admin role.
 */
const authorizeAdmin = (req, res, next) => {
  // authenticate middleware should already have attached
  // the logged-in user to req.user.
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  // User is authenticated but does not have admin privileges.
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access required",
    });
  }

  next();
};

module.exports = authorizeAdmin;