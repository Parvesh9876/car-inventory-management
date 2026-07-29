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


/**
 * Search vehicles using optional filters.
 *
 * Supported filters:
 * - make
 * - model
 * - category
 * - minPrice
 * - maxPrice
 */
const searchVehicles = async (filters) => {
  const {
    make,
    model,
    category,
    minPrice,
    maxPrice,
  } = filters;

  // MongoDB query object
  const query = {};

  // Case-insensitive partial matching
  if (make) {
    query.make = {
      $regex: make,
      $options: "i",
    };
  }

  if (model) {
    query.model = {
      $regex: model,
      $options: "i",
    };
  }

  if (category) {
    query.category = {
      $regex: category,
      $options: "i",
    };
  }

  // Build price range only when provided
  if (minPrice !== undefined || maxPrice !== undefined) {
    query.price = {};

    if (minPrice !== undefined) {
      query.price.$gte = Number(minPrice);
    }

    if (maxPrice !== undefined) {
      query.price.$lte = Number(maxPrice);
    }
  }

  const vehicles = await Vehicle.find(query).sort({
    createdAt: -1,
  });

  return vehicles;
};

/**
 * Update an existing vehicle.
 */
const updateVehicle = async (vehicleId, vehicleData) => {
  const vehicle = await Vehicle.findByIdAndUpdate(
    vehicleId,
    vehicleData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!vehicle) {
    const error = new Error("Vehicle not found");
    error.statusCode = 404;
    throw error;
  }

  return vehicle;
};
/**
 * Delete vehicle by ID.
 */
const deleteVehicle = async (vehicleId) => {
  const vehicle = await Vehicle.findByIdAndDelete(vehicleId);

  if (!vehicle) {
    const error = new Error("Vehicle not found");
    error.statusCode = 404;
    throw error;
  }

  return vehicle;
};

module.exports = {
  createVehicle,
  getAllVehicles,
  searchVehicles,
    updateVehicle,
    deleteVehicle,
};