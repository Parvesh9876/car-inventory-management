const Vehicle = require("../models/Vehicle");

/**
 * Create a new vehicle.
 */
const createVehicle = async (vehicleData) => {
  const { make, model, category, price, quantity } = vehicleData;

  const vehicle = await Vehicle.create({
    make,
    model,
    category,
    price,
    quantity,
  });

  return vehicle;
};

/**
 * Get all vehicles.
 */
const getAllVehicles = async () => {
  const vehicles = await Vehicle.find().sort({
    createdAt: -1,
  });

  return vehicles;
};

module.exports = {
  createVehicle,
  getAllVehicles,
};