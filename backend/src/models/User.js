/**
 * User Model
 *
 * Defines how users are stored inside MongoDB.
 */

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    /**
     * Full name of the user.
     */
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
    },

    /**
     * User's email address.
     * Used for login.
     */
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    /**
     * Hashed password.
     * Never store plain-text passwords.
     */
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },

    /**
     * Role determines user permissions.
     * Every registered user is a normal user by default.
     */
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);