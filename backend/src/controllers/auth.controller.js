const authService = require("../services/auth.service");

const register = async (req, res, next) => {
  try {
   const { user, token } = await authService.register(req.body);

  res.status(201).json({
  success: true,
  message: "User registered successfully",
  data: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  },
  token,
});
  } catch (error) {
     res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Login Controller
 *
 * Handles HTTP request/response for user login.
 */
const login = async (req, res, next) => {
  try {
    const { user, token } = await authService.login(req.body);

    return res.status(200).json({
      success: true,
      message: "Login successful",

      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },

      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
    login,
};