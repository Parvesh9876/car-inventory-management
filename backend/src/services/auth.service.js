/**
 * Authentication Service
 *
 * Contains business logic related to authentication.
 */

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const register = async (userData) => {
    const { name, email, password } = userData;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        const error = new Error("Email already exists");
        error.statusCode = 409;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user in MongoDB
    const user = await User.create({
        name,
        email,
        password: hashedPassword, // Use the hashed password
        role: "user",
    });
    const token = generateToken(user);

    return {
        user,
        token,
    };
  
};


/**
 * Login an existing user.
 *
 * 1. Find user by email
 * 2. Compare provided password with stored hash
 * 3. Generate JWT
 * 4. Return user and token
 */
const login = async (userData) => {
  const { email, password } = userData;

  // Find the user using their email
  const user = await User.findOne({ email });

  // Do not reveal whether email or password was wrong.
  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  // Compare plain password with hashed password stored in MongoDB
  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordValid) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  // Generate authentication token
  const token = generateToken(user);

  return {
    user,
    token,
  };
};
module.exports = {
    register,
    login,
};