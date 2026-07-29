/**
 * Authentication Service
 *
 * Contains business logic related to authentication.
 */

const User = require("../models/User");
const bcrypt = require("bcryptjs");

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

    return user;
};

module.exports = {
    register,
};