const mongoose = require("mongoose");

/**
 * Vehicle Schema
 *
 * Represents a vehicle available in the dealership inventory.
 */
const vehicleSchema = new mongoose.Schema(
  {
    make: {
      type: String,
      required: [true, "Vehicle make is required"],
      trim: true,
    },

    model: {
      type: String,
      required: [true, "Vehicle model is required"],
      trim: true,
    },

    category: {
      type: String,
      required: [true, "Vehicle category is required"],
      trim: true,
    },

    price: {
      type: Number,
      required: [true, "Vehicle price is required"],
      min: [0, "Price cannot be negative"],
    },

    quantity: {
      type: Number,
      required: [true, "Vehicle quantity is required"],
      min: [0, "Quantity cannot be negative"],
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);